#!/usr/bin/env node

function normalizeBaseName(baseName) {
  if (!baseName || typeof baseName !== 'string') return '';
  return baseName;
}

function isUppercaseSegment(segment) {
  if (!segment) return false;
  const letters = segment.replace(/[^A-Za-z]/g, '');
  if (!letters || letters.length < 2) return false;
  return /^[A-Z]+$/.test(letters);
}

function isAggressiveAllCaps(baseName) {
  const normalized = normalizeBaseName(baseName);
  if (!normalized) return false;

  const strictAllCaps = normalized === normalized.toUpperCase() &&
    normalized.length > 1 &&
    /^[A-Z0-9_-]+$/.test(normalized);

  if (strictAllCaps) {
    return true;
  }

  const segments = normalized.split(/[-_]+/).filter(Boolean);
  const uppercaseSegments = segments.filter(isUppercaseSegment);
  return uppercaseSegments.length >= 2;
}

module.exports = {
  isAggressiveAllCaps
};
