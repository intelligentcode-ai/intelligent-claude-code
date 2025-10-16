# Validation System

**MANDATORY:** Complete validation patterns for AgentTask execution and quality assurance. Auto-correct violations.

Consolidated from: context-validation.md, execution-validation.md, execution-summary.md, summary-validation-patterns.md, template-enforcement.md

## Context Validation

### Required Elements
**System Nature**: CODE/AI-AGENTIC/HYBRID identification
**Project Root**: Absolute path with project boundaries
**Configuration**: Actual values, no placeholders
**Critical Files**: Relevant files with content samples
**User Requirements**: Clear intent and success criteria

### Validation Rules
**No Placeholders**: All `[PLACEHOLDER]` patterns must be resolved
**Project Boundaries**: Operations constrained to project root
**Role Alignment**: Assignments match system nature (AI-AGENTIC → @AI-Engineer)

## Execution Validation

### Agent Invocation Validation
**Automatic Agent Selection Checks**:
- AgentTask work type analysis completed
- Appropriate agent specialization identified
- Dynamic specialist creation when technology expertise required
- Agent assignment documented in AgentTask context

**Task Tool Execution Isolation**:
- Task tool invocation pattern followed correctly
- Complete AgentTask context passed to subagent
- No runtime configuration lookups attempted
- Self-contained execution environment verified
- Agent operates within defined project boundaries

**Agent Execution Monitoring**:
- Agent stays within assigned AgentTask scope
- Quality standards maintained throughout execution
- Progress tracking through execution checklist
- Context preservation without external dependencies

**Post-Execution Validation**:
- All AgentTask requirements satisfied by agent
- Agent execution quality standards met
- Learning patterns captured from agent execution
- Agent results properly integrated with main system

### Detailed Validation Checklists
**Functional Requirements**: All deliverables created/modified, acceptance criteria met, code changes correct, dependencies handled, edge cases addressed

**Processual Requirements**: AgentTask template followed, role assignments complete, complexity appropriate, quality standards met, documentation updated

**Review Validation**: SME identified, review executed, feedback addressed, approval received, quality gates passed

**Success Criteria**: Acceptance validated, performance met, security satisfied, integration tested, system stable

**Knowledge Capture**: Learnings documented, memory entities created, patterns captured, errors improved, metrics recorded

**Git Operations**: Changes staged, commits follow privacy, branches managed, changes pushed, status clean

**AgentTask Lifecycle**: Git ops complete, log updated, dependencies notified, follow-ups created, state validated

### Scope Validation Process
1. **Identify Project Root**: Determine current project root directory
2. **Review Each Operation**:
   - Check installation path writes (block if writing to installation outside installation context)
   - Check project boundaries (block if outside project root)
3. **Allow Valid Operations**: Operations within project boundaries proceed normally

### Evidence Collection
**Search Validation**: Command executed, results found, zero remaining references
**Deliverables Verification**: Requirements met, specifications complete, quality gates passed
**Documentation Validation**: README updated, all documentation checked, consistency maintained

## Execution Summary Patterns

### Required Sections
**Execution Checklist**: 10-step execution status (✅/❌)
**Requirements Validation**: Functional requirements and success criteria met
**Files Modified**: Complete list of created/modified/deleted files
**Git Operations**: Branch, commits, push status, privacy compliance
**Memory Storage**: Learning patterns stored automatically
**Next Steps**: Clear guidance for follow-up actions

## Summary Validation Patterns

### Validation Rules
**Summary Completeness**: All 6 mandatory sections present, nine-step checklist with definitive status, functional requirements fully addressed, success criteria comprehensively validated, file changes completely documented, git operations transparently reported, next steps clearly defined

**Status Indicator Requirements**:
- ✅ Only for fully completed items
- ❌ For incomplete or failed items
- No partial status indicators allowed
- Evidence required for all ✅ claims
- Clear documentation required for all ❌ items

### Error Handling
**Incomplete Execution Detection**:
- Any step showing ❌ status blocks AgentTask completion
- Missing checklist items trigger completion validation failure
- Partial implementations require clear documentation of remaining work
- Git operations failures prevent completion until resolved

**Recovery Patterns (When Execution Issues Detected)**:
1. Document Issue: Specific details in summary
2. Assess Impact: Determine if blocking or non-blocking
3. Create Follow-up: Generate additional AgentTask if needed
4. Update Status: Reflect actual completion status
5. Provide Guidance: Clear steps for resolution

### Quality Standards
**Summary Quality Requirements**: Professional tone without gamification elements, clear factual reporting of completion status, specific details rather than generic confirmations, evidence-based validation rather than assumptions, transparent reporting of any issues or partial completions

## Template Enforcement

### Core Enforcement Rules
**Template Source**: Only templates from hierarchy:
- `nano-agenttask-template.yaml` (0-2 points)
- `tiny-agenttask-template.yaml` (3-5 points)
- `medium-agenttask-template.yaml` (6-15 points)
- `large-agenttask-template.yaml` (16-30 points)
- `mega-agenttask-template.yaml` (30+ points)

**Requirements**: Use templates from hierarchy, resolve all placeholders, embed configuration values

### Placeholder Resolution
**Common Placeholders**: [FROM_CONFIG] → Actual config values, [PROJECT_ROOT] → Absolute project path, [CURRENT_DATE] → System date, [SYSTEM_NATURE] → Project system type
**Resolution Rule**: All placeholders MUST be resolved at generation time

### Validation Messages
- **TEMPLATE_REQUIRED**: "AgentTask creation requires template from hierarchy"
- **PLACEHOLDER_UNRESOLVED**: "Unresolved placeholder: {placeholder} - resolve during generation"
- **RUNTIME_CONFIG_NEEDED**: "Runtime config lookup detected - embed values in AgentTask"

### Integration Requirements
**With AgentTask Creation System**: Block non-template AgentTask creation, enforce placeholder resolution before creation, validate template completeness, prevent runtime config dependencies

**With Auto-Trigger System**: Template-first flow (complexity → template → placeholder resolution), follow template hierarchy for consistency

**With Execution System**: AgentTasks execute with embedded configuration only, self-contained execution context, all settings pre-resolved and embedded

## Integration Points
**Pre-Execution**: Context completeness verified, placeholders resolved, configuration embedded, agent assignment appropriate
**Execution**: Agent stays within scope, quality maintained, progress tracked
**Post-Execution**: Requirements validated, learning captured, memory stored, summary provided

---
*Complete validation patterns for context, execution, summary, and template compliance*
