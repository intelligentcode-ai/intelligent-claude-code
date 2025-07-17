# Story Assignment Template
# Stories are created by PM/Architect/RE/User and contain multiple tasks

story:
  id: "STORY-XXX"
  title: "Story Title"
  type: "feature|enhancement|refactor"
  epic: "EPIC-XXX"
  created: "YYYY-MM-DD HH:MM:SS"
  created_by: "@PM|@Architect|@Requirements-Engineer|User"
  assigned_to: "@PM"  # PM manages story execution
  phase: "INIT|PLAN|EXECUTE|ACCEPTANCE|DONE"
  
problem_description: |
  # Clear description of what needs to be implemented or changed
  # Include context, current state, desired state
  
acceptance_criteria:
  - id: "AC-001"
    description: "Specific measurable criteria for story completion"
    validation_method: "automated_test|manual_review|integration_test"
    status: "pending|passed|failed"
    
definition_of_done:
  - "All tasks completed"
  - "Integration successful"
  - "Tests passing"
  - "Documentation updated"
  - "Knowledge captured"
  
# Embedded config drives task creation and behavior
embedded_config:
  # ALL settings from config.md embedded during PLAN phase
  autonomy_level: "L3"
  git_privacy: true
  blocking_enabled: false
  security_validation: true
  testing_approach: "comprehensive"
  # ... all other settings
  
# Tasks are created during PLAN phase
tasks:
  - id: "TASK-001"
    title: "Research existing patterns"
    type: "research|knowledge_loading"
    assigned_to: "@Specialist-Role"
    estimated_hours: X
    status: "planned|in_progress|completed|blocked"
    
  - id: "TASK-002"
    title: "Implement core functionality"
    type: "implementation"
    assigned_to: "@Developer-Specialist"
    estimated_hours: X
    status: "planned"
    dependencies: ["TASK-001"]
    
  - id: "TASK-003"
    title: "Peer review implementation"
    type: "peer_review"
    assigned_to: "@Domain-Expert"
    estimated_hours: X
    status: "planned"
    dependencies: ["TASK-002"]
    
  - id: "TASK-004"
    title: "Write tests"
    type: "testing"
    assigned_to: "@QA-Specialist"
    estimated_hours: X
    status: "planned"
    
  - id: "TASK-005"
    title: "Update documentation"
    type: "documentation"
    assigned_to: "@Technical-Writer"
    estimated_hours: X
    status: "planned"
    
  - id: "TASK-006"
    title: "Git operations and deployment"
    type: "git_operations|deployment"
    assigned_to: "@DevOps-Specialist"
    estimated_hours: X
    status: "planned"
    
  - id: "TASK-007"
    title: "Capture knowledge and learnings"
    type: "knowledge_creation"
    assigned_to: "@Lead-Developer"
    estimated_hours: X
    status: "planned"
    
workflow:
  current_phase: "PLAN"
  task_sequencing: "parallel|sequential|mixed"
  critical_path: ["TASK-001", "TASK-002", "TASK-003"]
  
git_operations:
  branch: "feature/STORY-XXX-description"
  commit_prefix: "story-xxx:"
  merge_strategy: "squash"
  
integration_hooks:
  jira:
    story_id: "PROJ-XXX"
  ci_cd:
    pipeline: "story-validation"
    
# Scoring integration
scoring:
  story_completion: "+X.X P"
  quality_delivery: "+X.X Q"
  learning_capture: "+X.X P/Q"