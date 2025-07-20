# Create Project Template

Generate intelligent PROJECT-CONTEXT.md template based on detected project type and characteristics.

## Description

This command creates a customized PROJECT-CONTEXT.md template using project type detection results. The template includes relevant sections, pre-populated technology information, and project-specific guidance to help teams maintain consistent context across all work sessions.

## Usage

```
/icc-create-project-template $ARGUMENTS
```

## Arguments

**Format:** "ProjectType | Path: /project/path | Technologies: tech1,tech2"
- **ProjectType:** Detected or specified project type
- **Path:** Target directory for PROJECT-CONTEXT.md creation
- **Technologies:** Comma-separated list of detected technologies

**Examples:**
- `/icc-create-project-template web_application | Path: ./ | Technologies: React,TypeScript,Express`
- `/icc-create-project-template backend_service | Path: /api/project | Technologies: FastAPI,PostgreSQL`
- `/icc-create-project-template mobile_app | Path: ./mobile | Technologies: React Native,Redux`

## Template Generation Logic

### Universal Template Structure
All templates include these core sections:

1. **Project Overview**
   - Project name and purpose
   - Brief description and goals
   - Key stakeholders and team structure

2. **Technology Stack**
   - Primary technologies (auto-populated)
   - Secondary tools and frameworks
   - Version requirements and constraints

3. **Architecture Patterns**
   - Project-type-specific patterns
   - Design principles and guidelines
   - Integration and communication patterns

4. **Development Conventions**
   - Coding standards and style guides
   - File organization and naming
   - Testing requirements and strategies

5. **Team Workflows**
   - Git workflow and branching strategy
   - Code review and approval processes
   - Deployment and release procedures

6. **Project Constraints**
   - Performance requirements
   - Security considerations
   - Business rules and limitations

### Project-Type-Specific Sections

#### Web Application Templates
**Additional Sections:**
- Component architecture and reuse patterns
- State management conventions (Redux, Context API)
- API design and integration patterns
- Frontend build and optimization strategies
- SEO and accessibility requirements

#### Backend Service Templates
**Additional Sections:**
- API design principles (REST, GraphQL)
- Database schema and migration strategies
- Authentication and authorization patterns
- Microservice communication patterns
- Monitoring and logging requirements

#### Mobile App Templates
**Additional Sections:**
- Platform-specific conventions (iOS/Android)
- Navigation and user experience patterns
- Device capabilities and permissions
- App store deployment requirements
- Performance optimization strategies

#### Library/Package Templates
**Additional Sections:**
- Public API design and versioning
- Documentation generation and maintenance
- Testing strategies for library code
- Package distribution and publishing
- Backward compatibility requirements

#### Data/AI Project Templates
**Additional Sections:**
- Data pipeline and processing patterns
- Model training and evaluation strategies
- Experiment tracking and reproducibility
- Data governance and privacy requirements
- Model deployment and monitoring

### Smart Population Features

#### Technology Detection Integration
- Extract dependencies from `package.json`, `requirements.txt`
- Identify framework versions and configurations
- Detect testing and build tool configurations
- Parse CI/CD and deployment setups

#### Convention Inference
- Infer coding standards from existing code patterns
- Detect linting and formatting configurations
- Identify testing patterns and frameworks
- Extract database and API design patterns

#### Guidance Generation
- Provide project-type-specific best practices
- Include relevant architecture decision guidance
- Add technology-specific optimization tips
- Suggest team workflow improvements

## Template Content Examples

### Web Application Template Excerpt
```markdown
# PROJECT-CONTEXT.md

## Project Overview
<!-- [TODO: Add project name and description] -->
**Project Name:** [Your Project Name]
**Type:** Web Application
**Primary Goal:** [Describe main project objective]

## Technology Stack
**Frontend:** React 18.2.0, TypeScript 4.9.5
**Backend:** Express 4.18.2, Node.js 18.x
**Database:** [TODO: Specify database]
**Testing:** Jest, Cypress (detected)
**Build Tools:** Webpack, ESLint, Prettier (detected)

## Architecture Patterns
- **SPA (Single Page Application):** Client-side routing and state management
- **Component-Based Architecture:** Reusable UI components with props/state
- **RESTful API Design:** Resource-based endpoints with standard HTTP methods
- **Separation of Concerns:** Clear boundaries between frontend, backend, and data layers

## Development Conventions
### React Component Standards
- Use functional components with hooks
- Follow component naming: PascalCase for components, camelCase for files
- Implement PropTypes or TypeScript interfaces for type safety
- Keep components focused and single-responsibility

### API Design Guidelines
- RESTful resource naming (nouns, not verbs)
- Consistent error response format
- Authentication via JWT tokens
- Request/response validation middleware

<!-- [TODO: Complete remaining sections with project-specific details] -->
```

