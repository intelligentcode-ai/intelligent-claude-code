# icc:system-status

Display comprehensive system status including configuration, roles, memory, and health.

## Usage
```
icc-system-status
```

## Implementation
Provides complete system health and status overview:

1. **Configuration Status**: Current settings and autonomy level
2. **Active Roles**: Currently active roles with scores
3. **Memory Statistics**: Entity and relation counts
4. **Task Management**: Current todo status and queue size
5. **System Health**: Performance metrics and error rates

## Expected Output
```
📊 System Status Report
========================================

⚙️ Configuration:
  Autonomy Level: L3
  PM Active: true
  Blocking: false
  Git Privacy: true

👥 Active Roles:
  @PM (P:8.5, Q:9.2)
  @AI-Engineer (P:7.0, Q:8.5)

🧠 Memory System:
  Entities: 45
  Relations: 120
  Last Update: 2025-07-17 14:30:00

✅ Task Management:
  Pending: 3
  In Progress: 1
  Completed: 12

💚 System Health:
  Status: Healthy
  Uptime: 2h 15m
  Error Rate: 0.02%
  Memory Usage: 45%
```

## Integration
- Reads from all system components
- Provides real-time health monitoring
- Integrates with scoring system for role performance
- Shows memory system statistics