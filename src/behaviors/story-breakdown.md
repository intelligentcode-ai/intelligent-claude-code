# Story Breakdown Behavior

**MANDATORY:** @PM breaks down stories into PRBs with architect collaboration.

**PURPOSE:** @PM and specialist architect work together to analyze stories and create PRBs

## Core Process

When user says "@PM break down story X" or similar:
1. **@PM reads story**: Understands business goals and requirements
2. **@PM + Architect collaborate**: Jointly analyze technical approach
3. **@PM creates PRBs**: Generates appropriate PRBs based on analysis
4. **Story selection**: @PM + Architect select next story based on priorities/complexity

## Story Selection Criteria

@PM and Architect consider:
- **Application state**: What's already built, what's needed next
- **Priority**: Business value and user impact
- **Complexity**: Technical difficulty and effort required
- **Dependencies**: What needs to be built first
- **Risk**: Technical or business risks to address

## Simple Invocation

User simply says:
- "@PM break down the authentication story"
- "@PM what story should we work on next?"
- "@PM analyze the stories and create PRBs"

## Story Location

- Stories live in configured story_path (default: `stories/`)
- Drafts in story_path/story_drafts (default: `stories/drafts/`)
- Any text file format (.txt, .md, etc.)
- Natural language descriptions
- No forced structure
- Paths auto-created if missing

## PRB Generation

When @PM breaks down a story:
1. Creates PRBs in configured prb_path/prb_ready (default: `prbs/ready/`)
2. Each PRB references the parent story
3. Appropriate complexity and template selected using hierarchy
4. Ready for immediate execution
5. Uses directory structure from configuration

## Story Selection Process

When asked "what's next?", @PM and Architect:
1. Review all stories in configured story_path
2. Consider current application state
3. Evaluate priorities and dependencies
4. Recommend next story with rationale
5. Can immediately break it down if requested

## Directory Integration

Imports:
@./directory-structure.md
@./shared-patterns/template-loading.md

Uses configured paths:
- get_project_path("story_path") for stories
- get_project_path("prb_path") for PRBs
- ensure_directory() to create missing paths

---
*Story breakdown behavior for intelligent-claude-code system*