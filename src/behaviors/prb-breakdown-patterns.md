# PRB Breakdown Patterns

**MANDATORY:** Automatic breakdown of Large (16-30) and Mega (30+) PRBs into smaller PRBs ≤15 points each.

**PURPOSE:** Prevent execution of oversized PRBs by automatically decomposing them into manageable sub-PRBs

## Core Principle: Automatic Size Enforcement

**SIZE LIMIT ENFORCEMENT:** NO PRB >15 complexity points may be executed directly
**BREAKDOWN REQUIREMENT:** All PRBs >15 points MUST be automatically broken down
**TARGET SIZE:** Each generated sub-PRB MUST be ≤15 complexity points
**FALLBACK:** If automatic breakdown fails, BLOCK with manual breakdown request

## Breakdown Detection Triggers

### Size Analysis Points
**IMMEDIATE BREAKDOWN when any of these thresholds exceeded:**
- **Total Complexity >15 points:** Automatic breakdown triggered
- **File Count >20:** High file complexity indicator  
- **Line Count >200:** Large implementation scope
- **API Dependencies >5:** External integration complexity
- **Database Operations >3:** Data persistence complexity
- **Security Components >2:** Security implementation complexity

### Breakdown Decision Matrix

| Complexity Score | Action | Strategy |
|------------------|--------|----------|
| **16-20 points** | Auto-breakdown into 2 PRBs | Split by logical domain boundaries |
| **21-30 points** | Auto-breakdown into 2-3 PRBs | Split by layer (frontend/backend/data) |
| **31-45 points** | Auto-breakdown into 3-4 PRBs | Split by feature + layer boundaries |
| **46+ points** | Auto-breakdown into 4+ PRBs | Split by epic sub-features |

## Logical Breakdown Strategies

### Domain-Based Splitting
**Split by functional domains when PRB spans multiple areas:**

**Authentication PRB (20 points) → Split into:**
- **Auth-Backend (12 points):** API endpoints, middleware, validation
- **Auth-Frontend (8 points):** Login UI, forms, client-side validation

**API Integration PRB (25 points) → Split into:**
- **API-Client (8 points):** HTTP client setup, connection handling
- **Data-Models (7 points):** Request/response models, validation
- **Error-Handling (10 points):** Error handling, retry logic, logging

### Layer-Based Splitting
**Split by architectural layers when PRB spans multiple tiers:**

**Full-Stack Feature (30 points) → Split into:**
- **Database-Layer (10 points):** Schema, migrations, queries
- **API-Layer (12 points):** Endpoints, business logic, validation
- **Frontend-Layer (8 points):** UI components, state management

### Complexity-Based Splitting
**Split by complexity type when PRB has mixed complexity sources:**

**Complex Integration (28 points) → Split into:**
- **Core-Logic (14 points):** Core business logic implementation
- **Integration-Setup (9 points):** External service configuration
- **Testing-Validation (5 points):** Testing and validation logic

### Feature-Based Splitting
**Split by feature boundaries when PRB spans multiple features:**

**Multi-Feature PRB (35 points) → Split into:**
- **Feature-A-Implementation (12 points):** Core Feature A logic
- **Feature-B-Implementation (11 points):** Core Feature B logic  
- **Integration-Glue (12 points):** Feature integration and coordination

## Automatic Breakdown Process

### Breakdown Process

**Algorithm Steps:**
1. **Analyze complexity sources** and select breakdown strategy
2. **Identify split boundaries** (domain, layer, feature, or technology)
3. **Generate sub-PRBs** with sequential naming and ≤15 point validation
4. **Document dependencies** and execution order
5. **Validate completeness** of requirements coverage

### Breakdown Validation Rules

**VALIDATION REQUIREMENTS:**
- **Size compliance:** Each sub-PRB MUST be ≤15 complexity points
- **Complete coverage:** All original requirements MUST be distributed across sub-PRBs
- **Logical coherence:** Each sub-PRB MUST be logically coherent and executable independently
- **Dependency clarity:** Dependencies between sub-PRBs MUST be clearly documented
- **Naming compliance:** All sub-PRB names MUST follow standard naming format

**VALIDATION FAILURES:**
- **Sub-PRB too large:** If any sub-PRB >15 points, re-breakdown or BLOCK
- **Incomplete coverage:** If original requirements not fully covered, BLOCK  
- **Circular dependencies:** If sub-PRBs have circular dependencies, BLOCK
- **Invalid naming:** If naming doesn't follow format, auto-correct or BLOCK

## Breakdown Templates

