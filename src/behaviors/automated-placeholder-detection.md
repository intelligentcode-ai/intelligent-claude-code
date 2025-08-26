# Automated Placeholder Detection Behavior

**MANDATORY:** Behavioral patterns for automatic detection and prevention of unresolved placeholders in PRB creation.

**PURPOSE:** Provide @PM with behavioral patterns that automatically detect placeholder resolution failures and guide systematic correction.

## Core Detection Principle

**PLACEHOLDER DETECTION AS BEHAVIORAL HABIT**: Transform @PM behavior from manual checking to automatic pattern recognition that prevents placeholder errors before PRB creation.

## Detection Behavioral Patterns

### Pattern 1: Visual Pattern Recognition Training
**BEHAVIORAL GOAL:** Train @PM to automatically recognize placeholder patterns

**@PM VISUAL RECOGNITION TRAINING:**
```markdown
PLACEHOLDER PATTERN SIGNATURES:
✅ LEARN TO AUTOMATICALLY SPOT:
- "[ANYTHING_IN_BRACKETS]" - Universal placeholder pattern
- "[FROM_CONFIG]" - Configuration not loaded
- "[PROJECT_ROOT]" - Path not resolved  
- "[USER_REQUEST]" - Story not extracted
- "[ROLE]" - Role not assigned
- "[CURRENT_DATE]" - Date not generated
- "[SYSTEM_NATURE]" - System not analyzed

❌ THESE ARE BLOCKING PATTERNS - NEVER ALLOW IN FINAL PRB
🔄 EACH PATTERN HAS SPECIFIC RECOVERY ACTION
```

### Pattern 2: Progressive Scanning Behavior
**BEHAVIORAL GOAL:** Build systematic scanning habits into @PM workflow

**@PM SCANNING SEQUENCE:**
```markdown
SCAN 1: Template Loading Check
- Load template from src/prb-templates/
- BEHAVIOR: Automatically scan for ALL "[...]" patterns
- COUNT: How many placeholders need resolution
- CREATE: Resolution checklist with ☐ for each placeholder

SCAN 2: After Each Placeholder Resolution
- Complete one placeholder resolution
- BEHAVIOR: Immediately scan that section for remaining placeholders
- VERIFY: Placeholder actually replaced with real value
- UPDATE: Mark ☑ on resolution checklist

SCAN 3: Section Completion Check  
- Complete metadata section (ids, dates, roles)
- BEHAVIOR: Scan entire section for any remaining placeholders
- VERIFY: All section placeholders resolved
- ADVANCE: Only move to next section when current is clean

SCAN 4: Final PRB Completion Check
- All sections completed
- BEHAVIOR: Full PRB scan for ANY remaining placeholder patterns
- VERIFY: Zero "[...]" patterns in entire PRB
- BLOCK: Cannot create PRB file until zero placeholders
```

### Pattern 3: Configuration Value Recognition Behavior
**BEHAVIORAL GOAL:** Train @PM to recognize actual vs placeholder configuration values

**@PM CONFIGURATION RECOGNITION TRAINING:**
```markdown
LEARN TO DISTINGUISH:

❌ PLACEHOLDER VALUES (BLOCK THESE):
- git_privacy: "[FROM_CONFIG]"
- branch_protection: "[FROM_CONFIG]"  
- default_branch: "[FROM_CONFIG]"
- project_root: "[PROJECT_ROOT]"

✅ ACTUAL VALUES (ALLOW THESE):
- git_privacy: true (boolean)
- git_privacy: false (boolean)
- branch_protection: true (boolean)
- branch_protection: false (boolean)
- default_branch: "main" (string)
- default_branch: "master" (string)
- project_root: "/Users/username/project" (absolute path)

@PM BEHAVIORAL PATTERN:
1. Look at each configuration line
2. Check if value is in quotes with brackets "[FROM_CONFIG]"
3. If YES: STOP - must load actual value from CLAUDE.md
4. If NO: Verify it's correct boolean or string type
5. Only proceed when all configs are actual values
```

