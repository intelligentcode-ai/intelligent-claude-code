# Create Story

Create a new story within an epic using $ARGUMENTS as story definition.

## Behavioral Sequence
1. Verify current role is @PM:
   - If not @PM, respond "Error: Story creation requires @PM role. Current role: [current_role]"
2. Parse $ARGUMENTS to extract:
   - Story title (required)
   - Parent epic ID (EPIC-XXX format)
   - Story scope/description
   - Priority level (P0/P1/P2/P3)
   - Story type (NEW_FEATURE/ENHANCEMENT/REFACTOR)
3. Validate parent epic exists:
   - Check for `epics/[EPIC-ID]/epic.yaml`
   - If not found, respond "Error: Parent epic [EPIC-ID] not found"
   - Load epic.yaml to verify status is not ARCHIVED
4. Generate next STORY-XXX ID:
   - Scan existing stories in epic directory
   - Find highest existing STORY number
   - Assign next sequential ID (e.g., STORY-001, STORY-002)
5. Create story directory structure:
   - Create `epics/[EPIC-ID]/stories/[STORY-ID]/`
   - Create `epics/[EPIC-ID]/stories/[STORY-ID]/tasks/` (empty initially)
6. Initialize outer workflow phase tracking:
   - Set initial phase to "epic_definition" (story is part of epic)
   - Prepare for "story_creation" phase transition
7. Write story.yaml file:
   ```yaml
   id: "[STORY-ID]"
   title: "[title from arguments]"
   epic_id: "[EPIC-ID]"
   type: "[NEW_FEATURE|ENHANCEMENT|REFACTOR]"
   priority: "[P0|P1|P2|P3]"
   status: "PLANNED"
   phase: "INIT"
   workflow_phase: "story_creation"
   workflow_type: "outer"
   description: "[scope from arguments]"
   acceptance_criteria: []
   tasks: []
   created_date: "[current_date]"
   assigned_to: null
   estimated_hours: null
   actual_hours: null
   ```
8. Update parent epic.yaml:
   - Add story ID to stories array
   - Update epic progress metrics
   - Increment story count
9. Display success message:
   "✅ Story [STORY-ID] created: [title]"
   "📁 Location: epics/[EPIC-ID]/stories/[STORY-ID]/"
   "🎯 Status: INIT phase"
   "🔄 Workflow: Outer workflow - story_creation phase"
10. Log creation in activity tracking

## Error Handling
- Missing title: "Error: Story title is required"
- Invalid epic ID format: "Error: Epic ID must be in format EPIC-XXX"
- Epic not found: "Error: Parent epic [EPIC-ID] not found"
- Epic archived: "Error: Cannot add stories to archived epic [EPIC-ID]"
- Invalid priority: "Error: Priority must be P0, P1, P2, or P3"
- File system error: "Error: Could not create story directory: [specific error]"
- Permission denied: "Error: Insufficient permissions to create story files"

## Command Chaining
- If --plan flag present, execute `icc-plan-story [STORY-ID]` after creation
- If --chain flag present, output story ID for piping to next command
- Story creation triggers potential epic status updates