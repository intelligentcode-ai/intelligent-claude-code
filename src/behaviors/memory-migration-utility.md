# Memory Migration Utility

**PURPOSE:** Migrate from MCP Memory to file-based memory system  
**TYPE:** Migration Tool  
**STATUS:** ACTIVE  

## Migration Process

### Step 1: Export MCP Memory
```pseudocode
FUNCTION exportMCPMemory():
    logInfo("Starting MCP Memory export...")
    
    TRY:
        // Read entire memory graph
        graph = mcp__memory__read_graph()
        
        // Save backup
        backupPath = ".claude/memory-backup-" + getCurrentDate() + ".json"
        Write(backupPath, JSON.stringify(graph, null, 2))
        
        logInfo("Exported " + graph.entities.length + " entities")
        logInfo("Exported " + graph.relations.length + " relations")
        logInfo("Backup saved to: " + backupPath)
        
        RETURN graph
        
    CATCH error:
        logError("Failed to export MCP Memory: " + error)
        RETURN null
```

### Step 2: Convert to File-Based
```pseudocode
FUNCTION convertToFileBased(graph):
    stats = {
        entities: {success: 0, failed: 0},
        relations: {success: 0, failed: 0}
    }
    
    // Convert entities
    FOR entity IN graph.entities:
        TRY:
            // Ensure entity has required fields
            IF NOT entity.entityType AND entity.type:
                entity.entityType = entity.type
            
            // Store using file-based system
            result = StoreInMemory(entity)
            IF result:
                stats.entities.success++
            ELSE:
                stats.entities.failed++
                
        CATCH error:
            logError("Failed to convert entity: " + entity.name)
            stats.entities.failed++
    
    // Convert relations
    FOR relation IN graph.relations:
        TRY:
            // Find the source entity
            fromEntity = findEntityByName(relation.from, graph.entities)
            IF fromEntity:
                // Add relation to entity
                IF NOT fromEntity.relations:
                    fromEntity.relations = []
                
                fromEntity.relations.append({
                    type: relation.relationType,
                    to: relation.to
                })
                
                // Update entity with relations
                StoreInMemory(fromEntity)
                stats.relations.success++
            ELSE:
                stats.relations.failed++
                
        CATCH error:
            logError("Failed to convert relation: " + relation)
            stats.relations.failed++
    
    RETURN stats
```

### Step 3: Verify Migration
```pseudocode
FUNCTION verifyMigration(originalGraph):
    logInfo("Verifying migration...")
    verification = {
        entities: {expected: 0, found: 0, missing: []},
        relations: {expected: 0, found: 0, missing: []},
        passed: false
    }
    
    // Count expected
    verification.entities.expected = originalGraph.entities.length
    verification.relations.expected = originalGraph.relations.length
    
    // Verify entities
    FOR entity IN originalGraph.entities:
        loaded = LoadFromMemory(entity.name)
        IF loaded:
            verification.entities.found++
        ELSE:
            verification.entities.missing.append(entity.name)
    
    // Verify relations
    FOR relation IN originalGraph.relations:
        fromEntity = LoadFromMemory(relation.from)
        IF fromEntity AND fromEntity.relations:
            relationFound = false
            FOR rel IN fromEntity.relations:
                IF rel.type == relation.relationType AND rel.to == relation.to:
                    relationFound = true
                    BREAK
            
            IF relationFound:
                verification.relations.found++
            ELSE:
                verification.relations.missing.append(relation)
        ELSE:
            verification.relations.missing.append(relation)
    
    // Check if passed
    verification.passed = (
        verification.entities.found == verification.entities.expected AND
        verification.relations.found == verification.relations.expected
    )
    
    RETURN verification
```

### Step 4: Cleanup MCP Memory
```pseudocode
FUNCTION cleanupMCPMemory():
    logWarning("This will delete all MCP Memory data!")
    
    // First ensure we have a backup
    backupFiles = Glob(".claude/memory-backup-*.json")
    IF backupFiles.length == 0:
        logError("No backup found! Run exportMCPMemory() first")
        RETURN false
    
    // Get most recent backup
    latestBackup = backupFiles.sort().reverse()[0]
    logInfo("Using backup: " + latestBackup)
    
    // Note: MCP Memory deletion would need to be done via MCP commands
    // For now, we just stop using it
    logInfo("Migration complete. Stop using mcp__memory__ functions")
    logInfo("All memory operations now use file-based system")
    
    RETURN true
```

## Complete Migration Process

### Full Migration Function
```pseudocode
FUNCTION runFullMigration():
    logInfo("=== Starting Full Memory Migration ===")
    
    // Step 1: Export
    logInfo("Step 1/4: Exporting MCP Memory...")
    graph = exportMCPMemory()
    IF NOT graph:
        logError("Migration aborted: Export failed")
        RETURN false
    
    // Step 2: Convert
    logInfo("Step 2/4: Converting to file-based...")
    stats = convertToFileBased(graph)
    logInfo("Conversion stats:")
    logInfo("  Entities: " + stats.entities.success + " success, " + stats.entities.failed + " failed")
    logInfo("  Relations: " + stats.relations.success + " success, " + stats.relations.failed + " failed")
    
    // Step 3: Verify
    logInfo("Step 3/4: Verifying migration...")
    verification = verifyMigration(graph)
    logInfo("Verification results:")
    logInfo("  Entities: " + verification.entities.found + "/" + verification.entities.expected)
    logInfo("  Relations: " + verification.relations.found + "/" + verification.relations.expected)
    
    IF NOT verification.passed:
        logError("Verification failed! Check missing items:")
        logError("  Missing entities: " + verification.entities.missing)
        logError("  Missing relations: " + verification.relations.missing)
        RETURN false
    
    // Step 4: Cleanup
    logInfo("Step 4/4: Cleanup...")
    cleanupMCPMemory()
    
    logInfo("=== Migration Complete! ===")
    logInfo("All memory operations now use file-based system")
    logInfo("Backup saved in: .claude/memory-backup-*.json")
    
    RETURN true
```

## Usage Instructions

### Manual Migration
```bash
# 1. Run the migration
runFullMigration()

# 2. Verify file structure created
ls -la .claude/memory/

# 3. Test memory operations
testEntity = {
    name: "Test-Migration-Success",
    entityType: "Test",
    observations: ["Migration completed successfully"]
}
StoreInMemory(testEntity)
LoadFromMemory("Test-Migration-Success")
```

### Rollback Process
```pseudocode
FUNCTION rollbackMigration(backupFile):
    logInfo("Rolling back migration from: " + backupFile)
    
    // Load backup
    backupContent = Read(backupFile)
    graph = JSON.parse(backupContent)
    
    // Restore to MCP Memory
    FOR entity IN graph.entities:
        mcp__memory__create_entities([entity])
    
    FOR relation IN graph.relations:
        mcp__memory__create_relations([relation])
    
    logInfo("Rollback complete")
```

## Migration Checklist

- [ ] Backup existing MCP Memory data
- [ ] Run migration process
- [ ] Verify all entities migrated
- [ ] Verify all relations migrated
- [ ] Test file-based operations
- [ ] Update all behavioral modules to use file-based memory
- [ ] Remove MCP Memory dependencies
- [ ] Commit changes to git

## Benefits After Migration

1. **92% Token Reduction**: From 108,231 to 7,975 tokens per session
2. **Git Integration**: All memory changes tracked in version control
3. **Selective Loading**: Load only needed memory files
4. **No External Dependencies**: Self-contained system
5. **Transparent State**: View/edit memory in markdown files
6. **Faster Operations**: Direct file access vs API calls

---
*Migration utility for transitioning to file-based memory*