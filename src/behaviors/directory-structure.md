# Directory Structure Behavior

**MANDATORY:** Projects follow configurable directory structure. Auto-create missing directories.

**PURPOSE:** Define and enforce project directory structure with configuration overrides

## Default Structure

```yaml
project_root/
├── stories/              # User stories (configurable: story_path)
│   └── drafts/          # WIP stories
├── bugs/                 # Bug reports (configurable: bug_path)
│   ├── open/            # Active bugs needing fixes
│   └── completed/       # Fixed and resolved bugs
├── prbs/                # PRBs (configurable: prb_path)
│   ├── ready/           # Ready to execute
│   └── completed/       # Executed PRBs
├── memory/              # Learning storage (configurable: memory_path)
│   └── [topic]/         # Organized by topic
├── docs/                # Documentation (configurable: docs_path)
│   ├── architecture/    # Architecture docs
│   ├── api/            # API documentation
│   └── guides/         # User guides
├── src/                 # Source code (configurable: src_path)
├── tests/               # Tests (configurable: test_path)
├── config/              # Configuration (configurable: config_path)
└── prb-templates/       # PRB templates (configurable: prb_template_path)
```

## Configuration Override

**Main Paths:** story_path, bug_path, prb_path, memory_path, docs_path, src_path, test_path, config_path, prb_template_path
**Subdirectories:** story_drafts, bug_open/completed, prb_ready/completed
**Defaults:** stories/, bugs/, prbs/, memory/, docs/, src/, tests/, config/, prb-templates/

## Behavioral Rules

### Auto-Creation
- Missing directories are created automatically
- Preserves existing content
- Creates README.md in each directory explaining purpose

### Integration

**Path Resolution:** Check config → Use defaults → Create if missing → All relative to project root
**Story Breakdown:** Stories from story_path, drafts from story_path/story_drafts
**Bug Lifecycle:** Open bugs from bug_path/bug_open, completed to bug_path/bug_completed
**PRB System:** Created in prb_path/prb_ready, completed to prb_path/prb_completed
**Memory System:** Stored in memory_path/[topic], search all subdirectories
**Templates:** Loaded from prb_template_path with hierarchy fallback

## Path Functions

**Access:** get_project_path() returns configured or default paths
**Creation:** ensure_directory() creates missing paths including parents
**Locations:** Stories, bugs, PRBs, memory, docs, templates use configured paths

## Naming Standards

### Work Item Naming Format
All work items MUST follow consistent naming format:

**Standard Format:** `<CATEGORY>-<NUMBER>-<TITLE>-<DATE>.md`
**With Parent:** `<PARENT>-<CATEGORY>-<NUMBER>-<TITLE>-<DATE>.md`

**Categories:**
- **EPIC:** Large initiatives spanning multiple stories
- **STORY:** User stories and feature requirements  
- **BUG:** Bug reports and defect tracking
- **PRB:** Product Requirement Blueprints (implementation plans)

**Examples:**
- `STORY-001-user-authentication-YYYY-MM-DD.md`
- `BUG-005-login-timeout-issue-YYYY-MM-DD.md`
- `STORY-001-PRB-001-auth-backend-YYYY-MM-DD.prb.yaml`

**Validation Rules:**
- Numbers: Zero-padded (001, 002, etc.), sequential within category
- Titles: Lowercase, hyphen-separated, descriptive
- Dates: YYYY-MM-DD format (current date for new items)
- Parents: Must reference existing work item for PRBs

## Error Handling
- **PERMISSION_DENIED**: "❌ Cannot create directory: {path}"
- **INVALID_PATH**: "❌ Invalid path configuration: {key}"
- **PATH_NOT_RELATIVE**: "❌ Paths must be relative to project root"

## Auto-Documentation

**README Creation:** Automatic README.md in created directories explaining purpose and structure

---
*Directory structure behavior for intelligent-claude-code system*