# Context Validation Patterns

**MANDATORY:** Complete context required before PRB generation. Auto-correct violations.

**PURPOSE:** Ensure all PRBs have complete, actionable context without placeholder values

## Core Validation Requirements

### System Nature Detection
**REQUIRED**: Every PRB must identify system type
- **CODE-BASED SYSTEM**: Projects with primarily code files (.js, .py, .java, .cpp, .go, etc.)
- **MARKDOWN-BASED AI-AGENTIC SYSTEM**: Projects with primarily markdown/config files
- **HYBRID SYSTEM**: Projects with both code and markdown/config

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

### Validation Errors
- **PLACEHOLDER_VALUES_DETECTED**: "❌ PRB contains placeholder values: {list}"
- **SYSTEM_NATURE_MISSING**: "❌ System nature not identified"
- **PROJECT_ROOT_INVALID**: "❌ Project root path invalid: {path}"
- **CRITICAL_FILES_MISSING**: "❌ No critical files identified for work"
- **REQUIREMENTS_VAGUE**: "❌ User requirements too vague or generic"
- **ROLE_SYSTEM_MISMATCH**: "❌ Role assignment conflicts with system nature: {role} inappropriate for {system_nature}"
- **PM_ARCHITECT_MISSING**: "❌ Role assignment requires PM + Architect collaboration documentation"
- **WRONG_DOMAIN_ARCHITECT**: "❌ Selected architect does not match work domain: {selected} vs required {domain}"

### Recovery Actions
- **AUTO-CORRECTABLE**: Gather missing context automatically
- **USER-INPUT-NEEDED**: Request clarification from user
- **SYSTEM-ERROR**: Configuration or file access issues
- **ROLE-CORRECTION**: Redirect to PM + Architect collaboration process
- **DOMAIN-REALIGNMENT**: Force selection of appropriate domain architect

## Integration Points

### With PRB Creation
- Run validation before PRB generation
- Block creation if validation fails
- Auto-gather missing context when possible

### With Template Loading
- Validate templates after context injection
- Ensure no placeholders remain
- Check all required fields populated

### With Learning System
- Store validation patterns
- Learn from successful context gathering
- Improve automation over time

## Commands

### Context Validation Commands
- `/icc-validate-context [template_path]` - Validate complete context
- `/icc-check-placeholders [template_path]` - Check for placeholder values
- `/icc-gather-context [work_request]` - Gather complete context
- `/icc-detect-system-nature [project_path]` - Detect system type
- `/icc-load-project-config [project_path]` - Load actual configuration values

---
*Context validation patterns for intelligent-claude-code system*