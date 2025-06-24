# Intelligent Claude Code Configuration

<!--
This file configures the behavior and mode of the Intelligent Claude Code system.
Native markdown configuration - no hidden .env files needed.
Copy this to ~/.claude/config.md to customize behaviors.
-->

## Active Mode
<!-- Choose one: minimal, standard, enhanced, meta -->
standard

## Mode Configuration
<!-- The active mode imports appropriate behaviors and personas -->
@~/.claude/modes/standard.md

<!--
MODE SWITCHING:
To change modes, edit the "Active Mode" setting above and update the import path:

Minimal Mode (~600 tokens):
- Change "standard" to "minimal" 
- Change import to: @~/.claude/modes/minimal.md

Standard Mode (~2000 tokens):
- Change "minimal" to "standard"
- Change import to: @~/.claude/modes/standard.md

Enhanced Mode (~5000 tokens):
- Change "standard" to "enhanced"
- Change import to: @~/.claude/modes/enhanced.md

Meta Mode (~6200 tokens):
- Change "enhanced" to "meta"
- Change import to: @~/.claude/modes/meta.md
-->

## Project-Specific Configuration

<!--
Add your project-specific instructions below this line.
These will be preserved during upgrades and mode changes.
-->

<!-- Project instructions go here -->

---

*Configuration is loaded automatically when this file is imported*
*This system uses native markdown configuration - no hidden .env files needed*