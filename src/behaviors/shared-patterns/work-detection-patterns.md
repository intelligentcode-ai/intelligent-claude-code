# Work Detection Patterns

**Purpose:** Identify work requests that should be handled through AgentTask system for optimal results.

## Work Pattern Recognition

**Action Verbs Indicating Work:**
- **Modification:** fix, change, update, modify, adjust, correct, improve, enhance, optimize, refactor
- **Creation:** create, add, insert, generate, build, make, write, implement, develop
- **Removal:** delete, remove, clean, purge, clear, eliminate, drop
- **Operations:** deploy, install, configure, setup, run, execute, start, stop, restart
- **System:** migrate, backup, restore, sync, merge, commit, push, pull

## Work Intent Detection

**Common Work Phrases:**
- "Let me [action]..." → Create AgentTask for appropriate specialist
- "I'll [action]..." → Delegate to specialist agent
- "Going to [action]..." → Use AgentTask approach
- "Need to [action]..." → Create structured work item
- "Should [action]..." → Assign to domain specialist
- "Will [action]..." → Follow systematic process
- "[Action] this/that..." → Use structured approach
- "Quick [action]..." → Ensure thorough execution
- "Simple [action]..." → Apply professional standards

## Context Analysis

**Work Indicators:**
- File path mentions with action context → Agent execution recommended
- Code snippet references with modification intent → Professional review preferred
- Configuration discussions with implementation implications → Systematic approach beneficial
- Bug descriptions with immediate fix attempts → Thorough analysis ensures complete fixes
- Feature requests with direct implementation → Design review improves features

## Scoring System

**Work Detection Scoring:**
- Action verb present: +3 points
- Target object specified: +2 points
- Implementation detail mentioned: +2 points
- File/system reference: +1 point
- **Threshold:** ≥3 points = Create AgentTask

## Autonomy-Aware Execution

**L3 Autonomous** (≥3 points):
- Detect work → Create AgentTask → Execute immediately
- No approval questions for standard operations
- Status updates only

**L2 Guided** (≥3 points):
- Detect work → Architect review → Create AgentTask → Execute

**L1 Manual** (≥3 points):
- Detect work → Request approval → Create AgentTask → Execute

## Information vs Work Patterns

**Information Requests (Direct Response):**
- Pure questions without work intent
- Status inquiries and reporting
- Information requests and explanations
- Planning discussions without implementation commitment
- @Role consultations (what/how/why patterns)

**Memory-First Approach:**
- Search memory before asking users
- Apply stored patterns when relevant
- Build knowledge base from interactions
- Prevent repeated questions

---
*Work detection patterns for appropriate AgentTask delegation and systematic execution*