# PRB Enforcement

**MANDATORY:** Use PRB system with MANDATORY templates for all work. Block manual creation and unresolved placeholders.

## Imports
@./shared-patterns/template-loading.md
@./shared-patterns/template-enforcement.md
@./shared-patterns/enforcement-rules.md
@./work-item-creation.md
@./placeholder-resolution.md
@./prb-breakdown-patterns.md
@./violation-detection-patterns.md

## Creation vs Execution Patterns

| Phase | Context | Operations | Notes |
|-------|---------|------------|-------|
| **CREATION** | Main Agent | Stories/Bugs/EPICs/PRBs, Templates, Config | Full context access |
| **EXECUTION** | Subagent | PRB implementation, File ops, Git | Self-contained PRB |

**Pattern**: Main agent creates complete PRB → Subagent executes with embedded context

## IMMEDIATE EXECUTION BLOCKING

**CRITICAL ENFORCEMENT:** ALL direct execution attempts MUST be IMMEDIATELY BLOCKED before any tool use using real-time violation detection.

### Universal Pre-Tool Validation (MANDATORY BEFORE EVERY TOOL)
**MANDATORY VALIDATION SEQUENCE before ANY tool execution:**
1. **Request Analysis**: Parse user request using violation-detection-patterns.md logic
2. **Intent Classification**: Determine if request is work, information, or mixed using work pattern detection
3. **PRB Context Check**: Verify active PRB exists for work requests
4. **Tool Authorization**: Validate tool usage against PRB permissions and scope
5. **Immediate Blocking**: Block with unmistakable error messages if violations detected

### Enhanced Violation Detection Integration
**REAL-TIME MONITORING:** Every tool use passes through violation detection patterns:
- **Write Tool**: Validated against PRB context and scope before file creation/modification
- **Edit/MultiEdit Tools**: Checked for authorized file modifications within PRB boundaries
- **Bash Tool**: State-changing commands blocked without PRB authorization
- **All Tools**: Information requests allowed, work requests require PRB context

### Violation Detection Patterns

**IMMEDIATE BLOCK TRIGGERS:**
- **File Operations**: Write, Edit, MultiEdit operations without PRB context
- **State Modification**: Bash commands that modify system state (create, modify, delete)
- **Implementation Language**: "implement", "create", "build", "fix", "update", "modify"
- **Direct Instructions**: "make this change", "add this feature", "fix this bug"
- **Workflow Bypassing**: "just do X", "quickly Y", "simple Z"

**VIOLATION PATTERN EXAMPLES:**
- "Edit the file to add X" → BLOCK → Generate PRB first
- "Create a new component Y" → BLOCK → Generate PRB first
- "Fix this bug in Z" → BLOCK → Generate PRB first
- "Update the configuration" → BLOCK → Generate PRB first
- "Run this command to install" → BLOCK → Generate PRB first

### Pre-Tool-Use Validation Logic

**MANDATORY VALIDATION BEFORE EVERY TOOL:**
```
BEFORE ANY TOOL USE:
1. Parse user request for work intent patterns
2. Check if current context has active PRB
3. If work intent detected AND no PRB context:
   → IMMEDIATE BLOCK with unmistakable error
   → "❌ DIRECT EXECUTION BLOCKED: All work requires PRB"
4. If PRB context exists:
   → Allow tool execution within PRB scope
```

### Unmistakable Error Messages with Auto-Correction Guidance

**ENHANCED BLOCKING MESSAGES with specific correction guidance:**

**DIRECT_EXECUTION_BLOCKED:**
```
❌ DIRECT EXECUTION BLOCKED: All work requires PRB

This request attempts to perform work without an active PRB context.
Every implementation, modification, or system change requires PRB framework.

REQUIRED ACTION: Use @Role pattern to generate PRB first
Example: @AI-Engineer implement this feature
Then execute the generated PRB

BLOCKED OPERATION: {operation_description}
REASON: No active PRB context detected
```

**TOOL_USE_VIOLATION:**
```
❌ TOOL USE BLOCKED: File/system operations require PRB context

Tool: {tool_name}
Operation: {operation_description}  
File/Target: {target}

VIOLATION: Attempting to use {tool_name} without active PRB context
REQUIREMENT: All file and system modifications require PRB authorization

REQUIRED ACTION:
1. Generate PRB using @Role pattern: @{suggested_role} {work_description}
2. Execute the generated PRB with embedded context
3. All operations will then be authorized within PRB scope
```

