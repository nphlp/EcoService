# Guide sur Git

[Home](../README.md) > [Guide sur Git](./git-guide.md)

Voici quelques bonnes pratiques à suivre pour travailler en équipe avec Git.

<h2>Sommaire</h2>

- [Types de branches](#types-de-branches)
- [Commits \& Push](#commits--push)
- [Mettre à jour une branche par rapport à `main`](#mettre-à-jour-une-branche-par-rapport-à-main)

## Types de branches

- `main` : branche de production, c'est à partir de cette branche qu'est déployé le site internet
- `dev` : branche de développement, c'est la branche sur laquelle toutes les features sont ajoutées unes à unes
- `{nom-developpeur}/{issue-id}` : branche qui agit sur une seule issue, manipulée par un seul développeur
  Exemple: `johndoe/eco-25`

> [!IMPORTANT]
> Les branches `main` et `dev` sont manipulées par le `lead dev` uniquement. \
> Les branches `feat` sont créées et manipuléees par les développeurs eux-mêmes.

## Commits & Push

> [!WARNING] > **Aucune manipulation** sur `git` ne doit être faite au hasard.

C'est un confort pour toute l'équipe de suivre une typologie de nommage de `commits`. On peut aisément savoir ce que représente chaque `commit` :

- Avancement sur la feature : `feat: new feature`
- Correction sur la feature : `fix: issue solved`

> [!NOTE]
> Il est nécessaire de `commit` et `push` le plus régulièrement possible. \
> Par exemple :
>
> - dès qu'un ajout fonctionne
> - dès qu'une erreur est corrigée
> - dès qu'une fonctionnalité est terminée
> - en fin de journée
>
> Si vous travailler sur différents postes, vous devez être en plus rigoureux sur le `commit` et le `push` pour éviter les `conflits` entre vos ordinateurs.

## Mettre à jour une branche par rapport à `main`

Un nouveau commit a été ajouté à la branche `dev`. Vous souhaitez obtenir les dernières modifications de la branche `dev`.

La méthode la plus propre pour l'historique `git` est de rebaser les `commits` de votre branche `feat` à la suite de la branche `dev`.

Voici les étapes à suivre pour faire un **rebase** facilement et rapidement.

> [!NOTE]
> Le **rebase** positionne les `commits` de votre branche `feat` à la suite des `commits` de la branche `dev` pour garder un historique linéaire. \
>
> Le **merge** est a éviter car il crée un `commit` de `merge` qui rend la compréhension de l'historique plus difficile. \
>
> ![Différence entre rebase et main](/public/rebase-or-merge.png)

> [!TIP]
> La première fois, il est recommandé de créer une branche de sauvegarde avant le rebase : `git checkout -b backup-your-branch`.

1. Récupérer les dernières modifications de `main`

```zsh
git checkout main
git fetch
git pull
```

2. Regrouper vos commits

Revenez sur votre branche

```zsh
git checkout your-branch
```

Ensuite, regroupez vos commits. Cela signifie combiner tous vos commits en un seul.

Il y a deux options pour regrouper plusieurs commits :

- **Option 1 :** remplacez `n` dans `HEAD~n` par le nombre de commits que vous voulez regrouper **en une seule fois**.
- **Option 2 :** répétez `HEAD~` plusieurs fois pour regrouper vos commits **un par un**.

> [!WARNING]
> Utilisez le flag `--soft` avec `reset` pour **défaire** vos commits en les mettant en statut **staged**. \
>
> N'utilisez pas le flag `--hard`, il supprimera vos modifications.

```zsh
# Option 1
git reset --soft HEAD~n

# Option 2
git reset --soft HEAD~
```

3. Faire le rebase de votre branche et résoudre les conflits

> [!NOTE]
> Le nombre d'étapes potentielles de conflits correspond au nombre de commits sur votre branche.

Après avoir regroupé vos commits, il ne peut y avoir qu'une seule étape de conflit au maximum.

```zsh
git rebase main
```

4. Pousser votre branche

Après un `rebase`, votre branche locale est basée sur le dernier commit de `main`. Vous **devez forcer** le push pour écraser l'historique de la branche distante.

```zsh
git push --force
```
