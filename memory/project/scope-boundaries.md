# Project Scope Boundaries

## 2025-08-04: Path Resolution for AI-Agentic Systems
**Context:** PRB-001
**Problem:** System was attempting to create directories in ~/.claude/ during execution
**Solution:** Implement configurable paths with project-only execution scope
**Code Example:**
```bash
# ✅ CORRECT - Configurable path
memory_path=$(get_setting "memory_path" "memory/")
mkdir -p "${memory_path}/entities/"

# ❌ WRONG - Hardcoded .claude path
mkdir -p .claude/memory/entities/
```
---

## 2025-08-04: Installation vs Execution Scope Separation
**Context:** PRB-001
**Problem:** Confusion between installation scope and execution scope
**Solution:** Clear separation - ~/.claude/ is read-only during execution
**Prevention:**
1. Installation: System files in ~/.claude/ (via Ansible only)
2. Execution: All operations within project directory
3. Configuration: Read from ~/.claude/, execute in project
---

## 2025-08-04: Directory Configuration Pattern
**Context:** PRB-001
**Problem:** Hardcoded directory paths throughout the system
**Solution:** Make all project directories configurable via settings
**Implementation:**
```yaml
# In config.md or CLAUDE.md
memory_path: "knowledge/"     # Custom memory location
prb_path: "requirements/"     # Custom PRB location
story_path: "user-stories/"   # Custom story location
```
---