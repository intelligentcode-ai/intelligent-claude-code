#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

// Configuration cache
let configCache = null;
let configCacheTime = 0;
const CONFIG_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function main() {
  const logDir = path.join(os.homedir(), '.claude', 'logs');
  const today = new Date().toISOString().split('T')[0];
  const logFile = path.join(logDir, `${today}-pretooluse.log`);

  // Ensure log directory exists
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logFile, logMessage);
  }

  function loadConfiguration() {
    const now = Date.now();

    // Return cached config if still valid
    if (configCache && (now - configCacheTime) < CONFIG_CACHE_TTL) {
      log('Using cached configuration');
      return configCache;
    }

    const config = {
      story_path: 'stories',
      bug_path: 'bugs',
      memory_path: 'memory',
      docs_path: 'docs',
      src_path: 'src',
      test_path: 'tests',
      config_path: 'config'
    };

    try {
      // Try to load from CLAUDE.md or config.md
      const possibleConfigPaths = [
        'CLAUDE.md',
        'config.md',
        '.claude/config.md'
      ];

      for (const configPath of possibleConfigPaths) {
        if (fs.existsSync(configPath)) {
          log(`Loading configuration from ${configPath}`);
          const content = fs.readFileSync(configPath, 'utf8');

          // Parse YAML frontmatter
          const yamlMatch = content.match(/^---\n([\s\S]*?)\n---/);
          if (yamlMatch) {
            const yamlContent = yamlMatch[1];
            const lines = yamlContent.split('\n');

            for (const line of lines) {
              const match = line.match(/^(\w+):\s*(.+)$/);
              if (match) {
                const key = match[1];
                const value = match[2].replace(/^["']|["']$/g, '');
                if (key in config) {
                  config[key] = value;
                  log(`Loaded ${key} = ${value} from YAML frontmatter`);
                }
              }
            }
          }

          // Parse markdown key:value pairs
          const markdownMatches = content.matchAll(/^-?\s*\*?\*?(\w+)\*?\*?:\s*(.+)$/gm);
          for (const match of markdownMatches) {
            const key = match[1];
            const value = match[2].replace(/^["']|["']$/g, '');
            if (key in config) {
              config[key] = value;
              log(`Loaded ${key} = ${value} from markdown`);
            }
          }

          break; // Use first config file found
        }
      }
    } catch (error) {
      log(`Configuration loading error: ${error.message}`);
    }

    // Normalize paths (remove trailing slashes)
    for (const key in config) {
      config[key] = config[key].replace(/\/$/, '');
    }

    // Cache the configuration
    configCache = config;
    configCacheTime = now;

    log(`Configuration loaded: ${JSON.stringify(config)}`);
    return config;
  }

  function getConfiguredPaths() {
    const config = loadConfiguration();

    return {
      allowlist: [
        config.story_path,
        config.bug_path,
        config.memory_path,
        config.docs_path,
        'agenttasks'  // Always allow agenttasks directory
      ],
      blocklist: [
        config.src_path,
        config.test_path,
        config.config_path,
        'lib'  // Always block lib directory
      ]
    };
  }

  try {
    // Parse input from multiple sources
    let inputData = '';

    if (process.argv[2]) {
      inputData = process.argv[2];
    } else if (process.env.HOOK_INPUT) {
      inputData = process.env.HOOK_INPUT;
    } else if (!process.stdin.isTTY) {
      inputData = fs.readFileSync(0, 'utf8');
    }

    if (!inputData.trim()) {
      console.log(JSON.stringify({ continue: true }));
      process.exit(0);
    }

    const hookInput = JSON.parse(inputData);
    log(`PreToolUse triggered: ${JSON.stringify(hookInput)}`);

    // Extract tool and file_path
    const tool = hookInput.tool || '';
    const filePath = hookInput.parameters?.file_path || '';

    if (!tool || !filePath) {
      log('No tool or file_path - allowing operation');
      console.log(JSON.stringify({ continue: true }));
      process.exit(0);
    }

    log(`Tool: ${tool}, FilePath: ${filePath}`);

    // Load configuration and paths
    const config = loadConfiguration();
    const paths = getConfiguredPaths();

    log(`Allowlist: ${JSON.stringify(paths.allowlist)}`);
    log(`Blocklist: ${JSON.stringify(paths.blocklist)}`);

    // TODO: Add validation logic here (AGENTTASK-003, 004)
    // - AGENTTASK-003: Path matching and validation
    // - AGENTTASK-004: Block Edit/Write operations outside allowlist

    // Default: allow operation
    log('Default behavior: allowing operation');
    console.log(JSON.stringify({ continue: true }));
    process.exit(0);

  } catch (error) {
    log(`Error: ${error.message}`);
    log(`Stack: ${error.stack}`);
    // On error, allow operation to prevent blocking valid work
    console.log(JSON.stringify({ continue: true }));
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}
