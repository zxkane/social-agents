#!/usr/bin/env node

/**
 * Practical Reddit Posting Example using the reddit-poster subagent
 *
 * This file demonstrates how to actually use the Task tool to invoke
 * the reddit-poster subagent from within Claude Code.
 *
 * Run this with: `npm run dev practical-example.ts`
 */

import { RedditPostConfig } from './src/types.js';
import { RedditPoster } from './src/reddit-poster.js';

/**
 * Practical example: Use the reddit-poster subagent to create real Reddit posts
 */
async function createRedditPostsWithSubagent() {
  console.log('🚀 Practical Reddit Posting with Subagent');
  console.log('==========================================\n');

  // Example 1: Technical blog post about this very implementation
  console.log('📝 Creating a technical blog post about this implementation...\n');

  const technicalPost: RedditPostConfig = {
    subreddit: 'programming',
    title: 'Built a TypeScript Reddit automation system using Claude Code subagents',
    content: `I just finished implementing a Reddit posting automation system that properly uses Claude Code's subagent architecture. Here's what I learned about building AI agent systems:

**Key Architecture Decisions:**

1. **Subagent Delegation Pattern**
   - Use Task tool to invoke specialized subagents (reddit-poster, twitter-agent, etc.)
   - Keep the main application as a coordination layer with TypeScript for type safety
   - Let subagents handle platform-specific complexity and optimization

2. **Configuration Management**
   - Zod schemas for runtime validation and type inference
   - Structured interfaces between TypeScript coordination and AI subagents
   - Progressive content optimization strategies built into the wrapper

3. **Anti-Spam Integration**
   - The reddit-poster subagent handles spam filter avoidance automatically
   - Fallback content generation for filtered posts
   - Community culture adaptation per subreddit

**Technical Benefits:**
- Type-safe configuration and validation
- Clean separation of concerns between coordination logic and AI expertise
- Reusable subagent patterns across different platforms
- Built-in Reddit community expertise via the reddit-poster subagent

The most interesting aspect was learning to properly structure prompts for subagent invocation rather than trying to replicate complex posting logic in application code.

**Code Example:**
\`\`\`typescript
// Generate proper Task tool parameters
const taskParams = RedditPoster.createSubagentPrompt(config, instruction);

// In Claude Code, invoke the subagent
const result = await Task({
  description: taskParams.description,
  subagent_type: taskParams.subagent_type,
  prompt: taskParams.prompt
});
\`\`\`

What patterns have you found most effective for AI agent architectures? Any experience with Claude Code's subagent system?`,
    flair: 'Discussion',
    nsfw: false,
    spoiler: false,
    sendReplies: true
  };

  // Generate Task parameters for the reddit-poster subagent
  const taskParams = RedditPoster.createSubagentPrompt(
    technicalPost,
    'Create this Reddit post using your expert posting strategies. Apply community-specific optimization for r/programming, use anti-spam techniques, and ensure maximum engagement through discussion hooks.'
  );

  console.log('📋 Task Tool Parameters Generated:');
  console.log('================================');
  console.log(`Description: "${taskParams.description}"`);
  console.log(`Subagent Type: "${taskParams.subagent_type}"`);
  console.log(`Prompt Length: ${taskParams.prompt.length} characters\n`);

  // This is where you would actually invoke the Task tool in Claude Code
  console.log('🔧 Next Step: Use Task Tool in Claude Code');
  console.log('=========================================');
  console.log('In Claude Code environment, execute:');
  console.log('');
  console.log('```typescript');
  console.log('const result = await Task({');
  console.log(`  description: "${taskParams.description}",`);
  console.log(`  subagent_type: "${taskParams.subagent_type}",`);
  console.log('  prompt: `' + taskParams.prompt.substring(0, 150) + '...`');
  console.log('});');
  console.log('```');
  console.log('');
  console.log('The reddit-poster subagent will:');
  console.log('- Analyze r/programming community culture');
  console.log('- Optimize content for spam filter avoidance');
  console.log('- Select appropriate flair using RUBE MCP server');
  console.log('- Create the actual Reddit post');
  console.log('- Return post ID and URL if successful\n');

  console.log('='.repeat(60) + '\n');

  // Example 2: Multi-subreddit content optimization
  console.log('🎯 Multi-Subreddit Strategy Example');
  console.log('===================================\n');

  const baseContent: RedditPostConfig = {
    subreddit: '',
    title: 'AI agents for social media automation - architectural insights',
    content: `I've been experimenting with AI agent architectures for social media automation and wanted to share some patterns that have worked well:

**Subagent Specialization:**
Each platform gets its own specialized subagent (reddit-poster, twitter-agent, linkedin-poster) that understands the unique culture, API constraints, and optimization strategies for that platform.

**Coordination Layer:**
A TypeScript application handles configuration, scheduling, content generation, and coordinates between subagents. This provides type safety and structured workflows while letting AI handle the complex platform-specific logic.

**Progressive Optimization:**
Content gets optimized progressively - starting with human-written material, then platform-specific adaptation, then anti-spam optimization, finally community culture adaptation.

**Results:**
This architecture has improved posting success rates significantly while maintaining authentic community engagement. The key insight is letting AI subagents handle what they're good at (understanding communities, avoiding filters) while using traditional programming for what it's good at (coordination, configuration, type safety).

What approaches have worked for your automation projects? Any specific challenges with platform-specific optimization?`,
    flair: 'Discussion'
  };

  const targetSubreddits = [
    { name: 'programming', focus: 'technical implementation details' },
    { name: 'MachineLearning', focus: 'AI architecture and learning aspects' },
    { name: 'artificial', focus: 'general AI discussion and implications' },
    { name: 'compsci', focus: 'academic and theoretical aspects' }
  ];

  console.log('For multi-subreddit posting, generate separate Task calls:\n');

  targetSubreddits.forEach((sub, index) => {
    const config = { ...baseContent, subreddit: sub.name };
    const customInstruction = `Post to r/${sub.name} with focus on ${sub.focus}. Adapt the content tone and technical depth for this community's culture and interests.`;

    const params = RedditPoster.createSubagentPrompt(config, customInstruction);

    console.log(`${index + 1}. r/${sub.name} (Focus: ${sub.focus})`);
    console.log(`   Task Parameters:`);
    console.log(`   - Description: "${params.description}"`);
    console.log(`   - Subagent: "${params.subagent_type}"`);
    console.log(`   - Custom instruction: "${customInstruction}"`);
    console.log(`   - Prompt length: ${params.prompt.length} chars\n`);
  });

  console.log('Each Task call would result in community-optimized content for that specific subreddit.\n');

  console.log('='.repeat(60) + '\n');

  // Example 3: Content transformation
  console.log('🔄 Content Transformation Example');
  console.log('=================================\n');

  console.log('Transform promotional content into community discussion:');

  const promotionalContent = {
    title: 'Revolutionary AI Platform Launches with Reddit Integration!',
    content: `Exciting news! Our startup SocialAI has just launched the most advanced AI social media automation platform!

🚀 Features:
- Automated Reddit posting with AI optimization
- Cross-platform content synchronization
- Advanced analytics dashboard
- 50% off for early adopters!

Visit SocialAI.com and use code LAUNCH50 for exclusive access!

#AI #SocialMedia #Startup #Reddit #Automation`
  };

  const transformationTask = {
    description: 'Transform promotional content to community discussion',
    prompt: `Transform this promotional content into authentic community discussion suitable for r/programming:

**Original Content:**
Title: "${promotionalContent.title}"
Content: "${promotionalContent.content}"

**Transformation Requirements:**
1. Remove all promotional language, links, and discount codes
2. Convert from announcement to experience sharing
3. Add technical implementation details and challenges
4. Include genuine questions for community engagement
5. Focus on learning and insights rather than product promotion
6. Adapt tone for r/programming community culture
7. Add discussion hooks and technical depth

**Output Format:**
Provide transformed title and content that would generate valuable technical discussion while avoiding all spam filter triggers. The result should read like a genuine developer sharing their experience and seeking community input.`,
    subagent_type: 'reddit-poster'
  };

  console.log('Original (Promotional):');
  console.log(`Title: "${promotionalContent.title}"`);
  console.log(`Content: ${promotionalContent.content.substring(0, 100)}...`);
  console.log('');
  console.log('Transformation Task:');
  console.log(`Description: "${transformationTask.description}"`);
  console.log(`Subagent: "${transformationTask.subagent_type}"`);
  console.log('');
  console.log('Expected Result: Completely rewritten content that:');
  console.log('- Provides genuine technical value');
  console.log('- Generates authentic community discussion');
  console.log('- Avoids all spam filter triggers');
  console.log('- Maintains developer voice and authenticity\n');

  console.log('='.repeat(60) + '\n');

  console.log('🎉 Summary');
  console.log('==========');
  console.log('This demonstrates the proper way to use the reddit-poster subagent:');
  console.log('');
  console.log('1. **Configuration**: Use TypeScript for type-safe post configuration');
  console.log('2. **Task Generation**: Use RedditPoster.createSubagentPrompt() for proper Task parameters');
  console.log('3. **Subagent Invocation**: Use Task tool with "reddit-poster" subagent_type');
  console.log('4. **Multi-Platform**: Coordinate multiple subagent calls for different communities');
  console.log('5. **Content Optimization**: Leverage subagent expertise for transformation and optimization');
  console.log('');
  console.log('The reddit-poster subagent handles all Reddit-specific complexity while TypeScript');
  console.log('provides coordination, validation, and type safety.');
}

// Run the practical example
if (import.meta.url === `file://${process.argv[1]}`) {
  createRedditPostsWithSubagent().catch(console.error);
}