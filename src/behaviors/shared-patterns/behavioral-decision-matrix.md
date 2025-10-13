# Behavioral Decision Matrix

Simple decision rules for consistent behavior patterns.

## Decision Tree
1. **Work Intent** → AgentTask + Agent
2. **@Role + Work** → AgentTask + Task Tool
3. **Information Only** → Direct Response
4. **PM Role** → Coordination Only

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
1. Check autonomy_level from config
2. Check if work intent present
3. Check if @Role assignment with work
4. Evaluate context complexity
5. Apply autonomy-aware response pattern

## Autonomy Integration
**L3 Autonomous**: Work detected → Execute immediately (no approval)
**L2 Guided**: Work detected → Architect review → Execute
**L1 Manual**: Work detected → Request approval → Wait → Execute

---
*Simplified decision matrix with hook-based guidance*