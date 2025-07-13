# Command System [MANDATORY ENFORCEMENT]

**CORE:** Chain enforcement•Memory-first•Quality gates•Parallel•Process reliability

## CRITICAL DIRECTIVES

**D1:** EVERY msg→chains FIRST(icc:memorize→icc:recall→icc:apply-learning→icc:think-sequential→execute)
**D2:** EVERY action→Memory BEFORE+AFTER
**D3:** EVERY task→icc:parallel-delegate multi-role
**D4:** EVERY complete→icc:quality-gates
**D5:** Bypass→auto-correct+penalty

## AUTONOMOUS TRIGGER SYSTEM

**L1 (User Approval):** Manual command execution only
**L2 (Architect Approval):** Auto-trigger: icc:enforce-process•icc:enforce-roles•icc:parallel-subagents•icc:track-progress
**L3 (Full Autonomy):** Auto-trigger: ALL commands based on context detection

**AUTO-TRIGGER CONDITIONS:**
- **ALWAYS:** icc:memorize (every message)→icc:recall→icc:apply-learning  
- **L2+:** icc:enforce-process (implementation tasks)•icc:enforce-roles (task delegation)
- **L3:** icc:ultra-experienced (ALL roles)•icc:capture-learning (outcomes)•icc:retrospective (completions)

**DETECTION PATTERNS:**
- Implementation without RE→Arch: AUTO icc:enforce-process
- Generic roles for specialist work: AUTO icc:enforce-roles  
- Multiple roles needed: AUTO icc:parallel-subagents
- Task completion: AUTO icc:capture-learning + icc:retrospective
- Role activation: AUTO icc:ultra-experienced (L3 only)

## COMMAND CHAIN PATTERNS

**SIMPLE:** icc:memorize→icc:recall→execute→icc:quality-gates
**COMPLEX:** icc:memorize→icc:recall→icc:apply-learning→icc:think-sequential→execute→icc:quality-gates
**MULTI:** icc:memorize→icc:recall→icc:apply-learning→icc:think-sequential→icc:parallel-delegate→integrate→icc:quality-gates
**STRATEGIC:** icc:memorize→icc:recall→icc:apply-learning→icc:think-sequential→icc:parallel-delegate→analyze→decide→icc:quality-gates
**SYSTEM:** icc:init→validate→activate•icc:reset→clear→reload•icc:refresh→sync→enhance
**LEARNING:** icc:memorize→icc:recall→icc:apply-learning→execute→icc:capture-learning→icc:quality-gates
**ENFORCEMENT:** icc:recall→icc:apply-learning→icc:enforce-process→icc:enforce-roles→icc:ultra-experienced→execute
**TEAM:** icc:memorize→icc:recall→icc:parallel-subagents→collaborate→icc:track-progress→icc:quality-gates
**BEHAVIORAL:** icc:memorize→icc:process-compliance-check→icc:auto-delegate→icc:pm-architect-consult→execute→icc:team-intervention→icc:learning-synthesis
**PM-STRATEGIC:** icc:memorize→icc:recall→icc:pm-architect-consult→icc:think-sequential→icc:auto-delegate→icc:track-progress→icc:quality-gates

# CORE COMMANDS

## icc:memorize
**PURPOSE:** STORE information and SEARCH existing memory•Auto-correct if skipped
**PENALTY:** -1.0P skip•Auto-invoke+continue
**TRIGGERS:** EVERY message start•EVERY task begin•EVERY decision point

## icc:recall  
**PURPOSE:** RETRIEVE specific learnings, patterns, and stored knowledge
**USAGE:** Query memory for relevant past experiences, decisions, and outcomes
**TRIGGERS:** After icc:memorize•Before decisions•When patterns needed

## icc:apply-learning
**PURPOSE:** ACTIVELY apply past learnings to current situation
**USAGE:** Take retrieved knowledge and adapt it to current context for better decisions
**TRIGGERS:** After icc:recall•Before execution•When similar situations detected

## icc:enforce-process
**PURPOSE:** ENFORCE proper Requirements→Architecture→Implementation workflow
**USAGE:** Block execution until proper RE→Arch→Impl sequence followed
**TRIGGERS:** L2/L3: Any implementation task•Any architecture decision•Multi-step work

