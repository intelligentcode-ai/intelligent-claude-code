# icc-git-operation

Execute git operations with automatic settings enforcement and privacy protection.

## Usage
```
/icc-git-operation commit "message" [files...]
/icc-git-operation push [branch]
/icc-git-operation create-pr "title" "description"
```

## Implementation
This command performs git operations with automatic settings enforcement:

1. **SETTINGS INJECTION**: Automatically inject system settings
2. **PRIVACY ENFORCEMENT**: Auto-strip AI mentions if git_privacy enabled
3. **BRANCH PROTECTION**: Auto-validate branch protection rules
4. **COMMIT VALIDATION**: Ensure commit messages comply with settings
5. **OPERATION EXECUTION**: Execute git operation with full compliance

## Auto-Correction Features
```yaml
privacy_enforcement:
  - Auto-strip "AI-generated", "Claude", "Anthropic" mentions
  - Remove AI emojis (🤖, 🧠) from messages
  - Clean co-authorship lines if privacy enabled
  
branch_protection:
  - Auto-validate current branch vs protected branches
  - Prevent direct commits to main/master if configured
  - Enforce feature branch workflow
  
settings_injection:
  - Auto-load ~/.claude/config.md settings
  - Apply git_privacy setting automatically
  - Enforce branch_protection rules
```

## Expected Output
```
🔧 Git Operation: commit
⚙️ Settings loaded: git_privacy=true, branch_protection=true
🧹 Privacy enforcement: AI mentions stripped
✅ Branch protection: feature branch validated
💾 Commit executed: "Fix validation chain enforcement"

🚀 Git operation completed with full compliance
```

## Integration
- Auto-executed by all git-related workflow steps
- Enforces settings without manual intervention
- Prevents privacy violations automatically
- Maintains branch protection compliance

## Error Handling
- Blocks operations that violate settings
- Provides clear feedback on violations
- Suggests corrective actions
- Maintains audit trail of all operations