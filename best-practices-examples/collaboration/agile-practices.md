# Agile Development Practices

**Type:** collaboration
**Applies To:** medium, large, mega
**Keywords:** agile, scrum, collaboration, iterative, feedback, continuous improvement

## Description

Agile development practices for iterative delivery, team collaboration, and continuous improvement.

## Implementation

### Sprint Planning
- Break work into manageable user stories
- Estimate effort using story points or time-boxing
- Commit to realistic sprint goals
- Define clear acceptance criteria for each story

### Daily Standups
- Share progress, blockers, and next steps
- Keep meetings focused and time-boxed (15 minutes)
- Identify impediments and address them quickly
- Foster team communication and coordination

### Retrospectives
- Regular reflection on team processes and practices
- Identify what's working well and what needs improvement
- Create action items for continuous improvement
- Celebrate successes and learn from failures

### Continuous Delivery
- Integrate code frequently to avoid merge conflicts
- Automate testing and deployment pipelines
- Deliver working software in short iterations
- Gather feedback early and often

## Quality Gates
- [ ] User stories have clear acceptance criteria
- [ ] Sprint goals are realistic and achievable
- [ ] Daily standups occur and are productive
- [ ] Retrospectives held regularly with action items
- [ ] Code integrated frequently (multiple times per day)
- [ ] Automated testing pipeline in place
- [ ] Working software delivered each iteration
- [ ] Customer feedback incorporated regularly

## Examples

### User Story Template
```
As a [user type]
I want [functionality]
So that [benefit/value]

Acceptance Criteria:
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

Definition of Done:
- [ ] Code written and reviewed
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] Deployed to staging environment
```

### Daily Standup Format
```
Yesterday:
- Completed user authentication feature
- Fixed bug in payment processing

Today:
- Working on user profile management
- Will review PRs from team members

Blockers:
- Waiting for API documentation from external team
- Need access to staging database
```

### Sprint Retrospective Format
```
What went well:
- Great collaboration on complex feature
- Automated testing caught several bugs
- Customer feedback was very positive

What could be improved:
- Communication about API changes
- Code review turnaround time
- Sprint planning estimation accuracy

Action items:
- Implement API change notification process
- Set up review reminders in Slack
- Use story point poker for better estimates
```