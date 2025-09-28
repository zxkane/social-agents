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
import { logger } from './src/logger.js';

/**
 * ★ Insight ─────────────────────────────────────
 * Reddit-specific wrapper uses generic social executor
 * Community engagement strategies defined in slash command file
 * Subreddit culture awareness through specialized prompts
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
    logger.error('Error: No prompt provided');
    logger.newline();
    showHelp();
    process.exit(1);
  }

  try {
    // Execute with the generic social executor using Reddit platform
    await SocialSDKExecutor.execute('reddit', prompt, options);
    logger.newline();
    logger.success('Reddit operation completed!', '🎉');
  } catch (error) {
    logger.newline();
    logger.error(`Operation failed: ${(error as Error).message}`);
    process.exit(1);
  }
}

/**
 * Display help information for Reddit operations
 */
function showHelp(): void {
  logger.helpSection('🏘️  Reddit Command - AI-Driven Community Operations', '');
  logger.separator('=', 55);

  logger.helpSection('DESCRIPTION', `
  AI-powered Reddit automation that understands community culture and guidelines.
  The AI will analyze your intent and execute appropriate Reddit operations
  including community engagement, content posting, subreddit analysis, and more.`);

  logger.helpSection('USAGE', `
  npx tsx reddit.ts "<natural language request>" [options]`);

  logger.helpSection('EXAMPLES', '');
  logger.info('  Content Creation & Posting:', '');
  logger.helpCommand('    npx tsx reddit.ts "post React insights in r/webdev"', '');
  logger.helpCommand('    npx tsx reddit.ts "share TypeScript journey in r/typescript"', '');
  logger.helpCommand('    npx tsx reddit.ts "create cloud architecture post for r/devops"', '');

  logger.info('  Community Engagement:', '');
  logger.helpCommand('    npx tsx reddit.ts "find JS discussions and join with comments"', '');
  logger.helpCommand('    npx tsx reddit.ts "engage with Python beginners in r/learnpython"', '');
  logger.helpCommand('    npx tsx reddit.ts "participate in r/programming discussions"', '');

  logger.info('  Research & Analysis:', '');
  logger.helpCommand('    npx tsx reddit.ts "analyze popular programming posts for ideas"', '');
  logger.helpCommand('    npx tsx reddit.ts "research trending topics in r/MachineLearning"', '');
  logger.helpCommand('    npx tsx reddit.ts "find influential developers to connect with"', '');

  logger.helpSection('OPTIONS', '');
  logger.helpCommand('  --resume <session-id>', 'Resume a previous session');
  logger.helpCommand('  --dry-run, --preview', 'Preview actions without executing them');
  logger.helpCommand('  --verbose, -v', 'Show detailed execution logs and debugging info');
  logger.helpCommand('  --help, -h', 'Show this help message');

  logger.helpSection('REDDIT-SPECIFIC FEATURES', '');
  console.log('  🏘️  Subreddit Culture Awareness - Adapts to each community\'s unique norms');
  console.log('  📜 Community Guidelines - Respects rules and moderation policies');
  console.log('  💬 Authentic Engagement - Builds genuine community relationships');
  console.log('  ⚡ Optimal Timing - Posts and engages when communities are most active');
  console.log('  🎯 Content Optimization - Formats content for maximum community value');
  console.log('  📊 Karma Strategy - Builds reputation through valuable contributions');

  logger.helpSection('SETUP', '');
  console.log('  1. Create .env.local with your RUBE_API_TOKEN or COMPOSIO_API_KEY');
  console.log('  2. Ensure .mcp.json is configured (already done in this project)');
  console.log('  3. Verify .claude/commands/reddit.md exists');
  console.log('  4. Run your first command!');

  logger.newline();
  console.log('The AI will understand your intent and execute Reddit-appropriate operations');
  console.log('using community-specific best practices and authentic engagement strategies.');
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    logger.error(`Unhandled error: ${error.message}`);
    process.exit(1);
  });
}

export default main;