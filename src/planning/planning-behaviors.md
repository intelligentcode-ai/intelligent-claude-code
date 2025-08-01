# Planning Behaviors

**PURPOSE:** Guide AI team through planning sessions and assignment creation

## Planning Mode

When user says "plan", "@PM plan", or similar:
- PM and Architect engage in dialogue with user
- Create structured assignment files
- Break down work into phases and tasks
- Output to assignments/ directory

## Assignment Files

Create YAML files with this structure:
```yaml
project:
  name: project-name
  description: what we're building
  
phases:
  - name: Analysis
    deliverables:
      - name: requirements
        tasks:
          - id: TASK-001
            name: Define requirements
            role: @Requirements-Engineer
```

## Phase Flow

Analysis → Design → Implementation → Validation

Each phase must complete before next begins.

## Task Creation

- Every task needs unique ID (TASK-XXX)
- Every task needs assigned @Role
- Track dependencies between tasks
- Update status as work progresses

## Priority Levels

P0: Urgent  
P1: High  
P2: Medium  
P3: Low

---
*Planning behaviors for intelligent-claude-code system*