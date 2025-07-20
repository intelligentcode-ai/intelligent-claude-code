# File Management Enforcer

**Purpose:** Prevent file bloat through intelligent file management validation  
**Type:** Core System Behavior  
**Status:** ACTIVE

## Core Behavioral Rules

### File Creation Decision Tree

**BEFORE creating any file, execute this validation:**

```
validateFileCreation(filepath, content):
    1. Can this enhance an existing file?
       YES → Enhance existing file (preferred)
       NO → Continue to step 2
    
    2. Is this file truly necessary?
       NO → Return display-only output
       YES → Continue to step 3
    
    3. Does it follow naming conventions?
       NO → Apply naming rules
       YES → Continue to step 4
    
    4. Is it in the correct directory?
       NO → Determine proper location
       YES → Allow file creation
```

### Enhancement vs Creation Logic

**Enhancement Triggers (prefer existing):**
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

## File Organization Rules

### Directory Placement
```yaml
root/:
  allowed: [README.md, LICENSE, CHANGELOG.md, Makefile, .gitignore]
  forbidden: [status reports, analysis files, working documents]

src/:
  behaviors/: Behavioral modules only
  commands/: Command definitions only
  roles/: Role specifications only
  modes/: Mode configurations only
  
docs/: All documentation except root README.md
epics/: Work item hierarchies only
knowledge/: Learning and pattern captures
analysis/: Research and analysis outputs
design/: Design documents and specifications
```

### Naming Conventions

**Primary Standard: lowercase-hyphenated**
```
Pattern: [domain]-[function]-[type].md
Rules:
  - All lowercase letters
  - Words separated by hyphens
  - No underscores, spaces, or camelCase
  - No UPPERCASE except work item IDs
  
Examples:
  ✓ file-management-enforcer.md
  ✓ role-assignment-validator.md
  ✗ FileManagementEnforcer.md
  ✗ FILE-MANAGEMENT-ENFORCER.md
```

**Exception List (UPPERCASE allowed):**
- README.md (root only)
- LICENSE
- CHANGELOG.md
- CONTRIBUTING.md
- CLAUDE.md
- Makefile

## Pre-Creation Validation

### Validation Function
```
preWriteValidation(filepath, content):
    // Check existence
    IF fileExists(filepath):
        RETURN enhanceExisting(filepath, content)
    
    // Validate necessity
    IF isTemporaryOutput(content):
        RETURN displayOnly(content)
    
    // Validate naming
    filename = extractFilename(filepath)
    IF NOT isValidNaming(filename):
        filename = correctNaming(filename)
        filepath = updatePath(filepath, filename)
    
    // Validate location
    IF NOT isCorrectDirectory(filepath):
        filepath = determineCorrectPath(filepath)
    
    RETURN {validated: true, filepath: filepath}
```

### Naming Validation
```
isValidNaming(filename):
    // Check exception list first
    IF filename IN [README.md, LICENSE, CHANGELOG.md, CONTRIBUTING.md, CLAUDE.md, Makefile]:
        IF isInRootDirectory():
            RETURN true
    
    // Apply lowercase-hyphenated rule
    RETURN matches(filename, /^[a-z0-9-]+\.md$/)

correctNaming(filename):
    // Convert to lowercase
    filename = lowercase(filename)
    
    // Replace invalid characters
    filename = replace(filename, /[_\s]+/, '-')
    filename = replace(filename, /[^a-z0-9-.]/, '')
    
    // Fix specific violations
    IF filename == "readme.md" AND NOT isRootDirectory():
        RETURN "overview.md"
    IF filename == "archived.md":
        RETURN "archived-summary.md"
    
    RETURN filename
```

### Directory Validation
```
isCorrectDirectory(filepath):
    directory = extractDirectory(filepath)
    filename = extractFilename(filepath)
    
    // Check root directory restrictions
    IF directory == "/" AND filename NOT IN allowedRootFiles:
        RETURN false
    
    // Check src/ subdirectory restrictions
    IF startsWith(directory, "/src/"):
        RETURN validateSrcSubdirectory(directory, filename)
    
    RETURN true

determineCorrectPath(filepath):
    filename = extractFilename(filepath)
    
    // Route based on content type
    IF isAnalysisFile(filename):
        RETURN "/analysis/" + filename
    IF isDesignFile(filename):
        RETURN "/design/" + filename
    IF isKnowledgeFile(filename):
        RETURN "/knowledge/" + filename
    IF isDocumentation(filename):
        RETURN "/docs/" + filename
    
    RETURN filepath
```

## Integration Points

### Write Tool Hook
**ALL Write tool usage MUST call validation:**
```
Write(filepath, content):
    validation = preWriteValidation(filepath, content)
    
    IF NOT validation.validated:
        RETURN {error: "File creation blocked", reason: validation.reason}
    
    // Use validated path
    filepath = validation.filepath
    
    // Check for enhancement
    IF validation.enhance:
        RETURN enhanceFile(filepath, content)
    
    // Proceed with creation
    RETURN createFile(filepath, content)
```

### Command Integration
**Commands creating files MUST:**
1. Import file-management-enforcer
2. Call preWriteValidation before Write
3. Use corrected filenames
4. Follow directory placement

### Behavioral Reinforcement

**Scoring Integration:**
- +0.5P for enhancing existing files
- -1.0P for root directory violations
- +1.0Q for proper organization
- -2.0Q for UPPERCASE violations

**Learning Capture:**
- Track file creation patterns
- Identify violation trends
- Share prevention strategies

## Cleanup Behaviors

### Project Cleanliness Check
```
checkProjectCleanliness():
    violations = []
    
    // Check root directory
    rootFiles = listFiles("/")
    FOR file IN rootFiles:
        IF file NOT IN allowedRootFiles:
            violations.add({file: file, issue: "root pollution"})
    
    // Check naming violations
    allFiles = listAllFiles()
    FOR file IN allFiles:
        IF NOT isValidNaming(file) AND file NOT IN exceptions:
            violations.add({file: file, issue: "naming violation"})
    
    RETURN violations
```

### Automated Cleanup
```
cleanupProject():
    violations = checkProjectCleanliness()
    
    FOR violation IN violations:
        IF violation.issue == "root pollution":
            moveToCorrectDirectory(violation.file)
        ELIF violation.issue == "naming violation":
            renameFile(violation.file, correctNaming(violation.file))
    
    RETURN {cleaned: violations.length, remaining: checkProjectCleanliness().length}
```

## Error Prevention

### Common Violation Fixes
```yaml
README.md in subdirectories: → overview.md or remove
ARCHIVED.md: → archived-summary.md
UPPERCASE reports: → lowercase-hyphenated.md
Temporary files: → display-only output
Root pollution: → move to appropriate directory
```

### Proactive Monitoring
- Regular cleanliness checks
- Violation trend analysis
- Prevention pattern sharing
- Continuous improvement

---
*File management enforcer for intelligent-claude-code system*