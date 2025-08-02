# PRB Creation Mandates

**MANDATORY:** MUST use role-in-title + complexity-based PRB templates. Auto-correct violations.

**PURPOSE:** Mandatory behavioral requirements for ALL PRB creation.

## Imports
@./shared-patterns/learning-patterns.md

## MANDATORY RULES

### Role in Title - ALWAYS
**Every PRB title MUST include role in square brackets**
- Format: "[Role] Task description"
- Examples: "[Developer] Implement auth", "[AI-Architect] Design memory system"

### PRB Template Selection - COMPLEXITY-BASED
**Automatic template selection based on complexity analysis**

#### Nano PRB (Score 0-2)
- Single-line changes
- Configuration updates
- Typo fixes
- Constant changes
- Examples: "Fix typo in README", "Update timeout value"

#### Tiny PRB (Score 3-5)
- Single-file edits (<50 lines)
- Simple validation additions
- Minor bug fixes
- Import updates
- Examples: "Add email validation", "Fix null check"

#### Medium PRB (Score 6-15)
- Multi-file features
- API endpoints
- Component creation
- Standard bug fixes
- Examples: "Create user profile endpoint", "Add authentication middleware"

#### Large PRB (Score 16-30)
- Complex features with sub-PRBs
- System integrations
- Major refactoring
- Security implementations
- Examples: "Implement OAuth2 system", "Refactor data layer"

#### Mega PRB (Score 30+)
- System-wide changes
- Architecture migrations
- Platform upgrades
- Major initiatives
- Examples: "Migrate to microservices", "Implement multi-tenancy"

### Complexity Analysis - ALWAYS
**Automatic scoring considers:**
- Files affected
- Code volume
- External integrations
- Security implications
- Coordination requirements

### Sequential Thinking - FOR COMPLEX PRBs
**Use /icc-think-sequential for Large/Mega PRBs**
- Break down into logical phases
- Question assumptions and revise approach
- Document decision rationale

### UltraThinking - FOR SYSTEM PRBs
**Apply maximum depth analysis for Mega PRBs**
- Consider system-wide impacts
- Explore alternative architectures
- Risk assessment and mitigation
- Long-term maintenance considerations

### Project Context Integration - ALWAYS
**Include project-specific elements in EVERY PRB**
- Best practices from .claude/best-practices/
- Architecture patterns and constraints
- Existing code patterns via search
- External documentation references
- Project coding standards and style guides
- Infrastructure-as-Code standards
- Security guidelines and compliance requirements

### Ultra-Experienced Specialists - ALWAYS
**Create specialists with 10+ years expertise**
- Never use generic roles for specialized work
- Create domain-specific specialists (@GraphQL-Developer)
- Apply maximum expertise level and best practices

## ENFORCEMENT

**Role-in-Title:** NON-NEGOTIABLE for ALL PRBs
**Template Selection:** Automatic based on complexity score
- Override allowed with justification
- System learns from overrides

**Auto-Correction Patterns:**
- Missing role in title → Add appropriate role
- Wrong complexity → Re-analyze and select correct template
- Missing validation → Add validation criteria
- No SME assigned → Pre-assign appropriate reviewer

Apply to ALL work: features, bugs, tasks, optimizations.

## INTEGRATION

Use these commands:
- `/icc-analyze-complexity` - Preview complexity before creation
- `/icc-create-prb` - Generate PRB with auto-template selection
- `/icc-generate-prb-from-draft` - Create PRBs from draft specs
- `/icc-think-sequential` - Complex problem analysis
- `/icc-create-specialist` - Dynamic role creation