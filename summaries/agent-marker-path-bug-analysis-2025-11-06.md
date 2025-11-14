# Agent Marker Path Inconsistency Bug Analysis

**Date**: 2025-11-06
**Category**: Critical Bug Discovery
**Status**: Root cause identified, fix planned in STORY-006

## Problem

Agents blocked by main-scope-enforcement even with marker files existing.

## Root Cause

`getProjectRoot()` returns non-normalized paths → different MD5 hashes → marker created with one hash, looked up with another → not found → agent blocked.

**Example:**
- Create marker: `getProjectRoot()` returns `/path/to/project/` → hash `abc123`
- Lookup marker: `getProjectRoot()` returns `/path/to/project` → hash `xyz789` → NOT FOUND

## Solution

Add `path.resolve()` normalization to `getProjectRoot()` in hook-helpers.js.

## Fix Details

See STORY-006 for complete implementation with tests (15 points, 5 AgentTasks).
