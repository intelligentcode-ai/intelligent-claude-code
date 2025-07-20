# Validate Assignments

Validate role assignments against capability requirements using $ARGUMENTS.

## Behavior
**MANDATORY VALIDATION** - Core quality gate that ensures >70% capability
match between assigned roles and task requirements. BLOCKS execution if
validation fails. Part of the validation command chain enforcement.

## Arguments
**Format:** "Task: task_content | Role: @ProposedRole | WorkType: detected_work_type"
**Example:** "Task: Implement OAuth behavioral patterns in AI system | Role: @AI-Engineer | WorkType: AI-agentic"

## Role Restrictions
**ALL ROLES** can invoke this command as it's a validation gate, but PM and
Specialist Architects must approve results for specialist work assignments.

## Core Actions
- Parse task content and proposed role from $ARGUMENTS
- Calculate capability match percentage using role definitions:
  - Extract required capabilities from task content
  - Compare against role's capability set
  - Calculate match percentage (capabilities_overlap / total_required)
- Validate capability match threshold:
  - **PASS**: ≥70% capability match
  - **FAIL**: <70% capability match
- Check blocked role assignments:
  - AI-agentic work → BLOCKS @Developer (requires @AI-Engineer)
  - Infrastructure work → BLOCKS @Developer (requires @DevOps-Engineer)
  - Security work → BLOCKS non-security roles
  - Frontend work → BLOCKS @Database-Engineer
- Generate validation result with specific feedback

## Validation Results

### PASS Result
- Capability match ≥70%
- Role not blocked for work type
- Specialist approval obtained (if required)
- **Action**: Proceed with assignment

### FAIL Result
- Capability match <70% → **Suggest creating specialist**
- Role blocked for work type → **Suggest appropriate role**
- Missing specialist approval → **Require PM + Architect triage**
- **Action**: HALT assignment until resolved

## Capability Matching Logic

### Work Type Detection
- **AI-agentic**: behavioral, modes/, agentic, AI, ML keywords
- **Infrastructure**: deploy, docker, kubernetes, infrastructure keywords
- **Security**: security, auth, encrypt, OAuth keywords
- **Database**: database, SQL, schema, migration keywords
- **Frontend**: UI, UX, React, CSS, frontend keywords

### Role Capabilities
- **@Developer**: programming, API, testing, general implementation
- **@AI-Engineer**: ML, AI, automation, behavioral systems
- **@DevOps-Engineer**: CI/CD, deployment, infrastructure, automation
- **@Database-Engineer**: SQL, data, queries, schema design
- **@Security-Engineer**: security, encryption, auth, compliance
- **@Web-Designer**: UI, frontend, CSS, user experience

## Integration
- **MANDATORY** for all task assignments in workflow templates
- Used in outer-workflow.yaml validation chain
- Triggered before task creation and role activation
- Blocks execution until validation passes
- Creates specialists when capability match <70%
- Enforces specialist architect approval requirements

## Quality Standards
- Zero tolerance for capability mismatch <70%
- No generic roles for specialist work
- Evidence-based capability assessment
- Clear feedback for failed validations
- Automatic specialist creation suggestions