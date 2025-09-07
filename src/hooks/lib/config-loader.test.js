/**
 * Tests for Configuration Loader
 */

const fs = require('fs');
const path = require('path');
const configLoader = require('./config-loader');

// Test utilities
const createTempConfig = (config) => {
  const tempPath = path.join(__dirname, '../config/intent-patterns.test.json');
  fs.writeFileSync(tempPath, JSON.stringify(config, null, 2));
  return tempPath;
};

const cleanupTempConfig = () => {
  const tempPath = path.join(__dirname, '../config/intent-patterns.test.json');
  if (fs.existsSync(tempPath)) {
    fs.unlinkSync(tempPath);
  }
};

describe('ConfigLoader', () => {
  afterEach(() => {
    configLoader.cleanup();
    cleanupTempConfig();
  });

  describe('loadConfig', () => {
    test('loads valid configuration successfully', async () => {
      const config = await configLoader.loadConfig();
      
      expect(config).toBeDefined();
      expect(config.version).toBeDefined();
      expect(config.intents).toBeDefined();
      expect(config.defaults).toBeDefined();
      
      // Check required intents exist
      expect(config.intents.research).toBeDefined();
      expect(config.intents.qa).toBeDefined();
      expect(config.intents.planning).toBeDefined();
      expect(config.intents.work).toBeDefined();
    });

    test('returns default config when file not found', async () => {
      // Temporarily move the config file
      const originalPath = configLoader.configPath;
      configLoader.configPath = '/nonexistent/path/config.json';
      
      const config = await configLoader.loadConfig();
      
      expect(config).toBeDefined();
      expect(config.version).toBe('1.0.0');
      expect(config.defaults.unknown_intent).toBe('research');
      
      // Restore original path
      configLoader.configPath = originalPath;
    });

    test('caches configuration between calls', async () => {
      const config1 = await configLoader.loadConfig();
      const config2 = await configLoader.loadConfig();
      
      expect(config1).toBe(config2); // Should be same object reference due to caching
    });

    test('force reload bypasses cache', async () => {
      const config1 = await configLoader.loadConfig();
      const config2 = await configLoader.loadConfig(true);
      
      // Should be different object references but same content
      expect(config1).not.toBe(config2);
      expect(config1.version).toBe(config2.version);
    });
  });

  describe('getIntentConfig', () => {
    test('returns correct config for valid intent', async () => {
      const researchConfig = await configLoader.getIntentConfig('research');
      
      expect(researchConfig).toBeDefined();
      expect(researchConfig.allowed_tools).toContain('Read');
      expect(researchConfig.blocked_tools).toContain('Edit');
      expect(researchConfig.enforcement).toBe('allow');
    });

    test('returns default intent config for invalid intent', async () => {
      const config = await configLoader.getIntentConfig('invalid_intent');
      
      expect(config).toBeDefined();
      // Should return research config as default
      expect(config.allowed_tools).toContain('Read');
    });
  });

  describe('isToolAllowed', () => {
    test('allows tools in allowed_tools list', async () => {
      const isAllowed = await configLoader.isToolAllowed('research', 'Read');
      expect(isAllowed).toBe(true);
    });

    test('blocks tools in blocked_tools list', async () => {
      const isAllowed = await configLoader.isToolAllowed('research', 'Edit');
      expect(isAllowed).toBe(false);
    });

    test('blocks tools not in allowed_tools list', async () => {
      const isAllowed = await configLoader.isToolAllowed('research', 'UnknownTool');
      expect(isAllowed).toBe(false);
    });

    test('work intent blocks all tools', async () => {
      const readAllowed = await configLoader.isToolAllowed('work', 'Read');
      const editAllowed = await configLoader.isToolAllowed('work', 'Edit');
      
      expect(readAllowed).toBe(false);
      expect(editAllowed).toBe(false);
    });
  });

  describe('isParameterAllowed', () => {
    test('allows parameters matching allowed patterns', async () => {
      const isAllowed = await configLoader.isParameterAllowed('research', '/path/to/file.md');
      expect(isAllowed).toBe(true);
    });

    test('blocks parameters matching blocked patterns', async () => {
      const isAllowed = await configLoader.isParameterAllowed('research', 'rm -rf /');
      expect(isAllowed).toBe(false);
    });

    test('allows parameters when no patterns defined', async () => {
      const isAllowed = await configLoader.isParameterAllowed('qa', 'any parameter');
      expect(isAllowed).toBe(true);
    });
  });

  describe('isPathAllowed', () => {
    test('allows paths matching allowed patterns', async () => {
      const isAllowed = await configLoader.isPathAllowed('research', '/project/src/file.js');
      expect(isAllowed).toBe(true);
    });

    test('blocks paths matching blocked patterns', async () => {
      const isAllowed = await configLoader.isPathAllowed('research', '/project/.env');
      expect(isAllowed).toBe(false);
    });

    test('allows paths when no patterns defined', async () => {
      const isAllowed = await configLoader.isPathAllowed('qa', '/any/path');
      expect(isAllowed).toBe(true);
    });
  });

  describe('getEnforcement', () => {
    test('returns correct enforcement for each intent', async () => {
      const researchEnforcement = await configLoader.getEnforcement('research');
      const qaEnforcement = await configLoader.getEnforcement('qa');
      const planningEnforcement = await configLoader.getEnforcement('planning');
      const workEnforcement = await configLoader.getEnforcement('work');
      
      expect(researchEnforcement).toBe('allow');
      expect(qaEnforcement).toBe('allow');
      expect(planningEnforcement).toBe('allow');
      expect(workEnforcement).toBe('require_prb_context');
    });
  });

  describe('environment variable overrides', () => {
    test('applies debug mode override', async () => {
      process.env.HOOK_DEBUG_MODE = 'true';
      
      const config = await configLoader.loadConfig(true);
      expect(config.overrides.debug_mode).toBe(true);
      
      delete process.env.HOOK_DEBUG_MODE;
    });

    test('applies strict mode override', async () => {
      process.env.HOOK_STRICT_MODE = 'false';
      
      const config = await configLoader.loadConfig(true);
      expect(config.overrides.strict_mode).toBe(false);
      
      delete process.env.HOOK_STRICT_MODE;
    });

    test('applies default enforcement override', async () => {
      process.env.HOOK_DEFAULT_ENFORCEMENT = 'block';
      
      const config = await configLoader.loadConfig(true);
      expect(config.defaults.enforcement).toBe('block');
      
      delete process.env.HOOK_DEFAULT_ENFORCEMENT;
    });
  });

  describe('validation', () => {
    test('validates configuration structure', async () => {
      // This test ensures the existing config file is valid
      const config = await configLoader.loadConfig();
      
      expect(config.version).toBeDefined();
      expect(typeof config.intents).toBe('object');
      expect(typeof config.defaults).toBe('object');
      
      // Validate each intent has required properties
      const intents = ['research', 'qa', 'planning', 'work'];
      for (const intent of intents) {
        expect(config.intents[intent]).toBeDefined();
        expect(Array.isArray(config.intents[intent].allowed_tools)).toBe(true);
        expect(Array.isArray(config.intents[intent].blocked_tools)).toBe(true);
        expect(config.intents[intent].enforcement).toBeDefined();
      }
    });

    test('handles invalid regex patterns gracefully', async () => {
      const invalidConfig = {
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
          }
        },
        defaults: {
          enforcement: 'warn',
          unknown_intent: 'research'
        }
      };

      createTempConfig(invalidConfig);
      const originalPath = configLoader.configPath;
      configLoader.configPath = path.join(__dirname, '../config/intent-patterns.test.json');
      
      // Should fall back to default config due to validation error
      const config = await configLoader.loadConfig(true);
      expect(config.version).toBe('1.0.0'); // Should use default config
      
      configLoader.configPath = originalPath;
    });
  });
});

