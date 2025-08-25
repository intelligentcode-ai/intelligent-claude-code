# Comprehensive Validation Tools

**MANDATORY:** Complete suite of validation tools integrating template improvements, @PM process enhancements, and automated placeholder detection.

**PURPOSE:** Provide @PM with comprehensive behavioral validation tools that ensure perfect PRB creation with zero unresolved placeholders.

## Validation Tools Overview

**VALIDATION TOOL SUITE:**
1. **Pre-Creation Validation**: Prevent PRB creation with unresolved placeholders
2. **Progressive Checkpoint Validation**: Catch errors at each resolution phase  
3. **Configuration Type Validation**: Ensure proper value types (boolean vs string)
4. **Content Authenticity Validation**: Verify story-specific content
5. **Integration Completeness Validation**: Ensure all improvements work together
6. **Final Quality Assurance Validation**: Comprehensive pre-creation check

## Tool 1: Pre-Creation Validation Gate

### Purpose
**BLOCK PRB creation until ALL placeholders resolved**

### @PM Behavioral Usage
```markdown
BEFORE creating any PRB file:
1. Load template from src/prb-templates/
2. Execute complete placeholder scan
3. If ANY placeholders found: STOP immediately
4. Display clear error with specific placeholders
5. Only proceed when scan returns zero placeholders

VALIDATION COMMAND PATTERN:
@PM: Run placeholder detection scan
System: Scan template for "[...]" patterns
Result: List all unresolved placeholders OR "Ready for creation"
```

### Implementation Behavior
```markdown
PRE-CREATION VALIDATION SEQUENCE:
1. Open PRB draft in text editor
2. Use search function: "[" to find bracket patterns
3. Count total matches found
4. For each match: verify it's not a real placeholder
5. Goal: Zero matches = ready for creation

BLOCKING CONDITIONS:
❌ ANY "[PLACEHOLDER]" pattern found
❌ ANY "[FROM_CONFIG]" string found  
❌ ANY "[PROJECT_ROOT]" string found
❌ ANY "[USER_REQUEST]" string found
❌ ANY generic template content found

PASS CONDITIONS:
✅ Zero bracket patterns in entire PRB
✅ All configuration values are actual types
✅ All content is story-specific
✅ All paths are absolute
```

## Tool 2: Progressive Checkpoint Validation

### Purpose
**Catch placeholder resolution errors at each phase before they accumulate**

### @PM Behavioral Usage
```markdown
CHECKPOINT 1: After Basic Metadata Resolution
Execute: Scan metadata section only
Check: [PARENT_ID], [NEXT_NUMBER], [TITLE], [CURRENT_DATE]
Pass criteria: All basic identifiers resolved to actual values
Fail action: Fix metadata before proceeding to configuration

CHECKPOINT 2: After Configuration Resolution
Execute: Scan configuration section only  
Check: All [FROM_CONFIG] patterns replaced
Pass criteria: Boolean values unquoted, string values quoted
Fail action: Return to config loading phase

CHECKPOINT 3: After Project Context Resolution
Execute: Scan context section only
Check: [PROJECT_ROOT], [SYSTEM_NATURE] patterns replaced
Pass criteria: Absolute path, valid system classification
Fail action: Return to project analysis phase

CHECKPOINT 4: After Story Content Resolution
Execute: Scan content sections only
Check: [USER_REQUEST], [SUCCESS_CRITERIA] patterns replaced
Pass criteria: Story-specific, measurable content
Fail action: Return to story extraction phase
```

### Implementation Behavior
```markdown
PROGRESSIVE VALIDATION BEHAVIORAL PATTERN:
@PM completes one resolution phase → immediately validate that phase
@PM finds errors → fix before advancing to next phase
@PM passes validation → advance to next resolution phase
@PM skips validation → BLOCKED from proceeding

BENEFIT: Catch errors early when they're easier to fix
BENEFIT: Build quality incrementally, don't defer to end
BENEFIT: Develop systematic validation habits
BENEFIT: Reduce debugging time and frustration
```

## Tool 3: Configuration Type Validation

### Purpose
**Ensure configuration values are proper types, not string placeholders**

