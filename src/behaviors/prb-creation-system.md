# PRB Creation System

**MANDATORY:** All PRB and work item creation via main agent with template compliance and placeholder resolution.

## Automatic PRB Generation

### Seamless Work-to-PRB Conversion
**CRITICAL:** When work intent is detected, system AUTOMATICALLY generates PRB:
- **Immediate Detection**: Work requests trigger instant PRB creation
- **Template Selection**: Complexity analysis auto-selects appropriate template
- **Context Gathering**: Complete project context loaded automatically
- **Placeholder Resolution**: All configuration values embedded during generation
- **Self-Contained PRBs**: Generated PRBs require no runtime lookups

### Automatic Generation Triggers
**INSTANT PRB CREATION for:**
- Work requests with implementation intent (implement, create, build, fix)
- @Role work assignments (@Developer implement X, @DevOps-Engineer deploy Y)
- Story breakdown requests (break down STORY-001)
- Bug fix requests (fix authentication issue)
- System modification requests (configure CI/CD, setup database)

**NO PRB CREATION for:**
- Information queries (show, display, explain, what is)
- Status requests (what's the status of, how are we doing)
- Planning discussions without implementation commitment
- @Role consultations (what should we do, how would you approach)

## Core Creation Rules

### Main Agent Only
**CRITICAL:** ALL work item creation MUST happen in main agent context:
- Stories, Bugs, EPICs, PRBs creation
- Template resolution with full context
- Configuration hierarchy access
- Complete project context gathering

**BLOCKED:** AGENTS CANNOT create work items due to isolated context limitations.

### Template Requirements
**MANDATORY:** Every PRB MUST use appropriate template from `src/prb-templates/`:
- `nano-prb-template.yaml` (0-2 points): Simple changes
- `tiny-prb-template.yaml` (3-5 points): Single-file work
- `medium-prb-template.yaml` (6-15 points): Multi-file features
- `large-prb-template.yaml` (16-30 points): Complex coordination
- `mega-prb-template.yaml` (30+ points): System-wide changes

### Placeholder Resolution
**COMPLETE RESOLUTION REQUIRED:**
- ALL placeholders resolved at generation time
- NO runtime config lookups
- Configuration values embedded in PRB
- Self-contained execution context

## Creation Process

### Automatic Template-First Generation
**SEAMLESS 12-STEP AUTOMATIC PROCESS:**
1. **Auto-Detect Work**: Parse user input for implementation intent patterns
2. **Gather Context**: Load complete project context (CLAUDE.md, system nature, critical files)
3. **Search Memory**: Auto-search memory/[topic]/ for relevant patterns and learnings
4. **Calculate Complexity**: Files + Lines + APIs + Security + Coordination scoring
5. **Auto-Breakdown Check**: If >15 points, automatically decompose into smaller PRBs
6. **Select Template**: Use complexity score to auto-select from src/prb-templates/
7. **Load Template**: From src/prb-templates/ hierarchy with complete structure
8. **Load Configuration**: Complete config hierarchy resolution at generation time
9. **Resolve Placeholders**: Replace ALL placeholders with actual config values
10. **Embed Context**: All config values and project context embedded in PRB
11. **Validate Completeness**: ZERO unresolved placeholders, complete context
12. **Generate & Create**: Compliant naming format and file creation with resolved content

### Automatic Context Integration
**PRBs AUTOMATICALLY INCLUDE:**
- **Project Context**: System nature, project root, key constraints from CLAUDE.md
- **Configuration Values**: All relevant settings from config hierarchy (embedded, not referenced)
- **Critical Files**: Relevant files with actual content samples and purposes
- **Memory Patterns**: Applicable learnings and successful patterns from memory/
- **User Requirements**: Clear requirements with success criteria and scope limits
- **Role Assignment**: Appropriate specialist roles based on work type and system nature

### Size Enforcement
**AUTO-BREAKDOWN:** If complexity >15 points, automatically break into smaller PRBs ≤15 points each

### Validation
**MANDATORY CHECKS:**
- Template source compliance
- Zero placeholder patterns
- Complete context embedding
- Naming format compliance
- Parent reference validation (for PRBs)

## Creation vs Execution Separation

### Creation (Main Agent)
- Full configuration access
- Template hierarchy access
- Memory search capabilities
- Complete project context
- Placeholder resolution

### Execution (Subagent)
- PRB implementation work
- Role-based task delegation
- Code changes and file operations
- Testing and validation
- Git operations within PRB scope

## Automatic Error Handling & Recovery

### Intelligent Violation Detection & Auto-Correction
**AUTOMATIC RECOVERY PATTERNS:**
- **Work Detection Failure** → Re-analyze with enhanced pattern matching
- **Context Incomplete** → Auto-gather missing project context and configuration
- **Wrong Template** → Recalculate complexity, auto-select correct template  
- **Size Violations** → Automatic logical breakdown into multiple ≤15 point PRBs
- **Format Violations** → Auto-apply naming standards and compliance rules
- **Missing Dependencies** → Auto-identify and include prerequisite work items

### Blocking Patterns (IMMEDIATE STOP)
**HARD BLOCKS:**
- Subagent PRB creation attempts → "❌ CREATION BLOCKED: Work items must be created by main agent"
- Manual PRB creation without templates → "❌ TEMPLATE REQUIRED: PRB creation without template FORBIDDEN"
- Unresolved placeholders in PRB → "❌ PLACEHOLDER UNRESOLVED: All placeholders must be resolved at generation"
- Runtime config dependencies → "❌ RUNTIME LOOKUP FORBIDDEN: All config must be embedded in PRB"
- Template source violations → "❌ INVALID TEMPLATE SOURCE: Must use src/prb-templates/ hierarchy only"

### Automatic Quality Assurance
**PRE-CREATION VALIDATION:**
- Template completeness verification (all mandatory sections present)
- Placeholder resolution verification (zero unresolved patterns)
- Context embedding verification (all required context included)
- Naming compliance verification (proper format and sequencing)
- Role assignment verification (appropriate specialists for system nature)
- Size validation (auto-breakdown if complexity exceeds limits)

### Seamless User Experience
**TRANSPARENT AUTOMATION:**
- Users make work requests → System automatically creates appropriate PRBs
- No manual PRB creation steps required → Fully automated generation process
- Complete context gathering → No user prompting for missing information
- Intelligent template selection → No complexity calculation required from user
- Automatic role assignment → Appropriate specialists selected based on work type

---
*Comprehensive PRB and work item creation system*