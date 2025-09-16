# AgentTask Execution

**MANDATORY:** Execute AgentTasks with complete context through specialized agents.

## Imports
@./shared-patterns/context-validation.md
@./shared-patterns/execution-validation.md
@./shared-patterns/execution-summary.md
@./shared-patterns/workflow-enforcement-patterns.md
@./shared-patterns/agenttask-queue-management.md

## Execution Workflow

### PRB Execution Steps
**MANDATORY:** All PRB execution follows structured workflow:
1. **Context Loading**: Load complete PRB with embedded context
2. **Agent Selection**: Deploy to appropriate specialist agent via Task tool
3. **Scope Validation**: Verify project boundaries and context
4. **Implementation**: Execute work within PRB scope
5. **Quality Gates**: Apply validation and testing
6. **Documentation**: Update version, changelog, documentation
7. **Git Operations**: Commit and push with privacy filtering
8. **Completion**: Mark PRB as completed with mandatory comprehensive execution summary
9. **Memory Storage**: Automatically store execution learnings and patterns

### Agent Deployment
**AGENT SELECTION:** Based on PRB role assignments and work type
**DEPLOYMENT:** Via Task tool with complete PRB context
**ISOLATION:** Each agent operates in isolated subagent context

## Context Management

### Complete Context Loading
**MANDATORY:** PRBs contain all required context:
- **Project Context**: System nature, root path, boundaries
- **Configuration**: All settings embedded, no runtime lookups
- **Critical Files**: Relevant files with content samples
- **User Requirements**: Clear success criteria
- **Memory Patterns**: Applicable learnings and best practices

### Context Validation
**PRE-EXECUTION:** Validate complete context before agent deployment:
- System nature identified (CODE/AI-AGENTIC/HYBRID)
- Project root absolute path verified
- Configuration values embedded (no placeholders)
- Critical files documented with samples
- User requirements specific and clear

## Execution Patterns

### Single-Pass Execution
**OBJECTIVE:** Complete PRB work in single execution without interruption
**CONTEXT:** All required information embedded in PRB
**VALIDATION:** Built into execution flow
**COMPLETION:** Full work completion with documentation

### Quality Assurance Integration
**VALIDATION:** Built into PRB execution flow
**TESTING:** Agent applies appropriate testing patterns
**DOCUMENTATION:** Automatic updates per workflow settings
**COMPLIANCE:** Template requirements enforced

## Workflow Integration

### Version Management
**VERSION BUMPING:** Per workflow settings embedded in PRB
**CHANGELOG:** Required entries per template configuration
**DOCUMENTATION:** Updates per PRB requirements

### Git Operations
**PRE-OPERATION PRIVACY VALIDATION:** Check git_privacy setting before ALL git operations
**PRIVACY FILTERING:** Strip AI mentions when git_privacy=true from commit messages, PR descriptions, releases
**AI MENTION PATTERNS:** Remove "AI", "Claude", "agent", "Generated with Claude Code", co-author attributions
**COMMIT MESSAGES:** Professional, descriptive commit messages with no AI references
**BRANCH STRATEGY:** Per workflow settings (direct_commit/feature_branch)
**VALIDATION ENFORCEMENT:** Block git operations if privacy setting not validated

## Agent Coordination

### Role-Based Execution
**SPECIALIST AGENTS:** Technical work via specialized agents
**MAIN AGENT ROLES:** Coordination roles (@PM, @Architect) in main context
**TASK DEPLOYMENT:** Technical agents deployed via Task tool

### Multi-Agent Patterns
**SEQUENTIAL:** Large PRBs with sub-PRB coordination
**PARALLEL:** Independent work items executed simultaneously
**VALIDATION:** Cross-agent validation and review patterns

## Error Handling

### Execution Failures
**DETECTION:** Monitor for execution errors and failures
**RECOVERY:** Automatic retry with enhanced context
**ESCALATION:** Complex failures escalated with analysis

### Context Issues
**INCOMPLETE CONTEXT:** Block execution, require context completion
**SCOPE VIOLATIONS:** Prevent work outside project boundaries
**CONFIGURATION ERRORS:** Validate embedded configuration
**PRIVACY VIOLATIONS:** Block git operations without git_privacy validation

## Completion Validation

### Work Verification
**COMPLETION CRITERIA:** Verify all PRB requirements met
**QUALITY GATES:** Apply validation per template requirements
**DOCUMENTATION:** Confirm required updates completed
**EXECUTION SUMMARY:** Generate comprehensive summary per execution-summary.md pattern

### Execution Summary Requirements
**MANDATORY:** All PRB completions MUST include comprehensive execution summary:
- 9-step execution checklist with ✅/❌ status indicators
- Functional requirements validation checklist
- Success criteria verification checklist  
- Complete files modified documentation
- Git operations summary with privacy compliance
- Clear next steps guidance and follow-up actions
- NO PRB completion without full execution summary

### Automatic Memory Storage (Step 9)
**MANDATORY:** All PRB completions MUST automatically store execution learnings:

**Memory Storage Triggers:**
- **Successful Patterns**: Implementation approaches that worked well
- **Issue Resolutions**: Problems encountered and solutions applied
- **Configuration Discoveries**: New settings, paths, or tool configurations
- **Optimization Techniques**: Performance improvements and efficiency gains
- **Integration Solutions**: Successful cross-component or cross-system integrations

**Storage Process:**
1. **Learning Extraction**: Identify patterns worth capturing from execution
2. **Topic Determination**: Select appropriate memory topic based on work type
3. **Security Validation**: Apply StoreInMemory security checklist
4. **Pattern Storage**: Use StoreInMemory pattern with execution context
5. **Index Update**: Update memory index for discoverability

**What To Store:**
- **Successful Approaches**: "PRB-XXX: Used [approach] for [problem], resulted in [outcome]"
- **Error Solutions**: "PRB-XXX: Encountered [error], resolved with [solution]"
- **Configuration Patterns**: "PRB-XXX: Found [tool/setting] at [location], enables [capability]"
- **Process Improvements**: "PRB-XXX: Applied [process], improved [metric] by [amount]"

**What NOT To Store:**
- Sensitive credentials, tokens, or keys
- Project-specific details that don't generalize
- Temporary states or one-time configurations
- Personal information or private data

### Learning Integration
**PATTERN CAPTURE:** Store successful execution patterns automatically via Step 9
**ISSUE PREVENTION:** Document and prevent recurring issues through memory storage
**KNOWLEDGE TRANSFER:** Update memory with learnings after every PRB completion

## Integration Points

### With PRB Generation
**CONTEXT INHERITANCE:** Complete context from generation
**TEMPLATE COMPLIANCE:** Execution follows template structure
**WORKFLOW SETTINGS:** Apply embedded workflow configuration

### With Memory System
**PRE-EXECUTION:** Load applicable patterns and learnings
**POST-EXECUTION:** Store new patterns and solutions
**PATTERN APPLICATION:** Apply proven approaches

### With Configuration System
**EMBEDDED CONFIG:** Use embedded configuration values
**NO RUNTIME LOOKUP:** All settings pre-resolved in PRB
**WORKFLOW SETTINGS:** Apply per-size workflow configuration

---
*PRB execution with complete context and agent coordination*