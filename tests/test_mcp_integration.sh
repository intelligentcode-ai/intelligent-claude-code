#!/bin/bash

# Comprehensive MCP Integration Test Suite
# Tests all aspects of the MCP installation system including environment loading,
# variable substitution, JSON validation, and idempotency

set -e  # Exit on any error

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test configuration
TEST_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$TEST_DIR")"
TEST_TARGET_DIR="$PROJECT_ROOT/test-mcp-integration"
TEST_ENV_FILE="$TEST_DIR/test.env"
TEST_MCP_CONFIG="$TEST_DIR/test-mcp.json"
CLAUDE_SETTINGS="$HOME/.claude.json"
BACKUP_SETTINGS="$CLAUDE_SETTINGS.backup.$(date +%s)"

# Test result tracking
TESTS_PASSED=0
TESTS_FAILED=0
FAILED_TESTS=()

# Helper functions
print_header() {
    echo -e "\n${BLUE}=== $1 ===${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
    ((TESTS_PASSED++))
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
    ((TESTS_FAILED++))
    FAILED_TESTS+=("$1")
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Setup test environment
setup_tests() {
    print_header "Setting up test environment"
    
    # Clean up any previous test directory
    if [ -d "$TEST_TARGET_DIR" ]; then
        rm -rf "$TEST_TARGET_DIR"
        print_info "Cleaned up previous test directory"
    fi
    
    # Create test directory
    mkdir -p "$TEST_TARGET_DIR"
    print_info "Created test directory: $TEST_TARGET_DIR"
    
    # Backup existing Claude settings if they exist
    if [ -f "$CLAUDE_SETTINGS" ]; then
        cp "$CLAUDE_SETTINGS" "$BACKUP_SETTINGS"
        print_info "Backed up existing Claude settings to: $BACKUP_SETTINGS"
    fi
}

# Create test environment file
create_test_env() {
    print_header "Creating test environment file"
    
    cat > "$TEST_ENV_FILE" << 'EOF'
# Test environment file for MCP integration testing
GITHUB_TOKEN=ghp_test_token_1234567890abcdef
OPENAI_API_KEY=sk-test-openai-key-abcdefghijklmnopqrstuvwxyz
DATABASE_URL=postgresql://user:pass@localhost:5432/testdb
MCP_SERVER_PORT=3001
DEBUG_MODE=true
MCP_LOG_LEVEL=debug
EOF
    
    print_info "Created test .env file with 6 variables"
    print_success "Test environment file created"
}

# Create test MCP configuration with variable placeholders
create_test_mcp_config() {
    print_header "Creating test MCP configuration"
    
    cat > "$TEST_MCP_CONFIG" << 'EOF'
{
  "mcpServers": {
    "github-integration": {
      "command": "node",
      "args": ["./dist/index.js"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}",
        "DEBUG": "${DEBUG_MODE}"
      }
    },
    "openai-assistant": {
      "command": "python",
      "args": ["-m", "openai_mcp", "--api-key", "${OPENAI_API_KEY}"],
      "env": {
        "OPENAI_API_KEY": "${OPENAI_API_KEY}",
        "LOG_LEVEL": "${MCP_LOG_LEVEL}"
      }
    },
    "database-connector": {
      "command": "npx",
      "args": ["database-mcp", "--url", "${DATABASE_URL}", "--port", "${MCP_SERVER_PORT}"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}",
        "PORT": "${MCP_SERVER_PORT}",
        "NODE_ENV": "test"
      }
    }
  }
}
EOF
    
    print_info "Created test MCP configuration with 3 servers and variable placeholders"
    print_success "Test MCP configuration created"
}

# Run the actual MCP installation
run_mcp_installation() {
    print_header "Running MCP installation"
    
    print_info "Installing with environment file: $TEST_ENV_FILE"
    print_info "Installing with MCP config: $TEST_MCP_CONFIG"
    print_info "Target directory: $TEST_TARGET_DIR"
    
    # Run the installation
    cd "$PROJECT_ROOT"
    if make install TARGET_PATH="$TEST_TARGET_DIR" MCP_CONFIG="$TEST_MCP_CONFIG" ENV_FILE="$TEST_ENV_FILE" 2>&1; then
        print_success "MCP installation completed without errors"
    else
        print_error "MCP installation failed"
        return 1
    fi
}

