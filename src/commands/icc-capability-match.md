# Capability Match

Calculate capability match percentage between roles and tasks using $ARGUMENTS.

## Behavior
Analyze task requirements and role capabilities to calculate precise
capability match percentage. Supports role assignment validation,
dynamic specialist creation, and quality assurance for task assignments.

## Arguments
**Format:** "Task: task_content | Role: @ProposedRole | WorkType: detected_work_type | Threshold: 0.70"
**Example:** "Task: Implement OAuth behavioral patterns in AI system | Role: @AI-Engineer | WorkType: AI-agentic | Threshold: 0.70"

## Core Actions
- Parse task content and role details from $ARGUMENTS
- Extract required capabilities from task content
- Load role capability profile from role definitions
- Calculate capability overlap and match percentage
- Compare against threshold (default 70%)
- Provide detailed capability analysis
- Suggest role improvements or alternatives
- Log capability assessment for learning

## Capability Extraction

### Task Capability Requirements
- **Technology Keywords**: Programming languages, frameworks, tools
- **Domain Keywords**: AI, infrastructure, security, frontend, backend
- **Process Keywords**: Testing, deployment, analysis, design
- **Skill Keywords**: Architecture, implementation, optimization

### Keyword Analysis
```yaml
task_content: "Implement OAuth behavioral patterns in AI system"
required_capabilities:
  - authentication: 0.9  # OAuth keyword
  - behavioral_systems: 0.9  # behavioral patterns
  - ai_engineering: 0.8  # AI system
  - implementation: 0.7  # implement keyword
  - security: 0.6  # OAuth security implications
  - system_integration: 0.5  # system integration
```

## Role Capability Profiles

### Core Role Capabilities

#### @AI-Engineer
```yaml
capabilities:
  ai_engineering: 1.0
  machine_learning: 0.9
  behavioral_systems: 0.9
  automation: 0.8
  implementation: 0.8
  system_integration: 0.7
  testing: 0.6
  security: 0.5
```

#### @Developer
```yaml
capabilities:
  implementation: 1.0
  programming: 0.9
  testing: 0.8
  api_development: 0.7
  system_integration: 0.6
  database: 0.5
  ai_engineering: 0.3
  behavioral_systems: 0.2
```

#### @Security-Engineer
```yaml
capabilities:
  security: 1.0
  authentication: 0.9
  encryption: 0.9
  compliance: 0.8
  implementation: 0.7
  system_integration: 0.6
  testing: 0.6
  ai_engineering: 0.4
```

## Capability Matching Algorithm

### Match Calculation
```pseudocode
function calculateCapabilityMatch(requiredCaps, roleCaps):
  totalRequiredWeight = sum(requiredCaps.values())
  matchedWeight = 0
  
  for capability, requiredLevel in requiredCaps:
    roleLevel = roleCaps.get(capability, 0)
    matchContribution = min(requiredLevel, roleLevel)
    matchedWeight += matchContribution
  
  matchPercentage = matchedWeight / totalRequiredWeight
  return matchPercentage
end function
```

### Example Calculation
```yaml
# Task: "Implement OAuth behavioral patterns in AI system"
# Role: @AI-Engineer

required_capabilities:
  authentication: 0.9
  behavioral_systems: 0.9
  ai_engineering: 0.8
  implementation: 0.7
  security: 0.6
  system_integration: 0.5

ai_engineer_capabilities:
  authentication: 0.5  # Limited auth experience
  behavioral_systems: 0.9  # Strong match
  ai_engineering: 1.0  # Perfect match
  implementation: 0.8  # Strong match
  security: 0.5  # Basic security
  system_integration: 0.7  # Good match

match_calculation:
  authentication: min(0.9, 0.5) = 0.5
  behavioral_systems: min(0.9, 0.9) = 0.9
  ai_engineering: min(0.8, 1.0) = 0.8
  implementation: min(0.7, 0.8) = 0.7
  security: min(0.6, 0.5) = 0.5
  system_integration: min(0.5, 0.7) = 0.5

total_matched: 3.9
total_required: 4.4
match_percentage: 3.9 / 4.4 = 0.886 (88.6%)
```

## Dynamic Specialist Creation

### Specialist Enhancement
When capability match < threshold, suggest specialist creation:

```yaml
suggested_specialist:
  name: "@OAuth-AI-Engineer"
  base_role: "@AI-Engineer"
  enhanced_capabilities:
    authentication: 0.9  # Enhanced from 0.5
    security: 0.8  # Enhanced from 0.5
  
  capability_sources:
    - "OAuth 2.0 specification expertise"
    - "Authentication system design experience"
    - "Security-focused AI system development"
  
  estimated_match: 0.95  # 95% after enhancement
```

## Work Type Specialization

### AI-Agentic Work
- **Required**: ai_engineering, behavioral_systems, automation
- **Preferred**: machine_learning, system_integration
- **Blocking**: Tasks requiring deep AI expertise

### Infrastructure Work
- **Required**: deployment, infrastructure, system_administration
- **Preferred**: automation, monitoring, security
- **Blocking**: Complex infrastructure tasks

### Security Work
- **Required**: security, authentication, encryption
- **Preferred**: compliance, testing, implementation
- **Blocking**: Security-critical implementations

## Capability Match Results

### EXCELLENT MATCH (≥90%)
```yaml
match_result:
  percentage: 0.92
  status: "EXCELLENT"
  recommendation: "Proceed with assignment"
  confidence: "Very High"
  risk_level: "Low"
```

### GOOD MATCH (70-89%)
```yaml
match_result:
  percentage: 0.84
  status: "GOOD"
  recommendation: "Proceed with assignment"
  confidence: "High"
  risk_level: "Low"
  notes: "Minor capability gaps acceptable"
```

### INSUFFICIENT MATCH (<70%)
```yaml
match_result:
  percentage: 0.65
  status: "INSUFFICIENT"
  recommendation: "Create specialist or reassign"
  confidence: "Low"
  risk_level: "High"
  
  gaps:
    - capability: "authentication"
      required: 0.9
      available: 0.5
      gap: 0.4
      
  suggestions:
    - "Create @OAuth-Developer specialist"
    - "Assign to @Security-Engineer instead"
    - "Provide authentication training"
```

## Specialist Suggestions

### Enhancement Recommendations
- **Identify Gaps**: Specific capability deficiencies
- **Training Needs**: Skills to develop for role improvement
- **Alternative Roles**: Better-matched existing roles
- **Specialist Creation**: Custom specialist design

### Cost-Benefit Analysis
- **Training Cost**: Time and resources for skill development
- **Creation Cost**: Effort to create new specialist
- **Risk Mitigation**: Quality assurance benefits
- **Long-term Value**: Reusability for future tasks

## Integration
- Used by role assignment validation systems
- Referenced by task planning and delegation
- Integrates with specialist creation tools
- Supports quality assurance processes
- Connected to learning system for capability tracking

## Quality Standards
- Accurate capability requirement extraction
- Precise match percentage calculation
- Comprehensive gap analysis
- Actionable improvement suggestions
- Consistent evaluation criteria