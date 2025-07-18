# icc:create-bug

Create a new bug report within an epic with basic structure. This is a Stage 1 (DEFINING) command that creates the bug without any tasks. PM-only command.

## Usage
```
icc-create-bug "Bug title" --epic EPIC-XXX --project-scope "Bug impact scope" [--priority P1] [--severity HIGH]
```

## Parameters
- `title`: Bug title/description (required)
- `--epic`: Parent epic ID (required)
- `--project-scope`: Bug impact scope and affected areas (required)
- `--priority`: P0, P1, P2, P3 (default: P1)
- `--severity`: CRITICAL, HIGH, MEDIUM, LOW (default: HIGH)
- `--type`: integration, functionality, performance, security (default: functionality)

## Implementation
Creates bug structure following Stage 1 (DEFINING) workflow:

1. **Role Validation**: Verify current role is @PM (required)
2. **Epic Validation**: Verify parent epic exists
3. **ID Generation**: Generate next available BUG-XXX ID
4. **Directory Creation**: Create bug directory under epic
5. **YAML Creation**: Create bug.yaml with metadata
6. **Epic Update**: Add bug reference to parent epic
7. **No Task Creation**: Stage 1 - defining only, no tasks

## Expected Output
```
📋 Bug Creation (Stage 1: DEFINING)

🔐 Role Check: @PM ✅
🔍 Parent Epic: EPIC-002 ✅
🆔 Generated ID: BUG-071
📁 Creating: epics/EPIC-002-workflow-enhancement/bugs/BUG-071-validation-not-enforced/

✅ Bug created successfully:
  - ID: BUG-071
  - Title: Validation Not Enforced in Workflow
  - Epic: EPIC-002
  - Status: PLANNED
  - Phase: DEFINING
  - Priority: P0
  - Severity: CRITICAL
  - Project Scope: ✅ Included

📝 Updated parent epic with bug reference

⏭️  Next Step: Use /icc-plan-order to plan fix with Architect
```

## YAML Structure
```yaml
bug:
  id: "BUG-XXX"
  title: "Bug title"
  type: "functionality"
  epic: "EPIC-XXX"
  created: "YYYY-MM-DD HH:MM:SS"
  created_by: "@PM"
  assigned_to: ""  # Will be assigned during planning
  priority: "P1"
  severity: "HIGH"
  status: "PLANNED"
  phase: "DEFINING"
  
problem_description: |
  [Generated from title and context]
  
root_cause: |
  To be determined during investigation
  
impact: |
  [Generated from project scope]
  
project_scope: |
  [From --project-scope parameter]
  
acceptance_criteria: []  # Will be defined during planning
  
definition_of_done:
  - Root cause identified
  - Fix implemented and tested
  - No regression in affected areas
  - Documentation updated if needed
  
# Embedded config inherits from epic
embedded_config:
  autonomy_level: "L2"
  pm_always_active: true
  blocking_enabled: true  # Bugs may need blocking
  
workflow:
  current_phase: "DEFINING"
  fix_approach: "to_be_determined"
  testing_required: true
  
tasks: []  # Empty - will be added in Stage 3 (REFINING)
```

## Validation
- **PM Role Required**: Only @PM can create bugs
- **Epic Must Exist**: Parent epic must be valid
- **Project Scope Mandatory**: Must include impact scope
- **No Tasks Created**: Stage 1 creates structure only
- **ID Uniqueness**: Checks existing bugs to avoid duplicates
- **Severity Alignment**: Auto-adjusts priority based on severity

## Priority/Severity Mapping
```
CRITICAL severity → default P0 priority
HIGH severity → default P1 priority
MEDIUM severity → default P2 priority
LOW severity → default P3 priority
```

## Epic Update
Automatically adds bug reference to parent epic:
```yaml
bugs:
  - id: "BUG-XXX"
    title: "Bug title"
    severity: "HIGH"
    status: "PLANNED"
    priority: "P1"
```

## Integration
- Updates ID tracking system (when implemented)
- Creates bug under correct epic directory
- Updates parent epic with bug reference
- Sets initial status: PLANNED and phase: DEFINING
- Ready for Stage 2: PLANNING with /icc-plan-order
- Aligns priority with severity for proper handling