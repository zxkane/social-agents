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
import { logger } from './src/logger.js';

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
    logger.error('Error: No prompt provided');
    logger.newline();
    showHelp();
    process.exit(1);
  }

  try {
    // Execute with the generic social executor using Twitter platform
    await SocialSDKExecutor.execute('twitter', prompt, options);
    logger.newline();
    logger.success('Twitter operation completed!', '🎉');
  } catch (error) {
    logger.newline();
    logger.error(`Operation failed: ${(error as Error).message}`);
    process.exit(1);
  }
}

/**
 * Display help information
 */
function showHelp(): void {
  logger.helpSection('🐦 Twitter Command - AI-Driven Operations', '');
  logger.separator('=', 55);

  logger.helpSection('DESCRIPTION', `
  AI-powered Twitter automation that understands natural language requests.
  The AI will analyze your intent and execute appropriate Twitter operations
  including content generation, engagement, trend analysis, and more.`);

  logger.helpSection('USAGE', `
  npx tsx twitter.ts "<natural language request>" [options]`);

  logger.helpSection('EXAMPLES', '');
  logger.info('  Content Generation:', '');
  logger.helpCommand('    npx tsx twitter.ts "write a viral thread about TypeScript"', '');
  logger.helpCommand('    npx tsx twitter.ts "generate tweets about our product launch"', '');
  logger.helpCommand('    npx tsx twitter.ts "create content about serverless architecture"', '');

  logger.info('  Engagement Operations:', '');
  logger.helpCommand('    npx tsx twitter.ts "find and engage with AI discussions"', '');
  logger.helpCommand('    npx tsx twitter.ts "search for AWS posts and like helpful ones"', '');
  logger.helpCommand('    npx tsx twitter.ts "monitor brand mentions and respond"', '');

  logger.info('  Analysis & Strategy:', '');
  logger.helpCommand('    npx tsx twitter.ts "analyze trending topics and create content"', '');
  logger.helpCommand('    npx tsx twitter.ts "research what\'s popular in React community"', '');
  logger.helpCommand('    npx tsx twitter.ts "find influential developers to connect with"', '');

  logger.helpSection('OPTIONS', '');
  logger.helpCommand('  --resume <session-id>', 'Resume a previous session');
  logger.helpCommand('  --dry-run, --preview', 'Preview actions without executing them');
  logger.helpCommand('  --verbose, -v', 'Show detailed execution logs and debugging info');
  logger.helpCommand('  --help, -h', 'Show this help message');

  logger.helpSection('FEATURES', '');
  console.log('  ✨ Natural Language Understanding - No need to specify operation types');
  console.log('  🤖 AI-Driven Workflows - The AI determines the best approach');
  console.log('  🔄 Flexible Operations - Generation, engagement, analysis, and more');
  console.log('  📊 Smart Analytics - Performance tracking and insights');
  console.log('  🛡️  Safe Execution - Built-in rate limiting and account protection');
  console.log('  🎯 Viral Optimization - Strategic content creation for maximum reach');

  logger.helpSection('SETUP', '');
  console.log('  1. Create .env.local with your RUBE_API_TOKEN or COMPOSIO_API_KEY');
  console.log('  2. Ensure .mcp.json is configured (already done in this project)');
  console.log('  3. Verify .claude/commands/twitter.md exists');
  console.log('  4. Run your first command!');

  logger.newline();
  console.log('The AI will understand your intent and execute the appropriate Twitter');
  console.log('operations without requiring you to specify operation types.');
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    logger.error(`Unhandled error: ${error.message}`);
    process.exit(1);
  });
}

export default main;