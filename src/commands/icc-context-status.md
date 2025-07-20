# Context Status

Display the current project context status and active configuration.

## Description

This command shows the current state of loaded project context, including what's loaded, when it was loaded, validation status, and how it's being applied to current work. It provides a quick overview of context availability and health.

## Usage

```
/icc-context-status
/icc-context-status $ARGUMENTS
```

## Arguments

**Optional:** Display mode or specific aspect to check
- No arguments: Standard status summary
- "detailed": Full context with all sections
- "usage": Show how context is being applied
- Section name: Display specific section content

**Examples:**
- `/icc-context-status` - Quick status overview
- `/icc-context-status detailed` - Full context display
- `/icc-context-status usage` - Show active applications
- `/icc-context-status "Tech Stack"` - View specific section

## Behavior

The command provides comprehensive status information:

1. **Check Context State**
   - Verify if context is loaded
   - Show load timestamp
   - Display source location

2. **Display Summary**
   - Project name and path
   - Sections available
   - Validation status
   - Last update time

3. **Show Active Usage**
   - Which roles are using context
   - Recent context applications
   - Current work alignment

4. **Provide Health Indicators**
   - Context age and freshness
   - Validation score
   - Usage frequency

## Status Display Format

### Standard View
```
📋 PROJECT CONTEXT STATUS

✅ Context Loaded: MyAwesomeProject
📁 Source: /Users/dev/projects/myproject/PROJECT-CONTEXT.md
🕐 Loaded: 2025-01-20 10:30 AM (2 hours ago)
🔍 Validation: 85% complete (Good)

📑 Available Sections (7):
   • Project Overview ✓
   • Technology Stack ✓
   • Coding Standards ✓
   • Testing Requirements ✓
   • Architecture Patterns ✓
   • Deployment Process ⚠️ (minimal)
   • Team Conventions ✓

🎯 Active Usage:
   • @Developer following TypeScript standards
   • @QA-Engineer using Jest configuration
   • @DevOps-Engineer applying deploy process

💡 Quick Actions:
   - Run `/icc-validate-context strict` for detailed analysis
   - Run `/icc-load-context` to refresh
   - Add missing sections to improve score
```

### Detailed View
Shows full content of each section with:
- Section headers and content
- Word counts
- Last modified timestamps
- Quality indicators

### Usage View
```
🎯 CONTEXT USAGE TRACKING

Recent Applications (last 24h):
   • Tech Stack → Selected React patterns (15 times)
   • Standards → Applied ESLint rules (8 times)
   • Testing → Used Jest setup (6 times)
   • Architecture → Referenced component structure (4 times)

Active Influences:
   • Git commits following convention
   • Code formatting per standards
   • Test structure matching requirements
   • PR descriptions using template

Compliance Score: 92%
```

## Memory Integration

Queries memory for:
- ProjectContext entities
- Validation results
- Usage patterns
- Application history

## Health Indicators

- **🟢 Fresh:** Updated < 7 days ago
- **🟡 Aging:** Updated 7-30 days ago
- **🔴 Stale:** Updated > 30 days ago

## Context Not Loaded

When no context is loaded:
```
❌ No Project Context Loaded

📝 To load context:
   1. Ensure PROJECT-CONTEXT.md exists in your project
   2. Run: /icc-load-context
   3. Or specify path: /icc-load-context /path/to/project

💡 Need a template? The system can help create a PROJECT-CONTEXT.md
   with standard sections for your project type.
```

## Integration Points

- Automatically checked by roles before major decisions
- Referenced in `/icc-validate-context` reports
- Updated by `/icc-load-context` operations
- Used by workflow executors for standards

## Recommendations

Based on status, suggests:
- Missing critical sections
- Outdated information
- Unused context elements
- Optimization opportunities

This command provides essential visibility into project context health and usage, ensuring the AI team stays aligned with project requirements.