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

/**
 * ★ Insight ─────────────────────────────────────
 * LinkedIn-specific wrapper uses generic social executor
 * Professional networking strategies defined in slash command file
 * B2B engagement and thought leadership through specialized prompts
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
    // Execute with the generic social executor using LinkedIn platform
    await SocialSDKExecutor.execute('linkedin', prompt, options);
    console.log('\n🎉 LinkedIn operation completed!');
  } catch (error) {
    console.error(`\n❌ Operation failed: ${(error as Error).message}`);
    process.exit(1);
  }
}

/**
 * Display help information for LinkedIn operations
 */
function showHelp(): void {
  console.log(`
💼 LinkedIn Command - AI-Driven Professional Operations
======================================================

DESCRIPTION:
  AI-powered LinkedIn automation that understands professional networking best practices.
  The AI will analyze your intent and execute appropriate LinkedIn operations
  including content creation, networking, thought leadership, and B2B engagement.

USAGE:
  npx tsx linkedin.ts "<natural language request>" [options]

EXAMPLES:

  Content Creation & Thought Leadership:
    npx tsx linkedin.ts "share cloud architecture best practices"
    npx tsx linkedin.ts "create thought leadership content about AI trends"
    npx tsx linkedin.ts "post insights about remote team management"

  Professional Networking:
    npx tsx linkedin.ts "connect with DevOps professionals in my industry"
    npx tsx linkedin.ts "engage with CTO discussions in my network"
    npx tsx linkedin.ts "build relationships with startup founders"

  Industry Engagement:
    npx tsx linkedin.ts "participate in discussions about software architecture"
    npx tsx linkedin.ts "share expertise on AWS and cloud technologies"
    npx tsx linkedin.ts "comment thoughtfully on industry leader posts"

  Business Development:
    npx tsx linkedin.ts "establish thought leadership in the fintech space"
    npx tsx linkedin.ts "network with potential clients in enterprise software"
    npx tsx linkedin.ts "showcase our company's technical achievements"

OPTIONS:
  --dry-run, --preview    Preview actions without executing them
  --verbose, -v           Show detailed execution logs and debugging info
  --help, -h              Show this help message

LINKEDIN-SPECIFIC FEATURES:
  💼 Professional Tone - Maintains appropriate business communication standards
  🎯 B2B Targeting - Focuses on business decision makers and industry leaders
  📈 Authority Building - Establishes expertise through valuable insights
  🤝 Strategic Networking - Builds authentic professional relationships
  📊 Industry Analysis - Provides timely insights on business trends
  🏆 Thought Leadership - Positions you as an industry expert

SETUP:
  1. Create .env.local with your RUBE_API_TOKEN or COMPOSIO_API_KEY
  2. Ensure .mcp.json is configured (already done in this project)
  3. Verify .claude/commands/linkedin.md exists
  4. Run your first command!

The AI will understand your intent and execute LinkedIn-appropriate operations
using professional networking best practices and B2B engagement strategies.
`);
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default main;