# ID Assignment Guidelines

**PURPOSE:** Behavioral documentation for consistent ID formatting across work items  
**TYPE:** Documentation Pattern Guide  
**STATUS:** ACTIVE

## ID Format Conventions

This document provides **behavioral guidelines** for humans and AI when assigning IDs to work items. This is NOT a software system - it's documentation about how to format IDs consistently.

### Standard ID Patterns

Work items use a simple TYPE-NUMBER format with three-digit numbers:

```
EPIC-001    # Epic ID format
STORY-001   # Story ID format  
BUG-001     # Bug ID format
```

### ID Assignment Guidelines

#### When Creating New Work Items

1. **Check Existing IDs**: Look at the highest existing ID number for that type
2. **Increment by One**: Use the next sequential number
3. **Pad with Zeros**: Always use three digits (001, 002, ... 099, 100)

#### Manual ID Assignment Process

```markdown
Example Process:
1. Creating a new story in an epic
2. Check existing stories: STORY-001, STORY-002, STORY-014 exist
3. Next ID should be: STORY-015
4. If unsure, use a safe higher number: STORY-020
```

### ID Formatting Examples

#### Correct Formats
```
EPIC-001     ✓ Correct: Type in caps, hyphen, three digits
STORY-042    ✓ Correct: Sequential numbering
BUG-999      ✓ Correct: Can go to 999 and beyond
EPIC-1001    ✓ Correct: Four digits when needed
```

#### Incorrect Formats
```
epic-001     ✗ Wrong: Type must be uppercase
STORY_001    ✗ Wrong: Must use hyphen, not underscore
BUG-1        ✗ Wrong: Must pad with zeros (BUG-001)
STORY 001    ✗ Wrong: No spaces allowed
```

### Directory Structure Patterns

IDs are used in directory naming:

```
epics/
├── EPIC-001-user-management/
│   ├── epic.yaml
│   ├── stories/
│   │   ├── STORY-001-user-registration/
│   │   └── STORY-002-user-login/
│   └── bugs/
│       └── BUG-001-login-timeout/
```

### ID Usage in YAML Files

```yaml
# In epic.yaml
id: EPIC-001
title: User Management System

# In story.yaml
id: STORY-001
title: User Registration
epic_id: EPIC-001

# In bug.yaml
id: BUG-001
title: Login Timeout Issue
epic_id: EPIC-001
```

### Best Practices

1. **Sequential Assignment**: Always use the next available number
2. **No Gaps Needed**: STORY-001, STORY-002, STORY-003 is fine
3. **Type Consistency**: Always use EPIC, STORY, or BUG in uppercase
4. **Manual Tracking**: Keep a mental note or check existing files
5. **When in Doubt**: Use a safely higher number (e.g., jump to STORY-020)

### Common Scenarios

#### Starting Fresh
```
First epic: EPIC-001
First story in that epic: STORY-001
First bug in that epic: BUG-001
```

#### Adding to Existing Project
```
Existing stories: STORY-001 through STORY-014
Next story: STORY-015
```

#### Parallel Work
```
If multiple people/sessions are creating items:
- Person A: Uses STORY-020
- Person B: Uses STORY-030
- This avoids conflicts
```

### ID Assignment Checklist

When creating a new work item:

- [ ] Determined the correct type (EPIC, STORY, or BUG)
- [ ] Checked existing IDs of that type
- [ ] Selected the next sequential number
- [ ] Formatted with three digits (or more if needed)
- [ ] Used uppercase type and hyphen separator
- [ ] Included ID in both the filename and YAML content

### Template Examples

#### Creating a New Story
```bash
# Check existing stories
ls epics/**/stories/

# See STORY-001, STORY-002, STORY-014
# Create new story with ID STORY-015
mkdir -p epics/EPIC-001-user-management/stories/STORY-015-password-reset/
```

#### Story YAML Template
```yaml
id: STORY-015
title: Password Reset
epic_id: EPIC-001
status: PLANNED
# ... rest of story configuration
```

---

**REMEMBER:** This is behavioral documentation for humans and AI. There is no automated ID generator - just follow these simple formatting guidelines when creating new work items.

---
*ID assignment guidelines for intelligent-claude-code behavioral system*