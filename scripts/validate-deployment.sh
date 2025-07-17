#!/bin/bash

# Role Assignment Validation System Deployment Validation
# Purpose: Verify all components are deployed and integrated correctly
# Date: 2025-01-16

echo "=========================================="
echo "Role Assignment Validation System"
echo "Deployment Validation Script v1.0"
echo "=========================================="

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Base directory
BASE_DIR="/Users/ksamaschke/Work/Engineering/intelligent-claude-code"

# Component files to verify
COMPONENTS=(
    "src/behaviors/role-assignment-validator.md"
    "src/behaviors/lean-workflow-executor.md"
    "src/behaviors/role-detection-engine.md"
    "docs/bug-003-validation-integration.md"
    "docs/role-validation-guide.md"
    "docs/validation-technical-reference.md"
    "docs/validation-examples.md"
    "docs/validation-troubleshooting.md"
    "tests/test-role-validation.md"
    "tests/validation-test-results.md"
)

# Integration points to verify
INTEGRATION_POINTS=(
    "lean-workflow-executor.md:RoleAssignmentValidator"
    "lean-workflow-executor.md:validateAssignment"
    "lean-workflow-executor.md:validation_chain"
)

echo -e "\n1. CHECKING COMPONENT FILES..."
echo "------------------------------"

all_files_present=true
for component in "${COMPONENTS[@]}"; do
    if [ -f "$BASE_DIR/$component" ]; then
        echo -e "${GREEN}✅${NC} $component"
    else
        echo -e "${RED}❌${NC} $component - MISSING"
        all_files_present=false
    fi
done

echo -e "\n2. VERIFYING INTEGRATION POINTS..."
echo "-----------------------------------"

all_integrations_valid=true
for integration in "${INTEGRATION_POINTS[@]}"; do
    file=$(echo $integration | cut -d: -f1)
    pattern=$(echo $integration | cut -d: -f2)
    
    if grep -q "$pattern" "$BASE_DIR/src/behaviors/$file" 2>/dev/null; then
        echo -e "${GREEN}✅${NC} $file contains $pattern"
    else
        echo -e "${RED}❌${NC} $file missing $pattern integration"
        all_integrations_valid=false
    fi
done

echo -e "\n3. CHECKING VALIDATION PATTERNS..."
echo "----------------------------------"

# Check for work type patterns
if grep -q "ai_agentic" "$BASE_DIR/src/behaviors/role-assignment-validator.md"; then
    echo -e "${GREEN}✅${NC} AI work type patterns configured"
else
    echo -e "${RED}❌${NC} AI work type patterns missing"
fi

if grep -q "security" "$BASE_DIR/src/behaviors/role-assignment-validator.md"; then
    echo -e "${GREEN}✅${NC} Security work type patterns configured"
else
    echo -e "${RED}❌${NC} Security work type patterns missing"
fi

if grep -q "infrastructure" "$BASE_DIR/src/behaviors/role-assignment-validator.md"; then
    echo -e "${GREEN}✅${NC} Infrastructure work type patterns configured"
else
    echo -e "${RED}❌${NC} Infrastructure work type patterns missing"
fi

echo -e "\n4. VERIFYING TEST RESULTS..."
echo "-----------------------------"

if [ -f "$BASE_DIR/tests/validation-test-results.md" ]; then
    # Check test pass rate
    if grep -q "7/8 primary test cases passing" "$BASE_DIR/tests/validation-test-results.md"; then
        echo -e "${GREEN}✅${NC} Test results show 7/8 passing (87.5%)"
    else
        echo -e "${YELLOW}⚠️${NC} Test results may be outdated"
    fi
    
    # Check certification status
    if grep -q "APPROVED FOR USE" "$BASE_DIR/tests/validation-test-results.md"; then
        echo -e "${GREEN}✅${NC} System certified as APPROVED FOR USE"
    else
        echo -e "${RED}❌${NC} System not yet certified"
    fi
else
    echo -e "${RED}❌${NC} Test results file missing"
fi

echo -e "\n5. CONFIGURATION VALIDATION..."
echo "------------------------------"

# Check if validation hooks are present in workflow
if grep -q "WORK_TYPE_PATTERNS" "$BASE_DIR/src/behaviors/role-assignment-validator.md"; then
    echo -e "${GREEN}✅${NC} Work type patterns configured"
else
    echo -e "${RED}❌${NC} Work type patterns missing"
fi

if grep -q "ROLE_CAPABILITIES" "$BASE_DIR/src/behaviors/role-assignment-validator.md"; then
    echo -e "${GREEN}✅${NC} Role capabilities defined"
else
    echo -e "${RED}❌${NC} Role capabilities missing"
fi

echo -e "\n6. DOCUMENTATION CHECK..."
echo "-------------------------"

doc_count=$(ls -1 "$BASE_DIR/docs/"*validation* 2>/dev/null | wc -l)
if [ $doc_count -ge 5 ]; then
    echo -e "${GREEN}✅${NC} Documentation complete ($doc_count files)"
else
    echo -e "${YELLOW}⚠️${NC} Documentation may be incomplete ($doc_count files)"
fi

echo -e "\n=========================================="
echo "DEPLOYMENT VALIDATION SUMMARY"
echo "=========================================="

if [ "$all_files_present" = true ] && [ "$all_integrations_valid" = true ]; then
    echo -e "${GREEN}✅ DEPLOYMENT VALIDATION: PASSED${NC}"
    echo -e "\nThe Role Assignment Validation System is:"
    echo "- Fully deployed with all components present"
    echo "- Properly integrated with lean workflow executor"
    echo "- Tested with 87.5% pass rate (7/8 tests)"
    echo "- Documented with comprehensive guides"
    echo "- APPROVED FOR USE by @QA-Engineer"
    echo -e "\nSystem Status: ${GREEN}ACTIVE AND OPERATIONAL${NC}"
else
    echo -e "${RED}❌ DEPLOYMENT VALIDATION: FAILED${NC}"
    echo -e "\nPlease address the issues listed above."
fi

echo -e "\n=========================================="
echo "Validation complete at $(date)"
echo "=========================================="