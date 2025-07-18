# Archival Intelligence

**CORE:** Command-driven archival • Cascading hierarchy • Git-aware operations • Workspace management

**CASCADING BEHAVIOR:** Epic → Stories → Tasks (automatic child archival when parent archived)

## ARCHIVAL DETECTION ENGINE

```pseudocode
FUNCTION initializeArchivalIntelligence():
    archivalDecider = new ArchivalDecisionEngine(); gitOperator = new GitAwareFileOperator(); registerArchivalCommands(); integrateWithManualWorkflow()

FUNCTION detectCompleted():
    candidates = []; epics = getAllEpics()
    FOR EACH epic IN epics:
        IF epic.status == "COMPLETED" AND epic.phase == "ARCHIVED":
            IF isReadyForArchival(epic): candidates.append({type: "epic", item: epic}); CONTINUE
        
        FOR EACH bug IN getBugsForEpic(epic):
            IF bug.status == "COMPLETED" AND bug.phase == "ARCHIVED" AND isReadyForArchival(bug): candidates.append({type: "bug", item: bug})
        
        FOR EACH story IN getStoriesForEpic(epic):
            IF story.status == "COMPLETED" AND story.phase == "ARCHIVED" AND isReadyForArchival(story): candidates.append({type: "story", item: story})
    
    RETURN candidates

FUNCTION isReadyForArchival(item):
    IF item.status != "COMPLETED" OR item.phase != "ARCHIVED": RETURN false
    
    IF item.type == "epic":
        FOR EACH story IN getStoriesForEpic(item): IF story.status != "COMPLETED": RETURN false
        FOR EACH bug IN getBugsForEpic(item): IF bug.status != "COMPLETED": RETURN false
    ELSE:
        FOR EACH task IN getTasksForItem(item): IF task.status != "COMPLETED": RETURN false
    
    RETURN NOT hasActiveReferences(item)
```

## ARCHIVAL DECISION ENGINE

```pseudocode
FUNCTION processArchivalCandidate(candidate):
    decision = archivalDecider.analyze(candidate)
    IF decision.shouldArchive: executeArchival(candidate)
    ELSE: logSkipReason(candidate, decision.reason)

FUNCTION executeArchival(candidate):
    TRY:
        archivePath = prepareArchivePath(candidate)
        IF candidate.type IN ["bug", "story", "epic"]: archiveMainItem(candidate, archivePath)
        
        // CASCADE ARCHIVAL
        IF candidate.type == "epic":
            FOR EACH story IN getStoriesForEpic(candidate.item):
                IF story.status == "COMPLETED" AND story.phase == "ARCHIVED": executeArchival({type: "story", item: story})
        ELSE IF candidate.type IN ["story", "bug"]:
            FOR EACH task IN getTasksForItem(candidate.item):
                IF task.status == "COMPLETED": archiveTask(task, archivePath)
        
        updateGitIgnore(archivePath); commitArchival(candidate); logArchivalSuccess(candidate)
        
    CATCH error: rollbackArchival(candidate); logArchivalError(candidate, error)

FUNCTION prepareArchivePath(candidate):
    baseArchivePath = candidate.type IN ["bug", "story", "epic"] ? "archives/completed/" : "archives/tasks/"
    typePath = baseArchivePath + candidate.type + "s/"
    date = candidate.item.completed_date OR getCurrentDate()
    fullPath = typePath + getYear(date) + "/" + getMonth(date) + "/"
    EnsureDirectory(fullPath)  // Use common pattern
    RETURN fullPath
```

## GIT-AWARE FILE OPERATIONS

