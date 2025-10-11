#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

function main() {
  const logDir = path.join(os.homedir(), '.claude', 'logs');
  const today = new Date().toISOString().split('T')[0];
  const logFile = path.join(logDir, `${today}-agent-marker.log`);

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logFile, logMessage);
  }

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
    const marker = atomicReadMarker(markerFile) || {
      session_id: session_id,
      project_root: projectRoot,
      agent_count: 0,
      agents: []
    };

    const toolInvocationId = generateUUID();

    marker.agents.push({
      tool_invocation_id: toolInvocationId,
      created: new Date().toISOString(),
      tool_name: tool_name
    });

    marker.agent_count = marker.agents.length;

    log(`Incrementing agent count: ${marker.agent_count} (added ${toolInvocationId})`);

    if (atomicWriteMarker(markerFile, marker)) {
      return toolInvocationId;
    }
    return null;
  }

  const standardOutput = {
    continue: true,
    suppressOutput: true
  };

  try {
    let inputData = '';

    if (process.argv[2]) {
      inputData = process.argv[2];
    } else if (process.env.HOOK_INPUT) {
      inputData = process.env.HOOK_INPUT;
    } else if (!process.stdin.isTTY) {
      try {
        const stdinBuffer = fs.readFileSync(0, 'utf8');
        if (stdinBuffer && stdinBuffer.trim()) {
          inputData = stdinBuffer;
        }
      } catch (error) {
        console.log(JSON.stringify(standardOutput));
        process.exit(0);
      }
    }

    if (!inputData.trim()) {
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    let hookInput;
    try {
      hookInput = JSON.parse(inputData);
    } catch (error) {
      log(`JSON parse error: ${error.message}`);
      console.log(JSON.stringify(standardOutput));
      process.exit(0);
    }

    const session_id = hookInput.session_id;
    const tool_name = hookInput.tool_name;

    // Generate project hash from project root for project-specific markers
    const projectRoot = hookInput.cwd || process.cwd();
    const projectHash = crypto.createHash('md5').update(projectRoot).digest('hex').substring(0, 8);

    const markerDir = path.join(os.homedir(), '.claude', 'tmp');
    const markerFile = path.join(markerDir, `agent-executing-${session_id}-${projectHash}`);

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

    if (!fs.existsSync(markerDir)) {
      fs.mkdirSync(markerDir, { recursive: true });
    }

    if (tool_name === 'Task') {
      try {
        const toolInvocationId = incrementAgentCount(markerFile, session_id, tool_name, projectRoot);
        if (toolInvocationId) {
          log(`Agent marker incremented: ${markerFile} (project: ${projectRoot}, tool_invocation_id: ${toolInvocationId})`);

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
          log(`Failed to increment agent marker`);
        }
      } catch (error) {
        log(`Failed to increment agent marker: ${error.message}`);
      }
    }

    console.log(JSON.stringify(standardOutput));
    process.exit(0);

  } catch (error) {
    log(`Error: ${error.message}`);
    console.log(JSON.stringify(standardOutput));
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}
