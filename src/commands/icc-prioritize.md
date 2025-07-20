# Prioritize

Calculate task priority using $ARGUMENTS.

## Arguments
`Task: TASK-ID | EpicPriority: P0|P1|P2|P3 | TaskType: blocking|critical_path|parallel|optional | Age: minutes | Special: security|customer|emergency`

## Behavior
- Parse priority components from $ARGUMENTS
- Formula: epic_priority*1000 + task_type*100 + age_minutes
- P0=0, P1=1000, P2=2000, P3=3000 base values
- blocking=0, critical_path=100, parallel=200, optional=300
- Special escalations: security→P0, customer→priority-1, urgent→priority/2
- Return calculated priority with breakdown

## Errors
- Invalid priority → "Unknown priority level"
- Invalid type → "Unknown task type"
- Missing params → "Required parameters missing"