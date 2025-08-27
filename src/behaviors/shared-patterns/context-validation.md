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

### Configuration Value Loading
**REQUIRED**: All configuration values must be actual, not placeholders

**BLOCKED PLACEHOLDERS:**
- "[FROM_CONFIG]" → Load actual value from config hierarchy
- "[ALL-SETTINGS]" → Load specific configuration values
- "[PROJECT_ROOT]" → Use actual project root path
- "[USER_REQUEST]" → Use actual user requirements

### Critical File Identification
**REQUIRED**: Relevant files with actual content samples

**File Reference Structure:**

**Critical Files Format:**
- **Path:** Absolute path to file
- **Purpose:** Specific purpose for this work
- **Sample:** Actual content from file (first 200 chars)
- **Relevance:** Why this file matters for the work

### User Requirements Capture
**REQUIRED**: Clear, specific user requirements

**User Requirements Format:**
- **Original Request:** Exact user words/request
- **Work Type:** implementation/fix/enhancement/refactor
- **Success Criteria:** Specific success criteria list
- **Clarifications:** Any assumptions or clarifications
- **Scope Limits:** What is NOT included

## Validation Logic

### Placeholder Detection
**SCAN FOR**:
- Text patterns: "[FROM_CONFIG]", "[ALL-SETTINGS]", "[PROJECT_ROOT]"
- Generic patterns: "[DESCRIPTION]", "[REQUIREMENT_1]", "[FILE_PATH]"
- Template patterns: "[AUTO]", "[PRIORITY_LEVEL]", "[ROLE]"

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

## Context Evaluation Functions for PRB Triggering

### Intent Clarity Assessment
**CONTEXT EVALUATION PROCESS:**
1. **Language Pattern Analysis:** Scan for definitive vs exploratory language
2. **Request Specificity Check:** Assess how concrete vs abstract the request is
3. **Conversation Continuity:** Evaluate if request builds on previous discussion
4. **Urgency Indicators:** Detect immediate action vs future planning language

**CLARITY SCORING FACTORS:**
- **High Clarity:** Specific deliverables, clear scope, definitive language
- **Medium Clarity:** Some specifics but missing key details or mixed signals
- **Low Clarity:** Abstract concepts, exploratory language, open-ended questions

### Conversation History Analysis
**CONTEXT INTELLIGENCE FUNCTIONS:**
- **Track Conversation Flow:** Monitor progression from question → discussion → decision → action
- **Identify Pattern Shifts:** Detect when conversation moves from exploration to work assignment
- **Assess Follow-up Context:** Determine if current request continues previous thread
- **Evaluate Intent Evolution:** Track how user intent has developed through conversation

### Smart Escalation Decision Matrix
**CONTEXT-DRIVEN DECISIONS:**
- **Clear Work Intent + High Context Clarity** → Immediate PRB generation
- **Query Pattern + Any Context Level** → Direct conversational response
- **Mixed Signals + Low Clarity** → Clarification dialogue: "Are you asking me to implement this or explain it?"
- **Ambiguous Intent + Conversation History** → Use history to inform decision
- **Educational Patterns + @Role Mention** → Natural conversation flow without PRB

### Context Validation for Triggering
**PRB TRIGGERING VALIDATION:**
- **Intent Confidence:** Must exceed 80% confidence threshold for work patterns
- **Context Completeness:** All required context elements identified before PRB creation
- **Conversation Coherence:** Ensure PRB generation aligns with conversation flow
- **Ambiguity Resolution:** Force clarification before PRB for unclear intents

## Error Handling
- `PLACEHOLDER_DETECTED`: "❌ Contains: {list}"
- `SYSTEM_NATURE_MISSING`: "❌ Not identified"
- `PROJECT_ROOT_INVALID`: "❌ Invalid: {path}"
- `REQUIREMENTS_VAGUE`: "❌ Too generic"
- `CONTEXT_UNCLEAR`: "❌ Intent unclear - need clarification before PRB"
- `CONVERSATION_MISMATCH`: "❌ Request doesn't align with conversation context"

---
*Context validation patterns for intelligent-claude-code system*