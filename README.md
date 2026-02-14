# Intelligent Claude Code (Archived)

> ARCHIVED STATUS
> This repository is archived and will receive **NO FUTURE DEVELOPMENT**.
> It remains available for visibility and historical reference only.
>
> PROJECT CONTINUATION
> This project continues as **Intelligent-Code-Agents (ICA)**.
> Active repository: https://github.com/intelligentcode-ai/intelligent-code-agents

ICC (Intelligent Claude Code) is a set of skills and conventions for running a clean PR workflow with Claude Code.

## What You Get
- A small set of focused skills (roles, review, release, git/file hygiene).
- Work tracking in `.agent/queue/`.
- A PR review stamp (`ICC-REVIEW-RECEIPT`) that is tied to an exact commit SHA.
- A dev-first branch flow: PRs target `dev`; releases go `dev` -> `main`.

## Install

```bash
git clone https://github.com/intelligentcode-ai/intelligent-claude-code.git
cd intelligent-claude-code
make install              # or .\install.ps1 install on Windows
make clean-install        # force uninstall + reinstall (Linux/macOS)
```

## Using Roles (No "@")

Use the role name as a prefix:

```text
PM: break down the story
Architect: review the design
Developer: implement auth
Reviewer: audit for regressions
```

## Workflow At A Glance

Normal change (feature/fix):
1. Create a branch.
2. Open a PR into `dev`.
3. `Reviewer` reviews the PR in a clean checkout and leaves an `ICC-REVIEW-RECEIPT` comment that says **PASS** for the
   PR's current commit SHA.
4. Merge the PR.

Release:
1. Open a release PR from `dev` into `main`.
2. Bump `VERSION` (and `src/VERSION`), update `CHANGELOG.md`.
3. `Reviewer` leaves an `ICC-REVIEW-RECEIPT` PASS on the release PR.
4. Merge the release PR to `main`, tag `vX.Y.Z`, publish the GitHub release.
5. Sync `main` back into `dev`.

Branch flow:

```text
feature/*  -> PR -> dev  -> (release PR) -> main
```

What is `ICC-REVIEW-RECEIPT`?
- It's a PR comment that acts like a "review stamp".
- It includes the PR’s exact commit (`Head-SHA`) it applies to.
- If the code changes after the stamp (new commits), the stamp is stale and must be redone.

## Configuration

- `icc.config.json`: enforcement and behavior (git privacy, branch protection, paths, etc.).
- `icc.workflow.json`: workflow automation (standing approval for merge, optional GitHub approvals gate, release automation).

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
