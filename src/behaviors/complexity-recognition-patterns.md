# Complexity Recognition Patterns

**MANDATORY:** Automatically detect complexity levels that require structured thinking approaches. Trigger appropriate thinking modes based on problem characteristics.

**PURPOSE:** Provide systematic complexity assessment and thinking mode selection for main agent role operations

## Core Principle: Complexity-Appropriate Response

**FUNDAMENTAL RULE:** Problem complexity determines thinking approach intensity.

## Complexity Assessment Framework

### Complexity Indicators

#### High Complexity Triggers (MANDATORY Structured Thinking)
**AUTOMATIC ULTRATHINKING ACTIVATION:**

1. **Multi-Domain Integration**
   - Affects 3+ system components simultaneously
   - Crosses architectural boundaries (UI, API, database, infrastructure)
   - Requires coordination between multiple specialist domains
   - Example: Authentication system spanning frontend, backend, database, and security

2. **Strategic Decision Points**
   - Technology stack selection with long-term implications
   - Architectural pattern adoption affecting system scalability
   - Process changes impacting entire team workflow
   - Example: Choosing between microservices vs monolithic architecture

3. **High-Stakes Changes**
   - Security-critical implementations
   - Performance-critical optimizations with system-wide impact
   - Data migration affecting production systems
   - Example: Database schema changes affecting existing data

4. **Novel Problem Domains**
   - First-time implementation of new technology
   - Unprecedented integration requirements
   - Custom solutions for unique business needs
   - Example: Integrating AI agents with existing legacy systems

5. **Ambiguous Requirements**
   - Conflicting stakeholder needs requiring reconciliation
   - Unclear success criteria requiring definition
   - Multiple valid approaches with non-obvious trade-offs
   - Example: Balancing security requirements with user experience

#### Medium Complexity Triggers (RECOMMENDED Sequential Thinking)
**AUTOMATIC SEQUENTIAL THINKING ACTIVATION:**

1. **Standard Multi-Step Processes**
   - Well-defined workflows with clear dependencies
   - Established patterns requiring systematic application
   - Multi-file modifications with coordination needs
   - Example: Standard CRUD implementation following established patterns

2. **Known Trade-off Scenarios**
   - Performance vs memory usage decisions
   - Flexibility vs simplicity architectural choices
   - Development speed vs code quality trade-offs
   - Example: Choosing between different caching strategies

3. **Moderate Integration Requirements**
   - Connecting 2-3 existing system components
   - API integration with standard protocols
   - Database relationship modifications
   - Example: Adding new API endpoint with database integration

#### Low Complexity (OPTIONAL Thinking Enhancement)
**SIMPLE SYSTEMATIC CHECK:**

1. **Single-Domain Changes**
   - Isolated component modifications
   - Bug fixes with clear root causes
   - Documentation updates
   - Example: Fixing typos in user interface text

2. **Established Patterns**
   - Following existing code conventions
   - Using well-documented frameworks
   - Implementing standard configurations
   - Example: Adding new validation rule following existing pattern

## Complexity Detection Algorithm

### Automated Complexity Scoring

**COMPLEXITY CALCULATION:**
```markdown
Base Score = 0
+ Multi-domain impact: +3 points per domain
+ Novel technology: +4 points
+ Security implications: +3 points  
+ Performance criticality: +2 points
+ Ambiguous requirements: +3 points
+ Integration complexity: +2 points per integration
+ Stakeholder count: +1 point per stakeholder
+ Risk level (1-5): +risk_level points

TOTAL COMPLEXITY SCORE determines thinking mode:
- 0-3 points: Optional thinking enhancement
- 4-8 points: Sequential thinking recommended  
- 9+ points: Ultrathinking mandatory
```

### Context-Aware Assessment

**PROJECT CONTEXT MODIFIERS:**
- **AI-Agentic Systems**: +2 points for behavioral pattern changes
- **Production Systems**: +3 points for any modification
- **Team Size >5**: +1 point for coordination complexity
- **External Dependencies**: +2 points per external service
- **Regulatory Compliance**: +4 points for compliance requirements

### Decision Point Recognition

**KEY DECISION MOMENTS** requiring complexity assessment:

1. **@PM Story Breakdown**
   - Analyze story complexity before PRB creation
   - Assess decomposition strategy requirements
   - Evaluate role assignment complexity

2. **@Architect Technology Decisions**
   - Evaluate architectural pattern selection
   - Assess integration complexity and implications
   - Analyze scalability and performance requirements

