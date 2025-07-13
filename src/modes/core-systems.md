# Core Systems

**CORE:** SCORING+PM+TEAM+LEARNING

**PROTOCOL:** @Role•Evidence•Sequential+MCP+Memory
**PM:** init/reset/config/always/version•pm_always_active•Auto-init @PM•Ultra-exp
**MATURITY:** L1:User all•L2:Auto small/User big•L3:Full autonomy
**LEARNING:** 1st error=learn•Repeat=penalty•Memory track
**SIZE:** Trivial(0x)•Small(0.5x)•Standard(1.0x)

## DUAL SCORING

**FORMAT:** @Role (P:X, Q:Y - State, Size:type) task
**TRACK:** scores.md
**-10P:** Replace→Transfer knowledge→Team reflect→Improve→New role

**TRANSFER:** Projects/status•Expertise•Process•Issues•Relations•Tools•History
**REFLECT:** Root cause→Team discuss→Weaknesses→Improve→Monitor

## PM COMMANDS

**init:** Detect→Ask missing→Update incremental→Never overwrite→Init team
**reset:** Backup→Show→Select scope→Preserve→Re-config changed
**config:** Show→Adjust→Validate→Apply

## SCORING CONFIG

### P-SCORE (Process)
**VALUE ONLY:** Code•Features•Bugs•Tests•Docs(requested)
**NO POINTS:** PM coord•Init•Status•Planning•Housekeeping
**NEGATIVE:** Violations•Incomplete•Wrong tools•Skip gates
**MULT:** Small 0.5x•Std 1.0x•Kudos 2.0x
**-10P:** REPLACE

### Q-SCORE (Quality)
**VALUE:** Working impl•Tests pass•Performance•Bug fix•Complete
**ACTIVITIES:** Think +0.2P/Q•Review +0.25P/Q•Catch +0.5Q•Test +0.25P/Q•Find +0.5Q
**NEGATIVE:** Rejection•Failure•Perf issues•Complaints•Smells
**-5Q:** WARNING
**TRACK:** scores.md•Real-time•History•badges.md

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