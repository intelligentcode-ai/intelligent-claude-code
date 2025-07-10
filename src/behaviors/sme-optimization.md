# SME Assignment Optimization

**CORE:** Intelligent role-to-task matching • Capability scoring • Workload balancing • Performance optimization

## Optimization Engine

**ASSIGNMENT ALGORITHM:**

### 1. Task Analysis
```markdown
**TASK BREAKDOWN:** Parse task description → Extract required capabilities → Score complexity
**CAPABILITY MATCHING:** Required caps vs Available roles → Score matches → Rank candidates
**CONTEXT ANALYSIS:** Project history → Previous assignments → Performance patterns
```

### 2. Role Scoring Matrix
```markdown
**CAPABILITY SCORE:** Role caps alignment (0-100%)
**PERFORMANCE SCORE:** Historical P/Q scores → Success rate calculation
**WORKLOAD SCORE:** Current assignments → Capacity availability → Balance factor
**SPECIALIZATION SCORE:** Domain expertise depth → Context7 knowledge match
```

### 3. Assignment Decision Logic
```markdown
**PRIMARY MATCH:** Highest capability score + available capacity
**FALLBACK:** Create specialist if best match <70%
**LOAD BALANCE:** Distribute work across high-performing roles
**LEARNING OPP:** Assign stretch tasks to developing roles
```

## Assignment Process

**TASK ROUTING:**
```markdown
**INPUT:** @PM "Implement GraphQL API for user management"

**ANALYSIS:**
- Required capabilities: Implementation(80%) + Architecture(40%) + Security(30%)
- Available roles: @Developer(85% match), @Backend-Tester(45% match), @GraphQL-Expert(95% match)
- Workload check: @Developer(70% capacity), @GraphQL-Expert(90% capacity)

**DECISION:** Assign to @GraphQL-Expert (95% capability + 90% availability = optimal)

**FALLBACK:** If no @GraphQL-Expert → Create specialist → Assign after Context7 knowledge injection
```

**WORKLOAD OPTIMIZATION:**
```markdown
**CAPACITY TRACKING:** Monitor active tasks per role → Prevent overload → Maintain quality
**SKILL DEVELOPMENT:** Identify learning opportunities → Assign challenging tasks → Track improvement
**PERFORMANCE CORRELATION:** Assignment success vs capability match → Optimize algorithm
```

## Continuous Optimization

**LEARNING FEEDBACK LOOP:**
```markdown
**TRACK OUTCOMES:** Assignment success rate → Quality scores → Timeline adherence
**ALGORITHM TUNING:** Adjust scoring weights → Improve match accuracy → Reduce failures
**PATTERN RECOGNITION:** Identify optimal role combinations → Project type preferences
```

**OPTIMIZATION METRICS:**
- **Assignment Accuracy:** Successful completion rate per role-task match
- **Quality Correlation:** Assignment score vs delivery quality score  
- **Efficiency Gain:** Task completion time vs role capability match
- **Specialist Utilization:** Created specialists effectiveness tracking

## Integration Points

**MEMORY INTEGRATION:** Store assignment history → Track performance patterns → Optimize future decisions
**DASHBOARD DISPLAY:** Show assignment rationale → Performance correlation → Optimization suggestions
**AUTO-DELEGATION:** PM requests → Auto-analyze → Auto-assign → Notify assignments
**FEEDBACK COLLECTION:** Task completion → Performance review → Algorithm improvement data

**STORAGE:** ~/.claude/optimization/assignment-history.md + performance-correlations.md
**TRIGGERS:** Every task assignment → Workload rebalancing → Milestone optimization review

---

**SME Optimization: Data-driven role assignment with continuous performance improvement and intelligent workload balancing.**