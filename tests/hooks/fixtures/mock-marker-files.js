/**
 * Mock Marker File Generator
 * Creates realistic marker file data for testing
 */

const crypto = require('crypto');

function generateProjectHash(projectRoot) {
  return crypto.createHash('md5').update(projectRoot).digest('hex').substring(0, 8);
}

function createMockMarker(sessionId, projectRoot, agentCount = 1) {
  const agents = [];
  for (let i = 0; i < agentCount; i++) {
    agents.push({
      tool_invocation_id: crypto.randomUUID(),
      created: new Date().toISOString(),
      tool_name: 'Task'
    });
  }

  return {
    session_id: sessionId,
    project_root: projectRoot,
    agent_count: agentCount,
    agents: agents
  };
}

function getMarkerFileName(sessionId, projectRoot) {
  const projectHash = generateProjectHash(projectRoot);
  return `agent-executing-${sessionId}-${projectHash}`;
}

module.exports = {
  generateProjectHash,
  createMockMarker,
  getMarkerFileName
};
