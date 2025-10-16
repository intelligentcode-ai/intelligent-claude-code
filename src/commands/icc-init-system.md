# Init System

Initialize the intelligent-claude-code virtual team system with configuration loading and role activation.

## Imports

@../behaviors/shared-patterns/installation-path-detection.md
@../behaviors/shared-patterns/context-validation.md

## Behavior
System bootstrap operation that loads configuration, initializes memory, activates roles,
and prepares the virtual team for work. Can be run by any role or automatically on startup.

**Context Recovery**: This command is designed to work reliably after context loss/memory compaction by explicitly rebuilding system state from project files.
**Version Display**: Always shows current system version from VERSION file, replacing [CURRENT_VERSION] placeholder.

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

### 🎯 INTELLIGENT CLAUDE CODE v[CURRENT_VERSION]
**System Version:** [CURRENT_VERSION]
**Virtual Team:** 14 core roles + unlimited specialists
**Architecture:** AgentTask-driven professional execution

### 🧠 RELOADING SYSTEM BEHAVIORS
Loading all behavioral patterns from src/behaviors/:
  ✓ config-loader.md - Configuration hierarchy management
  ✓ directory-structure.md - Project structure enforcement
  ✓ learning-team-automation.md - AgentTask learning and pattern capture
  ✓ naming-numbering-system.md - Work item naming and numbering standards  
  ✓ agenttask-auto-trigger.md - Automatic AgentTask generation
  ✓ agenttask-creation-system.md - AgentTask creation rules and validation
  ✓ agenttask-enforcement.md - Mandatory AgentTask execution patterns
  ✓ agenttask-execution.md - AgentTask lifecycle management
  ✓ story-breakdown.md - PM story breakdown process
  ✓ sequential-thinking.md - Structured analysis patterns
  ✓ shared-patterns/ - Common behavioral patterns (25 loaded)
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

## Context Recovery & Bootstrap Validation

### Phase 1: Project Root Detection & Validation
1. **Project Root Detection**: Explicitly determine and validate absolute project root path
2. **Development Context Check**: If project has src/agenttask-templates/ and src/behaviors/ and VERSION file, prioritize project root for templates
3. **Installation Path Resolution**: Detect and validate intelligent-claude-code installation using installation-path-detection patterns
4. **File System Validation**: Verify critical directories and files exist and are accessible
5. **Context State Assessment**: Determine if system is in fresh start or recovery-from-context-loss state

### Bootstrap Initialization Output

**🔧 CONTEXT RECOVERY & BOOTSTRAP VALIDATION**
- ✓ Working directory: /project/path/
- ✓ CLAUDE.md found and validated
- ✓ Project structure confirmed
- ✓ Development context detected: Using project templates from src/agenttask-templates/
- ✓ Installation path resolved
- ✓ Critical directories accessible: src/, memory/, agenttasks/

**Recovery State Assessment:**
- ℹ️ Context State: [FRESH_START | CONTEXT_RECOVERY]
- ℹ️ Previous session data: [FOUND | NOT_FOUND]
- ℹ️ Configuration cache status: [VALID | EXPIRED | MISSING]

## Core Actions

### Phase 1: Context Recovery & Bootstrap Validation
1. **Project Root Detection**: Explicitly determine and validate absolute project root path (see Bootstrap section above)
2. **Installation Path Resolution**: Detect and validate intelligent-claude-code installation
3. **File System Validation**: Verify critical directories and files exist and are accessible
4. **Context State Assessment**: Determine if system is in fresh start or recovery-from-context-loss state

### Phase 2: System Component Loading
5. **Load Configuration**: Apply configuration hierarchy (embedded → project → user → system defaults)
6. **Read Autonomy Level**: Load autonomy_level from CLAUDE.md, create if missing
7. **Initialize Memory System**: Bootstrap file-based memory system and search capabilities
   - Creates memory/[topic]/[subtopic].md structure for organized knowledge storage
   - Creates memory/errors/ for error patterns and solutions
   - Creates memory/patterns/ for reusable implementation patterns
   - Creates memory/domain/ for domain knowledge and best practices
   - Creates memory/index.md for quick memory lookup
   - All memories are version-controlled (not in .gitignore)
   - Memories are embedded directly into AgentTasks during generation
8. **Load Role Definitions**: Initialize 14 core roles and dynamic specialist capabilities
9. **Activate AgentTask System**: Enable AgentTask-driven execution system with template validation
10. **Initialize Workflow Settings**: Create default workflow configuration if missing from CLAUDE.md
   - **nano**: No version bump, no changelog, direct commit
   - **tiny**: Patch version bump, changelog required, direct commit
   - **medium**: Minor version bump, changelog + PR required, feature branch
   - **large**: Minor version bump, changelog + PR + coordination required, feature branch
   - **mega**: Major version bump, changelog + PR + coordination + breaking change assessment, feature branch
   - Settings are automatically applied during AgentTask template resolution
   - Can be customized per-project by editing CLAUDE.md workflow_settings section

