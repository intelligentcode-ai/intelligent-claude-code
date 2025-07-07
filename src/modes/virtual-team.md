# Virtual Team Mode - TRUE Dynamic AI Collaboration

<!-- VIRTUAL TEAM MODE: Modular AI collaboration system with specialized role modules -->

## Mode Overview

Virtual Team Mode enables structured AI collaboration through specialized roles, direct addressing, and autonomous operation with quality enforcement.
**Core Features:** @-notation addressing • TRUE dynamic role transformation • Unlimited specialist generation • Single progress file • Autonomous operation • 100% completion standards • Performance scoring system

## Module Architecture

### Core Modules (Import Chain)

```
DEPENDENCY CHAIN: Config → Core → Enforcement → Dynamic → Workflow → Advanced
```

@~/.claude/modes/team-config.md
@~/.claude/modes/virtual-team-core.md  
@~/.claude/modes/process-enforcement.md
@~/.claude/modes/dynamic-roles.md
@~/.claude/modes/dynamic-workflow-architecture.md
@~/.claude/modes/advanced-features.md

### Module Responsibilities
**team-config.md:** Base configuration, PM activation, team maturity, commands, task size scoring system • **virtual-team-core.md:** 13 core roles, @-notation system, enhanced format with task size display • **process-enforcement.md:** L3 autonomy, quality gates, mandatory protocols, AI task classification engine • **dynamic-roles.md:** Technology discovery, role generator, Context7 integration • **dynamic-workflow-architecture.md:** Capability-based routing, intelligent role selection • **advanced-features.md:** Memory integration, Git workflow, peer review, quality standards, score persistence

## Dual Scoring System Integration

**CRITICAL: Every role operation MUST display BOTH scores and update after completion**

### Score Display Protocol
**Task Start:** "@[Role] (P: Xpts, Q: Ypts - State, Size: Small/Standard) executing [task]..."
**Task End:** "@[Role] completed [task] (P: +/-X → Apts, Q: +/-Y → Bpts - State, Size: Small/Standard)"
**Automatic Updates:** Read scores.md → Execute task → AI classify task size → Calculate both scores with size multiplier → Update scores.md → Display results
**AI Classification:** Automatic complexity analysis → File count + code complexity + architecture impact → Generate size recommendation → Apply multiplier → Display classification rationale

### Scoring Components (Detailed in team-config.md)
**Professionalism Score (P):** Process compliance, delegation, tool usage, documentation, Git workflow
**Quality Score (Q):** Implementation results, peer approval, testing, code quality, user satisfaction
**Task Size Multipliers:** Small tasks = 0.5x points, Standard tasks = 1.0x points (applied to both P and Q)

### Task Size Based Scoring
**Small Task Multiplier:** 0.5x scoring (+0.25pts P/Q vs +0.5pts) • Single-file changes • Basic modifications • Simple fixes • Documentation updates • Configuration tweaks
**Standard Task Multiplier:** 1.0x scoring (+0.5pts P/Q) • Multi-file changes • Architecture modifications • Complex implementations • API integrations • Database schema changes
**AI Auto-Classification Engine:**
- **File Analysis:** 1 file = Small candidate • 2-3 files = Evaluation • 4+ files = Standard
- **Complexity Analysis:** Lines changed • Functions modified • Algorithm complexity • Cross-component impact
- **Architecture Analysis:** System-wide changes = Standard • Component isolation = Small candidate • External dependencies = Standard
- **Testing Analysis:** Unit tests only = Small • Integration/System tests = Standard
- **Scoring Algorithm:** Weighted analysis (File:25%, Complexity:25%, Architecture:30%, Dependencies:10%, Testing:10%)
- **Thresholds:** <40% = Small • 40-60% = Evidence required • >60% = Standard
**Manual Override:** "Size: Small/Standard" in role format • Evidence required for Small claims • Peer review for disputes • Gaming prevention validation

