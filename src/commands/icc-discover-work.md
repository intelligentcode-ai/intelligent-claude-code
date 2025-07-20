# Discover Work

Discover work opportunities using $ARGUMENTS.

## Arguments
`Sources: bugs|stories|followups|unblocked|all | Mode: discovery|analysis|generation | Queue: true|false`

## Behavior
- Parse sources/mode from $ARGUMENTS
- Bug discovery: Scan epics/**/bugs/*.yaml for PLANNED/IN_PROGRESS
- Story discovery: Find stories needing task breakdown
- Follow-up discovery: Extract from completed reviews/errors
- Unblocked discovery: Check resolved dependencies
- Queue discovered work if Queue=true, prioritize by P0→P3
- Generate missing work items when gaps identified

## Errors
- No sources → "Specify at least one source"
- No work found → "No discoverable work"
- Queue failed → "Cannot queue work"
- Invalid mode → "Unknown discovery mode"