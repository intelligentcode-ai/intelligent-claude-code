# PowerShell Implementation Specification for intelligent-claude-code Hooks

## Overview

This specification provides detailed requirements for implementing the intelligent-claude-code hook system in PowerShell for Windows environments, maintaining functional parity with the Node.js implementation.

## 1. Core Implementation Structure

### 1.1 Main Hook Script (`PreToolUse.ps1`)

**Location**: `$env:USERPROFILE\.claude\hooks\PreToolUse.ps1`

**Input Handling**:
```powershell
# Priority-based input handling
param(
    [Parameter(Mandatory=$false)]
    [string]$InputData
)

# Input sources (priority order):
# 1. Command line parameter: -InputData '{"tool":"Edit",...}'
# 2. Environment variable: $env:HOOK_INPUT
# 3. Pipeline input: stdin (if available)

if ([string]::IsNullOrWhiteSpace($InputData)) {
    if ($env:HOOK_INPUT) {
        $InputData = $env:HOOK_INPUT
    } elseif (!([Console]::IsInputRedirected -eq $false)) {
        $InputData = [Console]::In.ReadToEnd()
    }
}
```

**JSON Processing**:
```powershell
try {
    $input = $InputData | ConvertFrom-Json
    if (-not $input.tool) {
        throw "Missing required property: tool"
    }
} catch {
    Write-Error "Invalid JSON input: $($_.Exception.Message)"
    exit 1
}
```

**Performance Monitoring**:
```powershell
$stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
# ... processing logic ...
$stopwatch.Stop()

if ($stopwatch.ElapsedMilliseconds -gt 10) {
    Write-Warning "Hook took $($stopwatch.ElapsedMilliseconds)ms (threshold: 10ms)"
}
```

### 1.2 Module Structure

**IntentClassifier.psm1**:
```powershell
function Invoke-IntentClassification {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Tool,

        [Parameter(Mandatory)]
        [hashtable]$Parameters,

        [Parameter(Mandatory)]
        [string]$Context
    )

    $scores = @{
        research = 0.0
        qa = 0.0
        planning = 0.0
        work = 0.0
    }

    # Tool-based classification
    $researchTools = @('Read', 'Grep', 'Glob', 'WebSearch', 'WebFetch', 'Bash')
    $workTools = @('Edit', 'Write', 'MultiEdit', 'NotebookEdit')

    if ($researchTools -contains $Tool) {
        $scores.research += 0.6
    }

    if ($workTools -contains $Tool) {
        $scores.work += 0.7
    }

    # Context pattern analysis
    $workVerbs = @('fix', 'change', 'update', 'modify', 'create', 'delete', 'deploy', 'install')
    $workVerbCount = ($workVerbs | Where-Object { $Context -imatch [regex]::Escape($_) }).Count
    $scores.work += [Math]::Min($workVerbCount * 0.1, 0.4)

    # Question patterns boost QA
    if ($Context -imatch '\b(what|how|why|when|where|who)\b|\?') {
        $scores.qa += 0.4
        $scores.work *= 0.5
    }

    # Normalize scores
    $totalScore = ($scores.Values | Measure-Object -Sum).Sum
    if ($totalScore -gt 0) {
        $scores.Keys | ForEach-Object {
            $scores[$_] = [Math]::Min($scores[$_] / $totalScore, 1.0)
        }
    }

    # Find top intent
    $topIntent = $scores.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 1

    return @{
        intent = $topIntent.Name
        confidence = [Math]::Round($topIntent.Value, 3)
        scores = $scores
    }
}
```

**ConfigLoader.psm1**:
```powershell
class ConfigCache {
    [hashtable]$cache = @{}
    [int]$ttlMs = 300000  # 5 minutes

    [void]Set([string]$key, [object]$value) {
        $this.cache[$key] = @{
            value = $value
            timestamp = (Get-Date).Ticks
        }
    }

    [object]Get([string]$key) {
        if (-not $this.cache.ContainsKey($key)) {
            return $null
        }

        $entry = $this.cache[$key]
        $elapsed = ((Get-Date).Ticks - $entry.timestamp) / 10000  # Convert to milliseconds

        if ($elapsed -gt $this.ttlMs) {
            $this.cache.Remove($key)
            return $null
        }

        return $entry.value
    }
}

function Get-IntentConfiguration {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$IntentType,

        [Parameter()]
        [switch]$ForceReload
    )

    static $cache = [ConfigCache]::new()
    $cacheKey = "intent-patterns"

    if (-not $ForceReload -and ($config = $cache.Get($cacheKey))) {
        return $config.intents[$IntentType]
    }

    # Load configuration from file
    $configPath = Join-Path $PSScriptRoot "..\config\intent-patterns.json"
    if (Test-Path $configPath) {
        $configContent = Get-Content $configPath -Raw | ConvertFrom-Json

        # Handle schema+data format
        if ($configContent.data -and $configContent.'$schema') {
            $config = $configContent.data
        } else {
            $config = $configContent
        }

        $cache.Set($cacheKey, $config)
        return $config.intents[$IntentType]
    }

    # Return defaults if config not found
    return Get-DefaultIntentConfig -IntentType $IntentType
}
```

