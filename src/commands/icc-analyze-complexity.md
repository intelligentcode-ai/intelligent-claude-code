# Analyze Complexity

Analyze work requirements to determine complexity score and recommend PRB template.

## Behavior
Performs detailed complexity analysis on requirements without creating a PRB, helping users understand the scope and recommended approach before committing to execution.

## Arguments
**Format:** "description"
**Example:** "Implement OAuth2 authentication with JWT tokens"

## Core Actions
1. **Parse Description**: Extract key technical indicators
2. **Estimate Scope**: Calculate files, lines, components affected
3. **Identify Dependencies**: Find integration points and risks
4. **Calculate Score**: Apply complexity scoring algorithm
5. **Recommend Template**: Suggest optimal PRB template
6. **Suggest Decomposition**: For complex work, recommend sub-tasks
7. **Identify Specialists**: Detect need for dynamic role creation
8. **Return Analysis**: Provide detailed breakdown

## Analysis Output
```yaml
complexity_analysis:
  description: "Implement OAuth2 authentication"
  
  scope_estimation:
    files_affected: 8-12
    code_volume: ~400 lines
    components: ["auth", "api", "database", "frontend"]
    
  complexity_factors:
    file_impact: 5     # Multiple files
    code_volume: 4     # Moderate volume
    external_api: 6    # OAuth2 providers (2x3pts)
    database: 4        # User/token tables
    security: 5        # Auth is security critical
    coordination: 3    # Multiple roles needed
    specialist: 4      # May need @OAuth-Specialist
    total_score: 31
    
  recommendation:
    template: "large"
    reason: "Multi-component security feature"
    decomposition_suggested: true
    
  suggested_sub_tasks:
    - "OAuth2 provider integration (medium)"
    - "JWT token management (medium)"
    - "Database schema updates (tiny)"
    - "Frontend auth components (medium)"
    - "Security audit prep (tiny)"
    
  specialist_needs:
    likely_required:
      - "@Security-Engineer"
      - "@OAuth-Specialist" # <70% match, create
      
  execution_estimate:
    parallel_possible: true
    integration_points: 3
    validation_gates: 2
```

## Quick Analysis Mode
Add `--quick` for rapid assessment:
```bash
/icc-analyze-complexity "Fix typo" --quick
> Quick Assessment: Nano PRB (1 file, trivial change)

/icc-analyze-complexity "Add API endpoint" --quick  
> Quick Assessment: Medium PRB (3-5 files, standard feature)
```

## Examples
```bash
# Analyze feature complexity
/icc-analyze-complexity "Add real-time chat with WebSockets"
> Files affected: 15-20
> Complexity score: 28
> Recommended: Large PRB with 4 sub-PRBs
> Specialists needed: @WebSocket-Engineer

# Analyze simple task
/icc-analyze-complexity "Update copyright year in footer"
> Files affected: 1
> Complexity score: 1
> Recommended: Nano PRB
> Direct execution possible

# Analyze system change
/icc-analyze-complexity "Migrate from REST to GraphQL"
> Files affected: 50+
> Complexity score: 45
> Recommended: Mega PRB with phased approach
> Warning: High risk architectural change
```

## Integration
- **Pre-Planning**: Use before /icc-create-prb for complex work
- **Estimation**: Helps PM understand work scope
- **Risk Assessment**: Identifies complexity before commitment
- **Learning**: System improves scoring accuracy over time