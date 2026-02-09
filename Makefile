# Intelligent Claude Code - Ansible Installation System
# Single target with parameters for local/remote installation

# Use bash for all commands
SHELL := /bin/bash
.SHELLFLAGS := -c

.PHONY: install uninstall clean-install test help clean dev-setup dev-clean

# Resolve relative paths to absolute paths before passing to Ansible
# This ensures paths work regardless of Ansible's working directory
ifdef MCP_CONFIG
    MCP_CONFIG_ABS := $(shell realpath $(MCP_CONFIG) 2>/dev/null || echo $(MCP_CONFIG))
else
    MCP_CONFIG_ABS :=
endif

ifdef ENV_FILE
    ENV_FILE_ABS := $(shell realpath $(ENV_FILE) 2>/dev/null || echo $(ENV_FILE))
else
    ENV_FILE_ABS :=
endif

ifdef CONFIG_FILE
    CONFIG_FILE_ABS := $(shell realpath $(CONFIG_FILE) 2>/dev/null || echo $(CONFIG_FILE))
else
    CONFIG_FILE_ABS :=
endif

# Default shows help
help:
	@echo "Intelligent Claude Code - Installation"
	@echo ""
	@echo "Usage:"
	@echo "  make install   [HOST=ip] [USER=user] [TARGET_PATH=/path] [CONFIG_FILE=sample-configs/icc.config.sub-agent.json] [MCP_CONFIG=/path/to/mcps.json] [ENV_FILE=/path/to/.env] [KEY=~/.ssh/id_rsa | PASS=password]"
	@echo "  make uninstall [HOST=ip] [USER=user] [TARGET_PATH=/path] [KEY=~/.ssh/id_rsa | PASS=password] [FORCE=true]"
	@echo "  make clean-install [HOST=ip] [USER=user] [TARGET_PATH=/path] [CONFIG_FILE=...] [MCP_CONFIG=...] [ENV_FILE=...] [KEY=... | PASS=...]"
	@echo "  make test                        # Run installation tests"
	@echo "  make dev-setup [SKILLS=\"...\"]    # Symlink skills from src/ for development"
	@echo "  make dev-clean [SKILLS=\"...\"]    # Remove development symlinks"
	@echo ""
	@echo "Parameters:"
	@echo "  HOST - Remote host IP (omit for local installation)"
	@echo "  USER - Remote username (required for remote installation)"
	@echo "  TARGET_PATH - Target path (omit for user scope ~/.claude/)"  
	@echo "  CONFIG_FILE - Path to icc.config JSON to deploy (default icc.config.default.json)"
	@echo "  MCP_CONFIG - Path to MCP servers configuration JSON file"
	@echo "  ENV_FILE - Path to .env file with environment variables"
	@echo "  KEY  - SSH key for remote (default: ~/.ssh/id_rsa)"
	@echo "  PASS - SSH password for remote (alternative to KEY)"
	@echo "  FORCE - Force complete removal including user data (uninstall only)"
	@echo ""
	@echo "Examples:"
	@echo "  make install                     # Local user scope"
	@echo "  make install TARGET_PATH=/project       # Local project"
	@echo "  make install MCP_CONFIG=./config/mcps.json  # Local with MCP servers"
	@echo "  make install MCP_CONFIG=./config/mcps.json ENV_FILE=.env  # With environment file"
	@echo "  make install HOST=192.168.1.110 USER=ubuntu  # Remote user scope (SSH key)"
	@echo "  make install HOST=ip USER=user PASS=pwd    # Remote with password"
	@echo "  make install HOST=ip USER=user TARGET_PATH=/proj  # Remote project"
	@echo "  make uninstall                   # Local conservative uninstall"
	@echo "  make uninstall FORCE=true        # Local force uninstall (remove all)"
	@echo "  make uninstall HOST=ip USER=user # Remote uninstall"
	@echo "  make clean-install               # Local force uninstall + reinstall"
	@echo "  make clean-install TARGET_PATH=/project  # Local project clean install"
	@echo "  make test                        # Test installation"
	@echo ""
	@echo "To enable verbose mode, remove the ANSIBLE_STDOUT_CALLBACK settings from Makefile"

