# BUG-001: System-Wide Inconsistencies and Violations

## Severity: CRITICAL

## Summary
The src/ directory contains numerous violations of the MARKDOWN-BASED AI-AGENTIC BEHAVIORAL SYSTEM principles, including pseudo-code, hardcoded paths, excessive length, and fundamental misunderstandings of the system scope.

## Issues Identified

### Agent Issues
1. **Inconsistent Memory Integration**: Some agents have memory checking, others don't
2. **70% Threshold Still Present**: architect.md STILL contains the 70% specialist creation threshold (should be ALWAYS)
3. **Hardcoded Memory Paths**: Agents have hardcoded paths to memory/ instead of using configuration
4. **Hardcoded Specializations**: Specializations are hardcoded in agents instead of being dynamic
5. **Generic Tool Usage**: Tool usage not based on actually available MCPs

### Behavioral Pattern Issues
1. **Excessive Length**: Some behaviors are HUNDREDS of lines (prb-creation-mandates.md has 700+ lines!)
2. **Pseudo-Code Present**: Multiple behaviors contain pseudo-code (story-breakdown.md is mostly pseudo-code)
3. **Hardcoded Paths**: Behaviors contain hardcoded paths instead of using configuration
4. **Non-Existent Commands**: References to commands that don't exist
5. **Bash Commands**: placeholder-resolution.md is full of BASH commands (completely out of scope)
6. **Outdated Behaviors**: Multiple behaviors appear obsolete given current agent architecture

### Command Issues
1. **Obsolete Commands**: Several commands are no longer needed with agent architecture
2. **Redundant Commands**: Multiple commands doing the same thing
3. **Pseudo-Code Mess**: icc-rename-work-items.md is pseudo-code and excessively long

### PRB Template Issues
1. **Story Requirement**: Templates assume a story exists (not always true)
2. **@PM Role Confusion**: @PM doing technical analysis (should be architects/engineers)
3. **@PM Decomposition**: @PM doing decomposition (should be architect role)

## Impact
- System is unreliable and inconsistent
- Behavioral patterns violate core principles
- Agents can't function properly
- PRB generation is broken
- Memory system is misconfigured

## Root Cause
Fundamental misunderstanding of MARKDOWN-BASED AI-AGENTIC BEHAVIORAL SYSTEM principles throughout implementation.

## Recommendation
Comprehensive audit and cleanup required across all src/ components.