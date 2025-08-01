# ID Conventions for Intelligent Claude Code

**Purpose:** Comprehensive documentation of ID formatting conventions for the intelligent-claude-code behavioral system  
**Audience:** Users and AI roles working with the virtual development team  
**Type:** Behavioral Documentation Guide  

## Overview

The intelligent-claude-code system uses a consistent ID formatting convention across all work items. This document explains how IDs are assigned and formatted in this markdown-based behavioral system.

**Important:** This is a behavioral documentation system, NOT software automation. All IDs are manually assigned by users or AI roles following these conventions.

## ID Format Structure

### Basic Format: TYPE-NUMBER

All work items follow a simple pattern:
- **TYPE**: Uppercase work item type (EPIC, STORY, BUG)
- **HYPHEN**: Single hyphen separator (-)
- **NUMBER**: Three-digit sequential number (001, 002, etc.)

### Examples
```
EPIC-001      # First epic
STORY-015     # Fifteenth story
BUG-068       # Sixty-eighth bug
EPIC-1001     # Thousand and first epic (4 digits when needed)
```

## Work Item Types

### 1. EPICs (EPIC-XXX)
- **Definition**: Large initiatives spanning months of work
- **Format**: `EPIC-001`, `EPIC-002`, etc.
- **Scope**: Contains multiple stories and bugs
- **Example**: `EPIC-002-workflow-enhancement`

### 2. STORIEs (STORY-XXX)
- **Definition**: Feature implementations spanning weeks
- **Format**: `STORY-001`, `STORY-002`, etc.
- **Parent**: Always belongs to an epic
- **Example**: `STORY-014-unified-id-adjustment`

### 3. BUGs (BUG-XXX)
- **Definition**: Issue resolutions spanning days to weeks
- **Format**: `BUG-001`, `BUG-002`, etc.
- **Parent**: Always belongs to an epic
- **Example**: `BUG-059-git-settings-not-enforced`

### 4. TASKs (TASK-XXX)
- **Definition**: Specific work items within stories/bugs
- **Format**: `TASK-001`, `TASK-002`, etc.
- **Parent**: Always belongs to a story or bug
- **Numbering**: Sequential within parent work item
- **Example**: `TASK-007-document-conventions.md`

## ID Assignment Process

### Manual Assignment Steps

1. **Identify Work Item Type**
   - Determine if creating EPIC, STORY, BUG, or TASK
   - Each type has its own number sequence

2. **Check Existing IDs**
   ```bash
   # For stories
   ls epics/**/stories/
   
   # For bugs  
   ls epics/**/bugs/
   
   # For tasks within a story
   ls epics/**/stories/STORY-XXX/tasks/
   ```

3. **Find Next Sequential Number**
   - Look at highest existing number for that type
   - Add 1 to get next number
   - Example: If STORY-014 exists, next is STORY-015

4. **Format with Zero Padding**
   - Always use 3 digits minimum
   - Pad with leading zeros: 001, 002, ..., 099, 100
   - Continue to 4 digits when needed: 1000, 1001

5. **Apply to Files and Content**
   - Use in directory names: `STORY-015-feature-name/`
   - Include in YAML files: `id: STORY-015`
   - Reference in documentation

### Practical Examples

#### Creating a New Story
```bash
# 1. Check existing stories in the epic
ls epics/EPIC-002-workflow-enhancement/stories/
# See: STORY-004, STORY-005, STORY-014

# 2. Next sequential number is 015
# 3. Create directory
mkdir -p epics/EPIC-002-workflow-enhancement/stories/STORY-015-new-feature/

# 4. Create story.yaml with ID
cat > story.yaml << EOF
id: STORY-015
title: New Feature Implementation
epic_id: EPIC-002
...
EOF
```

#### Creating Tasks Within a Story
```bash
# Tasks are numbered from 001 within each story
mkdir -p stories/STORY-015-new-feature/tasks/
touch tasks/TASK-001-knowledge-retrieval.md
touch tasks/TASK-002-design-architecture.md
touch tasks/TASK-003-implementation.md
```

## Directory Structure

IDs are reflected in the filesystem organization:

```
intelligent-claude-code/
└── epics/
    └── EPIC-002-workflow-enhancement/
        ├── epic.yaml                    # Contains id: EPIC-002
        ├── stories/
        │   ├── STORY-014-unified-id-adjustment/
        │   │   ├── story.yaml           # Contains id: STORY-014
        │   │   └── tasks/
        │   │       ├── TASK-001-knowledge-retrieval.md
        │   │       └── TASK-007-document-conventions.md
        │   └── STORY-015-another-feature/
        │       └── story.yaml
        └── bugs/
            └── BUG-059-git-settings-not-enforced/
                ├── bug.yaml             # Contains id: BUG-059
                └── tasks/
                    └── TASK-001-investigate.md
```

## YAML File Usage

### Epic YAML Example
```yaml
id: EPIC-002
title: Workflow Enhancement Initiative
type: system_enhancement
status: IN_PROGRESS
```

### Story YAML Example
```yaml
id: STORY-014
title: Adjust unified ID system
epic_id: EPIC-002
assigned_to: "@AI-Engineer"
tasks:
  - id: TASK-001
    title: Knowledge retrieval
  - id: TASK-007
    title: Document ID conventions
```

