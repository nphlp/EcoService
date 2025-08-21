# GEMINI.md - EcoService Project

This document provides a comprehensive overview of the EcoService project, its architecture, and development conventions to be used as a reference for Gemini.

## Project Overview

EcoService is a marketplace platform for eco-friendly products. It's a full-stack application built with Next.js, a React framework, and uses TypeScript for type safety. The project includes features like user authentication, product catalog, shopping cart, and payments with Stripe. It also has a role-based access control system with four user roles: USER, VENDOR, EMPLOYEE, and ADMIN.

The application is designed with a focus on code quality, with tools like ESLint, Prettier, and Husky for linting, formatting, and pre-commit checks. It also includes a CI/CD pipeline for automated testing and deployment.

### Key Technologies

- **Framework:** [Next.js](https://nextjs.org/) (v15)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [MySQL](https://www.mysql.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Authentication:** [BetterAuth](https://www.npmjs.com/package/better-auth)
- **Payments:** [Stripe](https://stripe.com/)
- **Testing:** [Vitest](https://vitest.dev/)
- **Linting:** [ESLint](https://eslint.org/)
- **Formatting:** [Prettier](https://prettier.io/)

### Architecture

The project follows a standard Next.js application structure.

- `app/`: Contains the application's pages and API routes.
- `components/`: Contains reusable React components.
- `lib/`: Contains utility functions and libraries.
- `prisma/`: Contains the database schema and migrations.
- `services/`: Contains business logic and services.
- `tests/`: Contains the application's tests.

## Building and Running

The following commands are available in the `package.json` file to build, run, and test the application.

- **Install dependencies:**
    ```bash
    pnpm install
    ```
- **Start the development server:**
    ```bash
    pnpm dev
    ```
- **Create a production build:**
    ```bash
    pnpm build
    ```
- **Start the production server:**
    ```bash
    pnpm start
    ```
- **Run the tests:**
    ```bash
    pnpm test:run
    ```
- **Lint the code:**
    ```bash
    pnpm lint
    ```
- **Format the code:**
    ```bash
    pnpm format
    ```

### Database

The project uses Prisma to manage the database. The following commands are available to work with the database:

- **Generate the Prisma client:**
    ```bash
    pnpm prisma:generate
    ```
- **Run database migrations:**
    ```bash
    pnpm prisma:migrate
    ```
- **Reset the database:**
    ```bash
    pnpm prisma:reset
    ```
- **Reload the database (resets and seeds):**
    ```bash
    pnpm db:reload
    ```

### Fixtures

The project includes a fixture system to populate the database with sample data.

- **Reload the fixtures:**
    ```bash
    pnpm fixtures:reload
    ```

## Development Conventions

### Coding Style

The project uses Prettier for code formatting and ESLint for linting. The configuration for these tools can be found in `prettier.config.mjs` and `eslint.config.mjs` respectively. Please adhere to the coding style defined in these files.

### Git Workflow

The project uses a Git workflow with conventional commits. Please follow the conventional commit message format when committing changes. The project also uses Husky to run pre-commit checks, which include linting and formatting.

### Testing

The project uses Vitest for testing. Please write unit tests for new features and bug fixes. The tests are located in the `tests/` directory.
