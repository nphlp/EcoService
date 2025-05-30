# Docker installation

[Home](../../README.md) > [Installation](../Installation.md) > [Docker installation](./docker.md)

## Auto setup (dev mode)

- Add the `.env.dev` file from `.env.example.dev` template ([see more](../environment-variables.md))

- Run docker services (node, mysql, redis, etc...)

    ```bash
    # All commands are available in the Makefile
    make dev
    ```

- In another terminal, run [Stripe Webhook Forwarder](https://docs.stripe.com/webhooks/quickstart)

    ```bash
    pnpm stripe:webhooks
    ```

- (optional) Clear your `localhost:3000` browser cookies if you have some session errors

## Auto setup (prod mode)

- Add the `.env.prod` file from `.env.example.prod` template ([see more](../environment-variables.md))

- Run docker services (node, mysql, redis, etc...)

    ```bash
    # All commands are available in the Makefile
    make prod
    ```

- In another terminal, run [Stripe Webhook Forwarder](https://docs.stripe.com/webhooks/quickstart)

    ```bash
    pnpm stripe:webhooks
    ```

- (optional) Clear your `localhost:3000` browser cookies if you have some session errors
