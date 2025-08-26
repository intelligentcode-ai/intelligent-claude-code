# Work Item Creation Behavior

**MANDATORY:** Work items MUST be created by main agent only. Auto-correct subagent misuse.

**PURPOSE:** Enforce strict separation between creation (main agent) and execution (subagent)

## Core Principle: Creation vs Execution Separation

**CREATION (Main Agent ONLY):**
- Stories, Bugs, EPICs, PRBs creation
- Template resolution with full context
- Placeholder value replacement
- Configuration hierarchy access
- Complete project context gathering

**EXECUTION (Subagent):**
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

### BLOCKED Subagent Creation
**NEVER allow subagents to create work items:**
- Subagents operate in task-specific context
- Cannot access full configuration hierarchy
- Cannot resolve template placeholders properly
- Cannot gather complete project context
- Cannot perform proper memory searches

## Detection and Blocking

### Creation Violation Patterns
**BLOCK these subagent creation attempts:**
- Subagents creating .md files in stories/
- Subagents creating .md files in bugs/  
- Subagents creating .prb.yaml files in prbs/
- Subagents accessing template hierarchy
- Subagents performing memory searches for creation

### Creation Violation Detection
**Monitor for violations:**
- Subagent attempts to create work item files
- File creation in work item directories (stories/, bugs/, prbs/)
- Template or memory access from subagent context

**Actions:**
- Block subagent creation immediately
- Redirect to main agent with clear error
- Allow only execution operations for subagents

### Blocking Actions
**IMMEDIATE BLOCKS:**
1. **STOP subagent execution** attempting work item creation
2. **DISPLAY ERROR:** "❌ CREATION BLOCKED: Work items must be created by main agent"
3. **REDIRECT TO MAIN:** "Use main agent for creation, subagents for execution only"
4. **LOG VIOLATION:** Track misuse attempts for monitoring

## Placeholder Resolution

### Main Agent Context Requirements
**Why main agent is required for creation:**
1. **Full Configuration Access**: Load actual values from config hierarchy
2. **Template System Access**: Navigate project → .claude → ~/.claude hierarchy  
3. **Memory Search Capability**: Query memory/ directories for patterns
4. **Project Context Gathering**: Complete system nature and file analysis
5. **Best Practices Integration**: Access to project best-practices/ directory

### Template Resolution Requirements
**Main agent capabilities for creation:**
1. Load configuration hierarchy (CLAUDE.md, config.md)
2. Detect system nature (MARKDOWN-BASED vs CODE-BASED)
3. Search memory patterns and best practices
4. Gather critical project files and context
5. Resolve all template placeholders with actual values
6. Generate complete, self-contained work items

### Subagent Limitations
**Why subagents cannot create work items:**
- Limited to task-specific scope
- No configuration hierarchy access
- Cannot traverse template hierarchy
- Isolated from memory and best practices
- Cannot resolve complex placeholders

## Enforcement Mechanisms

### Pre-Creation Validation
**Required context for work item creation:**
- Main agent execution context
- Full configuration hierarchy access
- Template hierarchy availability
- Memory search and best practices access
- Complete project context gathering capability

### Real-Time Monitoring
**MONITOR for creation violations:**
- File creation operations in work item directories
- Template access attempts from subagent context
- Memory search operations for creation purposes
- Configuration hierarchy access for creation
- Best practices directory access attempts

### Auto-Correction
**WHEN violations detected:**
1. **Block subagent creation** immediately
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
- Execution enforcement operates at subagent level
- Clear separation between creation and execution workflows
- Different validation logic for creation vs execution

## Error Messages

### Error Messages
- **CREATION BLOCKED**: Subagents cannot create work items
- **TEMPLATE ACCESS DENIED**: Template resolution requires main agent
- **PLACEHOLDER RESOLUTION FAILED**: Configuration not available to subagent
- **MEMORY SEARCH BLOCKED**: Creation requires main agent memory access

## Correct Workflows

### Correct Workflow
1. **User Request**: Main agent detects work need
2. **Main Agent Creation**: Creates work item with full context
   - Gathers complete project context
   - Searches memory and best practices
   - Resolves all template placeholders
3. **Subagent Execution**: Executes self-contained PRB
   - Receives complete resolved context
   - No creation responsibilities

### Workflow Validation
- Clear separation between creation and execution phases
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