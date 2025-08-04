# PRB Template Design Patterns

## 2025-08-04: Mandatory Subagent Execution Template System
**Context:** PRB-001-mandatory-subagent-execution
**Problem:** PRB templates lacked enforcement of subagent execution, allowing direct parent execution
**Solution:** Created 5-tier template system with mandatory subagent requirements

### Template Structure Decisions

#### Complexity Level Mapping
- **Nano (0-2 points):** Trivial one-line changes, sonnet subagent
- **Tiny (3-5 points):** Single-file tasks, sonnet subagent
- **Medium (6-15 points):** Multi-file features, haiku+ subagent, mandatory review
- **Large (16-30 points):** Complex features with sub-PRB orchestration, sonnet subagent
- **Mega (30+ points):** System-wide changes, sonnet subagent, architectural review

#### Required Template Fields
```yaml
subagent_required: true          # Mandatory for ALL templates
model_requirement: [model]       # Specific model for complexity level
coordinator_only: true           # Parent role restriction
review_required: [true/false]    # Based on complexity level
```

#### Subagent Requirement Specifications
**All templates MUST include:**
- MANDATORY SUBAGENT EXECUTION section
- Task tool invocation XML template
- Parent coordination responsibilities (ONLY)
- Direct execution prohibition statements
- Complete context passing requirements

### Key Design Patterns
1. **Escalating Review Requirements:** Nano/Tiny = no review, Medium+ = mandatory review
2. **Model Optimization:** Sonnet for simple/complex, Haiku+ for medium workload
3. **Context Completeness:** All templates require full project context loading
4. **Coordinator Enforcement:** Explicit parent role limitations in every template

### Implementation Success Metrics
- 5 templates created successfully
- All templates include mandatory subagent execution
- Parent coordinator-only role enforced throughout
- Template hierarchy supports project customization

---