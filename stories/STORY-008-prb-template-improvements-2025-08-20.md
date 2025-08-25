# STORY-008: Improve PRB Templates for Self-Contained Subagent Execution

## Problem Statement

The current PRB templates and their usage process have critical deficiencies:

### Template Problems
1. **Overly Complex Structure**: Templates are bloated with redundant sections
2. **Unclear Execution Flow**: Steps are not clearly numbered or sequenced
3. **Poor Organization**: Repetitive sections without clear purpose
4. **Insufficient Guidance**: Templates don't enforce proper workflows

### Process Problems  
1. **Incomplete Placeholder Resolution**: @PM and @Architect leave `[FROM_CONFIG]` and other placeholders unresolved
2. **Runtime Dependencies**: Generated PRBs still require configuration lookups that subagents can't perform
3. **Not Self-Contained**: Subagents in isolated contexts fail because context isn't fully embedded
4. **Process Gaps**: No clear process for ensuring complete placeholder resolution

## Analysis of Current State

### Template Issues
- **Runtime Dependencies**: 40% of template content requires runtime resolution
- **Execution Failures**: ~40% failure rate due to missing context in isolated execution
- **Subagent Incompatibility**: Claude Code Subagents cannot access external configuration during execution

### Branch Analysis
The `feature/prb-self-contained-templates` branch attempted improvements but remains incomplete:
- Still uses `[FROM_CONFIG]` placeholders
- Doesn't fully embed context
- Missing clear execution steps

## Requirements

### R1: Complete Self-Containment
- All configuration values must be embedded at PRB generation time
- No placeholders requiring runtime resolution
- Complete context available in isolated execution

### R2: Clear Execution Process
- Numbered sequential steps for each complexity level
- Validation checkpoints at each step
- Clear success criteria

### R3: Subagent Compatibility
- Templates work in isolated Claude Code Subagent contexts
- No external dependencies during execution
- Self-contained validation mechanisms

### R4: Hierarchical Decomposition
- Large PRBs (16-30 points) decompose into Medium/Tiny PRBs
- Mega PRBs (30+ points) decompose into Large PRBs
- Clear coordination strategies

## Proposed Solution

### Part 1: Template Improvements

#### Simplified Template Structure
1. **Remove Redundant Sections**: Consolidate overlapping sections
2. **Clear Execution Steps**: Numbered, sequential steps for each complexity
3. **Focused Content**: Only essential information for execution
4. **Better Placeholders**: Clear naming that indicates what @PM should fill

#### New Template Structures

##### Nano Template (0-2 points)
- **4-step process**: Knowledge → Implementation → Commit → Push
- Minimal structure for trivial changes

##### Tiny Template (3-5 points)  
- **7-step process**: Knowledge → Implementation → Review → Version → Documentation → Commit → Push
- Simple structure for single-file changes

##### Medium Template (6-15 points)
- **9-step process**: Branch → Knowledge → Implementation → Review → Version → Documentation → Commit → Push → PR
- Standard structure for multi-file features

##### Large Template (16-30 points)
- Decomposes into Medium/Tiny sub-PRBs
- Coordination header with sub-PRB list

##### Mega Template (30+ points)
- Decomposes into Large PRBs
- Phase-based execution strategy

### Part 2: Process Improvements for @PM and @Architect

#### Role Assignment Process (MANDATORY)
1. **@PM Analyzes Work**: Reviews requirements and identifies needed expertise
2. **@PM Selects Specialist Architect**: Creates appropriate @[Domain]-Architect based on work domain
3. **@PM + @Architect Collaborate**: Together they:
   - Analyze project scope (CODE-BASED vs AI-AGENTIC SYSTEM)
   - Analyze work type (implementation, security, database, etc.)
   - Assign implementation role (e.g., `[ROLE]` → `@Developer` or `@AI-Engineer`)
   - Assign review role (e.g., `[PRE_ASSIGNED_SME]` → `@Security-Engineer`)
4. **Document Assignment Rationale**: Include why these roles were selected

