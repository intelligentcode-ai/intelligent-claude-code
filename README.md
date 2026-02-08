# Intelligent Claude Code

Skills-first, role-based agent workflow for Claude Code and other SKILL.md-compatible tools.

## What You Get (v10.2.x)

- **36 Skills** loaded on demand (roles + process + enforcement companions).
- **Role-based specialists**: 14 core roles plus dynamic specialists when needed.
- **Cross-platform work tracking** via `.agent/queue/` (works across CLIs/editors).
- **Minimal safety hooks** (Claude Code only): infra protection + file hygiene.
- **PR workflow that stays fast**:
  - GitHub can require a PR, while ICC enforces “review required” via `ICC-REVIEW-RECEIPT`.
  - Optional automation for merge (standing approval) and release steps.

## Install

```bash
git clone https://github.com/intelligentcode-ai/intelligent-claude-code.git
cd intelligent-claude-code
make install              # or .\install.ps1 install on Windows
make clean-install        # force uninstall + reinstall (Linux/macOS)
```

## Using Roles (Still Yes)

This is the primary way to involve roles:

```text
@PM break down the story
@Architect review the design
@Developer implement auth
@Reviewer audit for regressions
```

## Workflow At A Glance

Branch flow:

```text
feature/*  -> PR -> dev  -> (release PR) -> main
```

ICC review/merge gate:
- A dedicated post-PR Stage 3 review (temp checkout context) posts an `ICC-REVIEW-RECEIPT` comment for the PR’s current head SHA.
- **Findings must be 0** (`NO FINDINGS`) and checks must be green.
- Then, and only then, the PR is mergeable by Skills rules.

## Configuration

- `icc.config.json` controls enforcement and behavior (git privacy, branch protection, paths, etc.).
- `icc.workflow.json` controls workflow-level automation (auto-merge standing approval, optional GitHub approvals gate, release automation).

Common workflow switches:
```json
{
  "medium": { "auto_merge": true },
  "large":  { "auto_merge": true },
  "mega":   { "auto_merge": true }
}
```

Optional: require GitHub-native approvals (in addition to ICC receipts):
```json
{
  "medium": { "require_github_approval": true },
  "large":  { "require_github_approval": true },
  "mega":   { "require_github_approval": true }
}
```

## Docs

Start here: `docs/index.md`

## License

MIT (see `LICENSE`)