## icc:enforce-iac
**PURPOSE:** ENFORCE Infrastructure-as-Code principles (externalized config, no hardcoding)
**USAGE:** Validate deployment configurations, build chains, environment consistency  
**TRIGGERS:** L2/L3: Infrastructure changes•Deployment tasks•Configuration updates

## icc:enforce-roles  
**PURPOSE:** ENFORCE correct specialist roles for tasks
**USAGE:** Validate AI-specialist roles used for AI-agentic work
**TRIGGERS:** L2/L3: Task delegation•Role assignment•Specialist work detection

## icc:ultra-experienced
**PURPOSE:** ENFORCE ultra-experienced 10+ years senior mindset
**USAGE:** Activate maximum expertise and authority in all roles
**TRIGGERS:** L3: ALL role activations•ALL technical decisions•ALL expert work

## icc:parallel-subagents
**PURPOSE:** ENFORCE parallelized multiple roles working simultaneously  
**USAGE:** Coordinate multiple specialists on different task components
**TRIGGERS:** L2/L3: Multi-role tasks•Complex implementations•Team coordination needed

## icc:track-progress
**PURPOSE:** ENFORCE PM tracking and coordination of all team work
**USAGE:** Mandatory progress tracking and team coordination
**TRIGGERS:** L2/L3: PM role active•Multi-step tasks•Team work in progress

## icc:capture-learning
**PURPOSE:** STORE learnings from successes and failures
**USAGE:** Create memory entities from retrospectives and outcomes
**TRIGGERS:** L3: Task completion•Error occurrence•Success achievement•Pattern recognition

## icc:retrospective
**PURPOSE:** ENFORCE lessons learned analysis after completion
**USAGE:** Mandatory retrospective with learning capture
**TRIGGERS:** L3: Project completion•Failure events•Success milestones•Weekly cycles

**USAGE:**
```
icc:memorize
icc:recall
icc:apply-learning
```

**PROTOCOL:**
**SEARCH:** mcp__memory__search_nodes→open_nodes→relations→Continue parallel
**FALLBACK:** ~/.claude/memory/knowledge-graph.json→grep/jq→parse
**APPLY:** Previous lessons→Adapt approach→Set foundation
**STORE:** create_entities→create_relations→add_observations→Async storage

**ENFORCEMENT:**
**AUTO:** Memory required→Auto-search if missing•Apply context•Continue always
**PENALTY:** -1.0P bypass•Auto-correct+continue
**STORE:** EVERY action→observations→lessons→relations→patterns
**FLOW:** Consult→Execute→Store→Continue seamlessly

## /think-sequential
**PURPOSE:** FORCED thinking•ALL complex•NO EXCEPTIONS
**USE:** EVERY analysis/planning/multi-step•PENALTY:-1.0Q skip•HALT non-trivial

**USAGE:**
```
/think-sequential "problem"
/think-sequential --thoughts 8 "complex"
/think-sequential --revise 3 "optimize"
/think-sequential --branch "approach" "design"
```

**PROTOCOL:**
1. **Problem Analysis** - Break down complex problems systematically
2. **Solution Planning** - Plan approach with clear steps and dependencies
3. **Risk Assessment** - Identify potential issues and mitigation strategies
4. **Resource Planning** - Determine tools, roles, and requirements needed
5. **Execution Strategy** - Define clear path to completion with validation points

**MANDATORY EXECUTION:**
**STEP 1: YOU MUST DECOMPOSE EVERY PROBLEM**
```
HALT EXECUTION NOW AND:
- YOU MUST USE mcp__sequential-thinking tool when available
- YOU MUST MAINTAIN numbered thought chains WITHOUT EXCEPTIONS
- YOU MUST TRACK all revisions and branches AUTOMATICALLY
- YOU MUST NOT PROCEED without proper decomposition

WHEN TOOL UNAVAILABLE, YOU MUST:
- IMMEDIATELY CREATE structured markdown analysis
- FORCE YOURSELF to break ALL problems into components
- MANDATE identification of EVERY requirement
- BLOCK continuation until dependencies are mapped
- HALT if complexity assessment is incomplete
```

**FORCED USAGE - NO EXCEPTIONS:**
- EVERY multi-step technical implementation - HALT AND FORCE
- ALL architecture decisions - NO SHORTCUTS ALLOWED
- ANY cross-role coordination - MANDATORY SEQUENTIAL ANALYSIS
- EVERY problem with multiple solutions - BLOCK UNTIL ANALYZED
- ALL planning phases - FORCE COMPLETE ANALYSIS

