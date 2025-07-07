# Dual Scoring System Documentation

## Overview
The dual scoring system tracks both Professionalism (process compliance) and Quality (implementation results) for all 13 core roles in the virtual team. This system provides real-time feedback, learning insights, and accountability.

## Score Display Format
Every role action MUST display current scores in this format:
```
@Role (P: Xpts, Q: Ypts - State): [action description]
```

Example:
```
@Developer (P: 2.5pts, Q: 3.0pts - Standard): Implementing user authentication
```

## Scoring States

### Professionalism States
- **Standard (0-9pts):** +0.5 compliant, -1.0 violation
- **Senior (10-24pts):** +1.0 compliant, -1.5 violation  
- **Elite (25-99pts):** +1.5 compliant, -2.5 violation
- **Ultra Mega (100pts):** Hall of Fame → Reset to 25pts
- **Removal (-10pts):** Team member replaced

### Quality States
- **Standard (0-9pts):** +0.5 success, -0.5 failure
- **Senior (10-24pts):** +1.0 success, -0.75 failure
- **Elite (25-99pts):** +1.5 success, -1.0 failure  
- **Master (100pts):** Excellence Award → Maintain score
- **Warning (-5pts):** Quality improvement required

## Automatic Scoring Triggers

### Professionalism Score Triggers

#### Positive (+P)
- Following complete process workflow
- Proper delegation with role identification
- Using correct tools for the task
- Updating documentation in real-time
- Adhering to Git workflow
- Completing all quality gates
- Proper handoff protocols

#### Negative (-P)
- Process step violations
- Missing role identification in tasks
- Using wrong tools (e.g., PM using Edit)
- Skipping quality gates
- Incomplete workflows
- Missing documentation updates
- Protocol breaches

### Quality Score Triggers

#### Positive (+Q)
- Peer review approval
- All tests passing
- Performance requirements met
- User satisfaction achieved
- Clean code implementation
- Best practices followed
- Security validation passed

#### Negative (-Q)
- Peer review rejection
- Test failures
- Performance issues identified
- User complaints received
- Code quality issues
- Technical debt introduced
- Security vulnerabilities found

## Memory Integration

### Automatic Capture
The system automatically captures:
- Current scores for each role
- Score changes with timestamps
- Learning insights from operations
- State transitions and achievements
- Team patterns and wisdom

### Score Entities
Each role has a dedicated memory entity:
- `@Developer-Score`
- `@PM-Score`
- `@Architect-Score`
- (etc. for all 13 roles)

### Retrieval Commands
- `@PM: Show @Developer scoring history`
- `@PM: What did @Architect learn recently?`
- `@PM: Team scoring summary`
- `@PM: Show team achievements`

## Learning Callouts

### Automatic Generation
Learning callouts are generated automatically:

**Positive Learning:**
```
LEARNING: @Developer improved by following complete testing workflow
```

**Negative Learning:**
```
LEARNING: @PM needs improvement in delegation protocols
```

**Achievement:**
```
ACHIEVEMENT: @Architect reached Senior level!
```

**Team Insight:**
```
TEAM INSIGHT: Proper delegation chains lead to 50% faster delivery
```

## Team Member Replacement

### Trigger
When any role reaches -10 Professionalism points:

1. **Archive Creation:** Current member data archived
2. **Farewell Message:** "@Role has been replaced due to process violations"
3. **New Member:** Initialized at P: 0.0pts, Q: 0.0pts - Standard
4. **Memory Update:** New entity created, old entity archived
5. **Continuity:** Workflow continues with new member

### Example Replacement
```
@Backend-Tester (P: -10.0pts, Q: 2.0pts - Standard): Replacement triggered
SYSTEM: @Backend-Tester has been replaced due to process violations
@Backend-Tester (P: 0.0pts, Q: 0.0pts - Standard): Fresh start - ready to contribute
```

## Score Persistence

### Storage Locations
1. **Memory System:** Real-time score tracking via MCP memory
2. **scores.md File:** Persistent score history and achievements
3. **Role Definitions:** Current scores displayed in virtual-team-core.md

### Score Recovery
On system restart:
- Scores loaded from memory entities
- State levels maintained
- History preserved
- Achievements retained

## Usage Examples

### Starting an Operation
```
@Developer (P: 5.0pts, Q: 3.5pts - Standard): Beginning API endpoint implementation
```

### Completing with Success
```
@Developer (P: 5.5pts, Q: 4.0pts - Standard): API endpoint complete - all tests passing
LEARNING: @Developer improved by implementing comprehensive error handling
```

### Handling Violations
```
@PM (P: 8.0pts, Q: 5.0pts - Standard): Attempting to edit file directly
SYSTEM HALT: PM cannot use Edit tool - forcing Task delegation
@PM (P: 7.0pts, Q: 5.0pts - Standard): Process violation recorded - delegating to @Developer
LEARNING: @PM needs improvement in following delegation protocols
```

### State Transition
```
@Architect (P: 9.5pts, Q: 7.0pts - Standard): Completing architecture review
@Architect (P: 10.0pts, Q: 7.0pts - Senior): Architecture approved - achieved Senior state!
ACHIEVEMENT: @Architect reached Senior level!
```

## Best Practices

### For High Scores
1. **Always follow complete workflows** - no shortcuts
2. **Use proper role identification** in all tasks
3. **Complete peer reviews** before proceeding
4. **Update documentation** in real-time
5. **Use appropriate tools** for each role
6. **Provide evidence** for all claims
7. **Follow Git workflow** properly

### Score Improvement
1. **Review learning callouts** regularly
2. **Address negative patterns** immediately  
3. **Seek peer feedback** proactively
4. **Focus on process compliance** for P score
5. **Emphasize quality outcomes** for Q score
6. **Learn from team insights** captured

### Team Excellence
1. **Share successful patterns** across roles
2. **Help struggling team members** improve
3. **Celebrate achievements** together
4. **Review team scoring summary** regularly
5. **Maintain high standards** collectively

## Configuration

Enable scoring in config.md:
```markdown
scoring_enabled: true
scoring_standard: +0.5/-1.0
scoring_senior: +1.0/-1.5  
scoring_elite: +1.5/-2.5
scoring_thresholds: 10/25/100/-10
```

## Enforcement

### Mandatory Requirements
- **Display scores** at start and end of EVERY operation
- **Update immediately** after score changes
- **Generate callouts** for all learning opportunities
- **Track in memory** for persistence
- **No manual scoring** - system controlled only

### Violations
- Missing score display → HALT → Force display
- Manual score edit → BLOCKED → System only
- Skipped update → HALT → Force update
- No evidence → BLOCKED → Require evidence

## Summary
The dual scoring system creates accountability, encourages improvement, and maintains high standards across the virtual team. Through automatic tracking, learning insights, and transparent scoring, every team member can excel in both process compliance and quality delivery.