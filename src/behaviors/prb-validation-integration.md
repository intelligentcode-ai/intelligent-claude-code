# PRB Validation Integration Behavior

**MANDATORY:** Comprehensive validation that integrates simplified templates with enhanced @PM processes and automatic placeholder detection.

**PURPOSE:** Provide end-to-end validation that catches @PM errors, validates template usage, and ensures complete integration between all system improvements.

## Core Integration Principle

**VALIDATION AS BEHAVIORAL ENFORCEMENT**: Transform validation from manual checking to automatic behavioral pattern enforcement that prevents errors before they occur.

## Integration Points

### Template Simplification Integration (from PRB-001)
**INTEGRATION GOAL:** Ensure simplified templates work seamlessly with @PM processes

**Templates Enhanced with Clear Placeholders:**
- Simplified structure with obvious placeholder sections
- Clear instructions for @PM on what to fill
- Reduced cognitive load while maintaining completeness
- Better error detection through standardized placeholder patterns

### PM Process Enhancement Integration (from PRB-002)
**INTEGRATION GOAL:** Enhanced @PM behavioral patterns that systematically resolve placeholders

**Process Improvements:**
- Systematic 5-phase placeholder resolution process
- Data gathering before any placeholder filling
- Comprehensive validation checkpoints
- Error recovery guidance by error type

### Comprehensive Validation Integration (this PRB)
**INTEGRATION GOAL:** Automatic detection and prevention of placeholder resolution failures

**Validation Capabilities:**
- Real-time placeholder detection during PRB creation
- Configuration type validation (boolean vs string)
- Story-specific content verification
- Complete context validation
- Role assignment documentation verification

## Behavioral Validation Patterns

### Pattern 1: Pre-Creation Validation Gate
**BEHAVIORAL GOAL:** Prevent PRB creation with unresolved placeholders

**@PM BEHAVIOR:**
```markdown
BEFORE creating any PRB file:
1. Load template from src/prb-templates/
2. Execute placeholder detection scan
3. If placeholders found: STOP - must resolve all first
4. If no placeholders: Allow PRB creation to proceed

BLOCKING CONDITION: ANY "[SOMETHING]" pattern in template
ERROR MESSAGE: "❌ BLOCKED: Template has unresolved placeholders: {list}"
RECOVERY ACTION: Return to systematic placeholder resolution process
```

### Pattern 2: Configuration Embedding Validation
**BEHAVIORAL GOAL:** Ensure all configuration values are actual, not placeholders

**@PM BEHAVIOR:**
```markdown
DURING placeholder resolution phase:
1. Check git_privacy value: MUST be true or false (boolean)
2. Check branch_protection value: MUST be true or false (boolean)  
3. Check default_branch value: MUST be string like "main" or "master"
4. Check project_root value: MUST be absolute path starting with "/"

BLOCKING CONDITIONS:
- git_privacy: "[FROM_CONFIG]" → Load actual boolean from CLAUDE.md
- branch_protection: "[FROM_CONFIG]" → Load actual boolean from CLAUDE.md
- default_branch: "[FROM_CONFIG]" → Load actual string from CLAUDE.md
- project_root: "[PROJECT_ROOT]" → Resolve to absolute path

ERROR RECOVERY: Return to Phase 2 (Data Gathering) of placeholder resolution
```

### Pattern 3: Story-Specific Content Validation
**BEHAVIORAL GOAL:** Ensure PRB content is customized for specific story, not generic template

**@PM BEHAVIOR:**
```markdown
DURING content validation phase:
1. Check user_request: MUST contain actual story requirements
2. Check success_criteria: MUST be specific to this story
3. Check title: MUST have actual role and description
4. Check file paths: MUST be absolute paths to actual files

BLOCKING CONDITIONS:
- user_request: "[USER_REQUEST]" → Extract from story file
- Generic success criteria → Create story-specific criteria
- title: "[ROLE] [DESCRIPTION]" → Fill with actual role and description
- Relative file paths → Convert to absolute paths

ERROR RECOVERY: Return to Phase 3 (Story Requirements Extraction)
```

