.PHONY: dev prod certs-setup certs-reset certs-reload nextjs-logs nextjs-it nextjs-db-shell mysql-logs mysql-it mysql-db-shell

# Enable compose bake for better performance
DOCKER_COMP_BAKE = COMPOSE_BAKE=true

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

# Run the dev environment
dev:
	@ $(MAKE) certs-setup
	@ $(DOCKER_COMP_BAKE) docker compose --env-file .env.dev up --build -d

# Run the prod environment
prod:
	@ $(MAKE) certs-setup
	@ $(DOCKER_COMP_BAKE) docker compose --env-file .env.prod up --build -d

# Show the nextjs logs
nextjs-logs:
	@ docker logs -f nextjs

# Connect to the nextjs container
nextjs-it:
	@ docker exec -it nextjs sh

nextjs-db-shell:
	@ docker exec -it nextjs sh -c " \
	    mysql -u root -p${MYSQL_ROOT_PASSWORD} -h mysql \
	    --ssl-ca=/app/docker/certs/ca.pem \
	    --ssl-cert=/app/docker/certs/client-cert.pem \
	    --ssl-key=/app/docker/certs/client-key.pem \
	"

# Show the mysql logs
mysql-logs:
	@ docker logs -f mysql

# Connect to the mysql container
mysql-it:
	@ docker exec -it mysql sh

# Connect to the mysql instance
mysql-db-shell:
	@ docker exec -it mysql bash -c "mysql -u root -p${MYSQL_ROOT_PASSWORD}"
