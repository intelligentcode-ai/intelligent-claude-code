# Task Format Examples and Training Guide

**PURPOSE:** Provide clear, comprehensive examples of correct and incorrect task formats to eliminate confusion and ensure consistent compliance across all team members.

## Quick Reference Guide

### CORRECT Format Structure
```
@Role (P: Xpts, Q: Ypts - Level): Task description
```

### Example Breakdown
```
@Developer (P: 3.5pts, Q: 2.0pts - Standard): Implement user authentication system
   ^         ^                      ^           ^
   |         |                      |           |
   Role      Current Scores         Level       Task Description
```

## Comprehensive Examples

### Core Team Member Examples

#### @PM Examples
```
✅ @PM (P: 8.0pts, Q: 6.0pts - Standard): Analyze project requirements and create implementation plan
✅ @PM (P: 12.5pts, Q: 10.0pts - Senior): Coordinate sprint planning and resource allocation
✅ @PM (P: 15.0pts, Q: 14.0pts - Senior): Review project progress and adjust timeline
```

#### @Developer Examples
```
✅ @Developer (P: 3.5pts, Q: 2.0pts - Standard): Implement user authentication system
✅ @Developer (P: 7.0pts, Q: 8.5pts - Standard): Fix critical bug in payment processing
✅ @Developer (P: 11.0pts, Q: 12.0pts - Senior): Refactor database access layer for performance
```

#### @Architect Examples
```
✅ @Architect (P: 15.0pts, Q: 18.0pts - Senior): Design microservices architecture for payment system
✅ @Architect (P: 25.0pts, Q: 30.0pts - Elite): Review and approve system integration patterns
✅ @Architect (P: 8.0pts, Q: 10.0pts - Standard): Create technical specification for API gateway
```

#### @Security-Engineer Examples
```
✅ @Security-Engineer (P: 5.0pts, Q: 7.0pts - Standard): Conduct security audit of API endpoints
✅ @Security-Engineer (P: 12.0pts, Q: 15.0pts - Senior): Implement OAuth 2.0 authentication flow
✅ @Security-Engineer (P: 20.0pts, Q: 18.0pts - Senior): Review and approve security policy changes
```

#### @AI-Engineer Examples
```
✅ @AI-Engineer (P: 3.0pts, Q: 3.0pts - Standard): Implement task format clarification system
✅ @AI-Engineer (P: 8.5pts, Q: 9.0pts - Standard): Train machine learning model for user recommendation
✅ @AI-Engineer (P: 14.0pts, Q: 16.0pts - Senior): Optimize neural network performance for real-time inference
```

### Dynamic Specialist Examples
```
✅ @React-Developer (P: 2.0pts, Q: 1.5pts - Standard): Create responsive navigation component
✅ @Kubernetes-Engineer (P: 6.0pts, Q: 8.0pts - Standard): Configure auto-scaling for production cluster
✅ @GraphQL-Expert (P: 4.5pts, Q: 5.0pts - Standard): Design schema for user management system
✅ @Blockchain-Specialist (P: 1.0pts, Q: 0.5pts - Standard): Implement smart contract for token exchange
```

### State Level Examples
```
✅ @Developer (P: 2.0pts, Q: 3.0pts - Standard): Fix minor UI styling issue
✅ @Developer (P: 15.0pts, Q: 12.0pts - Senior): Lead code review for major feature release
✅ @Architect (P: 28.0pts, Q: 35.0pts - Elite): Design enterprise-scale system architecture
✅ @PM (P: 100.0pts, Q: 95.0pts - Master): Coordinate multi-team enterprise project delivery
```

## Common Violations and Corrections

### Missing @ Symbol
```
❌ Developer (P: 3.5pts, Q: 2.0pts - Standard): Implement feature
✅ @Developer (P: 3.5pts, Q: 2.0pts - Standard): Implement feature
```

### Missing Score Information
```
❌ @Developer: Implement authentication system
✅ @Developer (P: 3.5pts, Q: 2.0pts - Standard): Implement authentication system
```

### Missing Level Information
```
❌ @Developer (P: 3.5pts, Q: 2.0pts): Fix bug in payment processing
✅ @Developer (P: 3.5pts, Q: 2.0pts - Standard): Fix bug in payment processing
```

### Incorrect Score Format
```
❌ @Developer (P: 3.5, Q: 2.0 - Standard): Test new feature
✅ @Developer (P: 3.5pts, Q: 2.0pts - Standard): Test new feature

❌ @Developer (3.5pts, 2.0pts - Standard): Deploy to staging
✅ @Developer (P: 3.5pts, Q: 2.0pts - Standard): Deploy to staging
```

