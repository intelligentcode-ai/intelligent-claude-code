# CHANGELOG Workflow Memory

## 2025-08-09: CHANGELOG Before PR Creation Process
**Context:** BUG-010-PRB-001
**Problem:** CHANGELOG updates were happening after PR creation, reducing review visibility
**Solution:** Enforce CHANGELOG update before PR creation in git operations workflow
**Process:**
1. Update CHANGELOG with release notes
2. Bump VERSION file if applicable
3. Commit both files together
4. Create PR with complete changelog visibility
5. Merge PR
6. Create GitHub release using CHANGELOG content

**Code:** Added to prb-execution.md git operations validation:
```markdown
[ ] CHANGELOG updated before PR creation (if release changes)
[ ] Version bumped in same commit as CHANGELOG (if applicable)
```

**Benefits:**
- Improved review visibility of changes
- Complete release documentation before PR
- Better changelog quality through review process
- Consistent release workflow enforcement

**Integration:** Enforced through PRB execution behavior patterns

---

## Process Order Documentation

**CRITICAL SEQUENCE for Release PRBs:**
1. **Update CHANGELOG** - Add release notes for current version
2. **Bump VERSION** - Update version numbers in applicable files
3. **Commit Together** - Single commit with both CHANGELOG and VERSION changes
4. **Create PR** - Pull request shows complete changelog in review
5. **Review Process** - Reviewers see full context of changes
6. **Merge PR** - Changes integrated with complete documentation
7. **GitHub Release** - Create release using CHANGELOG content

**Anti-Pattern (Previous):**
- Create PR first
- Update CHANGELOG later
- Reduced review visibility
- Incomplete release documentation

**Enforcement Location:** 
- src/behaviors/prb-execution.md
- Git Operations Validation checklist
- Mandatory PRB section execution requirements