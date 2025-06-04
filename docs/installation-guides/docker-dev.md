# Docker installation

[Home](../../README.md) > [Installation](../installation.md) > [Docker installation](./docker-dev.md)

## Auto setup

- Add the `.env.dev` file from `.env.example.dev` template ([see more](../environment-variables.md))

- Run docker services (Node.js, MySQL, Redis, etc...)

    ```bash
    # All commands are available in the Makefile
    make dev
    ```

- In another terminal, run [Stripe Webhook Forwarder](https://docs.stripe.com/webhooks/quickstart)

    ```bash
    pnpm stripe:webhooks
    ```

- (optional) Clear your `localhost:3000` browser cookies if you have session errors

## Other commands

- Build dev

    ```bash
    make build-dev
    ```

- Stop dev

    ```bash
    make stop-dev
    ```

- Remove dev and volumes

    ```bash
    make rm-dev
    ```