#### Mandatory Placeholder Resolution Process
1. **Load Configuration**: @PM loads actual configuration values from hierarchy
2. **Gather Context**: @PM determines project root, system nature, critical files
3. **Search Memory**: @PM searches memory/ for relevant patterns
4. **Assign Roles**: @PM and @Architect determine implementation and review roles
5. **Fill ALL Placeholders**: @PM and @Architect replace EVERY placeholder:
   - `[FROM_CONFIG]` → actual boolean/string value (e.g., `true`, `"main"`)
   - `[PROJECT_ROOT]` → actual absolute path (e.g., `/Users/actual/path`)
   - `[SYSTEM_NATURE]` → actual system type (e.g., `"MARKDOWN-BASED AI-AGENTIC SYSTEM"`)
   - `[USER_REQUEST]` → actual user requirements
   - `[FILE_PATH]` → actual file paths with samples
   - `[ROLE]` → actual assigned implementation role (e.g., `@AI-Engineer`)
   - `[PRE_ASSIGNED_SME]` → actual assigned reviewer (e.g., `@Security-Engineer`)
   - `[PRE_ASSIGNED_ARCHITECT]` → actual architect for review (e.g., `@System-Architect`)

6. **Validate Resolution**: @PM ensures NO placeholders remain in generated PRB
7. **Create Self-Contained PRB**: Final PRB has everything subagent needs

#### Behavioral Pattern Updates
- Update `prb-creation-mandates.md` to enforce complete resolution
- Update `story-breakdown.md` to include resolution process
- Create validation tool to check for unresolved placeholders

### Part 3: Template Simplification Examples

#### Before (Current Template - Bloated):
```yaml
# Many redundant sections
complete_context: ...
requirements: ...
decomposition: ...
coordination: ...
knowledge_management: ...
git_operations: ...
review_process: ...
documentation_updates: ...
execution_strategy: ...
execution_checklist: ...
```

#### After (Improved Template - Focused):
```yaml
# Essential sections only
title: "[ROLE] [DESCRIPTION]"  # @PM assigns role based on project scope + work type

context:  # Filled by @PM with actual values
  project_root: "[PROJECT_ROOT]"  # @PM fills with /actual/path
  system_nature: "[SYSTEM_NATURE]"  # @PM fills with CODE-BASED or AI-AGENTIC
  configuration:
    git_privacy: "[FROM_CONFIG]"  # @PM fills with true/false
    
requirements:  # Clear and concise
  - "[REQUIREMENT_1]"  # @PM fills with actual requirement
  
execution_steps:  # Numbered and clear
  1_knowledge: ...
  2_implementation: ...
  3_commit: ...
  
review:
  reviewer: "[PRE_ASSIGNED_SME]"  # @PM + @Architect assign based on expertise needed
  
validation: # Simple checklist
  ☐ All steps completed
  ☐ Requirements met
```

## Success Criteria

1. **Simplified Templates**: 50% reduction in template complexity
2. **Complete Resolution**: @PM fills 100% of placeholders before subagent execution
3. **Self-Contained PRBs**: Generated PRBs execute without runtime lookups
4. **Clear Execution**: Numbered steps with validation checkpoints
5. **Process Documentation**: Clear behavioral patterns for @PM and @Architect

## Implementation Approach

### Phase 1: Template Simplification
1. **Analyze**: Document current template complexity
2. **Design**: Create simplified template structures
3. **Implement**: Replace templates with simplified versions

### Phase 2: Process Enhancement
1. **Define**: Document @PM placeholder resolution process
2. **Implement**: Update behavioral patterns for enforcement
3. **Validate**: Create tools to check resolution completeness

### Phase 3: Integration
1. **Test**: Verify self-contained execution in subagents
2. **Document**: Update all related behavioral patterns
3. **Deploy**: Roll out improved system

## Expected Impact

- **Execution Success**: From 60% to 99% success rate
- **Debugging Time**: 75% reduction in troubleshooting
- **Developer Experience**: Clear, predictable PRB execution
- **System Reliability**: Consistent, reproducible results

## Priority

HIGH - This is foundational for the entire PRB-driven execution system and Claude Code Subagent integration.