# Activate Role

Switch to specialized role using $ARGUMENTS as the role name.

## Behavioral Sequence
1. Parse $ARGUMENTS to extract role name (must start with @)
2. If role name missing @, respond "Error: Role must start with @ (e.g., @PM, @Developer)"
3. Strip @ prefix and validate role format:
   - Core roles: PM, Architect, Developer, System-Engineer, etc.
   - Dynamic specialists: Domain-BaseRole (e.g., React-Developer, AWS-Engineer)
4. Check if role exists in core 14 roles:
   - If found, load role definition from `~/.claude/roles/specialists.md`
   - If not found, check dynamic specialist pattern (Domain-BaseRole)
5. For dynamic specialists:
   - Parse Domain and BaseRole components
   - Validate BaseRole exists in core roles
   - Create specialist profile combining domain expertise with base role
   - If Context7 available, inject domain-specific knowledge
6. Load role behavioral patterns:
   - Set communication style (technical, strategic, detailed, etc.)
   - Apply role constraints (PM cannot Edit/Write, only delegate)
   - Load role-specific tools and capabilities
7. Preserve current role state:
   - Save previous role context to role stack
   - Maintain role scores (P: Process, Q: Quality)
   - Store working context and task history
8. Switch to new role:
   - Adopt role expertise and mindset
   - Display role activation: "@Role (P:X.X, Q:X.X): Now active for [current context]"
   - Apply ultra-experienced mindset (10+ years expertise)
9. Update system state:
   - Record role switch in activity log
   - Update scoring system with role change
   - Enable role-specific command access

## Error Handling
- Invalid role format: "Error: Invalid role format. Use @RoleName or @Domain-BaseRole"
- Unknown base role for specialist: "Error: Unknown base role '[BaseRole]'. Available: PM, Developer, Architect, etc."
- System not initialized: "Error: Virtual team system not initialized. Run icc-init-system first."
- Role switching while in critical task: "Warning: Switching roles during active task. Context preserved."

## Command Chaining
- After successful activation, role can immediately receive task assignments
- Role state persists until explicit switch or system reset
- Output includes current role scores for delegation decisions