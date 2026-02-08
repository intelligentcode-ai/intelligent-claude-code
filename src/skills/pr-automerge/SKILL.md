---
name: pr-automerge
description: Activate when asked to auto-review and merge a PR. Runs a closed-loop workflow: subagent Stage 3 review -> fix findings -> re-review -> post ICC-REVIEW receipt -> merge (optional via workflow.auto_merge).
---

# PR Auto-Review And Merge (Closed Loop)

This skill implements the closed-loop workflow:
Review via subagent -> ICC-REVIEW receipt -> merge when NO FINDINGS -> otherwise fix and restart.

## Inputs

- PR number (required): `<PR-number>`

## Safety Rules

- Default base branch for PRs is `dev`. Never auto-merge a PR targeting `main` unless it is an explicitly requested release workflow.
- Never merge unless a merge-eligible `ICC-REVIEW-RECEIPT` exists for the PR's current head SHA:
  - `Reviewer-Stage: 3 (temp checkout)`
  - `Reviewer-Agent: ... (subagent)`
  - `Head-SHA` matches `headRefOid`
  - `Findings: 0` and `NO FINDINGS`
  - `Result: PASS`
- GitHub approvals are OPTIONAL by default (self-review-and-merge workflow). If you want to enforce GitHub-style approvals,
  set `workflow.require_github_approval=true`.
- Merge approval:
  - If `workflow.auto_merge=true` (standing approval), the agent MAY merge once gates pass.
  - Otherwise, stop and wait for explicit user approval.

## Workflow (Loop Until Clean)

1. Read PR metadata:
   - base branch, head SHA, head branch
   - checks status
2. Run Stage 3 review via a dedicated reviewer subagent:
   - Use Task tool to create `@Reviewer` and run Reviewer Stage 3 in a temp checkout.
   - Reviewer must fix findings by pushing commits to the PR branch.
   - Reviewer must re-run Stage 3 until findings are zero and checks are green.
   - Reviewer must post `ICC-REVIEW-RECEIPT` NO FINDINGS comment for the current head SHA.
   - Pragmatic GitHub approval (best-effort; only if `workflow.require_github_approval=true`): after posting NO FINDINGS
     receipt, reviewer subagent should:
     - Skip if an `APPROVED` review already exists.
     - Otherwise, attempt: `gh pr review <PR-number> --approve --body "Approved based on ICC Stage 3 review receipt (NO FINDINGS)."`
     - If PR author == current authenticated `gh` user: GitHub forbids approving your own PR (server-side rule). Skip.
       - If repo rules require approvals, merge will still be blocked; use a second GitHub identity/bot for approvals.
3. Verify merge gates (receipt + head SHA + checks green).
4. If gates fail:
   - Restart from step 2 (fresh temp checkout).
   - If repeated failures or unclear/risky changes are required, pause for a human decision.
5. If gates pass:
   - If `workflow.auto_merge=true` and base is `dev`: merge the PR (agent-performed merge; do NOT use `--auto`).
   - Else: stop and ask for explicit approval.

## Command Snippets (Reference)

**PR info:**
```bash
PR=<PR-number>
gh pr view "$PR" --json number,baseRefName,headRefName,headRefOid,state,mergeable --jq .
gh pr checks "$PR"
```

**Approval check (optional gate):**
```bash
PR=<PR-number>
PR_AUTHOR=$(gh pr view "$PR" --json author --jq .author.login)
GH_USER=$(gh api user --jq .login)
APPROVALS=$(gh pr view "$PR" --json reviews --jq '[.reviews[] | select(.state=="APPROVED")] | length')
echo "Approvals: $APPROVALS"
if [ "$PR_AUTHOR" = "$GH_USER" ]; then
  echo "Self-authored PR ($GH_USER): GitHub forbids self-approval; approvals may require a bot/second identity."
fi
```

**Receipt verification:**
```bash
PR=<PR-number>
HEAD_SHA=$(gh pr view "$PR" --json headRefOid --jq .headRefOid)
RECEIPT=$(gh pr view "$PR" --json comments --jq '.comments | map(select(.body | contains("ICC-REVIEW-RECEIPT"))) | last | .body // ""')

echo "$RECEIPT" | rg -q "Reviewer-Stage: 3 \\(temp checkout\\)"
echo "$RECEIPT" | rg -q "Reviewer-Agent:.*\\(subagent\\)"
echo "$RECEIPT" | rg -q "Head-SHA: $HEAD_SHA"
echo "$RECEIPT" | rg -q "Findings: 0"
echo "$RECEIPT" | rg -q "NO FINDINGS"
echo "$RECEIPT" | rg -q "Result: PASS"
```

**Merge (agent-performed):**
```bash
gh pr merge <PR-number> --squash --delete-branch
```
