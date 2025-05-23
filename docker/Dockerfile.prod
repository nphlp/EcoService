# Base
FROM node:18-alpine3.21 AS base
WORKDIR /app

RUN npm install -g pnpm

## Builder
FROM base AS builder

COPY . .

RUN pnpm install
RUN pnpm run prisma:generate
RUN pnpm run build

## Runner
FROM base AS runner

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --ignore-scripts

COPY --from=builder /app/.env ./.env
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/scripts/fixtures ./scripts/fixtures
COPY --from=builder /app/scripts/fixtures.ts ./scripts/fixtures.ts
COPY --from=builder /app/fixtures ./fixtures
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/lib/prisma.ts ./lib/prisma.ts

EXPOSE 3000

# `pnpm run fixtures:setup` for TEST environment only, not PROD
CMD ["/bin/sh", "-c", "pnpm run prisma:deploy && pnpm run fixtures:reload && pnpm run start"]
