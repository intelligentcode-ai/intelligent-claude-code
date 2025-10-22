const fs = require('fs');
const path = require('path');

/**
 * Detect if current project IS intelligent-claude-code repository
 * @param {string} projectRoot - Absolute path to project root
 * @returns {boolean} true if development context, false otherwise
 */
function isDevelopmentContext(projectRoot) {
  try {
    const srcTemplatesPath = path.join(projectRoot, 'src', 'agenttask-templates');
    const srcBehaviorsPath = path.join(projectRoot, 'src', 'behaviors');
    const versionPath = path.join(projectRoot, 'VERSION');

    return fs.existsSync(srcTemplatesPath) &&
           fs.existsSync(srcBehaviorsPath) &&
           fs.existsSync(versionPath);
  } catch (error) {
    return false;
  }
}

module.exports = {
  isDevelopmentContext
};
