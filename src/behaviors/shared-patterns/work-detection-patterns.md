# Work Detection Patterns

**MANDATORY:** Comprehensive work detection and blocking patterns.

## ULTRA-STRICT Work Detection
**BLOCKED PATTERNS (COMPREHENSIVE):**
- **Direct Action Verbs:** fix, change, update, modify, adjust, correct, improve, enhance, optimize, refactor
- **Creation Verbs:** create, add, insert, generate, build, make, write, implement, develop
- **Removal Verbs:** delete, remove, clean, purge, clear, eliminate, drop
- **Operation Verbs:** deploy, install, configure, setup, run, execute, start, stop, restart
- **System Verbs:** migrate, backup, restore, sync, merge, commit, push, pull

## ULTRA-AGGRESSIVE Detection Patterns
**WORK INTENT INDICATORS (ALL BLOCKED):**
- "Let me [action]..." → BLOCKED
- "I'll [action]..." → BLOCKED
- "Going to [action]..." → BLOCKED
- "Need to [action]..." → BLOCKED
- "Should [action]..." → BLOCKED
- "Will [action]..." → BLOCKED
- "[Action] this/that..." → BLOCKED
- "Quick [action]..." → BLOCKED
- "Simple [action]..." → BLOCKED

## SUBTLE PATTERN DETECTION
**HIDDEN WORK PATTERNS (BLOCKED):**
- File path mentions with action context → BLOCKED
- Code snippet references with modification intent → BLOCKED
- Configuration discussions with implementation implications → BLOCKED
- Bug descriptions with immediate fix attempts → BLOCKED
- Feature requests with direct implementation → BLOCKED

## Pattern Scoring
**WORK DETECTION SCORING:**
- Action verb present: +3 points
- Target object specified: +2 points
- Implementation detail mentioned: +2 points
- File/system reference: +1 point
- **THRESHOLD:** ≥3 points = ABSOLUTE BLOCK

## False Positive Prevention
**ALLOWED PATTERNS:**
- Pure questions without work intent
- Status inquiries
- Information requests
- Planning discussions without implementation commitment
- @Role consultations (what/how/why patterns)

---
*Comprehensive work detection patterns for main scope blocking*