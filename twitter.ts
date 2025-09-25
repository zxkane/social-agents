#!/usr/bin/env tsx

/**
 * Unified Twitter Command - AI-Driven Operations
 * Simplified architecture with direct MCP integration and system prompts
 *
 * Examples:
 *   npx tsx twitter.ts "generate a viral thread about TypeScript best practices"
 *   npx tsx twitter.ts "find and engage with AI discussions" --dry-run
 *   npx tsx twitter.ts "analyze trending topics and create relevant content" --verbose
 */

import { TwitterSDKExecutor, type TwitterOptions } from './src/twitter-sdk-executor.js';

/**
 * ★ Insight ─────────────────────────────────────
 * Simplified command interface removes artificial type detection
 * Natural language processing lets the AI understand user intent
 * No predetermined workflows - model-driven execution
 * ─────────────────────────────────────────────────
 */
async function main() {
  const args = process.argv.slice(2);

  // Parse command line options
  const options: TwitterOptions = {
    dryRun: args.includes('--dry-run') || args.includes('--preview'),
    verbose: args.includes('--verbose') || args.includes('-v')
  };

  // Show help if requested or no arguments provided
  if (args.includes('--help') || args.includes('-h') || args.length === 0) {
    showHelp();
    process.exit(0);
  }

  // Extract the prompt (all non-flag arguments)
  const prompt = args
    .filter(arg => !arg.startsWith('--') && arg !== '-v' && arg !== '-h')
    .join(' ');

  if (!prompt.trim()) {
    console.error('❌ Error: No prompt provided\n');
    showHelp();
    process.exit(1);
  }

  try {
    // Execute with the new simplified architecture
    await TwitterSDKExecutor.execute(prompt, options);
    console.log('\n🎉 Twitter operation completed!');
  } catch (error) {
    console.error(`\n❌ Operation failed: ${(error as Error).message}`);
    process.exit(1);
  }
}

/**
 * Display help information
 */
function showHelp(): void {
  console.log(`
🐦 Twitter Command - AI-Driven Operations
==========================================

DESCRIPTION:
  AI-powered Twitter automation that understands natural language requests.
  The AI will analyze your intent and execute appropriate Twitter operations
  including content generation, engagement, trend analysis, and more.

USAGE:
  npx tsx twitter.ts "<natural language request>" [options]

EXAMPLES:

  Content Generation:
    npx tsx twitter.ts "write a viral thread about TypeScript best practices"
    npx tsx twitter.ts "generate tweets about our new product launch"
    npx tsx twitter.ts "create engaging content about serverless architecture"

  Engagement Operations:
    npx tsx twitter.ts "find and engage with AI discussions"
    npx tsx twitter.ts "search for AWS posts and like the helpful ones"
    npx tsx twitter.ts "monitor mentions of our brand and respond appropriately"

  Analysis & Strategy:
    npx tsx twitter.ts "analyze trending topics in tech and create relevant content"
    npx tsx twitter.ts "research what's popular in the React community"
    npx tsx twitter.ts "find influential developers to connect with"

  Mixed Operations:
    npx tsx twitter.ts "look for TypeScript discussions and join with valuable insights"
    npx tsx twitter.ts "create content based on what's trending in AI development"

OPTIONS:
  --dry-run, --preview    Preview actions without executing them
  --verbose, -v           Show detailed execution logs and debugging info
  --help, -h              Show this help message

FEATURES:
  ✨ Natural Language Understanding - No need to specify operation types
  🤖 AI-Driven Workflows - The AI determines the best approach
  🔄 Flexible Operations - Generation, engagement, analysis, and more
  📊 Smart Analytics - Performance tracking and insights
  🛡️  Safe Execution - Built-in rate limiting and account protection
  🎯 Viral Optimization - Strategic content creation for maximum reach

SETUP:
  1. Create .env.local with your RUBE_API_TOKEN
  2. Ensure .mcp.json is configured (already done in this project)
  3. Run your first command!

The AI will understand your intent and execute the appropriate Twitter
operations without requiring you to specify whether you want generation,
engagement, or other types of operations.
`);
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default main;