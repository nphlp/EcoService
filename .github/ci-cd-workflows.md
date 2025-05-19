# CI/CD Production Workflow

Development, quality checks, preview deployment, version creation and automated production deployment...

## Development process

- Development on branches like: `feature/xxx`, `fix/xxx`, etc...-
- Tests on `test` branch
- Production on `main` branch

## Pull Request to `test` or to `main`
- **Trigger**: PR to `test` or to `main`
- **Goal**: ensure quality before merging
- **Pipelines**:
  - Commit message check (conventional commits)
  - Code quality checks:
    - Lint check
    - Format check
    - Type check
  - Build check
  - Start server in background for tests
  - Unit tests
  - Functional tests (coming soon)
  - End-to-end tests (coming soon)

## Manual deployment

- Manual preview deployment from `test`
  1. Use a **deploy key** to trigger a `preview` deployment from `test` branch on test URL: [preview.eco-service.nansp.dev](https://preview.eco-service.nansp.dev)

- Manual production deployement from `main`
  1. Creates a tag, a GitHub release, a changelog, and an automatic commit
  2. Use a **deploy key** to trigger a `production` deployment from `main` branch on prod URL: [eco-service.nansp.dev](https://eco-service.nansp.dev)
