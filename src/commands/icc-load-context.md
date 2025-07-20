# Load Context

Load project context from PROJECT-CONTEXT.md file in the specified location or current directory.

## Description

This command loads project-specific context from a PROJECT-CONTEXT.md file and stores it in memory for use throughout the session. The context provides essential project information, conventions, and guidelines that shape how the AI team operates within the specific project.

## Usage

```
/icc-load-context
/icc-load-context $ARGUMENTS
```

## Arguments

**Optional:** Path to PROJECT-CONTEXT.md file or directory containing it
- If no path provided, searches current working directory
- If directory provided, looks for PROJECT-CONTEXT.md within it
- If file path provided, loads that specific file

**Examples:**
- `/icc-load-context` - Load from current directory
- `/icc-load-context /path/to/project` - Load from specific project
- `/icc-load-context ./PROJECT-CONTEXT.md` - Load specific file

## Behavior

The command performs these actions:

1. **Locate Context File**
   - Use provided path or current directory
   - Search for PROJECT-CONTEXT.md
   - Handle common variations (Project-Context.md, project-context.md)

2. **Read and Parse Content**
   - Read the markdown file
   - Extract structured sections
   - Identify key project metadata

3. **Store in Memory**
   - Create or update ProjectContext entity
   - Link to current project path
   - Add observations for each section

4. **Provide Feedback**
   - Confirm successful loading
   - Show key context elements loaded
   - Report any issues or warnings

## Memory Integration

Creates memory entities:
- **Entity:** ProjectContext-[ProjectName]
- **Observations:** 
  - Project overview
  - Tech stack details
  - Conventions and standards
  - Team structure
  - Key constraints

## Expected Sections

The command recognizes these standard sections:
- Project Overview
- Technology Stack
- Architecture Patterns
- Coding Standards
- Testing Requirements
- Deployment Process
- Team Conventions

## Success Feedback

```
✅ Project context loaded successfully!

📁 Project: MyAwesomeProject
📍 Location: /path/to/project
📋 Sections loaded:
   - Overview
   - Tech Stack (React, Node.js, PostgreSQL)
   - Conventions (5 standards)
   - Testing (Jest, Cypress)
   
💾 Stored in memory as: ProjectContext-MyAwesomeProject
```

## Error Handling

- **File Not Found:** Suggest creating PROJECT-CONTEXT.md
- **Invalid Format:** Report parsing issues with guidance
- **Access Denied:** Request proper permissions
- **Empty File:** Prompt for context content

## Integration Points

- Works with `/icc-validate-context` to verify completeness
- Status viewable via `/icc-context-status`
- Context used by all roles during work execution
- Auto-loaded when switching projects

## Role Behavior

All roles automatically:
- Consult project context before decisions
- Apply project-specific conventions
- Follow documented standards
- Respect stated constraints

This command ensures the AI team understands and follows project-specific requirements and conventions.