```pseudocode
FUNCTION archiveMainItem(candidate, archivePath):
    sourcePath = getItemPath(candidate)
    itemName = candidate.item.id + "-" + sanitize(candidate.item.title)
    destinationPath = archivePath + itemName + "/"
    
    createArchivalSummary(candidate, destinationPath)
    
    IF isGitTracked(sourcePath): executeGitCommand("git mv " + sourcePath + " " + destinationPath)
    ELSE: moveDirectory(sourcePath, destinationPath)

FUNCTION createArchivalSummary(candidate, destinationPath):
    summary = "# ARCHIVED: " + candidate.item.title + "\n\n**Type:** " + candidate.type + "\n**ID:** " + candidate.item.id + "\n**Status:** " + candidate.item.status + "\n**Phase:** " + candidate.item.phase + "\n**Archived Date:** " + getCurrentDate() + "\n\n"
    
    IF candidate.type == "epic":
        stories = getStoriesForEpic(candidate.item); bugs = getBugsForEpic(candidate.item)
        summary += "## Cascading Archival\nThis epic archive includes all child stories and their tasks.\n\n**Archived Stories:** " + stories.length + "\n**Archived Bugs:** " + bugs.length + "\n\n"
    ELSE IF candidate.type IN ["story", "bug"]:
        tasks = getTasksForItem(candidate.item)
        summary += "**Archived Tasks:** " + tasks.length + "\n\n"
    
    writeFile(destinationPath + "ARCHIVED.md", summary)

FUNCTION archiveTask(task, archivePath):
    sourcePath = getTaskPath(task)
    taskArchivePath = archivePath + "../tasks/" + getParentInfo(task) + "/"
    EnsureDirectory(taskArchivePath)  // Use common pattern
    moveFile(sourcePath, taskArchivePath + task.filename)

FUNCTION updateGitIgnore(archivePath):
    gitignorePath = ".gitignore"
    gitignoreContent = getCachedFileContent(gitignorePath, "gitignore")
    taskIgnorePath = "archives/tasks/"
    
    IF NOT gitignoreContent.contains(taskIgnorePath):
        gitignoreContent += "\n# Archived tasks (not tracked)\n" + taskIgnorePath + "\n"
        writeFile(gitignorePath, gitignoreContent)
        invalidateCachedFile(gitignorePath)
        executeGitCommand("git add .gitignore")
```

## ARCHIVAL COMMANDS

```pseudocode
FUNCTION registerArchivalCommands():
    registerCommand("icc:archive-completed", executeArchivalOfCompleted)
    registerCommand("icc:archive-item", executeManualArchival)
    registerCommand("icc:restore-archived", executeRestoration)
    registerCommand("icc:archive-status", showArchivalStatus)

FUNCTION executeArchivalOfCompleted(options):
    IF options.dryRun: showArchivalPreview(detectCompleted()); RETURN
    
    candidates = detectCompleted(); successCount = 0
    FOR EACH candidate IN candidates:
        IF executeArchival(candidate): successCount++
    showArchivalSummary(successCount, candidates.length)

FUNCTION executeManualArchival(itemId):
    item = findItemById(itemId)
    IF NOT item: showError("Item not found: " + itemId); RETURN
    IF item.status != "COMPLETED": showWarning("Item not completed: " + itemId); IF NOT confirmArchival(): RETURN
    executeArchival({type: getItemType(item), item: item})
```

## RESTORATION SYSTEM

```pseudocode
FUNCTION executeRestoration(itemId):
    archivedItem = searchArchives(itemId)
    IF NOT archivedItem: showError("Archived item not found: " + itemId); RETURN
    
    TRY:
        originalPath = determineOriginalPath(archivedItem)
        IF archivedItem.type IN ["bug", "story"]: executeGitCommand("git mv " + archivedItem.path + " " + originalPath)
        restoreTasks(archivedItem, originalPath)
        updateItemStatus(archivedItem, "RESTORED")
        commitRestoration(archivedItem)
        showSuccess("Restored: " + itemId)
    CATCH error:
        rollbackRestoration(archivedItem)
        showError("Restoration failed: " + error)

FUNCTION searchArchives(itemId):
    gitArchives = searchDirectory("archives/completed/", itemId)
    IF gitArchives: RETURN gitArchives[0]
    taskArchives = searchDirectory("archives/tasks/", itemId)
    IF taskArchives: RETURN taskArchives[0]
    RETURN null
```

## INTEGRATION WITH LEAN WORKFLOW

