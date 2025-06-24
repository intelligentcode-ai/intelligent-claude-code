# Meta-Persona System Architecture

## Overview

The meta-persona system introduces a hierarchical organization layer that intelligently delegates work to specialized personas while maintaining context and coordination across complex multi-step tasks.

## Meta-Persona Definitions

### 1. **Strategic Coordinator** (Meta-Persona)
**Primary Responsibility**: High-level planning, task decomposition, and strategic decision-making

**Sub-Personas**:
- Architecture Mode
- Project Manager
- Documentation Architect
- Reviewer

**Activation Triggers**:
- Complex multi-component projects
- System-wide changes
- Strategic planning requests
- "Design a system", "Plan the implementation", "Review architecture"

**Core Functions**:
```yaml
responsibilities:
  - Analyze overall system requirements
  - Decompose complex projects into tasks
  - Identify architectural patterns and boundaries
  - Coordinate cross-cutting concerns
  - Ensure consistency across components
  - Make technology selection decisions
  
decision_framework:
  - Evaluate trade-offs (performance vs maintainability)
  - Consider long-term implications
  - Balance technical debt vs delivery speed
  - Assess team capabilities and constraints
```

### 2. **Technical Executor** (Meta-Persona)
**Primary Responsibility**: Implementation, optimization, and technical problem-solving

**Sub-Personas**:
- Backend Engineer
- Frontend Engineer
- Infrastructure Expert
- Kubernetes Engineer
- Security Mindset
- Performance Focus
- Rapid Prototype

**Activation Triggers**:
- Implementation tasks
- Technical debugging
- Performance optimization
- Security hardening
- "Build", "Implement", "Fix", "Optimize"

**Core Functions**:
```yaml
responsibilities:
  - Execute implementation tasks
  - Apply security best practices
  - Optimize performance bottlenecks
  - Handle technical debugging
  - Manage infrastructure deployment
  
execution_modes:
  rapid: 
    - Quick prototypes
    - MVP development
    - Proof of concepts
  production:
    - Secure implementations
    - Scalable solutions
    - Performance-optimized code
```

### 3. **Quality Guardian** (Meta-Persona)
**Primary Responsibility**: Testing, validation, documentation, and user experience

**Sub-Personas**:
- Tester
- UI/Web Designer
- Teaching Mode
- Documentation Architect
- Reviewer

**Activation Triggers**:
- Quality assurance needs
- Documentation requests
- UI/UX improvements
- Educational content
- "Test", "Verify", "Document", "Explain"

**Core Functions**:
```yaml
responsibilities:
  - Ensure code quality through testing
  - Validate user experience
  - Create comprehensive documentation
  - Teach and explain concepts
  - Review implementations
  
quality_gates:
  - Code coverage thresholds
  - Performance benchmarks
  - Accessibility standards
  - Documentation completeness
```

## Activation and Delegation Logic

### Context Analysis Engine
```python
class ContextAnalyzer:
    def analyze_request(self, user_input, project_context):
        """
        Analyzes user request and project context to determine
        appropriate meta-persona activation
        """
        signals = {
            'strategic': self._detect_strategic_signals(user_input),
            'technical': self._detect_technical_signals(user_input),
            'quality': self._detect_quality_signals(user_input),
            'complexity': self._assess_complexity(user_input, project_context),
            'scope': self._determine_scope(user_input)
        }
        
        return self._select_meta_persona(signals)
    
    def _detect_strategic_signals(self, input):
        keywords = ['design', 'architecture', 'plan', 'system', 'scale']
        patterns = ['how should we', 'what\'s the best way', 'design a']
        # Returns weighted score based on keyword/pattern matches
        
    def _assess_complexity(self, input, context):
        factors = {
            'components': count_affected_components(input),
            'personas_needed': estimate_required_personas(input),
            'dependencies': analyze_dependencies(context),
            'time_estimate': estimate_effort(input)
        }
        return calculate_complexity_score(factors)
```

### Meta-Persona Activation Flow
```yaml
activation_flow:
  1_initial_analysis:
    - Parse user request
    - Analyze project context
    - Identify key signals
    
  2_meta_persona_selection:
    - Score each meta-persona fit
    - Consider active tasks
    - Apply activation thresholds
    
  3_sub_persona_orchestration:
    - Identify required sub-personas
    - Determine execution order
    - Allocate context and resources
    
  4_execution_coordination:
    - Monitor sub-persona progress
    - Handle inter-persona communication
    - Manage context transitions
```

## Communication Protocol

