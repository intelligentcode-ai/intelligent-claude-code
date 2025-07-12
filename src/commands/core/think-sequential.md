# /think-sequential Command Chain

**PURPOSE:** Mandatory sequential thinking for complex problems with quality enforcement

## COMMAND EXECUTION

**TRIGGER:** Complex tasks requiring analysis, planning, or multi-step solutions
**PENALTY:** Q:-1.0 for skipping when complexity requires sequential analysis
**REQUIREMENT:** Use when task complexity > trivial or involves multiple steps

## SEQUENTIAL THINKING PROTOCOL

1. **Problem Analysis** - Break down complex problems systematically
2. **Solution Planning** - Plan approach with clear steps and dependencies
3. **Risk Assessment** - Identify potential issues and mitigation strategies
4. **Resource Planning** - Determine tools, roles, and requirements needed
5. **Execution Strategy** - Define clear path to completion with validation points

## THINKING CHAIN STEPS

**STEP 1: PROBLEM DECOMPOSITION**
```
Analyze: Break problem into component parts
Identify: Core requirements and constraints
Map: Dependencies between components
Assess: Complexity level and effort required
```

**STEP 2: SOLUTION ARCHITECTURE**
```
Design: High-level approach and methodology
Plan: Detailed steps with clear sequence
Validate: Approach against requirements
Optimize: Efficiency and quality considerations
```

**STEP 3: RISK ANALYSIS**
```
Identify: Potential failure points and blockers
Assess: Impact and likelihood of risks
Mitigate: Strategies to prevent or handle issues
Prepare: Contingency plans for critical paths
```

**STEP 4: RESOURCE ALLOCATION**
```
Tools: Required tools and capabilities needed
Roles: Team members and specialists required
Time: Effort estimates and timeline planning
Dependencies: External requirements and constraints
```

**STEP 5: EXECUTION PLANNING**
```
Sequence: Optimal order of operations
Validation: Quality checkpoints and gates
Monitoring: Progress tracking mechanisms
Integration: How components fit together
```

## COMPLEXITY TRIGGERS

**MANDATORY USE:**
- Multi-step technical implementations
- Architecture decisions with trade-offs
- Cross-role coordination requirements  
- Problem-solving with multiple solutions
- Planning phases for significant work

**OPTIONAL USE:**
- Simple, well-defined tasks
- Routine operations with clear paths
- Single-step executions

## QUALITY STANDARDS

**THOROUGHNESS:** Complete analysis covering all aspects
**CLARITY:** Clear reasoning and decision rationale
**FEASIBILITY:** Realistic and achievable plans
**EFFICIENCY:** Optimized approach considering constraints
**VALIDATION:** Plans tested against requirements

## ENFORCEMENT RULES

- **COMPLEXITY ASSESSMENT**: Auto-detect when sequential thinking required
- **QUALITY GATES**: Must pass reasoning quality checks before continuation
- **DOCUMENTATION**: Thinking process must be captured for review
- **PENALTY**: Q:-1.0 for skipping on complex tasks
- **CORRECTION**: Auto-correction triggers on inadequate analysis

## COMMAND CHAIN CONTINUATION

**SUCCESS:** → Continue to execution or /parallel-delegate
**INSUFFICIENT:** → Retry with deeper analysis required
**BYPASS:** → Q:-1.0 penalty, forced retry for complex tasks