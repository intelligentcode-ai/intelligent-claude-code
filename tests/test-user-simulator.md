# User-Role Integration Test Script

## Test 1: Activation Triggers
Test that User-Role activates on correct keywords:
- "browser test"
- "user simulation" 
- "UI automation"
- "end-to-end test"
- "visual regression"
- "accessibility test"

## Test 2: Score Initialization
Verify that User-Role gets proper score initialization:
- Check ~/.claude/scores.md for entry
- Format: "@User-Role: P: 0.0pts, Q: 0.0pts - Standard - Last Updated: [timestamp]"

## Test 3: Specialization Creation
Test dynamic specialist creation:
- "@PM I need a User-Flow-Simulator"
- "@PM I need a Regression-Tester"
- "@PM I need an Accessibility-Tester"

## Test 4: Puppeteer MCP Tool Access
Verify tool availability:
- mcp__puppeteer-docker__puppeteer_navigate
- mcp__puppeteer-docker__puppeteer_screenshot
- mcp__puppeteer-docker__puppeteer_click
- mcp__puppeteer-docker__puppeteer_fill

## Test 5: Fallback Logic
Test graceful degradation when Puppeteer unavailable:
- Should generate manual test instructions
- Should provide Playwright/Selenium alternatives
- Should document selectors clearly

## Test 6: Memory Integration
Verify memory entities are created:
- BrowserTest-[Feature] entities
- TestSelector-[Component] entities
- AccessibilityIssue-[Type] entities

## Test 7: Collaboration Workflow
Test handoff protocols:
- @QA-Engineer → @User-Role
- @User-Role → @Frontend-Tester
- @User-Role → @Backend-Tester
- @Web-Designer → @Accessibility-Tester

## Test 8: Automatic Peer Review
Verify peer review triggers:
- Browser test file changes → @User-Role review
- Visual test changes → @Regression-Tester review
- Accessibility test changes → @Accessibility-Tester review

## Test 9: Process Compliance
Check enforcement protocols:
- Quality gates respected
- Evidence collection mandatory
- Documentation requirements met
- Scoring updates properly

## Test 10: Error Handling
Test error scenarios:
- Invalid selectors
- Docker not running
- Connection timeouts
- Tool unavailability

## Expected Results
All tests should pass with:
- Proper role activation
- Correct score initialization
- Successful tool execution or fallback
- Memory persistence
- Process compliance
- Error handling with clear messages