#!/usr/bin/env node

/**
 * Subagent Memory Storage Reminder - CONSTANT REMINDER
 * Always reminds to store learnings after agent work
 */

function main() {
  try {
    const reminder = `💾 STORE LEARNINGS - After completing work, store successful patterns to memory/:
- Implementation patterns → memory/implementation/
- Bug solutions → memory/debugging/
- Configuration discoveries → memory/configuration/
`;

    const output = {
      continue: true,
      suppressOutput: true,
      hookSpecificOutput: {
        hookEventName: "SubagentStop",
        additionalContext: reminder
      }
    };

    console.log(JSON.stringify(output));
    process.exit(0);

  } catch (error) {
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
