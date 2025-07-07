#!/bin/bash

# Zero Downtime Deployment Script for Cryptus
# Implements Blue-Green deployment strategy

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
COMPOSE_FILE="docker-compose.zero-downtime.yml"
NGINX_CONTAINER="cryptus_nginx"
HEALTH_CHECK_URL="http://localhost/api/health"
MAX_WAIT_TIME=300  # 5 minutes
CHECK_INTERVAL=5   # 5 seconds

# Function to print colored output
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

# Function to check container health
check_container_health() {
    local container_name=$1
    local max_attempts=30
    local attempt=1
    
    print_status "Checking health of $container_name..."
    
    while [ $attempt -le $max_attempts ]; do
        if docker exec $container_name curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
            print_success "$container_name is healthy"
            return 0
        fi
        
        print_status "Attempt $attempt/$max_attempts: $container_name not ready yet..."
        sleep $CHECK_INTERVAL
        ((attempt++))
    done
    
    print_error "$container_name failed health check"
    return 1
}

# Function to get current active instance
get_active_instance() {
    if docker compose -f $COMPOSE_FILE ps cryptus-blue | grep -q "Up"; then
        if docker compose -f $COMPOSE_FILE ps cryptus-green | grep -q "Up"; then
            # Both are up, check which one is primary (not backup)
            if docker exec $NGINX_CONTAINER nginx -T 2>/dev/null | grep -A5 "upstream cryptus_app" | grep -q "backup.*cryptus-green"; then
                echo "blue"
            else
                echo "green"
            fi
        else
            echo "blue"
        fi
    elif docker compose -f $COMPOSE_FILE ps cryptus-green | grep -q "Up"; then
        echo "green"
    else
        echo "none"
    fi
}

# Function to switch traffic
switch_traffic() {
    local from_instance=$1
    local to_instance=$2
    
    print_status "Switching traffic from $from_instance to $to_instance..."
    
    # Copy the appropriate config file to host
    if [ "$to_instance" = "blue" ]; then
        print_status "Activating blue configuration..."
        cp ./nginx/nginx-blue.conf ./nginx/nginx.conf
    else
        print_status "Activating green configuration..."
        cp ./nginx/nginx-green.conf ./nginx/nginx.conf
    fi
    
    # Restart nginx container to pick up new configuration
    print_status "Restarting nginx with new configuration..."
    docker compose -f $COMPOSE_FILE restart nginx
    
    # Wait for nginx to start
    sleep 5
    
    # Verify the switch with multiple attempts
    local max_attempts=10
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        local response=$(curl -s $HEALTH_CHECK_URL 2>/dev/null)
        if echo "$response" | grep -q "\"instance\":\"$to_instance\""; then
            print_success "Traffic successfully switched to $to_instance"
            return 0
        fi
        
        print_status "Attempt $attempt/$max_attempts: Verifying traffic switch..."
        sleep 2
        ((attempt++))
    done
    
    print_error "Failed to switch traffic to $to_instance after $max_attempts attempts"
    return 1
}