**Logger.psm1**:
```powershell
class ViolationLogger {
    [string]$logDir

    ViolationLogger() {
        $this.logDir = $this.ResolveLogDirectory()
        $this.EnsureLogDirectory()
    }

    [string]ResolveLogDirectory() {
        # Check for project scope first
        if ($env:CLAUDE_PROJECT_DIR) {
            return Join-Path $env:CLAUDE_PROJECT_DIR ".claude\logs"
        }

        # Fall back to user scope
        return Join-Path $env:USERPROFILE ".claude\logs"
    }

    [void]EnsureLogDirectory() {
        if (!(Test-Path $this.logDir)) {
            New-Item -ItemType Directory -Path $this.logDir -Force -ErrorAction SilentlyContinue
        }
    }

    [void]LogViolation([hashtable]$violation) {
        try {
            $logFile = Join-Path $this.logDir "violations-$(Get-Date -Format 'yyyy-MM-dd').log"
            $entry = @{
                timestamp = (Get-Date -Format 'yyyy-MM-ddTHH:mm:ss.fffZ')
            }
            $violation.Keys | ForEach-Object { $entry[$_] = $violation[$_] }

            $logEntry = ($entry | ConvertTo-Json -Compress) + "`n"
            Add-Content -Path $logFile -Value $logEntry -NoNewline -ErrorAction SilentlyContinue
        } catch {
            # Silent fail - logging failures shouldn't break Claude
        }
    }
}
```

## 2. Memory Enforcement Implementation

### 2.1 Memory Search Detection

```powershell
class MemoryEnforcement {
    [int]$memorySearchWindow = 300000  # 5 minutes in milliseconds
    [ViolationLogger]$logger

    MemoryEnforcement() {
        $this.logger = [ViolationLogger]::new()
    }

    [bool]IsAgentTaskCreation([string]$tool, [hashtable]$parameters) {
        if ($tool -notin @('Write', 'MultiEdit')) {
            return $false
        }

        $filePath = $parameters.file_path -as [string]
        return $filePath -imatch '\.agenttask\.yaml' -or $filePath -imatch '/agenttasks/'
    }

    [bool]HasRecentMemorySearch() {
        try {
            $logDir = $this.logger.ResolveLogDirectory()
            $today = Get-Date -Format 'yyyy-MM-dd'
            $logFile = Join-Path $logDir "violations-$today.log"

            if (!(Test-Path $logFile)) {
                return $false
            }

            $cutoffTime = (Get-Date).AddMilliseconds(-$this.memorySearchWindow)
            $logContent = Get-Content $logFile

            foreach ($line in ($logContent | Select-Object -Last 50)) {  # Check recent entries
                try {
                    $entry = $line | ConvertFrom-Json
                    $entryTime = [DateTime]::Parse($entry.timestamp)

                    if ($entryTime -lt $cutoffTime) {
                        continue
                    }

                    # Check for memory search indicators
                    if ($entry.tool -eq 'Read' -and (
                        $entry.parameters -contains 'memory' -or
                        $entry.context -imatch 'memory' -or
                        $entry.reason -imatch 'memory'
                    )) {
                        return $true
                    }

                    if ($entry.tool -eq 'Bash' -and $entry.context -imatch 'memory search') {
                        return $true
                    }
                } catch {
                    continue  # Skip malformed entries
                }
            }

            return $false
        } catch {
            return $false  # Fail open
        }
    }