3. **Specialist Creation Decisions**  
   - Assess domain expertise requirements
   - Evaluate specialist vs existing role trade-offs
   - Analyze long-term project needs

4. **PRB Decomposition**
   - Evaluate optimal PRB size and structure
   - Assess coordination requirements between PRBs
   - Analyze dependency complexity

## Thinking Mode Activation Patterns

### Ultrathinking Activation
**WHEN:** Complexity score 9+ or critical decision indicators present

**ACTIVATION PATTERN:**
```markdown
<thinking>
Critical decision analysis required:

1. PROBLEM SPACE ANALYSIS
   - Core challenge definition
   - Constraint identification  
   - Success criteria clarification
   - Risk assessment

2. SOLUTION SPACE EXPLORATION
   - Option generation (aim for 3+ alternatives)
   - Feasibility assessment for each option
   - Resource requirement analysis
   - Risk-benefit evaluation

3. DECISION FRAMEWORK APPLICATION
   - Criteria weighting based on project priorities
   - Option scoring against criteria
   - Sensitivity analysis for key assumptions
   - Scenario planning for different outcomes

4. IMPLEMENTATION STRATEGY
   - Detailed approach for selected solution
   - Risk mitigation strategies
   - Success metrics and monitoring
   - Rollback plans if needed

CONCLUSION: [Detailed reasoning for selected approach]
</thinking>
```

### Sequential Thinking Activation
**WHEN:** Complexity score 4-8 or standard multi-step scenarios

**ACTIVATION PATTERN:**
```markdown
<thinking>
Systematic analysis approach:

1. Requirement clarification
2. Current state assessment  
3. Option identification
4. Impact analysis
5. Resource evaluation
6. Risk assessment
7. Recommendation with reasoning

CONCLUSION: [Clear rationale for chosen approach]
</thinking>
```

## Integration with Role Behaviors

### @PM Integration Patterns
```markdown
STORY ANALYSIS COMPLEXITY RECOGNITION:
1. Count affected domains (UI, API, Database, etc.)
2. Assess stakeholder complexity (multiple teams, users)
3. Evaluate requirement clarity and conflicts
4. Calculate complexity score
5. Activate appropriate thinking mode
6. Proceed with systematic analysis
```

### @Architect Integration Patterns  
```markdown
TECHNOLOGY DECISION COMPLEXITY RECOGNITION:
1. Assess architectural impact scope
2. Evaluate long-term implications
3. Consider integration complexity
4. Analyze team expertise gaps
5. Calculate complexity score
6. Activate structured thinking
7. Proceed with systematic evaluation
```

### Specialist Creation Integration Patterns
```markdown
DOMAIN EXPERTISE COMPLEXITY RECOGNITION:
1. Assess domain knowledge depth required
2. Evaluate current team capability gaps
3. Analyze learning curve implications
4. Consider long-term project needs
5. Calculate specialist creation complexity
6. Activate appropriate thinking mode
7. Make systematic specialist vs role decision
```

## Quality Assurance and Validation

### Complexity Assessment Accuracy
**VALIDATION CHECKPOINTS:**
- Historical decision outcomes validate complexity assessments
- Thinking mode effectiveness measured by decision quality
- Iterative refinement of complexity scoring algorithm
- User satisfaction with decision quality and process efficiency

### Success Metrics
- **Reduced Decision Reversals**: Fewer changes to initial decisions
- **Improved Outcome Quality**: Higher success rate of implemented solutions  
- **Enhanced User Confidence**: Less need for user intervention and validation
- **Systematic Consistency**: Similar problems receive consistent complexity assessment

### Learning Integration
**COMPLEXITY PATTERN LEARNING:**
- Store successful complexity assessments in memory
- Track correlation between complexity scores and thinking mode effectiveness
- Capture patterns of successful decision frameworks
- Update complexity indicators based on real-world outcomes

## Error Prevention

### Common Complexity Misjudgments Prevented
- **Underestimating Impact**: Missing downstream effects of changes
- **Overcomplicating Simple Tasks**: Using excessive process for straightforward work
- **Missing Critical Decision Points**: Not recognizing when structured thinking is needed
- **Inconsistent Assessment**: Different complexity evaluation for similar problems

### Calibration Mechanisms
- **Peer Review Integration**: Cross-validation of complexity assessments
- **Outcome Tracking**: Monitor decision effectiveness to refine complexity indicators
- **Pattern Recognition**: Use historical data to improve complexity detection
- **Stakeholder Feedback**: Integrate user feedback on decision quality and process

---
*Complexity recognition patterns for intelligent-claude-code behavioral system*