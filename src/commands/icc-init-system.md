# Init System

Initialize the intelligent-claude-code virtual team system with configuration loading and role activation.

## Behavior
System bootstrap operation that loads configuration, initializes memory, activates roles,
and prepares the virtual team for work. Can be run by any role or automatically on startup.

## Usage
`/icc-init-system [autonomy_level] [pm_active]`

**Arguments:**
- `autonomy_level` - Optional: L1, L2, L3 (default: from config)
- `pm_active` - Optional: true/false for PM always active (default: from config)

**Examples:**
```
/icc-init-system
/icc-init-system L3
/icc-init-system L2 true
```

## Initialization Output

When running `/icc-init-system`, the system displays progress through these phases:

### 🧠 RELOADING SYSTEM BEHAVIORS
Loading all behavioral patterns from ~/.claude/behaviors/:
  ✓ config-loader.md - Configuration hierarchy management
  ✓ directory-structure.md - Project structure enforcement
  ✓ learning-team-automation.md - Error forgiveness and learning
  ✓ naming-enforcement-behavior.md - Work item naming standards
  ✓ numbering-service-behavior.md - Sequential numbering service
  ✓ prb-auto-trigger.md - Automatic PRB generation
  ✓ prb-creation-mandates.md - PRB creation rules and validation
  ✓ prb-enforcement.md - Mandatory PRB execution patterns
  ✓ prb-execution.md - PRB lifecycle management
  ✓ story-breakdown.md - PM story breakdown process
  ✓ shared-patterns/ - Common behavioral patterns
All behaviors successfully reloaded ✅

### 📋 RELOADING PRB TEMPLATES
Loading all templates from ~/.claude/prb-templates/:
  ✓ nano-prb-template.yaml - Trivial changes (0-2 points)
  ✓ tiny-prb-template.yaml - Simple single-file (3-5 points)
  ✓ medium-prb-template.yaml - Multi-file features (6-15 points)
  ✓ large-prb-template.yaml - Complex coordination (16-30 points)
  ✓ mega-prb-template.yaml - System-wide changes (30+ points)
Template hierarchy: Project → .claude → ~/.claude
All templates successfully loaded ✅

### 🎯 PROJECT SCOPE REMINDER

**Scope Detection Logic:**
1. **Check CLAUDE.md** for "Project Overview" or "System Nature" section
2. **If Found:** Display project-specific context from CLAUDE.md
3. **If Not Found:** PROMPT user with: "What type of project is this?"
4. **Save Response:** Add project context to CLAUDE.md for future sessions
5. **Display:** Project-specific context prominently

**For intelligent-claude-code project:**
**SYSTEM NATURE:** MARKDOWN-BASED AI-AGENTIC SYSTEM
**PROJECT TYPE:** Intelligent Claude Code Virtual Team Framework
**WORK LOCATION:** Only within this project directory
**KEY CONTEXT:** This is an AI instruction framework, not application code

*Project scope loaded from CLAUDE.md - AI behavioral system confirmed*

**Generic Project Scope Template:**
```
## Project Overview
**PROJECT TYPE:** [User Response]
**SYSTEM NATURE:** [CODE-BASED SYSTEM | MARKDOWN-BASED AI-AGENTIC SYSTEM | HYBRID SYSTEM]
**WORK SCOPE:** [Project-specific context]
**KEY CONTEXT:** [Important project details]
```

## Core Actions
1. **Load Configuration**: Apply configuration hierarchy (embedded → project → user → system defaults)
2. **Initialize Memory System**: Bootstrap file-based memory system and search capabilities
3. **Load Role Definitions**: Initialize 14 core roles and dynamic specialist capabilities
4. **Activate PRB System**: Enable PRB-driven execution system
5. **Initialize Progress Reporting**: Activate clean completion tracking
6. **Setup Learning System**: Enable error forgiveness and pattern capture
7. **Configure Tools**: Initialize Context7, GitHub CLI, Brave Search with fallbacks
8. **Validate System**: Verify all components operational and ready
9. **Apply Autonomy Level**: Set L1/L2/L3 mode based on configuration
10. **Auto-Activate PM**: If pm_always_active=true, activate @PM role
11. **Validate Enforcement**: Check self-correcting patterns are active

## Autonomy Levels
- **L1 (Manual)**: User approval required for ALL actions
- **L2 (Architect)**: Architect approval for technical decisions, auto-proceed for routine
- **L3 (Autonomous)**: Full autonomous execution, only stops for critical issues

## System Validation Checklist
- ✅ Configuration loaded and applied
- ✅ Memory system operational  
- ✅ Role definitions loaded
- ✅ PRB system active
- ✅ Progress reporting operational
- ✅ Learning system active
- ✅ Tool integrations configured
- ✅ Assignment file processing ready
- ✅ Enforcement validation active

## Error Handling
- **CONFIG_LOAD_FAILED**: "❌ Error: Failed to load configuration. Check ~/.claude/config.md"
- **MEMORY_INIT_FAILED**: "⚠️ Warning: Memory system unavailable. Using file-based fallback"
- **ROLE_LOAD_FAILED**: "❌ Error: Failed to load role definitions. Check specialists.md"
- **PRB_INIT_FAILED**: "❌ Error: PRB system failed to initialize"
- **TOOL_INIT_FAILED**: "⚠️ Warning: Some tools unavailable. Using fallbacks"
- **INVALID_AUTONOMY**: "❌ Error: Autonomy level must be L1, L2, or L3"
- **SYSTEM_BUSY**: "⏳ System busy. Current operation must complete first"
- **ENFORCEMENT_FAILED**: "⚠️ Warning: Self-correcting enforcement inactive"

## Memory System Details
When initializing memory system:
- Creates memory/[topic]/[subtopic].md structure for organized knowledge storage
- Creates memory/errors/ for error patterns and solutions
- Creates memory/patterns/ for reusable implementation patterns
- Creates memory/domain/ for domain knowledge and best practices
- Creates memory/index.md for quick memory lookup
- All memories are version-controlled (not in .gitignore)
- Memories are embedded directly into PRBs during generation
