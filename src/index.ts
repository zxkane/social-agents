#!/usr/bin/env node

/**
 * Reddit Poster - Claude Code Integration Example
 *
 * This demonstrates how to properly use the reddit-poster subagent
 * defined in .claude/agents/reddit-poster.md via Claude Code's Task tool.
 */

import { RedditPostConfig } from './types.js';
import { RedditPoster } from './reddit-poster.js';

/**
 * Example of how to use the Task tool to invoke the reddit-poster subagent
 *
 * NOTE: This example shows the setup and configuration. The actual Task tool
 * calls would be made from within Claude Code environment where the Task tool
 * is available.
 */
async function demonstrateTaskToolUsage() {
  console.log('🤖 Reddit Poster - Claude Code Task Tool Integration');
  console.log('====================================================\n');

  console.log('This example demonstrates how to structure Task tool calls for the reddit-poster subagent.');
  console.log('In Claude Code, you would use these configurations with the Task tool.\n');

  // Example 1: Simple Reddit post via subagent
  console.log('📝 Example 1: Simple Reddit Post');
  console.log('--------------------------------');

  const simplePost: RedditPostConfig = {
    subreddit: 'programming',
    title: 'Built a Reddit automation system with Claude Code subagents',
    content: `I recently implemented a Reddit posting system using Claude Code's subagent architecture. The key insight was using the Task tool to properly invoke specialized subagents rather than reimplementing their functionality.

**Architecture Benefits:**
- Leverages Claude Code's built-in Reddit expertise
- Maintains separation of concerns between TypeScript coordination and AI logic
- Provides type safety while delegating complex posting strategies to the subagent

**Technical Implementation:**
- TypeScript wrapper for configuration and validation
- Task tool integration for subagent invocation
- Zod schemas for runtime type safety

The reddit-poster subagent handles all the Reddit-specific optimizations, spam filter avoidance, and community culture adaptation automatically.

What are your thoughts on this architectural approach for AI automation systems?`,
    flair: 'Discussion',
    nsfw: false,
    spoiler: false,
    sendReplies: true
  };

  // Generate Task tool parameters
  const taskParams = RedditPoster.createSubagentPrompt(
    simplePost,
    'Create this Reddit post using your expert posting strategies and RUBE MCP server integration'
  );

  console.log('Task Tool Configuration:');
  console.log(`Description: "${taskParams.description}"`);
  console.log(`Subagent Type: "${taskParams.subagent_type}"`);
  console.log('Prompt (excerpt):', taskParams.prompt.substring(0, 200) + '...\n');

  console.log('In Claude Code, you would call:');
  console.log('```typescript');
  console.log('const taskResult = await Task({');
  console.log(`  description: "${taskParams.description}",`);
  console.log(`  subagent_type: "${taskParams.subagent_type}",`);
  console.log(`  prompt: \`${taskParams.prompt.substring(0, 100)}...\``);
  console.log('});');
  console.log('```\n');

  console.log('='.repeat(60) + '\n');

  // Example 2: Multi-subreddit strategy
  console.log('🎯 Example 2: Multi-Subreddit Strategy');
  console.log('-------------------------------------');

  const multiPost: RedditPostConfig = {
    subreddit: '', // Will be set per target
    title: 'AI agent architecture patterns for social media automation',
    content: `After building several AI agents for social media automation, here are the most effective architectural patterns:

**Subagent Specialization Pattern:**
- Platform-specific subagents (reddit-poster, twitter-agent, etc.)
- Central coordination layer in TypeScript
- Task tool for cross-agent communication

**Configuration Management:**
- Type-safe configuration with Zod schemas
- Environment-specific optimization parameters
- Fallback strategies for different platforms

**Anti-Spam Intelligence:**
- Progressive content optimization
- Platform-specific filter detection
- Community culture adaptation algorithms

This approach has significantly improved posting success rates while maintaining authentic community engagement.

What patterns have worked best for your automation projects?`,
    flair: 'Discussion'
  };

  const targetSubreddits = ['programming', 'MachineLearning', 'artificial'];

  console.log('For multi-subreddit posting, you would make multiple Task calls:');

  targetSubreddits.forEach((subreddit, index) => {
    const config = { ...multiPost, subreddit };
    const params = RedditPoster.createSubagentPrompt(
      config,
      `Post to r/${subreddit} with community-specific optimization and anti-spam strategies`
    );

    console.log(`\n${index + 1}. r/${subreddit}:`);
    console.log(`   Task({ description: "${params.description}", subagent_type: "${params.subagent_type}", ... })`);
  });

  console.log('\n' + '='.repeat(60) + '\n');

  // Example 3: Content optimization via subagent
  console.log('🔧 Example 3: Content Optimization');
  console.log('----------------------------------');

  const optimizationExample = {
    description: 'Optimize promotional content for Reddit',
    prompt: `Transform this promotional content into authentic community discussion:

**Original (Promotional):**
Title: "Our new AI startup revolutionizes social media automation!"
Content: "Check out SocialAI.com - we use cutting-edge AI to automate Reddit posting! 50% off for early users with code REDDIT50!"

**Requirements:**
- Remove all promotional language and external links
- Convert to discussion-focused technical content
- Add genuine community value and insights
- Include engagement hooks and questions
- Target r/programming community culture
- Apply anti-spam filter strategies

Use your Reddit posting expertise to create authentic, valuable content that generates meaningful community discussion.`,
    subagent_type: 'reddit-poster'
  };

  console.log('Content transformation task:');
  console.log(`Description: "${optimizationExample.description}"`);
  console.log('Prompt (excerpt):', optimizationExample.prompt.substring(0, 200) + '...\n');

  console.log('Expected result: Completely transformed content that provides value to the community');
  console.log('while avoiding all spam filter triggers.\n');

  console.log('='.repeat(60) + '\n');

  // Example 4: Flair management
  console.log('🏷️  Example 4: Flair Management');
  console.log('------------------------------');

  const flairTask = {
    description: 'Get and analyze r/programming flairs',
    prompt: `Analyze the available flairs for r/programming:

1. Use RUBE MCP server to fetch all available flairs
2. Categorize flairs by content type (Discussion, Help, Showcase, etc.)
3. Recommend the most appropriate flairs for different post types
4. Provide guidelines for flair selection optimization

Return structured information including flair IDs, text, descriptions, and usage recommendations.`,
    subagent_type: 'reddit-poster'
  };

  console.log('Flair analysis task:');
  console.log(`Description: "${flairTask.description}"`);
  console.log('This would return detailed flair information and optimization recommendations.\n');
}

