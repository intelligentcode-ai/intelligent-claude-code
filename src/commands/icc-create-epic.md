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

## Imports

@../behaviors/id-formatting-guide.md

## Implementation
Creates epic structure following Stage 1 (DEFINING) workflow:

1. **Role Validation**: Verify current role is @PM (required)
2. **ID Assignment**: Check existing epics and assign next sequential EPIC-XXX ID
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
- Follows ID formatting guidelines from id-formatting-guide.md
- Creates proper directory structure
- Sets initial status: PLANNED and phase: DEFINING
- Ready for Stage 2: PLANNING with /icc-plan-order

## Implementation Pseudocode

```pseudocode
FUNCTION createEpic(title, projectScope, priority = "P2", type = "enhancement"):
    // 1. Role validation
    IF currentRole != "PM":
        THROW "Only @PM can create epics"
    
    // 2. ID Assignment following formatting guidelines
    // Check existing epics to find highest ID
    existingEpics = glob("epics/*/epic.yaml")
    highestId = 0
    
    FOR epicPath IN existingEpics:
        epicData = readYAML(epicPath)
        IF epicData.epic.id:
            idNumber = extractNumber(epicData.epic.id)
            IF idNumber > highestId:
                highestId = idNumber
    
    // Assign next sequential ID
    nextId = highestId + 1
    epicId = "EPIC-" + padToThreeDigits(nextId)
    
    // 3. Create epic directory
    epicDir = "epics/" + epicId + "-" + sanitize(title)
    createDirectory(epicDir)
    
    // 4. Create subdirectories
    createDirectory(epicDir + "/stories")
    createDirectory(epicDir + "/bugs")
    
    // 5. Create epic.yaml
    epic = {
        epic: {
            id: epicId,
            title: title,
            type: type,
            created: getCurrentTimestamp(),
            created_by: "@PM",
            status: "PLANNED",
            phase: "DEFINING",
            priority: priority
        },
        description: generateDescription(title),
        project_scope: projectScope,
        goals: ["Primary objectives to be refined during planning"],
        stories: [],
        bugs: [],
        success_criteria: ["To be defined during planning phase"],
        principles: ["To be established during architecture phase"]
    }
    
    writeYAML(epicDir + "/epic.yaml", epic)
    
    // 6. Return success
    RETURN {
        success: true,
        epicId: epicId,
        path: epicDir,
        nextStep: "/icc-plan-order"
    }

FUNCTION generateDescription(title):
    // Generate a meaningful description from the title
    description = "Epic for " + title + "\n\n"
    description += "This epic encompasses all work related to " + toLowerCase(title) + ".\n"
    description += "Detailed objectives and success criteria will be defined during the planning phase."
    
    RETURN description

FUNCTION sanitize(text):
    // Convert text to filesystem-safe format
    // Replace spaces with hyphens, remove special chars, lowercase
    sanitized = text.toLowerCase()
    sanitized = sanitized.replace(/\s+/g, "-")
    sanitized = sanitized.replace(/[^a-z0-9-]/g, "")
    sanitized = sanitized.replace(/--+/g, "-")
    sanitized = sanitized.trim("-")
    
    RETURN sanitized

// Helper functions for ID formatting
FUNCTION extractNumber(id):
    // Extract numeric part from ID (e.g., "EPIC-003" -> 3)
    parts = id.split("-")
    IF parts.length == 2:
        RETURN parseInt(parts[1])
    RETURN 0

FUNCTION padToThreeDigits(number):
    // Pad number with leading zeros (e.g., 3 -> "003")
    str = toString(number)
    WHILE str.length < 3:
        str = "0" + str
    RETURN str
```