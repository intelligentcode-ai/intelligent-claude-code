# AgentTask Creation System

Real-time in-memory AgentTask creation with direct Task tool deployment.

## Imports
@./shared-patterns/template-loading.md
@./shared-patterns/memory-operations.md

## Core Function

**Purpose**: Real-time work detection and ephemeral AgentTask creation
**Scope**: Main agent only - agents cannot create work items
**Requirements**: Template compliance, memory-first approach, complete context
**Execution**: In-memory AgentTask passed directly to Task tool

## Size Limits and Work Classification

**Ephemeral Tasks (0-5 points)**: nano/tiny AgentTasks - in-memory only
**Persistent Work (6+ points)**: Must become STORY/BUG first with file storage
**Context**: Complete embedding with resolved placeholders for all sizes

## In-Memory AgentTask Pattern

**No File Storage**: AgentTasks 0-5 points exist only in memory
**Direct Deployment**: Template → Context embedding → Task tool invocation
**Ephemeral Nature**: AgentTask content passed as context, not stored as file
**File Operations**: Only for Stories (6+ points) requiring breakdown

## Creation Flow

**Process**: Work detection → Memory search → Template selection → Context embedding → Direct Task tool deployment
**Quality Gates**: Template compliance, complete context, resolved placeholders
**Execution**: In-memory AgentTask deployed via Task tool to appropriate agent
**Storage**: Only successful patterns and learnings captured in memory, not AgentTask files

## Work Classification Rules

**0-5 Points (Ephemeral)**:
- Create in-memory AgentTask from template
- Pass complete context directly to Task tool
- No file creation or storage required
- Focus on immediate execution and completion

**6+ Points (Persistent)**:
- Must become STORY or BUG first
- File storage in stories/ or bugs/ directories
- Story breakdown into multiple nano/tiny AgentTasks
- Each breakdown task follows ephemeral pattern

---
*In-memory AgentTask creation system with ephemeral execution patterns*