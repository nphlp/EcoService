# Enable compose bake for better performance
DOCKER_COMP_BAKE = COMPOSE_BAKE=true

# Run the dev environment
dev:
	$(DOCKER_COMP_BAKE) docker compose --env-file .env.dev up --build -d

# Run the prod environment
prod:
	$(DOCKER_COMP_BAKE) docker compose --env-file .env.prod up --build -d

# Show the nextjs logs
nextjs:
	docker logs -f nextjs

# Show the mysql logs
mysql:
	docker logs -f mysql

# Connect to the mysql instance
mysql-it:
	docker exec -it mysql bash -c "mysql -u root -p"
