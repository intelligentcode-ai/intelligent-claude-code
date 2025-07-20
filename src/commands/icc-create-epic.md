# Epic Creation Command

Create epic structure using $ARGUMENTS as epic definition.

@../behaviors/file-management-enforcer.md

## Behavioral Sequence
1. Verify current role is @PM:
   - If not @PM, respond "Error: Epic creation requires @PM role. Current role: [current_role]"
2. Parse $ARGUMENTS to extract:
   - Epic title (required)
   - Project scope/description (required)
   - Business value statement
   - Strategic priority (P0/P1/P2/P3)
   - Estimated timeline
   - Success metrics
3. Validate required fields:
   - If title missing, respond "Error: Epic title is required"
   - If scope missing, respond "Error: Project scope is required"
   - If priority invalid, default to P2 and warn
4. Generate next EPIC-XXX ID:
   - Scan `epics/` directory for existing epics
   - Find highest existing EPIC number
   - Assign next sequential ID (e.g., EPIC-001, EPIC-002)
   - Ensure ID uniqueness across all epics
5. Create epic directory structure:
   - Create `epics/[EPIC-ID]/`
   - Create `epics/[EPIC-ID]/stories/` (empty initially)
   - Create `epics/[EPIC-ID]/bugs/` (empty initially)
   - Create `epics/[EPIC-ID]/docs/` for epic documentation
6. Write epic.yaml file:
   ```yaml
   id: "[EPIC-ID]"
   title: "[title from arguments]"
   description: "[scope from arguments]"
   business_value: "[value statement]"
   priority: "[P0|P1|P2|P3]"
   status: "PLANNED"
   phase: "DEFINING"
   stories: []
   bugs: []
   estimated_timeline: "[timeline]"
   success_metrics: ["[metrics]"]
   created_date: "[current_date]"
   created_by: "@PM"
   total_stories: 0
   completed_stories: 0
   total_bugs: 0
   completed_bugs: 0
   progress_percentage: 0
   ```
7. Create initial documentation:
   - Create `epics/[EPIC-ID]/docs/overview.md` with epic overview
   - Include acceptance criteria template
   - Add architecture considerations section
   - Apply file-management-enforcer validation before creation
8. Initialize Git tracking:
   - Add epic files to Git
   - Create initial commit: "feat: Add epic [EPIC-ID] - [title]"
9. Display success message:
   "✅ Epic [EPIC-ID] created: [title]"
   "📁 Location: epics/[EPIC-ID]/"
   "🎯 Status: DEFINING phase (no stories/bugs yet)"
   "🔗 Next: Create stories with icc-create-story"
10. Log creation in activity tracking and update scores (+2.0P for PM)

## Error Handling
- Missing title: "Error: Epic title is required"
- Missing scope: "Error: Project scope description is required"
- Invalid priority: "Warning: Invalid priority '[priority]', defaulting to P2"
- Duplicate epic title: "Warning: Similar epic title exists, proceeding with unique ID"
- File system error: "Error: Could not create epic directory: [specific error]"
- Permission denied: "Error: Insufficient permissions to create epic files"
- Git operation failed: "Warning: Git commit failed, epic created but not tracked"

## Epic Priority Guidelines
- **P0 (Critical)**: System-breaking issues, security vulnerabilities, customer blockers
- **P1 (High)**: Major features, important customer requests, revenue impact
- **P2 (Medium)**: Standard features, improvements, planned enhancements
- **P3 (Low)**: Nice-to-have features, research projects, future considerations

## Command Chaining
- If --with-story flag present, immediately create first story
- If --chain flag present, output epic ID for piping to next command
- Epic creation enables subsequent story/bug creation commands