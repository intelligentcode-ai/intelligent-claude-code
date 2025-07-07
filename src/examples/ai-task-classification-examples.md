# AI Task Classification Examples

## Purpose
Demonstrates the AI task size classification system with real-world examples showing automatic classification, evidence requirements, and gaming prevention.

## Small Task Examples

### Example 1: Single File Configuration Update
**Task:** Update config.json to enable dark mode feature
**AI Analysis:**
- File count: 1 file (config.json)
- Code complexity: Low (JSON property change)
- Architecture impact: None (configuration only)
- Dependencies: None
- Testing scope: Configuration validation only
**AI Score:** 15% (File:5%, Complexity:5%, Architecture:0%, Dependencies:0%, Testing:5%)
**Classification:** Small (0.5x multiplier)
**Format:** @System-Engineer (P: 5.5pts, Q: 12.0pts - Senior, Size: Small): Update dark mode configuration

### Example 2: Single Function Bug Fix
**Task:** Fix null pointer exception in user authentication method
**AI Analysis:**
- File count: 1 file (auth.js)
- Code complexity: Low (single condition check)
- Architecture impact: None (isolated fix)
- Dependencies: None
- Testing scope: Unit test update
**AI Score:** 25% (File:5%, Complexity:10%, Architecture:0%, Dependencies:0%, Testing:10%)
**Classification:** Small (0.5x multiplier)
**Format:** @Developer (P: 2.0pts, Q: 8.5pts - Standard, Size: Small): Fix authentication null pointer bug

## Standard Task Examples

### Example 3: Multi-Component API Integration
**Task:** Integrate Stripe payment processing across frontend and backend
**AI Analysis:**
- File count: 6 files (frontend components, backend routes, database models, tests)
- Code complexity: High (payment flow implementation)
- Architecture impact: High (new payment service integration)
- Dependencies: External API, database schema changes
- Testing scope: Integration tests, end-to-end payment flow tests
**AI Score:** 85% (File:25%, Complexity:25%, Architecture:25%, Dependencies:10%, Testing:0%)
**Classification:** Standard (1.0x multiplier)
**Format:** @Developer (P: 3.5pts, Q: 15.0pts - Senior, Size: Standard): Implement Stripe payment integration

### Example 4: Database Schema Migration
**Task:** Add user preferences table with relationships to existing user system
**AI Analysis:**
- File count: 4 files (migration script, model updates, API routes, tests)
- Code complexity: Medium (relationship setup, validation)
- Architecture impact: High (database schema change affects multiple systems)
- Dependencies: Cross-component (user system, API layer, frontend)
- Testing scope: Migration tests, integration tests
**AI Score:** 75% (File:20%, Complexity:15%, Architecture:30%, Dependencies:10%, Testing:0%)
**Classification:** Standard (1.0x multiplier)
**Format:** @Database-Engineer (P: 1.0pts, Q: 9.5pts - Standard, Size: Standard): Add user preferences schema

## Borderline Cases (Evidence Required)

### Example 5: Two-File Component Creation
**Task:** Create new user profile component with styling
**AI Analysis:**
- File count: 2 files (component.jsx, styles.css)
- Code complexity: Medium (form handling, validation)
- Architecture impact: Low (new component, no existing system changes)
- Dependencies: None (isolated component)
- Testing scope: Component unit tests
**AI Score:** 45% (File:10%, Complexity:15%, Architecture:5%, Dependencies:0%, Testing:15%)
**Classification:** Requires Evidence (borderline case)
**Evidence Required:** Complexity justification, impact scope documentation
**Manual Override Example:** @Web-Designer (P: 7.0pts, Q: 18.5pts - Senior, Size: Small): Create user profile component - EVIDENCE: Isolated component with no system integration, simple form handling, single-purpose functionality

### Example 6: API Endpoint with Business Logic
**Task:** Add new search endpoint with filtering and pagination
**AI Analysis:**
- File count: 3 files (route handler, service layer, tests)
- Code complexity: Medium (search logic, filtering, pagination)
- Architecture impact: Medium (new API endpoint, database query optimization)
- Dependencies: Database layer modifications
- Testing scope: API tests, performance tests
**AI Score:** 55% (File:15%, Complexity:15%, Architecture:15%, Dependencies:5%, Testing:5%)
**Classification:** Requires Evidence (borderline case)
**Evidence Required:** If claiming Small: Justify limited complexity and impact
**Standard Classification:** @Backend-Developer (P: 4.5pts, Q: 11.0pts - Standard, Size: Standard): Implement search API with filtering

## Gaming Prevention Examples

### Example 7: Gaming Attempt - Large Feature as Small
**Task:** Implement complete user authentication system
**Claimed:** @Developer (P: 8.0pts, Q: 20.0pts - Senior, Size: Small): Add simple login feature
**AI Analysis:**
- File count: 8 files (auth service, middleware, routes, frontend forms, tests, database)
- Code complexity: Very High (authentication flow, security, session management)
- Architecture impact: Very High (new authentication system)
- Dependencies: High (cross-system integration)
- Testing scope: Comprehensive (unit, integration, security tests)
**AI Score:** 95% (File:25%, Complexity:25%, Architecture:30%, Dependencies:10%, Testing:5%)
**Gaming Prevention Triggered:** Claimed Small but AI analysis shows Standard
**Resolution:** Evidence requested for Small classification → Evidence insufficient → @Architect escalation → Final determination: Standard
**Corrected Format:** @Developer (P: 8.0pts, Q: 20.0pts - Senior, Size: Standard): Implement user authentication system

