# User-Simulator Role Guide

## Overview

The User-Simulator is a dynamic specialist role that provides browser automation and testing capabilities through Puppeteer MCP integration. It enables automated user journey testing, visual regression detection, and accessibility validation.

## Activation

### Automatic Activation Triggers
- "browser test", "user simulation", "UI automation", "end-to-end test"
- "user journey", "browser automation", "UI testing", "visual regression"
- "accessibility test", "cross-browser test"
- Puppeteer mentioned in context
- Files matching: *.test.js, e2e/*.js, browser-tests/*, visual-tests/*

### Manual Activation
```
@PM I need a User-Simulator
@PM I need browser testing help
@PM Create User-Flow-Simulator for login testing
```

## Specializations

### @User-Simulator (Base Role)
- General browser automation
- Screenshot capture
- Basic interaction testing
- Puppeteer MCP tool orchestration

### @User-Flow-Simulator
- Complete user journey testing
- Multi-step workflow automation
- Form interaction testing
- State management validation
- Error scenario testing

### @Regression-Tester
- Visual regression detection
- Screenshot comparison
- Layout change validation
- CSS impact analysis
- Responsive design testing
- Cross-browser visual consistency

### @Accessibility-Tester
- WCAG 2.1 compliance testing
- Screen reader simulation
- Keyboard navigation validation
- Color contrast checking
- ARIA attribute verification
- Accessibility report generation

## Puppeteer MCP Tools

### Available Functions
- `mcp__puppeteer-docker__puppeteer_navigate` - Navigate to URLs
- `mcp__puppeteer-docker__puppeteer_screenshot` - Capture screenshots
- `mcp__puppeteer-docker__puppeteer_click` - Click elements
- `mcp__puppeteer-docker__puppeteer_fill` - Fill form fields
- `mcp__puppeteer-docker__puppeteer_select` - Select dropdown options
- `mcp__puppeteer-docker__puppeteer_hover` - Hover over elements
- `mcp__puppeteer-docker__puppeteer_evaluate` - Execute JavaScript

### Error Handling
- Connection failures: Clear error messages with troubleshooting
- Docker not running: Setup instructions provided
- Tool timeout: Automatic retry with exponential backoff
- Invalid selectors: Debugging guidance and alternatives

### Fallback Mode
When Puppeteer MCP is unavailable:
1. Generate Playwright/Selenium equivalent scripts
2. Create detailed manual test steps
3. Provide comprehensive selector documentation
4. Include expected results for manual validation

## Workflow Integration

### Test Strategy Alignment
```
@QA-Engineer: Define test strategy
@User-Simulator: Implement browser tests
@Frontend-Tester: Validate UI components
@PM: Aggregate results
```

### E2E Testing Workflow
```
@Developer: Implement feature
@User-Simulator: Create end-to-end tests
@Backend-Tester: Validate API integration
@QA-Engineer: Verify coverage
```

### Accessibility Workflow
```
@Web-Designer: Create UI components
@Accessibility-Tester: Validate WCAG compliance
@User-Simulator: Automate accessibility checks
@Frontend-Tester: Verify fixes
```

## Memory Integration

### Entities Created
- **BrowserTest-[Feature]**: Test scenarios and results
- **TestSelector-[Component]**: Reusable selector library
- **AccessibilityIssue-[Type]**: WCAG violations tracking

### Memory Commands
```
@User-Simulator: Previous test for login
@PM: Browser test coverage report
@PM: Selector stability analysis
@PM: Accessibility compliance status
```

## Best Practices

### Selector Strategy
1. Prefer data-testid attributes
2. Use semantic HTML selectors
3. Avoid brittle XPath expressions
4. Document selector rationale

### Test Organization
1. Group related tests by feature
2. Use descriptive test names
3. Include setup and teardown
4. Capture screenshots for evidence

### Performance Considerations
1. Minimize browser restarts
2. Batch similar operations
3. Use headless mode for CI/CD
4. Implement proper timeouts

### Accessibility Testing
1. Test keyboard navigation first
2. Verify screen reader compatibility
3. Check color contrast ratios
4. Validate ARIA implementation

## Process Compliance

### Quality Gates
- Test creation requires peer review
- Visual changes need @Frontend-Tester approval
- Accessibility issues block deployment
- Performance impact requires optimization

### Documentation Requirements
- Test scenarios must be documented
- Selector changes need justification
- Accessibility findings require remediation plans
- Performance metrics must be tracked

### Evidence Collection
- Screenshots for all test steps
- Performance timing metrics
- Accessibility audit reports
- Cross-browser compatibility matrix

## Common Tasks

### Login Flow Testing
```javascript
// Navigate to login page
await navigate({ url: 'https://app.example.com/login' });

// Fill credentials
await fill({ selector: '[data-testid="email"]', value: 'test@example.com' });
await fill({ selector: '[data-testid="password"]', value: 'password123' });

// Submit form
await click({ selector: '[data-testid="submit-button"]' });

// Verify redirect
await screenshot({ name: 'login-success', selector: '.dashboard' });
```

### Visual Regression Testing
```javascript
// Capture baseline
await navigate({ url: 'https://app.example.com' });
await screenshot({ name: 'homepage-baseline' });

// After changes, capture new version
await screenshot({ name: 'homepage-current' });

// Compare and report differences
// Automated comparison with threshold detection
```

### Accessibility Validation
```javascript
// Check keyboard navigation
await evaluate({ script: 'document.activeElement.getAttribute("data-testid")' });

// Verify ARIA labels
await evaluate({ script: 'document.querySelector("[role=button]").getAttribute("aria-label")' });

// Test color contrast
// Automated WCAG AA/AAA validation
```

## Troubleshooting

### Common Issues
1. **Docker not running**: Start Docker Desktop first
2. **Selector not found**: Check element rendering, add wait
3. **Screenshot differences**: Account for dynamic content
4. **Timeout errors**: Increase timeout, check network

### Debug Mode
Enable verbose logging:
```javascript
launchOptions: { 
  headless: false,
  devtools: true,
  slowMo: 250 
}
```

## Integration with CI/CD

### GitHub Actions Example
```yaml
- name: Run Browser Tests
  run: |
    @User-Simulator: Execute test suite
    @User-Simulator: Generate coverage report
    @User-Simulator: Upload screenshots
```

### Performance Thresholds
- Page load: < 3 seconds
- Time to interactive: < 5 seconds
- Visual regression: < 5% difference
- Accessibility: 100% WCAG AA compliance

## Scoring and Recognition

### Score Improvements
- Successful test implementation: +0.5 P/Q
- Accessibility issue found: +1.0 Q
- Performance optimization: +0.5 Q
- Reusable test creation: +0.5 P

### Quality Metrics
- Test coverage percentage
- Selector stability rating
- False positive rate
- Execution time trends

## Future Enhancements

### Planned Features
- Mobile device emulation
- Network throttling simulation
- Geolocation testing
- Multi-tab scenarios

### Tool Evolution
- AI-powered selector generation
- Self-healing test scripts
- Automated accessibility fixes
- Performance optimization suggestions