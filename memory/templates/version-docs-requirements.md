# Version and Documentation Requirements for PRB Templates

## 2025-08-03: PRB Template Standardization
**Context:** PRB-2025-08-03-014
**Problem:** Inconsistent version bumping and documentation requirements across PRB templates
**Solution:** Added standardized version_bump and documentation_updates sections to all templates

### Implementation Pattern
```yaml
# In git_operations section
version_bump: "[NONE|PATCH|MINOR|MAJOR]"

# New mandatory section
documentation_updates:
  - file: "CHANGELOG.md"
    action: "Update with PR description"
  - file: "[FROM_CONFIG]"
    action: "Update if affected"
```

### Version Bump Guidelines
- **NONE**: Trivial changes (typos, formatting) - Nano only
- **PATCH**: Bug fixes and small improvements - Nano, Tiny
- **MINOR**: New features and enhancements - Tiny, Medium, Large
- **MAJOR**: Breaking changes or system-wide overhauls - Large, Mega

### Template-Specific Documentation Requirements
- **Nano/Tiny**: Basic CHANGELOG.md updates
- **Medium**: CHANGELOG.md + affected configuration files
- **Large**: CHANGELOG.md + architecture documentation updates
- **Mega**: Full documentation suite including migration procedures and system overview

### Execution Checklist Integration
All templates now include "Documentation Updates Section" in their execution checklists to ensure documentation is never forgotten during implementation.

### Consistency Achievement
All 5 templates (Nano, Tiny, Medium, Large, Mega) now have:
1. Consistent version_bump field placement in git_operations
2. Standardized documentation_updates section structure
3. Updated execution checklists including documentation verification
4. Appropriate version bump guidelines for complexity level

---