**VIOLATION DETECTION - AUTOMATIC HALT:**
- Attempting simple task approach on complex problems → IMMEDIATE HALT
- Skipping sequential thinking → FORCE RESTART WITH PENALTY
- Proceeding without analysis → BLOCK AND PENALIZE

**ENFORCEMENT:**
- **FORCED DETECTION**: YOU MUST HALT when complexity detected - NO OVERRIDE
- **BLOCKING GATES**: YOU CANNOT PROCEED without passing ALL quality checks
- **MANDATORY CAPTURE**: YOU MUST DOCUMENT every thought - NO EXCEPTIONS
- **AUTOMATIC PENALTY**: Q:-1.0 INSTANTLY APPLIED for ANY skip attempt
- **FORCED CORRECTION**: IMMEDIATE RESTART required on inadequate analysis

## /parallel-delegate
**PURPOSE:** Intelligent parallel delegation for multi-role work with coordination enforcement

**TRIGGER:** Multi-role tasks requiring coordination and parallel execution
**PENALTY:** P:-1.0 for bypassing when multi-role work identified  
**AUTHORITY:** PM-led coordination with role specialization optimization

**USAGE:**
```bash
# Basic multi-role delegation
/parallel-delegate "Build user dashboard" --roles "@Developer,@Web-Designer,@QA-Engineer"

# Complex feature with dependencies
/parallel-delegate --staged "E-commerce checkout flow" \
  --stage1 "@Architect:design,@Security-Engineer:review" \
  --stage2 "@Developer:implement,@Frontend-Developer:UI" \
  --stage3 "@QA-Engineer:test,@User-Role:e2e"

# Specialist creation and delegation
/parallel-delegate --create-specialists "Blockchain integration" \
  --roles "@Blockchain-Developer,@Smart-Contract-Auditor,@Security-Engineer"
```

**PROTOCOL:**
1. **Role Analysis** - Identify optimal roles for each task component
2. **Task Decomposition** - Break work into parallel-executable chunks
3. **Dependency Mapping** - Sequence dependencies and critical paths
4. **Resource Allocation** - Assign roles with load balancing
5. **Coordination Setup** - Establish communication and integration points

**EXECUTION PATTERNS:**
**INDEPENDENT PARALLEL:** Tasks with no cross-dependencies
**STAGED PARALLEL:** Tasks with sequential dependencies
**COLLABORATIVE PARALLEL:** Tasks requiring ongoing coordination

**ENFORCEMENT:**
- **MULTI-ROLE DETECTION**: Auto-identify when multiple roles needed
- **PARALLEL OPTIMIZATION**: Maximize parallel execution opportunities
- **COORDINATION MANDATORY**: PM must coordinate multi-role work
- **QUALITY INTEGRATION**: All components must pass quality gates
- **PENALTY**: P:-1.0 for bypassing when multi-role work identified

## /quality-gates
**PURPOSE:** Mandatory quality validation before completion with auto-correction enforcement

**TRIGGER:** EVERY completion, EVERY deliverable, EVERY task finalization
**PENALTY:** Q:-2.0 for bypassing quality gates (severe penalty)
**REQUIREMENT:** MANDATORY for ALL completions without exceptions

**USAGE:**
```bash
# Basic quality validation
/quality-gates --task "User authentication API"

# Comprehensive quality check
/quality-gates --full \
  --code-review "@Architect" \
  --security-scan "@Security-Engineer" \
  --test-coverage 90 \
  --documentation-check

# Auto-correction trigger
/quality-gates --auto-correct "Failed API endpoints" \
  --delegate "@Developer" \
  --requirements "error-handling,validation,tests"
```

**PROTOCOL:**
1. **Completeness Check** - Verify all requirements fully addressed
2. **Quality Standards** - Validate against established quality criteria
3. **Integration Validation** - Ensure proper integration with existing systems
4. **Security Review** - Mandatory security validation for all changes
5. **Documentation Compliance** - Verify documentation standards met

**QUALITY CRITERIA:**
**CODE QUALITY:**
- Follows established coding standards
- Proper error handling and validation
- Clear naming and structure
- Adequate comments and documentation

