# Execution Flow Diagram

## Correct Execution Pattern

```
USER REQUEST
    ↓
MAIN AGENT
    ├── Detects work requirement
    ├── Analyzes complexity
    ├── Searches memory for patterns
    └── Creates AgentTask with embedded context
    ↓
AgentTask CREATION
    ├── Template selection (nano/tiny/medium/large/mega)
    ├── Placeholder resolution (ALL placeholders → actual values)
    ├── Context embedding (configuration, project root, files)
    └── Complete self-contained AgentTask file
    ↓
TASK TOOL INVOCATION
    ├── Task tool receives AgentTask with complete context
    ├── Appropriate agent selected based on AgentTask role assignment
    └── Agent operates in isolated context with embedded AgentTask data
    ↓
AGENT EXECUTION
    ├── Agent reads embedded AgentTask context (no external lookups)
    ├── Executes all 6 mandatory AgentTask sections
    ├── Applies configuration settings (git.privacy, branch_protection, etc.)
    └── Completes work with validation and knowledge capture
    ↓
COMPLETION
    ├── AgentTask moved from ready/ to completed/
    ├── Learning patterns stored in memory/
    └── Work delivered to user
```

## Incorrect Patterns (BLOCKED)

### ❌ Pattern 1: Direct @Role Execution
```
USER: "@Developer fix this bug"
    ↓
MAIN AGENT attempts direct execution ← BLOCKED
    ↓ 
ERROR: Must create AgentTask first
```

### ❌ Pattern 2: Conversation Confusion
```
USER: "What should @PM work on?"
    ↓
MISINTERPRETATION: Deploy PM agent ← BLOCKED
    ↓
CORRECT: This is conversational - answer the question
```

### ❌ Pattern 3: AgentTask Bypass
```
USER: "Remove files"
    ↓
ATTEMPT: Direct file operations ← BLOCKED
    ↓
ERROR: Must create AgentTask → Task tool → Agent execution
```

## Key Decision Points

### Is this a conversation or execution?

**CONVERSATION**: Questions about roles, planning discussions, hypothetical scenarios
- Example: "Which role should handle authentication?"
- Action: Answer conversationally, no agent deployment

**EXECUTION**: Actual work requests, implementation needs, file operations
- Example: "Implement authentication" 
- Action: Create AgentTask → Task tool → Agent execution

### Mental Model: Two Distinct Contexts

1. **MAIN AGENT CONTEXT** (Planning & Creation)
   - Handles conversations about roles
   - Creates AgentTasks with complete context
   - Manages system-level operations
   - Accesses full configuration hierarchy

2. **TASK TOOL CONTEXT** (Execution)
   - Receives self-contained AgentTask
   - Operates in isolated environment
   - Executes with embedded context only
   - No external configuration access

## Validation Checklist

Before any agent execution, verify:

- [ ] Work request identified and analyzed
- [ ] AgentTask created with appropriate template
- [ ] All placeholders resolved to actual values
- [ ] Complete context embedded in AgentTask
- [ ] Task tool invoked with AgentTask
- [ ] Agent receives self-contained context
- [ ] No runtime configuration lookups needed

## Common Misunderstandings

### ❌ "@Role means deploy agent immediately"
**CORRECT**: @Role in conversation is discussion, execution requires AgentTask → Task tool

### ❌ "Agents can access external configuration"
**CORRECT**: Agents only access embedded AgentTask context, no external lookups

### ❌ "Simple tasks don't need AgentTasks"
**CORRECT**: ALL execution requires AgentTask creation, even nano-complexity tasks

### ❌ "Main agent can execute technical work directly"
**CORRECT**: Technical work must be delegated via Task tool to specialist agents

## System Boundaries

```
MAIN AGENT CAPABILITIES:
├── Conversation and discussion
├── AgentTask creation and template resolution
├── Configuration hierarchy access
├── Memory search operations
├── Project context analysis
└── System-level coordination

TASK TOOL AGENT CAPABILITIES:
├── Technical implementation
├── File operations
├── Git operations  
├── Code changes
├── Testing execution
└── Specialized domain work
```

The key insight: **Main agent creates complete context, Task tool agents execute with that context.**