# Project Installation

Install the project in three steps: `software requirements`, `environment variables` and `project setup`.

## Available environments

### 1. Local

Pure local environment that requires `Node JS` and `MySQL` local servers installed on your machine. Excellent performance but requires Mysql installation.

- Need `Node JS` and `MySQL` local servers
- Need the `.env` file
- Compatible with `dev` and `prod` modes

### 2. Hybrid

Hybrid environment that requires `Node JS` local server and `MySQL` in Docker container. Excellent performance, the best of both worlds.

- Need `Node JS` local server
- Need `MySQL` in Docker with `compose.local.yml`
- Need the `.env` file
- Compatible with `dev` and `prod` modes

### 3. Docker in dev mode

- Need `Node JS` and `MySQL` in Docker with `compose.dev.yml`
- Need the `.env.dev` file for `dev` mode
- Compatible with `dev` mode only

### 4. Docker in prod mode

- Need `Node JS` and `MySQL` in Docker with `compose.prod.yml`
- Need the `.env.prod` file for `prod` mode
- Compatible with `prod` mode only

## Software requirements

- [Git](https://git-scm.com/downloads)
- [Node JS](https://nodejs.org/en/download/package-manager/current)
- [PNPM](https://pnpm.io/fr/installation) package manager
- [Stripe CLI](https://docs.stripe.com/stripe-cli) (optional)
- [MySQL](https://dev.mysql.com/downloads/installer) community (for local environment)
- [Docker](https://docs.docker.com/get-docker/) with [Makefile](https://www.gnu.org/software/make/) (for hybrid and docker environments)

## Environment variables

- `DATABASE_URL` : database url connection for Prisma (more info [Prisma Docs](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-mysql))

- `MYSQL_ROOT_PASSWORD` (optional) : used in `scripts/db.ts`, `Dockerfile.dev` and `Dockerfile.builder` to auto install the database. If you're not confident, you can leave it empty and the `scripts/db.ts` will ask you for a password if needed. But for Dockerfile, you may need to adapt the code.

- `BETTER_AUTH_SECRET` : a random string used for authentication managed by Better Auth (more info [Better Auth Docs](https://www.better-auth.com/docs/installation)). You can generate a random string with `openssl rand -hex 32`.

- `PLUNK_API_KEY` : the secret api key provider by UsePlunk (free but requires to create an account, more info [Plunk Docs](https://docs.useplunk.com/getting-started/introduction))

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY` : public and secret api keys provided by Stripe (requires to create an account, follow the steps below)

    1. Create a [Stripe Account](https://dashboard.stripe.com) (an IBAN is required, even for development/testing accounts)
    2. Toggle your Stripe environment to test mode
    3. Go to the [Workbench section](https://dashboard.stripe.com/test/workbench/overview) and get your Stripe Public and Private API keys

- `STRIPE_WEBHOOK_SECRET` : the secret webhook key provided by Stripe (after your account is created, follow the steps below)

    1. Create a [Webhook endpoint](https://dashboard.stripe.com/test/workbench/webhooks) with the following events: `account.updated`, `charge.dispute.created`, `checkout.session.completed`, `file.created`, `payment_intent.payment_failed`, `payment_intent.succeeded`, `payout.failed` and `payout.paid`
    2. Install [Stripe CLI](https://docs.stripe.com/stripe-cli) and login
    3. Run `pnpm stripe:webhooks` in your terminal to get your Webhook Key

## Project setup

- Install project dependencies

    ```bash
    pnpm install
    ```

- Then take a look to the local scripts

    ```bash
    pnpm run help
    ```

### Auto setup (option 1)

- Install database, prisma, fixtures and run dev server

    ```bash
    pnpm auto
    ```

- Install [Stripe CLI](https://docs.stripe.com/stripe-cli) and run [Stripe Webhook Forwarder](https://docs.stripe.com/webhooks/quickstart)

    ```bash
    pnpm stripe:webhooks
    ```

- (optional) Clear your `localhost:3000` browser cookies if you have some session errors

### Manual setup (option 2)

- Creates a Mysql user and a password and grants privileges

    - Automatic method

    ```bash
    pnpm db:setup
    ```

    - Manual method

    ```
    # bash terminal
    mysql -u root -p

    # mysql terminal
    CREATE USER 'eco-service-user'@'localhost' IDENTIFIED BY 'eco-service-password';
    GRANT ALL PRIVILEGES ON *.* TO 'eco-service-user'@'localhost';
    ```

- Run Prisma database migrations

    ```bash
    pnpm prisma:migrate
    ```

- Insert, reload or reset fixtures

    ```bash
    pnpm fixtures:setup
    ```

- Run server project

    ```bash
    pnpm dev
    ```

- (optional) Clear your `localhost:3000` browser cookies if you have some session errors
