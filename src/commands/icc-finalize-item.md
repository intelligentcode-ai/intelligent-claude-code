# Finalize Item

Complete work items and prepare for archival using $ARGUMENTS as item ID.

## Behavioral Sequence
1. Verify current role is @PM:
   - If not @PM, respond "Error: Item finalization requires @PM role. Current role: [current_role]"
2. Parse $ARGUMENTS to extract item ID (EPIC-XXX, STORY-XXX, or BUG-XXX format)
3. If item ID missing, respond "Error: Item ID required (format: EPIC-XXX, STORY-XXX, or BUG-XXX)"
4. Validate item exists:
   - Locate item file based on type
   - If not found, respond "Error: Item [ITEM-ID] not found"
   - Load item YAML and current status
5. Verify completion readiness and workflow phases:
   
   **For Epics:**
   - Check all stories are COMPLETED
   - Check all bugs are RESOLVED
   - Verify all stories completed knowledge_generation phase
   - Verify epic objectives achieved
   - Confirm success metrics met
   
   **For Stories:**
   - Check workflow_phase is "knowledge_generation" (final phase)
   - Check all tasks are COMPLETED
   - Verify all tasks completed their inner workflow
   - Verify acceptance criteria met
   - Confirm feature working as expected
   - Validate integration successful
   
   **For Bugs:**
   - Check workflow_phase is "knowledge_generation" (final phase)
   - Check all tasks are COMPLETED
   - Verify all tasks completed their inner workflow
   - Verify bug no longer reproduces
   - Confirm fix tested and validated
   - Ensure no regressions introduced

6. If not ready for completion:
   - List incomplete items: "⚠️ Cannot finalize [ITEM-ID]: [X] incomplete children"
   - Display specific blockers and recommend actions
   - Exit without making changes
7. Capture final metrics and learnings:
   
   **Collect Metrics:**
   - Total estimated vs actual hours
   - Task completion rates and timing
   - Quality metrics (reviews, rework)
   - Team collaboration effectiveness
   
   **Gather Learnings:**
   - Search memory for related learning entities
   - Extract insights from task outcomes
   - Identify patterns and improvements
   - Document what worked well vs challenges

8. Synthesize cross-task learnings:
   - Analyze patterns across all child tasks
   - Identify architecture insights
   - Document process improvements discovered
   - Create reusable patterns for future work
9. Create completion summary:
   ```markdown
   # Completion Summary: [ITEM-ID]
   
   **Completion Date**: [current_date]
   **Duration**: [X] days ([start] to [end])
   
   ## Metrics
   - Estimated Hours: [X]
   - Actual Hours: [Y] (variance: [+/-Z%])
   - Tasks: [A] completed, [B] total
   - Success Rate: [C%]
   
   ## Key Achievements
   - [Achievement 1]
   - [Achievement 2]
   
   ## Learnings Captured
   - [Learning 1]
   - [Learning 2]
   
   ## Process Improvements
   - [Improvement 1]
   - [Improvement 2]
   ```
10. Store learnings in memory system:
    - Create synthesis learning entity
    - Link to individual task learnings
    - Capture cross-task patterns
    - Store for future reference
11. Update item status and phase:
    - Set status to "COMPLETED" (or "RESOLVED" for bugs)
    - Set phase to "ARCHIVED"
    - Update completion_date timestamp
    - Set completed_by to "@PM"
12. Update parent references (if applicable):
    - Mark item as completed in parent epic
    - Update parent progress metrics
    - Trigger parent completion check if all children done
13. Create final Git operations:
    - Commit completion: "feat|fix: Complete [ITEM-ID] - [title]"
    - Include completion summary and metrics
    - Tag significant completions for tracking
14. Display finalization results:
    "✅ [ITEM-ID] finalized successfully"
    "📈 Metrics: [X] hours, [Y] tasks, [Z%] success rate"
    "📚 Learnings: [A] insights captured"
    "🎯 Status: COMPLETED, ready for archival"
15. Update PM scores (+2.0P for completion, +1.0Q for quality)
16. Trigger follow-up actions:
    - Check if parent epic ready for completion
    - Identify follow-up work or improvements
    - Suggest related work items for future

## Error Handling
- Not PM role: "Error: Item finalization requires @PM role"
- Invalid item ID format: "Error: Item ID must be EPIC-XXX, STORY-XXX, or BUG-XXX format"
- Item not found: "Error: Item [ITEM-ID] not found"
- Item already completed: "Warning: Item [ITEM-ID] already completed on [date]"
- Incomplete children: "Error: Cannot finalize - [X] incomplete children: [list]"
- Missing acceptance criteria: "Error: Acceptance criteria not met: [specific criteria]"
- Memory storage failed: "Warning: Could not store learnings in memory system"
- Git operation failed: "Warning: Git commit failed, item completed but not tracked"

## Completion Criteria by Type

**Epic Completion:**
- All stories COMPLETED
- All bugs RESOLVED
- Epic objectives achieved
- Success metrics validated
- Business value delivered

**Story Completion:**
- All tasks COMPLETED
- Feature implemented and tested
- Acceptance criteria met
- Integration successful
- Documentation updated

**Bug Completion:**
- All tasks COMPLETED
- Bug no longer reproduces
- Fix validated and tested
- No regressions detected
- Root cause documented

## Learning Synthesis Patterns

**Cross-Task Analysis:**
- Identify common challenges across tasks
- Extract successful collaboration patterns
- Document effective technical approaches
- Capture process improvement opportunities

**Architecture Insights:**
- Document design decisions and outcomes
- Capture system integration learnings
- Identify reusable patterns and components
- Record performance and scalability insights

## Command Chaining
- If --archive flag present, immediately execute archival
- Completion can trigger parent completion checks
- Metrics feed into project analytics and reporting