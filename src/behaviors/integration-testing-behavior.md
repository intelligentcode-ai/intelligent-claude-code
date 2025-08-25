# Integration Testing Behavior

**MANDATORY:** Test template and process integration to ensure reliable subagent execution. Validate complete workflow.

**PURPOSE:** Verify simplified templates work with enhanced @PM process and validation tools

## Testing Framework

### Test Categories

**1. TEMPLATE LOADING TESTS**
- Verify templates load correctly from src/prb-templates/
- Confirm all required sections present
- Validate placeholder patterns are consistent

**2. RESOLUTION PROCESS TESTS**  
- Test @PM placeholder resolution with actual values
- Verify configuration extraction from CLAUDE.md
- Confirm context gathering and embedding

**3. VALIDATION TESTS**
- Test placeholder detection after resolution
- Verify quality gates catch incomplete PRBs
- Confirm validation blocks unresolved placeholders

**4. SUBAGENT EXECUTION TESTS**
- Test subagent can execute resolved PRBs
- Verify no configuration dependencies remain
- Confirm execution steps are clear and actionable

## Template Integration Tests

### Nano Template Test
**TEST WORKFLOW:**

1. **Load Template**: Load nano-prb-template.yaml
2. **Verify Placeholders**: Confirm [FROM_CONFIG], [PROJECT_ROOT], [USER_REQUEST] present
3. **Apply @PM Process**: Extract config, gather context, resolve placeholders
4. **Validate Resolution**: Run placeholder detection, confirm none remain
5. **Test Execution**: Verify 4-step process is clear and executable

**Expected Results**:
```
✅ Template loads with standard placeholders
✅ @PM process resolves all placeholders with actual values
✅ Validation confirms zero placeholders remain
✅ 4-step execution process is clear and actionable
```

### Tiny Template Test
**TEST WORKFLOW:**

1. **Load Template**: Load tiny-prb-template.yaml  
2. **Verify Placeholders**: Confirm configuration and context placeholders
3. **Apply @PM Process**: Complete resolution with project context
4. **Validate Resolution**: Comprehensive placeholder scan
5. **Test Execution**: Verify 7-step process with version bump

**Expected Results**:
```
✅ Template loads with all required sections
✅ @PM process handles single-file change context
✅ Validation passes with no remaining placeholders
✅ 7-step execution includes version bump and documentation
```

### Medium Template Test
**TEST WORKFLOW:**

1. **Load Template**: Load medium-prb-template.yaml
2. **Verify Complexity**: Confirm multi-file coordination sections
3. **Apply @PM Process**: Handle complex context and dependencies
4. **Validate Resolution**: Ensure complete resolution for complex features
5. **Test Execution**: Verify 9-step process with PR creation

**Expected Results**:
```
✅ Template supports multi-file coordination
✅ @PM process handles complex feature context
✅ Validation ensures complete resolution
✅ 9-step execution includes branch and PR management
```

## Process Integration Tests

### Configuration Extraction Test
**TEST @PM CONFIG LOADING:**

```bash
# Test configuration extraction from CLAUDE.md
test_config_extraction() {
    # Extract git_privacy
    git_privacy=$(grep -i "git_privacy" CLAUDE.md | grep -o "true\|false" | head -1)
    [ "$git_privacy" = "true" ] || [ "$git_privacy" = "false" ] || return 1
    
    # Extract branch_protection  
    branch_protection=$(grep -i "branch_protection" CLAUDE.md | grep -o "true\|false" | head -1)
    [ "$branch_protection" = "true" ] || [ "$branch_protection" = "false" ] || return 1
    
    # Extract default_branch
    default_branch=$(grep -i "default_branch" CLAUDE.md | grep -o '[^:]*$' | tr -d ' "' | head -1)
    [ ! -z "$default_branch" ] || return 1
    
    echo "✅ Configuration extraction successful"
}
```

### Context Gathering Test  
**TEST @PM CONTEXT COLLECTION:**

```bash
# Test project context gathering
test_context_gathering() {
    # Get project root
    project_root=$(pwd)
    [[ "$project_root" =~ ^/.* ]] || return 1
    
    # Determine system nature
    if find . -name "*.md" -path "*/behaviors/*" | head -1 | grep -q .; then
        system_nature="MARKDOWN-BASED AI-AGENTIC SYSTEM"
    else
        system_nature="CODE-BASED SYSTEM"
    fi
    [ ! -z "$system_nature" ] || return 1
    
    # Get current date
    current_date=$(date +%Y-%m-%d)
    [[ "$current_date" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] || return 1
    
    echo "✅ Context gathering successful"
}
```

### Placeholder Resolution Test
**TEST COMPLETE RESOLUTION:**

```bash
# Test placeholder replacement in PRB
test_placeholder_resolution() {
    local prb_file="$1"
    
    # Apply resolution (simulation)
    sed -i "s/\[FROM_CONFIG\]/true/g" "$prb_file"
    sed -i "s/\[PROJECT_ROOT\]/\/absolute\/path/g" "$prb_file"
    sed -i "s/\[CURRENT_DATE\]/$(date +%Y-%m-%d)/g" "$prb_file"
    sed -i "s/\[USER_REQUEST\]/Actual user request/g" "$prb_file"
    
    # Verify no placeholders remain
    PLACEHOLDERS=$(grep -o '\[.*\]' "$prb_file" 2>/dev/null)
    [ -z "$PLACEHOLDERS" ] || return 1
    
    echo "✅ Placeholder resolution successful"
}
```

