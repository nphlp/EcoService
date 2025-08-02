# Todo

Complete auth and user management

## Rework

- [] Revoir et décompléxifier le système Fetch interne/externe, hook useFetch et génération de Services
- [] Revoir les composants UI et l'architecture premitive/surcouche
- [] Revoir les Docker Compose environnements depuis le chagement de paradigme `export dynamic = "auto"`
- [] Améliorer la gestion des autorisations et permissions

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
