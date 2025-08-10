# /icc-rename-work-items

**PURPOSE:** Rename work items to standard format

## Syntax
```
/icc-rename-work-items [options]
```

## Options
| Option | Description |
|--------|-------------|
| --dry-run | Preview changes only |
| --category CATEGORY | Specific category only |
| --directory DIR | Target directory |
| --force | Skip confirmation |

## Naming Format
`<CATEGORY>-<NUMBER>-<TITLE>-<DATE>.md`

### Non-Compliant File Detection Process

**Steps to Scan for Files Needing Renaming:**
1. **Initialize Collection:** Create empty list for non-compliant files
2. **For Each Target Directory:**
   - **List Files:** Get all .md, .yaml, and .yml files in directory
   - **Check Each File:**
     - Get the base filename (without path)
     - **Skip Already Compliant:** If filename already follows naming standard, continue to next file
     - **Detect Category:** Determine work item type from content or location
     - **Skip Non-Work Items:** If not a work item, continue to next file
     - **Generate Suggestion:** Create compliant name suggestion
     - **Record for Renaming:** Add to non-compliant list with original path, suggested name, category, and confidence score
3. **Return Results:** Return list of files needing renaming

### Category Detection Process

**Steps to Detect Work Item Category:**
1. **Check Filename Patterns:** Look for category indicators in filename:
   - If filename contains "story" or "STORY" → Return "STORY"
   - If filename contains "bug", "BUG", or "issue" → Return "BUG"  
   - If filename contains "epic" or "EPIC" → Return "EPIC"
   - If filename contains "prb", "PRB", or has ".prb.yaml" extension → Return "PRB"

2. **Check File Location:** If filename didn't indicate category, check directory:
   - If in "stories" directory → Detect specific story type (STORY or EPIC)
   - If in "bugs" directory → Return "BUG"
   - If in "prbs" directory → Return "PRB"

3. **Check File Content:** If location didn't help, read first 10 lines and check for keywords:
   - If contains "epic" or "large initiative" → Return "EPIC"
   - If contains "story", "user story", or "feature" → Return "STORY"
   - If contains "bug", "issue", or "defect" → Return "BUG"
   - If contains "PRB" or "requirement blueprint" → Return "PRB"

4. **Return Result:** If no category detected, return null (cannot determine category)

## Name Generation Logic

### Compliant Name Generation Process

**Steps to Generate Compliant Name:**
1. **Extract Title:** Get descriptive title from existing filename or file content
2. **Generate Number:** Use numbering service to get next available number for category
3. **Detect Parent Reference:** Check if file references parent work item (for PRBs)
4. **Determine Date:** Use file creation date or current date (YYYY-MM-DD format)
5. **Build Name Format:**
   - **With Parent:** {parent_id}-{category}-{number}-{title}-{date}
   - **Without Parent:** {category}-{number}-{title}-{date}
6. **Add Extension:** Determine appropriate extension (.md, .prb.yaml, etc.)
7. **Return Complete Name:** Return fully formatted compliant filename

### Title Extraction Process

**Steps to Extract Title from File:**
1. **Try Filename First:** Extract potential title from current filename
   - If filename yields valid title: Clean and return it
2. **Try File Content:** If filename didn't work, read first 20 lines of file
   - Extract potential title from content (headers, first line, etc.)
   - If content yields valid title: Clean and return it  
3. **Fallback to Generic:** If neither filename nor content provided good title:
   - Return "untitled-work-item" as fallback

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
*Command reference*