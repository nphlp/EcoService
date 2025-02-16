# Eco Service

Eco Service is a fully auth-ready application.

## Coding chart

Follow this link: [Coding chart](https://github.com/nansphilip/EcoService/blob/main/coding-chart.md)

## Project installation

Install the project in three steps: `software requirements`, `environment variables` and `project setup`.

### Software requirements

- [Git](https://git-scm.com/downloads)
- [Node JS](https://nodejs.org/en/download/package-manager/current)
- [PNPM](https://pnpm.io/fr/installation)
- [MySQL](https://dev.mysql.com/downloads/installer)

### Environment variables

- `DATABASE_URL`

    Database connection managed by Prisma (more info [Prisma Docs](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-mysql))

- `BETTER_AUTH_SECRET`

    Authentication managed by Better Auth (more info [Better Auth Docs](https://www.better-auth.com/docs/installation))

- `PLUNK_API_KEY`

    Email provider managed by Plunk (requires to create an account, more info [Plunk Docs](https://docs.useplunk.com/getting-started/introduction))

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` \
  `STRIPE_SECRET_KEY` \
  `STRIPE_WEBHOOK_SECRET`

    Payment provider managed by Stripe (requires to create an account, follow the steps below)

    1. Create your `.env` file from the `.env.example` file
    2. Create a [Stripe Account](https://dashboard.stripe.com) (an IBAN is required, even for development/testing accounts)
    3. Go to the [Workbench section](https://dashboard.stripe.com/test/workbench/overview) and get your API keys
    4. Create a [Webhook endpoint](https://dashboard.stripe.com/test/workbench/webhooks) with the following events:
        - `account.updated`
        - `charge.dispute.created`
        - `checkout.session.completed`
        - `payment_intent.payment_failed`
        - `payment_intent.succeeded`
        - `payout.failed`
        - `payout.paid`

### Project setup

- First take a look to the local scripts

    ```bash
    pnpm run help
    ```

- Install project dependencies

    ```bash
    pnpm install
    ```

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

- Generate the Prisma client

    ```bash
    pnpm prisma:generate
    ```

- Run Prisma database migrations

    ```bash
    pnpm prisma:migrate
    ```

- Insert, reload or reset fixtures

    ```bash
    pnpm fixtures:setup
    pnpm fixtures:reload
    pnpm fixtures:reset
    ```

- Run server project

    ```bash
    pnpm dev
    ```

- (optional) Clear your `localhost:3000` browser cookies is you have an error

## Fixtures

There is three types of users.

| Email                | Password      | User type |
| -------------------- | ------------- | --------- |
| user@example.com     | Password1234! | User      |
| vendor@example.com   | Password1234! | Vendor    |
| employee@example.com | Password1234! | Employee  |
| admin@example.com    | Password1234! | Admin     |

# Deployment

## Init

```bash
pnpm install && pnpm dlx prisma generate && pnpm dlx prisma migrate deploy && pnpm run reload # do not add reload in prod
```

## Build

```bash
pnpm run build
```

## Start

```bash
pnpm run start
```

## Add grant to mysql user

```sql
GRANT ALL PRIVILEGES ON *.* TO 'eco-service-user'@'%';
```
