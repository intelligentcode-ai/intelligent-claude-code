# AgentTask Templates Guide

## Overview

AgentTask templates are the backbone of the intelligent-claude-code system. They define how work is structured, what context is included, and how specialists execute tasks. The system automatically selects the right template based on complexity from the mandatory agenttask-templates/ hierarchy.

**Key Enhancement from STORY-008**: All templates now have mandatory usage enforcement with complete placeholder resolution at generation time, ensuring self-contained execution without runtime config dependencies.

## Template Validation and Enforcement

### Mandatory Template Usage (STORY-008 Enhancement)

**CRITICAL RULE**: ALL AgentTask creation MUST use templates from agenttask-templates/ with complete placeholder resolution.

**Template Enforcement Rules**:
1. **Template Source Enforcement**: Only templates from agenttask-templates/ hierarchy allowed
2. **Placeholder Resolution**: ALL placeholders must be resolved at generation time
3. **Config Embedding**: Complete configuration embedded in AgentTask, no runtime lookups
4. **Manual Creation Blocking**: Immediate blocking of any manual AgentTask creation attempts
5. **Template Completeness**: All mandatory template sections required

**Blocked Patterns**:
- ❌ Manual AgentTask creation without templates
- ❌ Unresolved placeholders like `[FROM_CONFIG]` in final AgentTasks  
- ❌ Runtime config lookups during execution
- ❌ Invalid template sources outside agenttask-templates/
- ❌ Missing mandatory template sections

**Template Resolution Process**:
```yaml
# Template BEFORE resolution (BLOCKED):
git_privacy: "[FROM_CONFIG]"
branch_protection: "[FROM_CONFIG]"

# Template AFTER resolution (REQUIRED):
git_privacy: <ACTUAL_VALUE_FROM_CONFIG_HIERARCHY>
branch_protection: <ACTUAL_VALUE_FROM_CONFIG_HIERARCHY>
default_branch: <ACTUAL_VALUE_FROM_CONFIG_HIERARCHY>
```

## Template Types by Complexity

### 🔵 Nano AgentTask (Score: 0-2)
**For:** Trivial one-line changes, config updates, typo fixes
**File:** `nano-agenttask-template.yaml`
**Execution Process:** 4 steps (Knowledge → Implementation → Git Commit → Git Push)

**When used:**
- Change a single value
- Fix a typo
- Update a version number
- Rename a variable

**Structure:**
```yaml
id: NANO-[AUTO]
type: nano-prb
title: "[ROLE] [DESCRIPTION]"
complete_context:
  # Complete configuration embedded at generation time
  project_root: <ACTUAL_PROJECT_ROOT_PATH>
  configuration:
    git_privacy: <ACTUAL_VALUE>
    branch_protection: <ACTUAL_VALUE>
change:
  file: "[PATH]"
  find: "[EXACT_TEXT]"
  replace: "[NEW_TEXT]"
validation: "[HOW_TO_VERIFY]"
```

**Example tasks:**
- "Change API timeout from 30s to 60s"
- "Fix typo in README"
- "Update package version to 2.0.1"

### 🟢 Tiny AgentTask (Score: 3-5)
**For:** Simple single-file changes, small features
**File:** `tiny-agenttask-template.yaml`
**Execution Process:** 7 steps (Knowledge → Implementation → Review → Version → Documentation → Git Commit → Git Push)

**When used:**
- Add a simple function
- Modify a single component
- Add basic validation
- Simple bug fixes

**Structure:**
```yaml
id: TINY-[AUTO]
type: tiny-prb
title: "[ROLE] [DESCRIPTION]"
context:
  file: "[TARGET_FILE]"
  purpose: "[WHAT_AND_WHY]"
implementation:
  approach: "[HOW]"
  code_sample: "[EXAMPLE]"
validation:
  tests: "[TEST_APPROACH]"
  success_criteria: "[CRITERIA]"
```

**Example tasks:**
- "Add email validation to signup form"
- "Fix null pointer in user service"
- "Add logging to payment processor"

### 🟡 Medium AgentTask (Score: 6-15)
**For:** Standard features, multi-file changes
**File:** `medium-agenttask-template.yaml`
**Execution Process:** 9 steps (Branch → Knowledge → Implementation → Review → Version → Documentation → Git Commit → Git Push → PR)

**When used:**
- New API endpoints
- Feature implementations
- Integration work
- Complex bug fixes

**Key features:**
- Embedded learnings from memory/ (2-3 entries max)
- Code pattern references with existing implementations
- Pre-assigned SME reviewer through agent system
- Complete context embedding with no runtime config lookups
- Direct @Agent execution through Task tool subagent creation

**Structure includes:**
- Full context with project settings
- Embedded relevant memories (2-3 entries max)
- Execution plan with steps
- Validation criteria
- Git operations

**Example tasks:**
- "Implement user authentication with JWT"
- "Add pagination to API endpoints"
- "Integrate with Stripe payment system"

### 🟠 Large AgentTask (Score: 16-30)
**For:** Complex features requiring coordination
**File:** `large-agenttask-template.yaml`

