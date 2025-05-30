# Hybrid installation

[Home](../../README.md) > [Installation](../Installation.md) > [Hybrid installation](./hybrid.md)

## Auto setup

- Add the `.env` file from `.env.example` template ([see more](../environment-variables.md))

- Run docker services (mysql, redis, etc...)

    ```bash
    # All commands are available in the Makefile
    make local
    ```

- Setup database and user (in docker), genreate prisma, deploy migrations (in docker), load fixtures (in docker) and run dev server

    ```bash
    pnpm install && pnpm auto:docker
    ```

- In another terminal, run [Stripe Webhook Forwarder](https://docs.stripe.com/webhooks/quickstart)

    ```bash
    pnpm stripe:webhooks
    ```

- (optional) Clear your `localhost:3000` browser cookies if you have some session errors
