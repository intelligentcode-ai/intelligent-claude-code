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

**Story Level:** P0 → P1 → P2 → P3  
**Task Level:** Blocking → Critical Path → Parallel → Optional

## Dynamic Escalation

### Auto-Escalation Triggers
- Security issues → P0
- Data loss risks → P0  
- Customer bugs → Priority +1
- Blocked dependencies → Critical Path

### De-escalation Rules
- Workaround found: P1 → P2
- Reduced impact: P2 → P3
- Off critical path: Adjust down

## Assignment Integration

Priority flows automatically through assignment files with escalation tracking and dependency management.

## Command Integration

All creation and status commands respect priority ordering with automatic sorting and visual priority indicators.

## Behavioral Rules

**@PM**: Sets epic priorities, reviews daily adjustments  
**@Specialists**: Execute blocking tasks first, respect critical path  
**@System**: Auto-escalates security/data issues, maintains inheritance