### Example 8: Gaming Prevention - Pattern Recognition
**Scenario:** @Developer-A has claimed Small classification for 5 consecutive tasks that were borderline/Standard
**Pattern Analysis:** 
- Task 1: 3-file feature claimed Small → Actually borderline
- Task 2: API integration claimed Small → Actually Standard  
- Task 3: Database changes claimed Small → Actually Standard
- Task 4: Multi-component update claimed Small → Actually Standard
- Task 5: Security implementation claimed Small → Actually Standard
**Gaming Detection Triggered:** Pattern of inappropriate Small classifications
**Response:** Team member counseling → Additional evidence requirements for future Small claims → @Architect review for next 3 tasks

## Manual Override Examples

### Example 9: Legitimate Small Override
**Task:** Update 4 configuration files to change API endpoints
**AI Analysis:**
- File count: 4 files → Suggests Standard
- Code complexity: Very Low (URL string replacements)
- Architecture impact: None (configuration only)
- Dependencies: None
- Testing scope: Configuration validation only
**AI Score:** 45% (File:20%, Complexity:0%, Architecture:0%, Dependencies:0%, Testing:25%)
**Manual Override:** Size: Small
**Evidence Provided:** "Simple URL replacements across config files, no logic changes, no system impact, configuration-only changes"
**Validation:** Evidence reviewed → Override approved → Small classification applied
**Format:** @System-Engineer (P: 12.5pts, Q: 25.0pts - Elite, Size: Small): Update API endpoint configurations

### Example 10: Rejected Override Attempt
**Task:** Refactor payment processing across 3 services
**AI Analysis:**
- File count: 8 files across 3 services
- Code complexity: High (refactoring, maintaining compatibility)
- Architecture impact: High (cross-service changes)
- Dependencies: High (service communication, data consistency)
- Testing scope: Comprehensive integration testing
**AI Score:** 90% (File:25%, Complexity:25%, Architecture:30%, Dependencies:10%, Testing:0%)
**Attempted Override:** Size: Small
**Evidence Provided:** "Just moving code around, no new features"
**Validation:** Evidence insufficient → Complexity assessment shows high impact → Override rejected
**Final Classification:** Standard
**Format:** @Architect (P: 18.0pts, Q: 45.0pts - Elite, Size: Standard): Refactor payment processing architecture

## Learning and Improvement Examples

### Example 11: Classification Learning
**Initial Task:** Create user dashboard with 3 widgets
**Initial AI Score:** 55% → Classified as Standard
**Actual Complexity:** Lower than expected (widgets were simple displays)
**Learning Captured:** Widget complexity varies significantly → Update classification algorithm to analyze widget types
**Future Improvement:** Enhanced complexity analysis for dashboard components

### Example 12: Algorithm Refinement
**Pattern Observed:** API endpoint tasks consistently under-estimated by AI
**Analysis:** Current algorithm doesn't account for business logic complexity in API endpoints
**Refinement:** Increased weight for API endpoint complexity analysis
**Result:** Improved classification accuracy for API-related tasks

## Testing Scenarios

### Scenario 1: New Team Member Classification Test
**Objective:** Test AI classification with unfamiliar role performing tasks
**Task:** @New-Specialist (P: 0.0pts, Q: 0.0pts - Standard): Implement cryptocurrency payment integration
**Expected:** AI classification based on task complexity, not role familiarity
**Test Result:** Should classify as Standard due to high complexity and cross-system impact

### Scenario 2: Edge Case Testing
**Task:** Single file with 500+ lines of complex algorithm implementation
**Challenge:** 1 file suggests Small, but complexity suggests Standard
**Expected AI Behavior:** Code complexity and architecture impact should override file count
**Expected Classification:** Standard due to algorithm complexity weight

### Scenario 3: Dispute Resolution Testing
**Task:** Update 2 CSS files for responsive design
**AI Classification:** Small (isolated styling changes)
**Developer Claims:** Size: Standard (complex responsive logic)
**Expected Resolution:** Evidence review → CSS complexity analysis → Final determination based on actual responsive design complexity

## Summary of Classification Principles

1. **File Count**: Initial indicator but not definitive
2. **Code Complexity**: Heavily weighted - algorithm complexity, business logic
3. **Architecture Impact**: Most heavily weighted - system-wide changes
4. **Dependencies**: Cross-component interactions and external integrations
5. **Testing Scope**: Required testing complexity and coverage

**Gaming Prevention**: Evidence requirements, pattern recognition, peer review escalation, @Architect final authority

**Learning System**: Continuous improvement through post-completion analysis and algorithm refinement