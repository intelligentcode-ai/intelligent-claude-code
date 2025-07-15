# Config Processor for Planning Phase

**CORE:** Read config.md•Process ALL settings•Embed into assignment files•Self-contained tasks

## Overview

The config processor ensures ALL settings from config.md are read during PLAN/REFINE phase and properly embedded into assignment files, making tasks self-contained and configuration-driven.

## Config Processing Pipeline

### STEP 1: Read Configuration
```pseudocode
FUNCTION readProjectConfig():
    configPath = findConfigFile()  // .claude/config.md or src/config.md
    
    IF NOT exists(configPath):
        RETURN defaultConfig()  // Safe defaults
    
    config = parseMarkdown(configPath)
    validated = validateConfig(config)
    
    IF NOT validated.success:
        LOG warnings
        RETURN mergeWithDefaults(config)
    
    RETURN config
END FUNCTION
```

### STEP 2: Process Settings into Task Structure
```pseudocode
FUNCTION processConfigIntoTask(config, taskDescription):
    task = {
        // Core task info
        autonomy_level: config.team_maturity_level,
        blocking_mode: config.blocking_enabled,
        
        // Git operations from config
        git_operations: {
            privacy_mode: config.git_privacy,
            forbidden_terms: config.git_privacy ? ["Claude", "AI", "🤖", "anthropic"] : [],
            branch_protection: config.branch_protection,
            branch_prefixes: config.branch_prefixes,
            require_pr: config.require_pr_for_main,
            validation: {
                commits: config.validate_commits,
                credentials: config.scan_credentials,
                paths: config.validate_file_paths
            }
        },
        
        // Required subtasks based on config
        mandatory_subtasks: generateMandatorySubtasks(config),
        
        // Review requirements
        review_settings: {
            peer_review: config.enforce_peer_review,
            architecture_review: config.architecture_review_required,
            code_review: config.code_review_required,
            security_review: config.security_validation
        },
        
        // Quality gates
        quality_requirements: {
            testing: config.testing_required,
            documentation: config.documentation_required,
            auto_docs: config.auto_documentation,
            enforce_gates: config.enforce_quality_gates
        },
        
        // Tool settings
        tools: {
            context7: config.context7_enabled,
            sequential_thinking: config.sequential_thinking,
            mcp_tools: config.mcp_tools_enabled
        },
        
        // Violation handling
        violation_handling: {
            blocking: config.blocking_enabled,
            logging: config.violation_logging,
            auto_correct: config.auto_correction
        }
    }
    
    RETURN task
END FUNCTION
```

### STEP 3: Generate Mandatory Subtasks
```pseudocode
FUNCTION generateMandatorySubtasks(config):
    subtasks = []
    
    // Always required
    subtasks.append({
        id: "ST-ANALYSIS",
        title: "Analyze requirements and existing code",
        required_tools: config.sequential_thinking ? ["sequential_thinking"] : []
    })
    
    subtasks.append({
        id: "ST-IMPLEMENT",
        title: "Implement changes",
        validation: config.validate_commits
    })
    
    // Conditionally required based on config
    IF config.architecture_review_required:
        subtasks.append({
            id: "ST-ARCH-REVIEW",
            title: "Architecture review",
            assigned_to: "@Architect",
            blocking: config.blocking_enabled
        })
    
    IF config.enforce_peer_review:
        subtasks.append({
            id: "ST-PEER-REVIEW",
            title: "Peer review by domain expert",
            requires_specialist: true,
            blocking: config.blocking_enabled
        })
    
    IF config.testing_required:
        subtasks.append({
            id: "ST-TESTING",
            title: "Write and run tests",
            approach: config.testing_approach
        })
    
    IF config.documentation_required:
        subtasks.append({
            id: "ST-DOCS",
            title: "Update documentation",
            auto_generate: config.auto_documentation
        })
    
    IF config.security_validation:
        subtasks.append({
            id: "ST-SECURITY",
            title: "Security validation",
            assigned_to: "@Security-Engineer",
            scan_types: ["credentials", "vulnerabilities", "compliance"]
        })
    
    // Git operations always last
    subtasks.append({
        id: "ST-GIT",
        title: "Git operations and commit",
        privacy_mode: config.git_privacy,
        validation_required: config.validate_commits
    })
    
    RETURN subtasks
END FUNCTION
```

### STEP 4: Handle Review Findings Based on Config
```pseudocode
FUNCTION processReviewFindings(findings, config, taskId):
    actions = []
    
    FOR finding IN findings:
        IF finding.severity == "CRITICAL":
            IF config.blocking_enabled:
                actions.append({
                    type: "BLOCK",
                    action: "RETURN_TO_REFINE",
                    reason: finding.description
                })
            ELSE:
                actions.append({
                    type: "CREATE_TASK",
                    action: "NEW_CRITICAL_TASK",
                    task: createFollowUpTask(taskId, finding, "P0")
                })
        
        ELIF finding.severity == "ENHANCEMENT":
            actions.append({
                type: "CREATE_TASK",
                action: "NEW_ENHANCEMENT_TASK",
                task: createFollowUpTask(taskId, finding, "P2")
            })
        
        ELIF finding.severity == "MINOR":
            actions.append({
                type: "DOCUMENT",
                action: "ADD_TO_KNOWN_ISSUES",
                documentation: finding.description
            })
    
    RETURN actions
END FUNCTION
```

