# Intelligent Claude Code - Windows PowerShell Installation Script
# Equivalent functionality to the Linux Makefile for Windows systems

param(
    [string]$Action = "help",
    [string]$TargetPath = "",
    [string]$McpConfig = "",
    [switch]$Force = $false
)

# Global variables
$ErrorActionPreference = "Stop"
$SourceDir = Join-Path $PSScriptRoot "src"

function Show-Help {
    Write-Host "Intelligent Claude Code - Windows Installation" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage:" -ForegroundColor Yellow
    Write-Host "  .\install.ps1 install [-TargetPath <path>] [-McpConfig <path>]"
    Write-Host "  .\install.ps1 uninstall [-TargetPath <path>] [-Force]"
    Write-Host "  .\install.ps1 test"
    Write-Host "  .\install.ps1 clean"
    Write-Host "  .\install.ps1 help"
    Write-Host ""
    Write-Host "Parameters:" -ForegroundColor Yellow
    Write-Host "  -TargetPath  - Target path (omit for user scope ~\.claude\)"
    Write-Host "  -McpConfig   - Path to MCP servers configuration JSON file"
    Write-Host "  -Force       - Force complete removal including user data (uninstall only)"
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Green
    Write-Host "  .\install.ps1 install                                    # Local user scope"
    Write-Host "  .\install.ps1 install -TargetPath C:\MyProject          # Local project"
    Write-Host "  .\install.ps1 install -McpConfig .\config\mcps.json     # Local with MCP servers"
    Write-Host "  .\install.ps1 uninstall                                 # Conservative uninstall"
    Write-Host "  .\install.ps1 uninstall -Force                          # Force uninstall (remove all)"
    Write-Host "  .\install.ps1 test                                      # Test installation"
}

function Test-Prerequisites {
    Write-Host "Checking prerequisites..." -ForegroundColor Yellow
    
    # Check if source directory exists
    if (-not (Test-Path $SourceDir)) {
        throw "ERROR: Source directory not found at: $SourceDir"
    }
    
    # Check PowerShell version (requires 5.0+)
    if ($PSVersionTable.PSVersion.Major -lt 5) {
        throw "ERROR: PowerShell 5.0 or higher required. Current version: $($PSVersionTable.PSVersion)"
    }
    
    Write-Host "✅ Prerequisites check passed!" -ForegroundColor Green
}

function Get-InstallPaths {
    param([string]$TargetPath)
    
    if ($TargetPath) {
        $ResolvedTarget = Resolve-Path $TargetPath -ErrorAction SilentlyContinue
        if (-not $ResolvedTarget) {
            # Create target path if it doesn't exist
            New-Item -Path $TargetPath -ItemType Directory -Force | Out-Null
            $ResolvedTarget = Resolve-Path $TargetPath
        }
        $InstallPath = Join-Path $ResolvedTarget ".claude"
        $ProjectPath = $ResolvedTarget
        $Scope = "project"
    } else {
        $InstallPath = Join-Path $env:USERPROFILE ".claude"
        $ProjectPath = ""
        $Scope = "user"
    }
    
    return @{
        InstallPath = $InstallPath
        ProjectPath = $ProjectPath
        Scope = $Scope
    }
}

function Copy-DirectoryRecursive {
    param(
        [string]$Source,
        [string]$Destination
    )

    if (-not (Test-Path $Source)) {
        Write-Warning "Source path does not exist: $Source"
        return
    }

    # Create destination directory if it doesn't exist
    if (-not (Test-Path $Destination)) {
        New-Item -Path $Destination -ItemType Directory -Force | Out-Null
    }

    # Copy all items recursively
    Get-ChildItem -Path $Source -Recurse | ForEach-Object {
        $RelativePath = $_.FullName.Substring($Source.Length + 1)
        $DestPath = Join-Path $Destination $RelativePath

        if ($_.PSIsContainer) {
            if (-not (Test-Path $DestPath)) {
                New-Item -Path $DestPath -ItemType Directory -Force | Out-Null
            }
        } else {
            Copy-Item -Path $_.FullName -Destination $DestPath -Force
        }
    }
}

function Test-JsonFile {
    param(
        [Parameter(Mandatory=$true)]
        [string]$FilePath
    )

    try {
        if (Test-Path $FilePath) {
            $Content = Get-Content $FilePath -Raw -ErrorAction Stop
            if ([string]::IsNullOrWhiteSpace($Content)) {
                return $false
            }
            $null = $Content | ConvertFrom-Json -ErrorAction Stop
            return $true
        }
        return $false
    } catch {
        return $false
    }
}

function Get-SettingsJson {
    param(
        [Parameter(Mandatory=$true)]
        [string]$SettingsPath
    )

    try {
        if (Test-Path $SettingsPath) {
            if (Test-JsonFile -FilePath $SettingsPath) {
                $Content = Get-Content $SettingsPath -Raw | ConvertFrom-Json
                return $Content
            } else {
                Write-Warning "  Corrupted settings.json detected, creating new one"
                return [PSCustomObject]@{}
            }
        } else {
            return [PSCustomObject]@{}
        }
    } catch {
        Write-Warning "  Failed to read settings.json, creating new one: $($_.Exception.Message)"
        return [PSCustomObject]@{}
    }
}

