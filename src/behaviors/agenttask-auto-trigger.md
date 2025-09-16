# AgentTask Auto-Trigger

**MANDATORY:** Auto-detect work and generate AgentTask using templates from hierarchy with complete placeholder resolution.

## Imports
@./sequential-thinking.md
@./shared-patterns/behavioral-decision-matrix.md
@./shared-patterns/template-loading.md
@./shared-patterns/template-enforcement.md
@./shared-patterns/memory-operations.md
@./shared-patterns/context-validation.md
@./shared-patterns/workflow-resolution-patterns.md
@./shared-patterns/best-practices-integration.md
@./shared-patterns/best-practices-operations.md
@./naming-numbering-system.md

## Behavioral Decision Integration

**MANDATORY:** All trigger decisions follow behavioral-decision-matrix.md precedence:
1. **@Role Direct Execution** → Immediate PRB generation for role work assignments
2. **Work→PRB Generation** → All implementation intent triggers PRB regardless of complexity
3. **Simple Information Direct** → Context score ≤8 allows direct response
4. **Complex→PRB Analysis** → Context score ≥9 requires structured PRB analysis

## Detection Patterns

| Trigger | Pattern | Action |
|---------|---------|--------|
| PRB File | *.prb.yaml | Execute existing |
| Work Request | Implementation intent | Generate PRB |
| @Role | @Role mention | PRB + Subagent execution |
| Natural Language | "break down STORY-X" | Generate PRB |

## Complexity Scoring

**Auto-calculation Points:**
- Files: 1=1pt, 2-5=3pts, 6-20=5pts, 20+=10pts
- Lines: <10=1pt, <50=2pts, <200=4pts, 200+=8pts
- External APIs: 3pts each
- Database/Security: 4-5pts

**AGGRESSIVE BREAKDOWN ENFORCEMENT:**
**MANDATORY:** Work ≥6 points MUST create STORY/BUG first, then break into nano/tiny PRBs ≤5 points each.

| Score | Action |
|-------|--------|
| 0-2 | Create nano PRB directly |
| 3-5 | Create tiny PRB directly |
| **6+** | **MANDATORY: Create STORY/BUG → Break into nano/tiny PRBs ≤5 points** |

**BLOCKED TEMPLATES:** medium-prb-template.yaml, large-prb-template.yaml, mega-prb-template.yaml

**SIZE ENFORCEMENT RULE:** ALL work ≥6 points becomes STORY/BUG first, NO direct PRB creation allowed.

## Template-First Generation Flow

**PRB Generation Steps:**
0. **Check Existing PRBs** for similar work (MANDATORY DEDUPLICATION CHECK)
   - Scan prbs/ready/ and prbs/completed/ directories for existing PRBs
   - Analyze work descriptions, technical scope, file references, and parent relationships
   - Calculate similarity score using weighted algorithm (description 40%, scope 30%, context 20%, parent 10%)
   - If ≥70% similarity detected, UPDATE existing PRB instead of creating new one
   - Notify user of existing work reuse with enhancement details
1. **Detect** work requirement
2. **Search Memory** for patterns (MANDATORY MEMORY-FIRST APPROACH)
   - Parse work intent for keywords: work type, technical domains, problem patterns
   - Search memory/[topic]/ directories using SearchMemory pattern
   - Score patterns by: keyword match + recency + context relevance + success indicators
   - Select top 2-3 most relevant patterns (max 1000 tokens total)
   - EMBED patterns directly in PRB context - NO runtime memory lookups
4. **Search** best-practices for applicable patterns (MANDATORY)
5. **Score** complexity and enforce breakdown rule (nano/tiny direct, ≥6 points → STORY/BUG)
6. **Sequential Analysis** ALWAYS (structured thinking with project context for ALL work)
7. **AGGRESSIVE BREAKDOWN** if complexity ≥6 points → FORCE STORY/BUG creation → Break into nano/tiny PRBs ≤5 points
8. **Load Template** from hierarchy (nano/tiny only for PRBs)
9. **Load Configuration** at generation time
10. **Load Workflow Settings** from CLAUDE.md workflow_settings.[size]
11. **Resolve Configuration Placeholders** with actual config values
12. **Resolve Workflow Placeholders** with actual workflow_settings values
13. **Embed Complete Context** in PRB with resolved workflow instructions, best-practices, AND memory patterns
14. **Validate NO Placeholders** remain (including workflow placeholders, memory search patterns)
15. **Generate** compliant name and create PRB
16. **Execute** via subagent

