#!/bin/bash

# Advanced Cryptus Cluster Manager
# Manages zero downtime deployments with monitoring and automation

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
MAIN_COMPOSE="docker-compose.zero-downtime.yml"
MONITORING_COMPOSE="docker-compose.monitoring.yml"
PROJECT_NAME="cryptus"
HEALTH_CHECK_URL="http://localhost/api/health"
PROMETHEUS_URL="http://localhost:9090"
GRAFANA_URL="http://localhost:3001"

# Function to print colored output
print_header() {
    echo -e "\n${PURPLE}=== $1 ===${NC}\n"
}

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

print_cyan() {
    echo -e "${CYAN}$1${NC}"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info >/dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker first."
        exit 1
    fi
}

# Function to create network if it doesn't exist
ensure_network() {
    if ! docker network ls | grep -q "cryptus-network"; then
        print_status "Creating Docker network..."
        docker network create cryptus-network
        print_success "Network created"
    fi
}

# Function to start the entire stack
start_stack() {
    print_header "Starting Cryptus Zero Downtime Stack"
    
    check_docker
    ensure_network
    
    print_status "Starting main application stack..."
    docker compose -f $MAIN_COMPOSE up -d
    
    print_status "Starting monitoring stack..."
    docker compose -f $MONITORING_COMPOSE up -d
    
    # Wait for services to be ready
    print_status "Waiting for services to be ready..."
    sleep 30
    
    # Check health
    check_all_health
    
    print_success "Stack started successfully!"
    print_access_info
}

# Function to stop the entire stack
stop_stack() {
    print_header "Stopping Cryptus Stack"
    
    print_status "Stopping monitoring stack..."
    docker compose -f $MONITORING_COMPOSE down
    
    print_status "Stopping main application stack..."
    docker compose -f $MAIN_COMPOSE down
    
    print_success "Stack stopped successfully!"
}

# Function to restart the entire stack
restart_stack() {
    print_header "Restarting Cryptus Stack"
    stop_stack
    sleep 5
    start_stack
}

# Function to check health of all services
check_all_health() {
    print_header "Health Check Status"
    
    # Check main application
    print_cyan "Application Health:"
    if curl -s $HEALTH_CHECK_URL >/dev/null; then
        local health_data=$(curl -s $HEALTH_CHECK_URL)
        echo "$health_data" | jq . 2>/dev/null || echo "$health_data"
        print_success "Application is healthy"
    else
        print_error "Application is not responding"
    fi
    
    echo ""
    
    # Check monitoring services
    print_cyan "Monitoring Services:"
    
    # Prometheus
    if curl -s "$PROMETHEUS_URL/-/healthy" >/dev/null 2>&1; then
        print_success "Prometheus is healthy"
    else
        print_warning "Prometheus is not responding"
    fi
    
    # Grafana
    if curl -s "$GRAFANA_URL/api/health" >/dev/null 2>&1; then
        print_success "Grafana is healthy"
    else
        print_warning "Grafana is not responding"
    fi
    
    # Container status
    echo ""
    print_cyan "Container Status:"
    docker compose -f $MAIN_COMPOSE ps
    echo ""
    docker compose -f $MONITORING_COMPOSE ps
}

# Function to show access information
print_access_info() {
    print_header "Access Information"
    
    print_cyan "Main Services:"
    echo "🌐 Application: http://localhost"
    echo "📊 Grafana: $GRAFANA_URL (admin/cryptus123)"
    echo "📈 Prometheus: $PROMETHEUS_URL"
    echo "🖥️  cAdvisor: http://localhost:8080"
    echo "📋 Node Exporter: http://localhost:9100"
    
    echo ""
    print_cyan "Health Endpoints:"
    echo "🏥 App Health: $HEALTH_CHECK_URL"
    echo "🏥 Nginx Health: http://localhost/nginx-health"
    echo "📊 Nginx Status: http://localhost/nginx_status"
}