function Register-UserPromptSubmitHook {
    param(
        [Parameter(Mandatory=$true)]
        [string]$SettingsPath,

        [Parameter(Mandatory=$true)]
        [string]$HookCommand
    )

    try {
        Write-Host "  Registering UserPromptSubmit hook in settings.json..." -ForegroundColor Gray

        # Load or create settings
        $Settings = Get-SettingsJson -SettingsPath $SettingsPath

        # Initialize hooks structure if missing
        if (-not $Settings.hooks) {
            $Settings | Add-Member -MemberType NoteProperty -Name "hooks" -Value ([PSCustomObject]@{}) -Force
        }

        if (-not $Settings.hooks.UserPromptSubmit) {
            $Settings.hooks | Add-Member -MemberType NoteProperty -Name "UserPromptSubmit" -Value @() -Force
        }

        # Convert UserPromptSubmit to array if it's not already
        if ($Settings.hooks.UserPromptSubmit -isnot [array]) {
            $Settings.hooks.UserPromptSubmit = @($Settings.hooks.UserPromptSubmit)
        }

        # Check if hook already exists to prevent duplicates
        $ExistingHook = $Settings.hooks.UserPromptSubmit | Where-Object {
            $_.hooks -and $_.hooks[0] -and $_.hooks[0].command -eq $HookCommand
        }

        if (-not $ExistingHook) {
            # Create new hook entry
            $NewHook = [PSCustomObject]@{
                matcher = "*"
                hooks = @(
                    [PSCustomObject]@{
                        command = $HookCommand
                        failureMode = "allow"
                        timeout = 15000
                        type = "command"
                    }
                )
            }

            # Add to UserPromptSubmit array
            $Settings.hooks.UserPromptSubmit += $NewHook

            # Save settings with proper JSON formatting
            $JsonOutput = $Settings | ConvertTo-Json -Depth 10
            Set-Content -Path $SettingsPath -Value $JsonOutput -Encoding UTF8

            Write-Host "  ✅ UserPromptSubmit hook registered successfully in settings.json" -ForegroundColor Green
        } else {
            Write-Host "  UserPromptSubmit hook already registered, skipping duplicate registration" -ForegroundColor Yellow
        }

    } catch {
        Write-Warning "  Failed to register UserPromptSubmit hook in settings.json: $($_.Exception.Message)"
    }
}

function Register-SessionStartHook {
    param(
        [Parameter(Mandatory=$true)]
        [string]$SettingsPath,

        [Parameter(Mandatory=$true)]
        [string]$HookCommand
    )

    try {
        Write-Host "  Registering SessionStart hook in settings.json..." -ForegroundColor Gray

        # Load or create settings
        $Settings = Get-SettingsJson -SettingsPath $SettingsPath

        # Initialize hooks structure if missing
        if (-not $Settings.hooks) {
            $Settings | Add-Member -MemberType NoteProperty -Name "hooks" -Value ([PSCustomObject]@{}) -Force
        }

        if (-not $Settings.hooks.SessionStart) {
            $Settings.hooks | Add-Member -MemberType NoteProperty -Name "SessionStart" -Value @() -Force
        }

        # Convert SessionStart to array if it's not already
        if ($Settings.hooks.SessionStart -isnot [array]) {
            $Settings.hooks.SessionStart = @($Settings.hooks.SessionStart)
        }

        # Check if hook already exists to prevent duplicates
        $ExistingHook = $Settings.hooks.SessionStart | Where-Object {
            $_.hooks -and $_.hooks[0] -and $_.hooks[0].command -eq $HookCommand
        }

        if (-not $ExistingHook) {
            # Create new hook entry
            $NewHook = [PSCustomObject]@{
                matcher = "*"
                hooks = @(
                    [PSCustomObject]@{
                        command = $HookCommand
                        failureMode = "allow"
                        timeout = 10000
                        type = "command"
                    }
                )
            }

            # Add to SessionStart array
            $Settings.hooks.SessionStart += $NewHook

            # Save settings with proper JSON formatting
            $JsonOutput = $Settings | ConvertTo-Json -Depth 10
            Set-Content -Path $SettingsPath -Value $JsonOutput -Encoding UTF8

            Write-Host "  ✅ SessionStart hook registered successfully in settings.json" -ForegroundColor Green
        } else {
            Write-Host "  SessionStart hook already registered, skipping duplicate registration" -ForegroundColor Yellow
        }

    } catch {
        Write-Warning "  Failed to register SessionStart hook in settings.json: $($_.Exception.Message)"
    }
}

function Register-PreToolUseHook {
    param(
        [Parameter(Mandatory=$true)]
        [string]$SettingsPath,

        [Parameter(Mandatory=$true)]
        [string]$HookCommand
    )

    try {
        Write-Host "  Registering PreToolUse hook in settings.json..." -ForegroundColor Gray

        # Load or create settings
        $Settings = Get-SettingsJson -SettingsPath $SettingsPath

        # Initialize hooks structure if missing
        if (-not $Settings.hooks) {
            $Settings | Add-Member -MemberType NoteProperty -Name "hooks" -Value ([PSCustomObject]@{}) -Force
        }

        if (-not $Settings.hooks.PreToolUse) {
            $Settings.hooks | Add-Member -MemberType NoteProperty -Name "PreToolUse" -Value @() -Force
        }

        # Convert PreToolUse to array if it's not already
        if ($Settings.hooks.PreToolUse -isnot [array]) {
            $Settings.hooks.PreToolUse = @($Settings.hooks.PreToolUse)
        }

        # Check if hook already exists to prevent duplicates
        $ExistingHook = $Settings.hooks.PreToolUse | Where-Object {
            $_.hooks -and $_.hooks[0] -and $_.hooks[0].command -eq $HookCommand
        }

        if (-not $ExistingHook) {
            # Create new hook entry
            $NewHook = [PSCustomObject]@{
                matcher = "*"
                hooks = @(
                    [PSCustomObject]@{
                        command = $HookCommand
                        timeout = 5000
                        type = "command"
                    }
                )
            }

            # Add to PreToolUse array
            $Settings.hooks.PreToolUse += $NewHook

            # Save settings with proper JSON formatting
            $JsonOutput = $Settings | ConvertTo-Json -Depth 10
            Set-Content -Path $SettingsPath -Value $JsonOutput -Encoding UTF8

            Write-Host "  ✅ PreToolUse hook registered successfully in settings.json" -ForegroundColor Green
        } else {
            Write-Host "  PreToolUse hook already registered, skipping duplicate registration" -ForegroundColor Yellow
        }

    } catch {
        Write-Warning "  Failed to register PreToolUse hook in settings.json: $($_.Exception.Message)"
    }
}

