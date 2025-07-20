# Work Discovery Engine

**Purpose:** Continuously discover and queue new work for L3 autonomous execution

## Discovery Loop

**Continuous Scanning:** Use `/icc-discover-work [scan_interval]` to run every 30 seconds, check all sources, process found work, and add to queue  
**Source Registration:** Use `/icc-register-discovery-sources` for Bug scanner • Story scanner • Dependency checker • Follow-up finder  
**Deduplication:** Use `/icc-discover-work` with automatic deduplication tracking and state management

## Work Sources

**Bug Scanner:** Use `/icc-scan-bugs` to glob epics/**/bugs/*/bug.yaml, parse YAML, check status PLANNED/IN PROGRESS, filter by phase, and queue undiscovered bugs

**Story Scanner:** Use `/icc-scan-stories` to glob epics/**/stories/*/story.yaml, parse YAML, check active status, and queue for processing

**Dependency Checker:** Use `/icc-scan-dependencies` to find blocked tasks, check blocker resolution, and mark ready tasks for queue addition

**Follow-Up Finder:** Use `/icc-scan-followups` to check completed reviews, find unaddressed issues, check unresolved errors, and generate follow-up tasks

## Work Processing

**Item Processing:** Use `/icc-process-discovered-work [work_items]` to handle bug processing (create tasks if needed), story processing (trigger planning or queue tasks), and task processing (direct queue addition with readiness checks)

**Planning Triggers:** Use `/icc-trigger-planning [story_id]` for stories with no tasks in PLAN phase to trigger task creation and phase updates

## Prioritization

**Priority Calculation:** Use `/icc-prioritize [discovered_items]` to apply priority formula, sort by priority, and return ordered list  
**Priority Reference:** Security(0) → Customer(1) → Blocking(2) → Feature(3)

## Configuration

```yaml
discovery_settings:
  scan_interval: 30000  # 30 seconds
  
  sources:
    bugs: true
    stories: true
    follow_ups: true
    unblocked: true
    
  priorities:
    security: 0
    customer: 1
    blocking: 2
    feature: 3
```

## Benefits

- **Continuous Discovery**: Always finding new work
- **Dependency Awareness**: Automatically unblocks work
- **Follow-Up Creation**: Never misses required fixes
- **Smart Prioritization**: Important work surfaces first