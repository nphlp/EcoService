# Local installation

[Home](../../README.md) > [Installation](../Installation.md) > [Local installation](./local.md)

## Auto setup

- Add the `.env` file from `.env.example` template ([see more](../environment-variables.md))

- Setup database and user, genreate prisma, deploy migrations, load fixtures and run dev server

    ```bash
    pnpm install && pnpm auto
    ```

- In another terminal, run [Stripe Webhook Forwarder](https://docs.stripe.com/webhooks/quickstart)

    ```bash
    pnpm stripe:webhooks
    ```

- (optional) Clear your `localhost:3000` browser cookies if you have some session errors

## Manual setup

- Add the `.env` file from `.env.example` template

- Install the project dependencies

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

- (optional) Clear your `localhost:3000` browser cookies if you have some session errors
