# Troubleshooting (v10.2)

## Install Issues

### `make install` fails

1. Re-run with a clean reinstall:
   - macOS/Linux: `make clean-install`
2. Check prerequisites:
   - `git`
   - `make` (or PowerShell on Windows)
   - `node` + `npm` (recommended, for the memory skill)

### Hooks not taking effect (Claude Code)

1. Confirm hooks exist in the installed location:
   - `~/.claude/hooks/`
2. Confirm project settings reference the hooks (installer-managed).
3. In this repo, hooks live in `src/hooks/`.

## Skills Not Loading / Not Triggering

- Ensure skills are installed:
  - `~/.claude/skills/` (user-global)
  - `.claude/skills/` (project-local, optional)
- Trigger rules:
  - mention a role/skill name directly (e.g. `Reviewer`, “use `reviewer`”)
  - or describe the intent clearly (“review for regressions”, “create a PR”, “cut a release”)

## PR Merge Gate Problems

### Receipt exists but merge should not happen

The receipt must match the PR’s **current head SHA**. If any new commits were pushed, the PR must be re-reviewed and a
new `ICC-REVIEW-RECEIPT` posted.

### `workflow.auto_merge=true` but merge still pauses

Auto-merge is a workflow-level standing approval. Verify the workflow hierarchy and the effective config:
- `icc.workflow.json` (project)
- `~/.claude/icc.workflow.json` (user)

See `docs/configuration-guide.md`.

### GitHub shows “0 approvals”

Default is self-review-and-merge:
- GitHub required approvals may remain at 0.
- `ICC-REVIEW-RECEIPT` is the required review gate.

If you want GitHub-native approvals as an additional gate, enable:
- `workflow.require_github_approval=true`

Note: GitHub forbids approving your own PR.

## Memory Skill Issues

### Embeddings/model download is slow

The memory skill downloads a local embedding model on first use (~80MB). This is expected.

### Node dependencies missing

Install memory dependencies:
```bash
cd ~/.claude/skills/memory
npm install --production
```

## Legacy Documentation

Removed. The docs set is intentionally curated for the current v10.2 workflow.
