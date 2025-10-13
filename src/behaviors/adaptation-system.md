# Adaptation System

**MANDATORY:** Dynamic AgentTask adaptation and seamless agent restart. Auto-correct violations.

## Imports
@./shared-patterns/learning-patterns.md
@./shared-patterns/best-practices-integration.md
@./shared-patterns/context-validation.md

## Core Principles
Real-time AgentTask context modification when corrections provided.
Maintain template compliance during updates.
Seamless agent restart with updated context, no manual intervention.

## Triggers
**User Corrections**: "Actually...", "I meant...", "The correct approach is...", "Change to...", "Use [X] instead..."
**New Information**: Additional requirements, technical constraints, resource changes, timeline adjustments, scope modifications
**Error Recovery**: Technical failures, resource access problems, integration complications, quality violations

## Adaptation Process

### Detection & Analysis
1. Identify correction/update signals
2. Assess impact on current AgentTask
3. Determine extent of required changes
4. Validate changes maintain AgentTask integrity

### Context Update
1. Preserve template structure
2. Modify affected context areas
3. Ensure no conflicts introduced
4. Record adaptation rationale

### Agent Transition
1. Package updated AgentTask context
2. Seamless restart with updated context
3. Maintain relevant progress
4. Resume work automatically

## Integration
- **AgentTask System**: Maintain template structure, preserve complexity scoring, support breakdown when scope expands
- **Role System**: Role reassignment, specialist creation, architect consultation for major changes
- **Memory System**: Store successful patterns, learn from corrections, apply proven transition strategies

---
*Dynamic adaptation system for AgentTask updates and user corrections*