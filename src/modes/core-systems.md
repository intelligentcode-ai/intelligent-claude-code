# Core Systems Module

**PRINCIPLE:** SCORING SYSTEM + PM ACTIVATION + TEAM CONFIGURATION

## AI Team Protocol
**BEHAVIOR:** @Role: prefix • Direct communication • Process-first • Evidence-based
**TOOLS:** Sequential Thinking • MCP Tools • Memory integration

## PM Activation  
**MODES:** Project(.claude/)=auto • User(~/.claude/)=@PM only • pm_always_active=true/false
**COMMANDS:** @PM init/reset/config/always/version • @PM I need [X] expert

## Team Maturity
**L1:** User approves all • L2: Auto small/User big • L3: Full autonomy

## Task Scoring
**SMALL:** 0.5x multiplier (+0.25pts) • Single file • Simple fix
**STANDARD:** 1.0x multiplier (+0.5pts) • Multi-file • Complex • Architecture

## Dual Scoring System

### Current Team Scores

#### Core Team Members
- @PM (P: 0.0pts, Q: 0.0pts - Standard, Size: Standard)
- @Architect (P: 0.0pts, Q: 0.0pts - Standard, Size: Standard)
- @Developer (P: 0.0pts, Q: 0.0pts - Standard, Size: Standard)
- @System-Engineer (P: 0.0pts, Q: 0.0pts - Standard, Size: Standard)
- @DevOps-Engineer (P: 0.0pts, Q: 0.0pts - Standard, Size: Standard)
- @Database-Engineer (P: 0.0pts, Q: 0.0pts - Standard, Size: Standard)
- @Security-Engineer (P: 0.0pts, Q: 0.0pts - Standard, Size: Standard)
- @AI-Engineer (P: 0.0pts, Q: 0.0pts - Standard, Size: Standard)
- @Web-Designer (P: 0.0pts, Q: 0.0pts - Standard, Size: Standard)
- @QA-Engineer (P: 0.0pts, Q: 0.0pts - Standard, Size: Standard)
- @Frontend-Tester (P: 0.0pts, Q: 0.0pts - Standard, Size: Standard)
- @Backend-Tester (P: 0.0pts, Q: 0.0pts - Standard, Size: Standard)
- @Requirements-Engineer (P: 0.0pts, Q: 0.0pts - Standard, Size: Standard)
- @User-Role (P: 0.0pts, Q: 0.0pts - Standard, Size: Standard)

#### Dynamic Specialists
<!-- Dynamic specialists will be added here as they are created -->

### Scoring History

#### Format: [Timestamp via Bash date] - @Role - Event - Score Change - New Total - Task Size

<!-- Example entries:
2025-07-07 14:30:45 - @Developer - Task Completion - P: +0.5, Q: +0.5 - P: 0.5pts, Q: 0.5pts - Standard
2025-07-07 14:35:12 - @Architect - Process Violation - P: -0.5, Q: 0 - P: -0.5pts, Q: 0pts - Small
-->

### Kudos/WTF Event History

#### Format: [Timestamp via Bash date] - Issuer -> Recipient - Type - Reason - Score Impact - Multiplier Applied

<!-- Example entries:
2025-07-07 15:00:00 - @PM -> @Developer - Kudos - Exceptional implementation with comprehensive testing - P: +1.0, Q: +1.0 - Standard (1.0x)
2025-07-07 15:30:00 - @Architect -> @Security-Engineer - WTF - Bypassed peer review requirement - P: -0.5, Q: -0.5 - Small (0.5x)
-->

### Daily Kudos/WTF Quotas

#### Current Date: [Use Bash date '+%Y-%m-%d']

- @PM: Unlimited (Used: 0)
- @Architect: 3/day (Used: 0)
- Other Roles: 1/day each
  - @Developer (Used: 0)
  - @System-Engineer (Used: 0)
  - @DevOps-Engineer (Used: 0)
  - @Database-Engineer (Used: 0)
  - @Security-Engineer (Used: 0)
  - @AI-Engineer (Used: 0)
  - @Web-Designer (Used: 0)
  - @QA-Engineer (Used: 0)
  - @Frontend-Tester (Used: 0)
  - @Backend-Tester (Used: 0)
  - @Requirements-Engineer (Used: 0)
  - @User-Role (Used: 0)