**ARCHITECTURE QUALITY:**
- Follows architectural principles
- Proper separation of concerns
- Scalable and maintainable design
- Appropriate technology choices

**FUNCTIONAL QUALITY:**
- Meets all functional requirements
- Handles edge cases properly
- Provides good user experience
- Performs within acceptable parameters

**SECURITY QUALITY:**
- No security vulnerabilities
- Proper input validation
- Secure data handling
- Appropriate access controls

**AUTO-CORRECTION TRIGGERS:**
**QUALITY FAILURES:**
- Incomplete implementations → Auto-delegation back to implementation role
- Code quality issues → Auto-delegation to code review specialist
- Security violations → Auto-delegation to security engineer
- Documentation gaps → Auto-delegation to documentation role

**CORRECTION WORKFLOW:**
1. Identify specific quality issues
2. Auto-delegate to appropriate specialist role
3. Specify exact corrections needed
4. Require re-submission through quality gates
5. Continue until all gates passed

**ENFORCEMENT:**
- **MANDATORY**: No completion without passing ALL quality gates
- **COMPREHENSIVE**: All quality dimensions must be validated
- **AUTO-CORRECTION**: Failed gates trigger automatic correction workflows
- **PENALTY**: Q:-2.0 severe penalty for bypass attempts
- **BLOCKING**: Quality gate failures block task completion

# SYSTEM COMMANDS

## /init
**PURPOSE:** Initialize virtual team system and verify all components are operational

**TRIGGER:** System startup, new project initialization, team activation
**REQUIREMENT:** Full system validation and component verification

**PROTOCOL:**
1. **Configuration Validation** - Verify core configuration exists and is valid
2. **Module Availability Check** - Confirm all behavioral modules are accessible
3. **Memory System Setup** - Initialize or verify memory subsystem
4. **Tool Integration Validation** - Check tool availability and fallback chains
5. **Team Readiness Assessment** - Validate all roles and capabilities

**VALIDATION REQUIREMENTS:**
**CONFIGURATION CHECKS:**
- All import paths resolve to existing files
- No circular dependencies in module chain
- All required behavioral modules accessible
- Virtual team mode properly configured

**CAPABILITY VERIFICATION:**
- Memory system (MCP or file-based) operational
- Command chain patterns executable
- Quality gate enforcement functional
- Tool integration working with fallbacks

**TEAM READINESS:**
- All 14 core roles properly activated
- Dynamic specialist generation capability confirmed
- @-notation addressing functional
- Parallel delegation system operational

**SYSTEM READINESS REPORT:**
**CONFIGURATION STATUS:**
- Virtual team mode: [ACTIVE/INACTIVE]
- Module chain: [COMPLETE/INCOMPLETE - missing items]
- Import resolution: [SUCCESS/FAILED - broken imports]

**CAPABILITY STATUS:**
- Memory system: [MCP/FILE-BASED/UNAVAILABLE]
- Tool integration: [FULL/PARTIAL/LIMITED]
- Command chains: [OPERATIONAL/DEGRADED]

**TEAM STATUS:**
- Core roles: [14/14 ACTIVE or X/14 AVAILABLE]
- Dynamic specialists: [ENABLED/DISABLED]
- Quality enforcement: [ACTIVE/INACTIVE]
- Scoring system: [OPERATIONAL/OFFLINE]

## /reset
**PURPOSE:** Reset virtual team system to clean state and clear any operational issues

**TRIGGER:** System recovery, stuck states, accumulated issues, fresh start needed
**REQUIREMENT:** Complete system reset with full re-initialization

**PROTOCOL:**
1. **State Clearing** - Clear all accumulated states and temporary data
2. **Configuration Reload** - Fresh reload of all configuration modules
3. **Memory Context Reset** - Reset memory context while preserving knowledge
4. **Penalty Clearing** - Reset all accumulated penalties and scoring issues
5. **Behavioral Pattern Restart** - Restart all behavioral enforcement systems

**CLEARING OPERATIONS:**
**STATE MANAGEMENT:**
- Clear all role assignment states
- Reset task delegation histories
- Remove any process locks or blocks
- Clear temporary coordination states

**PENALTY MANAGEMENT:**
- Clear all P (process compliance) penalties
- Reset all Q (quality delivery) penalties
- Remove scoring restrictions and limitations
- Restore full role operational capabilities

