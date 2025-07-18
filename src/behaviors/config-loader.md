# Config Loader

**Purpose:** Load and manage system configuration from config.md files  
**Type:** Core System Component  
**Status:** ACTIVE

## Executive Summary (40 tokens)

**Hierarchy:** Embedded → Project → User → Defaults  
**Main API:** `SettingsAPI.getSettings()` returns merged config  
**Caching:** 5 minute TTL, 1 hour for embedded configs  
**Key Settings:** autonomy_level, git_privacy, pm_always_active, blocking_enabled  
**Integration:** Used by all behavioral modules via GetSettings() pattern  

## Imports

@./common-patterns.md                      # Shared behavioral patterns
@./session-file-cache.md                  # Session-based file caching

## Configuration Loading System

### Priority Hierarchy
1. **Embedded Config** (in assignment files) - Highest priority
2. **Project Config** (.claude/config.md) - Project-specific
3. **User Global** (~/.claude/config.md) - User preferences  
4. **System Defaults** - Fallback values

### Implementation

```pseudocode
CLASS ConfigLoader:
    validator: ConfigValidator
    
    FUNCTION loadConfiguration():
        configs = []
        
        // Load user global config with caching
        globalPath = expandPath("~/.claude/config.md")
        IF fileExists(globalPath):
            globalConfig = parseConfigFile(globalPath)
            IF globalConfig:
                configs.append({
                    source: "user_global",
                    priority: 3,
                    config: globalConfig
                })
        
        // Load project config with caching
        projectPath = ".claude/config.md"
        IF fileExists(projectPath):
            projectConfig = parseConfigFile(projectPath)
            IF projectConfig:
                configs.append({
                    source: "project",
                    priority: 2,
                    config: projectConfig
                })
        
        // Apply system defaults first
        finalConfig = getSystemDefaults()
        
        // Merge configs by priority (lower number = higher priority)
        configs.sort(by: priority, descending: true)
        FOR configEntry IN configs:
            finalConfig = mergeConfigs(finalConfig, configEntry.config)
        
        // Validate final configuration
        validation = validator.validate(finalConfig)
        IF NOT validation.isValid:
            logWarning("Config validation issues:", validation.errors)
            // Use defaults for invalid settings
            finalConfig = applyDefaultsForInvalid(finalConfig, validation)
        
        // Return configuration (cached at file level)
        RETURN finalConfig
    
    FUNCTION parseConfigFile(path):
        TRY:
            // OPTIMIZATION: Use session cache for file content
            content = getCachedFileContent(path, "config")
            
            // Extract YAML front matter if present
            IF content.startsWith("---"):
                yamlEnd = content.indexOf("---", 3)
                IF yamlEnd > 0:
                    yamlContent = content.substring(4, yamlEnd)
                    RETURN parseYAML(yamlContent)
            
            // Parse as key: value pairs
            config = {}
            lines = content.split("\n")
            FOR line IN lines:
                IF line.contains(":") AND NOT line.startsWith("#"):
                    parts = line.split(":", 2)
                    key = parts[0].trim()
                    value = parseValue(parts[1].trim())
                    config[key] = value
            
            RETURN config
            
        CATCH error:
            RETURN HandleError(error, "Config parse")  // Use common pattern
    
    // REMOVED: readFileSelective function - replaced by session cache
    // The session cache handles selective reading internally
    
    FUNCTION mergeConfigs(base, override):
        merged = copy(base)
        
        FOR key, value IN override:
            IF isObject(value) AND key IN merged:
                // Deep merge objects
                merged[key] = mergeConfigs(merged[key], value)
            ELSE:
                // Override simple values
                merged[key] = value
        
        RETURN merged
    
    FUNCTION loadEmbeddedConfig(content):
        // Extract embedded_config from assignment files
        // Note: content here is already from cache if file was read before
        embeddedMatch = content.match(/embedded_config:\s*\n((?:\s{2}.*\n)*)/m)
        IF embeddedMatch:
            embeddedYAML = embeddedMatch[1]
            config = parseYAML(embeddedYAML)
            RETURN {
                source: "embedded",
                priority: 1,
                config: config
            }
        RETURN null
```

