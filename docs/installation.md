# Project Installation

[Home](../README.md) > [Installation](./installation.md)

Install the project in three steps: `software requirements`, `environment variables` and `project setup`.

<h2>Summary</h2>

- [Available environments](#available-environments)
    - [1. Local](#1-local)
    - [2. Hybrid](#2-hybrid)
    - [3. Docker (dev mode)](#3-docker-dev-mode)
    - [4. Docker (prod mode)](#4-docker-prod-mode)
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
- Requires `MySQL` in Docker with `compose.local.yml`
- Requires the `.env` file
- Compatible with `dev` and `prod` modes

### 3. Docker (dev mode)

Docker dev environment that requires `Node.js` and `MySQL` in Docker containers. Poor compilation performance, especially for Page and API compilation. Useful for dockerizing the project, but not recommended for efficient development work.

- Requires `Node.js` and `MySQL` in Docker with `compose.dev.yml`
- Requires the `.env.dev` file for `dev` mode
- Compatible with `dev` mode only

### 4. Docker (prod mode)

Docker prod environment that requires `Node.js` and `MySQL` in Docker containers. Excellent performance, recommended for production.

- Requires `Node.js` and `MySQL` in Docker with `compose.prod.yml`
- Requires the `.env.prod` file for `prod` mode
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

    | Environment      | Template file       | Destination file |
    | ---------------- | ------------------- | ---------------- |
    | Local and hybrid | `.env.example`      | `.env`           |
    | Docker dev       | `.env.example.dev`  | `.env.dev`       |
    | Docker prod      | `.env.example.prod` | `.env.prod`      |

- Choose your setup guide:

    - [Local](./installation-guides/local.md)
    - [Hybrid](./installation-guides/hybrid.md)
    - [Docker (dev mode)](./installation-guides/docker.md#auto-setup-dev-mode)
    - [Docker (prod mode)](./installation-guides/docker.md#auto-setup-prod-mode)
