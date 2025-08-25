# Template Process Integration Behavior

**MANDATORY:** Integrate simplified templates with enhanced @PM process and validation tools. Ensure complete workflow reliability.

**PURPOSE:** Coordinate template improvements, process enhancements, and validation tools into unified system

## Integration Architecture

### Component Integration Map
**STORY-008 INTEGRATION FLOW:**

1. **Simplified Templates (PRB-001)**:
   - Clear step-by-step execution processes
   - Standardized placeholder patterns
   - Consistent section structures

2. **Enhanced @PM Process (PRB-002)**:
   - Complete placeholder resolution
   - Configuration extraction and embedding
   - Validation enforcement

3. **Validation Tools (PRB-003)**:
   - Comprehensive placeholder detection
   - Pre-execution validation
   - Subagent protection

### End-to-End Workflow

**COMPLETE INTEGRATION PROCESS:**

1. **Template Loading**:
   - @PM loads simplified template from src/prb-templates/
   - Template contains standardized placeholders
   - Clear execution steps and sections

2. **Placeholder Resolution**:
   - @PM extracts configuration from CLAUDE.md
   - @PM gathers project context and system nature
   - @PM replaces ALL placeholders with actual values

3. **Validation Enforcement**:
   - Automatic validation scans for remaining placeholders
   - Quality gates ensure completeness
   - Blocks execution if any placeholders remain

4. **Subagent Execution**:
   - Subagent receives self-contained PRB
   - Clear step-by-step execution process
   - No configuration dependencies

## Template-Process Alignment

### Template Standards Integration
**SIMPLIFIED TEMPLATES SUPPORT:**

**Nano Template (0-2 points)**:
- 4-step process: Knowledge → Implementation → Git Commit → Git Push
- Validated placeholders: [FROM_CONFIG], [PROJECT_ROOT], [USER_REQUEST]
- Clear execution checklist

**Tiny Template (3-5 points)**:
- 7-step process: Knowledge → Implementation → Review → Version → Documentation → Git Commit → Git Push
- Enhanced validation for single-file changes
- Version bump requirements

**Medium Template (6-15 points)**:
- 9-step process: Branch → Knowledge → Implementation → Review → Version → Documentation → Git Commit → Git Push → PR
- Multi-file coordination
- Pull request creation

### Process Enhancement Integration
**@PM PROCESS SUPPORTS:**

**Configuration Loading**:
```bash
# Extract git_privacy setting
git_privacy=$(grep -i "git_privacy" CLAUDE.md | grep -o "true\|false" | head -1)

# Extract branch_protection setting
branch_protection=$(grep -i "branch_protection" CLAUDE.md | grep -o "true\|false" | head -1)

# Extract default_branch setting
default_branch=$(grep -i "default_branch" CLAUDE.md | grep -o '[^:]*$' | tr -d ' "' | head -1)
```

**Context Gathering**:
```bash
# Get absolute project root
project_root=$(pwd)

# Determine system nature
if find . -name "*.md" -path "*/behaviors/*" | head -1 | grep -q .; then
    system_nature="MARKDOWN-BASED AI-AGENTIC SYSTEM"
else
    system_nature="CODE-BASED SYSTEM"
fi

# Get current date
current_date=$(date +%Y-%m-%d)
```

**Placeholder Resolution**:
```bash
# Replace configuration placeholders
sed -i "s/\[FROM_CONFIG\]/$git_privacy/g" "$prb_file"
sed -i "s/\[PROJECT_ROOT\]/$project_root/g" "$prb_file"
sed -i "s/\[CURRENT_DATE\]/$current_date/g" "$prb_file"
```

## Validation Integration

### Pre-Execution Validation
**VALIDATION CHECKPOINTS:**

1. **Template Validation**:
   - Verify template loaded from correct src/prb-templates/ location
   - Confirm template matches complexity requirements
   - Validate all required sections present

2. **Resolution Validation**:
   - Scan for any remaining [.*] patterns
   - Validate configuration values are actual booleans/strings
   - Confirm file paths are absolute

3. **Content Validation**:
   - Verify user requirements are actual content
   - Confirm role assignments are specific
   - Validate execution steps are complete

### Quality Gates
**MUST PASS ALL GATES:**

