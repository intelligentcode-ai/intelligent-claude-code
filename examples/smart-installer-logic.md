# Smart Installer Logic

## Installation Flow

```bash
./install.sh
```

### Step 1: Installation Type Selection
```
Choose installation type:
1. Complete - All modes, switch via config.md
2. Modular - Single mode only

Choose mode:
1. Minimal - Essential behaviors
2. Standard - Balanced features  
3. Enhanced - Full automation
4. Meta - Task orchestration
```

### Step 2: Smart CLAUDE.md Integration

```javascript
function smartIntegration(projectPath) {
  const claudeFile = path.join(projectPath, 'CLAUDE.md');
  const importLine = '@~/.claude/intelligent-claude-code.md';
  const comment = '<!-- Intelligent Claude Code Enhancement -->';
  
  if (!fs.existsSync(claudeFile)) {
    // No existing CLAUDE.md - create minimal one
    const content = `# Claude Code Configuration\n\n${importLine}\n`;
    fs.writeFileSync(claudeFile, content);
    console.log('✅ Created CLAUDE.md with system import');
    return;
  }
  
  const existingContent = fs.readFileSync(claudeFile, 'utf8');
  
  // Check if already installed
  if (existingContent.includes(importLine)) {
    console.log('⚠️  System already installed in CLAUDE.md');
    const answer = prompt('Update installation? (y/N)');
    if (answer.toLowerCase() !== 'y') return;
  }
  
  // Parse existing content
  const lines = existingContent.split('\n');
  let insertIndex = findBestInsertionPoint(lines);
  
  // Insert import with comment
  lines.splice(insertIndex, 0, '', comment, importLine);
  
  const newContent = lines.join('\n');
  fs.writeFileSync(claudeFile, newContent);
  console.log('✅ Added system import to existing CLAUDE.md');
}

function findBestInsertionPoint(lines) {
  // Strategy 1: After existing @imports
  let lastImportIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('@')) {
      lastImportIndex = i;
    }
  }
  
  if (lastImportIndex !== -1) {
    return lastImportIndex + 1;
  }
  
  // Strategy 2: After title/heading
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('#')) {
      return i + 1;
    }
  }
  
  // Strategy 3: At the beginning
  return 0;
}
```

### Step 3: Configuration Setup

```javascript
function setupConfiguration(mode, installationType) {
  const configPath = path.join(os.homedir(), '.claude', 'config.md');
  
  if (installationType === 'complete') {
    // Copy unified config with mode switching
    copyConfigTemplate('config-complete.md', configPath);
    setActiveMode(configPath, mode);
  } else {
    // Copy mode-specific config
    copyConfigTemplate(`config-${mode}.md`, configPath);
  }
  
  console.log(`✅ Configuration created: ${configPath}`);
  console.log(`📝 Edit this file to customize behavior`);
}
```

### Step 4: Verification

```javascript
function verifyInstallation(projectPath) {
  const checks = [
    { name: 'CLAUDE.md exists', check: () => fs.existsSync('CLAUDE.md') },
    { name: 'System import present', check: () => 
      fs.readFileSync('CLAUDE.md', 'utf8').includes('@~/.claude/intelligent-claude-code.md') 
    },
    { name: 'Config file exists', check: () => 
      fs.existsSync(path.join(os.homedir(), '.claude', 'config.md'))
    },
    { name: 'Behavior files installed', check: () => 
      fs.existsSync(path.join(os.homedir(), '.claude', 'behaviors'))
    }
  ];
  
  console.log('\n🔍 Verifying installation...');
  checks.forEach(({ name, check }) => {
    const status = check() ? '✅' : '❌';
    console.log(`${status} ${name}`);
  });
}
```

## Benefits of This Approach

1. **Respectful Integration**
   - Never overwrites user content
   - Preserves existing structure
   - Clear about what was added

2. **Smart Detection**
   - Finds best insertion point
   - Handles various CLAUDE.md formats
   - Prevents duplicate installations

3. **Transparent Configuration**
   - Native markdown format
   - Explicit rather than environment-based
   - Easy to understand and modify

4. **Reversible**
   - Remove one import line to uninstall
   - No hidden configuration files
   - Clean uninstallation process