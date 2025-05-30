# Environment variables

This is the list of environment variables used in the project.

## Required variables

| Variable                           | Value                                                                                                               | Description                                             |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| NODE_ENV                           | `production` or `development`                                                                                       | Node environment                                        |
| NEXT_PUBLIC_BASE_URL               | `http://localhost:3000` or `https://your-static-sub-domain.ngrok-free.app`                                          | Base URL                                                |
| MYSQL_ROOT_PASSWORD                | `root`                                                                                                              | Mysql root password (for local server or docker server) |
| DATABASE_URL                       | `mysql://eco-service-user:eco-service-password@{HOST}:3306/eco-service-db` where `{HOST}` is `localhost` or `mysql` | Mysql URL from prisma                                   |
| MYSQL_DATABASE                     | `eco-service-db`                                                                                                    | Mysql var for docker service                            |
| MYSQL_USER                         | `eco-service-user`                                                                                                  | Mysql var for docker service                            |
| MYSQL_PASSWORD                     | `eco-service-password`                                                                                              | Mysql var for docker service                            |
| MYSQL_HOST                         | `localhost` or `mysql`                                                                                              | Mysql var for docker service                            |
| MYSQL_PORT                         | `3306`                                                                                                              | Mysql var for docker service                            |
| REDIS_URL                          | `redis://localhost:6379` or `redis://redis:6379`                                                                    | Redis URL                                               |
| REDIS_ARGS                         | `--save 1 1` for testing, `--save 3600 10` for production                                                           | Redis args                                              |
| BETTER_AUTH_SECRET                 | `session-encryption-key`                                                                                            | Better Auth encryption key                              |
| PLUNK_API_KEY                      | `sk_xxxxx`                                                                                                          | Plunk API key                                           |
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | `pk_test_xxxxx`                                                                                                     | Stripe public key                                       |
| STRIPE_SECRET_KEY                  | `sk_test_pk_test_xxxxx`                                                                                             | Stripe secret key                                       |
| STRIPE_WEBHOOK_SECRET              | `whsec_xxxxx`                                                                                                       | Stripe webhook secret                                   |

## Details

#### `NODE_ENV`

Node environment.

#### `NEXT_PUBLIC_BASE_URL`

Base URL of the application. This is used for API calls, Stripe Webhooks, Better Auth session, etc...

#### `MYSQL_ROOT_PASSWORD` (optional)

Used in `scripts/db.ts`, `Dockerfile.dev` and `Dockerfile.builder` to auto install the database.

- For local and hybrid environments, this is the root password for the Mysql local server.
- For docker environments, this is the root password for the Mysql docker service.

> **Note**: This variable is optional in local and hybrid environments. It is required in docker environments.

#### `DATABASE_URL`

Database url connection for Prisma (more info [Prisma Docs](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-mysql))

#### `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_HOST`, `MYSQL_PORT`

Mysql variables for the docker service.

#### `REDIS_URL and REDIS_ARGS`

This features does not work yet. Working on it.

#### `BETTER_AUTH_SECRET`

A random string used for authentication managed by Better Auth (more info [Better Auth Docs](https://www.better-auth.com/docs/installation)). You can generate a random string with `openssl rand -hex 32`.

#### `PLUNK_API_KEY`

The secret api key provider by UsePlunk (free but requires to create an account, more info [Plunk Docs](https://docs.useplunk.com/getting-started/introduction))

#### `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY`

Public and secret api keys provided by Stripe (requires to create an account, follow the steps below)

1. Create a [Stripe Account](https://dashboard.stripe.com) (an IBAN is required, even for development/testing accounts)
2. Toggle your Stripe environment to test mode
3. Go to the [Workbench section](https://dashboard.stripe.com/test/workbench/overview) and get your Stripe Public and Private API keys

#### `STRIPE_WEBHOOK_SECRET`

The secret webhook key provided by Stripe (after your account is created, follow the steps below)

1.  Create a [Webhook endpoint](https://dashboard.stripe.com/test/workbench/webhooks) with the following events: `account.updated`, `charge.dispute.created`, `checkout.session.completed`, `file.created`, `payment_intent.payment_failed`, `payment_intent.succeeded`, `payout.failed` and `payout.paid`
2.  Install [Stripe CLI](https://docs.stripe.com/stripe-cli) and login
3.  Run `pnpm stripe:webhooks` in your terminal to get your Webhook Key
