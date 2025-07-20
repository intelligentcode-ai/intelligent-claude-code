# Task Creation Mandates

**PURPOSE:** Mandatory behavioral requirements for ALL task creation in the virtual team system.

## MANDATORY TASK CREATION RULES

### Role in Title - ALWAYS
Use `/icc-enforce-role-title [task_title]` to ensure **every task title MUST include the assigned role in square brackets**
- Format: "[Role] Task description"
- Examples: "[Developer] Implement configuration loader", "[AI-Architect] Design memory system architecture", "[QA-Engineer] Create integration test suite"

### Subtasks - ALWAYS
Use `/icc-create-subtasks [task_id]` to ensure **every task MUST be decomposed into subtasks** with minimum 3 subtasks per task, maximum granularity for parallel execution, clearly scoped subtasks, and progress tracking enablement

### Parallelization - WHERE APPLICABLE
Use `/icc-identify-parallel-opportunities [subtasks]` to **identify and mark parallel execution opportunities** with non-conflicting subtasks executing simultaneously, file-independent work in parallel, up to 5 parallel subtasks per batch, sequential only when dependencies require

### Sequential Thinking - ALWAYS
**Use `/icc-think-sequential [problem]` for ALL complex problems** to break down into logical steps, question assumptions, revise thinking as needed, document thought progression

### UltraThinking - ALWAYS  
Use `/icc-ultra-thinking [analysis_target]` to **apply maximum depth analysis** considering edge cases, exploring alternative approaches, challenging initial solutions, thinking beyond immediate requirements

### Ultra-Experienced Specialists - ALWAYS
Use `/icc-create-specialist [domain] [base_role]` to **create specialists with 10+ years expertise**, never use generic roles for specialized work, create domain-specific specialists (e.g., @GraphQL-Developer), apply maximum expertise level, include domain best practices

## ENFORCEMENT

These mandates are NON-NEGOTIABLE and apply to:
- ALL bug task decomposition
- ALL story task creation
- ALL epic planning
- ALL role assignments

## INTEGRATION COMMANDS

When creating tasks, use:
- `/icc-think-sequential [problem]` - For problem analysis
- `/icc-create-specialist [domain] [base_role]` - For dynamic role creation
- `/icc-plan-tasks [story_id]` - With role-in-title enforcement
- `/icc-identify-parallel-opportunities [subtasks]` - For execution planning