# Environment variables

This is the list of environment variables used in the project.

## Required variables

| Variable                           | Value                                                                                                               | Description                                             |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| NODE_ENV                           | `production` or `development`                                                                                       | Node environment                                        |
| NEXT_PUBLIC_BASE_URL               | `http://localhost:3000` or `https://your-static-sub-domain.ngrok-free.app`                                          | Base URL                                                |
| MYSQL_ROOT_PASSWORD                | `root`                                                                                                              | MySQL root password (for local server or Docker server) |
| DATABASE_URL                       | `mysql://eco-service-user:eco-service-password@{HOST}:3306/eco-service-db` where `{HOST}` is `localhost` or `mysql` | MySQL URL for Prisma                                    |
| MYSQL_DATABASE                     | `eco-service-db`                                                                                                    | MySQL variable for Docker service                       |
| MYSQL_USER                         | `eco-service-user`                                                                                                  | MySQL variable for Docker service                       |
| MYSQL_PASSWORD                     | `eco-service-password`                                                                                              | MySQL variable for Docker service                       |
| MYSQL_HOST                         | `localhost` or `mysql`                                                                                              | MySQL variable for Docker service                       |
| MYSQL_PORT                         | `3306`                                                                                                              | MySQL variable for Docker service                       |
| REDIS_URL                          | `redis://localhost:6379` or `redis://redis:6379`                                                                    | Redis URL                                               |
| REDIS_ARGS                         | `--save 1 1` for testing, `--save 3600 10` for production                                                           | Redis arguments                                         |
| BETTER_AUTH_SECRET                 | `session-encryption-key`                                                                                            | Better Auth encryption key                              |
| PLUNK_API_KEY                      | `sk_xxxxx`                                                                                                          | Plunk API key                                           |
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | `pk_test_xxxxx`                                                                                                     | Stripe public key                                       |
| STRIPE_SECRET_KEY                  | `sk_test_pk_test_xxxxx`                                                                                             | Stripe secret key                                       |
| STRIPE_WEBHOOK_SECRET              | `whsec_xxxxx`                                                                                                       | Stripe webhook secret                                   |

## Details

#### `NODE_ENV`

Node environment.

#### `NEXT_PUBLIC_BASE_URL`

Base URL of the application. This is used for API calls, Stripe webhooks, Better Auth sessions, etc.

#### `MYSQL_ROOT_PASSWORD` (optional)

Used in `scripts/db.ts`, `Dockerfile.dev` and `Dockerfile.builder` to automatically install the database.

- For local and hybrid environments, this is the root password for the MySQL local server.
- For Docker environments, this is the root password for the MySQL Docker service.

> **Note**: This variable is optional in local and hybrid environments. It is required in Docker environments.

#### `DATABASE_URL`

Database URL connection for Prisma (more info [Prisma Docs](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-mysql))

#### `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_HOST`, `MYSQL_PORT`

MySQL variables for the Docker service.

#### `REDIS_URL` and `REDIS_ARGS`

This feature does not work yet. Working on it.

#### `BETTER_AUTH_SECRET`

A random string used for authentication managed by Better Auth (more info [Better Auth Docs](https://www.better-auth.com/docs/installation)). You can generate a random string with `openssl rand -hex 32`.

#### `PLUNK_API_KEY`

The secret API key provided by [Plunk](https://useplunk.com) (free but requires creating an account, more info [Plunk Docs](https://docs.useplunk.com/getting-started/introduction))

#### `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY`

Public and secret API keys provided by Stripe (requires creating an account, follow the steps below)

1. Create a [Stripe Account](https://dashboard.stripe.com) (an IBAN is required, even for development/testing accounts)
2. Toggle your Stripe environment to test mode
3. Go to the [Workbench section](https://dashboard.stripe.com/test/workbench/overview) and get your Stripe Public and Private API keys

#### `STRIPE_WEBHOOK_SECRET`

The secret webhook key provided by Stripe (after your account is created, follow the steps below)

1.  Create a [Webhook endpoint](https://dashboard.stripe.com/test/workbench/webhooks) with the following events: `account.updated`, `charge.dispute.created`, `checkout.session.completed`, `file.created`, `payment_intent.payment_failed`, `payment_intent.succeeded`, `payout.failed` and `payout.paid`
2.  Install [Stripe CLI](https://docs.stripe.com/stripe-cli) and log in
3.  Run `pnpm stripe:webhooks` in your terminal to get your Webhook Key
