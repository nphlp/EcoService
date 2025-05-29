# Eco Service

Projet d'étude réalisé en période de formation pour le [Titre Professionnel (Niveau 6) - Concepteur développeur d'applications (RNCP37873)](https://www.francecompetences.fr/recherche/rncp/37873/)

## Projet à réaliser

1. Plateforme de vente de produits écologiques
    - on trouve des **produits** de différents vendeurs
    - on trouve des **articles** de blog qui parlent des produits et leurs concepteurs/vendeurs
    - on trouve des articles de **DIY** (Do It Yourself) qui expliquent comment utiliser les produits et en concevoir soit-même
2. Types d'utilisateurs
    - les **utilisateurs** qui achètent des produits (après inscription)
    - les **vendeurs** qui vendent des produits (après approbation)
    - les **employés** qui gèrent la plateforme (créé par l'administrateur)
    - un ou des **administrateur** qui gère la plateforme (créé par le développeur)
3. Fonctionnalités principales
    - **Accueil** : qui présente le concept de la plateforme, les produits, les articles, les diy, etc.
    - **Catalogue** : des produits, articles, diy, etc.
    - **Recherche** : de produits, articles, diy, etc.
    - **Panier** : qui se transforme en **commande**
    - **Moyen de paiement** : avec Stripe
    - **Authentification** : des utilisateurs
    - **Tableau de bord** : pour les employés et les administrateurs

## Liens

- Gestion sur Linear : []()
- Maquette Figma : []()
- Site de test : [preview.eco-service.nansp.dev](preview.eco-service.nansp.dev)
- Site de production : [eco-service.nansp.dev](eco-service.nansp.dev)

## Contenu à présenter

1. Documentation

    - README
    - Context
    - Technologies
    - Installation
    - Deployment
    - Coding chart

2. CI/CD

    - Husky + Lint staged
    - Linting, formating, typing
    - Workflow Pull Request
    - Workflow Deployment

3. Tests

    - API tests
    - Server Actions tests
    - Basket tests

4. Optimisation SEO et UX catalog

    - Système de context local et zustand
    - Hydrater les hooks clients avec les données server
    - Double avantage : SEO (first print) et UX (100% dynamique)

5. Cache

    - `"use cache"`
    - `cacheLife` : trois états `"stale"`, `"revalidate"` et `"expire"`
    - `cacheTag` et `revalidateTag`
    - API : auto-générée et mise en cache
    - Page
    - `fonction fetch`
    - `fonction render` : pages
    - `generateStaticParams` : pages SSR

6. Générration des services

    - À partir de la BDD en une seule commande
    - Utilitaires : `FetchV2`, `useFetch`, `FetchParallelized` et `FetchConfig`
    - Types
    - Schema Zod
    - Classes
    - API (fetch avec cache)
    - Server Action (mutations)
    - API et Actions 100% typesafe
    - Inférence dynamique de réponse Prisma

7. Process

    - Enchainement de vérifications (fetchs sans cache) et mutations (mise à jour)
    - Validation des données avec Zod
    - Gestion des erreurs avec `try catch`
    - Typage de bout en bout

8. Installation automatisée

    - pnpm run auto
    - pnpm run db (--docker --ssl)
    - pnpm run fixtures

9. Environnements de développement

- variables d'environnement :
    - `.env` (local et hybride)
    - `.env.dev` (docker dev)
    - `.env.prod` (docker prod)
- mode `dev`:
    - **local**: server `node local` et server `mysql local`
    - **hybride**: server `node local` et server `mysql docker`
    - **docker**: server `node docker` et server `mysql docker`
- mode `prod`:
    - **local**: server `node local` et server `mysql local`
    - **hybride**: server `node local` et server `mysql docker`
    - **docker**: server `node docker` et server `mysql docker`

10. Coolify

- `preview`: deploiement de la branche `test`
- `prod`: deploiement de la branche `main`

11. SEO

- metadata
- sitemap
- robots
- open graph

12. Mails avec `usePlunk`

13. Prisma

- Gestion de la BDD
- Gestion des migrations
- Gestion des requêtes

14. UI Components

- Utilitaire `combo()`
- Système de styles

- Composants prémitifs :

    - Button
    - Link
    - Input
    - Select

- Composants complèxes :
    - Feedback
    - InputImage
    - InputPassword
    - Modal
    - Accordion
    - Combobox
    - Slider
    - Tab

15. Better Auth

- Authentification
- Mise à jour profil

16. Stripe

- Paiement
- Webhooks

17. Docker

- Certificats SSL
- Dockerfile: `dev`, `builder` et `runner`
- Compose: `local`, `dev` et `prod`
- Makefile: `make dev` et `make prod`
- Swarm: work in progress

18. Permissions

- Au niveau requête (middleware)
- Au niveau layout (parent de plusieurs pages)
- Au niveau page
- Au niveau API
- Au niveau Process

19. Panier et checkout

- Non connecté (stockage navigateur)
- Connecté (stockage serveur + navigateur)
- Transition en entre les deux (synchronisation)
- Gestion des produits et quantités
- Hook zustand
- Checkout

20. Barre de recherche

- Système très simple de recherche par slug
- Possibilité de rechercher : produit, article, diy ou catégorie
- Amélioration possible avec Meilisearch (si le projet grandit)

21. Dashboard

- Statistiques globales
- Créer un produit Stripe
- Créer un vendeur
