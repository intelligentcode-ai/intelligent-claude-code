# PRB Creation Mandates

**MANDATORY:** Role-in-title + complexity-based templates. Auto-correct violations.

## Imports
@./shared-patterns/learning-patterns.md
@./shared-patterns/template-loading.md
@./shared-patterns/memory-operations.md
@./shared-patterns/context-validation.md

## Mandatory Rules

### Role in Title
**Format:** "[Role] Description"
**Examples:** "[Developer] Fix auth", "[AI-Engineer] Add ML"

### Complexity-Based Templates
**Auto-selected by score using template hierarchy:**
- **Nano (0-2):** Trivial (typos, configs)
- **Tiny (3-5):** Single-file (<50 lines)
- **Medium (6-15):** Multi-file features
- **Large (16-30):** Complex w/ coordination
- **Mega (30+):** System-wide changes

**Scoring factors:** Files + Lines + External APIs + Security + Coordination
**Template Loading:** Use hierarchy: project → .claude → ~/.claude

### Memory-First Requirements
**MANDATORY:** Search memory BEFORE PRB generation:
- Query memory/[topic]/ for relevant patterns
- Extract keywords from work request
- Score by relevance + recency
- Embed top 2-3 entries (max 1000 tokens)
- NO PRB generation without memory search

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

## Integration
Commands: `/icc-analyze-complexity`, `/icc-create-prb`, `/icc-think-sequential`, `/icc-validate-context`

---
*Optimized: 113→35 lines*