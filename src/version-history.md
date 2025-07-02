# Intelligent Claude Code - Version History

## [2.8.2] - 2025-07-02
### Fixed
- **Requirements Engineer scope** - Now only mandatory for features, optional for bugs
- **Architect role enhancement** - Technical oversight and guidance authority added
- **PM passivity prevention** - Active control enforcement instead of just tracking
- **Task type detection** - Conditional workflow based on feature vs bug classification

## [2.8.1] - 2025-07-02
### Fixed
- **PM automatic role switching failure** - Enhanced behavioral triggers with mandatory execution templates
- **Weak process prompting** - Replaced documentation-style with trigger-based enforcement
- **Incomplete handover process** - Added mandatory "@PM" response requirements with validation
- **Progress tracking bloat** - Simplified format removing fake timestamps and debug content
- **Missing configuration management** - Enhanced @PM refresh with unset detection, added @PM config modes

### Enhanced
- **Behavioral trigger system** - Clear execution patterns for PM delegation and role switching
- **Process enforcement** - Automatic violation detection and correction protocols
- **Configuration management** - Interactive @PM config and @PM system config modes
- **Git workflow compliance** - Complete process including version bump, changelog, and PR creation

## [2.8.0] - 2025-07-02
### Added
- **Mandatory process enforcement framework** - PM now automatically enforces all configured processes
- **Automatic compliance monitoring** - Continuous validation of workflow adherence
- **Violation handling with corrective actions** - PM handles violations instead of stopping work
- **Stickiness solutions using behavioral design patterns** - Fogg Behavior Model integration for automatic compliance
- **Template-enforced role switching** - Prevents PM implementation violations
- **End-to-end workflow validation** - Complete process compliance from start to finish
- **Autonomous continuation patterns** - PM continues workflows without user intervention for technical issues

### Fixed
- **System version command** - Corrected to `@PM system version` (was `@PM version system`)
- **Git commit anonymity violations** - Enhanced enforcement of no AI mentions in commits
- **Process violation handling** - PM now resolves violations automatically instead of escalating
- **Remote deployment user assumption** - Now requires explicit USER parameter

## [2.7.2] - 2025-07-01
### Added
- **AI-Engineer role** - 13th team member for AI/ML systems, LLM integration, prompt engineering
- **Domain-specific peer review process** - AI work reviewed by AI-Engineer #2, not Developer #2
- **Conditional architect review** - Only required for architectural changes, not all modifications
- **Virtual team optimization** - 62% token reduction (8152→3115 words) while preserving functionality
- **Mandatory @PM new configuration** - New projects require configuration with Quick Setup or Custom Setup options
- Mandatory peer review workflow with second developer validation
- Intelligent batching for reviews (5-10 changes maximum)
- Automatic progress tracking in 999_progress/<session>.md files
- Universal Definition of Done requirements for all work
- Role switching troubleshooting documentation
- Utterly exact documentation requirements for reviews

### Fixed
- **CRITICAL**: Automatic role switching now works correctly in virtual team mode
- PM role now **immediately becomes** the delegated role in the same response
- Fixed missing peer review process - now mandatory for all code changes
- Fixed automatic documentation - progress files now created for every session
- Added Definition of Done (DoD) enforcement for all team members
- **Process violations** - Team now follows defined peer review and DoD processes
- **Wrong peer reviewer assignment** - Domain experts now review domain-specific work

### Enhanced
- PM boundaries now strictly enforced with immediate role transitions
- Workflow includes: Implement > Domain Expert Peer Review > Conditional Architect Review > PM
- Progress tracking demonstrates actual work being performed
- DoD ensures all work includes documentation and evidence
- Virtual team file streamlined for better AI processing efficiency
- Domain expertise matching for all peer reviews

## [2.7.1] - 2025-07-01
### Fixed
- Removed remaining inappropriate time estimates from AI agent behavior
- Eliminated "2-week maximum cycles" and "every few hours" references
- Changed "from day 1" to "from project start" for consistency
- AI agents now properly described as context/quality-driven, not time-driven

## [2.7.0] - 2025-07-01
### Added
- **@PM new command** - Scaffold new projects with virtual team activation
- **Project type detection** - Auto-detect or specify: static, webapp, enterprise
- **Greenfield project support** - Create CLAUDE.md and project structure
- **Immediate team activation** - Virtual team works from project start
- **Configuration setup** - Run init-like questionnaire for new projects

### Enhanced
- Documentation updated with new project creation workflow
- Command reference includes @PM new examples
- README shows new project creation as primary workflow

### Fixed
- Virtual team not activating for new projects (no existing CLAUDE.md)
- Gap between installing intelligent-claude-code and using it for new work

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