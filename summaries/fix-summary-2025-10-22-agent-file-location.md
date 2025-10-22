# Fix Summary: Agent File Location Issues

**Date**: 2025-10-22
**Agent**: @AI-Engineer
**Project**: intelligent-claude-code v8.19.9

## Problem Statement

Agents were writing files to incorrect locations:
1. Summary/report files going to `docs/` instead of `summaries/`
2. Requirements-Engineer creating HUGE story files instead of breaking down epics
3. Zero file location guidance in agent definitions

## Root Causes Identified

1. **Missing Behavioral Pattern**: No `file-location-standards.md` behavior existed
2. **Agent Blindness**: Agents had no guidance about WHERE to write files
3. **Requirements-Engineer Gap**: No epic/story sizing rules or breakdown logic

## Solutions Implemented

### 1. Created `src/behaviors/file-location-standards.md` (125 lines)

**File Type Mapping**:
- Summary/report files → `summaries/` (NEVER `docs/`)
- Stories/epics → `stories/` (6+ points only)
- Bugs → `bugs/`
- Memory → `memory/[topic]/`
- Documentation → `docs/` (architecture, NOT summaries)

**Pattern Detection**:
- Regex patterns: `/summary|report|fix|analysis|review|assessment|status|progress|update|deployment|verification|configuration|post-mortem|monitoring|agenttask|troubleshoot|diagnostic|investigation|incident|resolution/i`
- Summary file rule: IF pattern match → `summaries/`
- Story rule: ≤5pts = no file, 6+ pts = `stories/`

**Agent Rules**:
- Pre-write validation for ALL file operations
- Pattern matching to determine correct directory
- Config integration: `getSetting('paths.summaries_path', 'summaries')`
- Block invalid writes automatically

### 2. Fixed `src/agents/requirements-engineer.md`

Added comprehensive epic and story management section after "## Memory Integration":

```markdown
## Epic and Story Management

### Epic Creation
- Epic scope: 6+ points, multiple stories
- Location: stories/EPIC-NNN-title-YYYY-MM-DD.md
- Breakdown required into stories ≤5 points

### Story Creation
- Tiny: 3-5 points direct implementation
- Location: stories/STORY-NNN-title-YYYY-MM-DD.md

### File Location Standards
**Output Rules**:
- Summary/report → summaries/
- Epic files → stories/EPIC-NNN-*
- Story files → stories/STORY-NNN-*
- Architecture → docs/architecture/
- NEVER summaries to docs/

@../behaviors/file-location-standards.md
```

### 3. Updated ALL 13 Agent Files

Added import to all agents after `@../behaviors/config-system.md`:
```markdown
@../behaviors/file-location-standards.md
```

**Agents Updated**:
1. ai-engineer.md ✅
2. architect.md ✅
3. backend-tester.md ✅
4. database-engineer.md ✅
5. developer.md ✅
6. devops-engineer.md ✅
7. pm.md ✅
8. qa-engineer.md ✅
9. requirements-engineer.md ✅
10. security-engineer.md ✅
11. system-engineer.md ✅
12. user-role.md ✅
13. web-designer.md ✅

## Verification Results

- ✅ All 13 agents have file-location-standards import
- ✅ file-location-standards.md created with 125 lines (within limit)
- ✅ requirements-engineer.md has epic/story management section
- ✅ Summary file correctly placed in `summaries/` directory

## Impact Assessment

**Immediate Benefits**:
- Agents now validate file output locations before writing
- Summary files automatically directed to `summaries/`
- Epic breakdown prevents huge story files
- Config-based path resolution supports customization

**Behavioral Improvements**:
- Pre-write validation prevents incorrect file placement
- Pattern matching ensures correct directory selection
- Epic/story sizing rules enforce proper breakdown
- Configuration integration enables flexible paths

**Quality Improvements**:
- File organization consistency across all agents
- Reduced manual file movement after agent execution
- Clear separation of summaries vs documentation
- Proper epic breakdown into manageable stories

## Files Modified

1. **Created**: `src/behaviors/file-location-standards.md`
2. **Updated**: `src/agents/requirements-engineer.md` (epic section added)
3. **Updated**: All 13 agent files (import added)

## Next Steps

This fix is complete and ready for:
1. Version bump (patch)
2. CHANGELOG entry
3. Git commit and push
4. Testing with real agent executions

## Pattern Capture

**Success Pattern**: File location validation behavior
- Pattern matching for file type detection
- Config-based path resolution
- Pre-write validation enforcement
- Universal agent integration

**Reusable Approach**: Behavioral pattern addition
1. Create behavior file with clear rules
2. Add specific guidance to affected agents
3. Import behavior into all relevant agents
4. Verify universal coverage

This pattern can be applied to other cross-cutting concerns requiring universal agent compliance.
