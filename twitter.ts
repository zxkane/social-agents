#!/usr/bin/env tsx

/**
 * Twitter Command - AI-Driven Operations
 * Uses generic social executor with Twitter-specific slash commands
 *
 * Examples:
 *   npx tsx twitter.ts "generate a viral thread about TypeScript best practices"
 *   npx tsx twitter.ts "find and engage with AI discussions" --dry-run
 *   npx tsx twitter.ts "analyze trending topics and create relevant content" --verbose
 */

import { SocialSDKExecutor, type SocialOptions } from './src/social-sdk-executor.js';

/**
 * ★ Insight ─────────────────────────────────────
 * Twitter-specific wrapper uses generic social executor
 * Maintains backward compatibility while leveraging new architecture
 * Platform-specific behavior comes from slash command files
 * ─────────────────────────────────────────────────
 */
async function main() {
  const args = process.argv.slice(2);

  // Parse resume session ID
  const resumeIndex = args.indexOf('--resume');
  const resume = resumeIndex > -1 && args[resumeIndex + 1]
    ? args[resumeIndex + 1]
    : undefined;

  // Parse command line options
  const options: SocialOptions = {
    dryRun: args.includes('--dry-run') || args.includes('--preview'),
    verbose: args.includes('--verbose') || args.includes('-v'),
    resume: resume
  };

  // Show help if requested or no arguments provided
  if (args.includes('--help') || args.includes('-h') || (args.length === 0 && !resume)) {
    showHelp();
    process.exit(0);
  }

  // Extract the prompt (all non-flag arguments and exclude resume session ID)
  const prompt = args
    .filter((arg, index) => {
      // Exclude flags and their values
      if (arg.startsWith('--') || arg === '-v' || arg === '-h') return false;
      // Exclude resume session ID (argument after --resume)
      if (resumeIndex > -1 && index === resumeIndex + 1) return false;
      return true;
    })
    .join(' ');

  // For resume operations, prompt is optional (will continue previous conversation)
  if (!prompt.trim() && !resume) {
    console.error('❌ Error: No prompt provided\n');
    showHelp();
    process.exit(1);
  }

  try {
    // Execute with the generic social executor using Twitter platform
    await SocialSDKExecutor.execute('twitter', prompt, options);
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
  --resume <session-id>   Resume a previous session
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
  1. Create .env.local with your RUBE_API_TOKEN or COMPOSIO_API_KEY
  2. Ensure .mcp.json is configured (already done in this project)
  3. Verify .claude/commands/twitter.md exists
  4. Run your first command!

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