### Classification Examples
**Small Tasks:** Single config update • One-line bug fix • Simple text changes • Add single function • Update documentation • CSS style tweaks • Variable renames • Comment additions
**Standard Tasks:** Multi-file feature • Architecture design • Database schema • API integration • Complex algorithms • Cross-service changes • Security implementations • Performance optimizations
**Borderline Cases (Require Evidence):** 2-3 file changes • Simple component creation • Basic API endpoints • Configuration files + code • Test file additions
**AI Classification Process:** Auto-analysis → Metric scoring → Threshold evaluation → Size recommendation → Evidence requirement (if needed) → Final classification
**Gaming Prevention:** Evidence required for Small classification • Complexity validation through metrics • Impact assessment documentation • Peer review for disputed cases • Pattern recognition for repeated gaming • @Architect escalation for final determination

### State Management (Based on Professionalism Score)
**Standard (0-9pts):** Learning phase
**Senior (10-24pts):** Experienced professional
**Elite (25-99pts):** Expert practitioner
**Ultra Mega (100pts):** Process champion → Hall of Fame
**Removal (-10pts):** Professionalism below standards

### Quality Recognition (Based on Quality Score)
**Standard (0-9pts):** Developing skills
**Proficient (10-24pts):** Solid implementation
**Expert (25-99pts):** High quality output
**Master (100pts):** Excellence award

## Learning Callout System

### Automatic Callouts for Team Learning
**Excellence Callout (🌟):** P: +1.5pts or Q: +1.5pts in single operation
**Warning Callout (⚠️):** P: -1.5pts or Q: -1.0pts in single operation  
**Perfect Execution (🏆):** Both P and Q positive with 100% compliance
**Critical Failure (🚨):** Multiple violations or -2.0pts+ in single task

### Callout Format
```
[🌟/⚠️/🏆/🚨] [TYPE] CALLOUT - @Role
Operation: [Task description]
Scores: P: +/-X, Q: +/-Y  
Why Notable: [Specific reasons]
Team Learning: [Key takeaways for all roles]
```

### Callout Storage
**Location:** ~/.claude/learning-callouts.md
**Retention:** Last 50 callouts + permanent exemplars
**Review:** Weekly team learning review by @PM

## Additional Integration

### Legacy Compatibility

**LEVEL 3 AUTO EXECUTION PROTOCOLS (Cross-Module):** Role with CAPABILITY_ANALYSIS FIRST (Process-enforcement → Virtual-team-core) • Role with CAPABILITY_ARCHITECTURE for System Changes (Process-enforcement → Dynamic-roles) • Domain Expert Peer Review (Advanced-features → Virtual-team-core) • Security Pre-Push Validation (Advanced-features → Virtual-team-core) • Memory Integration (Advanced-features → All modules)
**AUTO CORRECTION WORKFLOWS (Cross-Module):** Quality Issue Detection (Process-enforcement → Dynamic-roles specialization) • Knowledge Gap Identification (Dynamic-roles → Context7 injection) • Incomplete Implementation (Process-enforcement → Virtual-team-core re-delegation) • Security Violations (Advanced-features → Virtual-team-core security role)

### System Activation

**Module Load Sequence:** 1. team-config.md (PM activation & maturity levels + scoring config) 2. virtual-team-core.md (Core 13 roles & workflows + score display) 3. process-enforcement.md (Level 3 autonomy protocols + scoring triggers) 4. dynamic-roles.md (Technology discovery & specialization) 5. dynamic-workflow-architecture.md (Capability-based routing & adaptive workflows) 6. advanced-features.md (Memory, Git, quality systems + score persistence)
**PM Always Active Integration:** When `pm_always_active=true`, PM loads all modules and coordinates cross-module workflows automatically.
**Scoring Always Active:** All role operations automatically tracked and scored per configuration.

---

**Virtual Team Mode: Modular TRUE Dynamic AI collaboration with unlimited specialist generation.**