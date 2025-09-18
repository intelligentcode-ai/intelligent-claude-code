# Dynamic Specialist Examples

This document demonstrates the dynamic specialist creation system implemented in STORY-007-AgentTask-005.

## Example 1: React Project Requirements

**Scenario**: PM + Architect analyze work requiring React frontend development

**Analysis**:
- **Project Scope**: CODE-BASED SYSTEM with React frontend
- **Work Type**: Component development, state management, performance optimization
- **Core Role Match**: @Developer (40% match), @Web-Designer (30% match)
- **Result**: <70% match detected, requires dynamic specialist

**Creation Process**:
```bash
/icc-create-dynamic-specialist React Developer "Component architecture with hooks and context API"
```

**Generated Specialist**: @React-Developer
- **Location**: `.claude/agents/dynamic/react-developer.md`
- **Expertise**: React 18+, hooks, state management, TypeScript, testing
- **Usage**: Available immediately in AgentTasks and story breakdown

## Example 2: AWS Infrastructure Requirements

**Scenario**: PM + Architect analyze work requiring AWS cloud deployment

**Analysis**:
- **Project Scope**: CODE-BASED SYSTEM requiring cloud infrastructure
- **Work Type**: Serverless deployment, Lambda functions, VPC configuration
- **Core Role Match**: @System-Engineer (50% match), @DevOps-Engineer (60% match)
- **Result**: <70% match detected, requires AWS expertise

**Creation Process**:
```bash
/icc-create-dynamic-specialist AWS Engineer "Serverless architecture with Lambda and API Gateway"
```

**Generated Specialist**: @AWS-Engineer
- **Location**: `.claude/agents/dynamic/aws-engineer.md`
- **Expertise**: Lambda, EC2, S3, VPC, IAM, CloudFormation, serverless patterns
- **Usage**: Handles AWS-specific infrastructure decisions

## Example 3: Machine Learning Requirements

**Scenario**: PM + Architect analyze work requiring ML model implementation

**Analysis**:
- **Project Scope**: HYBRID SYSTEM with ML components
- **Work Type**: Model training, data preprocessing, inference optimization
- **Core Role Match**: @AI-Engineer (45% match), @Developer (35% match)
- **Result**: <70% match detected, requires ML specialist

**Creation Process**:
```bash
/icc-create-dynamic-specialist Machine-Learning Specialist "Deep learning model training and deployment"
```

**Generated Specialist**: @Machine-Learning-Specialist
- **Location**: `.claude/agents/dynamic/machine-learning-specialist.md`
- **Expertise**: TensorFlow, PyTorch, model optimization, MLOps
- **Usage**: Handles ML-specific implementation and architecture

## Integration in AgentTasks

Once created, specialists are used in AgentTasks:

```yaml
## Meta
assigned_to: "@React-Developer"
sme_reviewer: "@React-Architect"

## Requirements
functional:
  - Component refactoring using React specialist expertise
  - State management optimization with React patterns
```

## Universal Domain Coverage

The system supports unlimited domains:

- **Frontend**: @Vue-Developer, @Angular-Developer, @Svelte-Developer
- **Backend**: @Node-Engineer, @Go-Developer, @Rust-Developer  
- **Mobile**: @iOS-Developer, @Android-Developer, @Flutter-Developer
- **Cloud**: @Azure-Engineer, @GCP-Specialist, @DigitalOcean-Engineer
- **Data**: @Kafka-Engineer, @Elasticsearch-Specialist, @Redis-Engineer
- **DevOps**: @Docker-Specialist, @Kubernetes-Engineer, @Ansible-Engineer
- **Security**: @Cybersecurity-Specialist, @Penetration-Tester
- **Databases**: @PostgreSQL-Engineer, @MongoDB-Developer, @Neo4j-Specialist

## Quality Assurance

All dynamic specialists maintain consistent quality:
- **Ultra-experienced**: 10+ years domain expertise
- **Best Practices**: Industry-standard patterns and approaches
- **Security-aware**: Domain-specific security considerations
- **Performance-focused**: Optimization for domain requirements
- **Project-integrated**: Understanding of broader system context