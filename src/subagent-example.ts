#!/usr/bin/env node

/**
 * Example of how to properly use the reddit-poster subagent via Claude Code's Task tool
 *
 * This demonstrates the correct way to invoke the subagent defined in
 * .claude/agents/reddit-poster.md from within a TypeScript application
 */

import { RedditPostConfig } from './types.js';
import { RedditPoster } from './reddit-poster.js';

/**
 * Example of using the reddit-poster subagent correctly
 *
 * This function would be called from within Claude Code where the Task tool is available
 */
async function demonstrateSubagentUsage() {
  console.log('🤖 Reddit Poster Subagent Usage Examples');
  console.log('==========================================\n');

  // Example 1: Simple post using subagent helper method
  const simplePost: RedditPostConfig = {
    subreddit: 'programming',
    title: 'Built a TypeScript Reddit automation system with Claude Code',
    content: `I recently created a Reddit posting automation system using TypeScript and Claude Code's subagent architecture.

The key insight was properly using the Task tool to invoke specialized subagents rather than trying to replicate their functionality. This approach leverages Claude Code's built-in expertise while maintaining type safety in the TypeScript wrapper.

What are your thoughts on AI agent architectures for social media automation?`,
    flair: 'Discussion',
    nsfw: false,
    spoiler: false,
    sendReplies: true
  };

  // Generate the correct Task tool parameters for the reddit-poster subagent
  const taskParams = RedditPoster.createSubagentPrompt(
    simplePost,
    'Create and post this content to Reddit using your expert posting strategies'
  );

  console.log('📝 Example 1: Task tool parameters for reddit-poster subagent');
  console.log('Description:', taskParams.description);
  console.log('Subagent Type:', taskParams.subagent_type);
  console.log('Prompt:\n', taskParams.prompt);

  console.log('\n' + '='.repeat(60) + '\n');

  // Example 2: Multi-subreddit strategy with subagent
  const multiSubredditPost: RedditPostConfig = {
    subreddit: '', // Will be set per target
    title: 'Lessons learned building AI agents for social media automation',
    content: `After building several AI agents for social media automation, here are the key architectural patterns I've discovered:

**Subagent Specialization:**
- Use specialized subagents for platform-specific logic
- Keep the main application as a coordination layer
- Leverage Claude Code's Task tool for subagent invocation

**Type Safety Integration:**
- TypeScript wrappers for configuration and validation
- Zod schemas for runtime safety
- Clear interfaces between application and subagent layers

**Anti-Spam Intelligence:**
- Progressive content optimization strategies
- Platform-specific filter avoidance techniques
- Community culture adaptation algorithms

The reddit-poster subagent handles all the Reddit-specific complexity while the TypeScript layer provides structure and coordination.

What patterns have you found effective for AI agent architectures?`,
    flair: 'Discussion'
  };

  const subreddits = ['programming', 'MachineLearning', 'artificial', 'compsci'];

  console.log('🎯 Example 2: Multi-subreddit strategy using subagent');

  for (const subreddit of subreddits) {
    const config = { ...multiSubredditPost, subreddit };
    const taskParams = RedditPoster.createSubagentPrompt(
      config,
      `Post this content to r/${subreddit}. Apply your subreddit-specific optimization strategies and anti-spam techniques.`
    );

    console.log(`\n📍 r/${subreddit}:`);
    console.log('Task Parameters:', {
      description: taskParams.description,
      subagent_type: taskParams.subagent_type,
      // Truncate prompt for readability
      prompt: taskParams.prompt.substring(0, 200) + '...'
    });
  }

  console.log('\n' + '='.repeat(60) + '\n');

  // Example 3: Flair retrieval using subagent
  console.log('🏷️  Example 3: Getting subreddit flairs via subagent');

  const flairTaskParams = {
    description: 'Get flairs for r/programming',
    prompt: `Get available flairs for r/programming.

Use the RUBE MCP server to fetch all available flairs for this subreddit. Analyze the flair options and recommend the most appropriate ones for technical content.

Return the flair information including their IDs, text, descriptions, and any recommendations for when to use each flair type.`,
    subagent_type: 'reddit-poster'
  };

  console.log('Flair Task Parameters:', flairTaskParams);

  console.log('\n' + '='.repeat(60) + '\n');

  // Example 4: Content optimization using subagent
  console.log('🔧 Example 4: Content optimization via subagent');

  const optimizationTaskParams = {
    description: 'Optimize content for Reddit posting',
    prompt: `Optimize this content for Reddit posting with anti-spam strategies:

**Original Content:**
Title: "My new startup uses AI to automate social media posting - check out our demo!"
Content: "Hey everyone! I just launched SocialAI (https://socialai.com) which uses advanced AI to automatically post to Reddit, Twitter, and LinkedIn. We're offering 50% off for early adopters! Sign up at https://socialai.com/signup and use code REDDIT50. Would love your feedback!"

**Requirements:**
- Remove promotional language and external links
- Convert to discussion-focused content
- Add authentic technical insights
- Include community engagement hooks
- Target r/programming audience
- Avoid spam filter triggers

Apply your full Reddit posting expertise to transform this promotional content into authentic, valuable community contribution.`,
    subagent_type: 'reddit-poster'
  };

  console.log('Optimization Task Parameters:');
  console.log('Description:', optimizationTaskParams.description);
  console.log('Subagent Type:', optimizationTaskParams.subagent_type);
  console.log('Prompt Preview:', optimizationTaskParams.prompt.substring(0, 300) + '...');
}