**WORK_WITHOUT_PRB:**
```
❌ WORK ATTEMPT BLOCKED: Generate PRB using @Role pattern

Detected Work Intent: {work_indicators}
Implementation Language: {detected_patterns}
Current Context: No active PRB

BLOCKING REASON: System detected implementation intent without PRB framework
SAFETY MECHANISM: All work requires PRB generation before execution

CORRECTION GUIDE:
• For implementation: @Developer {task_description}
• For infrastructure: @DevOps-Engineer {task_description}  
• For AI/behavioral: @AI-Engineer {task_description}
• For database work: @Database-Engineer {task_description}
• For security: @Security-Engineer {task_description}

The system will generate appropriate PRB and execute with full context.
```

## Detection & Blocking

### Priority 0: Template Enforcement (HIGHEST PRIORITY - ZERO TOLERANCE)
- **Manual PRB creation** → IMMEDIATE BLOCK → "❌ PRB creation without template FORBIDDEN - use src/prb-templates/"
- **Missing template sections** → IMMEDIATE BLOCK → "❌ PRB missing mandatory template sections from src/prb-templates/"
- **Unresolved placeholders** → IMMEDIATE BLOCK → "❌ All template placeholders must be resolved at generation time"
- **Runtime config lookup** → IMMEDIATE BLOCK → "❌ Config values must be embedded in PRB, no runtime lookups"
- **Wrong template complexity** → IMMEDIATE BLOCK → "❌ Use complexity-appropriate template from src/prb-templates/"
- **Invalid template source** → IMMEDIATE BLOCK → "❌ Must use templates from src/prb-templates/ hierarchy ONLY"
- **Config not embedded** → IMMEDIATE BLOCK → "❌ Configuration must be embedded at generation time"

### Priority 1: Direct Execution Prevention (ZERO TOLERANCE)
- **ANY file operations without PRB** → IMMEDIATE BLOCK → "❌ DIRECT EXECUTION BLOCKED: All work requires PRB"
- **ANY bash commands without PRB** → IMMEDIATE BLOCK → "❌ TOOL USE BLOCKED: File/system operations require active PRB context"
- **Work intent without PRB context** → IMMEDIATE BLOCK → "❌ WORK ATTEMPT BLOCKED: Generate PRB using @Role pattern, then execute"
- **Implementation requests** → IMMEDIATE BLOCK → "❌ NO ACTIVE PRB: This request requires PRB generation before execution"

### Priority 2: Work Item Creation
- **Subagent creating work items** → BLOCK → "❌ Creation requires main agent"
- **Missing PRB for work** → Generate PRB → Execute via subagent

### Priority 3: Pattern Detection
| Pattern | Detection | Action |
|---------|-----------|--------|
| @Role | All formats (@Role:, [@Role]) | Generate PRB → Subagent execution |
| Work Items | STORY-XXX, BUG-XXX | Convert to PRB → Execute |
| Direct Work | Code changes without PRB | Block → Generate PRB |

### Priority 4: Documentation Compliance Enforcement
- **Documentation skipping patterns** → IMMEDIATE BLOCK → "❌ Template documentation requirements are MANDATORY"
- **Version bump omission** → IMMEDIATE BLOCK → "❌ Version bump required per template documentation section"
- **CHANGELOG skip attempt** → IMMEDIATE BLOCK → "❌ CHANGELOG entry required per template"
- **README update avoidance** → IMMEDIATE BLOCK → "❌ README updates required for user-facing changes per template"
- **Documentation bypassing language** → IMMEDIATE BLOCK → "❌ No bypass allowed for template documentation requirements"

**BLOCKED PHRASES:**
- "No documentation needed" → BLOCK → Must follow template requirements
- "Self-documenting code" → BLOCK → Template requires explicit documentation
- "Skip CHANGELOG" → BLOCK → CHANGELOG entry mandatory per template
- "Internal change, no docs" → BLOCK → All changes require documentation per template
- "Documentation not affected" → BLOCK → Template determines documentation requirements
- "Too technical for user docs" → BLOCK → Technical documentation still required
- "Code speaks for itself" → BLOCK → Template documentation sections are mandatory

### Priority 5: System Nature Validation
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
| **Documentation skipping** | **IMMEDIATE BLOCK → Enforce ALL template documentation requirements** |
| **Version bump missing** | **IMMEDIATE BLOCK → Execute version bump per template** |
| **CHANGELOG omitted** | **IMMEDIATE BLOCK → Create CHANGELOG entry per template** |
| **README updates skipped** | **IMMEDIATE BLOCK → Update README per template requirements** |
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
6. **Documentation Validator:** Scan for documentation skipping patterns and enforce template requirements
7. **System Nature Validator:** Check role assignments align with system nature
8. **PM+Architect Validator:** Ensure collaboration process documented
9. **Auto-Generator:** Create PRB if missing

## Real-Time Interception

