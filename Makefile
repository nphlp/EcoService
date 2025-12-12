# Import environment variables from .env if it exists
ifneq (,$(wildcard .env))
    include .env
endif

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

####################################
#    Clean none versionned files   #
####################################

clean:
	rm -rf .husky/_ .next node_modules prisma/client next-env.d.ts tsconfig.tsbuildinfo

########################
#    Merge Env Files   #
########################

BASE = .env

OVERRIDE_BASIC = env/.env.override.basic
OVERRIDE_PREVIEW = env/.env.override.preview
OVERRIDE_PRODUCTION = env/.env.override.production

OUTPUT_BASIC = .env.basic
OUTPUT_PREVIEW = .env.preview
OUTPUT_PRODUCTION = .env.production

# Setup environment files if they don't exist
.PHONY: setup-env merge-env-basic merge-env-preview merge-env-production

setup-env:
	@if [ ! -f .env ]; then \
		cp env/.env.example .env; \
		echo "✅ Created .env from env/.env.example"; \
	else \
		echo "📝 .env already exists"; \
	fi

merge-env-basic:
	@if [ ! -f env/.env.override.basic ]; then \
		cp env/.env.override.basic.example env/.env.override.basic; \
		echo "✅ Created env/.env.override.basic from example"; \
	else \
		echo "📝 env/.env.override.basic already exists"; \
	fi
	@./scripts/merge-env.sh --base $(BASE) --override $(OVERRIDE_BASIC) --output $(OUTPUT_BASIC)

# Used for VPS preview deployments environment
merge-env-preview:
	@if [ ! -f env/.env.override.preview ]; then \
		cp env/.env.override.preview.example env/.env.override.preview; \
		echo "✅ Created env/.env.override.preview from example"; \
	else \
		echo "📝 env/.env.override.preview already exists"; \
	fi
	@./scripts/merge-env.sh --base $(BASE) --override $(OVERRIDE_PREVIEW) --output $(OUTPUT_PREVIEW)

# Used for VPS production deployments environment
merge-env-production:
	@if [ ! -f env/.env.override.production ]; then \
		cp env/.env.override.production.example env/.env.override.production; \
		echo "✅ Created env/.env.override.production from example"; \
	else \
		echo "📝 env/.env.override.production already exists"; \
	fi
	@./scripts/merge-env.sh --base $(BASE) --override $(OVERRIDE_PRODUCTION) --output $(OUTPUT_PRODUCTION)

#####################
#   Nextjs server   #
#####################

DC = BUILDKIT_PROGRESS=plain COMPOSE_BAKE=true docker compose

POSTGRES = docker/compose.postgres.yml
BASIC = docker/compose.basic.yml

# Start a Postgres standalone
# -> Used in the following commands: dev, prod, ngrok
.PHONY: postgres postgres-stop postgres-clear

postgres:
	@make setup-env
	$(DC) --env-file .env -f $(POSTGRES) up -d --build
	@echo "🚀 Postgres is running on port 5432"
	@echo "📝 Now start Nextjs with 'pnpm auto'"
	@echo "🌍 Access the app at: http://localhost:3000 ✅"
	@echo "🔐 Then start Prisma Studio with 'pnpm prisma:studio'"
	@echo "🗃️ Visualise data at : http://localhost:5555 🔥"

postgres-stop:
	$(DC) --env-file .env -f $(POSTGRES) down

postgres-clear:
	$(DC) --env-file .env -f $(POSTGRES) down -v

# One command to start Dev, Prod or Ngrok
# -> Nextjs in terminal + Postgres in docker
# -> CMD/CTRL+C to stop both
.PHONY: dev start ngrok

# For local development server -> http://localhost:3000
# -> Best performance for hot-reloading
dev:
	@make postgres
	@pnpm auto && make postgres-stop

# For local build server for testing -> http://localhost:3000
# -> Check everything works before deploying to VPS
start:
	@make postgres
	@pnpm auto:start && make postgres-stop

# For tunneling with Ngrok -> https://your-static-url.ngrok-free.app
# -> Useful for mobile debugging, functional testing or sharing with others
ngrok:
	@if [ -z "$(NGROK_URL)" ]; then \
		echo; \
		echo "ℹ️ NGROK_URL is not set in .env file"; \
		echo; \
		echo "1. Create an account at https://ngrok.com/"; \
		echo "2. Setup your authtoken from https://dashboard.ngrok.com/get-started/setup"; \
		echo "3. Get a static URL for free at https://dashboard.ngrok.com/domains"; \
		echo "4. Add the NGROK_URL to your .env file"; \
		echo; \
		echo "Then, run 'make ngrok' to start the tunnel 🔥"; \
		echo; \
	else \
		if curl -s http://localhost:3000 > /dev/null 2>&1; then \
			echo "🚀 Starting ngrok tunnel for: $(NGROK_URL)"; \
			ngrok http --url="$(NGROK_URL)" http://localhost:3000; \
		else \
			echo; \
			echo "👋 Nextjs server is not running..."; \
			echo; \
			echo "1. In a first terminal instance, start the Nextjs server with:"; \
			echo "NEXT_PUBLIC_BASE_URL=$(NGROK_URL) make dev"; \
			echo; \
			echo "2. In a second terminal instance, start Ngrok Tunnel with :"; \
			echo "make ngrok"; \
			echo; \
			echo "Then, access the app at: $(NGROK_URL) ✅"; \
			echo; \
		fi \
	fi

# Fully containerized Nextjs and Postgres for local testing
.PHONY: basic basic-stop basic-clear

basic:
	@make setup-env
	@make merge-env-basic
	$(DC) --env-file $(OUTPUT_BASIC) -f $(BASIC) up -d --build
	@echo "🚀 Access the app at: http://localhost:3000 ✅"
	@echo "🗃️ Visualise data at : http://localhost:5555 🔥"

basic-stop:
	@make merge-env-basic
	$(DC) --env-file $(OUTPUT_BASIC) -f $(BASIC) down

basic-clear:
	@make merge-env-basic
	$(DC) --env-file $(OUTPUT_BASIC) -f $(BASIC) down -v
