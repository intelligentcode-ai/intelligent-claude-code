# /icc-rename-work-items

**PURPOSE:** Rename work items to standard format

## Syntax
```
/icc-rename-work-items [options]
```

## Options
| Option | Description |
|--------|-------------|
| --dry-run | Preview changes only |
| --category CATEGORY | Specific category only |
| --directory DIR | Target directory |
| --force | Skip confirmation |

## Naming Format
`<CATEGORY>-<NUMBER>-<TITLE>-<DATE>.md`

## Examples
```bash
# Preview all renames
/icc-rename-work-items --dry-run

# Rename stories only
/icc-rename-work-items --category STORY

# Force rename all
/icc-rename-work-items --force
```

## Process
1. Scan for non-compliant names
2. Generate compliant names
3. Preview/confirm changes
4. Execute renames
5. Update references

## Validation
- Category: EPIC|STORY|BUG|PRB
- Number: Zero-padded (001)
- Title: lowercase-hyphenated
- Date: YYYY-MM-DD

---
*Command reference*