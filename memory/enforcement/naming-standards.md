# Naming Standards Memory

## 2025-08-09: Complete Naming Format Enforcement Implementation
**Context:** BUG-005-PRB-001-complete-naming-enforcement-2025-08-09
**Problem:** Naming enforcement behaviors were incomplete with missing system date instructions and validation logic
**Solution:** Implemented complete behavioral patterns with multi-layer validation and system date retrieval
**Key Insights:**
- Multi-layer naming validation prevents format violations at multiple points
- System date retrieval ensures accurate timestamps: `CURRENT_DATE=$(date +%Y-%m-%d)`
- Sequential numbering with directory scanning prevents collisions
- Behavioral patterns need complete implementation, not just references
- Clear bash examples essential for consistent execution across AI agents
- Import statements alone don't provide functionality - need full behavioral descriptions

**Patterns Captured:**
1. **System Date Enforcement Pattern**: Always use `date +%Y-%m-%d` command, never hardcode dates
2. **Multi-Layer Validation Pattern**: Validate at creation, PRB generation, and file operations
3. **Directory Scanning Pattern**: Use bash commands to scan directories for next available numbers
4. **Auto-Correction Pattern**: Provide specific corrections with clear error messages
5. **Behavioral Completion Pattern**: Behavioral files must contain complete instructions, not just references

**Bash Command Examples:**
```bash
# Get current date (MANDATORY for all naming operations)
CURRENT_DATE=$(date +%Y-%m-%d)

# Get next STORY number
HIGHEST=$(ls stories/ | grep "^STORY-" | sed 's/STORY-\([0-9]*\)-.*/\1/' | sort -n | tail -1)
NEXT=$(printf "%03d" $((10#$HIGHEST + 1)))

# Get next PRB number under parent
HIGHEST=$(ls prbs/ready/ prbs/completed/ | grep "^STORY-001-PRB-" | sed 's/.*-PRB-\([0-9]*\)-.*/\1/' | sort -n | tail -1)
NEXT=$(printf "%03d" $((10#$HIGHEST + 1)))
```

**Implementation Results:**
- All behaviors now include complete naming enforcement logic
- System date retrieval instructions added to prevent hardcoded dates
- Bash command examples provide clear guidance for AI agents
- Multi-layer validation prevents bypass attempts
- Auto-correction logic guides users to compliant naming

---
