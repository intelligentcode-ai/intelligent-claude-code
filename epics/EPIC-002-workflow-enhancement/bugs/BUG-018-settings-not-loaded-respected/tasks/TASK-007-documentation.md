# TASK-007 Documentation

**Task:** Document settings system  
**Assigned to:** @AI-Engineer  
**Status:** PLANNED  
**Priority:** critical_path  
**Dependencies:** [TASK-006]

## Documentation Requirements

### User Documentation
1. **Settings Guide**
   - Available settings and their effects
   - Configuration file format
   - Priority order explanation
   - Examples for common use cases

2. **Git Privacy Documentation**
   - How git_privacy works
   - What gets stripped
   - How to enable/disable
   - Impact on workflow

3. **Autonomy Levels Guide**
   - L1: Manual approval mode
   - L2: Architect approval mode
   - L3: Full autonomy mode
   - When to use each level

### Technical Documentation
1. **Architecture Overview**
   - Config loading system design
   - Settings application flow
   - Component interactions
   - Extension points

2. **API Documentation**
   - Settings access methods
   - Configuration validation
   - Runtime setting changes
   - Error handling

### Configuration Examples
```yaml
# Example L3 autonomous configuration
autonomy_level: "L3"
pm_always_active: true
blocking_enabled: false
git_privacy: true

# Example L1 manual configuration
autonomy_level: "L1"
pm_always_active: false
blocking_enabled: true
git_privacy: false
```

## Documentation Locations

- Update CLAUDE.md with settings section
- Create CONFIG.md for detailed guide
- Update workflow documentation
- Add examples to relevant sections

## Success Criteria

- Clear, comprehensive documentation
- All settings explained
- Examples for common scenarios
- Technical details for developers