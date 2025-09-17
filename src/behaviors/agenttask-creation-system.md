# AgentTask Creation System

All AgentTask and work item creation via main agent with template compliance and placeholder resolution.

## Imports
@./shared-patterns/template-enforcement.md
@./shared-patterns/template-loading.md
@./shared-patterns/memory-operations.md
@./shared-patterns/context-validation.md
@./shared-patterns/behavioral-decision-matrix.md
@./shared-patterns/best-practices-integration.md

## Automatic Generation

Real-time work detection and instant AgentTask creation:
- Work intent triggers immediate AgentTask generation
- Pattern recognition distinguishes work vs information requests
- Complexity scoring auto-selects optimal template
- Full project context gathered and embedded automatically
- All placeholders resolved, no runtime dependencies

Detection patterns:
- Implementation: implement, create, build, develop, code, program, write
- Modification: fix, update, modify, change, refactor, optimize, enhance
- @Role Work: @Developer implement auth, @AI-Engineer optimize behavior
- Operations: deploy, configure CI/CD, setup monitoring, provision resources

Non-triggers:
- Query: show, display, read, list, check, analyze, examine, explain
- Status: what's the status, current progress, ongoing work
- Planning: should we, what if, how about, what's the best approach
- @Role Consultations: @Role what would you recommend

## Core Rules

Main agent only:
- All work item creation happens in main agent context
- Template resolution with full context
- Configuration hierarchy access
- Complete project context gathering
- Agents cannot create work items due to isolated context

Template requirements:
- AgentTasks limited to nano/tiny templates only
- Work ≥6 points becomes STORY/BUG first
- nano-agenttask-template.yaml (0-2 points): Simple changes
- tiny-agenttask-template.yaml (3-5 points): Single-file work
- Blocked: medium/large/mega templates

Placeholder resolution:
- All placeholders resolved at generation time
- No runtime config lookups
- Configuration values embedded in AgentTask
- Self-contained execution context

## Creation Process

Automatic generation pipeline:
1. Duplicate check: Scan existing AgentTasks for similar work
2. Detection: Real-time parsing with pattern recognition
3. Intent classification: Work vs information classification
4. Context assembly: Complete project context loading
5. Memory integration: Auto-search memory for applicable patterns
6. Best-practices integration: Auto-search for relevant standards
7. Sequential thinking: Apply structured analysis with project context
8. Complexity calculation: Enhanced scoring algorithm
9. Breakdown enforcement: If ≥6 points, create STORY/BUG first
10. Template selection: Nano/tiny templates only
11. Template loading: Complete template structure loaded
12. Configuration resolution: Full config hierarchy with actual values
13. Placeholder elimination: Replace all placeholders with actual values
14. Context embedding: Complete project context with memory patterns
15. Quality validation: Zero placeholders, complete sections verified

## Deduplication Logic

Check for existing AgentTasks before creating new ones:

Deduplication process:
1. Directory scan: Search agenttasks/ready/ and agenttasks/completed/
2. Similarity analysis: Compare new work against existing descriptions
3. Scoring algorithm: Calculate similarity percentage using weighted factors
4. Threshold decision: ≥70% similarity triggers UPDATE instead of CREATE
5. Update-existing pattern: Enhance existing AgentTask with new requirements
6. User notification: Inform of existing work reuse

Similarity scoring factors:
- Work description match (40%)
- Technical scope match (30%)
- Context alignment (20%)
- Parent reference match (10%)

## Memory-First Integration

All AgentTask generation implements memory-first approach:

Memory search process:
1. Parse work intent: Extract keywords, work type, technical domains
2. Search memory directories: Scan memory/[topic]/ using SearchMemory pattern
3. Pattern scoring: Score by keyword match + recency + context relevance
4. Pattern selection: Choose top 2-3 patterns (max 1000 tokens)
5. Direct embedding: Embed patterns in AgentTask context

Memory integration rules:
- Search memory before AgentTask generation
- Embed patterns directly in AgentTask context
- No runtime lookups
- Self-contained AgentTasks with embedded patterns

## Context Integration

AgentTasks automatically include:
- Project context: System nature, project root, constraints from CLAUDE.md
- Configuration values: All relevant settings from config hierarchy
- Critical files: Relevant files with actual content samples
- Memory patterns: Applicable learnings and successful patterns
- Best-practices: Relevant standards, guidelines, quality patterns
- User requirements: Clear requirements with success criteria
- Role assignment: Appropriate specialist roles based on work type

## Size Enforcement

Breakdown enforcement:
- If complexity ≥6 points, create STORY/BUG first
- Break into nano/tiny AgentTasks ≤5 points each
- Block direct AgentTask creation ≥6 points
- Block medium/large/mega templates
- Check template compliance, zero placeholders, complete context

## Creation vs Execution

Creation (Main Agent):
- Full configuration access
- Template hierarchy access
- Memory search capabilities
- SearchMemory pattern implementation
- Complete project context
- Placeholder resolution with embedded memory patterns

Execution (Subagent):
- AgentTask implementation work
- Role-based task delegation
- Code changes and file operations
- Testing and validation
- Git operations within AgentTask scope

## Error Handling & Recovery

Automatic recovery patterns:
- Work detection failure → Re-analyze with enhanced pattern matching
- Context incomplete → Auto-gather missing project context
- Memory search failure → Re-run SearchMemory with expanded keywords
- Pattern embedding missing → Force memory search and embed patterns
- Duplicate check missing → Force directory scan and similarity analysis
- Wrong template → Recalculate complexity, auto-select correct template
- Size violations → Create STORY/BUG for ≥6 points, break into nano/tiny
- Format violations → Auto-apply naming standards

Blocking patterns:
- Subagent AgentTask creation → "Work items must be created by main agent"
- Manual AgentTask without templates → "Template required for creation"
- Unresolved placeholders → "All placeholders must be resolved"
- Runtime config dependencies → "All config must be embedded"
- Memory search skipped → "Memory search required before generation"
- Direct AgentTask ≥6 points → "Work ≥6 points must become STORY/BUG first"

---
*AgentTask and work item creation system*