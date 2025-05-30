# Eco Service

Projet d'étude réalisé en période de formation pour le [Titre Professionnel (Niveau 6) - Concepteur développeur d'applications (RNCP37873)](https://www.francecompetences.fr/recherche/rncp/37873/).

## Demo

Version de test : [preview.eco-service.nansp.dev](https://preview.eco-service.nansp.dev) \
Version production : [eco-service.nansp.dev](https://eco-service.nansp.dev)

## Summary

- [Installation](./docs/installation.md) sur votre machine
- [Technologies](./docs/technologies.md) utilisées
- [CRUD Prisma](./docs/crud-prisma.md) auto-généré
- [Coding Chart](./docs/coding-chart.md) pour consitance du code
- [Guide sur Git](./docs/git-guide.md) pour travailler en équipe
- [CI/CD Workflows](./docs/ci-cd-workflows.md) pour la qualité du code
- [Deploiement](./docs/deployment.md) sur un VPS avec [Coolify](https://coolify.io/)

## Projet

Le client virtuel est un entrepreneur qui souhaite créer une plateforme de type "marketplace" pour vendre des produits écologiques.

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

## Fixtures

Voici quelques identifiants d'exemple pour tester l'application.

| Email                | Password      | User type |
| -------------------- | ------------- | --------- |
| user@example.com     | Password1234! | User      |
| vendor@example.com   | Password1234! | Vendor    |
| employee@example.com | Password1234! | Employee  |
| admin@example.com    | Password1234! | Admin     |
