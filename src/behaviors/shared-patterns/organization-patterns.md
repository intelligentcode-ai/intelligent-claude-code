# Shared Organization Patterns

**MANDATORY:** MUST use organization patterns. Auto-correct violations.

**PURPOSE:** Standard patterns for workspace organization and file management

## Directory Structure Patterns

**Archive Organization:**
- `archives/completed/type/year/month/` - Date-based archive structure
- Git-tracked: epics, stories, bugs with ARCHIVED.md summaries
- Not tracked: tasks in parallel directory structure

**Project Placement:**
- Root level: Configuration and documentation
- `src/` - Source behavioral patterns and commands
- `docs/` - Reference documentation
- `epics/` - Active work hierarchy

## File Management Rules

**Naming Conventions:**
- UPPERCASE: EPIC-XXX, STORY-XXX, BUG-XXX, TASK-XXX
- Lowercase: Files and directories
- Kebab-case: Multi-word names

**Lifecycle Management:**
- Active: Current work directories
- Completed: Move to archives/completed/
- Historical: Preserve with ARCHIVED.md summaries

## File Management Patterns

**Workspace Organization:** Maintain clean separation between active work and archived content → Use consistent naming conventions → Preserve historical context through summaries

**Integration:** Apply organization patterns to all file operations → Ensure consistent structure across team → Enable efficient navigation and discovery

---
*Shared organization patterns for intelligent-claude-code system*