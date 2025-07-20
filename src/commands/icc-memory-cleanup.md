# Memory Cleanup

Clean and optimize memory system with aging, archival, and maintenance using $ARGUMENTS.

## Behavior
Manage memory health through exponential aging, archival, duplicate detection, and optimization.

## Arguments
**Format:** "operation:age|archive|dedupe|optimize | scope:all|type|recent | threshold:value"
**Example:** "operation:age | scope:all | threshold:0.1"

## Core Actions
1. Parse operation → Analyze memory state → Execute cleanup with safety checks
2. Update relationships → Optimize performance → Generate cleanup report

## Cleanup Operations

### Exponential Aging (λ=0.1)
**Formula**: relevance = initial × e^(-λ × age_days) → Age out below threshold, preserve recent/high-value

### Archival Management
Archive completed work (90d), old learnings, historical patterns while preserving relationships

### Duplicate Detection  
Identify >80% content overlap → Semantic matching → Merge preserving best info → Update references

### Performance Optimization
Rebuild indexes → Cleanup relationships → Invalidate caches → Defragment memory

## Aging Algorithm
```pseudocode
FOR entity: age_days = (current - created).days; relevance = initial * exp(-0.1 * age_days)
IF relevance < threshold: preserve critical_learning (min 0.1) OR archive; ELSE update current_relevance
```

## Scope Options
**all**: Entire system | **type**: Specific types | **recent**: Last N days | **completed**: Finished work | **low_relevance**: Below threshold | **orphaned**: Broken relationships

## Safety Mechanisms
Backup before cleanup, rollback capability, protect referenced entities, validate relationships, user confirmation

## Thresholds
**Aging**: 0.1 | **Similarity**: 0.8 | **Age**: 90 days | **Performance**: auto

## Cleanup Reporting
```yaml
cleanup_report:
  operation: age|archive|dedupe|optimize | started/completed: timestamp
  processed/archived/merged/cleaned: count
  performance: {query_speed: "15% faster", memory: "12% reduction", index: "improved"}
  errors: [] | warnings: []
```

## Error Handling
- **Invalid Operation**: "Must be age|archive|dedupe|optimize"
- **Invalid Scope**: "Must be all|type|recent|completed|low_relevance|orphaned"
- **Threshold Error**: "Must be numeric or 'auto'"
- **Memory Access**: "Cannot access memory system"
- **Backup Failed**: "Cannot create backup"
- **Cleanup Failed**: "Operation failed, rolled back"
