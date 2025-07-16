# Archival Intelligence

**CORE:** Command-driven archival • Completion detection • Git-aware operations • Workspace management

**IMPORTANT:** This is a markdown-based behavioral system for Claude Code. There are no running daemons, background processes, or time-based triggers. All archival operations are initiated manually through PM commands.

## ARCHIVAL DETECTION ENGINE

```pseudocode
// ARCHIVAL DETECTION ENGINE (COMMAND-DRIVEN)
FUNCTION initializeArchivalIntelligence():
    
    // COMMAND-DRIVEN ARCHIVAL SYSTEM
    archivalDecider = new ArchivalDecisionEngine()
    gitOperator = new GitAwareFileOperator()
    
    // MANUAL ARCHIVAL TRIGGERS ONLY
    // This is a markdown-based behavioral system - no daemons
    registerArchivalCommands()
    integrateWithManualWorkflow()
    
END FUNCTION

// COMPLETION DETECTION (EXECUTED ON COMMAND)
FUNCTION detectCompleted():
    
    candidates = []
    
    // SCAN ALL EPICS
    epics = getAllEpics()
    FOR EACH epic IN epics:
        
        // CHECK BUGS
        bugs = getBugsForEpic(epic)
        FOR EACH bug IN bugs:
            IF bug.status == "COMPLETED" AND bug.phase == "ARCHIVED":
                IF isReadyForArchival(bug):
                    candidates.append({type: "bug", item: bug})
        
        // CHECK STORIES  
        stories = getStoriesForEpic(epic)
        FOR EACH story IN stories:
            IF story.status == "COMPLETED" AND story.phase == "ARCHIVED":
                IF isReadyForArchival(story):
                    candidates.append({type: "story", item: story})
    
    RETURN candidates
END FUNCTION

// ARCHIVAL READINESS CHECK
FUNCTION isReadyForArchival(item):
    
    // CHECK COMPLETION STATUS
    IF item.status != "COMPLETED" OR item.phase != "ARCHIVED":
        RETURN false
    
    // CHECK ALL TASKS COMPLETED
    tasks = getTasksForItem(item)
    FOR EACH task IN tasks:
        IF task.status != "COMPLETED":
            RETURN false
    
    // CHECK FOR ACTIVE REFERENCES
    IF hasActiveReferences(item):
        RETURN false
    
    RETURN true
END FUNCTION
```

## ARCHIVAL DECISION ENGINE

```pseudocode
// ARCHIVAL PROCESSING
FUNCTION processArchivalCandidate(candidate):
    
    decision = archivalDecider.analyze(candidate)
    
    IF decision.shouldArchive:
        executeArchival(candidate)
    ELSE:
        logSkipReason(candidate, decision.reason)
    
END FUNCTION

// ARCHIVAL EXECUTION
FUNCTION executeArchival(candidate):
    
    TRY:
        // PREPARE ARCHIVE STRUCTURE
        archivePath = prepareArchivePath(candidate)
        
        // ARCHIVE MAIN ITEM (Bug/Story)
        IF candidate.type IN ["bug", "story"]:
            archiveMainItem(candidate, archivePath)
        
        // ARCHIVE ASSOCIATED TASKS
        tasks = getTasksForItem(candidate.item)
        FOR EACH task IN tasks:
            archiveTask(task, archivePath)
        
        // UPDATE GITIGNORE
        updateGitIgnore(archivePath)
        
        // COMMIT CHANGES
        commitArchival(candidate)
        
        // LOG SUCCESS
        logArchivalSuccess(candidate)
        
    CATCH error:
        rollbackArchival(candidate)
        logArchivalError(candidate, error)
    
END FUNCTION

// ARCHIVE PATH PREPARATION
FUNCTION prepareArchivePath(candidate):
    
    baseArchivePath = ""
    
    IF candidate.type IN ["bug", "story"]:
        // Git-tracked archives
        baseArchivePath = "archives/completed/"
    ELSE:
        // Non-git archives  
        baseArchivePath = "archives/tasks/"
    
    // Add type-specific path
    typePath = baseArchivePath + candidate.type + "s/"
    
    // Add date organization
    date = candidate.item.completed_date OR getCurrentDate()
    year = getYear(date)
    month = getMonth(date)
    
    fullPath = typePath + year + "/" + month + "/"
    
    // Create directories if needed
    ensureDirectoryExists(fullPath)
    
    RETURN fullPath
END FUNCTION
```

