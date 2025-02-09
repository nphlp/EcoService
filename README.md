# Eco Service

Eco Service is a fully auth-ready application.

## Coding chart

Follow this link: [Coding chart](https://github.com/nansphilip/EcoService/blob/main/coding-chart.md)

## Project installation

- Make sure you already had installed:

  - [Git](https://git-scm.com/downloads)
  - [Node JS](https://nodejs.org/en/download/package-manager/current)
  - [PNPM](https://pnpm.io/fr/installation)
  - [MySQL](https://dev.mysql.com/downloads/installer)

- Install project dependencies

  ```bash
  pnpm install
  ```

- Creates a database user and a password, and grants privileges to the user

  ```sql
  CREATE USER 'eco-service-user'@'localhost' IDENTIFIED BY 'eco-service-password';

  GRANT ALL PRIVILEGES ON *.* TO 'eco-service-user'@'localhost';
  ```

- Add an `.env` file at the root of the project, with the following variables

  - Database connection ([Prisma Docs](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-mysql))

  - Session secret ([Better Auth Docs](https://www.better-auth.com/docs/installation))

  - Plunk private key ([Plunk Docs](https://docs.useplunk.com/getting-started/introduction))

  - Stripe API

    1. Create a [Stripe Account](https://dashboard.stripe.com) (an IBAN is required, even for development/testing accounts)
    2. Go to the [Workbench section](https://dashboard.stripe.com/test/workbench/overview) and get your API keys
    3. Create a [Webhook endpoint](https://dashboard.stripe.com/test/workbench/webhooks) with the following events:

       - [x] account.updated
       - [x] charge.dispute.created
       - [x] checkout.session.completed
       - [x] payment_intent.payment_failed
       - [x] payment_intent.succeeded
       - [x] payout.failed
       - [x] payout.paid
  
  - Create your `.env` file

    ```.env
    DATABASE_URL=mysql://eco-service-user:eco-service-password@localhost:3306/eco-service-db

    BETTER_AUTH_SECRET=session-encryption-key
    BETTER_AUTH_URL=http://localhost:3000

    PLUNK_API_KEY=plunk-private-key

    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
    STRIPE_SECRET_KEY=sk_test_pk_test_xxxxx

    STRIPE_WEBHOOK_SECRET=whsec_xxxxx

    NEXT_PUBLIC_APP_URL=http://localhost:3000
    ```

- Generate the Prisma client

  ```bash
  pnpm dlx prisma generate
  ```

- Run Prisma database migrations

  ```bash
  pnpm dlx prisma migrate dev
  ```

- Insert fixtures

  ```bash
  pnpm run fixtures
  ```

- (optional) If needed you can reload or reset

  ```bash
  pnpm run reload
  ```
  
  ```bash
  pnpm run reset
  ```

- Run server project

  ```bash
  pnpm run dev
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
