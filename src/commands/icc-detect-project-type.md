# Detect Project Type

Analyze project structure to automatically detect project type for intelligent PROJECT-CONTEXT.md template generation.

## Description

This command scans the project directory structure, configuration files, and code patterns to intelligently identify the project type. The detection result is used to generate appropriate PROJECT-CONTEXT.md templates with relevant sections and conventions.

## Usage

```
/icc-detect-project-type
/icc-detect-project-type $ARGUMENTS
```

## Arguments

**Optional:** Project path to analyze
- If no path provided, analyzes current working directory
- If path provided, analyzes that specific directory
- Supports both relative and absolute paths

**Examples:**
- `/icc-detect-project-type` - Analyze current directory
- `/icc-detect-project-type /path/to/project` - Analyze specific project
- `/icc-detect-project-type ../other-project` - Analyze relative path

## Detection Logic

The command analyzes multiple indicators to determine project type:

### Web Application Detection
**Indicators:**
- `package.json` with React, Angular, Vue dependencies
- Frontend build tools (Webpack, Vite, Parcel)
- Component file patterns (`.jsx`, `.vue`, `.angular.ts`)
- CSS frameworks and preprocessors
- SPA routing configurations

### Backend Service Detection
**Indicators:**
- API framework files (Express, FastAPI, Spring Boot)
- Database configuration files
- ORM/ODM patterns (Sequelize, TypeORM, Mongoose)
- Microservice patterns (Docker, Kubernetes configs)
- Authentication and middleware patterns

### Mobile App Detection
**Indicators:**
- React Native project structure
- Flutter `pubspec.yaml`
- Native iOS/Android project files
- Mobile-specific dependencies
- Platform-specific build configurations

### Library/Package Detection
**Indicators:**
- Published package configurations (npm, PyPI, Maven)
- Library build tools and export patterns
- Documentation generation tools
- Testing frameworks for libraries
- Version and release management

### Documentation Site Detection
**Indicators:**
- Static site generators (Jekyll, Hugo, Gatsby)
- Documentation tools (Sphinx, GitBook, Docusaurus)
- Markdown file structure
- Documentation build configurations

### Data/AI Project Detection
**Indicators:**
- Jupyter notebooks (`.ipynb` files)
- Data science libraries (pandas, numpy, scikit-learn)
- ML frameworks (TensorFlow, PyTorch, Keras)
- Data processing pipelines
- Model training and deployment configs

### DevOps/Infrastructure Detection
**Indicators:**
- Infrastructure as Code (Terraform, CloudFormation)
- Container orchestration (Docker, Kubernetes)
- CI/CD pipeline configurations
- Monitoring and logging setups
- Cloud platform configurations

### Game/Engine Detection
**Indicators:**
- Game engine project files (Unity, Unreal)
- Game-specific asset directories
- Shader and graphics pipeline files
- Game development frameworks
- Platform-specific build targets

### Enterprise System Detection
**Indicators:**
- Complex multi-service architectures
- Enterprise frameworks (Spring, .NET Enterprise)
- Business logic and domain modeling
- Integration patterns and message queues
- Enterprise security configurations

## Analysis Output

Returns structured detection results:

```yaml
detected_type: "web_application"
confidence: "high"  # high, medium, low
primary_technologies:
  - "React 18.2.0"
  - "TypeScript 4.9.5"
  - "Express 4.18.2"
secondary_technologies:
  - "Jest"
  - "Cypress"
  - "ESLint"
architecture_patterns:
  - "SPA (Single Page Application)"
  - "RESTful API"
  - "Component-based architecture"
detected_conventions:
  - "TypeScript strict mode"
  - "ESLint + Prettier formatting"
  - "Jest unit testing"
template_recommendations:
  - "Include React component conventions"
  - "Add TypeScript configuration guidance"
  - "Include API design patterns"
```

## Behavioral Integration

### Memory Storage
- Store detection results as `ProjectTypeDetection-[ProjectName]` entity
- Link to project path and analysis timestamp
- Include confidence levels and detected patterns

### Template Selection
- Use detection results to select appropriate template
- Customize template sections based on technologies
- Include relevant architecture patterns and conventions

### Fallback Handling
- If confidence is low, combine multiple type patterns
- For unknown projects, use comprehensive generic template
- Allow manual override of detection results

## Success Feedback

```
🔍 Analyzing project structure...

📁 Project: MyAwesomeApp
📍 Location: /path/to/project

✅ Detection Results:
🎯 Type: Web Application (High Confidence)
⚙️  Primary Tech: React 18, TypeScript, Express
🏗️  Architecture: SPA + RESTful API
📋 Conventions: TypeScript strict, Jest testing

💡 Recommended template: Web Application with React patterns
```

## Error Handling

- **Access Denied:** Request proper directory permissions
- **Empty Directory:** Use generic template with guidance
- **Conflicting Indicators:** Combine relevant patterns
- **Unknown Technology:** Fall back to generic detection

## Integration Points

- Used by `/icc-load-context` for auto-creation
- Results feed into `/icc-create-project-template`
- Detection stored in memory for reuse
- Supports project type validation and updates

This command enables intelligent PROJECT-CONTEXT.md template generation based on actual project characteristics rather than generic templates.