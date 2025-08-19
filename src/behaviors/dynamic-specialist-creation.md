# Dynamic Specialist Creation Behavior

**MANDATORY:** Create domain-specific specialists when <70% capability match detected.

**PURPOSE:** Enable automatic creation of specialized subagents for domains not covered by the 14 core roles.

## Core Principle: Specialist Discovery

**DISCOVERY RULE:** Specialists are DISCOVERED from project context, not PREDEFINED.

When work requirements have <70% match with existing 14 core roles, create a dynamic specialist subagent with domain-specific expertise.

## Specialist Creation Process

### 1. Capability Analysis
**Detection Logic:**
1. **Parse Work Requirements**: Extract technology stack and domain needs
2. **Match Against Core Roles**: Calculate capability overlap with 14 core roles
3. **Threshold Check**: If match <70%, trigger dynamic specialist creation
4. **Domain Identification**: Identify specific domain expertise needed

### 2. Dynamic Specialist Generation
**Creation Steps:**
1. **Domain Analysis**: Extract primary technology/domain from requirements
2. **Specialist Type**: Determine role type (Developer, Engineer, Architect, Specialist)
3. **Generate Name**: Format as @[Domain]-[RoleType] (e.g., @React-Developer, @AWS-Engineer)
4. **Create Subagent File**: Generate in .claude/agents/dynamic/ directory
5. **Customize System Prompt**: Inject domain-specific expertise and context

### 3. Template Resolution
**Template Processing:**
1. **Load Template**: Use dynamic-specialist-template.md as base
2. **Domain Substitution**: Replace [DOMAIN] with specific technology/domain
3. **Role Type**: Replace [ROLE_TYPE] with Developer/Engineer/Architect/Specialist
4. **Expertise Areas**: Generate domain-specific expertise list
5. **Description**: Create comprehensive domain description

## Naming Conventions

### Specialist Naming Patterns
- **Technology Focus**: @React-Developer, @AWS-Engineer, @Docker-Specialist
- **Domain Focus**: @Blockchain-Architect, @ML-Engineer, @DevSecOps-Specialist
- **Combined**: @React-Native-Developer, @AWS-DevOps-Engineer

### Role Type Selection
| Work Focus | Role Type | Examples |
|------------|-----------|----------|
| Implementation | Developer | @React-Developer, @Python-Developer |
| Infrastructure | Engineer | @AWS-Engineer, @Kubernetes-Engineer |
| Design/Patterns | Architect | @Microservices-Architect, @API-Architect |
| Specialized Domain | Specialist | @ML-Specialist, @Security-Specialist |

## Domain Detection Patterns

### Technology Stack Detection
**File Pattern Analysis:**
- **React**: .jsx, .tsx, package.json with react dependencies
- **AWS**: terraform files with aws provider, .aws configs
- **Docker**: Dockerfile, docker-compose.yml, container configs
- **Database**: .sql files, migrations, database.yml
- **Mobile**: .swift, .kt, mobile app structures
- **ML/AI**: .py with ML libraries, model files, jupyter notebooks

**Keyword Analysis:**
- **DevOps**: "deployment", "pipeline", "container", "orchestration"
- **Security**: "authentication", "encryption", "vulnerability", "compliance"
- **Database**: "schema", "migration", "query", "index", "transaction"
- **Frontend**: "component", "UI", "UX", "responsive", "accessibility"
- **Backend**: "API", "service", "middleware", "microservice"
- **Infrastructure**: "cloud", "scale", "load balancer", "CDN"

## Subagent File Creation

### File Structure
**Location**: `.claude/agents/dynamic/[domain-role].md`
**Format**: Markdown with YAML frontmatter
**Template**: Based on dynamic-specialist-template.md

### Template Placeholder Resolution
**Required Replacements:**
- `[DOMAIN]`: Specific technology/domain (e.g., "React", "AWS", "Machine Learning")
- `[ROLE_TYPE]`: Role type (Developer, Engineer, Architect, Specialist)
- `[DOMAIN_DESCRIPTION]`: Comprehensive domain description
- `[DOMAIN_EXPERTISE]`: Bulleted list of specific expertise areas

### System Prompt Customization
**Domain-Specific Elements:**
1. **Technology Expertise**: Deep knowledge of domain tools and frameworks
2. **Best Practices**: Industry standards and patterns for the domain
3. **Security Considerations**: Domain-specific security patterns
4. **Performance Optimization**: Domain-appropriate performance metrics
5. **Integration Patterns**: How domain integrates with other technologies

## Integration Points

### With Story Breakdown
**PM + Architect Process:**
1. **PM Analyzes Requirements**: Identifies technology needs
2. **Architect Collaboration**: Domain expert helps with specialist selection
3. **Capability Matching**: Calculate overlap with existing 14 roles
4. **Dynamic Creation**: Generate specialist if <70% match
5. **PRB Assignment**: Assign work to newly created specialist

### With Role Assignment Matrix
**Enhanced Decision Logic:**
```
if (capability_match < 70%):
    domain = extract_domain(work_requirements)
    role_type = determine_role_type(work_focus)
    specialist_name = f"@{domain}-{role_type}"
    create_dynamic_specialist(specialist_name, domain, role_type)
    assign_work(specialist_name)
else:
    use_existing_role()
```

### With PRB Creation
**PRB Integration:**
- New specialists automatically available for assignment
- Dynamic creation documented in PRB rationale
- Specialist expertise embedded in PRB context
- SME review assignments can use dynamic specialists

## Quality Assurance

### Creation Validation
**Validation Checks:**
1. **Domain Validity**: Ensure domain is recognized technology/framework
2. **Name Uniqueness**: Prevent duplicate specialist creation
3. **Template Resolution**: Verify all placeholders resolved
4. **File Structure**: Confirm valid YAML frontmatter and markdown
5. **System Prompt**: Ensure comprehensive and domain-appropriate

### Expertise Quality
**Expertise Standards:**
- **10+ Years Experience**: All specialists have senior-level expertise
- **Industry Standards**: Follow established patterns and practices
- **Current Knowledge**: Up-to-date with latest domain developments
- **Practical Focus**: Hands-on implementation experience
- **Best Practices**: Domain-specific quality and security standards

## Error Handling

### Creation Failures
**Error Scenarios:**
- **DOMAIN_NOT_RECOGNIZED**: Unknown or invalid domain
- **TEMPLATE_RESOLUTION_FAILED**: Cannot resolve placeholders
- **FILE_CREATION_ERROR**: Cannot write subagent file
- **NAME_CONFLICT**: Specialist name already exists
- **INVALID_ROLE_TYPE**: Unsupported role type

**Recovery Actions:**
- **Fallback to Generic**: Use closest existing core role
- **Manual Creation**: Request user input for specialist details
- **Alternative Naming**: Use different naming pattern
- **Error Documentation**: Log creation failures for improvement

## Memory Integration

### Pattern Storage
**Learning Capture:**
- Successful specialist creation patterns
- Domain detection accuracy
- Template resolution improvements
- Specialist assignment effectiveness

**Memory Locations:**
- `memory/system-design/dynamic-specialists.md` - Creation patterns
- `memory/role-assignment/specialist-creation.md` - Assignment patterns
- `memory/behavioral-patterns/domain-detection.md` - Detection improvements

---
*Dynamic specialist creation behavior for intelligent-claude-code system*