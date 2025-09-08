/**
 * Configuration Loader for Intent Pattern System
 * 
 * Loads and validates intent pattern configuration with support for:
 * - Schema validation
 * - Environment variable overrides  
 * - Caching with TTL
 * - Hot-reload capability
 * - Default fallback values
 */

const fs = require('fs');
const path = require('path');

/**
 * Configuration cache with TTL
 */
class ConfigCache {
  constructor(ttlMs = 300000) { // 5 minutes default
    this.cache = new Map();
    this.ttlMs = ttlMs;
  }

  set(key, value) {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }

  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const isExpired = (Date.now() - entry.timestamp) > this.ttlMs;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  clear() {
    this.cache.clear();
  }

  has(key) {
    return this.get(key) !== null;
  }
}

/**
 * Configuration loader singleton
 */
class ConfigLoader {
  constructor() {
    this.cache = new ConfigCache();
    this.configPath = this._resolveConfigPath();
    this.watchedFiles = new Set();
    this.watchers = new Map();
  }

  /**
   * Resolve config path based on project vs user scope
   * @private
   */
  _resolveConfigPath() {
    // Check for project scope first
    if (process.env.CLAUDE_PROJECT_DIR) {
      const projectConfigPath = path.join(process.env.CLAUDE_PROJECT_DIR, '.claude', 'hooks', 'config', 'intent-patterns.json');
      if (fs.existsSync(projectConfigPath)) {
        return projectConfigPath;
      }
    }
    
    // Fall back to relative path (works for both user and project installations)
    return path.join(__dirname, '../config/intent-patterns.json');
  }

  /**
   * Load configuration with caching and validation
   * @param {boolean} forceReload - Force reload from disk
   * @returns {Object} Validated configuration
   */
  async loadConfig(forceReload = false) {
    const cacheKey = 'intent-patterns';
    
    if (!forceReload && this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const config = await this._loadFromDisk();
      const validatedConfig = this._validateConfig(config);
      const finalConfig = this._applyOverrides(validatedConfig);
      
      this.cache.set(cacheKey, finalConfig);
      this._setupWatcher();
      
      return finalConfig;
    } catch (error) {
      console.error('Failed to load intent patterns configuration:', error.message);
      return this._getDefaultConfig();
    }
  }

  /**
   * Load raw configuration from disk
   * @private
   */
  async _loadFromDisk() {
    if (!fs.existsSync(this.configPath)) {
      throw new Error(`Configuration file not found: ${this.configPath}`);
    }

    const configContent = fs.readFileSync(this.configPath, 'utf8');
    
    try {
      const parsed = JSON.parse(configContent);
      
      // Handle schema+data format or pure data format
      if (parsed.data && parsed.$schema) {
        return parsed.data;
      }
      
      return parsed;
    } catch (parseError) {
      throw new Error(`Invalid JSON in configuration file: ${parseError.message}`);
    }
  }

  /**
   * Validate configuration against expected schema
   * @private
   */
  _validateConfig(config) {
    const errors = [];

    // Validate required top-level properties
    if (!config.version) {
      errors.push('Missing required property: version');
    }

    if (!config.intents || typeof config.intents !== 'object') {
      errors.push('Missing or invalid required property: intents');
    } else {
      // Validate required intents
      const requiredIntents = ['research', 'qa', 'planning', 'work'];
      for (const intent of requiredIntents) {
        if (!config.intents[intent]) {
          errors.push(`Missing required intent: ${intent}`);
        } else {
          this._validateIntent(intent, config.intents[intent], errors);
        }
      }
    }

    if (!config.defaults) {
      errors.push('Missing required property: defaults');
    } else {
      this._validateDefaults(config.defaults, errors);
    }

    if (errors.length > 0) {
      throw new Error(`Configuration validation failed: ${errors.join(', ')}`);
    }

    return config;
  }

  /**
   * Validate individual intent configuration
   * @private
   */
  _validateIntent(intentName, intent, errors) {
    if (!Array.isArray(intent.allowed_tools)) {
      errors.push(`${intentName}.allowed_tools must be an array`);
    }

    if (!Array.isArray(intent.blocked_tools)) {
      errors.push(`${intentName}.blocked_tools must be an array`);
    }

    const validEnforcements = ['allow', 'warn', 'block', 'require_prb_context'];
    if (!validEnforcements.includes(intent.enforcement)) {
      errors.push(`${intentName}.enforcement must be one of: ${validEnforcements.join(', ')}`);
    }

    // Validate parameter patterns if present
    if (intent.parameter_patterns) {
      this._validatePatterns(`${intentName}.parameter_patterns`, intent.parameter_patterns, errors);
    }

    // Validate path patterns if present
    if (intent.path_patterns) {
      this._validatePatterns(`${intentName}.path_patterns`, intent.path_patterns, errors);
    }
  }

