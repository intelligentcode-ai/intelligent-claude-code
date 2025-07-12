# Active Memory Management Behavior - BEHAVIORAL + EXECUTABLE

**PRINCIPLE:** MANDATORY for ALL team members • Zero tolerance for memory bypass • EXECUTABLE enforcement

## Memory Integration Requirements

### Universal Memory Mandate
**REFERENCE:** Core memory enforcement in integration-layer.md
**BEHAVIORAL FOCUS:** Mandatory usage patterns and penalty enforcement
**EXECUTABLE FOCUS:** Real-time enforcement hooks and validation logic

### Memory Operation Triggers
**TASK INITIATION:** Auto-load context via search_nodes/open_nodes → Establish full context
**ACTIVATION HOOK:** @Role detected → mcp__memory__search_nodes(Role) → Load context → Begin tracking
**TASK DETECTION:** TodoWrite created → mcp__memory__create_entities(task) → Link to role → Track progress
**IMPLEMENTATION:** Auto-capture changes → Store rationale/details/results → Create relationships
**DECISION:** Auto-capture alternatives/rationale/impact → Link to implementation
**LEARNING:** Auto-capture successes/failures/patterns → Generate team wisdom
**ERROR:** Auto-capture root cause/correction/prevention → Link to future tasks

### Memory Enforcement Protocols
**ROLE ACTIVATION:** Load role-specific + task + team context
**ENFORCEMENT HOOK:** ANY operation without memory → DETECT → HALT → Force memory integration → -1.0pts P
**AUTO-INTEGRATION:** Tool usage → Auto-capture intent/result → Store as observation → Link relationships
**OPERATION START:** Create task entity → Link to role → Establish relationships
**OPERATION PROGRESS:** Store observations → Update relationships → Track changes
**OPERATION COMPLETE:** Store outcomes → Update entities → Transfer context

### Memory Quality Standards
**ENTITIES:** Clear naming • Accurate type • Comprehensive observations • Proper relationships
**OBSERVATIONS:** Specific • Actionable • Evidence-based • Time-stamped
**RELATIONSHIPS:** Correct direction • Meaningful type • Bidirectional • Context preserved
**TRANSFERS:** Complete handoff • All entities • Clear relationships • Next steps

## SIMPLIFIED MEMORY FORMAT [EASY RECALL PATTERNS]

**SIMPLE NAMING CONVENTION:** 
- Tasks: "TaskName-YYYY-MM-DD" (e.g., "UserAuth-2024-03-15")
- Decisions: "Decision-Topic" (e.g., "Decision-DatabaseChoice")
- Learnings: "Learning-Pattern" (e.g., "Learning-TestingStrategy")
- Issues: "Issue-Description" (e.g., "Issue-PerformanceBottleneck")

**QUICK SEARCH PATTERNS:**
- By date: search_nodes("2024-03-15") → Find all activities on specific date
- By role: search_nodes("@Developer") → Find all developer activities
- By topic: search_nodes("authentication") → Find all auth-related work
- By status: search_nodes("completed") → Find finished items
- By learning: search_nodes("Learning-") → Find all captured learnings

**EASY RECALL MEMORY OPERATIONS:**
- Recent work: search_nodes("last 7 days")
- Role context: open_nodes(["@RoleName-context", "@RoleName-current"])
- Project overview: open_nodes(["ProjectName-overview", "ProjectName-status"])
- Learning history: search_nodes("Learning-") → open_nodes([top 5 results])
- Decision history: search_nodes("Decision-") → open_nodes([relevant decisions])

**MEMORY RELATIONSHIP PATTERNS:**
- "implements" → Task implements Decision
- "requires" → Task requires Knowledge
- "blocks" → Issue blocks Task
- "learned-from" → Learning learned-from Experience
- "assigned-to" → Task assigned-to Role

## Memory Behavioral Triggers

