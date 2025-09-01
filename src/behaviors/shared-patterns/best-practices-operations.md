# Best-Practices Operations

**MANDATORY:** Systematic best-practices search, application, and generation patterns.

## Structure

**Best-Practices Directory Organization:**
- **best-practices/[category]/[practice-name].md** - Individual practice files
- **Categories**: architecture, collaboration, development, git, operations, quality, security

## Best-Practice File Format

**Standard Best-Practice File Format (from existing files):**
- **Type**: category (architecture, development, security, etc.)
- **Applies To**: PRB sizes (nano, tiny, medium, large, mega)
- **Keywords**: searchable terms for relevance matching
- **Description**: Clear practice description
- **Implementation**: Detailed implementation guidance
- **Quality Gates**: Validation criteria and requirements
- **Examples**: Code examples and implementation samples

## Operations

### SearchBestPractices Pattern
**STEPS TO SEARCH BEST-PRACTICES FOR WORK CONTEXT:**
1. **Work Type Analysis**: Extract work intent, technology domains, and scope
2. **Directory Mapping**: Map work type to primary and secondary best-practices directories
3. **File Discovery**: Find all .md files in mapped directories
4. **Content Parsing**: Extract Type, Applies To, Keywords, and Description from each file
5. **Relevance Scoring**: Score based on keyword match, PRB size match, and context alignment
6. **Selection**: Choose top 2-3 most relevant practices (max 1000 tokens total)
7. **Return Results**: Return selected practices for PRB embedding

### GenerateBestPractice Pattern  
**STEPS TO GENERATE BEST-PRACTICE FROM SUCCESSFUL PATTERN:**
1. **Pattern Analysis**: Analyze memory pattern for reusable elements and broad applicability
2. **Category Assignment**: Determine target directory based on pattern type and domain
3. **Template Creation**: Create best-practice file with standard format structure
4. **Content Population**: Fill Description, Implementation, Quality Gates, and Examples
5. **File Creation**: Generate .md file in best-practices/[category]/ directory
6. **Validation**: Ensure file follows standard format and includes all required sections

### Work Type to Directory Mapping
**PRIMARY DIRECTORIES BY WORK TYPE:**
- **implement/create/build** → development/, quality/
- **fix/update/modify** → development/, quality/  
- **architecture/design** → architecture/, development/
- **security/authentication** → security/, development/
- **deploy/configure/setup** → operations/, collaboration/
- **git/version/branch** → git/, collaboration/
- **test/quality/review** → quality/, development/
- **team/coordination** → collaboration/, operations/

## Relevance Scoring

### Scoring Factors
**SCORING CRITERIA (0-10 scale each):**
- **Keyword Match Score**: Direct matches between work description and practice keywords
- **PRB Size Score**: "Applies To" field matches current PRB size
- **Technology Score**: Technology domain alignment (database, API, infrastructure, etc.)
- **Context Score**: Work description alignment with practice description

### Selection Logic
**PRACTICE SELECTION PROCESS:**
1. **Calculate Total Score**: Sum all scoring factors for each practice
2. **Rank by Relevance**: Sort practices by total score (highest first)
3. **Token Management**: Select top practices while staying under 1000 token limit
4. **Minimum Threshold**: Only include practices scoring 6+ total points
5. **Diversity**: Prefer practices from different categories when scores are similar

## PRB Integration

### Context Embedding
**BEST-PRACTICES IN PRB CONTEXT:**
- Embed 2-3 most relevant practices in PRB context section
- Include practice title, key implementation points, and quality gates
- Reference full practice files for detailed implementation guidance
- Apply token limit to prevent PRB bloat

### Quality Validation
**PRACTICE APPLICATION VALIDATION:**
- Check PRB execution against embedded quality gates
- Validate implementation follows practice guidelines
- Score adherence to practice recommendations
- Store successful applications for pattern reinforcement

## Generation Triggers

### Pattern Promotion Criteria
**MEMORY PATTERN → BEST-PRACTICE CRITERIA:**
- **Frequency**: Pattern applied successfully 3+ times in different contexts
- **Quality Impact**: Demonstrable improvement in outcomes
- **Reusability**: Clear guidelines can be extracted
- **Broad Applicability**: Useful beyond original context

### Auto-Generation Process
**TRIGGERED BEST-PRACTICE GENERATION:**
1. **Monitor Memory**: Track memory patterns meeting promotion criteria
2. **Evaluate Impact**: Assess quality improvement and applicability  
3. **Generate Practice**: Create best-practice file with standard format
4. **Store Result**: Place in appropriate category directory
5. **Update Index**: Ensure practice is discoverable in future searches

## Security and Quality

### Content Validation
**BEST-PRACTICE CONTENT VALIDATION:**
- No sensitive information in generated practices
- Focus on methods and processes, not specific credentials or paths
- Ensure practices are broadly applicable, not project-specific
- Validate quality gates are measurable and achievable

### Version Control Integration
**BEST-PRACTICES IN VERSION CONTROL:**
- All best-practices files are version controlled with project
- Changes tracked for accountability and rollback capability
- Generated practices include generation metadata and source patterns
- Regular cleanup of obsolete or superseded practices

---
*Best-practices operations for search, application, and generation*