#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');
const { isCorrectDirectory, getSuggestedPath } = require('./lib/directory-enforcement');

function main() {
  const logDir = path.join(os.homedir(), '.claude', 'logs');
  const today = new Date().toISOString().split('T')[0];
  const logFile = path.join(logDir, `${today}-post-agent-validation.log`);

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
    suppressOutput: false
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
        log(`Failed to read stdin: ${error.message}`);
        console.log(JSON.stringify(standardOutput));
        process.exit(0);
      }
    }

    if (!inputData.trim()) {
      log('No input data - allowing operation');
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

    log(`Post-agent validation triggered for session: ${hookInput.session_id || 'unknown'}`);

    // Get project root from hook input
    const projectRoot = hookInput.cwd || process.cwd();
    log(`Project root: ${projectRoot}`);

    // Get list of files modified by agent using git status
    let modifiedFiles = [];
    try {
      const gitOutput = execSync('git status --porcelain', {
        cwd: projectRoot,
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe']
      });

      modifiedFiles = gitOutput
        .split('\n')
        .filter(line => line.trim())
        .map(line => {
          // Parse git status format: XY filename
          const match = line.match(/^(.{2})\s+(.+)$/);
          if (!match) return null;

          const [, status, filename] = match;
          // Include new, modified, and renamed files
          if (status.match(/[AM?R]/)) {
            return path.resolve(projectRoot, filename);
          }
          return null;
        })
        .filter(file => file !== null);

      log(`Found ${modifiedFiles.length} modified files to validate`);
    } catch (error) {
      log(`Failed to get git status: ${error.message} - skipping validation`);
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    // Validate each file against directory enforcement rules
    const violations = [];
    for (const filePath of modifiedFiles) {
      // Only check markdown files for now (primary concern based on problem description)
      if (!filePath.endsWith('.md')) {
        continue;
      }

      // Skip files outside project root
      if (!filePath.startsWith(projectRoot)) {
        continue;
      }

      // Check if file is in correct directory
      if (!isCorrectDirectory(filePath, projectRoot)) {
        const suggestedPath = getSuggestedPath(filePath, projectRoot);
        violations.push({
          actual: filePath,
          suggested: suggestedPath,
          filename: path.basename(filePath)
        });
        log(`Directory violation: ${filePath} should be ${suggestedPath}`);
      }
    }

    // If violations found, output advisory message (non-blocking)
    if (violations.length > 0) {
      log(`Found ${violations.length} directory violations`);

      const violationMessages = violations.map(v =>
        `  - ${path.relative(projectRoot, v.actual)}\n    Should be: ${path.relative(projectRoot, v.suggested)}`
      ).join('\n');

      const advisoryMessage = `
⚠️  DIRECTORY ENFORCEMENT: Files created in incorrect directories

${violationMessages}

These files should be moved to follow directory enforcement rules.
This is advisory only - agent execution completed successfully.

To fix:
${violations.map(v => `  git mv "${v.actual}" "${v.suggested}"`).join('\n')}
`.trim();

      const response = {
        ...standardOutput,
        systemMessage: advisoryMessage
      };

      log(`Returning advisory message for ${violations.length} violations`);
      console.log(JSON.stringify(response));
      process.exit(0);
    }

    // No violations - continue normally
    log('No directory violations detected');
    console.log(JSON.stringify(standardOutput));
    process.exit(0);

  } catch (error) {
    log(`Error: ${error.message}`);
    log(`Stack: ${error.stack}`);
    // On error, allow operation to prevent blocking valid work
    console.log(JSON.stringify(standardOutput));
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}
