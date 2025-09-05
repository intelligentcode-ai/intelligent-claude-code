# Intelligent Claude Code - Ansible Installation System
# Single target with parameters for local/remote installation

# Use bash for all commands
SHELL := /bin/bash
.SHELLFLAGS := -c

.PHONY: install uninstall test help clean

# Default shows help
help:
	@echo "Intelligent Claude Code - Installation"
	@echo ""
	@echo "Usage:"
	@echo "  make install   [HOST=ip] [USER=user] [TARGET_PATH=/path] [MCP_CONFIG=/path/to/mcps.json] [ENV_FILE=/path/to/.env] [KEY=~/.ssh/id_rsa | PASS=password]"
	@echo "  make uninstall [HOST=ip] [USER=user] [TARGET_PATH=/path] [KEY=~/.ssh/id_rsa | PASS=password] [FORCE=true]"
	@echo "  make test                        # Run installation tests"
	@echo ""
	@echo "Parameters:"
	@echo "  HOST - Remote host IP (omit for local installation)"
	@echo "  USER - Remote username (required for remote installation)"
	@echo "  TARGET_PATH - Target path (omit for user scope ~/.claude/)"  
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
	@echo "  make test                        # Test installation"

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
	elif [ -x "$$HOME/Library/Python/3.*/bin/ansible-playbook" ]; then \
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
		$(ANSIBLE_PLAYBOOK) -v ansible/install.yml \
			-i localhost, \
			-c local \
			-e "ansible_shell_type=sh" \
			-e "target_path=$(TARGET_PATH)" \
			-e "mcp_config_file=$(MCP_CONFIG)" \
			-e "env_file=$(ENV_FILE)"; \
	else \
		if [ -z "$(USER)" ]; then \
			echo "ERROR: USER parameter required for remote installation!"; \
			echo "Usage: make install HOST=ip USER=username [PASS=pwd|KEY=keyfile]"; \
			exit 1; \
		fi; \
		echo "Installing on remote host $(HOST) as user $(USER)..."; \
		if [ -n "$(PASS)" ]; then \
			echo "Using password authentication..."; \
			$(ANSIBLE_PLAYBOOK) -v ansible/install.yml \
				-i "$(USER)@$(HOST)," \
				-k -e "ansible_ssh_pass=$(PASS)" \
				-e "target_path=$(TARGET_PATH)" \
				-e "mcp_config_file=$(MCP_CONFIG)" \
				-e "env_file=$(ENV_FILE)"; \
		else \
			echo "Using SSH key authentication..."; \
			$(ANSIBLE_PLAYBOOK) -v ansible/install.yml \
				-i "$(USER)@$(HOST)," \
				-e "ansible_ssh_private_key_file=$(KEY)" \
				-e "target_path=$(TARGET_PATH)" \
				-e "mcp_config_file=$(MCP_CONFIG)" \
				-e "env_file=$(ENV_FILE)"; \
		fi \
	fi

# Test installation and uninstall locally
test:
	@echo "Testing Ansible syntax validation..."
	@$(ANSIBLE_PLAYBOOK) --syntax-check ansible/install.yml
	@$(ANSIBLE_PLAYBOOK) --syntax-check ansible/uninstall.yml
	@echo "✅ Ansible syntax validation passed!"
	@echo ""
	@echo "Testing installation..."
	@rm -rf test-install
	@mkdir -p test-install
	@$(MAKE) install TARGET_PATH=test-install
	@echo ""
	@echo "Verifying installation..."
	@test -f test-install/CLAUDE.md || (echo "FAIL: CLAUDE.md not created"; exit 1)
	@test -f test-install/.claude/modes/virtual-team.md || (echo "FAIL: virtual-team.md not installed"; exit 1)
	@test -f test-install/.claude/agents/architect.md || (echo "FAIL: agent definitions not installed"; exit 1)
	@test -f test-install/.claude/agents/developer.md || (echo "FAIL: developer agent not installed"; exit 1)
	@test -f test-install/.claude/agents/ai-engineer.md || (echo "FAIL: ai-engineer agent not installed"; exit 1)
	@test -f test-install/.claude/prb-templates/medium-prb-template.yaml || (echo "FAIL: prb-templates not installed"; exit 1)
	@grep -q "@~/.claude/modes/virtual-team.md" test-install/CLAUDE.md || (echo "FAIL: Import not added"; exit 1)
	@echo "✅ Installation tests passed!"
	@echo ""
	@echo "Testing idempotency..."
	@$(MAKE) install TARGET_PATH=test-install
	@echo "✅ Idempotency test passed!"
	@echo ""
	@echo "Testing conservative uninstall..."
	@$(MAKE) uninstall TARGET_PATH=test-install
	@test ! -f test-install/.claude/modes/virtual-team.md || (echo "FAIL: modes not removed"; exit 1)
	@test ! -f test-install/.claude/behaviors || (echo "FAIL: behaviors not removed"; exit 1)
	@test ! -f test-install/.claude/agents || (echo "FAIL: agents not removed"; exit 1)
	@echo "✅ Conservative uninstall test passed!"
	@echo ""
	@echo "Testing force uninstall..."
	@$(MAKE) install TARGET_PATH=test-install
	@$(MAKE) uninstall TARGET_PATH=test-install FORCE=true
	@test ! -d test-install/.claude || (echo "FAIL: .claude directory not removed"; exit 1)
	@echo "✅ Force uninstall test passed!"
	@echo ""
	@echo "Testing install after uninstall..."
	@$(MAKE) install TARGET_PATH=test-install
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
		$(ANSIBLE_PLAYBOOK) -v ansible/uninstall.yml \
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
			$(ANSIBLE_PLAYBOOK) -v ansible/uninstall.yml \
				-i "$(USER)@$(HOST)," \
				-k -e "ansible_ssh_pass=$(PASS)" \
				-e "target_path=$(TARGET_PATH)" \
				-e "force_remove=$(FORCE)"; \
		else \
			echo "Using SSH key authentication..."; \
			$(ANSIBLE_PLAYBOOK) -v ansible/uninstall.yml \
				-i "$(USER)@$(HOST)," \
				-e "ansible_ssh_private_key_file=$(KEY)" \
				-e "target_path=$(TARGET_PATH)" \
				-e "force_remove=$(FORCE)"; \
		fi \
	fi

# Clean test installations and temporary files
clean:
	@rm -rf test-*
	@rm -rf ~/.ansible/tmp/ansible-local-* 2>/dev/null || true
	@rm -rf ~/.ansible/tmp/ansible-tmp-* 2>/dev/null || true
	@echo "✓ Test directories removed"
	@echo "✓ Ansible temp files cleaned"