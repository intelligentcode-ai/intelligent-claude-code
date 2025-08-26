# Enforcement Rules

**PURPOSE:** Shared enforcement patterns and validation functions

## Subagent Scope Validation

**Subagent Scope Validation Process:**

1. **Check Working Directory:**
   - When subagent working directory starts with ~/.claude/
   - Block execution and show error: "❌ Cannot use ~/.claude/ as working directory"

2. **Check File Operations:**
   - Review each file path in subagent context
   - When file path starts with ~/.claude/ and operation is not installation
   - Block execution and show error: "❌ References forbidden ~/.claude/ path"

3. **Allow Valid Operations:**
   - Subagents with project root working directories proceed
   - Subagents with valid file operations within project scope proceed

## Role System Enforcement

### Role-System Alignment
| System Type | Valid Roles | Invalid Roles |
|-------------|------------|---------------|
| AI-AGENTIC | @AI-Engineer, @PM | @Database-Engineer for behaviors |
| CODE-BASED | @Developer, @Backend-Tester | @AI-Engineer for code impl |
| HYBRID | Joint assessment required | Single role decision |

### PM+Architect Collaboration
1. PM analyzes requirements
2. PM selects domain architect
3. Joint role assignment
4. Document rationale in PRB
5. Validate technology expertise assessment and unlimited specialist creation capability

## Detection Functions

### Work Pattern Detection

**Work Pattern Detection Process:**

**Detected Patterns:**
- **Role Patterns:** @Role mentions (like @Developer, @AI-Engineer)
- **Work Items:** STORY/BUG/EPIC/TASK/PRB references with numbers
- **Action Verbs:** implement, fix, create, update, modify

**Detection Steps:**
1. **Scan Text:** Review input text for pattern matches
2. **Match Patterns:** Check against known work pattern types
3. **Trigger PRB Generation:** When work patterns detected, require PRB creation

### False Completion Detection

**False Completion Detection Process:**

**Completion Triggers:**
- Text contains "PRB COMPLETE"
- Text contains "Task finished"
- Text contains "Work done"
- Text contains "Completed"

**Validation Steps:**
1. **Detect Completion Claims:** Scan for completion trigger phrases
2. **Check Validation Status:** Review completion checklist validation
3. **Block Invalid Claims:** When checklist incomplete, block completion

### Documentation Compliance Detection

**Documentation Compliance Detection Process:**

**BLOCKED Documentation Skipping Patterns:**
- "No documentation needed" → BLOCK → Must follow template requirements
- "Self-documenting code" → BLOCK → Template requires explicit documentation
- "Skip CHANGELOG" → BLOCK → CHANGELOG entry mandatory per template
- "Internal change, no docs" → BLOCK → All changes require documentation per template
- "Documentation not affected" → BLOCK → Template determines documentation requirements
- "Too technical for user docs" → BLOCK → Technical documentation still required
- "Code speaks for itself" → BLOCK → Template documentation sections are mandatory
- "No version bump needed" → BLOCK → Version management required per template
- "Skip versioning" → BLOCK → Version bump mandatory per template

**Detection Steps:**
1. **Scan for Documentation Bypass Patterns:** Check text for documentation skipping language
2. **Validate Template Requirements:** Ensure all template documentation sections are addressed
3. **Block Documentation Skipping:** When bypass patterns detected, block with template enforcement message
4. **Enforce Documentation Completion:** Require explicit validation of version bump, CHANGELOG, and README updates

## Error Messages

### Standard Errors
- `SUBAGENT_REQUIRED`: "❌ PRB execution requires subagent"
- `CREATION_BLOCKED`: "❌ Work items must be created by main agent"
- `ROLE_MISMATCH`: "❌ Role {role} invalid for {system_type}"
- `SCOPE_VIOLATION`: "❌ Operation outside project boundaries"
- `INCOMPLETE_PRB`: "❌ PRB missing required sections"

### Documentation Compliance Errors
- `DOCUMENTATION_SKIPPED`: "❌ Template documentation requirements are MANDATORY - no skipping allowed"
- `VERSION_BUMP_MISSING`: "❌ Version bump required per template documentation section"
- `CHANGELOG_OMITTED`: "❌ CHANGELOG entry required per template - no exceptions"
- `README_UPDATES_SKIPPED`: "❌ README updates required for user-facing changes per template"
- `DOCUMENTATION_BYPASS_BLOCKED`: "❌ No bypass language allowed for template documentation requirements"

### Recovery Actions
| Error | Recovery |
|-------|----------|
| Missing PRB | Auto-generate with correct template |
| Wrong context | Redirect to appropriate context |
| Role mismatch | Trigger PM+Architect process |
| Scope violation | Constrain to project root |
| Documentation skipped | Enforce template documentation requirements |
| Version bump missing | Execute version bump per template |
| CHANGELOG omitted | Create CHANGELOG entry per template |
| README updates skipped | Update README per template requirements |

---
*Shared enforcement patterns extracted from prb-enforcement.md*