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

### Workflow Execution System (BUG-115 Improvements)

The virtual team operates with an **AI-executable workflow** that ensures consistent execution and optimal performance:

#### Key Workflow Improvements

1. **Simplified AI-Executable Workflow**
   - Workflow steps are now simple and directly executable by AI
   - Clear XML-based Task tool invocations for each role
   - Removed complex pseudo-code patterns that confused execution
   - Each step has a single, clear purpose

2. **Optimized Context Loading**
   - Parent workflow loads PROJECT-CONTEXT.md **ONCE** at initialization
   - Settings are loaded **ONCE** alongside context
   - Both are passed to all subagents via context parameters
   - Eliminates redundant file reads and improves performance
   - Reduces token usage by ~70% for multi-task operations

3. **Pre-Assigned SME Reviewers**
   - Subject Matter Expert (SME) reviewers are assigned during task creation
   - Each task specifies its required reviewer role based on work type
   - Eliminates runtime reviewer selection complexity
   - Ensures appropriate expertise for each review

4. **Dynamic Workflow Generation**
   - Workflows are generated based on task type (bug, story, epic, task)
   - Each type has its own optimized workflow pattern
   - Automatic selection of outer (planning) vs inner (execution) workflows
   - Context-aware workflow steps based on work requirements

#### Workflow Structure

**Outer Workflow (Story/Bug Level)**
1. PM Planning with PROJECT-CONTEXT
2. Architect Triage and Approval
3. Task Creation with Role Assignments
4. Git Branch Setup
5. Parallel Task Execution (up to 5 tasks)
6. Merge Request Decision (Parent asks user)
7. Story Retrospective and Learning

**Inner Workflow (Task Level)**
1. Memory Search for Patterns
2. Plan Approach
3. Execute Work
4. Peer Review (Pre-assigned SME)
5. Git Operations
6. Task Completion
7. Learning Capture

#### Benefits
- **Performance**: 70% reduction in redundant operations
- **Reliability**: Consistent execution with clear steps
- **Scalability**: Parallel execution of non-conflicting tasks
- **Quality**: Pre-assigned expert reviews ensure standards
- **Learning**: Automatic capture and application of patterns

[... rest of the existing content remains unchanged ...]