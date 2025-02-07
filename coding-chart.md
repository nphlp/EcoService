# Coding chart

Vous trouverez ci-dessous, les règles d'usage de git et de formatage du code.

## Fonctionnement de git en équipe

### Branches

- `main` : branche de production, c'est à partir de cette branche qu'est déployé le site internet
- `dev` : branche de développement, c'est la branche sur laquelle toutes les features sont ajoutées unes à unes
- `feat/{nom-developpeur}-{nom-feature}` : branche de développement d'une seule fonctionnalité, manipulée par un seul développeur \
  Exemple: `feat/nans-add-header`

> [!IMPORTANT]
> Les branches `main` et `dev` sont manipulées par le `lead dev` uniquement. \
> Les branches `feat` sont créées et manipuléees par les développeurs eux-mêmes.

### Commits & Push

> [!WARNING]
> **Aucune manipulation** sur `git` ne doit être faite au hasard.

C'est un confort pour toute l'équipe de suivre une typologie de nommage de `commits`. On peut aisément savoir ce que représente chaque `commit` :

- Avancement sur la feature : `feat: new feature`
- Correction sur la feature : `fix: issue solved`

> [!NOTE]
> Il est nécessaire de `commit` et `push` le plus régulièrement possible. \
> Par exemple :
> - dès qu'un ajout fonctionne
> - dès qu'une erreur est corrigée
> - dès qu'une fonctionnalité est terminée
> - en fin de journée
> 
> Si vous travailler sur différents postes, vous devez être en plus rigoureux sur le `commit` et le `push` pour éviter les `conflits` entre vos ordinateurs.

## Mise à jour des branches

### Rebase ou merge

Le `rebase` ou `merge` est utilisé pour mettre à jour une branche `feature` en récupérant les nouveaux `commits` de la branche `dev`.

Préférez la commande `rebase` pour replacer votre branche `feature` dans la continuité de `dev`.

Cependant, il arrive que le `rebase` soit trop complexe. Dans ce cas, effectuez un `merge` pour fusionner la branche `dev` sur la branche sur la branche `feature`. Cela crée un `commit` de `merge`.

> [!CAUTION]
> Ne jamais `rebase` ou `merge` une branche avec `main`. C'est la branche de **_production_** : seul un `pull request` de la branche `dev` peut mettre à jour `main`.

> [!WARNING]
> Ne jamais `rebase` ou `merge` vers `dev`. C'est la branche de **_développement_** : seul un `pull request` d'une branche `feature` permet de modifier `dev`.

#### Process de mise à jours d'une branche `feature`

- Se positionner sur `dev`
```
git checkout dev
```
- Mettre à jour les branches locales `dev`
```
git pull
```
- Se positionner sur `feature`
```
git checkout feature
```
- Mettre à jour `feature` à partir de `dev`
```
git rebase dev
```

<br>

### Pull request

Le `pull request` (ou `merge request` sur Gitlab) est un processus en plusieurs étapes qui permet d'ajouter les modifications d'une branche `feature` à la branche `dev` quand la fonctionnalité est terminée.

> [!NOTE]
> Le `pull request` fait intervenir plusieurs développeurs. Souvent, un `dev` et le `lead dev` du projet.

#### Process de création d'un `pull request`

- Suivre le `Process de mise à jours d'une branche feature` pour être à jour par rapport à `dev`
- Résoudre les `conflits` sur votre branche et tester à nouveau votre nouvelle fonctionnalité
- Se rendre sur le dépôt Github dans la section [Pull Request](https://github.com/nansphilip/G4cuisiner-new/pulls) et créer un `New pull request`
- Sélectionner `Base: main` et `Compare: feature/nom-de-la-feature` et créer le `pull request`
- Donner un titre et une petite description
- Assigner le `pull request` au `lead dev` puis valider

Le `lead dev` s'occupe de vérifier les ajouts de code et de `merge` la branche `feature` sur la branche `dev`. Lorsque le `merge` est fait, il est fréquent de supprimer la branche `feature`, mais il est aussi possible de la conserver.

![Différence entre rebase et main](/public/rebase-or-merge.png)

<br>
<br>

## Formatage de code

### Nommage de membres

- Fichier, dossier : `kebab-case`
- Classe, méthode, fonction : `PascalCase`
- Variable, constante : `camelCase`

### Fonction

Préférez les fonctions fléchées pour tout type de fonction, qu'elle aient `export` ou non.

Sauf pour la déclaration d'un composant React qui ont besoin des mots clés `export default`.

### Types

Les types doivent être déclaré à différent endroits selon la situation. Le type :

- Représente une table de la base de données -> le coder dans le dossier `/actions/types/nom-de-la-table`

- Spécifique à un composant React -> le coder dans le même fichier que le composant

<br>
<br>