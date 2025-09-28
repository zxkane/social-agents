#!/usr/bin/env tsx

/**
 * YouTube Command - AI-Driven Operations
 * Uses generic social executor with YouTube-specific slash commands
 *
 * Examples:
 *   npx tsx youtube.ts "create a viral video title about TypeScript tutorials"
 *   npx tsx youtube.ts "optimize my channel for software development content" --dry-run
 *   npx tsx youtube.ts "analyze trending programming topics for video ideas" --verbose
 */

import { SocialSDKExecutor, type SocialOptions } from './src/social-sdk-executor.js';
import { logger } from './src/logger.js';

/**
 * ★ Insight ─────────────────────────────────────
 * YouTube-specific wrapper uses generic social executor
 * Content creation strategies defined in slash command file
 * Video optimization and channel management through specialized prompts
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
    // Execute with the generic social executor using YouTube platform
    await SocialSDKExecutor.execute('youtube', prompt, options);
    logger.newline();
    logger.success('YouTube operation completed!', '🎉');
  } catch (error) {
    logger.newline();
    logger.error(`Operation failed: ${(error as Error).message}`);
    process.exit(1);
  }
}

/**
 * Display help information for YouTube operations
 */
function showHelp(): void {
  logger.helpSection('🎥 YouTube Command - AI-Driven Content Operations', '');
  logger.separator('=', 55);

  logger.helpSection('DESCRIPTION', `
  AI-powered YouTube automation that understands content creation and channel optimization.
  The AI will analyze your intent and execute appropriate YouTube operations
  including video optimization, content planning, SEO strategies, and channel management.`);

  logger.helpSection('USAGE', `
  npx tsx youtube.ts "<natural language request>" [options]`);

  logger.helpSection('EXAMPLES', '');
  logger.info('  Content Creation & Optimization:', '');
  logger.helpCommand('    npx tsx youtube.ts "create viral video titles about React hooks"', '');
  logger.helpCommand('    npx tsx youtube.ts "write engaging descriptions for my coding tutorials"', '');
  logger.helpCommand('    npx tsx youtube.ts "generate YouTube Shorts ideas for TypeScript tips"', '');

  logger.info('  SEO & Discovery:', '');
  logger.helpCommand('    npx tsx youtube.ts "optimize tags for my DevOps automation videos"', '');
  logger.helpCommand('    npx tsx youtube.ts "research trending programming topics for content"', '');
  logger.helpCommand('    npx tsx youtube.ts "create thumbnails strategy for coding channel"', '');

  logger.info('  Channel Management:', '');
  logger.helpCommand('    npx tsx youtube.ts "plan content calendar for software development channel"', '');
  logger.helpCommand('    npx tsx youtube.ts "analyze my video performance and suggest improvements"', '');
  logger.helpCommand('    npx tsx youtube.ts "create playlists structure for programming tutorials"', '');

  logger.helpSection('OPTIONS', '');
  logger.helpCommand('  --resume <session-id>', 'Resume a previous session');
  logger.helpCommand('  --dry-run, --preview', 'Preview actions without executing them');
  logger.helpCommand('  --verbose, -v', 'Show detailed execution logs and debugging info');
  logger.helpCommand('  --help, -h', 'Show this help message');

  logger.helpSection('YOUTUBE-SPECIFIC FEATURES', '');
  console.log('  🎬 Content Strategy - AI-driven video planning and optimization');
  console.log('  🔍 SEO Excellence - Strategic keyword research and tag optimization');
  console.log('  🖼️  Thumbnail Design - Eye-catching visual content strategies');
  console.log('  📊 Analytics Insights - Performance analysis and improvement suggestions');
  console.log('  ⚡ Viral Optimization - Trending topic analysis and engagement triggers');
  console.log('  🎯 Algorithm Mastery - Content structured for maximum discoverability');

  logger.helpSection('SETUP', '');
  console.log('  1. Create .env.local with your RUBE_API_TOKEN');
  console.log('  2. Ensure .mcp.json is configured (already done in this project)');
  console.log('  3. Verify .claude/commands/youtube.md exists');
  console.log('  4. Run your first command!');

  logger.newline();
  console.log('The AI will understand your intent and execute YouTube-appropriate operations');
  console.log('using content creation best practices and channel optimization strategies.');
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    logger.error(`Unhandled error: ${error.message}`);
    process.exit(1);
  });
}

export default main;