### Configuration Schema

```yaml
# System Configuration Schema
config_schema:
  # Git Settings
  git_privacy: 
    type: boolean
    default: false
    description: "Strip AI/Claude mentions from commits"
    
  branch_protection:
    type: boolean
    default: true
    description: "Force feature branch workflow"
    
  default_branch:
    type: string
    default: "main"
    enum: ["main", "master", "develop"]
    description: "Default branch name"
    
  require_pr_for_main:
    type: boolean
    default: true
    description: "Require PR/MR for main branch"
    
  # Autonomy Settings
  autonomy_level:
    type: string
    default: "L2"
    enum: ["L1", "L2", "L3"]
    description: "System autonomy level"
    
  pm_always_active:
    type: boolean
    default: false
    description: "Auto-activate PM role on startup"
    
  blocking_enabled:
    type: boolean
    default: true
    description: "Allow blocking behaviors"
    
  # Team Settings
  default_reviewer:
    type: string
    default: "@AI-Architect"
    description: "Default peer reviewer"
    
  specialist_creation:
    type: boolean
    default: true
    description: "Allow dynamic specialist creation"
    
  role_validation:
    type: boolean
    default: true
    description: "Enforce role assignment validation"
```

### Settings Access API

```pseudocode
CLASS SettingsAPI:
    loader: ConfigLoader
    
    FUNCTION getSettings():
        // Load configuration with file-level caching
        // Configuration files are cached but final config is assembled fresh
        config = loader.loadConfiguration()
        RETURN config
    
    FUNCTION getSetting(key, defaultValue = null):
        settings = getSettings()
        
        // Support nested keys with dot notation
        IF key.contains("."):
            parts = key.split(".")
            value = settings
            FOR part IN parts:
                IF value AND part IN value:
                    value = value[part]
                ELSE:
                    RETURN defaultValue
            RETURN value
        
        RETURN settings.get(key, defaultValue)
    
    FUNCTION applyEmbeddedConfig(content):
        embedded = loader.loadEmbeddedConfig(content)
        IF embedded:
            // Merge with current settings (file-level cached)
            current = getSettings()
            merged = loader.mergeConfigs(current, embedded.config)
            RETURN merged
        RETURN getSettings()
```

### System Defaults

```pseudocode
FUNCTION getSystemDefaults():
    RETURN {
        // Git Settings
        git_privacy: false,
        branch_protection: true,
        default_branch: "main",
        require_pr_for_main: true,
        
        // Autonomy Settings
        autonomy_level: "L2",
        pm_always_active: false,
        blocking_enabled: true,
        
        // Team Settings
        default_reviewer: "@AI-Architect",
        specialist_creation: true,
        role_validation: true
    }
```

### Error Handling

```pseudocode
FUNCTION handleConfigError(error, source):
    // Use common error handling pattern
    RETURN HandleError(error, f"Config - {source}")
```

### Integration

The config loader integrates with all system components:

1. **Git Operations**: Check `git_privacy` before commits
2. **Workflow Execution**: Apply `autonomy_level` rules
3. **Role Assignment**: Enforce `role_validation` settings
4. **Team Startup**: Check `pm_always_active` flag

### Usage Example

```pseudocode
// Load configuration on startup
settings = SettingsAPI.getSettings()

// Check specific setting
IF SettingsAPI.getSetting("git_privacy", false):
    stripAIMentions(commitMessage)

// Apply embedded config from assignment
assignmentContent = getCachedFileContent("bug.yaml", "assignment")
settingsWithEmbedded = SettingsAPI.applyEmbeddedConfig(assignmentContent)

// Configuration files are cached for session
// Each call to getSettings() uses cached file content
```

---
*Config loader implementation for intelligent-claude-code system*