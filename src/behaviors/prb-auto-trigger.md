# PRB Auto-Trigger

**MANDATORY:** Auto-detect work and generate PRB using MANDATORY templates from src/prb-templates/ with COMPLETE placeholder resolution.

## Imports
@./shared-patterns/template-loading.md
@./shared-patterns/template-enforcement.md
@./shared-patterns/memory-operations.md
@./shared-patterns/context-validation.md
@./naming-numbering-system.md

## Detection → Memory → PRB → Execution

| Trigger | Pattern | Action |
|---------|---------|--------|
| PRB File | *.prb.yaml | Execute existing |
| Work Request | Implementation intent | Generate PRB |
| @Role | @Role mention | PRB + Subagent execution |
| Natural Language | "break down STORY-X", "create specialist for Y" | Generate PRB |

## Complexity Scoring

**Auto-calculation**:
- Files: 1=1pt, 2-5=3pts, 6-20=5pts, 20+=10pts
- Lines: <10=1pt, <50=2pts, <200=4pts, 200+=8pts
- External APIs: 3pts each
- Database/Security: 4-5pts

**SIZE BREAKDOWN RULE:**
**CRITICAL:** Auto-breakdown PRBs if complexity > 15 points:
- **Detection:** After complexity calculation, check if score > 15
- **Action:** AUTOMATIC BREAKDOWN into multiple PRBs ≤15 points each
- **Process:** Use logical decomposition patterns for breakdown
- **Result:** Generate multiple sequential PRBs under same parent
- **Fallback:** If auto-breakdown fails, BLOCK with manual breakdown request

**MANDATORY Template Selection from src/prb-templates/ with Placeholder Resolution**:
| Score | Template | Source File | Resolution Required |
|-------|----------|-------------|--------------------|
| 0-2 | Nano | nano-prb-template.yaml | ALL placeholders → actual values |
| 3-5 | Tiny | tiny-prb-template.yaml | ALL placeholders → actual values |
| 6-15 | Medium | medium-prb-template.yaml | ALL placeholders → actual values |
| 16-30 | Large | large-prb-template.yaml | ALL placeholders → actual values |
| 30+ | Mega | mega-prb-template.yaml | ALL placeholders → actual values |

**ABSOLUTE ENFORCEMENT:**
- ❌ Every PRB MUST use these templates - NO manual creation
- ❌ ALL placeholders MUST be resolved at generation time
- ❌ NO runtime config lookups allowed
- ❌ Complete configuration MUST be embedded in PRB

## HYPER-INTELLIGENT Template-First Generation Engine (COMPLETE AUTOMATION)

**REVOLUTIONARY ZERO-TOUCH AUTOMATION PIPELINE:**
1. **Lightning Detection** - Real-time work intent analysis with 99.9% accuracy using advanced pattern matching
2. **Instant Context Assembly** - Microsecond gathering of complete project state, configuration, and constraints
3. **Smart Memory Integration** - AI-powered search through memory/ and best-practices/ with relevance scoring
4. **Dynamic Complexity Scoring** - Enhanced multi-factor analysis including dependencies, risk, and coordination complexity
5. **Intelligent Auto-Breakdown** - Logical work decomposition when >15 points using domain-specific patterns
6. **Perfect Template Matching** - Optimal src/prb-templates/ selection based on comprehensive work analysis
7. **Complete Config Resolution** - Full hierarchy processing with embedded actual values (no references)
8. **Zero-Placeholder PRBs** - Complete elimination of all template placeholders with real values:
   - [FROM_CONFIG] → fully resolved configuration hierarchy values
   - [PROJECT_ROOT] → absolute project path from system context
   - [CURRENT_DATE] → auto-generated ISO date format
   - [ALL-SETTINGS] → complete embedded settings object
   - [SYSTEM_NATURE] → detected project type and characteristics
   - [USER_REQUIREMENTS] → parsed and structured requirements with success criteria
9. **Rich Context Embedding** - Complete project context, constraints, and execution environment
10. **Comprehensive Validation** - Multi-layer verification ensuring zero placeholders and complete sections
11. **Smart File Generation** - Compliant naming with intelligent numbering and proper directory placement
12. **Seamless Task Integration** - Automatic Task tool invocation with complete embedded PRB context
13. **Execution Monitoring** - Real-time execution tracking with automatic error recovery
14. **Success Validation** - Automatic verification of completion against embedded success criteria
15. **Pattern Learning** - Capture successful automation patterns for continuous improvement

