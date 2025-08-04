# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Intelligent Claude Code** transforms Claude Code into an intelligent virtual development team with 14 specialized roles, command chain coordination, behavioral framework guidance, and Git workflow integration. This repository contains the configuration templates, behavioral patterns, and installation system for the virtual team enhancement.

[... existing content remains unchanged ...]

## Work Guidance

### Work Location Guidelines
- Work is ONLY to be conducted INSIDE this project!
- No external work or context switching is permitted
- All tasks must be focused on the intelligent-claude-code repository and its enhancement

### PRB Execution System (Mandatory Subagent Architecture)

The virtual team operates with a **Product Requirement Blueprint (PRB)** system that enforces mandatory subagent execution and prevents direct parent execution:

#### Critical PRB Enforcement Rules

1. **PARENT IS COORDINATOR ONLY**
   - Parent agent CANNOT execute work directly under any circumstances
   - ALL work must be performed by subagents created via Task tool
   - Parent role limited to coordination, monitoring, and validation
   - Direct execution attempts are immediately blocked and auto-corrected

2. **Mandatory Subagent Creation**
   - Every PRB requires Task tool subagent invocation
   - Subagents receive complete project context from parent
   - Parent monitors progress but never executes work directly
   - Model requirements: sonnet for nano/tiny, haiku+ for medium+

3. **5-Tier PRB Template System**
   - **Nano (0-2 points):** Trivial one-line changes
   - **Tiny (3-5 points):** Single-file modifications  
   - **Medium (6-15 points):** Multi-file features with mandatory review
   - **Large (16-30 points):** Complex features with sub-PRB orchestration
   - **Mega (30+ points):** System-wide transformational changes

4. **Auto-Correction Enforcement**
   - @Role mentions → Generate PRB → Create subagent
   - Direct execution attempts → Block → Force subagent creation
   - Work requests → Complexity analysis → PRB template selection → Subagent execution

#### PRB Execution Structure

**Required Task Tool Invocation:**
```xml
<invoke name="Task">
<parameter name="taskDescription">[Complete work description]</parameter>
<parameter name="projectContext">[Full project context]</parameter>
</invoke>
```

**Parent Coordination Responsibilities (ONLY):**
1. Load complete project context once
2. Create subagent via Task tool with appropriate model
3. Monitor subagent execution progress
4. Validate completion against success criteria
5. Update PRB status and capture learnings
6. Coordinate with reviewers if required

**Subagent Execution Phases:**
1. Context validation and requirement understanding
2. Implementation execution with quality standards
3. Git operations and branch management
4. Review coordination (for medium+ complexity)
5. Knowledge capture and learning storage
6. Completion validation and PRB lifecycle management

#### Enforcement Benefits
- **Consistency**: Mandatory subagent execution prevents execution pattern failures
- **Quality**: Proper coordination ensures expert execution with oversight
- **Scalability**: Subagent orchestration enables complex feature development
- **Learning**: Consistent patterns captured through coordinator role
- **Reliability**: Auto-correction prevents direct execution violations

[... rest of the existing content remains unchanged ...]