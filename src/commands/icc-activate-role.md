# Activate Role

**BEHAVIORAL:** Auto-adopt role patterns from $ARGUMENTS.

Switch to specialized role using $ARGUMENTS as role name.

## Process
1. **Parse:** Extract @Role from $ARGUMENTS
2. **Validate:** Core roles (PM, Developer) or dynamic (React-Developer)
3. **Load:** Role definition from specialists.md + Context7 knowledge
4. **Switch:** Preserve state, adopt expertise, display scores

## Format
**Input:** @Role or @Domain-BaseRole  
**Output:** "@Role (P:X.X, Q:X.X): Now active"
**State:** Role stack preservation + ultra-experienced mindset

## Errors
- Missing @: "Role must start with @"
- Invalid: "Use @RoleName or @Domain-BaseRole"
- Not initialized: "Run icc-init-system first"