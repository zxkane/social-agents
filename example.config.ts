/**
 * Example configuration for Reddit Poster
 *
 * This file demonstrates various posting strategies and configurations
 * that can be used with the Reddit Poster TypeScript implementation.
 */

import { RedditPostConfig, PostingStrategy, ContentOptimization, SubredditConfig } from './src/types.js';

/**
 * Example post configurations for different types of content
 */

// Technical blog post for developer communities
export const technicalBlogPost: RedditPostConfig = {
  subreddit: 'programming',
  title: 'Built a TypeScript Reddit automation system with Claude Code and MCP',
  content: `I recently built a Reddit posting automation system using TypeScript, Claude Code CLI, and the RUBE MCP server. Here's what I learned:

**Key Technical Decisions:**
- TypeScript for type safety and better developer experience
- Claude Code CLI for AI agent integration and MCP server access
- Zod schemas for runtime validation and type inference
- Progressive content optimization to avoid spam filters

**Architecture Highlights:**
- Modular design with separate concerns for posting, optimization, and validation
- Async/await throughout for better error handling
- Fallback strategies for spam filter avoidance
- Multi-subreddit posting with rate limiting

**Challenges Solved:**
- Reddit's spam detection algorithms
- Content adaptation for different community cultures
- Automatic flair selection and optimization
- Graceful degradation when posts are filtered

The most interesting part was implementing the anti-spam strategies. Reddit's filters are quite sophisticated, so I had to build a system that progressively simplifies content while maintaining the core message.

What are your thoughts on AI-driven social media automation? Any specific Reddit posting challenges you've encountered?`,
  flair: 'Discussion',
  nsfw: false,
  spoiler: false,
  sendReplies: true
};

// Project showcase for open source communities
export const projectShowcase: RedditPostConfig = {
  subreddit: 'opensource',
  title: 'Open sourced my Reddit automation agent - built with TypeScript and Claude Code',
  content: `I just open-sourced a Reddit posting agent that I built using TypeScript and Claude Code CLI. It helps automate content posting while respecting community guidelines and avoiding spam filters.

**Features:**
- Intelligent content optimization for different subreddits
- Anti-spam strategies with progressive content simplification
- Multi-subreddit posting with fallback versions
- Automatic flair selection and community culture adaptation
- Full TypeScript implementation with comprehensive error handling

**Tech Stack:**
- TypeScript for type safety
- Claude Code CLI for AI integration
- RUBE MCP server for Reddit API access
- Zod for schema validation
- Node.js with modern ES modules

**Why I Built This:**
Social media automation is tricky because you need to balance efficiency with authentic community engagement. This tool helps content creators share valuable insights across relevant communities without falling into spam traps.

**What's Next:**
Planning to add support for optimal timing analysis, advanced community sentiment analysis, and integration with other social platforms.

Would love feedback from the community! What features would be most valuable for your social media workflows?`,
  flair: 'Project',
  nsfw: false,
  spoiler: false,
  sendReplies: true
};

// Simple question for community engagement
export const communityQuestion: RedditPostConfig = {
  subreddit: 'webdev',
  title: 'What tools do you use for social media automation in 2024?',
  content: `I'm exploring social media automation tools and wondering what the community is using these days.

**My current setup:**
- Custom TypeScript scripts for content optimization
- Claude Code CLI for AI-powered content generation
- Various APIs for cross-platform posting

**Looking for:**
- Tools that respect platform guidelines and community cultures
- Solutions that maintain authentic engagement vs pure automation
- Integration options with modern development workflows

**Questions:**
- What's your experience with automated posting tools?
- How do you balance automation with authentic community participation?
- Any recommendations for Reddit-specific tools?

Particularly interested in developer-focused solutions that can be integrated into existing workflows.`,
  nsfw: false,
  spoiler: false,
  sendReplies: true
};

/**
 * Content optimization presets for different scenarios
 */

// Technical audience optimization
export const technicalOptimization: ContentOptimization = {
  maxLength: 500,
  removeExternalLinks: false, // Technical audiences often appreciate links
  addDiscussionHooks: true,
  simplifyLanguage: false, // Keep technical terminology
  targetAudience: 'technical'
};

// General audience optimization
export const generalOptimization: ContentOptimization = {
  maxLength: 400,
  removeExternalLinks: true,
  addDiscussionHooks: true,
  simplifyLanguage: true,
  targetAudience: 'general'
};

