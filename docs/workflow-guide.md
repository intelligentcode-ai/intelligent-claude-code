# Workflow Guide (v10.2)

This project is **dev-first** and **skills-gated**:
- GitHub can require a PR, while ICC enforces “review required” via an `ICC-REVIEW-RECEIPT`.
- Merges may be done by a human or by the agent. When the agent merges, it uses `gh pr merge` (not GitHub auto-merge `--auto`).

## Two-Minute Version

Normal change:
1. Branch → PR into `dev`.
2. `Reviewer` leaves an `ICC-REVIEW-RECEIPT` comment that says **PASS** for the PR’s current commit.
3. Merge.

Release:
1. Release PR `dev` → `main`.
2. Version + changelog updates.
3. `Reviewer` leaves `ICC-REVIEW-RECEIPT` PASS for the release PR’s current commit.
4. Merge → tag → GitHub release → sync `main` back into `dev`.

## Branch Workflow (Dev-First)

```text
feature/*  -> PR -> dev  -> (release PR) -> main
```

- `dev` is the integration branch (all feature work merges here first).
- `main` is stable releases only (merge `dev` to `main` only when releasing).

## Review Required (Skills-Level Gate)

Every merge must have a **fresh** PR receipt that matches the current head SHA:

- Comment marker: `ICC-REVIEW-RECEIPT`
- Stage: `Reviewer-Stage: 3 (temp checkout)`
- Must include:
  - `Head-SHA: <sha>` matching the PR’s current `headRefOid`
  - `Findings: 0` and `NO FINDINGS`
  - `Result: PASS`

Plain English:
- The receipt is a “review stamp” that’s tied to an exact commit.
- If the code changes, the stamp is stale and must be redone.

## Merge Approval

Default: the agent **waits for explicit user approval** before merging.

Optional: standing approval via workflow config:
- `workflow.auto_merge=true` lets the agent merge PRs targeting `dev` once gates pass.

## Optional GitHub-Style Approvals

By default, this repo uses **self-review-and-merge**:
- PR required (branch protection), GitHub required approvals may remain at 0.
- ICC Stage 3 receipt is the required review gate.

If you want to also require a GitHub-native approval gate, set:
- `workflow.require_github_approval=true`

Note: GitHub forbids approving your own PR. If you require GitHub approvals for self-authored PRs, you need a second
GitHub identity/bot.

## Release Workflow

Release is a separate workflow (explicitly requested):

1. Stabilize `dev` (tests pass, no blocking findings).
2. Create a release PR: `dev` -> `main`.
3. Bump version + update `CHANGELOG.md`.
4. Stage 3 review on the release PR and post a PASS receipt.
5. Merge release PR to `main` (explicit approval).
6. Tag and publish release:
   - `git tag -a vX.Y.Z -m "Release vX.Y.Z"`
   - `gh release create vX.Y.Z ...`
7. Sync `main` back into `dev` (release PR is often squashed on `main`).

## Configuration

Workflow settings live in `icc.workflow.json` with the hierarchy documented in `docs/configuration-guide.md`.

Common examples:

```json
{
  "medium": { "auto_merge": true },
  "large":  { "auto_merge": true },
  "mega":   { "auto_merge": true }
}
```

```json
{
  "medium": { "require_github_approval": true },
  "large":  { "require_github_approval": true },
  "mega":   { "require_github_approval": true }
}
```

## Skills Used

- `process`: end-to-end dev workflow (test/review/suggest loops, PR phase, release phase)
- `reviewer`: Stage 1/2/3 review with auto-fix and receipt posting (Stage 3)
- `commit-pr`: commit + PR conventions and merge gates
- `pr-automerge`: closed-loop review/fix/re-review/receipt/merge (for PRs to `dev`)
- `release`: version bump, changelog, tag, GitHub release
