# Memory Enforcement Patterns

**MANDATORY**: Memory-first approach for all agents. Auto-correct violations.

## Imports
@./shared-patterns/memory-operations.md

## Core Principle

All work begins with memory search. All successful patterns are captured. Memory is the foundation of continuous learning.

## Memory Search Requirements

<memory_search_requirements id="MEMORY-SEARCH-MANDATORY">
  <main_agent mandatory="true">
    <rule>Search memory BEFORE creating ANY AgentTask</rule>
    <topics>
      <topic>implementation - Previous implementation patterns</topic>
      <topic>debugging - Similar problem resolutions</topic>
      <topic>configuration - Setup and configuration patterns</topic>
      <topic>[work_domain] - Domain-specific patterns</topic>
      <topic>[technology] - Technology-specific solutions</topic>
    </topics>
    <evidence>
      <requirement>Grep tool usage documented in pre-AgentTask flow</requirement>
      <requirement>Search results referenced in AgentTask context</requirement>
      <requirement>Pattern application noted in agent assignment</requirement>
    </evidence>
    <validation>
      <check>Memory search completed before Task tool invocation</check>
      <check>Relevant patterns embedded in AgentTask context</check>
      <check>Search rationale documented in coordination thinking</check>
    </validation>
  </main_agent>

  <specialist_agents mandatory="true">
    <rule>Search memory BEFORE starting execution</rule>
    <topics>
      <topic>Patterns relevant to agent specialization</topic>
      <topic>Technology domain-specific solutions</topic>
      <topic>Common pitfalls and error resolutions</topic>
    </topics>
    <validation>
      <check>Memory search verified in execution checklist</check>
      <check>Discovered patterns applied to current work</check>
      <check>Search results influence implementation decisions</check>
    </validation>
  </specialist_agents>

  <user_query_handling mandatory="true">
    <rule>Search memory BEFORE asking users for information</rule>
    <check>Query intent → Memory search → Answer if found</check>
    <check>Only query user if memory insufficient</check>
    <examples>
      <good>User asks location → Search memory/configuration → Return stored path</good>
      <bad>User asks location → Immediately ask user without memory check</bad>
    </examples>
  </user_query_handling>

  <hook_integration>
    <mechanical_enforcement>pre-agenttask-validation.js enforces Grep usage before Task tool</mechanical_enforcement>
    <behavioral_guidance>This pattern guides WHAT to search and WHY it matters</behavioral_guidance>
    <limitation>Hook validates search occurred, not search quality or relevance</limitation>
  </hook_integration>
</memory_search_requirements>

## Memory Storage Requirements

<memory_storage_requirements id="MEMORY-STORAGE-RULES">
  <trigger_conditions>
    <success>Successful pattern discovered during execution</success>
    <failure>Error resolution providing reusable solution</failure>
    <discovery>Configuration/path/process found</discovery>
    <optimization>Performance improvement technique applied</optimization>
    <integration>Tool/service successfully integrated</integration>
  </trigger_conditions>

  <relevance_filters id="MEMORY-RELEVANCE">
    <store_when>
      <criterion>Information requested multiple times (frequency pattern)</criterion>
      <criterion>Solution involves multiple steps and is reusable</criterion>
      <criterion>Configuration/path discovery with broad applicability</criterion>
      <criterion>Issue resolution prevents future similar problems</criterion>
      <criterion>Process standardization improves workflow efficiency</criterion>
    </store_when>

    <do_not_store>
      <criterion>Trivial or obvious information</criterion>
      <criterion>One-time only solutions with no reuse value</criterion>
      <criterion>Sensitive values (credentials, tokens, keys)</criterion>
      <criterion>Information already well-documented in system</criterion>
      <criterion>Temporary state or session-specific data</criterion>
    </do_not_store>
  </relevance_filters>

  <storage_validation>
    <rule>NEVER store just to satisfy requirement - relevance mandatory</rule>
    <rule>Analyze work for lessons learned BEFORE storage decision</rule>
    <rule>Only store if clear future value demonstrated</rule>
    <rule>Security validation: no credentials, tokens, or sensitive data</rule>
  </storage_validation>
</memory_storage_requirements>

## Automatic Memory Analysis

<memory_auto_analysis id="MEMORY-AUTO-ANALYSIS">
  <execution_completion>
    <step>Analyze execution for reusable patterns</step>
    <step>Identify lessons learned from successes and failures</step>
    <step>Determine if pattern has broad applicability</step>
    <step>Apply relevance filters from MEMORY-RELEVANCE</step>
    <step>Store ONLY if relevant and valuable</step>
  </execution_completion>

  <best_practice_promotion>
    <trigger>Pattern applied successfully 3+ times</trigger>
    <trigger>Demonstrable quality improvement</trigger>
    <trigger>Clear reusability guidelines can be extracted</trigger>
    <action>Generate best-practice file in best-practices/[category]/</action>
  </best_practice_promotion>
</memory_auto_analysis>

---
*Memory enforcement patterns with mechanical hook validation and semantic behavioral guidance*
