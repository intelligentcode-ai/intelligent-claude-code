# Test script for hook deployment functionality
# This script validates the Install-HookSystem function

param(
    [switch]$TestMode = $false
)

# Import the functions from the main install script
. ./install.ps1

Write-Host "Testing Hook Deployment Functionality" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan

# Create temporary test directory
$TestDir = "test-hook-deployment"
$TestInstallPath = Join-Path $TestDir ".claude"
$TestSourceDir = "./src"

try {
    # Clean up any existing test directory
    if (Test-Path $TestDir) {
        Remove-Item -Path $TestDir -Recurse -Force
    }

    # Create test directory structure
    New-Item -Path $TestDir -ItemType Directory -Force | Out-Null
    New-Item -Path $TestInstallPath -ItemType Directory -Force | Out-Null

    Write-Host "Created test directories..." -ForegroundColor Green

    # Test Install-HookSystem function
    if (Test-Path $TestSourceDir) {
        Write-Host "Testing Install-HookSystem function..." -ForegroundColor Yellow

        Install-HookSystem -InstallPath $TestInstallPath -SourceDir $TestSourceDir

        # Verify results
        $HooksPath = Join-Path $TestInstallPath "hooks"
        $LogsPath = Join-Path $TestInstallPath "logs"

        if (Test-Path $HooksPath) {
            $HookFiles = @(Get-ChildItem -Path $HooksPath -Recurse -File)
            Write-Host "✅ Hooks directory created: $HooksPath" -ForegroundColor Green
            Write-Host "✅ Found $($HookFiles.Count) hook files" -ForegroundColor Green

            # List some of the deployed files
            Write-Host "Sample deployed files:" -ForegroundColor Cyan
            $HookFiles | Select-Object -First 5 | ForEach-Object {
                $RelativePath = $_.FullName.Replace($HooksPath, "").TrimStart('\')
                Write-Host "  - $RelativePath" -ForegroundColor Gray
            }

        } else {
            Write-Error "❌ Hooks directory not created"
        }

        if (Test-Path $LogsPath) {
            Write-Host "✅ Logs directory created: $LogsPath" -ForegroundColor Green
        } else {
            Write-Error "❌ Logs directory not created"
        }

    } else {
        Write-Warning "Source directory not found: $TestSourceDir"
        Write-Host "This test requires the src/ directory with hooks" -ForegroundColor Yellow
    }

} catch {
    Write-Error "Test failed: $($_.Exception.Message)"
} finally {
    # Clean up test directory
    if (Test-Path $TestDir) {
        Remove-Item -Path $TestDir -Recurse -Force
        Write-Host "Cleaned up test directory" -ForegroundColor Gray
    }
}

Write-Host "Hook deployment test completed!" -ForegroundColor Cyan