### Inter-Persona Communication
```typescript
interface PersonaMessage {
  from: PersonaIdentifier;
  to: PersonaIdentifier;
  type: 'request' | 'response' | 'handoff' | 'context';
  priority: 'high' | 'medium' | 'low';
  payload: {
    action?: string;
    data?: any;
    context?: PersonaContext;
    requirements?: string[];
  };
  metadata: {
    timestamp: Date;
    correlationId: string;
    parentTaskId?: string;
  };
}

class PersonaCommunicationBus {
  async sendMessage(message: PersonaMessage): Promise<void> {
    // Validate message format
    this.validateMessage(message);
    
    // Apply routing rules
    const route = this.determineRoute(message);
    
    // Handle based on message type
    switch(message.type) {
      case 'handoff':
        await this.handleHandoff(message, route);
        break;
      case 'context':
        await this.shareContext(message, route);
        break;
      // ... other cases
    }
    
    // Log for audit trail
    this.logCommunication(message);
  }
}
```

### Context Preservation
```yaml
context_structure:
  global_context:
    project_goals: []
    constraints: []
    decisions_made: []
    active_tasks: []
    
  meta_persona_context:
    current_strategy: ""
    delegated_tasks: {}
    pending_decisions: []
    
  sub_persona_context:
    assigned_task: {}
    local_decisions: []
    discoveries: []
    blockers: []
    
  handoff_protocol:
    - Package relevant context
    - Include decision rationale
    - Specify expected outcomes
    - Define success criteria
```

## Direct Sub-Persona Access

### Bypass Mechanism
```python
class PersonaRouter:
    def route_request(self, request, context):
        """
        Determines whether to use meta-persona or direct routing
        """
        # Check for explicit persona targeting
        if explicit_persona := self._extract_explicit_persona(request):
            return self._direct_route(explicit_persona, request)
        
        # Check for simple, single-persona tasks
        if self._is_simple_task(request, context):
            persona = self._identify_best_fit_persona(request)
            return self._direct_route(persona, request)
        
        # Default to meta-persona routing for complex tasks
        return self._meta_persona_route(request, context)
    
    def _is_simple_task(self, request, context):
        """
        Determines if task is simple enough for direct routing
        """
        criteria = {
            'single_domain': is_single_domain(request),
            'no_coordination': not requires_coordination(request),
            'clear_persona_fit': has_clear_persona_match(request),
            'low_complexity': complexity_score(request) < 3
        }
        return all(criteria.values())
```

### Direct Access Triggers
```yaml
direct_access_patterns:
  explicit_targeting:
    - "@backend implement the API endpoint"
    - "Using security mindset, review this code"
    - "As a tester, verify the functionality"
    
  simple_focused_tasks:
    - "Write a test for function X"
    - "Optimize this SQL query"
    - "Fix this CSS layout issue"
    
  emergency_overrides:
    - "URGENT: Security patch needed"
    - "CRITICAL: Performance issue in production"
```

## Integration with Project Management

### Enhanced Project Manager Integration
```yaml
project_manager_enhancements:
  meta_persona_awareness:
    - Track active meta-personas
    - Coordinate meta-persona assignments
    - Manage meta-persona handoffs
    
  task_routing:
    task_analysis:
      - Assess task complexity
      - Determine meta vs direct routing
      - Update task with routing decision
      
    task_assignment:
      simple_tasks:
        - Route directly to sub-personas
        - Track in _progress.md
        
      complex_tasks:
        - Assign to appropriate meta-persona
        - Meta-persona decomposes further
        - Track decomposition in task hierarchy
        
  progress_tracking:
    - Monitor meta-persona progress
    - Track sub-persona delegations
    - Aggregate completion status
```

### Task File Enhancement
```markdown
---
priority: high
area: full-stack
type: feature
effort: 16
routing: meta  # New field: meta|direct
meta_persona: strategic_coordinator  # When routing=meta
personas:  # When routing=direct
  - backend
  - frontend
  - tester
dependencies:
  - TASK-001
---

# Task Title

## Routing Decision
**Type**: Meta-Persona Coordination Required
**Reason**: Multi-component feature affecting backend, frontend, and infrastructure
**Meta-Persona**: Strategic Coordinator
**Expected Delegations**:
  - Architecture Mode: Design component boundaries
  - Backend Engineer: Implement API
  - Frontend Engineer: Build UI
  - Tester: Create test suite
```

## Example Interactions

