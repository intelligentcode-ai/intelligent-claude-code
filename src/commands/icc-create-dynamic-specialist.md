# ICC Create Dynamic Specialist Command

**Usage:** `/icc-create-dynamic-specialist [domain] [role-type] [requirements]`

**Purpose:** Create a dynamic specialist subagent for domains with <70% capability match

## Parameters

- **domain** (required): Technology or domain area (e.g., "React", "AWS", "Machine-Learning")
- **role-type** (required): Type of role (Developer, Engineer, Architect, Specialist)
- **requirements** (optional): Specific work requirements to tailor the specialist

## Examples

```bash
/icc-create-dynamic-specialist React Developer "Frontend component development with hooks and context"
/icc-create-dynamic-specialist AWS Engineer "Infrastructure deployment and serverless architectures"  
/icc-create-dynamic-specialist Machine-Learning Specialist "Deep learning models and data pipelines"
/icc-create-dynamic-specialist Docker DevOps-Engineer "Container orchestration and deployment automation"
```

## Command Logic

### 1. Input Validation
- **Domain Format**: Validate domain is recognized technology/framework
- **Role Type**: Must be one of: Developer, Engineer, Architect, Specialist
- **Name Generation**: Format as @[Domain]-[RoleType]
- **Uniqueness Check**: Ensure specialist doesn't already exist

### 2. Template Processing
- **Load Template**: Read dynamic-specialist-template.md
- **Domain Analysis**: Generate domain-specific expertise areas
- **Placeholder Resolution**: Replace all template placeholders
- **System Prompt**: Create comprehensive domain-focused prompt

### 3. File Creation
- **Directory**: Create in .claude/agents/dynamic/
- **Filename**: [domain]-[role-type].md (lowercase, hyphenated)
- **Content**: Resolved template with YAML frontmatter
- **Validation**: Verify file structure and content

## Template Resolution

### Domain-Specific Replacements
- **[DOMAIN]**: Specified domain name (e.g., "React")
- **[ROLE_TYPE]**: Specified role type (e.g., "Developer")
- **[DOMAIN_DESCRIPTION]**: Generated domain description
- **[DOMAIN_EXPERTISE]**: Generated expertise bullet points

### Expertise Generation Logic
**Technology Mapping:**
- **React**: Component architecture, hooks, state management, JSX, testing
- **AWS**: EC2, S3, Lambda, CloudFormation, security groups, VPC
- **Docker**: Containerization, Docker Compose, multi-stage builds, security
- **Machine Learning**: Neural networks, data preprocessing, model training, deployment
- **Kubernetes**: Pod management, services, ingress, monitoring, scaling

### Domain Description Patterns
**Template Structure:**
```
[DOMAIN] development and architecture, including [key-technologies], 
[integration-patterns], and [industry-standards]. Expertise covers 
[performance-considerations] and [security-aspects].
```

## Directory Organization

### File Structure
```
.claude/
└── agents/
    ├── dynamic/
    │   ├── react-developer.md
    │   ├── aws-engineer.md
    │   ├── machine-learning-specialist.md
    │   └── docker-devops-engineer.md
    └── dynamic-specialist-template.md
```

### Naming Standards
- **Filename**: lowercase, hyphenated (react-developer.md)
- **Agent Name**: PascalCase with hyphens (@React-Developer)
- **Title**: Human readable (React Developer Specialist)

## Integration Points

### With Story Breakdown
- PM calls command when <70% match detected
- Architect provides domain and role type recommendations
- Created specialist immediately available for assignment

### With PRB Creation
- New specialists available in role assignment
- Dynamic creation documented in PRB context
- Specialist expertise included in PRB knowledge

### With Role Assignment Matrix
- Enhanced with dynamic creation capability
- Automatic triggering when thresholds met
- Capability matching integrated with creation logic

## Quality Assurance

### Validation Checks
```markdown
PRE-CREATION VALIDATION:
☐ Domain recognized and valid
☐ Role type supported
☐ Name unique (no conflicts)
☐ Template file exists
☐ Target directory accessible

POST-CREATION VALIDATION:
☐ File created successfully
☐ YAML frontmatter valid
☐ All placeholders resolved
☐ System prompt comprehensive
☐ Tool permissions appropriate
```

### Success Criteria
- File created in correct location
- All template placeholders resolved
- Valid YAML frontmatter
- Comprehensive system prompt
- Domain-appropriate expertise
- Ready for immediate use

## Error Handling

### Common Errors
- **DOMAIN_INVALID**: "❌ Domain '[domain]' not recognized"
- **ROLE_TYPE_INVALID**: "❌ Role type must be: Developer, Engineer, Architect, Specialist"
- **NAME_EXISTS**: "❌ Specialist @[domain]-[role-type] already exists"
- **TEMPLATE_MISSING**: "❌ Dynamic specialist template not found"
- **FILE_CREATION_FAILED**: "❌ Could not create specialist file"

### Recovery Actions
- **Domain Suggestions**: Provide similar/related domain options
- **Role Type Help**: Show valid role types with descriptions
- **Conflict Resolution**: Suggest alternative naming patterns
- **Template Creation**: Create missing template from system defaults

## Command Output

### Success Response
```
✅ Dynamic Specialist Created: @[Domain]-[RoleType]
📁 Location: .claude/agents/dynamic/[filename]
🎯 Expertise: [domain-specific-areas]
🔧 Tools: [configured-tools]
📋 Ready for assignment in PRBs and story breakdown
```

### Integration Instructions
```
Usage in PRBs:
assigned_to: "@[Domain]-[RoleType]"

Usage in Story Breakdown:
@PM select "@[Domain]-[RoleType]" for [domain]-specific work

Usage in Reviews:
sme_reviewer: "@[Domain]-[RoleType]"
```

---
*Command for creating dynamic specialist subagents*