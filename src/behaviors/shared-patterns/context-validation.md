# Context Validation

**MANDATORY:** Complete context before PRB generation.

## Required Context

| Element | Requirement | Validation |
|---------|------------|------------|
| System Nature | CODE/AI-AGENTIC/HYBRID | Must be identified |
| Project Root | Absolute path | Must exist |
| Configuration | Actual values | No placeholders |
| Critical Files | With samples | Must be relevant |
| User Requirements | Clear intent | Specific criteria |

## Blocked Placeholders
- `[FROM_CONFIG]` → Load actual value
- `[PROJECT_ROOT]` → Use absolute path
- `[ALL-SETTINGS]` → Load specific values
- `[USER_REQUEST]` → Capture actual request

**Detection Logic:**
1. Scan project root and subdirectories
2. Count file types: code vs markdown/config
3. Determine primary type based on majority
4. Store as complete_context.system_nature

### Project Root Identification
**REQUIRED**: Absolute path to project root
- Must be absolute path (starts with /)
- Must exist and be accessible
- Should contain CLAUDE.md or .git directory
- Used for all relative path resolution
- **Project Boundary Enforcement**: All operations constrained to project root and subdirectories

### Project Boundary Validation
**REQUIRED**: All file operations must respect project boundaries
- **ALLOWED SCOPE**: Only operations within project root directory and subdirectories
- **BLOCKED SCOPE**: Write operations to ~/.claude/ during normal execution
- **EXCEPTION SCOPE**: ~/.claude/ read operations for configuration loading
- **INSTALLATION SCOPE**: ~/.claude/ write operations only during installation or explicit global config changes

**Project Boundary Rules:**
```markdown
ALLOWED OPERATIONS:
☐ Read operations from ~/.claude/ for configuration loading
☐ All operations within project_root/ directory
☐ Memory operations within ./memory/ subdirectory
☐ Configuration updates within project scope

BLOCKED OPERATIONS:  
☐ Write operations to ~/.claude/ during normal execution
☐ File operations outside project root directory
☐ Memory storage in ~/.claude/memory/ instead of ./memory/
☐ Global configuration changes without explicit user request
☐ Task tool working directories outside project boundaries
```

**Boundary Validation Process:**

**Steps to Validate Project Boundaries:**
1. **Check Each File Operation:** Review all planned file operations in the work context
2. **Block Unauthorized ~/.claude/ Writes:** 
   - If operation is writing to ~/.claude/ directory
   - AND operation is not installation or explicit global config
   - THEN block the operation and show error: "Write to ~/.claude/ forbidden"
3. **Block External Directory Operations:**
   - If operation path is outside project root AND not ~/.claude/ directory
   - THEN block the operation and show error: "Operation outside project scope"
4. **Allow Valid Operations:** Operations within project boundaries or authorized ~/.claude/ access proceed normally

### Configuration Value Loading
**REQUIRED**: All configuration values must be actual, not placeholders

**BLOCKED PLACEHOLDERS:**
- "[FROM_CONFIG]" → Load actual value from config hierarchy
- "[ALL-SETTINGS]" → Load specific configuration values
- "[PROJECT_ROOT]" → Use actual project root path
- "[USER_REQUEST]" → Use actual user requirements

**Configuration Loading Process:**
1. Load config hierarchy: embedded → project → user → defaults
2. Extract specific values: git_privacy, branch_protection, default_branch, autonomy_level
3. Replace ALL placeholder values with actual values
4. Validate no placeholders remain

### Critical File Identification
**REQUIRED**: Relevant files with actual content samples

**File Reference Structure:**
```yaml
critical_files:
  - path: "/absolute/path/to/file"
    purpose: "specific purpose for this work"
    sample: "actual content from file (first 200 chars)"
    relevance: "why this file matters for the work"
```

**File Discovery Process:**
1. Analyze work request for file types/patterns needed
2. Search project for matching files
3. Sample content from each relevant file
4. Document purpose and relevance

### User Requirements Capture
**REQUIRED**: Clear, specific user requirements

**Requirements Structure:**
```yaml
user_requirements:
  original_request: "exact user words/request"
  work_type: "implementation/fix/enhancement/refactor"
  success_criteria: ["specific success criteria"]
  clarifications: ["any assumptions or clarifications"]
  scope_limits: ["what is NOT included"]
```

## Validation Logic

### Placeholder Detection
**SCAN FOR**:
- Text patterns: "[FROM_CONFIG]", "[ALL-SETTINGS]", "[PROJECT_ROOT]"
- Generic patterns: "[DESCRIPTION]", "[REQUIREMENT_1]", "[FILE_PATH]"
- Template patterns: "[AUTO]", "[PRIORITY_LEVEL]", "[ROLE]"

**VALIDATION PROCESS**:
1. Load template content
2. Search for all "[...]" patterns
3. Validate each pattern has been replaced with actual values
4. Block if any placeholders remain

### System Nature Validation
**CHECK**:
- system_nature field exists
- Value is one of: "CODE-BASED SYSTEM", "MARKDOWN-BASED AI-AGENTIC SYSTEM", "HYBRID SYSTEM"
- Value is not placeholder or generic

### Project Root Validation
**CHECK**:
- project_root field exists
- Path is absolute (starts with /)
- Path exists and is accessible
- Path contains expected project markers

### File References Validation
**CHECK**:
- critical_files array exists and not empty
- Each file has absolute path
- Each file exists and is accessible
- Each file has actual content sample
- Purpose and relevance documented

### Requirements Validation
**CHECK**:
- user_requirements structure exists
- original_request is specific, not generic
- success_criteria are measurable
- work_type is identified

### Role Appropriateness Validation
**CHECK FOR SYSTEM NATURE ALIGNMENT**:
- Validate role assignments align with system_nature
- **AI-AGENTIC SYSTEMS**: Behavioral patterns, memory operations, PRB enforcement → @AI-Engineer (NOT @Security-Engineer, @Database-Engineer, @DevOps-Engineer)
- **CODE-BASED SYSTEMS**: Implementation, testing, deployment → @Developer, @Backend-Tester, @DevOps-Engineer
- **HYBRID SYSTEMS**: Mixed assignments with joint architect assessment
- **BLOCK**: Role assignments that conflict with detected system nature
- **ENFORCE**: PM + Architect collaboration for role selection

## Error Handling
- `PLACEHOLDER_DETECTED`: "❌ Contains: {list}"
- `SYSTEM_NATURE_MISSING`: "❌ Not identified"
- `PROJECT_ROOT_INVALID`: "❌ Invalid: {path}"
- `REQUIREMENTS_VAGUE`: "❌ Too generic"

## Commands
- `/icc-validate-context [template]`
- `/icc-gather-context [request]`
- `/icc-detect-system-nature`

---
*Optimized: 210→~40 lines*