### Phase 3: System Integration & Validation
11. **Initialize Progress Reporting**: Activate clean completion tracking
12. **Setup Learning System**: Enable AgentTask learning and pattern capture
13. **Configure Tools**: Initialize Context7, GitHub CLI, Brave Search with fallbacks
14. **Apply Autonomy Level**: Set L1/L2/L3 mode based on loaded/provided configuration
   - **L1 (Manual)**: User approval required for ALL actions
   - **L2 (Architect)**: Architect approval for technical decisions, auto-proceed for routine
   - **L3 (Autonomous)**: Full autonomous execution, only stops for critical issues
15. **Persist Autonomy Changes**: Write autonomy_level changes back to CLAUDE.md for session preservation
   - **Read Current**: Load existing autonomy_level from CLAUDE.md
   - **Compare**: Check if provided level differs from current
   - **Update**: If different, update CLAUDE.md with new autonomy_level
   - **Preserve**: Maintain existing l3_settings if changing to/from L3
   - **Validate**: Ensure CLAUDE.md remains well-formed after changes
   - **Cache Invalidation**: Clear configuration cache to reflect changes
16. **Auto-Activate PM**: If pm_always_active=true, activate @PM role
17. **Comprehensive System Validation**: Run complete system health check with detailed failure reporting
18. **Context Recovery Confirmation**: Validate all behavioral patterns and system state fully restored

## Comprehensive System Validation Checklist

### Core System Components
- ✅ Project root detection and validation
- ✅ Installation path resolution and verification
- ✅ Configuration hierarchy loaded and applied
- ✅ CLAUDE.md parsing and context integration
- ✅ Memory system operational with file access
- ✅ Role definitions loaded (14 core + dynamic specialists)

### AgentTask & Workflow Systems
- ✅ AgentTask system active with template validation
- ✅ Workflow settings initialized from CLAUDE.md
- ✅ Template hierarchy operational
- ✅ Placeholder resolution capability confirmed
- ✅ AgentTask creation and execution patterns loaded
- ✅ Sequential thinking integration active

### Behavioral & Enforcement Systems
- ✅ Behavioral patterns loaded and validated
- ✅ Shared pattern dependencies resolved
- ✅ Enforcement rules active and operational
- ✅ Auto-trigger mechanisms functional
- ✅ Context recovery mechanisms validated
- ✅ Learning system active with pattern capture

### Integration & Tool Systems
- ✅ Tool integrations configured (GitHub CLI, etc.)
- ✅ Assignment file processing ready
- ✅ Progress reporting operational
- ✅ Autonomy level applied and persisted
- ✅ PM role activation (if configured)
- ✅ Context loss recovery capability confirmed

**🎯 SYSTEM STATUS: FULLY OPERATIONAL - Context recovery successful**

## Error Handling

### Context Recovery Errors
- **PROJECT_ROOT_NOT_FOUND**: "❌ Critical: Cannot determine project root directory. Expected CLAUDE.md or .git in current directory."
- **INSTALLATION_PATH_FAILED**: "❌ Critical: Intelligent-claude-code installation not detected. Expected locations: ~/.claude/, $CLAUDE_INSTALL_PATH, project/.claude/"
- **CONTEXT_RECOVERY_FAILED**: "❌ Critical: Unable to recover system context. Please verify project structure and permissions."
- **FILE_SYSTEM_ACCESS_DENIED**: "❌ Critical: Cannot access critical directories. Check permissions for: {failed_paths}"

### System Component Errors
- **CONFIG_LOAD_FAILED**: "❌ Error: Failed to load configuration hierarchy. Check src/config.md and project CLAUDE.md"
- **BEHAVIORAL_PATTERN_LOAD_FAILED**: "❌ Critical: Behavioral patterns failed to load. Check src/behaviors/ directory"
- **TEMPLATE_VALIDATION_FAILED**: "❌ Error: AgentTask templates failed validation. Check template syntax and structure"
- **MEMORY_BOOTSTRAP_FAILED**: "⚠️ Warning: Memory system bootstrap failed. Creating minimal fallback structure"
- **ROLE_DEFINITION_FAILED**: "❌ Error: Role definitions failed to load. Check src/roles/specialists.md"

### Recovery & Validation Errors
- **AGENTTASK_SYSTEM_VALIDATION_FAILED**: "❌ Critical: AgentTask system failed comprehensive validation. System not operational"
- **WORKFLOW_SETTINGS_CORRUPTED**: "⚠️ Warning: Workflow settings corrupted in CLAUDE.md. Recreating with defaults"
- **AUTONOMY_PERSISTENCE_FAILED**: "⚠️ Warning: Cannot persist autonomy changes to CLAUDE.md. Using session-only settings"
- **COMPREHENSIVE_VALIDATION_FAILED**: "❌ Critical: System failed comprehensive health check. Manual intervention required"
- **CONTEXT_STATE_INCONSISTENT**: "⚠️ Warning: Context state inconsistent. Some components may require reinitialization"

### Legacy Error Support
- **INVALID_AUTONOMY**: "❌ Error: Autonomy level must be L1, L2, or L3"
- **SYSTEM_BUSY**: "⏳ System busy. Current operation must complete first"
- **TOOL_INIT_FAILED**: "⚠️ Warning: Some tools unavailable. Using fallbacks"