### Pattern 4: System Nature Analysis Validation
**BEHAVIORAL GOAL:** Ensure system type is properly analyzed and documented

**@PM BEHAVIOR:**
```markdown
DURING system analysis phase:
1. Count markdown files vs code files in project
2. Apply decision logic for system classification
3. Set system_nature to correct classification
4. Validate classification matches work type

DECISION LOGIC:
- Lots of .md files + behaviors/ directory = "MARKDOWN-BASED AI-AGENTIC SYSTEM"
- More code files than markdown = "CODE-BASED SYSTEM"  
- Mixed = "HYBRID SYSTEM"

BLOCKING CONDITION:
- system_nature: "[SYSTEM_NATURE]" → Must analyze and classify
ERROR RECOVERY: Return to Phase 2 (Project Context Analysis)
```

### Pattern 5: Role Assignment Documentation Validation
**BEHAVIORAL GOAL:** Ensure PM+Architect collaboration is documented in PRB

**@PM BEHAVIOR:**
```markdown
DURING role assignment validation:
1. Check two-factor analysis is documented
2. Verify PM+Architect collaboration referenced
3. Validate role matches both project scope and work type
4. Ensure decision rationale is clear

REQUIRED DOCUMENTATION:
- Project scope factor (AI-AGENTIC vs CODE-BASED vs HYBRID)
- Work type factor (implementation, security, database, etc.)
- PM+Architect collaboration process
- Role assignment rationale

BLOCKING CONDITION: Missing collaboration documentation
ERROR RECOVERY: Document PM+Architect process and rationale
```

## Automated Validation Behavioral Script

### Behavioral Validation Process
**@PM MUST follow this validation sequence:**

```markdown
# Automated PRB Validation Behavior
# @PM executes this pattern before creating any PRB

## Validation Sequence Behavior:

### Step 1: Template Placeholder Scan
BEHAVIORAL ACTION: Scan template for ANY "[SOMETHING]" patterns
EXPECTED RESULT: Zero placeholders found in final PRB
BLOCKING CONDITION: Any placeholder pattern found
RECOVERY ACTION: Return to systematic placeholder resolution

### Step 2: Configuration Type Validation  
BEHAVIORAL ACTION: Verify config values are actual types, not strings
CHECKS:
- git_privacy: must be boolean true/false
- branch_protection: must be boolean true/false
- default_branch: must be string value
- project_root: must be absolute path
BLOCKING CONDITION: Any "[FROM_CONFIG]" or placeholder found
RECOVERY ACTION: Return to configuration loading phase

### Step 3: Story Content Validation
BEHAVIORAL ACTION: Verify all content is story-specific
CHECKS:
- user_request: actual story requirements
- success_criteria: specific success criteria
- title: actual role and description
BLOCKING CONDITION: Generic or template content found
RECOVERY ACTION: Return to story requirements extraction

### Step 4: System Nature Validation
BEHAVIORAL ACTION: Verify system type properly classified
REQUIRED VALUES:
- "MARKDOWN-BASED AI-AGENTIC SYSTEM"
- "CODE-BASED SYSTEM"
- "HYBRID SYSTEM"
BLOCKING CONDITION: "[SYSTEM_NATURE]" or invalid classification
RECOVERY ACTION: Return to system analysis phase

### Step 5: Role Documentation Validation
BEHAVIORAL ACTION: Verify PM+Architect collaboration documented
REQUIRED ELEMENTS:
- Two-factor analysis rationale
- PM+Architect collaboration reference
- Domain specialist creation justification
BLOCKING CONDITION: Missing collaboration documentation
RECOVERY ACTION: Document PM+Architect process

### Step 6: Final Integration Check
BEHAVIORAL ACTION: Comprehensive final validation
VALIDATES:
- Zero placeholder patterns remain
- All configurations are actual values
- All content is story-specific
- System nature properly classified
- Role assignment documented
- PRB is completely self-contained
```

