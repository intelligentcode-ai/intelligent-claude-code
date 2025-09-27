# AgentTask System Guidelines

**Purpose:** AgentTask system provides structured work execution through specialized agents.

## Imports
@./shared-patterns/compaction-enforcement.md
@./shared-patterns/infrastructure-memory-patterns.md

## Core Workflow

**Standard Process:**
1. Work request → AgentTask creation → Agent execution
2. Main agent: Creates AgentTasks with complete context
3. Specialist agents: Execute work through Task tool

**Template Requirements:**
- Use template hierarchy for consistency
- Resolve all placeholders before execution
- Embed configuration values for self-contained execution

**Quality Guidelines:**
- AgentTasks enable specialized execution
- Templates ensure consistent structure
- Complete context prevents runtime lookups
- Memory search improves outcomes

## Role Separation

**Main Agent Responsibilities:**
- AgentTask creation and context assembly
- Memory search and pattern application
- Project analysis and requirement gathering
- Coordination between specialists

**Specialist Agent Execution:**
- Technical implementation through Task tool
- Domain-specific expertise application
- Quality assurance and testing
- Documentation and cleanup

## Process Guidelines

**AgentTask Creation Process:**
1. **Analyze Request:** Understand scope and requirements
2. **Search Memory:** Find relevant patterns and solutions
3. **Select Template:** Choose appropriate complexity level
4. **Embed Context:** Include all necessary information
5. **Deploy Agent:** Use Task tool for specialist execution

**Quality Assurance:**
- Templates provide consistent structure
- Complete context enables reliable execution
- Specialist agents ensure domain expertise
- Memory integration prevents repeated mistakes

**System Integration:**
- Work flows through AgentTask framework
- Context loss detection guides reinitialization
- Infrastructure patterns stored for reuse
- Continuous improvement through pattern capture

---
*AgentTask system guidelines for structured and reliable work execution*
