# PRB Breakdown Patterns

**MANDATORY:** Automatic breakdown of PRBs >15 complexity points into manageable sub-PRBs.

**PURPOSE:** Prevent execution of oversized PRBs by automatic decomposition

## Core Principle: Automatic Size Enforcement

**SIZE LIMIT:** NO PRB >15 complexity points may be executed directly
**BREAKDOWN:** All PRBs >15 points MUST be automatically broken down
**TARGET:** Each sub-PRB MUST be ≤15 complexity points
**FALLBACK:** If breakdown fails, BLOCK with manual breakdown request

## Breakdown Triggers

### Size Analysis Points
**IMMEDIATE BREAKDOWN when thresholds exceeded:**
- Total Complexity >15 points
- File Count >20 or Line Count >200
- API Dependencies >5 or Database Operations >3
- Security Components >2

### Breakdown Decision Matrix
| Complexity Score | Action | Strategy |
|------------------|--------|----------|
| **16-20 points** | Auto-breakdown into 2 PRBs | Split by domain boundaries |
| **21-30 points** | Auto-breakdown into 2-3 PRBs | Split by layer (frontend/backend/data) |
| **31-45 points** | Auto-breakdown into 3-4 PRBs | Split by feature + layer boundaries |
| **46+ points** | Auto-breakdown into 4+ PRBs | Split by epic sub-features |

## Breakdown Strategies

### Domain-Based Splitting
**Split by functional domains when PRB spans multiple areas**

**Examples:**
- **Authentication (20 points)** → Auth-Backend (12) + Auth-Frontend (8)
- **API Integration (25 points)** → API-Client (8) + Data-Models (7) + Error-Handling (10)

### Layer-Based Splitting
**Split by architectural layers when PRB spans multiple tiers**

**Examples:**
- **Full-Stack Feature (30 points)** → Database-Layer (10) + API-Layer (12) + Frontend-Layer (8)

### Complexity-Based Splitting
**Split by complexity type when PRB has mixed complexity sources**

**Examples:**
- **Complex Integration (28 points)** → Core-Logic (14) + Integration-Setup (9) + Testing-Validation (5)

### Feature-Based Splitting
**Split by feature boundaries when PRB spans multiple features**

**Examples:**
- **Multi-Feature (35 points)** → Feature-A (12) + Feature-B (11) + Integration-Glue (12)

## Automatic Breakdown Process

### Algorithm Steps
1. **Complexity Analysis**: Calculate total PRB complexity score and identify drivers
2. **Strategy Selection**: Choose domain/layer/complexity/feature-driven breakdown
3. **Split Point Identification**: Find logical boundaries for decomposition
4. **Sub-PRB Generation**: Create sub-PRBs ≤15 points with sequential naming
5. **Dependency Management**: Document execution order and prerequisites

### Validation Rules
- Each sub-PRB MUST be ≤15 complexity points
- All original requirements MUST be distributed across sub-PRBs
- Each sub-PRB MUST be logically coherent and independently executable
- Dependencies between sub-PRBs MUST be clearly documented
- All sub-PRB names MUST follow standard naming format

## Common Breakdown Patterns

### Authentication System (25 points)
- **Auth-Backend (12 points)**: JWT tokens, middleware, validation
- **Auth-Frontend (8 points)**: Login forms, session management  
- **Auth-Integration (5 points)**: Route protection, role management

### Database Migration (18 points)
- **Schema-Changes (12 points)**: Table modifications, index updates
- **Data-Migration (6 points)**: Data transformation, validation, rollback

### Full-Stack Feature (28 points)
- **Backend-Implementation (12 points)**: API, business logic, data layer
- **Frontend-Implementation (10 points)**: UI components, state management
- **Integration-Testing (6 points)**: End-to-end testing, validation

## Error Handling

### Breakdown Failure Conditions
- Cannot achieve ≤15 points per sub-PRB
- Circular dependencies created
- Incomplete coverage of requirements
- Logical incoherence in splits

### Fallback Actions
- Manual breakdown request with recommended split points
- Block execution until properly broken down
- Escalate for PM and architect review

### Error Messages
- **SIZE_LIMIT_EXCEEDED**: "PRB complexity exceeds 15-point limit. Attempting breakdown..."
- **BREAKDOWN_SUCCESSFUL**: "Large PRB broken down into smaller PRBs (≤15 points each)"
- **BREAKDOWN_FAILED**: "Automatic breakdown failed. Manual breakdown required."

## Integration Points

### With PRB Auto-Trigger
- Trigger breakdown when complexity calculation >15 points
- Apply breakdown patterns before template selection
- Generate multiple PRBs instead of single oversized PRB

### With PRB Enforcement  
- Size validator automatically invokes breakdown patterns
- Block oversized PRBs at creation time
- Enforce breakdown compliance across all PRB operations

### With Story Breakdown
- PM breakdown process automatically applies breakdown patterns
- Parent-child relationships properly maintained across breakdowns

## Quality Assurance

### Success Metrics
- Size compliance rate (% sub-PRBs meeting ≤15 point requirement)
- Coverage completeness (% original requirements covered)
- Execution success (% broken-down PRBs executing successfully)

---
*PRB breakdown patterns for intelligent-claude-code size enforcement*