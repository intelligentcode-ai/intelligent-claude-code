# Create Story

Create a new story within an epic using $ARGUMENTS with title, epic reference, and priority.

## Behavior
PM-only operation that creates story directories, files, and links to parent epic.
Applies priority inheritance from epic with story-specific adjustments.

## Arguments
**Format:** "Story Title | Epic: EPIC-XXX | Priority: P1 | Type: NEW_FEATURE"
**Example:** "OAuth Login Implementation | Epic: EPIC-001 | Priority: P1 | Type: NEW_FEATURE"

## Core Actions
1. **Validate @PM Role**: Only @PM can create stories
2. **Parse Arguments**: Extract title, epic reference, priority, and story type
3. **Validate Epic Exists**: Verify epic directory and epic.yaml exist
4. **Generate Story ID**: Find next sequential STORY-XXX number
5. **Create Directory Structure**: Create epics/EPIC-XXX/stories/STORY-XXX-title-slug/
6. **Generate story.yaml**: Create with metadata, epic link, and workflow configuration
7. **Apply Priority Inheritance**: story.priority = MAX(epic.priority, story.priority)
8. **Initialize Git Tracking**: Add story directory to git
9. **Update Epic Progress**: Link story to parent epic

## Story Types
- **NEW_FEATURE**: New functionality implementation
- **ENHANCEMENT**: Improve existing functionality
- **REFACTOR**: Technical improvement without feature changes
- **INTEGRATION**: Connect systems or components

## Priority Inheritance Rules
- Story priority = MAX(epic priority, specified priority)
- Security stories automatically escalate to P0
- Customer-facing stories may escalate +1 priority level

## Error Handling
- **NOT_PM_ROLE**: "❌ Error: Only @PM role can create stories. Use @PM first."
- **INVALID_FORMAT**: "❌ Error: Use format 'Title | Epic: EPIC-XXX | Priority: P0-P3 | Type: TYPE'"
- **EPIC_NOT_FOUND**: "❌ Error: Epic EPIC-XXX not found. Create epic first."
- **INVALID_EPIC_FORMAT**: "❌ Error: Epic reference must be format EPIC-XXX"
- **INVALID_PRIORITY**: "❌ Error: Priority must be P0 (critical), P1 (high), P2 (medium), or P3 (low)"
- **INVALID_TYPE**: "❌ Error: Type must be NEW_FEATURE, ENHANCEMENT, REFACTOR, or INTEGRATION"
- **DUPLICATE_STORY**: "❌ Error: Story with similar title already exists in epic"
