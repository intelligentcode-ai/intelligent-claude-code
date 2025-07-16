# BUG-003: Role Assignment Validation Integration

## Problem Statement
The lean workflow executor has NO role assignment validation, leading to:
- Wrong specialists being assigned (e.g., @System-Engineer for AI work)
- Generic roles used when specialists exist
- No capability matching validation
- Missing architect approval for technical decisions

## Solution Design

### 1. Validation Command Chain Architecture

The solution introduces a mandatory 4-step validation chain that blocks invalid assignments:

```
icc:detect-work-type → icc:require-triage → icc:validate-assignments → icc:require-approval
```

Each step can block execution with a clear reason, preventing bad assignments from proceeding.

### 2. AI-Agentic Work Detection

Special detection patterns for AI/behavioral work:
- Keywords: AI, ML, agentic, behavioral, automation
- File patterns: behaviors/*.md, modes/*.md, commands/*.md
- Content patterns: pseudo-code, command chains, validation rules
- **Result**: Forces @AI-Architect involvement, not generic @Architect

### 3. Capability Matching System

Enforces >70% capability match between role and task:
- Extracts task requirements from content
- Calculates match score with role capabilities
- Blocks assignments below threshold
- Suggests better-matched roles

### 4. Architect Approval Workflow

Mandatory PM + Specialist Architect collaboration:
- Joint triage validates work necessity
- Technical approach must be approved
- Prevents solo decisions on architecture
- Creates audit trail of approvals

## Integration Points

### Primary Integration: lean-workflow-executor.md

At line 103, replace the existing `assign_role` function with:

```yaml
function: assign_role(task, required_capabilities)
  validation_chain:
    - icc:detect-work-type(task.content) → specialist_architect_type
    - icc:require-triage(@PM, @specialist_architect) → triage_complete
    - icc:validate-assignments(tasks) → capability_match_check
    - icc:require-approval(@PM, @specialist_architect) → approval_status
  logic:
    - Calculate capability match (must be >70%)
    - Enforce specialist preference (@AI-Architect not @Architect)
    - Block generic roles when specialists exist
    - Create dynamic specialist if needed
  governance: Architect-validated assignments only
```

### Secondary Integration: Story Planning

Update the story planning workflow (line 182) to include validation:

```
3. **VALIDATION CHAIN EXECUTION:**
   - icc:detect-work-type(story.content) → specialist_architect
   - icc:require-triage(@PM, @specialist_architect) → BLOCK until complete
   - icc:validate-assignments(proposed_tasks) → capability validation
   - icc:require-approval(@PM, @specialist_architect) → BLOCK until approved
```

## Implementation Checklist

- [ ] Add `role-assignment-validator.md` to behavior imports
- [ ] Update `assign_role` function to call validation chain
- [ ] Update story planning to include validation step
- [ ] Add validation commands to command registry
- [ ] Test with AI-agentic work scenarios
- [ ] Test with generic role assignments
- [ ] Test with low capability matches
- [ ] Document validation audit trail

## Expected Outcomes

### Before (Current Problems)
- @System-Engineer assigned to AI behavioral work
- @Architect used when @AI-Architect needed
- No validation of capability match
- No architect involvement in assignments

### After (With Validation)
- AI work correctly assigned to @AI-Engineer/@AI-Architect
- Specialist roles enforced when they exist
- All assignments have >70% capability match
- Mandatory architect approval for all assignments

## Validation Examples in Action

### Example 1: Behavioral System Update
```
Task: "Update command chain patterns in behaviors/"
Current: Assigns to @System-Engineer (WRONG)
Fixed: Detects AI work → Requires @AI-Engineer with @AI-Architect approval
```

### Example 2: Architecture Design
```
Task: "Design new ML pipeline for learning system"
Current: Assigns to generic @Architect (SUBOPTIMAL)
Fixed: Enforces @AI-Architect specialist preference
```

### Example 3: Low Match Detection
```
Task: "Implement React components for dashboard"
Current: Could assign to @Backend-Developer (MISMATCH)
Fixed: Blocks with 40% match → Suggests @Frontend-Developer
```

## Minimal Disruption Approach

The validation system is designed to be:
1. **Lightweight**: Just 4 validation commands in a chain
2. **Non-intrusive**: Single integration point in workflow
3. **Clear**: Each block has specific reason
4. **Auditable**: All decisions traceable

No complex enforcement systems, monitoring loops, or penalty systems - just clear validation that prevents bad assignments.

---
*Integration guide for BUG-003 role assignment validation*