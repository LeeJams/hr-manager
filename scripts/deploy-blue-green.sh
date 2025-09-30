#!/bin/bash

###############################################################################
# Blue-Green Deployment Script for TechMeet HR Manager
###############################################################################
# This script automates the blue-green deployment process:
# 1. Build the new version
# 2. Deploy to inactive environment (blue or green)
# 3. Run health checks
# 4. Switch traffic if health checks pass
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BLUE_PORT=3000
GREEN_PORT=3001
HEALTH_CHECK_RETRIES=5
HEALTH_CHECK_INTERVAL=5

# Current active environment (read from config or default to blue)
CURRENT_ENV="${CURRENT_ENV:-blue}"

###############################################################################
# Helper Functions
###############################################################################

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

###############################################################################
# Determine target environment
###############################################################################

if [ "$CURRENT_ENV" = "blue" ]; then
    TARGET_ENV="green"
    TARGET_PORT=$GREEN_PORT
    CURRENT_PORT=$BLUE_PORT
else
    TARGET_ENV="blue"
    TARGET_PORT=$BLUE_PORT
    CURRENT_PORT=$GREEN_PORT
fi

log_info "Current active environment: ${CURRENT_ENV} (port ${CURRENT_PORT})"
log_info "Target deployment environment: ${TARGET_ENV} (port ${TARGET_PORT})"

###############################################################################
# Build the application
###############################################################################

log_info "Building application for ${TARGET_ENV} environment..."

if npm run "deploy:${TARGET_ENV}"; then
    log_success "Build completed successfully"
else
    log_error "Build failed"
    exit 1
fi

###############################################################################
# Deploy to target environment
###############################################################################

log_info "Deploying to ${TARGET_ENV} environment on port ${TARGET_PORT}..."

# Stop existing process on target port if running
if lsof -Pi :${TARGET_PORT} -sTCP:LISTEN -t >/dev/null ; then
    log_warning "Stopping existing process on port ${TARGET_PORT}..."
    kill -9 $(lsof -t -i:${TARGET_PORT}) 2>/dev/null || true
    sleep 2
fi

# Start the application on target port
export PORT=$TARGET_PORT
export NODE_ENV=production
export DEPLOYMENT_ENV=$TARGET_ENV

log_info "Starting application on port ${TARGET_PORT}..."
npm run start:prod > "/tmp/hr-manager-${TARGET_ENV}.log" 2>&1 &
APP_PID=$!

log_info "Application started with PID: ${APP_PID}"
sleep 5

###############################################################################
# Health Check
###############################################################################

log_info "Running health checks..."

HEALTH_CHECK_SUCCESS=false

for i in $(seq 1 $HEALTH_CHECK_RETRIES); do
    log_info "Health check attempt $i/$HEALTH_CHECK_RETRIES..."

    if PORT=$TARGET_PORT npm run health-check; then
        HEALTH_CHECK_SUCCESS=true
        log_success "Health check passed on attempt $i"
        break
    else
        if [ $i -lt $HEALTH_CHECK_RETRIES ]; then
            log_warning "Health check failed, retrying in ${HEALTH_CHECK_INTERVAL}s..."
            sleep $HEALTH_CHECK_INTERVAL
        fi
    fi
done

if [ "$HEALTH_CHECK_SUCCESS" = false ]; then
    log_error "Health checks failed after $HEALTH_CHECK_RETRIES attempts"
    log_error "Rolling back deployment..."
    kill -9 $APP_PID 2>/dev/null || true
    exit 1
fi

###############################################################################
# Switch Traffic (Update Load Balancer / Reverse Proxy)
###############################################################################

log_info "Switching traffic to ${TARGET_ENV} environment..."

# Update your load balancer or reverse proxy configuration here
# Example for nginx:
# sed -i "s/proxy_pass http:\/\/localhost:[0-9]*/proxy_pass http:\/\/localhost:${TARGET_PORT}/" /etc/nginx/sites-available/hr-manager
# nginx -s reload

# For this example, we'll create a config file
echo "$TARGET_ENV" > ".deployment-config"
log_success "Traffic switched to ${TARGET_ENV} (port ${TARGET_PORT})"

###############################################################################
# Cleanup old environment
###############################################################################

log_info "Cleaning up old ${CURRENT_ENV} environment..."

if lsof -Pi :${CURRENT_PORT} -sTCP:LISTEN -t >/dev/null ; then
    log_info "Stopping old process on port ${CURRENT_PORT}..."
    kill -9 $(lsof -t -i:${CURRENT_PORT}) 2>/dev/null || true
    log_success "Old environment stopped"
else
    log_info "No process running on old port ${CURRENT_PORT}"
fi

###############################################################################
# Summary
###############################################################################

log_success "================================================"
log_success "Deployment completed successfully!"
log_success "================================================"
log_success "Active environment: ${TARGET_ENV}"
log_success "Active port: ${TARGET_PORT}"
log_success "Application PID: ${APP_PID}"
log_success "================================================"

# Save current environment for next deployment
export CURRENT_ENV=$TARGET_ENV

echo ""
log_info "To rollback, run: CURRENT_ENV=${TARGET_ENV} ./scripts/deploy-blue-green.sh"