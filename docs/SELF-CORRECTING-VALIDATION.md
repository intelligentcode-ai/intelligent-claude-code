# Self-Correcting Validation System

## Overview

The self-correcting validation system ensures that validation chains are automatically executed without stopping L3 autonomous execution. This system moves from passive documentation to active enforcement through command-based interception.

## Architecture

### Core Components

1. **ValidationInterceptor** (in `lean-workflow-executor.md`)
   - Auto-detects work types (ai_agentic, infrastructure, security, etc.)
   - Automatically activates specialist architects
   - Corrects role assignments to meet >70% capability threshold
   - Enforces git privacy settings

2. **workflow-enforcement.md Behavior**
   - Provides real-time validation enforcement
   - Automatically intercepts role assignments
   - Monitors git operations
   - Enforces workflow phases

3. **/icc-test-enforcement Command**
   - Tests all enforcement scenarios
   - Demonstrates self-correction working
   - Validates enforcement mechanisms

### How It Works

```pseudocode
// When role assignment attempted
task: "Deploy kubernetes infrastructure"
assigned: "@Developer"

// ValidationInterceptor detects and corrects
workType: "infrastructure" detected
capability: 0.25 (below 0.7 threshold)
AUTO-CORRECTED: @Developer → @DevOps-Engineer
```

### Integration Points

1. **Automatic Activation**
   - workflow-enforcement.md activates on system initialization
   - All behavioral pattern loading includes enforcement

2. **Real-Time Interception**
   - `global.roleAssignmentHandler` - intercepts all role assignments
   - `global.gitOperationHandler` - intercepts all git operations

3. **L3 Compatibility**
   - Validation executes WITHOUT stopping
   - Auto-correction happens silently
   - Logs provide transparency

## Usage

### Automatic Enforcement
```bash
/icc-load  # Automatically activates enforcement
```

### Manual Testing
```bash
/icc-test-enforcement  # Run validation tests
```

### Expected Behavior

1. **Wrong Role Assignment**
   - Before: @Developer assigned to AI work
   - After: @AI-Engineer auto-assigned

2. **Git Privacy Violation**
   - Before: "Fixed with Claude's help 🤖"
   - After: "Fixed"

3. **Missing Architect Consultation**
   - Before: No specialist architect
   - After: @AI-Architect auto-activated

## Configuration

The system respects all settings from the configuration hierarchy:
- Embedded config (highest priority)
- Project config (.claude/config.md)
- User config (~/.claude/config.md)

## Troubleshooting

### Validation Not Working
1. Verify `/icc-load` was executed
2. Check enforcement status with `/icc-test-enforcement`
3. Ensure behavioral patterns are loaded

### Auto-Correction Not Visible
- Check logs for "AUTO-CORRECTED" entries
- Run test command to verify hooks active

## Key Insight

In markdown-based behavioral systems, documentation alone doesn't enforce behavior. The workflow-enforcement.md behavior module and ValidationInterceptor work together to provide real-time enforcement through continuous pattern detection and correction.