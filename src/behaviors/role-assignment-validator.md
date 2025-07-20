# Role Assignment Validator

**Purpose:** Context-aware role assignment validation with mandatory architect consultation  
**Rule:** PROJECT-CONTEXT + >70% capability match + architect approval for ALL specialist work
**Status:** ENFORCED - Blocks all work without proper validation

## PROJECT-CONTEXT Enforcement

**MANDATORY FIRST STEP:** Load PROJECT-CONTEXT.md before ANY role assignment
**Context Check:** Validate understanding of project nature: Behavioral Configuration System
**Generic Nature:** System works with ANY project type, not domain-specific

### Context Validation Chain
1. **Load PROJECT-CONTEXT.md** → Parse project type and constraints
2. **Validate Understanding** → Confirm behavioral system comprehension  
3. **Apply Context Rules** → Use project-specific assignment logic
4. **Architect Consultation** → Mandatory for ALL specialist assignments

## Work Type Detection (Context-Aware)

### Behavioral System Work (PRIMARY)
- **Context:** PROJECT-CONTEXT confirms "Behavioral Configuration System"
- **Keywords:** behavioral, patterns, modes/, config, markdown, claude-code, virtual-team
- **Required Architect:** @AI-Architect (MANDATORY consultation)
- **Required Roles:** @AI-Engineer, @AI-Architect
- **BLOCKED Roles:** @System-Engineer, @DevOps-Engineer, @Database-Engineer
- **Auto-Correction:** System-Engineer → @AI-Engineer + @AI-Architect consultation

### AI/ML Work (SECONDARY)
- **Keywords:** AI, ML, agentic, neural, machine-learning
- **Architect:** @AI-Architect
- **Roles:** @AI-Engineer
- **Blocked:** @Developer, @System-Engineer

### Security Work (CROSS-CUTTING)
- **Keywords:** security, auth, encrypt, OAuth, privacy
- **Architect:** @Security-Architect
- **Roles:** @Security-Engineer
- **Blocked:** @Developer

### Documentation Work (SUPPORT)
- **Keywords:** documentation, markdown, README, guides
- **Architect:** @Requirements-Engineer
- **Roles:** @Requirements-Engineer, @AI-Engineer (for behavioral docs)
- **Context Check:** If behavioral patterns → @AI-Engineer required

### Testing Work (VALIDATION)
- **Keywords:** test, validation, verify, check
- **Architect:** @QA-Engineer
- **Roles:** @QA-Engineer, @Frontend-Tester, @Backend-Tester
- **Context Check:** If behavioral testing → @AI-Engineer + @QA-Engineer

## Role Capabilities (Context-Aware)

### Primary Roles for Behavioral Systems
- **AI-Engineer:** Behavioral patterns, AI systems, markdown configurations, virtual teams
- **AI-Architect:** System architecture, behavioral design, pattern coordination
- **Requirements-Engineer:** Documentation, specifications, markdown structure

### Secondary Roles for Behavioral Systems  
- **Developer:** General programming (if project involves code implementation)
- **QA-Engineer:** Testing strategies, validation patterns
- **Security-Engineer:** Security patterns, privacy enforcement

### BLOCKED Roles for Behavioral Systems
- **DevOps-Engineer:** BLOCKED - No deployment/infrastructure in behavioral systems
- **System-Engineer:** BLOCKED - No system infrastructure in behavioral systems  
- **Database-Engineer:** BLOCKED - No database work in behavioral systems
- **Web-Designer:** BLOCKED - No UI/frontend work in behavioral systems

### Context-Aware Capability Matching
- **If PROJECT-CONTEXT = "Behavioral Configuration System":** AI-Engineer = 95% match
- **If PROJECT-CONTEXT = "Web Application":** Web-Designer = 90% match
- **If PROJECT-CONTEXT = "Infrastructure":** DevOps-Engineer = 90% match

## Enhanced Validation Process

### Step 1: Context Enforcement
**Load PROJECT-CONTEXT:** Read PROJECT-CONTEXT.md → Extract project type and constraints  
**Context Validation:** Confirm understanding → "This is a [project_type] with [key_constraints]"  
**Generic Awareness:** Validate system works for ANY project type (not domain-specific)  
**Failure Action:** BLOCK all work until context loaded and understood

### Step 2: Work Type Detection (Context-Aware)
**Context-Aware Scanning:** Use PROJECT-CONTEXT to interpret keywords → Apply project-specific rules  
**Primary Type Identification:** Match work to project's primary domain (e.g., behavioral for this system)  
**Secondary Type Detection:** Identify cross-cutting concerns (security, testing, documentation)  
**Misalignment Detection:** Flag work that doesn't fit project context

### Step 3: Architect Consultation (MANDATORY)  
**Identify Required Architect:** Based on work type → @AI-Architect for behavioral work  
**Mandatory Consultation:** BLOCK until architect consulted → No exceptions for any specialist work  
**Consultation Record:** Document architect input → Store decision rationale  
**Joint Approval:** Require PM + Architect joint approval → Both must explicitly approve

### Step 4: Role Assignment Validation
**Context-Aware Matching:** Calculate capability match using project context → Higher threshold for primary work  
**Block Inappropriate Roles:** Prevent wrong assignments → Auto-suggest corrections  
**Capability Threshold:** Require >70% match → Higher for core project work (>90%)  
**Assignment Lock:** Prevent override without architect re-approval

