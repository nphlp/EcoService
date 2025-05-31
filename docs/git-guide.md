# Guide sur Git

[Home](../README.md) > [Guide sur Git](./git-guide.md)

Voici quelques bonnes pratiques à suivre pour travailler en équipe avec Git.

<h2>Sommaire</h2>

- [Types de branches](#types-de-branches)
- [Commits \& Push](#commits--push)
- [Mettre à jour une branche par rapport à `main`](#mettre-à-jour-une-branche-par-rapport-à-main)
    - [Rebase simple](#rebase-simple)
    - [Rebase avec squash](#rebase-avec-squash)

## Types de branches

- `main` : branche de production, c'est à partir de cette branche qu'est déployé le site internet
- `test` : branche de développement, c'est la branche sur laquelle toutes les features sont ajoutées unes à unes
- `{nom-developpeur}/{issue-id}` : branche `feat` qui agit sur une seule issue, manipulée par un seul développeur
  Exemple: `johndoe/eco-25`

> [!IMPORTANT]
> Les branches `main` et `test` sont manipulées par le `lead dev` uniquement. \
> Les branches `feat` sont créées et manipulées par les développeurs eux-mêmes.

## Commits & Push

> [!WARNING] > **Aucune manipulation** sur `git` ne doit être faite au hasard.

C'est un confort pour toute l'équipe de suivre une typologie de nommage de `commits`. On peut aisément savoir ce que représente chaque `commit` :

- Avancement sur la feature : `feat: {new feature description}`
- Correction sur la feature : `fix: {bug fix description}`

> [!NOTE]
> Il est nécessaire de `commit` et `push` le plus régulièrement possible. Par exemple :
>
> - dès qu'un ajout fonctionne
> - dès qu'une erreur est corrigée
> - dès qu'une fonctionnalité est terminée
> - en fin de journée
>
> Si vous travailler sur différents postes, vous devez être en plus rigoureux sur le `commit` et le `push` pour éviter les `conflits` entre vos ordinateurs.

## Mettre à jour une branche par rapport à `main`

Un nouveau commit a été ajouté à la branche `main`. Vous souhaitez obtenir les dernières modifications de la branche `main`.

La méthode la plus propre pour l'historique `git` est de rebaser les `commits` que vous avez ajouté à votre branche `feat` à la suite de la branche du nouveau commit de la branche `main`.

Voici les étapes à suivre pour faire un **rebase** facilement et rapidement.

> [!NOTE]
> Le **rebase** positionne les `commits` de votre branche `feat` à la suite des `commits` de la branche `main` pour garder un historique linéaire. Ainsi, vos `commits` ne sont que des ajouts de code lors du `Pull request`, ce qui évite de perdre du code.
>
> Le **merge** crée un `commit` de `merge`, il est à éviter car rend la compréhension de l'historique plus difficile. Il crée plus souvent des conflits ce qui peut faire perdre du code en écrasant des nouvelles modifications par des anciennes.
>
> ![Différence entre rebase et main](/public/rebase-or-merge.png)

> [!TIP]
> La première fois, il est recommandé de créer une branche de sauvegarde avant le rebase : `git checkout -b backup-your-branch`.
>
> Dans tous les cas, veillez à `push` vos commits sur le dépot distant avant de commencer les étapes de rebase pour avoir une sauvegarde de vos modifications sur le dépot distant. Ensuite, vous ne travaillez que sur votre dépot local pour pouvoir annuler les modifications si nécessaire.
>
> Les outils de visualisation graphique de l'historique de `git` sont très utiles pour comprendre le rebase.

Deux méthodes sont possibles pour faire un rebase :

- rebase simple
- rebase avec squash

### Rebase simple

Si vous et votre équipe avez travaillé sur des fonctionnalités indépendantes, vous pouvez faire un rebase simple et vous n'aurez aucun confilt.

```zsh
# Version classique
git checkout main # Aller sur main
git fetch # Vérifier le dépot distant
git pull # Récupérer les dernières modifications
git checkout your-branch # Aller sur votre branche
git rebase main # Rebaser avec main du dépot local

# Version raccourcie
git pull --rebase main # Rebaser avec main du dépot distant
```

Un fois le rebase effectué, vous pouvez vérifier que vos commits sont bien à la suite de la branche `main` avec une interface graphique ou `git log --oneline`.

Si tout est bon, vous pouvez pousser les modifications avec le flag `--force` pour écraser l'historique de la branche distante. C'est obligatoire parce que nous avons modifié l'historique avec le rebase. Attention, c'est une opération irréversible.

```zsh
git push --force
```

### Rebase avec squash

Si vous et votre équipe avez travaillé sur des fonctionnalités liées, vous allez probablement avoir des conflits. Si vous avez fait 15 commits, vous pouvez avoir jusqu'à 15 étapes de conflits : car vos commits sont ajoutés un à un après main. C'est très pénible et génère souvent des erreurs.

Une solution est de regrouper vos commits en un seul : un `squash`. C'est une opération qui va fusionner tous vos commits en un seul. Après le squash, vous n'aurez plus qu'une seule étape de conflit à résoudre.

> [!TIP]
> Essayez le rebase simple d'abord. Si vous avez beaucoup de conflits, vous pouvez annuler le rebase avec `git rebase --abort` puis faire un rebase avec squash.

1. Regrouper vos commits

Ensuite, il faut regrouper/combiner tous vos commits en un seul.

Il y a deux options pour regrouper plusieurs commits :

- **Option 1 :** `uncommit` plusieurs commits en une seule fois

```zsh
# Remplacez n par le nombre de commits que vous voulez regrouper en une seule fois
git reset --soft HEAD~n
```

- **Option 2 :** `uncommit` un commit à la fois

```zsh
# Répétez autant de fois que nécessaire
git reset --soft HEAD~
```

> [!WARNING]
> Utilisez le flag `--soft` avec `reset` pour `uncommit` les modifications en les mettant en statut `staged`.
>
> N'utilisez pas le flag `--hard`, il supprimera vos modifications.

2. Faire le rebase de votre branche et résoudre les conflits

Après avoir regroupé vos commits, il ne peut y avoir qu'une seule étape de conflit au maximum.

```zsh
# Rebaser avec main du dépot distant
git pull --rebase main
```

3. Pousser votre branche

Écrasez le dépot distant avec vos modifications locales.

```zsh
git push --force
```
