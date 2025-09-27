# Infrastructure Memory Patterns

**MANDATORY:** Prevent infrastructure knowledge loss through persistent memory patterns.

## Core Problem

**INFRASTRUCTURE AMNESIA:** Constant forgetting of jump-host usage, credential locations, network topology, and access patterns leads to:
- Repetitive questions about access methods
- Lost productivity through repeated discovery
- Inconsistent infrastructure usage
- Security pattern violations

## Infrastructure Memory Categories

### Network Access Patterns
**STORE ONCE, USE FOREVER:**
- **Jump-host patterns**: SSH bastion usage, port forwarding methods, tunnel configurations
- **Network topology**: Service discovery, internal routing, security zones
- **Connection methods**: VPN usage, direct access patterns, proxy configurations
- **Load balancer patterns**: Service endpoint discovery, health check methods

### Authentication & Authorization
**SECURE STORAGE OF ACCESS METHODS:**
- **Credential locations**: Where tokens/keys are stored (not the values)
- **Authentication flows**: OAuth patterns, SSO integration, service account usage
- **Environment variables**: Standard patterns like $GITHUB_PAT, $AWS_PROFILE
- **Configuration files**: ~/.aws/credentials, ~/.config/git/common.conf patterns

### Service Integration Patterns
**OPERATIONAL KNOWLEDGE RETENTION:**
- **API access patterns**: Service discovery, endpoint formats, authentication methods
- **Database connections**: Connection string patterns, credential management
- **Container orchestration**: Pod access, service mesh patterns, debugging methods
- **Monitoring integration**: Log access, metrics collection, alerting patterns

### Deployment & Operations
**PROCESS MEMORY PRESERVATION:**
- **CI/CD patterns**: Pipeline access, deployment triggers, rollback procedures
- **Infrastructure as Code**: Terraform patterns, CloudFormation usage, state management
- **Backup & recovery**: Data protection patterns, disaster recovery procedures
- **Scaling patterns**: Auto-scaling configuration, manual scaling procedures

## Memory Storage Patterns

### Safe Infrastructure Storage
**STORE METHODS, NOT SECRETS:**
```markdown
## Jump-host Access Pattern
**Context**: Production environment access
**Method**: SSH through bastion-01.company.com
**Pattern**: ssh -J bastion-01.company.com target-server.internal
**Notes**: Requires VPN connection first, uses ~/.ssh/company_key
```

### Connection Workflow Storage
**COMPLETE ACCESS PROCEDURES:**
```markdown
## AWS Environment Access
**Context**: Multi-account AWS setup
**Workflow**: 
1. Set AWS_PROFILE=production
2. aws sso login --profile production
3. Verify: aws sts get-caller-identity
**Troubleshooting**: If SSO expired, run aws sso logout first
```

### Tool Configuration Patterns
**WORKING CONFIGURATIONS:**
```markdown
## kubectl Configuration
**Context**: Kubernetes cluster access
**Method**: kubectl config use-context production-cluster
**Verification**: kubectl cluster-info
**Common Issues**: Context not found = check ~/.kube/config
```

## Proactive Infrastructure Memory

### Auto-Capture Infrastructure Patterns
**STORE DURING DISCOVERY:**
- First-time access procedures
- Troubleshooting solutions that worked
- Configuration discoveries
- Network topology learnings

### Infrastructure Question Detection
**TRIGGER MEMORY SEARCH FOR:**
- "How do I access [service]?"
- "Where is [configuration]?"
- "What's the [endpoint/URL]?"
- "How to connect to [environment]?"
- "Where are [credentials/keys]?"

### Infrastructure Problem Prevention
**COMMON PATTERN STORAGE:**
- Connection timeout solutions
- Authentication failure resolutions
- Network access troubleshooting
- Service discovery methods

## Memory-First Infrastructure Support

### Before Infrastructure Questions
**MANDATORY MEMORY SEARCH:**
1. Parse infrastructure request
2. Search memory/infrastructure/ topics
3. Search memory/authentication/ patterns
4. Search memory/networking/ configurations
5. Apply found patterns or escalate

### Infrastructure Memory Topics
**ORGANIZED STORAGE:**
- **memory/infrastructure/access-patterns.md**: Connection methods and procedures
- **memory/infrastructure/authentication.md**: Auth flow patterns and credential locations
- **memory/infrastructure/networking.md**: Network topology and routing patterns
- **memory/infrastructure/services.md**: Service discovery and integration patterns
- **memory/infrastructure/troubleshooting.md**: Common problems and solutions

## Security-Aware Infrastructure Memory

### Safe Pattern Storage
**SECURITY GUIDELINES:**
- Store access methods, not credentials
- Store connection patterns, not passwords
- Store configuration locations, not secret values
- Store troubleshooting approaches, not sensitive details

### Infrastructure Learning Validation
**BEFORE STORING:**
☐ Contains no actual credentials or secrets
☐ Describes methods/locations, not values
☐ Helps locate credentials safely
☐ Prevents security anti-patterns

## Infrastructure Memory Application

### Automatic Pattern Application
**WHEN USER ASKS INFRASTRUCTURE QUESTIONS:**
1. **Search Memory**: Check for existing patterns first
2. **Apply Patterns**: Use stored procedures and methods
3. **Update Patterns**: Store new discoveries or corrections
4. **Prevent Repetition**: Avoid asking for known information

### Infrastructure Knowledge Gaps
**WHEN MEMORY INSUFFICIENT:**
1. **Identify Gap**: What specific information is missing
2. **Request Minimally**: Ask only for missing pieces
3. **Store Learning**: Capture new patterns for future use
4. **Validate Storage**: Ensure security compliance

---
*Infrastructure memory patterns preventing knowledge loss and improving operational efficiency*