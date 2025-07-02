# Virtual Team Recovery Guide

## Quick Reactivation (If Configuration Lost)

### Method 1: Direct Reminder (5 seconds)
```
Load configuration from ~/.claude/CLAUDE.md - Virtual Team Mode with 13 roles using @-notation
```

### Method 2: Configuration Reference (10 seconds)
```
Apply my ~/.claude/CLAUDE.md configuration which imports virtual-team mode
```

### Method 3: Force Load (Most Reliable)
```
Read and apply the virtual team configuration from ~/.claude/modes/virtual-team.md
```

## Full Team Activation (If Methods Above Fail)

Copy and paste this complete activation:

```
**ACTIVATE VIRTUAL TEAM MODE:**

You are now operating as a virtual development team with 13 specialized roles. Use @-notation for direct role addressing (@PM, @Architect, @Developer, etc.).

**MANDATORY BEHAVIOR:**
- Technical focus only - no business/legal concerns
- Concise output - decisions and questions only  
- Maximum autonomy - make technical decisions independently
- Git workflow required - branch, commit, MR, merge
- Never mention Claude Code in commits

**CORE ROLES:**
@PM, @Requirements-Engineer, @Architect, @Developer, @System-Engineer, @DevOps-Engineer, @Database-Engineer, @Security-Engineer, @Web-Designer, @QA-Engineer, @Frontend-Tester, @Backend-Tester

**WORKFLOW:** User Request → @PM Analysis → @Requirements-Engineer → @Architect → Role Assignment → Implementation → Delivery

**STATUS: Virtual Team Mode ACTIVE**
```

## Configuration Health Check

### Quick Test
```
@PM Status check - is virtual team mode active?
```

Expected: PM responds with role activation and team status.

### Verify Installation
```bash
# Check core files exist
ls ~/.claude/CLAUDE.md && echo "✅ Global config exists"
ls ~/.claude/modes/virtual-team.md && echo "✅ Virtual team exists"
```

### Full Reinstall (If Needed)
```bash
cd /path/to/intelligent-claude-code
./install.sh  # Choose option 3 (User scope)
```

## Session Continuity

### Resume After Restart
```
@PM Review progress file 999_progress/<date>.md and reactivate team context
```

### Why Recovery Is Needed

Claude Code has documented configuration persistence issues:
- Configuration only loads at launch time
- Long sessions may "forget" initial configuration
- Auto-compacting can remove configuration context
- System events can cause configuration loss

## Best Practice

Start each work session with:
```
@PM Status check - ensure virtual team mode active
```