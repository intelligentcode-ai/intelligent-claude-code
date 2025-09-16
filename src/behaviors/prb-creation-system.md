# PRB Creation System

**MANDATORY:** All PRB and work item creation via main agent with template compliance and placeholder resolution.

## Imports
@./shared-patterns/template-enforcement.md
@./shared-patterns/template-loading.md
@./shared-patterns/memory-operations.md
@./shared-patterns/context-validation.md
@./shared-patterns/behavioral-decision-matrix.md
@./shared-patterns/best-practices-integration.md

## Automatic PRB Generation

### Real-Time Work Detection & Instant PRB Creation
**CRITICAL:** System operates in continuous detection mode with ZERO manual PRB creation:
- **Work intent triggers immediate PRB generation**
- **Pattern recognition distinguishes work vs information requests**
- **Complexity scoring auto-selects optimal template**
- **Full project context gathered and embedded automatically**
- **All placeholders resolved, no runtime dependencies**
- **PRBs generated with complete Task tool context**

### Enhanced Automatic Detection Patterns
**GUARANTEED PRB CREATION:**
- **Implementation**: implement, create, build, develop, code, program, write
- **Modification**: fix, update, modify, change, refactor, optimize, enhance
- **@Role Work**: @Developer implement auth, @AI-Engineer optimize behavior
- **Story Processing**: break down STORY-001, implement user authentication
- **Operations**: deploy, configure CI/CD, setup monitoring, provision resources
- **Maintenance**: clean deprecated code, remove unused files, archive data

**INTELLIGENT NON-TRIGGERS:**
- **Query**: show, display, read, list, check, analyze, examine, explain, describe
- **Status**: what's the status, current progress, ongoing work
- **Planning**: should we, what if, how about, what's the best approach
- **@Role Consultations**: @Role what would you recommend, how would you handle
- **Knowledge**: explain concept, describe process, define terminology

## Core Creation Rules

### Main Agent Only
**CRITICAL:** ALL work item creation MUST happen in main agent context:
- Stories, Bugs, EPICs, PRBs creation
- Template resolution with full context
- Configuration hierarchy access
- Complete project context gathering

**BLOCKED:** AGENTS CANNOT create work items due to isolated context limitations.

### Template Requirements
**MANDATORY:** Every PRB MUST use appropriate template from template hierarchy:
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

### Lightning-Fast Automatic Generation Pipeline
**SEAMLESS 14-STEP INSTANT AUTOMATION WITH SEQUENTIAL THINKING:**
0. **Duplicate Check**: MANDATORY scan existing PRBs for similar work (PREVENTS DUPLICATE CREATION)
   - Search prbs/ready/ and prbs/completed/ directories
   - Compare work descriptions, technical scope, and file references
   - Score similarity using keyword overlap, scope match, and context alignment
   - If ≥70% similarity found, UPDATE existing PRB instead of creating new one
   - Notify user of existing PRB reuse with enhancement details
1. **Detection**: Real-time parsing with NLP pattern recognition
2. **Intent Classification**: Work vs information classification
3. **Context Assembly**: Complete project context loading
4. **Memory Integration**: MANDATORY auto-search memory for applicable patterns
   - Parse work intent for keywords and context
   - Search memory/[topic]/ directories using SearchMemory pattern
   - Score patterns by keyword match + recency + context relevance
   - Select top 2-3 patterns (max 1000 tokens) for PRB embedding
   - EMBED patterns directly in PRB context - NO runtime lookups
5. **Best-Practices Integration**: Auto-search best-practices for relevant standards
6. **Sequential Thinking**: ALWAYS apply sequential thinking with project context for ALL work requests
7. **Complexity Calculation**: Enhanced scoring algorithm with sequential analysis
8. **Auto-Breakdown**: If >15 points, intelligent decomposition with sequential thinking
9. **Template Selection**: Complexity score mapping to optimal template
10. **Template Loading**: Complete template structure loaded
11. **Configuration Resolution**: Full config hierarchy with actual values
12. **Placeholder Elimination**: Replace ALL placeholders with actual values
13. **Context Embedding**: Complete project context embedded with sequential thinking results AND memory patterns
14. **Quality Validation**: ZERO placeholders, complete sections verified, memory patterns embedded

### PRB Deduplication Logic

**MANDATORY:** ALWAYS check for existing PRBs before creating new ones to prevent duplicate work:

**Deduplication Process:**
1. **PRB Directory Scan**: Search prbs/ready/ and prbs/completed/ for existing PRBs
2. **Similarity Analysis**: Compare new work request against existing PRB descriptions and contexts
3. **Scoring Algorithm**: Calculate similarity percentage using:
   - **Work Description Match** (40%): Keyword overlap in descriptions and goals
   - **Technical Scope Match** (30%): File references, systems, and technical domains
   - **Context Alignment** (20%): Similar problem patterns and solution approaches
   - **Parent Reference Match** (10%): Same story/bug parent or related work chain