# Validate JSON structure and syntax
validate_json_output() {
    print_header "Validating JSON output"
    
    if [ ! -f "$CLAUDE_SETTINGS" ]; then
        print_error "Claude settings file not found: $CLAUDE_SETTINGS"
        return 1
    fi
    
    # Test JSON validity
    if jq empty "$CLAUDE_SETTINGS" 2>/dev/null; then
        print_success "JSON file is valid"
    else
        print_error "JSON file is invalid or malformed"
        return 1
    fi
    
    # Check if mcpServers section exists
    if jq -e '.mcpServers' "$CLAUDE_SETTINGS" >/dev/null; then
        print_success "mcpServers section exists in JSON"
    else
        print_error "mcpServers section missing from JSON"
        return 1
    fi
    
    # Count MCP servers
    local server_count=$(jq '.mcpServers | length' "$CLAUDE_SETTINGS")
    if [ "$server_count" -eq 3 ]; then
        print_success "Correct number of MCP servers found: $server_count"
    else
        print_error "Expected 3 MCP servers, found: $server_count"
        return 1
    fi
}

# Test environment variable resolution
test_variable_resolution() {
    print_header "Testing environment variable resolution"
    
    # Check if variables were resolved (no ${} patterns should remain)
    local placeholder_count=$(jq -r '. | tostring' "$CLAUDE_SETTINGS" | grep -c '\${[^}]*}' || true)
    if [ "$placeholder_count" -eq 0 ]; then
        print_success "No unresolved variable placeholders found"
    else
        print_error "Found $placeholder_count unresolved placeholders"
        echo "Remaining placeholders:"
        jq -r '. | tostring' "$CLAUDE_SETTINGS" | grep -o '\${[^}]*}' || true
        return 1
    fi
    
    # Test specific variable resolution
    local github_token=$(jq -r '.mcpServers["github-integration"].env.GITHUB_TOKEN' "$CLAUDE_SETTINGS")
    if [ "$github_token" = "ghp_test_token_1234567890abcdef" ]; then
        print_success "GITHUB_TOKEN resolved correctly"
    else
        print_error "GITHUB_TOKEN not resolved correctly: $github_token"
        return 1
    fi
    
    local openai_key=$(jq -r '.mcpServers["openai-assistant"].env.OPENAI_API_KEY' "$CLAUDE_SETTINGS")
    if [ "$openai_key" = "sk-test-openai-key-abcdefghijklmnopqrstuvwxyz" ]; then
        print_success "OPENAI_API_KEY resolved correctly"
    else
        print_error "OPENAI_API_KEY not resolved correctly: $openai_key"
        return 1
    fi
    
    # Test argument resolution
    local db_url_arg=$(jq -r '.mcpServers["database-connector"].args[2]' "$CLAUDE_SETTINGS")
    if [ "$db_url_arg" = "postgresql://user:pass@localhost:5432/testdb" ]; then
        print_success "DATABASE_URL argument resolved correctly"
    else
        print_error "DATABASE_URL argument not resolved correctly: $db_url_arg"
        return 1
    fi
}

# Test file path correctness (should be ~/.claude.json, not settings.json)
test_file_path() {
    print_header "Testing file path correctness"
    
    local expected_path="$HOME/.claude.json"
    if [ -f "$expected_path" ]; then
        print_success "Configuration written to correct path: $expected_path"
    else
        print_error "Configuration not found at expected path: $expected_path"
        return 1
    fi
    
    # Check that it's not in the wrong location
    if [ -f "$HOME/settings.json" ]; then
        print_error "Configuration incorrectly written to: $HOME/settings.json"
        return 1
    else
        print_success "No incorrect settings.json file found"
    fi
}

# Test idempotency (running twice should produce same result)
test_idempotency() {
    print_header "Testing idempotency"
    
    # Get checksum of first installation
    local first_checksum=$(md5sum "$CLAUDE_SETTINGS" | cut -d' ' -f1)
    print_info "First installation checksum: $first_checksum"
    
    # Run installation again
    cd "$PROJECT_ROOT"
    if make install TARGET_PATH="$TEST_TARGET_DIR" MCP_CONFIG="$TEST_MCP_CONFIG" ENV_FILE="$TEST_ENV_FILE" 2>&1; then
        print_info "Second installation completed"
    else
        print_error "Second installation failed"
        return 1
    fi
    
    # Get checksum of second installation
    local second_checksum=$(md5sum "$CLAUDE_SETTINGS" | cut -d' ' -f1)
    print_info "Second installation checksum: $second_checksum"
    
    if [ "$first_checksum" = "$second_checksum" ]; then
        print_success "Idempotency test passed - identical results"
    else
        print_error "Idempotency test failed - results differ"
        return 1
    fi
}

