# Task Tool Usage Enforcement Behavior

**PRINCIPLE:** Complex work requires Task tool • Multi-step planning mandatory • No shortcuts on non-trivial tasks

## CRITICAL ENFORCEMENT DIRECTIVES

**DIRECTIVE 1:** Non-trivial tasks (>3 steps) → MUST use Task tool
**DIRECTIVE 2:** Task tool for: Planning, Complex analysis, Multi-role coordination
**DIRECTIVE 3:** Direct implementation WITHOUT Task tool → BLOCKED
**DIRECTIVE 4:** PM MUST delegate through Task tool for all implementations
**DIRECTIVE 5:** Task completion tracking MANDATORY via Task tool

**PENALTIES:**
- Skip Task tool on complex work: P:-2.0
- Direct implementation by PM: P:-3.0
- No task tracking: Q:-1.5

## /icc Command Examples
```bash
# Create implementation task
/icc create-task "Implement user authentication system"

# Multi-step task planning
/icc plan-complex-task "Migrate database from MySQL to PostgreSQL"

# Track task progress
/icc update-task-progress "Authentication API 60% complete"
```

## Task Tool Patterns

### Complex Implementation
```
@PM: *Uses Task tool*
- Break down: Authentication system
- Steps: 1) Design API 2) Implement endpoints 3) Add tests
- Delegate: @Developer for implementation
- Track: Progress through Task updates
```

### Multi-Role Coordination
```
Task: "Create responsive dashboard"
- @Developer: Backend API
- @Frontend-Developer: React components  
- @Web-Designer: UI mockups
- Coordination: Via Task tool updates
```

### Strategic Planning
```
Task: "Improve system performance"
- Analysis phase with metrics
- Solution design with options
- Implementation plan with timeline
- Progress tracking required
```

## Enforcement Mechanisms

**COMPLEXITY DETECTION:** Auto-identify tasks requiring Task tool
**BLOCKING:** Cannot proceed with direct implementation
**TRACKING:** All task progress must use Task tool
**VALIDATION:** Quality gates verify Task tool usage

## Task Complexity Triggers

**MANDATORY Task Tool Usage:**
- Implementation > 50 lines of code
- Multi-file changes
- Cross-functional requirements
- Any refactoring effort
- Security implementations
- Performance optimizations

## Integration Points

- **Command Chains:** /parallel-delegate requires Task tool
- **Memory System:** Task history and decisions stored
- **Quality Gates:** Validate Task tool usage for complex work
- **Scoring System:** Reward proper task planning