# Proposal: Hook-Based Behavioral Enforcement for intelligent-claude-code

## Executive Summary

Implement PreToolUse/PostToolUse hooks to achieve actual enforcement of behavioral patterns in intelligent-claude-code, replacing the current advisory-only text patterns with system-level blocking mechanisms.

## Problem Statement

Current behavioral patterns in intelligent-claude-code are fundamentally unenforceable:
- "NUCLEAR BLOCKING" language is just text that Claude can ignore
- Main scope continues executing work despite patterns
- PM role performs technical work despite prohibitions
- PRB requirements are bypassed when Claude deems it helpful
- No mechanism exists to actually prevent violations

## Proposed Solution

### Core Architecture

```
.claude/
├── hooks/
│   ├── pre-tool-use.sh          # Main enforcement script
│   ├── post-tool-use.sh         # Monitoring and logging
│   └── lib/
│       ├── context-detector.sh   # Detect main vs subagent
│       ├── role-detector.sh      # Identify active role
│       ├── prb-validator.sh      # Check PRB context
│       └── rule-engine.sh        # Evaluate rules
├── rules/
│   ├── enforcement-rules.json    # Core enforcement rules
│   ├── tool-permissions.yaml     # Role-based tool matrix
│   └── violation-messages.json   # User-friendly messages
└── logs/
    └── violations.log            # Violation tracking
```

### Implementation Phases

#### Phase 1: Foundation (Week 1)
**Objective**: Basic blocking infrastructure

1. **Core Hook Script**:
```bash
#!/bin/bash
# .claude/hooks/pre-tool-use.sh

INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool')
PARAMS=$(echo "$INPUT" | jq '.parameters')

# Import enforcement libraries
source "$(dirname "$0")/lib/context-detector.sh"
source "$(dirname "$0")/lib/rule-engine.sh"

# Detect context
CONTEXT=$(detect_context "$INPUT")
IS_MAIN_SCOPE=$(is_main_scope "$CONTEXT")
ACTIVE_ROLE=$(get_active_role "$CONTEXT")

# Check main scope work blocking
if [[ "$IS_MAIN_SCOPE" == "true" ]]; then
    if is_work_tool "$TOOL"; then
        echo "❌ BLOCKED: Main scope cannot execute work directly"
        echo "📋 Required: Generate PRB using @Role pattern first"
        echo "🔧 Action: Use Task tool to deploy PRB via agent"
        exit 2
    fi
fi

# Check PM role restrictions
if [[ "$ACTIVE_ROLE" == "PM" ]]; then
    if is_technical_tool "$TOOL"; then
        echo "❌ BLOCKED: PM role is COORDINATION ONLY"
        echo "📋 Required: Create PRB and delegate to specialist"
        echo "🚫 PM cannot use: Edit, Write, MultiEdit tools"
        exit 2
    fi
fi

exit 0
```

