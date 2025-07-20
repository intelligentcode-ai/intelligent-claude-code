# Require Triage

Enforce mandatory PM + Specialist Architect triage for all task assignments in $ARGUMENTS.

## Behavior
PM-only operation ensuring PM + Specialist Architect jointly review and approve ALL assignments. Prevents generic role assignments for specialist work.

## Arguments
**Format:** "PM: @PM | Architect: @[Specialist]-Architect | Tasks: [task_list]"
**Example:** "PM: @PM | Architect: @AI-Architect | Tasks: Update patterns, Fix validation"

## Core Actions

### Mandatory Dual Approval Process
1. **Verify PM Role**: Block if not @PM active
2. **Identify Specialist Architect**: 
   - **AI-agentic** → @AI-Architect | **Infrastructure** → @System-Architect | **Security** → @Security-Architect
3. **Joint Review**: PM (strategy/priority/timeline) + Architect (technical/capability >70%)
4. **Assignment Rules**: 
   - **AI-agentic** → @AI-Architect/@AI-Engineer ONLY
   - **Infrastructure** → Specialized DevOps/System roles ONLY  
   - **Security** → @Security-Engineer + architect review
   - **Generic roles** → BLOCKED for specialist work

### Approval Documentation
```
Triage: [timestamp] | PM: @PM ✅ | Architect: @[Specialist]-Architect ✅
Work: [type] | Assignments: [task] → @[role] (XX%)
```

## Enforcement Rules

### Blocking Conditions
No PM role, missing architect, generic assignments, <70% capability, no joint approval

### Auto-Correction
Wrong role → suggest specialist | Missing approval → halt | Capability gap → create specialist

## Error Handling
- **Not PM**: "🚫 Requires @PM role activation"
- **Missing Architect**: "❌ Need @[Specialist]-Architect"
- **Generic Assignment**: "🚨 BLOCKED: @Developer cannot handle [work_type]"
- **No Dual Approval**: "⚠️ Missing approval from @[role]"
- **Low Capability**: "❌ [XX%] below 70% threshold"
