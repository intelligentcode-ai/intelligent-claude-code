# Work Item Creation Behavior

**MANDATORY:** Work items MUST be created by main agent only. Auto-correct Task tool misuse.

**PURPOSE:** Enforce strict separation between creation (main agent) and execution (Task tool)

## Core Principle: Creation vs Execution Separation

**CREATION (Main Agent ONLY):**
- Stories, Bugs, EPICs, PRBs creation
- Template resolution with full context
- Placeholder value replacement
- Configuration hierarchy access
- Complete project context gathering

**EXECUTION (Task Tool REQUIRED):**
- PRB implementation work
- Role-based task delegation
- Code changes and file operations
- Testing and validation
- Git operations within PRB scope

## Creation Rules

### MANDATORY Main Agent Creation
**CRITICAL:** ALL work item creation MUST happen in main agent context:

1. **Stories**: Main agent creates with full business context
2. **Bugs**: Main agent creates with complete issue analysis  
3. **EPICs**: Main agent creates with strategic overview
4. **PRBs**: Main agent creates with resolved templates and full context

### BLOCKED Task Tool Creation
**NEVER allow Task tool to create work items:**
- Task tool operates in isolated context
- Cannot access full configuration hierarchy
- Cannot resolve template placeholders properly
- Cannot gather complete project context
- Cannot perform proper memory searches

## Detection and Blocking

### Creation Violation Patterns
**BLOCK these Task tool creation attempts:**
- Task tool creating .md files in stories/
- Task tool creating .md files in bugs/  
- Task tool creating .prb.yaml files in prbs/
- Task tool accessing template hierarchy
- Task tool performing memory searches for creation

### Detection Function
```
DetectCreationViolation(execution_context):
  # Check if Task tool attempting work item creation
  IF execution_context.is_task_tool_subagent AND 
     execution_context.operation_type IN ["create_story", "create_bug", "create_epic", "create_prb"]:
    RETURN CREATION_VIOLATION("Task tool cannot create work items")
  
  # Check file creation patterns  
  IF execution_context.is_task_tool_subagent AND
     execution_context.file_operations.contains_creation AND
     execution_context.target_directories IN ["stories/", "bugs/", "prbs/"]:
    RETURN FILE_CREATION_VIOLATION("Work item files must be created by main agent")
  
  RETURN VALIDATION_PASSED
```

### Blocking Actions
**IMMEDIATE BLOCKS:**
1. **STOP Task tool execution** attempting work item creation
2. **DISPLAY ERROR:** "❌ CREATION BLOCKED: Work items must be created by main agent"
3. **REDIRECT TO MAIN:** "Use main agent for creation, Task tool for execution only"
4. **LOG VIOLATION:** Track misuse attempts for monitoring

## Placeholder Resolution

### Main Agent Context Requirements
**Why main agent is required for creation:**
1. **Full Configuration Access**: Load actual values from config hierarchy
2. **Template System Access**: Navigate project → .claude → ~/.claude hierarchy  
3. **Memory Search Capability**: Query memory/ directories for patterns
4. **Project Context Gathering**: Complete system nature and file analysis
5. **Best Practices Integration**: Access to project best-practices/ directory

### Template Resolution Process
```
MainAgentTemplateResolution(work_request):
  1. **Load Configuration**: Get actual values from CLAUDE.md, config.md
  2. **Detect System Nature**: Analyze project to determine MARKDOWN-BASED vs CODE-BASED
  3. **Search Memory**: Query memory/[topic]/ for relevant patterns
  4. **Search Best Practices**: Query best-practices/ for methodological approaches
  5. **Gather Critical Files**: Find and sample relevant project files
  6. **Resolve Placeholders**: Replace ALL "[FROM_CONFIG]", "[PROJECT_ROOT]" with actual values
  7. **Generate Work Item**: Create with complete, resolved context
```

