# File Renaming Command - icc-rename-work-items

**MANDATORY:** Batch rename work items to comply with standard naming format. Preserve data and relationships.

**PURPOSE:** Rename existing non-compliant work items to follow standard format with backup and cross-reference updates

## Command Syntax

```bash
/icc-rename-work-items [options]

Options:
  --scan-only          Show non-compliant files without renaming
  --category <cat>     Only process specific category (EPIC|STORY|BUG|PRB)
  --directory <dir>    Only process specific directory
  --backup             Create backup before renaming (default: true)
  --update-refs        Update cross-references after renaming (default: true)
  --dry-run            Show what would be renamed without executing
  --force              Skip confirmation prompts
```

## Imports
@../behaviors/naming-enforcement-behavior.md
@../behaviors/numbering-service-behavior.md

## Scanning Logic

### Non-Compliant File Detection
```
ScanForNonCompliantFiles(target_directories):
  non_compliant = []
  
  for directory in target_directories:
    files = ListFiles(directory, ["*.md", "*.yaml", "*.yml"])
    
    for file in files:
      filename = GetBasename(file.path)
      
      # Skip already compliant files
      if ValidateWorkItemName(filename):
        continue
      
      # Detect work item type from content or location
      category = DetectWorkItemCategory(file)
      if !category:
        continue  # Skip non-work-item files
      
      # Generate compliant name suggestion
      suggested_name = GenerateCompliantName(file, category)
      
      non_compliant.append({
        original: file.path,
        suggested: suggested_name,
        category: category,
        confidence: CalculateRenameConfidence(file, suggested_name)
      })
  
  return non_compliant
```

### Category Detection
```
DetectWorkItemCategory(file):
  # Check filename patterns
  filename = GetBasename(file.path)
  
  if MatchesPattern(filename, "story|STORY"):
    return "STORY"
  if MatchesPattern(filename, "bug|BUG|issue"):
    return "BUG"  
  if MatchesPattern(filename, "epic|EPIC"):
    return "EPIC"
  if MatchesPattern(filename, "prb|PRB") or file.extension == ".prb.yaml":
    return "PRB"
  
  # Check file location
  directory = GetDirectoryName(file.path)
  if MatchesPattern(directory, "stories"):
    return DetectStoryType(file.content)  # STORY or EPIC
  if MatchesPattern(directory, "bugs"):
    return "BUG"
  if MatchesPattern(directory, "prbs"):
    return "PRB"
  
  # Check file content
  content_sample = ReadFirstLines(file.path, 10)
  if ContainsKeywords(content_sample, ["epic", "large initiative"]):
    return "EPIC"
  if ContainsKeywords(content_sample, ["story", "user story", "feature"]):
    return "STORY"
  if ContainsKeywords(content_sample, ["bug", "issue", "defect"]):
    return "BUG"
  if ContainsKeywords(content_sample, ["PRB", "requirement blueprint"]):
    return "PRB"
    
  return null  # Cannot determine category
```

## Name Generation Logic

### GenerateCompliantName Function
```
GenerateCompliantName(file, category):
  # Extract title from existing filename or content
  title = ExtractTitleFromFile(file)
  
  # Generate number using numbering service
  parent_id = DetectParentReference(file)
  number = NumberingService.GetNextNumber(category, parent_id)
  
  # Use file creation date or current date
  date = GetFileDate(file) || GetCurrentDate()
  
  # Build compliant name
  if parent_id:
    name = "{parent_id}-{category}-{number}-{title}-{date}"
  else:
    name = "{category}-{number}-{title}-{date}"
  
  # Add appropriate extension
  extension = DetermineExtension(file, category)
  return name + extension
```

### Title Extraction
```
ExtractTitleFromFile(file):
  # Try filename first
  filename = GetBasename(file.path)
  title_from_name = ExtractTitleFromFilename(filename)
  
  if IsValidTitle(title_from_name):
    return CleanTitle(title_from_name)
  
  # Try file content
  content = ReadFirstLines(file.path, 20)
  title_from_content = ExtractTitleFromContent(content)
  
  if IsValidTitle(title_from_content):
    return CleanTitle(title_from_content)
  
  # Fallback to generic title
  return "untitled-work-item"
```

## Backup Strategy

### CreateBackup Function
```
CreateBackup(files_to_rename):
  backup_dir = CreateBackupDirectory()
  backup_manifest = []
  
  for file in files_to_rename:
    backup_path = CopyFileToBackup(file.original, backup_dir)
    backup_manifest.append({
      original: file.original,
      backup: backup_path,
      suggested: file.suggested,
      timestamp: GetCurrentTimestamp()
    })
  
  WriteBackupManifest(backup_dir + "/manifest.json", backup_manifest)
  
  Log("Backup created: " + backup_dir)
  return backup_dir
```

