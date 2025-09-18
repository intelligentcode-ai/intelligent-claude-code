# Clean Code Practices

**Type:** development
**Applies To:** tiny, medium, large, mega
**Keywords:** code quality, readability, maintainability, clean code

## Description

Clean code principles for readable, maintainable, and robust software development.

## Implementation

### Naming Conventions
- Use descriptive, searchable names
- Avoid mental mapping and abbreviations
- Use pronounceable names
- Use intention-revealing names

### Function Design
- Functions should be small (20 lines max preferred)
- Functions should do one thing
- Use descriptive function names
- Minimize function arguments (3 max preferred)

### Code Organization
- Organize code by feature, not by file type
- Keep related code close together
- Use consistent indentation and formatting
- Remove commented-out code

## Quality Gates
- [ ] All functions have clear, descriptive names
- [ ] No function exceeds 30 lines
- [ ] No more than 3 parameters per function
- [ ] No commented-out code remains
- [ ] Code follows consistent formatting standards
- [ ] All variables have intention-revealing names

## Examples

### Good Function Naming
```javascript
function calculateMonthlyPayment(principal, interestRate, termInMonths) {
    // Implementation
}
```

### Good Variable Naming
```javascript
const userAccount = getUserAccount(userId);
const isAccountActive = account.status === 'active';
```