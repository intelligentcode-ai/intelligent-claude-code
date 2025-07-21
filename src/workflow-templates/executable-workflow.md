# Executable AI Workflow

**THIS IS THE ONLY WORKFLOW. DELETE ALL OTHERS.**

## CRITICAL: How @Role Invocations Work

```
FUNDAMENTAL RULE: EVERY @Role mention = SUBAGENT CALL via Task tool

WHEN YOU SEE: @PM, @Developer, @AI-Architect, etc.
YOU MUST: Create a subagent using Task tool
THE SUBAGENT: Executes that role's work independently

EXAMPLE:
Text: "@Developer implement auth"
ACTION: Task.create(role="Developer", work="implement auth")
RESULT: Subagent executes as Developer role
```

## Outer Workflow (Bug/Story Level)

```
1. ACTIVATE @PM [SUBAGENT CALL]
   ACTION: Task.create(role="PM", work="plan STORY-XXX")
   SUBAGENT EXECUTES:
   - Search memory: "similar STORY-XXX"
   - Define what needs to be done
   - Return plan to parent

2. TRIAGE WITH SPECIALIST [MULTIPLE SUBAGENT CALLS]
   ACTION: Task.create(role="PM", work="identify specialist needed")
   PM SUBAGENT: "I need @AI-Architect to review this"
   
   ACTION: Task.create(role="AI-Architect", work="review and approve approach")
   AI-ARCHITECT SUBAGENT: Reviews and approves approach
   
3. CREATE TASKS [SUBAGENT CALL]
   ACTION: Task.create(role="PM", work="create tasks for STORY-XXX")
   PM SUBAGENT creates tasks:
   - "[Developer] Implement user authentication" (if >70% match)
   - "[QA-Engineer] Write auth tests" (if >70% match)
   - "[Security-Engineer] Review auth security" (if >70% match)
   - "[GraphQL-Developer] Implement GraphQL API" (if <70% match, create dynamic specialist)
   
4. CREATE BRANCH [SUBAGENT CALL]
   ACTION: Task.create(role="Developer", work="create feature branch")
   DEVELOPER SUBAGENT: git checkout -b feature/STORY-123
   
5. EXECUTE EACH TASK [MULTIPLE SUBAGENT CALLS]
   FOR each task:
     ACTION: Task.create(role="[AssignedRole]", work="execute TASK-XXX")
     → SUBAGENT EXECUTES INNER WORKFLOW
   
6. AFTER ALL TASKS COMPLETE [SUBAGENT CALL]
   ACTION: Task.create(role="Developer", work="create merge request")
   DEVELOPER SUBAGENT: Create MR if requested
   
7. STORY RETROSPECTIVE [SUBAGENT CALL]
   ACTION: Task.create(role="PM", work="synthesize learnings")
   PM SUBAGENT: 
   - Synthesize learnings from all tasks
   - Store story-level learning: "Learning-STORY-123-2025-01-21"
   - What: Overall approach and outcomes
   - Why: Design decisions and trade-offs
   - How: Patterns that emerged across tasks
   - Future: Recommendations for similar work
```

## Inner Workflow (Task Level) - EXECUTED BY SUBAGENT

```
[THIS ENTIRE WORKFLOW IS EXECUTED BY A SUBAGENT CREATED IN OUTER WORKFLOW]

1. ROLE ALREADY ACTIVE IN SUBAGENT
   Task: "[Developer] Implement auth"
   SUBAGENT IS: Developer (or dynamic specialist like @OAuth-Developer)

2. SEARCH MEMORY [SUBAGENT ACTION]
   SUBAGENT: Search "authentication patterns"
   
3. PLAN APPROACH [SUBAGENT ACTION]
   SUBAGENT DECIDES:
   - Simple task: Just do it
   - Complex task: Create subtasks
   
4. EXECUTE WORK [SUBAGENT ACTION]
   SUBAGENT: Execute the implementation
   
5. PEER REVIEW [NESTED SUBAGENT CALL]
   FIND SME: Match reviewer expertise to work domain (>70% capability)
   SUBAGENT: "Need security domain expert review"
   
   ACTION: Task.create(role="Security-Engineer", work="review auth implementation")
   SECURITY SUBAGENT: Reviews work with domain expertise
   
   IF REVIEW FAILS:
     - Minor issue: SUBAGENT goes to step 4 (fix code)
     - Major issue: SUBAGENT goes to step 3 (replan)
     - Can't fix: SUBAGENT creates follow-up task
   
6. GIT OPERATIONS [SUBAGENT ACTION]
   SUBAGENT LOADS SETTINGS: Check git_privacy, branch_protection, etc.
   SUBAGENT EXECUTES: 
   - git add .
   - IF git_privacy: Strip AI mentions from commit
   - git commit -m "TASK-001: Implement auth module"
   - IF branch_protection: Ensure on feature branch
   - git push origin feature/STORY-123
   
7. COMPLETE TASK [SUBAGENT ACTION]
   SUBAGENT: Mark task complete
   SUBAGENT: Update status to COMPLETED
   
8. RETROSPECTIVE & LEARN [SUBAGENT ACTION]
   SUBAGENT: Capture what worked/didn't work
   SUBAGENT: Store learning entity: "Learning-auth-pattern-2025-01-21"
   - What: OAuth implementation approach
   - Why: Standard flow most compatible
   - How: Used library X with pattern Y
   - Prevention: Avoid custom OAuth flows
   
[SUBAGENT RETURNS RESULTS TO PARENT]
```

