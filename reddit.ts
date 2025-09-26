#!/usr/bin/env tsx

/**
 * Reddit Command - AI-Driven Operations
 * Uses generic social executor with Reddit-specific slash commands
 *
 * Examples:
 *   npx tsx reddit.ts "post insights about React in r/webdev"
 *   npx tsx reddit.ts "find JavaScript discussions to join with helpful comments" --dry-run
 *   npx tsx reddit.ts "analyze popular programming posts for content ideas" --verbose
 */

import { SocialSDKExecutor, type SocialOptions } from './src/social-sdk-executor.js';

/**
 * ★ Insight ─────────────────────────────────────
 * Reddit-specific wrapper uses generic social executor
 * Community engagement strategies defined in slash command file
 * Subreddit culture awareness through specialized prompts
 * ─────────────────────────────────────────────────
 */
async function main() {
  const args = process.argv.slice(2);

  // Parse command line options
  const options: SocialOptions = {
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
    // Execute with the generic social executor using Reddit platform
    await SocialSDKExecutor.execute('reddit', prompt, options);
    console.log('\n🎉 Reddit operation completed!');
  } catch (error) {
    console.error(`\n❌ Operation failed: ${(error as Error).message}`);
    process.exit(1);
  }
}

/**
 * Display help information for Reddit operations
 */
function showHelp(): void {
  console.log(`
🏘️  Reddit Command - AI-Driven Community Operations
===================================================

DESCRIPTION:
  AI-powered Reddit automation that understands community culture and guidelines.
  The AI will analyze your intent and execute appropriate Reddit operations
  including community engagement, content posting, subreddit analysis, and more.

USAGE:
  npx tsx reddit.ts "<natural language request>" [options]

EXAMPLES:

  Content Creation & Posting:
    npx tsx reddit.ts "post insights about React best practices in r/webdev"
    npx tsx reddit.ts "share my TypeScript learning journey in r/typescript"
    npx tsx reddit.ts "create an informative post about cloud architecture for r/devops"

  Community Engagement:
    npx tsx reddit.ts "find JavaScript discussions and join with helpful comments"
    npx tsx reddit.ts "engage with beginners asking Python questions in r/learnpython"
    npx tsx reddit.ts "participate authentically in r/programming discussions"

  Research & Analysis:
    npx tsx reddit.ts "analyze popular programming posts for content ideas"
    npx tsx reddit.ts "research what topics are trending in r/MachineLearning"
    npx tsx reddit.ts "find influential developers to connect with on Reddit"

  Strategic Operations:
    npx tsx reddit.ts "build community reputation through valuable contributions"
    npx tsx reddit.ts "monitor mentions of our open source project"
    npx tsx reddit.ts "find relevant subreddits for our developer tools"

OPTIONS:
  --dry-run, --preview    Preview actions without executing them
  --verbose, -v           Show detailed execution logs and debugging info
  --help, -h              Show this help message

REDDIT-SPECIFIC FEATURES:
  🏘️  Subreddit Culture Awareness - Adapts to each community's unique norms
  📜 Community Guidelines - Respects rules and moderation policies
  💬 Authentic Engagement - Builds genuine community relationships
  ⚡ Optimal Timing - Posts and engages when communities are most active
  🎯 Content Optimization - Formats content for maximum community value
  📊 Karma Strategy - Builds reputation through valuable contributions

SETUP:
  1. Create .env.local with your RUBE_API_TOKEN or COMPOSIO_API_KEY
  2. Ensure .mcp.json is configured (already done in this project)
  3. Verify .claude/commands/reddit.md exists
  4. Run your first command!

The AI will understand your intent and execute Reddit-appropriate operations
using community-specific best practices and authentic engagement strategies.
`);
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default main;