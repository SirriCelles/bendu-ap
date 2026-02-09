# Branching Strategy

This project uses a lightweight trunk-based workflow.

## Rules

- Keep `main` always deployable.
- Do work in short-lived task branches.
- One branch should target one primary todo task (`T-xxx`).
- Merge to `main` only through Pull Requests.

## Branch Naming

Use:

`<type>/t-<id>-<short-slug>`

Examples:

- `feat/t-009-test-ci-baseline`
- `feat/t-024-booking-zod-schemas`
- `fix/t-009b-todo-sync-dedupe`
- `chore/t-008-rate-limit-docs`

Suggested types:

- `feat` for new functionality
- `fix` for bug fixes
- `chore` for maintenance/tooling/docs
- `refactor` for behavior-preserving code changes

## Daily Workflow

1. Sync local `main`.
2. Create a branch for the task.
3. Set task status in `todo.md` to `IN_PROGRESS`.
4. Implement task scope only.
5. Run local checks (`lint`, `build`, tests as applicable).
6. Set task status to `DONE` when complete.
7. Open PR and merge after checks pass.

Commands:

```bash
git checkout main
git pull origin main
git checkout -b feat/t-009-test-ci-baseline
```

## Commit Conventions

- Include the task id in commit messages when possible.
- Keep commits scoped and readable.

Examples:

- `feat(test): add vitest + rtl baseline (T-009)`
- `fix(sync): use issue markers for stable issue matching (T-009B)`

## PR and Merge Policy

- Open PRs early for visibility.
- Require CI checks before merge.
- Use **Squash and merge** for a clean `main` history.
- Delete branch after merge.

## Scope and Safety

- Avoid mixing unrelated tasks in one branch.
- If work grows beyond the planned task, split into another branch/PR.
- Hotfixes should use dedicated `fix/...` branches and merge quickly.
