#!/usr/bin/env tsx

/**
 * Generic Social Media Command - AI-Driven Operations
 * Unified architecture with platform-specific slash commands
 *
 * Examples:
 *   npx tsx social.ts twitter "generate viral content about TypeScript"
 *   npx tsx social.ts reddit "post insights about React in r/webdev" --dry-run
 *   npx tsx social.ts linkedin "share cloud architecture best practices" --verbose
 */

import { SocialSDKExecutor, type SocialOptions } from './src/social-sdk-executor.js';

/**
 * ★ Insight ─────────────────────────────────────
 * Generic entry point handles all social platforms uniformly
 * Platform-specific logic is delegated to slash command files
 * Single codebase scales to unlimited social platforms
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

  // Extract platform (first argument)
  const platform = args.find(arg => !arg.startsWith('--') && arg !== '-v' && arg !== '-h');
  if (!platform) {
    console.error('❌ Error: No platform specified\n');
    showHelp();
    process.exit(1);
  }

  // Extract the prompt (all non-flag arguments except platform)
  const prompt = args
    .filter(arg => !arg.startsWith('--') && arg !== '-v' && arg !== '-h' && arg !== platform)
    .join(' ');

  if (!prompt.trim()) {
    console.error('❌ Error: No prompt provided\n');
    showHelp();
    process.exit(1);
  }

  try {
    // Execute with the generic social executor
    await SocialSDKExecutor.execute(platform, prompt, options);
    console.log(`\n🎉 ${platform.charAt(0).toUpperCase() + platform.slice(1)} operation completed!`);
  } catch (error) {
    console.error(`\n❌ Operation failed: ${(error as Error).message}`);
    process.exit(1);
  }
}

/**
 * Display help information for all platforms
 */
function showHelp(): void {
  console.log(`
🔮 Social Media Command - AI-Driven Operations
==============================================

DESCRIPTION:
  AI-powered social media automation that understands natural language requests.
  Supports multiple platforms with specialized AI agents for each platform's unique
  culture, algorithms, and best practices.

USAGE:
  npx tsx social.ts <platform> "<natural language request>" [options]

SUPPORTED PLATFORMS:
  twitter     Twitter/X operations - viral content, engagement, trending analysis
  reddit      Reddit operations - community engagement, subreddit posting
  linkedin    LinkedIn operations - professional networking, B2B content

EXAMPLES:

  Twitter Operations:
    npx tsx social.ts twitter "write a viral thread about TypeScript best practices"
    npx tsx social.ts twitter "find and engage with AI discussions" --dry-run
    npx tsx social.ts twitter "analyze trending topics and create relevant content"

  Reddit Operations:
    npx tsx social.ts reddit "post insights about React in r/webdev"
    npx tsx social.ts reddit "find JavaScript discussions to join with helpful comments"
    npx tsx social.ts reddit "analyze popular programming posts for content ideas"

  LinkedIn Operations:
    npx tsx social.ts linkedin "share cloud architecture best practices"
    npx tsx social.ts linkedin "connect with DevOps professionals in my industry"
    npx tsx social.ts linkedin "create thought leadership content about AI trends"

OPTIONS:
  --dry-run, --preview    Preview actions without executing them
  --verbose, -v           Show detailed execution logs and debugging info
  --help, -h              Show this help message

PLATFORM-SPECIFIC FEATURES:

  Twitter:
    ✨ Viral content optimization with engagement triggers
    🔄 Thread creation and audience engagement strategies
    📊 Trending topic analysis and timely content creation
    🎯 Strategic hashtag research and algorithm optimization

  Reddit:
    🏘️  Subreddit culture awareness and community guidelines
    📝 Content optimization for specific subreddit audiences
    💬 Authentic engagement and discussion participation
    ⚡ Timing optimization for maximum visibility

  LinkedIn:
    💼 Professional networking and relationship building
    📈 B2B content creation and thought leadership
    🎯 Industry-specific targeting and engagement
    📊 Professional brand building and authority establishment

SETUP:
  1. Create .env.local with your RUBE_API_TOKEN or COMPOSIO_API_KEY
  2. Ensure .mcp.json is configured (already done in this project)
  3. Verify .claude/commands/ contains platform-specific slash commands
  4. Run your first command!

EXTENDING:
  To add a new platform:
  1. Create .claude/commands/[platform].md with platform-specific prompts
  2. Add npm script: "[platform]": "tsx social.ts [platform]"
  3. Test with: npx tsx social.ts [platform] "your prompt"

The AI will understand your intent and execute platform-appropriate operations
using each platform's unique best practices and optimization strategies.
`);
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default main;