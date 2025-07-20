# Require Triage

Enforce mandatory PM + Specialist Architect approval for task assignments using $ARGUMENTS.

## Behavior
**BLOCKING VALIDATION** - Ensures all task assignments receive proper
governance through joint PM and Specialist Architect review. Core component
of the validation command chain that prevents unauthorized work assignments.

## Arguments
**Format:** "WorkType: detected_work_type | Task: task_summary | ProposedRole: @Role"
**Example:** "WorkType: AI-agentic | Task: Design behavioral pattern system | ProposedRole: @AI-Engineer"

## Role Restrictions
- **@PM**: Required participant - must provide approval
- **Specialist Architects**: Required participant based on work type
- **Other Roles**: Can invoke but cannot provide approval

## Core Actions
- Parse work type and assignment details from $ARGUMENTS
- Identify required specialist architect based on work type:
  - AI-agentic work → @AI-Architect
  - Infrastructure work → @System-Architect
  - Security work → @Security-Architect
  - Database work → @Data-Architect
  - Frontend work → @Frontend-Architect
- Verify both PM and appropriate architect approval
- Check approval status and block if incomplete
- Log triage decision for audit trail

## Specialist Architect Requirements

### Work Type Mapping
- **AI-agentic**: @AI-Architect (behavioral systems, ML architecture)
- **Infrastructure**: @System-Architect (deployment, scaling, infrastructure)
- **Security**: @Security-Architect (auth systems, security design)
- **Database**: @Data-Architect (schema design, data modeling)
- **Frontend**: @Frontend-Architect (UI architecture, user experience)
- **Backend**: @System-Architect (API design, service architecture)

### Approval Requirements
- **Joint Approval**: Both PM and Specialist Architect must agree
- **Capability Validation**: Architect validates technical appropriateness
- **Resource Planning**: PM validates capacity and priority
- **Quality Standards**: Both validate against team standards

## Triage Process

### Step 1: Work Type Analysis
- Analyze task content for work type classification
- Identify required specialist architect
- Validate proposed role appropriateness

### Step 2: Joint Review
- PM reviews: priority, capacity, business alignment
- Architect reviews: technical approach, role suitability, quality standards
- Both approve or provide feedback for improvement

### Step 3: Decision Recording
- Record approval/rejection with rationale
- Store decision in memory for future reference
- Provide clear next steps if rejected

## Validation Outcomes

### APPROVED
- Both PM and Specialist Architect provide approval
- Assignment proceeds to next validation step
- Decision logged for audit trail

### REJECTED
- Missing PM approval → **Escalate to PM for review**
- Missing Architect approval → **Technical review required**
- Role mismatch → **Suggest appropriate specialist**
- **Action**: HALT assignment until approvals obtained

## Integration
- **MANDATORY** step in validation command chain
- Triggered after work type detection
- Precedes capability validation
- Blocks task creation without dual approval
- Integrates with role assignment validator
- Records decisions in learning system

## Quality Standards
- Zero unauthorized specialist assignments
- Clear rationale for all decisions
- Evidence-based approval process
- Audit trail for all triage decisions
- Fast resolution for standard assignments