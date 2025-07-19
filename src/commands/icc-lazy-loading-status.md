# Lazy Loading Status

Display lazy loading status and optimization recommendations

## Usage
```bash
icc-lazy-loading-status [--detailed]
```

## Parameters
- `--detailed`: Show detailed analytics and breakdown

## Behavior
Displays current lazy loading status including module statistics, token optimization, and performance metrics. Provides optimization recommendations based on usage patterns.

## Expected Output
```bash
📊 Lazy Loading Status Report
==================================================

📦 Module Statistics:
  Total Modules: 9
  Loaded Stubs: 7
  Full Modules: 2

🔍 Module Breakdown:
  lean-workflow-executor: ✅ Loaded
  role-activation-system: ✅ Loaded
  learning-team-automation: 💤 Stub
  l3-continuous-engine: 💤 Stub
  task-queue-manager: 💤 Stub
  auto-continue-triggers: 💤 Stub
  progress-monitor: 💤 Stub
  work-discovery-engine: 💤 Stub
  archival-intelligence: 💤 Stub

💡 Recommendations:
  • Consider preloading frequently used modules
  • Heavy modules detected: lean-workflow-executor, role-activation-system
  • Consider more aggressive caching for frequently accessed functions
```

## Integration
- **PM Commands**: Available through @PM lazy-status
- **System Status**: Integrated with /icc-system-status
- **Token Optimization**: Automatic recommendations based on usage patterns