// Helper function to run tests if called directly
if (require.main === module) {
  console.log('Running ConfigLoader tests...');
  
  const testCases = [
    () => configLoader.loadConfig().then(config => {
      console.log('✓ Config loads successfully');
      console.log('  Version:', config.version);
      console.log('  Intents:', Object.keys(config.intents));
    }),
    
    () => configLoader.isToolAllowed('research', 'Read').then(allowed => {
      console.log('✓ Tool allowed check:', allowed ? 'PASS' : 'FAIL');
    }),
    
    () => configLoader.isToolAllowed('work', 'Edit').then(allowed => {
      console.log('✓ Work tool blocking:', !allowed ? 'PASS' : 'FAIL');
    }),
    
    () => configLoader.isParameterAllowed('research', '/path/file.md').then(allowed => {
      console.log('✓ Parameter pattern matching:', allowed ? 'PASS' : 'FAIL');
    }),
    
    () => configLoader.getEnforcement('work').then(enforcement => {
      console.log('✓ Work enforcement:', enforcement === 'require_prb_context' ? 'PASS' : 'FAIL');
    })
  ];
  
  (async () => {
    try {
      for (const test of testCases) {
        await test();
      }
      console.log('\nAll tests completed!');
      configLoader.cleanup();
    } catch (error) {
      console.error('Test failed:', error.message);
      configLoader.cleanup();
    }
  })();
}