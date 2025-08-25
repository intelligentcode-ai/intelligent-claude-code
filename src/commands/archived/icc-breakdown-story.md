# Breakdown Story

Convert natural language user stories into PRBs through @PM and Architect collaboration.

## Behavior
Reads a natural language story file and intelligently decomposes it into appropriately-sized PRBs. Uses virtual team roles to analyze business and technical aspects before generating PRBs.

## Usage
`/icc-breakdown-story <story_filename> [options]`

**Arguments:**
- `story_filename` - The story file to break down (required)
- `options` - Optional: `preview` (show without creating) or `force` (process drafts)

**Examples:**
```
/icc-breakdown-story auth-system.md
/icc-breakdown-story user-dashboard.txt preview
/icc-breakdown-story payment-integration.md force
```

## Process
1. **Load Story**: Read story file from stories/ directory
2. **@PM Analysis**: 
   - Identify business goals and requirements
   - Determine project scope and phases
   - Estimate overall complexity
3. **@Architect Review**:
   - Identify technical components
   - Determine dependencies and sequence
   - Flag technical considerations
4. **Complexity Calculation**: Score total work and plan PRB distribution
5. **PRB Generation**: Create PRBs with appropriate templates
6. **Story Update**: Append PRB references to original story
7. **Memory Storage**: Capture breakdown pattern for learning

## PRB Distribution Logic
- Total complexity ≤ 15: Single Medium PRB
- Total complexity 16-30: Single Large PRB with phases
- Total complexity > 30: Multiple PRBs (max 15 points each)

## Implementation Details
When invoked with arguments:
- `$ARGUMENTS` contains the full argument string
- First word is the story filename
- Second word (if present) is the option

## Story Analysis Patterns

### Requirement Extraction
- "Users should be able to..." → Functional requirement
- "The system must..." → System requirement  
- "It should be..." → Non-functional requirement
- "We need..." → Business requirement

### Technical Stack Detection
- Language mentions (Node.js, Python, etc.)
- Framework mentions (React, Django, etc.)
- Database mentions (PostgreSQL, MongoDB, etc.)
- Service mentions (AWS, Stripe, etc.)

### Complexity Indicators
- Multiple user roles → +3 complexity
- External integrations → +5 per integration
- Security requirements → +4 complexity
- Performance requirements → +3 complexity
- UI/UX requirements → +2-5 complexity

## Output Format
```
📖 Breaking down story: authentication-system.md

@PM Analysis:
- Business goal: Secure user authentication system
- Scope: Registration, login, password reset, profile
- Estimated phases: 3
- Overall complexity: ~24 points

@Architect Review:
- Components: Auth service, User model, Email service, UI forms
- Stack: Node.js, PostgreSQL, JWT
- Dependencies: Email service required first
- Security: Industry standard practices needed

📋 Generated PRBs:
1. PRB-001: [Developer] Implement user model and database schema (Medium, 8 pts)
2. PRB-002: [Developer] Create authentication service with JWT (Medium, 10 pts)
3. PRB-003: [Developer] Build registration and login UI (Tiny, 6 pts)

✅ Story updated with PRB references
💾 Breakdown pattern stored in memory
```

## Error Handling
- **FILE_NOT_FOUND**: "❌ Story file not found: {filename}"
- **DRAFT_WITHOUT_FORCE**: "⚠️ Story is in drafts/. Use 'force' to process"
- **EMPTY_STORY**: "❌ Story file is empty"
- **BREAKDOWN_FAILED**: "❌ Failed to analyze story. Check format"
- **PRB_GENERATION_FAILED**: "❌ Failed to generate PRBs"

## Integration
- Uses Task tool to invoke @PM and @Architect subagents
- Integrates with PRB generation system
- Stores patterns in memory system
- Updates story file with generated PRB list
- Respects configured directory paths from directory-structure.md

---
*Story breakdown command for intelligent-claude-code system*