### Task Tool Isolation Problems
**Why Task tool CANNOT create work items:**
```
Task Tool Context Limitations:
- Limited working directory scope
- No access to full configuration hierarchy  
- Cannot traverse template hierarchy
- Isolated from memory search functions
- Cannot access best-practices/ directory
- No project-wide context gathering
- Cannot resolve complex placeholders
```

## Enforcement Mechanisms

### Pre-Creation Validation
**MANDATORY checks before any work item creation:**
```markdown
PRE-CREATION VALIDATION CHECKLIST:
☐ Execution context is main agent (NOT Task tool)
☐ Full configuration hierarchy accessible
☐ Template hierarchy accessible (project → .claude → ~/.claude)
☐ Memory search functions available
☐ Best practices directory accessible
☐ Project root and context available
☐ Placeholder resolution capability confirmed
```

### Real-Time Monitoring
**MONITOR for creation violations:**
- File creation operations in work item directories
- Template access attempts from Task tool context
- Memory search operations for creation purposes
- Configuration hierarchy access for creation
- Best practices directory access attempts

### Auto-Correction
**WHEN violations detected:**
1. **Block Task tool creation** immediately
2. **Redirect to main agent** with clear instructions
3. **Preserve work request context** for main agent processing
4. **Log violation pattern** for system improvement
5. **Display correct workflow** to user

## Integration Points

### With Story Breakdown
**story-breakdown.md integration:**
- @PM story breakdown operates in main agent context
- PRB creation happens in main agent context  
- Role assignment uses main agent configuration access
- Template selection uses main agent hierarchy access

### With PRB Auto-Trigger  
**prb-auto-trigger.md integration:**
- Auto-detection operates in main agent context
- Memory search uses main agent capabilities
- Best practices search uses main agent access
- Template resolution uses main agent hierarchy
- Context gathering uses main agent project access

### With PRB Enforcement
**prb-enforcement.md integration:**
- Creation enforcement operates at main agent level
- Execution enforcement operates at Task tool level
- Clear separation between creation and execution workflows
- Different validation logic for creation vs execution

## Error Messages

### Creation Violation Errors
```
❌ CREATION BLOCKED: Task tool cannot create work items
Reason: Work items require full context only available to main agent
Solution: Use main agent for creation, Task tool for execution only

❌ TEMPLATE ACCESS DENIED: Task tool cannot access template hierarchy
Reason: Template resolution requires main agent configuration access
Solution: Create work items in main agent context

❌ PLACEHOLDER RESOLUTION FAILED: Task tool cannot resolve "[FROM_CONFIG]"
Reason: Configuration hierarchy not available in Task tool context
Solution: Main agent must handle template placeholder resolution

❌ MEMORY SEARCH BLOCKED: Task tool cannot perform creation memory searches
Reason: Creation requires main agent memory access capabilities
Solution: Use main agent for work item creation with memory context
```

## Correct Workflows

### Correct Creation → Execution Flow
```
1. USER REQUEST → Main agent detects work need
2. MAIN AGENT → Creates appropriate work item (Story/Bug/EPIC/PRB)
   - Gathers full context
   - Searches memory and best practices  
   - Resolves all template placeholders
   - Uses configuration hierarchy
3. TASK TOOL → Executes completed PRB
   - Receives self-contained PRB with resolved context
   - Performs implementation work
   - No creation responsibilities
```

### Workflow Validation
**VALIDATE each workflow step:**
- Creation phase: Main agent context confirmed
- Execution phase: Task tool context confirmed
- No context mixing between phases
- Complete context passed from creation to execution
- No placeholder values reach execution phase

## Learning Integration

### Pattern Capture
**Store creation patterns in memory:**
- Successful creation workflows
- Common placeholder resolution patterns  
- Template hierarchy usage patterns
- Configuration access patterns
- Context gathering improvements

### Memory Storage Location
`memory/behavioral-patterns/work-item-creation.md` - Creation workflow patterns
`memory/system-organization/creation-execution-separation.md` - Separation pattern learnings

---
*Work item creation behavior for intelligent-claude-code system*