```pseudocode
FUNCTION integrateWithManualWorkflow():
    extendPMCommands({"archive": executeManualArchival, "archive-completed": executeArchivalOfCompleted, "archive-status": showArchivalStatus, "restore": executeRestoration})

FUNCTION checkParentForArchival(item):
    allTasks = getTasksForItem(item)
    completedTasks = allTasks.filter(t => t.status == "COMPLETED")
    RETURN completedTasks.length == allTasks.length AND item.status == "COMPLETED" AND item.phase == "ARCHIVED"
```

## BEHAVIORAL ENFORCEMENT

```pseudocode
PATTERNS = {require_completed_status: true, require_archived_phase: true, batch_processing: true, preview_mode: true, auto_commit: true, preserve_history: true, cascading_archival: true, recursive_execution: true}

FUNCTION validateArchival(candidate):
    checks = [checkCompletionStatus(candidate), checkDependencies(candidate), checkReferences(candidate)]
    IF candidate.manual: checks.append(getUserConfirmation(candidate))
    RETURN checks.all(check => check.passed)

FUNCTION captureArchivalLearning(result):
    learning = result.success ? {type: "archival-success", pattern: result.pattern, efficiency: result.efficiency} : {type: "archival-failure", error: result.error, prevention: analyzeFailure(result)}
    storeInMemory(learning)
```

## PM COMMAND EXTENSIONS

```yaml
pm_commands:
  archive-completed: {description: "Archive all items with status:COMPLETED and phase:ARCHIVED", usage: "@PM archive-completed [--dry-run]"}
  archive-item: {description: "Archive a specific item by ID", usage: "@PM archive-item ITEM-ID"}
  archive-status: {description: "Show current archival candidates and metrics", usage: "@PM archive-status"}
  restore: {description: "Restore a previously archived item", usage: "@PM restore ITEM-ID"}
```

## ARCHIVAL METRICS

```pseudocode
FUNCTION getArchivalMetrics():
    RETURN {total_archived: countArchivedItems(), bugs_archived: countArchivedByType("bugs"), stories_archived: countArchivedByType("stories"), tasks_archived: countArchivedByType("tasks"), archival_candidates: detectCompleted().length, errors: getArchivalErrorCount(), restorations: getRestorationCount()}

FUNCTION countArchivedItems():
    bugCount = countFilesInDirectory("archives/completed/bugs/")
    storyCount = countFilesInDirectory("archives/completed/stories/")
    taskCount = countFilesInDirectory("archives/tasks/")
    RETURN bugCount + storyCount + taskCount
```

## ERROR HANDLING

```pseudocode
FUNCTION rollbackArchival(candidate):
    IF gitOperationsStarted: executeGitCommand("git reset --hard HEAD")
    IF filesMoved: restoreMovedFiles(candidate.rollbackInfo)
    logRollback(candidate, "Archival failed - rolled back")

FUNCTION recoverFromError(error, candidate):
    SWITCH error.type:
        CASE "git_error": handleGitError(error)
        CASE "file_permission": handlePermissionError(error)
        CASE "disk_space": handleDiskSpaceError(error)
        DEFAULT: logUnknownError(error)
    notifyArchivalError(candidate, error)
```

## ARCHIVE STRUCTURE

```
archives/
├── completed/              # Git-tracked
│   ├── epics/
│   │   └── 2025/
│   │       └── 01/
│   │           └── EPIC-001-user-management/
│   │               ├── ARCHIVED.md
│   │               ├── epic.yaml
│   │               └── (cascaded stories moved here)
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
            ├── EPIC-001/   # Tasks from cascaded stories
            │   ├── STORY-001/
            │   │   ├── TASK-001-design.md
            │   │   └── TASK-002-develop.md
            │   └── STORY-002/
            │       └── TASK-001-test.md
            ├── BUG-001/
            │   ├── TASK-001-investigate.md
            │   └── TASK-002-implement.md
            └── STORY-001/
                ├── TASK-001-design.md
                └── TASK-002-develop.md
```

---

**ARCHIVAL:** Command-driven detection • Cascading hierarchy • Git-aware operations • Clean workspace • Historical preservation

**USAGE:** `@PM archive-completed` to archive all completed items, `@PM archive-item ITEM-ID` for specific items. Parent archival automatically cascades to children.