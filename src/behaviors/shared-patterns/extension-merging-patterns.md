# Extension Merging Patterns

**MANDATORY:** Merge agenttask-extensions.yaml with base templates during AgentTask generation. Auto-correct violations.

## Merging Strategy

**AI-Powered Contextual Integration:**
- Extensions intelligently merged with base templates
- Additive by default for arrays and lists
- Override markers for value replacement
- Context-aware conflict resolution

## Merging Rules

### Rule 1: Additive Merging (Default)
**Arrays and Lists Extended:**
- Base template arrays preserved
- Extension arrays appended to base
- No duplication of identical items
- Maintains original order, extensions added after

### Rule 2: Override Merging
**Override Marker Processing:**
- Pattern: `"!override new_value"`
- Replaces base value completely
- Works for strings, numbers, booleans, objects
- Override marker stripped from final result

### Rule 3: New Section Addition
**Completely New Sections:**
- Extensions can add sections not in base template
- New sections inserted contextually appropriate locations
- Maintains template structure integrity
- Preserves mandatory validation sections

## Extension Application Process

**Merging Steps:**
1. **Load Base Template**: Get template content for complexity level
2. **Apply Universal Extensions**: Merge `all:` section to template
3. **Apply Size-Specific Extensions**: Merge size-specific section (nano/tiny/medium/large/mega)
4. **Process Override Markers**: Replace values marked with `!override`
5. **Validate Structure**: Ensure template integrity maintained
6. **Return Merged Template**: Complete template with extensions applied

## Merging Examples

### Additive Array Merging
```yaml
# Base template:
requirements:
  processual:
    - "Apply git_privacy setting"
    - "Follow branch protection"

# Extension:
all:
  requirements:
    processual:
      - "Run ESLint validation"
      - "Update API documentation"

# Result:
requirements:
  processual:
    - "Apply git_privacy setting"
    - "Follow branch protection"
    - "Run ESLint validation"
    - "Update API documentation"
```

### Override Value Replacement
```yaml
# Base template:
workflow:
  version_bump: true
  changelog_required: true

# Extension:
nano:
  workflow:
    changelog_required: "!override false"

# Result for nano templates:
workflow:
  version_bump: true
  changelog_required: false
```

### New Section Addition
```yaml
# Extension adds completely new section:
all:
  custom_security_checks:
    - "OWASP dependency scan"
    - "Secret detection"

# Result: New section added to all templates
```

## Context-Aware Intelligence

**Smart Merging Logic:**
- Recognizes complementary vs conflicting extensions
- Maintains template validation rules
- Preserves mandatory sections
- Orders extensions logically within template structure
- Applies size-appropriate extensions only

## Error Handling

**Merge Conflict Resolution:**
- `MERGE_CONFLICT`: Attempt automatic resolution, log warning
- `STRUCTURE_VIOLATION`: Reject extension, use base template
- `INVALID_OVERRIDE`: Log error, ignore invalid override
- `SECTION_INTEGRITY`: Preserve mandatory sections regardless of extensions

**Graceful Degradation:**
- Extension merge failures: Use base template
- Partial merge success: Apply successful parts
- Critical section preservation: Never compromise validation sections

---
*Extension merging patterns for intelligent template customization*