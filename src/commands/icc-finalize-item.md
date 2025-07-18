# ICC Finalize Item Command

**PURPOSE:** Finalize work items, transition to DONE, and prepare for archival  
**ACCESS:** PM role only  
**PHASE:** EXECUTING → FINALIZING → DONE → ARCHIVED

## Command Pattern

```
/icc-finalize-item [ITEM-ID]
```

## Implementation

```pseudocode
FUNCTION executeFinalizeItem(itemId):
    // STAGE 5: FINALIZING
    
    // 1. ROLE VALIDATION
    IF NOT hasRole("PM"):
        RETURN "❌ Error: Only @PM can finalize items"
    
    // 2. FIND AND VALIDATE ITEM
    item = findItemById(itemId)
    IF NOT item:
        RETURN "❌ Error: Item not found: " + itemId
    
    // 3. PHASE VALIDATION
    IF item.phase != "EXECUTING":
        RETURN "❌ Error: Item must be in EXECUTING phase to finalize. Current: " + item.phase
    
    // 4. COMPLETION VALIDATION
    validation = validateCompletionReadiness(item)
    IF NOT validation.ready:
        RETURN formatValidationErrors(validation)
    
    // 5. TRANSITION TO FINALIZING
    item.phase = "FINALIZING"
    logPhaseTransition(item, "EXECUTING", "FINALIZING")
    
    // 6. CAPTURE FINAL METRICS
    metrics = captureFinalMetrics(item)
    item.final_metrics = metrics
    
    // 7. GENERATE FINAL LEARNINGS
    learnings = generateFinalLearnings(item)
    captureToMemory(learnings)
    
    // 8. FINALIZE ITEM
    finalizeItem(item)
    
    // 9. UPDATE PARENT EPIC
    updateParentProgress(item)
    
    // 10. PREPARE FOR ARCHIVAL
    prepareForArchival(item)
    
    RETURN formatFinalizationReport(item)

FUNCTION validateCompletionReadiness(item):
    validation = {
        ready: true,
        errors: [],
        warnings: []
    }
    
    // CHECK ALL TASKS COMPLETED
    tasks = getTasksForItem(item)
    incompleteTasks = tasks.filter(t => t.status != "COMPLETED")
    
    IF incompleteTasks.length > 0:
        validation.ready = false
        validation.errors.append("Incomplete tasks: " + 
            incompleteTasks.map(t => t.id).join(", "))
    
    // CHECK ACCEPTANCE CRITERIA
    IF item.acceptance_criteria:
        unmetCriteria = []
        FOR criterion IN item.acceptance_criteria:
            IF NOT criterion.met:
                unmetCriteria.append(criterion.description)
        
        IF unmetCriteria.length > 0:
            validation.ready = false
            validation.errors.append("Unmet acceptance criteria: " + 
                unmetCriteria.join(", "))
    
    // CHECK FOR BLOCKERS
    IF item.blockers AND item.blockers.length > 0:
        activeBlockers = item.blockers.filter(b => b.active)
        IF activeBlockers.length > 0:
            validation.ready = false
            validation.errors.append("Active blockers must be resolved")
    
    // WARNINGS (non-blocking)
    IF NOT item.knowledge_generated:
        validation.warnings.append("No knowledge artifacts generated")
    
    IF tasks.length == 0:
        validation.warnings.append("No tasks found for this item")
    
    RETURN validation

FUNCTION captureFinalMetrics(item):
    metrics = {
        completion_date: getCurrentDate(),
        total_duration: calculateDuration(item.created_date, getCurrentDate()),
        phase_durations: calculatePhaseDurations(item),
        task_metrics: calculateTaskMetrics(item),
        quality_metrics: calculateQualityMetrics(item),
        efficiency_score: calculateEfficiencyScore(item)
    }
    
    // TASK COMPLETION METRICS
    tasks = getTasksForItem(item)
    metrics.task_metrics = {
        total_tasks: tasks.length,
        completed_on_time: tasks.filter(t => t.completed_on_time).length,
        required_rework: tasks.filter(t => t.rework_count > 0).length,
        average_duration: calculateAverageTaskDuration(tasks)
    }
    
    // QUALITY METRICS
    metrics.quality_metrics = {
        review_iterations: item.review_count || 0,
        defects_found: item.defect_count || 0,
        test_coverage: item.test_coverage || "unknown",
        documentation_complete: item.documentation_complete || false
    }
    
    RETURN metrics

FUNCTION generateFinalLearnings(item):
    learnings = []
    
    // EXTRACT PATTERNS FROM SUCCESS
    IF item.final_metrics.efficiency_score > 0.8:
        learnings.append({
            type: "success_pattern",
            title: "Efficient " + item.type + " completion",
            insights: extractSuccessPatterns(item),
            reusability: "high"
        })
    
    // EXTRACT PATTERNS FROM CHALLENGES
    IF item.final_metrics.task_metrics.required_rework > 0:
        learnings.append({
            type: "improvement_area",
            title: "Rework patterns in " + item.type,
            insights: extractReworkPatterns(item),
            prevention: generatePreventionStrategies(item)
        })
    
    // TECHNICAL LEARNINGS
    technicalInsights = extractTechnicalLearnings(item)
    IF technicalInsights.length > 0:
        learnings.append({
            type: "technical_knowledge",
            domain: item.technical_domain,
            insights: technicalInsights
        })
    
    RETURN learnings

FUNCTION finalizeItem(item):
    // TRANSITION TO DONE
    item.phase = "DONE"
    item.status = "COMPLETED"
    item.completed_date = getCurrentDate()
    item.completed_by = getCurrentRole()
    
    // CAPTURE FINAL STATE
    item.final_state = {
        all_tasks_complete: true,
        acceptance_criteria_met: true,
        knowledge_captured: true,
        ready_for_archival: false  // Requires manual archival command
    }
    
    // UPDATE SUMMARY
    item.completion_summary = generateCompletionSummary(item)
    
    // SAVE CHANGES
    saveItem(item)
    
    // LOG COMPLETION
    logItemCompletion(item)

FUNCTION updateParentProgress(item):
    IF item.type IN ["story", "bug"]:
        epic = getParentEpic(item)
        IF epic:
            // UPDATE CHILD COUNTS
            updateEpicChildCounts(epic)
            
            // CHECK EPIC COMPLETION
            IF allChildrenComplete(epic):
                epic.ready_for_completion = true
                logInfo("Epic " + epic.id + " ready for completion")
            
            // UPDATE EPIC PROGRESS
            epic.progress = calculateEpicProgress(epic)
            saveEpic(epic)

FUNCTION prepareForArchival(item):
    // TRANSITION TO ARCHIVED PHASE
    item.phase = "ARCHIVED"
    item.archival_ready = true
    item.archival_eligibility = {
        status_complete: true,
        phase_archived: true,
        all_tasks_complete: true,
        metrics_captured: true,
        learnings_generated: true
    }
    
    // CREATE ARCHIVAL METADATA
    item.archival_metadata = {
        prepared_date: getCurrentDate(),
        prepared_by: getCurrentRole(),
        archive_path: determineArchivePath(item),
        requires_manual_command: true
    }
    
    // SAVE FINAL STATE
    saveItem(item)
    
    // LOG ARCHIVAL READINESS
    logInfo(item.type + " " + item.id + " ready for archival")

FUNCTION formatFinalizationReport(item):
    report = []
    report.append("✅ " + item.type.toUpperCase() + " " + item.id + " Finalized")
    report.append("")
    
    // PHASE TRANSITIONS
    report.append("📊 Phase Transitions:")
    report.append("  EXECUTING → FINALIZING → DONE → ARCHIVED")
    report.append("")
    
    // COMPLETION METRICS
    report.append("📈 Final Metrics:")
    metrics = item.final_metrics
    report.append("  Duration: " + metrics.total_duration)
    report.append("  Tasks: " + metrics.task_metrics.total_tasks + " completed")
    report.append("  Efficiency: " + (metrics.efficiency_score * 100) + "%")
    report.append("")
    
    // LEARNINGS CAPTURED
    IF item.learnings AND item.learnings.length > 0:
        report.append("🧠 Learnings Captured: " + item.learnings.length)
    
    // PARENT UPDATE
    IF item.parent_updated:
        report.append("📦 Parent epic progress updated")
    
    // ARCHIVAL STATUS
    report.append("")
    report.append("🗄️ Archival Status:")
    report.append("  Status: READY")
    report.append("  Command: @PM archive-item " + item.id)
    
    RETURN report.join("\n")

FUNCTION formatValidationErrors(validation):
    output = []
    output.append("❌ Cannot finalize - validation failed:")
    output.append("")
    
    IF validation.errors.length > 0:
        output.append("Errors:")
        FOR error IN validation.errors:
            output.append("  • " + error)
    
    IF validation.warnings.length > 0:
        output.append("")
        output.append("Warnings:")
        FOR warning IN validation.warnings:
            output.append("  ⚠️  " + warning)
    
    RETURN output.join("\n")
```

