# PRB Auto-Trigger Behavior

**MANDATORY:** MUST auto-detect work and generate appropriate PRB. Auto-correct violations.

**PURPOSE:** Automatically detect work requests and generate PRBs for execution

## Imports
@./shared-patterns/template-loading.md
@./shared-patterns/memory-operations.md
@./shared-patterns/context-validation.md
@./naming-enforcement-behavior.md
@./best-practice-recognition.md
@./best-practice-generation.md

## Core Principle: Detection → Memory Search → Best Practice Search → PRB Generation → Task Tool Execution

Every work detection triggers memory search first, then best practice search and embedding, then PRB generation with embedded learnings and practices, then MANDATORY Task tool execution.

## Work Detection Patterns

| Trigger Type | Detection Pattern | Action |
|-------------|------------------|--------|
| **PRB File** | *.prb.yaml, PRB-XXX | BLOCK direct execution → Require Task tool |
| **Work Request** | Any implementation request | Analyze → Generate PRB → Execute via Task tool |
| **@Role** | @Role mention | Generate PRB with Task tool wrapper |
| **Commands** | /icc-create-prb | Generate PRB with options → Execute via Task tool |

**CRITICAL TASK TOOL ENFORCEMENT:** 
- ALL PRB executions MUST use Task tool subagent
- NO direct PRB execution allowed EVER
- **Error for direct execution:** "❌ PRB execution REQUIRES Task tool subagent"
- **Error for @Role without Task tool:** "❌ @Role delegation requires Task tool usage"

## Complexity Analysis

### Automatic Scoring
- Files affected (1=1pt, 2-5=3pts, 6-20=5pts, 20+=10pts)
- Code volume (<10 lines=1pt, <50=2pts, <200=4pts, 200+=8pts)
- External APIs (3pts each)
- Database changes (4pts)
- Security implications (5pts)
- Multi-role coordination (3pts)

### Template Selection
| Score | Template | Description |
|-------|----------|-------------|
| 0-2 | Nano | Trivial one-line change |
| 3-5 | Tiny | Simple single-file task |
| 6-15 | Medium | Standard multi-file feature |
| 16-30 | Large | Complex with sub-PRBs |
| 30+ | Mega | System-wide change |

**Template Loading:** Uses hierarchy (project → .claude → ~/.claude)

## Auto-Generation Flow

1. **Detect** → Work requirement
2. **Task Tool Check** → If @Role mentioned, ensure Task tool wrapper
3. **Gather Context** → Load complete project context (MANDATORY)
4. **Search Memory** → Query memory/[topic]/ for relevant patterns (MANDATORY)
5. **Search Best-Practices** → Query best-practices/ directory for relevant methodological approaches (MANDATORY)
6. **Analyze** → Calculate complexity score
7. **Select** → Choose PRB template using hierarchy
8. **Validate Context** → Ensure no placeholder values
9. **Generate PRB Name** → Create compliant name by finding next available number (MANDATORY)
10. **Validate Name** → Ensure generated name follows format and parent exists
11. **Generate PRB** → Create PRB with complete context, embedded memory entries (top 2-3), and best-practices (top 2-3)
12. **MANDATORY: Execute via Task Tool** → ALL PRB execution MUST use Task tool subagent
13. **Post-Execution Recognition** → Identify successful patterns for best practice candidates (MANDATORY)
14. **Generate Best Practices** → Create documentation from recognized patterns with user approval (OPTIONAL)

### Context Gathering Phase (MANDATORY)

**BEFORE any PRB generation, MUST gather:**

1. **System Nature Detection:**
   - Scan project for code files (.js, .py, .java, etc.) 
   - If primarily code → "CODE-BASED SYSTEM"
   - If primarily markdown/config → "MARKDOWN-BASED AI-AGENTIC SYSTEM"

2. **Project Root Identification:**
   - Determine absolute path to project root
   - Locate CLAUDE.md or git root
   - Store as absolute path

3. **Configuration Loading:**
   - Load actual values from config hierarchy
   - Read git_privacy, branch_protection, default_branch, autonomy_level
   - Replace ALL "[FROM_CONFIG]" placeholders with actual values

4. **Critical File Identification:**
   - Find files relevant to the work request
   - Sample content from each file
   - Document file purpose and relevance

5. **User Requirements Capture:**
   - Store exact user request
   - Note any clarifications or assumptions
   - Define clear success criteria

### Context Validation Rules

**BLOCK PRB generation if:**
- System nature not identified
- Project root path missing or relative
- Configuration contains placeholder values ("[FROM_CONFIG]", "[ALL-SETTINGS]")
- No critical files identified for work request
- User requirements vague or missing

