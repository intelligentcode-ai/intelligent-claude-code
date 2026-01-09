# Init System

Initialize the intelligent-claude-code virtual team system with configuration loading and role activation.

## Imports

@../behaviors/shared-patterns/context-validation.md

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

### 🧩 INIT BOOTSTRAP (INLINE)

**MANDATORY:** Bootstrap validation and context recovery patterns for system initialization.

#### Context Recovery & Bootstrap Validation

**Phase 1: Project Root Detection**
1. **Project Root Detection**: Explicitly determine and validate absolute project root path
2. **Configuration Path Resolution**: Detect and validate config locations (project/user/system)
3. **File System Validation**: Verify critical directories and files exist and are accessible
4. **Context State Assessment**: Determine if system is in fresh start or recovery-from-context-loss state

**Initialization Output**

**🔧 CONTEXT RECOVERY & BOOTSTRAP VALIDATION**
- ✓ Working directory: /project/path/
- ✓ CLAUDE.md found and validated
- ✓ Project structure confirmed
- ✓ Configuration path resolved
- ✓ Critical directories accessible: src/, memory/, agenttasks/

**Recovery State Assessment:**
- ℹ️ Context State: [FRESH_START | CONTEXT_RECOVERY]
- ℹ️ Previous session data: [FOUND | NOT_FOUND]
- ℹ️ Configuration cache status: [VALID | EXPIRED | MISSING]

**Context Recovery Errors:**
- **PROJECT_ROOT_NOT_FOUND**: "❌ Critical: Cannot determine project root directory. Expected CLAUDE.md or .git in current directory."
- **CONFIG_PATH_FAILED**: "❌ Critical: Config locations not detected. Expected: ./icc.config.json, ./.claude/icc.config.json, ~/.claude/icc.config.json"
- **CONTEXT_RECOVERY_FAILED**: "❌ Critical: Unable to recover system context. Please verify project structure and permissions."
- **FILE_SYSTEM_ACCESS_DENIED**: "❌ Critical: Cannot access critical directories. Check permissions for: {failed_paths}"

### ✅ INIT VALIDATION (INLINE)

**MANDATORY:** Comprehensive system validation checklist for initialization completion.

#### Comprehensive System Validation Checklist

**Core System Components**
- ✅ Project root detection and validation
- ✅ Configuration hierarchy loaded and applied
- ✅ CLAUDE.md parsing and context integration
- ✅ Memory system operational with file access
- ✅ Role definitions loaded (14 core + dynamic specialists)

**AgentTask & Planning Systems**
- ✅ AgentTask system active with template validation
- ✅ Template hierarchy operational
- ✅ Placeholder resolution capability confirmed
- ✅ AgentTask creation and execution patterns loaded
- ✅ Sequential thinking integration active

**Behavioral Systems**
- ✅ Behavioral patterns loaded and validated
- ✅ Shared pattern dependencies resolved  
- ✅ Context recovery mechanisms validated
- ✅ Learning system active with pattern capture

**Integration & Tool Systems**
- ✅ Tool integrations configured (GitHub CLI, etc.)
- ✅ Progress reporting operational
- ✅ Autonomy level applied and persisted
- ✅ PM role activation (if configured)
- ✅ Context loss recovery capability confirmed

**🎯 SYSTEM STATUS: FULLY OPERATIONAL - Context recovery successful**

#### Validation Errors

**System Component Errors:**
- **CONFIG_LOAD_FAILED**: "❌ Error: Failed to load configuration hierarchy. Check project CLAUDE.md and icc.config.json"
- **BEHAVIORAL_PATTERN_LOAD_FAILED**: "❌ Critical: Behavioral patterns failed to load. Check installation/behaviors/ directory"
- **TEMPLATE_VALIDATION_FAILED**: "❌ Error: AgentTask templates failed validation. Check template syntax and structure"
- **MEMORY_BOOTSTRAP_FAILED**: "⚠️ Warning: Memory system bootstrap failed. Creating minimal fallback structure"
- **ROLE_DEFINITION_FAILED**: "❌ Error: Role definitions failed to load. Check installation/roles/specialists.md"

