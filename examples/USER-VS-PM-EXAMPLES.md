# User Input vs PM Processing Examples

This directory shows the difference between what users write and what the PM persona produces.

## User Writes (Simple)
Users just drop simple markdown files with their ideas:

```markdown
# Dark mode not saving preference

When I toggle dark mode and refresh the page, it always goes back to light mode. 
The preference should be saved somewhere.
```

## PM Processes (Enriched)
The Project Manager persona analyzes and enriches the task:

```markdown
---
priority: high
area: frontend
type: bug
effort: 2
personas:
  - frontend
  - tester
dependencies: []
---

# Dark mode not saving preference

## Summary
Fix dark mode preference persistence across page refreshes.

## Context
Users report that dark mode setting reverts to light mode after page refresh, 
indicating the preference is not being properly persisted.

## Requirements
- [ ] Investigate current theme storage mechanism
- [ ] Implement persistent storage (localStorage/cookies)
- [ ] Ensure theme loads before first paint
- [ ] Test across different browsers

## Acceptance Criteria
- [ ] Dark mode preference persists after page refresh
- [ ] No flash of light theme on dark mode load
- [ ] Works across all major browsers
- [ ] Preference syncs across tabs

## Technical Notes
- Check if localStorage is available
- Consider using CSS prefers-color-scheme as fallback
- Implement theme loading in document head to prevent flash
```

## Key Differences

1. **Effort Estimation**: PM adds realistic effort based on task analysis
2. **Priority Assignment**: PM determines priority based on impact
3. **Persona Selection**: PM identifies which specialists are needed
4. **Requirements**: PM breaks down into specific technical steps
5. **Context**: PM adds technical understanding and implications
6. **Acceptance Criteria**: PM defines clear success metrics

## Why This Matters

- **Honest Effort Estimates**: AI can better estimate its own capabilities
- **Consistent Processing**: All tasks get proper analysis
- **User Simplicity**: Users don't need to understand technical details
- **Better Tracking**: Structured data enables progress monitoring