# Configuration Template

## Core Settings

```yaml
# Team autonomy
team_maturity_level: "L3"  # L1=manual, L2=architect approval, L3=autonomous
pm_always_active: true
memory_integration: true

# L3 continuous mode (when team_maturity_level: "L3")
l3_continuous_settings:
  max_parallel_tasks: 5
  task_timeout_ms: 300000
  error_threshold: 5
  stop_conditions:
    business_impact: true
    security_violations: true
    data_loss_risks: true
  auto_recovery:
    test_failures: true
    lint_errors: true
    type_errors: true
```

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

# Subagents
subagent_model: "sonnet"
subagent_threshold: 3
max_concurrent_subagents: 5
auto_delegation: true

# Project
repository_type: "git"
release_automation: true

# Enforcement
blocking_enabled: false
violation_logging: true
auto_correction: true
```

## Loading

**Protocol:** READ config.md → PARSE → VALIDATE → CACHE → APPLY

**Enforcement:** Respects `blocking_enabled` setting
- false: Team collaboration mode (defaults + warnings)
- true: Hard blocking mode (halt on errors)