## Enhanced Validation Chain

### Context-Aware Command Chain
**Context Loading:** icc:load-project-context → Parse PROJECT-CONTEXT.md → Extract constraints  
**Context Validation:** icc:validate-context-understanding → Confirm comprehension → Block if failed  
**Work Type Detection:** icc:detect-work-type-with-context → Apply context-specific rules → Identify architect  
**Mandatory Triage:** icc:require-architect-consultation → BLOCK until specialist architect consulted  
**Assignment Validation:** icc:validate-context-aware-assignments → Check capability + context match  
**Joint Approval:** icc:require-joint-approval → PM + Architect must both approve explicitly

### Auto-Correction Patterns
**System-Engineer to AI-Engineer:** Detect behavioral work → Auto-suggest @AI-Engineer + @AI-Architect  
**DevOps to AI-Engineer:** Detect configuration work → Auto-correct to behavioral specialist  
**Generic Developer Block:** For behavioral patterns → Force specialist assignment  
**Context Mismatch Alert:** Wrong domain assumptions → Display PROJECT-CONTEXT summary

### Failure Actions (Enhanced)
**No Context:** HALT all work → Display "Load PROJECT-CONTEXT.md first"  
**Wrong Context:** HALT assignment → Display correct project type and constraints  
**No Architect:** HALT specialist work → Force @AI-Architect consultation for behavioral work  
**Low Capability:** Auto-suggest correct role → Show capability comparison  
**Blocked Role:** Hard block + redirect → Display why role is inappropriate for project type

## Enhanced Integration

### Context-First Assignment Flow
**Context Check:** Load PROJECT-CONTEXT.md → Validate understanding → Extract constraints  
**Work Analysis:** Analyze task against project context → Identify appropriate domain  
**Architect Consultation:** Mandatory consultation with appropriate specialist architect  
**Role Validation:** Context-aware capability matching → >90% for core work  
**Assignment Lock:** Assign validated role → Lock with architect approval → Block overrides

### Command Integration (Enhanced)
**icc:load-project-context** → Loads and validates PROJECT-CONTEXT.md  
**icc:validate-context-understanding** → Confirms project comprehension  
**icc:detect-work-type-with-context** → Context-aware work type detection  
**icc:require-architect-consultation** → Mandatory specialist architect involvement  
**icc:validate-context-aware-assignments** → Enhanced capability + context matching  
**icc:require-joint-approval** → PM + Architect explicit approval requirement

## Enhanced Examples

### Context-Aware Assignment Examples

```yaml
# Behavioral System Work (PRIMARY)
Context: "Behavioral Configuration System"
Task: "Update behavioral patterns in modes/"
Analysis: "Behavioral work + markdown patterns + virtual-team config"
Required: @AI-Architect consultation + @AI-Engineer assignment
Blocked: @System-Engineer, @DevOps-Engineer (wrong domain)
Result: @AI-Engineer with @AI-Architect approval + context validation

# Configuration Work  
Context: "Behavioral Configuration System"
Task: "Update role assignment validation"
Analysis: "AI behavioral patterns + system coordination"
Required: @AI-Architect consultation + high capability match (>90%)
Auto-Correction: If @System-Engineer suggested → Block + redirect to @AI-Engineer
Result: @AI-Engineer with @AI-Architect mandatory consultation

# Documentation Work
Context: "Behavioral Configuration System" 
Task: "Document behavioral patterns"
Analysis: "Behavioral documentation + technical writing"
Required: Context-aware role selection
Options: @Requirements-Engineer OR @AI-Engineer (if behavioral focus)
Result: @AI-Engineer (behavioral expertise) + @Requirements-Engineer (documentation)

# Security Work (Cross-Cutting)
Context: "Any project type"
Task: "Add privacy enforcement patterns"
Analysis: "Security + behavioral patterns"
Required: @Security-Engineer + @AI-Engineer (if behavioral implementation)
Result: @Security-Engineer with @AI-Engineer collaboration

# BLOCKED Assignment Examples
Context: "Behavioral Configuration System"
Task: "Deploy virtual team system"
Attempted: @DevOps-Engineer
Analysis: "No deployment in behavioral systems - markdown configuration only"
Action: BLOCK assignment + display context + suggest @AI-Engineer
Result: Blocked with context education
```

### Auto-Correction Examples

```yaml
# Wrong Role Auto-Correction
Input: "@System-Engineer to update behavioral config"
Context: "Behavioral Configuration System"
Detection: "System-Engineer inappropriate for behavioral work"
Auto-Correction: "@AI-Engineer + @AI-Architect consultation required"
Message: "System-Engineer blocked - behavioral work requires AI specialist"

# Context Mismatch Detection
Input: "@DevOps-Engineer to configure markdown patterns"
Context: "Behavioral Configuration System" 
Detection: "DevOps irrelevant to markdown behavioral patterns"
Auto-Correction: "@AI-Engineer for behavioral configuration"
Message: "No infrastructure in behavioral systems - use @AI-Engineer"
```

---
*Context-aware role assignment validation with PROJECT-CONTEXT enforcement*