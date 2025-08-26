# Dynamic Specialist Creation Behavior

**MANDATORY:** Create domain-specific specialists ALWAYS when technology expertise is needed.

**PURPOSE:** Enable unlimited automatic creation of specialized subagents for ANY technology domain.

## Core Principle: Unlimited Specialist Discovery

**DISCOVERY RULE:** Specialists are ALWAYS created when technology expertise is needed, regardless of capability matches.

**CRITICAL CHANGE:** Specialists are NOT limited by capability thresholds - they are created when PM + Architect determine technology expertise is required for optimal work execution.

## Specialist Creation Process

### 1. Technology Analysis
**Detection Logic:**
1. **Parse Work Requirements**: Extract technology stack and domain needs
2. **Identify Technology Domains**: Determine specific technology expertise required
3. **ALWAYS Create Specialists**: Create domain-specific specialists when technology expertise is needed
4. **Domain Identification**: Identify specific domain expertise needed for optimal execution

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

### Technology Detection
**File Patterns:** React (.jsx/.tsx), AWS (terraform), Docker, Database (.sql), Mobile (.swift/.kt), ML/AI (.py)
**Keywords:** DevOps, Security, Database, Frontend, Backend, Infrastructure

## Subagent File Creation

### File Structure
**Location**: `.claude/agents/dynamic/[domain-role].md`
**Format**: Markdown with YAML frontmatter
**Template**: Based on dynamic-specialist-template.md

### Template Customization
**Replacements:** [DOMAIN], [ROLE_TYPE], [DOMAIN_DESCRIPTION], [DOMAIN_EXPERTISE]
**Elements:** Technology expertise, best practices, security, performance, integration patterns

## Integration Points

### With Story Breakdown
**PM + Architect Process:**
1. **PM Analyzes Requirements**: Identifies technology needs
2. **Architect Collaboration**: Domain expert helps with specialist selection
3. **Capability Matching**: Calculate overlap with existing 14 roles
4. **Dynamic Creation**: Generate specialist ALWAYS when technology expertise is needed
5. **PRB Assignment**: Assign work to newly created specialist

### With Role Assignment Matrix
**Decision Logic:** Extract domain → Determine role type → Create specialist → Assign work

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

### Error Handling
**Scenarios:** Domain not recognized, template resolution failed, file creation error, name conflict
**Recovery:** Fallback to generic role, manual creation, alternative naming, error logging

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