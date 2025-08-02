# Executable PRB-Based Workflow

**MANDATORY:** Use PRB (Product Requirement Blueprint) system for all task execution.

**Purpose:** Simplified workflow using self-contained PRBs that replace complex Inner Workflow with direct execution.

## Core Principle: PRB = Complete Execution Context

Every task becomes a PRB containing all context, validation, and execution instructions for single-pass success.

**CRITICAL:** PRBs eliminate workflow interruptions by providing everything upfront.

## Directory Structure
```
project-root/
├── .claude/
│   ├── CLAUDE.md             # Project context loaded ONCE by parent
│   ├── config.md
│   └── prbs/                 # PRB storage
│       ├── active/           # Current PRBs
│       ├── completed/        # Finished PRBs
│       └── archived/         # Historical PRBs
├── epics/
│   └── EPIC-001/
│       ├── epic.yaml
│       ├── stories/
│       └── bugs/
```

## PRB Complexity Tiers

### Automatic Template Selection
```
Complexity Score → Template Selection:
- 0-2 points    → Nano PRB (trivial changes)
- 3-5 points    → Tiny PRB (simple tasks)
- 6-15 points   → Medium PRB (standard features)
- 16-30 points  → Large PRB (complex features)
- 30+ points    → Mega PRB (system changes)
```

## Simplified Workflow (PRB-Based)

### Outer Workflow (Story/Bug Level) - UPDATED

1. **PM Planning with Configuration Loading**
   - Load CLAUDE.md and all settings ONCE
   - Analyze story/bug requirements
   - Pass context to all subsequent operations

2. **Architect Triage**
   - Review technical approach
   - Validate complexity assessment
   - Approve PRB generation strategy

3. **PRB Generation** (Replaces Task Creation)
   - Analyze each task's complexity
   - Select appropriate PRB template
   - Generate self-contained PRBs
   - Pre-assign SME reviewers in PRBs
   - **NO INNER WORKFLOW NEEDED**

4. **Git Branch Setup**
   - Create feature/STORY-XXX branch
   - Apply git settings from parent

5. **Parallel PRB Execution**
   - Execute up to 5 PRBs simultaneously
   - Each PRB contains complete context
   - Direct execution, no workflow phases

6. **Merge Request Decision**
   - Parent asks user directly
   - "Would you like me to create a merge request?"

7. **Story Retrospective**
   - Capture patterns from PRB executions
   - Store learnings for future use

### Inner Workflow - DEPRECATED

**STATUS: REPLACED BY PRB DIRECT EXECUTION**

The 8-step Inner Workflow is now obsolete. PRBs contain:
- Pre-searched memory patterns
- Explicit execution steps
- Validation criteria
- SME reviewer assignment
- Git operations
- Learning capture instructions

## PRB Execution Pattern

```xml
<invoke name="Task">
  <parameter name="description">[Role] Execute PRB-XXX</parameter>
  <parameter name="prompt">Execute Product Requirement Blueprint PRB-XXX.
  
  PRB Content: [Complete PRB with all context, steps, validation]
  
  This PRB contains everything needed for single-pass execution:
  - Memory patterns to apply
  - Specific implementation steps
  - Validation criteria
  - Git operations to perform
  - Learning to capture
  
  Execute directly without workflow phases.</parameter>
</invoke>
```

## Complexity Analysis

### Scoring Algorithm
```python
def calculate_complexity(work):
    score = 0
    score += file_impact_score(work.files_affected)
    score += code_volume_score(work.estimated_lines)
    score += integration_score(work.external_apis, work.database_changes)
    score += security_score(work.security_implications)
    score += coordination_score(work.roles_required)
    return score
```

## PRB Templates Overview

### Nano PRB (Trivial)
```yaml
id: NANO-001
action: "Fix typo in README"
file: "README.md"
validation: "Spell check passes"
# Direct execution, no workflow
```

### Tiny PRB (Simple)
```yaml
id: TINY-001
title: "[Developer] Add validation"
execution:
  steps: ["Add regex", "Test validation"]
validation: ["Input validated correctly"]
# Bypasses workflow complexity
```

### Medium PRB (Standard)
```yaml
id: MEDIUM-001
title: "[Backend-Developer] Create API endpoint"
memory_consultation: {...}
execution_plan: {...}
validation_criteria: {...}
sme_review: {...}
git_operations: {...}
# Replaces entire Inner Workflow
```

### Large PRB (Complex)
```yaml
id: LARGE-001
title: "Authentication System"
sub_prbs: [MEDIUM-001, MEDIUM-002, TINY-001]
execution_strategy: {...}
validation_gates: {...}
# Manages sub-PRB orchestration
```

## Benefits Over Legacy Workflows

1. **No Workflow Interruptions**: Single-pass execution
2. **Complete Context**: Everything in one place
3. **Adaptive Complexity**: Right-sized process for each task
4. **Direct Execution**: No 8-step Inner Workflow
5. **Reliable Completion**: Self-contained success

## Migration from Legacy

### Old Pattern (Inner Workflow)
```
Task → Memory Search → Generate Steps → Execute → Review → Version → Git → Complete → Learn
        ↓ FAILS: Context lost between steps
```

### New Pattern (PRB)
```
Task → Generate PRB (contains everything) → Direct Execution → Done
        ↓ SUCCESS: Complete context, single pass
```

## Commands

- `/icc-create-prb` - Create PRB with auto-complexity analysis
- `/icc-analyze-complexity` - Preview complexity before PRB creation
- `/icc-execute-prb [PRB-ID]` - Direct PRB execution

## L3 Autonomous Operation

In L3 mode, system automatically:
1. Detects work requirements
2. Analyzes complexity
3. Generates appropriate PRBs
4. Executes PRBs in parallel
5. Continues until all work complete

No workflow interruptions or manual intervention needed.

---
*PRB-based execution - Replacing complex workflows with intelligent, self-contained blueprints*