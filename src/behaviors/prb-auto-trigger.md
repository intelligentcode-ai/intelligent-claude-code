# PRB Auto-Trigger

**MANDATORY:** Auto-detect work and generate PRB using MANDATORY templates from src/prb-templates/ with COMPLETE placeholder resolution.

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
**CRITICAL:** Auto-breakdown PRBs if complexity > 15 points:
- **Detection:** After complexity calculation, check if score > 15
- **Action:** AUTOMATIC BREAKDOWN into multiple PRBs ≤15 points each
- **Process:** Use logical decomposition patterns for breakdown
- **Result:** Generate multiple sequential PRBs under same parent
- **Fallback:** If auto-breakdown fails, BLOCK with manual breakdown request

**MANDATORY Template Selection from src/prb-templates/ with Placeholder Resolution**:
| Score | Template | Source File | Resolution Required |
|-------|----------|-------------|--------------------|
| 0-2 | Nano | nano-prb-template.yaml | ALL placeholders → actual values |
| 3-5 | Tiny | tiny-prb-template.yaml | ALL placeholders → actual values |
| 6-15 | Medium | medium-prb-template.yaml | ALL placeholders → actual values |
| 16-30 | Large | large-prb-template.yaml | ALL placeholders → actual values |
| 30+ | Mega | mega-prb-template.yaml | ALL placeholders → actual values |

**ABSOLUTE ENFORCEMENT:**
- ❌ Every PRB MUST use these templates - NO manual creation
- ❌ ALL placeholders MUST be resolved at generation time
- ❌ NO runtime config lookups allowed
- ❌ Complete configuration MUST be embedded in PRB

## MANDATORY Template-First Generation Flow (ZERO EXCEPTIONS)

1. **Detect** work requirement
2. **Gather** complete context (MANDATORY)
3. **Search** memory/[topic]/ and best-practices/ (MANDATORY)
4. **Score** complexity
5. **SIZE CHECK** - Auto-breakdown if complexity > 15 points using logical decomposition
6. **Load Template** from src/prb-templates/ hierarchy ONLY
7. **Load Complete Configuration** at generation time
8. **Resolve ALL Placeholders** with actual config values
   - [FROM_CONFIG] → actual values (not placeholders)
   - [PROJECT_ROOT] → absolute project path
   - [CURRENT_DATE] → system date
9. **Embed Complete Context** - all config in PRB
10. **Validate NO Placeholders** - ZERO unresolved values
11. **Generate** compliant name and create PRB
12. **Execute** via subagent if needed

**ABSOLUTE ENFORCEMENT:** ALL steps are MANDATORY - NO bypassing, NO exceptions, NO runtime config lookups.

## Context Requirements

**MANDATORY before generation**:
- System nature (CODE/AI-AGENTIC)
- Project root (absolute path)
- Configuration (actual values)
- Critical files (with samples)
- User requirements (clear)

**IMMEDIATE BLOCKING:**
- Context incomplete → Cannot generate PRB
- Manual creation attempt → Must use src/prb-templates/
- Unresolved placeholders → Must resolve at generation time
- Runtime config dependencies → Must embed all config values
- Template source invalid → Must use src/prb-templates/ hierarchy
- Missing template sections → Must use complete templates
- **PRB too large** → Complexity > 15 points triggers automatic breakdown into smaller PRBs

## Naming

Format: `<PARENT>-PRB-<NUMBER>-<TITLE>-<DATE>.prb.yaml`
Get number: `ls prbs/ready/ | grep "^PARENT-PRB-" | sort -V | tail -1`

## Context-Aware PRB Triggering Logic

### Context Analysis for Intelligent Decisions
**CONVERSATION HISTORY EVALUATION:**
- **Previous exchanges:** Consider flow and continuity of conversation
- **Question sequences:** Follow-up questions indicate continuing discussion vs new work
- **Intent progression:** Track escalation from inquiry to decision to action
- **Ambiguity assessment:** Clear commands vs unclear exploratory statements

### Intelligent Decision Thresholds
**CONTEXT CLARITY FACTORS:**
- **High Clarity + Work Intent** = Immediate PRB trigger
- **High Clarity + Query Intent** = Direct response
- **Low Clarity + Mixed Signals** = Clarification dialogue before PRB
- **Ambiguous Context + @Role** = Natural conversation flow

**INTENT CONFIDENCE SCORING:**
- **Definitive commands:** "implement", "build", "fix" → High confidence PRB trigger
- **Exploratory questions:** "what if", "should we", "how about" → Low confidence, continue conversation
- **Status queries:** "what's the status", "how are things" → Direct response
- **Mixed patterns:** Use context history to resolve ambiguity

### Context-Driven Decision Process
**EVALUATION SEQUENCE:**
1. **Parse Current Request:** Identify core intent and language patterns
2. **Analyze Conversation History:** Review previous 2-3 exchanges for context
3. **Assess Intent Clarity:** Determine confidence level in work vs query classification
4. **Apply Context Intelligence:** Use conversation flow to inform decision
5. **Execute Decision:** PRB generation, direct response, or clarification request

**SMART ESCALATION PATTERNS:**
- **Uncertain Intent** → "I want to make sure I understand - are you asking me to [implement/explain] this?"
- **Context Mismatch** → Continue natural conversation until intent becomes clear
- **Progressive Clarity** → Allow conversation to naturally evolve toward clear work assignments

## Critical Triggers

**MUST Trigger**: Clear work commands with definitive language and high context confidence
**MUST NOT**: Questions, exploratory discussions, ambiguous requests without context clarification

## Subagent Execution

**Pattern**: All PRBs execute via subagents with complete embedded context

---
*PRB auto-trigger patterns for intelligent-claude-code system*