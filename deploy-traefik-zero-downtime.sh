#!/bin/bash

# Zero Downtime Deployment Script for Traefik
# This script implements blue-green deployment using Traefik dynamic configuration

set -e

# Configuration
COMPOSE_FILE="docker-compose.zero-downtime.yml"
MAIN_SERVICE="cryptus-front-2025"
BLUE_SERVICE="cryptus-blue"
GREEN_SERVICE="cryptus-green"
HEALTH_CHECK_URL="http://localhost/api/health"
TRAEFIK_CONFIG_PATH="./traefik"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print functions
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if container is healthy
check_health() {
    local container_name=$1
    local max_attempts=30
    local attempt=1
    
    print_status "Checking health of $container_name..."
    
    while [ $attempt -le $max_attempts ]; do
        if docker exec $container_name curl -s http://localhost:3000/api/health >/dev/null 2>&1; then
            print_success "$container_name is healthy"
            return 0
        fi
        
        print_status "Attempt $attempt/$max_attempts: $container_name not ready yet..."
        sleep 5
        ((attempt++))
    done
    
    print_error "$container_name failed health check after $max_attempts attempts"
    return 1
}

# Function to get current active instance
get_active_instance() {
    # Check which instance is currently serving traffic
    local response=$(curl -s $HEALTH_CHECK_URL 2>/dev/null || echo '{"instance":"none"}')
    local current_instance=$(echo "$response" | grep -o '"instance":"[^"]*"' | cut -d'"' -f4)
    
    if [ "$current_instance" = "blue" ] || [ "$current_instance" = "green" ]; then
        echo "$current_instance"
    else
        # If no specific instance detected, check main service
        if docker ps --format "table {{.Names}}" | grep -q "^$MAIN_SERVICE$"; then
            echo "main"
        else
            echo "none"
        fi
    fi
}

