# Directory Structure for Projects Using intelligent-claude-code

## Core Principle
Users work in their NATURAL project structure. The system adapts to YOUR project, not the other way around.

## Minimal Required Structure

```
project-root/
├── CLAUDE.md                  # Project configuration (MUST be uppercase)
├── memory/                    # Version-controlled learnings (shared with team)
│   ├── Learning/             # Error patterns and solutions
│   ├── Pattern/              # Reusable patterns
│   └── Knowledge/            # Domain knowledge
└── .claude/                   # System internals ONLY
    └── prbs/                 # Generated AgentTasks (auto-managed)
```

That's it! Everything else is YOUR choice.

## Common User Structures (Examples)

### Option 1: Docs-focused project
```
project-root/
├── CLAUDE.md
├── memory/                  # Team-shared learnings
├── docs/
│   ├── architecture/        # Your architecture docs
│   ├── best-practices/      # Your best practices
│   └── standards/          # Your coding standards
├── src/                    # Your source code
└── drafts/                 # Your draft specs
```

### Option 2: Standards at root
```
project-root/
├── CLAUDE.md
├── memory/                  # Team-shared learnings
├── best-practices/          # Your practices at root
│   ├── security.md
│   └── performance.md
├── architecture/            # Your architecture at root
├── src/                     # Your source code
└── specs/                   # Your specifications
```

### Option 3: Monorepo style
```
project-root/
├── CLAUDE.md
├── memory/                  # Shared across all packages
├── packages/
│   ├── frontend/
│   └── backend/
├── docs/
│   └── engineering/        # Your engineering docs
│       ├── standards/
│       └── patterns/
└── rfcs/                   # Your proposals/drafts
```

## Configuration in CLAUDE.md

Tell the system where YOUR files are:

```yaml
# In CLAUDE.md
prb_configuration:
  best_practices_paths:
    - "docs/best-practices/"      # Your location
    - "engineering/standards/"     # Your location
    - "wherever/you/keep/them/"   # Your location
    
  code_pattern_search:
    paths: ["src/", "lib/", "packages/"]  # Your code locations
    
  draft_locations:
    - "drafts/"                   # Your draft location
    - "rfcs/"                     # Your RFC location
    - "proposals/"                # Your proposal location
```

## What the System Auto-Creates

The system stores everything in YOUR project (version-controlled):
- `memory/` - Learning storage (version-controlled)
- `prbs/` - Generated AgentTasks (version-controlled)
- `config.md` - Project settings (default location, not .claude/)

## Key Points

1. **NO forced structure** - Work how YOU want
2. **NO .claude/ directories for user content** - That's system-only
3. **Configure paths in CLAUDE.md** - Tell system where YOUR files are
4. **Natural locations** - docs/, standards/, best-practices/, examples/
5. **Your naming** - Use your project's conventions

## Examples of What NOT to Do

❌ DON'T: Force users into .claude/ directories
```
.claude/best-practices/    # NO!
.claude/standards/         # NO!
.claude/drafts/           # NO!
```

✅ DO: Let users work naturally
```
docs/best-practices/       # YES!
standards/                 # YES!
drafts/                   # YES!
my-project-docs/          # YES!
```

The system adapts to YOU, not the other way around!