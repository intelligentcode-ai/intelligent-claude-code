# PRB Enforcement Behavior

**MANDATORY:** ALL work MUST use PRB system with subagent execution. Auto-correct direct execution violations.

**PURPOSE:** Enforce PRB-based execution and prevent direct execution by parent agent

## Imports
@../shared-patterns/template-loading.md
@../shared-patterns/learning-patterns.md
@../shared-patterns/memory-operations.md

## CRITICAL ENFORCEMENT RULE: PARENT IS COORDINATOR ONLY

**ABSOLUTE PROHIBITION:** Parent agent CANNOT execute work directly under any circumstances.

### Mandatory Subagent Execution
**ALL PRBs require:**
- Task tool subagent creation
- Appropriate model specification (sonnet for nano/tiny, haiku+ for medium+)
- Parent coordination role ONLY
- Complete context passing to subagent
- Subagent execution monitoring and validation

## Detection Patterns

### Direct Execution Attempt Detection
**MONITOR FOR:**
- Any work execution by parent without Task tool invocation
- File creation/modification attempts by parent
- Git operations by parent without subagent coordination
- Code implementation by parent directly
- System configuration changes by parent

**IMMEDIATE ACTIONS:**
- BLOCK execution attempt
- Generate appropriate PRB if none exists
- Force Task tool subagent creation
- Transfer work to subagent with full context

### @Role Mention Detection
**All Formats Detected:**
- "@Role:", "@Role", "Ask @Role", "@Role\n", "[@Role]", "@Role-Name"
- "@AI-Engineer", "@Developer", "@System-Engineer", etc.
- Natural language: "Can you ask @Security-Engineer to review?"
- Multiple roles: "@PM and @Developer should coordinate"
- Dynamic roles: "Let's have @[Dynamic-Role] handle this"

**ENFORCEMENT ACTION:**
1. STOP any direct execution attempt
2. Analyze complexity and generate appropriate PRB
3. Create subagent via Task tool
4. Execute work through subagent with parent as coordinator only

### Work Item Detection
**Patterns Monitored:**
- TASK-XXX, STORY-XXX, BUG-XXX, EPIC-XXX, PRB-XXX mentions
- Implementation requests
- Feature development requests
- Bug fix requests
- System modifications

**ENFORCEMENT ACTION:**
- Convert to PRB if not already PRB-structured
- Force subagent creation for execution
- Parent coordinates but never executes directly

## PRB Validation and Enforcement

### Template Selection Enforcement
**Process:**
1. **Complexity Analysis:** Calculate complexity score (0-2=Nano, 3-5=Tiny, 6-15=Medium, 16-30=Large, 30+=Mega)
2. **Template Loading:** Use hierarchy (project → .claude → ~/.claude)
3. **Subagent Requirements:** Validate subagent_required: true field
4. **Model Specification:** Ensure correct model requirement
5. **Coordinator Enforcement:** Validate coordinator_only: true field

### Subagent Creation Validation
**Required Elements:**
```xml
<invoke name="Task">
<parameter name="taskDescription">[Detailed work description]</parameter>
<parameter name="projectContext">[Complete project context]</parameter>
</invoke>
```

**VALIDATION CHECKLIST:**
- [ ] Task tool invocation present
- [ ] Complete task description provided
- [ ] Full project context included
- [ ] Appropriate model will be used by subagent
- [ ] Parent role limited to coordination

## Auto-Correction Patterns

### Direct Execution Attempt Correction
**VIOLATION DETECTED:** Parent attempting direct work execution
**AUTO-CORRECTION SEQUENCE:**
1. **IMMEDIATE BLOCK:** Stop execution attempt
2. **PRB GENERATION:** Create appropriate complexity PRB
3. **CONTEXT GATHERING:** Load complete project context
4. **SUBAGENT CREATION:** Generate Task tool invocation
5. **EXECUTION TRANSFER:** Move work to subagent
6. **COORDINATION MODE:** Parent switches to coordinator-only role

### Missing PRB Correction
**VIOLATION DETECTED:** Work attempt without PRB
**AUTO-CORRECTION SEQUENCE:**
1. **STOP EXECUTION:** Block direct work attempt
2. **COMPLEXITY ANALYSIS:** Analyze work complexity
3. **PRB GENERATION:** Create appropriate PRB template
4. **MEMORY INTEGRATION:** Search and embed relevant learnings
5. **SUBAGENT REQUIREMENT:** Add mandatory subagent execution
6. **EXECUTE VIA SUBAGENT:** Force Task tool subagent creation