function Register-SubagentStopHook {
    param(
        [Parameter(Mandatory=$true)]
        [string]$SettingsPath,

        [Parameter(Mandatory=$true)]
        [string]$HookCommand
    )

    try {
        Write-Host "  Registering SubagentStop hook in settings.json..." -ForegroundColor Gray

        # Load or create settings
        $Settings = Get-SettingsJson -SettingsPath $SettingsPath

        # Initialize hooks structure if missing
        if (-not $Settings.hooks) {
            $Settings | Add-Member -MemberType NoteProperty -Name "hooks" -Value ([PSCustomObject]@{}) -Force
        }

        if (-not $Settings.hooks.SubagentStop) {
            $Settings.hooks | Add-Member -MemberType NoteProperty -Name "SubagentStop" -Value @() -Force
        }

        # Convert SubagentStop to array if it's not already
        if ($Settings.hooks.SubagentStop -isnot [array]) {
            $Settings.hooks.SubagentStop = @($Settings.hooks.SubagentStop)
        }

        # Check if hook already exists to prevent duplicates
        $ExistingHook = $Settings.hooks.SubagentStop | Where-Object {
            $_.hooks -and $_.hooks[0] -and $_.hooks[0].command -eq $HookCommand
        }

        if (-not $ExistingHook) {
            # Create new hook entry
            $NewHook = [PSCustomObject]@{
                matcher = "*"
                hooks = @(
                    [PSCustomObject]@{
                        command = $HookCommand
                        failureMode = "allow"
                        timeout = 5000
                        type = "command"
                    }
                )
            }

            # Add to SubagentStop array
            $Settings.hooks.SubagentStop += $NewHook

            # Save settings with proper JSON formatting
            $JsonOutput = $Settings | ConvertTo-Json -Depth 10
            Set-Content -Path $SettingsPath -Value $JsonOutput -Encoding UTF8

            Write-Host "  ✅ SubagentStop hook registered successfully in settings.json" -ForegroundColor Green
        } else {
            Write-Host "  SubagentStop hook already registered, skipping duplicate registration" -ForegroundColor Yellow
        }

    } catch {
        Write-Warning "  Failed to register SubagentStop hook in settings.json: $($_.Exception.Message)"
    }
}

function Register-StopHook {
    param(
        [Parameter(Mandatory=$true)]
        [string]$SettingsPath,

        [Parameter(Mandatory=$true)]
        [string]$HookCommand
    )

    try {
        Write-Host "  Registering Stop hook in settings.json..." -ForegroundColor Gray

        # Load or create settings
        $Settings = Get-SettingsJson -SettingsPath $SettingsPath

        # Initialize hooks structure if missing
        if (-not $Settings.hooks) {
            $Settings | Add-Member -MemberType NoteProperty -Name "hooks" -Value ([PSCustomObject]@{}) -Force
        }

        if (-not $Settings.hooks.Stop) {
            $Settings.hooks | Add-Member -MemberType NoteProperty -Name "Stop" -Value @() -Force
        }

        # Convert Stop to array if it's not already
        if ($Settings.hooks.Stop -isnot [array]) {
            $Settings.hooks.Stop = @($Settings.hooks.Stop)
        }

        # Check if hook already exists to prevent duplicates
        $ExistingHook = $Settings.hooks.Stop | Where-Object {
            $_.hooks -and $_.hooks[0] -and $_.hooks[0].command -eq $HookCommand
        }

        if (-not $ExistingHook) {
            # Create new hook entry
            $NewHook = [PSCustomObject]@{
                matcher = "*"
                hooks = @(
                    [PSCustomObject]@{
                        command = $HookCommand
                        failureMode = "allow"
                        timeout = 5000
                        type = "command"
                    }
                )
            }

            # Add to Stop array
            $Settings.hooks.Stop += $NewHook

            # Save settings with proper JSON formatting
            $JsonOutput = $Settings | ConvertTo-Json -Depth 10
            Set-Content -Path $SettingsPath -Value $JsonOutput -Encoding UTF8

            Write-Host "  ✅ Stop hook registered successfully in settings.json" -ForegroundColor Green
        } else {
            Write-Host "  Stop hook already registered, skipping duplicate registration" -ForegroundColor Yellow
        }

    } catch {
        Write-Warning "  Failed to register Stop hook in settings.json: $($_.Exception.Message)"
    }
}

