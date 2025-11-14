# Contributing to Intelligent Claude Code

Thank you for your interest in contributing to Intelligent Claude Code! This document provides guidelines for contributing to the project.

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inclusive environment for all contributors. We pledge to make participation in our project a harassment-free experience for everyone, regardless of background or identity.

### Expected Behavior
- Be respectful and considerate in all interactions
- Welcome newcomers and help them get started
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior
- Harassment, discrimination, or offensive comments
- Personal attacks or derogatory language
- Publishing others' private information
- Any conduct that could reasonably be considered inappropriate

### Enforcement
Violations of the code of conduct may result in temporary or permanent exclusion from the project. Report issues to the maintainers via GitHub issues.

## How to Contribute

We welcome contributions in many forms:

### Reporting Bugs
- Check existing issues to avoid duplicates
- Use the issue template when available
- Include clear reproduction steps
- Provide system information (OS, version, etc.)
- Include relevant error messages and logs

### Suggesting Features
- Check if the feature has already been suggested
- Clearly describe the problem it solves
- Provide use cases and examples
- Consider implementation complexity

### Improving Documentation
- Fix typos and clarify confusing sections
- Add examples for complex features
- Update outdated information
- Translate documentation (coordinate first)

### Contributing Code
1. Fork the repository
2. Create a feature branch from `dev` (`feature/your-feature-name` or `fix/your-fix-name`)
3. Make your changes following our standards
4. Test your changes thoroughly
5. Submit a pull request to the `dev` branch

## Branching Strategy

### Branch Structure
- **`main`** - Stable release branch (protected, releases only)
- **`dev`** - Main development branch (protected, requires PRs)
- **`feature/*`** - New features (branched from `dev`, merged to `dev`)
- **`fix/*`** - Bug fixes (branched from `dev`, merged to `dev`)

### Workflow
1. **Start work**: Branch from `dev` → `feature/your-feature` or `fix/your-bug`
2. **Develop**: Make changes, commit frequently
3. **Pull Request**: Create PR targeting `dev` branch
4. **Review**: PR review (approval optional, but encouraged)
5. **Merge**: Squash and merge to `dev`
6. **Release**: Periodic releases from `dev` → `main`

### Branch Protection
- **`dev`**: Requires pull requests (no direct commits), no approval required
- **`main`**: Protected, releases only via tagged PRs from `dev`

## Issue Guidelines

### Before Creating an Issue
- Search existing issues (including closed ones)
- Check the documentation and FAQ
- Verify you're using the latest version

### Creating a Good Issue

#### Bug Reports Should Include:
```markdown
**Description:** Clear description of the bug
**Steps to Reproduce:**
1. Step one
2. Step two
3. ...

**Expected Behavior:** What should happen
**Actual Behavior:** What actually happens
**Environment:**
- OS: [e.g., macOS 14.0]
- Version: [e.g., 4.4.0]
- Claude Code Version: [version]

**Additional Context:** Any other relevant information
```

#### Feature Requests Should Include:
```markdown
**Problem:** What problem does this solve?
**Solution:** Your proposed solution
**Alternatives:** Other solutions considered
**Use Cases:** Real-world examples
**Additional Context:** Implementation notes
```

### Issue Labels
- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed

## Pull Request Process

### Before Submitting
1. **Test your changes** - Ensure all tests pass
2. **Update documentation** - Document new features/changes
3. **Follow code style** - Match existing code patterns
4. **Write clear commits** - Use conventional commit format

### PR Requirements
- Link to related issue(s)
- Clear description of changes
- Tests for new functionality
- Documentation updates
- No merge conflicts

### PR Template
```markdown
## Description
Brief description of changes

## Related Issue
Fixes #(issue number)

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tests pass locally
- [ ] New tests added (if applicable)
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
```

### Review Process
1. Automated checks must pass
2. Maintainer review encouraged (but not required)
3. Address all feedback
4. Squash and merge to `dev`

### After Merge
- Delete your feature branch
- Update your local `dev` branch: `git checkout dev && git pull origin dev`
- Thank you for contributing!

## Questions?

If you have questions about contributing:
1. Check existing documentation
2. Ask in GitHub Discussions
3. Create an issue with the `question` label

We appreciate all contributions, big and small. Thank you for helping make Intelligent Claude Code better!