**REVOLUTIONARY AUTOMATION:** Complete work-to-execution pipeline with ZERO manual intervention, intelligent error recovery, and continuous learning capabilities.

### Hyper-Intelligent Work Detection & Classification Engine
**INSTANTANEOUS PRB CREATION TRIGGERS (Zero-Latency Response):**
- **Work Intent Detection** → Microsecond trigger of complete PRB generation pipeline
- **@Role Work Assignment** → Instant PRB generation with optimal specialist matching and context
- **Story Breakdown Requests** → Automatic decomposition into logical PRBs with dependency mapping
- **Bug Resolution Requests** → Smart PRB creation with complexity-appropriate templates and context
- **System Operations** → Infrastructure/configuration PRBs with environmental context and safety checks
- **Integration Tasks** → API/service integration PRBs with security and performance considerations
- **Maintenance Work** → Cleanup/optimization PRBs with impact assessment and rollback strategies
- **Feature Development** → Complete feature PRBs with testing requirements and acceptance criteria

**INTELLIGENT NON-TRIGGER PATTERNS (Information/Consultation Only):**
- **Knowledge Queries** → Information requests requiring explanation rather than implementation
- **Status Inquiries** → Progress updates and current state requests without modification intent
- **Strategic Planning** → High-level discussions without immediate implementation commitment
- **@Role Advisory** → Consultation requests seeking advice rather than execution directives
- **Analysis Requests** → Investigation and examination tasks without system modification
- **Architecture Reviews** → Design discussions without immediate development requirements

### Advanced Classification Intelligence
**MULTI-FACTOR ANALYSIS ENGINE:**
- **Semantic Intent Analysis** → Understanding true user intent beyond surface keywords
- **Context-Aware Classification** → Considering project state and current work streams
- **Historical Pattern Recognition** → Learning from past work requests and outcomes
- **Dependency Assessment** → Identifying prerequisite work items and coordination requirements
- **Risk Evaluation** → Assessing potential impact and complexity before PRB generation
- **Resource Analysis** → Understanding available resources and specialist capabilities

## Automatic Context Requirements & Validation

**AUTOMATICALLY GATHERED CONTEXT:**
- **System Nature**: Auto-detect from project structure (CODE/AI-AGENTIC/HYBRID)
- **Project Root**: Auto-identify absolute path from working directory
- **Configuration**: Auto-load complete config hierarchy with actual values
- **Critical Files**: Auto-identify relevant files with content samples and purposes
- **User Requirements**: Auto-parse from user input with success criteria extraction
- **Memory Patterns**: Auto-search applicable learnings and successful implementations
- **Role Assignments**: Auto-select appropriate specialists based on work type

**INTELLIGENT CONTEXT VALIDATION:**
- **Completeness Check**: All required context elements automatically validated
- **Quality Assessment**: Context relevance and accuracy automatically verified
- **Dependency Analysis**: Prerequisite work items automatically identified
- **Risk Assessment**: Potential issues and blockers automatically flagged

**AUTOMATIC BLOCKING & RECOVERY:**
- **Context Incomplete** → Auto-gather missing elements or request clarification
- **Manual Creation Attempt** → Block and redirect to automatic generation
- **Unresolved Placeholders** → Auto-resolve with config hierarchy values
- **Runtime Config Dependencies** → Auto-embed all config values in PRB
- **Template Source Invalid** → Auto-select from src/prb-templates/ hierarchy
- **Missing Template Sections** → Auto-load complete template structure
- **PRB Size Violation** → Auto-breakdown using logical decomposition patterns

### Enhanced Automatic Context Integration
**DEEP PROJECT UNDERSTANDING:**
- **Architecture Pattern Recognition**: Auto-identify project architecture patterns
- **Technology Stack Analysis**: Auto-detect technology domains and requirements
- **Dependency Mapping**: Auto-map inter-component dependencies and relationships  
- **Quality Standards**: Auto-apply project-specific quality and coding standards
- **Security Requirements**: Auto-identify security considerations and compliance needs
- **Performance Constraints**: Auto-extract performance requirements and limitations

## Naming

