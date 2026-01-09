---
layout: default
title: "SDM Session 1: Git & Version Control"
parent: Module 5 - OS & SDM
nav_order: 11
---

# Session 1: Git & Version Control (4 hours)

## Learning Objectives
- Understand the need for version control in team development
- Learn Git fundamentals and architecture
- Master essential Git commands
- Understand branching strategies and merging

---

## Developing an Application in a Team

### Challenges Without Version Control

When multiple developers work on the same project simultaneously, several issues arise:

```mermaid
mindmap
  root((Team Development Challenges))
    Code Conflicts
      Multiple edits to same file
      Overwriting others work
      Lost changes
    Tracking
      Who changed what
      When changes made
      Why changes made
    Backup
      Code loss risk
      No history
      Disaster recovery
    Collaboration
      Sharing code
      Merging work
      Parallel development
```

| Issue | Description | Impact |
|-------|-------------|--------|
| **Code Overwriting** | Developer A's changes overwritten by Developer B | Lost work, wasted effort |
| **No History** | Cannot track who made changes | Accountability issues |
| **Merge Conflicts** | Same file edited by multiple people | Integration nightmares |
| **No Versioning** | Cannot revert to previous versions | Bug fixes become difficult |
| **Sharing Difficulty** | Manual file sharing via email/USB | Inefficient, error-prone |

---

## Introduction to Code Versioning System

**Version Control System (VCS)** is software that tracks changes to files over time, allowing you to recall specific versions later.

### History of Version Control Systems

```mermaid
timeline
    title Evolution of Version Control
    1972 : SCCS (Source Code Control System)
         : Bell Labs - First VCS
    1982 : RCS (Revision Control System)
         : Walter Tichy - Single files
    1986 : CVS (Concurrent Versions System)
         : Dick Grune - Network support
    2000 : SVN (Subversion)
         : CollabNet - Better than CVS
    2005 : Git
         : Linus Torvalds - Distributed VCS
    2008 : GitHub
         : Social coding platform
```

### Types of Version Control Systems

```mermaid
graph TD
    A[Version Control Systems] --> B[Local VCS]
    A --> C[Centralized VCS]
    A --> D[Distributed VCS]
    
    B --> B1[RCS]
    C --> C1[SVN, CVS, Perforce]
    D --> D1[Git, Mercurial]
    
    style D fill:#4ecdc4
    style D1 fill:#95e1d3
```

| Type | Description | Advantages | Disadvantages | Examples |
|------|-------------|------------|---------------|----------|
| **Local VCS** | Database on local computer tracking file changes | Simple, no network needed | No collaboration, single point of failure | RCS |
| **Centralized VCS** | Single server stores all versions, clients checkout files | Central authority, easier management | Server down = no work, single point of failure | SVN, CVS, Perforce |
| **Distributed VCS** | Every client has full repository copy | No single point of failure, offline work, faster operations | More complex, larger storage | **Git**, Mercurial |

---

## Software Development Workflow

### Typical Git Workflow

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant Local as Local Repo
    participant Remote as Remote Repo (GitHub)
    
    Dev->>Local: git init / git clone
    Note over Dev,Local: Setup repository
    
    loop Development Cycle
        Dev->>Dev: Edit files
        Dev->>Local: git add (stage changes)
        Dev->>Local: git commit (save snapshot)
    end
    
    Dev->>Remote: git push (upload)
    Remote->>Local: git pull (download updates)
    Local->>Dev: Merge changes
```

---

## Introduction to Git

**Git** is a free and open-source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

### Git vs Other VCS

| Feature | Git | SVN | CVS |
|---------|-----|-----|-----|
| **Type** | Distributed | Centralized | Centralized |
| **Speed** | Very Fast | Slow | Slow |
| **Branching** | Lightweight | Heavy | Heavy |
| **Offline Work** | Yes | Limited | No |
| **Data Integrity** | SHA-1 checksums | None | None |
| **Space** | Full repo copy | Working copy only | Working copy only |

### Why Git?

1. **Speed**: Operations are local
2. **Data Integrity**: SHA-1 hash for every commit
3. **Branching**: Cheap and easy
4. **Distributed**: Everyone has full backup
5. **Staging Area**: Review before commit
6. **Open Source**: Free and widely supported

---

## Git Repository and Git Structure

### Git Architecture

```mermaid
graph TB
    subgraph "Remote"
        R[Remote Repository<br/>GitHub/GitLab/Bitbucket]
    end
    
    subgraph "Local Machine"
        W[Working Directory<br/>Your project files]
        S[Staging Area<br/>Index / Cache]
        L[Local Repository<br/>.git folder]
    end
    
    W -->|git add| S
    S -->|git commit| L
    L -->|git push| R
    R -->|git pull/fetch| L
    L -->|git checkout/merge| W
    
    style R fill:#ff6b6b
    style W fill:#ffe66d
    style S fill:#4ecdc4
    style L fill:#95e1d3
