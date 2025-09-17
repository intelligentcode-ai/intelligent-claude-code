# AgentTask Execution

Execute AgentTasks with complete context through specialized agents.

## Imports
@./shared-patterns/context-validation.md
@./shared-patterns/execution-validation.md
@./shared-patterns/execution-summary.md
@./shared-patterns/workflow-enforcement-patterns.md
@./shared-patterns/agenttask-queue-management.md

## Execution Workflow

AgentTask execution steps:
1. Context loading: Load complete AgentTask with embedded context
2. Agent selection: Deploy to appropriate specialist agent via Task tool
3. Scope validation: Verify project boundaries and context
4. Implementation: Execute work within AgentTask scope
5. Quality gates: Apply validation and testing
6. Documentation: Update version, changelog, documentation
7. Git operations: Commit and push with privacy filtering
8. Completion: Mark AgentTask as completed with comprehensive execution summary
9. Memory storage: Automatically store execution learnings and patterns

Agent deployment:
- Agent selection: Based on AgentTask role assignments and work type
- Deployment: Via Task tool with complete AgentTask context
- Isolation: Each agent operates in isolated subagent context

## Context Management

Complete context loading:
- Project context: System nature, root path, boundaries
- Configuration: All settings embedded, no runtime lookups
- Critical files: Relevant files with content samples
- User requirements: Clear success criteria
- Memory patterns: Applicable learnings and best practices

Context validation:
- System nature identified (CODE/AI-AGENTIC/HYBRID)
- Project root absolute path verified
- Configuration values embedded (no placeholders)
- Critical files documented with samples
- User requirements specific and clear

## Execution Patterns

Single-pass execution:
- Objective: Complete AgentTask work in single execution without interruption
- Context: All required information embedded in AgentTask
- Validation: Built into execution flow
- Completion: Full work completion with documentation

Quality assurance integration:
- Validation: Built into AgentTask execution flow
- Testing: Agent applies appropriate testing patterns
- Documentation: Automatic updates per workflow settings
- Compliance: Template requirements enforced

## Workflow Integration

Version management:
- Version bumping: Per workflow settings embedded in AgentTask
- Changelog: Required entries per template configuration
- Documentation: Updates per AgentTask requirements

Git operations:
- Pre-operation privacy validation: Check git_privacy setting before all git operations
- Privacy filtering: Strip AI mentions when git_privacy=true
- AI mention patterns: Remove "AI", "Claude", "agent", "Generated with Claude Code"
- Commit messages: Professional, descriptive commit messages with no AI references
- Branch strategy: Per workflow settings (direct_commit/feature_branch)
- Validation enforcement: Block git operations if privacy setting not validated

## Agent Coordination

Role-based execution:
- Specialist agents: Technical work via specialized agents
- Main agent roles: Coordination roles (@PM, @Architect) in main context
- Task deployment: Technical agents deployed via Task tool

Multi-agent patterns:
- Sequential: Large AgentTasks with sub-AgentTask coordination
- Parallel: Independent work items executed simultaneously
- Validation: Cross-agent validation and review patterns

## Error Handling

Execution failures:
- Detection: Monitor for execution errors and failures
- Recovery: Automatic retry with enhanced context
- Escalation: Complex failures escalated with analysis

Context issues:
- Incomplete context: Block execution, require context completion
- Scope violations: Prevent work outside project boundaries
- Configuration errors: Validate embedded configuration
- Privacy violations: Block git operations without git_privacy validation

## Completion Validation

Work verification:
- Completion criteria: Verify all AgentTask requirements met
- Quality gates: Apply validation per template requirements
- Documentation: Confirm required updates completed
- Execution summary: Generate comprehensive summary per execution-summary.md pattern

Execution summary requirements:
- 9-step execution checklist with ✅/❌ status indicators
- Functional requirements validation checklist
- Success criteria verification checklist
- Complete files modified documentation
- Git operations summary with privacy compliance
- Clear next steps guidance and follow-up actions

Automatic memory storage (Step 9):
- Successful patterns: Implementation approaches that worked well
- Issue resolutions: Problems encountered and solutions applied
- Configuration discoveries: New settings, paths, or tool configurations
- Optimization techniques: Performance improvements and efficiency gains
- Integration solutions: Successful cross-component or cross-system integrations

Storage process:
1. Learning extraction: Identify patterns worth capturing from execution
2. Topic determination: Select appropriate memory topic based on work type
3. Security validation: Apply StoreInMemory security checklist
4. Pattern storage: Use StoreInMemory pattern with execution context
5. Index update: Update memory index for discoverability

What to store:
- Successful approaches: "AgentTask-XXX: Used [approach] for [problem], resulted in [outcome]"
- Error solutions: "AgentTask-XXX: Encountered [error], resolved with [solution]"
- Configuration patterns: "AgentTask-XXX: Found [tool/setting] at [location], enables [capability]"
- Process improvements: "AgentTask-XXX: Applied [process], improved [metric] by [amount]"

What not to store:
- Sensitive credentials, tokens, or keys
- Project-specific details that don't generalize
- Temporary states or one-time configurations
- Personal information or private data

## Integration Points

With AgentTask generation:
- Context inheritance: Complete context from generation
- Template compliance: Execution follows template structure
- Workflow settings: Apply embedded workflow configuration

With memory system:
- Pre-execution: Load applicable patterns and learnings
- Post-execution: Store new patterns and solutions
- Pattern application: Apply proven approaches

With configuration system:
- Embedded config: Use embedded configuration values
- No runtime lookup: All settings pre-resolved in AgentTask
- Workflow settings: Apply per-size workflow configuration

---
*AgentTask execution with complete context and agent coordination*