# Auto-detect ansible-playbook in common locations
ANSIBLE_PLAYBOOK := $(shell \
	if command -v ansible-playbook >/dev/null 2>&1; then \
		command -v ansible-playbook; \
	elif [ -x "/opt/homebrew/bin/ansible-playbook" ]; then \
		echo "/opt/homebrew/bin/ansible-playbook"; \
	elif [ -x "/usr/local/bin/ansible-playbook" ]; then \
		echo "/usr/local/bin/ansible-playbook"; \
	elif [ -x "/usr/bin/ansible-playbook" ]; then \
		echo "/usr/bin/ansible-playbook"; \
	elif [ -x "$$HOME/.local/bin/ansible-playbook" ]; then \
		echo "$$HOME/.local/bin/ansible-playbook"; \
	elif ls $$HOME/Library/Python/3.*/bin/ansible-playbook >/dev/null 2>&1; then \
		ls -1 $$HOME/Library/Python/3.*/bin/ansible-playbook 2>/dev/null | head -1; \
	else \
		echo ""; \
	fi)

# Export for subprocesses
export ANSIBLE_PLAYBOOK

# Single install target handles both local and remote
install:
	@if [ -z "$(ANSIBLE_PLAYBOOK)" ]; then \
		echo "ERROR: ansible-playbook not found!"; \
		echo ""; \
		echo "Searched in:"; \
		echo "  - System PATH"; \
		echo "  - /opt/homebrew/bin (macOS Homebrew)"; \
		echo "  - /usr/local/bin (common location)"; \
		echo "  - /usr/bin (system packages)"; \
		echo "  - ~/.local/bin (Python user install)"; \
		echo "  - ~/Library/Python/3.*/bin (macOS Python)"; \
		echo ""; \
		echo "Please install Ansible:"; \
		echo "  macOS:  brew install ansible"; \
		echo "  Ubuntu: sudo apt install ansible"; \
		echo "  Fedora: sudo dnf install ansible"; \
		echo "  Python: pip install --user ansible"; \
		exit 1; \
	fi
	@if [ -z "$(HOST)" ]; then \
		echo "Installing locally..."; \
		$(ANSIBLE_PLAYBOOK) ansible/install.yml \
			-i localhost, \
			-c local \
			-e "ansible_shell_type=sh" \
            -e "target_path=$(TARGET_PATH)" \
            -e "mcp_config_file=$(MCP_CONFIG_ABS)" \
            -e "env_file=$(ENV_FILE_ABS)" \
            -e "config_file=$(CONFIG_FILE_ABS)"; \
	else \
		if [ -z "$(USER)" ]; then \
			echo "ERROR: USER parameter required for remote installation!"; \
			echo "Usage: make install HOST=ip USER=username [PASS=pwd|KEY=keyfile]"; \
			exit 1; \
		fi; \
		echo "Installing on remote host $(HOST) as user $(USER)..."; \
		if [ -n "$(PASS)" ]; then \
			echo "Using password authentication..."; \
			ANSIBLE_STDOUT_CALLBACK=actionable \
			$(ANSIBLE_PLAYBOOK) ansible/install.yml \
				-i "$(USER)@$(HOST)," \
				-k -e "ansible_ssh_pass=$(PASS)" \
                -e "target_path=$(TARGET_PATH)" \
                -e "mcp_config_file=$(MCP_CONFIG_ABS)" \
                -e "env_file=$(ENV_FILE_ABS)" \
                -e "config_file=$(CONFIG_FILE_ABS)"; \
		else \
			echo "Using SSH key authentication..."; \
			ANSIBLE_STDOUT_CALLBACK=actionable \
			$(ANSIBLE_PLAYBOOK) ansible/install.yml \
				-i "$(USER)@$(HOST)," \
				-e "ansible_ssh_private_key_file=$(KEY)" \
                -e "target_path=$(TARGET_PATH)" \
                -e "mcp_config_file=$(MCP_CONFIG_ABS)" \
                -e "env_file=$(ENV_FILE_ABS)" \
                -e "config_file=$(CONFIG_FILE_ABS)"; \
		fi \
	fi

