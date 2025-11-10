#!/usr/bin/env node

/**
 * Memory-First Reminder Hook - CONSTANT REMINDER
 * Always injects memory-first reminder into every user prompt
 */

function main() {
  try {
    const reminder = `🧠 MEMORY FIRST - Before asking questions or creating work, search memory/ for:
- Similar patterns or solutions
- Configuration information (git/, configuration/, workflows/)
- Deployment patterns (deployment/, operations/)
`;

    const output = {
      continue: true,
      suppressOutput: true,
      hookSpecificOutput: {
        hookEventName: "UserPromptSubmit",
        additionalContext: reminder
      }
    };

    console.log(JSON.stringify(output));
    process.exit(0);

  } catch (error) {
    // On error, always allow (non-blocking)
    const standardOutput = {
      continue: true,
      suppressOutput: true
    };
    console.log(JSON.stringify(standardOutput));
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
