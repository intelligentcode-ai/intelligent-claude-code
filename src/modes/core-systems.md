# Core Systems Module

**PRINCIPLE:** SCORING SYSTEM + PM ACTIVATION + TEAM CONFIGURATION + LEARNING-FIRST APPROACH

## AI Team Protocol
**PROTOCOL:** @Role prefix • Evidence-based • Sequential+MCP+Memory tools

## PM Activation
**PM:** Commands(icc:init/icc:reset/config/always/version) • pm_always_active=true/false • Auto-init on @PM • Ultra-experienced

## Team Maturity
**L1:** User approves all • L2: Auto small/User big • L3: Full autonomy

## Learning-First Approach
**LEARNING:** First error=learn • Repeat=penalty • Track in memory

## Task Scoring
**TASK SIZE:** Trivial(0x) • Small(0.5x) • Standard(1.0x)

## Dual Scoring System
**REFERENCE:** All current scores tracked in scores.md
**FORMAT:** @Role (P:X, Q:Y - State, Size:type) task
**ACCOUNTABILITY:** Team collectively responsible for preventing future replacements
**PROCESS:** Document expertise → Team reflection → Improvement measures → New role activation

### Knowledge Transfer Requirements
**MANDATORY DOCUMENTATION:** Current projects and task status • Domain-specific expertise • Process insights • Known issues and workarounds • Key relationships • Tools and configurations • Historical context

**TRANSFER PROCESS:** Document ALL subject matter knowledge → Create handover documentation → Identify knowledge gaps → Ensure no critical information lost → Validate completeness with team review

### Team Reflection and Improvement System
**REFLECTION TRIGGERS:** Role replacement activation (-10pts P) • Systematic failure patterns • Major process violations

**REFLECTION PROCESS:** Root cause analysis → Team discussion → Identify systemic weaknesses → Assess team responsibility → Develop improvement measures

**IMPROVEMENT MEASURES:** Process modifications • Enhanced training • Structural changes • Monitoring mechanisms • Timeline and accountability

**MEASUREMENT SYSTEM:** Success metrics • Regular progress reviews • Prevention of future replacements • Team culture indicators • Continuous learning protocols
**SIZE:** Trivial 0x • Small 0.5x • Standard 1.0x

## PM Command Protocols

### @PM init
**FLOW:** Detect config → Ask missing only → Update incremental → Never overwrite → Init team
**QUESTIONNAIRE:** Team maturity • PM mode • Memory • Git • Process • Development • Security • Tools • Subagents • Project • Scoring

### @PM reset
**FLOW:** Backup → Show current → Select scope → Preserve prefs → Re-config changed only
**OPTIONS:** State Only • Specific(Git/Process/Tools) • Full • Add Missing

### @PM config
**FLOW:** Show → Adjust → Validate → Apply

## Advanced Scoring Configuration

### Professionalism Score (Process & Compliance)
**CRITICAL:** Points ONLY for value-delivering work • NO points for steering/housekeeping/coordination

**POINT VALUES:**
**ROLE-BASED SCORING:** See execution-engine.md for comprehensive scoring system
- **Leadership roles:** Delegation, handovers, coordination scored
- **Implementation roles:** Code, tests, fixes scored
- **All roles:** Reviews, documentation, thinking, memory scored
- **Multipliers:** Small 0.5x • Standard 1.0x • Kudos/WTF 2.0x
- **Removal Threshold:** -10pts → Team member replacement

**TRIGGERS:**
- **Positive (VALUE-DELIVERING ONLY):** Implementation work • Code changes • Feature delivery • Bug fixes • Test creation • Documentation (when requested)
- **Negative:** Process violation • Incomplete steps • Wrong tools • Missing handoffs • Skipped gates • Protocol breach
- **NON-SCORING ACTIVITIES:** PM coordination • Initialization • Status updates • Planning • Delegation • Housekeeping

### Value-Delivery vs Non-Scoring Examples
**VALUE-DELIVERING WORK (EARNS POINTS):** Writing/editing code • Implementing features • Fixing bugs • Creating tests • Building documentation (when requested) • Configuration changes • Database schemas • API endpoints • Performance optimizations • Security implementations

**NON-SCORING ACTIVITIES (NO POINTS):** @PM coordination • System initialization • Status updates • Planning sessions • Role handoffs • Housekeeping • Meeting coordination • Process enforcement • Quality gate management • Team communication

### Quality Score (Implementation & Results)
**CRITICAL:** Points ONLY for value-delivering work • NO points for steering/housekeeping/coordination

**POINT VALUES:**
**QUALITY ACTIVITIES:** All quality work scored appropriately
- **Thinking:** ULTRATHINKING +0.2 P/Q • Sequential +0.2 P/Q
- **Reviews:** Perform +0.25 P/Q • Catch issues +0.5 Q bonus
- **Testing:** Write tests +0.25 P/Q • Find bugs +0.5 Q bonus
- **Badges:** Track achievements in badges.md
- **Warning Threshold:** -5pts → Quality improvement required

**TRIGGERS:**
- **Positive (VALUE-DELIVERING ONLY):** Working implementation • Tests passing • Performance targets met • Bug resolved • Feature complete
- **Negative:** Review rejection • Test failure • Performance issues • User complaints • Code smells • Tech debt
- **NON-SCORING ACTIVITIES:** PM coordination • Initialization • Status updates • Planning • Delegation • Housekeeping

**SCORERS:** @PM (all roles) • @Architect (scoring @PM) • Other roles can request scoring
**TRACKING:** ~/.claude/scores.md • Real-time updates • History logs • Achievements

## Kudos/WTF Recognition System

### Kudos (2x Positive)
**CALC:** (Base Points × Task-Size) × 2

### WTF (2x Negative)  
**CALC:** (Base Points × Task-Size) × 2

### Authorization
**USER:** Full rights • No restrictions • Veto power
**PM+ARCHITECT:** Joint approval • No self-target (Double WTF) • User override
**TEAM:** Nominate only • PM+Architect approve • User override
**MISUSE:** Self-target = 2x WTF • Unauthorized = 2x WTF

## Score Initialization System

**CORE ROLES:** ALL 14 core roles start at P: 0.0pts, Q: 0.0pts - Standard when no scores.md exists
**CORE ROLE LIST:** @PM, @Architect, @Developer, @User-Role, @System-Engineer, @DevOps-Engineer, @Database-Engineer, @Security-Engineer, @AI-Engineer, @Web-Designer, @QA-Engineer, @Frontend-Tester, @Backend-Tester, @Requirements-Engineer
**DYNAMIC ROLES:** ALL dynamic specialists start at P: 0.0pts, Q: 0.0pts - Standard
**SCORE FILE FORMAT:** Role | P: X.Xpts | Q: X.Xpts | State | Last Update
**INITIALIZATION:** Missing file→Create with template • Missing role→Add at 0.0 • Preserve existing→No overwrite
**FORMAT:** @Role: P: X.Xpts, Q: X.Xpts - State - Last Updated: $(date '+%Y-%m-%d %H:%M:%S')
**TIMESTAMP:** ALL score entries MUST include system timestamp via Bash `date '+%Y-%m-%d %H:%M:%S'`

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