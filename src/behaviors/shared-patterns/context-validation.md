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
| Project Overview | From CLAUDE.md | Must be extracted |
| Work Location | Boundaries from CLAUDE.md | Must be captured |
| Key Context | Implementation notes | Must be included |
| System Features | Key features/capabilities | Must be documented |

## Blocked Placeholders
- `[FROM_CONFIG]` → Load actual value
- `[PROJECT_ROOT]` → Use absolute path
- `[ALL-SETTINGS]` → Load specific values
- `[USER_REQUEST]` → Capture actual request
- `[PROJECT_OVERVIEW]` → Extract from CLAUDE.md
- `[WORK_LOCATION]` → Extract constraints from CLAUDE.md
- `[KEY_CONTEXT]` → Extract implementation notes from CLAUDE.md
- `[SYSTEM_FEATURES]` → Extract key capabilities from CLAUDE.md

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

**ALLOWED OPERATIONS:**
- Read operations from ~/.claude/ for configuration loading
- All operations within project_root/ directory
- Memory operations within ./memory/ subdirectory
- Configuration updates within project scope

**BLOCKED OPERATIONS:**  
- Write operations to ~/.claude/ during normal execution
- File operations outside project root directory
- Memory storage in ~/.claude/memory/ instead of ./memory/
- Global configuration changes without explicit user request
- Subagent working directories outside project boundaries

**BOUNDARY VALIDATION RULES:**
- **Block**: Unauthorized ~/.claude/ writes (except installation/global config)
- **Block**: Operations outside project root (except authorized ~/.claude/ reads)
- **Allow**: Operations within project boundaries
- **Allow**: Authorized ~/.claude/ read operations for configuration

**ERROR MESSAGES:**
- "Write to ~/.claude/ forbidden" for unauthorized global writes
- "Operation outside project scope" for external directory operations

### Configuration Value Loading
**REQUIRED**: All configuration values must be actual, not placeholders

**BLOCKED PLACEHOLDERS:**
- "[FROM_CONFIG]" → Load actual value from config hierarchy
- "[ALL-SETTINGS]" → Load specific configuration values
- "[PROJECT_ROOT]" → Use actual project root path
- "[USER_REQUEST]" → Use actual user requirements

**CONFIGURATION LOADING:**
- **Hierarchy**: embedded → project → user → defaults
- **Key Values**: git_privacy, branch_protection, default_branch, autonomy_level
- **Resolution**: Replace ALL placeholders with actual values
- **Validation**: Ensure no placeholder patterns remain

### Critical File Identification
**REQUIRED**: Relevant files with actual content samples

**File Reference Structure:**

**Critical Files Format:**
- **Path:** Absolute path to file
- **Purpose:** Specific purpose for this work
- **Sample:** Actual content from file (first 200 chars)
- **Relevance:** Why this file matters for the work

**FILE DISCOVERY:**
- Analyze work request for relevant file types/patterns
- Search project for matching files
- Sample content from relevant files (first 200 chars)
- Document file purpose and work relevance

### User Requirements Capture
**REQUIRED**: Clear, specific user requirements

**Requirements Structure:**

**User Requirements Format:**
- **Original Request:** Exact user words/request
- **Work Type:** implementation/fix/enhancement/refactor
- **Success Criteria:** Specific success criteria list
- **Clarifications:** Any assumptions or clarifications
- **Scope Limits:** What is NOT included

### CLAUDE.md Context Extraction
**REQUIRED**: Project context from CLAUDE.md file

**CLAUDE.md PARSING:**
- **Project Overview**: Parse "## Project Overview" section for system description
- **Work Location**: Extract work guidance, constraints, and boundaries
- **Implementation Notes**: Key patterns and requirements
- **System Nature**: Determine AI-AGENTIC, CODE-BASED, or HYBRID
- **Constraints**: Project-specific limitations and guidelines

**VALIDATION REQUIREMENTS:**
- CLAUDE.md exists in project root
- All relevant sections extracted
- No placeholder patterns in extracted content
- Complete context captured (overview, location, key context, features)

### Project Scope Boundary Validation
**REQUIRED**: Enhanced validation of project scope boundaries and work constraints

**Project Scope Validation Rules:**
- **Work Location Enforcement**: All work must stay within defined project boundaries
- **System Context Validation**: Work must align with identified system nature (AI-AGENTIC vs CODE-BASED)
- **Feature Scope Compliance**: Work must align with documented system features and capabilities
- **Implementation Constraints**: Work must respect documented implementation constraints

**PROJECT SCOPE VALIDATION:**
- **Work Boundaries**: Align with CLAUDE.md documented scope
- **System Alignment**: Work type matches system nature (AI-AGENTIC vs CODE-BASED)
- **Feature Compatibility**: Work maintains/enhances documented features
- **Constraint Compliance**: Respect project limitations and guidelines

**SCOPE VIOLATIONS:**
- **SCOPE_BOUNDARY_VIOLATION**: Work beyond project boundaries
- **SYSTEM_NATURE_MISMATCH**: Work conflicts with system nature
- **FEATURE_SCOPE_CONFLICT**: Work conflicts with system features
- **CONSTRAINT_VIOLATION**: Work violates implementation constraints

## Validation Logic

### Placeholder Detection
**SCAN FOR**:
- Text patterns: "[FROM_CONFIG]", "[ALL-SETTINGS]", "[PROJECT_ROOT]"
- Generic patterns: "[DESCRIPTION]", "[REQUIREMENT_1]", "[FILE_PATH]"
- Template patterns: "[AUTO]", "[PRIORITY_LEVEL]", "[ROLE]"

**VALIDATION PROCESS**:
- Load template content and scan for "[...]" patterns
- Validate each pattern replaced with actual values
- Block creation if any placeholders remain

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

## Integration

**AUTOMATIC VALIDATION:**
Context validation integrated into PRB creation pipeline - ensures complete context before generation.

---
*Context validation patterns for intelligent-claude-code system*