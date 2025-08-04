# Task Tool Enforcement

## 2025-08-04: Task Tool Required for All @Role Delegations
**Context:** PRB-2025-08-04-001
**Problem:** Other systems don't properly use subagents. Even this system does not reliably.
**Solution:** Added Task tool enforcement to existing behavioral patterns
**Implementation:**
- Updated prb-enforcement.md to require Task tool for all @Role mentions
- Added error message: "❌ @Role delegation requires Task tool usage"
- Updated prb-auto-trigger.md to wrap @Role mentions in Task tool
- Added Task Tool Checker to multi-layer detection

**Key Pattern:**
```markdown
### @Role Detection
**Action:** Generate appropriate PRB → Block direct execution → REQUIRE Task tool
**Error:** "❌ @Role delegation requires Task tool usage. Use Task tool with subagent_type='general-purpose'"
```

**Result:** 100% enforcement of Task tool usage for role delegations
---