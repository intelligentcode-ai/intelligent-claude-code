# Claude Code Integration

## File Format Compliance

All agent files follow **Claude Code native Subagents format**:

```yaml
---
name: agent-name
description: Specialist description with domain expertise
tools: Edit, MultiEdit, Read, Write, Bash, Grep, Glob, LS
---

# Agent markdown content with behavioral patterns and specialization capability
```

## YAML Frontmatter Rules

**ONLY 3 fields allowed** (per Claude Code specification):
- ✅ `name`: Agent identifier (lowercase, hyphenated)
- ✅ `description`: Specialist description and expertise area
- ✅ `tools`: Available tools for the agent

**FORBIDDEN fields** (will cause Claude Code to reject):
- ❌ `version`, `category`, `color`, `emoji`  
- ❌ `capabilities`, `working_directories`
- ❌ `specializations`, `domains`
- ❌ Any custom fields beyond name, description, tools

## Behavioral Pattern Encapsulation

Each agent embeds behavioral patterns in markdown content:

- **PRB Execution Patterns**: How to execute PRBs with embedded context
- **Memory Integration**: Search memory before work, store successful patterns
- **Quality Standards**: Ensure high standards for domain expertise
- **Documentation Enforcement**: Mandatory enforcement of template documentation requirements with blocking mechanisms
- **Specialization Instructions**: How to embody specialist expertise via PRB context
- **Collaboration Patterns**: How to work with other agents and PM

### Documentation Enforcement Patterns (v7.3.6+)

All agents now include **mandatory documentation enforcement** behavioral patterns:

- **Version Bump Enforcement**: Block PRB completion if version not bumped per template
- **CHANGELOG Compliance**: Block if CHANGELOG entry not created/updated as specified
- **README Enforcement**: Block if README updates required by template are not completed
- **Documentation Completeness**: Validate all template documentation sections are executed
- **Blocking Mechanisms**: Detect and block documentation skipping patterns like "No documentation needed", "Skip CHANGELOG", etc.

## Benefits of This Architecture

### Unlimited Scalability
- **ANY Technology**: Support for emerging tech via PRB context
- **NO Maintenance Overhead**: No need to maintain hundreds of specialist files
- **Clean Architecture**: 14 generic agents + unlimited contextual specialization

### Claude Code Native
- **Perfect Compatibility**: Works seamlessly with Claude Code Subagents
- **Future-Proof**: Aligns with Claude Code's evolution
- **Performance Optimized**: Native context management and delegation

### Intelligent Coordination
- **PM Orchestration**: PM determines specialization needs intelligently
- **Architect Collaboration**: Domain architects guide specialization decisions
- **Quality Assurance**: Embedded behavioral patterns ensure consistent quality

### Maintainability
- **Single Source of Truth**: One agent file per core role
- **Version Controlled**: All definitions tracked in git
- **Documentation Integrated**: Behavioral patterns embedded in agent definitions

---

*Claude Code native integration with unlimited specialization*