## GIT-AWARE FILE OPERATIONS

```pseudocode
// MAIN ITEM ARCHIVAL (Git-tracked)
FUNCTION archiveMainItem(candidate, archivePath):
    
    sourcePath = getItemPath(candidate)
    itemName = candidate.item.id + "-" + sanitize(candidate.item.title)
    destinationPath = archivePath + itemName + "/"
    
    // CREATE ARCHIVED.md SUMMARY
    createArchivalSummary(candidate, destinationPath)
    
    // USE GIT MV FOR TRACKED FILES
    IF isGitTracked(sourcePath):
        executeGitCommand("git mv " + sourcePath + " " + destinationPath)
    ELSE:
        moveDirectory(sourcePath, destinationPath)
    
END FUNCTION

// TASK ARCHIVAL (Not git-tracked)
FUNCTION archiveTask(task, archivePath):
    
    sourcePath = getTaskPath(task)
    taskArchivePath = archivePath + "../tasks/" + getParentInfo(task) + "/"
    
    ensureDirectoryExists(taskArchivePath)
    
    // SIMPLE FILE MOVE (tasks not in git)
    moveFile(sourcePath, taskArchivePath + task.filename)
    
END FUNCTION

// GITIGNORE MANAGEMENT
FUNCTION updateGitIgnore(archivePath):
    
    gitignorePath = ".gitignore"
    gitignoreContent = readFile(gitignorePath)
    
    // ENSURE TASK ARCHIVES IGNORED
    taskIgnorePath = "archives/tasks/"
    IF NOT gitignoreContent.contains(taskIgnorePath):
        gitignoreContent += "\n# Archived tasks (not tracked)\n"
        gitignoreContent += taskIgnorePath + "\n"
        writeFile(gitignorePath, gitignoreContent)
        executeGitCommand("git add .gitignore")
    
END FUNCTION
```

## ARCHIVAL COMMANDS

```pseudocode
// COMMAND REGISTRATION (MANUAL INVOCATION ONLY)
FUNCTION registerArchivalCommands():
    
    // ARCHIVE ALL COMPLETED ITEMS (manual command)
    registerCommand("icc:archive-completed", executeArchivalOfCompleted)
    
    // ARCHIVE SPECIFIC ITEM (manual command)
    registerCommand("icc:archive-item", executeManualArchival)
    
    // RESTORE FROM ARCHIVE (manual command)
    registerCommand("icc:restore-archived", executeRestoration)
    
    // CHECK ARCHIVAL STATUS (manual command)
    registerCommand("icc:archive-status", showArchivalStatus)
    
END FUNCTION

// ARCHIVE ALL COMPLETED ITEMS COMMAND
FUNCTION executeArchivalOfCompleted(options):
    
    IF options.dryRun:
        candidates = detectCompleted()
        showArchivalPreview(candidates)
        RETURN
    
    // ARCHIVE ALL ITEMS THAT MEET CRITERIA
    candidates = detectCompleted()
    successCount = 0
    
    FOR EACH candidate IN candidates:
        IF executeArchival(candidate):
            successCount++
    
    showArchivalSummary(successCount, candidates.length)
    
END FUNCTION

// MANUAL ARCHIVAL COMMAND
FUNCTION executeManualArchival(itemId):
    
    item = findItemById(itemId)
    
    IF NOT item:
        showError("Item not found: " + itemId)
        RETURN
    
    IF item.status != "COMPLETED":
        showWarning("Item not completed: " + itemId)
        IF NOT confirmArchival():
            RETURN
    
    candidate = {type: getItemType(item), item: item}
    executeArchival(candidate)
    
END FUNCTION
```

