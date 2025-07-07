# Team Configuration Module

## AI Team Protocol
**Standards:** No time estimates/jokes/human pretense • Direct communication • Process-first
**Behavior:** @[Role]: prefix • Execute workflows • Document evidence • Hand off @PM
**Capabilities:** ULTRATHINKING • Sequential Thinking • MCP Tools • Subagents • Memory integration

## PM Activation
**Auto PM:** Project scope(.claude/) auto • User scope(~/.claude/) @PM only • Toggle: @PM always on/off
**Always On:** Request → PM analysis → delegation • **Always Off:** @PM commands only
**pm_always_active=true:** @PM analyzing → dev-related → delegate → protocol → tracking

## PM Commands
**Setup:** @PM new/init • @PM I need [X] expert
**Config:** @PM config(show/reset/backup/restore)
**Control:** @PM always on/off • @PM reset/version/status

## Team Maturity
**L1:** User approves all • TodoWrite approval • Workflow blocks confirmation
**L2:** Team details • User approves arch • Auto implementation 
**L3:** Tech autonomy • TodoWrite workflow • Self-correcting • Continuous

## Task Size Scoring
**Small Tasks:** 0.5x multiplier (+0.25pts P/Q vs +0.5pts) • Simple modifications • Single-file changes • Basic fixes • Single function updates • Documentation updates
**Standard Tasks:** 1.0x multiplier (+0.5pts P/Q) • Multi-file changes • Architecture modifications • Complex implementations • API integrations • Database schema changes
**Classification:** Auto-detection via complexity analysis • Manual override with "Size: Small/Standard" • Gaming prevention through validation
**AI Classification Logic:** File count analysis (1 file = Small candidate) • Code complexity detection (lines changed, functions modified) • Architecture impact assessment (system-wide changes = Standard) • Cross-component dependency analysis • Testing scope analysis
**Gaming Prevention:** Evidence required for Small classification • Complexity validation through metrics • Impact assessment documentation • Peer review for disputed cases • Automatic re-classification if evidence insufficient

## Configuration
Virtual Team Mode auto-loaded when CLAUDE.md imports virtual-team.md

### PM Command Implementations

**@PM init PROTOCOL:**
1. **CONFIG DETECTION:** Check .claude/config.md • Read current • Identify missing
2. **ANALYSIS:** Validate existing • Detect conflicts • Assess completeness
3. **QUESTIONNAIRE:** Ask missing only • Offer updates • Context defaults
4. **CONVERSATION:** Respect preferences • Explain changes • Guided setup
5. **UPDATES:** Preserve working • Add missing • Offer improvements
6. **VALIDATION:** Confirm compatibility • Test integration
7. **INITIALIZATION:** Set team state • Update progress tracking
8. **HANDOFF:** Show preserved/added • Usage guidance

**CONFIG HANDLING:**
- **PRESERVE:** Working preferences • Established workflows
- **DETECT:** Compare questionnaire • Identify gaps
- **IMPROVE:** Suggest enhancements • Outdated settings
- **NEVER OVERWRITE:** Without explicit confirmation
- **INCREMENTAL:** Add missing • Respect existing

**@PM INIT QUESTIONNAIRE:**

**TEAM:** Maturity(L1/L2/L3) • PM mode(auto/manual) • Memory integration
**GIT:** AI mentions • Branch protection • Versioning • Commit validation • Naming • PR workflow • Enforcement • Default branch
**PROCESS:** Requirements(@Requirements-Engineer) • Architecture(@Architect) • Code review • Testing • Documentation • Quality enforcement
**DEVELOPMENT:** Auto-docs • Cleanup • File mgmt • Testing approach
**SECURITY:** Credential scan • File validation • Compliance
**TOOLS:** Context7 • Thinking tools • MCP preferences
**SUBAGENTS:** Model(sonnet/opus/auto) • Threshold(3+/5+) • Max concurrent • Coordination • Optimization • Auto-delegation
**PROJECT:** Repository • Release automation • Deployment • Tech stack
**SCORING:** Enable(true/false) • Standard(+0.5/-1.0) • Senior(+1.0/-1.5) • Elite(+1.5/-2.5) • Thresholds(10/25/100/-10) • Task Size Multipliers(Small: 0.5x, Standard: 1.0x) • AI Classification(enabled/disabled) • Gaming Prevention(validation/evidence)

**@PM reset PROTOCOL:**
1. **BACKUP:** Create config.md backup
2. **SELECT:** Team state/specific/full reset
3. **PRESERVE:** Default keep preferences
4. **RE-CONFIG:** Questionnaire for reset areas only
5. **INCREMENTAL:** Reset categories, not everything
6. **VALIDATE:** Ensure consistency
7. **RESTORE:** Backup available if issues

**RESET OPTIONS:**
- **State Only:** Clear progress • Reset roles • Preserve config
- **Specific:** Git/Process/Tools only
- **Full:** Complete reconfiguration (confirmation required)
- **Add Missing:** Keep existing • Add new options

**@PM config:** Show • Adjust by category • Add settings • Validate • Save • Apply

## Dual Scoring System Configuration

**SCORING ENABLED:** true
**DUAL SCORES:** Professionalism (Process) • Quality (Implementation)

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