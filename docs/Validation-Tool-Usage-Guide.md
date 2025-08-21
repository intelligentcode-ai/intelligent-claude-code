# Validation Tool Usage Guide

## Overview

This guide explains how to use the PRB validation tools to ensure templates are properly resolved before subagent execution.

## Quick Validation Commands

### Basic Placeholder Scan
```bash
# Scan any PRB file for unresolved placeholders
grep -o '\[.*\]' prb-file.yaml | sort -u
```

### Complete Validation Script
```bash
#!/bin/bash
# validate-prb.sh - Complete PRB validation

validate_prb() {
    local prb_file="$1"
    
    echo "🔍 Validating PRB: $prb_file"
    echo "================================"
    
    # 1. Check file exists
    if [ ! -f "$prb_file" ]; then
        echo "❌ ERROR: PRB file not found: $prb_file"
        return 1
    fi
    
    # 2. Scan for any placeholders
    echo "📋 Checking for unresolved placeholders..."
    PLACEHOLDERS=$(grep -o '\[.*\]' "$prb_file" 2>/dev/null | sort -u)
    
    if [ ! -z "$PLACEHOLDERS" ]; then
        echo "❌ CRITICAL: Unresolved placeholders detected:"
        echo "$PLACEHOLDERS"
        echo ""
        echo "🔧 Resolution required before subagent execution"
        return 1
    fi
    
    # 3. Validate configuration values
    echo "⚙️  Checking configuration values..."
    
    # Check git_privacy
    if grep -q "git_privacy: \[FROM_CONFIG\]" "$prb_file"; then
        echo "❌ git_privacy not resolved"
        return 1
    fi
    
    # Check branch_protection
    if grep -q "branch_protection: \[FROM_CONFIG\]" "$prb_file"; then
        echo "❌ branch_protection not resolved"
        return 1
    fi
    
    # 4. Validate paths are absolute
    echo "📁 Checking file paths..."
    if grep -q "project_root: \[PROJECT_ROOT\]" "$prb_file"; then
        echo "❌ project_root not resolved"
        return 1
    fi
    
    # Check project_root is absolute
    project_root_line=$(grep "project_root:" "$prb_file" | head -1)
    if ! echo "$project_root_line" | grep -q "project_root: /"; then
        echo "❌ project_root must be absolute path (start with /)"
        return 1
    fi
    
    # 5. Validate content is actual
    echo "📝 Checking content completeness..."
    if grep -q "original_request: \"\[USER_REQUEST\]\"" "$prb_file"; then
        echo "❌ user_request not resolved"
        return 1
    fi
    
    if grep -q "title: \"\[ROLE\] \[DESCRIPTION\]\"" "$prb_file"; then
        echo "❌ title not resolved"
        return 1
    fi
    
    # 6. All checks passed
    echo "✅ Validation PASSED"
    echo "📤 PRB ready for subagent execution"
    return 0
}

# Usage
validate_prb "$1"
```

## Category-Specific Validation

### Configuration Validation
```bash
# Check configuration placeholders
check_config_placeholders() {
    local prb_file="$1"
    
    echo "Checking configuration placeholders..."
    
    # Check for unresolved config patterns
    if grep -q "\[FROM_CONFIG\]" "$prb_file"; then
        echo "❌ Found [FROM_CONFIG] placeholders"
        grep -n "\[FROM_CONFIG\]" "$prb_file"
        return 1
    fi
    
    # Verify actual values present
    if ! grep -q "git_privacy: true\|git_privacy: false" "$prb_file"; then
        echo "❌ git_privacy not properly set"
        return 1
    fi
    
    if ! grep -q "branch_protection: true\|branch_protection: false" "$prb_file"; then
        echo "❌ branch_protection not properly set"
        return 1
    fi
    
    echo "✅ Configuration validation passed"
}
```

