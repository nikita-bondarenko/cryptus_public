#!/bin/bash

# Test Script for Zero Downtime Deployment System
# Validates all components and functionality

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configuration
HEALTH_URL="http://localhost/api/health"
PROMETHEUS_URL="http://localhost:9090"
GRAFANA_URL="http://localhost:3001"
TEST_DURATION=60  # seconds

# Counters
TESTS_PASSED=0
TESTS_FAILED=0

print_test() {
    echo -e "${BLUE}[TEST]${NC} $1"
}

print_pass() {
    echo -e "${GREEN}[PASS]${NC} $1"
    ((TESTS_PASSED++))
}

print_fail() {
    echo -e "${RED}[FAIL]${NC} $1"
    ((TESTS_FAILED++))
}

print_info() {
    echo -e "${YELLOW}[INFO]${NC} $1"
}

# Test Docker availability
test_docker() {
    print_test "Testing Docker availability..."
    
    if docker info >/dev/null 2>&1; then
        print_pass "Docker is running"
    else
        print_fail "Docker is not running"
        return 1
    fi
}

# Test network existence
test_network() {
    print_test "Testing Docker network..."
    
    if docker network ls | grep -q "cryptus-network"; then
        print_pass "cryptus-network exists"
    else
        print_fail "cryptus-network not found"
        return 1
    fi
}

# Test containers are running
test_containers() {
    print_test "Testing container status..."
    
    local containers=("cryptus_nginx" "cryptus_blue" "cryptus_green" "cryptus_redis")
    local failed=0
    
    for container in "${containers[@]}"; do
        if docker ps | grep -q "$container"; then
            print_pass "$container is running"
        else
            print_fail "$container is not running"
            ((failed++))
        fi
    done
    
    return $failed
}

# Test health endpoints
test_health_endpoints() {
    print_test "Testing health endpoints..."
    
    # Main health endpoint
    if curl -s -f "$HEALTH_URL" >/dev/null; then
        local health_data=$(curl -s "$HEALTH_URL")
        if echo "$health_data" | grep -q '"status":"healthy"'; then
            print_pass "Main health endpoint is healthy"
        else
            print_fail "Main health endpoint returned non-healthy status"
        fi
    else
        print_fail "Main health endpoint is not accessible"
    fi
    
    # Nginx health
    if curl -s -f "http://localhost/nginx-health" >/dev/null; then
        print_pass "Nginx health endpoint is accessible"
    else
        print_fail "Nginx health endpoint is not accessible"
    fi
    
    # Direct container health checks
    for instance in blue green; do
        if docker exec "cryptus_$instance" curl -s -f "http://localhost:3000/api/health" >/dev/null 2>&1; then
            print_pass "$instance instance health check passed"
        else
            print_fail "$instance instance health check failed"
        fi
    done
}

# Test monitoring stack
test_monitoring() {
    print_test "Testing monitoring stack..."
    
    # Prometheus
    if curl -s -f "$PROMETHEUS_URL/-/healthy" >/dev/null 2>&1; then
        print_pass "Prometheus is healthy"
    else
        print_fail "Prometheus is not accessible"
    fi
    
    # Grafana
    if curl -s -f "$GRAFANA_URL/api/health" >/dev/null 2>&1; then
        print_pass "Grafana is healthy"
    else
        print_fail "Grafana is not accessible"
    fi
    
    # Check if targets are being scraped
    if curl -s "$PROMETHEUS_URL/api/v1/targets" | grep -q '"health":"up"'; then
        print_pass "Prometheus targets are being scraped"
    else
        print_fail "Prometheus targets are not being scraped properly"
    fi
}

# Test load balancer functionality
test_load_balancer() {
    print_test "Testing load balancer functionality..."
    
    # Test basic connectivity
    if curl -s -f "http://localhost" >/dev/null; then
        print_pass "Load balancer is responding"
    else
        print_fail "Load balancer is not responding"
        return 1
    fi
    
    # Test which instance is active
    local health_response=$(curl -s "$HEALTH_URL")
    if echo "$health_response" | grep -q '"instance"'; then
        local active_instance=$(echo "$health_response" | grep -o '"instance":"[^"]*"' | cut -d'"' -f4)
        print_pass "Active instance detected: $active_instance"
    else
        print_fail "Could not determine active instance"
    fi
}

# Test Redis connectivity
test_redis() {
    print_test "Testing Redis connectivity..."
    
    if docker exec cryptus_redis redis-cli ping | grep -q "PONG"; then
        print_pass "Redis is responding to ping"
    else
        print_fail "Redis is not responding"
    fi
}

# Test deployment script functionality
test_deployment_script() {
    print_test "Testing deployment script functionality..."
    
    if [ -x "./deploy-zero-downtime.sh" ]; then
        print_pass "Deployment script is executable"
    else
        print_fail "Deployment script is not executable"
    fi
    
    # Test status command
    if ./deploy-zero-downtime.sh status >/dev/null 2>&1; then
        print_pass "Deployment script status command works"
    else
        print_fail "Deployment script status command failed"
    fi
}

