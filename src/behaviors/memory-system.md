<?xml version="1.0" encoding="UTF-8"?>
<behavior id="MEMORY-SYSTEM" version="1.0">
  <metadata>
    <name>Memory System</name>
    <purpose>File-based memory with automatic search and pattern capture</purpose>
    <enforcement>mandatory</enforcement>
    <applies_to>All</applies_to>
  </metadata>

  <imports>
    <import>@./config-system.md</import>
  </imports>

  <!-- STORAGE STRUCTURE -->
  <storage>
    <pattern>memory/[topic]/[subtopic].md with dated entries (newest first)</pattern>
    <format>Markdown with YAML frontmatter in version-controlled memory/</format>
    <entry>Date header, context, problem, solution, code examples</entry>
    <topics>implementation, debugging, configuration, optimization, process, authentication, performance</topics>
  </storage>

  <!-- CORE OPERATIONS -->
  <operations>
    <store_in_memory>
      <step>Security validation (no credentials/tokens/keys)</step>
      <step>Path resolution (memory/[topic]/[subtopic].md)</step>
      <step>Topic storage with dated entry</step>
      <step>Auto-pruning of obsolete patterns</step>
    </store_in_memory>

    <search_memory>
      <step>Query analysis (extract intent and keywords)</step>
      <step>Pattern scoring (relevance, recency, frequency)</step>
      <step>Top 2-3 selection (max 1000 tokens)</step>
      <step>Return for AgentTask embedding</step>
    </search_memory>

    <load_from_memory>
      <step>Path resolution</step>
      <step>Entry parsing</step>
      <step>Access tracking</step>
    </load_from_memory>
  </operations>

  <!-- MEMORY-FIRST APPROACH -->
  <memory_first_pattern>
    <principle>Check memory BEFORE asking users for any information that could be previously learned</principle>

    <query_recognition>
      <location_queries>where is X, how do I access Y, what's the path to Z</location_queries>
      <configuration_questions>how to configure X, what settings for Y</configuration_questions>
      <process_questions>how do I X, what's the procedure for Y</process_questions>
      <credential_access>need token, authentication required, login details</credential_access>
    </query_recognition>

    <query_sequence mandatory="true">
      <step>Parse Query Intent: Extract information requested</step>
      <step>Search Memory: Query relevant memory topics for matching patterns</step>
      <step>Evaluate Results: Check if memory contains sufficient information</step>
      <step>Use or Query: Apply memory results OR ask user if insufficient</step>
    </query_sequence>
  </memory_first_pattern>

  <!-- SEARCH REQUIREMENTS -->
  <search_requirements id="MEMORY-SEARCH-MANDATORY">
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
  </search_requirements>

  <!-- STORAGE REQUIREMENTS -->
  <storage_requirements id="MEMORY-STORAGE-RULES">
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

    <security_aware_storage>
      <safe_patterns>
        <store>Configuration paths: ~/.config/git/common.conf</store>
        <store>Environment variables: $GITHUB_PAT, $AWS_PROFILE</store>
        <store>Access methods: source ~/.bashrc &amp;&amp; echo $TOKEN</store>
        <store>File locations: /path/to/credentials/file</store>
      </safe_patterns>

      <never_store>
        <sensitive>Tokens: ghp_xxxxxxxxxxxx</sensitive>
        <sensitive>Passwords: mypassword123</sensitive>
        <sensitive>API Keys: ak_xxxxxxxxxxxxxxxx</sensitive>
        <sensitive>Private Keys: -----BEGIN RSA PRIVATE KEY-----</sensitive>
      </never_store>

      <validation_checklist>
        <check>Contains no actual passwords, tokens, or keys</check>
        <check>References locations or methods, not values</check>
        <check>Describes access patterns, not access credentials</check>
        <check>Helps users find their own credentials safely</check>
      </validation_checklist>
    </security_aware_storage>
  </storage_requirements>

  <!-- AUTOMATIC ANALYSIS -->
  <automatic_analysis id="MEMORY-AUTO-ANALYSIS">
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
  </automatic_analysis>

  <!-- LEARNING PATTERNS -->
  <learning_patterns>
    <logic>
      <capture>Pattern stored from successful AgentTask execution</capture>
      <application>Memory patterns applied in AgentTask context</application>
      <reference>Existing patterns referenced during AgentTask generation</reference>
    </logic>

    <detection>
      <pattern>Based on previous learning → Process improvement</pattern>
      <pattern>Applying lesson from → Knowledge transfer</pattern>
      <pattern>To prevent repeat of → Issue prevention</pattern>
      <pattern>Learning from [Learning-ID] → Specific pattern reference</pattern>
    </detection>

    <embedding>
      <process>Embed learnings in AgentTask → Execute with context → Store new patterns post-execution</process>
      <rule>No runtime memory lookups - all context pre-embedded in AgentTask</rule>
    </embedding>

    <recovery>
      <auto>Test failures, lint errors, import errors, type errors</auto>
      <manual>Create fix task, log for review, continue with other work, escalate if critical</manual>
    </recovery>
  </learning_patterns>

  <!-- AGENTTASK INTEGRATION -->
  <agenttask_integration>
    <generation>Search memory before template loading → Embed patterns in context → No runtime lookups</generation>
    <storage>Step 9 of execution stores patterns/solutions in version-controlled memory/</storage>
    <embedding>Learnings pre-embedded in AgentTask → Work executed with context → New learnings stored post-execution</embedding>
  </agenttask_integration>

  <!-- MEMORY UTILIZATION -->
  <utilization>
    <application>
      <immediate>Exact match, high relevance (&gt;70%), context match, problem pattern match</immediate>
      <suggest>Medium relevance, analogous processes, related contexts</suggest>
      <reference>Tangential information, different contexts, background information</reference>
    </application>

    <selection priority="descending">Project-Specific → Recent → Frequent → Detailed → Successful</selection>
  </utilization>

  <!-- PROACTIVE GENERATION -->
  <proactive_generation>
    <triggers>Discovery events, configuration changes, problem resolution, pattern recognition, user corrections</triggers>
    <store_when>Requested 2+ times, multi-step reusable solution, broad applicability, issue prevention, workflow standardization</store_when>
    <skip>Trivial info, one-time solution, sensitive values, already documented, temporary state</skip>
  </proactive_generation>
</behavior>
