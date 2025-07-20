# Bug Creation Command

Create bug report within epic using $ARGUMENTS as bug definition.

@../behaviors/file-management-enforcer.md

## Behavioral Sequence
1. Verify current role is @PM:
   - If not @PM, respond "Error: Bug creation requires @PM role. Current role: [current_role]"
2. Parse $ARGUMENTS to extract:
   - Bug title (required)
   - Parent epic ID (EPIC-XXX format)
   - Impact description (required)
   - Severity level (CRITICAL/HIGH/MEDIUM/LOW)
   - Reproducibility (ALWAYS/SOMETIMES/RARELY)
   - Steps to reproduce
   - Expected vs actual behavior
3. Validate required fields:
   - If title missing, respond "Error: Bug title is required"
   - If impact missing, respond "Error: Impact description is required"
   - If severity invalid, default to MEDIUM and warn
4. Validate parent epic exists:
   - Check for `epics/[EPIC-ID]/epic.yaml`
   - If not found, respond "Error: Parent epic [EPIC-ID] not found"
   - Load epic.yaml to verify status is not ARCHIVED
5. Generate next BUG-XXX ID:
   - Scan existing bugs in epic directory
   - Find highest existing BUG number
   - Assign next sequential ID (e.g., BUG-001, BUG-002)
6. Auto-align priority with severity:
   - CRITICAL severity → P0 priority
   - HIGH severity → P1 priority
   - MEDIUM severity → P2 priority
   - LOW severity → P3 priority
   - Display: "🔄 Auto-aligned: [SEVERITY] severity → [PRIORITY] priority"
7. Create bug directory structure:
   - Create `epics/[EPIC-ID]/bugs/[BUG-ID]/`
   - Create `epics/[EPIC-ID]/bugs/[BUG-ID]/tasks/` (empty initially)
   - Create `epics/[EPIC-ID]/bugs/[BUG-ID]/attachments/` for screenshots/logs
8. Write bug.yaml file:
   ```yaml
   id: "[BUG-ID]"
   title: "[title from arguments]"
   epic_id: "[EPIC-ID]"
   severity: "[CRITICAL|HIGH|MEDIUM|LOW]"
   priority: "[P0|P1|P2|P3]"
   status: "OPEN"
   phase: "DEFINING"
   reproducibility: "[ALWAYS|SOMETIMES|RARELY]"
   impact: "[impact description]"
   steps_to_reproduce: ["[step1]", "[step2]"]
   expected_behavior: "[expected]"
   actual_behavior: "[actual]"
   environment: ""
   browser: ""
   os: ""
   tasks: []
   created_date: "[current_date]"
   created_by: "@PM"
   assigned_to: null
   estimated_hours: null
   actual_hours: null
   resolution: null
   root_cause: null
   ```
9. Create bug documentation:
   - Create `epics/[EPIC-ID]/bugs/[BUG-ID]/overview.md` with bug details
   - Include troubleshooting section
   - Add investigation notes template
   - Apply file-management-enforcer validation before creation
10. Update parent epic.yaml:
    - Add bug ID to bugs array
    - Update epic progress metrics
    - Increment bug count
11. Initialize Git tracking:
    - Add bug files to Git
    - Create initial commit: "fix: Add bug [BUG-ID] - [title]"
12. Display success message:
    "✅ Bug [BUG-ID] created: [title]"
    "🐛 Severity: [SEVERITY] (Priority: [PRIORITY])"
    "📁 Location: epics/[EPIC-ID]/bugs/[BUG-ID]/"
    "🎯 Status: DEFINING phase (no tasks yet)"
    "🔗 Next: Plan investigation with icc-plan-bug"
13. Log creation in activity tracking and update scores (+1.5P for PM)

## Error Handling
- Missing title: "Error: Bug title is required"
- Invalid epic ID format: "Error: Epic ID must be in format EPIC-XXX"
- Epic not found: "Error: Parent epic [EPIC-ID] not found"
- Epic archived: "Error: Cannot add bugs to archived epic [EPIC-ID]"
- Invalid severity: "Warning: Invalid severity '[severity]', defaulting to MEDIUM"
- Invalid reproducibility: "Warning: Invalid reproducibility, defaulting to SOMETIMES"
- File system error: "Error: Could not create bug directory: [specific error]"
- Permission denied: "Error: Insufficient permissions to create bug files"
- Git operation failed: "Warning: Git commit failed, bug created but not tracked"

## Severity Guidelines
- **CRITICAL**: System crashes, data loss, security vulnerabilities, complete feature failure
- **HIGH**: Major functionality broken, significant user impact, performance degradation
- **MEDIUM**: Moderate functionality issues, workarounds available, minor user impact
- **LOW**: Cosmetic issues, edge cases, minor inconveniences

## Priority Alignment Logic
```
Severity → Priority Mapping:
CRITICAL → P0 (immediate fix required)
HIGH → P1 (fix within current sprint)
MEDIUM → P2 (fix in upcoming sprint)
LOW → P3 (fix when capacity allows)

Escalation Rules:
- Customer-reported bugs: +1 priority level
- Security-related bugs: Always P0
- Data loss bugs: Always P0
- Public-facing bugs: +1 priority level
```

## Bug Investigation Workflow
1. **DEFINING**: Document symptoms and impact
2. **INVESTIGATING**: Reproduce and analyze root cause
3. **FIXING**: Implement solution
4. **TESTING**: Verify fix and prevent regression
5. **RESOLVED**: Close bug with resolution notes

## Command Chaining
- If --plan flag present, execute `icc-plan-bug [BUG-ID]` after creation
- If --assign flag present, immediately assign to appropriate specialist
- Bug creation enables investigation and fix workflow