function Install-HookSystem {
    param(
        [Parameter(Mandatory=$true)]
        [string]$InstallPath,

        [Parameter(Mandatory=$true)]
        [string]$SourceDir
    )

    Write-Host "Installing hook system..." -ForegroundColor Yellow

    try {
        # Create hooks directory structure
        $HooksPath = Join-Path $InstallPath "hooks"
        $LogsPath = Join-Path $InstallPath "logs"

        $DirectoriesToCreate = @($HooksPath, $LogsPath)

        foreach ($Dir in $DirectoriesToCreate) {
            if (-not (Test-Path $Dir)) {
                New-Item -Path $Dir -ItemType Directory -Force | Out-Null
                Write-Host "  Created directory: $Dir" -ForegroundColor Green
            }
        }

        # Copy all hook files from src/hooks/ to ~/.claude/hooks/
        $SourceHooksPath = Join-Path $SourceDir "hooks"

        if (Test-Path $SourceHooksPath) {
            Write-Host "  Copying hook files recursively..." -ForegroundColor Gray

            # Copy all files and subdirectories from source hooks to destination
            Copy-DirectoryRecursive -Source $SourceHooksPath -Destination $HooksPath

            # Install reminders.json if it doesn't exist (preserve user customizations)
            $UserRemindersPath = Join-Path $HooksPath "lib" "reminders.json"
            $SourceRemindersPath = Join-Path $SourceHooksPath "lib" "reminders.json"

            if (-not (Test-Path $UserRemindersPath) -and (Test-Path $SourceRemindersPath)) {
                Write-Host "  Installing default reminders.json..." -ForegroundColor Gray
                Copy-Item -Path $SourceRemindersPath -Destination $UserRemindersPath -Force
            } elseif (Test-Path $UserRemindersPath) {
                Write-Host "  User reminders.json preserved - keeping customizations" -ForegroundColor Yellow
            }

            # Always update README.md documentation
            $SourceReadmePath = Join-Path $SourceHooksPath "lib" "README.md"
            $DestReadmePath = Join-Path $HooksPath "lib" "README.md"

            if (Test-Path $SourceReadmePath) {
                Write-Host "  Updating hooks documentation..." -ForegroundColor Gray
                Copy-Item -Path $SourceReadmePath -Destination $DestReadmePath -Force
            }

            # Get count of copied files for user feedback
            $CopiedFiles = @(Get-ChildItem -Path $HooksPath -Recurse -File)
            Write-Host "  Successfully copied $($CopiedFiles.Count) hook files" -ForegroundColor Green

            # Register production hooks in settings.json
            $SettingsPath = Join-Path $InstallPath "settings.json"

            # Remove old hook names (graceful cleanup)
            $OldHooks = @(
                'pretooluse.js',
                'user-prompt-submit.js',
                'pre-commit.js',
                'installation-protection.js',
                'git-privacy-validation.js'
            )

            foreach ($OldHook in $OldHooks) {
                $OldHookPath = Join-Path $HooksPath $OldHook
                if (Test-Path $OldHookPath) {
                    Remove-Item -Path $OldHookPath -Force
                    Write-Host "  Removed old hook: $OldHook" -ForegroundColor Gray
                }
            }

            # Register SessionStart hook
            $SessionStartHookPath = Join-Path $HooksPath "session-start.js"
            if (Test-Path $SessionStartHookPath) {
                $HookCommand = "node `"$SessionStartHookPath`""
                Register-SessionStartHook -SettingsPath $SettingsPath -HookCommand $HookCommand
            } else {
                Write-Warning "  session-start.js hook not found, skipping SessionStart registration"
            }

            # Register UserPromptSubmit hook (context-injection.js)
            $UserPromptSubmitHookPath = Join-Path $HooksPath "context-injection.js"
            if (Test-Path $UserPromptSubmitHookPath) {
                $HookCommand = "node `"$UserPromptSubmitHookPath`""
                Register-UserPromptSubmitHook -SettingsPath $SettingsPath -HookCommand $HookCommand
            } else {
                Write-Warning "  context-injection.js hook not found, skipping UserPromptSubmit registration"
            }

            # Register PreToolUse hook (agent-marker.js)
            $AgentMarkerHookPath = Join-Path $HooksPath "agent-marker.js"
            if (Test-Path $AgentMarkerHookPath) {
                $HookCommand = "node `"$AgentMarkerHookPath`""
                Register-PreToolUseHook -SettingsPath $SettingsPath -HookCommand $HookCommand
            } else {
                Write-Warning "  agent-marker.js hook not found, skipping agent-marker PreToolUse registration"
            }

            # Register PreToolUse hook (pm-constraints-enforcement.js)
            $PreToolUseHookPath = Join-Path $HooksPath "pm-constraints-enforcement.js"
            if (Test-Path $PreToolUseHookPath) {
                $HookCommand = "node `"$PreToolUseHookPath`""
                Register-PreToolUseHook -SettingsPath $SettingsPath -HookCommand $HookCommand
            } else {
                Write-Warning "  pm-constraints-enforcement.js hook not found, skipping PreToolUse registration"
            }

            # Register SubagentStop hook (subagent-stop.js)
            $SubagentStopHookPath = Join-Path $HooksPath "subagent-stop.js"
            if (Test-Path $SubagentStopHookPath) {
                $HookCommand = "node `"$SubagentStopHookPath`""
                Register-SubagentStopHook -SettingsPath $SettingsPath -HookCommand $HookCommand
            } else {
                Write-Warning "  subagent-stop.js hook not found, skipping SubagentStop registration"
            }

            # Register Stop hook (stop.js)
            $StopHookPath = Join-Path $HooksPath "stop.js"
            if (Test-Path $StopHookPath) {
                $HookCommand = "node `"$StopHookPath`""
                Register-StopHook -SettingsPath $SettingsPath -HookCommand $HookCommand
            } else {
                Write-Warning "  stop.js hook not found, skipping Stop registration"
            }

        } else {
            Write-Warning "Source hooks directory not found: $SourceHooksPath"
            return
        }

        Write-Host "✅ Hook system installation completed!" -ForegroundColor Green
        Write-Host "  Hook files deployed to: $HooksPath" -ForegroundColor Cyan
        Write-Host "  Logs directory created at: $LogsPath" -ForegroundColor Cyan

    } catch {
        Write-Error "Failed to install hook system: $($_.Exception.Message)"
        Write-Host "Hook system installation encountered errors but continuing..." -ForegroundColor Yellow
    }
}