**VALIDATION CHECKLIST:**
```
☐ System nature: Determined (CODE-BASED or MARKDOWN-BASED AI-AGENTIC)
☐ Project root: Absolute path identified
☐ Configuration: All actual values loaded (no placeholders)
☐ Critical files: Identified with samples
☐ User requirements: Clear original request and success criteria
```

**ERROR RESPONSES:**
- "❌ Cannot generate PRB: System nature not determined"
- "❌ Cannot generate PRB: Configuration contains placeholders"
- "❌ Cannot generate PRB: Project root path required"
- "❌ Cannot generate PRB: Critical files not identified"
- "❌ Cannot generate PRB: User requirements unclear"

## PRB Naming During Auto-Generation

### Naming Process During Auto-Generation
**MANDATORY:** When auto-generating PRBs, MUST follow these naming steps:

1. **Get Current Date from System:**
   ```bash
   CURRENT_DATE=$(date +%Y-%m-%d)
   ```

2. **Identify Parent Work Item:**
   - Extract parent ID from work context (STORY-001, BUG-005, etc.)
   - Validate parent exists in appropriate directory
   - Error if parent not found: "❌ Parent work item not found: {parent_id}"

3. **Get Next PRB Number:**
   ```bash
   # Example for STORY-001 parent
   HIGHEST=$(ls prbs/ready/ prbs/completed/ | grep "^STORY-001-PRB-" | sed 's/.*-PRB-\([0-9]*\)-.*/\1/' | sort -n | tail -1)
   NEXT=$(printf "%03d" $((10#$HIGHEST + 1)))
   ```

4. **Generate Compliant PRB Name:**
   ```bash
   PRB_NAME="${PARENT_ID}-PRB-${NEXT}-${TITLE}-${CURRENT_DATE}.prb.yaml"
   ```

5. **Validate Generated Name:**
   - Check format compliance: `<PARENT>-PRB-<NUMBER>-<TITLE>-<DATE>.prb.yaml`
   - Ensure name doesn't exist in prbs/ready/ or prbs/completed/
   - Auto-correct if format violations detected

### Auto-Generation Examples
**From Bug Fix Request:**
```bash
# Auto-detected: BUG-005 needs PRB
CURRENT_DATE=$(date +%Y-%m-%d)
HIGHEST=$(ls prbs/ready/ prbs/completed/ | grep "^BUG-005-PRB-" | sed 's/.*-PRB-\([0-9]*\)-.*/\1/' | sort -n | tail -1)
NEXT=$(printf "%03d" $((10#$HIGHEST + 1)))
PRB_NAME="BUG-005-PRB-${NEXT}-fix-naming-enforcement-${CURRENT_DATE}.prb.yaml"
```

**From Story Implementation:**
```bash
# Auto-detected: STORY-002 needs PRB
CURRENT_DATE=$(date +%Y-%m-%d)
HIGHEST=$(ls prbs/ready/ prbs/completed/ | grep "^STORY-002-PRB-" | sed 's/.*-PRB-\([0-9]*\)-.*/\1/' | sort -n | tail -1)
NEXT=$(printf "%03d" $((10#$HIGHEST + 1)))
PRB_NAME="STORY-002-PRB-${NEXT}-implement-feature-${CURRENT_DATE}.prb.yaml"
```

### Critical Requirements
- **ALWAYS** use system date command - NEVER hardcode dates
- **ALWAYS** scan directories for existing PRB numbers
- **ALWAYS** validate parent work item exists
- **ALWAYS** apply zero-padding to numbers (001, 002, etc.)
- **ALWAYS** use lowercase, hyphen-separated titles

## Integration Points

### With PRB Enforcement
Ensures all work goes through PRBs, blocks direct execution attempts.
**NEW**: Validates complete context before allowing PRB generation.

### With Learning System
Captures patterns for better template selection over time.
**NEW**: Stores context gathering patterns to improve automation.

### With Memory System
MANDATORY memory search before PRB generation. Embeds top 2-3 relevant entries.

### With Best-Practices System
MANDATORY best-practices search before PRB generation. Discovers and embeds top 2-3 relevant methodological approaches from best-practices/ directory. Replaces template placeholders with dynamic practice content.

**NEW: Best Practice Generation Integration**
- Post-execution pattern recognition for successful operations
- Automatic identification of best practice candidates
- User approval workflow for best practice creation
- Storage of approved practices in best-practices/ directory

### With L3 Autonomy
In L3 mode, continuously detects work and generates PRBs autonomously.
**NEW**: Must still gather complete context even in autonomous mode.

