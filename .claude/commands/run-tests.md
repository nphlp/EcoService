---
name: run-tests
description: Lance les tests d'intégration avec le serveur de développement
allowed-tools: pnpm run dev, pnpm test:run
---

# Run Tests

Lance les tests d'intégration en démarrant automatiquement le serveur de développement en arrière-plan si nécessaire.

## Utilisation

```
/run-tests
```

## Description

Cette commande :

1. Vérifie si le serveur de développement tourne déjà
2. Si non, le lance en arrière-plan avec `pnpm run dev`
3. Attend que le serveur soit prêt
4. Lance les tests avec `pnpm test:run`
5. Arrête le serveur après les tests si c'est toi qui l'a lancé

## Notes

- Le serveur reste en arrière-plan pour des tests ultérieurs
- Utilisez `/stop-dev` pour arrêter manuellement le serveur
