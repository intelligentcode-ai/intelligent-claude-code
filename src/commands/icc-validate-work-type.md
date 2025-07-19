# Work Type Validation

Detect work type and recommend appropriate specialist roles.

## Usage
```bash
icc-validate-work-type "work description" [--auto-correct] [--activate]
icc-validate-work-type --file story.yaml [--auto-correct]
```

## Behavior
- Analyze work description patterns
- Calculate role capability matches
- Recommend optimal specialist
- Auto-correct assignments if requested
- Prevent wrong role assignments

## Examples
```bash
icc-validate-work-type "AI behavioral patterns"
icc-validate-work-type "React components" --auto-correct --activate
icc-validate-work-type --file story.yaml --auto-correct
```

## Validation
Ensures >70% capability match and prevents generic roles when specialists exist.