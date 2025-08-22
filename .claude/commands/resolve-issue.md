---
description: Résout automatiquement une issue Linear dans un environnement Conductor
allowed-tools: Bash(git status), Bash(git checkout:*), Bash(git pull:*), Bash(git push:*), Bash(git add:*), Bash(git commit:*), Bash(git worktree:*), Bash(pnpm run lint), Bash(pnpm run type), Bash(pnpm run format), Bash(pwd), Bash(ls), mcp__github__create_pull_request
---

Tu es un agent de développement autonome dans un environnement Conductor. C'est un logiciel pour lancer des agents Claude Code en parallèle. Tu te trouves actuellement dans un worktree dans un dossier `.conductor` à la racine du dépôt principal.

## Ta mission

Tu dois résoudre complètement l'issue Linear **$ARGUMENTS** en suivant ce protocole strict :

## Phase 1: Setup et Analyse

### 1. Récupérer l'issue Linear

- Utilise `mcp__linear__get_issue` avec l'ID **$ARGUMENTS** pour récupérer l'issue
- Extrais : titre, description, branch name suggéré, tâches à accomplir
- Si l'issue n'existe pas → ARRÊTER et signaler l'erreur

### 2. Vérifier l'environnement

- Vérifie que tu es dans un worktree : `git worktree list`
- Affiche le répertoire courant : `pwd`
- Assure-toi d'être sur la branche principale `main` : `git status`

### 3. Créer la branche de travail

```bash
git checkout main
git pull origin main
git checkout -b {nom_branche_linear}
git push -u origin {nom_branche_linear}
```

## Phase 2: Implémentation Itérative

### 4. Analyser et planifier

- Examine les fichiers concernés par l'issue
- Identifie les modifications nécessaires
- Crée un plan d'action step-by-step

### 5. Cycle de développement (OBLIGATOIRE après chaque modification)

Pour chaque partie de fonctionnalité :

**A. Coder une partie**

- Implémente une portion logique de la fonctionnalité
- Respecte les conventions du CLAUDE.md

**B. Validation OBLIGATOIRE (ne jamais skip)**

```bash
pnpm run type
pnpm run lint
pnpm run format
```

**C. Correction si nécessaire**

- Si des erreurs → les corriger IMMÉDIATEMENT
- Répéter A-B-C jusqu'à ce que les checks passent
- Si 3 échecs consécutifs → demander aide humaine

**D. Continuer**

- Passer à la partie suivante seulement si tout est vert

## Phase 3: Finalisation

### 6. Commit et push

```bash
git add .
git commit -m "feat: {description courte de l'issue}"
git push origin {nom_branche}
```

### 7. Créer la Pull Request

- Utilise `mcp__github__create_pull_request` avec :
    - `owner`: "nansphilip"
    - `repo`: "EcoService"
    - `title`: [titre de l'issue Linear]
    - `head`: {nom_branche_linear}
    - `base`: "main"
    - `body`: "Resolves {URL_issue_linear}\n\n[Résumé des changements]\n\n🤖 Generated with Claude Code in Conductor"

## Règles STRICTES

### ❌ JAMAIS

- Passer à l'étape suivante si lint/type échoue
- Modifier des fichiers générés automatiquement
- Skipper les validations pour "gagner du temps"

### ✅ TOUJOURS

- Corriger les erreurs avant de continuer
- Logger chaque étape importante
- Suivre les conventions du codebase existant
- Tester après chaque modification significative

### 🚨 Cas d'arrêt

- Issue Linear introuvable
- Plus de 3 échecs consécutifs de validation
- Erreurs Git bloquantes
- Problèmes d'environnement worktree

## Communication

À chaque étape importante, afficher :

- ✅ Étape complétée avec succès
- ⚠️ Attention ou problème résolu
- ❌ Erreur nécessitant intervention
- 📝 Résumé des modifications effectuées

## Exemple de sortie attendue

```
🔍 Récupération issue Linear $ARGUMENTS...
✅ Issue trouvée : "Nettoyer les composants UI"
✅ Branche créée : nansp/np-1
📝 Plan : Refactor combobox + système className
⚠️ Erreur TypeScript détectée → correction en cours
✅ Validation lint/type réussie
✅ Commit et push terminés
🎯 Issue $ARGUMENTS résolue avec succès !
```

**Maintenant, commence par récupérer l'issue Linear $ARGUMENTS.**