# Test installation and uninstall locally
# ANSIBLE_COLLECTIONS_PATH=/dev/null speeds up tests by skipping collection scanning
test:
	@echo "Testing Ansible syntax validation..."
	@ANSIBLE_COLLECTIONS_PATH=/dev/null $(ANSIBLE_PLAYBOOK) --syntax-check ansible/install.yml
	@ANSIBLE_COLLECTIONS_PATH=/dev/null $(ANSIBLE_PLAYBOOK) --syntax-check ansible/uninstall.yml
	@echo "✅ Ansible syntax validation passed!"
	@echo ""
	@echo "Testing installation..."
	@rm -rf test-install
	@mkdir -p test-install
	@ANSIBLE_COLLECTIONS_PATH=/dev/null ANSIBLE_STDOUT_CALLBACK=minimal $(MAKE) install TARGET_PATH=test-install
	@echo ""
	@echo "Verifying installation..."
	@test -f test-install/CLAUDE.md || (echo "FAIL: CLAUDE.md not created"; exit 1)
	@test -f test-install/.claude/modes/virtual-team.md || (echo "FAIL: virtual-team.md not installed"; exit 1)
	@test -f test-install/.claude/skills/architect/SKILL.md || (echo "FAIL: skill definitions not installed"; exit 1)
	@test -f test-install/.claude/skills/developer/SKILL.md || (echo "FAIL: developer skill not installed"; exit 1)
	@test -f test-install/.claude/skills/ai-engineer/SKILL.md || (echo "FAIL: ai-engineer skill not installed"; exit 1)
	@test -f test-install/.claude/agenttask-templates/medium-agenttask-template.yaml || (echo "FAIL: agenttask-templates not installed"; exit 1)
	@grep -q "@~/.claude/modes/virtual-team.md" test-install/CLAUDE.md || (echo "FAIL: Import not added"; exit 1)
	@echo "✅ Installation tests passed!"
	@echo ""
	@echo "Testing memory public export import..."
	@mkdir -p test-install/memory/exports/patterns
	@printf '%s\n' \
		'---' \
		'id: mem-001' \
		'title: Memory public import test' \
		'tags: [test]' \
		'category: patterns' \
		'scope: project' \
		'importance: low' \
		'created: 2026-02-09T00:00:00Z' \
		'---' \
		'' \
		'# Memory public import test' \
		'' \
		'## Summary' \
		'PUBLIC_IMPORT_SENTINEL' \
		> test-install/memory/exports/patterns/mem-001-memory-public-import-test.md
	@(cd test-install && node .claude/skills/memory/cli.js search "PUBLIC_IMPORT_SENTINEL" --limit 5 | grep -q "mem-001") || (echo "FAIL: memory search did not import public exports"; exit 1)
	@echo "✅ Memory public import test passed!"
	@echo ""
	@echo "Testing idempotency..."
	@ANSIBLE_COLLECTIONS_PATH=/dev/null ANSIBLE_STDOUT_CALLBACK=minimal $(MAKE) install TARGET_PATH=test-install
	@echo "✅ Idempotency test passed!"
	@echo ""
	@echo "Testing conservative uninstall..."
	@ANSIBLE_COLLECTIONS_PATH=/dev/null ANSIBLE_STDOUT_CALLBACK=minimal $(MAKE) uninstall TARGET_PATH=test-install
	@test ! -f test-install/.claude/modes/virtual-team.md || (echo "FAIL: modes not removed"; exit 1)
	@test ! -d test-install/.claude/behaviors || (echo "FAIL: behaviors not removed"; exit 1)
	@test ! -d test-install/.claude/skills || (echo "FAIL: skills not removed"; exit 1)
	@echo "✅ Conservative uninstall test passed!"
	@echo ""
	@echo "Testing force uninstall..."
	@ANSIBLE_COLLECTIONS_PATH=/dev/null ANSIBLE_STDOUT_CALLBACK=minimal $(MAKE) install TARGET_PATH=test-install
	@ANSIBLE_COLLECTIONS_PATH=/dev/null ANSIBLE_STDOUT_CALLBACK=minimal $(MAKE) uninstall TARGET_PATH=test-install FORCE=true
	@test ! -d test-install/.claude || (echo "FAIL: .claude directory not removed"; exit 1)
	@echo "✅ Force uninstall test passed!"
	@echo ""
	@echo "Testing install after uninstall..."
	@ANSIBLE_COLLECTIONS_PATH=/dev/null ANSIBLE_STDOUT_CALLBACK=minimal $(MAKE) install TARGET_PATH=test-install
	@test -f test-install/CLAUDE.md || (echo "FAIL: Reinstall failed"; exit 1)
	@echo "✅ Reinstall test passed!"
	@rm -rf test-install


