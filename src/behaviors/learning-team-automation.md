# Learning Team Automation

**CORE:** First error forgiven • Second error penalized • Active learning bonus • Retrospective mandatory

## Learning Flow

**First Error:** No penalty + Learning created + Pattern stored  
**Repeated Error:** Double penalty (2x) + Escalation  
**Learning Application:** +0.5P/Q bonus for references  
**Memory Format:** Learning-[ErrorType]-[YYYY-MM-DD]

## Error Processing

**Error Processing:** Use `/icc-process-error [error_type]` to check previous learning → Apply forgiveness/penalty → Create learning entities  
**Learning Creation:** Use `/icc-learning-capture [error_type] [context]` for Learning-[ErrorType]-[Date] format with prevention measures  
**Pattern:** Error detected → Use `/icc-memory-search [error_type]` → Apply forgiveness/penalty → Store learning → Share with team

## Memory Integration

**Learning Consultation:** Use `/icc-memory-search [role] [task_type]` before role assignment → Apply prevention or block assignment if learnings found  
**Reference Patterns:** "Based on previous learning..." • "Applying lesson from..." • "To prevent repeat of..."  
**Storage:** Use `/icc-learning-store [learning_data]` for Learning-[ErrorType]-[YYYY-MM-DD] with error/context/lesson/prevention observations

## Bonus Detection

**Learning Application Detection:** Use `/icc-detect-learning-patterns [content]` to scan for learning patterns → Validate application → Apply bonuses  
**Triggers:** "Based on previous learning" → +0.5P • "Applying lesson from" → +0.5P • "To prevent repeat of" → +0.5Q • Pattern breaking → +1.0P/Q  
**Auto-Application:** Use `/icc-score-update [bonus_type] [amount]` when learning references detected

## Retrospective System

**Retrospective Execution:** Use `/icc-retrospective [trigger_type]` auto-triggered on task completion/error/milestone → Extract what worked/failed/learned → Store patterns in memory  
**Success Patterns:** Use `/icc-learning-store [success_pattern]` for Success-Pattern-[Type]-[Date] with reuse instructions  
**Error Patterns:** Use `/icc-learning-store [error_pattern]` for Learning-[ErrorType]-[Date] with prevention measures  
**Integration:** Share learnings with team via `/icc-share-learning [team_scope]` → Build patterns from insights

## Behavioral Integration

**Memory-First:** Before action → Memory search → Apply learnings → Document usage  
**Learning Check:** Error occurs → Search patterns → Apply forgiveness/penalty logic → Continue with learning  
**Pattern Prevention:** Task starts → Search error patterns → Apply prevention measures → Proactive learning application  
**Cross-Role Learning:** Learning in one role → Share with relevant roles → Prevent team-wide repetition  

## System Integration

**First Error:** calculatePenalty() checks previous learning → Returns zero penalty if first occurrence  
**Repeated Error:** calculatePenalty() applies 2x base penalty multiplier for repeated errors  
**Bonus Detection:** Auto-scan actions for learning application patterns → Apply +0.5P/Q rewards  
**Memory Integration:** All learning events stored as Learning-[ErrorType]-[YYYY-MM-DD]