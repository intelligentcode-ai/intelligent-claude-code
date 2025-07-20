# Bulk Title Fix Command

**PURPOSE:** Behavioral command to identify and correct ALL non-compliant task titles throughout the system in batch operations.

## Behavioral Triggers

When user executes `/icc-bulk-title-fix $ARGUMENTS`, scan entire system for role-in-title violations and apply corrections based on specified scope and mode.

**Arguments Format:** `[scope] [mode] [options]`
**Example:** `/icc-bulk-title-fix all auto --learning-mode`

## Scope Options

### Scan Scopes
- **`all`** - Scan entire system (all epics, stories, bugs, tasks)
- **`epic:EPIC-ID`** - Scan specific epic and all children
- **`story:STORY-ID`** - Scan specific story and all tasks  
- **`bug:BUG-ID`** - Scan specific bug and all tasks
- **`active`** - Scan only IN PROGRESS and PLANNED items
- **`recent`** - Scan items modified in last 7 days

### Mode Options
- **`scan`** - Report violations only, no corrections
- **`suggest`** - Show suggested corrections for approval
- **`auto`** - Apply corrections automatically (L3 mode)
- **`interactive`** - Prompt for each correction individually

## Behavioral Processing

### Discovery Phase
1. **File Scanning**: Glob all task files in specified scope
2. **Title Extraction**: Parse task titles from file headers
3. **Pattern Validation**: Check each title for "[Role] Description" format
4. **Violation Cataloging**: Collect all non-compliant titles with context

### Analysis Phase
1. **Work Type Detection**: Analyze task content to identify required specialist
2. **Role Assignment**: Determine appropriate role based on content analysis
3. **Capability Validation**: Ensure suggested role has >70% capability match
4. **Context Consideration**: Factor in parent story/bug for role consistency

### Correction Phase
1. **Title Generation**: Create compliant "[Role] Description" format
2. **Content Preservation**: Maintain original description while adding role
3. **Validation Check**: Verify corrected title passes all compliance rules
4. **Learning Integration**: Store correction patterns for future use

## Response Patterns

### Scan Mode Results
```
🔍 **Bulk Title Scan Results**
Scope: All system tasks
Total Tasks: 147
Compliant: 134 (91.2%)
Violations: 13 (8.8%)

**Violation Summary:**
- Missing role prefix: 8 tasks
- Invalid role format: 3 tasks  
- Generic role used: 2 tasks

**Top Violation Patterns:**
1. "Implement [feature]" → "[Developer] Implement [feature]"
2. "Test [component]" → "[QA-Engineer] Test [component]"
3. "Review [code]" → "[Architect] Review [code]"

**Action Required:** Use 'suggest' or 'auto' mode to apply corrections
```

### Auto-Correction Results
```
✅ **Bulk Title Corrections Applied**
Scope: All system tasks
Corrections Applied: 13/13 (100% success)
Processing Time: 2.3 seconds

**Correction Summary:**
✅ TASK-042: "Implement auth" → "[Developer] Implement auth"
✅ TASK-087: "Test login flow" → "[QA-Engineer] Test login flow"  
✅ TASK-123: "Review architecture" → "[AI-Architect] Review architecture"
✅ TASK-156: "Deploy to staging" → "[DevOps-Engineer] Deploy to staging"

**Learning Entries Created:** 4 new patterns
**Files Updated:** 13 task files
**Git Status:** Ready for commit
```

### Interactive Mode
```
🤔 **Interactive Title Correction**
Current: "Implement user authentication"
Detected Work Type: Implementation + Security
Suggested Role: @Security-Engineer
Corrected: "[Security-Engineer] Implement user authentication"

Options:
1. ✅ Apply correction
2. 🔄 Use different role (@Developer, @AI-Engineer)
3. ⏭️ Skip this task
4. ❌ Cancel operation

Choice: _
```

## Auto-Correction Intelligence

### Content Analysis Patterns
- **Technology Keywords**: "React" → @React-Developer, "AWS" → @AWS-Engineer
- **Task Type Keywords**: "test" → @QA-Engineer, "deploy" → @DevOps-Engineer
- **Domain Keywords**: "security" → @Security-Engineer, "database" → @Database-Engineer
- **Complexity Indicators**: "architecture" → @Architect, "design" → @AI-Architect

### Role Assignment Logic
1. **Scan Content**: Extract keywords and technology mentions
2. **Match Patterns**: Apply learned work type → role mappings
3. **Validate Capability**: Ensure role has required expertise
4. **Consider Context**: Factor parent story requirements and team assignments
5. **Generate Title**: Create "[Role] Original Description" format

### Learning Integration
- **Pattern Storage**: Save successful work type → role mappings
- **Success Tracking**: Monitor correction acceptance rates
- **Refinement**: Improve mappings based on manual overrides
- **Cross-Role Sharing**: Distribute patterns across all specialists

## Quality Assurance

### Validation Checks
- **Format Compliance**: Verify "[Role] Description" pattern
- **Role Validity**: Confirm role is valid specialist (not generic)
- **Content Consistency**: Ensure role matches task content
- **Capability Match**: Validate >70% expertise match

### Error Handling
- **Ambiguous Content**: Flag for manual review
- **Multiple Roles**: Choose primary based on content analysis
- **Unknown Technology**: Create dynamic specialist if needed
- **File Access Issues**: Report and skip inaccessible files

## Integration Features

### Git Integration
- **Batch Commits**: Option to commit all corrections in single operation
- **Commit Messages**: Auto-generate descriptive commit message
- **Branch Management**: Create feature branch for corrections if needed
- **Privacy Mode**: Apply git_privacy settings to commit messages

### Memory Integration
- **Learning Storage**: Store all correction patterns in memory
- **Pattern Application**: Reference previous successful mappings
- **Success Metrics**: Track correction accuracy and acceptance
- **Team Knowledge**: Share learnings across all role contexts

### Workflow Integration
- **Planning Phase**: Integrate with story/bug planning workflows
- **Quality Gates**: Run before major workflow transitions
- **Compliance Monitoring**: Schedule regular bulk scans
- **Progress Tracking**: Monitor system-wide compliance improvement

## Performance Considerations

### Efficient Processing
- **Parallel Scanning**: Process multiple files simultaneously
- **Smart Caching**: Cache work type analysis results
- **Incremental Updates**: Only process modified files in incremental mode
- **Batch Operations**: Group file updates for efficiency

### Progress Reporting
- **Real-Time Updates**: Show progress during bulk operations
- **Performance Metrics**: Report processing speed and success rates
- **Resource Usage**: Monitor system impact during large scans
- **Completion Status**: Clear indication of operation completion

## Benefits

✅ **System-Wide Compliance** - Ensures ALL tasks follow role-in-title pattern  
✅ **Batch Efficiency** - Processes hundreds of tasks in seconds  
✅ **Intelligent Correction** - Context-aware role assignment  
✅ **Learning Enhancement** - Captures patterns for future use  
✅ **Quality Assurance** - Validates all corrections before applying  
✅ **Git Integration** - Seamless version control integration  
✅ **Progress Visibility** - Clear reporting and status updates  

This bulk correction system ensures rapid achievement of 100% role-in-title compliance across the entire intelligent-claude-code system.