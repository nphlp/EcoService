# Guide de Déploiement EcoService

## Structure des Fichiers

Développement :

- `compose.dev.yml` - Configuration développement
- `docker/Dockerfile.dev` - Image node développement

Production :

- `compose.prod.yml` - Configuration production
- `docker/Dockerfile.prod` - Image node production

## Environnements

### 1. Développement Local (sans Docker)

Instalaltion :

```bash
pnpm run auto
```

Lancer le serveur de développement :

```bash
pnpm run dev
```

### 2. Développement avec Docker

```bash
make dev
# ou
docker compose -f compose.dev.yml --env-file .env.dev up -d
```

### 3. Production Locale

```bash
make prod
# ou
docker compose -f compose.prod.yml --env-file .env.prod up -d
```

## Variables d'Environnement

- Développement local : utiliser le fichier `.env.example` pour créer un fichier `.env`
- Développement Docker : utiliser le fichier `.env.dev.example` pour créer un fichier `.env.dev`
- Production Docker : utiliser le fichier `.env.prod.example` pour créer un fichier `.env.prod`
