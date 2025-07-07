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