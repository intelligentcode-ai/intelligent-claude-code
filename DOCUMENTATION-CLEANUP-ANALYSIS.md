# Documentation Cleanup Analysis

## Files to DELETE (Obsolete/Out-of-Scope)

### Redundant Validation Docs (workflows handle this now)
- validation-examples.md
- validation-technical-reference.md
- validation-troubleshooting.md
- README-validation.md
- SELF-CORRECTING-VALIDATION.md (redundant with behaviors)
- bug-003-validation-integration.md

### Obsolete Architecture Docs
- compliance-enforcement-architecture.md (33KB!)
- compliance-system-diagrams.md (33KB!)
- ENFORCEMENT_ARCHITECTURE_TECHNICAL_DESIGN.md (31KB!)
- behavioral-intelligence.md (duplicate in root and architecture/)

### Redundant Workflow Docs (now in behaviors)
- WORKFLOW-EXAMPLES.md
- WORKFLOW-INTEGRATION-GUIDE.md
- WORKFLOW-TASK-ORDERING.md

### Obsolete Feature Docs
- dual-scoring-integration-guide.md
- dynamic-role-specialization-architecture.md
- user-simulator-guide.md
- CASCADING-ARCHIVAL-CORE-FEATURE.md
- STORY-014-CORRECTION.md (old story)

### Outdated Guides
- enhanced-planning-guide.md (16KB of outdated content)
- streamlined-usage-guide.md
- installation.md (12KB - obsolete)
- quickstart.md (obsolete)
- migration.md

### Duplicate/Redundant
- command-chains.md (duplicate of behavioral patterns)
- recovery.md (covered by state tracker)
- graceful-degradation.md
- pattern-consolidation-summary.md

## Files to UPDATE (Remove obsolete content)

### COMMAND-REFERENCE.md
- Remove references to deleted commands
- Update with current command list only

### file-management-standards.md
- Remove obsolete patterns
- Keep only current standards

### PM-COMMANDS.md
- Update to reflect current commands
- Remove obsolete references

## Files to KEEP (Still relevant)

### Core Documentation
- PROJECT-CONTEXT.md (in root)
- ARGUMENTS-BEHAVIORAL-GUIDE.md
- BEHAVIORAL-PATTERNS-GUIDE.md
- ID-CONVENTIONS.md

### System Documentation
- FILE-BASED-MEMORY-ARCHITECTURE.md
- FILE-BASED-MEMORY-GUIDE.md
- L3-AUTONOMY-GUIDE.md
- L3-BEHAVIORAL-ENFORCEMENT.md

### Reference Docs
- COMMAND-TEMPLATE.md (for creating new commands)
- naming-convention-reference.md
- project-cleanup-guide.md

## Summary
- **DELETE**: 30+ files (~300KB of obsolete content)
- **UPDATE**: 3-4 files to remove obsolete references
- **KEEP**: ~10 essential documentation files

This cleanup will remove approximately 80% of the documentation bloat!