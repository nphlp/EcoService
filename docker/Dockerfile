# syntax=docker.io/docker/dockerfile:1

####################
#       Base       #
####################
FROM node:24-alpine AS base
WORKDIR /app

RUN npm install -g pnpm
RUN apk add --no-cache mysql-client mariadb-connector-c

## Recommended by NextJS ?
RUN apk add --no-cache libc6-compat

########################
#   Dev Dependencies   #
########################
FROM base AS dev-deps

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

#########################
#   Prod Dependencies   #
#########################
FROM base AS prod-deps

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

####################
#   Development    #
####################
FROM base AS dev

COPY . .
COPY .env ./.env
COPY --from=dev-deps /app/node_modules ./node_modules

# Override the following .env environment variables
ENV DATABASE_URL="mysql://eco-service-user:eco-service-password@mysql:3306/eco-service-db"
ENV MYSQL_HOST="mysql"

RUN pnpm prisma:generate

CMD ["/bin/sh", "-c", "\
    pnpm db:reload --docker --ssl && \
    pnpm prisma:deploy && \
    pnpm fixtures:reload && \
    pnpm dev \
"]

####################
#     Builder      #
####################
FROM base AS builder
WORKDIR /app

# COPY . .
COPY .env ./.env
COPY --from=dev-deps /app/node_modules ./node_modules

# Override the following .env environment variables
ENV NODE_ENV=production
ENV NEXTJS_STANDALONE=true
ENV MIDDLEWARE_PERMISSIONS=enabled
ENV DATABASE_URL="mysql://eco-service-user:eco-service-password@mysql:3306/eco-service-db"
ENV MYSQL_HOST="mysql"

RUN pnpm prisma:generate

RUN pnpm build

####################
#     Runner       #
####################
FROM base AS runner
WORKDIR /app

# Set production environment
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Override the following .env environment variables
ENV NODE_ENV=production
ENV NEXTJS_STANDALONE=true
ENV MIDDLEWARE_PERMISSIONS=enabled
ENV DATABASE_URL="mysql://eco-service-user:eco-service-password@mysql:3306/eco-service-db"
ENV MYSQL_HOST="mysql"

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Production dependencies
COPY --from=prod-deps --chown=nextjs:nodejs /app/package.json ./package.json

# Build files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts
COPY --from=builder --chown=nextjs:nodejs /app/fixtures ./fixtures

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

CMD ["/bin/sh", "-c", "\
    pnpm db:reload --docker --ssl && \
    pnpm prisma:deploy && \
    pnpm fixtures:reload && \
    node server.js \
"]