# TASK-004: [AI-Engineer] Consolidate behavioral pattern duplication across modules

## Task Information
- **ID**: TASK-004
- **Title**: [AI-Engineer] Consolidate behavioral pattern duplication across modules
- **Priority**: P0
- **Type**: parallel
- **Parent**: BUG-100 (Token Usage Massively Over-Optimized - 441K chars System Bloat)
- **Assigned to**: @AI-Engineer

## Description
Eliminate duplication in 544 code blocks and 73 example sections across behavioral modules. Create shared pattern modules and update import chains to reduce redundancy while maintaining behavioral effectiveness.

## Parallelization
**Yes** - Different behavioral modules and pattern categories can be optimized simultaneously.

## Subtasks

### 1. Identify duplicated behavioral patterns across modules
- Scan all behavioral modules for repeated patterns and code blocks
- Categorize duplication types (workflow patterns, validation logic, etc.)
- Map pattern usage across different modules
- Quantify duplication impact on token usage

### 2. Create shared pattern modules
- Extract common patterns into reusable shared modules
- Design clean import structure for pattern reuse
- Ensure patterns maintain context and effectiveness
- Test shared patterns work across all usage contexts

### 3. Update import chains to reference consolidated patterns
- Modify behavioral modules to import shared patterns
- Update all references to use consolidated versions
- Validate import chains resolve correctly
- Test behavioral outcomes remain unchanged

## Dependencies
- TASK-002 (Analyze system bloat patterns) - identifies duplication targets

## Deliverables
- Shared pattern modules with consolidated behavioral logic
- Updated import chains across all behavioral modules
- Duplication elimination report with token savings
- Behavioral effectiveness validation results

## Acceptance Criteria
- [ ] All duplicated patterns identified and catalogued
- [ ] Shared pattern modules created and tested
- [ ] Import chains updated to use consolidated patterns
- [ ] Significant reduction in 544 code blocks and 73 example sections
- [ ] Behavioral module effectiveness preserved

## Estimated Effort
2-3 hours

## Notes
Focus on preserving behavioral context while eliminating redundancy. Different behavioral categories can be consolidated in parallel to maximize efficiency.