# Function to switch traffic by updating Traefik labels
switch_traffic_traefik() {
    local target_instance=$1
    local target_container=""
    
    if [ "$target_instance" = "blue" ]; then
        target_container="cryptus-blue"
    elif [ "$target_instance" = "green" ]; then
        target_container="cryptus-green"
    else
        print_error "Invalid target instance: $target_instance"
        return 1
    fi
    
    print_status "Switching traffic to $target_instance instance..."
    
    # Stop main service to avoid conflicts
    docker compose -f $COMPOSE_FILE stop $MAIN_SERVICE 2>/dev/null || true
    
    # Update the main service to point to target instance
    print_status "Updating main service labels to point to $target_container..."
    
    # Remove main service and recreate pointing to target
    docker compose -f $COMPOSE_FILE rm -f $MAIN_SERVICE 2>/dev/null || true
    
    # Create temporary compose override to redirect main service
    cat > docker-compose.override.yml << EOF
services:
  $MAIN_SERVICE:
    image: traefik/whoami:latest
    container_name: $MAIN_SERVICE
    command: --port 3000
    environment:
      - WHOAMI_PORT_NUMBER=3000
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.cryptus-front-2025.rule=Host(\`cryptus-front-2025.partners-bot.ru\`)"
      - "traefik.http.routers.cryptus-front-2025.entrypoints=websecure"
      - "traefik.http.routers.cryptus-front-2025.tls.certresolver=myresolver"
      - "traefik.http.services.cryptus-front-2025.loadbalancer.server.port=3000"
      - "traefik.http.routers.cryptus-front-2025.service=cryptus-redirect"
      - "traefik.http.services.cryptus-redirect.loadbalancer.server.url=http://$target_container:3000"
EOF

    # Start the redirect service
    docker compose -f $COMPOSE_FILE -f docker-compose.override.yml up -d $MAIN_SERVICE
    
    # Wait for Traefik to pick up changes
    sleep 10
    
    # Verify the switch
    local max_attempts=10
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        local response=$(curl -s $HEALTH_CHECK_URL 2>/dev/null)
        if echo "$response" | grep -q "\"instance\":\"$target_instance\""; then
            print_success "Traffic successfully switched to $target_instance"
            return 0
        fi
        
        print_status "Attempt $attempt/$max_attempts: Verifying traffic switch..."
        sleep 3
        ((attempt++))
    done
    
    print_error "Failed to switch traffic to $target_instance after $max_attempts attempts"
    return 1
}

# Function to deploy to specific instance
deploy_instance() {
    local target_instance=$1
    local target_service=""
    local target_container=""
    
    if [ "$target_instance" = "blue" ]; then
        target_service=$BLUE_SERVICE
        target_container="cryptus-blue"
    elif [ "$target_instance" = "green" ]; then
        target_service=$GREEN_SERVICE
        target_container="cryptus-green"
    else
        print_error "Invalid target instance: $target_instance"
        return 1
    fi
    
    print_status "Deploying to $target_instance instance..."
    
    # Stop old instance
    docker compose -f $COMPOSE_FILE stop $target_service 2>/dev/null || true
    
    # Build and start new instance
    docker compose -f $COMPOSE_FILE --profile blue-green build $target_service
    docker compose -f $COMPOSE_FILE --profile blue-green up -d $target_service
    
    # Check health
    if ! check_health $target_container; then
        print_error "Health check failed for $target_instance instance"
        return 1
    fi
    
    print_success "$target_instance instance deployed successfully"
    return 0
}

# Main deployment function
deploy() {
    print_status "Starting zero downtime deployment with Traefik..."
    
    # Get current active instance
    local current_active=$(get_active_instance)
    print_status "Current active instance: $current_active"
    
    # Determine target instance
    local target_instance=""
    if [ "$current_active" = "blue" ]; then
        target_instance="green"
    elif [ "$current_active" = "green" ]; then
        target_instance="blue"
    else
        # First deployment - start with blue
        target_instance="blue"
        print_status "First deployment - starting with blue instance"
    fi
    
    # Deploy to target instance
    if ! deploy_instance $target_instance; then
        print_error "Deployment failed"
        return 1
    fi
    
    # Switch traffic
    if ! switch_traffic_traefik $target_instance; then
        print_error "Failed to switch traffic, keeping old instance active"
        # Stop failed instance
        docker compose -f $COMPOSE_FILE --profile blue-green stop $([ "$target_instance" = "blue" ] && echo $BLUE_SERVICE || echo $GREEN_SERVICE)
        return 1
    fi
    
    # Stop old instance
    if [ "$current_active" != "none" ] && [ "$current_active" != "main" ]; then
        local old_service=$([ "$current_active" = "blue" ] && echo $BLUE_SERVICE || echo $GREEN_SERVICE)
        print_status "Stopping old instance: $current_active"
        docker compose -f $COMPOSE_FILE --profile blue-green stop $old_service
    fi
    
    # Clean up override file
    rm -f docker-compose.override.yml
    
    print_success "Zero downtime deployment completed!"
    print_success "Active instance: $target_instance"
    
    return 0
}

# Function to show status
status() {
    print_status "=== Cryptus Deployment Status ==="
    
    # Check main service
    if docker ps --format "table {{.Names}}\t{{.Status}}" | grep -q "^$MAIN_SERVICE"; then
        print_success "Main service ($MAIN_SERVICE): Running"
    else
        print_warning "Main service ($MAIN_SERVICE): Not running"
    fi
    
    # Check blue instance
    if docker ps --format "table {{.Names}}\t{{.Status}}" | grep -q "^cryptus-blue"; then
        print_success "Blue instance: Running"
    else
        print_warning "Blue instance: Not running"
    fi
    
    # Check green instance
    if docker ps --format "table {{.Names}}\t{{.Status}}" | grep -q "^cryptus-green"; then
        print_success "Green instance: Running"
    else
        print_warning "Green instance: Not running"
    fi
    
    # Check current active
    local active=$(get_active_instance)
    print_status "Current active instance: $active"
    
    # Test health endpoint
    local response=$(curl -s $HEALTH_CHECK_URL 2>/dev/null || echo "Connection failed")
    print_status "Health check response: $response"
}

# Function to cleanup
cleanup() {
    print_status "Cleaning up deployment resources..."
    
    # Stop all instances
    docker compose -f $COMPOSE_FILE --profile blue-green down
    docker compose -f $COMPOSE_FILE stop $MAIN_SERVICE 2>/dev/null || true
    
    # Remove override file
    rm -f docker-compose.override.yml
    
    # Clean up unused images
    docker image prune -f
    
    print_success "Cleanup completed"
}

# Main script logic
case "${1:-deploy}" in
    "deploy")
        deploy
        ;;
    "status")
        status
        ;;
    "cleanup")
        cleanup
        ;;
    "help"|"--help"|"-h")
        echo "Usage: $0 [deploy|status|cleanup|help]"
        echo ""
        echo "Commands:"
        echo "  deploy   - Perform zero downtime deployment (default)"
        echo "  status   - Show current deployment status"
        echo "  cleanup  - Clean up all deployment resources"
        echo "  help     - Show this help message"
        ;;
    *)
        print_error "Unknown command: $1"
        echo "Use '$0 help' for usage information"
        exit 1
        ;;
esac 