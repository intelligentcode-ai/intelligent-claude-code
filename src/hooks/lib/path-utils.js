const fs = require('fs');
const path = require('path');
const { loadConfig, getSetting } = require('./config-loader');
const { isDevelopmentContext } = require('./context-detection');

/**
 * Path Utilities
 * Shared path validation and checking functions
 */

/**
 * Get configured allowlist paths
 * @param {string} projectRoot - Project root path
 * @returns {Object} Object with allowlist and blocklist arrays
 */
function getConfiguredPaths(projectRoot) {
  const config = loadConfig();

  const allowlist = [
    config.paths.story_path,
    config.paths.bug_path,
    config.paths.memory_path,
    config.paths.docs_path,
    'agenttasks',
    'summaries'
  ];

  // In development context, allow src/ directory edits
  if (isDevelopmentContext(projectRoot)) {
    allowlist.push('src');
  }

  return {
    allowlist: allowlist,
    blocklist: [
      config.paths.src_path,
      config.paths.test_path,
      config.paths.config_path,
      'lib'
    ]
  };
}

/**
 * Check if path is in allowlist
 * @param {string} filePath - File path to check
 * @param {Array<string>} allowlist - Array of allowed paths
 * @param {string} projectRoot - Project root path
 * @returns {boolean} true if path is allowed
 */
function isPathInAllowlist(filePath, allowlist, projectRoot) {
  // Normalize to absolute path
  const absolutePath = path.isAbsolute(filePath) ? filePath : path.join(projectRoot, filePath);
  const normalizedFilePath = path.normalize(absolutePath);
  const normalizedProjectRoot = path.normalize(projectRoot);

  // Extract filename and directory
  const fileName = path.basename(normalizedFilePath);
  const fileDir = path.dirname(normalizedFilePath);

  // Check if file is in project root
  const isInProjectRoot = path.normalize(fileDir) === normalizedProjectRoot;

  if (isInProjectRoot) {
    // Allow root *.md files
    if (fileName.endsWith('.md')) {
      return true;
    }
    // Allow root config/version files
    if (fileName === 'icc.config.json' || fileName === 'icc.workflow.json' || fileName === 'VERSION') {
      return true;
    }
  }

  // Calculate relative path from project root
  const relativePath = path.relative(normalizedProjectRoot, normalizedFilePath);

  // Check if path is within project boundaries (doesn't start with '..')
  const isWithinProject = !relativePath.startsWith('..');

  if (isWithinProject) {
    // Check if ANY directory component matches an allowlist directory
    const pathParts = relativePath.split(path.sep);

    for (const allowedPath of allowlist) {
      // Check if any directory in the path matches allowlist directory
      for (const part of pathParts) {
        if (part === allowedPath) {
          return true;
        }
      }
    }
  } else {
    // Path goes outside project root (contains '../')
    // Check if allow_parent_allowlist_paths is enabled
    const allowParentPaths = getSetting('enforcement.allow_parent_allowlist_paths', false);

    if (allowParentPaths) {
      // Split normalized path into components
      const pathParts = normalizedFilePath.split(path.sep);

      // Check if ANY directory component matches an allowlist directory
      for (const allowedPath of allowlist) {
        const allowedIndex = pathParts.indexOf(allowedPath);
        if (allowedIndex >= 0) {
          // Found allowlist directory in path
          // Verify file is actually under this directory (not just same name in path)
          const reconstructedPath = pathParts.slice(0, allowedIndex + 1).join(path.sep);
          if (normalizedFilePath.startsWith(reconstructedPath + path.sep)) {
            return true;
          }
        }
      }
    }
  }

  return false;
}

/**
 * Check if path is in blocklist
 * @param {string} filePath - File path to check
 * @param {Array<string>} blocklist - Array of blocked paths
 * @param {string} projectRoot - Project root path
 * @returns {boolean} true if path is blocked
 */
function isPathInBlocklist(filePath, blocklist, projectRoot) {
  // Normalize to relative path if absolute
  let relativePath = filePath;

  if (path.isAbsolute(filePath)) {
    relativePath = path.relative(projectRoot, filePath);
  }

  // Check if path starts with any blocklist directory
  for (const blockedPath of blocklist) {
    if (relativePath.startsWith(blockedPath + '/') || relativePath === blockedPath) {
      return true;
    }
  }

  return false;
}

/**
 * Find project root by scanning upward for project markers
 * @param {string} startPath - Starting path for search
 * @returns {string} Project root path
 */
function findProjectRoot(startPath) {
  // Project markers in priority order
  const markers = [
    '.git',           // Git repository (highest priority)
    'CLAUDE.md',      // ICC project marker
    'package.json',   // Node.js project
    'pyproject.toml', // Python project (modern)
    'setup.py',       // Python project (legacy)
    'Cargo.toml',     // Rust project
    'pom.xml',        // Maven (Java)
    'build.gradle',   // Gradle (Java/Kotlin)
    'go.mod',         // Go project
    'Gemfile',        // Ruby project
    'composer.json'   // PHP project
  ];

  let currentPath = path.resolve(startPath);
  const root = path.parse(currentPath).root;

  // Scan upward from startPath to filesystem root
  while (currentPath !== root) {
    // Check each marker
    for (const marker of markers) {
      const markerPath = path.join(currentPath, marker);
      try {
        if (fs.existsSync(markerPath)) {
          // Found project marker - this is the root
          return currentPath;
        }
      } catch (error) {
        // Ignore permission errors, continue search
      }
    }

    // Move up one directory
    const parentPath = path.dirname(currentPath);
    if (parentPath === currentPath) {
      break; // Reached filesystem root
    }
    currentPath = parentPath;
  }

  // No project markers found - check if startPath is a common subdirectory
  const startDirName = path.basename(startPath);
  const commonSubdirs = ['docs', 'src', 'lib', 'tests', 'test', 'dist', 'build', 'bin'];

  if (commonSubdirs.includes(startDirName)) {
    // We're in a common subdirectory - parent is likely project root
    const parentPath = path.dirname(path.resolve(startPath));
    return parentPath;
  }

  // Absolute fallback - use startPath (working directory)
  return startPath;
}

/**
 * Check if path is installation path (~/.claude/)
 * @param {string} filePath - File path to check
 * @returns {boolean} true if path is in installation directory
 */
function isInstallationPath(filePath) {
  const os = require('os');
  const homedir = os.homedir();
  const claudeDir = path.join(homedir, '.claude');
  const absolutePath = path.resolve(filePath);

  return absolutePath.startsWith(claudeDir + path.sep) || absolutePath === claudeDir;
}

module.exports = {
  getConfiguredPaths,
  isPathInAllowlist,
  isPathInBlocklist,
  findProjectRoot,
  isInstallationPath
};
