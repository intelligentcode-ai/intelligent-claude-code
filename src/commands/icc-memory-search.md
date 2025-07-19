# Memory Search

Search memory for patterns and apply learnings to current context

## Usage
```bash
icc-memory-search "search query" [--type <type>] [--apply] [--chain]
icc-memory-search --entity "Entity Name" [--apply] [--chain]
```

## Parameters
- `query`: Search term or pattern (required)
- `--type`: Filter by entity type (Learning, Pattern, Project, etc.)
- `--entity`: Search for specific entity name
- `--apply`: Auto-apply relevant learnings to current context
- `--chain`: Enable command chaining output

## Behavior
Searches MCP Memory for entities, relations, and patterns. Automatically applies relevant learnings when --apply flag is used. Supports command chaining for workflow integration.

## Expected Output
```bash
# Standard search
🔍 "authentication patterns" | 5 results

# With auto-apply
🔍 "validation" | 3 results | Applied learnings

# Detailed results
🔍 Memory Search: "authentication patterns"

📊 Search Results (5 found):
🧠 Learning-authentication-error-2025-07-15
   Learning: "Always validate tokens before processing"
   Prevention: "Add middleware validation layer"
   ✅ Applied to current context

🔗 Pattern-oauth-implementation-2025-07-14
   Success: "Used industry standard patterns"
   Reuse: "Apply to all authentication features"
   ✅ Applied to current context

💡 Project-auth-system-context
   Relations: Links to 3 stories, 8 tasks
   Status: "In progress"
```

## Command Chaining
```bash
# Memory → Role → Git chain
icc-memory-search "security patterns" --chain | icc-activate-role @Security-Engineer --chain

# Memory → Validate → Apply chain
icc-memory-search "authentication" --apply --chain | icc-validate-work-type "auth system" --chain
```

## Integration
- **MCP Memory**: Core memory system integration
- **learning-team-automation.md**: Auto-learning application
- **badges.md**: Learning bonus scoring
- **Command chaining**: Context passing and flow control