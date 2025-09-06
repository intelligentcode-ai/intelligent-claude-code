# Agent Architecture Overview

The intelligent-claude-code system implements a **hybrid agent architecture** that combines:

1. **14 Core Generic Agents**: Handle any work via context specialization
2. **Dynamic Specialization**: Achieved through PRB context, not separate files
3. **Unlimited Domain Coverage**: Any technology via specialized PRB content
4. **Claude Code Native Integration**: Full compatibility with Claude Code Subagents

## Dynamic Specialization System

### How Specialization Works

Instead of creating separate specialist agent files, the system achieves unlimited specialization through **PRB context injection**:

```yaml
# PRB Example with React Specialization
complete_context:
  specialization: |
    You are acting as React Developer with 10+ years experience.
    You are expert in:
    - React 18+ with hooks and modern patterns
    - TypeScript integration and type safety
    - State management with Redux Toolkit
    - Component architecture and reusability
    - Performance optimization and code splitting
```

When the **developer.md** agent receives this PRB, it fully embodies the React specialist expertise.

### Universal Domain Coverage

This approach enables specialization in **ANY** technology domain:

- **Frontend**: React, Vue, Angular, Svelte, TypeScript, JavaScript
- **Backend**: Node.js, Python, Java, Go, Rust, C#, PHP
- **Mobile**: React Native, Flutter, iOS (Swift), Android (Kotlin)
- **Cloud**: AWS, Azure, GCP, multi-cloud architectures
- **Database**: PostgreSQL, MongoDB, Redis, Elasticsearch, Cassandra
- **AI/ML**: TensorFlow, PyTorch, scikit-learn, Hugging Face
- **DevOps**: Docker, Kubernetes, Jenkins, GitHub Actions, Terraform
- **And ANY emerging technology via PRB context**

### PM + Architect Dynamic Creation Process

The @PM and specialist architects determine when specialization is needed:

1. **Work Analysis**: PM analyzes work requirements and technology stack
2. **Capability Matching**: Compare to 14 core agents (≥70% = use core, <70% = specialize)
3. **Specialization Decision**: PM + Domain Architect collaborate on specialization needs
4. **PRB Generation**: Create PRB with embedded specialization context
5. **Agent Execution**: Core agent receives PRB and operates as specialist

### Examples of Dynamic Specialization

```markdown
## React Frontend Project
PM Analysis: "This requires React expertise with Redux, TypeScript, and modern hooks"
Decision: <70% match with core developer → Create React specialization
PRB Context: "Act as React Developer with 10+ years experience..."
Execution: developer.md agent becomes React specialist for this PRB

## AWS Infrastructure Project  
PM Analysis: "This requires AWS expertise with EKS, RDS, and CloudFormation"
Decision: <70% match with core system-engineer → Create AWS specialization
PRB Context: "Act as AWS Solutions Architect with deep infrastructure expertise..."
Execution: system-engineer.md agent becomes AWS specialist for this PRB

## Machine Learning Project
PM Analysis: "This requires ML expertise with PyTorch, computer vision, and model deployment"
Decision: <70% match with core ai-engineer → Create ML specialization
PRB Context: "Act as Machine Learning Engineer with computer vision expertise..."
Execution: ai-engineer.md agent becomes ML specialist for this PRB
```

---

*Dynamic specialization architecture for unlimited technology domain coverage*