## Error Detection and Recovery Patterns

### Error Type 1: Configuration Placeholder Errors
**DETECTION PATTERN:**
```markdown
@PM SCAN FOR: "[FROM_CONFIG]" anywhere in PRB content
@PM ERROR: "Configuration values not resolved from hierarchy"
@PM RECOVERY: Return to Phase 2 (Configuration Hierarchy Loading)
@PM ACTIONS:
1. Open CLAUDE.md file
2. Find git_privacy, branch_protection, default_branch settings
3. Extract actual boolean/string values
4. Replace ALL "[FROM_CONFIG]" with actual values
```

### Error Type 2: Project Context Placeholder Errors  
**DETECTION PATTERN:**
```markdown
@PM SCAN FOR: "[PROJECT_ROOT]", "[SYSTEM_NATURE]" in PRB content
@PM ERROR: "Project context not analyzed and resolved"
@PM RECOVERY: Return to Phase 2 (Project Context Gathering)
@PM ACTIONS:
1. Determine absolute project root path
2. Analyze file types to classify system nature
3. Replace placeholders with actual analysis results
```

### Error Type 3: Story Content Placeholder Errors
**DETECTION PATTERN:**
```markdown
@PM SCAN FOR: "[USER_REQUEST]", "[SUCCESS_CRITERIA]" in PRB content
@PM ERROR: "Story requirements not extracted from parent story"
@PM RECOVERY: Return to Phase 3 (Story Requirements Extraction)
@PM ACTIONS:
1. Read parent story file completely
2. Extract actual user requirements
3. Create story-specific success criteria
4. Replace placeholders with actual story content
```

### Error Type 4: Role Assignment Placeholder Errors
**DETECTION PATTERN:**
```markdown
@PM SCAN FOR: "[ROLE]" or missing collaboration documentation
@PM ERROR: "Role not assigned via PM+Architect collaboration"
@PM RECOVERY: Return to Phase 4 (Role Assignment Process)
@PM ACTIONS:
1. Analyze system nature and work type (two-factor analysis)
2. Collaborate with appropriate domain architect
3. Document collaboration rationale
4. Assign appropriate role with justification
```

## Integration Success Patterns

### Success Pattern 1: Template to Process Integration
**INTEGRATION SUCCESS:**
```markdown
✅ Simplified templates with clear placeholder sections
✅ Systematic @PM process that fills all placeholders
✅ Validation catches any placeholders @PM misses
✅ Error recovery guides @PM back to correct phase
✅ Self-contained PRBs with no runtime dependencies
```

### Success Pattern 2: Process to Validation Integration
**INTEGRATION SUCCESS:**
```markdown
✅ Enhanced @PM process creates high-quality PRBs
✅ Validation automatically detects process failures
✅ Clear error messages guide @PM to fix specific issues
✅ Checkpoint system prevents advancement with errors
✅ Quality gates ensure only complete PRBs are created
```

### Success Pattern 3: End-to-End Workflow Integration
**INTEGRATION SUCCESS:**
```markdown
✅ Story breakdown triggers systematic @PM process
✅ @PM follows 5-phase placeholder resolution 
✅ Validation runs automatically at each checkpoint
✅ Errors caught early with specific recovery guidance
✅ Final PRB is completely self-contained and executable
✅ Subagents receive perfect context with no placeholders
```

## Behavioral Enforcement Mechanisms

### Enforcement Level 1: Prevention (Behavioral Patterns)
**MECHANISM:** Build correct habits into @PM behavioral patterns
- Systematic placeholder resolution process
- Mandatory validation checkpoints
- Clear error recovery guidance
- Quality gates at each phase

