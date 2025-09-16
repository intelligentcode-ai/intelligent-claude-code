/**
 * Test suite for Intent Classification Engine
 * 
 * Tests classification accuracy, performance, and edge cases
 */

const classifier = require('./intent-classifier');

// Test scenarios with expected results
const testScenarios = [
  // Research intent scenarios
  {
    name: "Reading file for analysis",
    tool: "Read",
    parameters: { file_path: "/project/src/main.js" },
    context: "Let me read this file to understand the structure",
    expected: "research",
    minConfidence: 0.6
  },
  {
    name: "Searching for patterns",
    tool: "Grep",
    parameters: { pattern: "function.*auth", path: "/project/src" },
    context: "Search for authentication functions",
    expected: "research",
    minConfidence: 0.6
  },
  {
    name: "Finding files by pattern",
    tool: "Glob",
    parameters: { pattern: "**/*.js" },
    context: "Find all JavaScript files",
    expected: "research",
    minConfidence: 0.6
  },
  {
    name: "Read-only bash command",
    tool: "Bash",
    parameters: { command: "ls -la /project" },
    context: "List project files",
    expected: "research",
    minConfidence: 0.7
  },
  
  // Q&A intent scenarios
  {
    name: "Explanation request",
    tool: "Read",
    parameters: { file_path: "/docs/api.md" },
    context: "What does this API endpoint do?",
    expected: "qa",
    minConfidence: 0.4
  },
  {
    name: "Question about implementation",
    tool: "Grep",
    parameters: { pattern: "class.*User" },
    context: "How is the User class implemented?",
    expected: "qa",
    minConfidence: 0.4
  },
  {
    name: "Direct question",
    tool: "Read",
    parameters: { file_path: "/config/settings.json" },
    context: "Can you explain how this configuration works?",
    expected: "qa",
    minConfidence: 0.4
  },
  
  // Planning intent scenarios
  {
    name: "Creating PRB file",
    tool: "Write",
    parameters: { file_path: "/prbs/ready/auth-system.prb.yaml" },
    context: "@PM create PRB for authentication system",
    expected: "planning",
    minConfidence: 0.5
  },
  {
    name: "Story creation",
    tool: "Write",
    parameters: { file_path: "/stories/user-registration.md" },
    context: "Create user story for registration feature",
    expected: "planning",
    minConfidence: 0.5
  },
  {
    name: "Architecture discussion",
    tool: "Read",
    parameters: { file_path: "/docs/architecture.md" },
    context: "@Architect should we use microservices approach?",
    expected: "planning",
    minConfidence: 0.4
  },
  {
    name: "Documentation writing",
    tool: "Write",
    parameters: { file_path: "/docs/api-design.md" },
    context: "Document the API design decisions",
    expected: "planning",
    minConfidence: 0.4
  },
  
  // Work intent scenarios
  {
    name: "Code implementation",
    tool: "Edit",
    parameters: { file_path: "/src/auth.js" },
    context: "Implement user authentication functionality",
    expected: "work",
    minConfidence: 0.7
  },
  {
    name: "Bug fix",
    tool: "Edit",
    parameters: { file_path: "/src/utils.js" },
    context: "Fix the validation bug in utils",
    expected: "work",
    minConfidence: 0.7
  },
  {
    name: "File creation with work intent",
    tool: "Write",
    parameters: { file_path: "/src/components/LoginForm.js" },
    context: "Create login form component",
    expected: "work",
    minConfidence: 0.6
  },
  {
    name: "Configuration modification",
    tool: "Edit",
    parameters: { file_path: "/config/database.json" },
    context: "Update database configuration",
    expected: "work",
    minConfidence: 0.6
  },
  {
    name: "System command execution",
    tool: "Bash",
    parameters: { command: "npm install express" },
    context: "Install express package",
    expected: "work",
    minConfidence: 0.6
  },
  {
    name: "Work intent language",
    tool: "Edit",
    parameters: { file_path: "/src/api.js" },
    context: "Let me fix this API endpoint",
    expected: "work",
    minConfidence: 0.7
  },
  {
    name: "Direct role work assignment",
    tool: "Edit",
    parameters: { file_path: "/src/services/auth.js" },
    context: "@Developer implement OAuth integration",
    expected: "work",
    minConfidence: 0.7
  },
  
  // Edge cases and ambiguous scenarios
  {
    name: "Ambiguous read with work context",
    tool: "Read",
    parameters: { file_path: "/src/broken.js" },
    context: "I need to fix this file",
    expected: "work", // Work intent overrides read tool
    minConfidence: 0.4
  },
  {
    name: "Question about modification",
    tool: "Read",
    parameters: { file_path: "/src/auth.js" },
    context: "Should I modify this authentication method?",
    expected: "qa", // Question format takes precedence
    minConfidence: 0.4
  },
  {
    name: "Planning with implementation mention",
    tool: "Write",
    parameters: { file_path: "/docs/implementation-plan.md" },
    context: "Create implementation plan for user system",
    expected: "planning", // Planning document takes precedence
    minConfidence: 0.4
  }
];