    [string]GenerateMemoryRequirementError() {
        return @"
🚫 MEMORY CONSULTATION REQUIRED BEFORE AGENTTASK CREATION

VIOLATION: Attempting to create AgentTask without recent memory search
REQUIREMENT: Memory consultation must occur within 5 minutes before AgentTask creation

ARCHITECTURAL RULE: MEMORY-FIRST → AGENTTASK → AGENT EXECUTION

REQUIRED PROCESS:
1. Search memory for relevant patterns: Read files in memory/ directory
2. Apply learned patterns and best practices
3. Then create AgentTask with memory-informed context
4. Deploy via Task tool to authorized agent

MEMORY LOCATIONS TO SEARCH:
- memory/behavioral-enforcement/
- memory/system/
- memory/patterns/
- memory/[relevant-domain]/

NO EXCEPTIONS - MEMORY CONSULTATION IS MANDATORY
"@
    }
}
```

## 3. settings.json Integration

### 3.1 Hook Registration Format

**PowerShell Hook Registration**:
```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "*",
      "hooks": [{
        "type": "command",
        "command": "pwsh.exe -ExecutionPolicy Bypass -NoProfile -File \"%USERPROFILE%\\.claude\\hooks\\PreToolUse.ps1\"",
        "timeout": 15000,
        "failureMode": "allow"
      }]
    }]
  }
}
```

### 3.2 Installation Script (`Install-HookSystem.ps1`)

```powershell
[CmdletBinding()]
param(
    [Parameter()]
    [string]$InstallPath = "$env:USERPROFILE\.claude",

    [Parameter()]
    [string]$SourcePath = ".\src\hooks"
)