### STEP 5: Embed Everything into Assignment File
```pseudocode
FUNCTION createAssignmentFile(task, config, processedSettings):
    // Get current timestamp using bash date
    timestamp = executeCommand("date '+%Y-%m-%d %H:%M:%S'")
    
    assignment = {
        task: task,
        planning_timestamp: timestamp,
        
        // All processed config embedded
        embedded_config: {
            // Core settings
            autonomy_level: config.team_maturity_level,
            pm_always_active: config.pm_always_active,
            memory_integration: config.memory_integration,
            blocking_enabled: config.blocking_enabled,
            
            // Git settings
            git_privacy: config.git_privacy,
            branch_protection: config.branch_protection,
            default_branch: config.default_branch,
            require_pr_for_main: config.require_pr_for_main,
            branch_prefixes: config.branch_prefixes,
            
            // Process settings
            requirements_engineer_mandatory: config.requirements_engineer_mandatory,
            architecture_review_required: config.architecture_review_required,
            enforce_peer_review: config.enforce_peer_review,
            code_review_required: config.code_review_required,
            
            // Quality settings
            testing_required: config.testing_required,
            documentation_required: config.documentation_required,
            auto_documentation: config.auto_documentation,
            enforce_quality_gates: config.enforce_quality_gates,
            
            // Security settings
            security_validation: config.security_validation,
            compliance_checking: config.compliance_checking,
            vulnerability_scanning: config.vulnerability_scanning,
            
            // Tool settings
            context7_enabled: config.context7_enabled,
            sequential_thinking: config.sequential_thinking,
            mcp_tools_enabled: config.mcp_tools_enabled,
            
            // Violation handling
            violation_logging: config.violation_logging,
            auto_correction: config.auto_correction
        },
        
        // Workflow enforcement structure
        workflow: {
            review_findings: {
                if_blocking_false: {
                    action: "CREATE_FOLLOWUP_TASK",
                    template: "TASK-" + generateNextId() + "-fix-[finding]",
                    priority_mapping: {
                        critical: "P0",
                        enhancement: "P2",
                        minor: "P3"
                    }
                },
                if_blocking_true: {
                    action: "BLOCK_AND_RETURN",
                    message: "Review findings must be addressed before continuing"
                }
            },
            
            git_operations: {
                if_privacy_true: {
                    forbidden_terms: ["Claude", "AI", "anthropic", "🤖", "artificial intelligence"],
                    commit_filter: "sanitize_before_commit",
                    sanitization_command: "sed -E 's/(Claude|AI|anthropic|🤖|artificial intelligence)//gi'"
                },
                if_privacy_false: {
                    forbidden_terms: [],
                    commit_filter: "none"
                },
                validation: {
                    credentials: config.scan_credentials,
                    paths: config.validate_file_paths,
                    commits: config.validate_commits
                }
            },
            
            execution_rules: [
                "Read embedded_config, NOT config.md during execution",
                "Follow workflow section instructions explicitly",
                "No behavioral prompt interpretation needed",
                "All settings are pre-processed and embedded",
                "Use bash date for timestamps: date '+%Y-%m-%d %H:%M:%S'"
            ]
        },
        
        // Generated subtasks with config applied
        subtasks: processedSettings.mandatory_subtasks,
        
        // Execution instructions
        execution: {
            require_config_check: false,  // Everything already embedded!
            autonomy_level: config.team_maturity_level,
            tool_availability: processedSettings.tools,
            timestamp_command: "date '+%Y-%m-%d %H:%M:%S'"
        }
    }
    
    RETURN assignment
END FUNCTION
```

## Config Settings Impact

### Team Maturity Level
- **L1**: User approval required at each phase
- **L2**: Architect approval for key decisions
- **L3**: Full autonomy with exception handling

### Blocking Enabled
- **true**: Violations and findings HALT execution
- **false**: Create follow-up tasks and continue (team collaboration mode)

### Git Privacy
- **true**: Strip all AI/Claude mentions from commits
- **false**: Allow natural commit messages

### Review Requirements
Each enabled review type adds a mandatory subtask with appropriate specialist assignment

### Quality Gates
Each enabled gate adds validation steps that must pass before completion

## Integration with Planning Commands

### /plan-task Enhancement
```pseudocode
COMMAND /plan-task:
    // NEW: Read and process config first
    config = readProjectConfig()
    processedSettings = processConfigIntoTask(config, taskDescription)
    
    // Continue with normal planning but with config applied
    assignment = createAssignmentFile(task, config, processedSettings)
    
    // Assignment now contains ALL config settings
    RETURN assignment
```

## Benefits

1. **Configuration Respected**: All settings from config.md are honored
2. **Self-Contained Tasks**: Assignment files have everything needed
3. **No Runtime Lookups**: Execution phase doesn't need config.md
4. **Flexibility**: Different projects can have different settings
5. **Traceability**: Can see exactly what config was used for each task

## Example: Config Applied to Assignment

```yaml
# Task created with config.md settings applied
embedded_config:
  git_settings:
    privacy_mode: true
    forbidden_terms: ["Claude", "AI", "🤖"]
    branch_protection: true
  review_requirements:
    peer_review: true
    architecture_review: true
  violation_handling:
    blocking: false  # Team collaboration mode
    
subtasks:
  - id: "ST-001"
    title: "Analyze requirements"
    required_tools: ["sequential_thinking"]  # From config
    
  - id: "ST-004"
    title: "Architecture review"
    assigned_to: "@Architect"
    blocking: false  # From blocking_enabled=false
    
  - id: "ST-007"
    title: "Git operations"
    privacy_mode: true  # Will strip AI mentions
    forbidden_terms: ["Claude", "AI"]  # Enforced in commit
    
review_handling:
  critical_findings: "CREATE_FOLLOWUP"  # Because blocking_enabled=false
```