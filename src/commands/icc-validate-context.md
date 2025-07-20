# Validate Context

Validate the completeness and quality of loaded project context.

## Description

This command validates that the loaded PROJECT-CONTEXT.md contains all essential sections and provides sufficient information for effective AI team operation. It checks for completeness, clarity, and actionable content.

## Usage

```
/icc-validate-context
/icc-validate-context $ARGUMENTS
```

## Arguments

**Optional:** Validation mode or specific section to validate
- No arguments: Full validation of all sections
- Section name: Validate specific section only
- "strict": Enhanced validation with recommendations

**Examples:**
- `/icc-validate-context` - Standard full validation
- `/icc-validate-context strict` - Detailed validation with suggestions
- `/icc-validate-context "Tech Stack"` - Validate specific section

## Behavior

The command performs comprehensive validation:

1. **Check Context Loaded**
   - Verify ProjectContext entity exists in memory
   - Ensure content is recent and relevant
   - Confirm project path matches current location

2. **Validate Required Sections**
   - Project Overview (mandatory)
   - Technology Stack (mandatory)
   - At least 3 additional sections recommended

3. **Assess Content Quality**
   - Sufficient detail (not just headings)
   - Actionable information provided
   - Clear, specific guidelines

4. **Generate Validation Report**
   - List present/missing sections
   - Rate completeness percentage
   - Provide improvement suggestions

## Validation Criteria

### Required Elements
- **Project Name:** Clear project identifier
- **Overview:** At least 50 words describing purpose
- **Tech Stack:** Specific versions and tools
- **One of:** Conventions, Standards, or Guidelines

### Quality Checks
- **Specificity:** Concrete examples provided
- **Actionability:** Clear dos and don'ts
- **Completeness:** No empty sections
- **Currency:** Updated within last 90 days

## Validation Report Format

```
🔍 PROJECT CONTEXT VALIDATION REPORT

Project: MyAwesomeProject
Status: ⚠️  NEEDS IMPROVEMENT (75% complete)

✅ Required Sections Present:
   - Project Overview (180 words)
   - Technology Stack (React 18, Node 20)
   - Coding Standards (8 rules)

⚠️  Recommended Sections Missing:
   - Testing Requirements
   - Deployment Process
   - Architecture Patterns

📊 Section Quality:
   - Overview: ✅ Excellent (detailed, clear)
   - Tech Stack: ✅ Good (versions specified)
   - Standards: ⚠️  Basic (needs examples)

💡 Recommendations:
   1. Add Testing Requirements section
   2. Include example code for standards
   3. Document deployment workflow
   4. Add team communication preferences

Overall Score: 75/100
```

## Strict Mode Validation

In strict mode, additionally checks:
- Git workflow documentation
- Error handling patterns
- Performance requirements
- Security considerations
- Documentation standards
- Code review process

## Memory Updates

After validation:
- Updates ProjectContext entity with validation timestamp
- Adds observations about completeness
- Records improvement areas
- Tracks validation history

## Integration with Workflow

- Run after `/icc-load-context`
- Before starting major work
- Part of project onboarding
- Periodic quality checks

## Action Items

Based on validation results:
- **90-100%:** Ready for work
- **70-89%:** Functional, improvements recommended
- **50-69%:** Basic context, key sections needed
- **Below 50%:** Insufficient context, update required

This command ensures the AI team has adequate project context for effective, aligned work execution.