# Docker installation

[Home](../../README.md) > [Installation](../installation.md) > [Docker installation](./docker-prod.md)

## Auto setup

- Add the `.env.prod` file from `.env.example.prod` template ([see more](../environment-variables.md))

- Run docker services (Node.js, MySQL, Redis, etc...)

    ```bash
    # All commands are available in the Makefile
    make prod
    ```

- In another terminal, run [Stripe Webhook Forwarder](https://docs.stripe.com/webhooks/quickstart)

    ```bash
    pnpm stripe:webhooks
    ```

- (optional) Clear your `localhost:3000` browser cookies if you have session errors

## Other commands

- Build prod

    ```bash
    make build-prod
    ```

- Stop prod

    ```bash
    make stop-prod
    ```

- Remove prod and volumes

    ```bash
    make rm-prod
    ```
