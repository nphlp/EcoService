#############################
#    Image Compression      #
#############################

.PHONY: compress

compress:
	@make -f Makefile.compress auto-compress

####################
#    Certificates  #
####################

.PHONY: certs-setup certs-reset certs-reload

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
#      Docker      #
####################

.PHONY: local dev hybrid prod

DC = COMPOSE_BAKE=true docker compose -f compose.yml

local:
	@pnpm run auto
	@echo ""
	@echo "🔥 LOCAL MODE"
	@echo "✅ Not any container is running"
	@echo "✏️ MySQL local service is exposed on local network (3306)"
	@echo "📝 Access Next.js at http://localhost:3000"

dev:
	@ $(DC) -f docker/compose.dev.yml up -d --build
	@echo ""
	@echo "🔥 DEV MODE"
	@echo "✅ Nextjs and MySQL containers are running"
	@echo "✏️ MySQL container is exposed on internal network (3306)"
	@echo "📝 Access Next.js at http://localhost:3000"

hybrid:
	@ $(DC) up -d --build
	@echo ""
	@echo "🔥 HYBRID MODE"
	@echo "✅ Only MySQL container is running"
	@echo "✏️ MySQL container is exposed on local network (3307)"
	@echo ""
	@echo "➡️ Now, run 'pnpm auto:hybrid' to start Next.js locally with overridden .env file"
	@echo "📝 Access Next.js at http://localhost:3000"

prod:
	@ $(DC) -f docker/compose.prod.yml up -d --build
	@echo ""
	@echo "🔥 PRODUCTION MODE"
	@echo "✅ Nextjs and MySQL containers are running"
	@echo "✏️ MySQL container is exposed on internal network (3306)"
	@echo "📝 Access Next.js at http://localhost:3000"

####################
#     Commands     #
####################

.PHONY: stop clean

stop:
	@docker compose down
	@echo "🫧 All containers stopped"

clean:
	@docker compose down -v
	@echo "🧹 All containers and volumes removed"

#########################
#    Containers Logs    #
#########################

.PHONY: logs-nextjs logs-mysql

logs-nextjs:
	@docker logs -f nextjs

logs-mysql:
	@docker logs -f mysql

#########################
#      Shell access     #
#########################

.PHONY: shell-nextjs shell-mysql shell-mysql-db

shell-nextjs:
	@docker exec -it nextjs sh

shell-mysql:
	@docker exec -it mysql sh

shell-mysql-db:
	@docker exec -it mysql mysql -u root -p${MYSQL_ROOT_PASSWORD}
