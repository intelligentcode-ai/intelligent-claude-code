const path = require('path');

/**
 * Determine correct directory based on filename pattern
 *
 * @param {string} filename - The filename to check
 * @param {string} projectRoot - The project root directory
 * @returns {string} - The correct directory path for this filename
 */
function getCorrectDirectory(filename, projectRoot) {
  const basename = path.basename(filename);

  // BUG patterns → bugs/
  if (basename.match(/^BUG-\d+-.*\.md$/)) {
    return path.join(projectRoot, 'bugs');
  }

  // STORY/EPIC patterns → stories/
  if (basename.match(/^(STORY|EPIC)-\d+-.*\.md$/)) {
    return path.join(projectRoot, 'stories');
  }

  // AGENTTASK patterns → agenttasks/
  if (basename.match(/AGENTTASK-\d+.*\.(yaml|agenttask\.yaml)$/)) {
    return path.join(projectRoot, 'agenttasks');
  }

  // Root-level whitelisted files → project root
  const rootWhitelist = [
    'CLAUDE.md', 'VERSION', 'icc.config.json', 'icc.workflow.json',
    'README.md', 'CHANGELOG.md', 'LICENSE', '.gitignore',
    'Makefile', 'package.json', 'package-lock.json', 'config.md'
  ];
  if (rootWhitelist.includes(basename)) {
    return projectRoot;
  }

  // Documentation files → docs/
  const docsPatterns = [
    /^architecture\.md$/,
    /^api\.md$/,
    /^design\.md$/,
    /^guide\.md$/,
    /.*-guide\.md$/,
    /.*-docs\.md$/
  ];
  if (docsPatterns.some(pattern => pattern.test(basename))) {
    return path.join(projectRoot, 'docs');
  }

  // Memory files → memory/
  // Check if filename contains 'memory/' to detect memory directory files
  if (filename.includes('memory/')) {
    return path.join(projectRoot, 'memory');
  }

  // Default → summaries/
  return path.join(projectRoot, 'summaries');
}

/**
 * Check if file path matches correct directory for its filename
 *
 * @param {string} filePath - The file path to check
 * @param {string} projectRoot - The project root directory
 * @returns {boolean} - True if file is in correct directory
 */
function isCorrectDirectory(filePath, projectRoot) {
  const basename = path.basename(filePath);

  // ONLY apply directory enforcement to .md files
  if (!basename.endsWith('.md')) {
    return true; // Non-.md files exempt from enforcement
  }

  const actualDir = path.dirname(filePath);
  const expectedDir = getCorrectDirectory(basename, projectRoot);

  const normalizedActual = path.normalize(actualDir);
  const normalizedExpected = path.normalize(expectedDir);

  // If the expected directory is docs/, allow any path that contains a docs segment
  if (normalizedExpected.endsWith(path.sep + 'docs')) {
    const segments = normalizedActual.split(path.sep);
    if (segments.includes('docs')) {
      return true;
    }
  }

  // Allow exact match OR file in subdirectory of expected directory
  if (normalizedActual === normalizedExpected) {
    return true;
  }

  // Check if actualDir is a subdirectory of expectedDir
  const relativePath = path.relative(normalizedExpected, normalizedActual);
  const isSubdir = relativePath && !relativePath.startsWith('..') && !path.isAbsolute(relativePath);

  return isSubdir;
}

/**
 * Get suggested correct path for a file
 *
 * @param {string} filePath - The current file path
 * @param {string} projectRoot - The project root directory
 * @returns {string} - The suggested correct path
 */
function getSuggestedPath(filePath, projectRoot) {
  const filename = path.basename(filePath);
  const correctDir = getCorrectDirectory(filename, projectRoot);
  return path.join(correctDir, filename);
}

module.exports = {
  getCorrectDirectory,
  isCorrectDirectory,
  getSuggestedPath
};
