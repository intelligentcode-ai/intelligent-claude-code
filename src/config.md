# Configuration Template

## Core Settings

**Team Autonomy:**
- team_maturity_level: "L3" (L1=manual, L2=architect approval, L3=autonomous)
- pm_always_active: true
- memory_integration: true

**L3 Continuous Mode Settings:**
- max_parallel_tasks: 5
- task_timeout_ms: 300000
- error_threshold: 5
- stop_conditions: business_impact, security_violations, data_loss_risks
- auto_recovery: test_failures, lint_errors, type_errors

# Git settings
git_privacy: true
branch_protection: true
default_branch: "main"
require_pr_for_main: true
validate_commits: true

# Process requirements
enforce_peer_review: true
testing_required: true
documentation_required: true

# Development
auto_cleanup: true
file_management_strict: true
testing_approach: "comprehensive"

# Security
security_validation: true
compliance_checking: true

# Tools
context7_enabled: true
sequential_thinking: true
mcp_tools_enabled: true

# Logging
logging:
  agent_marker_log_level: "INFO"  # ERROR, WARN, INFO, DEBUG

# Subagents
subagent_model: "sonnet"
subagent_threshold: 3
max_concurrent_subagents: 5
auto_delegation: true

# Project
repository_type: "git"
release_automation: true

**Enforcement:**
- blocking_enabled: false
- violation_logging: true
- auto_correction: true

## Loading

**Protocol:** READ config.md (or .claude/config.md if configured) → PARSE → VALIDATE → CACHE → APPLY

**Enforcement:** Respects `blocking_enabled` setting
- false: Team collaboration mode (defaults + warnings)
- true: Hard blocking mode (halt on errors)