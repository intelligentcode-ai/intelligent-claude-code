#!/usr/bin/env node

/**
 * Unified Configuration Loader for Intelligent Claude Code
 *
 * Hierarchy: ./icc.config.json → ~/.claude/icc.config.json → icc.config.default.json
 * Backward compatibility: Falls back to CLAUDE.md/config.md if icc.config.json missing
 * 5-minute TTL cache for performance
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// Configuration cache
let configCache = null;
let configCacheTime = 0;
const CONFIG_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Deep merge two objects
 */
function deepMerge(target, source) {
  const result = { ...target };

  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
}

/**
 * Load JSON configuration from file
 */
function loadJsonConfig(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    }
  } catch (error) {
    console.error(`[config-loader] Error loading ${filePath}: ${error.message}`);
  }
  return null;
}

/**
 * Load legacy YAML/Markdown configuration
 */
function loadLegacyConfig(filePath) {
  const config = {};

  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const content = fs.readFileSync(filePath, 'utf8');

    // Parse YAML frontmatter
    const yamlMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (yamlMatch) {
      const yamlContent = yamlMatch[1];
      parseLegacyYaml(yamlContent, config);
    }

    // Parse YAML code blocks
    const yamlCodeBlockMatch = content.match(/```yaml\n([\s\S]*?)\n```/);
    if (yamlCodeBlockMatch) {
      parseLegacyYaml(yamlCodeBlockMatch[1], config);
    }

    // Parse markdown key:value pairs
    const markdownMatches = content.matchAll(/^-?\s*\*?\*?(\w+)\*?\*?:\s*(.+)$/gm);
    for (const match of markdownMatches) {
      const key = match[1];
      const value = match[2].replace(/^["']|["']$/g, '');
      parseLegacyValue(config, key, value);
    }

    return Object.keys(config).length > 0 ? config : null;

  } catch (error) {
    console.error(`[config-loader] Error loading legacy config ${filePath}: ${error.message}`);
    return null;
  }
}

/**
 * Parse legacy YAML content
 */
function parseLegacyYaml(yamlContent, config) {
  const lines = yamlContent.split('\n');

  for (const line of lines) {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      const key = match[1];
      const value = match[2].trim();
      parseLegacyValue(config, key, value);
    }
  }
}

/**
 * Parse legacy value and map to new structure
 */
function parseLegacyValue(config, key, value) {
  // Map legacy keys to new structure
  const legacyMapping = {
    'autonomy_level': ['autonomy', 'level'],
    'team_maturity_level': ['autonomy', 'level'],
    'pm_always_active': ['autonomy', 'pm_always_active'],
    'memory_integration': ['memory', 'integration'],
    'max_parallel_tasks': ['autonomy', 'l3_settings', 'max_parallel'],
    'blocking_enabled': ['enforcement', 'blocking_enabled'],
    'git_privacy': ['git', 'privacy'],
    'branch_protection': ['git', 'branch_protection'],
    'default_branch': ['git', 'default_branch'],
    'require_pr_for_main': ['git', 'require_pr_for_main'],
    'validate_commits': ['git', 'validate_commits'],
    'story_path': ['paths', 'story_path'],
    'bug_path': ['paths', 'bug_path'],
    'memory_path': ['paths', 'memory_path'],
    'docs_path': ['paths', 'docs_path'],
    'src_path': ['paths', 'src_path'],
    'test_path': ['paths', 'test_path'],
    'config_path': ['paths', 'config_path'],
    'agenttask_template_path': ['paths', 'agenttask_template_path'],
    'summaries_path': ['paths', 'summaries_path'],
    'enforce_peer_review': ['quality', 'enforce_peer_review'],
    'testing_required': ['quality', 'testing_required'],
    'documentation_required': ['quality', 'documentation_required'],
    'security_validation': ['quality', 'security_validation'],
    'compliance_checking': ['quality', 'compliance_checking'],
    'auto_cleanup': ['development', 'auto_cleanup'],
    'file_management_strict': ['development', 'file_management_strict'],
    'testing_approach': ['development', 'testing_approach'],
    'context7_enabled': ['tools', 'context7_enabled'],
    'sequential_thinking': ['tools', 'sequential_thinking'],
    'mcp_tools_enabled': ['tools', 'mcp_tools_enabled'],
    'subagent_model': ['subagents', 'model'],
    'subagent_threshold': ['subagents', 'threshold'],
    'max_concurrent_subagents': ['subagents', 'max_concurrent'],
    'auto_delegation': ['subagents', 'auto_delegation'],
    'repository_type': ['project', 'repository_type'],
    'release_automation': ['project', 'release_automation']
  };

  if (legacyMapping[key]) {
    const path = legacyMapping[key];
    let current = config;

    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) {
        current[path[i]] = {};
      }
      current = current[path[i]];
    }

    // Parse value type
    const parsedValue = parseValue(value);
    current[path[path.length - 1]] = parsedValue;
  }
}

