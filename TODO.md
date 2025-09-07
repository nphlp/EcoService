# Todo

Complete auth and user management

## Erreur

- Build : The Next.js plugin was not detected in your ESLint configuration. See https://nextjs.org/docs/app/api-reference/config/eslint#migrating-existing-config

## FetchV3

- [ ] Template Server n'utilise pas le cache ?

- [ ] Réduire le nombre de couches
    - [ ] Supprimer Zod

- [ ] Fusionner Fetch et FetchV2 en FetchV3
    - [ ] Ajouter au template API en `/external/...`

- [ ] Error handling

## CURRENT

- [] Homogénéhiser tous les composants
- [] Revoir le panier
- [] Caler toutes les pages sur une largeur max

## Docker

- [] Refaire un environnement production docker-compose nextjs avec les bonnes pratiques

## CI/CD

- [] Intégrer dans le workflow CI/CD un push de l'image docker buildée sur un registery github
- [] Permettre un déploiement rapide sur coolify à partir de cette image sur le registery

## Rework

- [] Revoir et décompléxifier le système Fetch interne/externe, hook useFetch et génération de Services
- [] Améliorer la gestion des autorisations et permissions
- [] Gérer les TODOs

## Base de donnée

- [] Gestion du stock
- [] Système de notation
- [] Système de favoris
- [] Système de commentaires

- [] Système de hits / rank
    - Ajouter un `vue` produit à chaque clic
    - Calcul rank = `nombre vue` / `nombre achat`

## User Experience

- [] Suspenses et skeletons
- [] Image profile
- [] Double authentification (OTP, Passkey, Magic link)
- [] Auth Provider (Google, Github, etc.)
- [] Reset password

## Testing

Écrire et mettre en place des suivis de tests pour les différentes couches de l'application.

- [] Test Coverage et Static Analysis
- [] Sentry (reporting et logging)

### Automatisé

- [] Unitaire
- [] Intégration
- [] Fonctionnel
- [] E2E (Playwright)

### Sécurité

- [] SonarQube -> Analyse de la qualité et sécurité du code
- [] Dependabot -> Mettre à jour les dépendances en toute sécurité
- [] Dependency Track -> Tracker les vulnérabilités de sécurité dans les dépendances

### Manuel

- [] SEO
- [] Security
- [] Performance
- [] Accessibility

### En ligne

- [] Lighthouse
- [] Google Search Console
- [] PageSpeed Insights
- [] GTmetrix
- [] WebPageTest
- [] Etc.

## API and Zod -> Page per page

- Create a `external API router` and `Fetch()` (page per page)
- Create a `internal API router` and `PrivateFetch()` (based on Class)
- Server and Client components use `external api`, that use `internal api`, that use `class`
- `Json Web Token` protection on `internal API` ?

## Plus tard

- [] Accessibility
    - Tester un lecteur d'écran
    - Ajouter des attributs ARIA et semantiques HTML
    - Vérifier la navigation au clavier
    - Vérifier le contraste des couleurs
    - Désactiver les animations
    - Scrolling fonctionnel avec doigt, pavé tactile, molette, barre de défilement

- [] AI Search
    - Meilisearch
    - Moteur semantic de recherche

- Mobile first UI and UX
- Theme and dark mode
- View Transition
- Internationalization
- Redis Cache
- Progressive Web App (PWA)
- React Native (Expo)
- Desktop (Tauri)

## Stripe

- [ ] Product (CRUD)
- [ ] Clients (CRUD)
- [ ] Adress and payments methods (CRUD)

- [ ] Vendor (CRUD)
    - [ ] Pre-Create (vendor has to completion his inscription on Stripe, to add Iban, personnal informations...)

- [ ] Payment
    - [ ] Buy product (users)
    - [ ] Refound (admin and vendors)
    - [ ] Pay vendors (admin)
    - [ ] Pay myself (admin)

- [ ] Webhook
    - [ ] Send confirmation mail...
        - [ ] An user bought a product: payment succesfuly or failed
        - [ ] An user become a vendor after admin validation