### @PM Behavioral Usage
```markdown
CONFIGURATION TYPE CHECK SEQUENCE:
1. Find git_privacy line in PRB
2. Verify value is: true OR false (boolean, no quotes)
3. Find branch_protection line in PRB
4. Verify value is: true OR false (boolean, no quotes)  
5. Find default_branch line in PRB
6. Verify value is: "main" OR "master" (quoted string)
7. Find project_root line in PRB
8. Verify value starts with "/" (absolute path)

COMMON TYPE ERRORS:
❌ git_privacy: "true" (quoted boolean)
❌ git_privacy: "[FROM_CONFIG]" (unresolved placeholder)
❌ branch_protection: "false" (quoted boolean)
❌ default_branch: main (unquoted string)
❌ project_root: "relative/path" (relative path)

CORRECT TYPE PATTERNS:
✅ git_privacy: true (unquoted boolean)
✅ branch_protection: false (unquoted boolean)
✅ default_branch: "main" (quoted string)
✅ project_root: "/absolute/path" (absolute path)
```

### Implementation Behavior
```markdown
TYPE VALIDATION BEHAVIORAL PATTERN:
@PM loads configuration from CLAUDE.md
@PM extracts actual boolean and string values
@PM applies proper YAML formatting (quotes vs no quotes)
@PM verifies types match expected patterns
@PM re-validates types after any configuration changes

TYPE ERROR RECOVERY:
Boolean quoted as string → Remove quotes
String not quoted → Add quotes  
Relative path → Convert to absolute
Placeholder remaining → Return to config loading
```

## Tool 4: Content Authenticity Validation

### Purpose
**Verify all content is specific to the story, not generic template content**

### @PM Behavioral Usage
```markdown
CONTENT AUTHENTICITY CHECK SEQUENCE:
1. Read original story file completely
2. Compare PRB user_request to story requirements
3. Verify PRB success_criteria are story-specific
4. Check PRB title matches story and role
5. Ensure no template boilerplate remains

AUTHENTICITY VERIFICATION QUESTIONS:
- Does user_request describe this specific story's requirements?
- Are success_criteria measurable and story-specific?
- Does title contain actual role and story description?
- Would this PRB make sense for a different story? (should be NO)
- Can someone execute this PRB without reading the story? (should be YES)

GENERIC CONTENT PATTERNS (BLOCK THESE):
❌ "Generic requirements for this type of work"
❌ "Standard success criteria for implementation"
❌ "TODO: Extract from story"
❌ "Example content to be replaced"
❌ "[PLACEHOLDER] content"

STORY-SPECIFIC PATTERNS (ALLOW THESE):
✅ "Create validation tools for PRB placeholder detection"
✅ "Validation catches unresolved placeholders in final PRBs"
✅ "Integration between template improvements and @PM process"
✅ Content that directly references story requirements
✅ Criteria that are testable and specific to this story
```

### Implementation Behavior
```markdown
AUTHENTICITY VALIDATION BEHAVIORAL PATTERN:
@PM reads story first, understands requirements thoroughly
@PM writes PRB content that directly addresses story needs
@PM avoids generic language and template boilerplate
@PM creates measurable, testable success criteria
@PM validates content would only make sense for this story

AUTHENTICITY ERROR RECOVERY:
Generic content found → Extract specific requirements from story
Template boilerplate found → Replace with story-specific content
Vague criteria found → Create measurable, testable criteria
Copy-paste errors found → Verify content matches this story
```

## Tool 5: Integration Completeness Validation

### Purpose
**Ensure all system improvements work together correctly**

### @PM Behavioral Usage
```markdown
INTEGRATION COMPLETENESS CHECK:
1. Verify simplified template was used (from PRB-001 improvements)
2. Verify systematic process was followed (from PRB-002 improvements)
3. Verify validation caught errors correctly (from PRB-003 improvements)
4. Verify role assignment follows PM+Architect collaboration
5. Verify end-to-end workflow succeeded

INTEGRATION VERIFICATION QUESTIONS:
- Was template loaded from src/prb-templates/ hierarchy?
- Was 5-phase systematic process followed for placeholder resolution?
- Were validation checkpoints used to catch errors early?
- Was PM+Architect collaboration documented for role assignment?
- Is final PRB completely self-contained for subagent execution?

INTEGRATION SUCCESS PATTERNS:
✅ Clear template structure enabled systematic resolution
✅ Systematic process prevented common placeholder errors
✅ Validation checkpoints caught errors at each phase
✅ Role assignment followed two-factor analysis
✅ Final PRB has zero placeholders and complete context
✅ Subagent can execute PRB without additional context
```

