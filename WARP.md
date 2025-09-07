# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Quick Setup Commands

- `pnpm auto` - Complete native setup: install deps, reload DB, generate Prisma, deploy migrations, load fixtures, start dev server
- `pnpm auto:hybrid` - Hybrid setup: Next.js locally + MySQL in Docker (use with `make hybrid`)

### Docker Environment Commands

- `make hybrid` - MySQL in Docker (port 3307) + Next.js locally (recommended for development)
- `make dev` - Full Docker development environment (slower compilation)
- `make prod` - Full Docker production environment
- `make stop` - Stop all Docker containers
- `make clean` - Remove all containers and volumes

### Core Development

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm start:debug` - Start with debug flags and error visibility

### Code Quality & Testing

- `pnpm lint` / `pnpm lint:fix` - Run/fix ESLint errors
- `pnpm format` / `pnpm format:fix` - Check/fix code formatting with Prettier
- `pnpm type` - TypeScript type checking
- `pnpm checks` - Run all type checking, linting, and formatting
- `pnpm test:watch` - Run tests in watch mode with Vitest
- `pnpm test:run` - Run tests once

### Database & Prisma Management

- `pnpm db:setup` / `pnpm db:reset` / `pnpm db:reload` - Database management
- `pnpm prisma:generate` - Generate Prisma client
- `pnpm prisma:migrate` - Create and apply new migration
- `pnpm prisma:deploy` - Deploy migrations in production
- `pnpm fixtures:setup` / `pnpm fixtures:reset` / `pnpm fixtures:reload` - Test data management

### Code Generation System

- `pnpm generate:list` - List Prisma models available for generation
- `pnpm generate:all` - Auto-generate services/types/actions/APIs from Prisma schema
- `pnpm generate:clear` - Clear all generated files

## Architecture Overview

### Auto-Generated Backend Layer

**CRITICAL**: This project uses an advanced code generation system. Never manually modify generated files.

- **Generator**: `scripts/generator.ts` automatically creates complete CRUD operations
- **Templates**: Located in `templates/services/` using Handlebars
- **Generated Files** (per Prisma model):
    - TypeScript types (`services/types/`)
    - Service classes (`services/class/`)
    - Server actions (`services/actions/`)
    - API endpoints (`services/api/`)
    - Cached versions (`services/cached/`)

**Workflow**: After modifying `prisma/schema.prisma`, run `pnpm generate:all` to regenerate all service layers.

### Data Architecture

**Database Schema (Prisma)**:

- **User**: Central entity with roles (USER, VENDOR, EMPLOYEE, ADMIN) and Stripe integration
- **Product**: Marketplace items with vendor relationships, categories, and inventory
- **Order/Quantity**: Shopping cart and order management system
- **Article/Diy**: Content management with shared Content model for media
- **Authentication**: Session, Account, Verification models (BetterAuth integration)

**Data Fetching Strategy**:

- **FetchV2** (`utils/FetchV2/`): Optimized internal routes with caching for API calls
- **Fetch** (`utils/Fetch/`): General purpose API fetching with React hooks
- **Process Layer** (`process/`): Synchronous business logic orchestrating multiple actions
- **Caching**: API endpoints use caching, processes use uncached fetches for data freshness

### State Management Architecture

**Shopping Cart**: Sophisticated Zustand store with dual synchronization

- `components/CORE/basket/basketStore.ts` - Main store logic
- `components/CORE/basket/zustandCookieStorage.ts` - Cookie persistence
- Automatic sync between client and server state

**Authentication**: BetterAuth with enhanced session management

- `lib/auth.ts` - Main configuration with Plunk email integration
- `lib/authClient.ts` - Client-side with `useSession` hook
- `lib/authServer.ts` - Server-side with `GetSession` function

**Theme**: `components/CORE/themeStore.ts` with cookie persistence

### Component Architecture

**Structure**:

- `components/CORE/` - Layout and core functionality (Header, Footer, Basket, Theme)
- `components/UI/` - Reusable UI components (buttons, inputs, cards, etc.)
- `components/SHARED/` - Shared business logic components (filters, pagination)
- `components/PROJECT/` - Project-specific components (cards, sliders)

**Next.js 15 Patterns**:

- **App Router** with RSC (React Server Components)
- **SSR Strategy**: Pages pre-load data server-side, inject into context providers
- **Client Components**: Use hooks, fetch via `useFetch` or server actions
- **Server Components**: Can fetch data directly, no React hooks

### Development Environment Options

1. **Native** (fastest): `pnpm auto` - Node.js + MySQL locally
2. **Hybrid** (recommended): `make hybrid` + `pnpm auto:hybrid` - Node.js locally + MySQL in Docker
3. **Dev**: `make dev` - Full Docker (slower compilation)
4. **Prod**: `make prod` - Production-like Docker environment

### Required Environment Variables

- `NEXT_PUBLIC_BASE_URL` - Base URL for API calls and webhooks
- `DATABASE_URL` - MySQL connection string for Prisma
- `BETTER_AUTH_SECRET` - Session encryption key (generate: `openssl rand -hex 32`)
- `PLUNK_API_KEY` - Email service API key
- `STRIPE_SECRET_KEY` & `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Payment processing
- `STRIPE_WEBHOOK_SECRET` - Webhook validation (use `pnpm stripe:webhooks`)

