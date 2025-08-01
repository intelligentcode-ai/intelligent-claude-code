# Workflow Examples

**Last Updated:** 2025-01-19  
**Purpose:** Concrete examples of workflow usage in intelligent-claude-code

## Example 1: Creating a New Authentication Feature

### Step 1: Epic Creation (Outer Workflow)

**Assignment File:** `epics/EPIC-003-authentication/epic.yaml`

```yaml
epic:
  id: EPIC-003
  title: "User Authentication System"
  priority: P1
  status: PLANNED
  
embedded_config:
  autonomy_level: "L2"
  default_reviewer: "@Security-Engineer"
```

### Step 2: Story Creation (Outer Workflow - Phase 3)

**Command:** `/icc-create-story "OAuth Login Implementation | Epic: EPIC-003 | Priority: P1"`

**Workflow Activation:**
1. **Knowledge Retrieval**
   ```
   Searching memory: "OAuth implementation patterns"
   Found: JWT token best practices from Project-X
   ```

2. **Story Creation**
   ```yaml
   story:
     id: STORY-042
     title: "OAuth Login Implementation"
     epic: EPIC-003
     priority: P1  # Inherited from epic
     type: NEW_FEATURE
   ```

### Step 3: Task Decomposition (Outer Workflow - Phase 4)

**Validation Chain Execution:**
```bash
# 1. Work type detection
icc:detect-work-type("OAuth login")
→ Result: "authentication" (security domain)

# 2. Architect triage
icc:require-triage(@PM, @Security-Architect)
→ Both roles review and approve

# 3. Task creation with validation
tasks:
  - "[Backend-Developer] Implement OAuth provider integration"
  - "[Database-Engineer] Design secure token storage"
  - "[Security-Engineer] Security review of auth flow"
  - "[Frontend-Developer] Create login UI components"
  - "[QA-Engineer] Write authentication tests"

# 4. Capability validation
icc:validate-assignments(each_task, assigned_role)
→ All matches >70%

# 5. Final approval
icc:require-approval(@PM, @Security-Architect)
→ Approved for execution
```

### Step 4: Task Execution (Inner Workflow)

**Task:** `[Database-Engineer] Design secure token storage`

**Phase 1: Knowledge Retrieval**
```bash
Memory search: "secure token storage patterns"
Found patterns:
- Encrypted token columns
- Separate refresh token table
- Token expiration indexing
```

**Phase 2: Task Planning**
```markdown
## Subtasks:
1. Create token table schema
2. Add encryption functions
3. Create performance indexes
4. Write migration scripts
5. Create unit tests
```

**Phase 3: Execution**
```sql
-- Applying retrieved pattern
CREATE TABLE oauth_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  access_token_encrypted TEXT NOT NULL,
  refresh_token_hash TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_user_tokens (user_id),
  INDEX idx_token_expiry (expires_at)
);
```

**Phase 4: Peer Review**
```yaml
Reviewer: @Database-Architect  # Domain expert, not generic
Review focus:
  - Encryption approach
  - Index performance
  - Security considerations
Result: Approved with minor suggestions
```

**Phase 5: Git Operations**
```bash
git add migrations/001_oauth_tokens.sql
git commit -m "TASK-003: Design secure token storage schema"
git push origin feature/STORY-042-oauth-login
```

## Example 2: Fixing a Production Bug

### Bug Creation (Outer Workflow)

**Assignment File:** `epics/EPIC-003-authentication/bugs/BUG-089/bug.yaml`

```yaml
bug:
  id: BUG-089
  title: "Users logged out after 5 minutes"
  severity: HIGH
  priority: P1  # High severity → P1 priority
  
embedded_config:
  autonomy_level: "L3"  # Autonomous fix
  blocking_enabled: false
```

### Task Decomposition with L3 Mode

**Automatic Workflow Execution:**
```yaml
# Knowledge retrieval (automatic)
Search: "session timeout issues"
Found: "Token refresh logic patterns"

# Task creation (no approval stops in L3)
tasks:
  - "[Backend-Developer] Fix token refresh logic"
  - "[QA-Engineer] Add timeout regression tests"
  - "[DevOps-Engineer] Deploy hotfix to production"
```

### Parallel Task Execution (L3 Feature)

**Simultaneous Execution:**
```bash
# Backend and QA tasks run in parallel
Task 1: Fixing refresh logic
Task 2: Writing tests
Status: Both executing simultaneously

# Non-blocking review
Review comments → Create follow-up task
Continue execution → No stops
```