## Workflow Placeholder Resolution

**MANDATORY**: All workflow placeholders resolved with actual workflow_settings values from CLAUDE.md:

**Workflow Placeholder Resolution Process:**
1. **Load CLAUDE.md workflow_settings** for determined PRB size
2. **Map ALL workflow placeholders** to actual values from workflow_settings.[size]
3. **Resolve PR creation sections** when pr_required=true
4. **Embed explicit git commands** based on merge_strategy
5. **Include complete workflow instructions** in PRB

**All Workflow Placeholders:**
- `[WORKFLOW_VERSION_BUMP]` → workflow_settings.[size].version_bump (true/false)
- `[WORKFLOW_VERSION_TYPE]` → workflow_settings.[size].version_type (patch/minor/major)
- `[WORKFLOW_CHANGELOG_REQUIRED]` → workflow_settings.[size].changelog_required (true/false)
- `[WORKFLOW_PR_REQUIRED]` → workflow_settings.[size].pr_required (true/false)
- `[WORKFLOW_MERGE_STRATEGY]` → workflow_settings.[size].merge_strategy (direct_commit/feature_branch)
- `[WORKFLOW_RELEASE_AUTOMATION]` → workflow_settings.[size].release_automation (true/false)
- `[WORKFLOW_AUTO_MERGE]` → workflow_settings.[size].auto_merge (true/false)
- `[WORKFLOW_COORDINATION_REQUIRED]` → workflow_settings.[size].coordination_required (true/false)

**PR Creation Resolution (when pr_required=true):**
- Replace `[PR_ID]` with actual PRB identifier
- Replace `[FEATURE_DESCRIPTION]` with actual work description
- Include EXPLICIT PR creation commands: `gh pr create --title "[PR_ID]" --body "..."`
- Add complete feature branch workflow when merge_strategy="feature_branch"

**Size to Settings Mapping (RESTRICTED TO NANO/TINY ONLY):**
- nano-prb-template.yaml → workflow_settings.nano.*
- tiny-prb-template.yaml → workflow_settings.tiny.*
- **BLOCKED:** medium-prb-template.yaml, large-prb-template.yaml, mega-prb-template.yaml

**ENFORCEMENT:** Only nano/tiny PRBs permitted. Work ≥6 points becomes STORY/BUG first.

## PRB Deduplication Detection

**MANDATORY:** All PRB generation MUST check for existing similar work before creating new PRBs:

### Duplicate Detection Process
1. **Directory Scan**: Search prbs/ready/ and prbs/completed/ for all existing PRBs
2. **Work Analysis**: Extract work description, technical scope, and requirements from new request
3. **Similarity Calculation**: Compare against each existing PRB using weighted scoring:
   - **Work Description Match** (40%): Compare goal descriptions, problem statements, and success criteria
   - **Technical Scope Match** (30%): Compare file references, system components, and technical domains
   - **Context Alignment** (20%): Compare problem patterns, solution approaches, and implementation contexts
   - **Parent Reference Match** (10%): Check for same story/bug parent or related work chain
4. **Threshold Decision**: If any PRB scores ≥70% similarity, trigger update-existing workflow
5. **User Notification**: Inform user of duplicate detection and existing work enhancement

### Similarity Scoring Implementation
**Work Description Matching:**
- Extract keywords from descriptions, goals, and success criteria
- Calculate keyword overlap percentage
- Weight by importance (goal keywords higher than descriptive text)
- Score as percentage of matching important keywords

**Technical Scope Matching:**
- Compare file paths and directory references
- Match system components and technology domains
- Analyze implementation approaches and technical requirements
- Score based on overlap of technical elements

**Context Alignment Scoring:**
- Compare problem types and solution patterns
- Analyze implementation complexity and approach similarities
- Match workflow requirements and execution context
- Score based on contextual similarity

**Parent Reference Matching:**
- Direct parent match (same STORY/BUG ID) scores full points
- Related parent chains (sequential work) score partial points
- Unrelated parents score zero points

### Update-Existing Workflow
**When Duplicate Detected (≥70% similarity):**
1. **Load Existing PRB**: Read current PRB content and context
2. **Merge Requirements**: Combine new requirements with existing ones
3. **Preserve Original Context**: Maintain original PRB structure and ID
4. **Enhanced Completion Criteria**: Expand success criteria to include new requirements
5. **Update Notation**: Add note about enhancement with new requirements
6. **User Notification**: "Enhanced existing [PRB-ID] with additional requirements instead of creating duplicate"

