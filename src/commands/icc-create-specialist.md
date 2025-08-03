# Create Specialist

**BEHAVIORAL:** Auto-adopt specialist patterns from $ARGUMENTS.

Create dynamic specialist role using $ARGUMENTS.

## Behavior

Creates domain-specific specialist with ultra-experience.

## Usage
`/icc-create-specialist <technology> <base_role> [expertise]`

**Arguments:**
- `technology` - Technology domain (required)
- `base_role` - Base role to extend (required)
- `expertise` - Optional: Specific expertise area

**Examples:**
```
/icc-create-specialist React Developer
/icc-create-specialist AWS Engineer "Cloud architecture"
/icc-create-specialist Kubernetes DevOps-Engineer
```

## Core Actions

1. Parse technology, base role, expertise from $ARGUMENTS
2. Generate @Technology-BaseRole specialist
3. Merge base capabilities with domain expertise
4. Register with Context7 knowledge integration

## Error Handling

- **Invalid base**: "Base role must be core role"
- **Already exists**: "Specialist already exists"