## Example 3: Complex Refactoring

### Story with Multiple Work Types

**Story:** "Refactor Authentication to Microservice"

**Workflow Handling Multiple Domains:**

```yaml
# Phase 3: Task Decomposition
# Multiple work types detected

tasks:
  # Architecture work
  - "[System-Architect] Design microservice boundaries"
    work_type: architecture
    architect: @System-Architect
    
  # AI/Behavioral work  
  - "[AI-Engineer] Update behavioral auth patterns"
    work_type: ai_agentic
    architect: @AI-Architect
    
  # Infrastructure work
  - "[DevOps-Engineer] Create Kubernetes deployment"
    work_type: infrastructure
    architect: @System-Architect
    
  # Security work
  - "[Security-Engineer] Security architecture review"
    work_type: security
    architect: @Security-Architect
```

**Validation per Work Type:**
```bash
# Each domain gets appropriate architect
Architecture tasks → @System-Architect review
AI behavioral tasks → @AI-Architect review
Infrastructure → @System-Architect review
Security → @Security-Architect review
```

## Example 4: Learning Application

### First Error Scenario

**Task:** "Implement rate limiting"

**Error Occurs:**
```yaml
Error: "Forgot to add Redis connection pooling"
First occurrence: true

# Learning capture (automatic)
Learning entity created:
  id: "Learning-redis-pooling-2025-01-19"
  lesson: "Always use connection pooling for Redis"
  prevention: "Add pooling check to review checklist"
  
Penalty: 0 (first error forgiven)
```

### Applying Previous Learning

**Next Task:** "Implement caching layer"

**Knowledge Retrieval Phase:**
```yaml
Memory search: "Redis patterns"
Found: "Learning-redis-pooling-2025-01-19"

# In implementation
Comment: "Based on previous learning about Redis pooling..."
Code: Implements connection pooling from start

# Automatic bonus
Score update: +0.5P (learning application detected)
```

## Example 5: Priority-Driven Execution

### Mixed Priority Story

**Story Tasks:**
```yaml
tasks:
  - id: TASK-001
    title: "[Security-Engineer] Fix auth bypass"
    priority: P0  # Security escalation
    
  - id: TASK-002  
    title: "[Developer] Add login analytics"
    priority: P2  # Inherited from story
    
  - id: TASK-003
    title: "[Database-Engineer] Optimize token queries"
    priority: P2
    type: parallel  # Can run with others
    
  - id: TASK-004
    title: "[DevOps-Engineer] Update auth service"
    priority: P2
    type: blocking  # Must complete first
```

**Execution Order:**
```bash
1. TASK-001 (P0 - highest priority)
2. TASK-004 (P2 blocking - blocks others)
3. TASK-002 & TASK-003 (P2 parallel - run together)
```

**Priority Bonuses Applied:**
```yaml
TASK-001 complete: +2.0P bonus (P0)
TASK-002 complete: +1.0P bonus (P2)
TASK-003 complete: +1.0P bonus (P2)
TASK-004 complete: +1.0P bonus (P2)
```

## Workflow Patterns

### Pattern 1: Knowledge-First Development
```bash
Every phase starts with knowledge retrieval:
Planning → Search similar epics/stories
Execution → Search task patterns
Review → Search review criteria
```

### Pattern 2: Validation Gates
```bash
No task assignment without:
1. Work type detection
2. Architect triage
3. Capability validation (>70%)
4. Dual approval
```

### Pattern 3: Learning Synthesis
```bash
Inner workflow → Task learnings
Outer workflow → Synthesize across tasks
Result → Architecture insights, process improvements
```

### Pattern 4: Git Flow Integration
```bash
Outer workflow → Feature branch per story/bug
Inner workflow → Commits per task
Merge → When all tasks complete
```

### Pattern 5: Configuration Flexibility
```yaml
embedded_config:
  autonomy_level: "L3"  # Changes workflow behavior
  blocking_enabled: false  # Non-blocking reviews
  git_privacy: true  # Strips AI mentions
```

## Summary

These examples demonstrate:

1. **Structured Flexibility** - Workflows provide structure without rigidity
2. **Validation Integration** - Mandatory checks prevent common errors  
3. **Learning Application** - Past knowledge drives current execution
4. **Priority Management** - Clear execution order with bonuses
5. **Configuration Control** - Embedded configs customize behavior

The workflows act as **intelligent guides** that adapt to project needs while maintaining quality standards through validation gates and peer reviews.