**Recovery & Validation Errors:**
- **AGENTTASK_SYSTEM_VALIDATION_FAILED**: "❌ Critical: AgentTask system failed comprehensive validation. System not operational"
- **AUTONOMY_PERSISTENCE_FAILED**: "⚠️ Warning: Cannot persist autonomy changes to CLAUDE.md. Using session-only settings"
- **COMPREHENSIVE_VALIDATION_FAILED**: "❌ Critical: System failed comprehensive health check. Manual intervention required"
- **CONTEXT_STATE_INCONSISTENT**: "⚠️ Warning: Context state inconsistent. Some components may require reinitialization"

### 🧠 RELOADING SYSTEM BEHAVIORS
Loading all behavioral patterns from installation/behaviors/:
  ✓ config-system.md - Configuration hierarchy management
  ✓ directory-structure.md - Project layout guidance
  ✓ file-location-standards.md - Output routing rules
  ✓ naming-numbering-system.md - Work item naming and numbering standards
  ✓ agenttask-creation-system.md - AgentTask creation rules
  ✓ agenttask-execution.md - AgentTask lifecycle guidance
  ✓ story-breakdown.md - PM story breakdown process
  ✓ role-system.md - Role loading + dynamic specialists
  ✓ learning-team-automation.md - Learning and pattern capture
  ✓ memory-system.md - Memory usage patterns
  ✓ validation-system.md - Validation expectations
  ✓ sequential-thinking.md - Structured analysis patterns
  ✓ ultrathinking.md - Deep reasoning trigger
  ✓ shared-patterns/ - Common shared patterns
Behavioral pattern validation: ✅ All patterns successfully loaded and validated

### 📋 RELOADING AGENTTASK TEMPLATES
Loading all templates from template hierarchy:
**Primary Templates:**
  ✓ nano-agenttask-template.yaml - Trivial changes (0-2 points)
  ✓ tiny-agenttask-template.yaml - Simple single-file (3-5 points)
  ✓ medium-agenttask-template.yaml - Multi-file features (6-15 points)
  ✓ large-agenttask-template.yaml - Complex coordination (16-30 points)
  ✓ mega-agenttask-template.yaml - System-wide changes (30+ points)
AgentTask template system: ✅ All templates validated with placeholder resolution capability

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
2. **Configuration Path Resolution**: Detect and validate config locations (project/user/system)
3. **File System Validation**: Verify critical directories and files exist and are accessible
4. **Context State Assessment**: Determine if system is in fresh start or recovery-from-context-loss state

### Phase 2: System Component Loading
5. **Load Configuration**: Apply configuration hierarchy (embedded → project → user → system defaults)
6. **Read Autonomy Level**: Load autonomy_level from CLAUDE.md, create if missing
7. **Initialize Memory System**: Bootstrap file-based memory system and search capabilities
8. **Load Role Definitions**: Initialize 14 core roles and dynamic specialist capabilities
9. **Activate AgentTask System**: Enable AgentTask-driven execution system with template validation
10. **Initialize Workflow Settings**: Create default workflow configuration if missing from CLAUDE.md

### Phase 3: System Integration & Validation
11. **Initialize Progress Reporting**: Activate clean completion tracking
12. **Setup Learning System**: Enable AgentTask learning and pattern capture
13. **Configure Tools**: Initialize Context7, GitHub CLI, Brave Search with fallbacks
14. **Apply Autonomy Level**: Set L1/L2/L3 mode based on loaded/provided configuration
15. **Persist Autonomy Changes**: Write autonomy_level changes back to CLAUDE.md for session preservation
16. **Auto-Activate PM**: If pm_always_active=true, activate @PM role
17. **Comprehensive System Validation**: Run complete system health check with detailed failure reporting
18. **Context Recovery Confirmation**: Validate all behavioral patterns and system state fully restored
