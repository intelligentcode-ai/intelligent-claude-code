# Project Context Loader

**PURPOSE:** Enforce PROJECT-CONTEXT.md loading as first action in every work session

## Core Behavioral Rules

### Context-First Enforcement
**MANDATORY:** No work begins without PROJECT-CONTEXT.md loaded
- Block ALL actions until context loaded
- Check memory for existing context first
- Reload if session boundary detected
- Force load on ANY project work start

### Session Detection
**New Session Indicators:**
- No "ProjectContext" entity in memory
- Different project path than stored
- Explicit refresh requested
- Context older than 24 hours

### Loading Sequence
1. **Memory Check:** Search for "ProjectContext" entity
2. **Validation:** Verify context matches current project
3. **Load/Reload:** Read PROJECT-CONTEXT.md if needed
4. **Store:** Create/update memory entity
5. **Activate:** Enable work to proceed

## Behavioral Patterns

### Work Session Start
**Pattern:** ANY work request → Check context → Block if missing → Load → Proceed
```
User: "Create a new feature"
System: [BLOCKED] Loading PROJECT-CONTEXT.md first...
System: Context loaded. Now proceeding with feature creation.
```

### Context Validation
**Fresh Context Required When:**
- First interaction in project
- Project path changes
- Explicit context refresh
- Memory entity missing
- Context age > 24 hours

### Memory Integration
**Entity Structure:**
```
Entity: ProjectContext
Type: ProjectConfiguration
Observations:
- project_path: /path/to/project
- loaded_at: timestamp
- project_type: [detected type]
- key_patterns: [extracted patterns]
- constraints: [project constraints]
```

## Integration Points

### System Initialization
**Hook:** Before ANY command execution
- Check context status
- Load if missing
- Update if stale
- Proceed only after loaded

### Command Interception
**ALL Commands Check Context:**
- Story creation → Context required
- Task execution → Context required
- Bug fixes → Context required
- Architecture decisions → Context required

### Role Activation
**Roles Cannot Activate Without Context:**
- @PM → Needs project understanding
- @Developer → Needs coding standards
- @Architect → Needs architecture patterns
- ALL ROLES → Context mandatory

## Blocking Behaviors

### Hard Blocks (No Bypass)
- Feature implementation without context
- Architecture decisions without context
- Breaking changes without context
- New file creation without context

### Soft Blocks (Warning Only)
- Documentation updates
- Minor typo fixes
- Comment additions
- Formatting changes

## Context Loading Process

### File Discovery
**Search Order:**
1. `./PROJECT-CONTEXT.md` (project root)
2. `./docs/PROJECT-CONTEXT.md`
3. `./.claude/PROJECT-CONTEXT.md`
4. User-specified path

### Content Extraction
**Key Sections to Parse:**
- Project type and technology
- Architecture patterns
- Coding standards
- Team conventions
- Constraints and requirements

### Validation Rules
**Valid Context Must Have:**
- Project identification
- Technology stack OR type
- At least one constraint/pattern
- Readable format

## Error Handling

### Missing Context
**Response:** "PROJECT-CONTEXT.md not found. Please create one with project details, patterns, and constraints."

### Invalid Context
**Response:** "PROJECT-CONTEXT.md exists but lacks required information. Please update with project type, patterns, and constraints."

### Load Failures
**Fallback:** Request user guidance on project type and constraints

## Behavioral Integration

### With Lean Workflow Executor
- Context loads BEFORE workflow initialization
- Workflow respects context constraints
- Validation includes context compliance

### With Role System
- Roles receive context on activation
- Context shapes role behavior
- Specialists align to project patterns

### With Learning System
- Context violations become learnings
- Patterns extracted to enhance context
- Context evolves with project

## Benefits

✅ **Consistent Behavior** - Every session starts with full context
✅ **Error Prevention** - No blind actions without understanding
✅ **Pattern Compliance** - Work aligns with project standards
✅ **Quality Improvement** - Context-aware decisions
✅ **Team Alignment** - Shared understanding across all roles

## Usage Examples

### Automatic Loading
```
User: "Implement user authentication"
System: Checking project context...
System: Loading PROJECT-CONTEXT.md...
System: Context loaded: Web application, React/Node.js, JWT auth pattern
System: Proceeding with authentication implementation aligned to project patterns.
```

### Forced Reload
```
User: "@PM refresh context"
System: Reloading PROJECT-CONTEXT.md...
System: Context updated with latest patterns and constraints.
```

### Context Validation
```
User: "Add new API endpoint"
System: Validating against project context...
System: Context requires RESTful patterns and OpenAPI documentation.
System: Proceeding with compliant implementation.
```

---
**ENFORCEMENT:** No work without context • First action always • Pattern compliance mandatory