**COMPREHENSIVE MONITORING:** Every request undergoes immediate pre-execution analysis.

### Universal Request Processing
**EVERY USER REQUEST MUST PASS THROUGH:**
1. **Work Intent Analysis**: Scan for implementation, modification, or creation patterns
2. **PRB Context Check**: Verify active PRB exists for work requests
3. **Tool Use Validation**: Block unauthorized file/system operations
4. **Information vs Work Classification**: Allow information requests, block work attempts

### Monitoring Scope
**MONITOR ALL:**
- File operations (Write, Edit, MultiEdit, Read with work intent)
- System commands (Bash operations that modify state)
- Work-related requests (implement, fix, create, update, build)
- Direct instructions bypassing PRB framework
- @Role mentions without PRB generation

### Real-Time Blocking
**IMMEDIATE BLOCKS:**
- **No direct work without PRB** → Generate PRB first
- **File modifications without PRB context** → Block tool use
- **System changes without PRB** → Block bash commands
- **Work bypassing PRB framework** → Force PRB generation

### Information vs Work Classification

**ALLOWED WITHOUT PRB (Information Requests):**
- "Show me the current code in file X"
- "What does this function do?"
- "List the files in this directory"
- "Check the status of the project"
- "Read the documentation"
- "Search for patterns in codebase"
- "Analyze the structure"

**BLOCKED WITHOUT PRB (Work Requests):**
- "Edit file X to add Y"
- "Create a new component"
- "Fix this bug"
- "Update the configuration"
- "Install package X"
- "Deploy to environment Y"
- "Commit these changes"
- "Build the application"

**DETECTION LOGIC:**
- **Read-Only Operations**: Allow when clearly informational
- **State-Changing Operations**: Always require PRB
- **Analysis vs Implementation**: Analysis allowed, implementation requires PRB
- **"Show me" vs "Make it"**: Show allowed, make requires PRB

### Auto-Correction Patterns
**WHEN VIOLATIONS DETECTED:**
1. **Immediate Block** → Stop execution before tool use
2. **Clear Error Message** → Unmistakable PRB requirement explanation
3. **Suggest Correction** → "@Role pattern to generate PRB first"
4. **Pattern Recognition** → Log violation for pattern improvement
5. **Context Preservation** → Save work request for PRB generation

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

### Common Violation Scenarios

**SCENARIO 1: Direct File Modification**
- User: "Edit the package.json to add dependency X"
- Block: ❌ DIRECT EXECUTION BLOCKED: All work requires PRB
- Correction: "@AI-Engineer add dependency X to package.json"

**SCENARIO 2: Quick Bug Fix**
- User: "Just fix this typo in line 45"
- Block: ❌ WORK ATTEMPT BLOCKED: Generate PRB using @Role pattern
- Correction: "@Developer fix typo in line 45"

**SCENARIO 3: Configuration Update**
- User: "Update the config file with new settings"
- Block: ❌ NO ACTIVE PRB: This request requires PRB generation
- Correction: "@AI-Engineer update configuration with new settings"

**SCENARIO 4: Build/Deploy Commands**
- User: "Run npm build to compile"
- Block: ❌ TOOL USE BLOCKED: System operations require PRB context
- Correction: "@DevOps-Engineer build and deploy application"

**SCENARIO 5: Multiple File Changes**
- User: "Create these 3 components and update the routing"
- Block: ❌ PRB BYPASS BLOCKED: Complex work requires PRB framework
- Correction: "@Developer implement component system with routing"

### Edge Case Prevention  
**Escaped Patterns:** \@Role → Do not trigger
**Code Blocks:** @Role in code → Do not trigger
**Documentation:** About @Role → Do not trigger  
**Actual Work:** @Role for work → ALWAYS generate PRB
**Information Questions:** Pure questions → Allow without PRB
**Status Checks:** "What's the status?" → Allow without PRB

### L3 Autonomous Behavior
**Detection:** Work attempt → Auto-generate PRB
**Learning:** Track patterns → Improve template selection
**Prevention:** Make PRB path easier than bypass attempts
**User Education:** Show correct @Role patterns when blocking

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
- [ ] All 9 PRB sections executed (including documentation)
- [ ] Settings compliance verified
- [ ] Requirements met
- [ ] Review complete
- [ ] Knowledge captured
- [ ] **Documentation compliance validated**:
  - [ ] Version bump completed per template
  - [ ] CHANGELOG entry created per template
  - [ ] README updates completed per template
  - [ ] All template documentation requirements satisfied
- [ ] Git operations clean
- [ ] PRB moved to completed/

**DOCUMENTATION VALIDATION**: PRBs cannot be marked complete without explicit verification of ALL template documentation requirements

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