### Automatic Detection & Enforcement
**NO MEMORY:** Operation without memory → HALT → -1.0pts P penalty → Force integration
**INCOMPLETE MEMORY:** Partial usage → HALT → Force complete integration
**QUALITY ISSUES:** Poor observations → HALT → Force specific details
**RELATIONSHIP GAPS:** Missing connections → HALT → Force relationship creation

### Operational Enforcement
**TASK/DECISION/HANDOFF/COMPLETION without memory → SYSTEM HALT → Force memory integration → Continue**

### Memory Integration Patterns
**ROLE-BASED:** Role namespace → Role-specific + shared entities → Cross-role relationships
**TASK-BASED:** Task cluster → Task/decision/implementation/outcome entities
**PROJECT-BASED:** Project-wide graph → All entities + relationships
**LEARNING-BASED:** Continuous capture → Success/failure patterns → Team dynamics

## Memory Tool Usage

### Required Operations
**create_entities:** New tasks/roles/decisions → Create with observations
**create_relations:** Connect entities → Establish directional relationships
**add_observations:** Update progress → Store insights → Track changes
**search_nodes:** Find context → Load history → Discover patterns
**open_nodes:** Access specifics → Deep investigation → Full context
**read_graph:** Understand structure → See relationships → Holistic view

### Usage Examples
**TASK START:** search_nodes("project") → open_nodes(["project-x"]) → create_entities([{name: "Sprint-Planning", type: "task", observations: ["Q1 features", "80% capacity"]}])
**DECISION:** create_entities([{name: "API-Decision", type: "decision", observations: ["REST over GraphQL", "Team expertise"]}]) → create_relations([{from: "API-Decision", to: "Project-X", type: "influences"}])
**HANDOFF:** add_observations([{entityName: "Feature", contents: ["Service complete", "Tests pass"]}]) → create_relations([{from: "Feature", to: "QA", type: "requires"}])

## Compliance & Integration

### Tracking & Penalties
**PENALTIES:** No memory → -1.0pts P • Poor quality → -0.5pts P • Incomplete → -0.5pts P
**REWARDS:** Excellent usage → +0.5pts P • Insightful observations → +0.5pts Q • Pattern discovery → +1.0pts Q
**MONITORING:** Track all operations → Detect gaps → Identify champions → Coach strugglers

### Audit Requirements
**DAILY:** Review graph → Identify gaps → Plan improvements
**WEEKLY:** Analyze relationships → Find insights → Optimize usage
**METRICS:** Entity count • Observation quality • Relationship density • Usage frequency

### Enforcement Integration
**QUALITY GATES:** Memory check required for ALL gates
**AUTO-CORRECTION:** Memory gaps trigger forced integration
**L3 AUTONOMY:** Decisions require memory storage
**SCORING:** Memory usage impacts P/Q scores
**CALLOUTS:** Memory insights trigger team learning

### Success Patterns
**RICH OBSERVATIONS:** Detailed • Specific • Actionable • Evidence-based
**STRONG RELATIONSHIPS:** Meaningful connections • Bidirectional • Context preserved
**CONTINUOUS CAPTURE:** Real-time updates • Immediate storage
**EFFECTIVE RETRIEVAL:** Quick context loading • Pattern recognition

## MEMORY ENFORCEMENT HOOKS [EXECUTABLE]