## Helper Functions

```pseudocode
FUNCTION calculatePhaseDurations(item):
    durations = {}
    phaseHistory = item.phase_history || []
    
    FOR i = 0 TO phaseHistory.length - 1:
        phase = phaseHistory[i]
        nextPhase = phaseHistory[i + 1] || {timestamp: getCurrentDate()}
        
        duration = nextPhase.timestamp - phase.timestamp
        durations[phase.name] = duration
    
    RETURN durations

FUNCTION calculateEfficiencyScore(item):
    factors = []
    
    // ON-TIME COMPLETION
    IF item.completed_date <= item.target_date:
        factors.append(1.0)
    ELSE:
        delay = item.completed_date - item.target_date
        factors.append(MAX(0.5, 1.0 - (delay / item.estimated_duration)))
    
    // REWORK FACTOR
    tasks = getTasksForItem(item)
    reworkRate = tasks.filter(t => t.rework_count > 0).length / tasks.length
    factors.append(1.0 - reworkRate)
    
    // QUALITY FACTOR
    IF item.defect_count == 0:
        factors.append(1.0)
    ELSE:
        factors.append(MAX(0.6, 1.0 - (item.defect_count * 0.1)))
    
    // CALCULATE AVERAGE
    RETURN factors.reduce((a, b) => a + b) / factors.length

FUNCTION generateCompletionSummary(item):
    summary = []
    summary.append(item.title + " completed successfully")
    summary.append("Duration: " + item.final_metrics.total_duration)
    summary.append("Tasks: " + item.final_metrics.task_metrics.total_tasks)
    summary.append("Efficiency: " + (item.final_metrics.efficiency_score * 100) + "%")
    
    RETURN summary.join(" | ")
```

