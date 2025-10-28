#!/bin/bash

# Test hook with monitoring project context
# This script tests pm-constraints-enforcement.js with a monitoring Edit operation

HOOK_PATH="$HOME/.claude/hooks/pm-constraints-enforcement.js"
LOG_DIR="$HOME/.claude/logs"
LOG_FILE="$LOG_DIR/$(date +%Y-%m-%d)-pm-constraints-enforcement.log"

echo "=== Testing pm-constraints-enforcement.js with monitoring context ==="
echo ""

# Create test input JSON mimicking monitoring Edit operation
cat > /tmp/hook-test-input.json <<'EOF'
{
  "tool_name": "Edit",
  "tool_input": {
    "file_path": "/Users/karsten/Work/Engineering/ansible/deployments/kubernetes/applications/monitoring/group_vars/all.yml"
  },
  "cwd": "/Users/karsten/Work/Engineering/ansible/deployments/kubernetes/applications/monitoring",
  "session_id": "test-session-123"
}
EOF

echo "Test Input JSON:"
cat /tmp/hook-test-input.json
echo ""
echo "---"
echo ""

# Run hook with test input
echo "Running hook..."
cat /tmp/hook-test-input.json | node "$HOOK_PATH"
HOOK_EXIT_CODE=$?

echo ""
echo "Hook exit code: $HOOK_EXIT_CODE"
echo ""

# Check log file
echo "=== Log file contents ==="
if [ -f "$LOG_FILE" ]; then
    echo "Log file exists: $LOG_FILE"
    echo ""
    tail -20 "$LOG_FILE"
else
    echo "ERROR: Log file not found at $LOG_FILE"
fi

echo ""
echo "=== Test complete ==="
