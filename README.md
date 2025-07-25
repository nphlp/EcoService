# Eco Service

Study project developed during training for the [Titre Professionnel (Niveau 6) - Concepteur développeur d'applications
(RNCP37873)](https://www.francecompetences.fr/recherche/rncp/37873/).

## Demo

Test version: [preview.eco-service.nansp.dev](https://preview.eco-service.nansp.dev) \
Production version: [eco-service.nansp.dev](https://eco-service.nansp.dev)

## Summary

- [Installation](./docs/installation.md) on your machine
- [CI/CD Workflows](./docs/ci-cd-workflows.md) to ensure code quality
- [Deployment](./docs/deployment.md) on VPS with [Coolify](https://coolify.io/)
- [Technologies](./docs/technologies.md) used in the project
- [Auto-generated CRUD Prisma](./docs/crud-prisma.md) system for API and Server Actions
- [Coding Chart](./docs/coding-chart.md) for code consistency
- [Git Guide](./docs/git-guide.md) for team collaboration
- [Sonar Cube](./docs/sonar-cube.md) for code quality

## Project

The virtual client is an entrepreneur who wants to create a marketplace platform to sell eco-friendly products.

1. Eco-friendly product marketplace platform
    - features **products** from different vendors
    - includes blog **articles** about products and their creators/vendors
    - provides **DIY** (Do It Yourself) articles explaining how to use products and create them yourself

2. User types
    - **users** who purchase products (after registration)
    - **vendors** who sell products (after approval)
    - **employees** who manage the platform (created by administrator)
    - one or more **administrators** who manage the platform (created by developer)

3. Main features
    - **Homepage**: presents the platform concept, products, articles, DIY content, etc.
    - **Catalog**: of products, articles, DIY content, etc.
    - **Search**: for products, articles, DIY content, etc.
    - **Shopping cart**: which converts to **orders**
    - **Payment method**: with Stripe
    - **Authentication**: for users
    - **Dashboard**: for employees and administrators

## Fixtures

Here are some sample credentials to test the application.

| Email                | Password      | User type |
| -------------------- | ------------- | --------- |
| user@example.com     | Password1234! | User      |
| vendor@example.com   | Password1234! | Vendor    |
| employee@example.com | Password1234! | Employee  |
| admin@example.com    | Password1234! | Admin     |
