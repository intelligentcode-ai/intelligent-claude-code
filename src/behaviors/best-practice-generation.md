# Best Practice Generation

**MANDATORY:** MUST generate structured best practice documents. Auto-format and validate documentation.

**PURPOSE:** Generate comprehensive best practice documents from recognized successful patterns

## Imports
@./shared-patterns/learning-patterns.md
@./shared-patterns/memory-operations.md
@./best-practice-recognition.md

## Core Generation Principles

**P1:** Structured Documentation - Generate consistent, actionable documentation
**P2:** Context Completeness - Include all necessary context for pattern application
**P3:** User Approval Workflow - Present for approval before finalizing
**P4:** Quality Assurance - Validate generated content meets documentation standards

## Document Generation Process

### Template-Based Generation
**USE TEMPLATE STRUCTURE:**
- Load template from best-practices/TEMPLATE.md
- Replace placeholders with pattern-specific content
- Apply consistent formatting and style
- Validate completeness against template requirements

**GENERATION SEQUENCE:**
1. **Load Pattern Data:** Extract all recognized pattern information
2. **Apply Template:** Replace template placeholders with pattern content
3. **Enhance Content:** Add examples, context, and guidance
4. **Validate Quality:** Check against documentation standards
5. **Present for Approval:** Show generated document to user
6. **Finalize:** Store approved document in best-practices/

### Content Development

#### Problem Statement Generation
**CREATE CLEAR PROBLEM DESCRIPTION:**
- Describe the challenge this practice addresses
- Explain why the problem is significant
- Provide context for when problem typically occurs
- Link to common symptoms and indicators

**TEMPLATE SECTION:**
```markdown
## Problem Statement
This practice addresses [specific challenge] that occurs when [context/situation].

### Symptoms
- [Observable indicator 1]
- [Observable indicator 2]
- [Common failure pattern]

### Impact
Without this practice, teams typically experience [consequences].
```

#### Solution Documentation
**DOCUMENT COMPLETE SOLUTION:**
- Step-by-step approach with clear instructions
- Decision points and alternative paths
- Quality checkpoints and validation steps
- Error handling and recovery procedures

**TEMPLATE SECTION:**
```markdown
## Solution Approach

### Overview
[High-level description of the solution approach]

### Steps
1. **[Step Name]:** [Detailed instruction]
   - Validation: [How to verify step completion]
   - If problems: [Recovery approach]

2. **[Step Name]:** [Detailed instruction]
   - Prerequisites: [What must be in place]
   - Expected outcome: [What should result]

### Quality Gates
- [ ] [Critical validation point 1]
- [ ] [Critical validation point 2]
```

#### Example Generation
**PROVIDE CONCRETE EXAMPLES:**
- Real scenarios from pattern recognition
- Command examples with expected outputs
- Before/after comparisons showing improvement
- Common variations and adaptations

**TEMPLATE SECTION:**
```markdown
## Examples

### Scenario 1: [Specific Context]
**Situation:** [Description of when to apply]
**Application:** 
```bash
[Specific commands or steps]
```
**Outcome:** [Expected results]

### Scenario 2: [Different Context]
[Additional example showing pattern flexibility]
```

#### Context and Constraints
**DOCUMENT APPLICABILITY:**
- When this practice should be used
- Prerequisite conditions for success
- Environmental constraints and requirements
- Situations where practice may not apply

**TEMPLATE SECTION:**
```markdown
## When to Use

### Ideal Conditions
- [Condition 1 for optimal application]
- [Condition 2 for success]

### Prerequisites
- [Required tool/knowledge/permission]
- [System state requirement]

### Not Recommended When
- [Situation where practice doesn't apply]
- [Constraint that prevents effective use]
```

## User Approval Workflow

### Presentation Process
**PRESENT GENERATED DOCUMENT:**
1. **Summary Display:** Show pattern name, category, and value proposition
2. **Document Preview:** Display generated content with clear formatting
3. **Approval Options:** Provide clear choices for user response
4. **Modification Support:** Enable user editing and refinement
5. **Storage Confirmation:** Confirm final document storage

### User Interaction Patterns

#### Initial Presentation
```markdown
## 📄 BEST PRACTICE DOCUMENT GENERATED

**Practice:** [Name]
**Category:** [Category]
**From Operation:** [Source PRB/Operation]

### Generated Document Preview:
[Display formatted document]

### Review Options:
1. **✅ Approve** - Store as-is in best-practices/
2. **✏️ Modify** - Edit content before storing  
3. **🔄 Regenerate** - Create new version with different approach
4. **❌ Reject** - Don't create this best practice

What would you like to do?
```

#### Modification Workflow
**WHEN USER SELECTS MODIFY:**
1. Present editable sections with clear boundaries
2. Accept user modifications to specific sections
3. Validate modified content against template requirements
4. Re-present modified document for final approval
5. Store approved version with user modifications noted

#### Regeneration Process
**WHEN USER REQUESTS REGENERATION:**
1. Ask for specific guidance on different approach
2. Apply alternative generation strategies
3. Use different emphasis or examples
4. Present alternative version for comparison
5. Allow selection between versions

### Approval Validation

#### Content Quality Checks
**VALIDATE BEFORE STORAGE:**
- All template sections completed appropriately
- Examples are relevant and actionable
- Instructions are clear and unambiguous
- Context and constraints accurately described

