# TASK-003: [AI-Engineer] Optimize command verbosity and eliminate token waste

## Task Information
- **ID**: TASK-003
- **Title**: [AI-Engineer] Optimize command verbosity and eliminate token waste
- **Priority**: P0
- **Type**: parallel
- **Parent**: BUG-100 (Token Usage Massively Over-Optimized - 441K chars System Bloat)
- **Assigned to**: @AI-Engineer

## Description
Streamline commands from 11KB to efficient AI-agent consumption format. Focus on removing excessive examples, verbose descriptions, and JSON bloat while maintaining 100% functionality for Claude Code virtual team operations.

## Parallelization
**Yes** - Different command types and categories can be optimized simultaneously.

## Subtasks

### 1. Remove excessive examples and verbose descriptions
- Eliminate redundant command examples and verbose explanations
- Convert descriptive text to concise behavioral instructions
- Remove implementation details that don't guide AI behavior
- Preserve essential functionality guidance while cutting bloat

### 2. Consolidate JSON examples and patterns
- Reduce JSON examples to essential patterns only
- Eliminate duplicate parameter demonstrations
- Streamline command format specifications
- Maintain clarity while removing verbosity

### 3. Maintain 100% functionality while optimizing language
- Ensure all command capabilities remain intact
- Test optimized commands preserve behavioral outcomes
- Validate AI-agent comprehension with streamlined format
- Document any functional changes or improvements

## Dependencies
- TASK-002 (Analyze system bloat patterns) - provides optimization targets

## Deliverables
- Optimized command files with significantly reduced token usage
- Command functionality validation report
- Before/after token usage comparison
- AI-agent comprehension testing results

## Acceptance Criteria
- [ ] Commands reduced from 11KB average to efficient format
- [ ] All command functionality preserved and validated
- [ ] JSON examples consolidated without losing clarity
- [ ] Significant token reduction achieved (target: 50%+ reduction)
- [ ] AI-agent behavioral outcomes maintained

## Estimated Effort
3-4 hours

## Notes
Focus on AI-agent consumption efficiency rather than human documentation verbosity. Multiple command categories can be optimized in parallel to accelerate completion.