# AgentTask Auto-Trigger

Auto-detect work and generate AgentTask using templates with complete placeholder resolution.

## Imports
@./sequential-thinking.md
@./shared-patterns/behavioral-decision-matrix.md
@./shared-patterns/template-loading.md
@./shared-patterns/template-enforcement.md
@./shared-patterns/memory-operations.md
@./shared-patterns/context-validation.md
@./shared-patterns/workflow-resolution-patterns.md
@./shared-patterns/best-practices-integration.md
@./shared-patterns/best-practices-operations.md
@./naming-numbering-system.md

## Trigger Decision Rules

Follow behavioral-decision-matrix.md precedence:
1. @Role Direct Execution → Immediate AgentTask generation
2. Work→AgentTask Generation → Implementation intent triggers AgentTask
3. Simple Information Direct → Context score ≤8 allows direct response
4. Complex→AgentTask Analysis → Context score ≥9 requires structured analysis

## Detection Patterns

| Trigger | Pattern | Action |
|---------|---------|--------|
| AgentTask File | *.agenttask.yaml | Execute existing |
| Work Request | Implementation intent | Generate AgentTask |
| @Role | @Role mention | AgentTask + Subagent execution |
| Natural Language | "break down STORY-X" | Generate AgentTask |

## Complexity Scoring

Points calculation:
- Files: 1=1pt, 2-5=3pts, 6-20=5pts, 20+=10pts
- Lines: <10=1pt, <50=2pts, <200=4pts, 200+=8pts
- External APIs: 3pts each
- Database/Security: 4-5pts

Size enforcement:
| Score | Action |
|-------|--------|
| 0-2 | Create nano AgentTask directly |
| 3-5 | Create tiny AgentTask directly |
| 6+ | Create STORY/BUG → Break into nano/tiny AgentTasks ≤5 points |

Blocked templates: medium/large/mega AgentTask templates
Size rule: Work ≥6 points becomes STORY/BUG first

## Generation Flow

AgentTask generation steps:
1. Check existing AgentTasks for similar work (deduplication)
2. Detect work requirement
3. Search memory for patterns (memory-first approach)
4. Search best-practices for applicable patterns
5. Score complexity and enforce breakdown rule
6. Apply sequential analysis with project context
7. Break down if complexity ≥6 points → STORY/BUG creation
8. Load template from hierarchy (nano/tiny only)
9. Load configuration at generation time
10. Load workflow settings from CLAUDE.md
11. Resolve all placeholders with actual values
12. Embed complete context in AgentTask
13. Validate no placeholders remain
14. Generate compliant name and create AgentTask
15. Execute via subagent

## Workflow Placeholder Resolution

Resolve all workflow placeholders with actual workflow_settings from CLAUDE.md:

Process:
1. Load CLAUDE.md workflow_settings for determined AgentTask size
2. Map workflow placeholders to actual values from workflow_settings.[size]
3. Resolve PR creation sections when pr_required=true
4. Embed explicit git commands based on merge_strategy
5. Include complete workflow instructions in AgentTask

Workflow placeholders:
- `[WORKFLOW_VERSION_BUMP]` → workflow_settings.[size].version_bump
- `[WORKFLOW_VERSION_TYPE]` → workflow_settings.[size].version_type
- `[WORKFLOW_CHANGELOG_REQUIRED]` → workflow_settings.[size].changelog_required
- `[WORKFLOW_PR_REQUIRED]` → workflow_settings.[size].pr_required
- `[WORKFLOW_MERGE_STRATEGY]` → workflow_settings.[size].merge_strategy
- `[WORKFLOW_RELEASE_AUTOMATION]` → workflow_settings.[size].release_automation
- `[WORKFLOW_AUTO_MERGE]` → workflow_settings.[size].auto_merge
- `[WORKFLOW_COORDINATION_REQUIRED]` → workflow_settings.[size].coordination_required

Size mapping: nano/tiny templates only (medium/large/mega blocked)

## Deduplication Detection

Check for existing similar work before creating new AgentTasks:

Detection process:
1. Directory scan: Search agenttasks/ready/ and agenttasks/completed/
2. Work analysis: Extract description, scope, and requirements
3. Similarity calculation using weighted scoring:
   - Work description match (40%)
   - Technical scope match (30%)
   - Context alignment (20%)
   - Parent reference match (10%)
4. Threshold decision: ≥70% similarity triggers update-existing workflow
5. User notification of duplicate detection

Update-existing workflow:
1. Load existing AgentTask content and context
2. Merge new requirements with existing ones
3. Preserve original AgentTask structure and ID
4. Expand success criteria to include new requirements
5. Add enhancement notation
6. Notify user of existing work reuse

## Memory-First Generation

Implement memory-first approach before template loading:

Memory search process:
1. Work intent analysis: Parse request for work type, domains, context
2. Memory directory search: Scan memory/[topic]/ for relevant patterns
3. Pattern scoring: Evaluate using SearchMemory algorithm
4. Pattern selection: Choose top 2-3 patterns (max 1000 tokens)
5. Direct embedding: Include patterns in AgentTask context

Memory integration rules:
- Search memory before template loading
- Embed patterns directly in AgentTask context
- No runtime memory lookups during execution
- Self-contained AgentTasks with embedded learning

## Context Requirements

Required before generation:
- Duplicate check completed
- System nature (CODE/AI-AGENTIC)
- Project root (absolute path)
- Configuration (actual values)
- Critical files (with samples)
- User requirements (clear)
- Memory patterns (embedded from search)

## Work Detection

Work intent patterns (trigger AgentTask):
- Implementation: implement, create, build, develop, code, write
- Modification: fix, update, modify, change, refactor, optimize
- Operations: deploy, install, configure, setup, migrate
- Maintenance: delete, remove, clean, purge, archive
- @Role Work: "@Developer implement X", "@DevOps deploy Y"

Information patterns (no AgentTask):
- Query: show, display, read, list, check, analyze
- Knowledge: explain, describe, define, clarify, understand
- Status: status, state, condition, progress, current
- @Role Questions: "@PM what story next?"

## Classification

ASK indicators (allow through):
- Question words: what, how, why, should, can, will
- @Role consultations: "@PM what story next?"
- Status inquiries: "What's the current progress?"

DEMAND indicators (trigger AgentTask):
- Direct imperatives: "@Developer implement X"
- Work assignments: "Fix the bug", "Build the feature"
- Action commitments: "Please create", "Go ahead and fix"

---
*AgentTask auto-trigger with breakdown enforcement and nano/tiny restrictions*