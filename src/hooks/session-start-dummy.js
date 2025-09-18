#!/usr/bin/env node

/**
 * DUMMY SESSION-START HOOK
 *
 * This is a placeholder script because Claude Code is still trying to call
 * session-start.js even though it's not registered in settings.json
 *
 * This script just logs the request and exits cleanly to prevent errors.
 */

const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(process.env.HOME, '.claude', 'hooks', 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Log the phantom call
const logFile = path.join(logsDir, 'phantom-session-start.log');
const timestamp = new Date().toISOString();
const logEntry = `${timestamp} - SessionStart:compact called (not in settings.json)\n` +
                `  Process args: ${JSON.stringify(process.argv)}\n` +
                `  Environment: ${JSON.stringify({
                    NODE_VERSION: process.version,
                    PWD: process.cwd(),
                    HOOK_TYPE: process.env.HOOK_TYPE || 'unknown'
                }, null, 2)}\n` +
                `${'='.repeat(80)}\n`;

// Append to log file
fs.appendFileSync(logFile, logEntry);

// For SessionStart, just exit silently with success
// SessionStart doesn't expect any JSON output
process.exit(0);