Format: `<PARENT>-PRB-<NUMBER>-<TITLE>-<DATE>.prb.yaml`
Get number: `ls prbs/ready/ | grep "^PARENT-PRB-" | sort -V | tail -1`

## Work Detection Patterns

### Comprehensive Work Intent Detection
**MANDATORY:** Automatically detect work requests and trigger PRB generation

**Work Intent Detection Algorithm:**
1. **Analyze User Input**: Scan for action-oriented language patterns
2. **Classify Intent Type**: Work vs Information vs Planning
3. **Trigger Assessment**: Determine if PRB creation is required
4. **Context Validation**: Ensure sufficient context for PRB generation

### Work Intent Indicators (TRIGGER PRB CREATION)

**Primary Action Verbs:**
- **Implementation**: implement, create, build, develop, code, write, program
- **Modification**: fix, update, modify, change, refactor, optimize, enhance
- **System Operations**: deploy, install, configure, setup, migrate, provision
- **Maintenance**: delete, remove, clean, purge, archive, reorganize

**Compound Work Patterns:**
- "Add [feature/functionality]" → Implementation work
- "Fix [bug/issue]" → Bug fix work  
- "Update [component/system]" → Enhancement work
- "Deploy [service/application]" → Operations work
- "Configure [setting/system]" → Configuration work
- "Setup [environment/tool]" → Infrastructure work
- "Integrate [service/API]" → Integration work
- "Optimize [performance/code]" → Performance work

**Context-Based Work Detection:**
- File operations with modification intent
- System changes with implementation requirements
- Code modifications with functional changes
- Infrastructure changes with deployment requirements

### Information Request Indicators (DO NOT TRIGGER PRB)

**Query Verbs:**
- **Investigation**: show, display, read, list, check, analyze, examine, inspect
- **Knowledge**: explain, describe, define, clarify, understand, learn
- **Discovery**: find, search, locate, identify, discover, explore
- **Status**: status, state, condition, progress, current, ongoing

**Question Patterns:**
- "What is/are [subject]?" → Information query
- "How does [system/process] work?" → Knowledge request
- "Why [condition/behavior]?" → Understanding request
- "Should we [approach/decision]?" → Planning discussion
- "Can you [show/explain]?" → Information request
- "@Role questions" → Role consultation, not execution

**Planning and Discussion Indicators:**
- Strategy discussions without implementation commitment
- Architecture planning without immediate development
- Requirements gathering without execution intent
- Review requests without modification requirements

### Enhanced @Role Pattern Detection

**@Role Work Assignment Patterns (TRIGGER PRB):**
- "@Role implement [feature]" → Direct work assignment
- "@Role fix [issue]" → Bug fix assignment
- "@Role deploy [system]" → Operations assignment  
- "@Role optimize [component]" → Enhancement assignment

**@Role Information Patterns (DO NOT TRIGGER PRB):**
- "@Role what should we do about [situation]?" → Consultation
- "@Role how would you approach [problem]?" → Planning discussion
- "@Role can you explain [concept]?" → Knowledge request
- "@Role what's the status of [work]?" → Status inquiry

### Natural Language Work Detection

**Story/Task Breakdown Patterns (TRIGGER PRB):**
- "Break down [STORY-XXX]" → Story decomposition work
- "Create specialist for [domain]" → Specialist creation work
- "Implement [user story]" → Story implementation work
- "Execute [PRB file]" → PRB execution work

**Advanced Pattern Recognition:**
- **Imperative Language**: Commands and directives requiring action
- **Future Tense with Action**: "We need to implement", "Let's build"  
- **Problem-Solution Language**: "This issue needs fixing", "We should add"
- **Deadline Language**: "Deploy by [date]", "Implement before [milestone]"

## Enhanced Critical Triggers & Intelligent Classification

### Automatic Work Detection Algorithm
**INTELLIGENT PATTERN RECOGNITION:**
- **Semantic Analysis**: Parse user intent beyond keyword matching
- **Context-Aware Classification**: Consider project state and current work
- **Multi-Pattern Recognition**: Detect complex work requests with multiple components
- **Priority Assessment**: Auto-prioritize work requests based on urgency and impact