### Implementation Behavior
```markdown
INTEGRATION VALIDATION BEHAVIORAL PATTERN:
@PM follows complete integrated workflow
@PM uses templates → systematic process → validation → quality gates
@PM builds habits that integrate all improvements
@PM demonstrates mastery of complete system
@PM can mentor others on integrated approach

INTEGRATION SUCCESS METRICS:
- Template clarity reduces resolution errors
- Systematic process prevents placeholder misses
- Validation provides clear error recovery guidance
- Quality gates ensure self-contained PRBs
- End-to-end workflow is reliable and repeatable
```

## Tool 6: Final Quality Assurance Validation

### Purpose
**Comprehensive final check before PRB creation to ensure 100% quality**

### @PM Behavioral Usage
```markdown
FINAL QA VALIDATION SEQUENCE:
Execute all validation tools in sequence before PRB creation

QA STEP 1: Complete Placeholder Scan
- Run comprehensive search for "[...]" patterns
- Expected result: Zero matches found
- Failure action: BLOCK creation, fix all placeholders

QA STEP 2: Configuration Type Verification  
- Check all config values for proper types
- Expected result: Booleans unquoted, strings quoted, paths absolute
- Failure action: BLOCK creation, fix type errors

QA STEP 3: Content Authenticity Verification
- Compare all content to story requirements
- Expected result: All content story-specific and measurable
- Failure action: BLOCK creation, extract proper story content

QA STEP 4: Integration Completeness Verification
- Verify systematic process was followed
- Expected result: All process phases completed correctly
- Failure action: BLOCK creation, complete missing phases

QA STEP 5: Self-Contained Execution Verification
- Verify PRB can be executed without external context
- Expected result: Complete context embedded in PRB
- Failure action: BLOCK creation, embed missing context

FINAL QA RESULT:
✅ ALL CHECKS PASSED → PRB ready for creation
❌ ANY CHECK FAILED → BLOCK creation, show specific errors
```

### Implementation Behavior
```markdown
FINAL QA BEHAVIORAL PATTERN:
@PM never creates PRB without running complete QA sequence
@PM treats QA validation as mandatory quality gate
@PM fixes ALL errors before attempting PRB creation
@PM builds habit of systematic quality assurance
@PM takes pride in creating perfect, self-contained PRBs

QA SUCCESS METRICS:
- 100% of PRBs pass final QA before creation
- Zero placeholders in any created PRB
- All configuration values properly typed
- All content story-specific and measurable
- Complete integration workflow followed
- Self-contained execution verified
```

## Behavioral Error Recovery Matrix

### Error Type → Tool → Recovery Action

```markdown
PLACEHOLDER ERRORS:
Detection: Tool 1 (Pre-Creation Validation)
Error: "[FROM_CONFIG]" found in final PRB
Recovery: Tool 3 (Configuration Type Validation) → Load from CLAUDE.md
Validation: Tool 6 (Final QA) → Verify fix applied correctly

CONFIGURATION TYPE ERRORS:
Detection: Tool 3 (Configuration Type Validation)  
Error: git_privacy: "true" (quoted boolean)
Recovery: Remove quotes, ensure boolean formatting
Validation: Tool 2 (Progressive Checkpoint) → Verify type correct

CONTENT AUTHENTICITY ERRORS:
Detection: Tool 4 (Content Authenticity Validation)
Error: Generic success criteria found
Recovery: Extract specific criteria from story requirements
Validation: Tool 5 (Integration Completeness) → Verify story-specific

INTEGRATION PROCESS ERRORS:
Detection: Tool 5 (Integration Completeness Validation)
Error: Systematic process not followed
Recovery: Return to appropriate process phase
Validation: Tool 6 (Final QA) → Verify complete workflow
```

## Tool Usage Training Program

