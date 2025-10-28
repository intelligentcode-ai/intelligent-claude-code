# AgentTask Creation System

All AgentTask creation via main agent with template compliance.

## Imports
@./shared-patterns/template-loading.md
@./shared-patterns/memory-operations.md

## Core Function

**Purpose**: Real-time work detection and AgentTask creation
**Scope**: Main agent only - agents cannot create work items
**Requirements**: Template compliance, memory-first approach, complete context

## Size Limits

**Executable AgentTasks**: nano (0-2 pts), tiny (3-5 pts), medium (6-15 pts)
**Maximum Complexity**: 15 points - work above this becomes STORY
**Breakdown Rule**: Work ≥16 points becomes STORY in ./stories/ directory
**Context**: Complete embedding with resolved placeholders

## Creation Flow

**Process**: Work detection → Deduplication check → Memory search → Template selection → Context embedding
**Quality Gates**: Template compliance, complete context, resolved placeholders
**Execution**: Pass context directly to Task tool (NO file writes for executable AgentTasks)
**Story Creation**: Work >15 points written to ./stories/ for breakdown

---
*AgentTask and work item creation system*