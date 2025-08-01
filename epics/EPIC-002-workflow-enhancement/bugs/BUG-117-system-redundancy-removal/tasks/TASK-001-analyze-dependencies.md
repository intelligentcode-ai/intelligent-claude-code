# TASK-001: [AI-Architect] Analyze dependencies before removal

## Status: IN_PROGRESS
## Priority: blocking
## Assigned: @AI-Architect

## Description
Map all dependencies between behaviors, commands, and shared patterns to ensure safe removal.

## Subtasks
1. Map which behaviors import which commands
2. Identify circular dependencies or tight coupling  
3. Document which functionality must be preserved

## Analysis Results

### 1. BEHAVIORS TO ANALYZE (13 files)

**Core Behaviors:**
- autonomy-controller.md - Controls L1/L2/L3 modes
- config-loader.md - Loads configuration hierarchy
- lean-workflow-executor.md - IMPORTS executable-workflow.md
- learning-team-automation.md - Error forgiveness patterns
- l3-continuous-engine.md - L3 autonomous execution
- pm-command-system.md - PM-specific commands
- role-assignment-validator.md - >70% capability matching
- role-management.md - Role switching patterns
- task-creation-mandates.md - Role-in-title enforcement
- workflow-coordination.md - Task queue management

**New Workflow Files (added during BUG-115):**
- workflow-auto-correction-design.md
- workflow-enforcement-patterns.md
- workflow-executor-simple.md
- workflow-integration-strategy.md

### 2. SHARED PATTERNS TO ANALYZE (5 files)
- configuration-patterns.md - Settings hierarchy
- l3-autonomy-patterns.md - L3 mode patterns
- learning-patterns.md - Learning storage
- organization-patterns.md - File organization
- validation-enforcement-patterns.md - Auto-correction

### 3. COMMANDS TO ANALYZE (66 files)
Too many to list - need systematic analysis

## CRITICAL FINDINGS

**Workflow Duplication:**
- lean-workflow-executor.md NOW JUST IMPORTS executable-workflow.md
- workflow-coordination.md duplicates priority logic in workflow
- 4 new workflow files created during BUG-115 are likely redundant

**Key Dependencies:**
- role-management.md imports l3-autonomy-patterns.md
- Multiple behaviors import shared patterns
- Commands referenced in behaviors but workflow handles most

## NEXT STEPS
Continue with TASK-002 to start removing redundant commands.