function Install-IntelligentClaudeCode {
    param(
        [string]$TargetPath,
        [string]$McpConfig
    )
    
    Test-Prerequisites
    
    $Paths = Get-InstallPaths -TargetPath $TargetPath
    Write-Host "Installing to: $($Paths.InstallPath)" -ForegroundColor Cyan
    
    # Create installation directory
    if (-not (Test-Path $Paths.InstallPath)) {
        New-Item -Path $Paths.InstallPath -ItemType Directory -Force | Out-Null
    }
    
    # Copy source files
    Write-Host "Copying source files..." -ForegroundColor Yellow

    $DirectoriesToCopy = @("agents", "behaviors", "commands", "modes", "agenttask-templates", "utils")

    foreach ($Dir in $DirectoriesToCopy) {
        $SourcePath = Join-Path $SourceDir $Dir
        $DestPath = Join-Path $Paths.InstallPath $Dir

        if (Test-Path $SourcePath) {
            Write-Host "  Copying $Dir..." -ForegroundColor Gray
            Copy-DirectoryRecursive -Source $SourcePath -Destination $DestPath
        } else {
            Write-Warning "Source directory not found: $SourcePath"
        }
    }

    # Deploy hook files to ~/.claude/hooks/
    Install-HookSystem -InstallPath $Paths.InstallPath -SourceDir $SourceDir

    # Copy default configuration JSON
    Write-Host "  Installing default configuration..." -ForegroundColor Gray
    $DefaultConfigSource = Join-Path $PSScriptRoot "icc.config.default.json"
    $DefaultConfigDest = Join-Path $Paths.InstallPath "icc.config.default.json"
    Copy-Item -Path $DefaultConfigSource -Destination $DefaultConfigDest -Force

    # Copy configuration schema
    $SchemaSource = Join-Path $SourceDir "schemas\icc.config.schema.json"
    $SchemaDest = Join-Path $Paths.InstallPath "schemas\icc.config.schema.json"
    if (-not (Test-Path (Split-Path $SchemaDest))) {
        New-Item -Path (Split-Path $SchemaDest) -ItemType Directory -Force | Out-Null
    }
    Copy-Item -Path $SchemaSource -Destination $SchemaDest -Force

    # Create user config from defaults if not exists
    $UserConfigPath = Join-Path $Paths.InstallPath "icc.config.json"
    if (-not (Test-Path $UserConfigPath)) {
        Write-Host "  Creating user configuration from defaults..." -ForegroundColor Gray
        Copy-Item -Path $DefaultConfigSource -Destination $UserConfigPath -Force
    } else {
        Write-Host "  User configuration preserved: $UserConfigPath" -ForegroundColor Gray
    }

    # Handle CLAUDE.md based on scope
    $ClaudemdPath = if ($Paths.Scope -eq "project") { 
        Join-Path $Paths.ProjectPath "CLAUDE.md" 
    } else { 
        Join-Path $Paths.InstallPath "CLAUDE.md" 
    }
    
    $ImportLine = "@~/.claude/modes/virtual-team.md"
    
    if (Test-Path $ClaudemdPath) {
        # Check if import line already exists
        $Content = Get-Content $ClaudemdPath -Raw -ErrorAction SilentlyContinue
        if ($Content -notmatch [regex]::Escape($ImportLine)) {
            Write-Host "Adding import line to existing CLAUDE.md..." -ForegroundColor Yellow
            Add-Content -Path $ClaudemdPath -Value "`n$ImportLine" -Encoding UTF8
        }
    } else {
        Write-Host "Creating CLAUDE.md with import line..." -ForegroundColor Yellow
        Set-Content -Path $ClaudemdPath -Value $ImportLine -Encoding UTF8
    }
    
    # Create essential directories
    $DirsToCreate = @("memory", "agenttasks\ready", "agenttasks\completed", "stories\drafts")
    foreach ($Dir in $DirsToCreate) {
        $DirPath = Join-Path $Paths.InstallPath $Dir
        if (-not (Test-Path $DirPath)) {
            New-Item -Path $DirPath -ItemType Directory -Force | Out-Null
        }
    }
    
    # Install MCP configuration if provided
    if ($McpConfig -and (Test-Path $McpConfig)) {
        Write-Host "Installing MCP configuration..." -ForegroundColor Yellow
        Install-McpConfiguration -McpConfigPath $McpConfig -InstallPath $Paths.InstallPath
    }
    
    Write-Host "✅ Installation completed successfully!" -ForegroundColor Green
}

function Install-McpConfiguration {
    param(
        [string]$McpConfigPath,
        [string]$InstallPath
    )
    
    try {
        # Validate JSON syntax
        $McpConfig = Get-Content $McpConfigPath -Raw | ConvertFrom-Json
        
        $SettingsPath = Join-Path $InstallPath "settings.json"
        $BackupPath = "$SettingsPath.backup"
        
        # Backup existing settings if they exist
        if (Test-Path $SettingsPath) {
            Copy-Item $SettingsPath $BackupPath -Force
            Write-Host "  Backed up existing settings to: $BackupPath" -ForegroundColor Gray
        }
        
        # Create or update settings.json
        $Settings = if (Test-Path $SettingsPath) {
            Get-Content $SettingsPath -Raw | ConvertFrom-Json
        } else {
            @{}
        }
        
        # Add MCP servers configuration
        if (-not $Settings.mcpServers) {
            $Settings | Add-Member -MemberType NoteProperty -Name "mcpServers" -Value @{}
        }
        
        # Merge MCP configuration
        foreach ($ServerName in $McpConfig.PSObject.Properties.Name) {
            $Settings.mcpServers | Add-Member -MemberType NoteProperty -Name $ServerName -Value $McpConfig.$ServerName -Force
        }
        
        # Save updated settings
        $Settings | ConvertTo-Json -Depth 10 | Set-Content $SettingsPath -Encoding UTF8
        
        Write-Host "  ✅ MCP configuration installed successfully!" -ForegroundColor Green
        
    } catch {
        Write-Error "Failed to install MCP configuration: $($_.Exception.Message)"
        
        # Restore backup if it exists
        if (Test-Path $BackupPath) {
            Copy-Item $BackupPath $SettingsPath -Force
            Write-Host "  Restored settings from backup" -ForegroundColor Yellow
        }
        throw
    }
}

