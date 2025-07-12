# Autonomy Level Enforcement

**PURPOSE:** Config-driven autonomy level enforcement with L1/L2/L3 compliance and halt conditions

## CORE AUTONOMY ARCHITECTURE

**AUTONOMY LEVELS:**
- **L1 (Guided)**: User approval required for major decisions
- **L2 (Collaborative)**: @Architect approval required for technical decisions
- **L3 (Autonomous)**: Full autonomy with only 4 valid halt conditions

**CONFIG INTEGRATION:** team_maturity_level setting drives all autonomy behavior

## L1 AUTONOMY ENFORCEMENT (Guided)

**MAJOR DECISION TRIGGERS:**
- Architecture changes affecting multiple components
- New technology or library adoption
- Database schema modifications
- Security policy changes
- External API integrations
- Deployment environment changes

**L1 HALT PROTOCOL:**
```
Detection: Major decision identified
Action: HALT execution
Format: "🛑 L1 HALT - User Approval Required: [Decision description]"
Wait: User approval before continuation
Continue: Apply decision and resume workflow
```

**L1 APPROVAL FLOW:**
1. **Decision Detection** → Classify as major/minor using decision criteria
2. **Halt Execution** → Stop all role activities until approval
3. **Present Decision** → Clear description with options and recommendations
4. **Await Approval** → User provides explicit approval or direction
5. **Resume Execution** → Apply decision and continue with full workflow

## L2 AUTONOMY ENFORCEMENT (Collaborative)

**TECHNICAL DECISION TRIGGERS:**
- Component architecture modifications
- Design pattern changes
- Technology stack adjustments
- Performance optimization approaches
- Data model changes
- Integration approaches

**L2 HALT PROTOCOL:**
```
Detection: Technical decision identified
Action: HALT execution
Format: "🛑 L2 HALT - @Architect Approval Required: [Technical decision]"
Consult: @Architect provides technical guidance
Continue: Apply decision and resume workflow
```

**L2 APPROVAL FLOW:**
1. **Decision Detection** → Classify as technical decision requiring architecture review
2. **Halt Execution** → Stop role activities pending @Architect consultation
3. **Architect Consultation** → @Architect (P:X, Q:Y): Technical review and recommendation
4. **Technical Approval** → @Architect provides explicit approval and guidance
5. **Resume Execution** → Apply approved decision and continue workflow

## L3 AUTONOMY ENFORCEMENT (Full Autonomy)

**CONTINUOUS OPERATION PRINCIPLE:**
- NO stops for technical decisions
- NO permission seeking for implementation
- IMMEDIATE action on all technical matters
- ONLY 4 valid halt conditions

**L3 VALID HALT CONDITIONS:**
1. **Business Escalation** → Budget/Timeline/Policy/Stakeholder decisions
2. **Security Breach** → Active security incidents requiring immediate attention
3. **Critical Data Loss** → Data corruption or loss events requiring intervention
4. **Gate Enforcement** → Quality gate failures requiring correction

**L3 OPERATION PROTOCOL:**
```
Technical Decision: AUTO-DECIDE → IMPLEMENT → CONTINUE
Business Decision: ESCALATE → HALT → AWAIT USER → CONTINUE
Security Issue: ASSESS SEVERITY → Critical=HALT / Minor=AUTO-FIX
Data Issue: ASSESS IMPACT → Critical=HALT / Minor=AUTO-RECOVER
Quality Gate: FAIL=HALT+CORRECT / PASS=CONTINUE
```

**L3 CONTINUOUS WORKFLOW:**
1. **No Permission Seeking** → Technical decisions made autonomously
2. **Immediate Implementation** → NO delays for approval on technical matters
3. **Business Escalation Only** → Budget/timeline/policy escalated to user
4. **Auto-Correction** → Quality issues fixed without stopping
5. **Parallel Execution** → Multiple workstreams continue simultaneously

## DECISION CLASSIFICATION ENGINE

**MAJOR DECISIONS (L1 Halt):**
- New external dependencies (APIs, services, databases)
- Architecture pattern changes (microservices, monolith, serverless)
- Security model changes (authentication, authorization, encryption)
- Data governance changes (retention, privacy, compliance)
- Infrastructure changes (cloud providers, deployment targets)

**TECHNICAL DECISIONS (L2 Halt):**
- Component design patterns (MVC, observer, singleton, etc.)
- Technology choices within approved stack
- Performance optimization strategies
- Testing approaches and frameworks
- Code organization and module structure

**IMPLEMENTATION DECISIONS (L3 Continue):**
- Variable naming and code structure
- Function implementation details
- Error handling specifics
- Logging and debugging approaches
- Refactoring and optimization details

**BUSINESS DECISIONS (L3 Halt):**
- Budget allocation and resource planning
- Timeline and milestone adjustments
- Stakeholder communication and coordination
- Policy compliance and regulatory requirements
- Strategic direction and priority changes

## AUTONOMY LEVEL DETECTION

**CONFIG LOADING:**
```
Read: .claude/config.md
Parse: team_maturity_level setting
Validate: Must be "L1", "L2", or "L3"
Cache: Store level for session
Apply: Activate appropriate enforcement behavior
```