### Backup Directory Structure
```
backups/
└── rename-operation-2025-01-09-14-30-15/
    ├── manifest.json              # Rename operation metadata
    ├── stories/                   # Original files organized by type
    │   ├── example-auth-system.txt
    │   └── STORY-001-mcp-installation.md
    ├── bugs/
    └── prbs/
```

## Cross-Reference Updates

### FindCrossReferences Function
```
FindCrossReferences(old_name, new_name):
  search_directories = GetAllProjectDirectories()
  references = []
  
  # Extract identifier patterns to search for
  old_id = ExtractWorkItemID(old_name)
  patterns = GenerateSearchPatterns(old_id, old_name)
  
  for directory in search_directories:
    files = ListTextFiles(directory)
    
    for file in files:
      content = ReadFile(file.path)
      
      for pattern in patterns:
        matches = FindMatches(content, pattern)
        if matches.length > 0:
          references.append({
            file: file.path,
            matches: matches,
            pattern: pattern
          })
  
  return references
```

### UpdateCrossReferences Function
```
UpdateCrossReferences(references, old_name, new_name):
  updated_files = []
  
  for ref in references:
    content = ReadFile(ref.file)
    updated_content = content
    
    for match in ref.matches:
      replacement = GenerateReplacement(match, old_name, new_name)
      updated_content = ReplaceMatch(updated_content, match, replacement)
    
    if updated_content != content:
      WriteFile(ref.file, updated_content)
      updated_files.append(ref.file)
      Log("Updated references in: " + ref.file)
  
  return updated_files
```

## Execution Flow

### Main Execution Logic
```
ExecuteRenameOperation(options):
  1. **Validation:**
     - Validate command options
     - Check project structure and permissions
  
  2. **Scanning:**
     - Scan target directories for non-compliant files
     - Filter by category/directory if specified
     - Calculate rename confidence scores
  
  3. **Planning:**
     - Generate suggested names for all files
     - Detect potential conflicts and collisions
     - Calculate cross-reference update scope
  
  4. **User Confirmation:**
     - Display rename plan to user
     - Show files to be renamed and suggested names
     - Confirm backup and cross-reference update options
  
  5. **Backup Creation:**
     - Create backup directory with timestamp
     - Copy all files to be renamed to backup
     - Generate backup manifest
  
  6. **Renaming:**
     - Rename files in dependency order
     - Update internal file references where needed
     - Log all operations
  
  7. **Cross-Reference Updates:**
     - Find all files referencing renamed items
     - Update references with new names/IDs
     - Log updated files
  
  8. **Validation:**
     - Verify all renames completed successfully
     - Check no broken references remain
     - Validate new names follow format
  
  9. **Cleanup:**
     - Update git index if needed
     - Clear relevant caches
     - Generate operation report
```

## Safety Measures

### Pre-Execution Validation
```
Safety Checks:
- Project boundaries: Only rename files within project directory
- Backup space: Ensure adequate disk space for backups
- File permissions: Verify write access to all target files
- Git status: Warn if uncommitted changes exist
- Active processes: Check if any files are in use
```

### Rollback Capability
```
RollbackRename(backup_directory):
  manifest = ReadBackupManifest(backup_directory + "/manifest.json")
  
  for entry in manifest:
    if FileExists(entry.suggested):
      # Restore original file from backup
      CopyFile(entry.backup, entry.original)
      DeleteFile(entry.suggested)
      Log("Restored: " + entry.original)
  
  Log("Rollback completed from: " + backup_directory)
```

## Reporting

### Operation Report Format
```
=== WORK ITEM RENAME OPERATION REPORT ===
Date: 2025-01-09 14:30:15
Backup: backups/rename-operation-2025-01-09-14-30-15/

Files Renamed: 12
- STORY: 8 files
- BUG: 3 files  
- PRB: 1 file

Cross-References Updated: 23 files
- Documentation: 15 files
- PRB templates: 5 files
- Configuration: 3 files

Errors: 0
Warnings: 2
- Warning: Could not determine parent for bugs/legacy-issue.md
- Warning: Title truncated for stories/very-long-filename-example.txt

Operation Status: SUCCESS
Rollback Available: Yes
```

### Error Handling
```
Error Types:
- FILE_ACCESS_ERROR: Cannot read/write file
- NAME_COLLISION: Generated name already exists
- REFERENCE_UPDATE_FAILED: Cannot update cross-reference
- BACKUP_FAILED: Cannot create backup
- PERMISSION_DENIED: Insufficient permissions
```

## Integration Points

### With Git Operations
- **Pre-commit Hook:** Validate renamed files before commit
- **Git Add:** Automatically stage renamed files
- **Commit Message:** Generate descriptive commit for rename operation

### With Memory System
- **Pattern Storage:** Store successful rename patterns
- **Learning:** Improve title extraction and category detection
- **Statistics:** Track rename success rates and common issues

### With Validation System
- **Post-rename Validation:** Verify all renamed files follow format
- **Reference Integrity:** Check no broken references remain
- **Number Sequence:** Validate numbering remains consistent

---
*File renaming command for intelligent-claude-code work item compliance*