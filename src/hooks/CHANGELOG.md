# Changelog - Intelligent Claude Code Hooks

All notable changes to the hooks component will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-01-16

### Changed
- BUG-002-AgentTask-001: Updated hook source files from PRB to AgentTask terminology
- Updated pre-tool-use.js to reference AgentTask creation instead of PRB creation
- Updated intent-classifier.js comments and patterns for AgentTask terminology
- Updated intent-patterns.json configuration to use agenttask_context and agenttask paths
- Updated README.md documentation to reflect AgentTask terminology throughout
- Improved consistency with system-wide AgentTask terminology adoption

## [1.0.0] - 2025-01-16

### Added
- Initial release of intelligent-claude-code hooks system
- Pre-tool-use hook for behavioral pattern enforcement
- Post-tool-use hook for memory storage reminders
- Intent classification engine with research, qa, planning, and work categories
- Memory consultation enforcement for PRB/AgentTask creation
- Configuration system with intent patterns and enforcement modes
- Comprehensive test suite for hook integration validation
- Performance optimization with sub-100ms execution target
- Professional fail-open behavior for system reliability