```javascript
// MEMORY ENFORCEMENT SYSTEM - ACTUAL MCP INTEGRATION
class MemoryEnforcementSystem {
  constructor() {
    this.enforcementHooks = new Map();
    this.violationTracking = new Map();
    this.memoryPatterns = new Map();
    this.setupEnforcementHooks();
  }
  
  // SETUP ENFORCEMENT HOOKS
  setupEnforcementHooks() {
    // MANDATORY MEMORY CONSULTATION HOOK
    this.enforcementHooks.set('memory_consultation', {
      trigger: 'before_technical_decision',
      requirement: 'mcp__memory__search_nodes',
      penalty: -1.0,
      correction: 'force_memory_search',
      blocking: false
    });
    
    // LEARNING CAPTURE HOOK
    this.enforcementHooks.set('learning_capture', {
      trigger: 'after_task_completion',
      requirement: 'mcp__memory__add_observations',
      penalty: -1.0,
      correction: 'force_learning_capture',
      blocking: false
    });
    
    // PATTERN RECOGNITION HOOK
    this.enforcementHooks.set('pattern_recognition', {
      trigger: 'before_implementation',
      requirement: 'mcp__memory__search_nodes',
      penalty: -1.5,
      correction: 'force_pattern_search',
      blocking: true
    });
    
    // RELATIONSHIP TRACKING HOOK
    this.enforcementHooks.set('relationship_tracking', {
      trigger: 'entity_creation',
      requirement: 'mcp__memory__create_relations',
      penalty: -0.5,
      correction: 'force_relationship_mapping',
      blocking: false
    });
    
    // KNOWLEDGE VALIDATION HOOK
    this.enforcementHooks.set('knowledge_validation', {
      trigger: 'before_expert_decision',
      requirement: 'mcp__memory__open_nodes',
      penalty: -1.2,
      correction: 'force_knowledge_validation',
      blocking: true
    });
  }
  
  // ENFORCE MEMORY CONSULTATION
  async enforceMemoryConsultation(context) {
    const enforcement = {
      hook: 'memory_consultation',
      context: context,
      timestamp: new Date().toISOString(),
      violations: [],
      corrections: [],
      memory_operations: []
    };
    
    try {
      // CHECK IF MEMORY CONSULTATION REQUIRED
      if (this.isMemoryConsultationRequired(context)) {
        // SEARCH FOR EXISTING MEMORY CONSULTATION
        const hasMemoryConsultation = await this.checkMemoryConsultation(context);
        
        if (!hasMemoryConsultation) {
          // VIOLATION DETECTED
          const violation = {
            type: 'memory_consultation_missing',
            severity: 'medium',
            penalty: -1.0,
            context: context,
            timestamp: new Date().toISOString()
          };
          
          enforcement.violations.push(violation);
          
          // APPLY CORRECTION
          const correction = await this.applyMemoryConsultationCorrection(context);
          enforcement.corrections.push(correction);
          
          // TRACK VIOLATION
          this.trackMemoryViolation(violation);
        }
      }
      
      return enforcement;
      
    } catch (error) {
      enforcement.error = error.message;
      return enforcement;
    }
  }
  
  // CHECK MEMORY CONSULTATION
  async checkMemoryConsultation(context) {
    try {
      // SEARCH FOR RELEVANT MEMORY PATTERNS
      const searchResult = await mcp__memory__search_nodes({
        query: this.generateMemorySearchQuery(context)
      });
      
      // CHECK IF CONSULTATION WAS PERFORMED
      const consultationExists = searchResult && searchResult.length > 0;
      
      if (!consultationExists) {
        return false;
      }
      
      // VALIDATE CONSULTATION QUALITY
      const consultationQuality = this.validateConsultationQuality(searchResult, context);
      
      return consultationQuality.adequate;
      
    } catch (error) {
      console.error('Memory consultation check failed:', error);
      return false;
    }
  }
  
  // APPLY MEMORY CONSULTATION CORRECTION
  async applyMemoryConsultationCorrection(context) {
    const correction = {
      type: 'memory_consultation_correction',
      context: context,
      timestamp: new Date().toISOString(),
      steps: []
    };
    
    try {
      // STEP 1: FORCE MEMORY SEARCH
      const searchQuery = this.generateMemorySearchQuery(context);
      const searchResult = await mcp__memory__search_nodes({
        query: searchQuery
      });
      
      correction.steps.push({
        action: 'memory_search',
        query: searchQuery,
        result: searchResult,
        timestamp: new Date().toISOString()
      });
      
      // STEP 2: ANALYZE SEARCH RESULTS
      const analysis = this.analyzeMemorySearchResults(searchResult, context);
      correction.steps.push({
        action: 'result_analysis',
        analysis: analysis,
        timestamp: new Date().toISOString()
      });
      
      // STEP 3: EXTRACT RELEVANT PATTERNS
      const patterns = this.extractRelevantPatterns(searchResult, context);
      correction.steps.push({
        action: 'pattern_extraction',
        patterns: patterns,
        timestamp: new Date().toISOString()
      });
      
      // STEP 4: STORE CONSULTATION RECORD
      await this.storeConsultationRecord(context, searchResult, patterns);
      correction.steps.push({
        action: 'consultation_record',
        stored: true,
        timestamp: new Date().toISOString()
      });
      
      correction.success = true;
      return correction;
      
    } catch (error) {
      correction.success = false;
      correction.error = error.message;
      return correction;
    }
  }
  
  // TRACK MEMORY VIOLATION
  trackMemoryViolation(violation) {
    const violationKey = `${violation.context.role}_${violation.type}`;
    
    if (!this.violationTracking.has(violationKey)) {
      this.violationTracking.set(violationKey, {
        role: violation.context.role,
        type: violation.type,
        count: 0,
        total_penalty: 0,
        avg_penalty: 0,
        first_occurrence: violation.timestamp,
        last_occurrence: violation.timestamp,
        trend: 'stable'
      });
    }
    
    const tracking = this.violationTracking.get(violationKey);
    tracking.count += 1;
    tracking.total_penalty += violation.penalty;
    tracking.avg_penalty = tracking.total_penalty / tracking.count;
    tracking.last_occurrence = violation.timestamp;
    tracking.trend = this.calculateViolationTrend(tracking);
    
    // STORE VIOLATION IN MEMORY
    this.storeViolationInMemory(violation, tracking);
  }
}

// RUNTIME MEMORY ENFORCER - ACTUAL RUNTIME ENFORCEMENT
class RuntimeMemoryEnforcer {
  constructor() {
    this.enforcementSystem = new MemoryEnforcementSystem();
    this.isActive = false;
  }
  
  // ACTIVATE ENFORCEMENT
  activate() {
    if (this.isActive) return;
    
    this.isActive = true;
    this.hookMemoryOperations();
    console.log('Runtime memory enforcement activated');
  }
  
  // PROCESS MEMORY ENFORCEMENT
  async processMemoryEnforcement(operation, context) {
    const enforcement = {
      operation: operation,
      context: context,
      timestamp: new Date().toISOString(),
      enforcements: [],
      violations: [],
      corrections: []
    };
    
    try {
      // ENFORCE MEMORY CONSULTATION
      const consultationEnforcement = await this.enforcementSystem.enforceMemoryConsultation(context);
      enforcement.enforcements.push(consultationEnforcement);
      
      // COLLECT VIOLATIONS
      enforcement.enforcements.forEach(e => {
        if (e.violations) {
          enforcement.violations.push(...e.violations);
        }
        if (e.corrections) {
          enforcement.corrections.push(...e.corrections);
        }
      });
      
      return enforcement;
      
    } catch (error) {
      enforcement.error = error.message;
      return enforcement;
    }
  }
}

// GLOBAL RUNTIME ENFORCER
const runtimeMemoryEnforcer = new RuntimeMemoryEnforcer();

// AUTO-ACTIVATE
runtimeMemoryEnforcer.activate();
```

## Critical Enforcement Summary

**ABSOLUTE REQUIREMENT:** ALL roles use memory for ALL operations • NO EXCEPTIONS
**BYPASS BLOCKING:** No memory → HALT → PENALTY → FORCE INTEGRATION
**QUALITY ENFORCEMENT:** Poor quality → HALT → FORCE IMPROVEMENT
**ZERO TOLERANCE:** No memory = Process violation → Immediate correction

---

**ACTIVE MEMORY MANAGEMENT: Combines behavioral requirements with EXECUTABLE enforcement logic for real-time memory integration.**