# Uninstall existing installation (conservative by default, force with FORCE=true)
uninstall:
	@if [ -z "$(ANSIBLE_PLAYBOOK)" ]; then \
		echo "ERROR: ansible-playbook not found!"; \
		echo ""; \
		echo "Searched in:"; \
		echo "  - System PATH"; \
		echo "  - /opt/homebrew/bin (macOS Homebrew)"; \
		echo "  - /usr/local/bin (common location)"; \
		echo "  - /usr/bin (system packages)"; \
		echo "  - ~/.local/bin (Python user install)"; \
		echo "  - ~/Library/Python/3.*/bin (macOS Python)"; \
		echo ""; \
		echo "Please install Ansible:"; \
		echo "  macOS:  brew install ansible"; \
		echo "  Ubuntu: sudo apt install ansible"; \
		echo "  Fedora: sudo dnf install ansible"; \
		echo "  Python: pip install --user ansible"; \
		exit 1; \
	fi
	@if [ -z "$(HOST)" ]; then \
		echo "Uninstalling locally..."; \
		$(ANSIBLE_PLAYBOOK) ansible/uninstall.yml \
			-i localhost, \
			-c local \
			-e "ansible_shell_type=sh" \
			-e "target_path=$(TARGET_PATH)" \
			-e "force_remove=$(FORCE)"; \
	else \
		if [ -z "$(USER)" ]; then \
			echo "ERROR: USER parameter required for remote uninstall!"; \
			echo "Usage: make uninstall HOST=ip USER=username [PASS=pwd|KEY=keyfile] [FORCE=true]"; \
			exit 1; \
		fi; \
		echo "Uninstalling from remote host $(HOST) as user $(USER)..."; \
		if [ -n "$(PASS)" ]; then \
			echo "Using password authentication..."; \
			ANSIBLE_STDOUT_CALLBACK=actionable \
			$(ANSIBLE_PLAYBOOK) ansible/uninstall.yml \
				-i "$(USER)@$(HOST)," \
				-k -e "ansible_ssh_pass=$(PASS)" \
				-e "target_path=$(TARGET_PATH)" \
				-e "force_remove=$(FORCE)"; \
		else \
			echo "Using SSH key authentication..."; \
			ANSIBLE_STDOUT_CALLBACK=actionable \
			$(ANSIBLE_PLAYBOOK) ansible/uninstall.yml \
				-i "$(USER)@$(HOST)," \
				-e "ansible_ssh_private_key_file=$(KEY)" \
				-e "target_path=$(TARGET_PATH)" \
				-e "force_remove=$(FORCE)"; \
		fi \
	fi

# Force uninstall + reinstall (same args as install/uninstall)
clean-install:
	@$(MAKE) uninstall FORCE=true HOST="$(HOST)" USER="$(USER)" PASS="$(PASS)" KEY="$(KEY)" TARGET_PATH="$(TARGET_PATH)"
	@$(MAKE) install HOST="$(HOST)" USER="$(USER)" PASS="$(PASS)" KEY="$(KEY)" TARGET_PATH="$(TARGET_PATH)" CONFIG_FILE="$(CONFIG_FILE)" MCP_CONFIG="$(MCP_CONFIG)" ENV_FILE="$(ENV_FILE)"

# Clean test installations and temporary files
clean:
	@rm -rf test-*
	@rm -rf ~/.ansible/tmp/ansible-local-* 2>/dev/null || true
	@rm -rf ~/.ansible/tmp/ansible-tmp-* 2>/dev/null || true
	@echo "✓ Test directories removed"
	@echo "✓ Ansible temp files cleaned"

# Hook system test targets
test-hooks: ## Run hook system test suite
	@bash tests/run-tests.sh

