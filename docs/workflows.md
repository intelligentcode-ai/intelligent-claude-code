# Reviewed Workflow Enforcement

The reviewed workflow guardrail enforces a predictable sequence for Agents and the Main Scope:

1. **Task** – Main Scope must open a Task (delegation request) before work begins.
2. **Plan** – Create a plan file in `plans/` (for example `plans/FEATURE-123-plan.md`).
3. **Review Plan** – Capture plan feedback inside `reviews/plan/`.
4. **Execute** – Run Bash commands only after the plan review.
5. **Review Execute** – Capture execution verification inside `reviews/execute/`.
6. **Document** – Final documentation in `docs/` or `summaries/` completes the cycle.

When `reviewed_workflow.required` is enabled in `icc.config.json`, the new `workflow-enforcement.js` hook tracks the active step per project and blocks out-of-order operations with actionable instructions.

## Configuration

```jsonc
{
  "reviewed_workflow": {
    "required": true,
    "apply_to_agents": true,
    "steps": [
      { "name": "TASK", "type": "task", "tools": ["Task"] },
      { "name": "PLAN", "type": "write", "path_patterns": ["plans/", "-plan.md"] },
      { "name": "REVIEW_PLAN", "type": "write", "path_patterns": ["reviews/plan"] },
      { "name": "EXECUTE", "type": "command", "tools": ["Bash"] },
      { "name": "REVIEW_EXECUTE", "type": "write", "path_patterns": ["reviews/execute"] },
      { "name": "DOCUMENT", "type": "write", "path_patterns": ["docs/", "summaries/"] }
    ]
  }
}
```

* `required` – turns the enforcement on or off.
* `apply_to_agents` – disable if Agents should skip the workflow guardrail.
* `steps` – optional custom definition. If omitted, the default Task → Documentation workflow is used. `path_patterns` accept simple substrings (`"plans/"`) or regex patterns (`"regex:^plan-.*"`).

Each project maintains its progress under `~/.claude/workflow/<projectHash>.json`. After the DOCUMENT step the workflow resets and the next Task starts a new cycle.

## Testing

The workflow integration test (`tests/workflows/test-reviewed-workflow.js`) provisions a temporary project, enables the workflow in `icc.config.json`, and simulates the full sequence using the same hook entrypoints that Claude Code uses. Run all tests (including workflow coverage) with:

```bash
npm test
# or
bash tests/run-tests.sh
```
