## Commit Message Convention

Format:
```
<type>: <short, clear description>
```

Allowed types (for this project):
- chore: tooling, configs, formatting
- setup: project initialization
- feat: user-visible feature
- fix: bug fix
- refactor: internal restructuring
- docs: README or documentation
- test: tests only

## Best Commit Practices (with examples)

### 1) Commit small, focused changes
- One logical change per commit.
- Avoid mixing refactors with behavior changes.

Example:
```
feat(auth): add password reset endpoint
```

### 2) Write clear, consistent commit messages
- Use a short, imperative subject line.
- Keep subject under ~60 characters.
- Add a body when the "why" is not obvious.

Example:
```
fix(api): handle empty search query

Return 400 for empty query to avoid expensive full scan.
```

### 3) Use a conventional prefix (if your team uses one)
- Common prefixes: feat, fix, docs, refactor, test, chore.
- Add a scope for clarity when helpful.

Example:
```
refactor(ui): extract button styles
```

### 4) Prefer present tense and active voice
- "Add", "Fix", "Remove", "Update", not "Added", "Fixed".

Example:
```
docs(readme): add setup instructions
```

### 5) Explain breaking changes clearly
- Call out breaking behavior in the body.

Example:
```
feat(api): rename /v1/users to /v2/users

BREAKING CHANGE: update clients to use /v2/users.
```

### 6) Reference issues or tickets when relevant
- Tie commits to a task or bug report.

Example:
```
fix(cart): prevent duplicate items (PROJ-241)
```

### 7) Keep commits buildable
- Avoid committing code that doesn't compile or tests that fail.

Example:
```
test(auth): add coverage for token refresh
```
