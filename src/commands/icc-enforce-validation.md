# Enforce Validation

**BEHAVIORAL INSTRUCTION**: Activate real-time validation enforcement with self-correcting behavior.

## Usage
```
/icc-enforce-validation [--test-mode]
```

## Claude Behaviors
1. **ValidationInterceptor Load**: Load and activate validation interceptor
2. **Role Assignment Hooks**: Hook into role assignment flow for real-time correction
3. **Git Operation Hooks**: Hook into git operations for privacy enforcement
4. **Command Validation**: Hook into command execution for validation
5. **Real-time Monitoring**: Enable continuous validation monitoring
6. **Auto-correction**: Automatically correct invalid assignments and operations
7. **Test Mode**: Run validation test scenarios when --test-mode flag used

## Mandatory Behaviors
- Always load ValidationInterceptor before proceeding
- Always hook into role assignment flow for real-time interception
- Always hook into git operations for privacy enforcement
- Always enable real-time validation monitoring
- Always auto-correct invalid role assignments
- Always strip AI mentions from git content when privacy enabled
- Always log auto-corrections for visibility

## Integration
- Automatically executed when /icc-load runs
- Ensures validation is always active
- Provides testable validation behavior