# Hybrid installation

[Home](../../README.md) > [Installation](../Installation.md) > [Hybrid installation](./hybrid.md)

## Auto setup

> [!NOTE]
> If you have a local MySQL server running on your machine on the default port `3306`, \
> you may setup the host `3307` in your `.env` file for the Docker MySQL service.

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
