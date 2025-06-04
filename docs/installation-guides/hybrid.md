# Hybrid installation

[Home](../../README.md) > [Installation](../installation.md) > [Hybrid installation](./hybrid.md)

## Auto setup

> [!WARNING]
> Docker Mysql Service is exposed on port `3307` to avoid conflicts with local MySQL server that is running on port `3306` by default.

- Add the `.env.hybrid` file from `.env.example.hybrid` template ([see more](../environment-variables.md))

- Install dependencies

    ```bash
    pnpm install
    ```

- Run docker services (MySQL, Redis, etc...)

    ```bash
    # All commands are available in the Makefile
    make hybrid
    ```

- Wait until the docker services are healthy (check with `docker ps`)

- Setup database and user (in Docker), generate Prisma, deploy migrations (in Docker), load fixtures (in Docker) and run dev server

    ```bash
    pnpm run auto:hybrid
    ```

- In another terminal, run [Stripe Webhook Forwarder](https://docs.stripe.com/webhooks/quickstart)

    ```bash
    pnpm stripe:webhooks
    ```

- (optional) Clear your `localhost:3000` browser cookies if you have session errors

## Other commands

- Build hybrid

    ```bash
    make build-hybrid
    ```

- Stop hybrid

    ```bash
    make stop-hybrid
    ```

- Remove hybrid and volumes

    ```bash
    make rm-hybrid
    ```
