# Story Status

Track story progress and PRB completion status with visual indicators.

## Behavior
Shows story content, lists generated PRBs with their status, calculates overall progress, and identifies blockers or missing PRBs.

## Usage
`/icc-story-status <story_filename> [detail_level]`

**Arguments:**
- `story_filename` - The story file to check (required)
- `detail_level` - Optional: `summary` (default) or `detailed`

**Examples:**
```
/icc-story-status auth-system.md
/icc-story-status payment.txt detailed
```

## Process
1. **Load Story**: Read story file and parse PRB references
2. **Check PRBs**: For each referenced PRB:
   - Check if exists in prbs/
   - Determine status (ready, in_progress, completed)
   - Calculate completion percentage
3. **Generate Report**: Show story overview and PRB progress
4. **Identify Issues**: Flag missing PRBs or blockers

## Output Format (Summary)
```
📖 Story: authentication-system.md
Status: In Progress (66% complete)

Generated PRBs:
✅ PRB-001: [Developer] User model and database (Completed)
🔄 PRB-002: [Developer] Authentication service (In Progress)
⏳ PRB-003: [Developer] Registration UI (Ready)

Progress: ████████░░ 2/3 PRBs
```

## Output Format (Detailed)
```
📖 Story: authentication-system.md
Created: YYYY-MM-DD
Last Updated: YYYY-MM-DD

Story Content:
---
[First 500 chars of story...]
---

Generated PRBs (3 total, 24 complexity points):

✅ PRB-001: [Developer] Implement user model and database schema
   Status: Completed
   Complexity: Medium (8 points)
   Completed: YYYY-MM-DD
   
🔄 PRB-002: [Developer] Create authentication service with JWT  
   Status: In Progress
   Complexity: Medium (10 points)
   Started: YYYY-MM-DD
   Assignee: @Developer
   
⏳ PRB-003: [Developer] Build registration and login UI
   Status: Ready
   Complexity: Tiny (6 points)
   Dependencies: PRB-002
   
Overall Progress: 33% complete (8/24 points)
Estimated Completion: 2 more days
```

## Status Indicators
- ✅ Completed PRB
- 🔄 In Progress PRB  
- ⏳ Ready PRB (not started)
- ❌ Blocked PRB
- ⚠️ Missing PRB (referenced but not found)

## Error Handling
- **FILE_NOT_FOUND**: "❌ Story file not found: {filename}"
- **NO_PRBS**: "ℹ️ No PRBs generated for this story yet"
- **MISSING_PRB**: "⚠️ Referenced PRB not found: {prb_id}"
- **PARSE_ERROR**: "❌ Could not parse story format"

## Integration
- Reads story files from stories/ directory
- Checks PRB files in prbs/ directory
- Can trigger /icc-breakdown-story if no PRBs found
- Updates story file if PRB statuses have changed

---
*Story status command for intelligent-claude-code system*