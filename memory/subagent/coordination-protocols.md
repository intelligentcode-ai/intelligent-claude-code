# Subagent Coordination Protocols

## 2025-08-04: Mandatory Task Tool Subagent Creation Protocol
**Context:** PRB-001-mandatory-subagent-execution
**Problem:** System allowed direct parent execution instead of proper subagent coordination
**Solution:** Established absolute coordinator-only role with mandatory Task tool invocation

### Parent Coordinator Role Definition
**PARENT RESPONSIBILITIES (ONLY):**
- Load complete project context once
- Create subagent via Task tool invocation
- Monitor subagent execution progress  
- Validate completion against success criteria
- Update PRB status and lifecycle
- Coordinate with reviewers if required
- Capture learnings for memory storage

**PARENT PROHIBITIONS (ABSOLUTE):**
- File creation or modification
- Code implementation
- Git operations execution
- System configuration changes
- Direct problem solving
- Task completion activities

### Task Tool Invocation Patterns
**Required XML Format:**
```xml
<invoke name="Task">
<parameter name="taskDescription">[Complete work description with context]</parameter>
<parameter name="projectContext">[Full project context and requirements]</parameter>
</invoke>
```

**Context Transfer Requirements:**
- System nature identification
- Project root absolute path
- All configuration values (no placeholders)
- Critical file references with samples
- User requirements clearly stated
- Embedded memory entries from search

### Completion Validation Methods
**Parent Validation Protocol:**
1. Monitor subagent execution evidence
2. Validate results against PRB requirements
3. Confirm all mandatory sections completed by subagent
4. Verify quality standards met through subagent work
5. Update PRB status only after subagent completion validation
6. Never complete work directly to "fix" issues

### Model Requirements by Complexity
- **Nano/Tiny:** claude-3-sonnet (simple coordination)
- **Medium+:** claude-3-haiku-plus or claude-3-sonnet (complex coordination)
- **Large/Mega:** claude-3-sonnet (orchestration capability required)

### Success Patterns
- 100% subagent creation compliance achieved
- Parent coordinator-only role maintained throughout
- Complete context successfully transferred to subagents
- Quality validation through subagent evidence effective

---