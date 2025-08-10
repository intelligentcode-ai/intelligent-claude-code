# Enforcement Rules

**PURPOSE:** Shared enforcement patterns and validation functions

## Task Scope Validation

```
ValidateTaskScope(task_context):
  project_root = get_project_root()
  
  # Check working directory
  IF task_context.working_directory.startswith("~/.claude/"):
    BLOCK_TASK()
    ERROR("❌ Cannot use ~/.claude/ as working directory")
  
  # Check file operations
  FOR each file_path IN task_context.files:
    IF file_path.startswith("~/.claude/") AND NOT installation:
      BLOCK_TASK()
      ERROR("❌ Task references forbidden ~/.claude/ path")
  
  RETURN VALIDATION_PASSED
```

## Role System Enforcement

### Role-System Alignment
| System Type | Valid Roles | Invalid Roles |
|-------------|------------|---------------|
| AI-AGENTIC | @AI-Engineer, @PM | @Database-Engineer for behaviors |
| CODE-BASED | @Developer, @Backend-Tester | @AI-Engineer for code impl |
| HYBRID | Joint assessment required | Single role decision |

### PM+Architect Collaboration
1. PM analyzes requirements
2. PM selects domain architect
3. Joint role assignment
4. Document rationale in PRB
5. Validate >70% capability match

## Detection Functions

### Work Pattern Detection
```
DetectWorkPattern(text):
  patterns = [
    r'@\w+[-\w]*',  # @Role patterns
    r'(STORY|BUG|EPIC|TASK|PRB)-\d{3}',  # Work items
    r'implement|fix|create|update|modify'  # Action verbs
  ]
  
  FOR pattern IN patterns:
    IF match(pattern, text):
      RETURN REQUIRES_PRB
```

### False Completion Detection
```
DetectFalseCompletion(claim):
  triggers = [
    "PRB COMPLETE", "Task finished", 
    "Work done", "Completed"
  ]
  
  IF any(trigger IN claim):
    IF NOT ValidateChecklist():
      BLOCK_COMPLETION()
```

## Error Messages

### Standard Errors
- `TASK_TOOL_REQUIRED`: "❌ PRB execution requires Task tool subagent"
- `CREATION_BLOCKED`: "❌ Work items must be created by main agent"
- `ROLE_MISMATCH`: "❌ Role {role} invalid for {system_type}"
- `SCOPE_VIOLATION`: "❌ Operation outside project boundaries"
- `INCOMPLETE_PRB`: "❌ PRB missing required sections"

### Recovery Actions
| Error | Recovery |
|-------|----------|
| Missing PRB | Auto-generate with correct template |
| Wrong context | Redirect to appropriate context |
| Role mismatch | Trigger PM+Architect process |
| Scope violation | Constrain to project root |

---
*Shared enforcement patterns extracted from prb-enforcement.md*