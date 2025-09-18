# Todo

- [ ] Build warning : The Next.js plugin was not detected in your ESLint configuration. See https://nextjs.org/docs/app/api-reference/config/eslint#migrating-existing-config
- [ ] SetTimeout scroll to top bad pratice -> RequestAnimationFrame ?
- [ ] Caler toutes les pages sur une largeur max

## Email

```ts
Voici comment intégrer l'envoi d'emails via Hostinger dans votre Next.js :

Configuration SMTP Hostinger

// Variables d'environnement (.env.local)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=votre-email@nansp.dev
SMTP_PASS=votre-mot-de-passe

Installation de Nodemailer

cd NextjsDeploy
pnpm add nodemailer
pnpm add -D @types/nodemailer

API Route Example (app/api/send-email/route.ts)

import nodemailer from 'nodemailer';

export async function POST(request: Request) {
const { to, subject, text, html } = await request.json();

const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true pour port 465, false pour port 587
    auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    },
});

try {
    await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
    html,
    });

    return Response.json({ success: true });
} catch (error) {
    return Response.json({ error: 'Failed to send email' }, { status: 500 });
}
}

Utilisation depuis un composant

const sendEmail = async () => {
const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
    to: 'destinataire@example.com',
    subject: 'Test depuis Next.js',
    text: 'Hello world!',
    html: '<h1>Hello world!</h1>'
    })
});
};

Vous n'avez plus besoin d'UsePlunk - Hostinger remplace complètement cette fonctionnalité avec votre propre domaine.
```

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
