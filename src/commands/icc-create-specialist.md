# Create Specialist

Create dynamic specialist role using $ARGUMENTS.

## Behavior

Creates domain-specific specialist with ultra-experience.

## Arguments

**Format:** "technology | base_role | expertise"
**Example:** "React | Developer | Frontend architecture"

## Core Actions

1. Parse technology, base role, expertise from $ARGUMENTS
2. Generate @Technology-BaseRole specialist
3. Merge base capabilities with domain expertise
4. Register with Context7 knowledge integration

## Error Handling

- **Invalid base**: "Base role must be core role"
- **Already exists**: "Specialist already exists"