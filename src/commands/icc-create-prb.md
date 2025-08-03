# Create PRB (Product Requirement Blueprint)

Generate a Product Requirement Blueprint with automatic complexity analysis and template selection.

## Behavior
Analyzes work requirements, calculates complexity score, selects optimal PRB template (nano/tiny/medium/large/mega), and generates a comprehensive execution blueprint that replaces traditional workflows.

## Usage
`/icc-create-prb <description> [type] [template] [priority]`

**Arguments:**
- `description` - Work description (required)
- `type` - Optional: feature, bug, task, enhancement (default: task)
- `template` - Optional: auto, nano, tiny, medium, large, mega (default: auto)
- `priority` - Optional: P1, P2, P3 (default: P2)

**Examples:**
```
/icc-create-prb "Add OAuth2 authentication"
/icc-create-prb "Fix login bug" bug
/icc-create-prb "Refactor auth service" task medium P1
```

## Core Actions
1. **Parse Requirements**: Extract work type and description
2. **Analyze Complexity**: Calculate score based on scope, files, integration
3. **Select Template**: Choose optimal PRB template (or use override)
4. **Generate PRB**: Create comprehensive blueprint with all context
5. **Handle Decomposition**: For large/mega PRBs, auto-generate sub-PRBs
6. **Store PRB**: Save to configured PRB path (default: prbs/active/)
7. **Trigger Execution**: Launch appropriate execution pattern
8. **Return ID**: Provide PRB ID for tracking

## Complexity Analysis
**Scoring Factors:**
- Files affected (1 file=1pt, 2-5=3pts, 6-20=5pts, 20+=10pts)
- Code volume (<10 lines=1pt, <50=2pts, <200=4pts, 200+=8pts)
- External APIs (3pts each)
- Database changes (4pts)
- Security implications (5pts)
- Multi-role coordination (3pts)
- Specialist required (4pts)

**Template Selection:**
- **Nano** (0-2pts): Trivial one-line changes
- **Tiny** (3-5pts): Simple single-file changes
- **Medium** (6-15pts): Standard features, replaces Inner Workflow
- **Large** (16-30pts): Complex features with sub-PRBs
- **Mega** (30+pts): System-wide architectural changes

## Template Override
- `auto`: System selects based on complexity (default)
- `nano`: Force nano template for ultra-simple tasks
- `tiny`: Force tiny template for simple tasks
- `medium`: Force medium template
- `large`: Force large template with decomposition
- `mega`: Force mega template for system changes

## Integration Points
- **Replaces Inner Workflow**: PRBs contain all context for direct execution
- **Works with Outer Workflow**: Large PRBs integrate with story/epic flow
- **Memory Integration**: Pre-searches patterns, captures learnings
- **Git Integration**: Includes all git operations in blueprint

## Examples
```bash
# Simple fix - auto-selects Nano PRB
/icc-create-prb "task | Fix typo in README"
> Generated: NANO-001-fix-typo.yaml

# Feature - auto-selects Medium PRB  
/icc-create-prb "feature | Add user profile endpoint"
> Analyzing: Multiple files, API endpoint
> Generated: MEDIUM-042-user-profile.yaml

# Complex system - auto-selects Large PRB
/icc-create-prb "feature | Complete authentication system | auto | P0"
> Analyzing: Security critical, multi-component
> Generated: LARGE-003-auth-system.yaml
> Sub-PRBs: MEDIUM-043, MEDIUM-044, TINY-017

# Force specific template
/icc-create-prb "task | Refactor service | large"
> Override: Using Large template
> Generated: LARGE-004-refactor-service.yaml
```

## Error Handling
- **INVALID_TYPE**: "❌ Error: Type must be feature/bug/task/optimization"
- **PARSE_ERROR**: "❌ Error: Cannot parse requirements. Use: type | description"
- **COMPLEXITY_FAIL**: "❌ Error: Unable to analyze complexity. Provide more details"
- **TEMPLATE_ERROR**: "❌ Error: Invalid template override. Use: auto/nano/tiny/medium/large/mega"
- **DECOMPOSE_FAIL**: "⚠️ Warning: Auto-decomposition failed. Manual sub-PRBs required"

## Success Response
```yaml
prb_created:
  id: "MEDIUM-042"
  template: "medium"
  complexity_score: 12
  files: ["routes/users.js", "controllers/user.js"]
  execution_mode: "direct-prb"
  replaces_workflow: "inner"
  ready_for: "immediate execution"
```