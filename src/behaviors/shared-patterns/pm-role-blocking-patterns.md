# PM Role Blocking Patterns

**MANDATORY:** Nuclear blocking patterns specific to PM role work execution.

## PM Role Operations (NUCLEAR BLOCKED)
- PM attempting any Edit/Write/MultiEdit operations
- PM trying to fix bugs directly
- PM implementing features without delegation
- PM performing system configurations
- PM bypassing AgentTask creation process
- PM executing technical work in any form

## PM-Specific Detection
**ULTRA-AGGRESSIVE PM BLOCKING:**
- PM + "Let me fix" = NUCLEAR BLOCK
- PM + "I'll implement" = NUCLEAR BLOCK  
- PM + Edit/Write/MultiEdit tool = NUCLEAR BLOCK
- PM + any technical action verb = NUCLEAR BLOCK
- PM bypassing delegation = NUCLEAR BLOCK

## Context Analysis
**PM DETECTION TRIGGERS:**
- Work intent + main scope context = BLOCK
- Tool usage + no AgentTask authorization = BLOCK
- Action verb + target object = BLOCK
- Implementation language + specific task = BLOCK
- PM role + ANY work attempt = NUCLEAR BLOCK
- PM role + tool access attempt = NUCLEAR BLOCK

---
*Nuclear PM role blocking patterns for delegation enforcement*