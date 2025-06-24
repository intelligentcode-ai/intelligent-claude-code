# Meta-Persona Interaction Flows

## Visual System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Request                              │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Request Analyzer                               │
│  • Extract signals     • Assess complexity    • Check patterns   │
└─────────────────────┬──────────────────┬────────────────────────┘
                      │                  │
         ┌────────────┴───────┐    ┌────┴────────────┐
         │ Complex/Multi-step │    │ Simple/Focused  │
         └────────────┬───────┘    └────┬────────────┘
                      │                  │
                      ▼                  ▼
┌─────────────────────────────┐  ┌──────────────────────┐
│    Meta-Persona Router      │  │  Direct Persona Route │
└──────────┬──────────────────┘  └──────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────────────────────┐
│                        Meta-Personas                              │
│                                                                   │
│  ┌────────────────────┐  ┌─────────────────┐  ┌───────────────┐ │
│  │Strategic Coordinator│  │Technical Executor│  │Quality Guardian│ │
│  │                    │  │                  │  │                │ │
│  │ • Architecture     │  │ • Backend Eng    │  │ • Tester      │ │
│  │ • Project Manager  │  │ • Frontend Eng   │  │ • UI Designer │ │
│  │ • Doc Architect    │  │ • Infrastructure │  │ • Teaching    │ │
│  │ • Reviewer         │  │ • Kubernetes     │  │ • Doc Arch    │ │
│  │                    │  │ • Security       │  │ • Reviewer    │ │
│  │                    │  │ • Performance    │  │                │ │
│  │                    │  │ • Rapid Proto    │  │                │ │
│  └────────────────────┘  └─────────────────┘  └───────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

## Detailed Interaction Examples

### 1. Complex Feature Implementation Flow

```
User: "Implement a real-time notification system with websockets"
                            │
                            ▼
                    [Request Analyzer]
                    Complexity Score: 8
                    Personas Needed: 5+
                    Type: Multi-component
                            │
                            ▼
                [Strategic Coordinator Activated]
                            │
    ┌───────────────────────┼───────────────────────┐
    ▼                       ▼                       ▼
[Architecture Mode]   [Project Manager]      [Doc Architect]
"Design system"       "Create tasks"         "Plan docs"
    │                       │                       │
    └───────────────────────┴───────────────────────┘
                            │
                            ▼
                [Technical Executor Activated]
                            │
    ┌───────────────┬───────┴───────┬───────────────┐
    ▼               ▼               ▼               ▼
[Backend Eng]   [Frontend Eng]  [Infra Expert]  [Security]
"WebSocket API" "Client lib"    "Redis pubsub"  "Auth check"
    │               │               │               │
    └───────────────┴───────────────┴───────────────┘
                            │
                            ▼
                 [Quality Guardian Activated]
                            │
    ┌───────────────────────┼───────────────────────┐
    ▼                       ▼                       ▼
[Tester]              [UI Designer]          [Doc Architect]
"Test suite"          "UI patterns"          "User guide"
    │                       │                       │
    └───────────────────────┴───────────────────────┘
                            │
                            ▼
                    [Synthesized Result]
                 Complete implementation with:
                 - Architecture diagrams
                 - Working code
                 - Test coverage
                 - Documentation
```

### 2. Direct Persona Access Flow

```
User: "@backend optimize this database query for performance"
                            │
                            ▼
                    [Request Analyzer]
                    Explicit Target: backend
                    Skip meta-routing
                            │
                            ▼
                 [Direct Route to Backend Engineer]
                            │
                            ▼
                    [Backend Engineer]
                    Analyzes query
                    Applies optimizations
                    Returns improved query
                            │
                            ▼
                    [Result Delivered]
```

### 3. Context Propagation Example

```
┌─────────────────────────────────────────────────────────────┐
│                    Global Context                            │
│  • Project: E-commerce Platform                              │
│  • Constraints: Must scale to 100k users                     │
│  • Decisions: Using microservices, PostgreSQL               │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Strategic Coordinator Context                   │
│  • Current Strategy: Implement checkout service              │
│  • Delegations: {backend: "API", frontend: "UI"}           │
│  • Discovered: Need queue for order processing              │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ Backend Context │ │Frontend Context │ │ Infra Context   │
│ • API design    │ │ • Components    │ │ • Queue setup   │
│ • DB schema     │ │ • State mgmt    │ │ • Scaling rules │
│ • Auth flow     │ │ • UI patterns   │ │ • Monitoring    │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

### 4. Communication Bus Message Flow

```
[Strategic Coordinator]
        │
        ├──── Message ────►[Architecture Mode]
        │     Type: delegation
        │     Action: analyze_requirements
        │     Context: {task, constraints}
        │
        │◄─── Response ────
        │     Components: [api, ui, db, queue]
        │     Dependencies: {api->db, ui->api}
        │
        ├──── Message ────►[Project Manager]
        │     Type: handoff
        │     Action: create_task_breakdown
        │     Context: {components, timeline}
        │
        │◄─── Response ────
        │     Tasks: [TASK-001, TASK-002, ...]
        │     Schedule: {parallel, sequential}
        │
        └──── Message ────►[Technical Executor]
              Type: delegation
              Action: implement_components
              Context: {tasks, architecture}
