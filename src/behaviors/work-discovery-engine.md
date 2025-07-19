# Work Discovery Engine

**Purpose:** Continuously discover and queue new work for L3 autonomous execution

## Discovery Loop

**Continuous Scanning:** Run every 30 seconds → Check all sources → Process found work → Add to queue  
**Source Registration:** Bug scanner • Story scanner • Dependency checker • Follow-up finder  
**Deduplication:** Track discovered items → Prevent duplicate processing → Maintain state

## Work Sources

### Bug Scanner
**Bug Discovery:** Glob epics/**/bugs/*/bug.yaml → Parse YAML → Check status PLANNED/IN PROGRESS  
**Phase Filter:** Only PLAN or EXECUTE phase → Skip completed/archived  
**Queue Addition:** Add undiscovered bugs → Mark as discovered

### Story Scanner  
**Story Discovery:** Glob epics/**/stories/*/story.yaml → Parse YAML → Check active status  
**Status Check:** PLANNED or IN PROGRESS → Skip completed  
**Processing:** Add to discovery set → Queue for processing

### Dependency Checker
**Unblock Tasks:** Find blocked tasks → Check if blockers resolved → Mark as ready  
**Resolution:** All dependencies complete → Remove block → Add to queue  
**Logging:** Track unblocked items → Report progress

### Follow-Up Finder
**Review Follow-Ups:** Check completed reviews → Find unaddressed issues → Create fix tasks  
**Error Follow-Ups:** Find unresolved errors → Check for existing fixes → Create if missing  
**Task Generation:** Generate follow-up tasks → Add to work queue

## Work Processing

### Item Processing
**Bug Processing:** IF no tasks: Create tasks → Queue ready tasks → Track progress  
**Story Processing:** IF PLAN phase: Trigger planning → ELSE: Queue executable tasks  
**Task Processing:** Direct queue addition → Check execution readiness

### Planning Triggers
**Story Planning:** No tasks + PLAN phase → Trigger task creation → Update phase  
**Task Creation:** Follow outer workflow → Generate task files → Update story

## Prioritization

**Priority Calculation:** Apply priority formula → Sort by priority → Return ordered list  
**Priority Levels:**
- Security: 0 (highest)
- Customer: 1
- Blocking: 2  
- Feature: 3 (lowest)

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