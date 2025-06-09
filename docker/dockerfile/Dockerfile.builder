####################
#       Base       #
####################
FROM node:18-alpine3.21 AS base
WORKDIR /app

# Override environment file
COPY .env.prod ./.env

# Install pnpm and MySQL client
RUN npm install -g pnpm
RUN apk add --no-cache mysql-client mariadb-connector-c

# Install libc6-compat (recommended for Alpine Linux)
RUN apk add --no-cache libc6-compat

####################
#   Dependencies   #
####################
FROM base AS deps

# Import packages and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

####################
#     Builder      #
####################
FROM base AS builder

# Import dependencies
COPY package.json pnpm-lock.yaml ./
COPY --from=deps /app/node_modules ./node_modules

# Copy codebase
COPY . .

# Generate Prisma client
RUN pnpm run prisma:generate

####################
#     Build app    #
####################
CMD ["/bin/sh", "-c", "\
    pnpm run db:setup --docker --ssl && \
    pnpm run prisma:deploy && \
    pnpm run fixtures:setup && \
    pnpm run build && \
    echo '🏗️ Next.js app built successfully!' && \
    echo '📁 Copying files to shared volumes...' && \
    cp -r ./.next /app/build-output/ && \
    cp -r ./fixtures /app/build-output/ && \
    cp -r ./lib /app/build-output/ && \
    cp -r ./prisma /app/build-output/ && \
    cp -r ./public /app/build-output/ && \
    cp -r ./scripts /app/build-output/ && \
    cp -r ./utils /app/build-output/ && \
    cp ./tsconfig.json /app/build-output/ && \
    echo '✅ Build and file sharing completed!' \
"]
