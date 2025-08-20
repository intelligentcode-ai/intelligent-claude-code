# STORY-007: Claude Code Native Subagents Integration

**Created:** 2025-01-19  
**Status:** Ready for PRB Generation  
**Priority:** High  

## Problem Statement

Intelligent-claude-code currently uses Task tool for role execution, but Claude Code now has native Subagents that provide better context isolation and automatic delegation. We need to integrate native Subagents while maintaining our behavioral framework and enabling unlimited dynamic specialist creation.

## Business Value

- **Native Integration**: Use Claude Code's built-in Subagents instead of custom Task tool wrapper
- **Better Performance**: Native subagents have optimized context management  
- **Unlimited Specialists**: Dynamic creation for ANY technology domain
- **Cleaner Architecture**: Remove custom execution logic, use native capabilities
- **Future-Proof**: Align with Claude Code's evolution and feature roadmap

## Requirements

### Intelligent Agent Implementation (Complete Transformation)

**PHASE 1: Intelligent Agents with Encapsulated Behaviors**
- Create intelligent agents that ENCAPSULATE all behavioral patterns
- Remove need for external command scaffolding
- Enable natural `@Agent do X` interaction

**PHASE 2: Command Scaffolding Removal**  
- Remove redundant `/icc-xyz` commands (agents handle internally)
- Simplify behavioral patterns 
- Clean up external command infrastructure

### Core 14 Agent Implementation
**FIXED CORE ROLES** (correct Claude Code format):
- `@PM` - Project coordination (MAIN SCOPE - not subagent)
- `@Architect` - System architecture design
- `@Developer` - Software implementation  
- `@System-Engineer` - Infrastructure and system operations
- `@DevOps-Engineer` - CI/CD and deployment automation
- `@Database-Engineer` - Database design and optimization
- `@Security-Engineer` - Security reviews and compliance
- `@AI-Engineer` - AI/ML systems and behavioral frameworks
- `@Web-Designer` - UI/UX design and user experience
- `@QA-Engineer` - Quality assurance and test planning
- `@Backend-Tester` - Backend testing and API validation
- `@Requirements-Engineer` - Requirements analysis and documentation
- `@User-Role` - End-to-end testing and browser automation

**YAML Frontmatter (Claude Code Compliant):**
```yaml
---
name: developer
description: Software implementation specialist with expertise in feature development and code architecture
tools: Edit, MultiEdit, Read, Write, Bash, Grep, Glob, LS
---
```

### Dynamic Specialist Creation (ALWAYS)
**MANDATORY**: ALL specialists must be created dynamically - NO pre-defined specialists beyond core 14.

**When to Create Specialists:**
- **ALWAYS** for specific technology stacks (React, AWS, Docker, etc.)
- **ALWAYS** for domain expertise not covered by core 14
- **ALWAYS** when <70% capability match with existing roles
- **NEVER** use generic roles beyond the 14 core

**Dynamic Creation Examples:**
- `@React-Developer` - For React/Frontend projects
- `@AWS-Engineer` - For AWS infrastructure projects  
- `@Blockchain-Architect` - For blockchain/Web3 projects
- `@API-Architect` - For API-first architectures
- `@Mobile-Developer` - For mobile application development
- `@ML-Specialist` - For machine learning projects

### Command Scaffolding Removal

**Commands to Remove (Now handled by intelligent agents):**
- `/icc-create-specialist` → Agents handle dynamic specialist creation
- `/icc-breakdown-story` → @PM agent handles story breakdown internally  
- `/icc-think-sequential` → Agents have embedded sequential thinking
- `/icc-role-assignment-matrix` → @PM + @Architect handle role assignment
- `/icc-validate-role-assignment` → Embedded in agent behavioral patterns
- `/icc-create-dynamic-specialist` → Part of agent creation process
- `/icc-analyze-complexity` → Embedded in @PM and @Architect thinking

**Natural Interaction Transformation:**
```
OLD: /icc-breakdown-story STORY-001
NEW: @PM break down STORY-001 into PRBs

OLD: /icc-create-specialist react-developer  
NEW: @PM create React specialist for this project

OLD: /icc-think-sequential "analyze problem"
NEW: @Architect analyze this system architecture
```

### Technical Implementation Details

**Subagent Invocation Syntax:**
```
"Use the developer subagent to execute PRB-001"
"Have the ai-engineer subagent update behavioral patterns"  
"Get the architect subagent to design system architecture"
```

**Context Passing Mechanisms:**
1. **Direct Context Passing:**
```
"Use the developer subagent to implement React authentication with these requirements:
- You are acting as React specialist with 10+ years experience
- Use React 18+ hooks and modern patterns
- Integrate with existing auth system in src/auth/
- Follow project's component architecture"
```

2. **File-Based Context (Preferred for PRBs):**
```
"Use the developer subagent to execute the PRB at prbs/ready/STORY-007-PRB-001.yaml"
```

**Complete Workflow Example:**
```
@PM analyzes work requiring React expertise
  ↓
@PM creates PRB with embedded React specialization:
  "You are acting as React specialist with deep expertise in..."
  ↓  
@PM delegates: "Use the developer subagent to execute PRB-001"
  ↓
@Developer reads PRB file, receives React specialization context
  ↓
@Developer executes as React expert with full specialized knowledge
```

