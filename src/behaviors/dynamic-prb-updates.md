# Dynamic PRB Updates

**MANDATORY:** Enable real-time PRB context modification and scope adjustment when corrections or new information are provided.

**PURPOSE:** Behavioral patterns for modifying PRB content dynamically while maintaining template compliance and execution continuity.

## Imports
@./shared-patterns/template-enforcement.md
@./shared-patterns/context-validation.md
@./agent-restart-patterns.md

## Core Principle: Runtime Context Modification

**DYNAMIC UPDATES:** PRBs must support real-time modification of context, requirements, and scope without breaking template structure or execution flow.

**TEMPLATE PRESERVATION:** All PRB updates must maintain mandatory template sections and structural integrity.

## Update Mechanisms

### Context Section Updates
**MODIFIABLE CONTEXT ELEMENTS:**
- **User Requirements**: Original request, success criteria, feature scope
- **Critical Files**: Add/remove files based on new information
- **Project Context**: Update project overview or key context
- **Configuration**: Modify settings if corrections require different approach
- **Specialization Context**: Adjust domain expertise needs

**UPDATE PATTERNS:**
- **Additive Updates**: Append new information to existing context
- **Corrective Updates**: Replace incorrect information with corrections
- **Refinement Updates**: Enhance existing information with more detail
- **Scope Updates**: Expand or contract work boundaries

### Requirements Section Updates
**REQUIREMENT MODIFICATIONS:**
- **Functional Requirements**: Add, modify, or remove functional specifications
- **Technical Requirements**: Update technical constraints or approaches
- **Process Requirements**: Adjust workflow or compliance needs
- **Success Criteria**: Modify validation and completion criteria

**UPDATE VALIDATION:**
- **Consistency Check**: Ensure updated requirements don't conflict
- **Completeness Check**: Verify all correction aspects covered
- **Feasibility Check**: Confirm updated requirements are achievable
- **Scope Check**: Validate complexity remains within PRB limits

### Implementation Section Updates
**MODIFIABLE IMPLEMENTATION ELEMENTS:**
- **Files to Modify**: Add/remove files based on corrected scope
- **Change Descriptions**: Update approach based on new information
- **Validation Criteria**: Modify testing approach for corrections
- **Dependencies**: Add missing dependencies identified through corrections

## Update Processing

### Real-Time Modification Process
**CRITICAL STEPS:**
1. **Lock PRB**: Temporarily lock PRB for modification
2. **Create Backup**: Preserve original PRB content for rollback
3. **Apply Updates**: Modify affected PRB sections with new information
4. **Validate Structure**: Ensure template compliance after updates
5. **Validate Content**: Check logical consistency and completeness
6. **Unlock PRB**: Make updated PRB available for execution
7. **Propagate Changes**: Notify affected agents of context changes

### Batch Update Processing
**MULTIPLE CORRECTIONS:**
1. **Collect Updates**: Gather all pending corrections and modifications
2. **Assess Conflicts**: Identify any conflicting correction requirements
3. **Resolve Conflicts**: Apply conflict resolution patterns
4. **Apply All Updates**: Modify PRB with all validated corrections
5. **Final Validation**: Comprehensive check of updated PRB
6. **Release Updated PRB**: Make available for continued execution

## Update Types

### Scope Expansion Updates
**EXPANSION PATTERNS:**
- **Additional Requirements**: Add new functional requirements
- **New Dependencies**: Include previously unidentified dependencies  
- **Extended Context**: Broaden project context or background
- **Enhanced Validation**: Add more comprehensive testing criteria

**EXPANSION LIMITS:**
- **Complexity Bounds**: Expansions cannot exceed PRB complexity limits
- **Template Capacity**: Additional content must fit within template structure
- **Time Constraints**: Expansions should not fundamentally alter timelines
- **Resource Limits**: New requirements must be achievable with assigned resources

### Scope Contraction Updates
**CONTRACTION PATTERNS:**
- **Requirement Removal**: Remove requirements identified as unnecessary
- **Simplified Approach**: Reduce implementation complexity based on corrections
- **Reduced Validation**: Remove excessive or irrelevant testing requirements
- **Focused Context**: Narrow context to essential information only

