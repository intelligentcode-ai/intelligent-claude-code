#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

// Shared libraries
const { blockOperation, getProjectRoot, generateProjectHash } = require('./lib/hook-helpers');
const { checkToolBlacklist } = require('./lib/tool-blacklist');
const { initializeHook } = require('./lib/logging');
const { getSetting } = require('./lib/config-loader');

function main() {
  // Initialize hook with shared library function
  const { log, hookInput } = initializeHook('agent-marker');

  // Get log level from config (default: 'INFO')
  const logLevel = getSetting('logging.agent_marker_log_level', 'INFO');
  const levels = { ERROR: 0, WARN: 1, INFO: 2, DEBUG: 3 };
  const currentLevel = levels[logLevel] || 2;

  // Helper to check if we should log at given level
  const shouldLog = (level) => levels[level] <= currentLevel;

  function generateUUID() {
    return crypto.randomUUID();
  }

  function atomicReadMarker(markerFile) {
    try {
      if (!fs.existsSync(markerFile)) {
        return null;
      }
      const content = fs.readFileSync(markerFile, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      log(`Failed to read marker: ${error.message}`);
      return null;
    }
  }

  function atomicWriteMarker(markerFile, data, retries = 5) {
    for (let i = 0; i < retries; i++) {
      try {
        const tempFile = `${markerFile}.tmp.${Date.now()}.${Math.random()}`;
        fs.writeFileSync(tempFile, JSON.stringify(data, null, 2));
        fs.renameSync(tempFile, markerFile);
        return true;
      } catch (error) {
        if (i === retries - 1) {
          log(`Failed to write marker after ${retries} retries: ${error.message}`);
          return false;
        }

        const delay = Math.pow(2, i) * 10;
        const end = Date.now() + delay;
        while (Date.now() < end) {}
      }
    }

    return false;
  }

  function incrementAgentCount(markerFile, session_id, tool_name, projectRoot) {
    if (shouldLog('DEBUG')) {
      log(`DEFENSIVE: incrementAgentCount called`);
      log(`DEFENSIVE: markerFile="${markerFile}"`);
      log(`DEFENSIVE: session_id="${session_id}"`);
      log(`DEFENSIVE: tool_name="${tool_name}"`);
      log(`DEFENSIVE: projectRoot="${projectRoot}"`);
    }

    const existingMarker = atomicReadMarker(markerFile);
    if (shouldLog('DEBUG')) {
      log(`DEFENSIVE: Existing marker ${existingMarker ? 'found' : 'NOT found'}`);
    }

    const marker = existingMarker || {
      session_id: session_id,
      project_root: projectRoot,
      agent_count: 0,
      agents: []
    };

    if (!existingMarker && shouldLog('DEBUG')) {
      log(`DEFENSIVE: Creating new marker structure`);
    }

    const toolInvocationId = generateUUID();
    if (shouldLog('DEBUG')) {
      log(`DEFENSIVE: Generated tool_invocation_id: ${toolInvocationId}`);
    }

    marker.agents.push({
      tool_invocation_id: toolInvocationId,
      created: new Date().toISOString(),
      tool_name: tool_name
    });

    marker.agent_count = marker.agents.length;

    log(`Incrementing agent count: ${marker.agent_count} (added ${toolInvocationId})`);

    const writeSuccess = atomicWriteMarker(markerFile, marker);
    if (shouldLog('DEBUG')) {
      log(`DEFENSIVE: atomicWriteMarker returned: ${writeSuccess}`);
    }

    if (writeSuccess) {
      if (shouldLog('DEBUG')) {
        log(`DEFENSIVE: Returning tool_invocation_id: ${toolInvocationId}`);
      }
      return toolInvocationId;
    }

    if (shouldLog('DEBUG')) {
      log(`DEFENSIVE: CRITICAL - Write failed, returning NULL`);
    }
    return null;
  }

  const standardOutput = {
    continue: true,
    suppressOutput: true
  };

  try {
    // hookInput already parsed earlier for logging
    if (!hookInput) {
      if (shouldLog('DEBUG')) {
        log('DEFENSIVE: No hookInput - exiting early');
      }
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    const session_id = hookInput.session_id;
    const tool_name = hookInput.tool_name;

    // DEFENSIVE: Log parsed input
    log(`Session ID: ${session_id}`);
    log(`Tool name: ${tool_name}`);
    log(`Has tool_input: ${!!hookInput.tool_input}`);

    // Generate project hash from project root for project-specific markers
    const projectRoot = getProjectRoot(hookInput);
    log(`[MARKER-CREATE] projectRoot from getProjectRoot: "${projectRoot}"`);
    log(`[MARKER-CREATE] hookInput.cwd: "${hookInput.cwd || 'undefined'}"`);
    log(`[MARKER-CREATE] process.env.CLAUDE_PROJECT_DIR: "${process.env.CLAUDE_PROJECT_DIR || 'undefined'}"`);
    log(`[MARKER-CREATE] process.cwd(): "${process.cwd()}"`);
    const projectHash = generateProjectHash(hookInput);
    log(`[MARKER-CREATE] projectHash: "${projectHash}"`);

    const homedir = os.homedir();
    const markerDir = process.env.ICC_TEST_MARKER_DIR || path.join(homedir, '.claude', 'tmp');
    const markerFile = path.join(markerDir, `agent-executing-${session_id}-${projectHash}`);

    // Enhanced Linux debugging
    log(`[MARKER-CREATE] Platform: ${os.platform()}`);
    log(`[MARKER-CREATE] Home directory: "${homedir}"`);
    log(`[MARKER-CREATE] Marker directory: "${markerDir}"`);
    log(`[MARKER-CREATE] Full marker path: "${markerFile}"`);
    log(`[MARKER-CREATE] Path separator: "${path.sep}"`);

    if (shouldLog('DEBUG')) {
      // DEFENSIVE: Log marker file path calculation with normalized paths
      log(`Project root (normalized): ${path.normalize(projectRoot)}`);
      log(`Project hash: ${projectHash}`);
      log(`Marker directory (normalized): ${path.normalize(markerDir)}`);
      log(`Marker file path (normalized): ${path.normalize(markerFile)}`);
    }

    // Cleanup old-style markers without project hash (backward compatibility)
    const oldMarkerFile = path.join(markerDir, `agent-executing-${session_id}`);
    if (fs.existsSync(oldMarkerFile)) {
      try {
        fs.unlinkSync(oldMarkerFile);
        log(`Cleaned up old-style marker: ${oldMarkerFile}`);
      } catch (error) {
        log(`Failed to cleanup old-style marker: ${error.message}`);
      }
    }

    // DEFENSIVE: Ensure marker directory exists with error handling
    if (!fs.existsSync(markerDir)) {
      try {
        if (shouldLog('DEBUG')) {
          log(`DEFENSIVE: Creating marker directory: ${markerDir}`);
        }
        fs.mkdirSync(markerDir, { recursive: true });
        if (shouldLog('DEBUG')) {
          log(`DEFENSIVE: Marker directory created successfully`);
        }
      } catch (mkdirError) {
        if (shouldLog('DEBUG')) {
          log(`DEFENSIVE: CRITICAL - Failed to create marker directory: ${mkdirError.message}`);
          log(`DEFENSIVE: Stack trace: ${mkdirError.stack}`);
        }
      }
    } else if (shouldLog('DEBUG')) {
      log(`DEFENSIVE: Marker directory already exists: ${markerDir}`);
    }

    // Check if agent context exists (marker file present)
    const isAgentContext = fs.existsSync(markerFile);

    // CRITICAL: Check tool blacklist for agents (universal + agents_only)
    // This prevents agents from using Task (recursion), SlashCommand, Skill
    if (isAgentContext) {
      log('Agent context detected - checking agent tool blacklist');

      const toolInput = hookInput.tool_input || {};
      const blacklistResult = checkToolBlacklist(tool_name, toolInput, 'agent');

      if (blacklistResult.blocked) {
        log(`Agent tool blocked by blacklist: ${tool_name} (${blacklistResult.list})`);
        return blockOperation(
          `Tool blocked for agents: ${tool_name}`,
          tool_name,
          `Tool "${tool_name}" is blocked for agents by the ${blacklistResult.reason}.

Blacklist type: ${blacklistResult.list}

Agents cannot use:
- Task (prevents agent recursion - agents cannot create sub-agents)
- SlashCommand (slash commands are user-facing only)
- Skill (skills are user-facing only)

Agents should focus on their assigned work using allowed tools:
✅ Read, Write, Edit - File operations
✅ Bash - System commands
✅ Grep, Glob - Search operations
✅ All MCP tools - MCP integrations

If you are an agent and need to delegate work, your AgentTask should be broken down by the main scope instead.`,
          log
        );
      }
    }

    if (tool_name === 'Task') {
      if (shouldLog('DEBUG')) {
        log('DEFENSIVE: Tool is Task - attempting marker increment');
      }

      try {
        if (shouldLog('DEBUG')) {
          log('DEFENSIVE: Calling incrementAgentCount...');
        }
        const toolInvocationId = incrementAgentCount(markerFile, session_id, tool_name, projectRoot);

        if (toolInvocationId) {
          log(`Agent marker incremented: ${markerFile} (project: ${projectRoot}, tool_invocation_id: ${toolInvocationId})`);

          if (shouldLog('DEBUG')) {
            // DEFENSIVE: Verify marker file exists after creation
            if (fs.existsSync(markerFile)) {
              log(`DEFENSIVE: Marker file verified to exist: ${markerFile}`);
              try {
                const markerContent = fs.readFileSync(markerFile, 'utf8');
                log(`DEFENSIVE: Marker file content length: ${markerContent.length} bytes`);
              } catch (readError) {
                log(`DEFENSIVE: Failed to read marker file for verification: ${readError.message}`);
              }
            } else {
              log(`DEFENSIVE: WARNING - Marker file does NOT exist after creation: ${markerFile}`);
            }
          }

          // Check for generic agent usage and suggest specialists
          const toolInput = hookInput.tool_input || {};
          const agentType = (toolInput.agent || '').toLowerCase();

          if (agentType === 'developer') {
            log('[SUGGESTION] Generic @Developer detected. Consider technology-specific specialist:');
            log('  - Node.js work → @Node-Developer');
            log('  - React/Frontend → @React-Frontend-Developer');
            log('  - Python → @Python-Developer');
            log('  - Database → @Database-Engineer');
            log('  See role-system.md SPECIALIST-SELECTION for guidance');
          } else if (agentType === 'system-engineer') {
            log('[SUGGESTION] Generic @System-Engineer detected. Consider infrastructure specialist:');
            log('  - AWS → @AWS-Infrastructure-Engineer');
            log('  - Kubernetes → @K8s-DevOps-Engineer');
            log('  - Database → @Database-Engineer');
            log('  - Container → @Docker-DevOps-Engineer');
            log('  See role-system.md SPECIALIST-SELECTION for guidance');
          } else if (agentType === 'devops-engineer') {
            log('[SUGGESTION] Generic @DevOps-Engineer detected. Consider platform specialist:');
            log('  - Kubernetes → @K8s-DevOps-Engineer');
            log('  - AWS → @AWS-DevOps-Engineer');
            log('  - CI/CD → @Pipeline-DevOps-Engineer');
            log('  See role-system.md SPECIALIST-SELECTION for guidance');
          }
        } else if (shouldLog('DEBUG')) {
          log(`DEFENSIVE: CRITICAL - incrementAgentCount returned NULL (marker creation failed)`);
        }
      } catch (error) {
        if (shouldLog('DEBUG')) {
          log(`DEFENSIVE: CRITICAL - Exception in Task tool handling: ${error.message}`);
          log(`DEFENSIVE: Stack trace: ${error.stack}`);
        }
      }
    } else if (shouldLog('DEBUG')) {
      // DEFENSIVE: Explicitly log when tool_name is NOT 'Task'
      log(`DEFENSIVE: Tool is NOT Task (tool_name="${tool_name}") - skipping marker increment`);
    }

    if (shouldLog('DEBUG')) {
      log('DEFENSIVE: Exiting hook successfully');
    }
    console.log(JSON.stringify(standardOutput));
    process.exit(0);

  } catch (error) {
    if (shouldLog('DEBUG')) {
      log(`DEFENSIVE: CRITICAL - Unhandled exception in main try block: ${error.message}`);
      log(`DEFENSIVE: Stack trace: ${error.stack}`);
    }
    console.log(JSON.stringify(standardOutput));
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}
