#!/bin/bash
# Simple test runner using Node.js built-in test runner
set -e

echo "🧪 Running intelligent-claude-code hook tests..."

# Run unit tests
echo "📦 Unit tests..."
if [ -d "tests/hooks/unit" ] && [ "$(ls -A tests/hooks/unit/*.js 2>/dev/null)" ]; then
  node tests/hooks/unit/*.js
else
  echo "No unit tests found yet"
fi

# Run integration tests (once they exist)
if [ -d "tests/hooks/integration" ] && [ "$(ls -A tests/hooks/integration/*.js 2>/dev/null)" ]; then
  echo "🔗 Integration tests..."
  node tests/hooks/integration/*.js
else
  echo "No integration tests found yet"
fi

# Run regression tests (once they exist)
if [ -d "tests/hooks/regression" ] && [ "$(ls -A tests/hooks/regression/*.js 2>/dev/null)" ]; then
  echo "🐛 Regression tests..."
  node tests/hooks/regression/*.js
else
  echo "No regression tests found yet"
fi

echo "✅ All tests passed!"
