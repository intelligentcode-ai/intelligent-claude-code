/**
 * Mock HookInput Generator
 * Creates realistic hookInput objects for testing
 */

function createMockHookInput(overrides = {}) {
  return {
    session_id: 'test-session-123',
    transcript_path: '/mock/transcript.jsonl',
    cwd: '/Users/test/project',
    permission_mode: 'default',
    hook_event_name: 'PreToolUse',
    tool_name: 'Write',
    tool_input: {
      file_path: '/Users/test/project/test.md',
      content: 'test content'
    },
    ...overrides
  };
}

function createTaskToolInput(agentType = 'developer') {
  return createMockHookInput({
    tool_name: 'Task',
    tool_input: {
      description: 'Test agent task',
      prompt: 'Test prompt',
      subagent_type: agentType
    }
  });
}

function createWriteToolInput(filePath, content = 'test') {
  return createMockHookInput({
    tool_name: 'Write',
    tool_input: { file_path: filePath, content }
  });
}

function createBashToolInput(command) {
  return createMockHookInput({
    tool_name: 'Bash',
    tool_input: { command, description: 'Test command' }
  });
}

module.exports = {
  createMockHookInput,
  createTaskToolInput,
  createWriteToolInput,
  createBashToolInput
};