## Critical Trigger Points

### MUST Trigger
- Any work request or implementation intent
- @Role mentions for work
- Explicit PRB commands
- File modifications requiring coordination

### MUST NOT Trigger
- Pure information queries
- System status checks
- Documentation reading
- Non-work discussions

## Best Practice Operations

### Post-Execution Pattern Recognition
**MANDATORY:** After successful PRB execution, MUST analyze for best practice candidates.

**Recognition Process:**
1. **Success Validation:** Confirm PRB completed with all success criteria met
2. **Pattern Analysis:** Identify successful approaches, techniques, and solutions
3. **Quality Assessment:** Evaluate pattern against effectiveness criteria
4. **Context Extraction:** Capture complete operational context and environment
5. **Candidate Presentation:** Present identified patterns to user for approval

**Automatic Recognition Triggers:**
- Complex operations completed without errors
- Innovative solutions to challenging problems
- Effective error recovery and resolution strategies
- Successful coordination between multiple roles
- Quality outcomes exceeding standard expectations

### Best Practice Generation Workflow
**OPTIONAL:** User-approved patterns generate structured best practice documents.

**Generation Process:**
1. **User Approval:** Present pattern candidate with clear value proposition
2. **Document Creation:** Generate structured documentation using template
3. **Content Enhancement:** Include examples, context, and guidance
4. **Review and Refinement:** Allow user modification and improvement
5. **Storage and Integration:** Store approved practice in best-practices/ directory

**User Interaction Pattern:**
```markdown
## 🎯 BEST PRACTICE IDENTIFIED
Pattern: [Effective Git Conflict Resolution]
Category: git
Value: Systematic approach to complex merge conflicts

Summary: Multi-step conflict resolution with validation checkpoints
that resulted in clean merge without data loss or regression.

Options:
1. ✅ Generate best practice document
2. ✏️ Refine pattern first
3. ❌ Skip documentation

What would you like to do?
```

### Best Practice Search Enhancement
**IMPROVED:** Enhanced search capabilities for PRB embedding.

**Search Process:**
1. **Query Analysis:** Extract keywords and context from work request
2. **Relevance Scoring:** Score practices by topic match and context similarity
3. **Practice Selection:** Select top 2-3 most relevant practices
4. **Content Embedding:** Extract actionable guidance and examples
5. **Template Integration:** Replace practice placeholders in PRB template

**Search Scope:**
- All categories: git/, implementation/, collaboration/, problem-resolution/
- Metadata matching: tags, categories, source operations
- Content matching: problem statements, solutions, examples
- Context matching: system nature, complexity level, role requirements

### Practice Application Tracking
**NEW:** Track effectiveness of embedded best practices.

**Tracking Elements:**
- Which practices were embedded in PRBs
- How practices influenced execution approaches
- Success outcomes when practices were applied
- User feedback on practice usefulness
- Areas where practices need improvement

**Integration with Learning System:**
- Store application patterns in memory/best-practices/
- Link practice usage to operation success rates
- Identify most effective practices for different contexts
- Refine practice recommendations based on application data

## CRITICAL: Task Tool Enforcement

**ABSOLUTE REQUIREMENT:** Every PRB execution MUST use Task tool subagent - NO EXCEPTIONS.

### Task Tool Validation During Auto-Generation
**MANDATORY CHECKS:**
1. **Pre-Execution Check:** Validate current context is within Task tool subagent
2. **Pattern Validation:** Ensure proper Task tool invocation pattern used
3. **Blocking Logic:** Immediately block ANY direct PRB execution attempts
4. **Error Display:** Show clear error message for violations

### Required Pattern for Auto-Generated PRBs
```
MANDATORY TASK TOOL PATTERN:
Task(
  subagent_type='general-purpose',
  description='Execute auto-generated PRB [PRB-ID] for [work description]',
  prompt='[Complete PRB context and execution instructions]'
)
```

### Enforcement Rules
- **NO BYPASS:** Task tool requirement cannot be disabled by configuration
- **NO OVERRIDE:** This rule applies to ALL complexity levels (nano through mega)
- **NO EXCEPTIONS:** Even autonomous L3 operations must use Task tool
- **IMMEDIATE BLOCK:** Direct PRB execution attempts blocked immediately

**CRITICAL ERROR MESSAGES:**
- "❌ PRB execution REQUIRES Task tool subagent"
- "❌ Direct PRB execution forbidden - use Task tool"
- "❌ Auto-generated PRBs MUST execute via Task tool"

---
*PRB auto-trigger with MANDATORY Task tool enforcement*