function Unregister-HookFromSettings {
    param(
        [Parameter(Mandatory=$true)]
        [string]$SettingsPath,

        [Parameter(Mandatory=$true)]
        [string]$HookCommand,

        [Parameter(Mandatory=$true)]
        [ValidateSet("PreToolUse", "PostToolUse")]
        [string]$HookType
    )

    try {
        if (-not (Test-Path $SettingsPath)) {
            return
        }

        Write-Host "  Unregistering $HookType hook from settings.json..." -ForegroundColor Gray

        # Load existing settings
        $Settings = Get-SettingsJson -SettingsPath $SettingsPath

        # Check if hooks structure exists
        if (-not $Settings.hooks -or -not $Settings.hooks.$HookType) {
            return
        }

        # Convert hook array to array if it's not already
        if ($Settings.hooks.$HookType -isnot [array]) {
            $Settings.hooks.$HookType = @($Settings.hooks.$HookType)
        }

        # Remove matching hooks
        $OriginalCount = $Settings.hooks.$HookType.Count
        $Settings.hooks.$HookType = $Settings.hooks.$HookType | Where-Object {
            -not ($_.hooks -and $_.hooks[0] -and $_.hooks[0].command -eq $HookCommand)
        }

        # If we removed any hooks, save the updated settings
        if ($Settings.hooks.$HookType.Count -lt $OriginalCount) {
            # Clean up empty structures
            if ($Settings.hooks.$HookType.Count -eq 0) {
                $Settings.hooks.PSObject.Properties.Remove($HookType)

                if ($Settings.hooks.PSObject.Properties.Count -eq 0) {
                    $Settings.PSObject.Properties.Remove("hooks")
                }
            }

            # Save updated settings
            if ($Settings.PSObject.Properties.Count -gt 0) {
                $JsonOutput = $Settings | ConvertTo-Json -Depth 10
                Set-Content -Path $SettingsPath -Value $JsonOutput -Encoding UTF8
            } else {
                # Remove empty settings.json
                Remove-Item -Path $SettingsPath -Force
            }

            Write-Host "  ✅ $HookType hook unregistered from settings.json" -ForegroundColor Green
        }

    } catch {
        Write-Warning "  Failed to unregister $HookType hook from settings.json: $($_.Exception.Message)"
    }
}

