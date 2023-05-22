# Git

## Git Flow

## Branching

I want to create a new branch off of 'main'

```bash
git checkout main # Might already be there
git checkout -b my-new-branch
```

I want to merge a branch to my branch. My branch was originally created off of 'main'. Someone else has merged new code to 'main' since I first created my branch.

```bash
git checkout main
git pull       # Fetches the latest code from GitHub for 'main'
git checkout my-new-branch
git merge main # Create a new commit with all the changes from 'main' since this branch was last created/updated
```

_Oh no! When I ran `git checkout main` I got a message saying I had files staged_

This means you have made changes to files that have not been committed. You can either commit these changes, discard them, or '[stash](https://www.atlassian.com/git/tutorials/saving-changes/git-stash)' them

### Branch Naming

There are a number of patterns for naming branches and structuring commit messages. Most follow a general pattern of `<category>/<description>`/`<category>-<description>` or `<category>/<issue>/<description>`/`<category>-<issue>-<description>`.

The category is usually one of `feature`, `bugfix`, `hotfix`, or `test`. The description should be a short, descriptive phrase. For example, `feature/add-login-page` or `bugfix/fix-login-page`.

The `issue` corresponds to the ticketing system used to track work. Many software companies use 'agile' tracking software such as [Jira](https://www.atlassian.com/software/jira) or [Azure DevOps](https://azure.microsoft.com/en-us/services/devops/). These systems allow you to create 'issues' or 'tickets' that describe a piece of work. The issue number is usually a number that is automatically generated.

For a GitHub Projects-based workflow, the issue number is the number of the card in the project board. We can use a custom attribute, 'Category' for the category. We can drop the description requirement if there are only a few tickets going in at a time.

| Category | Example            |
| :------- | :----------------- |
| feat     | `feat/issue-1`     |
| fix      | `fix/issue-17`     |
| refactor | `refactor/issue-1` |
| chore    | `chore/issue-1`    |

[A Simplified Convention for Naming Branches and Commits in Git](https://dev.to/varbsan/a-simplified-convention-for-naming-branches-and-commits-in-git-il4#:~:text=Branch%20Naming%20Convention&text=A%20git%20branch%20should%20start,bugfix%20%2C%20hotfix%20%2C%20or%20test%20.&text=After%20the%20category%2C%20there%20should,%2C%20just%20add%20no%2Dref%20)

## Commiting

I have changes to my files and want to commit them and send them to GitHub

```bash
git add file1 # Or 'git add .' to add all files
git commit -m "Commit message" # Be descriptive, in the past tense. e.g. 'Removed unused environment variable in Dockerfile'
git push
```
