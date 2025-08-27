# Enforcement Rules

**MANDATORY:** Shared enforcement patterns and validation functions

## Subagent Scope Validation

### Scope Rules
- **Block:** Subagent working directory starting with ~/.claude/
- **Block:** File operations to ~/.claude/ (except installation)
- **Allow:** Project root working directories and project file operations

## Role System Enforcement

### Role-System Alignment
**DYNAMIC DECISION PROCESS**: Role assignments determined through PM + Architect collaboration using two-factor analysis:
- **Factor 1**: Project scope/system nature (AI-AGENTIC/CODE-BASED/HYBRID)
- **Factor 2**: Work type analysis (infrastructure, security, database, implementation, etc.)
- **Process**: PM analyzes requirements → Creates specialist architect → Joint role assignment with documented rationale

### PM+Architect Collaboration
1. PM analyzes requirements
2. PM selects domain architect
3. Joint role assignment and document rationale in PRB
4. Validate technology expertise and specialist creation capability

## Detection Functions

### Work Pattern Detection
**MANDATORY:** Block work without active PRB context

#### Main Scope Execution Blocking
**CRITICAL ARCHITECTURAL ENFORCEMENT:** All work execution MUST occur in subagent context via PRB pattern.

**BLOCKING MECHANISM:**
```
FUNCTION: enforce_main_scope_blocking(user_input, execution_context)
1. Detect work intent using advanced classification
2. Verify active PRB context exists
3. Check execution scope (main vs subagent)
4. BLOCK if main scope execution detected
5. Provide mandatory PRB creation guidance

BLOCKING CONDITIONS:
- Work intent detected AND no active PRB context
- Direct execution attempt in main scope
- Tool usage (Edit/Write/Bash) without PRB authorization
- File operations outside PRB execution flow
```

**MANDATORY ERROR RESPONSES:**
```
❌ MAIN SCOPE EXECUTION BLOCKED
Violation: Work execution attempted in main scope without PRB
Required: Generate PRB using @Role pattern before proceeding
Architecture: User Request → PRB Creation → Subagent Execution
Recovery: Use @Role pattern to trigger proper PRB generation flow
```

#### Advanced Work Intent Classification

**Primary Work Intent Detection:**
```
FUNCTION: detect_work_intent(user_input)
1. Extract action verbs and patterns from input
2. Classify based on intent categories
3. Apply context-based decision logic
4. Return classification: WORK, INFORMATION, PLANNING

Categories:
- IMPLEMENTATION_WORK: implement, create, build, develop, code, write, program
- MODIFICATION_WORK: fix, update, modify, change, refactor, optimize, enhance  
- SYSTEM_WORK: deploy, install, configure, setup, migrate, provision
- MAINTENANCE_WORK: delete, remove, clean, purge, archive, reorganize
- FILE_OPERATIONS: create file, modify file, delete file, move file
- INFRASTRUCTURE_WORK: scale, provision, configure infrastructure
```

**Information Request Detection:**
```
FUNCTION: detect_information_request(user_input)
1. Scan for query verbs and question patterns
2. Check for knowledge-seeking indicators
3. Identify status inquiry patterns
4. Return classification: INFORMATION, STATUS, PLANNING

Categories:
- INVESTIGATION: show, display, read, list, check, analyze, examine, inspect
- KNOWLEDGE_SEEKING: explain, describe, define, clarify, understand, learn
- DISCOVERY: find, search, locate, identify, discover, explore
- STATUS_INQUIRY: status, state, condition, progress, current, ongoing
- QUESTION_PATTERNS: What/How/Why/Should/Can questions
```

**Context-Based Work Classification:**
```
FUNCTION: classify_with_context(user_input, conversation_context)
1. Analyze surrounding conversation context
2. Detect work assignment patterns in @Role mentions
3. Identify implementation commitment indicators
4. Check for deadline and urgency markers

Context Indicators:
- COMMITMENT_LANGUAGE: "We need to", "Let's implement", "Please build"
- ASSIGNMENT_LANGUAGE: "@Role implement", "@Role fix", "@Role deploy"
- URGENCY_LANGUAGE: "by [date]", "urgent", "ASAP", "critical"
- SOLUTION_LANGUAGE: "This needs fixing", "We should add", "Time to deploy"
```

#### Compound Pattern Detection

**Multi-Pattern Analysis:**
```
FUNCTION: analyze_compound_patterns(user_input)
1. Break down complex requests into components
2. Identify mixed work and information patterns
3. Prioritize work patterns over information patterns
4. Handle edge cases and ambiguous requests

Examples:
- "Show me the current auth system and then fix the login bug" → WORK (fix primary intent)
- "What's the deployment process? I need to deploy the new feature" → WORK (deployment required)
- "Explain the architecture then implement the changes" → WORK (implementation required)
- "How does this work?" → INFORMATION (pure inquiry)
```

