# PRB Complete Context Learning

## 2025-08-03: PRB Context Validation Implementation

**Context:** PRB-2025-08-03-011
**Problem:** PRBs were being generated with placeholder values and incomplete context, causing execution failures
**Solution:** Implement mandatory context gathering and validation before PRB generation

**Key Implementation Details:**

### Context Gathering Requirements
1. **System Nature Detection**: Identify if project is "MARKDOWN-BASED AI-AGENTIC SYSTEM" or "CODE-BASED SYSTEM"
2. **Project Root Identification**: Must be absolute path
3. **Configuration Loading**: Replace all "[FROM_CONFIG]" placeholders with actual values
4. **Critical File Identification**: Find relevant files with content samples
5. **User Requirements Capture**: Store exact user request and success criteria

### Validation Blockers
- **PLACEHOLDER_VALUES_DETECTED**: "[FROM_CONFIG]", "[ALL-SETTINGS]", "[PROJECT_ROOT]"
- **MISSING_SYSTEM_NATURE**: No system type identification
- **EMPTY_FILE_REFERENCES**: No actual file paths or samples
- **VAGUE_REQUIREMENTS**: Generic or unclear user specifications

### Files Modified
- `src/behaviors/prb-creation-mandates.md`: Added complete context requirements
- `src/behaviors/prb-auto-trigger.md`: Added context gathering phase
- `src/behaviors/shared-patterns/template-loading.md`: Added context validation
- `src/behaviors/shared-patterns/context-validation.md`: New comprehensive validation patterns

### Critical Pattern
**ALWAYS gather complete context BEFORE PRB generation, never after.**

The context gathering must include:
```yaml
complete_context:
  system_nature: "MARKDOWN-BASED AI-AGENTIC SYSTEM"  # Actual value
  project_root: "/absolute/path/to/project"          # Actual path
  configuration:
    git_privacy: true                                # Actual config
    branch_protection: false                         # Actual config
    default_branch: "main"                          # Actual config
```

### Prevention Steps
1. Block PRB generation if placeholders detected
2. Validate system nature is identified
3. Ensure project root is absolute path
4. Require critical files with samples
5. Enforce clear user requirements

**Success Criteria:** PRBs generated with this approach will have complete actionable context and no placeholder values.

---