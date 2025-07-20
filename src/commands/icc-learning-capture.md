# Learning Capture

Capture patterns, learnings, and insights from completed work using $ARGUMENTS.

## Behavior
Automatically extract reusable patterns, document lessons learned, and create memory entities for future reference. Supports error forgiveness system and application bonus detection.

## Arguments
**Format:** "outcome_type:success|error | context:task|story|epic | details:description"
**Example:** "outcome_type:success | context:task | details:OAuth integration working perfectly"
**Example:** "outcome_type:error | context:story | details:Authentication flow failed - missing validation"

## Core Actions
1. **Parse Learning Context**: Extract outcome type, context level, and details from $ARGUMENTS
2. **Pattern Analysis**: Identify reusable patterns, anti-patterns, and insights
3. **Memory Entity Creation**: Store learning as appropriately typed memory entity
4. **Error Forgiveness Check**: For errors, check if this is first occurrence (no penalty) or repeat (double penalty)
5. **Application Bonus Detection**: Scan for learning reference patterns in work output
6. **Cross-Role Sharing**: Distribute relevant learnings to applicable specialist roles

## Learning Types
- **Success Patterns**: Working approaches to replicate
- **Error Learnings**: Mistakes to avoid with prevention measures
- **Process Improvements**: Workflow enhancements discovered
- **Technical Insights**: Architecture or implementation discoveries
- **Collaboration Patterns**: Effective team coordination approaches

## Error Forgiveness System
**First Error**: No penalty + Learning entity created + Pattern stored
**Repeated Error**: 2x penalty applied + Escalation triggered
**Learning Application**: +0.5P/Q bonus for referencing previous learnings

## Memory Entity Format
```yaml
type: "TaskLearning" | "StoryLearning" | "EpicLearning"
attributes:
  - outcome_type: success|error|insight
  - context_level: task|story|epic
  - pattern_type: technical|process|collaboration
  - prevention_measures: [for errors]
  - replication_steps: [for successes]
  - cross_role_relevance: [@Role1, @Role2]
  - confidence_level: high|medium|low
```

## Bonus Detection Patterns
- "Based on previous learning" → +0.5P
- "Applying lesson from" → +0.5P  
- "To prevent repeat of" → +0.5Q
- "Learned from previous" → +0.5P
- "Breaking the pattern" → +1.0P/Q

## Error Handling
- **Missing Context**: "Error: Learning capture requires outcome_type and context"
- **Invalid Type**: "Error: outcome_type must be success, error, or insight"
- **Empty Details**: "Error: Learning details cannot be empty"
- **Memory Storage Failed**: "Warning: Learning captured locally, memory storage failed"