# Test duplicate detection
test_duplicate_detection() {
    print_header "Testing duplicate detection"
    
    # Count occurrences of each server name
    local github_count=$(jq '[.mcpServers | keys[] | select(. == "github-integration")] | length' "$CLAUDE_SETTINGS")
    local openai_count=$(jq '[.mcpServers | keys[] | select(. == "openai-assistant")] | length' "$CLAUDE_SETTINGS")
    local db_count=$(jq '[.mcpServers | keys[] | select(. == "database-connector")] | length' "$CLAUDE_SETTINGS")
    
    if [ "$github_count" -eq 1 ] && [ "$openai_count" -eq 1 ] && [ "$db_count" -eq 1 ]; then
        print_success "No duplicate servers found"
    else
        print_error "Duplicate servers detected: github=$github_count, openai=$openai_count, db=$db_count"
        return 1
    fi
}

# Display actual test results
show_test_results() {
    print_header "Showing actual test results"
    
    print_info "Final Claude settings content:"
    if [ -f "$CLAUDE_SETTINGS" ]; then
        echo "--- ~/.claude.json ---"
        jq . "$CLAUDE_SETTINGS"
        echo "--- End of ~/.claude.json ---"
        print_success "Configuration file contents displayed"
    else
        print_error "No configuration file to display"
    fi
    
    print_info "Environment variables that were processed:"
    cat "$TEST_ENV_FILE"
    
    print_info "MCP configuration template that was used:"
    jq . "$TEST_MCP_CONFIG"
}

# Clean up test environment
cleanup_tests() {
    print_header "Cleaning up test environment"
    
    # Remove test directory
    if [ -d "$TEST_TARGET_DIR" ]; then
        rm -rf "$TEST_TARGET_DIR"
        print_info "Removed test directory"
    fi
    
    # Remove test files
    [ -f "$TEST_ENV_FILE" ] && rm "$TEST_ENV_FILE" && print_info "Removed test .env file"
    [ -f "$TEST_MCP_CONFIG" ] && rm "$TEST_MCP_CONFIG" && print_info "Removed test MCP config"
    
    # Restore original Claude settings if backup exists
    if [ -f "$BACKUP_SETTINGS" ]; then
        mv "$BACKUP_SETTINGS" "$CLAUDE_SETTINGS"
        print_info "Restored original Claude settings"
    elif [ -f "$CLAUDE_SETTINGS" ]; then
        # Remove test settings if no backup existed
        rm "$CLAUDE_SETTINGS"
        print_info "Removed test Claude settings"
    fi
    
    print_success "Test cleanup completed"
}

# Print final test summary
print_summary() {
    print_header "Test Results Summary"
    
    local total_tests=$((TESTS_PASSED + TESTS_FAILED))
    echo -e "${BLUE}Total tests run: $total_tests${NC}"
    echo -e "${GREEN}Tests passed: $TESTS_PASSED${NC}"
    echo -e "${RED}Tests failed: $TESTS_FAILED${NC}"
    
    if [ $TESTS_FAILED -gt 0 ]; then
        echo -e "\n${RED}Failed tests:${NC}"
        for test in "${FAILED_TESTS[@]}"; do
            echo -e "${RED}  - $test${NC}"
        done
        echo -e "\n${RED}❌ OVERALL RESULT: FAILED${NC}"
        return 1
    else
        echo -e "\n${GREEN}🎉 OVERALL RESULT: ALL TESTS PASSED${NC}"
        return 0
    fi
}

# Main test execution
main() {
    print_header "MCP Integration Comprehensive Test Suite"
    
    # Setup
    setup_tests
    create_test_env
    create_test_mcp_config
    
    # Run tests
    run_mcp_installation
    validate_json_output
    test_variable_resolution
    test_file_path
    test_idempotency
    test_duplicate_detection
    
    # Show results
    show_test_results
    
    # Cleanup and summary
    cleanup_tests
    print_summary
}

# Run main function and exit with proper code
if main; then
    exit 0
else
    exit 1
fi