## When To Create Dynamic Specialists

```
TRIGGER: Need expertise < 70% match with existing roles
ACTION: Create specialist (new role type) AND USE IN SUBAGENT

EXAMPLE IN SUBAGENT CONTEXT:
Parent: Task.create(role="PM", work="plan GraphQL feature")
PM SUBAGENT: "Need GraphQL implementation"

Parent: Task.create(role="Architect", work="assess GraphQL expertise")
ARCHITECT SUBAGENT: "No existing role has >70% GraphQL expertise"

Parent: Creates @GraphQL-Developer specialist
Parent: Task.create(role="GraphQL-Developer", work="implement GraphQL API")
GRAPHQL SUBAGENT: Executes with specialized knowledge
```

## Understanding Key Concepts - CORRECTED

**SUBAGENTS** = THE CORE EXECUTION MODEL
- EVERY @Role mention creates a subagent via Task tool
- Subagents execute independently with role expertise
- Results returned to parent for coordination
- This is HOW THE ENTIRE SYSTEM WORKS

**DYNAMIC SPECIALISTS** = New role types created when < 70% match
- Example: @GraphQL-Developer, @Rust-Engineer, @Kubernetes-Specialist
- Created on demand when expertise needed
- USED IN SUBAGENTS just like core roles

**CRITICAL UNDERSTANDING**: 
- You DON'T "switch roles" - you CREATE SUBAGENTS
- Each @Role invocation = New subagent with that role's expertise
- Subagents can create other subagents (nested calls)
- This happens EXTENSIVELY throughout EVERY workflow

## Git Process (Settings-Aware)

```
LOAD GIT SETTINGS:
- git_privacy: Strip AI/Claude mentions if true
- branch_protection: Enforce feature branches if true
- default_branch: Use configured default (main/master/develop)
- require_pr_for_main: Block direct pushes if true

BRANCHES:
- main (protected per settings)
- feature/STORY-XXX (for stories)
- feature/BUG-XXX (for bugs)

COMMITS:
- One commit per task
- Format: "TASK-XXX: Clear description"
- IF git_privacy: Remove ALL AI mentions:
  * "AI-generated" → removed
  * "Claude helped" → removed
  * "🤖" → removed
  * Co-authored-by lines → removed

MERGE REQUEST:
- After all story/bug tasks complete
- Title: "STORY-XXX: Feature description"
- IF require_pr_for_main: Must create PR/MR
- Requires approval before merge
```

## Peer Review Requirements

```
SME SELECTION (MANDATORY):
- Security work → Security domain expert reviews
- Database work → Database domain expert reviews  
- AI/ML work → AI/ML domain expert reviews
- Frontend work → Frontend domain expert reviews
- Backend work → Backend domain expert reviews
- Infrastructure → Infrastructure domain expert reviews

CAPABILITY MATCHING:
- Reviewer must have >70% domain expertise
- No generic "code reviews" - must be domain-specific
- If no SME available, create specialist first
```

## When Peer Review Fails

```
MINOR ISSUES (typos, formatting):
1. SME provides specific feedback
2. Assigned specialist fixes in same task
3. Re-review by same SME
4. Continue workflow

MAJOR ISSUES (wrong approach):
1. SME explains domain-specific problem
2. Assigned specialist goes back to planning
3. May need architect consultation
4. Restart from new plan

BLOCKING ISSUES (can't proceed):
1. Create follow-up task
2. Mark current task as blocked
3. Continue with other tasks
4. Escalate to @PM if critical
```

