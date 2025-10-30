# install.ps1 Fixes - Remove post-agent-file-validation.js

## File
`install.ps1`

## Fix: Remove from SubagentStop hooks (Line ~208)

**Current**:
```powershell
            SubagentStop = @(
                [PSCustomObject]@{
                    hooks = @(
                        [PSCustomObject]@{ type = "command"; command = "node `"$HooksPath\subagent-stop.js`""; timeout = 5000 }
                        [PSCustomObject]@{ type = "command"; command = "node `"$HooksPath\post-agent-file-validation.js`""; timeout = 5000 }  # <-- REMOVE THIS LINE
                    )
                }
            )
```

**Fixed**:
```powershell
            SubagentStop = @(
                [PSCustomObject]@{
                    hooks = @(
                        [PSCustomObject]@{ type = "command"; command = "node `"$HooksPath\subagent-stop.js`""; timeout = 5000 }
                    )
                }
            )
```

## Manual Fix Command

```bash
cd /Users/karsten/Nextcloud_Altlandsberg/Work/Development/intelligentcode-ai/intelligent-claude-code

# Remove hook registration line
sed -i '' '/post-agent-file-validation\.js/d' install.ps1

# Verify changes
grep -n "post-agent-file-validation" install.ps1 || echo "✅ All references removed"
```

## Note

PowerShell script fix is simpler - just remove the one line containing `post-agent-file-validation.js`. The sed command will work because it's a plain text file.
