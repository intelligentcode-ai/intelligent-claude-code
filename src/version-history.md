# Intelligent Claude Code - Version History

## [2.6.1] - 2025-07-01
### Added
- Configurable GitHub/GitLab release automation (default: false)
- Release creation toggle asked during @PM init
- Project-specific override capability for release automation

### Fixed
- Missing GitHub releases for v2.5.0 and v2.6.0
- Release automation now properly configurable per project

### Changed
- intelligent-claude-code project set to mandatory release creation
- Release automation is opt-in by default for other projects

## [2.6.0] - 2025-07-01
### Added
- Compelling quickstart guide in README.md with human appeal focus
- Comprehensive documentation files (docs/commands.md, docs/installation.md)
- Prominent context compacting recovery section with @PM restart command
- Role switching enforcement command (@PM **CHANGE** THE ROLES!)
- Escalation sequence for context compacting issues
- Non-invasive installation emphasis with single import line approach

### Changed
- README.md transformed from technical reference to quickstart guide
- Recovery procedures now focus on session-level solutions, not file reinstallation
- Documentation structure reorganized for better user experience

### Removed
- Inappropriate make install references from recovery procedures
- Excessive technical details moved to dedicated documentation files

## [2.5.0] - 2025-07-01
### Added
- GitLab CLI (glab) integration with unified platform support
- Git platform auto-detection (GitHub vs GitLab from remote URLs)
- Unified PM commands that work for both GitHub and GitLab
- Platform-agnostic MR/PR creation and merging
- GitLab-specific authentication and repository validation
- Graceful fallbacks for both GitHub and GitLab platforms

### Enhanced
- PM commands now support both GitHub PRs and GitLab MRs
- Auto-detection prevents need for manual platform specification
- Maintains backward compatibility with existing GitHub CLI commands

## [2.4.0] - 2025-07-01
### Added
- GitHub CLI integration with graceful fallback for automated PR creation
- Mandatory pre-action workflow validation to prevent PM boundary violations
- Change size keyword detection for automatic branching requirements
- GitHub CLI detection and authentication validation
- Auto-MR creation with gh tool when available and configured

### Enhanced
- PM boundary enforcement with workflow compliance checking
- Git workflow validation prevents direct main branch commits in strict mode
- PM commands for GitHub CLI status and operations

## [2.3.0] - 2025-07-01
### Added
- Automated version number generation with PM controls
- Automated changelog generation with toggle switches
- Git push integration for automatic version/changelog updates
- Project version system integration (NodeJS, Python, Rust, etc.)
- PM restart command for virtual team reactivation after context compacting
- Enhanced PM boundaries allowing strategic investigation while preventing implementation

### Changed
- PM role switching mechanism improved to work after context compacting
- Version management now includes git commit tracking and tag creation
- Install.sh removed - ONLY make command for installation as requested

## [2.2.0] - 2025-01-01
### Added
- Configurable changelog management with Git integration
- Project discovery and version strategy intelligence
- PM-controlled version and changelog toggles per project
- Smart discovery of existing version files and strategies
- Project-specific version management configuration

## [2.1.0] - 2025-01-01
### Added
- Version management system
- @PM version command
- Auto-increment capabilities
- Project version tracking

## [2.0.0] - 2025-01-01
### Changed
- Complete virtual team implementation
- 12 specialized roles with @-notation
- PM delegation enforcement
- @PM init discovery command
- Documentation verification
- Automatic cleanup behaviors
- Token-efficient context storage

## [1.0.0] - Initial Release
### Added
- Basic intelligent-claude-code system
- Ansible-based installation
- Virtual team foundation