**Specialization Architecture:**
- **13 Core Generic Agents**: Handle any work via context specialization
- **Dynamic Specialization**: Achieved through PRB context, not separate files
- **Unlimited Domains**: Any technology via specialized PRB content
- **Clean Architecture**: Generic agents + contextual specialization

### Technical Requirements

**File Format Compliance:**
- **ONLY 3 YAML fields**: `name`, `description`, `tools` (per Claude Code spec)
- **NO invalid fields**: Remove `version`, `category`, `color`, `emoji`, `capabilities`, `working_directories`
- **Pure Markdown**: YAML frontmatter + markdown content only
- **Location**: `src/agents/` (deployed to `.claude/agents/` via Makefile/Ansible)

**Behavioral Integration:**
- **Maintain PRB Framework**: Subagents execute PRBs, not replace them
- **Role Assignment Process**: Keep PM + Architect collaboration for role selection
- **Dynamic Creation Logic**: Capability matching algorithm for specialist creation
- **Memory Integration**: Subagents work with existing memory system

### Architecture Requirements

**Dual-Mode Support:**
- **Native Subagents**: Primary execution method
- **Task Tool Fallback**: Backward compatibility during transition
- **Configuration Setting**: `subagents_mode` for gradual migration
- **Automatic Detection**: System detects available execution methods

**Dynamic Creation System:**
```
1. Work Request Analysis
   ↓
2. Technology Stack Detection  
   ↓
3. Capability Matching (vs Core 14)
   ↓
4. <70% Match? → Create Dynamic Specialist
   ↓
5. Execute with Appropriate Specialist
```

**Deployment Integration:**
- **Source**: `src/agents/*.md` files
- **Build**: Makefile copies to installation templates
- **Deploy**: Ansible deploys to user's `.claude/agents/`
- **Update**: Version control tracks agent definitions

## Success Criteria

### Format Compliance
- [ ] All agent files use ONLY `name`, `description`, `tools` in YAML frontmatter
- [ ] NO invalid fields from old implementation
- [ ] Claude Code native Subagents can load all agent files
- [ ] Deployment via Makefile/Ansible works correctly

### Dynamic Creation
- [ ] NO pre-defined specialists beyond core 14 agents
- [ ] Dynamic creation works for ANY technology domain
- [ ] Capability matching algorithm functions correctly  
- [ ] PM + Architect process determines when to create specialists

### Integration
- [ ] PRB execution works with native Subagents
- [ ] Backward compatibility with existing Task tool workflows
- [ ] Memory system integration preserved
- [ ] Role assignment process enhanced (not replaced)

### Performance
- [ ] Native Subagents perform better than Task tool wrapper
- [ ] Context isolation works correctly
- [ ] Automatic delegation functions properly
- [ ] No regression in execution quality

## Technical Approach

### Phase 1: Core Agent Definitions
- Create 13 core subagent files (PM stays in main scope)
- Use correct Claude Code YAML frontmatter format (name, description, tools only)
- Embed behavioral patterns and domain expertise in markdown content
- Include specialization capability instructions
- Ready for deployment via existing infrastructure

### Phase 2: Specialization Integration
- Update PRB templates to include specialization context
- Implement specialization embedding in PRB generation
- Integration with PM role assignment (determines specialization needs)
- Support unlimited technology domains via PRB context

### Phase 3: Behavioral Integration
- Update PRB execution to support native Subagents
- Maintain backward compatibility with Task tool
- Configuration-driven execution mode selection
- Memory system integration testing

### Phase 4: Deployment & Migration
- Test Makefile/Ansible deployment
- Gradual migration from Task tool to native Subagents
- Performance validation and optimization
- Documentation and user guidance

## Architecture Notes

**File Structure:**
```
src/agents/
├── architect.md             # Core subagent
├── developer.md             # Core subagent  
├── system-engineer.md       # Core subagent
├── devops-engineer.md       # Core subagent
├── database-engineer.md     # Core subagent
├── security-engineer.md     # Core subagent
├── ai-engineer.md           # Core subagent
├── web-designer.md          # Core subagent
├── qa-engineer.md           # Core subagent
├── backend-tester.md        # Core subagent
├── requirements-engineer.md # Core subagent
├── user-role.md             # Core subagent
└── README.md               # Dynamic creation documentation
```

**NO specialists pre-defined** - ALL created dynamically based on project needs.

**Deployment Flow:**
```
src/agents/*.md 
  ↓ (Makefile)
templates/agents/*.md 
  ↓ (Ansible)  
~/.claude/agents/*.md
  ↓ (Claude Code)
Native Subagents Available
```

## Risk Mitigation

**Backward Compatibility:**
- Dual-mode execution during transition
- Fallback to Task tool if native Subagents unavailable
- Gradual migration path with configuration control

**Quality Assurance:**
- Format validation against Claude Code specification
- Testing with real Claude Code Subagents functionality
- Performance comparison vs existing Task tool implementation

**Deployment Safety:**
- Existing Makefile/Ansible infrastructure used
- No breaking changes to deployment process
- Rollback capability preserved

---

**Next Steps:** @PM + @AI-Architect collaboration to break down into correctly scoped PRBs with compliant implementation.