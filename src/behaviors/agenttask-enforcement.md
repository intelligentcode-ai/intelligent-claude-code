# AgentTask Enforcement

Use AgentTask system for all work. Hooks provide behavioral guidance.

## Core Rules

**Work Flow:**
- Work request → AgentTask generation → Agent execution
- Main scope: AgentTask creation only
- Subagent: Work execution only

**Template Requirements:**
- Use template hierarchy
- Resolve all placeholders
- Embed configuration values

**Essential Blocking:**
- @PM role: Coordination only, no technical work
- Main scope: No direct file operations
- Tool access: Requires AgentTask context

**Process:**
1. User Request → AgentTask Generation
2. AgentTask → Task Tool → Agent Execution

---
*Simplified AgentTask enforcement with hook-based guidance*
