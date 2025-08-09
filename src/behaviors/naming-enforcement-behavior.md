# Naming Format Enforcement Behavior

**MANDATORY:** All work items MUST follow standard naming format. Auto-correct violations.

**PURPOSE:** Enforce consistent naming format across all work items (EPICs, STORYs, BUGs, PRBs)

## Imports
@./shared-patterns/configuration-patterns.md
@./numbering-service-behavior.md

## Standard Naming Format

### Format Rules
- **Standard:** `<CATEGORY>-<NUMBER>-<TITLE>-<DATE>.md`
- **With Parent:** `<PARENT>-<CATEGORY>-<NUMBER>-<TITLE>-<DATE>.md`
- **Categories:** EPIC, STORY, BUG, PRB (case sensitive)
- **Numbers:** Zero-padded (001, 002, ..., 099, 100), sequential within category
- **Titles:** Lowercase, hyphen-separated, descriptive
- **Dates:** YYYY-MM-DD (current date for new items)

### Critical Date Retrieval Rule
**MANDATORY:** When creating new work items, MUST retrieve current date using system command:
```bash
CURRENT_DATE=$(date +%Y-%m-%d)
```
**NEVER** hardcode dates like "2025-01-09" - always use system date for accuracy.

### Valid Examples
- `EPIC-001-virtual-team-enhancement-2025-01-09.md`
- `STORY-001-mcp-installation-2025-01-09.md`
- `BUG-005-naming-format-inconsistency-2025-01-09.md`
- `STORY-001-PRB-001-ansible-playbook-update-2025-01-09.prb.yaml`
- `BUG-005-PRB-001-naming-format-enforcement-2025-01-09.prb.yaml`

### Invalid Examples
- `story-1-something.md` (wrong category case, no zero-padding, no date)
- `TASK-001-example-2025-01-09.md` (invalid category)
- `STORY-1-Example_Title-2025-01-09.md` (no zero-padding, spaces/underscores)
- `STORY-001-title-25-01-09.md` (invalid date format)

## Validation Process

### Name Validation Function
```
ValidateWorkItemName(proposed_name, category, parent_id=null):
  1. **Parse Components:**
     - Extract category, number, title, date from name
     - Check for parent reference if applicable
  
  2. **Category Validation:**
     - Must be one of: EPIC, STORY, BUG, PRB
     - Case sensitive validation
     - Error: "❌ Invalid category: {category}. Must be EPIC|STORY|BUG|PRB"
  
  3. **Number Validation:**
     - Must be zero-padded (001, 002, etc.)
     - Must be sequential within category/parent scope
     - Use NumberingService to get next available number
     - Error: "❌ Invalid number format. Use zero-padded: 001, 002, etc."
  
  4. **Title Validation:**
     - Must be lowercase
     - Must use hyphens only (no spaces, underscores, special chars)
     - Must be descriptive (>3 characters)
     - Error: "❌ Invalid title format. Use lowercase-with-hyphens"
  
  5. **Date Validation:**
     - Must be YYYY-MM-DD format
     - Must be reasonable (not future date >30 days, not before 2024)
     - Use current date for new items
     - Error: "❌ Invalid date format. Use YYYY-MM-DD"
  
  6. **Parent Reference Validation (for PRBs):**
     - Parent must exist if specified
     - Parent format must be valid
     - Error: "❌ Parent reference invalid or not found: {parent_id}"
  
  RETURN VALIDATION_RESULT
```

### Auto-Correction Logic
```
AutoCorrectWorkItemName(invalid_name, category, parent_id=null):
  1. **Category Correction:**
     - Convert lowercase to uppercase
     - Map common aliases (task→STORY, requirement→PRB)
  
  2. **Number Generation:**
     - Use NumberingService.GetNextNumber(category, parent_id)
     - Apply zero-padding automatically
  
  3. **Title Correction:**
     - Convert to lowercase
     - Replace spaces with hyphens
     - Replace underscores with hyphens
     - Remove special characters except hyphens
     - Ensure length >3 characters
  
  4. **Date Assignment:**
     - Use current date (YYYY-MM-DD) if missing: `CURRENT_DATE=$(date +%Y-%m-%d)`
     - Validate existing date format
  
  5. **Generate Corrected Name:**
     - Combine corrected components
     - Validate final name doesn't exist
     - Return corrected name
```

## Integration Points

### With PRB Creation
**Hook Point:** Before PRB file creation
**Validation:** 
- Validate generated PRB name follows format
- Ensure parent reference exists and is valid
- Auto-correct if needed, log corrections

### With Story Breakdown
**Hook Point:** When @PM creates PRBs from stories
**Validation:**
- Generated PRB names follow parent-child format
- Sequential numbering within story scope
- Date consistency across related PRBs

### With Work Item Creation
**Hook Point:** Any work item file creation
**Validation:**
- Block creation of non-compliant names
- Offer auto-correction suggestion
- Log validation patterns for learning

## Error Handling

### Validation Failures
```
ValidationError Types:
- INVALID_CATEGORY: Category not in allowed list
- INVALID_NUMBER_FORMAT: Number not zero-padded or sequential
- INVALID_TITLE_FORMAT: Title contains spaces, uppercase, or special chars
- INVALID_DATE_FORMAT: Date not YYYY-MM-DD format
- PARENT_NOT_FOUND: Referenced parent doesn't exist
- NAME_ALREADY_EXISTS: Generated name conflicts with existing file
```

### Error Response Format
```markdown
❌ NAMING VALIDATION FAILED
File: {proposed_name}
Errors:
- {error_type}: {error_message}
- {error_type}: {error_message}

Suggested Correction: {auto_corrected_name}

Would you like to:
1. Use suggested correction
2. Manually specify compliant name
3. Cancel operation
```

### Recovery Actions
- **AUTO_CORRECTABLE:** Apply correction automatically and proceed
- **USER_INPUT_NEEDED:** Request user confirmation for correction
- **BLOCK_OPERATION:** Prevent creation until compliant name provided
- **LOG_PATTERN:** Store validation pattern for future improvement

## Performance Optimization

### Caching Strategy
- **Category Lists:** Cache allowed categories (static data)
- **Number Sequences:** Cache current max numbers per category (1 min TTL)
- **Parent References:** Cache parent validation (5 min TTL)
- **Name Validation:** Cache validation results (1 min TTL)

### Batch Operations
- **Bulk Validation:** Validate multiple names in single operation
- **Batch Correction:** Apply corrections to multiple files
- **Progress Reporting:** Show progress for large batch operations

## Learning Integration

### Pattern Capture
Store successful validations and corrections in memory:
- Common correction patterns
- Validation failure types
- User preference patterns
- Performance metrics

### Memory Storage Location
`memory/enforcement/naming-standards.md` - Validation patterns and corrections
`memory/system-organization/file-management.md` - Bulk operation learnings

---
*Naming enforcement behavior for intelligent-claude-code system*