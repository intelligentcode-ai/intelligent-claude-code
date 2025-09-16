#!/bin/bash
# Live test of hook enforcement

echo "Testing Hook Enforcement System"
echo "================================"

# Test 1: Writing to stories (should ALLOW)
echo -e "\n1. Writing to /stories/ (should allow):"
echo '{"tool":"Write","parameters":{"file_path":"/stories/STORY-001.md","content":"test"},"context":{"scope":"main"}}' | node src/hooks/pre-tool-use.js
echo "Exit code: $? (0=allowed, 2=blocked)"

# Test 2: Writing to memory (should ALLOW but currently doesn't)
echo -e "\n2. Writing to /memory/ (should allow):"
echo '{"tool":"Write","parameters":{"file_path":"/memory/test.md","content":"test"},"context":{"scope":"main"}}' | node src/hooks/pre-tool-use.js
echo "Exit code: $? (0=allowed, 2=blocked)"

# Test 3: Writing to src (should BLOCK)
echo -e "\n3. Writing to /src/ (should block):"
echo '{"tool":"Write","parameters":{"file_path":"/src/app.js","content":"test"},"context":{"scope":"main"}}' | node src/hooks/pre-tool-use.js 2>&1
echo "Exit code: $? (0=allowed, 2=blocked)"

# Test 4: Edit operation (should BLOCK)
echo -e "\n4. Edit operation (should block):"
echo '{"tool":"Edit","parameters":{"file_path":"/src/app.js","old_string":"test","new_string":"test2"},"context":{"scope":"main"}}' | node src/hooks/pre-tool-use.js 2>&1
echo "Exit code: $? (0=allowed, 2=blocked)"

# Test 5: Read operation (should ALLOW)
echo -e "\n5. Read operation (should allow):"
echo '{"tool":"Read","parameters":{"file_path":"/src/app.js"},"context":{"scope":"main"}}' | node src/hooks/pre-tool-use.js
echo "Exit code: $? (0=allowed, 2=blocked)"

# Test 6: PRB Write (should ALLOW)
echo -e "\n6. Writing PRB file (should allow):"
echo '{"tool":"Write","parameters":{"file_path":"/prbs/ready/test.prb.yaml","content":"test"},"context":{"scope":"main"}}' | node src/hooks/pre-tool-use.js
echo "Exit code: $? (0=allowed, 2=blocked)"