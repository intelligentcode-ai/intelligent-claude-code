# Documentation Behaviors

## Auto Documentation
**Default:** Enabled (config.md)
**Triggers:** New features→README • API changes→API docs • Functions→docstrings • Config→setup docs • Breaking→migration

**Code Changes:** New file→docs • Function/class→docstring • API endpoint→reference • Config→guide

**Locations:** README.md(overview), API.md(reference), ARCHITECTURE.md(design), CHANGELOG.md(history), docs/(user/developer/api/adr)

## Quality Rules
**ALL DOCS:** Clear/concise • Examples first • Keep updated • Version aware • Cross-referenced

**AUDIENCES:**
- **User:** Step-by-step • Screenshots • Troubleshooting • FAQ • No jargon
- **Developer:** Setup • Architecture • API • Code examples • Contributing
- **AI Agent:** Data formats • I/O schemas • Error codes • Rate limits • Integration
- **Architect (ADRs):** Context • Drivers • Options • Decision • Consequences

## Auto Generation

**README Updates:** Features section • Usage examples • Installation steps
**API Docs:** POST/GET endpoints • Description • Auth • Request/Response • Errors
**Docstrings:** Function purpose • Args • Returns • Raises • Examples

## ADRs
**When:** Arch changes • Tech choices • Major refactoring • Security • Performance
**Template:** Title • Status(Proposed/Accepted/Deprecated) • Context • Decision • Consequences(+/-) • Options considered

## Configuration
**Config.md settings:** auto_documentation, doc_update_readme, doc_update_api, doc_generate_adr, doc_add_comments, doc_audience_*

**Overrides:** "Skip documentation"→none • "Document later"→TODO • "Internal only"→no user docs • "Quick fix"→minimal

**Git Integration:** Doc updates in commits • Reference in messages • Validate before merge • Suggest improvements

**Best Practices:** Document as you code • Examples first • Keep maintainable • Version everything • Review regularly