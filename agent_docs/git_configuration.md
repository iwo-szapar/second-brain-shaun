# Git Configuration Guide

## Required Push Configuration

### Large File Push Setup (CRITICAL)

AI Maturity Index's `company brain/` directory contains large files that require special Git configuration.

```bash
# CRITICAL: Set large HTTP buffer before pushing (prevents HTTP 400 errors)
git config http.postBuffer 524288000
git push origin main
```

**Why**: The repository contains large files in `company brain/` that exceed GitHub's default HTTP buffer size.

## Common Issues and Solutions

### HTTP 400 Errors During Push
**Cause**: Large files exceeding default HTTP buffer
**Solution**:
```bash
git config http.postBuffer 524288000
git push origin main
```

### "Everything up-to-date" But Changes Not Pushed
**Cause**: Uncommitted changes in working directory
**Solution**:
```bash
git status                    # Check for uncommitted changes
git add .                     # Stage changes
git commit -m "description"   # Commit changes
git push origin main          # Push to remote
```

### Verifying Push Success
```bash
# Compare local and remote commit hashes
git log -1 --format="%H"              # Local latest commit
git ls-remote origin main             # Remote latest commit

# Should match - if not, push didn't succeed
```

## Standard Git Workflow

```bash
# 1. Check status
git status

# 2. Stage changes
git add .

# 3. Commit with descriptive message
git commit -m "descriptive message explaining what changed"

# 4. Configure for large files (ALWAYS do this before push)
git config http.postBuffer 524288000

# 5. Push to remote
git push origin main
```

## Pre-Commit Checklist

Before every push:
- [ ] Check `git status` for untracked files
- [ ] Review `git diff` for unexpected changes
- [ ] Verify commit message is descriptive
- [ ] Set `http.postBuffer` configuration
- [ ] Verify push succeeded with `git ls-remote`

## Branch Information

- **Main branch**: `main`
- **Use for PRs**: `main`
- **Current branch**: Check with `git branch --show-current`

## Additional Git Commands

```bash
# View recent commits
git log --oneline -10

# View specific file history
git log --follow -- path/to/file

# Compare branches
git diff main..feature-branch

# Fetch without merge
git fetch origin main

# Pull latest changes
git pull origin main

# View remote information
git remote -v
```
