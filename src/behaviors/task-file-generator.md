# Task File Generator

**PURPOSE:** Generate dedicated task files for every task, providing executing roles with clear scope and embedded settings  
**TYPE:** File Generation Component  
**STATUS:** ACTIVE

## Imports

@./session-file-cache.md                  # Session-based file caching

## Task File Generation System

### Core Task File Generator

```pseudocode
CLASS TaskFileGenerator:
    
    FUNCTION generateTaskFile(task, parentItem):
        // Generate task file path
        filePath = generateTaskFilePath(task, parentItem)
        
        // Generate file content
        content = generateTaskFileContent(task, parentItem)
        
        // Write task file
        writeFile(filePath, content)
        
        // Log file creation
        logInfo("Generated task file: " + filePath)
        
        RETURN filePath
    
    FUNCTION generateTaskFilePath(task, parentItem):
        // Determine parent type and path
        parentType = parentItem.type  // "story" or "bug"
        epicId = parentItem.epic_id
        parentId = parentItem.id
        
        // Create file name from task ID and brief description
        briefDescription = sanitizeForFilename(task.title)
        fileName = "TASK-" + task.id + "-" + briefDescription + ".md"
        
        // Build full path
        basePath = "epics/" + epicId + "/" + parentType + "s/" + parentId + "/tasks/"
        
        // Ensure directory exists
        ensureDirectoryExists(basePath)
        
        RETURN basePath + fileName
    
    FUNCTION sanitizeForFilename(title):
        // Convert to lowercase and replace spaces with hyphens
        sanitized = title.toLowerCase()
        sanitized = sanitized.replace(/[^a-z0-9-]/g, "-")
        sanitized = sanitized.replace(/-+/g, "-")
        sanitized = sanitized.substring(0, 50)  // Limit length
        
        RETURN sanitized.trim("-")
```

### Task File Template

```pseudocode
FUNCTION generateTaskFileContent(task, parentItem):
    // Extract embedded config from parent
    parentConfig = parentItem.embedded_config || {}
    
    // Generate task-specific embedded config
    taskConfig = generateTaskEmbeddedConfig(task, parentConfig)
    
    // Build content from template
    content = `# TASK-${task.id}: ${task.title}

## Task Metadata
- **ID**: TASK-${task.id}
- **Title**: ${task.title}
- **Assigned To**: ${task.assigned_to}
- **Type**: ${task.type}
- **Priority**: ${task.priority}
- **Status**: ${task.status || "pending"}
- **${parentItem.type === "story" ? "Story" : "Bug"}**: ${parentItem.id}
- **Dependencies**: ${formatDependencies(task.dependencies)}

## Task Scope
${task.description || generateTaskDescription(task)}

## Execution Instructions
${generateExecutionInstructions(task)}

## Required Information
${generateRequiredInformation(task, parentItem)}

## Embedded Config
\`\`\`yaml
${yaml.stringify(taskConfig)}
\`\`\`

## Success Criteria
${generateSuccessCriteria(task)}

## Implementation Details
${generateImplementationDetails(task)}

## Output Location
${generateOutputLocation(task)}

## Execution Context
This task will be executed via Claude Code's Task tool as a subtask.
The PM will delegate this to ${task.assigned_to} who will read this file for complete context.

**Model Selection**: ${taskConfig.model ? `This task will use the '${taskConfig.model}' model for execution.` : 'Default model (PM tasks only)'}
`
    
    RETURN content
```

### Task Configuration Generation

```pseudocode
FUNCTION generateTaskEmbeddedConfig(task, parentConfig):
    // Start with parent config as base
    config = Object.assign({}, parentConfig)
    
    // Task-specific overrides
    IF task.type == "implementation":
        config.execution_mode = "implementation"
        config.validation_required = true
        config.test_coverage_required = true
    ELSE IF task.type == "testing":
        config.execution_mode = "testing"
        config.test_framework = parentConfig.test_framework || "jest"
    ELSE IF task.type == "review":
        config.execution_mode = "review"
        config.blocking_enabled = parentConfig.blocking_enabled ?? true
    ELSE IF task.type == "documentation":
        config.execution_mode = "documentation"
        config.format = "markdown"
    
    // Priority-based settings
    IF task.priority == "blocking":
        config.parallel_eligible = false
        config.execution_priority = "immediate"
    ELSE IF task.priority == "critical_path":
        config.parallel_eligible = false
        config.execution_priority = "high"
    ELSE IF task.priority == "parallel":
        config.parallel_eligible = true
        config.execution_priority = "normal"
    ELSE:
        config.parallel_eligible = true
        config.execution_priority = "low"
    
    // Model selection based on task complexity
    // IMPORTANT: Default to "sonnet" for all non-PM tasks
    IF task.assigned_to == "PM":
        // PM tasks should not specify a model (uses default)
        // Do not add model to config
    ELSE IF task.complexity == "high" OR task.type == "architecture":
        config.model = "opus"
    ELSE:
        // DEFAULT: Always use "sonnet" for non-PM tasks
        config.model = "sonnet"
    
    RETURN config