2. **Settings Configuration**:
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/pre-tool-use.sh"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/post-tool-use.sh"
          }
        ]
      }
    ]
  }
}
```

#### Phase 2: Core Rules (Week 2)
**Objective**: Implement primary enforcement patterns

**Enforcement Rules** (enforcement-rules.json):
```json
{
  "main_scope_blocks": {
    "tools": ["Edit", "Write", "MultiEdit", "NotebookEdit"],
    "exceptions": ["Read", "Grep", "Glob", "Bash:read-only"],
    "message": "Main scope must use PRB+Agent pattern"
  },
  "role_restrictions": {
    "PM": {
      "blocked_tools": ["Edit", "Write", "MultiEdit", "Bash:write"],
      "allowed_tools": ["Read", "Grep", "Glob", "TodoWrite"],
      "message": "PM is coordination only - delegate to specialists"
    }
  },
  "prb_requirements": {
    "work_patterns": ["implement", "fix", "create", "modify", "deploy"],
    "enforcement": "require_active_prb",
    "message": "Work requires PRB context"
  }
}
```

#### Phase 3: Enhanced Detection (Week 3)
**Objective**: Sophisticated context awareness

**Context Detection Features**:
- Detect active PRB execution context
- Identify current role from behavioral patterns
- Track work intent vs information requests
- Monitor for subtle violation patterns
- Detect "helpful" override attempts

#### Phase 4: Auto-Recovery (Week 4)
**Objective**: Helpful enforcement with guidance

**Auto-Recovery Features**:
1. **PRB Generation Suggestion**:
   - Detect work intent
   - Suggest appropriate PRB template
   - Provide correct @Role pattern

2. **Delegation Guidance**:
   - Identify required specialist
   - Suggest delegation pattern
   - Provide example command

3. **Context Switching**:
   - Detect wrong context
   - Guide to correct approach
   - Prevent confusion

### Success Metrics

**Immediate (Week 1)**:
- [ ] Zero main scope work executions
- [ ] Zero PM technical tool usage
- [ ] Clear blocking messages

**Short-term (Month 1)**:
- [ ] 95% violation prevention rate
- [ ] Reduced user confusion
- [ ] Improved PRB compliance

**Long-term (Quarter 1)**:
- [ ] Behavioral pattern adoption
- [ ] Reduced enforcement triggers
- [ ] System learning from patterns

### Risk Mitigation

**Potential Issues & Solutions**:

1. **Over-blocking**:
   - Risk: Legitimate operations blocked
   - Solution: Careful exception rules, monitoring

2. **User Frustration**:
   - Risk: Confusing error messages
   - Solution: Clear, helpful guidance with examples

3. **Performance Impact**:
   - Risk: Hook overhead slows operations
   - Solution: Optimize scripts, cache decisions

4. **Maintenance Burden**:
   - Risk: Complex rule management
   - Solution: Simple rule format, good documentation

### Testing Strategy

**Test Scenarios**:
1. Main scope attempts Edit → Should block
2. PM attempts technical work → Should block
3. Subagent with PRB → Should allow
4. Information requests → Should allow
5. Edge cases and exceptions → Proper handling

**Validation Approach**:
```bash
# Test script
./test-enforcement.sh <<EOF
{
  "scenario": "main_scope_edit",
  "expected": "blocked",
  "message_contains": "PRB+Agent pattern"
}
EOF
```

### Documentation Requirements

**User Documentation**:
- How enforcement works
- Common blocking scenarios
- How to resolve blocks
- Best practices guide

**Developer Documentation**:
- Hook architecture
- Rule engine design
- Extension points
- Debugging guide

### Rollout Plan

**Week 1**: Foundation
- Implement basic hooks
- Test main scope blocking
- Document setup process

**Week 2**: Core Rules
- Add PM restrictions
- Implement PRB requirements
- Enhance error messages

**Week 3**: Detection
- Sophisticated context detection
- Pattern recognition
- Violation analytics

**Week 4**: Polish
- Auto-recovery features
- Performance optimization
- Documentation completion

### Alternative Approaches Considered

1. **Enhanced Markdown Patterns**: Still advisory, proven ineffective
2. **Claude CLI Modification**: Not under our control
3. **Wrapper Scripts**: Less integrated, more complex
4. **MCP Server Approach**: Overkill for enforcement needs

### Recommendation

Proceed with hook-based enforcement implementation. This is the only proven method to achieve actual behavioral control. Start with Phase 1 immediately to establish blocking infrastructure, then iterate with enhanced features.

## Appendix: Example Violations and Blocks

### Example 1: Main Scope Work Attempt
**Input**: Main scope tries to edit file
**Block**: "❌ BLOCKED: Main scope cannot execute work directly"
**Guidance**: "Generate PRB using @Developer pattern"

### Example 2: PM Technical Work
**Input**: PM role uses Edit tool
**Block**: "❌ BLOCKED: PM role is COORDINATION ONLY"
**Guidance**: "Create PRB and assign to @AI-Engineer"

### Example 3: Missing PRB Context
**Input**: Work pattern without PRB
**Block**: "❌ BLOCKED: Work requires PRB context"
**Guidance**: "Use @Role pattern to generate PRB first"

---
*Proposal created: 2025-09-07*
*Based on comprehensive research of enforcement mechanisms*