```

### Three States of Git Files

| State | Description | Location |
|-------|-------------|----------|
| **Modified** | Changed file, not staged | Working Directory |
| **Staged** | Marked for next commit | Staging Area (Index) |
| **Committed** | Safely stored in database | Local Repository |

### .git Directory Structure

```
project/
├── .git/                    # Git repository data
│   ├── HEAD                 # Pointer to current branch
│   ├── config               # Repository configuration
│   ├── hooks/               # Client/server-side scripts
│   ├── index                # Staging area
│   ├── objects/             # All content (blobs, trees, commits)
│   └── refs/                # Pointers to commits (branches, tags)
├── src/                     # Your source files
├── README.md
└── .gitignore               # Files to ignore
```

---

## Adding Code to Git

### Initial Setup

```bash
# Configure Git (one-time setup)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# View configuration
git config --list
git config user.name
```

### Creating Repository

```bash
# Initialize new repository
git init

# Clone existing repository
git clone https://github.com/username/repository.git
git clone https://github.com/username/repository.git custom-folder-name
```

### Basic Workflow Commands

```bash
# Check status of files
git status

# Add files to staging area
git add filename.txt          # Single file
git add .                     # All files
git add *.java                # All Java files
git add src/                  # All files in directory

# Commit staged changes
git commit -m "Your descriptive commit message"
git commit -am "Add and commit tracked files"

# View commit history
git log                       # Full history
git log --oneline             # Compact view
git log --oneline -n 5        # Last 5 commits
git log --graph --all         # Visual branch graph
```

### Working with Changes

```bash
# View changes
git diff                      # Working vs Staging
git diff --staged             # Staging vs Last commit
git diff HEAD                 # Working vs Last commit
git diff commit1 commit2      # Between two commits

# Undo changes
git checkout -- filename      # Discard working directory changes
git reset HEAD filename       # Unstage file
git reset --soft HEAD~1       # Undo last commit, keep changes staged
git reset --hard HEAD~1       # Undo last commit, discard changes

# Remove files
git rm filename               # Remove and stage
git rm --cached filename      # Remove from Git, keep file
```

---

## Creating and Merging Git Branches

### Understanding Branches

```mermaid
gitGraph
    commit id: "Initial"
    commit id: "Add README"
    branch feature-login
    checkout feature-login
    commit id: "Add login form"
    commit id: "Add validation"
    checkout main
    branch feature-signup
    checkout feature-signup
    commit id: "Add signup page"
    checkout main
    merge feature-login id: "Merge login"
    checkout feature-signup
    commit id: "Add email verification"
    checkout main
    merge feature-signup id: "Merge signup"
```

### Branch Commands

```bash
# List branches
git branch                    # Local branches
git branch -a                 # All branches (including remote)
git branch -v                 # With last commit info

# Create branch
git branch feature-login

# Switch to branch
git checkout feature-login
git switch feature-login      # Modern syntax (Git 2.23+)

# Create and switch
git checkout -b feature-signup
git switch -c feature-signup  # Modern syntax

# Rename branch
git branch -m old-name new-name

# Delete branch
git branch -d feature-login   # Safe delete (merged only)
git branch -D feature-login   # Force delete
```

### Merging Branches

```mermaid
graph LR
    subgraph "Before Merge"
        A1[main] --> B1[commit 1]
        B1 --> C1[commit 2]
        C1 --> D1[HEAD]
        C1 --> E1[feature]
        E1 --> F1[commit 3]
    end
    
    subgraph "After Merge"
        A2[main] --> B2[commit 1]
        B2 --> C2[commit 2]
        C2 --> D2[merge commit]
        E2[feature] --> F2[commit 3]
        F2 --> D2
        D2 --> G2[HEAD]
    end
```

```bash
# Merge branch into current branch
git checkout main
git merge feature-login

# Merge with commit message
git merge feature-login -m "Merge feature-login into main"

# Abort merge
git merge --abort
```

### Handling Merge Conflicts

When Git cannot automatically merge, conflicts occur:

```plaintext
<<<<<<< HEAD
Current branch content (yours)
=======
Incoming branch content (theirs)
>>>>>>> feature-branch
```

**Resolution Steps:**

```bash
# 1. Identify conflicted files
git status

# 2. Open and edit files to resolve conflicts
#    (Remove markers and keep desired content)

# 3. Stage resolved files
git add resolved-file.txt

# 4. Complete merge
git commit -m "Resolved merge conflicts"
```

---

## Remote Operations

### Working with Remote Repositories

```mermaid
graph TB
    subgraph "Local Repository"
        L[Local Repo]
    end
    
    subgraph "Remote Repositories"
        O[origin<br/>GitHub/primary]
        U[upstream<br/>Original fork source]
    end
    
    L -->|push| O
    O -->|pull/fetch| L
    U -->|fetch| L
    
    style O fill:#4ecdc4
    style U fill:#ffe66d
