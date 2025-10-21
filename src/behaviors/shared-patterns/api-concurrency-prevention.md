# API Concurrency Prevention

**MANDATORY:** Prevent Error 400 from API rate limiting. Auto-correct violations.

## Core Principles

### ONE HOOK TRIGGER PER COMMAND
Avoid commands that trigger multiple enforcement hooks simultaneously.

**Why**: Multiple hooks firing at once can cause rapid API calls exceeding rate limits.

**Rule**: Structure commands to trigger single enforcement hook per execution.

### TASK TOOL IS SYNCHRONOUS
Task tool invocations are BLOCKING operations - main agent waits for completion.

**Execution Model**:
```
Main Agent → Task Tool → Agent Executes (BLOCKING) → Returns → Main Continues
```

**Rule**: Never assume parallel Task tool execution - agents run sequentially.

### NO RAPID-FIRE INVOCATIONS
Space out Task tool calls and respect blocking execution model.

**Rule**: Wait for agent completion before next Task tool invocation.

## Hook Trigger Patterns

### Multi-Trigger Combinations to AVOID

**Heredoc + Git Operations**:
- Triggers: pm-constraints-enforcement.js + git-enforcement hooks
- Problem: Heredoc parsing + git validation = concurrent API calls
- Solution: Use simple one-line commit messages

**Git Commit on Main Branch**:
- Triggers: Multiple git enforcement hooks
- Problem: Branch protection + git privacy + commit validation
- Solution: Work on feature branches, merge via PR

**Installation Path Operations**:
- Triggers: project-scope-enforcement.js
- Problem: Path validation during multi-file operations
- Solution: Batch operations or use single-path commands

**Build/Deploy Commands**:
- Triggers: pm-constraints-enforcement.js
- Problem: PM role attempting technical operations
- Solution: Create AgentTask for specialist

## Task Tool Execution Model

### Sequential Pattern (Standard)

**Process**:
1. Invoke Task tool for Agent 1
2. WAIT for Agent 1 completion
3. Process Agent 1 results
4. THEN invoke Task tool for Agent 2
5. WAIT for Agent 2 completion
6. Continue workflow

**When to Use**:
- Sequential dependencies between agents
- Results from Agent 1 needed by Agent 2
- Default approach for most work

### Parallel Pattern (Only for Independent Work)

**Process**:
- Single response with multiple Task tool calls
- NO dependencies between agents
- Truly independent work items

**When to Use**:
- Completely independent AgentTasks
- No shared file modifications
- No result dependencies

**Validation**:
- Can Agent 2 execute without Agent 1 results? YES → Parallel possible
- Do agents modify same files? NO → Parallel safe
- Are results independent? YES → Parallel appropriate

## Safe Command Patterns

### Git Operations

**Safe Pattern**:
```bash
# Create branch (separate command)
git checkout -b feature/fix-auth

# Simple commit message (no heredoc)
git add . && git commit -m "Fix authentication bug" && git push -u origin feature/fix-auth
```

**Unsafe Pattern**:
```bash
# Heredoc + git in single command
git commit -m "$(cat <<'EOF'
Multi-line commit message
EOF
)" && git push
```

### Agent Invocations

**Safe Pattern**:
```
1. Create AgentTask for @Developer
2. Invoke via Task tool
3. WAIT for completion
4. Review results
5. Create AgentTask for @QA-Engineer
6. Invoke via Task tool
```

**Unsafe Pattern**:
```
1. Create AgentTask for @Developer
2. Invoke via Task tool
3. Immediately create AgentTask for @QA-Engineer
4. Invoke via Task tool (Error 400 - too rapid)
```

## Recovery Pattern

### When Error 400 Occurs

**Step 1: User Intervention**
```
User runs: /rewind
```

**Step 2: Analyze Command**
- Identify multi-trigger pattern
- Determine which hooks fired simultaneously
- Assess rapid invocation sequence

**Step 3: Split Commands**
- Break into sequential operations
- One hook trigger per command
- Add wait time between Task tool calls

**Step 4: Retry Execution**
- Execute first command
- Wait for completion
- Execute subsequent commands sequentially

## Integration Points

### With Hook System
- Hooks enforce behavioral constraints
- Multiple simultaneous hooks = API overload
- Design commands for single hook activation

### With AgentTask System
- AgentTasks execute via Task tool (synchronous)
- Sequential execution prevents concurrency
- Parallel only when truly independent

### With Git Operations
- Git commands trigger multiple enforcement checks
- Simplify commit messages to avoid heredoc parsing
- Use feature branches to avoid main branch protections

---
*API concurrency prevention for intelligent-claude-code system*
