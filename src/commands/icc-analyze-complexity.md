# Analyze Complexity

Analyze work to determine complexity score and PRB template.

## Behavior
Pre-analyzes scope without creating PRB. Helps understand work before execution.

## Usage
`/icc-analyze-complexity <description>`

**Arguments:**
- `description` - Work description to analyze (required)

**Example:**
```
/icc-analyze-complexity "Implement OAuth2 authentication with JWT tokens"
```

## Core Actions
1. Parse description for technical indicators
2. Estimate: files, lines, components affected
3. Identify dependencies and integration points
4. Calculate complexity score (0-50+)
5. Recommend PRB template (nano/tiny/medium/large/mega)
6. Suggest decomposition if complex
7. Identify specialist needs (<70% match)

## Scoring Algorithm
- **Files:** 1=0pts, 2-5=2pts, 6-10=5pts, 10+=10pts
- **Lines:** <50=0pts, 50-200=3pts, 200-500=6pts, 500+=10pts  
- **External:** None=0pts, 1 service=2pts, Multiple=5pts
- **Security:** None=0pts, Auth=2pts, Critical=3pts
- **Coordination:** Single role=0pts, Multiple=2pts

## Output Format
```yaml
complexity_analysis:
  description: "..."
  scope:
    files: 8-12
    lines: ~400
    components: ["auth", "api", "db"]
  score: 31
  template: "large"
  reason: "Multi-component security feature"
  sub_tasks:
    - "OAuth2 integration (medium)"
    - "JWT management (medium)"
    - "DB schema (tiny)"
  specialists_needed:
    - "@OAuth-Specialist" if no match
```

## Template Thresholds
- **Nano:** 0-2 (trivial changes)
- **Tiny:** 3-5 (single file)
- **Medium:** 6-15 (standard feature)
- **Large:** 16-30 (complex, coordination)
- **Mega:** 30+ (system-wide)

---
*Optimized: 102→50 lines*