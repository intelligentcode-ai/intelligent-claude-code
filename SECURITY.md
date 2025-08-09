# Security Notice

## Memory Files in Git History

### Issue
Between commits 5ca1914 and 9e9518a, memory files were incorrectly committed to the repository. These files should have been local-only as per system design.

### Impact
- No actual credentials or tokens were exposed
- The files contain system learning patterns and behavioral documentation
- These files have been removed from tracking as of commit 9e9518a

### Mitigation
1. All memory files have been removed from current version
2. The memory/ directory is properly gitignored
3. No sensitive credentials were found in the exposed files

### Going Forward
- Memory files will remain local-only
- The .gitignore properly excludes memory/ directory
- PRB execution will no longer create memory files in version control

### For Users
If you have cloned this repository, ensure your local memory/ directory is not tracked:
```bash
git rm --cached -r memory/
git commit -m "Remove memory from tracking"
```

## Affected Releases
- v6.8.1
- v6.8.2

These releases contain memory files that should not have been included.