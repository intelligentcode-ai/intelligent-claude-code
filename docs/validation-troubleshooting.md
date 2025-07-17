# Role Validation Troubleshooting Guide

## Common Issues and Solutions

This guide helps resolve common issues with the role validation system, providing step-by-step solutions and preventive measures.

## Quick Diagnostic Checklist

Before diving into specific issues, run through this checklist:

- [ ] Is the virtual team mode active? (Check for "@PM" response)
- [ ] Are behavioral modules loaded? (Check imports in CLAUDE.md)
- [ ] Is work type being detected? (Watch for role assignments)
- [ ] Are specialists being created when needed? (<70% match)
- [ ] Is validation running automatically? (Check for match percentages)

## Issue Categories

### 1. Role Assignment Issues

#### Issue: Wrong Role Type Assigned
**Symptoms:**
- Frontend developer working on backend tasks
- Generic developer assigned to specialized work
- Role doesn't match the work type

**Diagnosis:**
```bash
# Check current assignment
@PM Show current role assignments

# Manually trigger validation
/validate-assignment

# Check work type detection
@PM What work type was detected for this task?
```

**Solutions:**
1. **Immediate Fix**: Force revalidation
   ```
   /validate-assignment --force
   ```

2. **Provide Context**: Be more specific
   ```
   # Instead of: "Fix the API"
   # Use: "Fix the REST API authentication endpoint in Node.js"
   ```

3. **Manual Override**: Specify the technology
   ```
   # Explicitly mention the stack
   "Using React and TypeScript, create a component..."
   ```

**Prevention:**
- Always mention specific technologies
- Include file paths when relevant
- Describe the technical context

---

#### Issue: Specialist Not Created
**Symptoms:**
- Generic role handling specialized work
- Capability match between 65-75% but no specialist
- Suboptimal performance on technical tasks

**Diagnosis:**
```bash
# Check capability match
/validate-assignment --verbose

# View threshold settings
@PM Show validation thresholds

# Check specialist creation logs
@PM Show recent specialist creations
```

**Solutions:**
1. **Force Specialist Creation**:
   ```
   # Lower threshold temporarily
   /validate-assignment --threshold 0.8
   ```

2. **Explicit Technology Request**:
   ```
   "Need GraphQL expertise for subscription implementation"
   ```

3. **Manual Specialist Request**:
   ```
   @PM Create @GraphQL-Backend specialist for this task
   ```

**Prevention:**
- Mention specialized technologies upfront
- Include complexity indicators
- Reference specific frameworks/libraries

---

### 2. Validation Process Issues

#### Issue: Validation Not Running
**Symptoms:**
- No capability match shown
- Assignments without validation
- Missing optimization suggestions

**Diagnosis:**
```bash
# Check validation system
@PM Is validation system active?

# Test validation manually
/validate-assignment

# Check behavioral modules
@PM Show loaded behavioral modules
```

**Solutions:**
1. **Restart Validation System**:
   ```
   /refresh
   @PM Reinitialize validation system
   ```

2. **Manual Validation Trigger**:
   ```
   # For current task
   /validate-assignment
   
   # For specific role
   /validate-assignment @Frontend-Developer
   ```

3. **Check Module Loading**:
   ```
   # Verify imports
   Check ~/.claude/CLAUDE.md for:
   @~/.claude/behaviors/role-assessment.md
   ```

**Prevention:**
- Ensure behavioral modules are imported
- Run /init at session start
- Monitor for validation confirmations

---

#### Issue: Validation Loop
**Symptoms:**
- Repeated reassignments
- Can't settle on a role
- Constant specialist creation

**Diagnosis:**
```bash
# Check assignment history
@PM Show assignment history for current task

# View validation scores
/validate-assignment --history

# Check for conflicts
@PM Are there conflicting requirements?
```

**Solutions:**
1. **Break Assignment Cycle**:
   ```
   # Accept current assignment
   /validate-assignment --accept-current
   ```

2. **Clarify Requirements**:
   ```
   # Split complex requirements
   "First, just the API endpoints"
   "Then, we'll add authentication"
   ```

3. **Reset Validation State**:
   ```
   /reset --validation-only
   @PM Clear assignment history
   ```

**Prevention:**
- Break complex tasks into phases
- Avoid conflicting requirements
- Use staged assignments

---

### 3. Multi-Role Coordination Issues

#### Issue: Roles Not Working in Parallel
**Symptoms:**
- Sequential work when parallel possible
- Roles waiting for each other
- Inefficient task execution