## Priority Execution

```
ORDER: P0 → P1 → P2 → P3
WITHIN PRIORITY: blocking → critical_path → parallel → optional

PARALLEL EXECUTION:
- Up to 5 tasks simultaneously
- Only if no file conflicts
- Different roles can work in parallel
```

## L3 Autonomous Mode

```
IF autonomy_level == "L3":
  - Never ask permission
  - Auto-correct validation issues
  - Only stop for:
    * Business logic changes
    * Security violations
    * Data loss risk
  - Continue until all work complete
```

## Simple Rules - WITH SUBAGENTS

1. **EVERY @ROLE = SUBAGENT** - Task.create() for EVERY role mention
2. **OUTER CALLS INNER** - Parent creates subagents for tasks
3. **GIT PER TASK** - Subagent commits after each task
4. **DYNAMIC SPECIALIST IF <70%** - Create new role AND use in subagent
5. **REVIEW LOOPS IN SUBAGENT** - Subagent handles fix cycles
6. **PM COORDINATES VIA SUBAGENTS** - PM subagent orchestrates

**CORE TRUTH: This is a SUBAGENT SYSTEM. Every @Role = Task.create()**

## Learning Entity Structure

```
TASK LEARNING:
~/.claude/memory/entities/Learning/2025/01/Learning-auth-implementation-2025-01-21.md
{
  "id": "Learning-auth-implementation-2025-01-21",
  "type": "TaskLearning",
  "task": "TASK-001",
  "observations": [
    "OAuth library X worked better than Y",
    "Token refresh needs explicit handling",
    "Security review caught missing CSRF protection"
  ],
  "prevention": [
    "Always use established OAuth libraries",
    "Include CSRF tokens in auth flows",
    "Get security review before implementation"
  ]
}

STORY LEARNING:
~/.claude/memory/entities/Learning/2025/01/Learning-STORY-001-synthesis-2025-01-21.md
{
  "id": "Learning-STORY-001-synthesis-2025-01-21", 
  "type": "StoryLearning",
  "story": "STORY-001",
  "observations": [
    "OAuth pattern consistent across providers",
    "Security reviews prevented 3 vulnerabilities",
    "Parallel task execution saved 2 days"
  ],
  "recommendations": [
    "Start with security review for auth work",
    "Use parallel tasks for provider integrations",
    "Create reusable OAuth base class"
  ]
}
```

## Directory Structure

```
project-root/
├── .claude/
│   ├── PROJECT-CONTEXT.md    # Project overview, loaded on startup
│   ├── config.md             # Project settings
│   └── memory/               # Project-specific learnings
├── epics/
│   └── EPIC-001.yaml         # Epic definitions
├── stories/
│   └── STORY-001.yaml        # Story definitions  
├── bugs/
│   └── BUG-001.yaml          # Bug definitions
├── tasks/
│   ├── TASK-001.md           # Individual tasks
│   └── TASK-002.md
└── src/                      # Your actual code
```

## Epic Template (epics/EPIC-001.yaml)

```yaml
id: EPIC-001
title: User Authentication System
description: Complete auth system with OAuth, 2FA, and session management
priority: P1
owner: @PM
stories:
  - STORY-001
  - STORY-002
bugs:
  - BUG-045
acceptance_criteria:
  - Users can register and login
  - OAuth providers integrated
  - 2FA available for all users
```

## Story Template (stories/STORY-001.yaml)

```yaml
id: STORY-001
epic: EPIC-001
title: Implement OAuth Login
description: Add OAuth login with Google and GitHub
priority: P1
owner: @PM
tasks:
  - TASK-001
  - TASK-002
  - TASK-003
acceptance_criteria:
  - Google OAuth working
  - GitHub OAuth working
  - Token storage secure
embedded_config:
  autonomy_level: "L3"
  git_privacy: true
```

## Bug Template (bugs/BUG-001.yaml)

```yaml
id: BUG-001
epic: EPIC-001
title: Login Session Timeout Issue
description: Users get logged out after 5 minutes
priority: P0
severity: high
owner: @PM
tasks:
  - TASK-010
  - TASK-011
reproduction_steps:
  - Login to application
  - Wait 5 minutes
  - Try to access protected page
  - Get redirected to login
acceptance_criteria:
  - Sessions last 24 hours
  - Remember me works for 30 days
```

## Task Template (tasks/TASK-001.md)

