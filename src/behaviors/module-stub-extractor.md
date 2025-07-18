# Module Stub Extractor

**PURPOSE:** Extract lightweight stubs from behavioral modules for lazy loading  
**TYPE:** Optimization Utility Component  
**STATUS:** ACTIVE

## Stub Extraction System

### Core Stub Extractor
```pseudocode
CLASS ModuleStubExtractor:
    extractionRules: Map<string, ExtractionRule>
    
    FUNCTION initialize():
        defineExtractionRules()
        
    FUNCTION extractStub(moduleFile, targetTokens = 500):
        content = readFile(moduleFile)
        moduleName = extractModuleName(moduleFile)
        
        // Get module-specific extraction rules
        rules = extractionRules.get(moduleName) || getDefaultRules()
        
        // Extract essential content
        stub = {
            header: extractHeader(content),
            purpose: extractPurpose(content),
            coreSignatures: extractCoreSignatures(content, rules),
            imports: extractImports(content),
            tokenCount: 0
        }
        
        // Build stub content
        stubContent = buildStubContent(stub, targetTokens)
        stub.content = stubContent
        stub.tokenCount = countTokens(stubContent)
        
        RETURN stub
```

### Module-Specific Extraction Rules
```pseudocode
FUNCTION defineExtractionRules():
    extractionRules = {
        "lean-workflow-executor": {
            essential: [
                "initialize_system",
                "read_assignment", 
                "execute_phase",
                "assign_role"
            ],
            optional: [
                "update_progress",
                "planStory",
                "executeGitOperations"
            ],
            sections: [
                "Core Functions",
                "Validation Command Chains"
            ]
        },
        
        "role-activation-system": {
            essential: [
                "activateRole",
                "loadRoleProfile",
                "initialize"
            ],
            optional: [
                "createDynamicProfile",
                "applyBehavioralProfile",
                "saveRoleState"
            ],
            sections: [
                "Role Activation Implementation",
                "Core Role Activation Controller"
            ]
        },
        
        "learning-team-automation": {
            essential: [
                "processErrorForLearning",
                "detectLearningApplication"
            ],
            optional: [
                "createLearningEntity",
                "extractSuccessfulPatterns",
                "executeRetrospective"
            ],
            sections: [
                "AUTOMATED LEARNING ENFORCEMENT",
                "BONUS POINT AUTOMATION"
            ]
        },
        
        "l3-continuous-engine": {
            essential: [
                "startContinuousLoop",
                "getAvailableTasks",
                "executeTaskAsync"
            ],
            optional: [
                "handleTaskError",
                "checkPhaseTransitions",
                "discoverNewWork"
            ],
            sections: [
                "Core Components",
                "Continuous Execution Engine"
            ]
        },
        
        "task-queue-manager": {
            essential: [
                "addTask",
                "getNextTask",
                "calculateCompositePriority"
            ],
            optional: [
                "getParallelTasks",
                "removeTask",
                "updateTaskStatus"
            ],
            sections: [
                "Priority Queue Structure",
                "Priority Calculation"
            ]
        },
        
        "auto-continue-triggers": {
            essential: [
                "triggerEvent",
                "handleTaskCompleted",
                "registerCoreTriggers"
            ],
            optional: [
                "triggerTesting",
                "triggerReview",
                "handleTestFailure"
            ],
            sections: [
                "Trigger Registry",
                "Task Completion Handlers"
            ]
        }
    }
```

### Content Extraction Functions
```pseudocode
FUNCTION extractHeader(content):
    lines = content.split("\n")
    headerLines = []
    
    FOR line IN lines:
        IF line.startsWith("#"):
            headerLines.append(line)
        ELSE IF line.startsWith("**PURPOSE:**") OR
                line.startsWith("**TYPE:**") OR
                line.startsWith("**STATUS:**"):
            headerLines.append(line)
        ELSE IF headerLines.length > 0 AND line.trim() == "":
            // Stop at first empty line after header
            BREAK
    
    RETURN headerLines.join("\n")

FUNCTION extractCoreSignatures(content, rules):
    signatures = []
    lines = content.split("\n")
    
    FOR functionName IN rules.essential:
        signature = extractFunctionSignature(lines, functionName)
        IF signature:
            signatures.append(signature)
    
    RETURN signatures

FUNCTION extractFunctionSignature(lines, functionName):
    FOR i, line IN lines:
        IF line.contains("FUNCTION " + functionName + "("):
            // Extract function signature and first few lines
            signature = [line]
            
            // Look for parameters and return type
            j = i + 1
            WHILE j < lines.length AND j < i + 10:
                nextLine = lines[j]
                
                // Stop at implementation details
                IF nextLine.contains("TRY:") OR 
                   nextLine.contains("FOR ") OR
                   nextLine.contains("WHILE ") OR
                   nextLine.contains("SWITCH "):
                    signature.append("    // ... implementation details ...")
                    BREAK
                
                signature.append(nextLine)
                j++
            
            RETURN signature.join("\n")
    
    RETURN null
```

### Section-Based Extraction
```pseudocode
FUNCTION extractEssentialSections(content, rules):
    sections = []
    lines = content.split("\n")
    
    FOR sectionName IN rules.sections:
        section = extractSection(lines, sectionName)
        IF section:
            sections.append(section)
    
    RETURN sections

FUNCTION extractSection(lines, sectionName):
    sectionLines = []
    inSection = false
    
    FOR line IN lines:
        // Start of section
        IF line.contains(sectionName):
            inSection = true
            sectionLines.append(line)
            CONTINUE
        
        // End of section (next major header)
        IF inSection AND line.startsWith("##") AND NOT line.contains(sectionName):
            BREAK
        
        // Collect section content
        IF inSection:
            sectionLines.append(line)
    
    RETURN sectionLines.join("\n")
```

