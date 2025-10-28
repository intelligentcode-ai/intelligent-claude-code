# Path Normalization in Logging System

**Date**: 2025-10-28
**Version**: 8.20.39
**Context**: Multi-project hook debugging support

## Implementation

### Solution

Normalize project path in log filename using home directory shorthand and dash separators:

```javascript
function normalizePath(pathStr) {
  if (!pathStr) return 'unknown';
  return pathStr
    .replace(os.homedir(), '~')
    .replace(/\//g, '-')
    .replace(/^-/, '');
}
```

### Result Log Filenames

```
2025-10-28-~-Work-Engineering-ansible-deployments-kubernetes-applications-pm-constraints-enforcement.log
2025-10-28-~-Nextcloud-Altlandsberg-Work-Development-intelligentcode-ai-intelligent-claude-code-pm-constraints-enforcement.log
```

## Benefits

1. **Instant project identification** in log files
2. **Missing logs obvious** by absent filenames
3. **No grep required** for project-specific debugging
4. **Multi-project support** out of the box

## File References

- src/hooks/lib/logging.js:58-89 - Implementation
- ~/.claude/hooks/lib/logging.js - Deployed version

---

**Pattern**: Include identifying context in filenames, not just content.
