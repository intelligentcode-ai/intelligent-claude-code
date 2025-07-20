# Learning Capture

Capture learning from errors, successes, or insights using $ARGUMENTS.

## Behavior
Analyze the provided context to extract actionable learning patterns,
apply forgiveness logic for first-time errors, and create structured
learning entities for team knowledge sharing.

## Arguments
**Format:** "Type:ErrorType|SuccessType | Context: detailed_context | Outcome: what_happened"
**Example:** "Type:ValidationError | Context: Missing role validation in task assignment | Outcome: Created validation command chain to prevent future occurrences"

## Core Actions
- Parse learning type (Error, Success, Insight) from $ARGUMENTS
- Extract context and outcome details
- Check memory for previous similar learning
- Apply learning-team-automation.md forgiveness logic:
  - First occurrence: No penalty + Create learning
  - Repeated occurrence: Double penalty + Escalation
- Generate learning entity with prevention measures
- Store in memory system via icc-memory-store
- Update specialist scores based on learning type

## Learning Types
- **ValidationError**: Process validation failures
- **TechnicalError**: Implementation or code issues
- **ProcessImprovement**: Workflow enhancement insights
- **SuccessPattern**: Successful approaches worth repeating
- **CollaborationInsight**: Team coordination improvements
- **QualityInsight**: Quality assurance discoveries

## Forgiveness Logic
- **First Error**: +0 penalty, create Learning-[ErrorType]-[Date]
- **Applied Learning**: +0.5P/Q bonus when referencing previous learning
- **Repeated Error**: -2.0P penalty (double base) + escalation
- **Pattern Breaking**: +1.0P/Q bonus for innovative solutions

## Integration
- Triggered automatically by error detection systems
- Manual invocation for success pattern capture
- Memory search validates first/repeat occurrence
- Scoring system integration for penalty/bonus application
- Cross-role learning sharing for team improvement