// Performance test scenarios
const performanceScenarios = [
  {
    tool: "Edit",
    parameters: { file_path: "/src/complex-system.js" },
    context: "Implement complex authentication system with OAuth, JWT, and role-based access control"
  },
  {
    tool: "Read",
    parameters: { file_path: "/docs/very-long-documentation.md" },
    context: "What are the main architectural patterns described in this comprehensive documentation?"
  },
  {
    tool: "Bash",
    parameters: { command: "find /project -name '*.js' -type f -exec grep -l 'auth' {} \\;" },
    context: "Search for all authentication-related files"
  }
];

/**
 * Run classification accuracy tests
 */
function runAccuracyTests() {
  console.log("Running Intent Classification Accuracy Tests...\n");
  
  let totalTests = 0;
  let passedTests = 0;
  const results = [];
  
  for (const scenario of testScenarios) {
    totalTests++;
    
    const result = classifier.classifyIntent(
      scenario.tool,
      scenario.parameters,
      scenario.context
    );
    
    const passed = result.intent === scenario.expected && 
                   result.confidence >= scenario.minConfidence;
    
    if (passed) {
      passedTests++;
    }
    
    results.push({
      name: scenario.name,
      expected: scenario.expected,
      actual: result.intent,
      confidence: result.confidence,
      minConfidence: scenario.minConfidence,
      passed: passed,
      timing: result.timing
    });
    
    console.log(`${passed ? '✅' : '❌'} ${scenario.name}`);
    console.log(`   Expected: ${scenario.expected} (min confidence: ${scenario.minConfidence})`);
    console.log(`   Actual: ${result.intent} (confidence: ${result.confidence})`);
    console.log(`   Timing: ${result.timing}ms\n`);
  }
  
  const accuracy = (passedTests / totalTests) * 100;
  console.log(`\nAccuracy Test Results: ${passedTests}/${totalTests} passed (${accuracy.toFixed(1)}%)`);
  
  return {
    accuracy: accuracy,
    totalTests: totalTests,
    passedTests: passedTests,
    results: results
  };
}

/**
 * Run performance tests
 */
function runPerformanceTests() {
  console.log("\nRunning Performance Tests...\n");
  
  const timings = [];
  
  for (let i = 0; i < performanceScenarios.length; i++) {
    const scenario = performanceScenarios[i];
    
    // Run multiple iterations for each scenario
    const iterations = 100;
    const scenarioTimings = [];
    
    for (let j = 0; j < iterations; j++) {
      const result = classifier.classifyIntent(
        scenario.tool,
        scenario.parameters,
        scenario.context
      );
      scenarioTimings.push(result.timing);
    }
    
    const avgTiming = scenarioTimings.reduce((sum, t) => sum + t, 0) / iterations;
    const maxTiming = Math.max(...scenarioTimings);
    const minTiming = Math.min(...scenarioTimings);
    
    timings.push({ avgTiming, maxTiming, minTiming });
    
    console.log(`Performance Test ${i + 1}:`);
    console.log(`   Tool: ${scenario.tool}`);
    console.log(`   Average: ${avgTiming.toFixed(3)}ms`);
    console.log(`   Max: ${maxTiming.toFixed(3)}ms`);
    console.log(`   Min: ${minTiming.toFixed(3)}ms`);
    console.log(`   Iterations: ${iterations}\n`);
  }
  
  const overallAvg = timings.reduce((sum, t) => sum + t.avgTiming, 0) / timings.length;
  const overallMax = Math.max(...timings.map(t => t.maxTiming));
  
  console.log(`Overall Performance Results:`);
  console.log(`   Average timing: ${overallAvg.toFixed(3)}ms`);
  console.log(`   Maximum timing: ${overallMax.toFixed(3)}ms`);
  console.log(`   Performance target: <5ms ✅ ${overallMax < 5 ? 'PASSED' : 'FAILED'}`);
  
  return {
    averageTiming: overallAvg,
    maximumTiming: overallMax,
    performanceTarget: overallMax < 5
  };
}

/**
 * Test edge cases and error handling
 */
