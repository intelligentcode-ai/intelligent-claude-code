#\!/bin/bash
# Delete all obsolete remote branches that have been merged

branches=(
  "feature/BUG-001-project-scope-boundaries"
  "feature/PRB-001-optimize-behaviors"
  "feature/STORY-003-proactive-memory"
  "fix/BUG-004-task-tool-mandatory"
  "fix/BUG-005-naming-format-enforcement"
  "fix/BUG-006-ai-instruction-clarification"
  "fix/BUG-009-remove-time-estimations"
  "fix/BUG-010-changelog-process"
  "fix/BUG-012-memory-protection"
  "fix/BUG-013-two-factor-role-assignment"
  "fix/comprehensive-final"
  "fix/master-system-cleanup"
  "fix/PRB-012-enforce-templates"
)

for branch in "${branches[@]}"; do
  echo "Deleting: $branch"
  git push origin --delete "$branch" 2>/dev/null && echo "  ✓ Deleted" || echo "  ✗ Already deleted or error"
done

echo ""
echo "Cleaning up local references..."
git remote prune origin
