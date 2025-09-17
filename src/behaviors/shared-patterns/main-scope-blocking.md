# Main Scope Blocking

Block work execution in main scope. Use AgentTask+agent pattern.

## Core Principle
**Main scope = AgentTask creation only**
**Subagent = Work execution only**

## Blocking Rules
**Block in main scope:**
- File operations (Edit/Write/MultiEdit)
- System changes (Bash modifications)
- Direct work execution

**Process:**
1. User Request → AgentTask Generation (main scope)
2. AgentTask → Task Tool → Agent Execution (subagent)

## Error Recovery
**When work detected:**
1. Block the action
2. Create AgentTask with requirements
3. Deploy via Task tool
4. Agent executes with authorization

---
*Essential main scope blocking with hook guidance*