### Pattern 4: Story Content Authenticity Detection
**BEHAVIORAL GOAL:** Train @PM to distinguish template content from story-specific content

**@PM CONTENT AUTHENTICITY TRAINING:**
```markdown
TEMPLATE CONTENT PATTERNS (BLOCK THESE):
❌ user_request: "[USER_REQUEST]"
❌ success_criteria: "Generic success criteria"
❌ title: "[ROLE] [DESCRIPTION]"
❌ feature_boundary: "[WHAT_IS_INCLUDED]"

STORY-SPECIFIC CONTENT PATTERNS (ALLOW THESE):
✅ user_request: "Create validation tools for PRB placeholder detection"
✅ success_criteria: ["Validation catches unresolved placeholders", "Clear error messages guide @PM"]
✅ title: "[AI-Engineer] Create Validation Tools and Integrate Template Improvements"
✅ feature_boundary: "Validation tools and integration - excludes execution engine changes"

@PM BEHAVIORAL PATTERN:
1. Read each content field carefully
2. Ask: "Is this specific to the story I'm working on?"
3. If generic/template language: STOP - extract from actual story
4. If story-specific: Verify it matches story requirements
5. Only proceed when all content is story-authentic
```

## Automated Detection Tools (Behavioral)

### Tool 1: Placeholder Counter Behavior
**@PM BEHAVIORAL TOOL:**
```markdown
PLACEHOLDER COUNTING TECHNIQUE:
1. Open PRB file in editor
2. Use search function: search for "[" character
3. Count how many matches found
4. Each match should be investigated
5. Goal: Reduce count to ZERO before PRB creation

EXPECTED RESULTS BY PHASE:
- Template Loading: 15-20 placeholders (normal)
- After Metadata: 10-15 placeholders (good progress)
- After Configuration: 5-10 placeholders (getting close)
- After Story Content: 0-3 placeholders (almost done)
- Final Validation: 0 placeholders (ready for creation)
```

### Tool 2: Configuration Type Checker Behavior
**@PM BEHAVIORAL TOOL:**
```markdown
CONFIGURATION TYPE CHECK TECHNIQUE:
1. Find git_privacy line in PRB
2. Check value: should be true or false (no quotes)
3. Find branch_protection line in PRB  
4. Check value: should be true or false (no quotes)
5. Find default_branch line in PRB
6. Check value: should be "main" or "master" (quoted string)
7. Find project_root line in PRB
8. Check value: should start with "/" (absolute path)

BEHAVIORAL CHECK SEQUENCE:
For each config line:
- Does it contain "[FROM_CONFIG]"? → BLOCK: Load from CLAUDE.md
- Is boolean value quoted? → BLOCK: Remove quotes for boolean
- Is string value unquoted? → BLOCK: Add quotes for string
- Is path relative? → BLOCK: Convert to absolute path
```

### Tool 3: Content Authenticity Checker Behavior
**@PM BEHAVIORAL TOOL:**
```markdown
CONTENT AUTHENTICITY CHECK TECHNIQUE:
1. Find user_request section
2. Read content carefully
3. Ask: "Does this describe the specific story requirements?"
4. If too generic: STOP - extract from story file

5. Find success_criteria section
6. Read each criterion
7. Ask: "Is this measurable and specific to this story?"
8. If generic: STOP - create story-specific criteria

9. Find title field
10. Check format: "[Role] Specific Description"
11. Ask: "Does description match this story?"
12. If template boilerplate: STOP - customize for story

BEHAVIORAL AUTHENTICATION SEQUENCE:
For each content section:
- Read story file first to understand requirements
- Compare PRB content to story requirements
- Verify PRB content is specific and measurable
- Ensure no template boilerplate remains
```

## Error Recovery Behavioral Patterns