### Incorrect Parentheses Usage
```
❌ @Developer - P: 3.5pts, Q: 2.0pts - Standard - Implement feature
✅ @Developer (P: 3.5pts, Q: 2.0pts - Standard): Implement feature

❌ @Developer [P: 3.5pts, Q: 2.0pts - Standard]: Implement feature
✅ @Developer (P: 3.5pts, Q: 2.0pts - Standard): Implement feature
```

### Missing Task Description
```
❌ @Developer (P: 3.5pts, Q: 2.0pts - Standard):
✅ @Developer (P: 3.5pts, Q: 2.0pts - Standard): Implement user authentication system
```

### Vague Task Descriptions
```
❌ @Developer (P: 3.5pts, Q: 2.0pts - Standard): Do stuff
✅ @Developer (P: 3.5pts, Q: 2.0pts - Standard): Implement user registration form validation

❌ @Architect (P: 15.0pts, Q: 18.0pts - Senior): Design thing
✅ @Architect (P: 15.0pts, Q: 18.0pts - Senior): Design microservices architecture for order processing system
```

## Auto-Correction Examples

### System Auto-Correction Process
When a violation is detected, the system automatically:

1. **Detects violation:**
   ```
   Input: @Developer: Fix bug
   ```

2. **Applies penalty:**
   ```
   -1.0 P score penalty applied to @Developer
   ```

3. **Looks up current scores:**
   ```
   Reading ~/.claude/scores.md...
   Found: @Developer (P: 3.5pts, Q: 2.0pts - Standard)
   ```

4. **Generates correct format:**
   ```
   Auto-corrected to: @Developer (P: 2.5pts, Q: 2.0pts - Standard): Fix bug
   ```

5. **Continues with corrected format:**
   ```
   Proceeding with task using corrected format...
   ```

## Best Practices

### Task Description Guidelines
- **Be Specific:** Include what exactly needs to be done
- **Include Context:** Mention the system or component being modified
- **Use Action Verbs:** Start with clear action words (Implement, Fix, Design, Review, etc.)
- **Avoid Ambiguity:** Be clear about the expected outcome

### Examples of Well-Formed Task Descriptions
```
✅ @Developer (P: 3.5pts, Q: 2.0pts - Standard): Implement password reset functionality for user authentication system
✅ @Security-Engineer (P: 5.0pts, Q: 7.0pts - Standard): Conduct penetration testing on API endpoints in staging environment
✅ @Architect (P: 15.0pts, Q: 18.0pts - Senior): Design database schema for multi-tenant SaaS application
✅ @DevOps-Engineer (P: 8.0pts, Q: 6.0pts - Standard): Configure CI/CD pipeline for automated deployment to production
```

## Training Scenarios

### Scenario 1: New Team Member
A new @AI-Engineer joins the team with default scores:
```
✅ @AI-Engineer (P: 0.0pts, Q: 0.0pts - Standard): Review codebase and understand current AI implementation
```

### Scenario 2: Score Changes
After successful task completion, scores are updated:
```
Before: @Developer (P: 3.5pts, Q: 2.0pts - Standard): Implement user registration
After: @Developer (P: 4.0pts, Q: 2.5pts - Standard): Next task description
```

### Scenario 3: Level Transitions
When a team member reaches a new level:
```
@Architect (P: 10.0pts, Q: 10.0pts - Senior): Review architectural decisions for scalability
```

### Scenario 4: Dynamic Specialists
When creating a new specialist:
```
@TypeScript-Expert (P: 0.0pts, Q: 0.0pts - Standard): Convert JavaScript modules to TypeScript
```

## Quick Validation Checklist

Before executing any task, verify:

- [ ] Starts with @ symbol
- [ ] Role name is clearly identified
- [ ] Parentheses contain score information
- [ ] P: and Q: labels are present
- [ ] pts suffix is included for both scores
- [ ] Level is specified (Standard, Senior, Elite, Master)
- [ ] Colon separates format from task description
- [ ] Task description is specific and actionable

## System Integration

### Automatic Score Population
The system automatically:
- Reads current scores from ~/.claude/scores.md
- Populates P: and Q: values
- Determines current level based on scores
- Generates complete correct format

### Penalty Application
When violations occur:
- -1.0 P score penalty is immediately applied
- Scores.md is updated with penalty
- Violation is logged for pattern tracking
- Learning callout is generated for education

### Educational Integration
The system provides:
- Immediate feedback on violations
- Clear examples of correct format
- Educational callouts for improvement
- Pattern recognition for repeated issues

This comprehensive guide ensures all team members understand and consistently apply the correct task format, eliminating confusion and maintaining professional communication standards across the virtual team.