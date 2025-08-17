# Project Installation

[Home](../README.md) > [Installation](./installation.md)

Install the project in three steps: `software requirements`, `environment variables` and `project setup`.

<h2>Summary</h2>

- [Available environments](#available-environments)
    - [1. Local](#1-local)
    - [2. Hybrid](#2-hybrid)
    - [3. Docker Dev](#3-docker-dev)
    - [4. Docker Prod](#4-docker-prod)
- [Software requirements](#software-requirements)
- [Project setup](#project-setup)

## Available environments

This project is compatible with multiple runtime environments.

### 1. Local

Pure local environment that requires `Node.js` and `MySQL` local servers installed on your machine. Excellent performance but requires MySQL installation.

- Requires `Node.js` and `MySQL` local servers
- Requires the `.env` file
- Compatible with `dev` and `prod` modes

### 2. Hybrid

Hybrid environment that requires `Node.js` local server and `MySQL` in Docker container. Excellent performance, the best of both worlds.

- Requires `Node.js` local server
- Requires `MySQL` in Docker with `compose.hybrid.yml`
- Requires the `.env.hybrid` file
- Compatible with `dev` and `prod` modes

### 3. Docker Dev

Docker dev environment that requires `Node.js` and `MySQL` in Docker containers. Poor compilation performance, especially for Page and API compilation. Useful for dockerizing the project, but not recommended for efficient development work.

- Requires `Node.js` and `MySQL` in Docker with `compose.dev.yml`
- Requires the `.env.dev` file
- Compatible with `dev` mode only

### 4. Docker Prod

Docker prod environment that requires `Node.js` and `MySQL` in Docker containers. Excellent performance, recommended for production.

- Requires `Node.js` and `MySQL` in Docker with `compose.prod.yml`
- Requires the `.env.prod` file
- Compatible with `prod` mode only

## Software requirements

Common software requirements:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/package-manager/current)
- [PNPM](https://pnpm.io/installation) package manager
- [Stripe CLI](https://docs.stripe.com/stripe-cli) (optional)

For local environments:

- [MySQL](https://dev.mysql.com/downloads/installer) community

For hybrid and docker environments:

- [Docker](https://docs.docker.com/get-docker/)
- [Makefile](https://www.gnu.org/software/make/)

## Project setup

- Choose your environment: Local, Hybrid, Docker (dev mode) or Docker (prod mode)

- Copy the correct `.env.example.*` file as a template for your `.env.*` file. For details, see [Environment variables](./environment-variables.md) documentation.

    | Environment | Template file         | Destination file |
    | ----------- | --------------------- | ---------------- |
    | Local       | `.env.example`        | `.env`           |
    | Hybrid      | `.env.example.hybrid` | `.env.hybrid`    |
    | Docker dev  | `.env.example.dev`    | `.env.dev`       |
    | Docker prod | `.env.example.prod`   | `.env.prod`      |

- Choose your setup guide:
    - [Local](./installation-guides/local.md)
    - [Hybrid](./installation-guides/hybrid.md)
    - [Docker Dev](./installation-guides/docker-dev.md)
    - [Docker Prod](./installation-guides/docker-prod.md)
