# Git Clean

Clean git repository using $ARGUMENTS.

## Arguments
"Type: files|branches|all | DryRun: true|false | Scope: local|remote|both"

## Behavior
1. Parse cleanup type and options from $ARGUMENTS
2. Check git repository status and safety
3. Execute cleanup based on type:
   - **files:** Remove untracked files and empty directories
   - **branches:** Remove merged feature branches
   - **all:** Both files and branches
4. Apply git privacy settings if enabled
5. Show cleanup summary

## Safety
- DryRun shows what would be cleaned without executing
- Preserves main/master branch and current branch
- Confirms before destructive operations

## Errors
- No repo: "Not in git repository"
- Unsafe: "Working directory has uncommitted changes"
- Permission: "Cannot clean protected branches"