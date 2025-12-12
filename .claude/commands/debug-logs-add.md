---
description: Ajoute des console.log() stratégiques pour débugger le code
---

Ajoute des `console.log()` de debugging dans le fichier ouvert.

**Cible :** $ARGUMENTS

## Instructions

1. **Identifie les points clés** dans la fonction/algorithme ciblé
2. **Ajoute des logs** aux endroits stratégiques :
    - Points d'entrée/sortie des fonctions
    - Conditions importantes (`if`, `switch`)
    - Boucles (`for`, `while`, `forEach`)
    - Variables clés et leurs transformations

## Format des logs

```javascript
console.log("🔍 STEP 1: Variable initialization", { variable });
console.log("🔄 LOOP START: Processing items", { count: items.length });
console.log("❓ CONDITION CHECK: User is authenticated", { isAuth });
console.log("✅ RESULT: Function completed", { result });
```

## Règles

- **Labels clairs** : utilise des emojis et descriptions précises
- **Variables importantes** : log les valeurs avec contexte
- **Pas de surcharge** : logs utiles uniquement
- **Focus sur la cible** : concentre-toi sur `$ARGUMENTS`