**16-20 Points:** Two-part domain split (10-12 + 6-8 points)
**21-30 Points:** Three-part layer split (database, API, frontend layers)
**31-45 Points:** Four-part feature split (core + supporting + integration + testing)
**46+ Points:** Epic-level breakdown (consider story-level decomposition first)

## Common Patterns

**Authentication (25 pts):** Backend (12) + Frontend (8) + Integration (5)
**API Integration (22 pts):** Client Setup (7) + Data Processing (10) + Error Handling (5)
**Database Migration (18 pts):** Schema Changes (12) + Data Migration (6)
**Full-Stack Feature (28 pts):** Backend (12) + Frontend (10) + Testing (6)

## Error Handling and Fallbacks

### Breakdown Failure Scenarios

**AUTOMATIC BREAKDOWN FAILURE CONDITIONS:**
- **Cannot achieve ≤15 points:** When logical splits still result in >15 point sub-PRBs
- **Circular dependencies:** When breakdown creates dependency cycles  
- **Incomplete coverage:** When breakdown doesn't cover all original requirements
- **Logical incoherence:** When split points don't create coherent sub-PRBs

**FALLBACK ACTIONS:**
- **Manual breakdown request:** "❌ Automatic breakdown failed. Please manually split this work into smaller, focused PRBs ≤15 points each."
- **Suggest split strategy:** Provide recommended split points based on analysis
- **Block execution:** Prevent oversized PRB execution until properly broken down
- **Escalation:** Flag for @PM and architect review if breakdown is consistently difficult

### Error Messages

**BREAKDOWN ERROR MESSAGES:**
- **SIZE_LIMIT_EXCEEDED:** "❌ PRB complexity ({score} points) exceeds 15-point limit. Attempting automatic breakdown..."
- **BREAKDOWN_SUCCESSFUL:** "✅ Large PRB automatically broken down into {count} smaller PRBs (≤15 points each)"
- **BREAKDOWN_FAILED:** "❌ Automatic breakdown failed. Manual breakdown required. Split this work into focused PRBs ≤15 points each."
- **SUB_PRB_TOO_LARGE:** "❌ Generated sub-PRB still too large ({score} points). Further breakdown needed."
- **INCOMPLETE_COVERAGE:** "❌ Breakdown doesn't cover all original requirements. Review and adjust split points."

## Integration Points

### With PRB Auto-Trigger
- **Trigger breakdown** when complexity calculation >15 points
- **Apply breakdown patterns** before template selection
- **Generate multiple PRBs** instead of single oversized PRB
- **Validate each sub-PRB** meets size requirements

### With PRB Enforcement  
- **Size validator** automatically invokes breakdown patterns
- **Block oversized PRBs** at creation time
- **Monitor for breakdown attempts** during PRB creation
- **Enforce breakdown compliance** across all PRB operations

### With Story Breakdown
- **@PM breakdown process** automatically applies breakdown patterns
- **Architect collaboration** includes breakdown strategy selection
- **Story-level breakdown** may prevent PRB-level breakdown needs
- **Parent-child relationships** properly maintained across breakdowns

### With Template System
- **Template selection** occurs AFTER breakdown (sub-PRBs select their own templates)
- **Context embedding** distributed across sub-PRBs appropriately
- **Placeholder resolution** happens for each sub-PRB independently
- **Template validation** ensures each sub-PRB gets appropriate template

## Quality Assurance

### Breakdown Quality Metrics
- **Size compliance rate:** Percentage of sub-PRBs meeting ≤15 point requirement
- **Coverage completeness:** Percentage of original requirements covered by sub-PRBs
- **Dependency clarity:** Percentage of sub-PRBs with clear dependency documentation
- **Execution success:** Percentage of broken-down PRBs that execute successfully

### Continuous Improvement
- **Pattern learning:** Capture successful breakdown patterns for reuse
- **Failure analysis:** Analyze breakdown failures to improve algorithm
- **Strategy refinement:** Improve breakdown strategy selection based on outcomes
- **Template enhancement:** Enhance breakdown templates based on common patterns

## Memory Integration

### Pattern Storage
**Store breakdown patterns in memory:**
- Successful breakdown strategies for similar complexity patterns
- Common split points for different types of work
- Breakdown failure patterns and their resolutions
- Quality metrics and improvement opportunities

**Memory Locations:**
- `memory/prb-patterns/breakdown-strategies.md` - Successful breakdown approaches
- `memory/complexity-analysis/size-management.md` - Size management patterns
- `memory/system-design/automatic-decomposition.md` - Decomposition improvements

---
*PRB breakdown patterns for intelligent-claude-code size enforcement*