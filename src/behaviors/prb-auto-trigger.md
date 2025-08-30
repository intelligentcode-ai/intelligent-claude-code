# PRB Auto-Trigger

**MANDATORY:** Auto-detect work and generate PRB using templates from hierarchy with complete placeholder resolution.

## Imports
@./shared-patterns/behavioral-decision-matrix.md
@./shared-patterns/template-loading.md
@./shared-patterns/template-enforcement.md
@./shared-patterns/memory-operations.md
@./shared-patterns/context-validation.md
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

**Template Selection:**
| Score | Template |
|-------|----------|
| 0-2 | nano-prb-template.yaml |
| 3-5 | tiny-prb-template.yaml |
| 6-15 | medium-prb-template.yaml |
| 16-30 | large-prb-template.yaml |
| 30+ | mega-prb-template.yaml |

**SIZE BREAKDOWN RULE:** Auto-breakdown PRBs if complexity > 15 points into multiple PRBs ≤15 points each.

## Template-First Generation Flow

**PRB Generation Steps:**
1. **Detect** work requirement
2. **Search** memory for patterns (MANDATORY)
3. **Score** complexity
4. **Auto-breakdown** if complexity > 15 points
5. **Load Template** from hierarchy
6. **Load Configuration** at generation time
7. **Resolve ALL Placeholders** with actual values
8. **Embed Complete Context** in PRB
9. **Validate NO Placeholders** remain
10. **Generate** compliant name and create PRB
11. **Execute** via subagent

## Workflow Placeholder Resolution

**MANDATORY**: All workflow placeholders resolved with actual workflow_settings values:

**Common Workflow Placeholders:**
- `[WORKFLOW_VERSION_BUMP]` → actual true/false value
- `[WORKFLOW_VERSION_TYPE]` → actual patch/minor/major value  
- `[WORKFLOW_CHANGELOG_REQUIRED]` → actual true/false value
- `[WORKFLOW_PR_REQUIRED]` → actual true/false value
- `[WORKFLOW_MERGE_STRATEGY]` → actual direct_commit/feature_branch value

**Size Mapping:**
- nano/tiny/medium/large/mega → workflow_settings.[size].*

## Context Requirements

**MANDATORY before generation:**
- System nature (CODE/AI-AGENTIC)
- Project root (absolute path)
- Configuration (actual values)
- Critical files (with samples)
- User requirements (clear)

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

---
*PRB auto-trigger with template-first generation and ASK vs DEMAND classification*