# Function to show logs
show_logs() {
    local service=$1
    local follow=${2:-false}
    
    if [ -z "$service" ]; then
        print_status "Available services:"
        docker compose -f $MAIN_COMPOSE config --services
        docker compose -f $MONITORING_COMPOSE config --services
        return
    fi
    
    # Check which compose file contains the service
    if docker compose -f $MAIN_COMPOSE config --services | grep -q "^$service$"; then
        if [ "$follow" = "true" ]; then
            docker compose -f $MAIN_COMPOSE logs -f "$service"
        else
            docker compose -f $MAIN_COMPOSE logs "$service"
        fi
    elif docker compose -f $MONITORING_COMPOSE config --services | grep -q "^$service$"; then
        if [ "$follow" = "true" ]; then
            docker compose -f $MONITORING_COMPOSE logs -f "$service"
        else
            docker compose -f $MONITORING_COMPOSE logs "$service"
        fi
    else
        print_error "Service '$service' not found"
        return 1
    fi
}

# Function to scale services
scale_service() {
    local service=$1
    local replicas=$2
    
    if [ -z "$service" ] || [ -z "$replicas" ]; then
        print_error "Usage: scale <service> <replicas>"
        return 1
    fi
    
    print_status "Scaling $service to $replicas replicas..."
    docker compose -f $MAIN_COMPOSE up -d --scale "$service=$replicas"
    print_success "Service scaled successfully"
}

# Function to backup data
backup_data() {
    local backup_dir="./backups/$(date +%Y%m%d_%H%M%S)"
    
    print_header "Creating Backup"
    print_status "Creating backup directory: $backup_dir"
    mkdir -p "$backup_dir"
    
    # Backup volumes
    print_status "Backing up volumes..."
    
    # Redis data
    if docker volume ls | grep -q "cryptus_redis_data"; then
        docker run --rm \
            -v cryptus_redis_data:/data \
            -v "$(pwd)/$backup_dir":/backup \
            alpine tar czf /backup/redis_data.tar.gz -C /data .
        print_success "Redis data backed up"
    fi
    
    # Prometheus data
    if docker volume ls | grep -q "cryptus_prometheus_data"; then
        docker run --rm \
            -v cryptus_prometheus_data:/data \
            -v "$(pwd)/$backup_dir":/backup \
            alpine tar czf /backup/prometheus_data.tar.gz -C /data .
        print_success "Prometheus data backed up"
    fi
    
    # Grafana data
    if docker volume ls | grep -q "cryptus_grafana_data"; then
        docker run --rm \
            -v cryptus_grafana_data:/data \
            -v "$(pwd)/$backup_dir":/backup \
            alpine tar czf /backup/grafana_data.tar.gz -C /data .
        print_success "Grafana data backed up"
    fi
    
    # Application logs
    if docker volume ls | grep -q "cryptus_cryptus_logs"; then
        docker run --rm \
            -v cryptus_cryptus_logs:/data \
            -v "$(pwd)/$backup_dir":/backup \
            alpine tar czf /backup/app_logs.tar.gz -C /data .
        print_success "Application logs backed up"
    fi
    
    print_success "Backup completed: $backup_dir"
}

# Function to restore data
restore_data() {
    local backup_dir=$1
    
    if [ -z "$backup_dir" ] || [ ! -d "$backup_dir" ]; then
        print_error "Usage: restore <backup_directory>"
        print_status "Available backups:"
        ls -la ./backups/ 2>/dev/null || print_warning "No backups found"
        return 1
    fi
    
    print_header "Restoring from Backup"
    print_warning "This will stop all services and restore data!"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_status "Restore cancelled"
        return 0
    fi
    
    # Stop services
    stop_stack
    
    # Restore volumes
    print_status "Restoring volumes from $backup_dir..."
    
    if [ -f "$backup_dir/redis_data.tar.gz" ]; then
        docker run --rm \
            -v cryptus_redis_data:/data \
            -v "$(pwd)/$backup_dir":/backup \
            alpine sh -c "cd /data && tar xzf /backup/redis_data.tar.gz"
        print_success "Redis data restored"
    fi
    
    if [ -f "$backup_dir/prometheus_data.tar.gz" ]; then
        docker run --rm \
            -v cryptus_prometheus_data:/data \
            -v "$(pwd)/$backup_dir":/backup \
            alpine sh -c "cd /data && tar xzf /backup/prometheus_data.tar.gz"
        print_success "Prometheus data restored"
    fi
    
    if [ -f "$backup_dir/grafana_data.tar.gz" ]; then
        docker run --rm \
            -v cryptus_grafana_data:/data \
            -v "$(pwd)/$backup_dir":/backup \
            alpine sh -c "cd /data && tar xzf /backup/grafana_data.tar.gz"
        print_success "Grafana data restored"
    fi
    
    if [ -f "$backup_dir/app_logs.tar.gz" ]; then
        docker run --rm \
            -v cryptus_cryptus_logs:/data \
            -v "$(pwd)/$backup_dir":/backup \
            alpine sh -c "cd /data && tar xzf /backup/app_logs.tar.gz"
        print_success "Application logs restored"
    fi
    
    print_success "Restore completed!"
    print_status "Starting services..."
    start_stack
}

