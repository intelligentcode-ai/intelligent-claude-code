#!/bin/bash
# Simple test runner using Node.js built-in test runner
set -e

echo "🧪 Running intelligent-claude-code hook tests..."

# Run unit tests
echo "📦 Unit tests..."
if [ -d "tests/hooks/unit" ] && [ "$(ls -A tests/hooks/unit/*.js 2>/dev/null)" ]; then
  for test in tests/hooks/unit/*.js; do
    node "$test"
  done
else
  echo "No unit tests found yet"
fi

# Run integration tests (once they exist)
if [ -d "tests/hooks/integration" ] && [ "$(ls -A tests/hooks/integration/*.js 2>/dev/null)" ]; then
  echo "🔗 Integration tests..."
  for test in tests/hooks/integration/*.js; do
    node "$test"
  done
else
  echo "No integration tests found yet"
fi

# Run regression tests (once they exist)
if [ -d "tests/hooks/regression" ] && [ "$(ls -A tests/hooks/regression/*.js 2>/dev/null)" ]; then
  echo "🐛 Regression tests..."
  for test in tests/hooks/regression/*.js; do
    node "$test"
  done
else
  echo "No regression tests found yet"
fi

echo "✅ All tests passed!"
