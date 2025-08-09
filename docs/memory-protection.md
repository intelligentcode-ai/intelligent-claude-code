# Memory Protection Guide

## Overview

The Intelligent Claude Code system implements **multi-layer memory protection** to ensure that private learning data never leaves the local development environment. Memory files contain AI learning patterns and private project context that must remain local-only.

## Why Memory Protection Matters

**Privacy**: Memory files contain:
- Project-specific learning patterns
- AI behavior adaptations  
- Private development context
- Team coordination patterns

**Security**: Committing memory files could expose:
- Internal development practices
- Project architecture details
- Learning algorithms and patterns
- Private organizational information

## Multi-Layer Protection System

Our defense-in-depth approach provides three independent protection layers:

### Layer 1: .gitignore Prevention
**Purpose**: Prevents accidental staging of memory files

**Files Protected**:
```gitignore
# CRITICAL: Memory must NEVER be committed - local learning only!
memory/
memory/**/*
*.memory
*.learning
```

**Status**: ✅ Always active (built into repository)

### Layer 2: Pre-commit Hook (Local Protection)
**Purpose**: Blocks commits locally if memory files get staged despite .gitignore

**Location**: `.githooks/pre-commit`

**Setup Required**: Yes (see setup instructions below)

**Features**:
- Scans staging area before commit
- Provides clear error messages
- Offers specific remediation commands
- Fast feedback (runs locally)

**Status**: ⚠️ Requires manual setup per developer

### Layer 3: GitHub Workflow (CI/CD Protection) 
**Purpose**: Final safety net that runs in GitHub Actions

**Location**: `.github/workflows/memory-check.yml`

**Features**:
- Runs on all branches (not just main)
- Scans entire repository for tracked memory files
- Checks PR diffs specifically for memory content
- Verifies .gitignore patterns are present
- Provides comprehensive remediation instructions

**Status**: ✅ Always active (runs automatically)

## Setup Instructions

### For Individual Developers

1. **Enable Git Hooks** (one-time setup):
   ```bash
   # Configure git to use project hooks directory
   git config core.hooksPath .githooks
   ```

2. **Verify Hook Installation**:
   ```bash
   # Test that pre-commit hook is executable
   ls -la .githooks/pre-commit
   # Should show: -rwxr-xr-x (executable permissions)
   ```

3. **Test Protection** (optional):
   ```bash
   # Create a test memory file
   echo "test" > test.memory
   git add test.memory
   git commit -m "test"
   
   # Should be blocked with clear error message
   # Clean up test file
   git reset HEAD test.memory
   rm test.memory
   ```

### For Team Leaders

1. **Communicate Setup**: Ensure all team members complete the individual setup
2. **Verify Protection**: Check that GitHub workflow passes on all PRs
3. **Monitor Violations**: Watch for memory protection alerts in CI/CD

## Protection Verification

### Check Current Protection Status

```bash
# Verify .gitignore patterns
grep -E "memory|\.memory|\.learning" .gitignore

# Check git hooks configuration  
git config core.hooksPath

# Test pre-commit hook
.githooks/pre-commit

# Verify GitHub workflow exists
ls -la .github/workflows/memory-check.yml
```

### Common Protection Scenarios

| Scenario | Layer 1 (.gitignore) | Layer 2 (Pre-commit) | Layer 3 (GitHub) |
|----------|----------------------|----------------------|------------------|
| `git add memory/file.md` | ✅ Prevents staging | ⚠️ Backup protection | ⚠️ Final safety net |
| `git add -f memory/file.md` | ❌ Force bypassed | ✅ Blocks commit | ⚠️ Final safety net |  
| Hook not configured | ✅ Still protects | ❌ Not active | ✅ Catches violation |
| All protections bypassed | ❌ Bypassed | ❌ Bypassed | ✅ **BLOCKS PR/PUSH** |

## Troubleshooting

### "Hook Not Found" Error
```bash
# Problem: Git can't find the pre-commit hook
# Solution: Verify hooks path configuration
git config core.hooksPath .githooks

# Alternative: Check if hook is executable
chmod +x .githooks/pre-commit
```

