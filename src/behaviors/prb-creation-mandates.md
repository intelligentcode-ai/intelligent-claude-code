# PRB Creation Instructions

**MANDATORY:** When creating PRBs, include role in title and select appropriate template complexity.

## Imports
@./shared-patterns/learning-patterns.md
@./shared-patterns/template-loading.md
@./shared-patterns/memory-operations.md
@./shared-patterns/context-validation.md
@./naming-enforcement-behavior.md

## How to Create PRBs

### Include Role in Title
**Format:** "[Role] Description"
**Examples:** "[Developer] Fix auth", "[AI-Engineer] Add ML"

### Choose Template Based on Complexity
**Select template by evaluating work complexity:**
- **Nano (0-2 points):** Simple changes (typos, configs)
- **Tiny (3-5 points):** Single-file work (<50 lines)
- **Medium (6-15 points):** Multi-file features
- **Large (16-30 points):** Complex work requiring coordination
- **Mega (30+ points):** System-wide changes

**Consider these factors:** Files affected + Lines to change + External APIs + Security impact + Coordination needed
**Find templates in:** project folder → .claude folder → ~/.claude folder

### Naming Format Requirements
**MANDATORY:** All generated PRBs MUST follow standard naming format:

**Format:** `<PARENT_ID>-PRB-<NUMBER>-<TITLE>-<DATE>.prb.yaml`

**Critical Date Rule:** MUST use system date command for current date:
```bash
CURRENT_DATE=$(date +%Y-%m-%d)
```
**NEVER** hardcode dates - always retrieve from system for accuracy.

**Examples:**
- `STORY-001-PRB-001-implement-auth-$(date +%Y-%m-%d).prb.yaml`
- `BUG-005-PRB-001-fix-validation-$(date +%Y-%m-%d).prb.yaml`

**Validation Requirements:**
- Parent ID must reference existing work item (STORY-001, BUG-005, etc.)
- Number must be sequential within parent scope (check existing files to find next number)
- Title must be lowercase, hyphen-separated, descriptive
- Date must be current date in YYYY-MM-DD format

### Search Memory Before Creating PRBs
**MANDATORY:** Always check memory before creating PRBs:
- Look in memory/[topic]/ folders for relevant patterns
- Find keywords from the work request
- Choose the best 2-3 entries based on relevance and how recent they are
- Include them in the PRB (up to 1000 tokens)
- Never create a PRB without checking memory first

### Quality Requirements
- Sequential thinking for Large/Mega
- Pre-assigned SME reviewers
- 10+ years specialist expertise
- Project context integration
- Memory entries embedded in context
- **COMPLETE CONTEXT MANDATORY**: Every PRB MUST include complete_context section with:
  - system_nature: "MARKDOWN-BASED AI-AGENTIC SYSTEM" or "CODE-BASED SYSTEM"
  - configuration values (actual values, not placeholders)
  - critical file references with samples
  - project root path and structure
  - user requirements clearly stated
  - embedded memory entries from search

### Bug/Story Validation
**MANDATORY:** Bugs and Stories MUST NOT contain role assignments:

1. **Validation Before Creation**:
   - Scan bug/story content for role assignments
   - Block if contains "Assigned:", "@Role", or role references
   - Error: "❌ Role assignments not allowed in bugs/stories. Roles determined during PRB creation"

2. **Separation of Concerns**:
   - Bugs/Stories = WHAT (problem/requirement description)
   - PRBs = WHO (role assignment via PM+Architect) + HOW (implementation)
   - No predetermined roles allowed in work items

### Role Assignment Enforcement
**MANDATORY:** PM + Architect collaboration for ALL role assignments:

1. **Block Direct Role Assignment**: 
   - STOP execution if role assigned without PM+Architect process
   - Redirect to story-breakdown.md role assignment process
   - Generate error: "❌ Role assignment requires PM+Architect collaboration"

2. **Enforce Collaboration Process**:
   - PM MUST analyze work requirements first
   - PM MUST select appropriate architect domain expert based on system nature
   - Together they MUST determine correct role assignment
   - Document collaboration and rationale in PRB

3. **System Nature Validation**:
   - **MANDATORY:** Check system_nature before role assignment
   - **AI-AGENTIC SYSTEMS:** @AI-Engineer for behavioral patterns, memory operations, PRB enforcement
   - **CODE-BASED SYSTEMS:** @Developer, @Backend-Tester, @Database-Engineer as appropriate
   - **HYBRID SYSTEMS:** Joint assessment by appropriate domain architects
   - **BLOCK:** Role assignments that conflict with system nature

