# Generate PRB from Draft

Generate PRBs from draft specifications in a directory.

## Usage
`/icc-generate-prb-from-draft [draft-directory]`

## Parameters
- `draft-directory`: Path to directory containing draft files (default: .claude/drafts/)

## Behavior
1. **Scan draft directory** for specification files (.md, .txt, .yaml)
2. **@PM analysis** - Understand intent and scope
3. **@Architect review** - Technical approach and design
4. **Generate PRBs** - Create appropriate complexity PRBs
5. **Include project context**:
   - Best practices from .claude/best-practices/
   - Architecture patterns from .claude/architecture/
   - Coding standards from .claude/standards/
   - Existing code patterns via search
6. **Store PRBs** in .claude/prbs/ready/

## Draft Format Support
- **Markdown**: Requirements, user stories, technical specs
- **YAML**: Structured specifications
- **Plain text**: Natural language descriptions

## Example
```bash
/icc-generate-prb-from-draft .claude/drafts/new-feature/
```

## Configuration
Project-specific behavior configured in CLAUDE.md:
```yaml
prb_generation:
  include_best_practices: true
  search_code_patterns: true
  use_architecture_docs: true
  behavioral_style: "tdd"  # or "bdd", "ddd", etc.
```