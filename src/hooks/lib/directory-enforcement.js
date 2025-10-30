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

  // STORY/EPIC/BUG patterns → stories/
  if (basename.match(/^(STORY|EPIC|BUG)-\d+-.*\.md$/)) {
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
    'Makefile', 'package.json', 'package-lock.json'
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

  return normalizedActual === normalizedExpected;
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
