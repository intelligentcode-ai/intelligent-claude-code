# Role Validation Examples

## Real-World Validation Scenarios

This document provides concrete examples of the role validation system in action, showing how different types of requests are processed and validated.

## Frontend Development Examples

### Example 1: React Component Development
```
User Request: "Create a data table component with sorting and filtering"

System Process:
1. Work Detection: Frontend UI component work
2. Technology Detection: React implied (project context)
3. Initial Assignment: @Frontend-Developer
4. Validation Check:
   - React components: ✓ (100%)
   - Data tables: ✓ (100%)
   - Sorting logic: ✓ (90%)
   - Filtering logic: ✓ (90%)
   - Overall Match: 95%
5. Result: Optimal assignment confirmed

Execution:
@Frontend-Developer: "Acknowledged. Creating React data table with:
- Sortable columns
- Filter inputs
- Pagination support
- Responsive design"
```

### Example 2: Complex Animation Work
```
User Request: "Build a 3D carousel with WebGL animations"

System Process:
1. Work Detection: Frontend + specialized animation
2. Technology Detection: WebGL, 3D graphics
3. Initial Assignment: @Frontend-Developer
4. Validation Check:
   - Basic frontend: ✓ (100%)
   - 3D graphics: ⚠ (40%)
   - WebGL: ⚠ (35%)
   - Overall Match: 58%
5. Result: Creating specialist

Specialist Creation:
- Name: @WebGL-Frontend
- Base: Frontend-Developer
- Enhanced: WebGL, Three.js, 3D math
- Knowledge: Context7 WebGL documentation

Execution:
@WebGL-Frontend: "Specialized in 3D web graphics. Creating carousel with:
- Three.js for 3D rendering
- GLSL shaders for effects
- Optimized performance
- Fallback for non-WebGL browsers"
```

## Backend Development Examples

### Example 3: REST API Development
```
User Request: "Create CRUD API for user management"

System Process:
1. Work Detection: Backend API development
2. Technology Detection: REST, CRUD operations
3. Initial Assignment: @Backend-Developer
4. Validation Check:
   - REST APIs: ✓ (100%)
   - CRUD operations: ✓ (100%)
   - User management: ✓ (95%)
   - Overall Match: 98%
5. Result: Optimal assignment confirmed

Execution:
@Backend-Developer: "Creating user management API:
- POST /users (create)
- GET /users (list)
- GET /users/:id (retrieve)
- PUT /users/:id (update)
- DELETE /users/:id (delete)
With proper validation and error handling"
```

### Example 4: GraphQL Specialization
```
User Request: "Implement GraphQL subscriptions for real-time updates"

System Process:
1. Work Detection: Backend + specialized GraphQL
2. Technology Detection: GraphQL, subscriptions, WebSocket
3. Initial Assignment: @Backend-Developer
4. Validation Check:
   - GraphQL basics: ✓ (70%)
   - Subscriptions: ⚠ (45%)
   - WebSocket: ⚠ (60%)
   - Overall Match: 58%
5. Result: Creating specialist

Specialist Creation:
- Name: @GraphQL-Backend
- Base: Backend-Developer
- Enhanced: GraphQL subscriptions, Apollo Server
- Knowledge: Real-time patterns, PubSub

Execution:
@GraphQL-Backend: "Implementing GraphQL subscriptions:
- Apollo Server subscription setup
- PubSub implementation
- WebSocket connection handling
- Subscription resolvers for real-time data"
```

## Infrastructure Examples

### Example 5: Docker Configuration
```
User Request: "Dockerize our Node.js application"

System Process:
1. Work Detection: Infrastructure containerization
2. Technology Detection: Docker, Node.js
3. Initial Assignment: @DevOps-Engineer
4. Validation Check:
   - Docker: ✓ (100%)
   - Node.js deployment: ✓ (90%)
   - Container optimization: ✓ (95%)
   - Overall Match: 95%
5. Result: Optimal assignment confirmed

Execution:
@DevOps-Engineer: "Dockerizing Node.js application:
- Multi-stage Dockerfile for optimization
- Non-root user configuration
- Health checks
- Docker Compose for local development"
```

### Example 6: Kubernetes Specialization
```
User Request: "Deploy microservices to Kubernetes with auto-scaling"

System Process:
1. Work Detection: Infrastructure + orchestration
2. Technology Detection: Kubernetes, microservices
3. Initial Assignment: @DevOps-Engineer
4. Validation Check:
   - Basic Kubernetes: ✓ (75%)
   - Auto-scaling: ⚠ (60%)
   - Microservices patterns: ⚠ (65%)
   - Overall Match: 67%
5. Result: Creating specialist

Specialist Creation:
- Name: @Kubernetes-DevOps
- Base: DevOps-Engineer
- Enhanced: K8s HPA, service mesh, Helm
- Knowledge: Microservices best practices

Execution:
@Kubernetes-DevOps: "Deploying to Kubernetes:
- Deployment manifests for each service
- Horizontal Pod Autoscaler configuration
- Service mesh for inter-service communication
- Helm charts for package management"
```

## Multi-Role Scenarios