**RESET VALIDATION:**
**SYSTEM CHECKS:**
- Verify all configurations reload correctly
- Confirm memory system operational
- Check tool integration functionality
- Validate command chain execution

**CAPABILITY VERIFICATION:**
- Test role activation and @-notation addressing
- Verify parallel delegation functionality
- Confirm quality gate enforcement operational
- Check behavioral pattern compliance

## /refresh
**PURPOSE:** Refresh team capabilities and sync all systems without full reset

**TRIGGER:** Capability updates, configuration changes, tool availability changes
**REQUIREMENT:** Live system refresh while maintaining operational state

**PROTOCOL:**
1. **Module Refresh** - Reload all behavioral modules without clearing state
2. **Configuration Update** - Sync configuration changes and new capabilities
3. **Tool Availability Sync** - Update tool integration and fallback chains
4. **Memory State Sync** - Refresh memory connections and optimize performance
5. **Team Status Assessment** - Report current capabilities and operational status

**REFRESH OPERATIONS:**
**MODULE RELOADING:**
- Hot-reload all behaviors/ components
- Update command chain patterns
- Refresh quality gate definitions
- Sync enforcement mechanisms

**TOOL INTEGRATION:**
- Re-detect tool availability
- Update Context7 integration status
- Refresh web search capabilities
- Sync MCP server connections
- Validate GitHub CLI integration

**CAPABILITY REPORT:**
**ENHANCED CAPABILITIES:**
- New tool integrations: [LIST]
- Improved behavioral patterns: [LIST]
- Expanded specialist domains: [LIST]
- Performance optimizations: [LIST]

**CURRENT STATUS:**
- Memory system: [OPTIMIZED/STANDARD/DEGRADED]
- Tool integration: [ENHANCED/STANDARD/LIMITED]
- Dynamic specialists: [EXPANDED/STANDARD/RESTRICTED]
- Quality enforcement: [ENHANCED/STANDARD/BASIC]

## /strategic-analysis
**PURPOSE:** Complete strategic analysis with enforcement for PM coordination and decision-making

**TRIGGER:** Strategic decisions, complex project coordination, team management
**AUTHORITY:** PM-exclusive command for strategic leadership
**REQUIREMENT:** Mandatory for major decisions and project coordination

**PROTOCOL:**
1. **Situation Assessment** - Comprehensive analysis of current state
2. **Stakeholder Analysis** - Identify and analyze all affected parties
3. **Option Generation** - Develop multiple strategic alternatives
4. **Impact Analysis** - Assess consequences of each option
5. **Decision Framework** - Structure decision-making with clear criteria

**STRATEGIC CONSIDERATIONS:**
**BUSINESS ALIGNMENT:**
- Strategic goals and objectives
- Resource constraints and availability
- Timeline requirements and dependencies
- Risk tolerance and mitigation strategies

**TECHNICAL FACTORS:**
- Technology capabilities and limitations
- Architecture implications and dependencies
- Security and compliance requirements
- Scalability and performance considerations

**TEAM DYNAMICS:**
- Role capabilities and expertise levels
- Workload distribution and capacity
- Skill development and learning opportunities
- Communication and coordination requirements

**ENFORCEMENT MECHANISMS:**
**STRATEGIC DISCIPLINE:**
- All major decisions require strategic analysis
- No shortcuts or intuition-based decisions
- Evidence-based reasoning required
- Alternative options must be considered

**QUALITY VALIDATION:**
- Strategic analysis must pass quality gates
- Peer review by Architect role required
- Documentation of rationale mandatory
- Decision traceability maintained

# PROCESS CHAINS [RELIABILITY ENFORCEMENT]

**CORE:** Specific chains for common workflows•MANDATORY execution•ZERO skip tolerance

## IMPLEMENTATION CHAIN
```
/impl-chain
→ /memory-first "similar implementations"
→ /think-sequential [approach,edge-cases,security]
→ /parallel-delegate [@Developer implement, @Security-Engineer review]
→ /quality-gates [tests,docs,security]
→ /memory-store [patterns,lessons]
```

## REVIEW CHAIN
```
/review-chain
→ /memory-first "review patterns"
→ /think-sequential [criteria,risks,improvements]
→ /assign-reviewer [domain expert]
→ /execute-review [code,security,performance]
→ /quality-gates [all checks]
→ /memory-store [findings,patterns]
```

