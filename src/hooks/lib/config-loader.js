#!/usr/bin/env node

/**
 * Unified Configuration Loader for Intelligent Claude Code
 *
 * Hierarchy: ./icc.config.json → ~/.claude/icc.config.json → built-in defaults
 * Backward compatibility: Falls back to CLAUDE.md if icc.config.json missing
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
    'blocking_enabled': ['enforcement', 'blocking_enabled'],
    'allow_parent_allowlist_paths': ['enforcement', 'allow_parent_allowlist_paths'],
    'main_scope_has_agent_privileges': ['enforcement', 'main_scope_has_agent_privileges'],
    'file_management_strict': ['development', 'file_management_strict'],
    'git_privacy': ['git', 'privacy'],
    'branch_protection': ['git', 'branch_protection'],
    'default_branch': ['git', 'default_branch'],
    'require_pr_for_main': ['git', 'require_pr_for_main'],
    'story_path': ['paths', 'story_path'],
    'bug_path': ['paths', 'bug_path'],
    'memory_path': ['paths', 'memory_path'],
    'docs_path': ['paths', 'docs_path'],
    'summaries_path': ['paths', 'summaries_path']
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

const ALLOWED_CONFIG_SHAPE = {
  version: true,
  description: true,
  git: {
    privacy: true,
    privacy_patterns: true,
    branch_protection: true,
    default_branch: true,
    require_pr_for_main: true
  },
  paths: {
    story_path: true,
    bug_path: true,
    memory_path: true,
    docs_path: true,
    summaries_path: true
  },
  development: {
    file_management_strict: true
  },
  enforcement: {
    blocking_enabled: true,
    allow_parent_allowlist_paths: true,
    main_scope_has_agent_privileges: true,
    allowed_allcaps_files: true,
    infrastructure_protection: {
      enabled: true,
      emergency_override_enabled: true,
      emergency_override_token: true,
      imperative_destructive: true,
      write_operations: true,
      read_operations: true,
      whitelist: true,
      read_operations_allowed: true
    }
  }
};

const EXPECTED_TYPES = {
  version: 'string',
  description: 'string',
  git: 'object',
  'git.privacy': 'boolean',
  'git.privacy_patterns': 'array',
  'git.branch_protection': 'boolean',
  'git.default_branch': 'string',
  'git.require_pr_for_main': 'boolean',
  paths: 'object',
  'paths.story_path': 'string',
  'paths.bug_path': 'string',
  'paths.memory_path': 'string',
  'paths.docs_path': 'string',
  'paths.summaries_path': 'string',
  development: 'object',
  'development.file_management_strict': 'boolean',
  enforcement: 'object',
  'enforcement.blocking_enabled': 'boolean',
  'enforcement.allow_parent_allowlist_paths': 'boolean',
  'enforcement.main_scope_has_agent_privileges': 'boolean',
  'enforcement.allowed_allcaps_files': 'array',
  'enforcement.infrastructure_protection': 'object',
  'enforcement.infrastructure_protection.enabled': 'boolean',
  'enforcement.infrastructure_protection.emergency_override_enabled': 'boolean',
  'enforcement.infrastructure_protection.emergency_override_token': 'string',
  'enforcement.infrastructure_protection.imperative_destructive': 'array',
  'enforcement.infrastructure_protection.write_operations': 'array',
  'enforcement.infrastructure_protection.read_operations': 'array',
  'enforcement.infrastructure_protection.whitelist': 'array',
  'enforcement.infrastructure_protection.read_operations_allowed': 'boolean'
};

function isType(value, expected) {
  if (expected === 'array') return Array.isArray(value);
  if (expected === 'object') return value && typeof value === 'object' && !Array.isArray(value);
  return typeof value === expected;
}

function filterConfig(obj, shape, basePath = '', removed = [], typeErrors = []) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return { filtered: obj, removed, typeErrors };
  }
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const keyPath = basePath ? `${basePath}.${key}` : key;
    if (!(key in shape)) {
      removed.push(keyPath);
      continue;
    }
    const rule = shape[key];
    if (rule === true) {
      const expected = EXPECTED_TYPES[keyPath];
      if (expected && !isType(value, expected)) {
        typeErrors.push(`${keyPath} (expected ${expected})`);
        continue;
      }
      result[key] = value;
      continue;
    }
    if (rule && typeof rule === 'object') {
      if (!isType(value, 'object')) {
        typeErrors.push(`${keyPath} (expected object)`);
        continue;
      }
      const nested = filterConfig(value, rule, keyPath, removed, typeErrors);
      result[key] = nested.filtered || {};
      continue;
    }
    result[key] = value;
  }
  return { filtered: result, removed, typeErrors };
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

  // 1. Load hardcoded defaults
  let config = getHardcodedDefaults();

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

  // 4. Backward compatibility: Try legacy CLAUDE.md configuration
  if (!projectConfig && !userConfig) {
    const legacyPaths = [
      path.join(process.cwd(), 'CLAUDE.md')
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

  // Filter unknown keys to keep v9 alignment
  const { filtered, removed, typeErrors } = filterConfig(config, ALLOWED_CONFIG_SHAPE);
  if (removed.length > 0) {
    console.warn(`[config-loader] Ignored unsupported keys: ${removed.join(', ')}`);
  }
  if (typeErrors.length > 0) {
    console.warn(`[config-loader] Ignored keys with invalid types: ${typeErrors.join(', ')}`);
  }

  // Cache the configuration
  configCache = filtered;
  configCacheTime = now;

  return filtered;
}

/**
 * Get hardcoded defaults (fallback if default config missing)
 */
function getHardcodedDefaults() {
  return {
    git: {
      privacy: true,
      branch_protection: true,
      default_branch: 'main',
      require_pr_for_main: true,
      privacy_patterns: [
        'AI',
        'Claude',
        'agent',
        'Generated with Claude Code',
        'Co-Authored-By: Claude'
      ]
    },
    paths: {
      story_path: 'stories',
      bug_path: 'bugs',
      memory_path: 'memory',
      docs_path: 'docs',
      summaries_path: 'summaries'
    },
    enforcement: {
      blocking_enabled: true,
      allow_parent_allowlist_paths: false,
      main_scope_has_agent_privileges: false,
      allowed_allcaps_files: [
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
      ],
      infrastructure_protection: {
        enabled: true,
        emergency_override_enabled: false,
        emergency_override_token: '',
        imperative_destructive: [],
        write_operations: [],
        read_operations: [],
        whitelist: [],
        read_operations_allowed: true
      }
    },
    development: {
      file_management_strict: true
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
