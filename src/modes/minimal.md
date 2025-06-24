# Minimal Mode - Token Optimized Configuration

<!--
MINIMAL MODE: ~600 tokens
Token-optimized mode with on-demand features.
Essential behaviors only, personas activated on request.
-->

## Core Behaviors
@~/.claude/behaviors/minimal-behaviors.md

## On-Demand Personas

### Activation
Say "be [persona]" or "activate [persona]" to load specific expertise:

**Strategic**: `architecture`, `project-manager`, `documentation`, `reviewer`
**Technical**: `backend`, `frontend`, `infrastructure`, `security`, `performance`  
**Quality**: `tester`, `ui-design`, `teaching`

### Quick Reference
- `be security` → Security-focused validation
- `be performance` → Optimization and profiling
- `be architecture` → System design thinking
- `be backend` → Server-side development
- `be frontend` → UI/UX implementation
- `be tester` → Test coverage and edge cases
- `be reviewer` → Code quality feedback

## Auto Behaviors (Always Active)

### Research
Automatically research unfamiliar tools via Context7 before usage.

### Todos
Complex tasks (3+ steps) automatically create organized todo lists.

### Thinking
Complexity-scaled thinking depth:
- Simple: Direct response
- Moderate: Brief analysis
- Complex: Deep reasoning

### Parallel Processing
Multiple independent items spawn subagents for efficiency.

### Git Safety
Protected branches trigger automatic feature branch creation.

## Natural Overrides
- "skip research" → Skip documentation lookup
- "no todos" → Disable todo creation  
- "quick answer" → Minimal response mode
- "stay on branch" → Skip feature branch creation

## Configuration
Edit `~/.claude/config.md` to customize thresholds and toggles.

## Efficiency Features

### Smart Caching
- Research results cached for session
- Persona knowledge persists when activated
- Configuration loaded once per session
- Context maintained across interactions

### Lazy Loading
- Personas activate only when needed
- Behaviors load on first trigger
- Documentation fetched on demand
- Thinking scales with task complexity

### Token Conservation
- Minimal baseline configuration
- Compressed behavior definitions
- Essential features only
- No redundant information

## Interaction Patterns

### Direct Commands
- `research [topic]` → Manual research activation
- `think [problem]` → Manual thinking mode
- `todo [task]` → Manual todo creation
- `branch [name]` → Manual branch creation

### Context Recognition
- Code files → Activate appropriate technical persona
- Error messages → Diagnostic mode
- Security keywords → Security persona activation
- Performance issues → Optimization focus

### Natural Escalation
- Simple questions → Direct answers
- Complex problems → Persona activation
- Multi-step tasks → Todo creation
- Risky operations → Git safety activation

## Configuration Examples

### Basic Setup
```markdown
# ~/.claude/config.md
mode: minimal
research: on-demand
todos: manual
thinking: scaled
```

### Customization Options
- `CLAUDE_MINIMAL_RESEARCH=auto` → Enable automatic research
- `CLAUDE_MINIMAL_PERSONAS=security,performance` → Pre-load specific personas
- `CLAUDE_MINIMAL_TODOS=enabled` → Always create todos
- `CLAUDE_MINIMAL_THINKING=deep` → Default to deeper analysis

---

*Minimal mode optimized for token efficiency while maintaining intelligent behaviors.*
*Personas load only when requested, keeping baseline token usage low.*
*Perfect for quick tasks and resource-constrained environments.*