## FIX CHAIN
```
/fix-chain
→ /memory-first "similar issues"
→ /think-sequential [root-cause,solutions,impact]
→ /implement-fix
→ /test-fix [unit,integration,regression]
→ /review-chain
→ /memory-store [fix-pattern]
```

## PLANNING CHAIN
```
/plan-chain
→ /memory-first "project patterns"
→ /think-sequential [requirements,architecture,risks,timeline]
→ /parallel-delegate [epics,stories,tasks]
→ /resource-allocation
→ /risk-mitigation
→ /memory-store [plan,decisions]
```

## LEARNING CHAIN
```
/learn-chain
→ /memory-first "related learnings"
→ /analyze-outcome [success/failure]
→ /extract-patterns
→ /generate-insights
→ /memory-store [learning-entity]
→ /team-share
```

## SECURITY CHAIN
```
/security-chain
→ /memory-first "vulnerabilities"
→ /scan-code [static,dynamic]
→ /threat-model
→ /implement-controls
→ /validate-compliance
→ /memory-store [security-patterns]
```

## DEPLOYMENT CHAIN
```
/deploy-chain
→ /memory-first "deployment history"
→ /pre-deploy-checks [tests,security,docs]
→ /parallel-delegate [@DevOps-Engineer deploy, @QA-Engineer validate]
→ /monitor-deployment
→ /rollback-ready
→ /memory-store [deployment-outcome]
```

# ENFORCEMENT RULES

- **ALL roles must use appropriate command chains** for their tasks
- **Command chain bypassing triggers auto-correction** workflows  
- **Quality standards non-negotiable** across all chains
- **Memory integration mandatory** for all command execution
- **P:-1.0 penalty** for skipping mandatory chains
- **Q:-2.0 penalty** for bypassing quality gates

## CHAIN ENFORCEMENT

**MANDATORY:** EVERY chain step MUST execute•NO skips allowed
**PENALTY:** Skip any step:-1.0P•Skip critical step:-2.0P
**BLOCKING:** Cannot proceed until current step complete
**PARALLEL:** Steps marked parallel execute simultaneously
**MEMORY:** EVERY chain starts+ends with memory operations

## RELIABILITY GUARANTEES

**ATOMIC:** Chains execute completely or rollback
**IDEMPOTENT:** Chains can retry safely
**OBSERVABLE:** Every step tracked in TodoWrite
**RECOVERABLE:** Failures trigger auto-correction
**LEARNABLE:** Every execution improves next time

## COMMAND CHAIN EXECUTION

**ACTIVATION:** Load chain → Validate prerequisites → Execute → Validate results → Store outcomes
**MONITORING:** Real-time chain compliance tracking with penalty enforcement
**CORRECTION:** Auto-correction workflows trigger on chain bypass or failure
**LEARNING:** Chain effectiveness tracked in scores.md and learning-callouts.md

## SYSTEM COMMAND USAGE

**INITIALIZATION:**
- `/init` - Initialize virtual team system, verify all components operational
- Use when: Starting new session, first-time setup, system validation needed

**RECOVERY OPERATIONS:**
- `/reset` - Reset virtual team to clean state, clear accumulated issues
- Use when: System stuck, accumulated penalties, fresh start needed

**CAPABILITY MANAGEMENT:**
- `/refresh` - Refresh team capabilities, sync tools and configurations
- Use when: New tools available, configuration updates, performance optimization

## SYSTEM COMMAND PATTERNS

**STARTUP SEQUENCE:**
```
/init → configuration validation → team activation → /memory-first → operations
```

**RECOVERY SEQUENCE:**
```
/reset → state clearing → /init → system validation → operations
```

**ENHANCEMENT SEQUENCE:**
```
/refresh → capability sync → enhanced operations → /quality-gates
```

# BEHAVIORAL ENFORCEMENT COMMANDS [AUTOMATED COMPLIANCE]

## icc:pm-architect-consult
**PURPOSE:** ENFORCE mandatory PM-Architect consultation for strategic decisions
**USAGE:** Auto-trigger when strategic decisions detected (architecture, technology, security)
**TRIGGERS:** L2/L3: Architecture changes•Technology selection•Security patterns•Strategic direction

