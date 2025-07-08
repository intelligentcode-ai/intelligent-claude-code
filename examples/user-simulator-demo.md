# User-Role Demo Examples

## Example 1: Basic Navigation and Screenshot

```markdown
User: I need to test if the Google homepage loads correctly

@PM: Analyzing browser testing request. Creating User-Role specialist.

@User-Role (P: 0.0pts, Q: 0.0pts - Standard): Executing browser navigation test

1. Navigating to Google homepage
2. Capturing screenshot for verification
3. Validating page elements

[Executing Puppeteer MCP tools...]
```

## Example 2: Form Interaction Testing

```markdown
User: Test the login form on our staging site

@PM: Browser testing request detected. Delegating to User-Flow-Simulator.

@User-Flow-Simulator (P: 0.0pts, Q: 0.0pts - Standard): Implementing login flow test

Test Scenario:
1. Navigate to login page
2. Enter test credentials
3. Submit form
4. Verify successful redirect
5. Capture evidence screenshots

[Automated test execution with Puppeteer MCP...]
```

## Example 3: Accessibility Validation

```markdown
User: Check if our website meets WCAG accessibility standards

@PM: Accessibility testing required. Creating Accessibility-Tester specialist.

@Accessibility-Tester (P: 0.0pts, Q: 0.0pts - Standard): Performing WCAG compliance audit

Testing:
- Keyboard navigation
- Screen reader compatibility
- Color contrast ratios
- ARIA implementation
- Focus indicators

[Running accessibility tests...]
```

## Example 4: Visual Regression Testing

```markdown
User: I want to detect any visual changes after the latest CSS update

@PM: Visual regression testing needed. Activating Regression-Tester.

@Regression-Tester (P: 0.0pts, Q: 0.0pts - Standard): Setting up visual regression tests

Process:
1. Capture baseline screenshots
2. Apply CSS changes
3. Capture new screenshots
4. Compare for differences
5. Generate difference report

[Visual comparison in progress...]
```

## Example 5: Multi-Role Collaboration

```markdown
User: Create comprehensive tests for our new checkout feature

@PM: Complex testing scenario. Orchestrating multiple specialists.

@QA-Engineer (P: 0.0pts, Q: 0.0pts - Standard): Defining test strategy
- Unit tests for calculations
- Integration tests for payment API
- E2E tests for user flow
- Performance benchmarks

@User-Role (P: 0.0pts, Q: 0.0pts - Standard): Implementing browser automation
- Product selection flow
- Cart management
- Checkout process
- Payment confirmation

@Backend-Tester (P: 0.0pts, Q: 0.0pts - Standard): Validating API endpoints
- Cart API responses
- Payment processing
- Order confirmation
- Email notifications

@Frontend-Tester (P: 0.0pts, Q: 0.0pts - Standard): UI component validation
- Responsive design
- Component rendering
- Error states
- Loading indicators

[Collaborative testing in progress...]
```

## Example 6: Fallback Mode (No Puppeteer)

```markdown
User: Test the search functionality

@PM: Browser testing requested. Checking tool availability.

@User-Role (P: 0.0pts, Q: 0.0pts - Standard): Puppeteer MCP unavailable. Generating manual test plan.

Manual Test Steps:
1. Navigate to: https://example.com
2. Locate search input: [data-testid="search-input"]
3. Enter test query: "test product"
4. Click search button: [data-testid="search-submit"]
5. Verify results: 
   - Results container visible
   - At least 1 result displayed
   - Search term highlighted

Alternative Automation Script (Playwright):
```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://example.com');
  await page.fill('[data-testid="search-input"]', 'test product');
  await page.click('[data-testid="search-submit"]');
  
  await page.waitForSelector('.search-results');
  const resultCount = await page.locator('.result-item').count();
  
  console.log(`Found ${resultCount} results`);
  await browser.close();
})();
```
```

## Example 7: Memory Integration

```markdown
User: What browser tests do we have for the login feature?

@PM: Retrieving browser test history from memory.

@User-Role (P: 0.5pts, Q: 0.5pts - Standard): Searching test memory...

Found BrowserTest entities:
1. BrowserTest-Login-Success
   - Test steps: Navigate → Fill credentials → Submit → Verify dashboard
   - Selectors: Stable, last verified 2 days ago
   - Success rate: 98%
   
2. BrowserTest-Login-Failure
   - Test steps: Navigate → Invalid credentials → Submit → Verify error
   - Selectors: Updated after UI change
   - Success rate: 100%

3. BrowserTest-Login-Recovery
   - Test steps: Navigate → Forgot password → Email → Verify reset
   - Selectors: New test, needs review
   - Success rate: 95%

Reusable selectors available:
- Login form: [data-testid="login-form"]
- Email input: [data-testid="email"]
- Password input: [data-testid="password"]
- Submit button: [data-testid="submit"]
```

## Example 8: Scoring and Process Compliance

```markdown
User: The login test is failing, fix it

@PM: Test failure detected. Following debugging workflow.

@User-Role (P: 0.5pts, Q: 0.5pts - Standard): Investigating test failure

1. Checking selector stability... 
   - ISSUE: Selector [data-testid="submit"] not found
   - Root cause: Button ID changed to "login-submit"

2. Updating test...
   - Old selector: [data-testid="submit"]
   - New selector: [data-testid="login-submit"]

3. Re-running test...
   - Test passing ✓
   - Screenshots captured
   - Memory updated

Process compliance achieved:
- Issue identified (+0.5 Q)
- Fix implemented (+0.5 P)
- Evidence documented
- Peer review requested

@Frontend-Tester: Please review selector change for stability
```