**When used:**
- Features spanning many files
- Architectural changes
- Complex integrations
- Performance overhauls

**Key features:**
- Sub-AgentTask generation
- Multiple specialist coordination
- Dependency tracking
- Phased execution

**Structure includes:**
- Problem decomposition
- Sub-AgentTask references
- Coordination points
- Integration testing

**Example tasks:**
- "Implement real-time notifications system"
- "Refactor authentication to OAuth2"
- "Add multi-tenant support"

### 🔴 Mega AgentTask (Score: 30+)
**For:** System-wide changes, major refactors
**File:** `mega-agenttask-template.yaml`

**When used:**
- Architecture migrations
- Framework upgrades
- System-wide refactors
- Major feature suites

**Key features:**
- Epic-level coordination
- Multiple Large AgentTasks
- Cross-team coordination
- Rollback planning

**Example tasks:**
- "Migrate from monolith to microservices"
- "Upgrade from React 17 to 18"
- "Implement GDPR compliance system-wide"

## How Complexity is Calculated

The system analyzes:

1. **File Impact** (0-10 points)
   - 1 file: 0 points
   - 2-5 files: 2 points
   - 6-10 files: 5 points
   - 10+ files: 10 points

2. **Code Volume** (0-10 points)
   - <50 lines: 0 points
   - 50-200 lines: 3 points
   - 200-500 lines: 6 points
   - 500+ lines: 10 points

3. **External Integrations** (0-5 points)
   - No external: 0 points
   - One service: 2 points
   - Multiple services: 5 points

4. **Security Implications** (0-3 points)
   - None: 0 points
   - Auth-related: 2 points
   - Critical security: 3 points

5. **Coordination Required** (0-2 points)
   - Single role: 0 points
   - Multiple roles: 2 points

**Total Score → Template:**
- 0-2: Nano
- 3-5: Tiny
- 6-15: Medium
- 16-30: Large
- 30+: Mega

## Customizing AgentTask Templates

### 1. Project-Level Customization (CLAUDE.md)

Configure how AgentTasks are generated for YOUR project:

```yaml
# CLAUDE.md
agenttask_configuration:
  # Where to find your custom AgentTask templates
  custom_template_paths:
    - "agenttask-templates/"              # Your custom AgentTask templates
    - "engineering/agenttask-templates/"  # Team-specific templates
    
  # Where to find your standards
  best_practices_paths:
    - "docs/standards/"
    
  # What code to search
  code_pattern_search:
    enabled: true
    paths: ["src/", "lib/", "app/"]
    exclude: ["test/", "build/"]
    
  # How to behave
  behavioral_overrides:
    error_handling: "defensive"      # or "fail-fast", "resilient"
    testing_approach: "tdd"          # or "bdd", "integration-first"
    review_style: "thorough"         # or "quick", "balanced"
    validation_strictness: "high"    # or "medium", "low"
    
  # External documentation
  external_docs:
    - name: "Our API Standards"
      url: "https://docs.company.com/api"
    - name: "Security Guidelines"
      path: "docs/security.md"
```

### 2. Template Override Structure

Create custom templates in your project (NOT in `.claude/`):

```yaml
# agenttask-templates/medium-agenttask-template.yaml
# Place in your project root or any project directory
# This overrides the default medium template

# Add your company-specific sections
company_standards:
  compliance:
    - "HIPAA requirements for health data"
    - "SOC2 audit trail requirements"
  
  performance:
    - "All APIs must respond < 200ms"
    - "Database queries must use indexes"
    
# Modify existing sections
validation_criteria:
  # Your specific validation needs
  security_scan: true
  performance_test: true
  accessibility_check: true
```

### 3. Domain-Specific Templates

Create specialized templates in your project directories:

```yaml
# agenttask-templates/api-endpoint-agenttask.yaml
# or engineering/agenttask-templates/api-endpoint-agenttask.yaml
# or wherever makes sense in YOUR project structure

id: "API-[AUTO]"
type: api-endpoint-agenttask
extends: medium-agenttask  # Build on existing template

# API-specific sections
api_design:
  method: "[GET|POST|PUT|DELETE]"
  path: "/api/v1/[resource]"
  auth: "[auth_type]"
  
request_schema:
  # OpenAPI schema
  
response_schema:
  # Expected responses
  
rate_limiting:
  requests_per_minute: 100
```

### 4. Workflow Integration

AgentTasks adapt to your workflow:

#### For Agile Teams
```yaml
agenttask_configuration:
  workflow_integration:
    ticket_system: "jira"
    ticket_prefix: "PROJ-"
    require_ticket: true
    
  definition_of_done:
    - "Code reviewed"
    - "Tests passing"
    - "Documentation updated"
    - "Deployed to staging"
```

#### For GitFlow
```yaml
agenttask_configuration:
  git_workflow:
    feature_branch_prefix: "feature/"
    hotfix_branch_prefix: "hotfix/"
    require_pr: true
    protect_main: true
```

#### For Continuous Deployment
```yaml
agenttask_configuration:
  deployment:
    auto_deploy: true
    environments: ["dev", "staging", "prod"]
    rollback_plan: required
```

