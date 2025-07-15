# Configuration Template

## Team Configuration

### Team Maturity Level (Autonomy Configuration)
```
team_maturity_level: "L3"  # Autonomy level for execution
```

#### Autonomy Levels Explained:
- **L1 (Manual)**: User approval required for all actions
  - Every task requires explicit user confirmation
  - Sequential execution only
  - Full user control over progression
  
- **L2 (Architect)**: Architect approval for technical decisions
  - User approval for business decisions
  - Architect approval for technical choices
  - Semi-autonomous operation
  
- **L3 (Autonomous)**: Continuous execution with minimal stops
  - Only stops for critical decisions (business impact, security, data loss)
  - Parallel task execution (up to 5 simultaneous)
  - Automatic phase transitions and work discovery
  - 72% faster execution, 94% fewer interruptions
  - See docs/L3-AUTONOMY-GUIDE.md for details

#### L3-Specific Settings
```
# Only applies when team_maturity_level: "L3"
l3_continuous_settings:
  max_parallel_tasks: 5              # Maximum simultaneous task execution
  task_timeout_ms: 300000            # 5 minute timeout per task
  error_threshold: 5                 # Max errors before stopping
  progress_report_interval: 60000    # Progress summary every minute
  
  stop_conditions:
    business_impact: true            # Stop for pricing/customer decisions
    security_violations: true        # Stop for credential exposure
    data_loss_risks: true           # Stop for destructive operations
    critical_quality_failures: true  # Stop after auto-fix attempts fail
    
  auto_recovery:
    test_failures: true             # Auto-fix test failures
    lint_errors: true               # Auto-format code
    type_errors: true               # Fix type annotations
    import_errors: true             # Add missing imports
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

#### L3 Mode Behavior:
In L3 autonomy mode, delegation happens automatically:
- Tasks are queued based on priority (P0→P1→P2→P3)
- Multiple roles work in parallel without blocking
- Dependencies are resolved automatically
- Work discovery finds new tasks proactively

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
blocking_enabled: false                 # Team collaboration vs hard blocking
violation_logging: true                 # Log violations for analysis
auto_correction: true                   # Auto-correct violations with team support
```

## Validation & Loading

### Required Fields
- team_maturity_level, pm_always_active, git_privacy, branch_protection, enforce_peer_review

### Loading Protocol
1. READ .claude/config.md → PARSE settings → VALIDATE schema → CACHE → APPLY → HALT on failure
2. Error handling: Missing=defaults+warn, Invalid=HALT+details, Parse=HALT+location
3. Runtime: @PM config reload for live updates with re-validation

### Universal Enforcement - Settings-Driven Mode
**All Roles Must:** READ CONFIG FIRST → VALIDATE → APPLY → RESPECT blocking_enabled setting → REPORT compliance

**Team Collaboration Conditions (blocking_enabled=false):** Missing config → defaults+warn+continue, invalid values → notify+support+continue, schema failures → notify+guidance+continue, runtime violations → team intervention+continue, Git policy violations → peer support+continue

**Hard Blocking Conditions (blocking_enabled=true):** Missing config → halt, invalid values → halt, schema failures → halt, runtime violations → halt, Git policy violations → halt

**Mechanism:** Settings-driven enforcement respects blocking_enabled configuration with team collaboration as default mode