### Corrective Updates
**CORRECTION PATTERNS:**
- **Approach Correction**: Change implementation strategy based on new information
- **Context Correction**: Fix incorrect assumptions about project context
- **Requirement Correction**: Modify requirements that were misunderstood
- **Technical Correction**: Adjust technical approach based on constraints

## Validation Framework

### Template Compliance Validation
**MANDATORY CHECKS:**
- **Section Preservation**: All mandatory template sections remain intact
- **Structure Integrity**: PRB maintains proper YAML structure and formatting
- **Content Completeness**: Updated sections contain complete and actionable information
- **Placeholder Resolution**: No new placeholders introduced during updates

### Content Coherence Validation
**CONSISTENCY CHECKS:**
- **Logical Consistency**: Updated requirements don't contradict each other
- **Implementation Alignment**: Implementation approach matches updated requirements
- **Context Relevance**: All context information relevant to updated scope
- **Success Criteria Match**: Success criteria align with updated requirements

### Complexity Validation
**SIZE ENFORCEMENT:**
- **Complexity Recalculation**: Recalculate complexity score after updates
- **Template Appropriateness**: Ensure updated PRB still fits chosen template type
- **Auto-Breakdown**: Trigger breakdown if updates push complexity >15 points
- **Resource Alignment**: Verify resources sufficient for updated scope

## Error Handling

### Update Conflicts
**CONFLICT TYPES:**
- **REQUIREMENT_CONFLICTS**: New requirements contradict existing ones
- **SCOPE_OVERFLOW**: Updates exceed PRB complexity or template limits
- **CONTEXT_FRAGMENTATION**: Updates break logical coherence of PRB
- **TEMPLATE_VIOLATIONS**: Updates violate mandatory template structure

**RESOLUTION STRATEGIES:**
- **User Clarification**: Request user input to resolve requirement conflicts
- **PRB Breakdown**: Split oversized updates into multiple PRBs
- **Context Reorganization**: Restructure PRB to maintain coherence
- **Template Migration**: Move to larger template if updates require it

### Rollback Mechanisms
**ROLLBACK TRIGGERS:**
- **Validation Failures**: Updated PRB fails coherence or compliance checks
- **User Requests**: User wants to revert to previous version
- **Execution Failures**: Updated context causes execution problems
- **System Errors**: Technical issues during update process

**ROLLBACK PROCESS:**
1. **Detect Rollback Need**: Identify requirement for reverting changes
2. **Load Backup**: Retrieve pre-update PRB version from backup
3. **Restore Context**: Replace current PRB with backup version
4. **Validate Restoration**: Ensure restored PRB is functional
5. **Notify Stakeholders**: Inform user and agents of rollback

## Integration Points

### With PRB Enforcement System
**ENFORCEMENT COMPLIANCE:**
- Updated PRBs maintain all enforcement requirements
- Template compliance preserved through update process
- Configuration embedding maintained in updated context
- Validation checks applied to updated content

### With Agent Restart Patterns
**SEAMLESS INTEGRATION:**
- Updated PRB context automatically propagated to agents
- Agent restart triggered when context changes significantly
- Previous work preserved where compatible with updates
- Clear communication of changes to executing agents

### With Memory System
**PATTERN CAPTURE:**
- Store successful update patterns for reuse
- Document common update scenarios and solutions
- Track update effectiveness and outcomes
- Learn from failed updates to improve process

## Performance Optimization

### Update Efficiency
**OPTIMIZATION PATTERNS:**
- **Incremental Updates**: Apply minimal necessary changes
- **Batch Processing**: Collect multiple corrections for single update cycle
- **Lazy Validation**: Delay expensive validation until necessary
- **Cache Management**: Maintain updated context in memory for quick access

### Resource Management
**RESOURCE CONSIDERATIONS:**
- **Memory Usage**: Manage backup storage for rollback capability
- **Processing Time**: Minimize update processing time to reduce execution delays
- **Agent Coordination**: Efficiently coordinate updates across multiple agents
- **Storage Efficiency**: Optimize PRB storage during frequent updates

---
*Dynamic PRB update behavioral patterns for intelligent-claude-code system*