function runEdgeCaseTests() {
  console.log("\nRunning Edge Case Tests...\n");
  
  const edgeCases = [
    {
      name: "Null tool",
      tool: null,
      parameters: {},
      context: "test"
    },
    {
      name: "Empty tool",
      tool: "",
      parameters: {},
      context: "test"
    },
    {
      name: "Undefined parameters",
      tool: "Read",
      parameters: undefined,
      context: "test"
    },
    {
      name: "Null context",
      tool: "Read",
      parameters: { file_path: "/test.js" },
      context: null
    },
    {
      name: "Very long context",
      tool: "Edit",
      parameters: { file_path: "/test.js" },
      context: "a".repeat(10000) + " implement feature"
    }
  ];
  
  let passedEdgeCases = 0;
  
  for (const testCase of edgeCases) {
    try {
      const result = classifier.classifyIntent(
        testCase.tool,
        testCase.parameters,
        testCase.context
      );
      
      const hasValidResult = result && 
                             typeof result.intent === 'string' && 
                             typeof result.confidence === 'number' &&
                             result.confidence >= 0 && result.confidence <= 1 &&
                             typeof result.timing === 'number' && result.timing >= 0;
      
      if (hasValidResult) {
        passedEdgeCases++;
        console.log(`✅ ${testCase.name}: ${result.intent} (${result.confidence})`);
      } else {
        console.log(`❌ ${testCase.name}: Invalid result format`);
      }
    } catch (error) {
      console.log(`❌ ${testCase.name}: Exception thrown - ${error.message}`);
    }
  }
  
  console.log(`\nEdge Case Results: ${passedEdgeCases}/${edgeCases.length} passed`);
  
  return {
    totalEdgeCases: edgeCases.length,
    passedEdgeCases: passedEdgeCases
  };
}

/**
 * Test isWorkIntent function
 */
function testIsWorkIntent() {
  console.log("\nTesting isWorkIntent function...\n");
  
  const testCases = [
    { classification: { intent: 'work', confidence: 0.8 }, threshold: 0.3, expected: true },
    { classification: { intent: 'work', confidence: 0.2 }, threshold: 0.3, expected: false },
    { classification: { intent: 'research', confidence: 0.9 }, threshold: 0.3, expected: false },
    { classification: { intent: 'work', confidence: 0.5 }, threshold: 0.6, expected: false },
    { classification: null, threshold: 0.3, expected: false },
    { classification: {}, threshold: 0.3, expected: false }
  ];
  
  let passed = 0;
  
  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    const result = classifier.isWorkIntent(testCase.classification, testCase.threshold);
    
    if (result === testCase.expected) {
      passed++;
      console.log(`✅ Test ${i + 1}: ${result} (expected ${testCase.expected})`);
    } else {
      console.log(`❌ Test ${i + 1}: ${result} (expected ${testCase.expected})`);
    }
  }
  
  console.log(`\nisWorkIntent Results: ${passed}/${testCases.length} passed`);
  
  return {
    totalTests: testCases.length,
    passedTests: passed
  };
}

/**
 * Run all tests
 */
function runAllTests() {
  console.log("=".repeat(60));
  console.log("Intent Classification Engine - Test Suite");
  console.log("=".repeat(60));
  
  const accuracyResults = runAccuracyTests();
  const performanceResults = runPerformanceTests();
  const edgeCaseResults = runEdgeCaseTests();
  const isWorkIntentResults = testIsWorkIntent();
  
  console.log("\n" + "=".repeat(60));
  console.log("FINAL TEST SUMMARY");
  console.log("=".repeat(60));
  
  console.log(`Accuracy: ${accuracyResults.accuracy.toFixed(1)}% (${accuracyResults.passedTests}/${accuracyResults.totalTests})`);
  console.log(`Performance: ${performanceResults.performanceTarget ? 'PASSED' : 'FAILED'} (avg: ${performanceResults.averageTiming.toFixed(3)}ms, max: ${performanceResults.maximumTiming.toFixed(3)}ms)`);
  console.log(`Edge Cases: ${((edgeCaseResults.passedEdgeCases / edgeCaseResults.totalEdgeCases) * 100).toFixed(1)}% (${edgeCaseResults.passedEdgeCases}/${edgeCaseResults.totalEdgeCases})`);
  console.log(`isWorkIntent: ${((isWorkIntentResults.passedTests / isWorkIntentResults.totalTests) * 100).toFixed(1)}% (${isWorkIntentResults.passedTests}/${isWorkIntentResults.totalTests})`);
  
  const overallSuccess = accuracyResults.accuracy >= 95 && 
                        performanceResults.performanceTarget && 
                        edgeCaseResults.passedEdgeCases === edgeCaseResults.totalEdgeCases &&
                        isWorkIntentResults.passedTests === isWorkIntentResults.totalTests;
  
  console.log(`\nOVERALL: ${overallSuccess ? '✅ SUCCESS' : '❌ NEEDS IMPROVEMENT'}`);
  
  return {
    success: overallSuccess,
    accuracy: accuracyResults,
    performance: performanceResults,
    edgeCases: edgeCaseResults,
    isWorkIntent: isWorkIntentResults
  };
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests();
}

module.exports = {
  runAllTests,
  runAccuracyTests,
  runPerformanceTests,
  runEdgeCaseTests,
  testIsWorkIntent,
  testScenarios
};