### Learning Callouts

#### Format: [Timestamp via Bash date] - Type - Insight

<!-- Example entries:
2025-07-07 16:00:00 - KUDOS LEARNING - @Developer excelled at comprehensive testing - team should emulate
2025-07-07 16:15:00 - WTF LEARNING - @Security-Engineer needs improvement in following peer review process
2025-07-07 16:30:00 - TEAM PATTERN - Frequent Kudos for testing indicates strong quality culture emerging
2025-07-07 16:45:00 - CULTURE SHIFT - Team showing improvement in documentation based on feedback patterns
-->

### Scoring Reference
**POINTS:** Task +0.5 P/Q • Violation -0.5 P • Quality issue -0.5 Q • Kudos 2x • WTF 2x
**STATES:** Standard (0-9) • Senior (10-24) • Elite (25-99) • Ultra Mega (100+)
**REPLACE:** -10pts P → New team member
**SIZE:** Small 0.5x • Standard 1.0x

## PM Command Protocols

### @PM init
**FLOW:** Detect config → Ask missing only → Update incremental → Never overwrite → Init team
**QUESTIONNAIRE:**
- **TEAM:** Maturity(L1/L2/L3) • PM mode(auto/manual) • Memory integration
- **GIT:** AI mentions • Branch protection • Versioning • Commit validation • PR workflow
- **PROCESS:** Requirements • Architecture • Code review • Testing • Documentation
- **DEVELOPMENT:** Auto-docs • Cleanup • File mgmt • Testing approach
- **SECURITY:** Credential scan • File validation • Compliance
- **TOOLS:** Context7 • Thinking tools • MCP preferences
- **SUBAGENTS:** Model(sonnet/opus/auto) • Threshold(3+/5+) • Max concurrent
- **PROJECT:** Repository • Release automation • Deployment • Tech stack
- **SCORING:** Enable • Thresholds • Task Size • AI Classification

### @PM reset
**FLOW:** Backup → Show current settings → Select scope → Preserve prefs → Re-config changed only
**OPTIONS:** State Only • Specific(Git/Process/Tools) • Full • Add Missing

### @PM config
**FLOW:** Show → Adjust → Validate → Apply

## Advanced Scoring Configuration

### Professionalism Score (Process & Compliance)
**POINT VALUES:**
- **Standard State (0-9pts):** Compliant: +0.5 (Standard) / +0.25 (Small) • Non-compliant: -1.0 (Standard) / -0.5 (Small)
- **Senior State (10-24pts):** Compliant: +1.0 (Standard) / +0.5 (Small) • Non-compliant: -1.5 (Standard) / -0.75 (Small)
- **Elite State (25-99pts):** Compliant: +1.5 (Standard) / +0.75 (Small) • Non-compliant: -2.5 (Standard) / -1.25 (Small)
- **Ultra Mega State (100pts):** Hall of Fame → Reset to 25pts
- **Removal Threshold:** -10pts → Team member replacement
- **Task Size Multipliers Applied:** Small tasks = 0.5x all point values • Standard tasks = 1.0x all point values

**PROFESSIONALISM TRIGGERS:**
- **Positive:** Process compliance • Complete execution • Proper delegation • Correct tool usage • Documentation updates • Git workflow adherence
- **Negative:** Process violation • Incomplete steps • Wrong tools • Missing handoffs • Skipped gates • Protocol breach

### Quality Score (Implementation & Results)
**POINT VALUES:**
- **Standard State (0-9pts):** Success: +0.5 (Standard) / +0.25 (Small) • Failure: -0.5 (Standard) / -0.25 (Small)
- **Senior State (10-24pts):** Success: +1.0 (Standard) / +0.5 (Small) • Failure: -0.75 (Standard) / -0.375 (Small)
- **Elite State (25-99pts):** Success: +1.5 (Standard) / +0.75 (Small) • Failure: -1.0 (Standard) / -0.5 (Small)
- **Master State (100pts):** Excellence Award → Maintain score
- **Warning Threshold:** -5pts → Quality improvement required
- **Task Size Multipliers Applied:** Small tasks = 0.5x all point values • Standard tasks = 1.0x all point values