# Function to deploy new version
deploy() {
    print_status "Starting zero downtime deployment..."
    
    # Check if services are running
    if ! docker compose -f $COMPOSE_FILE ps | grep -q "Up"; then
        print_status "No services running, starting initial deployment..."
        docker compose -f $COMPOSE_FILE up -d
        
        # Wait for both instances to be healthy
        check_container_health "cryptus_blue" || exit 1
        check_container_health "cryptus_green" || exit 1
        
        print_success "Initial deployment completed"
        return 0
    fi
    
    # Get current active instance
    local active_instance=$(get_active_instance)
    print_status "Current active instance: $active_instance"
    
    if [ "$active_instance" = "none" ]; then
        print_error "No active instances found"
        exit 1
    fi
    
    # Determine target instance
    local target_instance
    if [ "$active_instance" = "blue" ]; then
        target_instance="green"
    else
        target_instance="blue"
    fi
    
    print_status "Deploying to $target_instance instance..."
    
    # Stop target instance
    docker compose -f $COMPOSE_FILE stop cryptus-$target_instance
    
    # Rebuild and start target instance
    docker compose -f $COMPOSE_FILE build cryptus-$target_instance
    docker compose -f $COMPOSE_FILE up -d cryptus-$target_instance
    
    # Wait for target instance to be healthy
    if check_container_health "cryptus_$target_instance"; then
        # Switch traffic to new instance
        if switch_traffic "$active_instance" "$target_instance"; then
            # Wait a bit to ensure stability
            sleep 10
            
            # Stop old instance
            print_status "Stopping old instance: $active_instance"
            docker compose -f $COMPOSE_FILE stop cryptus-$active_instance
            
            print_success "Zero downtime deployment completed!"
            print_success "Active instance: $target_instance"
        else
            print_error "Failed to switch traffic, keeping old instance active"
            docker compose -f $COMPOSE_FILE stop cryptus-$target_instance
            exit 1
        fi
    else
        print_error "New instance failed health check, aborting deployment"
        docker compose -f $COMPOSE_FILE stop cryptus-$target_instance
        exit 1
    fi
}

# Function to rollback
rollback() {
    print_status "Starting rollback..."
    
    local active_instance=$(get_active_instance)
    local target_instance
    
    if [ "$active_instance" = "blue" ]; then
        target_instance="green"
    else
        target_instance="blue"
    fi
    
    # Start the other instance
    print_status "Starting $target_instance instance for rollback..."
    docker compose -f $COMPOSE_FILE up -d cryptus-$target_instance
    
    # Wait for it to be healthy
    if check_container_health "cryptus_$target_instance"; then
        # Switch traffic
        if switch_traffic "$active_instance" "$target_instance"; then
            print_success "Rollback completed!"
            print_success "Active instance: $target_instance"
        else
            print_error "Failed to rollback"
            exit 1
        fi
    else
        print_error "Rollback instance failed health check"
        exit 1
    fi
}

# Function to show status
status() {
    print_status "=== Cryptus Deployment Status ==="
    
    echo -e "\n${YELLOW}Container Status:${NC}"
    docker compose -f $COMPOSE_FILE ps
    
    echo -e "\n${YELLOW}Active Instance:${NC}"
    local active=$(get_active_instance)
    echo "Current active instance: $active"
    
    echo -e "\n${YELLOW}Health Check:${NC}"
    local health_response=$(curl -s $HEALTH_CHECK_URL 2>/dev/null || echo "Failed to connect")
    echo "$health_response" | jq . 2>/dev/null || echo "$health_response"
    
    echo -e "\n${YELLOW}Nginx Configuration:${NC}"
    docker exec $NGINX_CONTAINER nginx -T 2>/dev/null | grep -A10 "upstream cryptus_app" || echo "Failed to get nginx config"
}

# Main script logic
case "${1:-}" in
    "deploy")
        deploy
        ;;
    "rollback")
        rollback
        ;;
    "status")
        status
        ;;
    "start")
        print_status "Starting all services..."
        docker compose -f $COMPOSE_FILE up -d
        print_success "Services started"
        ;;
    "stop")
        print_status "Stopping all services..."
        docker compose -f $COMPOSE_FILE down
        print_success "Services stopped"
        ;;
    "logs")
        docker compose -f $COMPOSE_FILE logs -f "${2:-}"
        ;;
    *)
        echo "Usage: $0 {deploy|rollback|status|start|stop|logs [service]}"
        echo ""
        echo "Commands:"
        echo "  deploy   - Deploy new version with zero downtime"
        echo "  rollback - Rollback to previous version"
        echo "  status   - Show current deployment status"
        echo "  start    - Start all services"
        echo "  stop     - Stop all services"
        echo "  logs     - Show logs (optionally for specific service)"
        exit 1
        ;;
esac 