# Configuration Management Behaviors

## AI-Guided Configuration System

**Auto-Detect:** Check project/.claude/config.md • Check ~/.claude/config.md • Identify missing/outdated options • Detect conflicts
**@PM init Setup:** Welcome/context • Project analysis • Smart question flow • Preference learning • Config generation • Validation/testing
**@PM config Adjustment:** Current settings review • Contextual suggestions • Guided changes • Impact analysis • Immediate application

**Configuration Questions:** New Projects: Project type/team size/experience level/automation preference • Existing Projects: Current config effectiveness/behavior changes/scope changes/new capabilities needed • Team Settings: Autonomy level(maturity)/PM activation/workflow structure preference • Git Workflow: AI mentions in commits/auto-gitignore management/branch protection/merge requirements/enforcement activation

**Smart Defaults:** Project-Based: Solo vs team • Experience level • Technology stack • Project complexity • Behavior-Based: User interaction patterns • Previous configuration choices • Team evolution • Success patterns

**Configuration Storage:** Structure: Organized settings by category • Clear documentation • Version tracking • Backup capability • Scope Management: Project-specific vs user-wide • Override hierarchy • Inheritance patterns • Live Updates: Immediate session application • Configuration validation • Change notifications

**Intelligent Recommendations:** Adaptive Suggestions: Based on project evolution • Team growth • Technology changes • Workflow optimization • Context-Aware: Consider current project state • Team dynamics • User preferences • Success metrics

## Git Workflow Enforcement Integration

**Configuration-Driven Enforcement:** All Git enforcement behaviors controlled by configuration settings • Enforcement adapts based on configuration file values • Provides warnings when enforcement tools unavailable

**Enforcement Configuration Options:** branch_protection: true/false - Enable/disable main branch protection • validate_commits: true/false - Enable/disable pre-commit validation • require_pr_for_main: true/false - Force PR workflow for main branch • scan_credentials: true/false - Enable/disable credential scanning • validate_file_paths: true/false - Enable/disable file path validation • default_branch: main/master - Configure protected branch name • branch_prefixes: feature/,bugfix/,hotfix/ - Configure branch naming patterns

**Implementation Integration:** Before Git Operations: Read configuration → Apply enforcement rules → Execute operation • Real-time Adaptation: Configuration changes immediately affect enforcement behavior • User Guidance: When enforcement blocks operations, provide specific remediation steps • Automatic Remediation: Auto-create branches, update .gitignore, provide git commands

**Enforcement Workflow:** Configuration Reading: Parse config.md for enforcement settings → Rule Application: Apply active rules to current Git operation → Violation Detection: Identify issues that violate configured policies → Operation Blocking: Stop violating operations with clear guidance → Automatic Remediation: Provide fixes when possible (branch creation, file moves) → User Guidance: Specific commands and steps to resolve violations