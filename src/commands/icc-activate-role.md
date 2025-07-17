# icc:activate-role

Activate a specialist role (PM, AI-Engineer, Developer, etc.) with full behavioral switching and expertise loading. Supports dynamic specialist creation for any technology domain.

## Usage
```
icc-activate-role @Role-Name
```

## Examples
```bash
# Activate core roles
icc-activate-role @PM
icc-activate-role @AI-Engineer
icc-activate-role @Developer

# Activate dynamic specialists (auto-created)
icc-activate-role @React-Developer
icc-activate-role @AWS-Engineer
icc-activate-role @Security-Specialist
```

## Parameters
- `role_name`: Role to activate (e.g., @PM, @AI-Engineer, @React-Developer)

## Implementation
Uses role-activation-system for full behavioral switching:

1. **Role Validation**: Verify role exists or can be created dynamically
2. **State Management**: Save current role state if switching
3. **Profile Loading**: Load role expertise and behavioral patterns
4. **Dynamic Creation**: Create specialist if needed (e.g., @React-Developer)
5. **Behavioral Application**: Apply role-specific communication and decision patterns
6. **Context Loading**: Load role-specific context and knowledge
7. **Score Integration**: Load role scores from badges.md

## Expected Output
```
🔄 Role Activation: @AI-Engineer

💾 Saving current role state...
📋 Loading role profile...
🧠 Loading expertise: AI/ML systems, automation, intelligent systems
⚙️  Applying behavioral patterns...
📊 Loading scores: P:7.0, Q:8.5
🎯 Context: AI system development focus

✅ @AI-Engineer (P:7.0, Q:8.5): Now active for AI system development
```

## Dynamic Specialist Creation
For technology-specific roles:
```
🔄 Role Activation: @React-Developer

❓ Role not found, creating dynamic specialist...
🔍 Base role: Developer
🎯 Domain: React
📚 Loading domain knowledge from Context7...
✅ @React-Developer (P:0.0, Q:0.0): Now active for React development
```

## Integration
- Integrates with role-activation-system.md
- Supports dynamic specialist creation for any technology
- Maintains role state stack for easy switching
- Updates scoring system with role-specific scores