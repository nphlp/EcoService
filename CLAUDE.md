# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Auto Setup

- `pnpm auto` - Sable. Complete setup: install deps, reload DB, generate Prisma, deploy migrations, load fixtures, start dev server
- `pnpm auto:hybrid` - Not stable yet. Next.js server in the terminal, other services in Docker: excellent for compiling performances
- `pnpm auto:docker` - Not available yet. All services in Docker: useful for production-like environment, but bad for compiling performances

### Core Development

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm start:debug` - Start with debug flags and error visibility

### Code Quality

- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors automatically
- `pnpm format` - Check code formatting with Prettier
- `pnpm format:fix` - Fix formatting with Prettier
- `pnpm type` - TypeScript type checking without emitting files

### Testing

- `pnpm test:watch` - Run tests in watch mode with Vitest
- `pnpm test:run` - Run tests once with Vitest

### Database & Prisma

- `pnpm db:setup` / `pnpm db:reset` / `pnpm db:reload` - Database management scripts
- `pnpm prisma:generate` - Generate Prisma client
- `pnpm prisma:migrate` - Create and apply new migration
- `pnpm prisma:deploy` - Deploy migrations in production
- `pnpm fixtures:setup` / `pnpm fixtures:reset` / `pnpm fixtures:reload` - Test data management

### Code Generation

- `pnpm generate:list` - List Prisma models available for generation
- `pnpm generate:all` - Auto-generate services/types/actions/APIs from Prisma schema
- `pnpm generate:clear` - Clear all generated files

## Architecture Overview

### Auto-Generated Backend Layer

This project uses a sophisticated code generation system based on the Prisma schema:

- **Generator**: `scripts/generator.ts` automatically creates services, types, actions, and API endpoints
- **Templates**: Located in `templates/services/` directory
- **Generated Files**: Complete CRUD operations for each Prisma model including:
    - TypeScript types (`services/types/`)
    - Service classes (`services/class/`)
    - Server actions (`services/actions/`)
    - API endpoints (`services/api/`)
    - Cached versions (`services/cached/`)

**Important**: Never manually modify generated files - update templates or Prisma schema instead.

### Data Fetching Architecture

- **Fetch Utilities**: Two-tier system for API consumption
    - `utils/Fetch/` - General purpose API fetching with hooks (`useFetch`)
    - `utils/FetchV2/` - Optimized internal routes with caching (`useFetchV2`)
- **Process Layer**: `process/` directory contains synchronous business logic orchestrating multiple actions
- **Caching Strategy**: API endpoints use caching, processes use uncached fetches for data freshness

### Authentication & Session Management

- **BetterAuth Integration**: Complete authentication system with email verification
- **Custom Session**: Enhanced with user roles and metadata
- **Configuration**: `lib/auth.ts` with email integration via Plunk
- **Access Patterns**:
    - Client: `lib/authClient.ts` with `useSession` hook
    - Server: `lib/authServer.ts` with `GetSession` function

### State Management

- **Shopping Cart**: Sophisticated Zustand store with local/server synchronization
    - `components/basket/basketStore.ts` - Main store logic
    - `components/basket/zustandCookieStorage.ts` - Cookie persistence
    - Automatic synchronization between client and server state
- **Theme Management**: `components/CORE/themeStore.ts` with cookie persistence

### Database Schema (Prisma)

Key models and relationships:

- **User**: Central entity with roles (USER, VENDOR, EMPLOYEE, ADMIN)
- **Product**: Marketplace items with vendor relationships and categories
- **Order/Quantity**: Shopping cart and order management
- **Article/Diy**: Content management with shared Content model
- **Authentication Models**: Session, Account, Verification (BetterAuth)

### Frontend Architecture

- **Next.js 15** with App Router and RSC
- **SSR Strategy**: Pages pre-load data server-side, inject into context providers
- **Component Structure**:
    - `components/ui/` - Reusable UI components
    - `components/CORE/` - Layout and core functionality
    - `app/` - Next.js App Router pages
- **Styling**: Tailwind CSS with custom theme configuration

### Development Workflow

- **Code Generation**: Run `pnpm generate:all` after Prisma schema changes
- **Testing**: Vitest with React Testing Library and jsdom
- **Type Safety**: Strict TypeScript with auto-generated Zod schemas
- **Linting**: ESLint + Prettier with lint-staged pre-commit hooks

### Docker Support

- Multi-environment Docker setup in `docker/` directory
- Hybrid development environment with `pnpm auto:hybrid`
- Production optimization with standalone output

### Environment Variables

Required environment variables for development:

- `NEXT_PUBLIC_BASE_URL` - Base URL for API calls and webhooks
- `DATABASE_URL` - MySQL connection string for Prisma
- `BETTER_AUTH_SECRET` - Session encryption key (generate with `openssl rand -hex 32`)
- `PLUNK_API_KEY` - Email service API key
- `STRIPE_SECRET_KEY` & `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Payment processing
- `STRIPE_WEBHOOK_SECRET` - Webhook validation (use `pnpm stripe:webhooks`)

### Development Environment Options

- **Local**: Node.js + MySQL locally (best performance, requires MySQL install)
- **Hybrid**: Node.js locally + MySQL in Docker (`pnpm auto:hybrid`)
- **Docker Dev**: Full containerization (slower compilation)
- **Docker Prod**: Production containerization

### Code Quality & Conventions

- **Naming Conventions**:
    - `UPPER_CASE`: Constants and env variables
    - `kebab-case`: Files and folders
    - `PascalCase`: Components, classes, server actions
    - `camelCase`: Variables and functions
- **File Structure**: Feature-based organization with clear separation of concerns
- **Strict Rules**: No `let`/`var` keywords, prefer `const` and arrow functions
- **Component Types**:
    - Server Components: Can fetch data directly, no React hooks
    - Client Components: Can use hooks, fetch via `useFetch` or server actions

### Git Workflow

- **Branches**: `main` (production), `test` (development), `{name}/{issue-id}` (features)
- **Commits**: `feat:` for features, `fix:` for bugfixes
- **Rebasing**: Prefer rebase over merge for linear history
- **Force Push**: Required after rebasing (`git push --force`)

### Data Patterns

- **Fetching**: Use `FetchV2` for cached API calls with full type inference
- **Mutations**: Use server actions for secure, sequential operations
- **State**: Zustand stores with cookie persistence for client state
- **Validation**: Zod schemas for all data validation

### Error Handling

- Comprehensive error boundaries and validation
- Standard API response format: `{data: T} | {error: string}`
