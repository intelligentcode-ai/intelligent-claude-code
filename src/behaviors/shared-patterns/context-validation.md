# Context Validation

**MANDATORY:** Complete context before PRB generation.

## Required Context

| Element | Requirement | Validation |
|---------|------------|------------|
| System Nature | CODE/AI-AGENTIC/HYBRID | Must be identified |
| Project Root | Absolute path | Must exist |
| Configuration | Actual values | No placeholders |
| Critical Files | With samples | Must be relevant |
| User Requirements | Clear intent | Specific criteria |

## Blocked Placeholders
- `[FROM_CONFIG]` → Load actual value
- `[PROJECT_ROOT]` → Use absolute path
- `[ALL-SETTINGS]` → Load specific values
- `[USER_REQUEST]` → Capture actual request

## Validation Process
1. Detect system type from file analysis
2. Load config hierarchy (embedded→project→user→defaults)
3. Identify critical files with samples
4. Capture user requirements clearly
5. Block if any placeholders remain

## Error Handling
- `PLACEHOLDER_DETECTED`: "❌ Contains: {list}"
- `SYSTEM_NATURE_MISSING`: "❌ Not identified"
- `PROJECT_ROOT_INVALID`: "❌ Invalid: {path}"
- `REQUIREMENTS_VAGUE`: "❌ Too generic"

## Commands
- `/icc-validate-context [template]`
- `/icc-gather-context [request]`
- `/icc-detect-system-nature`

---
*Optimized: 210→~40 lines*