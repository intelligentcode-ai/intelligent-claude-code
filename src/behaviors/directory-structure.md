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

In CLAUDE.md or config.md:
```yaml
# Directory Configuration
directory_structure:
  story_path: "user-stories"      # Default: "stories"
  bug_path: "issues"             # Default: "bugs"
  prb_path: "requirements"        # Default: "prbs"
  memory_path: "knowledge-base"   # Default: "memory"
  docs_path: "documentation"      # Default: "docs"
  src_path: "source"             # Default: "src"
  test_path: "test-suite"        # Default: "tests"
  config_path: "settings"        # Default: "config"
  prb_template_path: "templates" # Default: "prb-templates"
  
  # Subdirectories
  story_drafts: "wip"            # Default: "drafts"
  bug_open: "active"             # Default: "open"
  bug_completed: "resolved"      # Default: "completed"
  prb_ready: "backlog"           # Default: "ready"
  prb_completed: "done"          # Default: "completed"
```

## Behavioral Rules

### Auto-Creation
- Missing directories are created automatically
- Preserves existing content
- Creates README.md in each directory explaining purpose

### Path Resolution
1. Check configuration for custom paths
2. Use defaults if not configured
3. Create if missing
4. All paths relative to project root

### Integration Points

#### With Story Breakdown
- Stories read from configured story_path
- Drafts in story_path/story_drafts
- Auto-create if missing

#### With Bug Lifecycle System
- Bugs read from configured bug_path/bug_open
- Completed moved to bug_path/bug_completed
- Automatic lifecycle transitions via PRB integration

#### With PRB System
- PRBs created in prb_path/prb_ready
- Completed moved to prb_path/prb_completed
- References use configured paths

#### With Memory System
- Memories stored in memory_path/[topic]
- Search includes all subdirectories
- Respects configured structure

#### With PRB Template System
- Templates loaded from prb_template_path
- Hierarchy: project → .claude → ~/.claude
- Auto-create if missing

## Path Access Functions

### Get Configured Path
```
path = get_project_path("story_path", "stories")  # Returns configured or default
draft_path = get_project_path("story_drafts", "drafts", parent="story_path")
```

### Ensure Directory Exists
```
ensure_directory(path)  # Creates if missing, including parents
```

### Standard Locations
- **Stories**: `{story_path}/` and `{story_path}/{story_drafts}/`
- **Bugs**: `{bug_path}/{bug_open}/` and `{bug_path}/{bug_completed}/`
- **PRBs**: `{prb_path}/{prb_ready}/` and `{prb_path}/{prb_completed}/`
- **Memory**: `{memory_path}/[topic]/`
- **Docs**: `{docs_path}/[category]/`
- **Templates**: `{prb_template_path}/` with hierarchy fallback

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
- `STORY-001-user-authentication-2025-01-09.md`
- `BUG-005-login-timeout-issue-2025-01-09.md`
- `STORY-001-PRB-001-auth-backend-2025-01-09.prb.yaml`

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

When creating directories, add README:
```markdown
# {Directory} Directory

This directory contains {purpose}.
Path configured as: {config_key}

## Structure
{subdirectory_explanation}
```

---
*Directory structure behavior for intelligent-claude-code system*