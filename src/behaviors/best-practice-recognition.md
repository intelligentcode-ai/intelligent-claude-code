# Best Practice Recognition

**MANDATORY:** MUST identify successful patterns from operations. Auto-capture best practice candidates.

**PURPOSE:** Recognize successful operational patterns and identify candidates for best practice documentation

## Imports
@./shared-patterns/learning-patterns.md
@./shared-patterns/memory-operations.md
@./best-practice-generation.md

## Core Recognition Principles

**P1:** Success Pattern Detection - Identify operations that achieve objectives efficiently
**P2:** Quality Assessment - Evaluate patterns against effectiveness criteria  
**P3:** Context Preservation - Capture full operational context for patterns
**P4:** User Value Validation - Ensure patterns provide actionable value to users

## Success Pattern Detection

### Git Workflow Recognition
**IDENTIFY WHEN:**
- Complex git operations complete without errors
- Conflict resolution handled cleanly and systematically
- Branch management follows consistent patterns
- Commit histories remain clean and professional

**CAPTURE ELEMENTS:**
- Specific commands used
- Order of operations
- Error handling approaches
- Quality validation steps

**SUCCESS INDICATORS:**
- Zero git errors during complex operations
- Clean commit history maintained
- Professional commit messages
- Successful branch protection compliance

### Implementation Pattern Recognition  
**IDENTIFY WHEN:**
- Multi-file changes coordinated successfully
- Complex refactoring completed without breaking functionality
- Integration between components works seamlessly
- Error handling prevents system failures

**CAPTURE ELEMENTS:**
- File coordination strategies
- Dependency management approaches
- Testing and validation patterns
- Recovery mechanisms used

**SUCCESS INDICATORS:**
- All functional requirements met on first attempt
- No regression issues introduced
- Clean integration between components
- Robust error handling demonstrated

### Problem Resolution Recognition
**IDENTIFY WHEN:**
- Critical issues resolved efficiently
- Root cause analysis leads to permanent fixes
- Solutions prevent recurrence of similar problems
- Recovery strategies minimize impact

**CAPTURE ELEMENTS:**
- Diagnostic approaches used
- Solution strategies applied
- Prevention measures implemented
- Communication patterns followed

**SUCCESS INDICATORS:**
- Problem fully resolved without recurrence
- Solution generalizable to similar issues
- Clear documentation of resolution process
- Stakeholder satisfaction with outcome

### Collaboration Pattern Recognition
**IDENTIFY WHEN:**
- Multi-role coordination achieves complex objectives
- Communication flows enable effective decision-making
- Knowledge transfer occurs successfully between specialists
- Team productivity increases through coordination

**CAPTURE ELEMENTS:**
- Role interaction patterns
- Decision-making processes
- Information sharing mechanisms
- Coordination timing and sequencing

**SUCCESS INDICATORS:**
- Complex objectives achieved through collaboration
- All roles contribute effectively to outcomes
- Knowledge gaps filled through team interaction
- Sustainable working relationships established

## Pattern Quality Assessment

### Effectiveness Criteria
**EVALUATE PATTERNS AGAINST:**
- **Reliability:** Does the pattern consistently produce desired outcomes?
- **Efficiency:** Does the pattern achieve objectives with minimal waste?
- **Scalability:** Can the pattern be applied to similar situations?
- **Maintainability:** Is the pattern sustainable over time?
- **Transferability:** Can others successfully apply this pattern?

### Context Validation
**VERIFY PATTERN CONTEXT:**
- **Scope Clarity:** Clear boundaries for pattern application
- **Prerequisites:** Required conditions for pattern success
- **Constraints:** Limitations and edge cases identified
- **Environment:** System and organizational context documented

### Impact Assessment
**MEASURE PATTERN VALUE:**
- **Outcome Quality:** Superior results compared to alternatives
- **Time Savings:** Reduced effort for similar future operations
- **Error Reduction:** Lower failure rates when pattern applied
- **Knowledge Value:** Educational benefit for team members

## Recognition Triggers

### Automatic Detection Points
**MONITOR FOR:**
- PRB execution completion with all success criteria met
- Complex operations that exceed expected quality standards
- Error recovery that prevents system degradation
- Innovation that solves previously unsolved problems

### Manual Recognition Requests
**RESPOND TO:**
- User requests: "Document this as best practice"
- Team observations: "This approach worked really well"
- Post-mortem insights: "We should capture this pattern"
- Training needs: "Others should learn this approach"

### Pattern Consolidation Opportunities
**IDENTIFY WHEN:**
- Multiple similar operations use consistent approaches
- Informal knowledge sharing reveals common patterns
- Error patterns suggest need for preventive practices
- Success patterns emerge from operational data