### Example 1: Complex System Design
```markdown
User: "Design a real-time collaborative editing system with conflict resolution"

System Response:
[Activating Strategic Coordinator meta-persona]

Strategic Coordinator: I'll design a comprehensive real-time collaborative editing system. Let me break this down:

[Delegating to Architecture Mode]
- Analyzing system requirements
- Identifying key components: CRDT engine, WebSocket layer, persistence, UI

[Architecture Decision]:
- Use CRDTs for conflict-free replication
- WebSocket for real-time communication
- Event sourcing for persistence
- Optimistic UI updates

[Delegating to Technical Executor for implementation planning]
Technical Executor analyzing implementation approach...

[Sub-persona Backend Engineer activated]:
- Design WebSocket protocol
- Implement CRDT algorithms
- Create persistence layer

[Sub-persona Frontend Engineer activated]:
- Build collaborative editor UI
- Implement optimistic updates
- Handle connection management

[Delegating to Quality Guardian for quality assurance]
[Sub-persona Tester activated]:
- Design test scenarios for concurrent edits
- Create integration tests
- Performance benchmarking plan

Would you like me to proceed with the detailed implementation?
```

### Example 2: Direct Sub-Persona Access
```markdown
User: "@security review this authentication code for vulnerabilities"

System Response:
[Direct routing to Security Mindset persona]

Security Mindset: I'll review this authentication code for security vulnerabilities.

[Analyzing code...]

Security Findings:
1. **SQL Injection Risk**: Line 45 uses string concatenation
   - Use parameterized queries instead
   
2. **Weak Password Hashing**: Using MD5 
   - Implement bcrypt with cost factor 12+
   
3. **Missing Rate Limiting**: No protection against brute force
   - Add rate limiting middleware
   
4. **Session Fixation**: Session ID not regenerated after login
   - Regenerate session after successful authentication

[Recommendations provided with code fixes...]
```

### Example 3: Project Continuation with Meta-Personas
```markdown
User: "Continue with the project"

System Response:
[Project Manager persona activated]
[Analyzing pending tasks...]

Found complex task: "Implement microservices migration"
[Routing to Strategic Coordinator meta-persona]

Strategic Coordinator: I'll coordinate the microservices migration task.

[Analyzing task requirements...]
This requires:
1. Service boundary identification
2. Data separation strategy
3. Inter-service communication
4. Deployment orchestration

[Delegating Phase 1 to Architecture Mode]
Architecture Mode: Identifying service boundaries based on domain analysis...

[Delegating Phase 2 to Technical Executor]
Technical Executor coordinating:
- Backend Engineer: Implementing service separation
- Infrastructure Expert: Setting up service mesh
- Kubernetes Engineer: Configuring deployments

[Progress tracked in project management system]
```

## Implementation Details

### Configuration Schema
```yaml
# .env configuration
CLAUDE_META_PERSONAS_ENABLED=true
CLAUDE_META_STRATEGIC_THRESHOLD=0.7  # Activation threshold
CLAUDE_META_TECHNICAL_THRESHOLD=0.6
CLAUDE_META_QUALITY_THRESHOLD=0.6
CLAUDE_META_CONTEXT_DEPTH=3  # Context inheritance levels
CLAUDE_META_DELEGATION_TIMEOUT=300  # Seconds before timeout
CLAUDE_DIRECT_ACCESS_KEYWORDS=@,direct:,as:
CLAUDE_META_COORDINATION_MODE=async  # async|sync|hybrid

# Persona hierarchy configuration
CLAUDE_PERSONA_HIERARCHY=strategic:architecture,project_manager,doc_architect;technical:backend,frontend,infrastructure;quality:tester,designer,teaching
```

### Monitoring and Metrics
```yaml
meta_persona_metrics:
  activation_metrics:
    - Total activations per meta-persona
    - Direct vs meta routing ratio
    - Average delegation count
    - Context preservation success rate
    
  performance_metrics:
    - Task completion time by routing type
    - Sub-persona coordination overhead
    - Context switch frequency
    - Communication bus latency
    
  quality_metrics:
    - Task success rate by meta-persona
    - Rework frequency
    - User satisfaction scores
    - Delegation accuracy
```

## Benefits

1. **Improved Organization**: Clear hierarchy reduces cognitive load
2. **Better Coordination**: Meta-personas handle complex orchestration
3. **Flexibility**: Direct access for simple tasks, meta-coordination for complex ones
4. **Context Preservation**: Structured context sharing between personas
5. **Scalability**: Easy to add new personas under existing meta-personas
6. **Traceability**: Clear audit trail of decisions and delegations

## Future Enhancements

1. **Learning System**: Meta-personas learn optimal delegation patterns
2. **Parallel Execution**: Multiple sub-personas working simultaneously
3. **Dynamic Reorganization**: Meta-personas adjust based on project needs
4. **External Integration**: Connect with external AI agents through meta-personas
5. **Predictive Routing**: Anticipate needed personas before explicit request