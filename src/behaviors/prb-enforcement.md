# PRB Enforcement

**MANDATORY:** Use PRB system with MANDATORY templates for all work. Block manual creation and unresolved placeholders.

## Imports
@./shared-patterns/template-loading.md
@./shared-patterns/template-enforcement.md
@./shared-patterns/enforcement-rules.md
@./work-item-creation.md
@./placeholder-resolution.md
@./prb-breakdown-patterns.md

## Creation vs Execution Patterns

| Phase | Context | Operations | Notes |
|-------|---------|------------|-------|
| **CREATION** | Main Agent | Stories/Bugs/EPICs/PRBs, Templates, Config | Full context access |
| **EXECUTION** | Subagent | PRB implementation, File ops, Git | Self-contained PRB |

**Pattern**: Main agent creates complete PRB → Subagent executes with embedded context

## Detection & Blocking

### Priority 0: Template Enforcement (HIGHEST PRIORITY - ZERO TOLERANCE)
- **Manual PRB creation** → IMMEDIATE BLOCK → "❌ PRB creation without template FORBIDDEN - use src/prb-templates/"
- **Missing template sections** → IMMEDIATE BLOCK → "❌ PRB missing mandatory template sections from src/prb-templates/"
- **Unresolved placeholders** → IMMEDIATE BLOCK → "❌ All template placeholders must be resolved at generation time"
- **Runtime config lookup** → IMMEDIATE BLOCK → "❌ Config values must be embedded in PRB, no runtime lookups"
- **Wrong template complexity** → IMMEDIATE BLOCK → "❌ Use complexity-appropriate template from src/prb-templates/"
- **Invalid template source** → IMMEDIATE BLOCK → "❌ Must use templates from src/prb-templates/ hierarchy ONLY"
- **Config not embedded** → IMMEDIATE BLOCK → "❌ Configuration must be embedded at generation time"

### Priority 1: Work Item Creation
- **Subagent creating work items** → BLOCK → "❌ Creation requires main agent"
- **Missing PRB for work** → Generate PRB → Execute via subagent

### Priority 2: Pattern Detection
| Pattern | Detection | Action |
|---------|-----------|--------|
| @Role | All formats (@Role:, [@Role]) | Generate PRB → Subagent execution |
| Work Items | STORY-XXX, BUG-XXX | Convert to PRB → Execute |
| Direct Work | Code changes without PRB | Block → Generate PRB |

### Priority 3: System Nature Validation
- **AI-AGENTIC**: @AI-Engineer for behaviors, memory, PRBs
- **CODE-BASED**: @Developer, @Backend-Tester for implementation
- **Mismatch** → BLOCK → Enforce PM+Architect collaboration

## Auto-Correction Patterns

