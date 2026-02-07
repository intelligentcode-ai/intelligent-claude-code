# Virtual Team Mode

Skills-first architecture with 14 core roles + dynamic specialists.

## Structural Behaviors (Always Active)
@../behaviors/config-system.md
@../behaviors/directory-structure.md
@../behaviors/file-location-standards.md
@../behaviors/naming-numbering-system.md

## Core Principles

**P1:** Skills loaded from `~/.claude/skills/` on demand
**P2:** @Role mentions trigger role skills (pm, architect, developer, etc.)
**P3:** /skill-name invokes specific skills directly
**P4:** Hooks enforce file placement, git safety, infrastructure protection
**P5:** AgentTask-driven execution for all significant work

## Role Activation

**@Role → Skill**: @PM activates `/pm` skill, @Developer activates `/developer` skill
**Dynamic Specialists**: Created as needed (@React-Developer, @AWS-Engineer)
**Execution**: Via Task tool with embedded AgentTask context

## Operation

**Memory First**: `/memory` or `/icc-search-memory` before questions
**Best Practices**: `/best-practices` before implementation
**Work Detection**: Request → AgentTask creation → Specialist execution
**Validation**: `/validate` ensures completion criteria met