```

### 5. Task Routing Decision Tree

```
                        [New Task]
                            │
                ┌───────────┴───────────┐
                │ Explicit persona req? │
                └───────────┬───────────┘
                     No │   │ Yes
                        ▼   └────────► [Direct Route]
                ┌──────────────────┐
                │ Complexity > 5?   │
                └───────┬──────────┘
                  No │  │ Yes
                     ▼  ▼
            ┌──────────────────────┐
            │ Multiple components? │
            └──────┬───────────────┘
              No │ │ Yes
                 ▼ ▼
        ┌───────────────────────┐
        │ Cross-cutting concerns?│
        └──────┬────────────────┘
          No │ │ Yes
             ▼ ▼
    [Simple Task]  [Complex Task]
         │              │
         ▼              ▼
   [Direct Route]  [Meta-Persona Route]
```

### 6. Failure Recovery Flow

```
[Task Execution]
        │
        ├──── Normal Path ────►[Success]
        │
        └──── Exception ────►[Failure Handler]
                                    │
                        ┌───────────┴───────────┐
                        │ Analyze failure type  │
                        └───────────┬───────────┘
                                    │
                ┌───────────────────┼───────────────────┐
                ▼                   ▼                   ▼
        [Retry Strategy]    [Alternative Path]   [Escalation]
        • Same persona      • Different persona  • Meta-persona
        • Modified params   • New approach       • Human help
                │                   │                   │
                └───────────────────┴───────────────────┘
                                    │
                                    ▼
                            [Update Context]
                            • Log failure
                            • Record learnings
                            • Adjust strategy
```

### 7. Project Management Integration

```
[Project Manager Persona]
        │
        ├──── Scan Tasks ────►[tasks/pending/]
        │
        ├──── Analyze ────────►[Complexity Assessment]
        │                              │
        │                      ┌───────┴───────┐
        │                      │ Simple Task   │ Complex Task
        │                      └───────┬───────┘
        │                              │
        ├──── Route ─────────►[Task Router]
        │                              │
        │                      ┌───────┴───────────────┐
        │                      ▼                       ▼
        │                [Direct Persona]      [Meta-Persona]
        │                      │                       │
        ├──── Track ─────────►[_progress.md]
        │                              │
        ├──── Update ────────►[_changes.md]
        │                              │
        └──── Complete ──────►[_implemented.md]
```

## State Management

### Meta-Persona State Machine

```
┌─────────┐      Request      ┌──────────┐
│  IDLE   │──────────────────►│ANALYZING │
└─────────┘                   └────┬─────┘
     ▲                             │
     │                             ▼
     │                        ┌──────────┐
     │                        │PLANNING  │
     │                        └────┬─────┘
     │                             │
     │                             ▼
     │                        ┌──────────┐
     │      Complete          │DELEGATING│
     └────────────────────────┤          │
                              └────┬─────┘
                                   │
                              ┌────┴─────┐
                              │          ▼
                         ┌────────┐  ┌──────────┐
                         │WAITING │  │EXECUTING │
                         └────┬───┘  └────┬─────┘
                              │           │
                              └─────┬─────┘
                                    │
                                    ▼
                              ┌──────────┐
                              │SYNTHESIS │
                              └──────────┘
```

## Performance Considerations

### Parallel Execution Pattern

```
[Technical Executor]
        │
        ├──── Parallel Delegation Pattern
        │
        ├─┬─► [Backend Engineer]    ──► API Implementation
        │ │
        │ ├─► [Frontend Engineer]   ──► UI Components
        │ │
        │ ├─► [Infrastructure]      ──► Service Setup
        │ │
        │ └─► [Security Mindset]    ──► Security Review
        │
        └──── Await All ──────────► [Synthesize Results]
```

### Context Window Management

```
[Context Manager]
        │
        ├──── Rolling Window (10 messages)
        │     Oldest ◄──────────────► Newest
        │     [M1][M2][M3]...[M9][M10]
        │      ↓ (discard)        ↑ (add)
        │
        ├──── Inheritance Depth (3 levels)
        │     Current ◄── Parent ◄── Grandparent
        │
        └──── Memory Optimization
              • Compress old contexts
              • Archive completed tasks
              • Garbage collect orphaned contexts
```

## Integration Points

### External System Hooks

```
[Meta-Persona System]
        │
        ├──── Git Integration
        │     • Branch per task
        │     • Commit with context
        │     • PR generation
        │
        ├──── CI/CD Pipeline
        │     • Trigger on completion
        │     • Quality gates
        │     • Deployment automation
        │
        ├──── Monitoring
        │     • Performance metrics
        │     • Error tracking
        │     • Usage analytics
        │
        └──── External AI Agents
              • API endpoints
              • Webhook callbacks
              • Event streaming
```