## Advanced Customization

### 1. Conditional Sections

AgentTask templates can include conditional sections:

```yaml
# In any AgentTask template
{% if project.type == "microservice" %}
service_boundaries:
  api_contract: "[define_here]"
  dependencies: "[list_services]"
{% endif %}

{% if security_critical %}
security_review:
  threat_model: required
  penetration_test: required
{% endif %}
```

### 2. Dynamic Content Injection

AgentTasks automatically inject:
- Recent learnings from `memory/`
- Existing code patterns
- Project best practices
- External documentation

Control what gets injected:

```yaml
agenttask_configuration:
  content_injection:
    max_memory_entries: 3      # Token efficiency
    max_code_examples: 2       # Relevant examples
    include_test_examples: true
    embed_full_standards: false # Reference instead
```

### 3. Role-Specific Customization

Different roles can have different AgentTask structures:

```yaml
# For @Security-Engineer
security_prb_overrides:
  always_include:
    - threat_model
    - vulnerability_assessment
    - compliance_check
    
# For @AI-Engineer  
ai_prb_overrides:
  always_include:
    - model_selection
    - training_data_requirements
    - evaluation_metrics
```

## Best Practices for AgentTask Customization

### DO:
- ✅ Keep templates focused and concise
- ✅ Include project-specific standards
- ✅ Reference existing code patterns
- ✅ Make validation criteria explicit
- ✅ Use conditional sections sparingly

### DON'T:
- ❌ Override core AgentTask structure
- ❌ Make templates too rigid
- ❌ Include sensitive information
- ❌ Create too many custom templates
- ❌ Duplicate standard sections

## Examples of Well-Customized AgentTasks

### Example 1: API-First Company
```yaml
agenttask_configuration:
  api_first:
    require_openapi_spec: true
    api_design_review: mandatory
    postman_collection: auto-generate
    
  standard_endpoints:
    health_check: "/health"
    metrics: "/metrics"
    version: "/version"
```

### Example 2: High-Security Environment
```yaml
agenttask_configuration:
  security_first:
    code_review_required: true
    security_review_required: true
    automated_scanning: true
    
  forbidden_patterns:
    - "eval("
    - "exec("
    - "hardcoded_password"
```

### Example 3: Startup (Move Fast)
```yaml
agenttask_configuration:
  startup_mode:
    mvp_first: true
    perfect_later: true
    ship_daily: true
    
  shortcuts_allowed:
    - "TODO comments for non-critical"
    - "Basic error handling acceptable"
    - "Optimize in v2"
```

## Troubleshooting AgentTask Templates

### "AgentTask too large"
- Reduce embedded content
- Reference instead of embed
- Split into sub-AgentTasks

### "Missing context"
- Check best_practices_paths
- Ensure memory/ is populated
- Verify code_pattern_search paths

### "Wrong template selected"
- Review complexity scoring
- Use explicit template override
- Adjust scoring weights

---

## Agent System Integration (STORY-007 Enhancement)

### 14-Role Virtual Team Execution

All AgentTask templates now integrate with the 14-role virtual team system:

**Core Roles Available:**
- @PM, @Architect, @Developer, @System-Engineer, @DevOps-Engineer
- @Database-Engineer, @Security-Engineer, @AI-Engineer, @Web-Designer
- @QA-Engineer, @Backend-Tester, @Requirements-Engineer, @User-Role

**Dynamic Specialist Creation:**
- **Unlimited Technology Coverage**: ANY domain (@React-Developer, @AWS-Engineer, @Kubernetes-DevOps-Engineer)
- **Technology-Driven Creation**: ALWAYS when technology expertise needed for optimal execution  
- **PM + Architect Collaboration**: Dynamic specialists created through behavioral patterns
- **Storage Location**: Created specialists stored in .claude/agents/dynamic/
- **10+ Years Expertise**: All specialists created with senior-level domain expertise

**Template Integration Features:**
```yaml
# Embedded in all AgentTask templates
specialization_context:
  technology_domains: <DETECTED_FROM_PROJECT>
  specialist_creation: "ALWAYS create specialists when technology expertise is needed"
  unlimited_domains: "Support ANY technology domain through dynamic specialist creation"
  role_assignment: "PM + Specialist Architect determine when specialists should be created"
```

### Execution Through @Agent Communication

**Natural Communication Pattern:**
- User: "@Developer implement authentication API"
- System: Creates Medium AgentTask with embedded context
- Task tool: Creates @Developer subagent with complete AgentTask context
- Subagent: Executes 9-step process autonomously
- Result: Complete implementation with learning capture

**Behavioral Pattern Integration:**
- All templates include embedded behavioral patterns
- Context preservation across agent interactions
- Automatic learning capture and memory storage
- Evidence-based completion verification

---

Remember: AgentTask templates are meant to adapt to YOUR workflow, not the other way around. Start with defaults, then customize based on what your team needs. The agent system provides unlimited specialist coverage for any technology domain while maintaining consistent behavioral patterns.