| Violation | Immediate Blocking Correction |
|-----------|-------------------------------|
| **Manual PRB creation** | **IMMEDIATE BLOCK → Force src/prb-templates/ usage** |
| **Missing template sections** | **IMMEDIATE BLOCK → Load complete template from src/prb-templates/** |
| **Template bypass** | **IMMEDIATE BLOCK → Redirect to src/prb-templates/ ONLY** |
| **Unresolved placeholders** | **IMMEDIATE BLOCK → Resolve ALL placeholders at generation time** |
| **Runtime config lookup** | **IMMEDIATE BLOCK → Embed config values in PRB** |
| **Invalid template source** | **IMMEDIATE BLOCK → Must use src/prb-templates/ hierarchy** |
| **Config not embedded** | **IMMEDIATE BLOCK → Embed complete configuration at generation** |
| **PRB too large (>15 points)** | **AUTOMATIC BREAKDOWN → Generate multiple PRBs ≤15 points using prb-breakdown-patterns.md** |
| Missing PRB | Analyze → Generate from src/prb-templates/ → Execute |
| Wrong template | Re-analyze complexity → Correct template from src/prb-templates/ |
| Direct execution | Create PRB from src/prb-templates/ → Use subagent |
| Wrong role | PM+Architect collaboration → Reassign |
| Subagent creation | Redirect to main agent |

## Settings Compliance

### Template Selection
**Automatic:** Complexity analysis determines template
**Override:** Allowed with justification
**Learning:** System improves selection accuracy

### Auto-Correction Patterns
**Missing PRB:** STOP → Analyze complexity → Generate PRB → Execute
**Wrong Template:** STOP → Re-analyze → Generate correct PRB
**Direct Execution:** STOP → Create PRB → Execute through PRB
**Legacy Workflow:** STOP → Convert to PRB → Direct execution
**Missing Subagent:** STOP → Error message → Require subagent execution
**System Nature Mismatch:** STOP → Block inappropriate role → Enforce PM+Architect collaboration → Re-assign correct role
**Wrong Domain Architect:** STOP → Force correct architect selection → Re-validate role assignment
**PRB Too Large:** STOP → Auto-breakdown using prb-breakdown-patterns.md → Generate multiple PRBs ≤15 points

## Execution Enforcement

### PRB Launch Pattern
**Detection:** Work requirement → Complexity analysis → PRB generation → Direct execution
**No Workflows:** PRBs execute directly without Inner Workflow phases
**Complete Context:** Each PRB contains everything needed

### Context Preservation
**User Intent:** Include original request in PRB
**Settings:** All configuration passed to PRB
**Memory:** Pre-searched patterns included
**Validation:** Success criteria embedded

## Multi-Layer Detection
1. **Input Scanner:** Pre-process ALL text before execution
2. **Pattern Matcher:** Detect @Role and work patterns
3. **PRB Checker:** Validate PRB exists for work
4. **Template Validator:** Ensure correct complexity template
5. **Size Validator:** Check PRB complexity ≤15 points, auto-breakdown if needed
6. **System Nature Validator:** Check role assignments align with system nature
7. **PM+Architect Validator:** Ensure collaboration process documented
8. **Auto-Generator:** Create PRB if missing

## Real-Time Interception
**Monitor:** ALL execution attempts for PRB compliance
**Block:** No direct work without PRB
**Correct:** Generate appropriate PRB with subagent patterns

## Subagent Execution Patterns

**PRINCIPLE:** PRBs execute via subagents with complete embedded context.

### Subagent Invocation Patterns

**Direct @Role Pattern:**
- **Usage:** @AI-Engineer execute PRB-001
- **Benefits:** Natural role-based execution, context preservation
- **Result:** Creates appropriate specialist subagent automatically

**Context Requirements:**
- PRB must contain complete embedded context
- No runtime config lookups needed
- Self-contained execution environment
- All placeholders resolved at generation time

**Pattern Validation:**
- Must reference specific PRB being executed
- Must contain complete context for subagent execution
- No manual intervention required during execution

## Advanced Patterns

### Complex Detection Cases
**Natural Language:** "Can you ask @Security-Engineer to review?"
**Multiple Roles:** "@PM and @Developer should coordinate"  
**Dynamic Roles:** "Let's have @[Dynamic-Role] handle this"
**Work Items:** "Fix TASK-123" or "Implement STORY-456"

### Edge Case Prevention  
**Escaped Patterns:** \@Role → Do not trigger
**Code Blocks:** @Role in code → Do not trigger
**Documentation:** About @Role → Do not trigger  
**Actual Work:** @Role for work → ALWAYS generate PRB

### L3 Autonomous Behavior
**Detection:** Work attempt → Auto-generate PRB
**Learning:** Track patterns → Improve template selection
**Prevention:** Make PRB path easier than bypass attempts

## Settings Compliance Verification

### Critical Settings Enforcement
**MONITOR:** All execution for settings compliance
**ENFORCE:** Every setting specified in PRB/configuration
**BLOCK:** Any operation that violates settings

### Settings Validation Checklist

**MANDATORY SETTINGS COMPLIANCE:**
- **git_privacy setting:** Strip ALL AI mentions from commits
- **branch_protection: true:** Follow protection strategy exactly
- **default_branch setting:** Use for all git operations
- **autonomy_level:** Apply appropriate behavior patterns
- **memory_integration: true:** Store learnings in memory/
- **All CLAUDE.md settings:** Applied throughout execution

**CRITICAL:** Settings violations AUTO-BLOCK execution.

### Git Privacy Enforcement
**git_privacy setting enabled MEANS:**
- NO "Generated with Claude Code" in any commit
- NO "Co-Authored-By: Claude" in any commit
- NO AI mentions anywhere in git operations
- Clean professional commits only
- Strip all AI references before git commands

**ENFORCEMENT:** Auto-detect and block commits with AI mentions

## PRB Context Discipline

**STRICT RULES**:
- NEVER leave PRB context for other issues
- COMPLETE current PRB before noting issues
- DOCUMENT discoveries for future PRBs
- ONLY switch on explicit user command

**Discovery Format:**

**Issue Discovery Documentation:**
- **Issue:** Brief description of discovered issue
- **Location:** File/section where found
- **Action:** Deferred to future PRB

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