# TASK-001: [AI-Engineer] Load AI Behavioral Context for Command Parameters

## Overview
**Task ID:** TASK-001
**Title:** [AI-Engineer] Load AI Behavioral Context for Command Parameters
**Status:** COMPLETED
**Assigned To:** @AI-Engineer
**Priority:** P0 (blocking)
**Type:** knowledge_loading

## Description
Load all AI behavioral context about how Claude Code interprets slash command parameters in markdown files.

## Subtasks
1. **Load current command markdown patterns**
   - Review all src/commands/*.md files
   - Identify current parameter documentation patterns
   - Note how AI currently interprets these patterns

2. **Load behavioral system context**
   - Review virtual-team.md command references
   - Check CLAUDE.md for command behavioral guidance
   - Identify expected AI interpretation patterns

3. **Load configuration impact on commands**
   - Check how config.md affects command behavior
   - Review parameter pass-through patterns
   - Document behavioral expectations

## Acceptance Criteria
- [x] All command markdown patterns documented
- [x] AI behavioral context fully loaded
- [x] Parameter interpretation patterns identified

## Dependencies
- None (first task in workflow)

## Parallel Execution
- All subtasks can run in parallel

## Output
- Current command parameter patterns
- AI behavioral interpretation analysis
- Context for parameter format decisions

## Knowledge Loading Results

### 1. Current Command Parameter Patterns

I've analyzed all command markdown files in src/commands/ and identified the following parameter patterns:

**Common Parameter Formats:**
- **Positional arguments**: `"title"`, `STORY-XXX`, `@Role-Name`
- **Named flags**: `--epic EPIC-XXX`, `--scope "text"`, `--priority P2`
- **Boolean flags**: `--chain`, `--dry-run`, `--force`, `--minimal`
- **Complex values**: `--deps TASK-XXX,TASK-YYY` (comma-separated)
- **Optional brackets**: `[--chain]`, `[files...]`

**Key Commands Analyzed:**
1. **icc-create-story**: Uses `"title" --epic EPIC-XXX --scope "scope" [--priority P2] [--chain]`
2. **icc-activate-role**: Uses `@Role-Name [--minimal] [--chain]`
3. **icc-git-operation**: Uses `commit "message" [files...]` or `push [branch]`
4. **icc-add-task**: Uses `STORY-XXX "title" --type TYPE --assigned-to @Role [--deps LIST]`
5. **icc-plan-story**: Uses `story_id [--chain-to COMMAND] [--dry-run] [--force]`

### 2. AI Behavioral Interpretation Analysis

**How AI Currently Interprets Parameters:**
- **Markdown Code Blocks**: AI sees parameters within bash code blocks as examples/templates
- **Parameter Sections**: Dedicated "Parameters" sections provide semantic understanding
- **Required vs Optional**: Required parameters listed without brackets, optional with `[brackets]`
- **Value Types**: AI infers types from examples (IDs, strings, enums, booleans)
- **Default Values**: Specified in parameter descriptions or parentheses

**Behavioral Context from virtual-team.md:**
- Commands are part of the "slash command integration" for reliable workflow execution
- Parameters drive behavioral patterns through the lean workflow executor
- Embedded config in assignment files can override command parameters
- Validation command chains use function-style syntax: `icc:validate-assignments(task, role)`

### 3. Configuration Impact on Commands

**From config.md:**
- `autonomy_level` affects command execution behavior (L1/L2/L3)
- `blocking_enabled` changes how commands handle errors
- `git_privacy` modifies git operation commands
- `pm_always_active` affects role activation requirements

**Key Configuration Impacts:**
1. **L3 Autonomy**: Commands execute without stops, parameters like `--force` become implicit
2. **Blocking Settings**: When `blocking_enabled: false`, commands create follow-up tasks instead of halting
3. **Git Privacy**: When enabled, git commands auto-strip AI mentions from parameters
4. **Role Validation**: When `role_validation: true`, assignment commands enforce capability checks

### 4. Parameter Format Observations

**Current Inconsistencies:**
- Some commands use `--chain` while others use `--chain-to COMMAND`
- Mixed styles: bash-like flags vs function-like syntax in validation chains
- No standardized parameter validation or type checking in markdown
- Parameter descriptions vary in detail level across commands

**AI Behavioral Challenges:**
- AI must infer parameter types from examples and descriptions
- No explicit schema or validation rules in markdown format
- Reliance on "Usage" examples for understanding parameter order
- Mixed paradigms between command-line style and function-call style