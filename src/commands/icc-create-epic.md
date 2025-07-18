# icc:create-epic

Create a new epic with basic structure and metadata. This is a Stage 1 (DEFINING) command that creates the epic without any stories, bugs, or tasks. PM-only command.

## Usage
```
icc-create-epic "Epic title" --project-scope "Project scope description" [--priority P2] [--type enhancement]
```

## Parameters
- `title`: Epic title/description (required)
- `--project-scope`: Overall project scope and business value (required)
- `--priority`: P0, P1, P2, P3 (default: P2)
- `--type`: enhancement, feature, infrastructure, optimization (default: enhancement)

## Implementation
Creates epic structure following Stage 1 (DEFINING) workflow:

1. **Role Validation**: Verify current role is @PM (required)
2. **ID Generation**: Generate next available EPIC-XXX ID
3. **Directory Creation**: Create epic directory structure
4. **YAML Creation**: Create epic.yaml with metadata
5. **Subdirectory Setup**: Initialize stories/ and bugs/ directories
6. **No Task Creation**: Stage 1 - defining only, no tasks

## Expected Output
```
📋 Epic Creation (Stage 1: DEFINING)

🔐 Role Check: @PM ✅
🆔 Generated ID: EPIC-003
📁 Creating: epics/EPIC-003-user-authentication/

✅ Epic created successfully:
  - ID: EPIC-003
  - Title: User Authentication System
  - Status: PLANNED
  - Phase: DEFINING
  - Priority: P1
  - Project Scope: ✅ Included

📂 Structure created:
  epics/EPIC-003-user-authentication/
  ├── epic.yaml
  ├── stories/
  └── bugs/

⏭️  Next Step: Use /icc-plan-order to plan execution with Architect
```

## YAML Structure
```yaml
epic:
  id: "EPIC-XXX"
  title: "Epic title"
  type: "enhancement"
  created: "YYYY-MM-DD HH:MM:SS"
  created_by: "@PM"
  status: "PLANNED"
  phase: "DEFINING"
  priority: "P2"
  
description: |
  [Generated from title]
  
project_scope: |
  [From --project-scope parameter]
  
goals:
  - Primary objectives to be refined during planning
  
stories: []  # Empty - will be added in Stage 3 (REFINING)
bugs: []     # Empty - will be added as discovered

success_criteria:
  - To be defined during planning phase
  
principles:
  - To be established during architecture phase
```

## Validation
- **PM Role Required**: Only @PM can create epics
- **Project Scope Mandatory**: Must include business value/scope
- **No Tasks Created**: Stage 1 creates structure only
- **ID Uniqueness**: Checks existing epics to avoid duplicates

## Integration
- Updates ID tracking system (when implemented)
- Creates proper directory structure
- Sets initial status: PLANNED and phase: DEFINING
- Ready for Stage 2: PLANNING with /icc-plan-order