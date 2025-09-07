# Intent Classification Engine

High-performance intent classification engine for the intelligent-claude-code system. Distinguishes between different types of user intents to enable proper main scope blocking and PRB execution patterns.

## Purpose

The intent classifier analyzes tool usage, parameters, and context to determine whether operations should be:
- **ALLOWED in main scope**: Research, Q&A, and planning activities
- **BLOCKED in main scope**: Work activities that require PRB+agent execution

## Classification Categories

### 1. Research Intent (ALLOWED)
- **Tools**: Read, Grep, Glob, WebSearch, WebFetch, Bash (read-only)
- **Context**: Understanding, analyzing, examining, reviewing
- **Examples**: 
  - Reading files to understand structure
  - Searching for patterns or information
  - Listing directory contents

### 2. Q&A Intent (ALLOWED)  
- **Patterns**: Questions, explanations, descriptions
- **Context**: "What/How/Why", "Can you explain", "Describe"
- **Examples**:
  - "What does this API endpoint do?"
  - "How is the User class implemented?"
  - "Can you explain this configuration?"

### 3. Planning Intent (ALLOWED)
- **Tools**: Write to *.prb.yaml, /stories/, /docs/
- **Context**: @Role mentions, architecture, design, planning
- **Examples**:
  - Creating PRB files
  - Writing user stories
  - Architecture discussions

### 4. Work Intent (BLOCKED)
- **Tools**: Edit, Write (code files), MultiEdit, NotebookEdit, Bash (system commands)
- **Context**: Implementation, fixing, modifying, deploying
- **Examples**:
  - Code implementation
  - Bug fixes
  - System configuration
  - Package installation

## API

### `classifyIntent(tool, parameters, context)`

Classifies user intent based on tool and context.

**Parameters:**
- `tool` (string): Tool name being invoked
- `parameters` (object): Tool parameters
- `context` (string): Additional context (user message, conversation)

**Returns:**
```javascript
{
  intent: 'research|qa|planning|work',
  confidence: 0.0-1.0,
  timing: 0.xxx, // milliseconds
  scores: { research: 0.x, qa: 0.x, planning: 0.x, work: 0.x }
}
```

### `validateAction(tool, parameters, context)` (NEW)

Validates if an action is allowed based on intent classification and configuration patterns.

**Parameters:**
- `tool` (string): Tool name being invoked
- `parameters` (object): Tool parameters
- `context` (string): Additional context (user message, conversation)

**Returns:**
```javascript
{
  decision: 'allow|warn|block|require_prb',
  message: 'Action status message',
  intent: 'research|qa|planning|work',
  confidence: 0.0-1.0,
  violations: {
    tool: boolean,
    parameters: ['param=value', ...],
    paths: ['/path1', '/path2', ...]
  },
  enforcement: 'allow|warn|block|require_prb_context',
  timing: 0.xxx
}
```

### `requiresPrbContext(tool, parameters)`

Checks if a specific tool and parameter combination requires PRB context.

**Parameters:**
- `tool` (string): Tool name
- `parameters` (object): Tool parameters

**Returns:** `Promise<boolean>` - True if PRB context is required

### `getEnforcementAction(intentType)`

Gets enforcement action for a specific intent type.

**Parameters:**
- `intentType` (string): Intent type (research, qa, planning, work)

**Returns:** `Promise<string>` - Enforcement action

### `isWorkIntent(classification, threshold = 0.3)`

Determines if classification indicates work intent requiring PRB execution.

**Parameters:**
- `classification`: Result from classifyIntent()
- `threshold`: Confidence threshold (default: 0.3)

**Returns:** `boolean`

## Performance

- **Target**: <5ms per classification
- **Achieved**: ~0.007ms average, 0.193ms maximum
- **Accuracy**: 95.2% on test scenarios

## Usage Example

```javascript
const { classifyIntent, validateAction, requiresPrbContext } = require('./intent-classifier');

// Example 1: Basic intent classification
const result = classifyIntent(
  'Edit',
  { file_path: '/src/auth.js' },
  'Fix the authentication bug'
);

console.log(result);
// { intent: 'work', confidence: 0.8, timing: 0.008, scores: {...} }

// Example 2: Full action validation with pattern configuration
const validation = await validateAction(
  'Edit',
  { file_path: '/src/auth.js' },
  'Fix the authentication bug'
);

console.log(validation);
// {
//   decision: 'require_prb',
//   message: 'Action requires PRB+agent execution',
//   intent: 'work',
//   confidence: 0.8,
//   violations: { tool: true, parameters: [], paths: [] },
//   enforcement: 'require_prb_context'
// }

// Example 3: Check PRB requirement
const needsPrb = await requiresPrbContext('Read', { file_path: '/docs/README.md' });
console.log('Needs PRB:', needsPrb); // false

if (validation.decision === 'require_prb') {
  console.log('BLOCKED: Requires PRB execution');
} else {
  console.log('ALLOWED: Can proceed in main scope');
}
```

## Testing

Run the comprehensive test suite:

```bash
node intent-classifier.test.js
```

Tests include:
- 21 accuracy test scenarios
- Performance benchmarks
- Edge case handling
- Error conditions
- Function validation

## Pattern Configuration System

The intent classifier now includes a powerful pattern configuration system that enables fine-grained control over tool and parameter allowances for each intent type.

### Configuration Structure

The system uses a JSON configuration file (`config/intent-patterns.json`) that defines:
- **Tool Allowances**: Explicit lists of allowed/blocked tools per intent
- **Parameter Patterns**: Regex patterns for validating tool parameters
- **Path Patterns**: File path restrictions and allowances
- **Enforcement Actions**: How violations are handled (allow/warn/block/require_prb)

### Environment Variable Overrides

```bash
export HOOK_DEBUG_MODE=true      # Enable debug logging
export HOOK_STRICT_MODE=true     # Enable stricter enforcement
export HOOK_DEFAULT_ENFORCEMENT=block  # Override default enforcement
```

### Example Configuration Snippet

```json
{
  "intents": {
    "research": {
      "allowed_tools": ["Read", "Grep", "Glob", "WebSearch"],
      "blocked_tools": ["Edit", "Write", "MultiEdit"],
      "parameter_patterns": {
        "allowed": ["^/.*\\.(md|txt|json)$"],
        "blocked": ["\\b(rm|delete|drop)\\b"]
      },
      "enforcement": "allow"
    },
    "work": {
      "allowed_tools": [],
      "blocked_tools": ["Edit", "Write", "MultiEdit", "Bash"],
      "enforcement": "require_prb_context"
    }
  }
}
```

### Features

- **Hot Reloading**: Configuration changes detected automatically
- **Caching**: 5-minute TTL for performance optimization  
- **Schema Validation**: Comprehensive validation on load
- **Fallback Defaults**: Graceful degradation if configuration unavailable
- **Pattern Matching**: Flexible regex-based parameter and path validation

For detailed configuration usage, see [`config-usage.md`](./config-usage.md).

## Integration

The intent classifier is designed to integrate with the intelligent-claude-code behavioral enforcement system to provide real-time intent analysis and main scope protection.

## Classification Logic

The engine uses a multi-factor scoring system:

1. **Tool Analysis**: Primary classification based on tool type
2. **Context Patterns**: Pattern matching for Q&A, planning, work indicators
3. **File Path Analysis**: Code files vs documentation/configuration
4. **Command Analysis**: Read-only vs modification commands
5. **Intent Language**: Work verbs, question patterns, planning keywords

Scores are normalized and the highest-confidence intent is returned with detailed scoring breakdown for debugging and optimization.