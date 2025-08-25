####################
#      Config      #
####################

.PHONY: dev prod build-dev build-prod stop-dev stop-prod rm-dev rm-prod nextjs-logs mysql-logs nextjs-it mysql-it nextjs-db-shell mysql-db-shell

# Enable compose bake for better performance
BAKE = COMPOSE_BAKE=true

#############################
#    Image Compression      #
#############################

compress:
	@make -f Makefile.compress auto-compress

####################
#    Certificates  #
####################

# Generate SSL certificates if needed
certs-setup:
	@ ./docker/generate-mysql-ssl-certs.bash

# Reset the certs
certs-reset:
	@ echo "🧹 Resetting certs..."
	@ rm -rf ./docker/certs
	@ echo "🫧 Certs reset"

# Reload the certs
certs-reload:
	@ $(MAKE) certs-reset
	@ $(MAKE) certs-setup

####################
#     Hybrid env    #
####################

DC_HYBRID = docker compose -f docker/compose/compose.hybrid.yml --env-file .env.hybrid

# Build hybrid
build-hybrid:
	@ $(BAKE) $(DC_HYBRID) up -d --build

# Run hybrid
hybrid:
	@ $(DC_HYBRID) up -d

# Stop hybrid
stop-hybrid:
	@ $(DC_HYBRID) down

# Remove hybrid and volumes
rm-hybrid:
	@ $(DC_HYBRID) down -v

####################
#      Dev env     #
####################

DC_DEV = docker compose -f docker/compose/compose.dev.yml --env-file .env.dev

# Build dev
build-dev:
	@ $(BAKE) $(DC_DEV) up -d --build

# Run dev
dev:
	@ $(DC_DEV) up -d

# Stop dev
stop-dev:
	@ $(DC_DEV) down

# Remove dev and volumes
rm-dev:
	@ $(DC_DEV) down -v

####################
#     Prod env     #
####################

DC_PROD = docker compose -f docker/compose/compose.prod.yml --env-file .env.prod

# Build prod
build-prod:
	@ $(BAKE) $(DC_PROD) up -d --build

# Run prod
prod:
	@ $(DC_PROD) up -d

# Stop prod
stop-prod:
	@ $(DC_PROD) down

# Remove prod and volumes
rm-prod:
	@ $(DC_PROD) down -v

####################
#    Containers    #
####################

# Show the nextjs logs
nextjs-logs:
	@ docker logs -f nextjs

# Show the mysql logs
mysql-logs:
	@ docker logs -f mysql

# Connect to the nextjs container
nextjs-it:
	@ docker exec -it nextjs sh

# Connect to the mysql container
mysql-it:
	@ docker exec -it mysql sh

# Connect to the mysql instance through the nextjs container
nextjs-db-shell:
	@ docker exec -it nextjs sh -c " \
	    mysql -u root -p${MYSQL_ROOT_PASSWORD} -h mysql \
	    --ssl-ca=/app/docker/certs/ca.pem \
	    --ssl-cert=/app/docker/certs/client-cert.pem \
	    --ssl-key=/app/docker/certs/client-key.pem \
	"

# Connect to the mysql instance through the mysql container
mysql-db-shell:
	@ docker exec -it mysql bash -c "mysql -u root -p${MYSQL_ROOT_PASSWORD}"

####################
#   Docker Swarm   #
####################

# # Deploy to Docker Swarm
# swarm-deploy:
# 	@ $(MAKE) certs-setup
# 	@ echo "🚀 Deploying to Docker Swarm..."
# 	@ docker stack deploy -c compose.prod.yml --with-registry-auth eco-service

# # Update Docker Swarm deployment (rolling update)
# swarm-update:
# 	@ echo "🔄 Updating Docker Swarm deployment..."
# 	@ docker service update --image eco-service:latest eco-service_nextjs

# # Remove from Docker Swarm
# swarm-down:
# 	@ echo "🛑 Removing from Docker Swarm..."
# 	@ docker stack rm eco-service

# # Build production image
# build-prod:
# 	@ $(MAKE) certs-setup
# 	@ echo "🏗️ Building production image..."
# 	@ docker build -f docker/Dockerfile.prod -t eco-service:latest .
