# File Location Standards

**MANDATORY:** All agents MUST validate file output locations before writing. Auto-correct violations.

## Imports
@./config-system.md

## File Type Mapping

### Primary Categories

**Summary/Report Files** → summaries/
- Patterns: `/summary|report|fix|analysis|review|assessment|status|progress|update|deployment|verification|configuration|post-mortem|monitoring|agenttask|troubleshoot|diagnostic|investigation|incident|resolution/i`
- Format: `[TYPE]-[DATE]-[DESCRIPTION].md`
- Examples: fix-summary-2025-10-22-auth-bug.md, deployment-report-2025-10-22.md
- **NEVER** write to docs/ for summaries

**Stories/Epics** → stories/
- Epic files: `EPIC-NNN-title-YYYY-MM-DD.md` (6+ points, multiple stories)
- Story files: `STORY-NNN-title-YYYY-MM-DD.md` (3-5 points direct implementation)
- Drafts: stories/drafts/ for work-in-progress stories
- Rule: ≤5 points = no file needed, 6+ points = story file required

**Bugs** → bugs/
- Open: bugs/open/BUG-NNN-title-YYYY-MM-DD.md
- Completed: bugs/completed/BUG-NNN-title-YYYY-MM-DD.md
- Format: Sequential numbering with zero-padding

**Memory** → memory/[topic]/
- Topic-based organization: implementation, debugging, configuration, optimization
- Format: memory/[topic]/[subtopic].md with dated entries
- Auto-storage: Successful patterns and error resolutions

**Documentation** → docs/
- Architecture: docs/architecture/
- Configuration: docs/configuration/
- Technical specs: docs/technical/
- **NEVER** summaries or reports - those go to summaries/

## Pre-Write Validation

### Validation Process
1. **Analyze File Type**: Extract file purpose from content and naming
2. **Pattern Matching**: Apply regex patterns to determine category
3. **Path Resolution**: Use config settings for actual paths
4. **Validation Check**: Ensure output location matches file type
5. **Block Invalid Writes**: Prevent writing to wrong directories

### Pattern Detection Rules

**Summary/Report Detection**:
```
if filename/content matches summary|report|fix|analysis|review|assessment|status|progress|update|deployment|verification|configuration|post-mortem|monitoring|agenttask|troubleshoot|diagnostic|investigation|incident|resolution
then output_path = summaries/
```

**Story File Detection**:
```
if complexity >= 6 points
then output_path = stories/
else no_file_needed = true
```

**Epic File Detection**:
```
if scope = multiple stories AND complexity >= 6 points
then output_path = stories/EPIC-NNN-*
```

## Configuration Integration

### Path Resolution
Use configuration system for flexible paths:
- `getSetting('paths.summaries_path', 'summaries')`
- `getSetting('paths.story_path', 'stories')`
- `getSetting('paths.bug_path', 'bugs')`
- `getSetting('paths.memory_path', 'memory')`
- `getSetting('paths.docs_path', 'docs')`

### Dynamic Path Support
Respect project customization:
- Project-specific paths from icc.config.json
- User-specific paths from config hierarchy
- Default paths as fallback

## Agent Rules

### Universal Agent Requirements
**MANDATORY for ALL agents**:
1. Validate output location BEFORE writing any file
2. Apply pattern matching to determine correct directory
3. Block writes to incorrect locations
4. Use config-based path resolution
5. Document location choice in execution summary

### Summary File Rule
**CRITICAL**: IF file matches summary/report pattern → summaries/
- Detection: Filename or content analysis reveals summary/report nature
- Validation: Prevent docs/ writes for summary content
- Correction: Redirect to summaries/ automatically

### Story File Rule
**CRITICAL**: Size-based file creation logic
- ≤5 points: No file needed, direct AgentTask execution
- 6+ points: Create story file in stories/
- Epic scope: Create EPIC-NNN-* for multi-story breakdown

## Error Patterns to Prevent

**WRONG**: Summary files written to docs/
**CORRECT**: Summary files written to summaries/

**WRONG**: Epic creates single huge story file
**CORRECT**: Epic breaks down into multiple story files ≤5 points

**WRONG**: Writing files without path validation
**CORRECT**: Pre-write validation with config-based paths

## Integration Points

**With Memory System**: Auto-store location patterns and validation results
**With Config System**: Dynamic path resolution from hierarchy
**With AgentTask System**: Enforce location standards during execution
**With All Agents**: Universal validation before any file write

---
*File location standards for consistent output organization*
