# Git Guide

[Home](../README.md) > [Git Guide](./git-guide.md)

Here are some best practices to follow for team collaboration with Git.

<h2>Summary</h2>

- [Branch types](#branch-types)
- [Commits \& Push](#commits--push)
- [Update a branch relative to `main`](#update-a-branch-relative-to-main)
    - [Simple rebase](#simple-rebase)
    - [Rebase with squash](#rebase-with-squash)

## Branch types

- `main`: production branch, the website is deployed from this branch
- `test`: development branch, this is the branch where all features are added one by one
- `{developer-name}/{issue-id}`: `feat` branch that works on a single issue, handled by a single developer
  Example: `johndoe/eco-25`

> [!IMPORTANT]
> The `main` and `test` branches are handled by the `lead dev` only. \
> The `feat` branches are created and handled by the developers themselves.

## Commits & Push

> [!WARNING]
>
> **No manipulation** on `git` should be done randomly.

It's convenient for the whole team to follow a commit naming convention. We can easily know what each `commit` represents:

- Progress on the feature: `feat: {new feature description}`
- Fix on the feature: `fix: {bug fix description}`

> [!NOTE]
> It is necessary to `commit` and `push` as regularly as possible. For example:
>
> - as soon as an addition works
> - as soon as an error is fixed
> - as soon as a functionality is completed
> - at the end of the day
>
> If you work on different computers, you must be more rigorous about `commit` and `push` to avoid `conflicts` between your computers.

## Update a branch relative to `main`

A new commit has been added to the `main` branch. You want to get the latest changes from the `main` branch.

The cleanest method for `git` history is to rebase the `commits` you added to your `feat` branch after the new commit from the `main` branch.

Here are the steps to follow to do a **rebase** easily and quickly.

> [!NOTE]
> The **rebase** positions the `commits` from your `feat` branch after the `commits` from the `main` branch to keep a linear history. This way, your `commits` are only code additions during the `Pull request`, which avoids losing code.
>
> The **merge** creates a `merge` `commit`, it should be avoided as it makes understanding the history more difficult. It creates conflicts more often which can cause code loss by overwriting new changes with old ones.
>
> ![Difference between rebase and merge](/public/rebase-or-merge.png)

> [!TIP]
> The first time, it is recommended to create a backup branch before rebasing: `git checkout -b backup-your-branch`.
>
> In any case, make sure to `push` your commits to the remote repository before starting the rebase steps to have a backup of your changes on the remote repository. Then, you only work on your local repository to be able to cancel changes if necessary.
>
> Graphical visualization tools for `git` history are very useful for understanding rebase.

Two methods are possible for rebasing:

- simple rebase
- rebase with squash

### Simple rebase

If you and your team have worked on independent features, you can do a simple rebase and you will have no conflicts.

```zsh
# Classic version
git checkout main               # Go to main
git fetch                       # Check the remote repository
git pull                        # Get the latest changes
git checkout your-branch        # Go to your branch
git rebase main                 # Rebase with local main

# Shortened version
git pull --rebase origin main   # Rebase with remote main
```

Once the rebase is done, you can verify that your commits are properly after the `main` branch with a graphical interface or `git log --oneline`.

If everything is good, you can push the changes with the `--force` flag to overwrite the remote branch history. This is mandatory because we modified the history with the rebase. Warning, this is an irreversible operation.

```zsh
git push --force
```

### Rebase with squash

If you and your team have worked on related features, you will probably have conflicts. If you made 15 commits, you can have up to 15 conflict steps: because your commits are added one by one after main. This is very tedious and often generates errors.

One solution is to group your commits into one: a `squash`. This is an operation that will merge all your commits into one. After the squash, you will only have one conflict step to resolve.

> [!TIP]
> Try the simple rebase first. If you have many conflicts, you can cancel the rebase with `git rebase --abort` then do a rebase with squash.

1. Group your commits

Then, you need to group/combine all your commits into one.

There are two options to group multiple commits:

- **Option 1:** `uncommit` multiple commits at once

```zsh
# Replace n with the number of commits you want to group at once
git reset --soft HEAD~n
```

- **Option 2:** `uncommit` one commit at a time

```zsh
# Repeat as many times as necessary
git reset --soft HEAD~1
```

> [!WARNING]
> Use the `--soft` flag with `reset` to `uncommit` changes by putting them in `staged` status.
>
> Do not use the `--hard` flag, it will delete your changes.

2. Rebase your branch and resolve conflicts

After grouping your commits, there can be at most one conflict step.

```zsh
# Rebase with remote main
git pull --rebase origin main
```

3. Push your branch

Overwrite the remote repository with your local changes.

```zsh
git push --force
```