/**
 * Parse value to appropriate type
 */
function parseValue(value) {
  const lower = value.toLowerCase();

  if (lower === 'true') return true;
  if (lower === 'false') return false;
  if (!isNaN(value) && value.trim() !== '') return Number(value);

  // Remove quotes
  return value.replace(/^["']|["']$/g, '');
}

/**
 * Find configuration file in priority order
 */
function findConfigFile(projectRoot, filename) {
  const baseFilename = filename.replace('icc.', '');
  const searchPaths = [
    path.join(projectRoot, '.icc', baseFilename),      // .icc/config.json
    path.join(projectRoot, filename),                   // icc.config.json
    path.join(projectRoot, '.claude', filename)         // .claude/icc.config.json
  ];

  for (const searchPath of searchPaths) {
    if (fs.existsSync(searchPath)) {
      return searchPath;
    }
  }

  return null;
}

/**
 * Load workflow configuration from hierarchy
 */
function loadWorkflowConfig() {
  // 1. Load default workflow configuration
  // Try installed location first (~/.claude/), then repo root (for testing)
  let defaultWorkflowPath = path.join(__dirname, '../..', 'icc.workflow.default.json');
  let workflowConfig = loadJsonConfig(defaultWorkflowPath);

  if (!workflowConfig) {
    // Fallback to repo root for local development/testing
    defaultWorkflowPath = path.join(__dirname, '../../..', 'icc.workflow.default.json');
    workflowConfig = loadJsonConfig(defaultWorkflowPath);
  }

  if (!workflowConfig) {
    console.error('[config-loader] CRITICAL: Default workflow configuration not found');
    console.error('[config-loader] Searched paths:');
    console.error('[config-loader]   - ' + path.join(__dirname, '../..', 'icc.workflow.default.json'));
    console.error('[config-loader]   - ' + path.join(__dirname, '../../..', 'icc.workflow.default.json'));
    workflowConfig = {};
  }

  // 2. Try to load user global workflow configuration
  const userWorkflowPath = findConfigFile(path.join(os.homedir(), '.claude'), 'icc.workflow.json');
  if (userWorkflowPath) {
    const userWorkflow = loadJsonConfig(userWorkflowPath);
    if (userWorkflow) {
      workflowConfig = deepMerge(workflowConfig, userWorkflow);
    }
  }

  // 3. Try to load project workflow configuration
  const projectWorkflowPath = findConfigFile(process.cwd(), 'icc.workflow.json');
  if (projectWorkflowPath) {
    const projectWorkflow = loadJsonConfig(projectWorkflowPath);
    if (projectWorkflow) {
      workflowConfig = deepMerge(workflowConfig, projectWorkflow);
    }
  }

  return workflowConfig;
}

/**
 * Load configuration from hierarchy
 */
function loadConfig() {
  const now = Date.now();

  // Return cached config if still valid
  if (configCache && (now - configCacheTime) < CONFIG_CACHE_TTL) {
    return configCache;
  }

  // 1. Load default configuration
  // Try installed location first (~/.claude/), then repo root (for testing)
  let defaultConfigPath = path.join(__dirname, '../..', 'icc.config.default.json');
  let config = loadJsonConfig(defaultConfigPath);

  if (!config) {
    // Fallback to repo root for local development/testing
    defaultConfigPath = path.join(__dirname, '../../..', 'icc.config.default.json');
    config = loadJsonConfig(defaultConfigPath);
  }

  if (!config) {
    console.error('[config-loader] CRITICAL: Default configuration not found');
    console.error('[config-loader] Searched paths:');
    console.error('[config-loader]   - ' + path.join(__dirname, '../..', 'icc.config.default.json'));
    console.error('[config-loader]   - ' + path.join(__dirname, '../../..', 'icc.config.default.json'));
    config = getHardcodedDefaults();
  }

  // 2. Try to load user global configuration
  const userConfigPath = findConfigFile(path.join(os.homedir(), '.claude'), 'icc.config.json');
  let userConfig = null;
  if (userConfigPath) {
    userConfig = loadJsonConfig(userConfigPath);
    if (userConfig) {
      config = deepMerge(config, userConfig);
    }
  }

  // 3. Try to load project configuration
  const projectConfigPath = findConfigFile(process.cwd(), 'icc.config.json');
  let projectConfig = null;
  if (projectConfigPath) {
    projectConfig = loadJsonConfig(projectConfigPath);
    if (projectConfig) {
      config = deepMerge(config, projectConfig);
    }
  }

  // 4. Load workflow configuration (separate file)
  const workflowConfig = loadWorkflowConfig();
  if (workflowConfig && Object.keys(workflowConfig).length > 0) {
    config.workflow = workflowConfig;
  }

  // 5. Backward compatibility: Try legacy configurations
  if (!projectConfig && !userConfig) {
    const legacyPaths = [
      path.join(process.cwd(), 'CLAUDE.md'),
      path.join(process.cwd(), 'config.md'),
      path.join(process.cwd(), '.claude', 'config.md')
    ];

    for (const legacyPath of legacyPaths) {
      const legacyConfig = loadLegacyConfig(legacyPath);
      if (legacyConfig) {
        console.warn(`[config-loader] Loading from legacy ${legacyPath} - consider migrating to icc.config.json`);
        config = deepMerge(config, legacyConfig);
        break;
      }
    }
  }

  // Cache the configuration
  configCache = config;
  configCacheTime = now;

  return config;
}

/**
 * Get hardcoded defaults (fallback if default config missing)
 */
function getHardcodedDefaults() {
  return {
    autonomy: {
      level: 'L2',
      pm_always_active: true,
      l3_settings: {
        max_parallel: 5,
        auto_discover: true,
        continue_on_error: true
      }
    },
    git: {
      privacy: true,
      branch_protection: true,
      default_branch: 'main',
      require_pr_for_main: true,
      validate_commits: true
    },
    paths: {
      story_path: 'stories',
      bug_path: 'bugs',
      memory_path: 'memory',
      docs_path: 'docs',
      src_path: 'src',
      test_path: 'tests',
      config_path: 'config',
      agenttask_template_path: 'agenttask-templates',
      summaries_path: 'summaries'
    },
    enforcement: {
      blocking_enabled: true,
      violation_logging: true,
      auto_correction: true,
      heredoc_allowed_commands: ['git', 'gh', 'glab', 'hub']
    }
  };
}

/**
 * Get specific setting using dot notation
 */
function getSetting(key, defaultValue = undefined) {
  const config = loadConfig();
  const parts = key.split('.');

  let current = config;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return defaultValue;
    }
  }

  return current !== undefined ? current : defaultValue;
}

/**
 * Clear cache (for testing)
 */
function clearCache() {
  configCache = null;
  configCacheTime = 0;
}

module.exports = {
  loadConfig,
  getSetting,
  clearCache
};
