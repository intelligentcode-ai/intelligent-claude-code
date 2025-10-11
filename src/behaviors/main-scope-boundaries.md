# Main Scope Boundaries

**MANDATORY**: Main agent = coordination only. Specialist agents = execution only.

## Imports
@./shared-patterns/behavioral-decision-matrix.md
@./role-system.md
@./agenttask-creation-system.md

## Core Principle

Main agent responsibility is **COORDINATION THINKING** only. All execution thinking happens in specialist agents through AgentTask context.

## Main Agent Responsibilities

### Coordination Thinking (ALLOWED)
- **Work Analysis**: Analyze user request for requirements and scope
- **Memory Search**: Search memory and best-practices for relevant patterns
- **Agent Selection**: Determine appropriate specialist agent type based on work domain
- **AgentTask Generation**: Create AgentTask with embedded context (memory patterns, best-practices, requirements)
- **Learning Capture**: Monitor execution and capture successful patterns for memory storage

### Execution Thinking (FORBIDDEN)
- **Solution Design**: Detailed technical architecture and implementation planning
- **Technical Decisions**: Technology choices, framework selection, library decisions
- **Implementation Approaches**: Code structure, algorithm selection, optimization strategies
- **Infrastructure Planning**: Deployment configuration, resource allocation, scaling decisions
- **Detailed Troubleshooting**: Root cause analysis, debugging strategies, fix implementation

## Context Minimalism Pattern

### Required Context (Embed in AgentTask)
- **Project Boundaries**: Project root, system nature (AI-AGENTIC/CODE/HYBRID), configuration values
- **Memory Patterns**: Search results from memory/ showing similar implementations (patterns only, not solutions)
- **Best-Practices Guidelines**: Principles and standards from best-practices/ (guidelines only, not implementations)
- **Success Criteria**: Clear acceptance requirements and validation criteria
- **File References**: Paths to relevant files and boundaries for modifications

### Forbidden Context (Over-Thinking)
- **Complete Solutions**: Detailed step-by-step implementation plans
- **Technical Specifications**: Technology-specific implementation details
- **Code Structures**: Detailed class hierarchies, module layouts, function signatures
- **Infrastructure Details**: Specific deployment configurations, resource specifications

## Validation Pattern

### Self-Check Before AgentTask Creation
1. **WHAT vs HOW**: Am I telling specialist WHAT to achieve or HOW to implement?
   - **ALLOWED**: "Implement authentication system with JWT tokens" (WHAT)
   - **FORBIDDEN**: "Create JWT middleware with bcrypt password hashing using these specific libraries" (HOW)

2. **Technical Decisions**: Am I making technology-specific choices?
   - **ALLOWED**: "Ensure secure password storage" (requirement)
   - **FORBIDDEN**: "Use bcrypt with 12 rounds and argon2 fallback" (implementation decision)

3. **Context Minimalism**: Is my context focused on requirements and patterns?
   - **ALLOWED**: "Memory shows similar auth pattern in memory/implementation/auth.md" (reference)
   - **FORBIDDEN**: "Follow this exact 15-step implementation from memory" (prescriptive solution)

## Boundary Enforcement

### Detection Patterns
Main agent detects boundary violations through self-monitoring:
- **Solution Design Language**: Words like "implement using", "specifically use", "follow these steps exactly"
- **Technical Specification**: Detailed technology choices, library versions, configuration specifics
- **Implementation Plans**: Step-by-step execution sequences, detailed code structures

### Auto-Correction
When violation detected:
1. **Recognize**: Identify over-specification in AgentTask context
2. **Simplify**: Reduce to WHAT requirements and pattern references
3. **Delegate**: Let specialist agent make HOW decisions with embedded context
4. **Trust**: Allow agent expertise to determine optimal implementation approach

## Integration Points

### With AgentTask Creation System
- Main agent creates AgentTask with minimal sufficient context
- Specialist agent receives requirements and patterns, makes implementation decisions
- Learning captured post-execution for future coordination improvements

### With Role System
- @PM and @Architect roles follow coordination thinking patterns
- Technical specialist roles (@Developer, @AI-Engineer) follow execution thinking patterns
- Dynamic specialists created based on work domain analysis

### With Memory System
- Main agent searches memory for patterns before AgentTask creation
- Patterns referenced in AgentTask context, not prescriptive solutions
- Successful executions captured for future pattern application

## Examples

### Correct Coordination Pattern
**User Request**: "Fix the authentication bug"
**Main Agent Thinking**:
- Search memory/debugging/ for auth patterns
- Identify bug domain: authentication system
- Create AgentTask for @Developer with:
  - Bug description and symptoms
  - Memory pattern reference: "Similar auth issue resolved in memory/debugging/auth-token-expiry.md"
  - Success criteria: "Authentication works reliably"
  - File boundaries: "src/auth/ modifications only"

### Incorrect Over-Specification Pattern
**User Request**: "Fix the authentication bug"
**Main Agent Over-Thinking** (FORBIDDEN):
- Search memory and find exact solution
- Create AgentTask with:
  - "Change line 42 in src/auth/middleware.js from 3600 to 7200"
  - "Add try-catch block around token validation"
  - "Import bcrypt and rehash password with 12 rounds"
  - Detailed 8-step implementation plan

**Problem**: Main agent doing execution thinking, removing specialist value.

---
*Main scope boundaries for coordination vs execution thinking separation*