```

### Content Generation Functions

```pseudocode
FUNCTION generateTaskDescription(task):
    // Generate default description based on task type
    descriptions = {
        "implementation": "Implement the required functionality as specified in the parent ${parentType}.",
        "testing": "Create comprehensive tests to validate the implementation.",
        "review": "Review the implementation for correctness, quality, and standards compliance.",
        "documentation": "Update documentation to reflect the changes made.",
        "investigation": "Investigate the issue and determine root cause.",
        "fix": "Implement the fix for the identified issue."
    }
    
    RETURN descriptions[task.type] || "Complete the assigned task."

FUNCTION generateExecutionInstructions(task):
    instructions = []
    
    // Type-specific instructions
    IF task.type == "implementation":
        instructions = [
            "1. Review parent ${parentType} requirements",
            "2. Implement required functionality",
            "3. Ensure code follows team standards",
            "4. Add appropriate error handling",
            "5. Include necessary logging"
        ]
    ELSE IF task.type == "testing":
        instructions = [
            "1. Review implementation to understand functionality",
            "2. Create unit tests for all functions",
            "3. Add integration tests for workflows",
            "4. Ensure edge cases are covered",
            "5. Validate error handling"
        ]
    ELSE IF task.type == "review":
        instructions = [
            "1. Review code for correctness",
            "2. Check adherence to standards",
            "3. Validate test coverage",
            "4. Assess performance implications",
            "5. Provide constructive feedback"
        ]
    
    // Add dependencies if any
    IF task.dependencies.length > 0:
        instructions.unshift("0. Ensure dependencies are completed: " + task.dependencies.join(", "))
    
    RETURN instructions.join("\n")

FUNCTION generateRequiredInformation(task, parentItem):
    info = []
    
    // Parent context
    info.push("- **Parent ${parentItem.type}**: ${parentItem.title}")
    info.push("- **Acceptance Criteria**: See parent ${parentItem.type}")
    
    // Dependencies
    IF task.dependencies.length > 0:
        info.push("- **Dependencies**: ${task.dependencies.join(", ")} must be completed first")
    
    // Related files
    IF task.related_files:
        info.push("- **Related Files**: ${task.related_files.join(", ")}")
    
    // Special requirements
    IF task.requirements:
        FOR req IN task.requirements:
            info.push("- **${req.type}**: ${req.description}")
    
    RETURN info.join("\n")

FUNCTION generateSuccessCriteria(task):
    criteria = []
    
    // Type-specific criteria
    IF task.type == "implementation":
        criteria = [
            "- Functionality implemented as specified",
            "- Code passes all tests",
            "- No regressions introduced",
            "- Code follows team standards",
            "- Documentation updated if needed"
        ]
    ELSE IF task.type == "testing":
        criteria = [
            "- All critical paths have test coverage",
            "- Tests are passing",
            "- Edge cases are covered",
            "- Tests are maintainable",
            "- Coverage meets team standards"
        ]
    ELSE IF task.type == "review":
        criteria = [
            "- Code reviewed thoroughly",
            "- Feedback provided",
            "- Issues identified and documented",
            "- Approval given or changes requested",
            "- Knowledge shared with implementer"
        ]
    
    // Add custom criteria if provided
    IF task.success_criteria:
        criteria.concat(task.success_criteria)
    
    RETURN criteria.join("\n")

FUNCTION generateImplementationDetails(task):
    details = []
    
    // Affected components
    IF task.components:
        details.push("**Affected Components:**")
        FOR component IN task.components:
            details.push("- " + component)
    
    // Technical notes
    IF task.technical_notes:
        details.push("\n**Technical Notes:**")
        details.push(task.technical_notes)
    
    // Constraints
    IF task.constraints:
        details.push("\n**Constraints:**")
        FOR constraint IN task.constraints:
            details.push("- " + constraint)
    
    RETURN details.join("\n") || "No additional implementation details."

FUNCTION generateOutputLocation(task):
    locations = []
    
    // Type-specific output locations
    IF task.type == "implementation":
        locations.push("- Implementation code in appropriate source files")
        locations.push("- Unit tests in test directory")
    ELSE IF task.type == "testing":
        locations.push("- Test files in test directory")
        locations.push("- Test results in CI/CD logs")
    ELSE IF task.type == "documentation":
        locations.push("- Documentation updates in docs/")
        locations.push("- API documentation if applicable")
    ELSE IF task.type == "review":
        locations.push("- Review comments in task file")
        locations.push("- Approval status in task metadata")
    
    RETURN locations.join("\n")

FUNCTION formatDependencies(dependencies):
    IF !dependencies OR dependencies.length == 0:
        RETURN "[]"
    
    RETURN "[" + dependencies.map(d => '"' + d + '"').join(", ") + "]"
