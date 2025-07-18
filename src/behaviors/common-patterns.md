# Common Behavioral Patterns

**PURPOSE:** Shared patterns to reduce duplication across behavioral modules (80% reduction)

## Core Patterns

### Settings Access Pattern
```pseudocode
FUNCTION GetSettings():
    RETURN SettingsAPI.getSettings()
```

### Memory Storage Pattern
```pseudocode
FUNCTION StoreInMemory(entity):
    // Use file-based memory implementation
    RETURN FileBasedMemory.StoreInMemory(entity)

FUNCTION LoadFromMemory(entityName):
    // Use file-based memory implementation
    RETURN FileBasedMemory.LoadFromMemory(entityName)

FUNCTION SearchMemory(query):
    // Use file-based memory implementation
    RETURN FileBasedMemory.SearchMemory(query)
```

### Priority Calculation Pattern
```pseudocode
FUNCTION CalculatePriority(item, parent):
    base_priority = parent ? parent.priority : item.priority
    IF item.severity == "CRITICAL": RETURN 0
    IF item.type == "security": RETURN 0
    IF item.type == "architecture": RETURN MAX(base_priority - 1, 0)
    RETURN base_priority
```

### Role Activation Pattern
```pseudocode
FUNCTION ActivateRole(roleName):
    RETURN RoleActivationController().activateRole(roleName)
```

### Validation Interception Pattern
```pseudocode
FUNCTION InterceptValidation(operation):
    missing = detectMissingSteps(operation)
    FOR step IN missing: autoExecuteStep(step)
    RETURN executeWithCompliance(operation)
```

### Learning Detection Pattern
```pseudocode
FUNCTION DetectLearning(content):
    patterns = ["based on previous learning", "applying lesson from", "to prevent repeat of"]
    FOR pattern IN patterns:
        IF content.includes(pattern): RETURN {detected: true, bonus: 0.5}
    RETURN {detected: false}
```

### Task Execution Pattern
```pseudocode
FUNCTION ExecuteTaskPattern(taskId):
    task = readTask(taskId)
    ActivateRole(task.assigned_to)
    searchMemory(task.context)
    result = executeWork(task)
    updateProgress(task, result)
    captureLearning(task, result)
    RETURN result
```

### Error Handling Pattern
```pseudocode
FUNCTION HandleError(error):
    IF isFirstOccurrence(error):
        createLearning(error)
        RETURN {penalty: 0}
    ELSE:
        RETURN {penalty: basePenalty * 2}
```

### Git Privacy Pattern
```pseudocode
FUNCTION StripAIMentions(content):
    IF NOT GetSettings().git_privacy: RETURN content
    patterns = ["AI-generated", "Claude", "🤖", "Co-Authored-By: Claude"]
    FOR pattern IN patterns: content = content.replace(pattern, "")
    RETURN content
```

### Selective Loading Pattern
```pseudocode
FUNCTION LoadModuleSelectively(path, offset, limit):
    cache = SessionFileCache.getInstance()
    content = cache.getCachedContent(path, "module", {offset: offset, limit: limit})
    RETURN parseRelevantSections(content)
```

## Integration Points

All behavioral modules should use these patterns instead of reimplementing:
- Replace inline settings access with `GetSettings()`
- Replace memory operations with `StoreInMemory()`
- Replace priority logic with `CalculatePriority()`
- Replace role switching with `ActivateRole()`
- Replace validation logic with `InterceptValidation()`
- Replace learning detection with `DetectLearning()`
- Replace error handling with `HandleError()`
- Replace git privacy with `StripAIMentions()`

This consolidation reduces ~15,000 tokens of duplicate code across modules.

---
*Shared patterns for token-efficient behavioral implementation*