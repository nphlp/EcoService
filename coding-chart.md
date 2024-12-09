# Coding chart

Vous trouverez ci-dessous, les règles d'usage de git et de formatage du code.

## Fonctionnement de git en équipe

### Branches

- `main` : branche de production, c'est à partir de cette branche qu'est déployé le site internet
- `dev` : branche de développement, c'est la branche sur laquelle toutes les features sont ajoutées unes à unes
- `feature/nom-de-la-feature` : branche de développement d'une seule fonctionnalité, manipulée par un seul développeur

> [!IMPORTANT]
> Les branches `main` et `dev` sont manipulées avec douceur et gentillesse par le `lead dev`.

> [!NOTE]
> Chaque branche `feature` est créé et manipulée par un seul développeur.

<br>

### Commits

C'est un confort pour toute l'équipe de suivre une typologie de nommage de `commits`. On peut aisément savoir ce que représente chaque `commit` :

- Avancement sur la feature : `feat: new feature`
- Correction sur la feature : `fix: issue solved`
- Commit de fusion : `merge: get last updates from dev`

> [!TIP]
> Si vous avez un micro-ajustement à faire quelques secondes après avoir `commit` et `push`, vous pouvez modifier inclure vos modifications dans le `commit` précédent pour conserver un historique propre. Il y a trois commandes à faire :
> - `git add .` pour ajouter les modifications en attente
> - `git commit --amend --no-edit` pour inclure les modifications dans le dernier commit `--amend`, sans renommer le message `--no-edit`
> - `git push --force` pour ÉCRASER le **_commit distant_** avec le **_commit local_**
> 
> **ATTENTION** : cette manipulation réécrit l'historique (à cause du `--force`) ! Ce genre de manipulation est irréversible. À proscrire sur `dev` et `main`.

<br>

### Changement de poste de travail

Il est vivement recommandé de `commit` et `push` sur la **_branche distante_** (dépôt Github) les modifications que vous venez de faire sur votre **_branche locale_** (votre ordinateur). Il faut ensuite `pull` le ou les derniers `commits` à votre arrivée sur un autre poste de travail.

> [!WARNING]
> Si vous n'avez pas `push` un `commit` sur un ordinateur et que vous essayez de `pull` votre **_branche distante_** : une bifurcation peut avoir lieu. Vous avez donc deux branches avec des commits différents : la fusion des branches devient très complexe.

<br>
<br>

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