# Detect Project Type

Analyze project to detect type using $ARGUMENTS.

## Arguments
`[project_path]` - Default: current directory

## Behavior
- Parse path from $ARGUMENTS or use current directory
- Scan indicators: package.json, build configs, file patterns, frameworks
- Detect types: web app, backend, mobile, library, docs, AI/data, DevOps, game, enterprise
- Calculate confidence based on indicator matches
- Return: type, confidence, technologies, architecture patterns, conventions
- Store detection as ProjectTypeDetection-[Name] in memory
- Use results for intelligent PROJECT-CONTEXT.md generation

## Errors
- Access denied → "Need directory permissions"
- Empty directory → "Use generic template"
- Unknown type → "Low confidence detection"
- Conflict → "Multiple types detected"