### Bug YAML Example
```yaml
id: BUG-059
title: Git settings not enforced
epic_id: EPIC-002
severity: HIGH
assigned_to: "@DevOps-Engineer"
```

## Best Practices

### 1. Sequential Numbering
- Always use next available number
- No need to leave gaps
- Sequential within each type (EPIC, STORY, BUG)

### 2. Conflict Avoidance
- If working in parallel, use higher numbers
- Person A: STORY-020
- Person B: STORY-030
- Merge later without conflicts

### 3. Consistency Rules
- **Always uppercase**: EPIC, STORY, BUG (never epic, story, bug)
- **Always hyphen**: EPIC-001 (never EPIC_001 or EPIC.001)
- **Always pad**: BUG-001 (never BUG-1)
- **Always sequential**: Increment by 1 from highest existing

### 4. Reference Tracking
- IDs in filenames should match IDs in YAML content
- Parent-child relationships must be valid
- Cross-references should use full ID format

## Common Scenarios

### Starting a New Epic
```yaml
# First check existing epics
ls epics/
# See EPIC-001, EPIC-002

# Create EPIC-003
mkdir -p epics/EPIC-003-new-initiative/
```

### Adding Bug to Existing Epic
```yaml
# Check existing bugs in epic
ls epics/EPIC-002-workflow-enhancement/bugs/
# See BUG-001 through BUG-068

# Create BUG-069
mkdir -p epics/EPIC-002-workflow-enhancement/bugs/BUG-069-new-issue/
```

### Resolving ID Conflicts
If you accidentally create duplicate IDs:
1. Check which was created first
2. Rename the newer one to next available number
3. Update all references to the renamed ID
4. Commit changes with clear message

## AI Role Guidelines

When AI roles (like @PM, @Developer, @AI-Engineer) create work items:

### 1. Role-Specific Patterns
- **@PM**: Creates epics and stories, assigns IDs at planning
- **@Developer**: References IDs, rarely creates new ones
- **@QA-Engineer**: Creates bugs with sequential BUG-XXX IDs
- **All Roles**: Create tasks with TASK-XXX within parent

### 2. ID Assignment in Commands
```bash
# PM creating a story
/icc-create-story "New Feature"
# System checks existing IDs and suggests: STORY-016

# QA creating a bug
/icc-create-bug "Performance Issue"  
# System checks existing IDs and suggests: BUG-070
```

### 3. Validation Requirements
- IDs must follow TYPE-NUMBER format
- Numbers must be sequential (no arbitrary jumps)
- Parent IDs must exist (can't create TASK-001 without parent story)
- Type must match context (tasks go in stories/bugs, not epics)

## Integration with Virtual Team

### Import Chain
The ID formatting guide is imported by:
- `/icc-create-epic` command
- `/icc-create-story` command  
- `/icc-create-bug` command
- Workflow executor for validation

### Behavioral Documentation
```markdown
# Commands import the guide
@../behaviors/id-formatting-guide.md

# Then follow the behavioral patterns
FUNCTION assignNextId(type):
    existing = findExistingIds(type)
    highest = extractHighestNumber(existing)
    next = highest + 1
    RETURN formatId(type, next)
```

### No Automation
**Remember:** This system does NOT have:
- Automated ID generators
- Background counters
- Persistence files
- Database sequences
- File locks

All ID assignment is done manually by checking existing files and incrementing.

## Quick Reference

### ID Format Cheat Sheet
```
TYPE-NUMBER Format:
- EPIC-001    (epics)
- STORY-001   (stories)  
- BUG-001     (bugs)
- TASK-001    (tasks within parent)

Rules:
- Uppercase TYPE
- Hyphen separator
- 3+ digit NUMBER
- Sequential within type
- Manual assignment only
```

### Assignment Checklist
- [ ] Identified work item type
- [ ] Checked existing IDs of that type
- [ ] Found highest number
- [ ] Incremented by 1
- [ ] Padded to 3 digits
- [ ] Used in directory name
- [ ] Added to YAML file
- [ ] Verified no conflicts

## Troubleshooting

### Common Issues

1. **Duplicate IDs**
   - **Symptom**: Two items with same ID
   - **Fix**: Rename newer one to next sequential number

2. **Missing Zero Padding**
   - **Symptom**: BUG-1 instead of BUG-001
   - **Fix**: Rename to include padding

3. **Wrong Case**
   - **Symptom**: story-001 instead of STORY-001
   - **Fix**: Rename with uppercase type

4. **Skipped Numbers**
   - **Symptom**: STORY-001, STORY-002, STORY-010
   - **Note**: This is OK! Sequential doesn't mean no gaps

## Summary

The intelligent-claude-code ID convention system provides:
- **Clarity**: Clear TYPE-NUMBER format
- **Simplicity**: Manual assignment, no automation
- **Consistency**: Same pattern across all work items
- **Flexibility**: Works for human and AI users
- **Scalability**: Extends to 4+ digits when needed

By following these conventions, all users and AI roles can maintain consistent, organized work item identification throughout the intelligent-claude-code behavioral system.

---
*ID Conventions Documentation for intelligent-claude-code v2.0*