### Backend Service Template Excerpt
```markdown
# PROJECT-CONTEXT.md

## Project Overview
**Project Name:** [Your API Service Name]
**Type:** Backend Service
**Primary Goal:** [Describe service purpose and scope]

## Technology Stack
**Framework:** FastAPI 0.95.0 (detected)
**Database:** PostgreSQL with SQLAlchemy ORM (detected)
**Authentication:** JWT with OAuth2 patterns
**Testing:** Pytest, Postman/Newman (detected)
**Deployment:** Docker containers (detected)

## Architecture Patterns
- **Microservice Architecture:** Independent service with clear boundaries
- **Layered Architecture:** Controller → Service → Repository pattern
- **Database-First Design:** Schema-driven development with migrations
- **Event-Driven Communication:** Async messaging for service integration

## API Design Conventions
### RESTful Standards
- Resource-based URLs: `/api/v1/users/{id}`
- Standard HTTP methods: GET, POST, PUT, DELETE
- Consistent response formats with status codes
- Pagination for collection endpoints

### Database Patterns
- Single responsibility per table
- Foreign key constraints and indexing
- Migration scripts for schema changes
- Connection pooling and transaction management

<!-- [TODO: Add service-specific business logic and integration patterns] -->
```

## Behavior Flow

1. **Parse Arguments**
   - Extract project type, path, and technologies
   - Validate project type against supported templates
   - Ensure target directory is accessible

2. **Load Template Base**
   - Select appropriate template for project type
   - Load universal sections and type-specific sections
   - Prepare placeholder replacement patterns

3. **Populate Smart Defaults**
   - Insert detected technologies and versions
   - Add relevant architecture patterns
   - Include appropriate convention guidelines
   - Generate customization instructions

4. **Create File**
   - Write template to PROJECT-CONTEXT.md in target path
   - Ensure proper markdown formatting
   - Add creation timestamp and instructions

5. **Provide Guidance**
   - Display sections requiring customization
   - Highlight technology-specific areas to complete
   - Suggest next steps for team adoption

## Success Feedback

```
📝 Creating PROJECT-CONTEXT.md template...

✅ Template Generated Successfully!

📁 Location: ./PROJECT-CONTEXT.md
🎯 Type: Web Application
⚙️  Technologies: React, TypeScript, Express
📋 Sections: 6 core + 3 web-specific

🔧 Next Steps:
   1. Review and customize [TODO] sections
   2. Add project-specific constraints
   3. Define team-specific conventions
   4. Share with team for validation

💡 Tip: Use `/icc-validate-context` to check completeness
```

## Error Handling

- **Invalid Project Type:** Use generic template with comprehensive sections
- **Missing Technologies:** Create template with placeholder guidance
- **File Exists:** Prompt for overwrite confirmation or backup creation
- **Access Denied:** Request proper directory permissions
- **Template Load Failure:** Fall back to minimal template generation

## Integration Points

- Called by `/icc-load-context` during auto-creation
- Uses results from `/icc-detect-project-type`
- Integrates with memory system for project tracking
- Supports validation via `/icc-validate-context`

## Template Quality Standards

All generated templates ensure:
- **Completeness:** All essential sections included
- **Relevance:** Project-type-specific patterns and guidance
- **Actionability:** Clear TODO items and completion guidance
- **Maintainability:** Structured format for easy updates
- **Team Alignment:** Consistent conventions across all roles

This command transforms project analysis into actionable context documentation that guides the entire virtual team throughout the project lifecycle.