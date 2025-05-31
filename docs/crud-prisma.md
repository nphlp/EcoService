# CRUD Prisma

[Home](../README.md) > [CRUD Prisma](./crud-prisma.md)

Ce projet utilise un générateur de services basé sur le [Schema Prisma](../prisma/schema.prisma) conçus pour fonctionner avec des utilitaires optimisés.

<h2>Table of contents</h2>

- [Fonctionnalités](#fonctionnalités)
- [Services](#services)
    - [Types](#types)
    - [Class](#class)
    - [API routes](#api-routes)
    - [Server Actions](#server-actions)
- [Data Fetching](#data-fetching)
    - [Fetch](#fetch)
    - [useFetch](#usefetch)
    - [FetchParallelized](#fetchparallelized)
    - [FetchConfig](#fetchconfig)
- [Data Mutation](#data-mutation)
    - [Function naming](#function-naming)
    - [Use cases](#use-cases)
        - [In a Server Component](#in-a-server-component)
        - [In a Client Component](#in-a-client-component)
        - [In a Process script](#in-a-process-script)
- [Comment ça marche ?](#comment-ça-marche-)
    - [Génération des services](#génération-des-services)
    - [Système d'indexation des routes API](#système-dindexation-des-routes-api)
    - [Inférence dynamique de réponses Prisma](#inférence-dynamique-de-réponses-prisma)

## Fonctionnalités

1. Auto-completion parfaite et typage fort
    - Route et params typés
    - Reponse Prisma inférée dynamiquement
2. Génération automatique de services en une seule commande
3. Templates entièrement personnalisables
4. Types et Server Actions disponibles dans toute l'application
5. Système optimisé :
    - **FETCH** avec cache
    - **MUTATIONS** sécurisée et en série

## Services

Les fichiers de services sont générés à partir de templates personnalisables.

### Types

> [!NOTE] Usage
> Les fichiers de `types` exportent les types à travers toute l'application.

Chaque fichiers de `types` contiennent les arguments `Props`, les schémas de validation [Zod](https://zod.dev/) et les types de retour `Response`.

Les fichiers de types sont générés à partir des templates personnables :

- [Model Types template](../templates/services/types/{{model}}Type.hbs)
- [Index Types template](../templates/services/types/index.hbs)

### Class

> [!WARNING]
> Les fichiers de `class` ne sont pas destinés à être utilisés directement. \
> Ils sont enveloppés par les fichiers de `API routes` et `Server Actions`.

Chaque fichiers de `class` contient une classe dédiée à un model Prisma et toutes les méthodes liées à ce model.

Les fichiers de `class` sont générés à partir des templates personnables :

- [Model Class template](../templates/services/class/{{model}}Class.hbs)
- [Index Class template](../templates/services/class/index.hbs)

### API routes

> [!NOTE] Usage
> Les **API routes** sont dédiés au **FETCH** de données avec cache.

Chaque fichier `API route` enveloppe et exporte les méthodes de **FETCH** d'une `class`.

Les méthodes exportées sont : `findFirst`, `findUnique`, `findMany`, `count`.

Les fichiers `API routes` sont générés à partir des templates personnables :

- [Model API route template](../templates/services/api/{{model}}Api.hbs)
- [Index API route template](../templates/services/api/index.hbs)

### Server Actions

> [!NOTE] Usage
> Les **Server Actions** sont dédiés aux mutations.

Chaque fichier `Server Action` enveloppe et exporte les méthodes de **MUTATIONS** d'une `class`.

Les méthodes exportées sont : `create`, `createMany`, `upsert`, `upsertMany`, `update`, `updateMany`, `delete`, `deleteMany`.

Il y a aussi des méthodes de **FETCH** sans cache : `findFirst`, `findUnique`, `findMany`, `count`. Ces méthodes sont très utiles pour vérifier des données lors d'un processus de mutation en état certain que les données sont fraiches.

Les fichiers `Server Actions` sont générés à partir des templates personnables :

- [Model Server Action template](../templates/services/actions/{{model}}Action.hbs)
- [Index Server Action template](../templates/services/actions/index.hbs)

## Data Fetching

This system provides a set of tools to fetch data from server or client components. There are `Fetch`, `useFetch` and `FetchParallelized`.

### Fetch

The `FetchV2` function is an optimized version of the `fetch` function.

It will provide auto-completion for the `route` and `params` properties. And the `response` type will be dynamically inferred from the `Prisma.{Model}GetPayload` utility type.

Open your auto-complete and select a route.

![API Route Selection](../public/docs/crud-prisma/api-route-selection.png)

Then, select Prisma filters in the params.

![API Route Params](../public/docs/crud-prisma/api-route-params.png)

After that, use your strongly typed data.

![API Route Response](../public/docs/crud-prisma/api-route-response.png)

> [!NOTE] Example
> See the [FetchV2](../utils/FetchV2/FetchV2.ts) function for more details. \
> Also, see the [usage example](../app/examples/Fetch/page.tsx) for a better understanding.
> You can [try it out online!](https://eco-service.nansp.dev/examples/Fetch)

### useFetch

The `useFetch` hook is a wrapper around the `FetchV2` function.

It will automatically fetch data from the server when a params change.

This hook provides a `data` value, `isLoading` state to handle loading state and `error` state to handle errors.

By default, the hook will not fetch data on the first render. This is useful for [Next.js SSR](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#what-is-streaming) when hydrating intial values of a `useState` with server data.

![useFetch](../public/docs/crud-prisma/use-fetch.png)

> [!NOTE] Example
> See the [useFetch](../utils/FetchV2/FetchHookV2.ts) hook for more details. \
> Also, see the SSR usage example for a better understanding :
>
> 1. The [Page component](../app/examples/useFetch/page.tsx) uses `FetchV2` function to fetch server data, and gives it to the client component to hydrate initial values of the `useState`
> 2. The [Client component](../app/examples/useFetch/client.tsx) uses `useFetch` hook to refresh data when a button is clicked, and displays the `useState` data
> 3. The [Fetch params](../app/examples/useFetch/fetchParams.ts) is a helper function to generate fetch params
>    You can [try it out online!](https://eco-service.nansp.dev/examples/useFetch)

### FetchParallelized

> [!WARNING] In development
> This function is still in development.

The `FetchParallelizedV2` function is a wrapper around the `FetchV2` function.

It will provide types for parallelized requests.

> [!NOTE] Example
> See the [FetchParallelizedV2](../utils/FetchV2/FetchParallelizedV2.ts) function for more details. \
> Also, see the [usage example](../app/examples/FetchParallelized/page.tsx) for a better understanding.
> You can [try it out online!](https://eco-service.nansp.dev/examples/FetchParallelized)

### FetchConfig

The `FetchConfig` function is a configuration file that contains the some shared types and caching options.

> [!NOTE] Example
> See the [FetchConfig](../utils/FetchConfig.ts) file for more details.

## Data Mutation

This system generates a bunch of Server Actions for each model.

### Function naming

Each `Server Action` names are following the naming convention : `{model}{action}`.

- `{model}` is the name of the model in the [Schema Prisma](../prisma/schema.prisma).
- `{action}` is the name in of the action.

For the `model User { ... }` in the [Schema Prisma](../prisma/schema.prisma), the following Server Actions will be generated :

1. Mutation functions

    - `UserCreate`
    - `UserCreateMany`
    - `UserUpsert`
    - `UserUpsertMany`
    - `UserUpdate`
    - `UserUpdateMany`
    - `UserDelete`
    - `UserDeleteMany`

2. Fetch functions
    - `UserFindFirst`
    - `UserFindUnique`
    - `UserFindMany`
    - `UserCount`

### Use cases

The [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) are the best way to mutate data in your application, because: they are secure, typed, sequential and callable from anywhere.

#### In a Server Component

> [!TIP]
> Not the best way to mutate data

Use a server action in a `Server Component` works like a regular function. But you can't use React hooks to improve the user experience with `loader` or `feedbacks` states.

> [!NOTE] Example
> See the [usage example](../app/examples/Actions/server/page.tsx) for a better understanding. \
> You can [try it out online!](https://eco-service.nansp.dev/examples/Actions/server)

#### In a Client Component

> [!TIP]
> Nice and efficient way to mutate data

Use a server action in a `Client Component` give you the ability to use React hooks to improve the user experience with `loader` or `feedbacks` states.

> [!NOTE] Example
> See the [usage example](../app/examples/Actions/client/page.tsx) for a better understanding. \
> You can [try it out online!](https://eco-service.nansp.dev/examples/Actions/client)

#### In a Process script

> [!TIP]
> The safest way to mutate data

Use a server action in a `Process script` is a powerful way to safely mutate data in your application. You can check authorization, validate data, check existing data and other business logic before mutating data.

> [!NOTE] Example
> See the [usage example](../app/examples/Actions/process/page.tsx) for a better understanding. \
> You can [try it out online!](https://eco-service.nansp.dev/examples/Actions/process)

## Comment ça marche ?

Voici une explication simplifiée du fonctionnement des systèmes de : génération des services, indéxations des routes API et inférence dynamique de réponses Prisma.

### Génération des services

La génération des services se fait en plusieurs étapes :

- Appel de la commande `pnpm run generate:all` qui execute le script [generator.ts](../scripts/generator.ts) qui fait appel à des fichiers de commandes dans le dossier [/scripts/generator/](../scripts/generator/)
- Premièrement, la commande `generate:all` va extraire la listes des modèles présent dans le [Schema Prisma](../prisma/schema.prisma) avec un regex
- Ensuite, le répertoire des `services/` et `app/api/internal/` est nettoyés et supprimés pour éviter les conflits avec les nouveaux fichiers générés
- Enfin, les fichiers de services sont générés dans `services/` à partir des `templates/` dans lesquels sont injectés les noms de modèles
- Pour finir, les fichiers d'index pour lister les routes API et le Next.js API handler sont générés dans `app/api/internal/`

### Système d'indexation des routes API

L'indexation des routes API permet d'avoir un système de routes API typées et optimisées pour la mise en cache et le **FETCH** de données. Voici comment ça marche :

- Chaque fichier du dossier `services/api/` contient et exporte les fonctions API pour un modèle Prisma
- Le fichier `services/api/index.ts` centralise et exporte toutes les fonctions API pour tous les modèles Prisma
- Le fichier `app/api/internal/[...routes]/route.ts` intercepte toutes les requêtes API et les redirige vers les fonctions API correspondantes

### Inférence dynamique de réponses Prisma

L'inférence dynamique de réponses Prisma permet de générer dynamiquement le typage de la réponse Prisma en fonction des filtres et des paramètres de la requête.

Voici exemple :

```tsx
// Prisma request
const user = await FetchV2({
    route: "/user/findFirst",
    params: {
        select: {
            name: true,
            email: true,
            Product: {
                select: {
                    name: true,
                    price: true,
                },
            },
        },
    },
});

// Prisma response type
type UserResponse = {
    name: string;
    email: string;
    Product: {
        name: string;
        price: number;
    }[];
};
```

- Lors de la génération des services, des fichiers de `types` sont générés dans `services/types/` pour chaque modèle Prisma
- Ces fichiers contiennt l'utilitaire `Prisma.{Model}GetPayload` qui permet d'inférer le type de la réponse Prisma en fonction des filtres et des paramètres de la requête
- Les types prisma sont propagés à travers les fichiers de `services/class`, puis `services/api` et `app/api/internal/Routes.ts`
- L'utilitaire `FetchV2` utilise les routes et les types indéxés dans le fichier `app/api/internal/Routes.ts` pour inférer les types de réponses Prisma.
