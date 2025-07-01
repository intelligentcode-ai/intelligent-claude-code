# Intelligent Claude Code - Version History

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