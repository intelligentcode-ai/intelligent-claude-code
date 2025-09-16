# Hook System Test Framework

Comprehensive testing framework for the intelligent-claude-code hook system with intent detection and behavioral pattern enforcement.

## Overview

This test framework provides comprehensive testing for:
- **Intent Classification Engine**: Accurate classification of user intents (research, Q&A, planning, work)
- **Configuration System**: Loading, caching, and validation of intent patterns
- **Hook Integration**: End-to-end testing of the pre-tool-use hook
- **Performance Benchmarking**: Performance characteristics and optimization

## Test Structure

```
tests/
├── fixtures/                    # Test data and configurations
│   ├── test-scenarios.json     # Comprehensive test scenarios
│   ├── test-config.json        # Test configuration
│   └── mock-config.json        # Mock configuration
├── unit/                        # Unit tests
│   ├── intent-classifier.test.js
│   └── config-loader.test.js
├── integration/                 # Integration tests
│   └── hook-integration.test.js
├── performance/                 # Performance tests
│   ├── benchmark.js            # Standalone benchmarks
│   └── performance.test.js     # Jest performance tests
├── setup.js                    # Test setup and utilities
└── README.md                   # This file
```

## Running Tests

### Quick Start
```bash
# Install dependencies
npm install

# Run all tests with coverage
npm test

# Run comprehensive test suite
npm run test:all
```

### Individual Test Suites
```bash
# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration

# Performance tests only
npm run test:performance

# Legacy tests (standalone)
npm run test:legacy
npm run test:legacy:intent
npm run test:legacy:config
```

### Continuous Testing
```bash
# Watch mode for development
npm run test:watch

# Coverage report generation
npm run test:coverage
```

### Performance Benchmarking
```bash
# Standalone performance benchmarks
npm run benchmark

# Jest performance tests
npm run test:performance
```

## Test Scenarios

### Research Intent Tests
- File reading operations
- Pattern searching with Grep/Glob
- Read-only bash commands
- Documentation analysis
- Code exploration

### Q&A Intent Tests
- Question answering patterns
- Explanation requests
- Documentation queries
- How-to questions

### Planning Intent Tests
- PRB file creation
- Story documentation
- Architecture planning
- Design discussions with @Role mentions

### Work Intent Tests
- Code implementation
- Bug fixes
- File modifications
- System commands
- Configuration changes

### Edge Cases
- Ambiguous intents
- Large inputs
- Malformed data
- Error conditions
- Concurrent operations

## Performance Targets

| Metric | Target | Description |
|--------|--------|-------------|
| Classification Time | < 5ms | Average intent classification |
| P95 Response Time | < 15ms | 95th percentile response |
| P99 Response Time | < 25ms | 99th percentile response |
| Memory Usage | < 10MB | Per 1000 operations |
| Coverage | > 90% | Code coverage |

## Test Configuration

### Jest Configuration
- **Test Environment**: Node.js
- **Timeout**: 30 seconds for integration tests
- **Coverage Threshold**: 90% for all metrics
- **Reporters**: Default + JUnit XML

### Custom Test Utilities
Available as `global.testUtils`:
- `createMockInvocation(tool, parameters, context)` - Mock tool calls
- `wait(ms)` - Async delay utility
- `loadFixture(filename)` - Load test fixtures
- `measureTime(fn)` - Performance measurement
- `randomString(length)` - Generate test data

## Writing Tests

### Unit Test Example
```javascript
describe('Intent Classifier', () => {
  test('should classify research intent correctly', () => {
    const result = classifier.classifyIntent(
      'Read',
      { file_path: '/project/src/main.js' },
      'examining the code structure'
    );
    
    expect(result.intent).toBe('research');
    expect(result.confidence).toBeGreaterThan(0.6);
    expect(result.timing).toBeLessThan(10);
  });
});
```

### Integration Test Example
```javascript
test('should allow research operations', async () => {
  const input = {
    tool: 'Read',
    parameters: { file_path: '/test.js' },
    context: 'reading file contents'
  };
  
  const result = await runHook(input);
  
  expect(result.exitCode).toBe(0);
  expect(result.stdout.toLowerCase()).toContain('allowed');
});
```

### Performance Test Example
```javascript
test('should meet performance targets', () => {
  const timings = [];
  
  for (let i = 0; i < 100; i++) {
    const result = classifier.classifyIntent('Edit', {}, 'work context');
    timings.push(result.timing);
  }
  
  const avgTiming = timings.reduce((a, b) => a + b, 0) / timings.length;
  expect(avgTiming).toBeLessThan(5);
});
```

## Test Data

### Test Scenarios
The `test-scenarios.json` fixture contains comprehensive test cases:
- 200+ realistic scenarios
- All intent types covered
- Edge cases and error conditions
- Performance stress tests

### Mock Configurations
- `test-config.json` - Complete test configuration
- `mock-config.json` - Simplified mock configuration
- Environment variable overrides

## CI/CD Integration

### GitHub Actions Example
```yaml
- name: Run Hook Tests
  run: |
    cd src/hooks
    npm install
    npm run test:all

- name: Upload Coverage
  uses: codecov/codecov-action@v3
  with:
    file: src/hooks/coverage/lcov.info
```

### Test Reports
- **JUnit XML**: `test-results/junit.xml`
- **Coverage Reports**: `coverage/` directory
- **Performance Reports**: Console output with metrics

## Debugging Tests

### Verbose Output
```bash
# Enable verbose logging
HOOK_DEBUG_MODE=true npm test

# Run specific test file
npx jest tests/unit/intent-classifier.test.js --verbose
```

### Test Debugging
- Use `console.log()` in tests - captured in `global.testLogs`
- Set breakpoints in VS Code/editor
- Use `--detectOpenHandles` to find async issues
- Enable `--forceExit` for hanging processes

## Contributing

### Adding Tests
1. Create test file in appropriate directory (`unit/`, `integration/`, `performance/`)
2. Use existing patterns and utilities
3. Add test scenarios to fixtures if needed
4. Ensure tests meet performance targets
5. Update documentation

### Test Guidelines
- Use descriptive test names
- Test both success and failure cases
- Include performance assertions
- Mock external dependencies
- Clean up resources in `afterEach`

### Performance Testing
- Always include timing assertions
- Test with realistic data sizes
- Include stress testing scenarios
- Monitor memory usage
- Document performance characteristics

## Troubleshooting

### Common Issues

#### Jest Not Found
```bash
npm install jest@^29.7.0 --save-dev
```

#### Tests Timing Out
- Increase `testTimeout` in jest.config.js
- Check for unresolved promises
- Use `--forceExit` flag

#### Coverage Issues
- Ensure all source files are in `collectCoverageFrom`
- Check for excluded files
- Run `npm run test:coverage` for detailed report

#### Performance Test Failures
- Check system load during testing
- Adjust performance targets if needed
- Use `--maxWorkers=1` for consistent timing

### Getting Help
- Check test output for specific error messages
- Review Jest documentation for framework issues
- Check GitHub Issues for known problems
- Run individual test files to isolate issues

## Future Enhancements

- [ ] Visual regression testing for hook output
- [ ] Mutation testing for test quality
- [ ] Property-based testing for edge cases
- [ ] Containerized test environment
- [ ] Automated performance regression detection