## RESTORATION SYSTEM

```pseudocode
// RESTORE ARCHIVED ITEMS
FUNCTION executeRestoration(itemId):
    
    // SEARCH ARCHIVES
    archivedItem = searchArchives(itemId)
    
    IF NOT archivedItem:
        showError("Archived item not found: " + itemId)
        RETURN
    
    TRY:
        // DETERMINE RESTORATION PATH
        originalPath = determineOriginalPath(archivedItem)
        
        // RESTORE MAIN ITEM
        IF archivedItem.type IN ["bug", "story"]:
            executeGitCommand("git mv " + archivedItem.path + " " + originalPath)
        
        // RESTORE TASKS
        restoreTasks(archivedItem, originalPath)
        
        // UPDATE STATUS
        updateItemStatus(archivedItem, "RESTORED")
        
        // COMMIT RESTORATION
        commitRestoration(archivedItem)
        
        showSuccess("Restored: " + itemId)
        
    CATCH error:
        rollbackRestoration(archivedItem)
        showError("Restoration failed: " + error)
    
END FUNCTION

// ARCHIVE SEARCH
FUNCTION searchArchives(itemId):
    
    // SEARCH GIT-TRACKED ARCHIVES
    gitArchives = searchDirectory("archives/completed/", itemId)
    IF gitArchives:
        RETURN gitArchives[0]
    
    // SEARCH TASK ARCHIVES
    taskArchives = searchDirectory("archives/tasks/", itemId)
    IF taskArchives:
        RETURN taskArchives[0]
    
    RETURN null
END FUNCTION
```

## INTEGRATION WITH LEAN WORKFLOW (MANUAL COMMANDS)

```pseudocode
// MANUAL WORKFLOW INTEGRATION
FUNCTION integrateWithManualWorkflow():
    
    // REGISTER PM COMMANDS FOR MANUAL ARCHIVAL
    extendPMCommands({
        "archive": executeManualArchival,
        "archive-completed": executeArchivalOfCompleted,
        "archive-status": showArchivalStatus,
        "restore": executeRestoration
    })
    
END FUNCTION

// PARENT ARCHIVAL CHECK (ON-DEMAND)
FUNCTION checkParentForArchival(item):
    
    // CHECK IF ALL TASKS ARE COMPLETED
    allTasks = getTasksForItem(item)
    completedTasks = allTasks.filter(t => t.status == "COMPLETED")
    
    IF completedTasks.length == allTasks.length:
        IF item.status == "COMPLETED" AND item.phase == "ARCHIVED":
            RETURN true  // Ready for archival
    
    RETURN false
    
END FUNCTION
```

## BEHAVIORAL ENFORCEMENT

```pseudocode
// ARCHIVAL PATTERNS
PATTERNS = {
    require_completed_status: true,
    require_archived_phase: true,
    batch_processing: true,
    preview_mode: true,
    auto_commit: true,
    preserve_history: true
}

// SAFETY CHECKS
FUNCTION validateArchival(candidate):
    
    checks = []
    
    // COMPLETION CHECK
    checks.append(checkCompletionStatus(candidate))
    
    // DEPENDENCY CHECK
    checks.append(checkDependencies(candidate))
    
    // REFERENCE CHECK
    checks.append(checkReferences(candidate))
    
    // USER CONFIRMATION (if manual)
    IF candidate.manual:
        checks.append(getUserConfirmation(candidate))
    
    RETURN checks.all(check => check.passed)
    
END FUNCTION

// LEARNING INTEGRATION
FUNCTION captureArchivalLearning(result):
    
    IF result.success:
        learning = {
            type: "archival-success",
            pattern: result.pattern,
            efficiency: result.efficiency
        }
    ELSE:
        learning = {
            type: "archival-failure", 
            error: result.error,
            prevention: analyzeFailure(result)
        }
    
    storeInMemory(learning)
    
END FUNCTION
```

