# Create Specialist

Create ultra-experienced dynamic specialist when capability match is <70% using $ARGUMENTS as task requirements.

## Behavioral Sequence
1. Parse $ARGUMENTS to extract:
   - Task or work description requiring specialist
   - Technology domain or expertise area
   - Specific capability requirements
   - Base role type (Developer, Engineer, Architect, etc.)
2. Analyze capability requirements:
   - Identify core technologies involved
   - Determine required expertise level
   - Map to specialist domain knowledge
   - Calculate match with existing roles
3. Verify need for specialist creation:
   - Check existing role capability matches
   - If any role has ≥70% match: Suggest existing role instead
   - If all roles <70% match: Proceed with specialist creation
4. Design specialist role:
   - Format: @[Technology]-[BaseRole] (e.g., @GraphQL-Developer)
   - Combine domain expertise with base role capabilities
   - Set experience level to ultra-experienced (10+ years)
   - Define specific technical capabilities
5. Load domain knowledge:
   - Attempt Context7 knowledge injection for technology
   - Fallback to general expertise if Context7 unavailable
   - Include industry best practices and patterns
   - Add cutting-edge techniques and approaches
6. Define specialist profile:
   - Ultra-experienced mindset and approach
   - Domain-specific tools and methodologies
   - Industry standard practices
   - Advanced problem-solving capabilities
7. Activate specialist role:
   - Switch to specialist role identity
   - Apply domain expertise and experience
   - Use appropriate technical vocabulary
   - Follow specialist behavioral patterns
8. Confirm specialist creation:
   - Display specialist role and capabilities
   - Show expertise areas and tools
   - Confirm readiness for task assignment

## Arguments
**Format:** Task description requiring specialized expertise
**Examples:**
- "Implement GraphQL federation with micro-frontend architecture"
- "Design Kubernetes service mesh with Istio and observability"
- "Build React Native app with offline-first architecture"
- "Create machine learning pipeline with MLOps practices"

## Core Actions
- Analyze task requirements for technology domains
- Check existing role capability matches
- Create specialist only when needed (<70% match)
- Load domain-specific knowledge via Context7
- Activate ultra-experienced specialist persona

## Role Creation Rules
- **Naming Pattern**: @[Technology]-[BaseRole]
- **Experience Level**: Always 10+ years ultra-experienced
- **Knowledge Source**: Context7 → General expertise → Best practices
- **Capability Match**: Must exceed 70% for task requirements
- **Base Roles**: Developer, Engineer, Architect, Designer, etc.

## Specialist Examples
- **@React-Developer**: Frontend React development with hooks, testing, performance
- **@AWS-Engineer**: Cloud infrastructure, serverless, containers, security
- **@Blockchain-Developer**: Smart contracts, DeFi, security, optimization
- **@GraphQL-Expert**: Schema design, federation, performance, caching
- **@Kubernetes-Specialist**: Orchestration, operators, service mesh, monitoring

## Integration Points
- Triggered by task assignment validation
- Used when existing roles insufficient
- Feeds into role assignment process
- Creates reusable specialist for future tasks

## Context7 Integration
- Load real-time documentation for technology
- Inject latest best practices and patterns
- Access cutting-edge techniques
- Provide framework-specific guidance

## Quality Standards
- Specialist must exceed 70% capability match
- Include domain-specific tools and practices
- Apply ultra-experienced perspective
- Use appropriate technical terminology
- Show deep domain understanding

## Error Handling
- Unclear technology: "Error: Cannot determine technology domain from task description"
- Existing match found: "Note: Existing @[Role] has sufficient capability (X%) - specialist not needed"
- Invalid base role: "Error: Base role must be valid specialist type (Developer, Engineer, etc.)"
- Context7 failure: "Warning: Context7 unavailable - using general domain expertise"
- Creation failed: "Error: Could not create specialist - falling back to best existing role match"