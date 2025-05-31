# CRUD Prisma

[Home](../README.md) > [CRUD Prisma](./crud-prisma.md)

Ce projet utilise un générateur de services basé sur le `./prisma/schema.prisma` conçus pour fonctionner avec des utilitaires optimisés.

## Fonctionnalités

- Perfect auto-completion
- Inférence dynamique de reponse Prisma
- API typée de bout en bout
- Système optimisé de **FETCH** avec cache
- Système optimisé de **MUTATIONS** sécurisée et en série

<hr style="border-bottom: 2px solid hsl(0, 0%, 70%); margin: 0 3rem; margin-block: 3rem;" />

## Services

Les fichiers de services sont générés à partir de templates personnalisables.

### Types

- Props
- Schema Zod
- Response

### Class

- Prémitives
- Méthodes
- Inférence de types

### API routes

> [!NOTE] Usage
> Les **API routes** sont dédiés au **FETCH** de données avec cache.

- Méthodes : `findFirst`, `findUnique`, `findMany`, `count`

### Server Actions

> [!NOTE] Usage
> Les **Server Actions** sont dédiés aux mutations.

- Méthodes : `create`, `createMany`, `upsert`, `upsertMany`, `update`, `updateMany`, `delete`, `deleteMany`

<hr style="border-bottom: 2px solid hsl(0, 0%, 70%); margin: 0 3rem; margin-block: 3rem;" />

## Utilitaires

### Fetch

Open your auto-complete and select a route.

![API Route Selection](../public/docs/crud-prisma/api-route-selection.png)

Then, select Prisma filters in the params.

![API Route Params](../public/docs/crud-prisma/api-route-params.png)

After that, use your strongly typed data.

![API Route Response](../public/docs/crud-prisma/api-route-response.png)

> [!NOTE] Example
>
> ```tsx
> const productList = await FetchV2({
>     route: "/product",
>     params: {
>         select: {
>             id: true,
>             slug: true,
>             name: true,
>             price: true,
>             Category: { select: { id: true, name: true } },
>         },
>         where: { stock: { gt: 0 } },
>         orderBy: { price: "asc" },
>         take: 6,
>         skip: 12,
>     },
> });
> ```

### useFetch

### FetchParallelized

### FetchConfig

### Server Action

<hr style="border-bottom: 2px solid hsl(0, 0%, 70%); margin: 0 3rem; margin-block: 3rem;" />

## Comment ça marche ?
