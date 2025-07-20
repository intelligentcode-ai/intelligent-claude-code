# Priority System

**PURPOSE:** Ensure critical work executes first through hierarchical priority inheritance

## Priority Levels

**Epic → Story/Bug → Task hierarchy with automatic inheritance**

### Epic Priority
- **Strategic**: Business-critical, revenue-impacting
- **High**: Important features, user-facing  
- **Medium**: Enhancements, optimizations
- **Low**: Nice-to-have, future considerations

### Story/Bug Priority  
- **P0**: Critical - immediate execution
- **P1**: High - within current sprint
- **P2**: Medium - normal scheduling
- **P3**: Low - when capacity allows

### Task Priority
- **Blocking**: Must complete before others start
- **Critical Path**: Required for story completion
- **Parallel**: Execute anytime
- **Optional**: Skip if needed

## Execution Order

**Story Level:** Use `/icc-prioritize [stories]` for P0 → P1 → P2 → P3 execution order  
**Task Level:** Use `/icc-prioritize [tasks]` for Blocking → Critical Path → Parallel → Optional execution order

## Dynamic Escalation

### Auto-Escalation Triggers
Use `/icc-auto-escalate [item_type] [trigger]` for Security issues → P0, Data loss risks → P0, Customer bugs → Priority +1, Blocked dependencies → Critical Path

### De-escalation Rules
Use `/icc-de-escalate [item_id] [reason]` for Workaround found (P1 → P2), Reduced impact (P2 → P3), Off critical path (Adjust down)

## Assignment Integration

Use `/icc-inherit-priority [parent_item] [child_item]` for automatic priority flow through assignment files with escalation tracking and dependency management.

## Command Integration

Use `/icc-prioritize [command_type]` so all creation and status commands respect priority ordering with automatic sorting and visual priority indicators.

## Behavioral Rules

**@PM**: Use `/icc-set-priority [epic_id] [priority]` to set epic priorities, `/icc-review-priorities` for daily adjustments  
**@Specialists**: Use `/icc-prioritize [task_list]` to execute blocking tasks first, respect critical path  
**@System**: Use `/icc-auto-escalate [security|data]` for auto-escalation, `/icc-inherit-priority` to maintain inheritance