## Validation Integration Tests

### Placeholder Detection Test
**TEST VALIDATION SCANNING:**

```bash
# Test placeholder detection capability
test_placeholder_detection() {
    # Create test file with placeholders
    echo "git_privacy: [FROM_CONFIG]" > test_prb.yaml
    echo "project_root: [PROJECT_ROOT]" >> test_prb.yaml
    echo "user_request: [USER_REQUEST]" >> test_prb.yaml
    
    # Run detection
    PLACEHOLDERS=$(grep -o '\[.*\]' test_prb.yaml 2>/dev/null | sort -u)
    expected="[FROM_CONFIG]
[PROJECT_ROOT]
[USER_REQUEST]"
    
    [ "$PLACEHOLDERS" = "$expected" ] || return 1
    
    # Cleanup
    rm test_prb.yaml
    
    echo "✅ Placeholder detection working correctly"
}
```

### Quality Gates Test
**TEST VALIDATION ENFORCEMENT:**

```bash
# Test quality gate enforcement
test_quality_gates() {
    # Test configuration validation
    echo "git_privacy: [FROM_CONFIG]" > test_incomplete.yaml
    PLACEHOLDERS=$(grep -o '\[.*\]' test_incomplete.yaml 2>/dev/null)
    [ ! -z "$PLACEHOLDERS" ] || return 1
    
    # Test resolved validation
    echo "git_privacy: true" > test_complete.yaml
    PLACEHOLDERS=$(grep -o '\[.*\]' test_complete.yaml 2>/dev/null)
    [ -z "$PLACEHOLDERS" ] || return 1
    
    # Cleanup
    rm test_incomplete.yaml test_complete.yaml
    
    echo "✅ Quality gates enforcing correctly"
}
```

## End-to-End Integration Tests

### Complete Workflow Test
**FULL INTEGRATION TEST:**

1. **Template Selection**: Choose appropriate complexity template
2. **@PM Process**: Load, extract config, gather context, resolve placeholders
3. **Validation**: Run comprehensive validation checks
4. **Subagent Preparation**: Create self-contained PRB
5. **Execution Simulation**: Verify execution steps are actionable

### Subagent Context Test
**TEST ISOLATED EXECUTION:**

```bash
# Test subagent can execute without external dependencies
test_subagent_execution() {
    local prb_file="$1"
    
    # Verify no external file references
    ! grep -q "CLAUDE.md\|config.md" "$prb_file" || return 1
    
    # Verify all paths are absolute
    grep "project_root:" "$prb_file" | grep -q "^/" || return 1
    
    # Verify configuration embedded
    grep -q "git_privacy: true\|git_privacy: false" "$prb_file" || return 1
    
    # Verify execution steps present
    grep -q "## STEP" "$prb_file" || return 1
    
    echo "✅ Subagent execution context validated"
}
```

## Integration Quality Metrics

### Success Criteria
**INTEGRATION MUST ACHIEVE:**

- ✅ All template types load and resolve correctly
- ✅ @PM process handles all complexity levels
- ✅ Validation catches all placeholder issues
- ✅ Subagents receive self-contained PRBs
- ✅ Execution steps are clear and actionable
- ✅ No configuration dependencies in execution

### Performance Metrics
**EFFICIENCY MEASURES:**

- Template loading time: < 1 second
- Resolution process time: < 5 seconds  
- Validation scan time: < 2 seconds
- End-to-end workflow: < 10 seconds
- Zero false positives in validation
- 100% placeholder detection accuracy

## Error Scenarios Testing

### Common Failure Cases
**TEST ERROR HANDLING:**

1. **Missing Configuration**: Test when CLAUDE.md missing git_privacy
2. **Incomplete Resolution**: Test when @PM misses placeholders
3. **Invalid Context**: Test when project_root is relative path
4. **Template Corruption**: Test when template sections missing

### Recovery Testing
**VALIDATE ERROR RECOVERY:**

1. **Clear Error Messages**: Ensure errors explain what's wrong
2. **Resolution Guidance**: Provide clear steps to fix issues
3. **Validation Re-run**: Test validation after error fixes
4. **Quality Gates**: Ensure incomplete PRBs are blocked

## Memory Integration

### Test Result Storage
**LEARNING FROM TESTS:**
- Integration test patterns and results
- Common failure modes and solutions
- Performance optimization opportunities
- Quality improvement insights

### Memory Location
`memory/integration-testing/test-patterns.md` - Integration testing patterns and results

## Continuous Improvement

### Test Evolution
**ONGOING IMPROVEMENT:**
- Add new test cases as edge cases discovered
- Enhance validation coverage based on failures
- Optimize performance based on metrics
- Improve error messages based on user feedback

### Quality Assurance
**INTEGRATION STANDARDS:**
- All tests must pass before system deployment
- New features require integration test coverage
- Performance regressions trigger investigation
- Error handling must be comprehensive

---
*Integration testing behavior for intelligent-claude-code system*