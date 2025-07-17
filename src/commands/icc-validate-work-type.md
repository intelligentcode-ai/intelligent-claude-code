# icc:validate-work-type

Validate work type and determine required specialist assignments.

## Usage
```
icc-validate-work-type "work description"
icc-validate-work-type --file story.yaml
```

## Parameters  
- `description`: Work description to analyze (required)
- `--file`: Analyze work from assignment file

## Implementation
Uses lean-workflow-executor validation chain:

1. **Pattern Matching**: Analyze content against work type patterns
2. **Specialist Detection**: Identify required specialist architects
3. **Capability Assessment**: Calculate capability match scores
4. **Assignment Validation**: Ensure >70% capability match
5. **Recommendation Engine**: Suggest optimal role assignments

## Expected Output
```
🔍 Work Type Validation

📝 Analysis: "Update virtual team behavioral patterns in modes/"

🎯 Work Type Detected: ai_agentic
   Matched Patterns: ["AI", "behavioral", "virtual team", "modes/"]
   Confidence: 0.85

👥 Required Specialist: @AI-Architect
   Reason: AI-agentic work requires AI domain expertise

🚫 Blocked Roles:
   - @Developer (capability match: 0.25)
   - @System-Engineer (capability match: 0.30)
   - @Web-Designer (capability match: 0.10)

✅ Recommended Roles:
   - @AI-Engineer (capability match: 0.95)
   - @AI-Architect (capability match: 0.90)

⚠️  Validation Requirements:
   - PM + AI-Architect triage required
   - Joint approval needed before assignment
   - Specialist preference enforced
```

## Integration
- Implements role-assignment-validator patterns
- Uses work type detection from lean-workflow-executor
- Prevents wrong specialist assignments
- Enforces architect validation requirements