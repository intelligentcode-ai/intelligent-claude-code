# Validate Role-in-Title Pattern

**PURPOSE:** Behavioral validation to ensure ALL task titles follow the mandatory "[Role] Task description" pattern.

## Behavioral Triggers

When user executes `/icc-validate-role-title $ARGUMENTS`, analyze task title format and enforce role-in-title pattern compliance.

**Arguments Format:** Task title text or assignment content
**Example:** `/icc-validate-role-title "Implement authentication system"`

## Validation Behaviors

### Title Analysis Pattern
1. **Extract Title**: Parse task title from $ARGUMENTS or assignment content
2. **Pattern Detection**: Check for "[Role] Description" format
3. **Role Validation**: Verify role is valid (core role or Technology-BaseRole format)
4. **Compliance Assessment**: Determine if title meets mandatory standard

### Validation Rules
- **MANDATORY FORMAT**: `[Role] Task description`
- **Role Types**: Core roles (@PM, @Developer, etc.) or Dynamic specialists (@React-Developer)
- **Bracket Placement**: Square brackets at start of title only
- **Role Validation**: Must be valid specialist role, not generic description

### Auto-Correction Behaviors
When title violates pattern:
1. **Detect Assignment**: Identify assigned role from task content or context
2. **Generate Correction**: Create properly formatted title with role prefix
3. **Suggest Fix**: Provide corrected title following "[Role] Description" pattern
4. **Enforcement Mode**: In L3, automatically apply correction

## Response Patterns

### Compliant Title
```
✅ **Role-in-Title Validation: PASSED**
Title: "[Developer] Implement authentication system"
Role: @Developer (validated)
Format: Compliant with mandatory pattern
```

### Non-Compliant Title
```
❌ **Role-in-Title Validation: FAILED**
Title: "Implement authentication system"
Issue: Missing role prefix in square brackets
Required Format: "[Role] Task description"

**Auto-Correction Suggestion:**
Original: "Implement authentication system"  
Corrected: "[Developer] Implement authentication system"

**Enforcement:** Apply correction immediately (L3) / Suggest correction (L1/L2)
```

### Invalid Role
```
❌ **Role-in-Title Validation: FAILED**
Title: "[Manager] Implement authentication system"
Issue: Invalid role - not a specialist role
Valid Roles: @PM, @Developer, @AI-Engineer, @React-Developer, etc.

**Auto-Correction Suggestion:**
Detected Work Type: Implementation
Recommended Role: @Developer
Corrected: "[Developer] Implement authentication system"
```

## Integration Patterns

### Task Creation Validation
- Triggered during task file creation
- Integrated with assignment validation chain
- Blocks task creation until title compliance achieved
- Creates learning entries for pattern violations

### Assignment Processing
- Validates all task assignments during planning
- Checks existing task files for compliance
- Identifies bulk correction opportunities
- Tracks compliance metrics across system

### Learning Integration
- First violation → Create learning entry + no penalty
- Repeated violations → 2x penalty for ignoring pattern
- Pattern application → +0.5P bonus for proper formatting
- Stores violation patterns for team-wide learning

## Command Integration

**Validation Chain Integration:**
- `icc-detect-work-type` → `icc-validate-role-title` → `icc-validate-assignments`
- Used in `icc-plan-story` and `icc-plan-bug` workflows
- Integrated into task decomposition phase
- Enforced in PM delegation activities

**Memory Integration:**
- Search: `/icc-memory-search "role-in-title violations"`
- Store: `/icc-memory-store Learning role-title-pattern`
- Pattern sharing across all roles and contexts

## Enforcement Levels

### L1 (Manual)
- Show validation results and suggestions
- Require user confirmation for corrections
- Document violations for manual review

### L2 (Architect)
- Auto-suggest corrections for approval
- Block non-compliant task creation
- Require architect approval for exceptions

### L3 (Autonomous)
- Automatically apply corrections
- Create follow-up tasks for bulk corrections
- Self-correct violations without stopping

## Error Patterns

### Common Violations
- Missing role brackets: "Implement feature" → "[Developer] Implement feature"
- Wrong bracket type: "(Developer) Task" → "[Developer] Task"  
- Generic descriptions: "[Person] Do work" → "[Developer] Implement feature"
- Multiple roles: "[Dev][QA] Task" → "[Developer] Task" (assign single specialist)

### Pattern Recognition
- Detect work type to suggest appropriate role
- Recognize technology domains for dynamic specialists
- Identify review tasks for appropriate reviewer assignment
- Match complexity to specialist expertise level

## Benefits

✅ **100% Title Compliance** - All tasks follow mandatory pattern  
✅ **Auto-Correction** - L3 mode fixes violations automatically  
✅ **Learning Integration** - Violations become team knowledge  
✅ **Role Clarity** - Clear specialist assignment in every title  
✅ **Workflow Integration** - Seamless validation during planning  
✅ **Quality Enforcement** - Prevents generic or unclear assignments  

This validation ensures every task clearly indicates the responsible specialist, improving accountability, clarity, and workflow efficiency.