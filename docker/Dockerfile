# syntax=docker.io/docker/dockerfile:1

####################
#       Base       #
####################
FROM node:24-alpine AS base
WORKDIR /app

RUN npm install -g pnpm
RUN apk add --no-cache mysql-client mariadb-connector-c

# Recommended by NextJS ?
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

########################
#    MySQL for build   #
########################
FROM base AS builder-mysql

# Install MySQL server for build-time
RUN apk add --no-cache mysql mysql-client
RUN mkdir -p /var/lib/mysql /var/run/mysqld
RUN chown -R mysql:mysql /var/lib/mysql /var/run/mysqld
RUN mysql_install_db --user=mysql --datadir=/var/lib/mysql

####################
#     Builder      #
####################
FROM builder-mysql AS builder
WORKDIR /app

COPY . .
COPY .env ./.env
COPY --from=dev-deps /app/node_modules ./node_modules

# Override the following .env environment variables
ENV NODE_ENV=production
ENV NEXTJS_STANDALONE=true
ENV MIDDLEWARE_PERMISSIONS=enabled

# Build database for SSG (use socket)
ENV DATABASE_URL="mysql://root@localhost/eco-service-db?socket=/var/run/mysqld/mysqld.sock"
ENV MYSQL_HOST="localhost"

RUN pnpm prisma:generate

# Start MySQL and run build
RUN mysqld --user=mysql --datadir=/var/lib/mysql --socket=/var/run/mysqld/mysqld.sock --pid-file=/var/run/mysqld/mysqld.pid & \
    sleep 5 && \
    mysql -u root --socket=/var/run/mysqld/mysqld.sock -e "CREATE DATABASE IF NOT EXISTS \`eco-service-db\`;" && \
    pnpm prisma migrate deploy && \
    pnpm fixtures:reload && \
    pnpm build

####################
#     Runner       #
####################
FROM base AS runner
WORKDIR /app

COPY .env ./.env
COPY tsconfig.json ./tsconfig.json

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
COPY --from=prod-deps --chown=nextjs:nodejs /app/node_modules ./node_modules

# Build filse
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/fixtures ./fixtures
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts
COPY --from=builder --chown=nextjs:nodejs /app/lib ./lib
COPY --from=builder --chown=nextjs:nodejs /app/utils ./utils

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 300

CMD ["/bin/sh", "-c", "\
    pnpm db:reload --docker --ssl && \
    pnpm prisma:deploy && \
    pnpm fixtures:reload && \
    node server.js \
"]