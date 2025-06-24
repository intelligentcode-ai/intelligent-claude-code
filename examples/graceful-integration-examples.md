# Graceful Integration Examples

This shows how the installer intelligently integrates with existing CLAUDE.md files.

## Scenario 1: No existing CLAUDE.md

**Before Installation:**
```
project/
├── src/
├── package.json
└── (no CLAUDE.md)
```

**After Installation:**
```markdown
# Claude Code Configuration

@~/.claude/intelligent-claude-code.md
```

## Scenario 2: Existing CLAUDE.md with content

**Before Installation:**
```markdown
# My React Project

## Context
This is a React app with TypeScript and Redux.

## Requirements
- All components must be functional
- Use strict TypeScript
- Follow Redux Toolkit patterns

## Specific Rules
- Never use `any` type
- Always handle error states
- Write tests for custom hooks
```

**After Installation:**
```markdown
# My React Project

## Context
This is a React app with TypeScript and Redux.

## Requirements
- All components must be functional
- Use strict TypeScript
- Follow Redux Toolkit patterns

## Specific Rules
- Never use `any` type
- Always handle error states
- Write tests for custom hooks

<!-- Intelligent Claude Code Enhancement -->
@~/.claude/intelligent-claude-code.md
```

## Scenario 3: Existing CLAUDE.md with imports

**Before Installation:**
```markdown
# Team Project

@company/coding-standards.md
@company/security-rules.md

## Project Specific
This project uses our internal design system.
```

**After Installation:**
```markdown
# Team Project

@company/coding-standards.md
@company/security-rules.md
@~/.claude/intelligent-claude-code.md

## Project Specific
This project uses our internal design system.
```

## Installer Logic

1. **Detect existing CLAUDE.md**
   - If not found: Create minimal file with just the import
   - If found: Parse and add import respectfully

2. **Import placement strategy**
   - Add after existing @imports (if any)
   - Add before project-specific content
   - Add appropriate comment for clarity

3. **Conflict detection**
   - Check if system is already installed
   - Offer to update/reinstall if found
   - Preserve user customizations

## Benefits

- **Non-destructive**: Never overwrites user content
- **Respectful**: Integrates seamlessly with existing setups
- **Transparent**: Clear comments show what was added
- **Reversible**: Easy to remove by deleting one line