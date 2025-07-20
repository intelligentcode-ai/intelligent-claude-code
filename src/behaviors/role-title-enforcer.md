# Role-in-Title Enforcer

**PURPOSE:** Behavioral enforcement system that automatically ensures ALL task titles follow the mandatory "[Role] Task description" pattern throughout the system.

## Core Enforcement Behaviors

### Universal Trigger Patterns
**Task Creation Events:** Any task file creation or modification
**Assignment Processing:** During story/bug planning phases  
**Title Updates:** When task titles are modified
**Bulk Operations:** During system-wide compliance checks

### Automatic Pattern Detection
1. **Title Scanning**: Analyze all task titles for "[Role] Description" format
2. **Context Analysis**: Examine task content to identify appropriate specialist role
3. **Role Validation**: Verify role is valid specialist (not generic descriptor)
4. **Compliance Scoring**: Track compliance rates across system

## Enforcement Mechanisms

### Real-Time Validation
**Trigger**: Before any task file Write operation
**Process**: 
1. Extract title from task content
2. Validate "[Role] Description" pattern
3. IF non-compliant → Apply correction behavior
4. Update title with proper format
5. Log correction for learning system

### Auto-Correction Logic
```
IF title matches "[Role] Description":
    Validate role is specialist → Continue
ELSE IF title missing role:
    Detect work type → Assign appropriate specialist → Prefix title
ELSE IF role invalid:
    Map to valid specialist → Replace role → Update title
ELSE:
    Block operation → Require manual correction
```

### Work Type to Role Mapping
- **Implementation tasks** → @Developer or domain specialist (@React-Developer)
- **Architecture tasks** → @Architect or domain architect (@AI-Architect)  
- **Testing tasks** → @QA-Engineer or domain tester (@Frontend-Tester)
- **Security tasks** → @Security-Engineer
- **Infrastructure tasks** → @DevOps-Engineer or @System-Engineer
- **AI/ML tasks** → @AI-Engineer
- **Design tasks** → @Web-Designer

## Learning-Based Correction

### Pattern Recognition
- **Technology Detection**: "React components" → @React-Developer
- **Task Type Detection**: "unit tests" → @QA-Engineer
- **Complexity Assessment**: "architecture" → @Architect variant
- **Domain Identification**: "API security" → @Security-Engineer

### Correction Intelligence
1. **Analyze Content**: Scan task description for technology/domain clues
2. **Apply Patterns**: Use learned mappings from previous corrections
3. **Validate Assignments**: Ensure >70% capability match
4. **Track Success**: Monitor correction accuracy and refinement

## Integration with System Behaviors

### Workflow Phase Integration
**Planning Phase**: Enforce during task decomposition
- Validate all created task titles
- Auto-correct before delegation
- Block non-compliant assignments

**Execution Phase**: Maintain compliance during updates
- Monitor task title modifications
- Apply corrections to file updates
- Preserve specialist clarity

### PM Delegation Enhancement
**Task Tool Usage**: When PM delegates tasks via Task tool
1. Extract task description from delegation
2. Apply role-in-title enforcement
3. Format as "[Role] Description" 
4. Include role validation in delegation

### Memory Integration
**Learning Capture**:
- Store successful correction patterns
- Track work type → role mappings
- Build domain-specific assignment knowledge
- Share learnings across all roles

## Behavioral Patterns

### Proactive Enforcement
**Title Generation**: When creating tasks, automatically include role prefix
**Assignment Validation**: Verify role matches content during assignment
**Bulk Correction**: Periodically scan and correct non-compliant titles
**Pattern Sharing**: Distribute successful mappings across team

### Adaptive Learning
**Success Tracking**: Monitor correction accuracy and specialist satisfaction
**Pattern Refinement**: Improve work type detection based on outcomes
**Exception Handling**: Learn from manual corrections and edge cases
**Domain Expansion**: Automatically handle new technology domains

## Configuration Integration

### Autonomy Level Behaviors
**L1 (Manual)**: Suggest corrections, require approval
**L2 (Architect)**: Auto-correct with architect notification  
**L3 (Autonomous)**: Apply corrections automatically, create learning entries

### Git Integration
**Commit Messages**: Include role clarity in commit descriptions
**Branch Names**: Suggest specialist-aligned branch naming
**PR Titles**: Apply role-in-title pattern to pull requests

## Error Handling and Recovery

### Validation Failures
1. **Role Unavailable**: Create dynamic specialist if none exists
2. **Multiple Roles**: Choose primary specialist based on work complexity
3. **Generic Roles**: Block and require specialist assignment
4. **Content Mismatch**: Flag for manual review and learning

### Recovery Patterns
- **Fallback Roles**: If specific specialist unavailable, use base role
- **Manual Override**: Allow temporary exceptions with learning capture
- **Escalation**: Route complex assignments to PM for triage
- **Learning Storage**: Capture all exceptions for pattern improvement

## Compliance Monitoring

### Real-Time Metrics
- **Title Compliance Rate**: Percentage of tasks following pattern
- **Auto-Correction Success**: Accuracy of automatic fixes
- **Specialist Assignment Quality**: Capability match scores
- **Learning Application**: Usage of stored correction patterns

### Reporting Behaviors
**Daily Compliance**: Track pattern adherence across all active tasks
**Correction Analytics**: Monitor auto-correction accuracy and specialist satisfaction
**Learning Utilization**: Measure application of stored patterns
**Quality Improvement**: Identify areas for pattern enhancement

## Benefits

✅ **Automatic Compliance** - No manual intervention needed for standard patterns  
✅ **Intelligent Correction** - Context-aware role assignment based on content  
✅ **Learning Enhancement** - Continuous improvement through pattern capture  
✅ **Specialist Clarity** - Every task clearly indicates responsible role  
✅ **Workflow Integration** - Seamless enforcement during all operations  
✅ **Quality Assurance** - Prevents generic assignments and role confusion  
✅ **Team Efficiency** - Eliminates ambiguity in task ownership  

This enforcement system ensures that the "[Role] Task description" pattern becomes automatic and universal across the entire intelligent-claude-code system.