  /**
   * Validate pattern objects (allowed/blocked arrays)
   * @private
   */
  _validatePatterns(patternName, patterns, errors) {
    if (patterns.allowed && !Array.isArray(patterns.allowed)) {
      errors.push(`${patternName}.allowed must be an array`);
    }

    if (patterns.blocked && !Array.isArray(patterns.blocked)) {
      errors.push(`${patternName}.blocked must be an array`);
    }

    // Validate regex patterns
    const allPatterns = [...(patterns.allowed || []), ...(patterns.blocked || [])];
    for (const pattern of allPatterns) {
      try {
        new RegExp(pattern);
      } catch (regexError) {
        errors.push(`${patternName} contains invalid regex: ${pattern}`);
      }
    }
  }

  /**
   * Validate defaults configuration
   * @private
   */
  _validateDefaults(defaults, errors) {
    const validEnforcements = ['allow', 'warn', 'block', 'require_prb_context'];
    if (!validEnforcements.includes(defaults.enforcement)) {
      errors.push(`defaults.enforcement must be one of: ${validEnforcements.join(', ')}`);
    }

    const validIntents = ['research', 'qa', 'planning', 'work'];
    if (!validIntents.includes(defaults.unknown_intent)) {
      errors.push(`defaults.unknown_intent must be one of: ${validIntents.join(', ')}`);
    }
  }

  /**
   * Apply environment variable overrides
   * @private
   */
  _applyOverrides(config) {
    const overrides = { ...config.overrides };

    // Environment variable overrides
    if (process.env.HOOK_DEBUG_MODE !== undefined) {
      overrides.debug_mode = process.env.HOOK_DEBUG_MODE.toLowerCase() === 'true';
    }

    if (process.env.HOOK_STRICT_MODE !== undefined) {
      overrides.strict_mode = process.env.HOOK_STRICT_MODE.toLowerCase() === 'true';
    }

    if (process.env.HOOK_DEFAULT_ENFORCEMENT) {
      config.defaults.enforcement = process.env.HOOK_DEFAULT_ENFORCEMENT;
    }

    return {
      ...config,
      overrides
    };
  }

  /**
   * Setup file watcher for hot-reload capability
   * @private
   */
  _setupWatcher() {
    if (this.watchers.has(this.configPath)) {
      return; // Already watching
    }

    try {
      const watcher = fs.watch(this.configPath, (eventType) => {
        if (eventType === 'change') {
          console.log('Configuration file changed, clearing cache');
          this.cache.clear();
        }
      });

      this.watchers.set(this.configPath, watcher);
      this.watchedFiles.add(this.configPath);
    } catch (error) {
      console.warn('Failed to setup configuration file watcher:', error.message);
    }
  }

  /**
   * Get default fallback configuration
   * @private
   */
  _getDefaultConfig() {
    return {
      version: '1.0.0',
      intents: {
        research: {
          allowed_tools: ['Read', 'Grep', 'Glob', 'WebSearch', 'WebFetch', 'Bash'],
          blocked_tools: ['Edit', 'Write', 'MultiEdit', 'NotebookEdit'],
          parameter_patterns: { allowed: [], blocked: [] },
          path_patterns: { allowed: [], blocked: [] },
          context_requires: ['read_only_operation'],
          enforcement: 'allow'
        },
        qa: {
          allowed_tools: ['Read', 'Grep', 'Glob', 'WebSearch', 'WebFetch'],
          blocked_tools: ['Edit', 'Write', 'MultiEdit', 'NotebookEdit', 'Bash'],
          parameter_patterns: { allowed: [], blocked: [] },
          path_patterns: { allowed: [], blocked: [] },
          context_requires: ['question_answering'],
          enforcement: 'allow'
        },
        planning: {
          allowed_tools: ['Read', 'Grep', 'Glob', 'Write'],
          blocked_tools: ['Edit', 'MultiEdit', 'NotebookEdit'],
          parameter_patterns: { allowed: [], blocked: [] },
          path_patterns: { allowed: [], blocked: [] },
          context_requires: ['prb_context'],
          enforcement: 'allow'
        },
        work: {
          allowed_tools: [],
          blocked_tools: ['Edit', 'Write', 'MultiEdit', 'NotebookEdit', 'Bash'],
          parameter_patterns: { allowed: [], blocked: ['.*'] },
          path_patterns: { allowed: [], blocked: ['.*'] },
          context_requires: ['prb_context', 'agent_execution'],
          enforcement: 'require_prb_context'
        }
      },
      defaults: {
        enforcement: 'warn',
        unknown_intent: 'research'
      },
      overrides: {
        debug_mode: false,
        strict_mode: true
      }
    };
  }