## Error Handling

```pseudocode
FUNCTION handleFinalizationError(error, item):
    SWITCH error.type:
        CASE "INCOMPLETE_TASKS":
            RETURN "Cannot finalize with incomplete tasks. Complete all tasks first."
            
        CASE "UNMET_CRITERIA":
            RETURN "Acceptance criteria not met. Review and complete requirements."
            
        CASE "WRONG_PHASE":
            RETURN "Item must be in EXECUTING phase. Current: " + item.phase
            
        CASE "NO_PERMISSIONS":
            RETURN "Only PM role can finalize items"
            
        DEFAULT:
            logError("Finalization error", error)
            RETURN "Finalization failed: " + error.message
```

## Usage Examples

```bash
# Finalize a completed story
/icc-finalize-item STORY-001
✅ STORY STORY-001 Finalized

📊 Phase Transitions:
  EXECUTING → FINALIZING → DONE → ARCHIVED

📈 Final Metrics:
  Duration: 5 days
  Tasks: 8 completed
  Efficiency: 92%

🧠 Learnings Captured: 3
📦 Parent epic progress updated

🗄️ Archival Status:
  Status: READY
  Command: @PM archive-item STORY-001

# Attempt with incomplete tasks
/icc-finalize-item BUG-002
❌ Cannot finalize - validation failed:

Errors:
  • Incomplete tasks: TASK-004, TASK-005

# Wrong phase
/icc-finalize-item STORY-003
❌ Error: Item must be in EXECUTING phase to finalize. Current: BACKLOG
```

## Integration Points

### With Workflow System
- Updates phase through proper transitions
- Validates completion requirements
- Captures final metrics and learnings

### With Archival System
- Sets phase to ARCHIVED
- Prepares archival metadata
- Does NOT auto-archive (requires manual command)

### With Parent Management
- Updates epic child counts
- Recalculates epic progress
- Flags epic completion readiness

### With Memory System
- Captures learnings to memory
- Stores completion patterns
- Enables future reference

---
*Finalization command for Stage 5 of the enhanced lifecycle management system*