### Enforcement Level 2: Detection (Automated Scanning)
**MECHANISM:** Automatic detection of common @PM errors
- Placeholder pattern scanning
- Configuration type validation
- Content quality checking
- Role assignment verification

### Enforcement Level 3: Correction (Error Recovery)
**MECHANISM:** Guide @PM back to correct behavior
- Specific error messages by error type
- Phase-specific recovery actions
- Clear next steps for resolution
- Prevent advancement until fixed

### Enforcement Level 4: Quality Gates (Blocking)
**MECHANISM:** Prevent PRB creation until quality standards met
- Zero tolerance for unresolved placeholders
- Must pass all validation checks
- Complete context required
- Self-contained execution verified

## Integration Testing Patterns

### Test Pattern 1: Template Integration Test
**TEST:** Verify simplified templates work with @PM process
```markdown
@PM TEST SCENARIO:
1. Load nano-prb-template.yaml
2. Follow systematic placeholder resolution process
3. Run validation on completed PRB
4. Verify all placeholders resolved correctly
5. Confirm PRB is self-contained and executable
```

### Test Pattern 2: Process Integration Test
**TEST:** Verify enhanced @PM process catches all errors
```markdown
@PM TEST SCENARIO:
1. Start with complex story requiring multiple placeholders
2. Intentionally skip some placeholder resolution steps
3. Run validation to confirm errors are caught
4. Follow error recovery guidance
5. Verify final PRB passes all validation checks
```

### Test Pattern 3: End-to-End Integration Test
**TEST:** Verify complete workflow integration
```markdown
@PM TEST SCENARIO:
1. Start with story breakdown request
2. Follow complete @PM systematic process
3. Create PRB using simplified template
4. Run comprehensive validation
5. Execute PRB in subagent context
6. Verify subagent receives perfect self-contained context
```

## Performance and Quality Metrics

### Quality Metrics
- **Placeholder Resolution Rate:** 100% of placeholders resolved correctly
- **Validation Pass Rate:** 100% of PRBs pass validation before creation
- **Self-Contained Rate:** 100% of PRBs executable without runtime config
- **Error Recovery Rate:** 100% of validation errors have clear recovery paths

### Performance Metrics
- **Template to PRB Time:** Systematic process reduces errors and rework
- **Validation Speed:** Automated scanning catches errors immediately
- **Error Resolution Time:** Clear recovery guidance reduces debugging time
- **Integration Reliability:** Seamless workflow from template to execution

## Documentation and Training Patterns

### @PM Training Pattern
```markdown
@PM BEHAVIORAL TRAINING SEQUENCE:
1. Learn systematic 5-phase placeholder resolution process
2. Practice with nano and tiny templates first
3. Use validation checkpoints to build correct habits
4. Master error recovery for each error type
5. Graduate to medium and large templates
6. Develop expertise in self-contained PRB creation
```

### Integration Documentation Pattern
```markdown
INTEGRATION DOCUMENTATION STRUCTURE:
1. Template improvements overview (from PRB-001)
2. Process enhancement overview (from PRB-002)  
3. Validation integration overview (this PRB)
4. End-to-end workflow examples
5. Error scenarios and recovery guidance
6. Quality assurance and testing procedures
```

## Success Validation

**INTEGRATION SUCCESS CRITERIA:**
- ✅ @PM can create PRBs without leaving any placeholders unresolved
- ✅ Validation automatically catches and blocks incomplete placeholder resolution
- ✅ Clear error messages guide @PM to specific resolution phases
- ✅ All templates work seamlessly with enhanced @PM process
- ✅ PRBs are completely self-contained with no runtime dependencies
- ✅ Subagents receive perfect execution context
- ✅ End-to-end workflow is reliable and error-resistant

**BEHAVIORAL TRANSFORMATION ACHIEVED:**
From: Manual, error-prone placeholder resolution with missing validations
To: Systematic, validated, error-resistant process with automatic quality gates

---
*Comprehensive validation integration for intelligent-claude-code system*