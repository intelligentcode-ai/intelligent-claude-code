# File Management Behavior Design

**Purpose:** Prevent file bloat through intelligent file management behaviors  
**Type:** Core System Behavior  
**Status:** DESIGNED

## Core Behavioral Rules

### File Creation Decision Tree

**ALWAYS evaluate before creating any file:**

```
1. Can this enhance an existing file?
   YES → Enhance existing file (preferred)
   NO → Continue to step 2

2. Is this file truly necessary?
   NO → Don't create, use display output
   YES → Continue to step 3

3. Does it follow naming conventions?
   NO → Apply naming rules
   YES → Continue to step 4

4. Is it in the correct directory?
   NO → Determine proper location
   YES → Create file
```

### Enhance vs Create Logic

**Enhancement Triggers (prefer existing file):**
- Adding section to existing documentation
- Extending behavioral patterns
- Adding examples or clarifications
- Updating configuration options
- Adding test cases to existing suite

**Creation Triggers (new file justified):**
- New distinct module or behavior
- New work item (epic, story, bug, task)
- Separate concern requiring isolation
- New command or tool integration
- Domain-specific knowledge capture

### File Organization Requirements

**Directory Placement Rules:**
```yaml
root/:
  allowed:
    - README.md
    - LICENSE
    - CHANGELOG.md
    - Makefile
    - .gitignore
  forbidden:
    - Status reports
    - Analysis files
    - Working documents
    - Context files

src/:
  behaviors/: Behavioral modules only
  commands/: Command definitions only
  roles/: Role specifications only
  modes/: Mode configurations only
  config.md: System configuration

docs/:
  guides/: How-to documentation
  architecture/: System design docs
  api/: Command/behavior reference

epics/EPIC-XXX/:
  epic.yaml: Epic definition
  stories/: Story subdirectories
  bugs/: Bug subdirectories
  knowledge/: Epic-level learnings

work-items/:
  tasks/: Task definitions
  knowledge/: Work-specific learnings
  analysis/: Research outputs
  design/: Design documents
```

## File Creation Guidelines

### Pre-Creation Validation

**BEFORE creating any file, validate:**

1. **Existence Check**
   ```
   - Search for similar files
   - Check parent directories
   - Verify no duplication
   ```

2. **Necessity Validation**
   ```
   - Is output display-only sufficient?
   - Can existing file be enhanced?
   - Is this for temporary use?
   ```

3. **Naming Compliance**
   ```
   - Follows lowercase-hyphenated?
   - No UPPERCASE (except standards)?
   - Descriptive but concise?
   ```

4. **Location Verification**
   ```
   - Correct directory type?
   - Proper hierarchy level?
   - Related files nearby?
   ```

### Creation Decision Matrix

| Content Type | Action | Location | Naming |
|-------------|--------|----------|---------|
| Status update | Display only | N/A | N/A |
| Analysis report | Create if multi-use | /analysis/ | lowercase-hyphenated |
| Documentation | Enhance existing | /docs/guides/ | lowercase-hyphenated |
| Behavioral pattern | New file | /src/behaviors/ | lowercase-hyphenated |
| Work item | New file | /epics/../ | ID-description |
| Knowledge capture | New file | /knowledge/ | topic-learnings |
| Temporary data | Don't create | N/A | N/A |

### File Lifecycle Management

**Creation → Usage → Maintenance → Archival**

1. **Creation Phase**
   - Validate necessity
   - Check naming
   - Verify location
   - Add to git

2. **Usage Phase**
   - Keep updated
   - Consolidate related
   - Cross-reference

3. **Maintenance Phase**
   - Regular review
   - Merge duplicates
   - Update references

4. **Archival Phase**
   - Archive completed work
   - Preserve knowledge
   - Clean workspace

## Integration with Existing Behaviors

### Command Integration

**All commands using Write tool must:**
1. Call pre-creation validation
2. Check enhancement possibility
3. Validate naming convention
4. Confirm directory placement

### Role Behaviors

**@PM Role:**
- Enforce file organization
- Review file placement
- Approve new directories

**@Developer/@AI-Engineer:**
- Follow enhancement-first
- Use proper directories
- Clean temporary files

**@QA-Engineer:**
- Organize test artifacts
- Consolidate reports
- Version test data

### Workflow Integration

**Planning Phase:**
- Define file structure
- Set naming standards
- Plan directory layout

**Execution Phase:**
- Follow file guidelines
- Create only necessary
- Maintain organization

**Review Phase:**
- Check file compliance
- Validate placement
- Ensure cleanup

## Prevention Mechanisms

### Automated Checks

1. **Pre-Write Hook**
   - Intercept Write tool calls
   - Run validation checks
   - Suggest alternatives

2. **Naming Validator**
   - Check case format
   - Verify conventions
   - Auto-correct simple issues

3. **Directory Enforcer**
   - Validate target path
   - Check permissions
   - Ensure structure

### Manual Review Points

1. **Peer Review Checklist**
   - [ ] Files in correct directories?
   - [ ] Naming conventions followed?
   - [ ] No unnecessary files created?
   - [ ] Existing files enhanced when possible?

2. **PR/MR Requirements**
   - File placement justification
   - Naming convention compliance
   - Cleanup of temporary files

### Behavioral Reinforcement

**Scoring Integration:**
- +0.5P for enhancing existing files
- -1.0P for root directory pollution
- +1.0Q for proper organization
- -2.0Q for UPPERCASE violations

**Learning Capture:**
- Track file creation patterns
- Identify violation trends
- Share prevention strategies

## Implementation Strategy

### Phase 1: Core Behavior
1. Create file-management-enforcer.md
2. Add pre-creation validation
3. Implement naming checks

### Phase 2: Command Updates
1. Update all Write-using commands
2. Add validation calls
3. Remove UPPERCASE generation

### Phase 3: Integration
1. Add to peer review
2. Update scoring rules
3. Create monitoring

### Phase 4: Reinforcement
1. Track compliance
2. Generate reports
3. Continuous improvement

## Success Metrics

**Quantitative:**
- 90% reduction in root files
- 100% lowercase compliance
- 75% enhancement vs creation
- 0 UPPERCASE violations

**Qualitative:**
- Cleaner project structure
- Easier navigation
- Better organization
- Reduced confusion

---
*File management behavior design for intelligent-claude-code*