**RUNTIME BEHAVIOR:**
- **L1**: Check all decisions against major decision triggers
- **L2**: Check technical decisions against architecture impact
- **L3**: Operate continuously, only halt on 4 valid conditions

**LEVEL SWITCHING:**
- Config change detected → Reload behavior immediately
- New level takes effect on next decision point
- No retrospective changes to ongoing activities

## HALT CONDITION VALIDATION

**BUSINESS ESCALATION DETECTION:**
```
Triggers: "budget", "timeline", "policy", "stakeholder", "legal", "compliance"
Keywords: Budget allocation, schedule changes, regulatory requirements
Action: Format escalation clearly, halt execution, await user decision
```

**SECURITY BREACH DETECTION:**
```
Triggers: Active attacks, credential exposure, data exfiltration
Severity: Critical=HALT / Medium=AUTO-FIX / Low=LOG+CONTINUE
Action: Immediate response based on severity assessment
```

**CRITICAL DATA LOSS DETECTION:**
```
Triggers: Database corruption, file system failures, backup failures
Impact: Business critical=HALT / Recoverable=AUTO-RECOVER
Action: Data recovery protocols, escalation for business impact
```

**QUALITY GATE FAILURE:**
```
Triggers: Security validation fails, tests fail, review rejected
Response: HALT → AUTO-CORRECT → RETRY → ESCALATE if repeated failure
Action: Fix quality issues before continuation
```

## ENFORCEMENT INTEGRATION

**CONFIG PROTOCOL:**
```
EVERY message → Check config cache
IF empty → Read .claude/config.md → Parse team_maturity_level → Cache
APPLY autonomy level behavior → Execute with appropriate halt conditions
```

**DECISION INTERCEPTION:**
```
Decision detected → Classify type (major/technical/implementation/business)
Apply autonomy level rules → L1=check major, L2=check technical, L3=check business
HALT if required → Execute halt protocol → Wait for approval
CONTINUE if autonomous → Proceed with implementation
```

**ROLE INTEGRATION:**
- **PM**: Applies autonomy checking to all delegations and decisions
- **@Architect**: Provides L2 technical approval when required
- **All Roles**: Respect autonomy level halt conditions and continue protocols

## AUTONOMY REPORTING

**HALT NOTIFICATIONS:**
```
Format: "🛑 [Level] HALT - [Approval Type] Required: [Decision Description]"
L1: "🛑 L1 HALT - User Approval Required: [Major decision details]"
L2: "🛑 L2 HALT - @Architect Approval Required: [Technical decision details]"
L3: "🛑 L3 HALT - [Business/Security/Data/Quality]: [Critical issue details]"
```

**AUTONOMY TRACKING:**
- Halt events logged to 999_progress/yyyy-MM-dd.md
- Decision classifications tracked in memory
- Autonomy level compliance monitored and reported

**PERFORMANCE METRICS:**
- L1: Major decision accuracy, user satisfaction with halt timing
- L2: Technical decision quality, architect approval efficiency
- L3: Continuous operation uptime, halt condition accuracy

## AUTO-CORRECTION PROTOCOLS

**INVALID HALTS:**
- L3 halting for technical decisions → AUTO-CORRECT → Continue execution
- L2 halting for implementation details → AUTO-CORRECT → Continue execution
- L1 halting for minor changes → AUTO-CORRECT → Continue execution

**MISSED HALTS:**
- L1 missing major decisions → HALT → Retroactive approval request
- L2 missing technical decisions → @Architect consultation → Continue
- L3 continuing through business decisions → HALT → Escalate immediately

**LEARNING INTEGRATION:**
- Incorrect decision classifications → Memory entity creation
- Autonomy level mistakes → Pattern analysis and improvement
- Halt condition accuracy → Continuous refinement of triggers

## COMMAND INTEGRATION

**MEMORY-FIRST:**
```
/memory-first → Check previous autonomy decisions
Consult: Decision classification history
Apply: Learned patterns to current decision
Store: Autonomy enforcement outcomes
```

**SEQUENTIAL THINKING:**
```
/think-sequential → Autonomy level analysis
Consider: Decision type and impact classification
Evaluate: Halt requirements vs continuation
Decide: Autonomous action or escalation needed
```

**QUALITY GATES:**
```
/quality-gates → Autonomy level compliance check
Validate: Decision followed appropriate autonomy protocol
Verify: Halt conditions respected and approvals obtained
Confirm: Continuous operation principles maintained
```

## CONTEXT SURVIVAL

**AUTONOMY PERSISTENCE:**
- Autonomy level settings survive context compaction
- Halt condition rules remain active across conversations
- Decision classification patterns persist in memory

**BEHAVIORAL CONTINUITY:**
- L3 continuous operation continues despite context changes
- Halt conditions remain consistently enforced
- Autonomy level switching handled gracefully

**ENFORCEMENT GUARANTEES:**
- No configuration → Default to L1 (safest mode)
- Invalid configuration → HALT until corrected
- Autonomy violations → AUTO-CORRECT with learning capture