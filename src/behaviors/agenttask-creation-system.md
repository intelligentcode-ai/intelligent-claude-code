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

**Templates**: nano (0-2 pts), tiny (3-5 pts) only
**Breakdown Rule**: Work ≥6 points becomes STORY/BUG first
**Context**: Complete embedding with resolved placeholders

## Creation Flow

**Process**: Work detection → Deduplication check → Memory search → Template selection → Context embedding
**Quality Gates**: Template compliance, complete context, resolved placeholders
**Execution**: Deploy via Task tool to appropriate agent

---
*AgentTask and work item creation system*