## PM COMMAND EXTENSIONS

```yaml
pm_commands:
  archive-completed:
    description: "Archive all items with status:COMPLETED and phase:ARCHIVED"
    usage: "@PM archive-completed [--dry-run]"
    options:
      - dry-run: Preview what would be archived without executing
    
  archive-item:
    description: "Archive a specific item by ID"
    usage: "@PM archive-item ITEM-ID"
    
  archive-status:
    description: "Show current archival candidates and metrics"
    usage: "@PM archive-status"
    
  restore:
    description: "Restore a previously archived item"
    usage: "@PM restore ITEM-ID"
```

## ARCHIVAL METRICS

```pseudocode
FUNCTION getArchivalMetrics():
    
    // CALCULATE METRICS ON-DEMAND
    metrics = {
        total_archived: countArchivedItems(),
        bugs_archived: countArchivedByType("bugs"),
        stories_archived: countArchivedByType("stories"),
        tasks_archived: countArchivedByType("tasks"),
        archival_candidates: detectCompleted().length,
        errors: getArchivalErrorCount(),
        restorations: getRestorationCount()
    }
    
    RETURN metrics
    
END FUNCTION

// COUNT ARCHIVED ITEMS
FUNCTION countArchivedItems():
    
    // COUNT IN ARCHIVE DIRECTORIES
    bugCount = countFilesInDirectory("archives/completed/bugs/")
    storyCount = countFilesInDirectory("archives/completed/stories/")
    taskCount = countFilesInDirectory("archives/tasks/")
    
    RETURN bugCount + storyCount + taskCount
    
END FUNCTION
```

## ERROR HANDLING

```pseudocode
// ROLLBACK MECHANISM
FUNCTION rollbackArchival(candidate):
    
    // GIT OPERATIONS ROLLBACK
    IF gitOperationsStarted:
        executeGitCommand("git reset --hard HEAD")
    
    // FILE OPERATIONS ROLLBACK
    IF filesMoved:
        restoreMovedFiles(candidate.rollbackInfo)
    
    // LOG ROLLBACK
    logRollback(candidate, "Archival failed - rolled back")
    
END FUNCTION

// ERROR RECOVERY
FUNCTION recoverFromError(error, candidate):
    
    SWITCH error.type:
        CASE "git_error":
            handleGitError(error)
        CASE "file_permission":
            handlePermissionError(error)
        CASE "disk_space":
            handleDiskSpaceError(error)
        DEFAULT:
            logUnknownError(error)
    
    // NOTIFY USER
    notifyArchivalError(candidate, error)
    
END FUNCTION
```

## ARCHIVE STRUCTURE

```
archives/
├── completed/              # Git-tracked
│   ├── bugs/
│   │   └── 2025/
│   │       └── 01/
│   │           └── BUG-001-login-error/
│   │               ├── ARCHIVED.md
│   │               └── bug.yaml
│   └── stories/
│       └── 2025/
│           └── 01/
│               └── STORY-001-user-auth/
│                   ├── ARCHIVED.md
│                   └── story.yaml
└── tasks/                  # Not git-tracked (.gitignore)
    └── 2025/
        └── 01/
            ├── BUG-001/
            │   ├── TASK-001-investigate.md
            │   └── TASK-002-implement.md
            └── STORY-001/
                ├── TASK-001-design.md
                └── TASK-002-develop.md
```

---

**ARCHIVAL:** Command-driven detection • Git-aware operations • Clean workspace • Historical preservation

**REMEMBER:** This system is entirely manual. Use `@PM archive-completed` to archive completed items, or `@PM archive-item ITEM-ID` for specific items. No automatic archival occurs.