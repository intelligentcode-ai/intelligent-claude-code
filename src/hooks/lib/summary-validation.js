const path = require('path');
const fs = require('fs');
const { getSetting } = require('./config-loader');

/**
 * Check if file should be categorized as a summary file
 * Excludes: stories/, bugs/, docs/, src/, tests/, config/, agenttasks/
 */
function isSummaryFile(filePath, projectRoot) {
  const fileName = path.basename(filePath);

  // TIER 1: Explicit work item patterns (HIGHEST PRIORITY)
  // STORY-*.md, BUG-*.md, EPIC-*.md are NEVER summary files
  const workItemPatterns = [
    /^STORY-\d+-.*\.md$/i,
    /^BUG-\d+-.*\.md$/i,
    /^EPIC-\d+-.*\.md$/i
  ];

  if (workItemPatterns.some(pattern => pattern.test(fileName))) {
    return false;  // Definitely not a summary file
  }

  // TIER 2: Location-based validation (use ABSOLUTE paths)
  // Convert to absolute path to avoid cwd issues
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(projectRoot, filePath);

  const allowedDirs = ['stories', 'bugs', 'docs', 'src', 'tests', 'agenttasks'];

  for (const dir of allowedDirs) {
    const dirPath = path.join(projectRoot, dir);
    if (absolutePath.startsWith(dirPath + path.sep) || absolutePath.startsWith(dirPath)) {
      return false;  // In allowed directory, not a summary
    }
  }

  // TIER 3: Root directory special files
  const rootAllowedFiles = [
    'VERSION', 'README.md', 'CLAUDE.md', 'CHANGELOG.md',
    'LICENSE', 'LICENSE.md', '.gitignore', 'package.json',
    'icc.config.json'
  ];

  const relativePath = path.relative(projectRoot, absolutePath);
  const isInRoot = !relativePath.includes(path.sep);

  if (isInRoot && rootAllowedFiles.includes(fileName)) {
    return false;
  }

  // TIER 4: Keyword heuristics (ONLY for root directory files)
  // Only check if file is being written to project root
  if (!isInRoot) {
    return false;  // Not in root, so not subject to summary classification
  }

  // Apply keyword patterns only to root files
  const summaryPatterns = [
    /summary/i, /report/i, /analysis/i, /review/i,
    /assessment/i, /deployment/i, /post-mortem/i, /postmortem/i
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