#### Naming and Categorization
**ENSURE PROPER CLASSIFICATION:**
- Practice name is descriptive and unique
- Category matches content type and scope
- File naming follows project conventions
- Directory placement is appropriate

#### Integration Verification
**CONFIRM SYSTEM INTEGRATION:**
- Document discoverable by PRB system
- Format compatible with search and embedding
- Links and references work correctly
- Version control integration maintained

## Document Enhancement

### Automatic Enhancement Features

#### Cross-Reference Generation
**ADD RELEVANT LINKS:**
- Reference related best practices
- Link to source operations and PRBs
- Connect to memory entities and learnings
- Include external documentation references

#### Quality Indicators
**INCLUDE SUCCESS METRICS:**
- Define measurable success criteria
- Provide quality assessment guidelines
- Include common failure modes and prevention
- Add effectiveness tracking suggestions

#### Adaptation Guidance
**SUPPORT CUSTOMIZATION:**
- Explain how to adapt for different contexts
- Provide variation examples for different scenarios
- Include scaling considerations for larger operations
- Document known limitations and workarounds

### Template-Driven Enhancement
**APPLY CONSISTENT IMPROVEMENTS:**
- Standard formatting and typography
- Consistent section organization
- Professional documentation style
- Integration with project documentation patterns

## Storage and Organization

### File Naming Conventions
**GENERATE COMPLIANT NAMES:**
- Format: `[category]-[descriptive-name].md`
- Examples: `git-conflict-resolution.md`, `multi-role-coordination.md`
- Avoid spaces, use hyphens for separation
- Ensure names are descriptive and searchable

### Directory Placement
**ORGANIZE BY CATEGORY:**
- `best-practices/git/` - Git workflow practices
- `best-practices/implementation/` - Code and implementation practices  
- `best-practices/collaboration/` - Team coordination practices
- `best-practices/problem-resolution/` - Issue resolution practices
- `best-practices/architecture/` - Design and architecture practices

### Metadata Integration
**ADD DOCUMENT METADATA:**
```yaml
---
category: git
tags: [conflict-resolution, branching, collaboration]
created: 2025-08-09
source_operation: STORY-001-PRB-002
quality_score: 8.5
usage_count: 0
effectiveness_rating: unrated
---
```

## Quality Assurance

### Document Validation

#### Completeness Verification
**CHECK ALL SECTIONS:**
- Problem statement clearly describes challenge
- Solution provides step-by-step guidance
- Examples demonstrate practical application
- Context explains when and how to use

#### Accuracy Assessment
**VALIDATE CONTENT ACCURACY:**
- Instructions match successful pattern execution
- Examples reflect real operational contexts
- Quality gates align with success criteria
- Constraints accurately represent limitations

#### Usability Testing
**ENSURE PRACTICAL VALUE:**
- Instructions are actionable by intended users
- Examples provide sufficient detail for replication
- Language is clear and unambiguous
- Format supports quick reference and application

### Continuous Improvement

#### Feedback Integration
**INCORPORATE USER FEEDBACK:**
- Track document usage and effectiveness
- Update content based on application experience
- Refine instructions based on user questions
- Enhance examples with additional scenarios

#### Pattern Evolution
**UPDATE FOR CHANGING CONTEXTS:**
- Modify practices as tools and environments evolve
- Add new examples from recent successful operations
- Update constraints based on system changes
- Enhance with learnings from pattern application

## Integration Points

### With Recognition System
**COORDINATE GENERATION WITH:**
- Receive pattern candidates from recognition system
- Access complete context from pattern analysis
- Validate pattern quality meets generation standards
- Confirm pattern readiness for documentation

### With PRB System
**SUPPORT PRB OPERATIONS:**
- Generate practices that PRBs can search and embed
- Create documentation format compatible with PRB needs
- Provide practices that enhance PRB execution quality
- Track practice usage across PRB operations

### With Memory System
**ENHANCE MEMORY INTEGRATION:**
- Store generated practices as memory entities
- Link practices to source operations and learnings
- Create relationships between practices and patterns
- Index practices for efficient search and retrieval

### With Learning System
**SUPPORT CONTINUOUS LEARNING:**
- Document practices that prevent repeated errors
- Create practices that capture successful innovations
- Generate practices that improve operational efficiency
- Track practice effectiveness and refinement needs

## Error Handling

### Generation Failures
**WHEN GENERATION FAILS:**
- Identify missing pattern information
- Request additional context from recognition system
- Provide clear error messages to user
- Offer alternative generation approaches

### User Rejection Recovery
**WHEN PRACTICES ARE REJECTED:**
- Store rejection rationale for learning
- Update recognition criteria to avoid similar patterns
- Offer to modify recognition thresholds
- Archive pattern for future consideration

### Quality Issues
**WHEN QUALITY DOESN'T MEET STANDARDS:**
- Identify specific quality gaps
- Request additional pattern context
- Apply enhanced generation techniques
- Present improved version for approval

## Performance Optimization

### Generation Efficiency
**OPTIMIZE DOCUMENT CREATION:**
- Cache template structures for reuse
- Pre-populate common pattern elements
- Streamline user approval workflow
- Minimize regeneration cycles

### Content Quality
**ENSURE HIGH-QUALITY OUTPUT:**
- Apply consistent style and formatting
- Validate against documentation standards
- Cross-check examples for accuracy
- Verify all template sections completed

---
*Best practice generation behavior for intelligent-claude-code system*