### Context Validation
```bash
# Check context placeholders
check_context_placeholders() {
    local prb_file="$1"
    
    echo "Checking context placeholders..."
    
    # Check for unresolved context patterns
    context_patterns="\[PROJECT_ROOT\]\|\[SYSTEM_NATURE\]\|\[CURRENT_DATE\]"
    if grep -q "$context_patterns" "$prb_file"; then
        echo "❌ Found unresolved context placeholders"
        grep -n "$context_patterns" "$prb_file"
        return 1
    fi
    
    # Verify actual values present
    if ! grep -q "project_root: /" "$prb_file"; then
        echo "❌ project_root not absolute path"
        return 1
    fi
    
    if ! grep -q "system_nature:" "$prb_file"; then
        echo "❌ system_nature not specified"
        return 1
    fi
    
    # Check date format
    if ! grep -q '[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}' "$prb_file"; then
        echo "❌ No valid date found (YYYY-MM-DD format)"
        return 1
    fi
    
    echo "✅ Context validation passed"
}
```

### Content Validation  
```bash
# Check content placeholders
check_content_placeholders() {
    local prb_file="$1"
    
    echo "Checking content placeholders..."
    
    # Check for unresolved content patterns
    content_patterns="\[USER_REQUEST\]\|\[SUCCESS_CRITERIA\]\|\[ROLE\]"
    if grep -q "$content_patterns" "$prb_file"; then
        echo "❌ Found unresolved content placeholders"
        grep -n "$content_patterns" "$prb_file"
        return 1
    fi
    
    # Verify actual content present
    if grep -q 'original_request: ""' "$prb_file"; then
        echo "❌ original_request is empty"
        return 1
    fi
    
    if grep -q 'title: ""' "$prb_file"; then
        echo "❌ title is empty"
        return 1
    fi
    
    echo "✅ Content validation passed"
}
```

## Integration with @PM Process

### Pre-Creation Validation
```bash
# Validate template before @PM processing
validate_template() {
    local template_file="$1"
    
    echo "🔍 Validating template: $template_file"
    
    # Ensure template has expected placeholders
    expected_placeholders="[FROM_CONFIG] [PROJECT_ROOT] [USER_REQUEST] [ROLE]"
    
    for placeholder in $expected_placeholders; do
        if ! grep -q "\[$placeholder\]" "$template_file"; then
            echo "❌ Missing expected placeholder: [$placeholder]"
            return 1
        fi
    done
    
    echo "✅ Template validation passed"
}
```

### Post-Resolution Validation
```bash
# Validate PRB after @PM resolution
validate_resolved_prb() {
    local prb_file="$1"
    
    echo "🔍 Validating resolved PRB: $prb_file"
    
    # Run all validation categories
    check_config_placeholders "$prb_file" || return 1
    check_context_placeholders "$prb_file" || return 1  
    check_content_placeholders "$prb_file" || return 1
    
    # Final comprehensive scan
    REMAINING=$(grep -o '\[.*\]' "$prb_file" 2>/dev/null | sort -u)
    if [ ! -z "$REMAINING" ]; then
        echo "❌ CRITICAL: Placeholders still remain:"
        echo "$REMAINING"
        return 1
    fi
    
    echo "✅ Resolved PRB validation passed"
    echo "📤 Ready for subagent execution"
}
```

## Quality Gates Implementation

### Blocking Mechanisms
```bash
# Block subagent execution if validation fails
enforce_validation_gates() {
    local prb_file="$1"
    
    echo "🛡️  Enforcing validation gates..."
    
    # Gate 1: No placeholders
    if grep -q '\[.*\]' "$prb_file"; then
        echo "❌ GATE 1 FAILED: Placeholders detected"
        echo "🚫 BLOCKED: Subagent execution prevented"
        return 1
    fi
    
    # Gate 2: Configuration resolved
    if ! grep -q "git_privacy: true\|git_privacy: false" "$prb_file"; then
        echo "❌ GATE 2 FAILED: git_privacy not resolved"
        echo "🚫 BLOCKED: Subagent execution prevented"
        return 1
    fi
    
    # Gate 3: Absolute paths
    if ! grep -q "project_root: /" "$prb_file"; then
        echo "❌ GATE 3 FAILED: project_root not absolute"
        echo "🚫 BLOCKED: Subagent execution prevented"
        return 1
    fi
    
    # Gate 4: Actual content
    if grep -q 'original_request: ""' "$prb_file"; then
        echo "❌ GATE 4 FAILED: original_request empty"
        echo "🚫 BLOCKED: Subagent execution prevented"
        return 1
    fi
    
    echo "✅ All validation gates passed"
    echo "🚀 Subagent execution authorized"
}
```

