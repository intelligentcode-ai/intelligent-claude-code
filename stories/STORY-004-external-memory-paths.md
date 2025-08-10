# STORY-004: Allow Memory Storage Outside Project Directory

**Status:** Ready  
**Priority:** Medium  
**Created:** 2025-01-09  
**Requestor:** User  
**Epic:** Behavioral Enhancement  
**System Context:** MARKDOWN-BASED AI-AGENTIC SYSTEM

## Story
As a developer using intelligent-claude-code, I want AI agents to be able to store memory in a directory outside the project (optionally in a separate Git repo), so that memory remains private and separate from the project code.

## Background
Currently, the memory system stores all learnings within the project directory at `memory/`. While this works for single projects, it creates challenges:
- Memory is tied to specific projects
- Private learnings mixed with project code
- Cannot share memory across multiple projects
- Cannot maintain private memory repository
- Separation of concerns is compromised

## Requirements

### Core Functionality

1. **Configurable Memory Path**
   - Allow memory path configuration outside project scope
   - Support absolute paths to external directories
   - Support paths to Git repositories
   - Local path is `{project_root}/memory/`, alternative paths can be defined by the user
   - During system-initialization (`/icc-init-system` command), the memory storage is prompted if not present
   - Memory storage can be adjusted by the user at any time, current memory is then moved to the new location
   - If used with external GIT, system assumes the GIT repo already having been initialized or offers to initialize
   - System does NOT store ANY sensitive information (ie. GIT credentials), these are to be part of the external directory's configuration! System will offer to store MEMORY about GIT-credential-file though

2. **Configuration Settings**
   ```yaml
   # In CLAUDE.md or config.md
   memory_configuration:
     external_memory_enabled: false  # Default: false
     memory_path: "/path/to/external/memory"  # When enabled
     memory_type: "git_repo"  # Options: local_dir, git_repo
     sync_strategy: "auto_push"  # Options: manual, auto_commit, auto_push
   ```

3. **Initialization Process**
   - During `/icc-init-system`, prompt for memory configuration
   - Options presented:
     - Use project-local memory (default)
     - Configure external memory path
     - Use existing external memory
   - Store choice in project configuration

4. **Runtime Adjustment**
   - Command to reconfigure memory path: `/icc-configure-memory`
   - Allows to move existing memory to new location
   - Validation of new path accessibility

5. **Git Repository Support**
   - Clone private memory repo if specified
   - Auto-commit memory changes (configurable)
   - Push/pull synchronization options
   - Handle merge conflicts gracefully

### Security & Privacy

1. **Access Control**
   - Validate read/write permissions for external paths
   - Ensure memory path is not in system directories
   - Prevent accidental exposure of sensitive paths

2. **Separation of Concerns**
   - Project code remains in project repository
   - Memory remains in memory repository
   - Clear boundaries between concerns
   - No cross-contamination

3. **Privacy Protection**
   - External memory not included in project commits
   - .gitignore automatically updated if needed
   - Warning if memory path is within a public repository

### User Experience

1. **Initialization Dialog**
   ```
   /icc-init-system
   > Configuring memory storage...
   > 
   > Where should system memory be stored?
   > 1. Project local (./memory/) [DEFAULT]
   > 2. External directory
   > 3. Private Git repository
   > 
   > Choice [1]: _
   ```

2. **Configuration Commands**
   - `/icc-configure-memory` - Reconfigure memory settings
   - `/icc-memory-status` - Show current memory configuration
   - `/icc-migrate-memory` - Move memory to new location
   - `/icc-sync-memory` - Sync with remote (if git)

3. **Transparent Operation**
   - System works identically regardless of memory location
   - No changes to memory read/write operations
   - Performance maintained with external storage

## Acceptance Criteria

- [ ] Memory path can be configured outside project directory
- [ ] Default behavior unchanged (project-local memory)
- [ ] Initialization prompts for memory configuration
- [ ] Runtime reconfiguration supported
- [ ] Git repository memory storage works
- [ ] Access permissions validated
- [ ] Migration tools functional
- [ ] Documentation updated with configuration options
- [ ] Security boundaries maintained
- [ ] No performance degradation with external memory

## Example Scenarios

### Scenario 1: Private Memory Repository
Developer wants to keep learnings private and separate from open-source project:
1. Initializes system with external memory option
2. Specifies private GitHub repo for memory
3. System clones repo, stores memory there
4. Commits/pushes learnings to private repo
5. Project repo remains clean of private learnings

### Scenario 2: Shared Team Memory
Team wants to share learnings across multiple projects:
1. Configure shared memory directory on network drive
2. Multiple projects point to same memory location
3. Learnings from Project A benefit Project B
4. Team knowledge accumulates centrally

### Scenario 3: Migration from Local to External
Existing project wants to externalize memory:
1. Run `/icc-migrate-memory`
2. Specify new external location
3. System copies all existing memory
4. Updates configuration
5. Verifies operation with new path

## Technical Considerations

1. **Path Resolution**
   - Handle relative vs absolute paths
   - Resolve symlinks correctly
   - Support cross-platform paths

2. **Git Operations**
   - Handle authentication for private repos
   - Manage merge conflicts
   - Support various Git workflows

3. **Performance**
   - Cache frequently accessed memories
   - Optimize for network storage latency
   - Background sync for Git operations

4. **Backward Compatibility**
   - Existing projects continue working
   - Migration path clearly defined
   - No breaking changes

## Configuration Examples

### Local External Directory
```yaml
memory_configuration:
  external_memory_enabled: true
  memory_path: "~/intelligent-claude-memory"
  memory_type: "local_dir"
```

### Private Git Repository
```yaml
memory_configuration:
  external_memory_enabled: true
  memory_path: "~/.claude-memory/repo"
  memory_type: "git_repo"
  git_remote: "git@github.com:username/private-memory.git"
  sync_strategy: "auto_commit"
```

### Shared Team Memory
```yaml
memory_configuration:
  external_memory_enabled: true
  memory_path: "/shared/team/claude-memory"
  memory_type: "local_dir"
  access_mode: "read_write"
```

## Out of Scope
- Automatic memory sharing between unrelated projects
- Cloud storage backends (S3, Azure, etc.) - future enhancement
- Memory encryption at rest - separate feature
- Multi-user concurrent access control - future enhancement

## Dependencies
- Configuration system for storing settings
- Git integration for repository support
- File system permissions handling
- Migration tooling

## Definition of Done
- [ ] Configuration system supports external memory paths
- [ ] Initialization process includes memory configuration
- [ ] Runtime reconfiguration commands work
- [ ] Git repository storage functional
- [ ] Migration tools tested and documented
- [ ] Security validations in place
- [ ] Documentation complete
- [ ] Backward compatibility maintained
- [ ] Performance benchmarks pass