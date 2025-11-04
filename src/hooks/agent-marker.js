#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

// Shared libraries
const { blockOperation } = require('./lib/hook-helpers');
const { checkToolBlacklist } = require('./lib/tool-blacklist');
const { initializeHook } = require('./lib/logging');

function main() {
  // Initialize hook with shared library function
  const { log, hookInput } = initializeHook('agent-marker');

  // DEFENSIVE: Log EVERY hook entry regardless of tool_name
  log('=== HOOK ENTRY ===');
  log(`Hook invoked at: ${new Date().toISOString()}`);
  log(`Process PID: ${process.pid}`);
  log(`Working directory: ${process.cwd()}`);

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
    log(`DEFENSIVE: atomicWriteMarker called with file: ${markerFile}`);

    for (let i = 0; i < retries; i++) {
      try {
        const tempFile = `${markerFile}.tmp.${Date.now()}.${Math.random()}`;
        log(`DEFENSIVE: Attempt ${i + 1}/${retries} - Writing to temp file: ${tempFile}`);

        fs.writeFileSync(tempFile, JSON.stringify(data, null, 2));
        log(`DEFENSIVE: Temp file written successfully, size: ${fs.statSync(tempFile).size} bytes`);

        fs.renameSync(tempFile, markerFile);
        log(`DEFENSIVE: Marker file renamed successfully: ${markerFile}`);

        return true;
      } catch (error) {
        log(`DEFENSIVE: Write attempt ${i + 1}/${retries} failed: ${error.message}`);

        if (i === retries - 1) {
          log(`DEFENSIVE: CRITICAL - Failed to write marker after ${retries} retries: ${error.message}`);
          log(`DEFENSIVE: Stack trace: ${error.stack}`);
          return false;
        }

        const delay = Math.pow(2, i) * 10;
        log(`DEFENSIVE: Retrying after ${delay}ms delay...`);
        const end = Date.now() + delay;
        while (Date.now() < end) {}
      }
    }

    log(`DEFENSIVE: CRITICAL - atomicWriteMarker exited retry loop without success`);
    return false;
  }

  function incrementAgentCount(markerFile, session_id, tool_name, projectRoot) {
    log(`DEFENSIVE: incrementAgentCount called`);
    log(`DEFENSIVE: markerFile="${markerFile}"`);
    log(`DEFENSIVE: session_id="${session_id}"`);
    log(`DEFENSIVE: tool_name="${tool_name}"`);
    log(`DEFENSIVE: projectRoot="${projectRoot}"`);

    const existingMarker = atomicReadMarker(markerFile);
    log(`DEFENSIVE: Existing marker ${existingMarker ? 'found' : 'NOT found'}`);

    const marker = existingMarker || {
      session_id: session_id,
      project_root: projectRoot,
      agent_count: 0,
      agents: []
    };

    if (!existingMarker) {
      log(`DEFENSIVE: Creating new marker structure`);
    }

    const toolInvocationId = generateUUID();
    log(`DEFENSIVE: Generated tool_invocation_id: ${toolInvocationId}`);

    marker.agents.push({
      tool_invocation_id: toolInvocationId,
      created: new Date().toISOString(),
      tool_name: tool_name
    });

    marker.agent_count = marker.agents.length;

    log(`Incrementing agent count: ${marker.agent_count} (added ${toolInvocationId})`);

    const writeSuccess = atomicWriteMarker(markerFile, marker);
    log(`DEFENSIVE: atomicWriteMarker returned: ${writeSuccess}`);

    if (writeSuccess) {
      log(`DEFENSIVE: Returning tool_invocation_id: ${toolInvocationId}`);
      return toolInvocationId;
    }

    log(`DEFENSIVE: CRITICAL - Write failed, returning NULL`);
    return null;
  }

  const standardOutput = {
    continue: true,
    suppressOutput: true
  };

  try {
    // hookInput already parsed earlier for logging
    if (!hookInput) {
      log('DEFENSIVE: No hookInput - exiting early');
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
    const projectRoot = hookInput.cwd || process.cwd();
    const projectHash = crypto.createHash('md5').update(projectRoot).digest('hex').substring(0, 8);

    const markerDir = path.join(os.homedir(), '.claude', 'tmp');
    const markerFile = path.join(markerDir, `agent-executing-${session_id}-${projectHash}`);

    // DEFENSIVE: Log marker file path calculation
    log(`Project root: ${projectRoot}`);
    log(`Project hash: ${projectHash}`);
    log(`Marker directory: ${markerDir}`);
    log(`Marker file path: ${markerFile}`);

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
        log(`DEFENSIVE: Creating marker directory: ${markerDir}`);
        fs.mkdirSync(markerDir, { recursive: true });
        log(`DEFENSIVE: Marker directory created successfully`);
      } catch (mkdirError) {
        log(`DEFENSIVE: CRITICAL - Failed to create marker directory: ${mkdirError.message}`);
        log(`DEFENSIVE: Stack trace: ${mkdirError.stack}`);
      }
    } else {
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
      log('DEFENSIVE: Tool is Task - attempting marker increment');

      try {
        log('DEFENSIVE: Calling incrementAgentCount...');
        const toolInvocationId = incrementAgentCount(markerFile, session_id, tool_name, projectRoot);

        if (toolInvocationId) {
          log(`Agent marker incremented: ${markerFile} (project: ${projectRoot}, tool_invocation_id: ${toolInvocationId})`);

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
        } else {
          log(`DEFENSIVE: CRITICAL - incrementAgentCount returned NULL (marker creation failed)`);
        }
      } catch (error) {
        log(`DEFENSIVE: CRITICAL - Exception in Task tool handling: ${error.message}`);
        log(`DEFENSIVE: Stack trace: ${error.stack}`);
      }
    } else {
      // DEFENSIVE: Explicitly log when tool_name is NOT 'Task'
      log(`DEFENSIVE: Tool is NOT Task (tool_name="${tool_name}") - skipping marker increment`);
    }

    log('DEFENSIVE: Exiting hook successfully');
    console.log(JSON.stringify(standardOutput));
    process.exit(0);

  } catch (error) {
    log(`DEFENSIVE: CRITICAL - Unhandled exception in main try block: ${error.message}`);
    log(`DEFENSIVE: Stack trace: ${error.stack}`);
    console.log(JSON.stringify(standardOutput));
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}