4. **Threshold Decision**: If any existing PRB scores ≥70% similarity, UPDATE instead of CREATE
5. **Update-Existing Pattern**: Enhance existing PRB with new requirements instead of duplication
6. **User Notification**: Inform user of existing PRB reuse with enhancement details

**Similarity Scoring Examples:**
- **High Similarity (≥70%)**: Same bug fix request, identical feature implementation, duplicate optimization work
- **Medium Similarity (50-69%)**: Related features, similar technical domains, connected workflow steps
- **Low Similarity (<50%)**: Different technical scope, unrelated problem domains, distinct implementation goals

**Update-Existing Workflow:**
- Load existing PRB and merge new requirements into context
- Preserve original execution instructions while adding new specifications
- Update completion criteria to include both original and new requirements
- Maintain original PRB ID and creation date, add update notation
- Notify user: "Enhanced existing PRB-XXX with additional requirements instead of creating duplicate"

### Memory-First Principle Integration

**MANDATORY:** All PRB generation MUST implement memory-first approach:

**Memory Search Process:**
1. **Parse Work Intent**: Extract keywords, work type, and technical domains
2. **Search Memory Directories**: Scan memory/[topic]/ using SearchMemory pattern
3. **Pattern Scoring**: Score by keyword match + recency + context relevance + success rate
4. **Pattern Selection**: Choose top 2-3 most relevant patterns (max 1000 tokens total)
5. **Direct Embedding**: EMBED patterns in PRB context - NEVER runtime lookups
6. **Learning Application**: Apply proven approaches from embedded patterns

**Memory Integration Rules:**
- **ALWAYS search first**: Memory search before any PRB generation
- **EMBED patterns**: Include relevant learnings directly in PRB context
- **NO runtime lookups**: All memory patterns embedded at creation time
- **Self-contained PRBs**: Complete execution context with embedded patterns
- **Learning application**: Reference and apply embedded patterns during execution

### Automatic Context Integration
**PRBs AUTOMATICALLY INCLUDE:**
- **Project Context**: System nature, project root, constraints from CLAUDE.md
- **Configuration Values**: All relevant settings from config hierarchy
- **Critical Files**: Relevant files with actual content samples and purposes
- **Memory Patterns**: MANDATORY - Applicable learnings and successful patterns embedded
- **Best-Practices**: Relevant standards, guidelines, and quality patterns
- **User Requirements**: Clear requirements with success criteria and scope limits
- **Role Assignment**: Appropriate specialist roles based on work type

### Size Enforcement & Validation
**AUTO-BREAKDOWN:** If complexity >15 points, automatically break into smaller PRBs ≤15 points each
**MANDATORY CHECKS:** Template compliance, zero placeholders, complete context, naming format, parent reference

## Creation vs Execution Separation

### Creation (Main Agent)
- Full configuration access
- Template hierarchy access
- **MANDATORY memory search capabilities**: Access to all memory/[topic]/ directories
- **SearchMemory pattern implementation**: Pattern scoring and selection
- Complete project context
- Placeholder resolution with embedded memory patterns

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
- **Memory Search Failure** → Re-run SearchMemory with expanded keywords and topics
- **Pattern Embedding Missing** → Force memory search and embed relevant patterns
- **Duplicate Check Missing** → Force PRB directory scan and similarity analysis
- **Duplicate Creation Attempt** → Redirect to update-existing pattern with enhancement details
- **Wrong Template** → Recalculate complexity, auto-select correct template
- **Size Violations** → Automatic logical breakdown into multiple ≤15 point PRBs
- **Format Violations** → Auto-apply naming standards and compliance rules
- **Missing Dependencies** → Auto-identify and include prerequisite work items

### Blocking Patterns (IMMEDIATE STOP)
**HARD BLOCKS:**
- Subagent PRB creation → "CREATION BLOCKED: Work items must be created by main agent"
- Manual PRB without templates → "TEMPLATE REQUIRED: PRB creation without template FORBIDDEN"
- Unresolved placeholders → "PLACEHOLDER UNRESOLVED: All placeholders must be resolved"
- Runtime config dependencies → "RUNTIME LOOKUP FORBIDDEN: All config must be embedded"
- Memory search skipped → "MEMORY SEARCH MANDATORY: All PRB generation must search memory first"
- Runtime memory lookups → "RUNTIME MEMORY FORBIDDEN: All patterns must be embedded in PRB"
- Duplicate check skipped → "DUPLICATE CHECK MANDATORY: All PRB creation must check existing PRBs first"
- Creating duplicate PRB → "DUPLICATE CREATION BLOCKED: Use update-existing pattern for similar work"

---
*Comprehensive PRB and work item creation system*