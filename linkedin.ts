#!/usr/bin/env tsx

/**
 * LinkedIn Command - AI-Driven Operations
 * Uses generic social executor with LinkedIn-specific slash commands
 *
 * Examples:
 *   npx tsx linkedin.ts "share cloud architecture best practices"
 *   npx tsx linkedin.ts "connect with DevOps professionals in my industry" --dry-run
 *   npx tsx linkedin.ts "create thought leadership content about AI trends" --verbose
 */

import { SocialSDKExecutor, type SocialOptions } from './src/social-sdk-executor.js';
import { logger } from './src/logger.js';

/**
 * ★ Insight ─────────────────────────────────────
 * LinkedIn-specific wrapper uses generic social executor
 * Professional networking strategies defined in slash command file
 * B2B engagement and thought leadership through specialized prompts
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
    // Execute with the generic social executor using LinkedIn platform
    await SocialSDKExecutor.execute('linkedin', prompt, options);
    logger.newline();
    logger.success('LinkedIn operation completed!', '🎉');
  } catch (error) {
    logger.newline();
    logger.error(`Operation failed: ${(error as Error).message}`);
    process.exit(1);
  }
}

/**
 * Display help information for LinkedIn operations
 */
function showHelp(): void {
  logger.helpSection('💼 LinkedIn Command - AI-Driven Professional Operations', '');
  logger.separator('=', 55);

  logger.helpSection('DESCRIPTION', `
  AI-powered LinkedIn automation that understands professional networking best practices.
  The AI will analyze your intent and execute appropriate LinkedIn operations
  including content creation, networking, thought leadership, and B2B engagement.`);

  logger.helpSection('USAGE', `
  npx tsx linkedin.ts "<natural language request>" [options]`);

  logger.helpSection('EXAMPLES', '');
  logger.info('  Content Creation & Thought Leadership:', '');
  logger.helpCommand('    npx tsx linkedin.ts "share cloud architecture best practices"', '');
  logger.helpCommand('    npx tsx linkedin.ts "create thought leadership content about AI"', '');
  logger.helpCommand('    npx tsx linkedin.ts "post insights about remote team management"', '');

  logger.info('  Professional Networking:', '');
  logger.helpCommand('    npx tsx linkedin.ts "connect with DevOps professionals"', '');
  logger.helpCommand('    npx tsx linkedin.ts "engage with CTO discussions in network"', '');
  logger.helpCommand('    npx tsx linkedin.ts "build relationships with startup founders"', '');

  logger.info('  Industry Engagement:', '');
  logger.helpCommand('    npx tsx linkedin.ts "participate in software architecture discussions"', '');
  logger.helpCommand('    npx tsx linkedin.ts "share expertise on AWS and cloud technologies"', '');
  logger.helpCommand('    npx tsx linkedin.ts "comment thoughtfully on industry posts"', '');

  logger.helpSection('OPTIONS', '');
  logger.helpCommand('  --resume <session-id>', 'Resume a previous session');
  logger.helpCommand('  --dry-run, --preview', 'Preview actions without executing them');
  logger.helpCommand('  --verbose, -v', 'Show detailed execution logs and debugging info');
  logger.helpCommand('  --help, -h', 'Show this help message');

  logger.helpSection('LINKEDIN-SPECIFIC FEATURES', '');
  console.log('  💼 Professional Tone - Maintains appropriate business communication standards');
  console.log('  🎯 B2B Targeting - Focuses on business decision makers and industry leaders');
  console.log('  📈 Authority Building - Establishes expertise through valuable insights');
  console.log('  🤝 Strategic Networking - Builds authentic professional relationships');
  console.log('  📊 Industry Analysis - Provides timely insights on business trends');
  console.log('  🏆 Thought Leadership - Positions you as an industry expert');

  logger.helpSection('SETUP', '');
  console.log('  1. Create .env.local with your RUBE_API_TOKEN or COMPOSIO_API_KEY');
  console.log('  2. Ensure .mcp.json is configured (already done in this project)');
  console.log('  3. Verify .claude/commands/linkedin.md exists');
  console.log('  4. Run your first command!');

  logger.newline();
  console.log('The AI will understand your intent and execute LinkedIn-appropriate operations');
  console.log('using professional networking best practices and B2B engagement strategies.');
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    logger.error(`Unhandled error: ${error.message}`);
    process.exit(1);
  });
}

export default main;