const path = require('path');
const fs = require('fs');
const { getSetting } = require('./config-loader');

/**
 * Check if file should be categorized as a summary file
 * Excludes: stories/, bugs/, docs/, src/, tests/, config/, agenttasks/
 */
function isSummaryFile(filePath, projectRoot) {
  // Normalize to relative path
  let relativePath = filePath;
  if (path.isAbsolute(filePath)) {
    relativePath = path.relative(projectRoot, filePath);
  }

  const fileName = path.basename(relativePath);

  // STEP 1: Directory-based exclusions (highest priority)
  const allowedDirectories = [
    'stories/', 'bugs/', 'docs/', 'agenttasks/',
    'src/', 'tests/', 'config/'
  ];

  for (const dir of allowedDirectories) {
    if (relativePath.startsWith(dir) || relativePath.includes(`/${dir}`)) {
      return false;  // Not a summary file - belongs in allowed directory
    }
  }

  // STEP 2: Root directory special files
  const rootAllowedFiles = [
    'VERSION', 'README.md', 'CLAUDE.md', 'CHANGELOG.md',
    'LICENSE', 'LICENSE.md', '.gitignore', 'package.json',
    'icc.config.json', 'icc.workflow.json'
  ];

  if (!relativePath.includes('/') && rootAllowedFiles.includes(fileName)) {
    return false;
  }

  // STEP 3: Check summary patterns
  const summaryPatterns = [
    /summary/i, /report/i, /fix/i, /analysis/i, /review/i,
    /assessment/i, /status/i, /progress/i, /update/i,
    /deployment/i, /verification/i, /configuration/i,
    /post-mortem/i, /postmortem/i, /monitoring/i,
    /agenttask/i, /troubleshoot/i, /diagnostic/i,
    /investigation/i, /incident/i, /resolution/i
  ];

  return summaryPatterns.some(pattern => pattern.test(fileName));
}

/**
 * Validate summary file placement
 */
function validateSummaryFilePlacement(filePath, projectRoot) {
  if (!isSummaryFile(filePath, projectRoot)) {
    return { allowed: true };
  }

  // Normalize path
  let relativePath = filePath;
  if (path.isAbsolute(filePath)) {
    relativePath = path.relative(projectRoot, filePath);
  }

  // Check if already in summaries/
  const summariesPath = getSetting('paths.summaries_path', 'summaries');
  const summariesPattern = new RegExp(`^${summariesPath}/`, 'i');

  if (summariesPattern.test(relativePath) || relativePath.includes(`/${summariesPath}/`)) {
    return { allowed: true };
  }

  // File should be in summaries/
  const fileName = path.basename(filePath);
  const suggestedPath = `${summariesPath}/${fileName}`;

  // Ensure summaries directory exists
  const summariesDir = path.join(projectRoot, summariesPath);
  if (!fs.existsSync(summariesDir)) {
    fs.mkdirSync(summariesDir, { recursive: true });
  }

  return {
    allowed: false,
    message: `📋 Summary files belong in ./${summariesPath}/ directory

Blocked: ${relativePath}
Suggested: ${suggestedPath}

Please create summary files in the ${summariesPath}/ directory to keep project root clean.`
  };
}

module.exports = {
  isSummaryFile,
  validateSummaryFilePlacement
};