### Wrong Template Correction
**VIOLATION DETECTED:** Incorrect complexity template used
**AUTO-CORRECTION SEQUENCE:**
1. **STOP EXECUTION:** Block PRB execution
2. **RE-ANALYSIS:** Recalculate complexity score
3. **TEMPLATE REPLACEMENT:** Load correct complexity template
4. **SUBAGENT UPDATE:** Update subagent requirements
5. **RESUME EXECUTION:** Continue with correct template via subagent

## Integration Points

### With PRB Execution System
- Validates PRB exists before allowing any work
- Ensures subagent creation is mandatory
- Monitors execution for direct parent violations
- Enforces coordinator-only role throughout

### With Learning System
- Captures enforcement patterns and violations
- Stores successful auto-correction techniques
- Learns from repeated violations for prevention
- Applies learning bonuses for reference to stored patterns

### With Memory System
- Searches memory before PRB generation
- Embeds relevant learnings in PRBs
- Stores new enforcement patterns discovered
- Maintains pattern effectiveness metrics

### With Autonomy Levels
**L1 (Manual):** User approval required for PRB generation and subagent creation
**L2 (Guided):** Architect approval required for Large/Mega PRBs with subagent orchestration
**L3 (Autonomous):** Automatic PRB generation and subagent creation with mandatory enforcement

## Violation Detection and Response

### Real-Time Monitoring
**CONTINUOUS MONITORING FOR:**
- Direct file operations by parent
- Git commands by parent without subagent
- Code implementation attempts by parent
- Configuration changes by parent
- Any work execution bypassing subagent system

### Violation Response Protocol
```
VIOLATION_DETECTED(violation_type):
  1. IMMEDIATE_BLOCK(current_operation)
  2. ANALYZE_COMPLEXITY(intended_work) 
  3. GENERATE_PRB(complexity_level)
  4. CREATE_SUBAGENT(prb_context)
  5. TRANSFER_EXECUTION(to_subagent)
  6. ENFORCE_COORDINATOR_ROLE(parent)
  7. LOG_VIOLATION(for_learning)
```

### Enforcement Escalation
**First Violation:** Block + Auto-correct + Generate learning
**Repeated Violations:** Block + Penalty + Reference existing learning + Escalated correction
**Persistent Violations:** System lockdown until compliance achieved

## Edge Case Handling

### Complex Detection Cases
**Natural Language Work Requests:**
- "Can you implement authentication?" → Generate Medium/Large PRB + Subagent
- "Fix this small typo" → Generate Nano PRB + Subagent
- "Design the entire system architecture" → Generate Mega PRB + Subagent

**Multiple Role Coordination:**
- "@PM and @Developer should coordinate" → Generate Large PRB with orchestration
- Multiple specialists needed → Generate appropriate complexity with sub-PRB capability

### System Commands vs Work Commands
**ALLOWED WITHOUT SUBAGENT:**
- Pure information queries
- System status checks
- Configuration reading
- Memory searches for information only

**REQUIRES SUBAGENT:**
- Any file modification
- Any implementation work
- Any system changes
- Any feature development

## Error Recovery and Learning

### Recovery Strategies
**Auto-Recoverable Violations:**
- Missing PRB → Generate and execute via subagent
- Wrong template → Correct and re-execute via subagent  
- Direct execution attempt → Block and redirect to subagent

**Manual Intervention Required:**
- System configuration conflicts
- Template loading failures
- Subagent creation failures

### Learning Capture
**STORE IN MEMORY:**
- Violation patterns and their corrections
- Successful auto-correction techniques
- Template selection accuracy improvements
- Subagent coordination effectiveness

**LEARNING FORMAT:**
```markdown
## [DATE]: Enforcement Pattern Learning
Context: [Violation context]
Violation: [Type of violation detected]
Correction: [Auto-correction applied]
Outcome: [Success/failure of correction]
Pattern: [Reusable enforcement pattern]
```

## Success Metrics

### Enforcement Effectiveness
- Direct execution violation detection rate: Target 100%
- Auto-correction success rate: Target >95%
- PRB compliance adherence: Target 100%
- Subagent creation compliance: Target 100%

### System Health
- Work execution via proper subagent channels: Target 100%
- Parent coordinator-only role adherence: Target 100%
- Template selection accuracy: Target >90%
- Review process compliance: Target 100%

## Implementation Commands

### Enforcement Commands
- `/icc-validate-prb-execution` - Validate current execution follows PRB requirements
- `/icc-check-subagent-compliance` - Verify subagent creation is being used
- `/icc-block-direct-execution` - Emergency block of direct parent execution
- `/icc-force-subagent-creation` - Force Task tool subagent for current work

**SUCCESS DEFINITION:**
PRB enforcement system successfully prevents ALL direct execution failures through comprehensive violation detection, immediate auto-correction, mandatory subagent creation, and absolute parent coordinator-only role enforcement.