# Directory Structure Behavior

**MANDATORY:** Projects follow configurable directory structure. Auto-create missing directories.

## Default Structure

**Project Root Organization:**
- **stories/** - User stories (configurable: story_path)
  - **drafts/** - Work-in-progress stories
- **bugs/** - Bug reports (configurable: bug_path)
  - **open/** - Active bugs
  - **completed/** - Fixed bugs
- **prbs/** - PRBs (configurable: prb_path)
  - **ready/** - Ready to execute
  - **completed/** - Executed PRBs
- **memory/** - Learning storage (configurable: memory_path)
- **docs/** - Documentation (configurable: docs_path)
- **src/** - Source code (configurable: src_path)
- **tests/** - Tests (configurable: test_path)
- **config/** - Configuration (configurable: config_path)
- **prb-templates/** - PRB templates (configurable: prb_template_path)

## Configuration Override

**Configuration Override Example:**
- **story_path**: "user-stories" (Default: "stories")
- **bug_path**: "issues" (Default: "bugs")  
- **prb_path**: "requirements" (Default: "prbs")
- **memory_path**: "knowledge-base" (Default: "memory")
- **docs_path**: "documentation" (Default: "docs")
- **src_path**: "source" (Default: "src")
- **test_path**: "test-suite" (Default: "tests")
- **config_path**: "settings" (Default: "config")
- **prb_template_path**: "templates" (Default: "prb-templates")

## Behavioral Rules

### Auto-Creation
- Missing directories created automatically
- Preserves existing content
- All paths relative to project root

### Path Resolution
1. Check configuration for custom paths
2. Use defaults if not configured
3. Create if missing

### Integration Points
- **Story Breakdown:** Stories from `story_path`, drafts from `story_path/drafts`
- **Bug Lifecycle:** Open bugs in `bug_path/open`, completed in `bug_path/completed`
- **PRB System:** Ready PRBs in `prb_path/ready`, completed in `prb_path/completed`
- **Memory System:** Topics stored in `memory_path/[topic]/`
- **Templates:** Loaded from `prb_template_path` with hierarchy fallback

## Path Access Functions

### Get Configured Path Pattern
- **Path Resolution**: Use get_project_path function with setting key and default value
- **Parent Path**: Support nested paths with parent reference for sub-directories

### Standard Locations
- **Stories:** `{story_path}/` and `{story_path}/{story_drafts}/`
- **Bugs:** `{bug_path}/{bug_open}/` and `{bug_path}/{bug_completed}/`
- **PRBs:** `{prb_path}/{prb_ready}/` and `{prb_path}/{prb_completed}/`
- **Memory:** `{memory_path}/[topic]/`
- **Templates:** `{prb_template_path}/` with hierarchy fallback

---
*Configurable directory structure with auto-creation and path resolution*