# TASK-006 Git Operations

**Task:** Commit and push PM commands implementation  
**Assigned to:** @AI-Engineer  
**Status:** PLANNED  
**Priority:** critical_path  
**Dependencies:** [TASK-005]

## Git Operations Requirements

### Git Settings to Respect
```yaml
git_privacy: true                # Strip AI mentions from commits/MRs
branch_protection: true          # Force feature branches
default_branch: "main"           # main, master, develop
require_pr_for_main: true        # Force PR/MR workflow
```

### Commit Requirements
- Commit PM commands implementation
- Include proper commit message with evidence
- **RESPECT git_privacy: true** - NO AI/Claude mentions
- Include all modified files

### Push Requirements
- Push to feature branch (branch_protection: true)
- Validate all tests passing
- Ensure no merge conflicts
- Confirm deliverables complete

### Files to Commit

- src/commands/planning-commands.md: PM commands added
- src/behaviors/lean-workflow-executor.md: Command handling
- CLAUDE.md: Updated documentation
- Task completion files