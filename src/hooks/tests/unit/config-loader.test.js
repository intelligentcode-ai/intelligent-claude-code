/**
 * Comprehensive Unit Tests for Configuration Loader
 * 
 * Tests configuration loading, caching, validation, and hot-reload functionality
 */

const fs = require('fs');
const path = require('path');
const configLoader = require('../../lib/config-loader');

describe('Configuration Loader', () => {
  let originalConfigPath;
  let tempConfigPath;
  
  beforeEach(() => {
    // Setup temporary config file for testing
    tempConfigPath = path.join(__dirname, '..', 'fixtures', 'temp-config.json');
    originalConfigPath = configLoader.configPath;
    configLoader.configPath = tempConfigPath;
    configLoader.cache.clear();
  });
  
  afterEach(() => {
    // Cleanup
    configLoader.configPath = originalConfigPath;
    configLoader.cleanup();
    
    if (fs.existsSync(tempConfigPath)) {
      fs.unlinkSync(tempConfigPath);
    }
  });
  
  describe('Configuration Loading', () => {
    test('should load valid configuration', async () => {
      const testConfig = global.testUtils.loadFixture('test-config.json');
      fs.writeFileSync(tempConfigPath, JSON.stringify(testConfig));
      
      const config = await configLoader.loadConfig();
      
      expect(config).toBeDefined();
      expect(config.version).toBe('1.0.0-test');
      expect(config.intents).toBeDefined();
      expect(config.defaults).toBeDefined();
      expect(config.intents.research).toBeDefined();
      expect(config.intents.work).toBeDefined();
    });
    
    test('should handle schema+data format', async () => {
      const testConfig = {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        data: global.testUtils.loadFixture('test-config.json')
      };
      fs.writeFileSync(tempConfigPath, JSON.stringify(testConfig));
      
      const config = await configLoader.loadConfig();
      
      expect(config.version).toBe('1.0.0-test');
      expect(config.intents).toBeDefined();
    });
    
    test('should return default config when file not found', async () => {
      // Don't create temp file
      const config = await configLoader.loadConfig();
      
      expect(config).toBeDefined();
      expect(config.version).toBe('1.0.0');
      expect(config.intents).toBeDefined();
      expect(config.intents.research).toBeDefined();
      expect(config.intents.work).toBeDefined();
    });
    
    test('should return default config when JSON is invalid', async () => {
      fs.writeFileSync(tempConfigPath, '{ invalid json }');
      
      const config = await configLoader.loadConfig();
      
      expect(config.version).toBe('1.0.0'); // Default config
    });
    
    test('should force reload when requested', async () => {
      const testConfig = global.testUtils.loadFixture('test-config.json');
      fs.writeFileSync(tempConfigPath, JSON.stringify(testConfig));
      
      // Load once
      const config1 = await configLoader.loadConfig();
      
      // Modify config
      testConfig.version = '2.0.0-test';
      fs.writeFileSync(tempConfigPath, JSON.stringify(testConfig));
      
      // Load without force reload (should be cached)
      const config2 = await configLoader.loadConfig(false);
      expect(config2.version).toBe('1.0.0-test');
      
      // Load with force reload
      const config3 = await configLoader.loadConfig(true);
      expect(config3.version).toBe('2.0.0-test');
    });
  });
  
  describe('Configuration Caching', () => {
    test('should cache configuration results', async () => {
      const testConfig = global.testUtils.loadFixture('test-config.json');
      fs.writeFileSync(tempConfigPath, JSON.stringify(testConfig));
      
      const start1 = Date.now();
      const config1 = await configLoader.loadConfig();
      const time1 = Date.now() - start1;
      
      const start2 = Date.now();
      const config2 = await configLoader.loadConfig();
      const time2 = Date.now() - start2;
      
      expect(config1).toEqual(config2);
      expect(time2).toBeLessThan(time1); // Second load should be faster (cached)
    });
    
    test('should respect cache TTL', async () => {
      // Create a config loader with short TTL for testing
      configLoader.cache = new (require('../../lib/config-loader')).ConfigCache(100); // 100ms TTL
      
      const testConfig = global.testUtils.loadFixture('test-config.json');
      fs.writeFileSync(tempConfigPath, JSON.stringify(testConfig));
      
      const config1 = await configLoader.loadConfig();
      expect(config1.version).toBe('1.0.0-test');
      
      // Modify config
      testConfig.version = '2.0.0-test';
      fs.writeFileSync(tempConfigPath, JSON.stringify(testConfig));
      
      // Should still return cached version
      const config2 = await configLoader.loadConfig();
      expect(config2.version).toBe('1.0.0-test');
      
      // Wait for cache to expire
      await global.testUtils.wait(150);
      
      // Should now return new version
      const config3 = await configLoader.loadConfig();
      expect(config3.version).toBe('2.0.0-test');
    });
  });
  
  describe('Configuration Validation', () => {
    test('should validate required properties', async () => {
      const invalidConfig = {
        // Missing version and intents
        defaults: {
          enforcement: 'warn',
          unknown_intent: 'research'
        }
      };
      fs.writeFileSync(tempConfigPath, JSON.stringify(invalidConfig));
      
      const config = await configLoader.loadConfig();
      
      // Should fall back to default config
      expect(config.version).toBe('1.0.0');
      expect(config.intents).toBeDefined();
    });
    
    test('should validate intent structure', async () => {
      const invalidConfig = {
        version: '1.0.0',
        intents: {
          research: {
            // Missing required properties
            enforcement: 'allow'
          }
        },
        defaults: {
          enforcement: 'warn',
          unknown_intent: 'research'
        }
      };
      fs.writeFileSync(tempConfigPath, JSON.stringify(invalidConfig));
      
      const config = await configLoader.loadConfig();
      
      // Should fall back to default config
      expect(config.intents.research.allowed_tools).toBeDefined();
      expect(config.intents.research.blocked_tools).toBeDefined();
    });
    
    test('should validate regex patterns', async () => {
      const configWithBadRegex = {
        version: '1.0.0',
        intents: {
          research: {
            allowed_tools: ['Read'],
            blocked_tools: ['Edit'],
            parameter_patterns: {
              allowed: ['[invalid regex'],
              blocked: []
            },
            enforcement: 'allow'
          },
          qa: {
            allowed_tools: ['Read'],
            blocked_tools: ['Edit'],
            enforcement: 'allow'
          },
          planning: {
            allowed_tools: ['Read'],
            blocked_tools: ['Edit'],
            enforcement: 'allow'
          },
          work: {
            allowed_tools: [],
            blocked_tools: ['Edit'],
            enforcement: 'block'
          }
        },
        defaults: {
          enforcement: 'warn',
          unknown_intent: 'research'
        }
      };
      fs.writeFileSync(tempConfigPath, JSON.stringify(configWithBadRegex));
      
      const config = await configLoader.loadConfig();
      
      // Should fall back to default config due to validation failure
      expect(config.version).toBe('1.0.0');
    });
  });
  
  describe('Environment Variable Overrides', () => {
    let originalEnv;
    
    beforeEach(() => {
      originalEnv = { ...process.env };
    });
    
    afterEach(() => {
      process.env = originalEnv;
    });
    
    test('should apply debug mode override', async () => {
      process.env.HOOK_DEBUG_MODE = 'true';
      
      const testConfig = global.testUtils.loadFixture('test-config.json');
      fs.writeFileSync(tempConfigPath, JSON.stringify(testConfig));
      
      const config = await configLoader.loadConfig();
      
      expect(config.overrides.debug_mode).toBe(true);
    });
    
    test('should apply strict mode override', async () => {
      process.env.HOOK_STRICT_MODE = 'false';
      
      const testConfig = global.testUtils.loadFixture('test-config.json');
      fs.writeFileSync(tempConfigPath, JSON.stringify(testConfig));
      
      const config = await configLoader.loadConfig();
      
      expect(config.overrides.strict_mode).toBe(false);
    });
    
    test('should apply default enforcement override', async () => {
      process.env.HOOK_DEFAULT_ENFORCEMENT = 'block';
      
      const testConfig = global.testUtils.loadFixture('test-config.json');
      fs.writeFileSync(tempConfigPath, JSON.stringify(testConfig));
      
      const config = await configLoader.loadConfig();
      
      expect(config.defaults.enforcement).toBe('block');
    });
  });
  
  describe('Intent Configuration Queries', () => {
    beforeEach(async () => {
      const testConfig = global.testUtils.loadFixture('test-config.json');
      fs.writeFileSync(tempConfigPath, JSON.stringify(testConfig));
    });
    
    test('should get intent configuration', async () => {
      const researchConfig = await configLoader.getIntentConfig('research');
      
      expect(researchConfig).toBeDefined();
      expect(researchConfig.allowed_tools).toContain('Read');
      expect(researchConfig.blocked_tools).toContain('Edit');
      expect(researchConfig.enforcement).toBe('allow');
    });
    
    test('should return default intent for unknown intent', async () => {
      const unknownConfig = await configLoader.getIntentConfig('unknown_intent_type');
      
      expect(unknownConfig).toBeDefined();
      expect(unknownConfig.allowed_tools).toBeDefined();
    });
    
    test('should check tool allowance', async () => {
      const isReadAllowed = await configLoader.isToolAllowed('research', 'Read');
      const isEditAllowed = await configLoader.isToolAllowed('research', 'Edit');
      const isWriteAllowedForWork = await configLoader.isToolAllowed('work', 'Write');
      
      expect(isReadAllowed).toBe(true);
      expect(isEditAllowed).toBe(false);
      expect(isWriteAllowedForWork).toBe(false);
    });
    
    test('should check parameter patterns', async () => {
      const isMarkdownAllowed = await configLoader.isParameterAllowed('research', '/test/file.md');
      const isDeleteBlocked = await configLoader.isParameterAllowed('research', 'rm -f file.txt');
      
      expect(isMarkdownAllowed).toBe(true);
      expect(isDeleteBlocked).toBe(false);
    });
    
    test('should check path patterns', async () => {
      const isTestPathAllowed = await configLoader.isPathAllowed('research', '/test/file.txt');
      const isSecretPathBlocked = await configLoader.isPathAllowed('research', '/secret/credentials.env');
      
      expect(isTestPathAllowed).toBe(true);
      expect(isSecretPathBlocked).toBe(false);
    });
    
    test('should get enforcement actions', async () => {
      const researchEnforcement = await configLoader.getEnforcement('research');
      const workEnforcement = await configLoader.getEnforcement('work');
      
      expect(researchEnforcement).toBe('allow');
      expect(workEnforcement).toBe('require_prb_context');
    });
  });
  
  describe('File Watching', () => {
    test('should setup file watcher', async () => {
      const testConfig = global.testUtils.loadFixture('test-config.json');
      fs.writeFileSync(tempConfigPath, JSON.stringify(testConfig));
      
      // Load config to setup watcher
      await configLoader.loadConfig();
      
      expect(configLoader.watchers.has(tempConfigPath)).toBe(true);
      expect(configLoader.watchedFiles.has(tempConfigPath)).toBe(true);
    });
    
    test('should not setup duplicate watchers', async () => {
      const testConfig = global.testUtils.loadFixture('test-config.json');
      fs.writeFileSync(tempConfigPath, JSON.stringify(testConfig));
      
      await configLoader.loadConfig();
      const watcherCount1 = configLoader.watchers.size;
      
      await configLoader.loadConfig(true);
      const watcherCount2 = configLoader.watchers.size;
      
      expect(watcherCount1).toBe(watcherCount2);
    });
  });
  
  describe('ConfigCache Class', () => {
    let ConfigCache;
    let cache;
    
    beforeAll(() => {
      ConfigCache = require('../../lib/config-loader').constructor.__proto__.constructor;
    });
    
    beforeEach(() => {
      cache = new configLoader.cache.constructor(1000); // 1 second TTL
    });
    
    test('should store and retrieve values', () => {
      cache.set('test-key', 'test-value');
      expect(cache.get('test-key')).toBe('test-value');
    });
    
    test('should expire values after TTL', async () => {
      const shortCache = new configLoader.cache.constructor(50); // 50ms TTL
      
      shortCache.set('test-key', 'test-value');
      expect(shortCache.get('test-key')).toBe('test-value');
      
      await global.testUtils.wait(100);
      
      expect(shortCache.get('test-key')).toBeNull();
    });
    
    test('should check if key exists', () => {
      cache.set('test-key', 'test-value');
      
      expect(cache.has('test-key')).toBe(true);
      expect(cache.has('non-existent-key')).toBe(false);
    });
    
    test('should clear all entries', () => {
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');
      
      expect(cache.has('key1')).toBe(true);
      expect(cache.has('key2')).toBe(true);
      
      cache.clear();
      
      expect(cache.has('key1')).toBe(false);
      expect(cache.has('key2')).toBe(false);
    });
  });
  
  describe('Error Handling', () => {
    test('should handle file system errors gracefully', async () => {
      // Set config path to a directory that doesn't exist
      configLoader.configPath = '/non/existent/directory/config.json';
      
      const config = await configLoader.loadConfig();
      
      // Should return default config
      expect(config.version).toBe('1.0.0');
      expect(config.intents).toBeDefined();
    });
    
    test('should handle permission errors gracefully', async () => {
      // This test might not work on all systems, so we'll mock it
      const originalReadFile = fs.readFileSync;
      fs.readFileSync = jest.fn(() => {
        throw new Error('Permission denied');
      });
      
      const config = await configLoader.loadConfig();
      
      // Should return default config
      expect(config.version).toBe('1.0.0');
      
      // Restore original function
      fs.readFileSync = originalReadFile;
    });
  });
  
  describe('Performance', () => {
    test('should load configuration quickly', async () => {
      const testConfig = global.testUtils.loadFixture('test-config.json');
      fs.writeFileSync(tempConfigPath, JSON.stringify(testConfig));
      
      const { result: config, timeMs } = await global.testUtils.measureTime(async () => {
        return await configLoader.loadConfig();
      });
      
      expect(config).toBeDefined();
      expect(timeMs).toBeLessThan(50); // Should load in under 50ms
    });
    
    test('should benefit from caching', async () => {
      const testConfig = global.testUtils.loadFixture('test-config.json');
      fs.writeFileSync(tempConfigPath, JSON.stringify(testConfig));
      
      // First load (uncached)
      const { timeMs: time1 } = await global.testUtils.measureTime(async () => {
        return await configLoader.loadConfig();
      });
      
      // Second load (cached)
      const { timeMs: time2 } = await global.testUtils.measureTime(async () => {
        return await configLoader.loadConfig();
      });
      
      expect(time2).toBeLessThan(time1);
      expect(time2).toBeLessThan(5); // Cached load should be very fast
    });
  });
});