# Migration Guide: Multiple Files to Unified Mode System

## Overview

Intelligent Claude Code now uses a unified `CLAUDE.md` file that adapts based on mode selection, replacing the previous system of multiple CLAUDE files.

## What Changed

### Before (Multiple Files)
- `CLAUDE-enhanced.md` - Full features
- `CLAUDE-minimal.md` - Token-optimized
- `CLAUDE.md` - Standard version

### After (Unified System)
- Single `CLAUDE.md` file
- Mode selection via `config.md` configuration file
- Dynamic content based on selected mode

## Migration Steps

### 1. Backup Current Configuration
```bash
cd ~/.claude
cp -r . ~/.claude.backup.$(date +%Y%m%d)
```

### 2. Install New Version
```bash
cd intelligent-claude-code
git pull
./install.sh
```

### 3. Select Your Mode

During installation, choose:
- **Option 1**: Minimal mode (was CLAUDE-minimal.md)
- **Option 2**: Standard mode (was CLAUDE.md)
- **Option 3**: Enhanced mode (was CLAUDE-enhanced.md)

### 4. Verify Mode Setting
```bash
# Check your mode
cat ~/.claude/config.md | grep "Active Mode"
```

## Manual Migration

If you prefer manual migration:

### For Minimal Users
```bash
# Copy new unified CLAUDE.md
cp src/CLAUDE.md ~/.claude/
# Set minimal mode in config.md
echo "## Active Mode" >> ~/.claude/config.md
echo "minimal" >> ~/.claude/config.md
```

### For Enhanced Users
```bash
# Copy new unified CLAUDE.md
cp src/CLAUDE.md ~/.claude/
# Set enhanced mode in config.md
echo "## Active Mode" >> ~/.claude/config.md
echo "enhanced" >> ~/.claude/config.md
```

## Mode Comparison

| Old File | New Mode | Token Usage |
|----------|----------|-------------|
| CLAUDE-minimal.md | config.md: minimal | ~600 tokens |
| CLAUDE.md | config.md: standard | ~2000 tokens |
| CLAUDE-enhanced.md | config.md: enhanced | ~5000 tokens |

## Benefits of New System

1. **Easy Switching**: Change modes by editing config.md
2. **No File Juggling**: One CLAUDE.md adapts automatically
3. **Project Override**: Set different modes per project
4. **Cleaner Structure**: Less file duplication

## Troubleshooting

### Mode Not Working?
1. Ensure `Active Mode` is set in config.md
2. Valid values: minimal, standard, enhanced
3. Check file permissions on config.md

### Want Old Behavior Back?
The new system provides identical functionality:
- minimal = old CLAUDE-minimal.md behavior
- enhanced = old CLAUDE-enhanced.md behavior

## Questions?

The unified system provides the same features with better flexibility. Your existing preferences and customizations will continue to work.