function Install-HookSystem {
    # Create directory structure
    $directories = @('hooks', 'hooks\lib', 'hooks\config', 'logs')
    foreach ($dir in $directories) {
        $fullPath = Join-Path $InstallPath $dir
        if (!(Test-Path $fullPath)) {
            New-Item -ItemType Directory -Path $fullPath -Force
            Write-Host "Created directory: $fullPath" -ForegroundColor Green
        }
    }

    # Copy hook files
    $filesToCopy = @{
        'PreToolUse.ps1' = 'hooks\PreToolUse.ps1'
        'lib\IntentClassifier.psm1' = 'hooks\lib\IntentClassifier.psm1'
        'lib\ConfigLoader.psm1' = 'hooks\lib\ConfigLoader.psm1'
        'lib\Logger.psm1' = 'hooks\lib\Logger.psm1'
        'config\intent-patterns.json' = 'hooks\config\intent-patterns.json'
        'config\claude-settings.json' = 'hooks\config\claude-settings.json'
    }

    foreach ($source in $filesToCopy.Keys) {
        $srcPath = Join-Path $SourcePath $source
        $destPath = Join-Path $InstallPath $filesToCopy[$source]

        if (Test-Path $srcPath) {
            Copy-Item $srcPath $destPath -Force
            Write-Host "Copied: $source -> $destPath" -ForegroundColor Green
        } else {
            Write-Warning "Source file not found: $srcPath"
        }
    }

    # Handle settings.json integration
    $settingsPath = Join-Path $InstallPath 'settings.json'
    $hookCommand = "pwsh.exe -ExecutionPolicy Bypass -NoProfile -File `"$InstallPath\hooks\PreToolUse.ps1`""

    if (Test-Path $settingsPath) {
        # Merge with existing settings
        $settings = Get-Content $settingsPath -Raw | ConvertFrom-Json

        $hookConfig = @{
            hooks = @{
                PreToolUse = @(@{
                    matcher = "*"
                    hooks = @(@{
                        type = "command"
                        command = $hookCommand
                        timeout = 15000
                        failureMode = "allow"
                    })
                })
            }
        }

        # Merge configurations (PowerShell doesn't have recursive merge, so manual)
        if ($settings.hooks) {
            $settings.hooks.PreToolUse = $hookConfig.hooks.PreToolUse
        } else {
            $settings | Add-Member -Type NoteProperty -Name 'hooks' -Value $hookConfig.hooks
        }

        $settings | ConvertTo-Json -Depth 10 | Set-Content $settingsPath
        Write-Host "Merged hooks into existing settings.json" -ForegroundColor Yellow
    } else {
        # Create new settings.json
        $newSettings = @{
            hooks = @{
                PreToolUse = @(@{
                    matcher = "*"
                    hooks = @(@{
                        type = "command"
                        command = $hookCommand
                        timeout = 15000
                        failureMode = "allow"
                    })
                })
            }
        }

        $newSettings | ConvertTo-Json -Depth 10 | Set-Content $settingsPath
        Write-Host "Created new settings.json with hook registration" -ForegroundColor Green
    }

    Write-Host "Hook system installation complete!" -ForegroundColor Cyan
    Write-Host "Location: $InstallPath" -ForegroundColor Cyan
}

# Execute installation
Install-HookSystem
```

## 4. Error Handling and Exit Codes

### 4.1 Exit Code Standards

```powershell
# Exit codes matching Node.js implementation
$EXIT_ALLOW = 0      # Allow action to proceed
$EXIT_BLOCK = 2      # Block action with error message
$EXIT_SYSTEM_ERROR = 1  # System error (fail open)

# Error handling wrapper
function Invoke-HookWithErrorHandling {
    param([scriptblock]$ScriptBlock)

    try {
        $result = & $ScriptBlock

        if ($result.allowed) {
            Write-Output "ALLOWED: $($result.message)"
            exit $EXIT_ALLOW
        } else {
            Write-Error $result.message
            exit $EXIT_BLOCK
        }
    } catch {
        Write-Error "Hook system error: $($_.Exception.Message)"
        exit $EXIT_SYSTEM_ERROR  # Fail open
    }
}
```

### 4.2 Input Validation

```powershell
function Test-HookInput {
    param([object]$Input)

    if (-not $Input) {
        throw "Invalid JSON input: null or empty"
    }

    if (-not $Input.tool -or $Input.tool -isnot [string]) {
        throw "Missing or invalid tool name"
    }

    if ($Input.parameters -and $Input.parameters -isnot [hashtable] -and $Input.parameters -isnot [PSCustomObject]) {
        throw "Invalid parameters format"
    }

    if ($Input.context -and $Input.context -isnot [string] -and $Input.context -isnot [hashtable] -and $Input.context -isnot [PSCustomObject]) {
        throw "Invalid context format - must be string or object"
    }
}
```

## 5. Testing Framework

### 5.1 Pester Test Structure (`PreToolUse.Tests.ps1`)

```powershell
Describe "PreToolUse Hook System" {
    BeforeAll {
        # Import modules for testing
        Import-Module "$PSScriptRoot\lib\IntentClassifier.psm1" -Force
        Import-Module "$PSScriptRoot\lib\ConfigLoader.psm1" -Force
        Import-Module "$PSScriptRoot\lib\Logger.psm1" -Force
    }

    Context "Input Validation" {
        It "Should accept valid JSON input" {
            $input = @{
                tool = "Read"
                parameters = @{ file_path = "/test/file.txt" }
            }
            { Test-HookInput -Input $input } | Should -Not -Throw
        }

        It "Should reject input without tool" {
            $input = @{ parameters = @{} }
            { Test-HookInput -Input $input } | Should -Throw "*tool name*"
        }
    }

    Context "Intent Classification" {
        It "Should classify Read tool as research" {
            $result = Invoke-IntentClassification -Tool "Read" -Parameters @{} -Context ""
            $result.intent | Should -Be "research"
        }

        It "Should classify Edit tool as work" {
            $result = Invoke-IntentClassification -Tool "Edit" -Parameters @{} -Context ""
            $result.intent | Should -Be "work"
        }
    }

    Context "Memory Enforcement" {
        It "Should detect AgentTask creation" {
            $memoryEnforcement = [MemoryEnforcement]::new()
            $result = $memoryEnforcement.IsAgentTaskCreation("Write", @{ file_path = "/test/task.agenttask.yaml" })
            $result | Should -Be $true
        }
    }
}
```

## 6. Performance Optimization

### 6.1 Performance Monitoring

```powershell
function Measure-HookPerformance {
    param([scriptblock]$ScriptBlock)

    $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
    try {
        $result = & $ScriptBlock
        return @{
            result = $result
            performance = $stopwatch.ElapsedMilliseconds
        }
    } finally {
        $stopwatch.Stop()
    }
}
```

### 6.2 Caching Strategy

```powershell
# Static cache for expensive operations
class StaticCache {
    static [hashtable]$configCache = @{}
    static [datetime]$lastConfigLoad = [datetime]::MinValue
    static [int]$cacheExpiryMinutes = 5

    static [bool]IsCacheValid() {
        return ([StaticCache]::lastConfigLoad.AddMinutes([StaticCache]::cacheExpiryMinutes) -gt (Get-Date))
    }

    static [void]InvalidateCache() {
        [StaticCache]::configCache.Clear()
        [StaticCache]::lastConfigLoad = [datetime]::MinValue
    }
}
```

## Summary

This specification provides a comprehensive framework for implementing the intelligent-claude-code hook system in PowerShell. Key implementation priorities include:

1. **Functional Parity**: Maintain identical behavior to Node.js implementation
2. **Performance**: Achieve <10ms execution target through caching and optimization
3. **Reliability**: Implement robust error handling with fail-open behavior
4. **Maintainability**: Use PowerShell best practices and comprehensive testing
5. **Security**: Validate inputs and handle execution policy requirements

The PowerShell implementation should provide seamless behavioral enforcement for Windows users while preserving the architectural integrity of the intelligent-claude-code system.