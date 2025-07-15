# TASK-007 Git Operations

**Task:** Commit and push role switching implementation  
**Assigned to:** @AI-Engineer  
**Status:** PLANNED  
**Priority:** critical_path  
**Dependencies:** [TASK-006]

## Git Operations Requirements

### Git Settings to Respect
```yaml
git_privacy: true                # Strip AI mentions from commits/MRs
branch_protection: true          # Force feature branches
default_branch: "main"           # main, master, develop
require_pr_for_main: true        # Force PR/MR workflow
```

### Commit Requirements
- Commit role switching implementation
- Include proper commit message with evidence
- **RESPECT git_privacy: true** - NO AI/Claude mentions
- Include all modified files

### Push Requirements
- Push to feature branch (branch_protection: true)
- Validate all tests passing
- Ensure no merge conflicts
- Confirm deliverables complete

### Branch Management
- Use proper branch naming
- Ensure feature branch workflow
- Prepare for pull request
- Maintain clean commit history

## Files to Commit

- src/behaviors/lean-workflow-executor.md: Role switching implementation
- src/roles/specialists.md: Updated role definitions
- CLAUDE.md: Updated documentation
- Task completion files