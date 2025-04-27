# CI/CD Production Workflow

Development, quality checks, preview deployment, version creation and automated production deployment...

---

## 1. Development
- On a development branch (feature/xxx, fix/xxx, etc.)

## 2. Pull Request to `test`
- **Trigger**: PR to `test`
- **Goal**: ensure quality before merging to `test`
- **Pipelines**:
  - Commit message check (convention)
  - Code quality checks:
    - Lint check
    - Format check
    - Type check
  - Build check
  - Start server in background for tests
  - Unit tests
  - Functional tests (coming soon)
  - End-to-end tests (coming soon)

## 3. Merge to `test`
- **Trigger**: merge to `test`
- **Result**: VPS (Coolify) automatically deploys a **preview** (preview.domain.com) of the app from the `test` branch.

## 4. Pull Request to `main`
- **Trigger**: PR to `main`
- **Goal**: second quality check before release and production deployment
- **Pipelines**:
  - Build check
  - **Create release** (manually): creates a tag, a GitHub release, a changelog, and an automatic commit with `[skip ci]` (to avoid redeploying a preview on test)

## 5. Merge to `main`
- **Trigger**: merge to `main`
- **Result**: VPS (Coolify) builds and deploys the new version from `main` to **production**

---

## Summary
- PR to `test`: quality checks
- Merge to `test`: preview deployment
- PR to `main`: second quality check and release creation
- Merge to `main`: production deployment
