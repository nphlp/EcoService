# Local installation

[Home](../../README.md) > [Installation](../installation.md) > [Local installation](./local.md)

## Auto setup

- Add the `.env` file from `.env.example` template ([see more](../environment-variables.md))

- Install dependencies

    ```bash
    pnpm install
    ```

- Setup database and user, generate Prisma, deploy migrations, load fixtures and run dev server

    ```bash
    pnpm auto
    ```

- In another terminal, run [Stripe Webhook Forwarder](https://docs.stripe.com/webhooks/quickstart)

    ```bash
    pnpm stripe:webhooks
    ```

- (optional) Clear your `localhost:3000` browser cookies if you have session errors

## Manual setup

- Add the `.env` file from `.env.example` template

- Install the project dependencies

    ```bash
    pnpm install
    ```

- Create a MySQL user and password and grant privileges
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

- Deploy Prisma database migrations

    ```bash
    pnpm prisma:migrate
    ```

- Insert, reload or reset fixtures

    ```bash
    pnpm fixtures:setup
    ```

- Run dev server

    ```bash
    pnpm dev
    ```

- In another terminal, run [Stripe Webhook Forwarder](https://docs.stripe.com/webhooks/quickstart)

    ```bash
    pnpm stripe:webhooks
    ```

- (optional) Clear your `localhost:3000` browser cookies if you have session errors