# Function to clean up old resources
cleanup() {
    print_header "Cleanup"
    
    print_status "Removing unused Docker resources..."
    docker system prune -f
    
    print_status "Removing unused volumes..."
    docker volume prune -f
    
    print_status "Removing unused networks..."
    docker network prune -f
    
    print_success "Cleanup completed!"
}

# Function to update all images
update_images() {
    print_header "Updating Images"
    
    print_status "Pulling latest images..."
    docker compose -f $MAIN_COMPOSE pull
    docker compose -f $MONITORING_COMPOSE pull
    
    print_status "Rebuilding custom images..."
    docker compose -f $MAIN_COMPOSE build --no-cache
    
    print_success "Images updated!"
    print_warning "Run 'deploy' to apply updates with zero downtime"
}

# Function to show system resources
show_resources() {
    print_header "System Resources"
    
    print_cyan "Docker System Info:"
    docker system df
    
    echo ""
    print_cyan "Container Resource Usage:"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"
    
    echo ""
    print_cyan "Volume Usage:"
    docker volume ls -q | xargs docker volume inspect | jq -r '.[] | "\(.Name): \(.Mountpoint)"'
}

# Function to run zero downtime deployment
deploy() {
    print_header "Zero Downtime Deployment"
    ./deploy-zero-downtime.sh deploy
}

# Function to rollback
rollback() {
    print_header "Rollback"
    ./deploy-zero-downtime.sh rollback
}

# Function to show deployment status
status() {
    print_header "Deployment Status"
    ./deploy-zero-downtime.sh status
}

# Function to show usage
show_usage() {
    echo "Cryptus Cluster Manager - Advanced Zero Downtime Deployment"
    echo ""
    echo "Usage: $0 <command> [arguments]"
    echo ""
    echo "Main Commands:"
    echo "  start                    - Start the entire stack (app + monitoring)"
    echo "  stop                     - Stop the entire stack"
    echo "  restart                  - Restart the entire stack"
    echo "  deploy                   - Deploy new version with zero downtime"
    echo "  rollback                 - Rollback to previous version"
    echo "  status                   - Show deployment status"
    echo ""
    echo "Management Commands:"
    echo "  health                   - Check health of all services"
    echo "  logs <service> [follow]  - Show logs for specific service"
    echo "  scale <service> <count>  - Scale service to specified replicas"
    echo "  update                   - Update all Docker images"
    echo "  cleanup                  - Clean up unused Docker resources"
    echo "  resources                - Show system resource usage"
    echo ""
    echo "Data Commands:"
    echo "  backup                   - Create backup of all data"
    echo "  restore <backup_dir>     - Restore from backup"
    echo ""
    echo "Access Info:"
    echo "  access                   - Show access URLs and credentials"
    echo ""
    echo "Examples:"
    echo "  $0 start                 # Start everything"
    echo "  $0 deploy                # Deploy with zero downtime"
    echo "  $0 logs nginx true       # Follow nginx logs"
    echo "  $0 scale cryptus-blue 2  # Scale blue instance to 2 replicas"
    echo "  $0 backup                # Create backup"
}

# Main script logic
case "${1:-}" in
    "start")
        start_stack
        ;;
    "stop")
        stop_stack
        ;;
    "restart")
        restart_stack
        ;;
    "deploy")
        deploy
        ;;
    "rollback")
        rollback
        ;;
    "status")
        status
        ;;
    "health")
        check_all_health
        ;;
    "logs")
        show_logs "${2:-}" "${3:-false}"
        ;;
    "scale")
        scale_service "$2" "$3"
        ;;
    "backup")
        backup_data
        ;;
    "restore")
        restore_data "$2"
        ;;
    "cleanup")
        cleanup
        ;;
    "update")
        update_images
        ;;
    "resources")
        show_resources
        ;;
    "access")
        print_access_info
        ;;
    *)
        show_usage
        exit 1
        ;;
esac 