```

```bash
# Add remote
git remote add origin https://github.com/user/repo.git
git remote add upstream https://github.com/original/repo.git

# View remotes
git remote -v

# Push to remote
git push origin main
git push -u origin main       # Set upstream, track branch
git push --all origin         # Push all branches

# Pull from remote
git pull origin main
git pull                      # From tracked branch

# Fetch (download without merge)
git fetch origin
git fetch --all

# Remove remote
git remote remove origin
```

---

## Important Git Concepts

### HEAD

**HEAD** is a pointer to the current branch reference, which is a pointer to the last commit made on that branch.

```bash
# View HEAD
cat .git/HEAD

# Detached HEAD (directly pointing to commit)
git checkout abc1234
```

### .gitignore

File specifying patterns of files to ignore:

```plaintext
# .gitignore examples
*.log                 # Ignore all log files
node_modules/         # Ignore directory
*.class               # Ignore Java class files
.env                  # Ignore environment file
!important.log        # Exception - don't ignore this
build/                # Ignore build output
.DS_Store             # macOS files
Thumbs.db             # Windows files
```

### Tags

Mark specific points in history (usually releases):

```bash
# Create tag
git tag v1.0.0
git tag -a v1.0.0 -m "Version 1.0.0 release"

# List tags
git tag

# Push tags
git push origin v1.0.0
git push --tags

# Checkout tag
git checkout v1.0.0
```

---

## Git Branching Strategies

### Feature Branch Workflow

```mermaid
gitGraph
    commit id: "c1"
    commit id: "c2"
    branch feature-1
    commit id: "f1"
    commit id: "f2"
    checkout main
    branch feature-2
    commit id: "f3"
    checkout main
    merge feature-1 id: "m1"
    checkout feature-2
    commit id: "f4"
    checkout main
    merge feature-2 id: "m2"
```

### Git Flow

```mermaid
gitGraph
    commit id: "start"
    branch develop
    commit id: "dev1"
    branch feature
    commit id: "feat1"
    commit id: "feat2"
    checkout develop
    merge feature id: "merge-feat"
    branch release
    commit id: "rel1"
    checkout main
    merge release id: "v1.0" tag: "v1.0.0"
    checkout develop
    merge release id: "back-merge"
```

| Branch | Purpose | Lifetime |
|--------|---------|----------|
| **main/master** | Production-ready code | Permanent |
| **develop** | Integration branch for features | Permanent |
| **feature/*** | New features | Temporary |
| **release/*** | Prepare for release | Temporary |
| **hotfix/*** | Emergency production fixes | Temporary |

---

## Lab Exercises

### Exercise 1: Create Local Repository

```bash
# Create project directory
mkdir my-project
cd my-project

# Initialize Git
git init

# Create initial files
echo "# My Project" > README.md
echo "console.log('Hello');" > app.js

# Check status
git status

# Add and commit
git add .
git commit -m "Initial commit"
```

### Exercise 2: Work with Branches

```bash
# Create and switch to feature branch
git checkout -b feature-login

# Make changes
echo "function login() { }" >> app.js

# Commit changes
git add app.js
git commit -m "Add login function"

# Switch back and merge
git checkout main
git merge feature-login

# Delete feature branch
git branch -d feature-login
```

### Exercise 3: Remote Operations

```bash
# Add remote origin
git remote add origin https://github.com/username/my-project.git

# Push to remote
git push -u origin main

# Pull updates
git pull origin main
```

---

## Quick Reference Table

| Command | Description |
|---------|-------------|
| `git init` | Initialize repository |
| `git clone <url>` | Clone repository |
| `git status` | Check status |
| `git add <file>` | Stage file |
| `git commit -m "msg"` | Commit changes |
| `git push` | Upload to remote |
| `git pull` | Download from remote |
| `git branch` | List branches |
| `git checkout -b <name>` | Create & switch branch |
| `git merge <branch>` | Merge branch |
| `git log --oneline` | View history |
| `git diff` | View changes |

---

## CCEE Exam Focus Points

> [!IMPORTANT]
> **Key Concepts for MCQs:**
> - Git is a **Distributed Version Control System**
> - Three states: Modified, Staged, Committed
> - `git add` moves files to staging area
> - `git commit` saves to local repository
> - `git push` uploads to remote repository
> - `git pull` = `git fetch` + `git merge`
> - HEAD points to current branch/commit
> - `.gitignore` specifies files to ignore

> [!TIP]
> **Common Exam Questions:**
> - Difference between centralized and distributed VCS
> - Git commands for basic workflow
> - Purpose of staging area
> - Branch creation and merging commands
> - Conflict resolution steps

---

*End of Session 1: Git & Version Control*
