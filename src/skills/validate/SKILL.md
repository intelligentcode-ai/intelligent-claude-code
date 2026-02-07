---
name: validate
description: Activate when checking if work meets requirements, verifying completion criteria, validating file placement, or ensuring quality standards. Use before marking work complete to verify success criteria are met.
---

# Validation Skill

Validate AgentTask completion against success criteria and project standards.

## When to Use

- Checking if work meets all requirements
- Validating file placement rules
- Ensuring quality standards before completion
- Reviewing subagent work output

## Required Checks

- [ ] Success criteria satisfied
- [ ] File placement rules followed
- [ ] ALL-CAPS file names avoided (except allowlist)
- [ ] Summary/report files only in `summaries/`
- [ ] Memory updated when new knowledge created

## File Placement Validation

| File Type | Required Location |
|-----------|------------------|
| Summaries/Reports | `summaries/` |
| Stories/Epics | `stories/` |
| Bugs | `bugs/` |
| Memory | `memory/` |
| Documentation | `docs/` |

**NEVER place:**
- Summaries in `docs/` or project root
- Memory entries outside `memory/`
- Reports anywhere except `summaries/`

## ALL-CAPS Allowlist

These files ARE allowed to be ALL-CAPS:
- README.md, LICENSE, LICENSE.md
- CLAUDE.md, SKILL.md, AGENTS.md
- CHANGELOG.md, CONTRIBUTING.md
- AUTHORS, NOTICE, PATENTS, VERSION
- MAKEFILE, DOCKERFILE, COPYING, COPYRIGHT

## Summary Validation

Every summary/completion must include:
- **What changed** - concrete list of modifications
- **Why it changed** - rationale/requirements addressed
- **How it was validated** - tests or checks performed
- **Risks or follow-ups** - any remaining concerns

## Validation Checklist

Before marking AgentTask complete:
```
- [ ] All success criteria met
- [ ] Changes match requested scope (no over-engineering)
- [ ] File placement rules followed
- [ ] Documentation updated as needed
- [ ] Git operations completed
- [ ] Summary is factual and complete
```

## Validation Ownership

- **Executing subagent**: Performs initial validation
- **Main agent**: Reviews and confirms validation
- **Hook system**: Enforces file placement automatically