```bash
# Gate 1: No placeholders remain
PLACEHOLDERS=$(grep -o '\[.*\]' "$prb_file" 2>/dev/null)
[ -z "$PLACEHOLDERS" ] || { echo "❌ Placeholders detected"; exit 1; }

# Gate 2: Configuration values resolved
grep -q "git_privacy: true\|git_privacy: false" "$prb_file" || { echo "❌ git_privacy not resolved"; exit 1; }

# Gate 3: Absolute paths only
grep -q "project_root: /" "$prb_file" || { echo "❌ project_root not absolute"; exit 1; }

# Gate 4: Actual content present
grep -q "original_request: \".*\"" "$prb_file" || { echo "❌ No actual user request"; exit 1; }
```

## Subagent Execution Enhancement

### Self-Contained Execution
**SUBAGENT RECEIVES:**
- Complete PRB with all placeholders resolved
- Embedded configuration values
- Clear step-by-step execution instructions
- No external dependencies

**EXECUTION RELIABILITY:**
- No configuration file access needed
- All context embedded in PRB
- Clear error recovery instructions
- Consistent execution patterns

### Step Execution Guidance
**ENHANCED EXECUTION CLARITY:**

**Step Format**:
```
## STEP N: [ACTION_TYPE]
[action_type]:
  [specific_instructions]: "[actual_values]"
  [validation]: "[how_to_verify]"
```

**Example Step**:
```
## STEP 3: GIT COMMIT
git_commit:
  commit_message: "STORY-008-PRB-003: Create validation tools"
  privacy_filter: true
  action: "Commit changes with clean message (no AI mentions)"
```

## Integration Testing

### Template-Process Testing
**INTEGRATION TESTS:**

1. **Template Loading Test**:
   - Load each template type (nano, tiny, medium, large, mega)
   - Verify placeholders present in loaded template
   - Confirm template structure is correct

2. **Resolution Process Test**:
   - Apply @PM process to each template
   - Verify all placeholders replaced with actual values
   - Confirm no placeholders remain

3. **Validation Process Test**:
   - Run validation on resolved PRB
   - Confirm validation passes
   - Test validation catches unresolved placeholders

4. **End-to-End Test**:
   - Complete workflow from template to execution
   - Verify subagent can execute without issues
   - Confirm no configuration dependencies

### Quality Assurance
**TESTING STANDARDS:**

**Template Quality**:
- All templates have consistent structure
- All placeholders follow standard patterns
- All execution steps are clear and actionable

**Process Quality**:
- @PM process handles all template types
- Configuration extraction works reliably
- Placeholder resolution is complete

**Validation Quality**:
- Validation catches all placeholder types
- Error messages are clear and actionable
- Quality gates prevent incomplete PRBs

## Documentation Integration

### Complete Workflow Documentation
**COMPREHENSIVE DOCS:**

1. **Template Usage Guide**:
   - How to select appropriate template
   - Placeholder patterns and meanings
   - Execution step explanations

2. **@PM Process Guide**:
   - Step-by-step resolution instructions
   - Configuration extraction examples
   - Troubleshooting common issues

3. **Validation Guide**:
   - Validation categories and checks
   - Error messages and resolution
   - Quality gate requirements

### Integration Examples
**REAL WORKFLOW EXAMPLES:**

**Tiny PRB Example**:
1. User request: "Fix authentication bug"
2. @PM loads tiny-prb-template.yaml
3. @PM resolves placeholders with project context
4. Validation confirms no placeholders remain
5. Subagent executes 7-step process
6. Clear success metrics achieved

## Memory Integration

### Pattern Storage
**INTEGRATION LEARNING STORAGE:**
- Template selection patterns
- Resolution process improvements
- Validation effectiveness metrics
- Integration success patterns

### Memory Location
`memory/template-integration/workflow-patterns.md` - Complete integration patterns

## Success Metrics

### Integration Success Indicators
- Templates and process work together seamlessly
- Validation catches all placeholder issues
- Subagents execute reliably without configuration dependencies
- End-to-end workflow is predictable and consistent

### Quality Validation
- Zero placeholder leakage to subagents
- Consistent execution across all template types
- Clear error recovery when issues occur
- Complete documentation coverage

---
*Template process integration behavior for intelligent-claude-code system*