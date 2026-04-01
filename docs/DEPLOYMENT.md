# SmartComfort Deployment Guide

## Overview

This guide covers deploying the SmartComfort HVAC optimization system in various environments, from development to production.

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)
- PostgreSQL 15+ (if not using Docker)
- Redis 7+ (if not using Docker)

## Quick Start with Docker

### 1. Clone and Setup
```bash
git clone <repository-url>
cd Bronco_Challenge
cp .env.example .env
# Edit .env with your configuration
```

### 2. Deploy with Docker Compose
```bash
# Basic deployment
docker-compose up -d

# With Power BI integration
docker-compose --profile powerbi up -d
```

### 3. Verify Deployment
```bash
# Check service status
docker-compose ps

# View logs
docker-compose logs -f smartcomfort-backend

# Test API
curl http://localhost:8000/
```

## Local Development Setup

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Set up database
createdb smartcomfort_db
# Run migrations (if using Alembic)
alembic upgrade head

# Start development server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Environment Configuration

### Required Environment Variables

#### Database
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string

#### API
- `SECRET_KEY`: JWT signing key
- `ENVIRONMENT`: development/staging/production

#### Optional (Power BI)
- `POWERBI_WORKSPACE_ID`: Power BI workspace ID
- `POWERBI_CLIENT_ID`: Power BI client ID
- `POWERBI_CLIENT_SECRET`: Power BI client secret

### Configuration Files

1. **`.env`**: Local environment variables
2. **`docker-compose.yml`**: Container orchestration
3. **`Dockerfile`**: Application container definition

## Production Deployment

### Option 1: Docker Compose (Recommended)

```bash
# Production deployment
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Option 2: Kubernetes

```bash
# Apply Kubernetes manifests
kubectl apply -f deployment/k8s/
```

### Option 3: Cloud Services

#### AWS ECS
```bash
# Build and push to ECR
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-west-2.amazonaws.com
docker build -t smartcomfort .
docker tag smartcomfort:latest <account-id>.dkr.ecr.us-west-2.amazonaws.com/smartcomfort:latest
docker push <account-id>.dkr.ecr.us-west-2.amazonaws.com/smartcomfort:latest

# Deploy to ECS
aws ecs create-service --cluster smartcomfort --service-name smartcomfort-api --task-definition smartcomfort-task
```

#### Azure Container Instances
```bash
# Deploy to Azure
az container create \
  --resource-group smartcomfort-rg \
  --name smartcomfort-api \
  --image smartcomfort:latest \
  --ports 8000 \
  --environment-variables DATABASE_URL=$DATABASE_URL SECRET_KEY=$SECRET_KEY
```

## Database Setup

### PostgreSQL
```sql
-- Create database
CREATE DATABASE smartcomfort_db;

-- Create user
CREATE USER smartcomfort WITH PASSWORD 'password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE smartcomfort_db TO smartcomfort;
```

### Redis
```bash
# Start Redis
redis-server --daemonize yes --port 6379

# Test connection
redis-cli ping
```

## SSL/HTTPS Setup

### Using Nginx
```nginx
server {
    listen 443 ssl;
    server_name smartcomfort.wmu.edu;
    
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    
    location / {
        proxy_pass http://smartcomfort-backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Using Let's Encrypt
```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot --nginx -d smartcomfort.wmu.edu

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Monitoring and Logging

### Application Logs
```bash
# Docker logs
docker-compose logs -f smartcomfort-backend

# File logs
tail -f logs/smartcomfort.log
```

### Health Checks
```bash
# API health
curl http://localhost:8000/api/health

# Database health
docker-compose exec postgres pg_isready -U smartcomfort

# Redis health
docker-compose exec redis redis-cli ping
```

### Metrics Collection
```bash
# Prometheus metrics endpoint
curl http://localhost:9090/metrics

# Custom metrics
curl http://localhost:8000/api/metrics
```

## Backup and Recovery

### Database Backup
```bash
# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
docker-compose exec postgres pg_dump -U smartcomfort smartcomfort_db > backup_$DATE.sql

# Restore
docker-compose exec -T postgres psql -U smartcomfort smartcomfort_db < backup_20231201_120000.sql
```

### Application Backup
```bash
# Backup data directory
tar -czf smartcomfort_backup_$(date +%Y%m%d).tar.gz data/

# Backup configuration
cp .env .env.backup.$(date +%Y%m%d)
```

## Scaling

### Horizontal Scaling
```yaml
# docker-compose.scale.yml
version: '3.8'
services:
  smartcomfort-backend:
    deploy:
      replicas: 3
    environment:
      - DATABASE_URL=postgresql://smartcomfort:password@postgres:5432/smartcomfort_db
```

### Load Balancing
```nginx
upstream smartcomfort_backend {
    server smartcomfort-backend-1:8000;
    server smartcomfort-backend-2:8000;
    server smartcomfort-backend-3:8000;
}

server {
    listen 80;
    location / {
        proxy_pass http://smartcomfort_backend;
    }
}
```

## Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **Database Security**: Use strong passwords, restrict access
3. **API Security**: Enable HTTPS, use rate limiting
4. **Container Security**: Use non-root users, minimal base images
5. **Network Security**: Firewall rules, VPN access

## Troubleshooting

### Common Issues

#### Database Connection
```bash
# Check if database is running
docker-compose ps postgres

# Test connection
docker-compose exec postgres psql -U smartcomfort -d smartcomfort_db -c "SELECT 1;"
```

#### API Not Responding
```bash
# Check logs
docker-compose logs smartcomfort-backend

# Check port binding
netstat -tulpn | grep 8000
```

#### Frontend Build Issues
```bash
# Clear node modules
rm -rf node_modules package-lock.json
npm install

# Check for memory issues
npm run build --max-old-space-size=4096
```

### Performance Optimization

1. **Database**: Add indexes, optimize queries
2. **Caching**: Implement Redis caching
3. **CDN**: Use CloudFlare/AWS CloudFront
4. **Compression**: Enable gzip compression
5. **Monitoring**: Set up APM tools

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Review logs weekly
- Backup database daily
- Monitor resource usage
- Update SSL certificates quarterly

### Updates
```bash
# Pull latest changes
git pull origin main

# Update containers
docker-compose pull

# Restart with new images
docker-compose up -d --force-recreate
```

## Support

For deployment issues:
1. Check logs: `docker-compose logs`
2. Verify environment variables
3. Test database connectivity
4. Check resource usage
5. Review this documentation

Contact: smartcomfort-support@wmich.edu
