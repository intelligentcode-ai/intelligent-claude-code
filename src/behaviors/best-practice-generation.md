# Best Practice Generation

**MANDATORY:** Generate structured best practice documents from recognized patterns.

## Imports
@./shared-patterns/documentation-patterns.md
@./best-practice-recognition.md

## Generation Process

| Step | Action | Output |
|------|--------|--------|
| 1. Load | Extract pattern data | Pattern context |
| 2. Template | Apply TEMPLATE.md | Structured doc |
| 3. Enhance | Add examples/context | Complete content |
| 4. Validate | Check standards | Quality assured |
| 5. Approve | User review | Approval status |
| 6. Store | Save to best-practices/ | Final document |

## Document Structure

### Required Sections
- **Problem**: Challenge addressed
- **Solution**: Implementation approach
- **Context**: When to apply
- **Examples**: Code/usage samples
- **Validation**: Success criteria

### Template Format
```markdown
# [PRACTICE_NAME]
## Problem
[Challenge and symptoms]
## Solution
[Approach with steps]
## Examples
[Code samples]
## Validation
[Success criteria]
```

## Quality Standards

**Content Requirements**:
- Clear problem statement
- Actionable solution steps
- Concrete examples
- Measurable validation

**Format Requirements**:
- Consistent structure
- Markdown formatting
- Proper categorization
- Version metadata

## User Approval

**Workflow**: Generate → Preview → Approve/Reject → Store
**Rejection**: Capture feedback → Regenerate → Re-review

## Storage

**Location**: `best-practices/[category]/[practice-name].md`
**Naming**: `lowercase-hyphenated.md`
**Metadata**: YAML frontmatter with date, version, category

---
*Optimized: 378→~60 lines*