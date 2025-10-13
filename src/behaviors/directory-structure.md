# Directory Structure Behavior

**MANDATORY:** Configurable directory structure. Auto-create missing directories.

## Imports
@./shared-patterns/configuration-patterns.md

## Default Structure
**Project Root**: stories/ (story_path), stories/drafts/, bugs/ (bug_path), bugs/open/, bugs/completed/, memory/ (memory_path), docs/ (docs_path), src/ (src_path), tests/ (test_path), config/ (config_path).

## Configuration Override
All paths configurable via config settings: story_path, bug_path, memory_path, docs_path, src_path, test_path, config_path.

## Behavioral Rules
Missing directories created automatically, preserves existing content, all paths relative to project root.

### Path Resolution
1. Check configuration for custom paths
2. Use defaults if not configured
3. Create if missing

## Integration
- **Story Breakdown**: Stories from story_path, drafts from story_path/drafts
- **Bug Lifecycle**: Open bugs in bug_path/open, completed in bug_path/completed
- **Memory System**: Topics stored in memory_path/[topic]/

---
*Configurable directory structure with auto-creation and path resolution*