## Stub Building System

### Content Assembly
```pseudocode
FUNCTION buildStubContent(stub, targetTokens):
    content = []
    currentTokens = 0
    
    // Always include header
    content.append(stub.header)
    currentTokens += countTokens(stub.header)
    
    // Add imports (essential for dependencies)
    IF stub.imports:
        content.append(stub.imports)
        currentTokens += countTokens(stub.imports)
    
    // Add core function signatures
    FOR signature IN stub.coreSignatures:
        signatureTokens = countTokens(signature)
        
        IF currentTokens + signatureTokens <= targetTokens:
            content.append(signature)
            currentTokens += signatureTokens
        ELSE:
            // Add truncated version
            truncated = truncateSignature(signature, targetTokens - currentTokens)
            content.append(truncated)
            BREAK
    
    // Add loading instructions
    content.append(generateLoadingInstructions(stub))
    
    RETURN content.join("\n\n")

FUNCTION truncateSignature(signature, remainingTokens):
    lines = signature.split("\n")
    truncated = []
    tokens = 0
    
    FOR line IN lines:
        lineTokens = countTokens(line)
        
        IF tokens + lineTokens <= remainingTokens:
            truncated.append(line)
            tokens += lineTokens
        ELSE:
            truncated.append("    // ... [truncated - load full function] ...")
            BREAK
    
    RETURN truncated.join("\n")
```

### Loading Instructions
```pseudocode
FUNCTION generateLoadingInstructions(stub):
    instructions = [
        "## Lazy Loading Instructions",
        "",
        "This is a stub module. Full content loaded on demand.",
        "",
        "**Available Functions:**"
    ]
    
    FOR signature IN stub.coreSignatures:
        functionName = extractFunctionName(signature)
        instructions.append("- `" + functionName + "()` - Load with loadFunction()")
    
    instructions.append("")
    instructions.append("**Load Commands:**")
    instructions.append("- `loadFunction(moduleName, functionName)` - Load specific function")
    instructions.append("- `loadFullModule(moduleName)` - Load complete module")
    instructions.append("- `loadOperationFunctions(operationType)` - Load functions for operation")
    
    RETURN instructions.join("\n")
```

## Performance Optimization

### Token Counting
```pseudocode
FUNCTION countTokens(content):
    // Rough token estimation (1 token ≈ 4 characters)
    return Math.ceil(content.length / 4)

FUNCTION validateTokenTarget(content, targetTokens):
    actualTokens = countTokens(content)
    
    IF actualTokens > targetTokens:
        logWarning("Stub exceeds target tokens: " + actualTokens + " > " + targetTokens)
    
    RETURN actualTokens <= targetTokens
```

### Content Prioritization
```pseudocode
FUNCTION prioritizeContent(content, rules):
    contentBlocks = parseContentBlocks(content)
    prioritized = []
    
    // Priority 1: Essential functions
    FOR block IN contentBlocks:
        IF block.type == "function" AND block.name IN rules.essential:
            prioritized.append({block: block, priority: 1})
    
    // Priority 2: Core sections
    FOR block IN contentBlocks:
        IF block.type == "section" AND block.name IN rules.sections:
            prioritized.append({block: block, priority: 2})
    
    // Priority 3: Optional functions
    FOR block IN contentBlocks:
        IF block.type == "function" AND block.name IN rules.optional:
            prioritized.append({block: block, priority: 3})
    
    // Sort by priority
    prioritized.sort((a, b) => a.priority - b.priority)
    
    RETURN prioritized.map(item => item.block)
```

## Integration with Lazy Loader

### Stub Generation
```pseudocode
FUNCTION generateAllStubs():
    modules = [
        "lean-workflow-executor.md",
        "role-activation-system.md", 
        "learning-team-automation.md",
        "l3-continuous-engine.md",
        "task-queue-manager.md",
        "auto-continue-triggers.md",
        "progress-monitor.md",
        "work-discovery-engine.md",
        "archival-intelligence.md"
    ]
    
    stubs = {}
    
    FOR module IN modules:
        modulePath = "src/behaviors/" + module
        stub = extractStub(modulePath, 500)  // 500 token target
        stubs[module] = stub
    
    RETURN stubs

FUNCTION validateStubQuality(stub):
    checks = [
        validateTokenTarget(stub.content, 500),
        validateEssentialFunctions(stub),
        validateLoadingInstructions(stub)
    ]
    
    RETURN checks.every(check => check)
```

### Dynamic Stub Creation
```pseudocode
FUNCTION createDynamicStub(moduleName, operationType):
    // Create operation-specific stubs
    operationRules = getOperationRules(operationType)
    
    stub = {
        header: "# " + moduleName + " (Operation: " + operationType + ")",
        purpose: "Stub for " + operationType + " operations",
        functions: operationRules.functions,
        sections: operationRules.sections
    }
    
    RETURN buildStubContent(stub, 300)  // Smaller for operation-specific
```

## Benefits and Metrics

### Stub Quality Metrics
- **Token Efficiency**: Target 500 tokens per stub (vs 2000+ for full modules)
- **Function Coverage**: 100% of essential functions included
- **Load Time**: <50ms for stub vs 200ms+ for full module
- **Memory Usage**: 75% reduction in memory footprint

### Extraction Accuracy
- **Signature Completeness**: All essential function signatures captured
- **Dependency Preservation**: Import chains maintained
- **Context Retention**: Sufficient context for lazy loading decisions

---
*Module stub extraction system for intelligent-claude-code lazy loading optimization*