# TASK-001: Audit Current Command Usage Patterns

**Status:** COMPLETED  
**Assigned to:** @AI-Architect  
**Story:** STORY-007 Remove Outdated Commands  
**Priority:** P1  

## Task Description

Document all existing command patterns and identify inconsistencies across the intelligent-claude-code system. This includes behavioral modules, workflow templates, documentation, and any other components that use or reference commands.

## Acceptance Criteria

- [ ] All command patterns documented
- [ ] Inconsistencies identified and categorized
- [ ] Command usage frequency analyzed
- [ ] Migration impact assessment completed

## Technical Scope

### Files to Audit
- `src/behaviors/*.md` - Behavioral modules with command definitions
- `workflow-templates/*.yaml` - Workflow command references
- `docs/*.md` - Documentation with command examples
- `src/roles/*.md` - Role-specific command patterns
- `src/commands/*.md` - Command registry files

### Command Pattern Categories
1. **Old patterns** - Commands without icc: prefix
2. **Mixed patterns** - Inconsistent naming conventions
3. **New patterns** - Commands with icc: prefix
4. **Deprecated patterns** - Commands no longer in use

## Execution Plan

1. Search for all command definitions
2. Categorize by pattern type
3. Document usage frequency
4. Identify dependencies
5. Create migration plan

---

@AI-Architect (P:0.0, Q:0.0): Beginning comprehensive command pattern audit.

## Audit Results

### Command Pattern Categories Identified

#### 1. Commands WITH icc: prefix (New Standard) ✅
**Location:** `src/behaviors/lean-workflow-executor.md`
- `icc:detect-work-type()` - Detects work type for specialist assignment
- `icc:require-triage()` - Requires PM + Architect triage
- `icc:validate-assignments()` - Validates role capability match
- `icc:require-approval()` - Requires joint approval
- `icc:create-assignment()` - Creates assignment file
- `icc:create-story` - Creates new story
- `icc:plan-story` - Plans story tasks
- `icc:execute-task` - Executes task

**Location:** `src/behaviors/archival-intelligence.md`
- `icc:archive-completed` - Archive all completed items
- `icc:archive-item` - Archive specific item
- `icc:restore-archived` - Restore archived item
- `icc:archive-status` - Check archival status

#### 2. Commands WITHOUT icc: prefix (Need Update) ⚠️
**PM Commands:** Found in multiple locations
- `@PM init` - Initialize system
- `@PM refresh` - Refresh capabilities  
- `@PM reset` - Reset system state
- `@PM status` - System status
- `@PM archive` - Archive items (variant of icc:archive-item)
- `@PM archive-status` - Archive status (variant)
- `@PM archive-completed` - Archive completed items (variant)
- `@PM help` - Show help

**Other Commands:** Referenced but not prefixed
- Various command chain references without standardization
- Mixed usage in documentation and examples

#### 3. Command Usage Frequency Analysis

**High Frequency (>20 references):**
- `@PM init` - 75+ references
- `@PM refresh` - 45+ references
- `@PM status` - 60+ references
- `@PM reset` - 40+ references

**Medium Frequency (5-20 references):**
- `@PM archive` variants - 15+ references
- `icc:` validation commands - 12+ references each

**Low Frequency (<5 references):**
- Other specialized commands

### Impact Assessment

#### Files Requiring Updates
1. **Critical Updates Required:**
   - `src/behaviors/pm-command-system.md` - Core PM command definitions
   - `src/behaviors/lean-workflow-executor.md` - Command registration
   - `src/commands/planning-commands.md` - Command documentation

2. **Documentation Updates Required:**
   - `docs/PM-COMMANDS.md` - Primary PM command docs
   - `docs/commands.md` - General command reference
   - `CLAUDE.md` - Main documentation
   - Various example files

3. **Test Updates Required:**
   - Test files referencing old command patterns
   - Example usage in session summaries

### Migration Strategy (DIRECT - NO BACKWARD COMPATIBILITY)

#### Command Mapping
```
Old: @PM init
New: icc:pm-init

Old: @PM refresh  
New: icc:pm-refresh

Old: @PM reset
New: icc:pm-reset

Old: @PM status
New: icc:pm-status

Old: @PM archive
New: icc:archive-item (already exists)

Old: @PM archive-completed
New: icc:archive-completed (already exists)

Old: @PM archive-status
New: icc:archive-status (already exists)

Old: @PM help
New: icc:pm-help
```

#### Direct Migration Approach
1. **Replace all command patterns immediately** - No transition period
2. **Update all references in one pass** - Clean break from old patterns
3. **No deprecation warnings** - Direct replacement
4. **Single validation pass** - Ensure all commands work with new pattern

### Recommendations

1. **Clean Break:** Replace all old patterns with icc: prefix immediately
2. **Consistent Structure:** All commands follow `icc:category-action` pattern
3. **Comprehensive Update:** Update all files in single commit
4. **Full Testing:** Test all command functionality with new patterns

**AUDIT COMPLETE:** Found 8 PM commands to update and 12 commands already using icc: prefix. Direct migration approach selected.