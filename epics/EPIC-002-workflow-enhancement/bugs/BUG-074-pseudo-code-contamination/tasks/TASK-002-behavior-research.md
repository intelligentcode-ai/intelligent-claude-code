# TASK-002: [AI-Engineer] Research All Behavioral Files

## Overview
**Task ID:** TASK-002
**Title:** [AI-Engineer] Research All Behavioral Files
**Status:** COMPLETED
**Assigned To:** @AI-Engineer
**Priority:** P0 (critical_path)
**Type:** research

## Description
Analyze all behavioral files in src/behaviors/ to identify pseudo-code contamination patterns and create cleanup plan.

## Subtasks
1. **Scan all behavioral files**
   - List all files in src/behaviors/
   - Identify files with pseudo-code
   - Assess contamination severity

2. **Categorize contamination types**
   - Function declarations (FUNCTION, CLASS)
   - Programming constructs (IF/ELSE, FOR, WHILE)
   - Variable assignments and operations
   - Return statements and logic

3. **Create cleanup priority list**
   - Critical behaviors first (lean-workflow-executor)
   - Core behaviors next (config-loader, role-detection)
   - Supporting behaviors last

## Acceptance Criteria
- [ ] All behavioral files analyzed
- [ ] Contamination patterns identified
- [ ] Cleanup priority established
- [ ] Ready for implementation phase

## Dependencies
- TASK-001 (need pattern knowledge)

## Parallel Execution
- Can analyze multiple files in parallel

## Output
- Contamination report
- File priority list
- Pattern frequency analysis