// Conservative optimization for high-filter subreddits
export const conservativeOptimization: ContentOptimization = {
  maxLength: 300,
  removeExternalLinks: true,
  addDiscussionHooks: true,
  simplifyLanguage: true,
  targetAudience: 'mixed'
};

/**
 * Subreddit configuration examples
 */

export const subredditConfigs: Record<string, SubredditConfig> = {
  programming: {
    name: 'programming',
    culture: 'technical',
    allowedPostTypes: ['text', 'link'],
    requiresFlair: true,
    maxTitleLength: 300,
    spamFilterSensitivity: 'high',
    bestPostingTimes: [14, 15, 16, 20, 21] // UTC hours
  },

  webdev: {
    name: 'webdev',
    culture: 'professional',
    allowedPostTypes: ['text', 'link', 'image'],
    requiresFlair: false,
    maxTitleLength: 300,
    spamFilterSensitivity: 'medium',
    bestPostingTimes: [13, 14, 15, 19, 20]
  },

  opensource: {
    name: 'opensource',
    culture: 'casual',
    allowedPostTypes: ['text', 'link'],
    requiresFlair: true,
    maxTitleLength: 300,
    spamFilterSensitivity: 'medium',
    bestPostingTimes: [12, 13, 14, 18, 19]
  },

  MachineLearning: {
    name: 'MachineLearning',
    culture: 'academic',
    allowedPostTypes: ['text', 'link', 'image'],
    requiresFlair: true,
    maxTitleLength: 300,
    spamFilterSensitivity: 'high',
    bestPostingTimes: [14, 15, 16, 17, 18]
  }
};

/**
 * Multi-subreddit posting strategies
 */

// Technical project announcement strategy
export const technicalProjectStrategy: PostingStrategy = {
  primaryContent: technicalBlogPost,
  fallbackVersions: [], // Will be generated automatically
  subredditTargets: ['programming', 'webdev', 'typescript', 'opensource'],
  optimization: technicalOptimization
};

// Community engagement strategy
export const engagementStrategy: PostingStrategy = {
  primaryContent: communityQuestion,
  fallbackVersions: [],
  subredditTargets: ['webdev', 'programming', 'webdevNOOBS', 'learnprogramming'],
  optimization: generalOptimization
};

// Cross-platform announcement strategy
export const crossPlatformStrategy: PostingStrategy = {
  primaryContent: projectShowcase,
  fallbackVersions: [],
  subredditTargets: ['opensource', 'programming', 'webdev', 'SideProject'],
  optimization: conservativeOptimization
};

/**
 * Usage examples
 */

export const usageExamples = {
  // Single post with optimization
  singlePost: {
    config: technicalBlogPost,
    optimization: technicalOptimization
  },

  // Multi-subreddit campaign
  multiSubreddit: technicalProjectStrategy,

  // Community engagement campaign
  engagement: engagementStrategy,

  // Conservative posting for sensitive subreddits
  conservative: {
    config: {
      ...technicalBlogPost,
      content: technicalBlogPost.content?.substring(0, 250) + '...'
    },
    optimization: conservativeOptimization
  }
};

/**
 * Best practices and guidelines
 */
export const bestPractices = {
  postTiming: {
    // Peak hours in UTC for different regions
    US_East: [17, 18, 19, 20, 21], // 1-5 PM EST
    US_West: [20, 21, 22, 23, 0],  // 1-5 PM PST
    Europe: [9, 10, 11, 12, 13],   // 9 AM - 1 PM CET
    Global: [14, 15, 16, 17, 18]   // Overlap times
  },

  contentGuidelines: {
    titleLength: 'Keep titles under 250 characters for better visibility',
    contentLength: 'Aim for 300-500 words for technical content, 200-300 for general',
    discussionHooks: 'Always include at least one question to encourage engagement',
    links: 'Place external links in comments to avoid spam filters',
    formatting: 'Use markdown formatting for better readability'
  },

  communityEtiquette: {
    lurking: 'Spend time in communities before posting to understand culture',
    engagement: 'Respond to comments on your posts within 2-4 hours',
    frequency: 'Limit to 1-2 posts per subreddit per week maximum',
    value: 'Always provide genuine value, not just promotion',
    authenticity: 'Maintain authentic voice even with automation'
  }
};