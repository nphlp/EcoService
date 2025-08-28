#############################
#    Image Processing       #
#############################

.PHONY: image-resize image-compress image-blur

image-resize:
	@./scripts/resize-images.sh

image-compress:
	@./scripts/compress-images.sh

image-blur:
	@./scripts/blur-images.sh

####################
#    Certificates  #
####################

.PHONY: certs-setup certs-reset certs-reload

# Generate SSL certificates if needed
certs-setup:
	@./scripts/ssl-certs.sh setup

# Reset the certs
certs-reset:
	@./scripts/ssl-certs.sh reset

# Reload the certs
certs-reload:
	@./scripts/ssl-certs.sh reload

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
	@echo "⚠️ Warning: Compilation performances are slow in docker environments. Prefer using HYBRID MODE."
	@echo "✅ Nextjs and MySQL containers are running"
	@echo "✏️ MySQL container is exposed on internal network (3306)"
	@echo "📝 Access Next.js at http://localhost:3000"

hybrid:
	@ $(DC) -f docker/compose.hybrid.yml up -d --build
	@echo ""
	@echo "🔥 HYBRID MODE"
	@echo "✅ Only MySQL container is running"
	@echo "✏️ MySQL container is exposed on local network (3307)"
	@echo ""
	@echo "➡️ Now, run 'pnpm hybrid' to start Next.js locally with overridden .env file"
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
