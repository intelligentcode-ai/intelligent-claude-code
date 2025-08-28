# PRB Auto-Trigger

**MANDATORY:** Auto-detect work and generate PRB using templates from src/prb-templates/ with complete placeholder resolution.

## Imports
@./shared-patterns/template-loading.md
@./shared-patterns/template-enforcement.md
@./shared-patterns/memory-operations.md
@./shared-patterns/context-validation.md
@./naming-numbering-system.md

## Detection → Memory → PRB → Execution

| Trigger | Pattern | Action |
|---------|---------|--------|
| PRB File | *.prb.yaml | Execute existing |
| Work Request | Implementation intent | Generate PRB |
| @Role | @Role mention | PRB + Subagent execution |
| Natural Language | "break down STORY-X", "create specialist for Y" | Generate PRB |

## Complexity Scoring

**Auto-calculation**:
- Files: 1=1pt, 2-5=3pts, 6-20=5pts, 20+=10pts
- Lines: <10=1pt, <50=2pts, <200=4pts, 200+=8pts
- External APIs: 3pts each
- Database/Security: 4-5pts

**SIZE BREAKDOWN RULE:**
Auto-breakdown PRBs if complexity > 15 points into multiple PRBs ≤15 points each.

**Template Selection from src/prb-templates/**:
| Score | Template | Resolution Required |
|-------|----------|-------------------|
| 0-2 | nano-prb-template.yaml | ALL placeholders → actual values |
| 3-5 | tiny-prb-template.yaml | ALL placeholders → actual values |
| 6-15 | medium-prb-template.yaml | ALL placeholders → actual values |
| 16-30 | large-prb-template.yaml | ALL placeholders → actual values |
| 30+ | mega-prb-template.yaml | ALL placeholders → actual values |

**ENFORCEMENT:**
- Every PRB MUST use these templates
- ALL placeholders MUST be resolved at generation time
- Complete configuration MUST be embedded in PRB

## Template-First Generation Flow

1. **Detect** work requirement
2. **Gather** complete context (MANDATORY)
3. **Search** memory/[topic]/ and best-practices/ (MANDATORY)
4. **Score** complexity
5. **Sequential thinking** if complexity > 2 points, use mcp__sequential-thinking__sequentialthinking for structured PRB design
6. **Auto-breakdown** if complexity > 15 points
7. **Load Template** from src/prb-templates/ 
8. **Load Configuration** at generation time
9. **Load Workflow Settings** from CLAUDE.md workflow_settings per PRB size (nano/tiny/medium/large/mega)
10. **Resolve ALL Placeholders** with actual config values and workflow settings
11. **Embed Complete Context** - all config in PRB
12. **Validate NO Placeholders** - ZERO unresolved values
13. **Generate** compliant name and create PRB
14. **Execute** via subagent

## Workflow Placeholder Resolution

**MANDATORY**: All workflow placeholders in templates MUST be resolved with actual workflow_settings values from CLAUDE.md:

**Workflow Placeholders:**
- `[WORKFLOW_VERSION_BUMP]` → workflow_settings.[size].version_bump value (true/false)
- `[WORKFLOW_VERSION_TYPE]` → workflow_settings.[size].version_type value (patch/minor/major)
- `[WORKFLOW_CHANGELOG_REQUIRED]` → workflow_settings.[size].changelog_required value (true/false)
- `[WORKFLOW_PR_REQUIRED]` → workflow_settings.[size].pr_required value (true/false)
- `[WORKFLOW_MERGE_STRATEGY]` → workflow_settings.[size].merge_strategy value (direct_commit/feature_branch)
- `[WORKFLOW_RELEASE_AUTOMATION]` → workflow_settings.[size].release_automation value (true/false)
- `[WORKFLOW_AUTO_MERGE]` → workflow_settings.[size].auto_merge value (true/false)
- `[WORKFLOW_COORDINATION_REQUIRED]` → workflow_settings.[size].coordination_required value (true/false)
- `[WORKFLOW_BREAKING_CHANGE_ASSESSMENT]` → workflow_settings.[size].breaking_change_assessment value (true/false)

**Size Mapping:**
- nano-prb-template.yaml → workflow_settings.nano.*
- tiny-prb-template.yaml → workflow_settings.tiny.*
- medium-prb-template.yaml → workflow_settings.medium.*
- large-prb-template.yaml → workflow_settings.large.*
- mega-prb-template.yaml → workflow_settings.mega.*

## Enhanced Sequential Thinking Triggers

**MANDATORY**: Use sequential thinking for structured analysis when:
- **Complexity Threshold**: Any work scoring > 2 points (lowered from > 5)
- **Bug Investigation**: All bug analysis regardless of complexity score
- **PRB Planning**: Multi-step PRB creation and breakdown scenarios
- **Architecture Evaluation**: Design decisions with multiple factors or trade-offs
- **Risk Assessment**: Security, performance, or technical risk evaluation
- **Integration Analysis**: Cross-component or cross-system coordination needs

**Sequential Thinking Pattern**:
1. **Problem Definition**: Clear articulation of the challenge or decision
2. **Context Analysis**: Relevant factors, constraints, and requirements  
3. **Option Generation**: Multiple approaches or solutions
4. **Impact Assessment**: Trade-offs, risks, and benefits evaluation
5. **Decision Rationale**: Structured reasoning for chosen approach
6. **Implementation Planning**: Step-by-step execution strategy

## Context Requirements

**MANDATORY before generation**:
- System nature (CODE/AI-AGENTIC)
- Project root (absolute path)
- Configuration (actual values)
- Critical files (with samples)
- User requirements (clear)

## Work Detection Patterns

**Work Intent Indicators (TRIGGER PRB CREATION):**
- **Implementation**: implement, create, build, develop, code, write, program
- **Modification**: fix, update, modify, change, refactor, optimize, enhance  
- **Operations**: deploy, install, configure, setup, migrate, provision
- **Maintenance**: delete, remove, clean, purge, archive, reorganize
- **@Role Work**: "@Developer implement X", "@DevOps deploy Y"
- **Story/Task**: "Break down STORY-XXX", "Execute PRB-file"
- **Bug Analysis**: All bug investigation and resolution patterns
- **PRB Creation Planning**: Structured analysis for complex PRB generation
- **Architecture Decisions**: Design choices requiring structured evaluation

**Information Request Indicators (DO NOT TRIGGER PRB):**
- **Query**: show, display, read, list, check, analyze, examine, inspect
- **Knowledge**: explain, describe, define, clarify, understand, learn  
- **Status**: status, state, condition, progress, current, ongoing
- **@Role Questions**: "@PM what story next?", "@Architect how to design?"
- **Planning**: Strategy discussions without implementation commitment

## ASK vs DEMAND Classification

**MANDATORY:** Balanced detection distinguishing questions (ASK - allow through) from commands (DEMAND - trigger PRB).

### ASK Indicators (ALLOW THROUGH - No PRB)
**QUESTION PATTERNS:**
- Question words: what, how, why, should, can, will, which, where, when
- @Role consultations: "@PM what story next?", "@Architect how would you design this?"
- Status inquiries: "What's the current progress?", "How is the deployment?"
- Advisory requests: "What do you think?", "How would you approach this?"

**SOFT EXPLORATION VERBS:**
- Consultation: recommend, suggest, advise, propose, think, consider
- Knowledge seeking: explain, describe, understand, learn, clarify  
- Status checking: status, progress, current, ongoing, state, condition

### DEMAND Indicators (TRIGGER PRB)
**COMMAND PATTERNS:**
- Direct imperatives: "@Developer implement X", "@DevOps deploy Y"
- Work assignments: "Fix the bug", "Build the feature", "Deploy the app"
- Action commitments: "Please create", "Go ahead and fix", "Start working on"

**HARD ACTION VERBS:**
- Implementation: implement, create, build, develop, code, program, write
- Modification: fix, update, modify, change, refactor, optimize, enhance
- Operations: deploy, install, configure, setup, migrate, provision
- Maintenance: delete, remove, clean, purge, archive, reorganize

### Classification Process
1. **Question Detection First**: Check for ASK patterns before work detection
2. **Command Detection Second**: Apply DEMAND patterns for work requests  
3. **Context Preservation**: Maintain natural conversation flow for planning
4. **Work Enforcement**: Strong PRB creation for actual implementation tasks

**Examples:**
- "@PM what story should we work on next?" → ASK (conversation)
- "@PM break down the authentication story" → DEMAND (work request)
- "What's the status?" → ASK (information request)
- "Deploy the application" → DEMAND (operation request)

---
*PRB auto-trigger with template-first generation and ASK vs DEMAND classification*