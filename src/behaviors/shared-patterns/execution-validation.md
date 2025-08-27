# Execution Validation Patterns

**PURPOSE:** Shared validation patterns for PRB execution with automatic agent invocation and execution isolation enforcement

## Agent Invocation Validation

### Automatic Agent Selection
**MANDATORY CHECKS:**
- PRB work type analysis completed
- Appropriate agent specialization identified
- Dynamic specialist creation when technology expertise required
- Agent assignment documented in PRB context

### Task Tool Execution Validation
**EXECUTION ISOLATION CHECKS:**
- Task tool invocation pattern followed correctly
- Complete PRB context passed to subagent
- No runtime configuration lookups attempted
- Self-contained execution environment verified
- Agent operates within defined project boundaries

### Agent Execution Monitoring
**DURING EXECUTION:**
- Agent stays within assigned PRB scope
- Quality standards maintained throughout execution
- Progress tracking through execution checklist
- Context preservation without external dependencies

### Post-Execution Agent Validation
**COMPLETION VERIFICATION:**
- All PRB requirements satisfied by agent
- Agent execution quality standards met
- Learning patterns captured from agent execution
- Agent results properly integrated with main system

## Detailed Validation Checklists

### Functional Requirements
- All deliverables created/modified
- Acceptance criteria met
- Code changes correct
- Dependencies handled
- Edge cases addressed

### Processual Requirements  
- PRB template followed
- Role assignments complete
- Complexity appropriate
- Quality standards met
- Documentation updated

### Review Validation
- SME identified
- Review executed
- Feedback addressed
- Approval received
- Quality gates passed

### Success Criteria
- Acceptance validated
- Performance met
- Security satisfied
- Integration tested
- System stable

### Knowledge Capture
- Learnings documented
- Memory entities created
- Patterns captured
- Errors improved
- Metrics recorded

### Git Operations
- Changes staged
- Commits follow privacy
- Branches managed
- Changes pushed
- Status clean

### PRB Lifecycle
- Git ops complete
- Log updated
- Dependencies notified
- Follow-ups created
- State validated
- PRB moved to completed/

## Scope Validation Process

**Project Scope Validation Steps:**

1. **Identify Project Root:** Determine the current project root directory
2. **Review Each Operation:**
   - **Check ~/.claude/ Writes:** When operation writes to ~/.claude/ and is not installation, block with scope violation error
   - **Check Project Boundaries:** When operation is outside project root, block with boundary error
3. **Allow Valid Operations:** Operations within project boundaries proceed normally

## Evidence Collection

**Validation Log Format:**

### Search Validation
- **Command Executed:** Documentation of search commands used
- **Results Found:** Documented search results
- **Zero Remaining References:** Confirmed or requires attention

### Deliverables Verification
- **Requirements Met:** All functional requirements satisfied
- **Specifications Complete:** Implementation matches specifications
- **Quality Gates Passed:** All quality standards achieved

### Documentation Validation
- **README Updated:** Main documentation reflects changes
- **All Documentation Checked:** Comprehensive documentation review
- **Consistency Maintained:** All documentation remains consistent

---
*Shared validation patterns extracted from prb-execution.md*