```markdown
# [Developer] Implement Google OAuth

**ID:** TASK-001
**Story:** STORY-001
**Status:** PLANNED
**Assigned:** @Developer (or dynamic specialist if <70% match, e.g., @OAuth-Specialist)
**Priority:** P1

## Description
Implement Google OAuth login flow using standard OAuth2 protocol.

## Subtasks
- [ ] Register app with Google Console
- [ ] Implement OAuth callback handler
- [ ] Add Google login button to UI
- [ ] Store tokens securely
- [ ] Write integration tests

## Acceptance Criteria
- Users can click "Login with Google"
- OAuth flow completes successfully
- User profile data retrieved
- Session created in our system

## Technical Notes
- Use OAuth2 library
- Store refresh tokens encrypted
- Handle token expiration
```

## How AI Reads These Files - WITH SUBAGENTS

```bash
# On startup
1. Load PROJECT-CONTEXT.md
2. Check for active epics/stories/bugs
3. Find PLANNED or IN_PROGRESS tasks

# To start work
Parent: Task.create(role="PM", work="check what needs doing")
PM SUBAGENT: Read stories/*.yaml for PLANNED items
PM SUBAGENT: Read tasks/*.md for ready work
PM SUBAGENT: Returns list to parent

# To create new work
Parent: Task.create(role="PM", work="create story for OAuth feature")
PM SUBAGENT: Create stories/STORY-002.yaml
PM SUBAGENT: Create tasks/TASK-004.md through TASK-006.md
PM SUBAGENT: Returns created items to parent

# To track progress
Parent: Task.create(role="Developer", work="complete TASK-001")
DEVELOPER SUBAGENT: Edit tasks/TASK-001.md, change Status to COMPLETED
DEVELOPER SUBAGENT: Returns completion status to parent
```

## EXTENSIVE SUBAGENT EXAMPLE - Full Story Flow

```bash
# User says: "Implement OAuth login"

1. PARENT creates PM subagent:
   Task.create(role="PM", work="plan OAuth login story")

2. PM SUBAGENT executes:
   - Searches memory for OAuth patterns
   - Creates STORY-001.yaml
   - Identifies need for architect review
   - Returns: "Need @AI-Architect review"

3. PARENT creates Architect subagent:
   Task.create(role="AI-Architect", work="review OAuth approach")

4. ARCHITECT SUBAGENT executes:
   - Reviews OAuth requirements
   - Approves approach
   - Returns: "Approved with recommendations"

5. PARENT creates PM subagent again:
   Task.create(role="PM", work="create OAuth tasks")

6. PM SUBAGENT creates tasks:
   - TASK-001: [Developer] Implement OAuth flow
   - TASK-002: [Security-Engineer] Review OAuth security
   - TASK-003: [QA-Engineer] Test OAuth integration

7. PARENT creates Developer subagent:
   Task.create(role="Developer", work="execute TASK-001")

8. DEVELOPER SUBAGENT (executing inner workflow):
   - Searches memory for OAuth patterns
   - Implements OAuth flow
   - Needs review: Creates Security subagent
   
9. SECURITY SUBAGENT (nested):
   Task.create(role="Security-Engineer", work="review OAuth implementation")
   - Reviews code
   - Returns feedback to Developer subagent

10. DEVELOPER SUBAGENT continues:
    - Fixes issues
    - Commits code
    - Returns completion to parent

# THIS PATTERN CONTINUES FOR EVERY ROLE MENTION
```

## CRITICAL SUMMARY: IT'S ALL SUBAGENTS

**FUNDAMENTAL TRUTH**: This entire system runs on SUBAGENT CALLS via Task tool

**WHAT THIS MEANS**:
- You see "@PM" → You create Task.create(role="PM", work="...")
- You see "@Developer" → You create Task.create(role="Developer", work="...")
- You see "@GraphQL-Developer" → You create Task.create(role="GraphQL-Developer", work="...")
- EVERY. SINGLE. TIME.

**HOW IT WORKS**:
1. Parent orchestrates by creating subagents
2. Subagents execute with role expertise
3. Subagents can create other subagents (nested)
4. Results flow back up to parent
5. This happens HUNDREDS of times per story

**NOT ROLE SWITCHING**: 
- You don't "become" the PM
- You CREATE a PM subagent
- The subagent executes independently
- You coordinate the results

**THIS IS THE CORE ARCHITECTURE - SUBAGENTS ALL THE WAY DOWN**