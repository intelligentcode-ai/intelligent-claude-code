# PRB Auto-Trigger Behavior

**MANDATORY:** MUST auto-detect work and generate appropriate PRB. Auto-correct violations.

**PURPOSE:** Automatically detect work requests and generate PRBs for execution

## Imports
@./shared-patterns/template-loading.md
@./shared-patterns/memory-operations.md
@./shared-patterns/context-validation.md
@./naming-enforcement-behavior.md

## Core Principle: Detection → Memory Search → PRB Generation → Direct Execution

Every work detection triggers memory search first, then PRB generation with embedded learnings.

## Work Detection Patterns

| Trigger Type | Detection Pattern | Action |
|-------------|------------------|--------|
| **PRB File** | *.prb.yaml, PRB-XXX | Execute existing PRB |
| **Work Request** | Any implementation request | Analyze → Generate PRB |
| **@Role** | @Role mention | Generate PRB with Task tool wrapper |
| **Commands** | /icc-create-prb | Generate PRB with options |

**Task Tool Enforcement:** All @Role mentions MUST be wrapped in Task tool invocation
**Error if Missing:** "❌ @Role delegation requires Task tool usage"

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
9. **Generate PRB Name** → Create compliant name using NamingService (MANDATORY)
10. **Validate Name** → Ensure generated name follows format and parent exists
11. **Generate PRB** → Create PRB with complete context, embedded memory entries (top 2-3), and best-practices (top 2-3)
12. **Execute** → Direct execution via Task tool if @Role involved

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

---
*PRB auto-trigger for lean autonomous execution*