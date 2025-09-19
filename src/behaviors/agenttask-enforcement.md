# AgentTask Enforcement

Use AgentTask system for all work. Hooks provide behavioral guidance.

## Core Rules

**Work Flow:**
- Work request → AgentTask generation → Agent execution
- Main scope: AgentTask creation + nano/tiny in-memory execution
- Subagent: Work execution only

**Template Requirements:**
- Use template hierarchy
- Resolve all placeholders
- Embed configuration values

**Main Scope Enhancement:**
- Nano AgentTasks (0-2 pts): In-memory generation + direct execution allowed
- Tiny AgentTasks (3-5 pts): In-memory generation + direct execution allowed
- Medium+ AgentTasks (6+ pts): File creation + Task tool delegation required

**Essential Blocking:**
- @PM role: Coordination only, no technical work
- Main scope: File operations restricted to nano/tiny AgentTasks
- Tool access: Requires AgentTask context

**Process:**
1. User Request → AgentTask Generation
2. Nano/Tiny: In-memory AgentTask → Direct execution
3. Medium+: AgentTask file → Task Tool → Agent Execution

---
*Simplified AgentTask enforcement with hook-based guidance*
