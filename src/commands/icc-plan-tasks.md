# Task Creation Command

**BEHAVIORAL INSTRUCTION**: Create individual task files with standardized numbering - Specialist-Architects only.

## Parameters
- `item_id`: Story or Bug identifier (required)
- `--skip-reviews` - Skip automatic review task generation
- `--dry-run` - Preview without creating files

## Claude Behaviors
1. **Role Authority Check**: Verify you are currently a Specialist-Architect role
2. **Domain Expertise**: Apply specialized knowledge for your domain
3. **Standardized Numbering**: Use 001-009 process, 010-994 core work, 995-999 wrap-up
4. **Review Generation**: Auto-create review tasks for every implementation task
5. **File Creation**: Create task files with complete metadata and embedded config
6. **Phase Transition**: Update parent from PLANNING to REFINING
7. **Pattern Storage**: Store task generation patterns in memory

## Mandatory Behaviors
- Block non-Specialist-Architects from execution
- Always generate review tasks for implementation work
- Always use standardized numbering (001-009, 010-994, 995-999)
- Always create complete task files with metadata
- Always update parent item with task list and phase change
- Always assign domain-specific reviewers for review tasks

## Integration
- Update parent story/bug with complete task list
- Trigger phase transition from PLANNING to REFINING
- Store task generation patterns in memory