function Uninstall-IntelligentClaudeCode {
    param(
        [string]$TargetPath,
        [switch]$Force
    )

    $Paths = Get-InstallPaths -TargetPath $TargetPath
    Write-Host "Uninstalling from: $($Paths.InstallPath)" -ForegroundColor Cyan

    if (-not (Test-Path $Paths.InstallPath)) {
        Write-Host "Nothing to uninstall - installation directory not found." -ForegroundColor Yellow
        return
    }

    # Unregister hooks from settings.json before removing files
    $SettingsPath = Join-Path $Paths.InstallPath "settings.json"

    # Unregister new hook names
    $PreToolUseHookPath = Join-Path $Paths.InstallPath "hooks" "pm-constraints-enforcement.js"
    if (Test-Path $PreToolUseHookPath) {
        $HookCommand = "node `"$PreToolUseHookPath`""
        Unregister-HookFromSettings -SettingsPath $SettingsPath -HookCommand $HookCommand -HookType "PreToolUse"
    }

    # Unregister old hook names (graceful cleanup)
    $OldPreToolUseHookPath = Join-Path $Paths.InstallPath "hooks" "pretooluse.js"
    if (Test-Path $OldPreToolUseHookPath) {
        $HookCommand = "node `"$OldPreToolUseHookPath`""
        Unregister-HookFromSettings -SettingsPath $SettingsPath -HookCommand $HookCommand -HookType "PreToolUse"
    }

    # Unregister post-tool-use hook (legacy)
    $PostToolUseHookPath = Join-Path $Paths.InstallPath "hooks" "post-tool-use.js"
    if (Test-Path $PostToolUseHookPath) {
        $HookCommand = "node `"$PostToolUseHookPath`""
        Unregister-HookFromSettings -SettingsPath $SettingsPath -HookCommand $HookCommand -HookType "PostToolUse"
    }

    if ($Force) {
        Write-Host "Force uninstall - removing entire .claude directory..." -ForegroundColor Red
        Remove-Item -Path $Paths.InstallPath -Recurse -Force
    } else {
        Write-Host "Conservative uninstall - preserving user data..." -ForegroundColor Yellow

        # Remove system directories but preserve user data
        $SystemDirs = @("agents", "behaviors", "commands", "modes", "agenttask-templates", "hooks", "utils")

        foreach ($Dir in $SystemDirs) {
            $DirPath = Join-Path $Paths.InstallPath $Dir
            if (Test-Path $DirPath) {
                Write-Host "  Removing $Dir..." -ForegroundColor Gray
                Remove-Item -Path $DirPath -Recurse -Force
            }
        }

        # Remove system files but keep user files
        $SystemFiles = @("settings.json.backup")
        foreach ($File in $SystemFiles) {
            $FilePath = Join-Path $Paths.InstallPath $File
            if (Test-Path $FilePath) {
                Remove-Item -Path $FilePath -Force
            }
        }
    }
    
    # Remove import line from CLAUDE.md if it exists
    $ClaudemdPath = if ($Paths.Scope -eq "project") { 
        Join-Path $Paths.ProjectPath "CLAUDE.md" 
    } else { 
        Join-Path $Paths.InstallPath "CLAUDE.md" 
    }
    
    if (Test-Path $ClaudemdPath) {
        $Content = Get-Content $ClaudemdPath
        $ImportLine = "@~/.claude/modes/virtual-team.md"
        $UpdatedContent = $Content | Where-Object { $_ -ne $ImportLine }
        
        if ($UpdatedContent.Count -lt $Content.Count) {
            Write-Host "Removing import line from CLAUDE.md..." -ForegroundColor Yellow
            Set-Content -Path $ClaudemdPath -Value $UpdatedContent -Encoding UTF8
        }
    }
    
    Write-Host "✅ Uninstall completed!" -ForegroundColor Green
}

function Test-Installation {
    Write-Host "Testing installation..." -ForegroundColor Cyan
    
    $TestDir = "test-install"
    
    try {
        # Clean any existing test directory
        if (Test-Path $TestDir) {
            Remove-Item -Path $TestDir -Recurse -Force
        }
        
        Write-Host "Testing installation..." -ForegroundColor Yellow
        New-Item -Path $TestDir -ItemType Directory -Force | Out-Null
        Install-IntelligentClaudeCode -TargetPath $TestDir
        
        Write-Host "Verifying installation..." -ForegroundColor Yellow
        $TestPaths = @(
            "$TestDir\CLAUDE.md",
            "$TestDir\.claude\modes\virtual-team.md",
            "$TestDir\.claude\agents\architect.md",
            "$TestDir\.claude\agents\developer.md",
            "$TestDir\.claude\agents\ai-engineer.md",
            "$TestDir\.claude\agenttask-templates\medium-agenttask-template.yaml",
            "$TestDir\.claude\hooks"
        )
        
        foreach ($Path in $TestPaths) {
            if (-not (Test-Path $Path)) {
                throw "FAIL: Required file not found: $Path"
            }
        }
        
        # Check import line
        $ClaudemdContent = Get-Content "$TestDir\CLAUDE.md" -Raw
        if ($ClaudemdContent -notmatch [regex]::Escape("@~/.claude/modes/virtual-team.md")) {
            throw "FAIL: Import line not found in CLAUDE.md"
        }

        # Verify hook files were deployed
        $HooksDir = "$TestDir\.claude\hooks"
        if (-not (Test-Path $HooksDir)) {
            throw "FAIL: Hooks directory not created: $HooksDir"
        }

        $HookFiles = @(Get-ChildItem -Path $HooksDir -Recurse -File)
        if ($HookFiles.Count -eq 0) {
            throw "FAIL: No hook files deployed to hooks directory"
        }

        # Verify settings.json hook registration
        $TestSettingsPath = "$TestDir\.claude\settings.json"
        if (Test-Path $TestSettingsPath) {
            try {
                $TestSettings = Get-Content $TestSettingsPath -Raw | ConvertFrom-Json

                # Check PreToolUse hook registration
                if ($TestSettings.hooks -and $TestSettings.hooks.PreToolUse) {
                    $PreToolUseHooks = if ($TestSettings.hooks.PreToolUse -is [array]) {
                        $TestSettings.hooks.PreToolUse
                    } else {
                        @($TestSettings.hooks.PreToolUse)
                    }

                    $PreHookFound = $false
                    foreach ($Hook in $PreToolUseHooks) {
                        if ($Hook.hooks -and $Hook.hooks[0] -and $Hook.hooks[0].command -like "*pm-constraints-enforcement.js*") {
                            $PreHookFound = $true
                            break
                        }
                    }

                    if (-not $PreHookFound) {
                        throw "FAIL: PreToolUse hook not found in settings.json"
                    }
                    Write-Host "  ✅ PreToolUse hook registered in settings.json" -ForegroundColor Green
                } else {
                    throw "FAIL: PreToolUse hooks structure not found in settings.json"
                }

                # Check PostToolUse hook registration
                if ($TestSettings.hooks -and $TestSettings.hooks.PostToolUse) {
                    $PostToolUseHooks = if ($TestSettings.hooks.PostToolUse -is [array]) {
                        $TestSettings.hooks.PostToolUse
                    } else {
                        @($TestSettings.hooks.PostToolUse)
                    }

                    $PostHookFound = $false
                    foreach ($Hook in $PostToolUseHooks) {
                        if ($Hook.hooks -and $Hook.hooks[0] -and $Hook.hooks[0].command -like "*post-tool-use.js*") {
                            $PostHookFound = $true
                            break
                        }
                    }

                    if (-not $PostHookFound) {
                        throw "FAIL: Post-tool-use hook not found in settings.json"
                    }
                    Write-Host "  ✅ PostToolUse hook registered in settings.json" -ForegroundColor Green
                } else {
                    throw "FAIL: PostToolUse hooks structure not found in settings.json"
                }

            } catch {
                throw "FAIL: Failed to verify settings.json hook registration: $($_.Exception.Message)"
            }
        } else {
            Write-Warning "  Settings.json not created, hook registration not tested"
        }

        Write-Host "  ✅ Hook system deployed with $($HookFiles.Count) files" -ForegroundColor Green
        Write-Host "✅ Installation tests passed!" -ForegroundColor Green
        
        Write-Host "Testing idempotency..." -ForegroundColor Yellow
        Install-IntelligentClaudeCode -TargetPath $TestDir
        Write-Host "✅ Idempotency test passed!" -ForegroundColor Green
        
        Write-Host "Testing conservative uninstall..." -ForegroundColor Yellow
        Uninstall-IntelligentClaudeCode -TargetPath $TestDir

        $UninstallChecks = @(
            "$TestDir\.claude\modes",
            "$TestDir\.claude\behaviors",
            "$TestDir\.claude\agents",
            "$TestDir\.claude\hooks"
        )

        foreach ($Path in $UninstallChecks) {
            if (Test-Path $Path) {
                throw "FAIL: Directory not removed during uninstall: $Path"
            }
        }

        # Verify hook unregistration from settings.json
        $TestSettingsPath = "$TestDir\.claude\settings.json"
        if (Test-Path $TestSettingsPath) {
            try {
                $TestSettings = Get-Content $TestSettingsPath -Raw | ConvertFrom-Json

                # Check PreToolUse hook removal
                if ($TestSettings.hooks -and $TestSettings.hooks.PreToolUse) {
                    $PreToolUseHooks = if ($TestSettings.hooks.PreToolUse -is [array]) {
                        $TestSettings.hooks.PreToolUse
                    } else {
                        @($TestSettings.hooks.PreToolUse)
                    }

                    foreach ($Hook in $PreToolUseHooks) {
                        if ($Hook.hooks -and $Hook.hooks[0] -and $Hook.hooks[0].command -like "*pm-constraints-enforcement.js*") {
                            throw "FAIL: PreToolUse hook still registered in settings.json after uninstall"
                        }
                    }
                }

                # Check PostToolUse hook removal
                if ($TestSettings.hooks -and $TestSettings.hooks.PostToolUse) {
                    $PostToolUseHooks = if ($TestSettings.hooks.PostToolUse -is [array]) {
                        $TestSettings.hooks.PostToolUse
                    } else {
                        @($TestSettings.hooks.PostToolUse)
                    }

                    foreach ($Hook in $PostToolUseHooks) {
                        if ($Hook.hooks -and $Hook.hooks[0] -and $Hook.hooks[0].command -like "*post-tool-use.js*") {
                            throw "FAIL: Post-tool-use hook still registered in settings.json after uninstall"
                        }
                    }
                }

                Write-Host "  ✅ All hooks unregistered from settings.json" -ForegroundColor Green
            } catch {
                if ($_.Exception.Message -like "*FAIL:*") {
                    throw
                }
                # If there's a parsing error, settings.json might be cleaned up, which is acceptable
                Write-Host "  ✅ Settings.json cleaned up during uninstall" -ForegroundColor Green
            }
        } else {
            Write-Host "  ✅ Settings.json cleaned up during uninstall" -ForegroundColor Green
        }
        
        Write-Host "✅ Conservative uninstall test passed!" -ForegroundColor Green
        
        Write-Host "Testing force uninstall..." -ForegroundColor Yellow
        Install-IntelligentClaudeCode -TargetPath $TestDir
        Uninstall-IntelligentClaudeCode -TargetPath $TestDir -Force
        
        if (Test-Path "$TestDir\.claude") {
            throw "FAIL: .claude directory not removed during force uninstall"
        }
        
        Write-Host "✅ Force uninstall test passed!" -ForegroundColor Green
        
        Write-Host "Testing install after uninstall..." -ForegroundColor Yellow
        Install-IntelligentClaudeCode -TargetPath $TestDir
        
        if (-not (Test-Path "$TestDir\CLAUDE.md")) {
            throw "FAIL: Reinstall failed"
        }
        
        Write-Host "✅ Reinstall test passed!" -ForegroundColor Green
        Write-Host "✅ All tests passed!" -ForegroundColor Green
        
    } finally {
        # Clean up test directory
        if (Test-Path $TestDir) {
            Remove-Item -Path $TestDir -Recurse -Force
        }
    }
}

function Clean-TestFiles {
    Write-Host "Cleaning test installations and temporary files..." -ForegroundColor Yellow
    
    # Remove test directories
    Get-ChildItem -Path . -Directory -Name "test-*" | ForEach-Object {
        Remove-Item -Path $_ -Recurse -Force
        Write-Host "  Removed: $_" -ForegroundColor Gray
    }
    
    # Clean temporary PowerShell files
    $TempPath = $env:TEMP
    Get-ChildItem -Path $TempPath -Directory -Name "tmp*" -ErrorAction SilentlyContinue | 
        Where-Object { $_.CreationTime -lt (Get-Date).AddHours(-1) } |
        ForEach-Object {
            try {
                Remove-Item -Path $_.FullName -Recurse -Force
                Write-Host "  Cleaned temp: $($_.Name)" -ForegroundColor Gray
            } catch {
                # Ignore errors for locked temp files
            }
        }
    
    Write-Host "✅ Test directories removed" -ForegroundColor Green
    Write-Host "✅ Temporary files cleaned" -ForegroundColor Green
}

# Main execution logic
try {
    switch ($Action.ToLower()) {
        "install" {
            Install-IntelligentClaudeCode -TargetPath $TargetPath -McpConfig $McpConfig
        }
        "uninstall" {
            Uninstall-IntelligentClaudeCode -TargetPath $TargetPath -Force:$Force
        }
        "test" {
            Test-Installation
        }
        "clean" {
            Clean-TestFiles
        }
        "help" {
            Show-Help
        }
        default {
            Show-Help
        }
    }
} catch {
    Write-Error "Operation failed: $($_.Exception.Message)"
    exit 1
}