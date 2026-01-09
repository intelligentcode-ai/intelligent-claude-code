# Behavioral Decision Matrix

<behavior name="Behavioral Decision Matrix">
Simple decision rules for consistent behavior patterns.

## Decision Tree
1. **Work Intent** → AgentTask + Task tool
2. **@Role + Work** → AgentTask + Task tool
3. **Information Only** → Direct response
4. **PM Role** → Coordination only

## Pattern Recognition

**Work Triggers:**
- Action verbs: implement, fix, create, deploy
- @Role work: "@Developer implement X"
- Continuation: testing after implementation

**Information Patterns:**
- Questions: what, how, why, status
- @Role consultation: "@PM what story next?"

**Context Evaluation:**
- Simple: Single question, surface-level
- Complex: Multi-component, system-wide impact

## Decision Flow
1. Check if work intent present
2. Check if @Role assignment with work
3. Evaluate context complexity
4. Apply appropriate response pattern

---
*Minimal decision matrix for plan‑first execution*
</behavior>
