# Configuration Management Behaviors

## AI-Guided Configuration System

### Intelligent Configuration Detection
**Auto-Detect Existing Settings:**
- Check project/.claude/config.md for project-specific settings
- Check ~/.claude/config.md for user-wide settings  
- Identify missing or outdated configuration options
- Detect conflicts between project and user settings

### Guided Configuration Process

**@PM init Guided Setup:**
1. **Welcome & Context:** "Let's set up your team configuration. I'll ask a few questions to understand your preferences."
2. **Project Analysis:** Auto-detect project type, size, and complexity
3. **Smart Question Flow:** Ask only relevant questions based on project context
4. **Preference Learning:** Learn from user responses to improve future suggestions
5. **Configuration Generation:** Create optimized settings based on responses
6. **Validation & Testing:** Test configuration and confirm everything works

**@PM config Guided Adjustment:**
1. **Current Settings Review:** "Here's your current configuration. What would you like to adjust?"
2. **Contextual Suggestions:** Suggest improvements based on project evolution
3. **Guided Changes:** Walk through each setting with explanations
4. **Impact Analysis:** Explain how changes will affect team behavior
5. **Immediate Application:** Apply changes instantly to current session

### Configuration Questions by Context

**For New Projects:**
- "What type of project is this? (web app, mobile, AI/ML, enterprise, etc.)"
- "Are you working solo or with a team?"
- "What's your experience level with this technology?"
- "How much automation do you prefer?"

**For Existing Projects:**
- "How has the current configuration been working for you?"
- "Are there any behaviors you'd like to change?"
- "Have you added new team members or changed project scope?"
- "Need any new capabilities or specialists?"

**For Team Settings:**
- "How autonomous should the team be?" (Team maturity level)
- "Should I activate automatically or wait for commands?" (PM activation)
- "Prefer structured workflows or flexible approaches?" (Process enforcement)

**For Git Workflow:**
- "Want to keep AI mentions in commits?" (Git privacy)
- "Should I manage your .gitignore file?" (Auto-gitignore)
- "Want commit validation for sensitive data?" (Validate commits)
- "Prefer clean commits or include emojis?" (Icons/styling)

### Smart Defaults Logic

**Based on Project Type:**
- **Enterprise:** High security, team maturity 3, validate_commits=true, git_privacy=true
- **Open Source:** git_privacy=true, auto_gitignore=true, human_commits=true
- **Learning/Personal:** Lower automation, team maturity 1-2, more guidance
- **AI/ML Projects:** Memory integration=true, pattern_tracking=true, specialist_generation=true

**Based on Team Size:**
- **Solo:** pm_always_active=true, auto_cleanup=true, organize_files=true
- **Small Team:** Team maturity 2, moderate automation, collaboration focus
- **Large Team:** Team maturity 3, high automation, strict process enforcement

### Configuration Enforcement

**All Roles Must Check Configuration First:**
```
BEFORE any action:
1. Load current configuration settings
2. Check if action is affected by user preferences
3. Apply configuration-based behavior
4. Proceed with configured approach
```

**Configuration Override Hierarchy:**
1. **User Explicit Command:** Direct user instruction overrides everything
2. **Project Configuration:** Project-specific settings in .claude/config.md
3. **User Configuration:** User-wide settings in ~/.claude/config.md
4. **Smart Defaults:** Context-aware defaults based on project analysis
5. **System Defaults:** Fallback defaults only if nothing else available

### Configuration Commands

**@PM config show**
Display current configuration in organized, readable format:
```
Team Configuration
==========================================
Project: [Project Name]
Team Maturity: Level [1/2/3] - [Description]
PM Activation: [Always On/Manual] 
Git Privacy: [Enabled/Disabled]
Auto Cleanup: [Enabled/Disabled]
==========================================

Suggestions: [Any contextual improvement suggestions]
```

**@PM config update [setting]**
Guided update of specific setting:
- Explain current value and impact
- Suggest alternatives based on project context
- Walk through change process
- Apply immediately

**@PM config backup/restore**
- Backup current configuration with timestamp
- Restore from previous backup
- Compare configurations
- Merge configurations intelligently

### Configuration Validation

**Settings Compatibility Check:**
- Ensure settings work together logically
- Warn about conflicting configurations
- Suggest optimal combinations
- Validate against project requirements

**Real-time Compliance:**
- Monitor role behavior for configuration compliance
- Auto-correct configuration violations
- Alert PM when roles ignore settings
- Enforce immediate compliance

### Configuration Evolution

**Adaptive Configuration:**
- Learn from user feedback and corrections
- Adapt defaults based on user patterns
- Suggest configuration improvements over time
- Evolve settings as project matures

**Version Management:**
- Track configuration changes over time
- Provide rollback capabilities
- Show configuration evolution
- Backup before major changes

## Configuration Storage Format

**Project Configuration (.claude/config.md):**
```markdown
# Team Configuration - [Project Name]
*Generated: [Date/Time] | Version: [Config Version]*

## Project Settings
- project_name: "[Project Name]"
- project_type: "[Project Type]"
- team_size: "[Solo/Small/Large]"

## Team Behavior
- team_maturity_level: [1/2/3]
- pm_always_active: [true/false]
- memory_integration: [true/false]

## Git Configuration
- git_privacy: [true/false] # Remove AI mentions from commits
- auto_gitignore: [true/false] # Auto-generate .gitignore
- validate_commits: [true/false] # Check for sensitive data
- human_commits: [true/false] # Human-like commit messages
- no_icons: [true/false] # Disable emojis/icons

## Workflow Settings
- auto_cleanup: [true/false] # Clean temporary files
- organize_files: [true/false] # Semantic file organization
- archive_progress: [true/false] # Archive progress files

## User Learning Patterns
- preferred_autonomy: [high/medium/low]
- communication_style: [concise/detailed/guided]
- learning_mode: [true/false]
```

This configuration system ensures that all team behavior respects user preferences while providing intelligent guidance for setup and management.