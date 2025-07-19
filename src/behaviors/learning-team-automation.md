# Learning Team Automation

**CORE:** First error forgiven • Second error penalized • Active learning bonus • Retrospective mandatory

## Learning Flow

**First Error:** No penalty + Learning created + Pattern stored  
**Repeated Error:** Double penalty (2x) + Escalation  
**Learning Application:** +0.5P/Q bonus for references  
**Memory Format:** Learning-[ErrorType]-[YYYY-MM-DD]

## Error Processing

**processErrorForLearning():** Check previous learning → IF found: Double penalty + escalation • ELSE: Create learning + no penalty  
**createLearningEntity():** Format: Learning-[ErrorType]-[Date] + Link to role/context + Store prevention measures  
**Pattern:** Error detected → Memory search → Apply forgiveness/penalty → Store learning → Share with team

## Memory Integration

**consultLearningsBeforeRoleAssignment():** Search memory for role/task learnings → IF found: Apply prevention or block assignment  
**Reference Patterns:** "Based on previous learning..." • "Applying lesson from..." • "To prevent repeat of..."  
**Storage:** Learning-[ErrorType]-[YYYY-MM-DD] with error/context/lesson/prevention observations

## Bonus Detection

**detectLearningApplication():** Scan content for learning patterns → Validate application → Apply bonuses  
**Triggers:** "Based on previous learning" → +0.5P • "Applying lesson from" → +0.5P • "To prevent repeat of" → +0.5Q • Pattern breaking → +1.0P/Q  
**Auto-Application:** Bonuses applied automatically when learning references detected

## Retrospective System

**executeRetrospective():** Auto-triggered on task completion/error/milestone → Extract what worked/failed/learned → Store patterns in memory  
**Success Patterns:** Store as Success-Pattern-[Type]-[Date] with reuse instructions  
**Error Patterns:** Store as Learning-[ErrorType]-[Date] with prevention measures  
**Integration:** Share learnings with team → Build patterns from insights

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