### Recovery Pattern 1: Configuration Placeholder Recovery
**WHEN DETECTED:** "[FROM_CONFIG]" found in PRB
**@PM RECOVERY BEHAVIOR:**
```markdown
IMMEDIATE ACTIONS:
1. STOP further placeholder resolution
2. Open project CLAUDE.md file
3. Find configuration section
4. Look for git_privacy: value (extract actual boolean)
5. Look for branch_protection: value (extract actual boolean)
6. Look for default_branch: value (extract actual string)
7. Return to PRB and replace ALL "[FROM_CONFIG]" with actual values
8. Re-scan to verify no "[FROM_CONFIG]" remains
9. Continue with next placeholder type
```

### Recovery Pattern 2: Project Context Placeholder Recovery
**WHEN DETECTED:** "[PROJECT_ROOT]" or "[SYSTEM_NATURE]" found in PRB
**@PM RECOVERY BEHAVIOR:**
```markdown
PROJECT ROOT RECOVERY:
1. STOP further placeholder resolution
2. Determine absolute path to project root
3. Use command: git rev-parse --show-toplevel
4. Replace "[PROJECT_ROOT]" with absolute path
5. Verify path starts with "/"

SYSTEM NATURE RECOVERY:
1. Count .md files in project (especially in behaviors/)
2. Count code files (.js, .py, .java, etc.)
3. Apply decision logic:
   - Many .md + behaviors/ = "MARKDOWN-BASED AI-AGENTIC SYSTEM"
   - More code than markdown = "CODE-BASED SYSTEM"
   - Mixed = "HYBRID SYSTEM"
4. Replace "[SYSTEM_NATURE]" with classification
5. Verify classification makes sense for project
```

### Recovery Pattern 3: Story Content Placeholder Recovery
**WHEN DETECTED:** "[USER_REQUEST]" or generic content found in PRB
**@PM RECOVERY BEHAVIOR:**
```markdown
USER REQUEST RECOVERY:
1. STOP further placeholder resolution
2. Open parent story file
3. Read entire story carefully
4. Extract main user requirement/request
5. Replace "[USER_REQUEST]" with actual story requirement
6. Verify content is specific to this story

SUCCESS CRITERIA RECOVERY:
1. Analyze story requirements
2. Create 2-4 specific, measurable success criteria
3. Each criterion should be testable
4. Replace generic criteria with story-specific ones
5. Verify criteria match story goals
```

### Recovery Pattern 4: Role Assignment Placeholder Recovery
**WHEN DETECTED:** "[ROLE]" found or missing collaboration documentation
**@PM RECOVERY BEHAVIOR:**
```markdown
ROLE ASSIGNMENT RECOVERY:
1. STOP further placeholder resolution
2. Analyze system nature (from step 2)
3. Analyze work type (implementation, security, database, etc.)
4. Collaborate with appropriate domain architect
5. Apply two-factor analysis for role selection
6. Document collaboration rationale in PRB
7. Replace "[ROLE]" with assigned role
8. Add collaboration documentation section
```

## Quality Assurance Behavioral Patterns

### QA Pattern 1: Progressive Quality Gates
**@PM QUALITY BEHAVIOR:**
```markdown
GATE 1: Template Loading Quality
- Template loaded from src/prb-templates/ ✅
- All placeholders identified and counted ✅
- Resolution checklist created ✅
- ADVANCE ONLY IF: All placeholders catalogued

GATE 2: Configuration Resolution Quality
- All "[FROM_CONFIG]" replaced with actual values ✅
- Boolean values are true/false (not quoted) ✅
- String values are properly quoted ✅
- Project root is absolute path ✅
- ADVANCE ONLY IF: Zero configuration placeholders

GATE 3: Story Content Resolution Quality  
- All "[USER_REQUEST]" replaced with story requirements ✅
- Success criteria are story-specific and measurable ✅
- Title contains actual role and description ✅
- All content is authentic to this story ✅
- ADVANCE ONLY IF: Zero content placeholders

GATE 4: Final Quality Validation
- Zero "[...]" patterns in entire PRB ✅
- All configurations are actual values ✅
- All content is story-specific ✅
- System nature properly classified ✅
- Role assignment documented ✅
- ADVANCE ONLY IF: 100% quality validation passed
```

