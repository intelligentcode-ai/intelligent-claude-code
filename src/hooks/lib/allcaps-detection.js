#!/usr/bin/env node

function normalizeBaseName(baseName) {
  if (!baseName || typeof baseName !== 'string') return '';
  return baseName;
}

function isUppercaseWord(segment) {
  if (!segment) return false;
  const letters = segment.replace(/[^A-Za-z]/g, '');
  if (letters.length < 2) return false;
  return letters === letters.toUpperCase();
}

function isAggressiveAllCaps(baseName) {
  const normalized = normalizeBaseName(baseName);
  if (!normalized) return false;

  const lettersOnly = normalized.replace(/[^A-Za-z]/g, '');
  if (lettersOnly.length >= 2 && lettersOnly === lettersOnly.toUpperCase()) {
    return true;
  }

  const segments = normalized.split(/[^A-Za-z0-9]+/).filter(Boolean);
  const uppercaseSegments = segments.filter(isUppercaseWord);
  return uppercaseSegments.length >= 2;
}

module.exports = {
  isAggressiveAllCaps
};