```

### Integration with Workflow

```pseudocode
FUNCTION integrateWithWorkflow():
    // Hook into task creation in lean-workflow-executor
    
    FUNCTION onTaskCreated(task, parentItem):
        // Generate task file
        filePath = generateTaskFile(task, parentItem)
        
        // Update task object with file path
        task.file_path = filePath
        
        // Log creation
        logInfo("Task file created: " + filePath)
        
    FUNCTION onTaskUpdated(task):
        // Read existing file - OPTIMIZATION: Use cached content
        IF task.file_path AND fileExists(task.file_path):
            content = getCachedFileContent(task.file_path, "task")
            
            // Update status and other metadata
            updatedContent = updateTaskFileContent(content, task)
            
            // Write back and invalidate cache
            writeFile(task.file_path, updatedContent)
            invalidateCachedFile(task.file_path)
            
    // REMOVED: readFileSelective function - replaced by session cache
    // The session cache handles selective reading internally with "task" type
    
    FUNCTION updateTaskFileContent(content, task):
        // Update status line
        content = content.replace(
            /- \*\*Status\*\*: .*/,
            "- **Status**: " + task.status
        )
        
        // Update completion info if completed
        IF task.status == "completed":
            completionInfo = "\n\n## Completion Details\n"
            completionInfo += "- **Completed At**: " + getCurrentTime() + "\n"
            completionInfo += "- **Completed By**: " + task.assigned_to + "\n"
            
            IF task.output:
                completionInfo += "- **Output**: " + task.output + "\n"
            
            content += completionInfo
        
        RETURN content
```

### Validation Functions

```pseudocode
FUNCTION validateTaskFile(filePath):
    IF NOT fileExists(filePath):
        RETURN {
            valid: false,
            error: "Task file not found"
        }
    
    content = getCachedFileContent(filePath, "task")
    requiredSections = [
        "## Task Metadata",
        "## Task Scope",
        "## Execution Instructions",
        "## Embedded Config",
        "## Success Criteria"
    ]
    
    missingSections = []
    FOR section IN requiredSections:
        IF NOT content.includes(section):
            missingSections.push(section)
    
    IF missingSections.length > 0:
        RETURN {
            valid: false,
            error: "Missing sections: " + missingSections.join(", ")
        }
    
    // Validate embedded config
    configMatch = content.match(/```yaml\n([\s\S]*?)\n```/)
    IF NOT configMatch:
        RETURN {
            valid: false,
            error: "No embedded config found"
        }
    
    TRY:
        config = yaml.parse(configMatch[1])
        IF NOT config.execution_mode:
            RETURN {
                valid: false,
                error: "Missing execution_mode in config"
            }
    CATCH:
        RETURN {
            valid: false,
            error: "Invalid YAML in embedded config"
        }
    
    RETURN {valid: true}

FUNCTION ensureAllTasksHaveFiles(story):
    missingFiles = []
    
    FOR task IN story.tasks:
        expectedPath = generateTaskFilePath(task, story)
        IF NOT fileExists(expectedPath):
            missingFiles.push(task.id)
            // Auto-generate missing file
            generateTaskFile(task, story)
    
    IF missingFiles.length > 0:
        logWarning("Generated missing task files: " + missingFiles.join(", "))
    
    RETURN missingFiles.length == 0
```

## Usage Integration

The task file generator integrates seamlessly with the lean workflow executor:

1. **Automatic Generation**: Task files are created when tasks are defined
2. **Embedded Config**: Task-specific settings override parent settings
3. **Complete Context**: Each file contains all information needed for execution
4. **Status Updates**: Files are updated as tasks progress
5. **Validation**: Ensures all tasks have properly formatted files

## Example Generated Task File

```markdown
# TASK-003: Implement user service

## Task Metadata
- **ID**: TASK-003
- **Title**: Implement user service
- **Assigned To**: @Developer
- **Type**: implementation
- **Priority**: parallel
- **Status**: pending
- **Story**: STORY-001
- **Dependencies**: ["TASK-001", "TASK-002"]

## Task Scope
Implement the required functionality as specified in the parent story.

## Execution Instructions
0. Ensure dependencies are completed: TASK-001, TASK-002
1. Review parent story requirements
2. Implement required functionality
3. Ensure code follows team standards
4. Add appropriate error handling
5. Include necessary logging

## Required Information
- **Parent story**: Add user preferences
- **Acceptance Criteria**: See parent story
- **Dependencies**: TASK-001, TASK-002 must be completed first

## Embedded Config
```yaml
execution_mode: implementation
validation_required: true
test_coverage_required: true
parallel_eligible: true
execution_priority: normal
model: sonnet
```

## Success Criteria
- Functionality implemented as specified
- Code passes all tests
- No regressions introduced
- Code follows team standards
- Documentation updated if needed

## Implementation Details
No additional implementation details.

## Output Location
- Implementation code in appropriate source files
- Unit tests in test directory

## Execution Context
This task will be executed via Claude Code's Task tool as a subtask.
The PM will delegate this to @Developer who will read this file for complete context.

**Model Selection**: This task will use the 'sonnet' model for execution.
```

## Benefits

1. **Independent Execution**: Roles can execute tasks using only the task file
2. **Clear Scope**: Each task has well-defined boundaries and requirements
3. **Configuration Inheritance**: Parent settings cascade with task-specific overrides
4. **Traceability**: Task files serve as execution records
5. **Parallel Execution**: Subtasks can run independently with their own files
6. **Model Optimization**: Non-PM tasks use Sonnet model for faster execution

---
*Task file generator for intelligent-claude-code system*