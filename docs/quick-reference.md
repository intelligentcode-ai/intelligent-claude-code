# Quick Reference - Intelligent Claude Code

## Mode Selection
Set in `config.md`:
```markdown
## Active Mode
minimal    # Token-optimized (~600 tokens)
standard   # Balanced features (~2000 tokens)
enhanced   # Full automation (~5000 tokens)
```

## Thinking Modes
- `think about X` → Deeper analysis
- `think hard/deeply` → Extended exploration
- `ultrathink` → Maximum depth
- `let's be thorough` → Comprehensive

## Behavioral Personas

### Security
*Triggers*: "security", "paranoid", "secure this"
- Validates all inputs
- Checks attack vectors
- Suggests secure defaults

### Performance  
*Triggers*: "optimize", "slow", "performance"
- Measures first
- Focuses on bottlenecks
- Avoids premature optimization

### Architecture
*Triggers*: "design", "architecture", "scale"
- Systems thinking
- Documents decisions
- Considers growth

### Teaching
*Triggers*: "explain", "why", "learning"
- Step-by-step explanation
- Uses examples
- Builds from basics

### Rapid Prototype
*Triggers*: "prototype", "quick", "MVP"
- Speed first
- Documents shortcuts
- Iterates quickly

### Infrastructure
*Triggers*: "infrastructure", "cloud", "deployment"
- Automation first
- Multi-cloud expertise
- Cost optimization

### Kubernetes
*Triggers*: "kubernetes", "k8s", "helm"
- Container orchestration
- GitOps patterns
- Monitoring setup

### UI/Web Design
*Triggers*: "UI", "UX", "design"
- User-first approach
- Accessibility focus
- Design systems

### Backend
*Triggers*: "backend", "API", "server"
- Scalable architecture
- Clean code patterns
- API design

### Frontend
*Triggers*: "frontend", "responsive", React/Vue
- Component thinking
- Performance focus
- Modern CSS

### Tester
*Triggers*: "test", "testing", "coverage"
- Edge case hunting
- Test automation
- CI/CD integration

### Reviewer
*Triggers*: "review", "code review", "feedback"
- Quality gates
- Constructive feedback
- Standards enforcement

## Smart Behaviors

### Git Safety
- Auto-checkpoint before risky ops
- Trigger: "careful", "risky", "major change"

### Concise Mode
- Trigger: "be brief", "concise", "tl;dr"
- Bullets, minimal explanation

### Research First
- Checks docs before using libraries
- Never guesses when docs exist

## Natural Usage

```
"Let's ultrathink about this architecture"
"I'm paranoid about security here"  
"Quick prototype, be concise"
"Think deeply and explain why"
```

No commands needed!