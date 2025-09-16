---
description: Supprime les console.log() de debugging du code
---

Nettoie les `console.log()` de debugging dans le fichier ouvert.

**Cible :** $ARGUMENTS

## Instructions

1. **Identifie les logs de debug** avec ces patterns :
    - Labels avec emojis : `🔍`, `🔄`, `❓`, `✅`
    - Mots-clés : `STEP:`, `LOOP:`, `CONDITION:`, `DEBUG:`
    - Format debug : `console.log("LABEL: description", { data })`

2. **Préserve les logs métier** :
    - Logs d'erreur : `console.error()`
    - Logs d'info production : `console.info()`
    - Logs sans labels de debug

## Actions

- ✅ **Supprime** les logs de debugging uniquement
- ✅ **Nettoie** les lignes vides résiduelles
- ✅ **Préserve** les console.log() de production
- ✅ **Focus** sur la zone `$ARGUMENTS` si spécifiée

## Exemple

```javascript
// À SUPPRIMER
console.log("🔍 STEP 1: Init", { data });
console.log("🔄 LOOP: Processing", items);

// À PRÉSERVER
console.error("Failed to process:", error);
console.log("User logged in successfully");
```