## Development Patterns

### Code Generation Workflow

1. Modify `prisma/schema.prisma`
2. Run `pnpm generate:all` to update all service layers
3. Run `pnpm prisma:migrate` to create database migrations
4. Run `pnpm prisma:deploy` to apply migrations

### Data Fetching Patterns

- **API Routes**: Use generated services from `services/api/`
- **Server Actions**: Use generated actions from `services/actions/`
- **Client Hooks**: Use `useFetchV2` for cached API calls with full type inference
- **Process Layer**: Use for complex business logic requiring multiple operations

### Authentication Patterns

- **Client**: `const { session } = useSession()` from `lib/authClient.ts`
- **Server**: `const session = await GetSession()` from `lib/authServer.ts`
- **Permissions**: Use `permissions/` utilities for role-based access control

### Styling & UI Patterns

- **Tailwind CSS** with custom theme configuration
- **Component Variants**: Use `tw-merge` for conditional classes
- **Animations**: Custom CSS animations in `globals.scss`
- **View Transitions**: `next-view-transitions` for page transitions

## Testing & Quality

### Testing Setup

- **Vitest** with React Testing Library and jsdom
- `pnpm test:watch` for development
- `pnpm test:run` for CI/CD

### Code Quality Standards

- **Naming Conventions**:
    - `UPPER_CASE`: Constants and env variables
    - `kebab-case`: Files and folders
    - `PascalCase`: Components, classes, server actions
    - `camelCase`: Variables and functions
- **Strict Rules**: No `let`/`var`, prefer `const` and arrow functions
- **TypeScript**: Strict mode with auto-generated Zod schemas

### Git Workflow

- **Branches**: `main` (production), `test` (development), `{name}/{issue-id}` (features)
- **Commits**: `feat:` for features, `fix:` for bugfixes (commitlint enforced)
- **Rebasing**: Prefer rebase over merge for linear history

## Project Context

**EcoService** is an eco-friendly product marketplace platform built for a training project. It supports multiple user types (users, vendors, employees, admins) with features including:

- Product catalog with vendor management
- Shopping cart and Stripe payment integration
- Content management (articles and DIY guides)
- Role-based authentication and permissions
- Multi-environment Docker support

**Key Features**:

- Marketplace with eco-friendly products
- Blog articles and DIY guides
- Multi-role user system with vendor approval
- Shopping cart with order management
- Stripe payment integration
- Admin dashboard for platform management

## Development Notes

- Always run `pnpm generate:all` after Prisma schema changes
- Use the hybrid environment (`make hybrid` + `pnpm auto:hybrid`) for optimal development experience
- Generated files are marked and should never be manually edited
- The codebase follows strict TypeScript and uses comprehensive error handling
- All API responses follow standard format: `{data: T} | {error: string}`
