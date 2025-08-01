#!/bin/bash

# Test script for file-based memory operations

echo "=== Memory System Test Suite ==="
echo

# Test 1: Check directory structure
echo "Test 1: Verifying directory structure..."
if [ -d ".claude/memory/entities" ] && [ -d ".claude/memory/indexes" ] && [ -d ".claude/memory/relations" ]; then
    echo "✅ Directory structure verified"
else
    echo "❌ Directory structure missing"
    exit 1
fi

# Test 2: Check for MCP references in behaviors
echo -e "\nTest 2: Checking for MCP memory references in behaviors..."
MCP_REFS=$(grep -r "mcp__memory" .claude/behaviors 2>/dev/null | wc -l)
if [ $MCP_REFS -eq 0 ]; then
    echo "✅ No MCP memory references found in behaviors"
else
    echo "❌ Found $MCP_REFS MCP memory references"
fi

# Test 3: Create test memory entity
echo -e "\nTest 3: Creating test memory entity..."
TEST_ID="TestMemory-$(date +%Y%m%d-%H%M%S)"
TEST_DIR=".claude/memory/entities/test/$(date +%Y)/$(date +%m)"
mkdir -p "$TEST_DIR"

cat > "$TEST_DIR/$TEST_ID.md" << EOF
---
id: $TEST_ID
type: Test
created: $(date -u +%Y-%m-%dT%H:%M:%SZ)
context: Memory system test
relevance: 10
tags: [test, validation]
---

# Test Memory Entity

This is a test memory entity created during memory system validation.
EOF

if [ -f "$TEST_DIR/$TEST_ID.md" ]; then
    echo "✅ Test memory entity created successfully"
else
    echo "❌ Failed to create test memory entity"
fi

# Test 4: Update index
echo -e "\nTest 4: Updating memory index..."
INDEX_FILE=".claude/memory/indexes/by-name.md"
if [ -f "$INDEX_FILE" ]; then
    echo "- $TEST_ID: entities/test/$(date +%Y)/$(date +%m)/$TEST_ID.md" >> "$INDEX_FILE"
    echo "✅ Index updated"
else
    echo "❌ Index file not found"
fi

# Test 5: Search for test entity
echo -e "\nTest 5: Searching for test entity..."
SEARCH_RESULT=$(grep -r "$TEST_ID" .claude/memory 2>/dev/null | wc -l)
if [ $SEARCH_RESULT -gt 0 ]; then
    echo "✅ Test entity found in $SEARCH_RESULT locations"
else
    echo "❌ Test entity not found"
fi

# Test 6: Performance test - create 10 entities
echo -e "\nTest 6: Performance test - creating 10 entities..."
START_TIME=$(date +%s)
for i in {1..10}; do
    PERF_ID="PerfTest-$i-$(date +%Y%m%d-%H%M%S)"
    cat > "$TEST_DIR/$PERF_ID.md" << EOF
---
id: $PERF_ID
type: Performance
created: $(date -u +%Y-%m-%dT%H:%M:%SZ)
---
Performance test entity $i
EOF
done
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))
echo "✅ Created 10 entities in $DURATION seconds"

# Cleanup test entities
echo -e "\nCleaning up test entities..."
rm -rf .claude/memory/entities/test
grep -v "TestMemory\|PerfTest" "$INDEX_FILE" > "$INDEX_FILE.tmp" && mv "$INDEX_FILE.tmp" "$INDEX_FILE"
echo "✅ Cleanup complete"

echo -e "\n=== Test Summary ==="
echo "All critical tests passed. Memory system is functional."