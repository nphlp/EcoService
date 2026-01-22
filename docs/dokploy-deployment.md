# Dokploy Deployment

[Home](../README.md) > [Dokploy Deployment](./dokploy-deployment.md)

This guide will help you to setup multiple environments with Dokploy and GitHub Actions.
In this example, we will create two environments: `preview` and `production`. But you can create as many environments as you want.

<h2>Summary</h2>

- [Dokploy Deployment](#dokploy-deployment)
    - [Prerequisites](#prerequisites)
    - [Setup Github Environments](#setup-github-environments)
    - [Setup Github Secrets](#setup-github-secrets)
    - [Deploy on Dokploy](#deploy-on-dokploy)

## Prerequisites

- Have a VPS available
- Have a domain name pointing to the VPS (e.g., `my-domain.com`)
- Have an email based on this domain name (e.g., `hello@my-domain.com`)

## Setup Github Environments

1. Github > Your Repository > Settings > Environments > New environment
2. (Optional) Check "Required reviewers" if you want to have a manual approval (recommended for production/main branch)
3. Click on "Save protection rules"

Repeat the operation for each environment you want to create (e.g., `test`, `staging`, and `production`).

## Setup Github Secrets

Access to Github > Your Repository > Settings > Secrets and Variables > Actions > New repository secrets

Add the following secrets:

- DOKPLOY_VPS_URL (e.g., `dokploy.my-domain.com`)
- DOKPLOY_API_TOKEN (e.g., `jslkdjFSLlDflkKLDfjlksdjfdFLKlKJSdlkfjSDLfSKDjfllslsdkfflkSFKLls`)
- DOKPLOY_COMPOSE_ID_PRODUCTION (e.g., `4kbpULUAlKsd7L55ru54i`)
- DOKPLOY_COMPOSE_ID_PREVIEW (e.g., `s7kpRssAlKsd7fj8suSiJ`)

The `composeId` can be found at the end of Dokploy environment URL:

```url
https://<dokploy_vps_url>/dashboard/project/<project_id>/environment/<environment_id>/services/compose/<compose_id>
```

## Deploy on Dokploy

Access to your Dokploy instance (e.g., `https://dokploy.my-domain.com`) and create a new project.

1. Projets > Create Project
2. Choose a name for your project (e.g., `Supper Nextjs Project`), the description is optional, then click **Create**

Create as many environments as you need (e.g., `preview`, `production`) in the project.

1. On top left corner > click `production` dropdown > Create Environment
2. Create a `preview` environment
3. Now you have two environments: `preview` and `production`

Create `compose` services for each environment.

1. On top right corner > click `Create Service` button > `Compose` button
2. Choose a name like `super-nextjs-production` to easily identify `production` and `preview` services in each environment

Select a `provider` for your `service`.

1. Select the `Git` (public repo or with ssh key) or `Github` (sso connexion required) tab
2. Select or provide your repository URL
3. Choose the branch you want to deploy (e.g., `main` for production and `test` for preview)
4. Precise the path to your `compose` file (e.g., `./compose.dokploy.yml` in this boilerplate)
5. Click on **Save**

Add environment variables in the corresponding tab.

1. Use `make merge-env-production` or `make merge-env-preview` to generate a realistic environment sample file (e.g. `.env.production` or `.env.preview`)
2. Adjust the environment variables
    - Choose a subdomain for each environment (e.g., `preview-my-domain.com` and `my-domain.com` for production)
    - Generate strong passwords for your database, authentication, etc.
3. Paste the content of the generated environment file in the `Environment Settings` tab

**Deploy your application. Great job!**

On each commit, the `.github/workflows/deploy.yml` file will trigger a deployment to the corresponding Dokploy environment.