test-unit: ## Run unit tests only
	@if [ -d "tests/hooks/unit" ] && [ "$$(ls -A tests/hooks/unit/*.js 2>/dev/null)" ]; then \
		node tests/hooks/unit/*.js; \
	else \
		echo "No unit tests found yet"; \
	fi

test-integration: ## Run integration tests only
	@if [ -d "tests/hooks/integration" ] && [ "$$(ls -A tests/hooks/integration/*.js 2>/dev/null)" ]; then \
		node tests/hooks/integration/*.js; \
	else \
		echo "No integration tests found yet"; \
	fi

.PHONY: test-hooks test-unit test-integration dev-setup dev-clean

# Default skills to symlink for development
# Core workflow: memory process reviewer best-practices thinking commit-pr
# Enforcement companions: branch-protection file-placement git-privacy
# Execution model: work-queue parallel-execution release
DEV_SKILLS ?= memory process reviewer best-practices thinking commit-pr branch-protection file-placement git-privacy work-queue parallel-execution release

# Development setup - symlink specific skills from source for testing
# Usage:
#   make dev-setup SKILLS="memory"                    # Symlink specific skill(s)
#   make dev-setup                                    # Symlink default dev skills
dev-setup:
	@echo "Setting up development environment..."
	@mkdir -p ~/.claude/skills
	@skills_to_link="$(if $(SKILLS),$(SKILLS),$(DEV_SKILLS))"; \
	echo "Symlinking skills: $$skills_to_link"; \
	for skill_name in $$skills_to_link; do \
		if [ -d "src/skills/$$skill_name" ]; then \
			if [ -L ~/.claude/skills/"$$skill_name" ]; then \
				rm ~/.claude/skills/"$$skill_name"; \
			elif [ -d ~/.claude/skills/"$$skill_name" ]; then \
				echo "  Backing up $$skill_name"; \
				mv ~/.claude/skills/"$$skill_name" ~/.claude/skills/"$$skill_name.backup"; \
			fi; \
			ln -sf "$$(pwd)/src/skills/$$skill_name" ~/.claude/skills/"$$skill_name"; \
			echo "  ✓ Linked $$skill_name"; \
		else \
			echo "  ⚠ Skill not found: $$skill_name"; \
		fi; \
	done
	@echo ""
	@if [ -d "src/skills/memory" ] && [ -L ~/.claude/skills/memory ] && command -v npm >/dev/null 2>&1; then \
		echo "Installing memory skill dependencies..."; \
		cd src/skills/memory && npm install --production 2>/dev/null; \
		echo "  ✓ Memory skill dependencies installed"; \
	fi
	@echo ""
	@echo "✅ Development setup complete!"
	@echo "   Symlinked skills will reflect source changes immediately"
	@echo ""
	@echo "Default skills: $(DEV_SKILLS)"
	@echo "Override with: make dev-setup SKILLS=\"skill1 skill2\""

# Remove development symlinks and restore backups
# Usage:
#   make dev-clean SKILLS="memory process"  # Clean specific skills
#   make dev-clean                          # Clean all symlinked skills
dev-clean:
	@echo "Cleaning development symlinks..."
	@if [ -n "$(SKILLS)" ]; then \
		for skill_name in $(SKILLS); do \
			if [ -L ~/.claude/skills/"$$skill_name" ]; then \
				rm ~/.claude/skills/"$$skill_name"; \
				echo "  ✓ Removed $$skill_name symlink"; \
				if [ -d ~/.claude/skills/"$$skill_name.backup" ]; then \
					mv ~/.claude/skills/"$$skill_name.backup" ~/.claude/skills/"$$skill_name"; \
					echo "    Restored from backup"; \
				fi; \
			fi; \
		done; \
	else \
		for skill in src/skills/*/; do \
			skill_name=$$(basename "$$skill"); \
			if [ -L ~/.claude/skills/"$$skill_name" ]; then \
				rm ~/.claude/skills/"$$skill_name"; \
				echo "  ✓ Removed $$skill_name symlink"; \
				if [ -d ~/.claude/skills/"$$skill_name.backup" ]; then \
					mv ~/.claude/skills/"$$skill_name.backup" ~/.claude/skills/"$$skill_name"; \
					echo "    Restored from backup"; \
				fi; \
			fi; \
		done; \
	fi
	@echo ""
	@echo "✅ Development cleanup complete!"
	@echo "   Run 'make install' to restore normal installation"