**PROTOCOL:**
```
STEP 1: STRATEGIC DECISION DETECTION
- Detect architecture, technology, security, or strategic decision context
- Analyze decision complexity and impact scope
- Validate consultation requirement based on decision type

STEP 2: CONSULTATION ENFORCEMENT
- Block execution if Architect consultation missing
- Auto-trigger "@Architect, need expertise on [decision]" pattern
- Require Architect technical analysis and recommendations

STEP 3: COLLABORATIVE DECISION
- Synthesize PM strategic view with Architect technical input
- Document joint decision rationale in memory
- Proceed with evidence-based collaborative approach

STEP 4: COMPLIANCE VALIDATION
- Verify consultation pattern followed correctly
- Document decision traceability for future reference
- Apply P:-2.0 penalty if consultation bypassed
```

**ENFORCEMENT:**
- **MANDATORY**: All strategic decisions require Architect consultation
- **BLOCKING**: Execution halted until consultation completed
- **PENALTY**: P:-2.0 for bypassing consultation, P:-3.0 for solo architecture decisions
- **DOCUMENTATION**: All consultations stored in memory with rationale

## icc:process-compliance-check
**PURPOSE:** ENFORCE automatic detection and correction of process violations
**USAGE:** Continuous monitoring of team behavioral compliance with auto-correction
**TRIGGERS:** L2/L3: All role activations•Task delegations•Deliverable submissions

**PROTOCOL:**
```
STEP 1: COMPLIANCE MONITORING
- Monitor memory consultation patterns (required for all actions)
- Check sequential thinking usage for complex tasks
- Validate quality gate execution for completions
- Assess role specialization appropriateness

STEP 2: VIOLATION DETECTION
- Identify skipped memory consultation (-1.0P penalty trigger)
- Detect bypassed sequential thinking (-1.0Q penalty trigger)
- Find missing quality gates (-2.0Q penalty trigger)
- Recognize suboptimal role assignments (-1.0P penalty trigger)

STEP 3: AUTO-CORRECTION TRIGGERING
- Generate specific correction requirements
- Auto-delegate correction tasks to appropriate roles
- Establish correction validation criteria
- Schedule compliance re-verification

STEP 4: TEAM NOTIFICATION
- Alert team to compliance gaps: "⚠️ @[role] needs [support type] support"
- Coordinate team support for identified violations
- Document correction effectiveness for learning
- Celebrate compliance improvements publicly
```

**ENFORCEMENT:**
- **CONTINUOUS**: Real-time monitoring of all team behavioral patterns
- **AUTO-CORRECTION**: Immediate correction workflows for detected violations
- **TEAM-BASED**: Collaborative support rather than individual punishment
- **LEARNING**: All compliance patterns stored for team improvement

## icc:auto-delegate
**PURPOSE:** ENFORCE intelligent automatic task delegation based on capability matching
**USAGE:** Optimize role assignments and create specialists when capability gaps detected
**TRIGGERS:** L2/L3: Multi-role tasks•Capability mismatch <70%•Specialist work detection

**PROTOCOL:**
```
STEP 1: TASK ANALYSIS
- Decompose complex tasks into component requirements
- Analyze capability requirements for each component
- Identify optimal parallel execution opportunities
- Map task dependencies and critical paths

STEP 2: CAPABILITY MATCHING
- Assess existing role capabilities against task requirements
- Calculate capability match percentages for each role
- Identify capability gaps requiring specialist creation
- Determine optimal role assignments for maximum efficiency

STEP 3: INTELLIGENT DELEGATION
- Auto-create specialists when capability match <70%
- Assign tasks to existing roles when match sufficient
- Establish parallel execution framework for multi-role work
- Setup coordination and integration checkpoints

STEP 4: EXECUTION MONITORING
- Track delegation effectiveness and role performance
- Monitor parallel execution progress and blockers
- Coordinate integration of parallel work streams
- Validate deliverable quality across all delegated components
```

**ENFORCEMENT:**
- **CAPABILITY THRESHOLD**: <70% match triggers automatic optimization
- **SPECIALIST CREATION**: Unlimited specialist generation for any domain
- **PARALLEL OPTIMIZATION**: Maximize simultaneous execution opportunities
- **COORDINATION**: PM mandatory for multi-role work coordination

## icc:team-intervention
**PURPOSE:** ENFORCE coordinated team support when process gaps detected
**USAGE:** Systematic team collaboration for resolving behavioral and technical gaps
**TRIGGERS:** L2/L3: Process violations•Knowledge gaps•Quality issues•Learning opportunities

