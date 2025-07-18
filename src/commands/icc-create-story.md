# icc:create-story

Create a new story within an epic with basic structure. This is a Stage 1 (DEFINING) command that creates the story without any tasks. PM-only command.

## Usage
```
icc-create-story "Story title" --epic EPIC-XXX --project-scope "Story-specific scope" [--priority P2] [--type feature]
```

## Parameters
- `title`: Story title/description (required)
- `--epic`: Parent epic ID (required)
- `--project-scope`: Story-specific scope within epic context (required)
- `--priority`: P0, P1, P2, P3 (default: P2)
- `--type`: feature, enhancement, refactor, process_enhancement (default: feature)

## Imports

@../behaviors/id-formatting-guide.md

## Implementation
Creates story structure following Stage 1 (DEFINING) workflow:

1. **Role Validation**: Verify current role is @PM (required)
2. **Epic Validation**: Verify parent epic exists
3. **ID Assignment**: Check existing stories and assign next sequential STORY-XXX ID
4. **Directory Creation**: Create story directory under epic
5. **YAML Creation**: Create story.yaml with metadata
6. **Epic Update**: Add story reference to parent epic
7. **No Task Creation**: Stage 1 - defining only, no tasks

## Expected Output
```
📋 Story Creation (Stage 1: DEFINING)

🔐 Role Check: @PM ✅
🔍 Parent Epic: EPIC-002 ✅
🆔 Generated ID: STORY-023
📁 Creating: epics/EPIC-002-workflow-enhancement/stories/STORY-023-api-integration/

✅ Story created successfully:
  - ID: STORY-023
  - Title: API Integration Framework
  - Epic: EPIC-002
  - Status: PLANNED
  - Phase: DEFINING
  - Priority: P1
  - Project Scope: ✅ Included

📝 Updated parent epic with story reference

⏭️  Next Step: Use /icc-plan-order to plan execution with Architect
```

## YAML Structure
```yaml
story:
  id: "STORY-XXX"
  title: "Story title"
  type: "feature"
  epic: "EPIC-XXX"
  created: "YYYY-MM-DD HH:MM:SS"
  created_by: "@PM"
  assigned_to: ""  # Will be assigned during planning
  priority: "P2"
  severity: "MEDIUM"  # Adjusted based on priority
  status: "PLANNED"
  phase: "DEFINING"
  
problem_statement: |
  [Generated from title and context]
  
user_story: |
  As a [user type], I want [feature] so that [benefit]
  
business_value: |
  [Generated from project scope]
  
project_scope: |
  [From --project-scope parameter]
  
acceptance_criteria: []  # Will be defined during planning

definition_of_done:
  - To be defined during planning phase
  
# Embedded config inherits from epic
embedded_config:
  autonomy_level: "L2"
  pm_always_active: true
  
workflow:
  current_phase: "DEFINING"
  approach: "to_be_determined"
  
tasks: []  # Empty - will be added in Stage 3 (REFINING)
```

## Validation
- **PM Role Required**: Only @PM can create stories
- **Epic Must Exist**: Parent epic must be valid
- **Project Scope Mandatory**: Must include story-specific scope
- **No Tasks Created**: Stage 1 creates structure only
- **ID Uniqueness**: Checks existing stories to avoid duplicates

## Epic Update
Automatically adds story reference to parent epic:
```yaml
stories:
  - id: "STORY-XXX"
    title: "Story title"
    description: "Brief description"
    status: "PLANNED"
    priority: "P2"
```

## Integration
- Follows ID formatting guidelines from id-formatting-guide.md
- Creates story under correct epic directory
- Updates parent epic with story reference
- Sets initial status: PLANNED and phase: DEFINING
- Ready for Stage 2: PLANNING with /icc-plan-order

## Implementation Pseudocode

```pseudocode
FUNCTION createStory(title, epicId, projectScope, priority = "P2", type = "feature"):
    // 1. Role validation
    IF currentRole != "PM":
        THROW "Only @PM can create stories"
    
    // 2. Epic validation
    epicPath = findEpicPath(epicId)
    IF NOT epicPath:
        THROW "Epic not found: " + epicId
    
    epicData = readYAML(epicPath + "/epic.yaml")
    
    // 3. ID Assignment following formatting guidelines
    // Check existing stories to find highest ID
    existingStories = glob(epicPath + "/stories/*/story.yaml")
    highestId = 0
    
    FOR storyPath IN existingStories:
        storyData = readYAML(storyPath)
        IF storyData.story.id:
            idNumber = extractNumber(storyData.story.id)
            IF idNumber > highestId:
                highestId = idNumber
    
    // Assign next sequential ID
    nextId = highestId + 1
    storyId = "STORY-" + padToThreeDigits(nextId)
    
    // 4. Create story directory
    storyDir = epicPath + "/stories/" + storyId + "-" + sanitize(title)
    createDirectory(storyDir)
    
    // 5. Create story.yaml
    story = {
        story: {
            id: storyId,
            title: title,
            type: type,
            epic: epicId,
            created: getCurrentTimestamp(),
            created_by: "@PM",
            assigned_to: "",
            priority: priority,
            severity: mapPriorityToSeverity(priority),
            status: "PLANNED",
            phase: "DEFINING"
        },
        problem_statement: generateProblemStatement(title, epicData),
        user_story: generateUserStory(title, type),
        business_value: extractBusinessValue(projectScope),
        project_scope: projectScope,
        acceptance_criteria: [],
        definition_of_done: ["To be defined during planning phase"],
        embedded_config: {
            autonomy_level: epicData.embedded_config?.autonomy_level || "L2",
            pm_always_active: true
        },
        workflow: {
            current_phase: "DEFINING",
            approach: "to_be_determined"
        },
        tasks: []
    }
    
    writeYAML(storyDir + "/story.yaml", story)
    
    // 6. Update parent epic
    updateEpicWithStory(epicPath, storyId, title, priority)
    
    // 7. Return success
    RETURN {
        success: true,
        storyId: storyId,
        path: storyDir,
        nextStep: "/icc-plan-order"
    }

FUNCTION updateEpicWithStory(epicPath, storyId, title, priority):
    epicFile = epicPath + "/epic.yaml"
    epicData = readYAML(epicFile)
    
    // Initialize stories array if not exists
    IF NOT epicData.stories:
        epicData.stories = []
    
    // Add story reference
    storyRef = {
        id: storyId,
        title: title,
        description: "Story created in DEFINING phase",
        status: "PLANNED",
        priority: priority
    }
    
    epicData.stories.append(storyRef)
    
    // Update epic modified timestamp
    epicData.modified = getCurrentTimestamp()
    epicData.modified_by = "@PM"
    
    writeYAML(epicFile, epicData)

// Helper functions for ID formatting
FUNCTION extractNumber(id):
    // Extract numeric part from ID (e.g., "STORY-014" -> 14)
    parts = id.split("-")
    IF parts.length == 2:
        RETURN parseInt(parts[1])
    RETURN 0

FUNCTION padToThreeDigits(number):
    // Pad number with leading zeros (e.g., 14 -> "014")
    str = toString(number)
    WHILE str.length < 3:
        str = "0" + str
    RETURN str
```