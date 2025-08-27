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

## Work Detection Patterns

### Comprehensive Work Intent Detection
**MANDATORY:** Automatically detect work requests and trigger PRB generation

**Work Intent Detection Algorithm:**
1. **Analyze User Input**: Scan for action-oriented language patterns
2. **Classify Intent Type**: Work vs Information vs Planning
3. **Trigger Assessment**: Determine if PRB creation is required
4. **Context Validation**: Ensure sufficient context for PRB generation

### Work Intent Indicators (TRIGGER PRB CREATION)

**Primary Action Verbs:**
- **Implementation**: implement, create, build, develop, code, write, program
- **Modification**: fix, update, modify, change, refactor, optimize, enhance
- **System Operations**: deploy, install, configure, setup, migrate, provision
- **Maintenance**: delete, remove, clean, purge, archive, reorganize

**Compound Work Patterns:**
- "Add [feature/functionality]" → Implementation work
- "Fix [bug/issue]" → Bug fix work  
- "Update [component/system]" → Enhancement work
- "Deploy [service/application]" → Operations work
- "Configure [setting/system]" → Configuration work
- "Setup [environment/tool]" → Infrastructure work
- "Integrate [service/API]" → Integration work
- "Optimize [performance/code]" → Performance work

**Context-Based Work Detection:**
- File operations with modification intent
- System changes with implementation requirements
- Code modifications with functional changes
- Infrastructure changes with deployment requirements

### Information Request Indicators (DO NOT TRIGGER PRB)

**Query Verbs:**
- **Investigation**: show, display, read, list, check, analyze, examine, inspect
- **Knowledge**: explain, describe, define, clarify, understand, learn
- **Discovery**: find, search, locate, identify, discover, explore
- **Status**: status, state, condition, progress, current, ongoing

**Question Patterns:**
- "What is/are [subject]?" → Information query
- "How does [system/process] work?" → Knowledge request
- "Why [condition/behavior]?" → Understanding request
- "Should we [approach/decision]?" → Planning discussion
- "Can you [show/explain]?" → Information request
- "@Role questions" → Role consultation, not execution

**Planning and Discussion Indicators:**
- Strategy discussions without implementation commitment
- Architecture planning without immediate development
- Requirements gathering without execution intent
- Review requests without modification requirements

### Enhanced @Role Pattern Detection

**@Role Work Assignment Patterns (TRIGGER PRB):**
- "@Role implement [feature]" → Direct work assignment
- "@Role fix [issue]" → Bug fix assignment
- "@Role deploy [system]" → Operations assignment  
- "@Role optimize [component]" → Enhancement assignment

**@Role Information Patterns (DO NOT TRIGGER PRB):**
- "@Role what should we do about [situation]?" → Consultation
- "@Role how would you approach [problem]?" → Planning discussion
- "@Role can you explain [concept]?" → Knowledge request
- "@Role what's the status of [work]?" → Status inquiry

### Natural Language Work Detection

**Story/Task Breakdown Patterns (TRIGGER PRB):**
- "Break down [STORY-XXX]" → Story decomposition work
- "Create specialist for [domain]" → Specialist creation work
- "Implement [user story]" → Story implementation work
- "Execute [PRB file]" → PRB execution work

**Advanced Pattern Recognition:**
- **Imperative Language**: Commands and directives requiring action
- **Future Tense with Action**: "We need to implement", "Let's build"  
- **Problem-Solution Language**: "This issue needs fixing", "We should add"
- **Deadline Language**: "Deploy by [date]", "Implement before [milestone]"

## Critical Triggers

**MUST Trigger PRB Creation:**
- Work requests with implementation intent
- @Role mentions with work assignments
- Natural language work patterns with action requirements
- File modification requests with functional changes
- System deployment and configuration requests
- Bug fixes and enhancement requests
- Integration and optimization tasks

**MUST NOT Trigger PRB Creation:**
- Information queries and knowledge requests  
- Status checks and progress inquiries
- Planning discussions and strategy conversations
- @Role consultations without execution intent
- Read-only operations and analysis requests
- Architecture discussions without implementation commitment

## Subagent Execution

**Pattern**: All PRBs execute via subagents with complete embedded context

---
*PRB auto-trigger patterns for intelligent-claude-code system*