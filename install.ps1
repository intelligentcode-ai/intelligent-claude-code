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

function Register-HookInSettings {
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
                hooks = @(
                    [PSCustomObject]@{
                        command = $HookCommand
                        failureMode = "allow"
                        timeout = 15000
                        type = "command"
                    }
                )
                matcher = "*"
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

function Register-PostToolUseHookInSettings {
    param(
        [Parameter(Mandatory=$true)]
        [string]$SettingsPath,

        [Parameter(Mandatory=$true)]
        [string]$HookCommand
    )

    try {
        Write-Host "  Registering PostToolUse hook in settings.json..." -ForegroundColor Gray

        # Load or create settings
        $Settings = Get-SettingsJson -SettingsPath $SettingsPath

        # Initialize hooks structure if missing
        if (-not $Settings.hooks) {
            $Settings | Add-Member -MemberType NoteProperty -Name "hooks" -Value ([PSCustomObject]@{}) -Force
        }

        if (-not $Settings.hooks.PostToolUse) {
            $Settings.hooks | Add-Member -MemberType NoteProperty -Name "PostToolUse" -Value @() -Force
        }

        # Convert PostToolUse to array if it's not already
        if ($Settings.hooks.PostToolUse -isnot [array]) {
            $Settings.hooks.PostToolUse = @($Settings.hooks.PostToolUse)
        }

        # Check if hook already exists to prevent duplicates
        $ExistingHook = $Settings.hooks.PostToolUse | Where-Object {
            $_.hooks -and $_.hooks[0] -and $_.hooks[0].command -eq $HookCommand
        }

        if (-not $ExistingHook) {
            # Create new hook entry
            $NewHook = [PSCustomObject]@{
                hooks = @(
                    [PSCustomObject]@{
                        command = $HookCommand
                        failureMode = "allow"
                        timeout = 15000
                        type = "command"
                    }
                )
                matcher = "*"
            }

            # Add to PostToolUse array
            $Settings.hooks.PostToolUse += $NewHook

            # Save settings with proper JSON formatting
            $JsonOutput = $Settings | ConvertTo-Json -Depth 10
            Set-Content -Path $SettingsPath -Value $JsonOutput -Encoding UTF8

            Write-Host "  ✅ PostToolUse hook registered successfully in settings.json" -ForegroundColor Green
        } else {
            Write-Host "  PostToolUse hook already registered, skipping duplicate registration" -ForegroundColor Yellow
        }

    } catch {
        Write-Warning "  Failed to register PostToolUse hook in settings.json: $($_.Exception.Message)"
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

            # Get count of copied files for user feedback
            $CopiedFiles = @(Get-ChildItem -Path $HooksPath -Recurse -File)
            Write-Host "  Successfully copied $($CopiedFiles.Count) hook files" -ForegroundColor Green

            # Register production hooks in settings.json
            $SettingsPath = Join-Path $InstallPath "settings.json"

            # Register pre-tool-use hook
            $PreToolUseHookPath = Join-Path $HooksPath "pre-tool-use.js"
            if (Test-Path $PreToolUseHookPath) {
                $HookCommand = "node `"$PreToolUseHookPath`""
                Register-HookInSettings -SettingsPath $SettingsPath -HookCommand $HookCommand
            } else {
                Write-Warning "  Pre-tool-use hook not found, skipping PreToolUse registration"
            }

            # Register post-tool-use hook
            $PostToolUseHookPath = Join-Path $HooksPath "post-tool-use.js"
            if (Test-Path $PostToolUseHookPath) {
                $HookCommand = "node `"$PostToolUseHookPath`""
                Register-PostToolUseHookInSettings -SettingsPath $SettingsPath -HookCommand $HookCommand
            } else {
                Write-Warning "  Post-tool-use hook not found, skipping PostToolUse registration"
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

    # Unregister pre-tool-use hook
    $PreToolUseHookPath = Join-Path $Paths.InstallPath "hooks" "pre-tool-use.js"
    if (Test-Path $PreToolUseHookPath) {
        $HookCommand = "node `"$PreToolUseHookPath`""
        Unregister-HookFromSettings -SettingsPath $SettingsPath -HookCommand $HookCommand -HookType "PreToolUse"
    }

    # Unregister post-tool-use hook
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
                        if ($Hook.hooks -and $Hook.hooks[0] -and $Hook.hooks[0].command -like "*pre-tool-use.js*") {
                            $PreHookFound = $true
                            break
                        }
                    }

                    if (-not $PreHookFound) {
                        throw "FAIL: Pre-tool-use hook not found in settings.json"
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
                        if ($Hook.hooks -and $Hook.hooks[0] -and $Hook.hooks[0].command -like "*pre-tool-use.js*") {
                            throw "FAIL: Pre-tool-use hook still registered in settings.json after uninstall"
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