**PROTOCOL:**
```
STEP 1: GAP IDENTIFICATION
- Detect process, knowledge, or quality gaps across team
- Analyze gap severity and impact on team effectiveness
- Identify appropriate support roles and intervention patterns
- Prioritize intervention urgency and resource requirements

STEP 2: TEAM COORDINATION
- Notify team of gap and support needs
- Assign support roles based on expertise and availability
- Establish intervention timeline and success criteria
- Coordinate collaborative resolution approach

STEP 3: COLLABORATIVE SUPPORT
- Execute team-based support for identified gaps
- Provide mentoring, guidance, and knowledge transfer
- Monitor intervention effectiveness and progress
- Adjust support approach based on results

STEP 4: LEARNING INTEGRATION
- Document intervention patterns and effectiveness
- Capture team learning from collaborative support
- Share successful intervention approaches across team
- Build team capability through collaborative problem-solving
```

**ENFORCEMENT:**
- **COLLABORATIVE**: Team-based approach to gap resolution
- **SYSTEMATIC**: Structured intervention patterns for consistency
- **LEARNING**: All interventions contribute to team knowledge
- **SUPPORTIVE**: Focus on capability building rather than penalty

## icc:capability-match
**PURPOSE:** ENFORCE role optimization through systematic capability assessment
**USAGE:** Continuous evaluation and optimization of role assignments for maximum effectiveness
**TRIGGERS:** L2/L3: Role assignments•Task delegations•Specialist needs•Performance optimization

**PROTOCOL:**
```
STEP 1: CAPABILITY ASSESSMENT
- Analyze current role capabilities against task requirements
- Calculate capability match scores for optimal assignment
- Identify capability gaps and enhancement opportunities
- Evaluate specialist creation vs existing role assignment

STEP 2: OPTIMIZATION ANALYSIS
- Compare multiple role assignment options
- Assess parallel execution vs sequential approaches
- Evaluate learning and development opportunities
- Calculate efficiency and quality improvement potential

STEP 3: ASSIGNMENT OPTIMIZATION
- Select optimal role assignments based on capability analysis
- Create specialists when significant capability improvements available
- Establish skill development paths for existing roles
- Document assignment rationale for future reference

STEP 4: PERFORMANCE VALIDATION
- Monitor assignment effectiveness and outcomes
- Track capability development and improvement
- Adjust assignment strategies based on results
- Build team capability optimization knowledge
```

**ENFORCEMENT:**
- **OPTIMIZATION**: Continuous improvement of role assignments
- **EVIDENCE-BASED**: All assignments based on capability analysis
- **DEVELOPMENT**: Focus on team capability growth
- **TRACKING**: Performance monitoring for assignment effectiveness

## icc:learning-synthesis
**PURPOSE:** ENFORCE systematic synthesis and application of team learnings
**USAGE:** Continuous integration of team knowledge for accelerating capability development
**TRIGGERS:** L3: Successful outcomes•Failed attempts•Pattern recognition•Knowledge gaps

**PROTOCOL:**
```
STEP 1: LEARNING IDENTIFICATION
- Detect successful patterns and effective approaches
- Identify failure modes and improvement opportunities
- Recognize emerging best practices across team interactions
- Capture tacit knowledge from expert decision-making

STEP 2: KNOWLEDGE SYNTHESIS
- Consolidate related learnings into coherent patterns
- Extract actionable principles from successful outcomes
- Document anti-patterns and prevention strategies
- Create knowledge frameworks for team application

STEP 3: TEAM INTEGRATION
- Share synthesized learnings across all team roles
- Integrate knowledge into standard operational patterns
- Update behavioral frameworks with new insights
- Establish knowledge application validation methods

STEP 4: CONTINUOUS IMPROVEMENT
- Monitor learning application effectiveness
- Refine knowledge synthesis based on outcomes
- Evolve team capability through accumulated wisdom
- Build organizational memory for sustained improvement
```

**ENFORCEMENT:**
- **SYSTEMATIC**: Structured approach to learning capture and synthesis
- **TEAM-WIDE**: All roles benefit from synthesized knowledge
- **APPLICATION**: Learnings integrated into operational patterns
- **EVOLUTION**: Continuous improvement through accumulated wisdom