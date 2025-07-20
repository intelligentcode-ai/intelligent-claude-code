# File Management Best Practices Summary

## Proper File Organization Patterns

### Directory Structure Best Practices
1. **Hierarchical Organization**
   - Group related files in appropriate directories
   - Use subdirectories for logical grouping (e.g., `/docs/`, `/src/behaviors/`, `/epics/EPIC-XXX/bugs/`)
   - Keep root directory clean - only essential files (README.md, LICENSE, CHANGELOG.md, Makefile)

2. **File Placement Guidelines**
   - Configuration: `/src/config.md` or `.claude/config.md`
   - Documentation: `/docs/` directory with subdirectories for categories
   - Behavioral modules: `/src/behaviors/`
   - Commands: `/src/commands/`
   - Work items: `/epics/EPIC-XXX/stories|bugs/ITEM-XXX/`
   - Knowledge/learnings: Within relevant bug/story directories as `/learnings/`

3. **When to Create vs Enhance**
   - **Enhance existing files when:**
     - Adding related content to existing documentation
     - Updating behavioral patterns in existing modules
     - Extending functionality in existing files
   - **Create new files when:**
     - New distinct concept or module
     - New work item (epic, story, bug, task)
     - Separate concern that doesn't fit existing structure

## Naming Convention Standards

### File Naming Patterns
1. **lowercase-hyphenated** (Primary Standard)
   - All behavioral modules: `role-activation-system.md`
   - All commands: `icc-create-story.md`
   - Documentation files: `file-management-guide.md`
   - Configuration: `config.md`

2. **UPPERCASE** (Limited Use)
   - Traditional files only: `README.md`, `LICENSE`, `CHANGELOG.md`, `CONTRIBUTING.md`
   - Special documentation: `CLAUDE.md` (system file)
   - Avoid for new files unless industry standard

3. **Work Item IDs**
   - Format: `TYPE-NUMBER` (e.g., `EPIC-001`, `STORY-015`, `BUG-084`)
   - Always uppercase for IDs
   - Use in directory names: `/bugs/BUG-084-file-bloat-prevention/`

### Directory Naming
- Use lowercase-hyphenated for all directories
- Include ID and description for work items: `BUG-084-file-bloat-prevention`
- Keep names descriptive but concise

## Common Anti-Patterns to Avoid

### 1. Report/Status File Proliferation
**Anti-pattern:**
- Creating `REPORT.md`, `STATUS.md`, `FIX-REPORT.md` files everywhere
- Multiple analysis/report files for single issues
- Temporary status files that become permanent

**Better approach:**
- Use task files to track status (status field in YAML)
- Consolidate reports into single knowledge capture file
- Use git commits and PR descriptions for status updates

### 2. Root Directory Pollution
**Anti-pattern:**
- Creating files like `PROJECT-CONTEXT.md`, `BEHAVIORAL-PATTERNS.md` in root
- Adding temporary or working files to root
- Multiple uppercase files cluttering root

**Better approach:**
- Move to appropriate subdirectories (`/docs/`, `/knowledge/`)
- Keep only essential files in root
- Use `.gitignore` for temporary files

### 3. Duplicate Documentation
**Anti-pattern:**
- Creating new guide files instead of updating existing ones
- Multiple files covering same topic
- Fragmented documentation across many files

**Better approach:**
- Search existing docs before creating new
- Enhance existing guides with new sections
- Consolidate related content

### 4. Poor File Organization
**Anti-pattern:**
- Mixing different types of files in same directory
- No clear hierarchy or organization
- Files scattered without logical grouping

**Better approach:**
- Strict directory structure by file type
- Clear separation of concerns
- Logical grouping of related files

## Recommendations for Preventing Bloat

### 1. File Creation Guidelines
- **Always ask:** "Can this enhance an existing file?"
- **Check first:** Search for existing files on the topic
- **Follow structure:** Place files in correct directories
- **Use templates:** Follow established patterns

### 2. Naming Enforcement
- **Default to lowercase-hyphenated** for all new files
- **Avoid UPPERCASE** except for standard files
- **Be descriptive** but concise in naming
- **Include context** in directory structure, not filename

### 3. Regular Cleanup
- **Archive completed work** using archival commands
- **Remove obsolete files** during git operations
- **Consolidate reports** into knowledge files
- **Update `.gitignore`** for temporary files

### 4. Documentation Strategy
- **Enhance over create** - Add sections to existing docs
- **Centralize knowledge** - Use knowledge directories
- **Version in git** - Let git track changes, not filenames
- **Cross-reference** - Link between related docs

### 5. Review Process
- **Check file placement** during peer review
- **Validate naming conventions** before merge
- **Question new files** - Are they necessary?
- **Enforce standards** in PR reviews

## Implementation Checklist
- [ ] Create behavioral module for file management enforcement
- [ ] Add pre-creation checks to commands
- [ ] Implement naming convention validation
- [ ] Add cleanup behaviors to git operations
- [ ] Create file organization guidelines
- [ ] Update command templates with standards
- [ ] Add validation to peer review process

---
*File management best practices for preventing project bloat in intelligent-claude-code*