**Diagnosis:**
```bash
# Check parallel execution
@PM Show parallel task status

# View role dependencies
@PM What dependencies exist between roles?

# Check coordination
/parallel-delegate --status
```

**Solutions:**
1. **Force Parallel Execution**:
   ```
   /parallel-delegate --force
   @PM Ensure roles work simultaneously
   ```

2. **Clear Dependencies**:
   ```
   @PM Define clear interfaces between:
   - @Frontend-Developer: API contract
   - @Backend-Developer: Implementation
   ```

3. **Improve Coordination**:
   ```
   @PM Create explicit coordination points
   @PM Define integration milestones
   ```

**Prevention:**
- Define clear interfaces upfront
- Minimize dependencies
- Use async communication patterns

---

### 4. Specialist Knowledge Issues

#### Issue: Specialist Lacks Expected Knowledge
**Symptoms:**
- Specialist seems generic
- Missing domain expertise
- Inadequate technical depth

**Diagnosis:**
```bash
# Check specialist configuration
@PM Show @[Specialist-Name] capabilities

# Verify knowledge injection
@PM Was Context7 used for this specialist?

# Test specific knowledge
@[Specialist-Name] Explain [specific-concept]
```

**Solutions:**
1. **Reinject Knowledge**:
   ```
   @PM Refresh @[Specialist-Name] with Context7
   @PM Update specialist knowledge base
   ```

2. **Enhance Specialist**:
   ```
   @PM Add expertise to @[Specialist-Name]:
   - Specific patterns
   - Best practices
   - Common pitfalls
   ```

3. **Create New Specialist**:
   ```
   @PM Create fresh specialist with:
   - Updated knowledge
   - Latest practices
   - Specific focus
   ```

**Prevention:**
- Ensure Context7 is available
- Provide detailed context
- Update specialists periodically

---

### 5. Performance Issues

#### Issue: Slow Validation Process
**Symptoms:**
- Long delays before role assignment
- Timeout during validation
- System appears frozen

**Diagnosis:**
```bash
# Check system performance
@PM Show validation metrics

# Monitor current validation
/validate-assignment --profile

# Check for bottlenecks
@PM What's causing validation delays?
```

**Solutions:**
1. **Optimize Validation**:
   ```
   # Use cached results
   /validate-assignment --use-cache
   
   # Limit validation scope
   /validate-assignment --quick
   ```

2. **Reduce Complexity**:
   ```
   # Simplify requirements
   # Break into smaller validations
   # Use pre-validated patterns
   ```

3. **System Optimization**:
   ```
   /refresh --optimize
   @PM Clear validation cache
   @PM Rebuild role indices
   ```

**Prevention:**
- Keep requirements focused
- Use validation caching
- Regular system maintenance

---

## Advanced Troubleshooting

### Debug Commands

```bash
# Enable verbose logging
/debug --validation on

# Show internal state
@PM Show validation state

# Trace decision path
/validate-assignment --trace

# Export validation data
@PM Export validation metrics
```

### System Recovery

When experiencing persistent issues:

1. **Soft Reset**:
   ```bash
   /refresh
   @PM Reinitialize validation
   ```

2. **Hard Reset**:
   ```bash
   /reset
   /init
   @PM Rebuild validation system
   ```

3. **Full Recovery**:
   ```bash
   # Backup current state
   @PM Backup system state
   
   # Clean reset
   /reset --full
   
   # Restore configuration
   /init
   @PM Restore from backup
   ```

### Validation Logs

Check these locations for detailed information:
- Assignment history: Memory system
- Validation scores: `scores.md`
- Error patterns: Learning entities
- System state: PM tracking

## Best Practices for Smooth Validation

### DO:
- ✓ Mention specific technologies
- ✓ Provide clear requirements
- ✓ Trust automatic optimization
- ✓ Allow specialist creation
- ✓ Use parallel execution

### DON'T:
- ✗ Force generic roles on specialized work
- ✗ Skip validation checks
- ✗ Ignore capability warnings
- ✗ Override without reason
- ✗ Create assignment conflicts

## Getting Help

If issues persist:

1. **Check Documentation**:
   - Role Validation Guide
   - Technical Reference
   - Examples Document

2. **System Diagnostics**:
   ```bash
   @PM Run full system diagnostic
   @PM Generate support report
   ```

3. **Reset and Retry**:
   - Sometimes a fresh start helps
   - Preserve important work first
   - Document the issue pattern

Remember: The validation system is designed to improve over time. Each issue resolved makes future validations more accurate and efficient.