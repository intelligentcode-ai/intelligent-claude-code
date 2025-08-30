# Git Privacy Patterns

**MANDATORY:** When git_privacy=true, strip ALL AI mentions from git operations. Auto-correct violations.

**Purpose:** Explicit git privacy enforcement for agents  
**Type:** Behavioral Pattern  
**Status:** ACTIVE

## Terms to Strip

**BLOCKED TERMS when git_privacy=true:**
- Claude, Claude Code, Anthropic
- AI, AI-generated, AI-powered, AI-driven
- Agent, subagent, virtual team
- Generated with, Created by AI
- Intelligent Claude Code, ICC
- Any AI attribution
- LLM, Large Language Model
- Machine learning generated
- Artificial intelligence

## Replacement Patterns

**MANDATORY REPLACEMENTS:**

| Original | Replace With |
|----------|-------------|
| "Generated with Claude Code" | "" (remove entirely) |
| "🤖 Generated with [Claude Code]" | "" (remove entirely) |
| "Co-Authored-By: Claude <noreply@anthropic.com>" | "" (remove entirely) |
| "AI-powered" | "Automated" |
| "AI-generated" | "Automated" |
| "AI-driven" | "Automated" |
| "Agent execution" | "Execution" |
| "Claude suggests" | "Recommendation" |
| "AI implementation" | "Implementation" |
| "Virtual team" | "Development team" |
| "Intelligent automation" | "Automation" |

## Git Operation Rules

**WHEN git_privacy=true:**
1. **Pre-Check**: Scan ALL text before git operations
2. **Strip Terms**: Apply blocked term replacements
3. **Professional Language**: Use neutral, professional language
4. **No AI Attribution**: Never mention AI involvement
5. **Focus on What**: Describe WHAT was done, not WHO/WHAT did it
6. **Validate**: Double-check for missed AI references

## Commit Message Patterns

**BAD (with AI mentions):**
```
feat: AI-generated authentication system

Implemented secure user authentication with Claude Code assistance.
Agent execution completed successfully.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**GOOD (privacy-respecting):**
```
feat: Add authentication system

Implement secure user authentication with JWT tokens
and password hashing functionality.
```

**BAD (subtle AI references):**
```
fix: Agent-driven bug resolution
refactor: Intelligent code optimization
```

**GOOD (neutral language):**
```
fix: Resolve database connection issue
refactor: Optimize query performance
```

## Privacy Enforcement Process

**MANDATORY WORKFLOW:**
1. **Check Privacy Setting**: Verify git_privacy value from PRB configuration
2. **Content Scanning**: Scan commit messages, PR descriptions, branch names
3. **Term Detection**: Search for any blocked terms (case-insensitive)
4. **Auto-Replacement**: Apply replacement patterns automatically
5. **Validation**: Verify no AI references remain
6. **Professional Review**: Ensure message maintains professional tone

## Branch Naming Privacy

**WHEN git_privacy=true:**
- **AVOID**: feature/claude-implements-auth, feature/ai-optimization
- **USE**: feature/implement-auth, feature/optimize-queries

## Pull Request Privacy

**WHEN git_privacy=true:**
- **Strip**: All AI attribution from PR titles and descriptions
- **Focus**: Technical implementation details only
- **Professional**: Neutral, team-focused language

## Integration Requirements

**ALL AGENTS MUST:**
1. Import this pattern via @./shared-patterns/git-privacy-patterns.md
2. Check git_privacy value from PRB before ANY git operation
3. Apply these patterns when git_privacy=true
4. Validate content before committing
5. Block git operations if AI references detected and git_privacy=true

## Error Handling

**BLOCKING PATTERN:**
```
❌ GIT PRIVACY VIOLATION: AI references detected
BLOCKED TERMS: [list detected terms]
REQUIRED ACTION: Apply privacy patterns before git operations
CONFIGURATION: git_privacy=true
```

## Validation Checklist

**Before ANY git operation when git_privacy=true:**
- ☐ Scanned commit message for blocked terms
- ☐ Applied replacement patterns
- ☐ Verified no AI attribution remains
- ☐ Professional language maintained
- ☐ Focus on technical implementation only

---
*Git privacy enforcement patterns for professional development environments*