/**
 * CLI interface demonstrating different subagent usage patterns
 */
async function cli() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('🔧 Reddit Poster Subagent Examples');
    console.log('Usage: npm run subagent [command]');
    console.log('\nCommands:');
    console.log('  demo     - Show all subagent usage examples');
    console.log('  simple   - Simple post example');
    console.log('  multi    - Multi-subreddit strategy');
    console.log('  flairs   - Flair retrieval example');
    console.log('  optimize - Content optimization example');
    console.log('\n💡 Note: These examples show the Task tool parameters.');
    console.log('   In Claude Code, you would use the Task tool with these parameters.');
    return;
  }

  const command = args[0];

  switch (command) {
    case 'demo':
      await demonstrateSubagentUsage();
      break;

    case 'simple':
      const config: RedditPostConfig = {
        subreddit: 'webdev',
        title: 'Thoughts on TypeScript for Reddit automation',
        content: 'Built a Reddit posting system with TypeScript. What libraries do you recommend?'
      };

      const params = RedditPoster.createSubagentPrompt(config);
      console.log('Simple Post Task Parameters:', JSON.stringify(params, null, 2));
      break;

    case 'multi':
      console.log('Multi-subreddit posting would use multiple Task calls:');
      const subreddits = ['programming', 'webdev', 'typescript'];

      subreddits.forEach(sub => {
        const config: RedditPostConfig = {
          subreddit: sub,
          title: 'Cross-platform posting strategies',
          content: 'How do you handle posting the same content across different communities?'
        };

        const params = RedditPoster.createSubagentPrompt(config);
        console.log(`\nr/${sub}:`, params);
      });
      break;

    case 'flairs':
      console.log('Flair Retrieval Task Parameters:');
      console.log({
        description: 'Get programming subreddit flairs',
        prompt: 'Get available flairs for r/programming and recommend the best ones for technical discussions.',
        subagent_type: 'reddit-poster'
      });
      break;

    case 'optimize':
      console.log('Content Optimization Task Parameters:');
      console.log({
        description: 'Optimize promotional content for Reddit',
        prompt: 'Transform this promotional content into authentic community discussion: [content here]',
        subagent_type: 'reddit-poster'
      });
      break;

    default:
      console.log(`Unknown command: ${command}`);
      console.log('Run without arguments to see available commands');
  }
}

// Export for use as a module
export { demonstrateSubagentUsage };

// Run CLI if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  cli().catch(console.error);
}