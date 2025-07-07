# Configuration Template

## Team Configuration

### Team Maturity Level
```
team_maturity_level: "L3"  # L1 (user approval), L2 (arch approval), L3 (full autonomy)
```

### PM Activation
```
pm_always_active: true  # Auto-delegate vs @PM commands only
```

### Memory Integration
```
memory_integration: true  # Persistent knowledge vs session-only
```

## Git Configuration

### Core Settings
```
git_privacy: true                # Strip AI mentions from commits/MRs
branch_protection: true          # Force feature branches
default_branch: "main"           # main, master, develop
require_pr_for_main: true        # Force PR/MR workflow
branch_prefixes: ["feature/", "bugfix/", "hotfix/", "release/"]
```

### Validation
```
validate_commits: true           # Credential/path scanning
scan_credentials: true           # Pre-commit secret detection
validate_file_paths: true        # Path existence validation
```

## Process Configuration

### Review Requirements
```
requirements_engineer_mandatory: true   # @Requirements-Engineer required
architecture_review_required: true      # @Architect review for system changes
enforce_peer_review: true               # Domain expert review mandatory
code_review_required: true              # Pre-merge code review
```

### Quality Standards
```
testing_required: true                  # Tests required for implementations
documentation_required: true            # Docs required for all changes
auto_documentation: true                # Auto-update docs
enforce_quality_gates: true             # Sequential quality enforcement
```

## Development Configuration

### File & Testing
```
auto_cleanup: true                      # Auto-cleanup temp files
file_management_strict: true            # Edit over create policy
testing_approach: "comprehensive"       # minimal, standard, comprehensive
```

## Security Configuration

### Security Controls
```
security_validation: true               # Security validation for all changes
compliance_checking: true               # Policy compliance checking
vulnerability_scanning: true            # Pre-deployment vuln scanning
```

## Tools Configuration

### Tool Integration
```
context7_enabled: true                  # Context7 for docs retrieval
sequential_thinking: true               # Complex problem reasoning
mcp_tools_enabled: true                 # MCP tool integration
```

## Subagent Configuration

### Delegation Settings
```
subagent_model: "sonnet"                # sonnet, opus, auto
subagent_threshold: 3                   # TodoWrite items before auto-delegation (1-10)
max_concurrent_subagents: 5             # Concurrency limit (1-20)
auto_delegation: true                   # Auto-delegate at threshold
subagent_coordination: true             # Coordinate subagent activities
```

## Project Configuration

### Repository & Automation
```
repository_type: "git"                  # git, none
release_automation: true                # Auto version bump/changelog
deployment_automation: true             # Auto deployment after validation
tech_stack: ["markdown", "bash", "git"] # Primary technologies
```

## Enforcement Configuration

### Violation Control
```
blocking_enabled: true                  # Hard blocking vs warnings
violation_logging: true                 # Log violations for analysis
auto_correction: true                   # Auto-correct violations
```

## Validation & Loading

### Required Fields
- team_maturity_level, pm_always_active, git_privacy, branch_protection, enforce_peer_review

### Loading Protocol
1. READ .claude/config.md → PARSE settings → VALIDATE schema → CACHE → APPLY → HALT on failure
2. Error handling: Missing=defaults+warn, Invalid=HALT+details, Parse=HALT+location
3. Runtime: @PM config reload for live updates with re-validation

### Universal Enforcement
**All Roles Must:** READ CONFIG FIRST → VALIDATE → APPLY → HALT on violations → REPORT compliance

**Blocking Conditions:** Missing config, invalid values, schema failures, runtime violations, Git policy violations

**Mechanism:** Hard block + specific error + remediation guidance + retry after fix + violation logging