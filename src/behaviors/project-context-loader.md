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
1. **Memory Check:** Use `/icc-memory-search "ProjectContext"` to search for existing entity
2. **Validation:** Verify context matches current project path and timestamp
3. **Load/Reload:** Use `/icc-read-project-context` to read PROJECT-CONTEXT.md if needed
4. **Store:** Use `/icc-memory-store ProjectContext [context_data]` to create/update memory entity
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
**Entity Structure:** Use `/icc-memory-store ProjectContext [context_data]` to create entity:
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
- Use `/icc-check-context-status` to check context status
- Use `/icc-load-project-context` to load if missing
- Use `/icc-refresh-context` to update if stale
- Proceed only after loaded

### Command Interception
**ALL Commands Check Context:** Use `/icc-check-context-status` before execution:
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
**Search Order:** Use `/icc-find-project-context` to search:
1. `./PROJECT-CONTEXT.md` (project root)
2. `./docs/PROJECT-CONTEXT.md`
3. `./.claude/PROJECT-CONTEXT.md`
4. User-specified path

### Content Extraction
**Key Sections to Parse:** Use `/icc-parse-project-context [content]` to extract:
- Project type and technology
- Architecture patterns
- Coding standards
- Team conventions
- Constraints and requirements

### Validation Rules
**Valid Context Must Have:** Use `/icc-validate-project-context [context_data]` to verify:
- Project identification
- Technology stack OR type
- At least one constraint/pattern
- Readable format

## Auto-Creation Behaviors

### Template Generation Rules
**MANDATORY:** When PROJECT-CONTEXT.md missing → Auto-create with intelligent template
- Analyze project structure to detect type
- Generate appropriate template based on detection
- Pre-populate with discovered patterns
- Guide user through completion

### Project Type Detection
**Analysis Pattern:** Use `/icc-detect-project-type [project_path]` to identify:
1. **Web Application:** package.json, React/Angular/Vue files, API endpoints
2. **Backend Service:** API routes, database models, microservice patterns
3. **Mobile App:** React Native, Flutter, Swift/Kotlin files
4. **Library/Package:** Public APIs, npm/pypi configuration
5. **Documentation Site:** Markdown files, static site generators
6. **Data/AI Project:** Jupyter notebooks, model files, data processing
7. **DevOps/Infrastructure:** Terraform, Docker, Kubernetes configs
8. **Game/Engine:** Unity, Unreal, game-specific assets
9. **Enterprise System:** Complex business logic, multiple services
10. **Unknown/Mixed:** Generic template with common patterns

### Template Creation Process
**Sequence:** Use `/icc-create-project-template [detected_type] [project_path]` to generate:
1. **Header Section:** Project identification and purpose
2. **Technology Stack:** Detected technologies and versions
3. **Architecture Patterns:** Common patterns for project type
4. **Conventions Section:** Standard conventions with placeholders
5. **Constraints Placeholder:** Space for project-specific constraints
6. **Guidance Comments:** Instructions for completion

### Auto-Population Intelligence
**Smart Defaults Based on Detection:**
- Extract package.json dependencies for tech stack
- Detect framework patterns (React hooks, Express routes)
- Identify database connections and ORMs
- Find testing frameworks and configurations
- Discover build tools and deployment configs
- Parse CI/CD pipeline configurations

## Error Handling

### Missing Context (Enhanced)
**Auto-Creation Response:**
1. "PROJECT-CONTEXT.md not found. Analyzing project to create template..."
2. Execute project type detection
3. Generate appropriate template
4. Save to PROJECT-CONTEXT.md
5. "✅ Template created! Please review and customize with project-specific details."

### Template Customization Required
**Guidance:** "PROJECT-CONTEXT.md template created but needs customization. Please complete sections marked with [TODO] and add project-specific constraints."

### Detection Failures
**Fallback:** Create generic template with comprehensive guidance comments

### Invalid Context
**Response:** "PROJECT-CONTEXT.md exists but lacks required information. Please update with project type, patterns, and constraints."

### Load Failures
**Enhanced Fallback:** 
1. Attempt auto-creation with detection
2. If detection fails, request user guidance
3. Generate minimal template with user input

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