### "Memory Files Detected" in CI
```bash
# Problem: Memory files are tracked in repository
# Solution: Remove from git tracking (not filesystem)
git rm -r --cached memory/
git rm --cached *.memory *.learning
git commit -m "Remove memory files from tracking"
git push
```

### Pre-commit Hook Not Running
```bash
# Check current hooks path
git config core.hooksPath

# Should return: .githooks
# If not set, run:
git config core.hooksPath .githooks
```

## Memory File Patterns

### Protected Patterns
- `memory/` - Main memory directory
- `memory/**/*` - All subdirectories and files
- `*.memory` - Individual memory files
- `*.learning` - Learning pattern files

### Safe Patterns (Not Protected)
- `src/memory-utils.js` - Source code about memory (allowed)
- `docs/memory-system.md` - Documentation (allowed)
- `README.md` - Documentation references (allowed)

## Integration with Development Workflow

### Normal Development Flow
1. Work on features as usual
2. Memory system automatically stores learnings locally
3. Commit your code changes normally
4. Memory protection automatically prevents privacy leaks

### When Memory Files Are Detected
1. **Don't panic** - protection worked as designed
2. Follow the specific remediation commands shown in error message
3. Memory files remain local (safe)
4. Continue with normal development

### Pull Request Process
1. Create PR as normal
2. GitHub workflow automatically scans for memory violations
3. PR is blocked if memory files detected
4. Clear instructions provided for remediation
5. PR proceeds once memory files removed

## Advanced Configuration

### Custom Memory Patterns
Add patterns to `.gitignore` if you use custom memory file extensions:
```gitignore
# Custom patterns
*.private
*.local-only
my-memory/
```

### Hook Customization
Edit `.githooks/pre-commit` to add custom checks:
```bash
# Add to existing hook
CUSTOM_FILES=$(git diff --cached --name-only | grep -E 'private/|\.secret$' || true)
```

### Workflow Customization  
Edit `.github/workflows/memory-check.yml` to modify CI behavior:
```yaml
# Add custom scanning patterns
TRACKED_PRIVATE=$(git ls-files | grep -E "^private/|\.secret$" || true)
```

## Best Practices

### For Developers
✅ **DO**:
- Run `git config core.hooksPath .githooks` once per repository
- Pay attention to pre-commit hook messages
- Keep memory files local for privacy

❌ **DON'T**:
- Use `git add -f` to force-add memory files
- Bypass protection mechanisms
- Commit memory content manually

### For Repository Maintainers
✅ **DO**:
- Ensure all team members complete setup
- Monitor GitHub workflow results
- Update protection patterns as needed
- Document team-specific memory patterns

❌ **DON'T**:
- Disable memory protection workflows
- Allow memory files in repository
- Skip protection verification in PRs

## Security Considerations

### Threat Model
**Protected Against**:
- Accidental memory file commits
- Force-pushed memory content  
- PR-based memory exposure
- Repository-level memory leaks

**Additional Protections Needed**:
- Branch protection rules (configure in GitHub settings)
- Access control for sensitive repositories
- Regular security audits of memory patterns

### Privacy Guidelines
- Memory files contain AI learning patterns specific to your project
- Keep memory content local to preserve privacy
- Regularly clean up unnecessary memory files
- Don't share memory files outside your development team

## Monitoring and Maintenance

### Regular Checks
```bash
# Monthly: Verify protection is working
make test-memory-protection  # If available

# Quarterly: Review memory patterns
git ls-files | grep -E "memory|\.memory|\.learning"
# Should return empty (no tracked memory files)
```

### Updates and Patches
- Protection mechanisms are updated with system releases
- Monitor changelog for memory protection improvements
- Test protection after system updates

## Support

### Getting Help
- Check troubleshooting section first
- Review error messages carefully (they contain specific solutions)
- Test protection mechanisms as described above

### Reporting Issues
If memory protection fails:
1. Document the exact steps that bypassed protection
2. Include error messages and git command output  
3. Note which protection layers were active/inactive
4. Report through normal project issue channels

---

**Remember**: Memory protection exists to maintain privacy and security. Work with the system, not against it, to ensure your learning data remains private and secure.