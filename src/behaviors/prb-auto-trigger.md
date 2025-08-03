# PRB Auto-Trigger Behavior

**MANDATORY:** MUST auto-detect work and generate appropriate PRB. Auto-correct violations.

**PURPOSE:** Automatically detect work requests and generate PRBs for execution

## Imports
@./shared-patterns/template-loading.md
@./shared-patterns/memory-operations.md

## Core Principle: Detection → Memory Search → PRB Generation → Direct Execution

Every work detection triggers memory search first, then PRB generation with embedded learnings.

## Work Detection Patterns

| Trigger Type | Detection Pattern | Action |
|-------------|------------------|--------|
| **PRB File** | *.prb.yaml, PRB-XXX | Execute existing PRB |
| **Work Request** | Any implementation request | Analyze → Generate PRB |
| **@Role** | @Role mention | Generate appropriate PRB |
| **Commands** | /icc-create-prb | Generate PRB with options |

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
2. **Search Memory** → Query memory/[topic]/ for relevant patterns (MANDATORY)
3. **Analyze** → Calculate complexity score
4. **Select** → Choose PRB template using hierarchy
5. **Generate** → Create PRB with embedded memory entries (top 2-3)
6. **Execute** → Direct execution

## Integration Points

### With PRB Enforcement
Ensures all work goes through PRBs, blocks direct execution attempts.

### With Learning System
Captures patterns for better template selection over time.

### With Memory System
MANDATORY memory search before PRB generation. Embeds top 2-3 relevant entries.

### With L3 Autonomy
In L3 mode, continuously detects work and generates PRBs autonomously.

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