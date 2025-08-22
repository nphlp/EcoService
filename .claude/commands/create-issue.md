---
description: Lance une session collaborative pour créer une issue Linear
allowed-tools: mcp__linear__create_issue, mcp__linear__list_teams, mcp__linear__list_projects, mcp__linear__list_issue_labels
---

**Commence par me demander : "Quelle est la problématique que tu veux résoudre ?"**

Ensuite collecte ces informations :

1. **Type d'issue** : Feature, Bug, Improvement, ou Task
2. **Problème/Besoin** : Qu'est-ce qui ne fonctionne pas ou manque ?
3. **Solution proposée** : Comment résoudre le problème ?
4. **Impact utilisateur** : Qui est affecté et comment ?
5. **Critères d'acceptation** : Comment savoir que c'est terminé ?

Structure l'issue selon ce template :

```markdown
## Contexte

[Description du problème/besoin]

## Solution proposée

[Approche technique recommandée]

## Critères d'acceptation

- [ ] [Critère 1]
- [ ] [Critère 2]
- [ ] [Critère 3]

## Fichiers concernés

- `path/to/file1.ts`
- `path/to/file2.tsx`

## Notes techniques

[Détails d'implémentation, contraintes, etc.]
```

Quand on a assez d'informations, propose-moi de créer l'issue ou attends que je te le demande.

Utilise `mcp__linear__create_issue` avec :

- `title` : `[type]: description courte`
- `description` : markdown structuré ci-dessus
- `team` : "nans's perso"
- `project` : "E-commerce"