### Week 1: Basic Validation Tools
```markdown
TRAINING FOCUS: Learn individual validation tools
PRACTICE: Use Tool 1 (Pre-Creation) with nano templates
SKILL DEVELOPMENT: Automatic placeholder recognition
SUCCESS METRIC: Zero placeholder detection errors

DAY 1: Tool 1 (Pre-Creation Validation) practice
DAY 2: Tool 2 (Progressive Checkpoint) practice  
DAY 3: Tool 3 (Configuration Type) practice
DAY 4: Tool 4 (Content Authenticity) practice
DAY 5: Integration practice with simple stories
```

### Week 2: Advanced Integration
```markdown
TRAINING FOCUS: Combine validation tools with systematic process
PRACTICE: Use all tools with tiny and medium templates
SKILL DEVELOPMENT: Seamless tool integration
SUCCESS METRIC: Error-free PRB creation with complex placeholders

DAY 1: Tool 5 (Integration Completeness) mastery
DAY 2: Tool 6 (Final QA) comprehensive practice
DAY 3: Error recovery matrix training
DAY 4: End-to-end workflow with all tools
DAY 5: Mentor training for teaching others
```

### Week 3: Mastery and Optimization
```markdown
TRAINING FOCUS: Optimize tool usage for efficiency
PRACTICE: Handle complex stories with large templates
SKILL DEVELOPMENT: Expert-level quality assurance
SUCCESS METRIC: Mentor others successfully, contribute improvements

DAY 1: Complex story breakdown with all tools
DAY 2: Error recovery scenario training
DAY 3: Process optimization and efficiency
DAY 4: Quality leadership development
DAY 5: Tool improvement contribution
```

## Success Metrics and Quality Tracking

### Individual @PM Metrics
```markdown
VALIDATION TOOL MASTERY:
- Tool Usage Accuracy: 100% correct tool application
- Error Detection Rate: 100% of placeholder errors caught
- Recovery Speed: <3 minutes per error resolution
- Quality Gate Adherence: 100% QA validation before creation
- Self-Contained PRB Rate: 100% of PRBs executable without context

SKILL DEVELOPMENT TRACKING:
- Week 1: Basic tool competency achieved
- Week 2: Advanced integration mastery demonstrated  
- Week 3: Expert quality leadership and mentoring
- Ongoing: Contribution to tool improvement and optimization
```

### System Quality Metrics
```markdown
VALIDATION SYSTEM EFFECTIVENESS:
- Zero Placeholder Rate: 100% of created PRBs have zero placeholders
- First-Pass Quality Rate: 95%+ PRBs pass all validations on first attempt
- Error Prevention Rate: 90%+ reduction in placeholder-related errors
- Tool Integration Success: 100% of tools work together seamlessly
- Training Effectiveness: 100% of @PM achieve competency within 3 weeks

CONTINUOUS IMPROVEMENT TRACKING:
- Tool usage patterns and optimization opportunities
- Error pattern trends and prevention enhancements
- Training material effectiveness and improvement needs
- @PM feedback on tool usability and clarity
- System reliability and robustness under various conditions
```

## Future Enhancement Integration

### Tool Evolution Patterns
```markdown
VALIDATION TOOL ENHANCEMENT CYCLE:
1. Monitor tool usage patterns and effectiveness
2. Identify common error patterns not caught by current tools
3. Enhance existing tools or create new specialized tools
4. Integrate new tools with existing validation workflow
5. Update training materials and behavioral patterns
6. Measure improvement impact and iterate

FEEDBACK INTEGRATION:
- @PM feedback on tool usability and effectiveness
- Error pattern analysis for tool enhancement opportunities
- Training feedback for skill development optimization
- Quality metrics feedback for continuous improvement
- User experience feedback for workflow enhancement
```

## Integration Success Validation

**COMPREHENSIVE VALIDATION TOOLS SUCCESS:**
- ✅ All validation tools integrate seamlessly with @PM workflow
- ✅ Error detection is automatic and comprehensive
- ✅ Recovery guidance is clear and phase-specific
- ✅ Quality gates prevent PRB creation until standards met
- ✅ Training program builds competency systematically
- ✅ Tools work together to ensure self-contained PRB creation
- ✅ End-to-end validation supports reliable, error-resistant workflow

**SYSTEM INTEGRATION ACHIEVEMENT:**
From: Manual, error-prone PRB creation with inconsistent validation
To: Systematic, validated, quality-assured process with comprehensive error prevention

---
*Comprehensive validation tools for intelligent-claude-code system*