### Example 7: Full-Stack Feature
```
User Request: "Build a real-time chat feature with React frontend and Node.js backend"

System Process:
1. Work Detection: Frontend + Backend + Real-time
2. Technology Detection: React, Node.js, WebSocket
3. Role Analysis:
   - Frontend work: React UI
   - Backend work: WebSocket server
   - Integration: Real-time protocols
4. Multi-Role Assignment:
   - @Frontend-Developer (React UI)
   - @Backend-Developer (WebSocket server)
   - Coordination: Parallel execution

Validation Results:
- Frontend match: 92% ✓
- Backend match: 88% ✓
- Parallel execution enabled

Execution:
@Frontend-Developer: "Building React chat UI:
- Message components
- Real-time updates via Socket.io
- Typing indicators
- Message history"

@Backend-Developer: "Creating WebSocket server:
- Socket.io integration
- Message broadcasting
- Room management
- Message persistence"

Both working in parallel with API contract agreed
```

### Example 8: Secure Payment System
```
User Request: "Implement Stripe payment processing with PCI compliance"

System Process:
1. Work Detection: Backend + Security + Payment
2. Technology Detection: Stripe, PCI compliance
3. Role Analysis:
   - Payment integration: Specialized
   - Security compliance: Critical
   - Backend implementation: Required
4. Multi-Role Assignment:
   - Create @Payment-Backend specialist
   - Include @Security-Engineer for compliance

Validation Results:
- Payment expertise needed: Creating specialist
- Security review: Mandatory parallel role

Execution:
@Payment-Backend: "Implementing Stripe integration:
- Stripe SDK setup
- Payment intent creation
- Webhook handling
- Error management"

@Security-Engineer: "Ensuring PCI compliance:
- No card data storage
- Secure token handling
- HTTPS enforcement
- Audit logging"
```

## Edge Cases and Complex Scenarios

### Example 9: Ambiguous Request
```
User Request: "Fix the broken feature"

System Process:
1. Work Detection: Unclear - need more context
2. Analysis: Scanning project context
3. Detection: Recent frontend and backend changes
4. Conservative Assignment: @Developer (generic)
5. Validation Check:
   - Generic troubleshooting: ✓ (80%)
   - Overall Match: 80%
6. Result: Acceptable, will specialize if needed

Execution:
@Developer: "I'll investigate the broken feature. Initial steps:
1. Checking recent commits
2. Running tests
3. Reviewing error logs
Will create specialist once issue type identified"
```

### Example 10: Emerging Technology
```
User Request: "Integrate our app with the new Bun runtime"

System Process:
1. Work Detection: Backend + New technology
2. Technology Detection: Bun (emerging JS runtime)
3. Initial Assignment: @Backend-Developer
4. Validation Check:
   - JavaScript runtime: ✓ (80%)
   - Bun specifically: ⚠ (20%)
   - Overall Match: 50%
5. Result: Creating specialist

Specialist Creation:
- Name: @Bun-Backend
- Base: Backend-Developer
- Enhanced: Bun runtime specifics
- Knowledge: Latest Bun documentation

Execution:
@Bun-Backend: "Integrating with Bun runtime:
- Compatibility assessment
- Performance benchmarking
- Migration strategy
- Bun-specific optimizations"
```

## Validation Decision Tree

```
Request Analysis
    ├─> Clear Technology? 
    │     ├─> Yes -> Check Role Match
    │     │     ├─> >90% -> Use Role
    │     │     ├─> 70-90% -> Use Role + Monitor
    │     │     └─> <70% -> Create Specialist
    │     └─> No -> Use Generic + Clarify
    │
    ├─> Multiple Domains?
    │     ├─> Yes -> Assign Multiple Roles
    │     │     └─> Validate Each Separately
    │     └─> No -> Single Role Path
    │
    └─> Critical Work? (Security/Payment)
          ├─> Yes -> Mandatory Specialist + Review
          └─> No -> Standard Validation
```

## Common Patterns

### Pattern 1: Technology-Specific Specialists
- Trigger: Specific framework/library mentioned
- Example: "React Native", "TensorFlow", "Elasticsearch"
- Result: @[Technology]-[BaseRole] specialist

### Pattern 2: Domain-Specific Specialists
- Trigger: Business domain expertise needed
- Example: "Payment processing", "Authentication", "Analytics"
- Result: @[Domain]-[BaseRole] specialist

### Pattern 3: Multi-Role Coordination
- Trigger: Cross-functional requirements
- Example: "Full-stack feature", "End-to-end testing"
- Result: Multiple parallel roles with PM coordination

### Pattern 4: Progressive Specialization
- Trigger: Evolving requirements
- Example: Start generic, specialize as needed
- Result: Dynamic role evolution during task

## Tips for Users

1. **Be Specific**: Mention technologies for better matches
2. **State Requirements**: Include performance, security needs
3. **Trust the Process**: Let validation optimize assignments
4. **Watch Specialists**: They bring deep expertise
5. **Embrace Parallel**: Multi-role work is efficient

The validation system continuously improves, learning from each assignment to provide better matches over time.