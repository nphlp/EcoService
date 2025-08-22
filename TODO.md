# Todo

Complete auth and user management

## AI

- Ajouter le MCP `Context7`
- Ajouter le MCP `Linear`
- Ajouter le MCP `Github`

### Workflow automatique

- Je créer des Issue `Linear`

- J'utilise Conductor pour mettre un agent IA dans un worktree
    1. **Prise d'information**
        - Lire une Issue `Linear`
        - Créer la branche avec le nom fournit par `Linear`

    2. **Boucle de code**
        - Coder la feature
        - Lancer les checks : `pnpm run lint`, `pnpm run type` et `pnpm run format`
        - Corriger les erreurs et recommencer

    3. **Validation et envoie**
        - Git add, commit et push
        - Faire la PR sur `Github`

- Je relis la PR et merge les modifs

### Workflow manuel

En cas de problèmes complexes

- Créer un script "/add-debug-logs
- Créer un script "/rm-debug-logs

## CURRENT

- [x] Fusionner les composants combobox
- [] Homogénéhiser tous les composants
- [] Revoir la modals avec le Portal
- [] Rendre réactif au scroll le drop down du select
- [] Supprimer les anciens composants
- [] Cards perspectives
- [] Layout scroll issue

## Docker

- [] Analyser l'état actuel très complexe de l'environnement docker
  Système de double conteneurisation "builder + runner" à cause de : - l'anti-pattern "export const dynamic = "force" sur le layout - l'utilisation de l'API côté server
- [] Refaire un environnement production docker-compose nextjs avec les bonnes pratiques
- [] Intégrer dans le workflow CI/CD un push de l'image docker buildée sur un registery github
- [] Permettre un déploiement rapide sur coolify à partir de cette image sur le registery

## Rework

- [] Revoir et décompléxifier le système Fetch interne/externe, hook useFetch et génération de Services
- [] Revoir les composants UI et l'architecture premitive/surcouche
- [] Revoir les Docker Compose environnements depuis le chagement de paradigme `export dynamic = "auto"`
- [] Améliorer la gestion des autorisations et permissions
- [] Gérer les TODOs

## Fusionner Article / DIY

## Système de stock

## Système de notation

## Système de commentaires

## Système de ranking

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
