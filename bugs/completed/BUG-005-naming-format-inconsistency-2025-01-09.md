# BUG-005: Naming Format Inconsistency

**Date Created:** 2025-01-09
**Severity:** High
**Category:** System Organization
**Status:** Completed
**Completion Date:** 2025-08-09
**Fixed In:** PR #54

## Problem Description

The naming of PRBs, Stories, Bugs, and Epics is inconsistent and illogical across the system. Current naming patterns vary widely and don't follow a predictable format, making it difficult to:
- Track items systematically
- Understand relationships between items
- Maintain proper sequencing
- Sort and organize work items

## Current State (Examples of Inconsistency)

### Stories
- `STORY-001-mcp-installation.md` (has number but no date)
- `STORY-002-best-practices-from-operations.md` (inconsistent title format)
- `example-auth-system.txt` (no number, wrong extension)

### PRBs
- `LARGE-STORY-001-mcp-installation-support.prb.yaml` (complexity prefix mixed with story reference)
- `MEDIUM-BUG-001-enforce-project-scope-boundaries.prb.yaml` (complexity and bug reference)
- Format varies: `[COMPLEXITY]-[PARENT]-[NUMBER]-[TITLE]` with no date

### Bugs
- `BUG-001-scope-violation.md` (no date)
- `BUG-002-role-selection-violation.md` (no date)
- Inconsistent title formatting (hyphens vs underscores in different contexts)

## Expected Behavior

All work items should follow a consistent, predictable naming format:

### Standard Format
**Without Parent:** `<CATEGORY>-<NUMBER>-<TITLE>-<DATE>.md`
**With Parent:** `<PARENT>-<NUMBER>-<TITLE>-<DATE>.md`

Where:
- `CATEGORY`: EPIC, STORY, BUG, PRB
- `NUMBER`: Sequential number (always +1 from highest in category)
- `TITLE`: Descriptive title with hyphens (no spaces)
- `DATE`: YYYY-MM-DD format
- `PARENT`: Reference to parent item (e.g., STORY-001)

### Examples of Correct Format
- `EPIC-001-virtual-team-enhancement-2025-01-09.md`
- `STORY-001-mcp-installation-2025-01-09.md`
- `BUG-005-naming-format-inconsistency-2025-01-09.md`
- `STORY-001-PRB-001-ansible-playbook-2025-01-09.yaml`

## Numbering Requirements

1. **Sequential Numbering**: Always use the next available number (+1 from highest)
2. **Category Scoping**: Numbers are scoped to category (Stories have their own sequence, Bugs have their own, etc.)
3. **Parent Scoping**: Sub-items (like PRBs under a Story) restart numbering under each parent
4. **Zero Padding**: Use consistent padding (001, 002, ... 099, 100)

## Impact

- **Organization**: Difficult to find and sort work items
- **Automation**: Scripts and tools can't reliably parse item names
- **Relationships**: Parent-child relationships are unclear
- **Tracking**: Can't easily determine creation order or age of items
- **Duplicates**: Risk of number collisions without proper sequencing

## Reproduction Steps

1. List any directory of work items (stories/, bugs/, prbs/)
2. Observe inconsistent naming patterns
3. Try to determine parent relationships from names
4. Attempt to sort by creation date (impossible without dates in names)

## Suggested Fix

1. Create a naming enforcement behavior in the system
2. Implement automatic renaming tool for existing items
3. Add validation to prevent non-compliant names
4. Update all templates to generate compliant names
5. Add numbering service to ensure proper sequencing

## Acceptance Criteria

- [ ] All new items follow the standard format
- [ ] Existing items are renamed to comply
- [ ] Validation prevents non-compliant names
- [ ] Templates generate correct names automatically
- [ ] Documentation updated with naming standards
- [ ] Sequential numbering is enforced
- [ ] Parent-child relationships are clear in names

## Related Items

- Affects all PRB generation templates
- Impacts story breakdown behavior
- Related to directory-structure.md behavior
- Affects all work item creation commands

## Notes

This is a system-wide organizational issue that affects the entire virtual team's ability to manage work effectively. Priority should be given to fixing this as it impacts all future work item creation and management.