# Test cluster manager script
test_cluster_manager() {
    print_test "Testing cluster manager script..."
    
    if [ -x "./cryptus-cluster-manager.sh" ]; then
        print_pass "Cluster manager script is executable"
    else
        print_fail "Cluster manager script is not executable"
    fi
    
    # Test health command
    if ./cryptus-cluster-manager.sh health >/dev/null 2>&1; then
        print_pass "Cluster manager health command works"
    else
        print_fail "Cluster manager health command failed"
    fi
}

# Load test (basic)
test_load() {
    print_test "Running basic load test..."
    
    print_info "Sending requests for $TEST_DURATION seconds..."
    
    local start_time=$(date +%s)
    local end_time=$((start_time + TEST_DURATION))
    local request_count=0
    local failed_requests=0
    
    while [ $(date +%s) -lt $end_time ]; do
        if curl -s -f "$HEALTH_URL" >/dev/null; then
            ((request_count++))
        else
            ((failed_requests++))
        fi
        sleep 1
    done
    
    local success_rate=$((100 * request_count / (request_count + failed_requests)))
    
    if [ $success_rate -ge 95 ]; then
        print_pass "Load test completed: $request_count/$((request_count + failed_requests)) requests successful ($success_rate%)"
    else
        print_fail "Load test failed: Only $success_rate% success rate"
    fi
}

# Test zero downtime deployment simulation
test_zero_downtime_simulation() {
    print_test "Testing zero downtime deployment simulation..."
    
    print_info "Starting continuous health checks..."
    
    # Start background health checking
    local temp_file="/tmp/health_check_results"
    local test_duration=30
    
    (
        local count=0
        local failures=0
        local end_time=$(($(date +%s) + test_duration))
        
        while [ $(date +%s) -lt $end_time ]; do
            if curl -s -f "$HEALTH_URL" >/dev/null 2>&1; then
                ((count++))
            else
                ((failures++))
            fi
            sleep 1
        done
        
        echo "$count,$failures" > "$temp_file"
    ) &
    
    local health_check_pid=$!
    
    # Give health checking a moment to start
    sleep 5
    
    # Simulate deployment by restarting one container
    print_info "Simulating deployment by restarting green instance..."
    docker compose -f docker-compose.zero-downtime.yml restart cryptus-green >/dev/null 2>&1
    
    # Wait for health checking to complete
    wait $health_check_pid
    
    # Read results
    if [ -f "$temp_file" ]; then
        local results=$(cat "$temp_file")
        local success_count=$(echo "$results" | cut -d',' -f1)
        local failure_count=$(echo "$results" | cut -d',' -f2)
        local total=$((success_count + failure_count))
        
        if [ $total -gt 0 ]; then
            local availability=$((100 * success_count / total))
            
            if [ $availability -ge 95 ]; then
                print_pass "Zero downtime test: $availability% availability during restart"
            else
                print_fail "Zero downtime test failed: Only $availability% availability"
            fi
        else
            print_fail "Zero downtime test: No requests completed"
        fi
        
        rm -f "$temp_file"
    else
        print_fail "Zero downtime test: Could not read results"
    fi
}

# Summary
print_summary() {
    echo ""
    echo "=================================="
    echo "           TEST SUMMARY"
    echo "=================================="
    echo -e "Tests Passed: ${GREEN}$TESTS_PASSED${NC}"
    echo -e "Tests Failed: ${RED}$TESTS_FAILED${NC}"
    echo -e "Total Tests:  $((TESTS_PASSED + TESTS_FAILED))"
    
    if [ $TESTS_FAILED -eq 0 ]; then
        echo -e "\n${GREEN}🎉 All tests passed! Zero downtime system is working correctly.${NC}"
        return 0
    else
        echo -e "\n${RED}❌ Some tests failed. Please check the issues above.${NC}"
        return 1
    fi
}

# Main test execution
main() {
    echo "================================================"
    echo "    Zero Downtime Deployment System Test"
    echo "================================================"
    echo ""
    
    # Basic tests
    test_docker || exit 1
    test_network
    test_containers
    
    # Functionality tests
    test_health_endpoints
    test_load_balancer
    test_redis
    test_monitoring
    
    # Script tests
    test_deployment_script
    test_cluster_manager
    
    # Performance tests
    if [ "${1:-}" = "--full" ]; then
        test_load
        test_zero_downtime_simulation
    else
        print_info "Skipping load tests. Use --full flag to run complete test suite."
    fi
    
    # Summary
    print_summary
}

# Run tests
case "${1:-}" in
    "--help"|"-h")
        echo "Usage: $0 [--full] [--help]"
        echo ""
        echo "Options:"
        echo "  --full    Run complete test suite including load tests"
        echo "  --help    Show this help message"
        exit 0
        ;;
    *)
        main "$@"
        ;;
esac 