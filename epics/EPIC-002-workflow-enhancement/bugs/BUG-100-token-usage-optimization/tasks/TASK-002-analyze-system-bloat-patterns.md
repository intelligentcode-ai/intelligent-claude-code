# TASK-002: [AI-Engineer] Analyze 88-file system for token bloat patterns

## Task Information
- **ID**: TASK-002
- **Title**: [AI-Engineer] Analyze 88-file system for token bloat patterns
- **Priority**: P0
- **Type**: critical_path
- **Parent**: BUG-100 (Token Usage Massively Over-Optimized - 441K chars System Bloat)
- **Assigned to**: @AI-Engineer

## Description
Comprehensive analysis of the 441K character system across 88 files to categorize bloat sources and identify optimization targets. This analysis will guide all subsequent optimization efforts.

## Parallelization
**Yes** - Different directories and file types can be analyzed simultaneously for faster completion.

## Subtasks

### 1. Analyze src/ commands/ behaviors/ directories separately
- Measure token usage in src/ directory and subdirectories
- Analyze commands/ directory for verbosity patterns
- Examine behaviors/ directory for duplication and bloat
- Create per-directory bloat categorization and metrics

### 2. Measure token usage by file type and category
- Categorize files by type (.md, .yaml, etc.) and purpose
- Measure token density and efficiency ratios
- Identify highest-impact optimization targets
- Create bloat severity matrix for prioritization

### 3. Create bloat pattern report with optimization targets
- Document specific bloat patterns found (verbose descriptions, duplication, etc.)
- Prioritize optimization targets by impact and effort
- Create detailed optimization roadmap
- Estimate token reduction potential for each category

## Dependencies
- TASK-001 (Delete outdated optimization files) - ensures clean baseline

## Deliverables
- Comprehensive bloat analysis report
- Token usage breakdown by directory and file type
- Bloat pattern categorization with examples
- Optimization target priority matrix
- Token reduction potential estimates

## Acceptance Criteria
- [ ] All 88 files analyzed and categorized
- [ ] Token usage measured per directory and file type
- [ ] Bloat patterns identified with specific examples
- [ ] Optimization targets prioritized by impact/effort ratio
- [ ] Token reduction roadmap created with estimates

## Estimated Effort
2-3 hours

## Notes
This analysis provides the foundation for all optimization work. Parallel analysis of different directories will accelerate completion while maintaining thoroughness.