#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

function main() {
  const logDir = path.join(os.homedir(), '.claude', 'logs');
  const today = new Date().toISOString().split('T')[0];
  const logFile = path.join(logDir, `${today}-session-start.log`);

  // Ensure log directory exists
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logFile, logMessage);
  }

  const standardOutput = {
    continue: true,
    suppressOutput: true
  };

  try {
    let inputData = '';

    if (process.argv[2]) {
      inputData = process.argv[2];
    } else if (process.env.HOOK_INPUT) {
      inputData = process.env.HOOK_INPUT;
    } else if (!process.stdin.isTTY) {
      try {
        const stdinBuffer = fs.readFileSync(0, 'utf8');
        if (stdinBuffer && stdinBuffer.trim()) {
          inputData = stdinBuffer;
        }
      } catch (error) {
        console.log(JSON.stringify(standardOutput));
        process.exit(0);
      }
    } else {
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    if (!inputData.trim()) {
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    let claudeInput;
    try {
      claudeInput = JSON.parse(inputData);
    } catch (error) {
      log(`JSON parse error: ${error.message}`);
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    // LOG FULL INPUT STRUCTURE FOR DEBUGGING
    log(`=== FULL CLAUDE INPUT STRUCTURE ===`);
    log(JSON.stringify(claudeInput, null, 2));
    log(`=== END FULL STRUCTURE ===`);

    // Get session source from input (correct field name per documentation)
    const source = claudeInput.source || '';

    log(`SessionStart triggered with source: ${source}`);

    // ENHANCED COMPACTION DETECTION
    // Check multiple indicators since 'source' field is often empty
    let isCompaction = false;
    let detectionMethod = 'none';

    // Method 1: Direct source field check
    if (source === 'compact' || source === 'resume') {
      isCompaction = true;
      detectionMethod = 'source_field';
    }

    // Method 2: Check for summary or compacted field
    if (claudeInput.summary || claudeInput.compacted || claudeInput.continued) {
      isCompaction = true;
      detectionMethod = 'summary_field';
    }

    // Method 3: Check message content for compaction indicators
    const messageContent = JSON.stringify(claudeInput).toLowerCase();
    const compactionKeywords = [
      'continued from previous',
      'conversation was summarized',
      'ran out of context',
      'session was compacted',
      'context limit reached'
    ];

    for (const keyword of compactionKeywords) {
      if (messageContent.includes(keyword)) {
        isCompaction = true;
        detectionMethod = 'message_content';
        break;
      }
    }

    log(`Compaction detection: ${isCompaction} (method: ${detectionMethod})`);

    // Detect context compaction or session resumption
    if (isCompaction) {
      // Try to read virtual-team.md content to inject directly
      let virtualTeamContent = null;
      const possiblePaths = [
        path.join(os.homedir(), '.claude', 'modes', 'virtual-team.md'),
        path.join(claudeInput.cwd || '.', '.claude', 'modes', 'virtual-team.md')
      ];

      for (const filePath of possiblePaths) {
        try {
          if (fs.existsSync(filePath)) {
            virtualTeamContent = fs.readFileSync(filePath, 'utf8');
            log(`Successfully read virtual-team.md from: ${filePath}`);
            break;
          }
        } catch (error) {
          log(`Failed to read ${filePath}: ${error.message}`);
        }
      }

      let guidance;
      if (virtualTeamContent) {
        // Inject actual file content
        guidance = [
          '⚠️ Session was continued/summarized - virtual team system reloaded from disk',
          '',
          '--- VIRTUAL TEAM SYSTEM CONTENT ---',
          virtualTeamContent,
          '--- END VIRTUAL TEAM SYSTEM ---'
        ].join('\n');
      } else {
        // Fallback to instruction message
        guidance = [
          '⚠️ Session was continued/summarized - complete context NOT loaded',
          '🚨 MANDATORY: Read and apply ~/.claude/modes/virtual-team.md or .claude/modes/virtual-team.md and ALL referenced files!',
          '✅ Confirm this before continuing!'
        ].join('\n');
      }

      // Use JSON hookSpecificOutput.additionalContext for truly silent injection
      // This adds context without visible output in chat
      const output = {
        continue: true,
        suppressOutput: true,
        hookSpecificOutput: {
          hookEventName: "SessionStart",
          additionalContext: guidance
        }
      };

      log(`Compaction detected via ${detectionMethod} - ${virtualTeamContent ? 'injecting virtual-team.md content' : 'injecting restoration guidance'}`);
      console.log(JSON.stringify(output));
      process.exit(0);
    }

    // Normal session start - no guidance needed
    log(`Normal session start - no action required`);
    console.log(JSON.stringify(standardOutput));
    process.exit(0);

  } catch (error) {
    log(`Error: ${error.message}`);
    console.log(JSON.stringify(standardOutput));
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}
