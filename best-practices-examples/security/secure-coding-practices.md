# Secure Coding Practices

**Type:** security
**Applies To:** tiny, medium, large, mega
**Keywords:** security, authentication, authorization, input validation, encryption

## Description

Essential security practices for developing secure applications and protecting against common vulnerabilities.

## Implementation

### Input Validation
- Validate all input at application boundaries
- Use whitelist validation over blacklist
- Sanitize output for different contexts (HTML, SQL, etc.)
- Implement proper error handling without information disclosure

### Authentication & Authorization
- Use strong password policies and secure storage
- Implement proper session management
- Use principle of least privilege for authorization
- Implement multi-factor authentication for sensitive operations

### Data Protection
- Encrypt sensitive data at rest and in transit
- Use HTTPS for all communications
- Implement proper key management
- Avoid storing sensitive data unnecessarily

### Common Vulnerability Prevention
- Prevent SQL injection through parameterized queries
- Avoid XSS through proper output encoding
- Implement CSRF protection for state-changing operations
- Use secure headers and Content Security Policy

## Quality Gates
- [ ] All user inputs validated and sanitized
- [ ] Authentication and authorization properly implemented
- [ ] Sensitive data encrypted at rest and in transit
- [ ] SQL injection prevention mechanisms in place
- [ ] XSS protection through output encoding
- [ ] CSRF tokens implemented for state changes
- [ ] Security headers configured (CSP, HSTS, etc.)
- [ ] Error messages don't reveal sensitive information

## Examples

### Input Validation
```javascript
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string') {
        throw new ValidationError('Email is required');
    }
    if (!emailRegex.test(email)) {
        throw new ValidationError('Invalid email format');
    }
    return email.toLowerCase().trim();
}
```

### SQL Injection Prevention
```javascript
// GOOD: Parameterized query
const user = await db.query(
    'SELECT * FROM users WHERE email = ? AND active = ?',
    [email, true]
);

// BAD: String concatenation
const user = await db.query(
    `SELECT * FROM users WHERE email = '${email}' AND active = true`
);
```

### Secure Password Hashing
```javascript
const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}
```