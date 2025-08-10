# PRB Enforcement

**MANDATORY:** Use PRB system for all work. Auto-correct violations.

## Imports
@./shared-patterns/template-loading.md
@./shared-patterns/enforcement-rules.md
@./work-item-creation.md
@./placeholder-resolution.md

## Critical Separation: Creation vs Execution

| Phase | Context | Operations | Blocked |
|-------|---------|------------|---------|
| **CREATION** | Main Agent ONLY | Stories/Bugs/EPICs/PRBs, Templates, Config | Task tool creation |
| **EXECUTION** | Task Tool ONLY | PRB implementation, File ops, Git | Direct execution |

**Enforcement**: BLOCK wrong context → Redirect to correct context

## Detection & Blocking

### Priority 1: Task Tool Enforcement
- **Direct PRB execution** → BLOCK → "❌ PRB requires Task tool subagent"
- **Task creating work items** → BLOCK → "❌ Creation requires main agent"

### Priority 2: Pattern Detection
| Pattern | Detection | Action |
|---------|-----------|--------|
| @Role | All formats (@Role:, [@Role]) | Generate PRB → Task tool |
| Work Items | STORY-XXX, BUG-XXX | Convert to PRB → Execute |
| Direct Work | Code changes without PRB | Block → Generate PRB |

### Priority 3: System Nature Validation
- **AI-AGENTIC**: @AI-Engineer for behaviors, memory, PRBs
- **CODE-BASED**: @Developer, @Backend-Tester for implementation
- **Mismatch** → BLOCK → Enforce PM+Architect collaboration

## Auto-Correction Patterns

| Violation | Correction |
|-----------|------------|
| Missing PRB | Analyze → Generate → Execute |
| Wrong template | Re-analyze complexity → Correct template |
| Direct execution | Create PRB → Use Task tool |
| Wrong role | PM+Architect collaboration → Reassign |
| Task creation | Redirect to main agent |

## Settings Compliance

**MANDATORY ENFORCEMENT**:
- `git_privacy: true` → Strip ALL AI mentions
- `branch_protection` → Enforce strategy
- `default_branch` → Use for all git ops
- `autonomy_level` → Apply L1/L2/L3
- `memory_integration` → Store in memory/

## PRB Context Discipline

**STRICT RULES**:
- NEVER leave PRB context for other issues
- COMPLETE current PRB before noting issues
- DOCUMENT discoveries for future PRBs
- ONLY switch on explicit user command

**Discovery Format**:
```markdown
<!-- DISCOVERED ISSUE (DEFERRED) -->
Issue: [description]
Location: [file/section]
Action: Deferred to future PRB
```

## Completion Validation

**False Completion Detection**: Monitor claims → Validate checklist → Block if incomplete

**Required for Completion**:
- [ ] All 6 PRB sections executed
- [ ] Settings compliance verified
- [ ] Requirements met
- [ ] Review complete
- [ ] Knowledge captured
- [ ] Git operations clean
- [ ] PRB moved to completed/

## Project Scope Enforcement

**BLOCKED**:
- Write to ~/.claude/ (except installation)
- Operations outside project root
- Memory outside ./memory/
- Global config changes

**Task Scope Validation**: See shared-patterns/enforcement-rules.md

## Integration Points

- **PRB Execution**: Import completion checklist
- **Learning**: Track patterns, improve detection
- **Autonomy**: L1=approval, L2=architect, L3=auto
- **Templates**: Use hierarchy loading

---
*Optimized: 506→~130 lines*