## Memory-First PRB Generation

**MANDATORY:** All PRB generation MUST implement memory-first approach before template loading:

### Memory Search Process
1. **Work Intent Analysis**: Parse user request for work type, technical domains, and context
2. **Memory Directory Search**: Scan memory/[topic]/ directories for relevant patterns
3. **Pattern Scoring**: Evaluate patterns using SearchMemory scoring algorithm:
   - Keyword match score (work type, technical terms, domain match)
   - Recency score (newer patterns weighted higher)
   - Context relevance score (similar problem/solution patterns)
   - Success indicators (proven patterns from successful PRBs)
4. **Pattern Selection**: Choose top 2-3 most relevant patterns (max 1000 tokens)
5. **Direct Embedding**: Include patterns in PRB context - NEVER runtime lookups

### Memory Integration Rules
- **ALWAYS search memory BEFORE template loading**
- **EMBED patterns directly in PRB context**
- **NO runtime memory lookups during execution**
- **Self-contained PRBs with embedded learning context**
- **Apply memory patterns during PRB execution**

### Memory Search Validation
- Verify memory search completed before template selection
- Confirm relevant patterns embedded in PRB context
- Check NO `[MEMORY_SEARCH:topic]` placeholders remain
- Validate memory patterns included in context embedding

## Context Requirements

**MANDATORY before generation:**
- **Duplicate check (completed with results)**
- System nature (CODE/AI-AGENTIC)
- Project root (absolute path)
- Configuration (actual values)
- Critical files (with samples)
- User requirements (clear)
- **Memory patterns (embedded from search)**

## Work Detection Patterns

**Work Intent (TRIGGER PRB):**
- **Implementation**: implement, create, build, develop, code, write
- **Modification**: fix, update, modify, change, refactor, optimize
- **Operations**: deploy, install, configure, setup, migrate
- **Maintenance**: delete, remove, clean, purge, archive
- **@Role Work**: "@Developer implement X", "@DevOps deploy Y"
- **Story/Task**: "Break down STORY-XXX", "Execute PRB-file"

**Information Request (NO PRB):**
- **Query**: show, display, read, list, check, analyze
- **Knowledge**: explain, describe, define, clarify, understand
- **Status**: status, state, condition, progress, current
- **@Role Questions**: "@PM what story next?", "@Architect how to design?"

## ASK vs DEMAND Classification

**ASK Indicators (ALLOW THROUGH):**
- Question words: what, how, why, should, can, will
- @Role consultations: "@PM what story next?"
- Status inquiries: "What's the current progress?"
- Advisory requests: "What do you think?"

**DEMAND Indicators (TRIGGER PRB):**
- Direct imperatives: "@Developer implement X"
- Work assignments: "Fix the bug", "Build the feature"
- Action commitments: "Please create", "Go ahead and fix"

## Classification Process

**Balanced Detection:**
1. **Question Detection First**: Check for ASK patterns
2. **Command Detection Second**: Apply DEMAND patterns for work requests
3. **Context Preservation**: Maintain conversation flow for planning
4. **Work Enforcement**: Strong PRB creation for implementation tasks

## Aggressive Breakdown Blocking Patterns

**BLOCKED ACTIONS (IMMEDIATE STOP):**
- Direct PRB creation ≥6 points → "BREAKDOWN REQUIRED: Work ≥6 points must become STORY/BUG first"
- Medium/Large PRB requests → "TEMPLATE BLOCKED: Only nano/tiny PRBs permitted, create STORY first"
- Bypass story creation → "STORY CREATION MANDATORY: All ≥6 point work requires STORY/BUG breakdown"
- Manual large PRB creation → "LARGE PRB FORBIDDEN: Maximum PRB size is 5 points (tiny)"

**ENFORCEMENT MESSAGES:**
- "AGGRESSIVE BREAKDOWN: Converting 8-point work to STORY-XXX → nano/tiny PRBs"
- "SIZE LIMIT ENFORCED: PRB creation blocked, story breakdown required"
- "TEMPLATE RESTRICTION: Only nano-prb-template.yaml and tiny-prb-template.yaml permitted"

---
*PRB auto-trigger with aggressive breakdown enforcement and nano/tiny restrictions*