**@Role Pattern Classification:**
```
FUNCTION: classify_role_mention(user_input, role_mention)
1. Extract action context around @Role mention
2. Distinguish assignment from consultation
3. Check for work commitment indicators
4. Apply role-specific work patterns

@Role Work Assignments (TRIGGER PRB):
- "@Role implement [feature]" → Direct work assignment
- "@Role fix [issue]" → Bug fix assignment
- "@Role deploy [system]" → Operations assignment
- "@Role build [component]" → Development assignment
- "@Role configure [system]" → Configuration work

@Role Information Requests (NO PRB):
- "@Role what should we do?" → Consultation
- "@Role how would you approach?" → Planning discussion  
- "@Role can you explain?" → Knowledge request
- "@Role what's the status?" → Status inquiry
```

**Work Intent Indicators:**
- Action verbs: implement, create, build, fix, update, modify, delete, install, deploy, configure, setup
- File operations, system changes, code modifications
- @Role work assignments with implementation commitment
- Compound patterns with primary work intent
- Context-based work requirements with deadlines

**Information Request Indicators:**
- Query verbs: show, display, read, list, check, analyze, explain, describe, find, search
- @Role questions without work commitment, planning queries, status requests
- Pure knowledge-seeking patterns without implementation intent
- Architecture discussions without development commitment

**Enhanced Detection Logic with Main Scope Blocking:** 
```
FUNCTION: main_scope_execution_guard(user_input, context)
1. Analyze input for work intent patterns
2. Check for active PRB execution context
3. Verify execution scope (main vs subagent)
4. Apply comprehensive blocking logic

IF (work_intent_detected AND no_active_PRB AND main_scope) THEN
    IMMEDIATE_BLOCK("❌ MAIN SCOPE EXECUTION BLOCKED - PRB required")
    PROVIDE_GUIDANCE("Use @Role pattern to generate PRB first")
    PREVENT_TOOL_ACCESS(Edit, Write, Bash, MultiEdit)
    REDIRECT_TO_PRB_CREATION()
ELSE IF (tool_usage_detected AND no_PRB_authorization) THEN
    BLOCK_TOOL_ACCESS("❌ Tool usage requires active PRB context")
    ENFORCE_ARCHITECTURAL_PATTERN()
ELSE IF (information_request AND no_work_context) THEN
    ALLOW_INFORMATION_RESPONSE()
ELSE IF (compound_pattern WITH work_component) THEN
    PRIORITIZE_WORK_COMPONENT()
    TRIGGER_MANDATORY_PRB_CREATION()
    BLOCK_DIRECT_EXECUTION()
END IF
```

**Architectural Enforcement Priorities:**
1. **PRIMARY:** Block all main scope work execution
2. **SECONDARY:** Enforce PRB creation before work
3. **TERTIARY:** Guide users to proper @Role patterns
4. **FALLBACK:** Provide clear recovery instructions

### Tool-Specific Violations

#### Comprehensive Tool Access Blocking
**CRITICAL:** All file modification and system operation tools MUST be blocked in main scope execution.

**BLOCKED TOOLS IN MAIN SCOPE:**
- **Edit/MultiEdit:** File modification without active PRB authorization
- **Write:** File creation without PRB context and subagent execution
- **Bash:** System commands without PRB authorization (except read-only)
- **Creation Tools:** Any tool creating/modifying project files

**TOOL BLOCKING LOGIC:**
```
FUNCTION: validate_tool_access(tool_name, context)
1. Check for active PRB execution context
2. Verify subagent execution scope
3. Validate tool authorization in PRB
4. BLOCK if main scope execution detected

BLOCKING CONDITIONS:
- Tool usage attempted in main scope without PRB
- File operations outside authorized PRB context
- System modifications without subagent execution
- State-changing operations without PRB approval

ERROR RESPONSE:
"❌ TOOL ACCESS BLOCKED: {tool_name} requires active PRB execution context
Required: Execute work through @Role pattern → PRB creation → Subagent execution
Architecture: Tools only accessible within authorized PRB execution scope"
```

**EXCEPTION HANDLING:**
- **Read operations:** Always allowed for information gathering
- **LS/Glob/Grep:** Allowed for investigation and analysis
- **Non-modifying operations:** Permitted for system exploration

### False Completion Detection
**Block completion claims without checklist validation**

## Error Messages

### Standard Errors
- `SUBAGENT_REQUIRED`: "❌ PRB execution requires subagent"
- `CREATION_BLOCKED`: "❌ Work items must be created by main agent"
- `ROLE_MISMATCH`: "❌ Role {role} invalid for {system_type}"
- `SCOPE_VIOLATION`: "❌ Operation outside project boundaries"
- `DIRECT_EXECUTION_BLOCKED`: "❌ All work requires PRB - use @Role pattern"

### Recovery Actions
| Error | Recovery |
|-------|----------|
| Missing PRB | Auto-generate with correct template |
| Wrong context | Redirect to appropriate context |
| Role mismatch | Trigger PM+Architect process |
| Scope violation | Constrain to project root |

---
*Shared enforcement patterns for intelligent-claude-code*