4. **Architect Domain Expert Selection**:
   - **AI/ML/Behavioral Systems/Agentic Workflows:** @AI-Engineer
   - **Infrastructure/Deployment/System Operations:** @System-Engineer
   - **Security Reviews/Compliance/Vulnerability Analysis:** @Security-Engineer
   - **General Architecture/Complex Multi-Domain:** @Architect
   - **VALIDATION:** Selected architect MUST match work domain (>70% capability match)

5. **Validation Requirements**:
   - PRB MUST include role assignment rationale
   - PRB MUST reference PM+Architect collaboration
   - PRB MUST include capability match justification (>70%)
   - PRB MUST document domain expert selection process
   - PRB MUST validate role aligns with system nature
   - PRB MUST show architect domain expertise match

### Auto-Correction
- Missing role → Trigger PM+Architect collaboration process
- Wrong template → Re-analyze complexity with architect input
- No specialist → PM+Architect decide on dynamic specialist creation
- Missing SME → PM+Architect pre-assign domain-appropriate reviewer
- Direct role assignment → Block and redirect to collaboration process
- **System nature mismatch → Block role assignment, require PM+Architect re-evaluation**
- **Wrong architect domain → Force selection of appropriate domain expert**
- **MISSING COMPLETE CONTEXT → BLOCK PRB generation until context gathered**
- **PLACEHOLDER VALUES → BLOCK execution until actual values populated**
- **Role-system conflict → Auto-correct based on system_nature validation**

### Context Validation Requirements

**MANDATORY PRE-GENERATION CONTEXT GATHERING:**
1. **Load project configuration**: Read actual values from CLAUDE.md and config hierarchy
2. **Determine project root**: Identify absolute path to project root
3. **Gather system nature**: Identify if code or markdown-based system
4. **Extract critical file references**: Find and sample relevant files
5. **Load user requirements**: Capture exact user intent and specifications

**VALIDATION BLOCKERS:**
- **PLACEHOLDER_VALUES_DETECTED**: "[FROM_CONFIG]", "[ALL-SETTINGS]", "[PROJECT_ROOT]"
- **MISSING_SYSTEM_NATURE**: No system type identification
- **EMPTY_FILE_REFERENCES**: No actual file paths or samples
- **VAGUE_REQUIREMENTS**: Generic or unclear user specifications

**REQUIRED COMPLETE CONTEXT STRUCTURE:**
```yaml
complete_context:
  system_nature: "MARKDOWN-BASED AI-AGENTIC SYSTEM"  # OR "CODE-BASED SYSTEM"
  project_root: "/absolute/path/to/project"
  configuration:
    git_privacy: true/false  # ACTUAL VALUE
    branch_protection: true/false  # ACTUAL VALUE
    default_branch: "main"  # ACTUAL VALUE
    autonomy_level: "L3"  # ACTUAL VALUE
  critical_files:
    - path: "/absolute/path/to/file"
      purpose: "specific purpose"
      sample: "actual content sample"
  user_requirements:
    original_request: "exact user words"
    clarifications: ["any clarifications needed"]
    success_criteria: ["specific success criteria"]
```

### Naming Format Validation
**MANDATORY:** All generated PRBs MUST follow standard naming format:

**Validation Requirements:**
- **Format:** `<PARENT_ID>-PRB-<NUMBER>-<TITLE>-<DATE>.prb.yaml`
- **Parent ID:** Must reference existing work item (STORY-001, BUG-005, etc.)
- **Number:** Sequential within parent scope (find next available number by checking directories)
- **Title:** Lowercase, hyphen-separated, descriptive
- **Date:** Current date in YYYY-MM-DD format

**How to Validate:**
1. **Before PRB Creation:** Check that parent reference exists
2. **Get Next Number:** Find the next available PRB number for the parent
3. **Check Format:** Make sure all components follow naming rules
4. **Verify Uniqueness:** Confirm the generated name doesn't already exist
5. **Fix Issues:** Correct any format problems automatically

**How Templates Work:**
- Template placeholders get replaced with actual values automatically
- `[PARENT_ID]` becomes the validated parent work item ID
- `[NEXT_NUMBER]` becomes the next sequential PRB number for parent
- `[TITLE]` becomes the cleaned, compliant title format
- `[CURRENT_DATE]` becomes current date in YYYY-MM-DD format

**Error Handling:**
- **PARENT_NOT_FOUND:** "❌ Parent work item not found: {parent_id}"
- **INVALID_FORMAT:** "❌ Generated name violates format: {name}"
- **NAME_EXISTS:** "❌ PRB name already exists: {name}"
- **NUMBERING_CONFLICT:** "❌ Cannot generate unique number for parent: {parent_id}"

## Available Tools
Use these commands: `/icc-analyze-complexity`, `/icc-create-prb`, `/icc-think-sequential`, `/icc-validate-context`, `/icc-validate-prb-name`

---
*Optimized: 113→35 lines*