## Error Recovery Guide

### Common Errors and Solutions

**Error**: `❌ Found [FROM_CONFIG] placeholders`
**Solution**:
```bash
# Extract and replace git_privacy
git_privacy=$(grep -i "git_privacy" CLAUDE.md | grep -o "true\|false" | head -1)
sed -i "s/\[FROM_CONFIG\]/$git_privacy/g" prb-file.yaml
```

**Error**: `❌ project_root not absolute path`  
**Solution**:
```bash
# Get current directory as absolute path
project_root=$(pwd)
sed -i "s|\[PROJECT_ROOT\]|$project_root|g" prb-file.yaml
```

**Error**: `❌ original_request is empty`
**Solution**:
```bash
# Replace with actual user request
actual_request="Implement user authentication"
sed -i "s/\[USER_REQUEST\]/$actual_request/g" prb-file.yaml
```

### Validation Recovery Workflow
```bash
# Complete error recovery process
recover_prb_validation() {
    local prb_file="$1"
    
    echo "🔧 Starting PRB validation recovery..."
    
    # 1. Backup original
    cp "$prb_file" "$prb_file.backup"
    
    # 2. Fix configuration placeholders
    echo "Fixing configuration placeholders..."
    git_privacy=$(grep -i "git_privacy" CLAUDE.md | grep -o "true\|false" | head -1)
    branch_protection=$(grep -i "branch_protection" CLAUDE.md | grep -o "true\|false" | head -1)
    
    sed -i "s/git_privacy: \[FROM_CONFIG\]/git_privacy: $git_privacy/g" "$prb_file"
    sed -i "s/branch_protection: \[FROM_CONFIG\]/branch_protection: $branch_protection/g" "$prb_file"
    
    # 3. Fix context placeholders
    echo "Fixing context placeholders..."
    project_root=$(pwd)
    current_date=$(date +%Y-%m-%d)
    
    sed -i "s|\[PROJECT_ROOT\]|$project_root|g" "$prb_file"
    sed -i "s/\[CURRENT_DATE\]/$current_date/g" "$prb_file"
    
    # 4. Re-validate
    validate_prb "$prb_file"
    validation_result=$?
    
    if [ $validation_result -eq 0 ]; then
        echo "✅ Recovery successful"
        rm "$prb_file.backup"
    else
        echo "❌ Recovery failed, restoring backup"
        mv "$prb_file.backup" "$prb_file"
    fi
    
    return $validation_result
}
```

## Usage Examples

### Validating a Nano PRB
```bash
# Example nano PRB validation
./validate-prb.sh prbs/ready/STORY-001-PRB-001-fix-typo-2025-08-20.prb.yaml

# Expected output:
# 🔍 Validating PRB: prbs/ready/STORY-001-PRB-001-fix-typo-2025-08-20.prb.yaml
# ================================
# 📋 Checking for unresolved placeholders...
# ⚙️  Checking configuration values...
# 📁 Checking file paths...
# 📝 Checking content completeness...
# ✅ Validation PASSED
# 📤 PRB ready for subagent execution
```

### Validating a Medium PRB
```bash
# Example medium PRB validation
./validate-prb.sh prbs/ready/STORY-002-PRB-001-implement-feature-2025-08-20.prb.yaml

# If placeholders found:
# ❌ CRITICAL: Unresolved placeholders detected:
# [FROM_CONFIG]
# [PROJECT_ROOT]
# [USER_REQUEST]
# 
# 🔧 Resolution required before subagent execution
```

## Best Practices

### Validation Workflow
1. **Always validate** before subagent execution
2. **Use comprehensive scan** to catch all placeholder types
3. **Check quality gates** to ensure completeness
4. **Implement error recovery** for common issues
5. **Document validation results** for troubleshooting

### Integration Points
- Run validation after @PM placeholder resolution
- Block subagent execution on validation failure
- Provide clear error messages for resolution guidance
- Log validation results for pattern analysis

### Performance Optimization
- Cache validation results for unchanged PRBs
- Use efficient regex patterns for placeholder detection
- Implement parallel validation for multiple PRBs
- Optimize file I/O for large PRB collections

---
*Validation tool usage guide for intelligent-claude-code system*