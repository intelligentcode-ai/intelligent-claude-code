# Init System

Initialize the intelligent-claude-code virtual team system with configuration loading and role activation.

## Imports

@../behaviors/shared-patterns/installation-path-detection.md
@../behaviors/shared-patterns/context-validation.md
@./init-system-bootstrap.md
@./init-system-validation.md
@./workflow-settings-initialization.md

## Behavior
System bootstrap operation that loads configuration, initializes memory, activates roles,
and prepares the virtual team for work. Can be run by any role or automatically on startup.

**Context Recovery**: This command is designed to work reliably after context loss/memory compaction by explicitly rebuilding system state from project files.

## Usage
`/icc-init-system [autonomy_level] [pm_active]`

**Arguments:**
- `autonomy_level` - Optional: L1, L2, L3 (default: from CLAUDE.md, fallback to L2)
- `pm_active` - Optional: true/false for PM always active (default: from config)

**Examples:**
- Initialize system with default settings: /icc-init-system
- Set autonomy level to L3: /icc-init-system L3  
- Set autonomy level L2 with PM active: /icc-init-system L2 true

## Initialization Process

### 🧠 RELOADING SYSTEM BEHAVIORS
Loading all behavioral patterns from installation/behaviors/:
  ✓ config-loader.md - Configuration hierarchy management
  ✓ directory-structure.md - Project structure enforcement
  ✓ learning-team-automation.md - PRB learning and pattern capture
  ✓ naming-numbering-system.md - Work item naming and numbering standards  
  ✓ agenttask-auto-trigger.md - Automatic AgentTask generation
  ✓ agenttask-creation-system.md - AgentTask creation rules and validation
  ✓ agenttask-enforcement.md - Mandatory AgentTask execution patterns
  ✓ agenttask-execution.md - AgentTask lifecycle management
  ✓ story-breakdown.md - PM story breakdown process
  ✓ sequential-thinking.md - Structured analysis patterns
  ✓ shared-patterns/ - Common behavioral patterns (25 loaded)
Behavioral pattern validation: ✅ All patterns successfully loaded and validated

### 📋 RELOADING PRB TEMPLATES
Loading all templates from template hierarchy:
**Primary Templates:**
  ✓ nano-prb-template.yaml - Trivial changes (0-2 points)
  ✓ tiny-prb-template.yaml - Simple single-file (3-5 points)
  ✓ medium-prb-template.yaml - Multi-file features (6-15 points)
  ✓ large-prb-template.yaml - Complex coordination (16-30 points)
  ✓ mega-prb-template.yaml - System-wide changes (30+ points)
PRB template system: ✅ All templates validated with placeholder resolution capability

### 🎯 PROJECT SCOPE CONFIRMATION
**Current Project Context:**
**SYSTEM NATURE:** MARKDOWN-BASED AI-AGENTIC SYSTEM
**PROJECT TYPE:** Intelligent Claude Code Virtual Team Framework  
**WORK LOCATION:** Project directory
**KEY CONTEXT:** AI behavioral framework enhancement system
**PROJECT BOUNDARIES:** All operations constrained to project directory

## Core Actions

### Phase 1: Context Recovery & Bootstrap Validation
1. **Project Root Detection**: Explicitly determine and validate absolute project root path
2. **Installation Path Resolution**: Detect and validate intelligent-claude-code installation
3. **File System Validation**: Verify critical directories and files exist and are accessible
4. **Context State Assessment**: Determine if system is in fresh start or recovery-from-context-loss state

### Phase 2: System Component Loading
5. **Load Configuration**: Apply configuration hierarchy (embedded → project → user → system defaults)
6. **Read Autonomy Level**: Load autonomy_level from CLAUDE.md, create if missing
7. **Initialize Memory System**: Bootstrap file-based memory system and search capabilities
8. **Load Role Definitions**: Initialize 14 core roles and dynamic specialist capabilities
9. **Activate PRB System**: Enable PRB-driven execution system with template validation
10. **Initialize Workflow Settings**: Create default workflow configuration if missing from CLAUDE.md

### Phase 3: System Integration & Validation
11. **Initialize Progress Reporting**: Activate clean completion tracking
12. **Setup Learning System**: Enable PRB learning and pattern capture
13. **Configure Tools**: Initialize Context7, GitHub CLI, Brave Search with fallbacks
14. **Apply Autonomy Level**: Set L1/L2/L3 mode based on loaded/provided configuration
15. **Persist Autonomy Changes**: Write autonomy_level changes back to CLAUDE.md for session preservation
16. **Auto-Activate PM**: If pm_always_active=true, activate @PM role
17. **Comprehensive System Validation**: Run complete system health check with detailed failure reporting
18. **Context Recovery Confirmation**: Validate all behavioral patterns and system state fully restored

## Legacy Error Support
- **INVALID_AUTONOMY**: "❌ Error: Autonomy level must be L1, L2, or L3"
- **SYSTEM_BUSY**: "⏳ System busy. Current operation must complete first"
- **TOOL_INIT_FAILED**: "⚠️ Warning: Some tools unavailable. Using fallbacks"