## Context Preservation Requirements

### Operation Documentation
**CAPTURE COMPLETELY:**
- **Initial State:** System condition before operation
- **Objective:** What was trying to be achieved
- **Process:** Step-by-step approach taken
- **Outcome:** Final result and quality validation
- **Environment:** Tool versions, configurations, constraints

### Decision Rationale
**DOCUMENT REASONING:**
- **Alternative Options:** Other approaches considered
- **Selection Criteria:** Why this approach was chosen
- **Trade-offs:** Benefits and costs of the decision
- **Risk Assessment:** Potential issues and mitigation
- **Success Factors:** Critical elements for pattern success

### Learning Extraction
**IDENTIFY INSIGHTS:**
- **Key Innovations:** Novel elements of the approach
- **Critical Success Factors:** Elements essential for success
- **Common Pitfalls:** Mistakes to avoid when applying pattern
- **Adaptation Guidelines:** How to modify for different contexts
- **Quality Indicators:** Signs of successful pattern application

## Integration Points

### With Memory System
**COORDINATE WITH:**
- Search existing memory for similar patterns
- Store pattern candidates in memory/best-practices/
- Link to related learning entities
- Update memory indices with pattern references

### With PRB System
**ENHANCE BY:**
- Recognizing patterns during PRB execution
- Capturing successful PRB completion approaches
- Identifying effective role coordination methods
- Documenting successful complexity management strategies

### With Learning System
**INTEGRATE WITH:**
- Apply learning forgiveness logic to pattern recognition
- Store recognition patterns in learning entities
- Track pattern effectiveness over time
- Link recognition to error prevention strategies

## Recognition Output Format

### Pattern Candidate Structure
```markdown
## BEST PRACTICE CANDIDATE IDENTIFIED
**Pattern Name:** [Descriptive name for the pattern]
**Category:** [Git/Implementation/Problem-Resolution/Collaboration]
**Success Context:** [Brief description of successful operation]
**Quality Score:** [Assessment against effectiveness criteria]
**Recommendation:** [Approve/Refine/Archive]

### Pattern Summary
- **Problem:** [What challenge this pattern addresses]
- **Approach:** [High-level description of the solution]
- **Outcome:** [Results achieved through pattern application]
- **Value:** [Why this pattern should be documented]

### Evidence
- **Operation ID:** [PRB or operation reference]
- **Success Metrics:** [Quantifiable success indicators]
- **Quality Validation:** [Evidence of effectiveness]
- **Context Factors:** [Situational elements for success]
```

### User Presentation Format
```markdown
## 🎯 BEST PRACTICE IDENTIFIED

I've identified a successful pattern from recent operations that could be valuable as a documented best practice:

**Pattern:** [Name]
**Category:** [Type]
**Value:** [Why this is worth documenting]

**Summary:** [2-3 sentences describing the pattern]

**Would you like me to:**
1. **Generate** a full best practice document
2. **Refine** the pattern identification first  
3. **Archive** for future consideration
4. **Skip** - not valuable as documented practice

Please let me know your preference.
```

## Quality Gates

### Recognition Accuracy
**VALIDATE BEFORE PRESENTING:**
- Pattern is genuinely successful (not just completed)
- Pattern provides actionable value to future operations
- Pattern context is sufficiently complete for documentation
- Pattern aligns with project objectives and constraints

### User Value Assessment
**ENSURE PATTERNS:**
- Solve real problems faced by team members
- Provide clear guidance for similar situations
- Reduce learning curve for complex operations
- Contribute to overall operational excellence

### Documentation Readiness
**VERIFY PATTERNS HAVE:**
- Sufficient detail for effective documentation
- Clear success criteria and quality indicators
- Well-defined scope and applicability boundaries
- Actionable steps and guidance for application

## Error Handling

### False Positive Management
**WHEN PATTERNS FAIL VALIDATION:**
- Document why pattern was rejected
- Store rejection rationale in memory
- Improve recognition criteria based on feedback
- Avoid re-presenting similar patterns

### Context Insufficiency
**WHEN CONTEXT IS INCOMPLETE:**
- Request additional context from operation history
- Search memory for similar pattern contexts
- Ask user for clarification on missing elements
- Archive pattern for future context gathering

### User Feedback Integration
**WHEN USER FEEDBACK RECEIVED:**
- Update recognition criteria based on preferences
- Adjust quality thresholds per user guidance
- Store feedback patterns for future recognition
- Improve presentation formats based on usage

---
*Best practice recognition behavior for intelligent-claude-code system*