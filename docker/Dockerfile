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

####################
#   Dependencies   #
####################
FROM base AS deps

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

####################
#   Development    #
####################
FROM deps AS dev

COPY . .
COPY .env ./.env

# Override environment variables
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

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all source files
COPY . .

# Generate Prisma client
RUN pnpm prisma:generate

# Build Next.js application
# The build output depends on NEXTJS_STANDALONE env variable
ARG NEXTJS_STANDALONE=false
ENV NEXTJS_STANDALONE=${NEXTJS_STANDALONE}

RUN if [ "$NEXTJS_STANDALONE" = "true" ]; then \
      echo "Building Next.js in standalone mode..." && \
      pnpm build; \
    else \
      echo "Building Next.js in standard mode..." && \
      pnpm build; \
    fi

####################
#     Runner       #
####################
FROM base AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files based on build mode
# For standalone build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copy additional required files for runtime
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts
COPY --from=builder --chown=nextjs:nodejs /app/fixtures ./fixtures
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Production startup command
CMD ["/bin/sh", "-c", "\
    node scripts/db.js setup --docker --ssl && \
    node scripts/db.js migrate && \
    node scripts/fixtures.js setup && \
    node server.js \
"]