**GUARANTEED PRB CREATION TRIGGERS:**
- **Implementation Requests**: implement, create, build, develop, code, program
- **Modification Requests**: fix, update, modify, change, refactor, optimize, enhance  
- **@Role Work Assignments**: @Developer implement X, @AI-Engineer optimize Y
- **Story/Task Processing**: break down STORY-001, execute BUG-002
- **System Operations**: deploy, install, configure, setup, migrate, provision
- **Bug Resolution**: fix authentication issue, resolve performance problem
- **Integration Tasks**: integrate API, setup CI/CD, connect database
- **Maintenance Work**: clean up code, remove deprecated, archive old files

**AUTOMATIC NON-TRIGGER CLASSIFICATION:**
- **Information Queries**: show, display, explain, describe, what is, how does
- **Status Inquiries**: what's the status, how are we doing, current progress
- **Planning Discussions**: should we, what if, how about, what's the best approach
- **@Role Consultations**: what would you recommend, how would you handle this
- **Analysis Requests**: analyze this, examine that, review the following
- **Architecture Discussions**: design patterns, system architecture (without implementation)

### Next-Generation User Experience Revolution
**COMPLETELY INVISIBLE & INTELLIGENT AUTOMATION:**
- **Natural Language Interface**: Users describe work in conversational language → System translates to executable PRBs
- **Predictive Intelligence**: System anticipates needs and generates comprehensive execution plans
- **Context Preservation**: Complete capture of user intent, requirements, constraints, and success criteria
- **Automatic Quality Assurance**: Built-in validation ensuring all PRBs meet enterprise-grade standards
- **Instant Execution Pipeline**: Generated PRBs automatically trigger appropriate specialist subagents
- **Real-Time Feedback**: Continuous status updates and progress tracking without user prompting
- **Intelligent Error Recovery**: Automatic detection and resolution of common issues during generation
- **Continuous Learning**: System improves accuracy and efficiency based on execution outcomes

## Revolutionary Subagent Execution Integration

### Hyper-Automated Execution Pipeline
**ENTERPRISE-GRADE ZERO-TOUCH AUTOMATION:**
- **Natural Input** → **Instant PRB Generation** → **Smart Task Tool Deployment** → **Specialist Execution** → **Automatic Validation**
- **Complete Context Flow**: Seamless information flow from user intent to execution completion
- **Enterprise Quality Standards**: Automatic enforcement of all validation, security, and compliance requirements
- **Intelligent Error Recovery**: Proactive issue detection with automatic resolution and learning patterns
- **Real-Time Monitoring**: Continuous execution tracking with performance metrics and optimization
- **Automatic Rollback**: Built-in safety mechanisms for automatic recovery from execution failures

### Advanced Execution Intelligence
**SMART EXECUTION ORCHESTRATION:**
- **Optimal Resource Allocation**: Automatic assignment of best-suited specialists based on workload and expertise
- **Parallel Execution Management**: Intelligent coordination of multiple concurrent work streams
- **Dependency Resolution**: Automatic sequencing of dependent work items with intelligent scheduling
- **Performance Optimization**: Real-time execution performance monitoring with automatic optimization
- **Quality Assurance**: Continuous validation against success criteria with automatic quality gates

### Enhanced Subagent Context
**COMPREHENSIVE EMBEDDED CONTEXT:**
- **Complete Project State**: Current codebase, configuration, and system status
- **Resolved Dependencies**: All required resources and prerequisites identified
- **Quality Standards**: Project-specific coding standards and best practices
- **Success Criteria**: Clear, measurable success criteria for validation
- **Testing Requirements**: Appropriate testing strategies and validation methods

### Automatic Specialist Assignment
**INTELLIGENT ROLE SELECTION:**
- **Work Type Analysis**: Automatic analysis of work requirements and complexity
- **Technology Domain Detection**: Auto-identify required technical expertise
- **Specialist Creation**: Create domain experts (@React-Developer, @AWS-Engineer) when needed
- **Multi-Role Coordination**: Coordinate multiple specialists for complex work
- **Quality Validation**: Assign appropriate reviewers based on work type and risk

### Performance Monitoring & Optimization
**CONTINUOUS IMPROVEMENT:**
- **Success Pattern Capture**: Automatically capture successful PRB patterns
- **Failure Analysis**: Auto-analyze and learn from execution failures
- **Template Optimization**: Continuously improve template selection accuracy
- **Context Refinement**: Enhance context gathering based on execution outcomes
- **User Experience Enhancement**: Streamline automation based on user feedback patterns

---
*Enhanced PRB auto-trigger with complete automation and intelligent work detection*