/**
 * TypeScript wrapper usage examples
 */
async function demonstrateWrapperUsage() {
  console.log('📦 TypeScript Wrapper Usage');
  console.log('============================\n');

  console.log('The TypeScript wrapper provides static methods for:');
  console.log('- Type-safe configuration with Zod validation');
  console.log('- Content optimization utilities');
  console.log('- Task tool parameter generation');
  console.log('- Headless command generation\n');

  // Example configuration
  const baseConfig: RedditPostConfig = {
    subreddit: 'programming',
    title: 'Example post title',
    content: 'Example content for demonstration'
  };

  console.log('Example configuration:');
  console.log(JSON.stringify(baseConfig, null, 2));

  // Generate fallback versions
  const fallbacks = RedditPoster.generateFallbackVersions(baseConfig, 2);
  console.log('\nGenerated fallback versions for spam filter avoidance:');
  fallbacks.forEach((fallback: RedditPostConfig, index: number) => {
    console.log(`${index + 1}. Title: "${fallback.title}"`);
    console.log(`   Content length: ${fallback.content?.length || 0} chars`);
  });

  // Generate headless command
  const command = RedditPoster.generateHeadlessCommand(baseConfig, 'Create optimized Reddit post');
  console.log('\nGenerated headless command:');
  console.log(command);

  // Validate configuration
  const validation = RedditPoster.validateConfig(baseConfig);
  console.log('\nConfiguration validation:');
  console.log(`Valid: ${validation.valid}`);
  if (validation.error) {
    console.log(`Error: ${validation.error}`);
  }
}

/**
 * CLI interface
 */
async function cli() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Reddit Poster - Claude Code Integration');
    console.log('Usage: npm run dev [command]\n');
    console.log('Commands:');
    console.log('  task     - Show Task tool integration examples');
    console.log('  wrapper  - Show TypeScript wrapper usage');
    console.log('  both     - Show both examples');
    console.log('\nNote: For subagent-specific examples, use: npm run subagent');
    return;
  }

  const command = args[0];

  switch (command) {
    case 'task':
      await demonstrateTaskToolUsage();
      break;

    case 'wrapper':
      await demonstrateWrapperUsage();
      break;

    case 'both':
      await demonstrateTaskToolUsage();
      console.log('\n' + '='.repeat(80) + '\n');
      await demonstrateWrapperUsage();
      break;

    default:
      console.log(`Unknown command: ${command}`);
      console.log('Run without arguments to see usage');
  }
}

// Run the CLI if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  cli().catch(console.error);
}

export { RedditPoster } from './reddit-poster.js';
export * from './types.js';