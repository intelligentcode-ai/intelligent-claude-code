#!/bin/bash
# Validate Stateless Execution
# Tests that no cache operations exist in the behavioral system

echo "=== Stateless Execution Validation ==="
echo "Date: $(date)"
echo ""

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track results
PASSED=0
FAILED=0

# Function to check for cache references
check_cache_references() {
    local file=$1
    local description=$2
    
    echo -n "Checking $description... "
    
    # Search for cache-related terms
    if grep -i -E "(cache|cached|caching|\.cache\.|cache\.|clearCache|cache\.clear|cache\.store|cache\.get|cache\.expired|ttl|TTL)" "$file" > /dev/null 2>&1; then
        echo -e "${RED}FAIL${NC} - Cache references found"
        echo "  Found in: $file"
        grep -n -i -E "(cache|cached|caching|\.cache\.|cache\.|clearCache|cache\.clear|cache\.store|cache\.get|cache\.expired|ttl|TTL)" "$file" | head -5
        ((FAILED++))
    else
        echo -e "${GREEN}PASS${NC} - No cache references"
        ((PASSED++))
    fi
}

# Function to verify stateless patterns
check_stateless_patterns() {
    local file=$1
    local pattern=$2
    local description=$3
    
    echo -n "Verifying $description... "
    
    if grep -E "$pattern" "$file" > /dev/null 2>&1; then
        echo -e "${GREEN}PASS${NC} - Stateless pattern found"
        ((PASSED++))
    else
        echo -e "${YELLOW}WARNING${NC} - Expected pattern not found"
    fi
}

echo "=== Phase 1: Cache Reference Check ==="
echo ""

# Check each behavioral file
check_cache_references "src/behaviors/config-loader.md" "config-loader.md"
check_cache_references "src/behaviors/role-activation-system.md" "role-activation-system.md"
check_cache_references "src/behaviors/pm-command-system.md" "pm-command-system.md"
check_cache_references "src/behaviors/lean-workflow-executor.md" "lean-workflow-executor.md"
check_cache_references "src/behaviors/autonomy-controller.md" "autonomy-controller.md"

echo ""
echo "=== Phase 2: Stateless Pattern Verification ==="
echo ""

# Verify stateless patterns
check_stateless_patterns "src/behaviors/config-loader.md" "// STATELESS: Load configuration fresh each time" "stateless config loading"
check_stateless_patterns "src/behaviors/config-loader.md" "// No caching - ensures configuration is always current" "no caching comment"
check_stateless_patterns "src/behaviors/role-activation-system.md" "// Load from memory \\(stateless execution\\)" "memory-based state"
check_stateless_patterns "src/behaviors/role-activation-system.md" "persistToMemory\\(state\\)" "memory persistence"

echo ""
echo "=== Phase 3: Removed Functions Check ==="
echo ""

# Check for removed cache-related functions
echo -n "Checking for removed cache.clear() calls... "
if grep -r "cache\.clear" src/behaviors/ > /dev/null 2>&1; then
    echo -e "${RED}FAIL${NC} - cache.clear() still present"
    grep -r -n "cache\.clear" src/behaviors/ | head -5
    ((FAILED++))
else
    echo -e "${GREEN}PASS${NC} - No cache.clear() calls found"
    ((PASSED++))
fi

echo -n "Checking for removed TTL references... "
if grep -r -i "ttl\s*:" src/behaviors/ > /dev/null 2>&1; then
    echo -e "${RED}FAIL${NC} - TTL references still present"
    grep -r -n -i "ttl\s*:" src/behaviors/ | head -5
    ((FAILED++))
else
    echo -e "${GREEN}PASS${NC} - No TTL references found"
    ((PASSED++))
fi

echo ""
echo "=== Phase 4: Integration Test ==="
echo ""

# Test that key functions work without cache
echo -n "Testing SettingsAPI.getSettings() pattern... "
if grep -A5 "FUNCTION getSettings" src/behaviors/config-loader.md | grep -E "(loader\.loadConfiguration|fresh each time)" > /dev/null 2>&1; then
    echo -e "${GREEN}PASS${NC} - Direct configuration loading"
    ((PASSED++))
else
    echo -e "${RED}FAIL${NC} - Unexpected getSettings implementation"
    ((FAILED++))
fi

echo -n "Testing role state management... "
if grep -A5 "FUNCTION loadRoleState" src/behaviors/role-activation-system.md | grep "retrieveFromMemory" > /dev/null 2>&1; then
    echo -e "${GREEN}PASS${NC} - Memory-based state loading"
    ((PASSED++))
else
    echo -e "${RED}FAIL${NC} - Unexpected state loading"
    ((FAILED++))
fi

echo ""
echo "=== Test Summary ==="
echo ""
echo -e "Tests Passed: ${GREEN}$PASSED${NC}"
echo -e "Tests Failed: ${RED}$FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ All tests passed! System is fully stateless.${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Cache references may still exist.${NC}"
    exit 1
fi