### QA Pattern 2: Error Prevention Habits
**@PM ERROR PREVENTION TRAINING:**
```markdown
HABIT 1: Never Fill Placeholders Individually
- Don't resolve one placeholder and move on
- Always scan entire section after each change
- Multiple placeholders often reference same data source
- Batch resolution by data source reduces errors

HABIT 2: Always Verify Data Source First
- Before filling any placeholder, gather all needed data
- Load CLAUDE.md once, extract all config values
- Read story file once, extract all requirements
- Prepare all data, then do systematic replacement

HABIT 3: Use Checkpoints, Not Final Validation
- Don't wait until end to check for errors
- Validate after each major section completion
- Catch errors early when they're easier to fix
- Build quality in, don't inspect it in

HABIT 4: Document Your Process
- Note which data source you used for each placeholder
- Keep track of decisions made during resolution
- Document collaboration with architects
- Create paper trail for quality assurance
```

## Training and Skill Development

### Beginner @PM Training Pattern
```markdown
WEEK 1: Placeholder Recognition
- Practice identifying all placeholder patterns
- Master visual scanning techniques
- Learn to count placeholders accurately
- Develop automatic recognition habits

WEEK 2: Configuration Resolution
- Master CLAUDE.md parsing
- Practice boolean vs string value handling
- Learn project root path resolution
- Develop systematic config loading habits

WEEK 3: Story Content Resolution
- Practice story requirement extraction
- Master success criteria creation
- Learn content authenticity checking
- Develop story-specific content habits

WEEK 4: Integration and Quality
- Master end-to-end placeholder resolution
- Practice error recovery for all error types
- Learn quality gate enforcement
- Develop systematic validation habits
```

### Advanced @PM Training Pattern
```markdown
ADVANCED SKILL 1: Complex System Analysis
- Master system nature classification for complex projects
- Handle hybrid systems requiring joint analysis
- Manage multi-domain architectures
- Guide domain specialist creation

ADVANCED SKILL 2: Quality Mentoring
- Review other @PM placeholder resolution work
- Provide feedback on common error patterns
- Guide junior @PM through recovery processes
- Develop quality culture across team

ADVANCED SKILL 3: Process Optimization
- Identify common placeholder resolution bottlenecks
- Optimize data gathering efficiency
- Streamline validation checkpoints
- Contribute to behavioral pattern improvements
```

## Success Metrics and Monitoring

### Individual @PM Metrics
- **Placeholder Resolution Accuracy:** % of PRBs created without placeholder errors
- **First-Pass Quality Rate:** % of PRBs that pass validation on first attempt
- **Error Recovery Time:** Average time to resolve validation errors
- **Template Mastery:** Successful use of all template complexity levels

### System-Wide Quality Metrics
- **Zero Placeholder Rate:** % of PRBs with zero unresolved placeholders
- **Self-Contained Rate:** % of PRBs executable without runtime config
- **Validation Pass Rate:** % of PRBs passing automated validation
- **Error Prevention Rate:** Reduction in placeholder-related errors over time

## Integration with Existing Behaviors

### Integration with prb-creation-mandates.md
- Placeholder detection patterns integrate with systematic resolution process
- Error recovery patterns align with 5-phase process
- Quality gates support template enforcement requirements

### Integration with story-breakdown.md
- Detection patterns support @PM story breakdown workflow
- Quality assurance patterns ensure story-specific content
- Training patterns build @PM expertise in story analysis

### Integration with prb-validation-integration.md
- Detection patterns provide foundation for comprehensive validation
- Behavioral tools support automated validation goals
- Quality metrics align with integration success criteria

---
*Automated placeholder detection behavioral patterns for intelligent-claude-code system*