  /**
   * Get configuration for specific intent
   * @param {string} intentType - Intent type (research, qa, planning, work)
   * @returns {Object} Intent configuration
   */
  async getIntentConfig(intentType) {
    const config = await this.loadConfig();
    return config.intents[intentType] || config.intents[config.defaults.unknown_intent];
  }

  /**
   * Check if tool is allowed for intent
   * @param {string} intentType - Intent type
   * @param {string} toolName - Tool name to check
   * @returns {Promise<boolean>} True if allowed
   */
  async isToolAllowed(intentType, toolName) {
    const intentConfig = await this.getIntentConfig(intentType);
    
    // Check explicit blocks first
    if (intentConfig.blocked_tools.includes(toolName)) {
      return false;
    }

    // Check explicit allows
    if (intentConfig.allowed_tools.includes(toolName)) {
      return true;
    }

    // Default to blocked if not explicitly allowed
    return false;
  }

  /**
   * Check if parameter matches allowed patterns
   * @param {string} intentType - Intent type
   * @param {string} parameter - Parameter to check
   * @returns {Promise<boolean>} True if allowed
   */
  async isParameterAllowed(intentType, parameter) {
    const intentConfig = await this.getIntentConfig(intentType);
    
    if (!intentConfig.parameter_patterns) {
      return true; // No restrictions
    }

    // Check blocked patterns first
    if (intentConfig.parameter_patterns.blocked) {
      for (const pattern of intentConfig.parameter_patterns.blocked) {
        if (new RegExp(pattern).test(parameter)) {
          return false;
        }
      }
    }

    // Check allowed patterns
    if (intentConfig.parameter_patterns.allowed && intentConfig.parameter_patterns.allowed.length > 0) {
      for (const pattern of intentConfig.parameter_patterns.allowed) {
        if (new RegExp(pattern).test(parameter)) {
          return true;
        }
      }
      return false; // Has allow list but parameter not in it
    }

    return true; // No allow list, parameter not in block list
  }

  /**
   * Check if file path is allowed for intent
   * @param {string} intentType - Intent type
   * @param {string} filePath - File path to check
   * @returns {Promise<boolean>} True if allowed
   */
  async isPathAllowed(intentType, filePath) {
    const intentConfig = await this.getIntentConfig(intentType);
    
    if (!intentConfig.path_patterns) {
      return true; // No restrictions
    }

    // Check blocked patterns first
    if (intentConfig.path_patterns.blocked) {
      for (const pattern of intentConfig.path_patterns.blocked) {
        if (new RegExp(pattern).test(filePath)) {
          return false;
        }
      }
    }

    // Check allowed patterns
    if (intentConfig.path_patterns.allowed && intentConfig.path_patterns.allowed.length > 0) {
      for (const pattern of intentConfig.path_patterns.allowed) {
        if (new RegExp(pattern).test(filePath)) {
          return true;
        }
      }
      return false; // Has allow list but path not in it
    }

    return true; // No allow list, path not in block list
  }

  /**
   * Get enforcement action for intent
   * @param {string} intentType - Intent type
   * @returns {Promise<string>} Enforcement action
   */
  async getEnforcement(intentType) {
    const intentConfig = await this.getIntentConfig(intentType);
    return intentConfig.enforcement;
  }

  /**
   * Cleanup watchers (for testing/shutdown)
   */
  cleanup() {
    for (const [path, watcher] of this.watchers) {
      watcher.close();
    }
    this.watchers.clear();
    this.watchedFiles.clear();
    this.cache.clear();
  }
}

// Export singleton instance
module.exports = new ConfigLoader();