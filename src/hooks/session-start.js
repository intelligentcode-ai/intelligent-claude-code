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

    // When compaction is detected, log it but don't output anything visible
    // The virtual-team.md content is already loaded through CLAUDE.md's @~/.claude/modes/virtual-team.md import
    if (isCompaction) {
      log(`Compaction detected via ${detectionMethod} - virtual-team context already loaded through CLAUDE.md`);
    } else {
      log(`Normal session start - no action required`);
    }

    // Always return silent output (suppressOutput: true means no visible output to user)
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
