const fs = require('fs');
const path = require('path');
const { loadConfig, getSetting } = require('./config-loader');

/**
 * File Validation Utilities
 * Shared validation functions for file operations
 */

/**
 * Check if file is a summary file based on naming patterns
 * @param {string} filePath - File path to check
 * @param {string} projectRoot - Project root path
 * @returns {boolean} true if file is summary-type
 */
function isSummaryFile(filePath, projectRoot) {
  // Normalize to relative path if absolute
  let relativePath = filePath;
  if (path.isAbsolute(filePath)) {
    relativePath = path.relative(projectRoot, filePath);
  }

  const fileName = path.basename(relativePath);

  // Check if filename matches summary patterns (case-insensitive)
  const upperFileName = fileName.toUpperCase();
  const summaryPatterns = ['SUMMARY', 'REPORT', 'VALIDATION', 'ANALYSIS', 'FIX', 'PATH-MATCHING', 'ROOT_CAUSE'];

  return summaryPatterns.some(pattern => upperFileName.includes(pattern));
}

/**
 * Validate summary file location
 * @param {string} filePath - File path to validate
 * @param {string} projectRoot - Project root path
 * @returns {Object} Validation result with allowed (boolean) and optional message
 */
function validateSummaryFile(filePath, projectRoot) {
  if (!isSummaryFile(filePath, projectRoot)) {
    return { allowed: true };
  }

  // Normalize to relative path if absolute
  let relativePath = filePath;
  if (path.isAbsolute(filePath)) {
    relativePath = path.relative(projectRoot, filePath);
  }

  // Check if file is already in summaries/ directory
  if (relativePath.startsWith('summaries/') || relativePath.startsWith('summaries\\')) {
    return { allowed: true };
  }

  // File is summary-type but NOT in summaries/ - block it
  const fileName = path.basename(filePath);
  const isAllCapitals = fileName === fileName.toUpperCase();
  const suggestedName = isAllCapitals ? fileName.toLowerCase() : fileName;
  const suggestedPath = `summaries/${suggestedName}`;

  // Ensure summaries directory exists in the project root
  const summariesDir = path.join(projectRoot, 'summaries');
  if (!fs.existsSync(summariesDir)) {
    fs.mkdirSync(summariesDir, { recursive: true });
  }

  const capitalsWarning = isAllCapitals ? '\n⚠️ Filename is all-capitals - use lowercase for consistency' : '';

  return {
    allowed: false,
    message: `📋 Summary files belong in ./summaries/ directory

Blocked: ${filePath}
Suggested: ${suggestedPath}${capitalsWarning}

Please create summary files in the summaries/ directory to keep project root clean.`
  };
}

/**
 * Validate markdown files outside allowlist
 * @param {string} filePath - File path to validate
 * @param {string} projectRoot - Project root path
 * @param {boolean} isAgentContext - Whether in agent context (vs PM context)
 * @returns {Object} Validation result with allowed (boolean) and optional message
 */
function validateMarkdownOutsideAllowlist(filePath, projectRoot, isAgentContext = false) {
  // Check if file is markdown
  if (!filePath.endsWith('.md')) {
    return { allowed: true };
  }

  // Normalize to relative path if absolute
  let relativePath = filePath;
  if (path.isAbsolute(filePath)) {
    try {
      // Resolve both paths to handle symlinks properly
      const realFilePath = fs.existsSync(filePath) ? fs.realpathSync(filePath) : filePath;
      const realProjectRoot = fs.realpathSync(projectRoot);
      relativePath = path.relative(realProjectRoot, realFilePath);
    } catch (error) {
      // Fallback to original calculation if resolution fails
      relativePath = path.relative(projectRoot, filePath);
    }
  }

  // Get configured allowlist
  const config = loadConfig();
  const allowlist = [
    config.paths.story_path,
    config.paths.bug_path,
    config.paths.memory_path,
    config.paths.docs_path,
    'agenttasks',
    'summaries'
  ];

  const fileName = path.basename(relativePath);
  const dirName = path.dirname(relativePath);

  // PRIORITY 1: Root .md files are ALWAYS allowed
  if (dirName === '.' || dirName === '') {
    return { allowed: true };
  }

  // PRIORITY 2: README.md (case-insensitive) ALWAYS allowed anywhere
  const isReadme = fileName.toUpperCase() === 'README.MD';
  if (isReadme) {
    return { allowed: true };
  }

  // PRIORITY 3: Check if markdown is in allowlist directory
  for (const allowedPath of allowlist) {
    if (relativePath.startsWith(allowedPath + '/') || relativePath === allowedPath) {
      return { allowed: true };
    }
  }

  // PRIORITY 3.5: Check parent paths if enabled
  const isOutsideProject = relativePath.startsWith('..');
  if (isOutsideProject) {
    const allowParentPaths = getSetting('enforcement.allow_parent_allowlist_paths', false);

    if (allowParentPaths) {
      const absolutePath = path.isAbsolute(filePath) ? filePath : path.join(projectRoot, filePath);
      const normalizedFilePath = path.normalize(absolutePath);
      const pathParts = normalizedFilePath.split(path.sep);

      for (const allowedPath of allowlist) {
        const allowedIndex = pathParts.indexOf(allowedPath);
        if (allowedIndex >= 0) {
          const reconstructedPath = pathParts.slice(0, allowedIndex + 1).join(path.sep);
          if (normalizedFilePath.startsWith(reconstructedPath + path.sep)) {
            return { allowed: true };
          }
        }
      }
    }
  }

  // PRIORITY 4: Check setting for files outside allowlist
  let allowMarkdown;

  if (isAgentContext) {
    // For agents: check agent-specific setting first, fallback to main setting
    const agentSetting = getSetting('enforcement.allow_markdown_outside_allowlist_agents', null);
    allowMarkdown = agentSetting !== null ? agentSetting : getSetting('enforcement.allow_markdown_outside_allowlist', false);
  } else {
    // For main scope: use main setting
    allowMarkdown = getSetting('enforcement.allow_markdown_outside_allowlist', false);
  }

  if (allowMarkdown) {
    return { allowed: true };
  }

  // PRIORITY 5: Block with message
  return {
    allowed: false,
    message: `📝 Markdown files outside allowlist directories are blocked by default

Blocked: ${filePath}
Reason: Markdown files should be in designated directories

Allowed directories for markdown: ${allowlist.join(', ')}, root *.md files

If you specifically requested this file, ask the user to enable:
enforcement.allow_markdown_outside_allowlist = true in icc.config.json

Or create the file in an appropriate allowlist directory.`
  };
}

/**
 * Extract file paths from bash redirect operators
 * @param {string} command - Bash command string
 * @returns {Array<string>} Array of file paths
 */
function extractFilePathsFromBashRedirect(command) {
  const redirectPatterns = [
    /(?:cat|echo|tee)\s+>\s*([^\s<>|&;]+)/,  // cat > file, echo > file, tee > file
    />\s*([^\s<>|&;]+)/,                      // Any command > file
    />>\s*([^\s<>|&;]+)/                      // Any command >> file
  ];

  const filePaths = [];

  for (const pattern of redirectPatterns) {
    const match = command.match(pattern);
    if (match && match[1]) {
      // Extract filename, removing quotes if present
      let filePath = match[1].replace(/^["']|["']$/g, '');
      filePaths.push(filePath);
    }
  }

  return filePaths;
}

module.exports = {
  isSummaryFile,
  validateSummaryFile,
  validateMarkdownOutsideAllowlist,
  extractFilePathsFromBashRedirect
};
