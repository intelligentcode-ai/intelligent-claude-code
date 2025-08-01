# /icc-memory-status

**Purpose:** Display statistics and health status of the file-based memory system

**Usage:** `/icc-memory-status`

**Behavioral Pattern:** @behaviors/shared-patterns/memory-operations.md

## Execution Process

1. **Scan Memory Directory**
   - Count entities by type
   - Calculate directory sizes
   - Check index integrity

2. **Gather Statistics**
   - Total entities count
   - Breakdown by type (Learning/Pattern/Knowledge)
   - Monthly distribution
   - Average relevance scores
   - Most accessed entities

3. **Check Health**
   - Verify index completeness
   - Detect orphaned files
   - Check cache status
   - Monitor directory growth

4. **Generate Report**
   - Summary statistics
   - Health indicators
   - Recommendations

## Example Output

```bash
/icc-memory-status
```

**Output:**
```
Memory System Status
==================

Statistics:
- Total Entities: 247
  - Learning: 142 (57.5%)
  - Pattern: 73 (29.6%)
  - Knowledge: 32 (13.0%)

Distribution:
- Current Month: 45 entities
- Last 30 Days: 89 entities
- Last 90 Days: 198 entities

Top Accessed:
1. Learning-OAuth2Refresh-20250123 (12 uses)
2. Pattern-ErrorHandling-20250115 (9 uses)
3. Knowledge-SecurityBest-20250110 (7 uses)

Health Status: ✓ HEALTHY
- Index: Complete (247/247 entries)
- Cache: Active (8 entries, 3.2MB)
- Directory Size: 4.8MB
- Growth Rate: 1.2MB/month

Recommendations:
- No issues detected
- Consider archiving entities older than 90 days
- Current relevance decay rate: λ=0.1
```

## Health Indicators

**HEALTHY** - All systems operational
**WARNING** - Minor issues detected
**CRITICAL** - Major issues requiring attention

## Maintenance Actions
- `/icc-memory-cleanup` - Archive old entities
- `/icc-memory-reindex` - Rebuild index
- `/icc-memory-optimize` - Compress and organize

## Integration
- Run weekly for monitoring
- Auto-alert on critical issues
- Feeds into system health dashboard

---
*Command template for memory system status*