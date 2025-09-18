# Code Review Standards

**Type:** quality
**Applies To:** tiny, medium, large, mega
**Keywords:** code review, quality assurance, peer review, standards, collaboration

## Description

Comprehensive code review standards to ensure code quality, knowledge sharing, and team collaboration.

## Implementation

### Review Process
- All code changes require peer review before merge
- Reviews should be constructive and educational
- Review for correctness, performance, security, and maintainability
- Use automated tools to catch basic issues before human review

### Review Checklist
- Code follows established coding standards
- Logic is clear and well-documented
- Error handling is appropriate
- Tests are included and comprehensive
- Security considerations addressed
- Performance implications considered

### Review Communication
- Be respectful and constructive in feedback
- Explain the "why" behind suggestions
- Ask questions to understand the approach
- Acknowledge good practices and improvements

## Quality Gates
- [ ] All changes reviewed by at least one qualified team member
- [ ] Automated checks (linting, testing) pass before review
- [ ] Security implications reviewed and addressed
- [ ] Performance impact assessed
- [ ] Documentation updated if needed
- [ ] Review feedback addressed satisfactorily
- [ ] All conversations resolved before merge

## Examples

### Good Review Comment
```
Consider using a Map instead of object lookup here:

const statusMap = new Map([
  ['pending', 'Processing'],
  ['complete', 'Finished'],
  ['error', 'Failed']
]);

This provides better performance for frequent lookups and cleaner syntax.
```

### Review Checklist Template
```markdown
## Code Review Checklist

### Functionality
- [ ] Code accomplishes stated requirements
- [ ] Edge cases handled appropriately
- [ ] Error handling is robust

### Quality
- [ ] Code is readable and well-documented
- [ ] Follows established coding standards
- [ ] No code duplication or unnecessary complexity

### Testing
- [ ] Adequate test coverage provided
- [ ] Tests are meaningful and comprehensive
- [ ] All tests pass

### Security
- [ ] No security vulnerabilities introduced
- [ ] Input validation where appropriate
- [ ] Sensitive data handled correctly
```