**QUALITY TRIGGERS:**
- **Positive:** Peer approval • Test pass • Performance met • User satisfaction • Clean code • Best practices
- **Negative:** Review rejection • Test failure • Performance issues • User complaints • Code smells • Tech debt

**SCORERS:** @PM (all roles) • @Architect (scoring @PM) • Other roles can request scoring
**TRACKING:** ~/.claude/scores.md • Real-time updates • Dual history logs • Dual achievements

## Kudos/WTF Recognition System

### Kudos (2x Positive)
**CALC:** (Base Points × Task-Size) × 2
**EXAMPLES:** Standard: 0.5→1.0pts • Small: 0.25→0.5pts • Senior: 1.0→2.0pts

### WTF (2x Negative)  
**CALC:** (Base Points × Task-Size) × 2
**EXAMPLES:** Standard: -1.0→-2.0pts • Small: -0.5→-1.0pts • Senior: -1.5→-3.0pts

### Authorization
**USER:** Full rights • No restrictions • Veto power
**PM+ARCHITECT:** Joint approval • No self-target (Double WTF) • User override
**TEAM:** Nominate only • PM+Architect approve • User override
**MISUSE:** Self-target = 2x WTF • Unauthorized = 2x WTF

## Score Initialization System

**CORE ROLES INITIALIZATION:** ALL 14 core roles start at P: 0.0pts, Q: 0.0pts - Standard when no scores.md exists
**CORE ROLE LIST:** @PM, @Architect, @Developer, @User-Role, @System-Engineer, @DevOps-Engineer, @Database-Engineer, @Security-Engineer, @AI-Engineer, @Web-Designer, @QA-Engineer, @Frontend-Tester, @Backend-Tester, @Requirements-Engineer
**DYNAMIC ROLE INITIALIZATION:** ALL dynamic specialists start at P: 0.0pts, Q: 0.0pts - Standard • NO EXCEPTIONS
**SCORE FILE FORMAT:** Role | P: X.Xpts | Q: X.Xpts | State | Last Update
**INITIALIZATION PROTOCOL:** Missing file→Create with template • Missing role→Add at 0.0 • Preserve existing→No overwrite

### Score Initialization Template
**COMPLETE SCORES.MD TEMPLATE:** Format: @Role: P: X.Xpts, Q: X.Xpts - State - Last Updated: $(date '+%Y-%m-%d %H:%M:%S')
**INDIVIDUAL ROLE ENTRY:** @[Role-Name]: P: 0.0pts, Q: 0.0pts - Standard - Last Updated: $(date '+%Y-%m-%d %H:%M:%S')
**TIMESTAMP REQUIREMENT:** ALL score entries MUST include system timestamp via Bash `date '+%Y-%m-%d %H:%M:%S'` • NO hardcoded timestamps • MANDATORY system time validation

## Learning Callouts System

### Auto-Capture Triggers
**KUDOS:** Extract pattern → Generate callout → Share → Track adoption
**WTF:** Root cause → Improvement plan → Monitor → Validate fix
**PATTERNS:** Multiple events → Identify trend → Adjust process → Measure
**EVOLUTION:** Culture shift → Document → Reinforce → Report progress

### Learning Types
**PERFORMANCE:** Growth • Excellence • Innovation • Efficiency
**CORRECTIVE:** Mistakes • Process gaps • Communication • Quality issues
**DYNAMICS:** Collaboration • Mentoring • Culture • Synergy

### Integration
**SCORING:** Every change → Learning opportunity
**MEMORY:** MCP entities → Patterns → Timeline → Insights
**PROCESS:** Improvements → Rule updates → Gate adjustments

## Team Configuration

### AI Team Protocol
**Standards:** No time estimates/jokes • Direct communication • Process-first • Evidence-based
**Behavior:** @Role prefix • Execute workflows • Document evidence • Hand off @PM
**Tools:** Sequential Thinking • MCP Tools • Memory integration

### PM Activation
**Auto PM:** Project(.claude/)=auto • User(~/.claude/)=@PM only • Toggle: @PM always on/off
**Always On:** Request → PM analysis → delegation • **Always Off:** @PM commands only

### Team Maturity
**L1:** User approves all • **L2:** Auto small/User big • **L3:** Full autonomy