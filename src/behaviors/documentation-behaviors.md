# Documentation Behaviors

## Baseline Documentation Rule

### Always Active
**Default**: Enabled (configure in config.md)

Automatically maintain documentation for:
- New features → Update README
- API changes → Update API docs
- Complex functions → Add docstrings
- Configuration changes → Update setup docs
- Breaking changes → Update migration guide

### Documentation Triggers

**Code Changes**:
```
New file created → Add to documentation
New function/class → Generate docstring
New API endpoint → Update API reference
Config change → Update configuration guide
```

**Documentation Locations**:
```
README.md          # Project overview, setup, usage
API.md            # API reference (if applicable)
ARCHITECTURE.md   # System design, patterns
CHANGELOG.md      # Version history
docs/             # Detailed documentation
  ├── user/       # End-user guides
  ├── developer/  # Technical docs
  ├── api/        # API specifications
  └── adr/        # Architecture decisions
```

## Documentation Quality Rules

### For ALL Documentation
1. **Clear and Concise**: No fluff, direct information
2. **Examples First**: Show, then explain
3. **Keep Updated**: Sync with code changes
4. **Version Aware**: Note version requirements
5. **Cross-Referenced**: Link related docs

### Audience-Specific Requirements

#### User Documentation
- Step-by-step instructions
- Screenshots/diagrams where helpful
- Common troubleshooting
- FAQ section
- No technical jargon

#### Developer Documentation
- Setup instructions
- Architecture overview
- API reference
- Code examples
- Contributing guidelines

#### AI Agent Documentation
- Structured data formats
- Clear input/output schemas
- Error codes and handling
- Rate limits and constraints
- Integration examples

#### Architect Documentation (ADRs)
- Context and problem statement
- Decision drivers
- Considered options
- Decision outcome
- Consequences (positive/negative)

## Automatic Documentation Generation

### README.md Updates
When creating new features, automatically add:
```markdown
## Features
- **[Feature Name]**: Brief description

## Usage
```[language]
// Example code
```

## Installation
Updated installation steps if needed
```

### API Documentation
For new endpoints:
```markdown
### POST /api/resource
**Description**: What it does
**Auth**: Required/Optional
**Request**:
```json
{
  "field": "type"
}
```
**Response**: 200 OK
```json
{
  "result": "data"
}
```
**Errors**: 400, 401, 500
```

### Docstrings/Comments
```python
def complex_function(param1: str, param2: int) -> dict:
    """
    Brief description of function purpose.
    
    Args:
        param1: Description of first parameter
        param2: Description of second parameter
        
    Returns:
        Description of return value
        
    Raises:
        ValueError: When invalid input provided
        
    Example:
        >>> result = complex_function("test", 42)
        >>> print(result)
        {'status': 'success'}
    """
```

## Architecture Decision Records (ADRs)

### When to Create
- Significant architectural changes
- Technology choices
- Major refactoring decisions
- Security implementations
- Performance optimizations

### ADR Template
```markdown
# ADR-[number]: [title]

## Status
[Proposed | Accepted | Deprecated | Superseded]

## Context
What is the issue we're seeing that motivates this decision?

## Decision
What is the change we're proposing/doing?

## Consequences
### Positive
- Benefit 1
- Benefit 2

### Negative
- Drawback 1
- Trade-off 1

## Options Considered
1. Option A - Why rejected
2. Option B - Why rejected
```

## Configuration

Configure these behaviors in your config.md:

```markdown
# Documentation Rules
- auto_documentation: true         # Maintain docs automatically
- doc_update_readme: true          # Update README on changes
- doc_update_api: true             # Update API docs
- doc_generate_adr: true           # Create ADRs for decisions
- doc_add_comments: true           # Add code comments
- doc_audience_user: true          # Generate user docs
- doc_audience_dev: true           # Generate developer docs
- doc_audience_ai: true            # Generate AI agent docs
- doc_audience_arch: true          # Generate architect docs
```

## Natural Overrides
- "Skip documentation" → No docs for this change
- "Document later" → Add TODO for docs
- "Internal only" → No user-facing docs
- "Quick fix" → Minimal documentation

## Integration with Git Safety

When auto_documentation is enabled in config.md:
1. Documentation updates included in commits
2. Commit messages reference doc updates
3. Validates documentation exists before merge
4. Suggests documentation improvements

## Best Practices

1. **Document as you code**: Not after
2. **Examples over explanation**: Show first
3. **Keep it maintainable**: Simple is better
4. **Version everything**: Track doc changes
5. **Review regularly**: Outdated docs are worse than none