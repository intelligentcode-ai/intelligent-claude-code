# Plan Order

Establish execution order using $ARGUMENTS as item ID.

## Behavioral Sequence
1. Parse $ARGUMENTS to extract item ID (STORY-XXX or BUG-XXX format)
2. If item ID missing, respond "Error: Item ID required (format: STORY-XXX or BUG-XXX)"
3. Validate item exists:
   - Locate item file based on type
   - If not found, respond "Error: Item [ITEM-ID] not found"
   - Load item YAML and verify phase is DEFINING
4. If item not in DEFINING phase:
   - Respond "Error: Planning order only applies to items in DEFINING phase. Current: [phase]"
5. Detect work type for specialist architect assignment:
   - Execute `icc-validate-work-type "[item.description]"`
   - Identify required specialist architect based on work domain:
     * AI work → @AI-Architect
     * Infrastructure → @System-Architect  
     * Security → @Security-Architect
     * Frontend → @Frontend-Architect
     * Data → @Data-Architect
6. Activate PM role for planning coordination:
   - Execute `icc-activate-role @PM`
   - Display: "📁 @PM activated for planning coordination"
7. Activate appropriate Specialist-Architect:
   - Execute `icc-activate-role @[SpecialistArchitect]`
   - Display: "🏢 @[SpecialistArchitect] activated for domain expertise"
8. Collaborative planning session (PM + Specialist-Architect):
   
   **PM Analysis:**
   - Assess business priority and timeline
   - Identify resource constraints and dependencies
   - Map to overall project roadmap
   - Define success criteria and exit conditions
   
   **Specialist-Architect Analysis:**
   - Analyze technical complexity and risks
   - Identify architectural dependencies
   - Map required expertise and skill sets
   - Define technical milestones and quality gates

9. Map dependencies and execution sequence:
   
   **Internal Dependencies:**
   - Identify prerequisite tasks within item
   - Map knowledge loading requirements
   - Define implementation sequence
   - Plan quality validation checkpoints
   
   **External Dependencies:**
   - Identify dependencies on other stories/bugs
   - Map required system components
   - Check for blocking items or resources
   - Validate availability of required expertise
   
   **Execution Sequence:**
   - Define phase transition criteria
   - Map task generation approach
   - Plan specialist assignment strategy
   - Set quality gates and review points

10. Create planning order document:
    ```markdown
    # Planning Order: [ITEM-ID]
    
    **Planning Date**: [current_date]
    **Planned By**: @PM + @[SpecialistArchitect]
    **Work Type**: [domain]
    
    ## Execution Strategy
    - Approach: [tactical approach]
    - Complexity: [low|medium|high]
    - Risk Level: [low|medium|high]
    - Timeline: [estimated duration]
    
    ## Dependencies
    ### Internal:
    - [dependency 1]
    - [dependency 2]
    
    ### External:
    - [external dependency 1]
    - [external dependency 2]
    
    ## Sequence Plan
    1. Phase: PLANNING
       - Task generation by @[SpecialistArchitect]
       - Specialist assignment validation
       - Resource allocation confirmation
    
    2. Phase: EXECUTE
       - Task execution in priority order
       - Continuous quality validation
       - Dependency resolution monitoring
    
    3. Phase: ACCEPTANCE
       - Completion validation
       - Quality verification
       - Documentation updates
    
    ## Quality Gates
    - [ ] All dependencies resolved
    - [ ] Specialist assignments validated
    - [ ] Resource availability confirmed
    - [ ] Risk mitigation strategies defined
    
    ## Approvals
    - [ ] @PM: Strategic alignment confirmed
    - [ ] @[SpecialistArchitect]: Technical approach approved
    ```

11. Require dual approval:
    - PM must approve strategic approach and priorities
    - Specialist-Architect must approve technical approach
    - Both approvals required before phase transition
    - Document approval timestamps and reasoning
12. Update item status:
    - Transition phase from DEFINING to PLANNING
    - Update planning_date and planned_by fields
    - Add planning order document reference
    - Set status to PLANNED
13. Create planning transition commit:
    - Commit message: "plan: Establish execution order for [ITEM-ID]"
    - Include planning order document
    - Tag with planning milestone
14. Display planning completion:
    "✅ Planning order established for [ITEM-ID]"
    "📁 Approach: [tactical approach] ([complexity] complexity)"
    "🔗 Dependencies: [X] internal, [Y] external"
    "🎯 Status: PLANNING phase, ready for task generation"
15. Update role scores (+1.5P for PM, +1.5P for Specialist-Architect)
16. Trigger next phase preparation:
    - Item ready for task generation via `icc-plan-tasks`
    - Dependencies tracked for resolution
    - Quality gates established for validation

## Error Handling
- Invalid item ID format: "Error: Item ID must be STORY-XXX or BUG-XXX format"
- Item not found: "Error: Item [ITEM-ID] not found"
- Wrong phase: "Error: Item must be in DEFINING phase for planning order. Current: [phase]"
- Work type detection failed: "Warning: Could not detect work type, using default architect"
- Architect activation failed: "Error: Could not activate required specialist architect"
- Dual approval missing: "Error: Both PM and Specialist-Architect approval required"
- File creation failed: "Error: Could not create planning order document"
- Git operation failed: "Warning: Git commit failed, planning order created but not tracked"

## Planning Collaboration Patterns

**PM Focus Areas:**
- Business value and priority alignment
- Resource allocation and timeline
- Risk assessment and mitigation
- Stakeholder communication requirements

**Specialist-Architect Focus Areas:**
- Technical approach and architecture
- Implementation complexity and risks
- Required expertise and skill matching
- Quality standards and validation

**Joint Decision Areas:**
- Overall execution strategy
- Phase transition criteria
- Quality gate definitions
- Success metrics and exit criteria

## Quality Gate Validation

**Strategic Validation (PM):**
- Business objectives clearly defined
- Priority level appropriate for effort
- Resource availability confirmed
- Timeline realistic and achievable

**Technical Validation (Specialist-Architect):**
- Technical approach sound and feasible
- Complexity assessment accurate
- Required expertise identified
- Quality standards achievable

## Command Chaining
- Planning order enables task generation via `icc-plan-tasks`
- Dependencies tracked for resolution monitoring
- Quality gates established for validation checkpoints
- Approved planning order required for execution phase