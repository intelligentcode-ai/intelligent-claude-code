#!/bin/bash

# Intelligent Claude Code Installer
# TRUE graceful integration - preserves existing content
# Uses native config.md instead of .env files

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Intelligent Claude Code Installer${NC}"
echo "=================================="
echo "✓ Native markdown configuration (no .env files)"
echo "✓ True graceful integration (preserves existing content)"
echo "✓ Single import line for activation/removal"
echo ""

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Check if src directory exists in script location
if [ ! -d "$SCRIPT_DIR/src" ]; then
    echo -e "${RED}Error: src directory not found in $SCRIPT_DIR${NC}"
    echo "Please run this script from the intelligent-claude-code directory."
    exit 1
fi

# Function to display menu
show_menu() {
    echo "Installation Scope:"
    echo "1) Current Project (graceful integration)"
    echo "2) Specific Project (graceful integration)"
    echo "3) User Scope (~/.claude/)"
    echo ""
    echo -n "Select installation scope (1-3): "
}

# Function to select mode (only for user scope)
select_mode() {
    echo "Select Claude Mode:"
    echo "1) Minimal (token-optimized, ~600 tokens)"
    echo "2) Standard (balanced features, ~2000 tokens)"
    echo "3) Enhanced (full automation, ~5000 tokens)"
    echo "4) Meta (meta-persona orchestration, ~6200 tokens)"
    echo ""
    echo -n "Select mode (1-4, default=2): "
    read -r mode_choice
    
    case $mode_choice in
        1) echo "minimal" ;;
        3) echo "enhanced" ;;
        4) echo "meta" ;;
        *) echo "standard" ;;
    esac
}

# Function for graceful integration into project CLAUDE.md
graceful_project_integration() {
    local target_dir=$1
    local claude_file="$target_dir/CLAUDE.md"
    local import_line="@~/.claude/intelligent-claude-code.md"
    
    echo "Implementing graceful integration in: $target_dir"
    
    # Check if CLAUDE.md exists
    if [ -f "$claude_file" ]; then
        # Check if already integrated
        if grep -q "$import_line" "$claude_file"; then
            echo -e "${YELLOW}Already integrated! Import line found in CLAUDE.md${NC}"
            echo "To update, use user scope installation (option 3)"
            return 0
        else
            # Create backup
            cp "$claude_file" "$claude_file.backup"
            echo -e "${GREEN}✓ Created backup: CLAUDE.md.backup${NC}"
            
            # Add import line at top, preserve existing content
            {
                echo "# Intelligent Claude Code Integration"
                echo "$import_line"
                echo ""
                echo "<!-- Existing project configuration preserved below -->"
                echo ""
                cat "$claude_file"
            } > "$claude_file.tmp"
            
            mv "$claude_file.tmp" "$claude_file"
            echo -e "${GREEN}✓ Gracefully integrated with existing CLAUDE.md${NC}"
            echo -e "${GREEN}✓ All existing content preserved${NC}"
        fi
    else
        # Create new CLAUDE.md with import
        {
            echo "# Intelligent Claude Code"
            echo "$import_line"
            echo ""
            echo "<!-- Add your project-specific instructions below -->"
            echo ""
        } > "$claude_file"
        echo -e "${GREEN}✓ Created new CLAUDE.md with integration${NC}"
    fi
    
    echo ""
    echo -e "${GREEN}Integration complete!${NC}"
    echo "• To configure modes: edit ~/.claude/config.md"
    echo "• To remove: delete the import line in CLAUDE.md"
    echo "• Backup available: CLAUDE.md.backup"
}

# Function to install to user scope
install_user_scope() {
    local target_dir="$HOME/.claude"
    
    echo "Installing to user scope: $target_dir"
    
    # Create ~/.claude directory
    mkdir -p "$target_dir"
    mkdir -p "$target_dir/modes"
    mkdir -p "$target_dir/personas"
    mkdir -p "$target_dir/behaviors"
    
    # Copy all source files
    echo -e "${GREEN}✓ Created directory structure${NC}"
    
    # Copy main files
    cp "$SCRIPT_DIR/src/CLAUDE.md" "$target_dir/"
    cp "$SCRIPT_DIR/src/intelligent-claude-code.md" "$target_dir/"
    echo -e "${GREEN}✓ Installed core system files${NC}"
    
    # Copy mode files
    cp "$SCRIPT_DIR/src/modes/"*.md "$target_dir/modes/"
    echo -e "${GREEN}✓ Installed mode configurations${NC}"
    
    # Copy personas and behaviors
    cp "$SCRIPT_DIR/src/personas/"*.md "$target_dir/personas/"
    cp "$SCRIPT_DIR/src/behaviors/"*.md "$target_dir/behaviors/"
    echo -e "${GREEN}✓ Installed personas and behaviors${NC}"
    
    # Get mode selection
    echo ""
    local mode=$(select_mode)
    
    # Create config.md with selected mode
    cat > "$target_dir/config.md" << EOF
# Intelligent Claude Code Configuration

## Active Mode
$mode

## Mode Configuration
@~/.claude/modes/$mode.md

## Project-Specific Configuration
<!-- Add project-specific instructions here -->

---
*Native markdown configuration - no .env files needed*
EOF
    
    echo -e "${GREEN}✓ Created config.md with mode: $mode${NC}"
    echo ""
    echo -e "${GREEN}User scope installation complete!${NC}"
    echo "• Configuration: ~/.claude/config.md"
    echo "• To change modes: edit ~/.claude/config.md"
    echo "• To use in projects: add import line to project CLAUDE.md"
}

# Check if user scope is already installed
check_user_installation() {
    if [ -f "$HOME/.claude/intelligent-claude-code.md" ]; then
        return 0  # Already installed
    else
        return 1  # Not installed
    fi
}

# Main installation flow
show_menu
read -r choice

case $choice in
    1)
        # Current project graceful integration
        target_dir=$(pwd)
        
        # Check if user scope is installed
        if ! check_user_installation; then
            echo -e "${YELLOW}User scope not installed. Installing to ~/.claude/ first...${NC}"
            echo ""
            install_user_scope
            echo ""
        fi
        
        graceful_project_integration "$target_dir"
        ;;
        
    2)
        # Specific project graceful integration
        echo -n "Enter project path: "
        read -r project_path
        
        # Expand tilde and resolve path
        project_path="${project_path/#\~/$HOME}"
        project_path=$(realpath "$project_path" 2>/dev/null || echo "$project_path")
        
        # Verify directory exists
        if [ ! -d "$project_path" ]; then
            echo -e "${RED}Error: Directory does not exist: $project_path${NC}"
            exit 1
        fi
        
        # Check if user scope is installed
        if ! check_user_installation; then
            echo -e "${YELLOW}User scope not installed. Installing to ~/.claude/ first...${NC}"
            echo ""
            install_user_scope
            echo ""
        fi
        
        graceful_project_integration "$project_path"
        ;;
        
    3)
        # User scope installation
        if check_user_installation; then
            echo -e "${YELLOW}User scope already installed.${NC}"
            echo -n "Reinstall/update? (y/n): "
            read -r reinstall
            if [ "$reinstall" != "y" ]; then
                echo "Installation cancelled."
                exit 0
            fi
        fi
        
        install_user_scope
        ;;
        
    *)
        echo -e "${RED}Invalid selection. Please run the installer again.${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}🎉 Installation successful!${NC}"
echo ""
echo "Next steps:"
echo "• Review configuration: ~/.claude/config.md"
echo "• Graceful removal: delete import lines from CLAUDE.md files"
echo "• Documentation: https://github.com/your-repo/intelligent-claude-code"