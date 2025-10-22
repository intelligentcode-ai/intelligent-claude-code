#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

// Load unified config
const { getSetting } = require('./lib/config-loader');

function main() {
  const logDir = path.join(os.homedir(), '.claude', 'logs');
  const today = new Date().toISOString().split('T')[0];
  const logFile = path.join(logDir, `${today}-summary-enforcement.log`);

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
    }

    if (!inputData.trim()) {
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    let hookInput;
    try {
      hookInput = JSON.parse(inputData);
    } catch (error) {
      log(`JSON parse error: ${error.message}`);
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    // Check all tool operations for file paths, not just Write/Edit
    const tool_name = hookInput.tool_name;
    const file_path = hookInput.tool_input?.file_path;

    if (!file_path) {
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    // Get project root from hookInput.cwd or fallback to process.cwd()
    const projectRoot = hookInput.cwd || process.cwd();

    // Get settings
    const strictMode = getSetting('development.file_management_strict', true);
    const summariesPath = getSetting('paths.summaries_path', 'summaries');

    log(`Checking file: ${file_path}`);
    log(`Strict mode: ${strictMode}`);
    log(`Summaries path: ${summariesPath}`);
    log(`Project root: ${projectRoot}`);

    // Normalize to relative path if absolute
    let relativePath = file_path;
    if (path.isAbsolute(file_path)) {
      relativePath = path.relative(projectRoot, file_path);
    }

    // Check if file is summary-type
    const summaryPatterns = [
      /summary/i, /report/i, /fix/i,
      /analysis/i, /review/i, /assessment/i,
      /status/i, /progress/i, /update/i,
      /deployment/i, /verification/i, /configuration/i,
      /post-mortem/i, /postmortem/i, /monitoring/i,
      /agenttask/i, /troubleshoot/i, /diagnostic/i,
      /investigation/i, /incident/i, /resolution/i
    ];

    const fileName = path.basename(relativePath);
    const isSummaryFile = summaryPatterns.some(pattern => pattern.test(fileName));

    if (!isSummaryFile) {
      // Not a summary file, allow
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    log(`Summary file detected: ${fileName}`);

    // Load allowed ALL-CAPITALS files from config (with defaults)
    const defaultAllCapsFiles = [
      'README.md',
      'LICENSE',
      'LICENSE.md',
      'CLAUDE.md',
      'CHANGELOG.md',
      'CONTRIBUTING.md',
      'AUTHORS',
      'NOTICE',
      'PATENTS',
      'VERSION',
      'MAKEFILE',
      'DOCKERFILE',
      'COPYING',
      'COPYRIGHT'
    ];

    const allowedAllCapsFiles = getSetting('development.allowed_allcaps_files', defaultAllCapsFiles);
    log(`Allowed ALL-CAPITALS files: ${allowedAllCapsFiles.length} entries`);

    // Check for ALL-CAPITALS filename (excluding extension)
    const fileBaseName = fileName.replace(/\.[^/.]+$/, ''); // Remove extension
    const isAllCaps = fileBaseName === fileBaseName.toUpperCase() &&
                      fileBaseName.length > 1 &&
                      /^[A-Z0-9_-]+$/.test(fileBaseName);

    if (isAllCaps && !allowedAllCapsFiles.includes(fileName)) {
      log(`BLOCKED: ALL-CAPITALS filename not allowed: ${fileName}`);

      // Suggest lowercase alternative
      const suggestedName = fileName.toLowerCase();
      const suggestedPath = path.join(summariesPath, suggestedName);

      console.log(JSON.stringify({
        continue: false,
        displayToUser: `🚫 ALL-CAPITALS filenames are not allowed in summaries/

Blocked filename: ${fileName}
Suggested alternative: ${suggestedName}

Well-known exceptions allowed:
${allowedAllCapsFiles.join(', ')}

Please use lowercase or mixed-case filenames for better readability.`
      }));
      process.exit(0);
    }

    // Check if file is in summaries directory
    const normalizedPath = relativePath.replace(/\\/g, '/');
    const summariesPattern = new RegExp(`^${summariesPath}/`, 'i');
    const isInSummariesDir = summariesPattern.test(normalizedPath) ||
                            normalizedPath.includes(`/${summariesPath}/`);

    if (isInSummariesDir) {
      // File is in summaries directory, allow
      log(`File in summaries directory - allowed`);
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    // Summary file outside summaries directory
    if (strictMode) {
      // Block with guidance
      log(`BLOCKED: Summary file outside summaries directory (strict mode)`);

      const suggestedPath = path.join(summariesPath, fileName);

      // Ensure summaries directory exists in the project root
      const summariesDir = path.join(projectRoot, summariesPath);
      if (!fs.existsSync(summariesDir)) {
        fs.mkdirSync(summariesDir, { recursive: true });
        log('Created summaries/ directory for summary file redirection');
      }

      console.log(JSON.stringify({
        continue: false,
        displayToUser: `🚫 Summary files must be created in summaries/ directory

File management strict mode is enabled.

Blocked: ${relativePath}
Suggested: ${suggestedPath}

Please create summary files in the summaries/ directory to keep project root clean.

To disable this enforcement, set development.file_management_strict: false in icc.config.json`
      }));
      process.exit(0);
    } else {
      // Allow with warning
      log(`WARNING: Summary file outside summaries directory (permissive mode)`);
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

  } catch (error) {
    log(`Error: ${error.message}`);
    console.log(JSON.stringify(standardOutput));
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
