# Git Validate

Validate git operations using $ARGUMENTS.

## Arguments
`Operation: commit|push|merge|branch | Target: branch_name | Content: message_or_content`

## Behavior
- Parse operation type and target from $ARGUMENTS
- Check branch protection: no direct commits to main/master
- Validate commit messages: format, length, conventions
- Apply git_privacy: strip AI mentions if enabled
- Enforce feature branch workflow requirements
- Check file permissions and change scope

## Errors
- Protected branch → "Cannot commit to main"
- Invalid message → "Message format incorrect"
- Privacy violation → "Remove AI mentions"
- Permission denied → "Unauthorized operation"