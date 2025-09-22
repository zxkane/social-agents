# Social Media Agents - Reddit & Twitter Poster Implementation

A comprehensive TypeScript-based social media automation system that generates headless Claude Code commands to invoke specialized subagents for automated content posting with platform-specific optimization, spam filter avoidance, and community engagement strategies.

## Features

### Reddit Posting (reddit-poster subagent)
- 🤖 **Headless Reddit Posting**: Generate Claude Code CLI commands for automated posting
- 🛡️ **Anti-Spam Strategies**: Built-in content optimization and spam filter avoidance
- 🎯 **Content Optimization**: Automatic content adaptation for different subreddit cultures
- 🏷️ **Flair Management**: Generate commands for flair retrieval and selection
- 🔄 **Fallback Strategies**: Multiple content versions for filtered post recovery
- 📊 **Multi-Subreddit Support**: Batch posting commands across multiple communities
- 🔍 **Community Intelligence**: Subreddit-specific tone and style adaptation via subagent

### Twitter Posting (twitter-poster subagent)
- 🐦 **Viral Content Creation**: Generate engaging tweets and threads with algorithm optimization
- 🧵 **Thread Optimization**: Progressive disclosure, engagement checkpoints, and narrative structure
- 📈 **Trending Analysis**: Real-time hashtag research and trending topic integration
- 🎯 **Engagement Amplification**: Hook crafting, community building, and authentic interaction
- 🔥 **Algorithm Optimization**: Twitter algorithm patterns for maximum reach and visibility
- 🛡️ **Shadow Ban Avoidance**: Anti-spam techniques and account health maintenance
- 📱 **Multi-Format Strategy**: Coordinated tweet, thread, and media content campaigns

### Twitter Data Management (twitter-poster subagent)
- 🔍 **Advanced Search Operations**: Complex Twitter search with filters, analytics, and insights generation
- 👤 **User Profile Analysis**: Comprehensive profile analytics, demographics, and engagement patterns
- 👥 **Follower Management**: Follower analysis, segmentation, and network mapping for strategic targeting
- 💝 **Strategic Engagement**: Automated like, retweet, reply, and follow operations with rate limiting
- ⚡ **Bulk Operations**: Enterprise-grade bulk engagement management with safety measures and analytics
- 📊 **Analytics & Reporting**: Comprehensive performance analytics, competitive analysis, and growth insights
- 🧹 **Content Management**: Intelligent content cleanup, archiving, and performance analysis with safety controls

### Shared Features
- ⚡ **Type Safety**: Full TypeScript implementation with Zod schema validation
- 🚀 **Headless Automation**: Pure command generation without SDK dependencies
- 🔧 **Content Validation**: Input validation and error handling for all platforms

## Architecture

This implementation generates headless Claude Code commands to invoke specialized subagents for Reddit and Twitter posting:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  TypeScript     │───▶│ Headless CLI    │───▶│   Specialized   │
│  Generators     │    │ Commands        │    │   Subagents     │
│                 │    │                 │    │                 │
│  - Configuration│    │ claude -p       │    │ reddit-poster:  │
│  - Validation   │    │ "Task(...)"     │    │ - Anti-Spam     │
│  - Command Gen  │    │ --headless      │    │ - Community     │
│  - Type Safety  │    │                 │    │ - RUBE MCP      │
│                 │    │                 │    │                 │
│                 │    │                 │    │ twitter-poster: │
│                 │    │                 │    │ - Viral Content │
│                 │    │                 │    │ - Algorithm Opt │
│                 │    │                 │    │ - Engagement    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**Key Principle:** TypeScript generates headless commands that invoke specialized subagents via `claude -p` CLI commands, providing type safety and configuration management while leveraging platform-specific expertise without SDK dependencies.

### Why Use the Subagent Approach?

✅ **Correct (Subagent)**: Use Task tool to invoke reddit-poster subagent
- Leverages Claude Code's built-in Reddit expertise
- Automatically handles spam filter avoidance and community culture adaptation
- Gets regular updates to anti-spam strategies
- Uses proven RUBE MCP server integration
- Maintains authentic community engagement patterns

❌ **Incorrect (Direct Implementation)**: Reimplement Reddit posting logic
- Would need to recreate complex spam detection algorithms
- Requires manual updates when Reddit changes policies
- Missing community culture knowledge and adaptation
- No built-in anti-spam expertise
- Risk of appearing inauthentic or promotional

## Installation

1. **Prerequisites**: Ensure you have Claude Code CLI installed and RUBE MCP server configured
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Build the project**:
   ```bash
   npm run build
   ```

## Quick Start

### Headless Command Generation

Generate headless Claude Code commands to invoke the reddit-poster subagent:

```typescript
import { RedditPoster } from './src/reddit-poster.js';

// 1. Configure your Reddit post
const config = {
  subreddit: 'programming',
  title: 'My experience with TypeScript and Reddit automation',
  content: `I built a Reddit posting system using Claude Code's headless mode...

  What has been your experience with AI automation systems?`,
  flair: 'Discussion',
  nsfw: false,
  spoiler: false,
  sendReplies: true
};

// 2. Generate headless Claude Code command
const command = RedditPoster.generateHeadlessCommand(
  config,
  'Create this Reddit post using your expert posting strategies'
);

console.log('Execute this command:');
console.log(command);

// Output: claude -p "Use the Task tool to invoke the reddit-poster subagent: Task({...})" --output-format json --allowedTools "Task" --permission-mode acceptEdits
```

### Shell Script Integration

```bash
#!/bin/bash
source headless-examples.sh

# Post to Reddit using the headless functions
simple_reddit_post "programming" "My Title" "My Content" "Discussion"

# Or use the TypeScript command generator
command=$(npx tsx headless-simple-example.ts simple programming "My Title" "My Content")
eval "$command"
```

### Multi-Subreddit Strategy

```typescript
import { RedditPostConfig } from './src/types.js';

const baseConfig: RedditPostConfig = {
  subreddit: '', // Will be set per target
  title: 'Built an AI agent for Reddit posting',
  content: 'Technical content with discussion hooks...',
  flair: 'Discussion'
};

const subreddits = ['programming', 'MachineLearning', 'artificial'];

// Generate headless commands for each subreddit
subreddits.forEach(sub => {
  const config = { ...baseConfig, subreddit: sub };
  const instruction = `Post to r/${sub} with community-specific optimization`;

  const command = RedditPoster.generateHeadlessCommand(config, instruction);
  console.log(`# Command for r/${sub}:`);
  console.log(command);
  console.log('');
});
```

## API Reference

### RedditPoster Class (Static Methods)

#### `createSubagentPrompt(config: RedditPostConfig, instruction?: string)`
Creates Task tool parameters for invoking the reddit-poster subagent.

**Returns:** `{ description: string, prompt: string, subagent_type: string }`

#### `generateHeadlessCommand(config: RedditPostConfig, instruction?: string): string`
Generates complete headless Claude Code CLI command.

**Returns:** Full `claude -p "..."` command string ready for execution.

#### `validateConfig(config: RedditPostConfig)`
Validates Reddit post configuration using Zod schemas.

**Returns:** `{ valid: boolean, error?: string }`

#### `optimizeContent(title: string, content: string, optimization: ContentOptimization)`
Optimizes content for Reddit posting (removes links, adds discussion hooks, etc.).

**Returns:** `{ optimizedTitle: string, optimizedContent: string }`

#### `generateFallbackVersions(config: RedditPostConfig, count?: number): RedditPostConfig[]`
Generates progressively simplified fallback content versions for spam filter avoidance.

#### `createFlairPrompt(subreddit: string)`
Creates Task tool parameters for retrieving subreddit flairs.

#### `createOptimizationPrompt(originalTitle: string, originalContent: string, targetSubreddit: string)`
Creates Task tool parameters for content optimization and transformation.

### Type Definitions

#### RedditPostConfig
```typescript
interface RedditPostConfig {
  subreddit: string;
  title: string;
  content?: string;
  url?: string;
  flair?: string;
  nsfw?: boolean;
  spoiler?: boolean;
  sendReplies?: boolean;
}
```

#### ContentOptimization
```typescript
interface ContentOptimization {
  maxLength: number;
  removeExternalLinks: boolean;
  addDiscussionHooks: boolean;
  simplifyLanguage: boolean;
  targetAudience: 'technical' | 'general' | 'mixed';
}
```

#### RedditPostResult
```typescript
interface RedditPostResult {
  success: boolean;
  postId?: string;
  url?: string;
  error?: string;
  filtered?: boolean;
  subreddit: string;
  title: string;
}
```

## CLI Usage

The project includes multiple headless mode examples and command generators for both Reddit and Twitter:

### Reddit Scripts
```bash
# Run Reddit practical examples
npm run reddit:example

# Execute Reddit shell script examples
npm run reddit:headless        # All examples
npm run reddit:simple         # Simple post
npm run reddit:multi          # Multi-subreddit
npm run reddit:optimize       # Content optimization

# Direct shell execution
./headless-examples.sh simple
./headless-examples.sh multi
./headless-examples.sh optimize
```

### Twitter Scripts
```bash
# Run Twitter practical examples
npm run twitter:example

# Execute Twitter shell script examples - Content Creation
npm run twitter:headless      # All examples
npm run twitter:simple        # Simple tweet
npm run twitter:thread        # Thread creation
npm run twitter:optimize      # Content optimization
npm run twitter:trends        # Trending analysis
npm run twitter:multi         # Multi-format strategy
npm run twitter:community     # Community engagement

# Execute Twitter shell script examples - Data Management
./twitter-headless-examples.sh search      # Twitter search operations
./twitter-headless-examples.sh profile     # User profile analysis
./twitter-headless-examples.sh followers   # Follower analysis
./twitter-headless-examples.sh engagement  # Strategic engagement
./twitter-headless-examples.sh bulk        # Bulk operations
./twitter-headless-examples.sh analytics   # Analytics reporting
./twitter-headless-examples.sh cleanup     # Content management

# Direct shell execution - Content Creation
./twitter-headless-examples.sh simple
./twitter-headless-examples.sh thread
./twitter-headless-examples.sh optimize
```

### Development Scripts
```bash
# Build and type-check the project
npm run build
npm run type-check
npm run lint

# Generate commands programmatically
node -e "
import('./src/reddit-poster.js').then(m => {
  const config = { subreddit: 'programming', title: 'Test', content: 'Test content' };
  console.log(m.RedditPoster.generateHeadlessCommand(config));
});"

node -e "
import('./src/twitter-poster.js').then(m => {
  const config = { content: 'Test tweet with viral optimization! #AI #automation' };
  console.log(m.TwitterPoster.generateHeadlessCommand(config));
});"
```

## Twitter Quick Start

### Basic Tweet with Viral Optimization

Generate headless Claude Code commands to invoke the twitter-poster subagent:

```typescript
import { TwitterPoster } from './src/twitter-poster.js';

// 1. Configure your tweet
const tweetConfig = {
  content: `🧵 Just built a Twitter automation system with Claude Code subagents!

Key insight: Use Task tool to invoke specialized subagents rather than reimplementing functionality.

This leverages Claude's expertise while maintaining type safety.

What's your experience with AI agent architectures? #AI #automation`,
  allowReplies: true,
  sensitive: false
};

// 2. Generate headless Claude Code command
const command = TwitterPoster.generateHeadlessCommand(
  tweetConfig,
  'Create this viral tweet using your expert engagement strategies and algorithm optimization'
);

console.log('Execute this command:');
console.log(command);
```

### Twitter Thread Creation

```typescript
import { TwitterThreadConfig } from './src/types.js';

// Configure educational thread with progressive disclosure
const threadConfig: TwitterThreadConfig = {
  tweets: [
    "🧵 3 AI agent patterns that changed how I build systems:",
    "1/ **Subagent Specialization**\nCreate specialized subagents for specific tasks rather than monolithic agents.\n\nEach subagent becomes an expert in their domain.",
    "2/ **Task-Based Delegation**\nUse Claude Code's Task tool to invoke subagents.\n\nThis leverages existing expertise while maintaining clean architecture.",
    "3/ **Type-Safe Coordination**\nTypeScript wrappers provide structure while delegating platform logic to subagents.\n\nBest of both worlds: type safety + expert knowledge.",
    "🎯 **Result**: Faster development, fewer bugs, better performance.\n\nWhat patterns work for you? 👇 #AI #development"
  ],
  threadHook: "🧵 3 AI agent patterns that changed how I build systems:",
  threadConclusion: "What patterns work for you? 👇",
  sensitive: false
};

// Generate headless command for thread
const threadCommand = TwitterPoster.generateHeadlessCommand(
  threadConfig,
  'Create viral thread with progressive disclosure and engagement optimization'
);
```

### Content Optimization for Viral Potential

```typescript
// Transform promotional content to viral engagement
const optimizationParams = TwitterPoster.createContentOptimizationPrompt(
  `Our startup just launched an AI platform that automates social media!

  Check out our website and use code TWITTER50 for 50% off!`,
  'technical',  // target audience
  'tweet'       // content type
);

const optimizationCommand = `claude -p "Use the Task tool: Task(${JSON.stringify(optimizationParams)})" --output-format json --allowedTools "Task" --permission-mode acceptEdits`;
```

## Twitter API Reference

### TwitterPoster Class (Static Methods)

#### `createSubagentPrompt(config: TwitterPostConfig | TwitterThreadConfig, instruction?: string)`
Creates Task tool parameters for invoking the twitter-poster subagent.

**Returns:** `{ description: string, prompt: string, subagent_type: string }`

#### `generateHeadlessCommand(config: TwitterPostConfig | TwitterThreadConfig, instruction?: string): string`
Generates complete headless Claude Code CLI command for Twitter posting.

**Returns:** Full `claude -p "..."` command string ready for execution.

#### `createTrendsAnalysisPrompt(location?: string)`
Creates Task parameters for Twitter trending topics analysis.

**Returns:** Task tool parameters for hashtag research and trending analysis.

#### `createContentOptimizationPrompt(originalContent: string, targetAudience?: string, contentType?: string)`
Creates Task parameters for viral content optimization.

**Returns:** Task tool parameters for transforming content into viral-ready Twitter content.

#### `validateContent(config: TwitterPostConfig | TwitterThreadConfig)`
Validates Twitter content against platform constraints and best practices.

**Returns:** `{ valid: boolean, issues: string[] }`

#### `generateFallbackVersions(config: TwitterPostConfig | TwitterThreadConfig, scenarios?: string[])`
Generates fallback versions for different scenarios (short, no-hashtags, different-hook, simplified).

**Returns:** Array of fallback configurations.

### Twitter Data Management Methods

#### `createSearchPrompt(searchConfig: TwitterSearchConfig, instruction?: string)`
Creates Task tool parameters for Twitter search operations with advanced filtering and analytics.

**Returns:** Task tool parameters for comprehensive Twitter search and analysis.

#### `createUserProfilePrompt(username: string, includeMetrics?: boolean, instruction?: string)`
Creates Task tool parameters for Twitter user profile analysis with engagement insights.

**Returns:** Task tool parameters for user profile analysis and demographic insights.

#### `createFollowersPrompt(username: string, maxFollowers?: number, analysisType?: string, instruction?: string)`
Creates Task tool parameters for follower analysis and network mapping.

**Returns:** Task tool parameters for follower segmentation and audience analysis.

#### `createLikePrompt(operations: TwitterLikeOperation[], instruction?: string)`
Creates Task tool parameters for strategic Twitter like operations with rate limiting.

**Returns:** Task tool parameters for automated like management.

#### `createRetweetPrompt(operations: TwitterRetweetOperation[], instruction?: string)`
Creates Task tool parameters for Twitter retweet operations with content curation.

**Returns:** Task tool parameters for strategic retweet and quote tweet management.

#### `createReplyPrompt(operations: TwitterReplyOperation[], instruction?: string)`
Creates Task tool parameters for Twitter reply operations with authentic engagement.

**Returns:** Task tool parameters for conversation management and community building.

#### `createFollowPrompt(operations: TwitterFollowOperation[], instruction?: string)`
Creates Task tool parameters for Twitter follow operations with network building strategy.

**Returns:** Task tool parameters for strategic follow management.

#### `createBulkOperationPrompt(bulkConfig: TwitterBulkOperationConfig, instruction?: string)`
Creates Task tool parameters for bulk Twitter operations with enterprise-grade automation.

**Returns:** Task tool parameters for bulk engagement management with safety controls.

#### `createAnalyticsPrompt(analyticsConfig: TwitterAnalyticsConfig, instruction?: string)`
Creates Task tool parameters for comprehensive Twitter analytics and performance reporting.

**Returns:** Task tool parameters for analytics generation and growth insights.

#### `createContentManagementPrompt(operation: TwitterContentManagementOperation, instruction?: string)`
Creates Task tool parameters for Twitter content management and cleanup operations.

**Returns:** Task tool parameters for content lifecycle management.

### Twitter Type Definitions

#### TwitterPostConfig
```typescript
interface TwitterPostConfig {
  content: string;
  mediaUrls?: string[];
  scheduledAt?: Date;
  replyTo?: string;      // Tweet ID to reply to
  quoteTweet?: string;   // Tweet ID to quote
  sensitive?: boolean;
  allowReplies?: boolean;
}
```

#### TwitterThreadConfig
```typescript
interface TwitterThreadConfig {
  tweets: string[];           // Array of tweet content (max 280 chars each)
  mediaUrls?: string[];
  scheduledAt?: Date;
  threadHook?: string;        // First tweet hook optimization
  threadConclusion?: string;  // Final tweet CTA
  sensitive?: boolean;
}
```

#### TwitterEngagementConfig
```typescript
interface TwitterEngagementConfig {
  useHashtags: boolean;
  maxHashtags: number;        // 1-10, default 3
  includePolls: boolean;
  engagementBait: boolean;
  trendingTopics: boolean;
  optimalTiming: boolean;
}
```

#### TwitterPostResult
```typescript
interface TwitterPostResult {
  success: boolean;
  tweetId?: string;
  url?: string;
  error?: string;
  shadowBanned?: boolean;
  engagementScore?: number;
  reach?: number;
}
```

### Twitter Data Management Type Definitions

#### TwitterSearchConfig
```typescript
interface TwitterSearchConfig {
  query: string;                    // Twitter search query
  maxResults?: number;              // 1-100, default 20
  sinceDate?: Date;                // Search tweets since this date
  untilDate?: Date;                // Search tweets until this date
  lang?: string;                   // Language filter (e.g., 'en')
  includeRetweets?: boolean;       // Include retweets in results
  minLikes?: number;               // Minimum likes filter
  minRetweets?: number;            // Minimum retweets filter
  hasImages?: boolean;             // Filter for tweets with images
  hasVideos?: boolean;             // Filter for tweets with videos
  fromUser?: string;               // Search tweets from specific user
  toUser?: string;                 // Search tweets to specific user
  sortBy?: 'recent' | 'popular' | 'mixed';  // Sort order
}
```

#### TwitterLikeOperation
```typescript
interface TwitterLikeOperation {
  tweetId: string;
  action: 'like' | 'unlike';
}
```

#### TwitterRetweetOperation
```typescript
interface TwitterRetweetOperation {
  tweetId: string;
  action: 'retweet' | 'unretweet';
  quote?: string;                  // For quote tweets
}
```

#### TwitterFollowOperation
```typescript
interface TwitterFollowOperation {
  userId: string;
  username?: string;
  action: 'follow' | 'unfollow';
}
```

#### TwitterReplyOperation
```typescript
interface TwitterReplyOperation {
  tweetId: string;
  replyText: string;
  mediaUrls?: string[];
}
```

#### TwitterBulkOperationConfig
```typescript
interface TwitterBulkOperationConfig {
  operations: Array<TwitterLikeOperation | TwitterRetweetOperation | TwitterFollowOperation>;
  rateLimit: {
    operationsPerMinute: number;
    maxConcurrent: number;
  };
  filters?: {
    skipIfAlreadyInteracted?: boolean;
    minFollowerCount?: number;
    maxFollowerCount?: number;
    accountAgeMinDays?: number;
  };
}
```

#### TwitterAnalyticsConfig
```typescript
interface TwitterAnalyticsConfig {
  timeframe: {
    start: Date;
    end: Date;
  };
  metrics: Array<'impressions' | 'engagements' | 'likes' | 'retweets' | 'replies' | 'followers' | 'reach'>;
  breakdown?: Array<'day' | 'hour' | 'hashtag' | 'mention' | 'media_type'>;
  includeComparison?: boolean;
  exportFormat?: 'json' | 'csv' | 'excel';
}
```

#### TwitterContentManagementOperation
```typescript
interface TwitterContentManagementOperation {
  action: 'delete' | 'archive' | 'update' | 'analyze';
  filter: TwitterContentFilter;
  dryRun?: boolean;
}

interface TwitterContentFilter {
  minLikes?: number;
  maxLikes?: number;
  minRetweets?: number;
  maxRetweets?: number;
  olderThanDays?: number;
  newerThanDays?: number;
  containsKeywords?: string[];
  excludeKeywords?: string[];
  hasMedia?: boolean;
  isReply?: boolean;
  isRetweet?: boolean;
}
```

## Twitter Examples

### Viral Tweet Strategy

```typescript
import { TwitterPoster } from './src/twitter-poster.js';

const viralTweet = {
  content: `🔥 Controversial opinion: Most "AI agents" are just glorified chatbots.

Real AI agents have:
✅ Specialized subagents for different platforms
✅ Type-safe coordination layers
✅ Platform-specific expertise (not generic responses)
✅ Authentic community engagement

Change my mind 👇 #AI #unpopularopinion`
};

// Validate content first
const validation = TwitterPoster.validateContent(viralTweet);
if (!validation.valid) {
  console.log('Issues:', validation.issues);
}

// Generate command for viral optimization
const command = TwitterPoster.generateHeadlessCommand(
  viralTweet,
  'Apply viral mechanics, engagement triggers, and algorithm optimization'
);
```

### Educational Thread Strategy

```typescript
const educationalThread = {
  tweets: [
    "🧵 Why your AI agents keep failing (and how to fix them):",
    "**Problem #1: Trying to build one agent to rule them all**\n\nSolution: Specialized subagents\n- reddit-poster for Reddit expertise\n- twitter-poster for viral content\n- Each agent masters their domain",
    "**Problem #2: Reimplementing platform logic**\n\nSolution: Task-based delegation\n- Use Claude Code's Task tool\n- Leverage existing subagent expertise\n- Focus on coordination, not implementation",
    "**Problem #3: No type safety or structure**\n\nSolution: TypeScript coordination layer\n- Zod schemas for validation\n- Type-safe configuration\n- Clear interfaces between components",
    "**Problem #4: Generic responses everywhere**\n\nSolution: Platform-specific optimization\n- Reddit: Anti-spam + community culture\n- Twitter: Viral mechanics + algorithm optimization\n- Each platform gets specialized treatment",
    "🎯 **Bottom line**: The best AI systems combine specialized knowledge (subagents) with structured coordination (TypeScript).\n\nNot either/or, but both together.\n\nWhat's your biggest AI agent challenge? 👇"
  ],
  threadHook: "🧵 Why your AI agents keep failing (and how to fix them):",
  threadConclusion: "What's your biggest AI agent challenge? 👇"
};

const threadCommand = TwitterPoster.generateHeadlessCommand(
  educationalThread,
  'Create educational thread with progressive disclosure and community engagement'
);
```

### Multi-Format Content Campaign

```typescript
// Single viral tweet
const hookTweet = {
  content: "Building AI agents is easy. Building GOOD AI agents? That's the real challenge 🧵"
};

// Educational thread
const educationalThread = {
  tweets: [
    "🧵 5 lessons from building 10+ AI agent systems:",
    "1/ Specialization > Generalization\nDedicated subagents beat monolithic agents every time.",
    "2/ Delegation > Reimplementation\nUse existing expertise, don't rebuild it.",
    "3/ Structure + Intelligence = Win\nTypeScript for structure, subagents for intelligence.",
    "4/ Platform-Specific > Generic\nReddit needs anti-spam, Twitter needs virality.",
    "5/ Community > Algorithm\nAuthentic engagement wins long-term.\n\nWhat's worked for you? 👇"
  ]
};

// Generate coordinated campaign commands
const hookCommand = TwitterPoster.generateHeadlessCommand(hookTweet, 'Viral hook tweet');
const threadCommand = TwitterPoster.generateHeadlessCommand(educationalThread, 'Educational follow-up thread');

console.log('1. Post hook tweet first:', hookCommand);
console.log('2. Follow with thread:', threadCommand);
```

## Twitter Data Management Examples

### Advanced Search Operations

```typescript
import { TwitterPoster } from './src/twitter-poster.js';

// Search for AI agent discussions with engagement filters
const searchConfig = {
  query: 'AI agent architecture -is:retweet',
  maxResults: 25,
  minLikes: 10,
  sinceDate: new Date('2024-01-01'),
  lang: 'en',
  sortBy: 'popular' as const
};

const searchParams = TwitterPoster.createSearchPrompt(
  searchConfig,
  'Search for high-quality AI agent discussions for engagement opportunities'
);

// Generate headless command for search operation
const searchCommand = `claude -p "Use the Task tool: Task(${JSON.stringify(searchParams)})" --output-format json --allowedTools "Task" --permission-mode acceptEdits`;

console.log('Execute search:', searchCommand);
```

### User Profile Analysis

```typescript
// Analyze competitor's Twitter strategy for insights
const profileParams = TwitterPoster.createUserProfilePrompt(
  'openai',
  true, // include metrics
  'Analyze OpenAI\'s Twitter strategy for competitive intelligence and collaboration opportunities'
);

const profileCommand = `claude -p "Use the Task tool: Task(${JSON.stringify(profileParams)})" --output-format json --allowedTools "Task" --permission-mode acceptEdits`;
```

### Strategic Engagement Operations

```typescript
// Automated like operations with strategic targeting
const likeOperations = [
  { tweetId: '1234567890123456789', action: 'like' as const },
  { tweetId: '1234567890123456790', action: 'like' as const },
  { tweetId: '1234567890123456791', action: 'like' as const }
];

const likeParams = TwitterPoster.createLikePrompt(
  likeOperations,
  'Strategic engagement with high-value AI community content to build relationships'
);

// Generate command for strategic likes
const likeCommand = `claude -p "Use the Task tool: Task(${JSON.stringify(likeParams)})" --output-format json --allowedTools "Task" --permission-mode acceptEdits`;
```

### Bulk Operations Management

```typescript
// Enterprise-grade bulk operations with safety controls
const bulkConfig = {
  operations: [
    { tweetId: '1234567890123456789', action: 'like' as const },
    { tweetId: '1234567890123456790', action: 'retweet' as const },
    { userId: '987654321098765432', action: 'follow' as const, username: 'ai_researcher' }
  ],
  rateLimit: {
    operationsPerMinute: 15,
    maxConcurrent: 5
  },
  filters: {
    skipIfAlreadyInteracted: true,
    minFollowerCount: 100,
    accountAgeMinDays: 30
  }
};

const bulkParams = TwitterPoster.createBulkOperationPrompt(
  bulkConfig,
  'Execute bulk engagement operations with safety measures and rate limiting'
);

const bulkCommand = `claude -p "Use the Task tool: Task(${JSON.stringify(bulkParams)})" --output-format json --allowedTools "Task" --permission-mode acceptEdits`;
```

### Analytics and Performance Reporting

```typescript
// Comprehensive analytics report generation
const analyticsConfig = {
  timeframe: {
    start: new Date('2024-01-01'),
    end: new Date('2024-01-31')
  },
  metrics: ['impressions' as const, 'engagements' as const, 'likes' as const, 'followers' as const],
  breakdown: ['day' as const, 'hashtag' as const],
  includeComparison: true,
  exportFormat: 'json' as const
};

const analyticsParams = TwitterPoster.createAnalyticsPrompt(
  analyticsConfig,
  'Generate comprehensive analytics report for January 2024 with actionable insights'
);

const analyticsCommand = `claude -p "Use the Task tool: Task(${JSON.stringify(analyticsParams)})" --output-format json --allowedTools "Task" --permission-mode acceptEdits`;
```

### Content Management and Cleanup

```typescript
// Intelligent content cleanup with safety measures (dry run)
const contentOperation = {
  action: 'analyze' as const,
  filter: {
    olderThanDays: 180,
    maxLikes: 5,
    maxRetweets: 2,
    excludeKeywords: ['important', 'pinned', 'announcement'],
    isReply: false,
    isRetweet: false
  },
  dryRun: true // Safe analysis without destructive operations
};

const managementParams = TwitterPoster.createContentManagementPrompt(
  contentOperation,
  'Analyze old low-performing content for potential cleanup (dry run)'
);

const managementCommand = `claude -p "Use the Task tool: Task(${JSON.stringify(managementParams)})" --output-format json --allowedTools "Task" --permission-mode acceptEdits`;
```

### Follower Analysis and Network Mapping

```typescript
// Comprehensive follower analysis for strategic targeting
const followerParams = TwitterPoster.createFollowersPrompt(
  'anthropicai',
  100, // max followers to analyze
  'demographics', // analysis type
  'Analyze Anthropic\'s followers to understand target audience and identify engagement opportunities'
);

const followerCommand = `claude -p "Use the Task tool: Task(${JSON.stringify(followerParams)})" --output-format json --allowedTools "Task" --permission-mode acceptEdits`;
```

## Content Optimization Features

### Reddit Anti-Spam Strategies
1. **External Link Removal**: Automatically removes or relocates external URLs
2. **Content Simplification**: Progressive content shortening for spam filter avoidance
3. **Discussion Hook Generation**: Adds engaging questions to encourage community interaction
4. **Language Simplification**: Converts technical jargon for broader audiences
5. **Fallback Versions**: Creates multiple content variants with increasing simplification

### Reddit Community Adaptation
- **Subreddit Culture Analysis**: Adapts tone and style for different communities
- **Flair Optimization**: Automatic selection of appropriate post flairs
- **Timing Optimization**: Support for optimal posting time configuration
- **Technical Audience Targeting**: Maintains technical depth for developer communities

### Twitter Viral Optimization
1. **Hook Crafting**: Creates attention-grabbing first 10 words for maximum impact
2. **Algorithm Optimization**: Applies Twitter algorithm patterns for maximum reach
3. **Engagement Triggers**: Includes questions, polls, and discussion hooks
4. **Progressive Disclosure**: Optimizes thread flow with cliffhangers and engagement checkpoints
5. **Hashtag Strategy**: Trending + niche + community hashtags (2-3 trending, 1-2 niche)
6. **Character Optimization**: Maximizes impact within 280-character limits

### Twitter Community Building
- **Authentic Voice**: Maintains genuine engagement over promotional language
- **Thread Optimization**: Progressive disclosure with narrative structure
- **Engagement Amplification**: Reply strategies and quote tweet optimization
- **Shadow Ban Avoidance**: Anti-spam techniques for account health
- **Trending Integration**: Real-time hashtag research and trend capitalization

## RUBE MCP Server Integration

This project now includes comprehensive RUBE MCP server integration, providing both **subagent-based automation** (recommended) and **direct MCP access** for advanced use cases. RUBE MCP connects 500+ apps including Reddit, Twitter, LinkedIn, Gmail, Slack, Discord, and GitHub for seamless cross-platform automation.

### 🚀 Quick Setup

**1. Install and Setup MCP Integration:**
```bash
# Automated setup (recommended)
npm run mcp:setup

# Manual setup
npm run mcp:install
```

**2. Configure API Keys:**
```bash
# Copy environment template
cp .env.example .env

# Edit .env and add your COMPOSIO API key
# Get your key from: https://app.composio.dev
COMPOSIO_API_KEY=your_actual_api_key_here
```

**3. Test Integration:**
```bash
# Test MCP connection and configuration
npm run mcp:test

# Start RUBE MCP server (optional)
npm run mcp:start
```

### 📋 Usage Approaches

#### **Approach 1: Subagent Delegation (Recommended)**
Use specialized subagents through the Task tool for platform expertise:

```bash
# Reddit posting via reddit-poster subagent
npm run reddit:simple

# Twitter posting via twitter-poster subagent
npm run twitter:simple

# Twitter data management via twitter-poster subagent
./twitter-headless-examples.sh search
./twitter-headless-examples.sh analytics
```

**Benefits:**
- ✅ Leverages Claude's built-in platform expertise
- ✅ Automatic spam filter avoidance and community adaptation
- ✅ Regular updates to anti-spam and engagement strategies
- ✅ Type-safe coordination with platform-specific intelligence

#### **Approach 2: Direct MCP Integration (Advanced)**
Direct RUBE MCP server access for maximum control and flexibility:

```bash
# Direct Twitter operations
npm run direct:twitter

# Direct Reddit operations
npm run direct:reddit

# Cross-platform bulk operations
npm run direct:bulk

# Advanced analytics and reporting
npm run direct:analytics
```

**Benefits:**
- ✅ Maximum flexibility and customization
- ✅ Cross-platform bulk operations and workflows
- ✅ Enterprise-grade analytics and automation
- ✅ Direct access to all 500+ RUBE integrations

### 🛠️ Direct MCP Examples

#### Twitter Operations
```typescript
// examples/direct-mcp-twitter.ts
import { TwitterMCPClient } from './examples/direct-mcp-twitter.js';

const twitter = new TwitterMCPClient();

// Search for high-engagement content
await twitter.searchTwitter('#AI artificial intelligence', 20);

// Get user analytics and profile insights
await twitter.getUserProfile('elonmusk');
await twitter.getAnalytics();

// Strategic engagement operations
await twitter.likeTweet('1234567890123456789');
await twitter.retweet('1234567890123456789');

// Thread creation with viral optimization
await twitter.createThread([
  'Thread about AI automation 1/3 🧵',
  'Key insights about MCP integration 2/3 📊',
  'Results and recommendations 3/3 🚀'
]);
```

#### Reddit Operations
```typescript
// examples/direct-mcp-reddit.ts
import { RedditMCPClient } from './examples/direct-mcp-reddit.js';

const reddit = new RedditMCPClient();

// Get subreddit insights and community data
await reddit.getSubredditInfo('artificial');
await reddit.getHotPosts('programming', 10);

// Search across Reddit for relevant discussions
await reddit.searchPosts('AI agent architecture', 'MachineLearning', 25);

// Community engagement operations
await reddit.createPost('test', 'MCP Integration Test', 'Testing RUBE integration...');
await reddit.upvotePost('post_id_here');
await reddit.commentOnPost('post_id_here', 'Great insights!');
```

#### Bulk Cross-Platform Operations
```typescript
// examples/direct-mcp-bulk-operations.ts
import { BulkOperationsMCPClient } from './examples/direct-mcp-bulk-operations.js';

const bulkClient = new BulkOperationsMCPClient();

// Cross-platform content distribution
await bulkClient.crossPlatformPost({
  twitter: {
    text: 'Exploring RUBE MCP for automation! 🤖',
    hashtags: ['AI', 'automation']
  },
  reddit: {
    subreddit: 'programming',
    title: 'RUBE MCP Integration Experience',
    body: 'Sharing my experience with cross-platform automation...'
  }
});

// Content discovery across platforms
await bulkClient.bulkContentDiscovery(
  ['artificial intelligence', 'automation'],
  ['twitter', 'reddit']
);

// Automated content curation workflow
await bulkClient.contentCurationWorkflow({
  searchQueries: ['#AI', '#MachineLearning'],
  platforms: ['twitter', 'reddit'],
  engagementThreshold: 100
});
```

#### Advanced Analytics
```typescript
// examples/direct-mcp-analytics.ts
import { AnalyticsMCPClient } from './examples/direct-mcp-analytics.js';

const analytics = new AnalyticsMCPClient();

// Comprehensive cross-platform analytics
const report = await analytics.generateAnalyticsReport({
  platforms: ['twitter', 'reddit'],
  timeRange: 'week',
  metrics: ['engagement', 'followers', 'growth'],
  exportFormats: ['json', 'csv', 'html']
});

// Export analytics to multiple formats
await analytics.exportAnalytics(report, ['json', 'csv', 'html']);

// Real-time monitoring with alerts
await analytics.startAnalyticsMonitoring({
  platforms: ['twitter', 'reddit'],
  timeRange: 'day',
  metrics: ['engagement', 'followers']
}, 30); // 30-minute intervals
```

### 🔧 MCP Configuration Files

The project includes comprehensive MCP configuration:

- **`.claude/mcp-servers.json`** - Claude Code MCP server configuration
- **`mcp-config.json`** - Detailed RUBE capabilities and operations list
- **`.env.example`** - Environment variable template
- **`scripts/setup-mcp.js`** - Automated setup script
- **`scripts/test-mcp-connection.js`** - Comprehensive connection testing

### 📊 Available MCP Operations

#### Reddit Operations via RUBE
- `REDDIT_CREATE_REDDIT_POST` - Create posts with community optimization
- `REDDIT_GET_USER_FLAIR` - Retrieve and manage user flairs
- `REDDIT_GET_SUBREDDIT_INFO` - Community analytics and insights
- `REDDIT_SEARCH_POSTS` - Advanced search with filters
- `REDDIT_GET_HOT_POSTS` - Trending content discovery
- `REDDIT_UPVOTE_POST` - Strategic engagement operations
- `REDDIT_COMMENT_ON_POST` - Community interaction

#### Twitter Operations via RUBE
**Content Creation:**
- `TWITTER_POST_TWEET` - Tweet posting with viral optimization
- `TWITTER_CREATE_THREAD` - Thread creation with engagement hooks
- `TWITTER_DELETE_TWEET` - Content management and cleanup

**Data & Analytics:**
- `TWITTER_SEARCH` - Advanced Twitter search with filters
- `TWITTER_GET_USER_PROFILE` - Profile analytics and insights
- `TWITTER_GET_FOLLOWERS` - Follower analysis and segmentation
- `TWITTER_GET_TRENDS` - Real-time trending topic analysis
- `TWITTER_GET_ANALYTICS` - Performance metrics and reporting

**Engagement Operations:**
- `TWITTER_LIKE_TWEET` - Strategic like operations
- `TWITTER_RETWEET` - Retweet and quote tweet management
- `TWITTER_REPLY` - Conversation and community engagement
- `TWITTER_FOLLOW` - Network building and follower growth

### 🚨 Rate Limiting & Safety

Both approaches include comprehensive rate limiting and safety measures:

```typescript
// Built-in rate limits (configurable in mcp-config.json)
const rateLimits = {
  reddit: {
    postsPerHour: 10,
    commentsPerHour: 30
  },
  twitter: {
    tweetsPerHour: 25,
    likesPerHour: 100,
    followsPerHour: 50
  }
};

// Bulk operation safety controls
const bulkConfig = {
  batchSize: 5,
  delayBetweenBatches: 2000,
  filters: {
    skipIfAlreadyInteracted: true,
    minFollowerCount: 100,
    accountAgeMinDays: 30
  }
};
```

### 🔍 Testing & Troubleshooting

**Connection Testing:**
```bash
# Comprehensive MCP connection test
npm run mcp:test

# Manual Claude CLI test
claude --help

# Test RUBE MCP server access
npx @composio/rube-mcp-server --help
```

**Common Issues & Solutions:**

1. **COMPOSIO_API_KEY not set:**
   ```bash
   # Get API key from https://app.composio.dev
   echo "COMPOSIO_API_KEY=your_key_here" >> .env
   ```

2. **Claude CLI not found:**
   ```bash
   # Install Claude Code CLI
   # See: https://docs.anthropic.com/claude-code
   ```

3. **MCP server connection failed:**
   ```bash
   # Reinstall MCP dependencies
   npm run mcp:install

   # Check configuration
   cat .claude/mcp-servers.json
   ```

4. **Rate limiting errors:**
   ```bash
   # Check rate limits in mcp-config.json
   # Reduce batch sizes and increase delays
   ```

### 🔄 Choosing Your Approach

**Use Subagent Approach When:**
- ✅ You want proven anti-spam and engagement strategies
- ✅ Community culture adaptation is important
- ✅ You prefer simple, reliable automation
- ✅ Regular updates to platform expertise matter

**Use Direct MCP Approach When:**
- ✅ You need maximum flexibility and customization
- ✅ Cross-platform bulk operations are required
- ✅ Advanced analytics and reporting are essential
- ✅ Integration with other RUBE apps (Slack, Gmail, etc.) is needed

**Hybrid Approach (Best of Both):**
```bash
# Use subagents for core posting operations
npm run twitter:simple
npm run reddit:simple

# Use direct MCP for advanced analytics and bulk operations
npm run direct:analytics
npm run direct:bulk
```

## MCP Integration

This implementation uses the RUBE MCP server for social media API access through Claude Code CLI:

### Reddit MCP Tools
The reddit-poster subagent uses these tools automatically via RUBE MCP server:
- `RUBE_MULTI_EXECUTE_TOOL` with `REDDIT_CREATE_REDDIT_POST`
- `RUBE_MULTI_EXECUTE_TOOL` with `REDDIT_GET_USER_FLAIR`

### Twitter MCP Tools
The twitter-poster subagent uses these tools automatically via RUBE MCP server:

**Content Creation:**
- `RUBE_MULTI_EXECUTE_TOOL` with `TWITTER_POST_TWEET`
- `RUBE_MULTI_EXECUTE_TOOL` with `TWITTER_CREATE_THREAD`
- `RUBE_MULTI_EXECUTE_TOOL` with `TWITTER_GET_TRENDS`

**Data Management & Search:**
- `RUBE_MULTI_EXECUTE_TOOL` with `TWITTER_SEARCH`
- `RUBE_MULTI_EXECUTE_TOOL` with `TWITTER_GET_USER_PROFILE`
- `RUBE_MULTI_EXECUTE_TOOL` with `TWITTER_GET_FOLLOWERS`
- `RUBE_MULTI_EXECUTE_TOOL` with `TWITTER_GET_USER_TWEETS`

**Engagement Operations:**
- `RUBE_MULTI_EXECUTE_TOOL` with `TWITTER_LIKE_TWEET`
- `RUBE_MULTI_EXECUTE_TOOL` with `TWITTER_RETWEET`
- `RUBE_MULTI_EXECUTE_TOOL` with `TWITTER_REPLY`
- `RUBE_MULTI_EXECUTE_TOOL` with `TWITTER_FOLLOW`

**Content Management:**
- `RUBE_MULTI_EXECUTE_TOOL` with `TWITTER_DELETE_TWEET`
- `RUBE_MULTI_EXECUTE_TOOL` with `TWITTER_GET_ANALYTICS`
- `RUBE_MULTI_EXECUTE_TOOL` with `TWITTER_GET_USER_TWEETS` (for content analysis)

### MCP Configuration
Ensure Claude Code CLI has access to RUBE MCP server for both subagents:

```bash
# Both reddit-poster and twitter-poster subagents handle MCP server integration automatically
# Just ensure Claude Code CLI is properly configured with MCP servers
claude --help  # Verify CLI is available for headless commands

# Test MCP server connectivity (optional)
claude -p "List available MCP tools for social media posting" --output-format json
```

## Development

### Scripts

```bash
npm run build        # Build TypeScript to JavaScript
npm run dev         # Run with tsx (development mode)
npm run type-check  # TypeScript type checking
npm run lint        # ESLint code quality check
```

### Project Structure

```
src/
├── index.ts                    # Main entry point and CLI
├── reddit-poster.ts           # Reddit posting implementation with static helpers
├── twitter-poster.ts          # Twitter posting implementation with static helpers
└── types.ts                  # TypeScript type definitions for both platforms

.claude/
└── agents/
    ├── reddit-poster.md      # Reddit subagent specification and strategies
    └── twitter-poster.md     # Twitter subagent specification and strategies

headless-examples.sh          # Reddit headless CLI examples
twitter-headless-examples.sh  # Twitter headless CLI examples
twitter-practical-example.ts  # Twitter TypeScript usage examples
practical-example.ts          # Reddit TypeScript usage examples (legacy)
src/subagent-example.ts      # Reddit subagent usage examples

dist/                        # Compiled JavaScript output (generated)
```

## Error Handling

The implementation includes comprehensive error handling:

- **Validation Errors**: Zod schema validation for all inputs
- **API Errors**: Graceful handling of Reddit API failures
- **Spam Filter Detection**: Automatic detection and fallback strategies
- **Process Errors**: Robust Claude Code CLI process management
- **Network Errors**: Timeout and retry mechanisms

## Examples

### Simple Post Creation

```typescript
import { RedditPoster } from './src/reddit-poster.js';

const config = {
  subreddit: 'webdev',
  title: 'Thoughts on modern TypeScript patterns',
  content: 'I\'ve been exploring advanced TypeScript patterns...',
  flair: 'Discussion'
};

// Generate headless command
const command = RedditPoster.generateHeadlessCommand(config);
console.log('Execute:', command);

// Or get Task tool parameters for direct use
const taskParams = RedditPoster.createSubagentPrompt(config);
console.log('Task params:', taskParams);
```

### Advanced Multi-Subreddit Strategy

```typescript
import { RedditPostConfig } from './src/types.js';

const baseConfig: RedditPostConfig = {
  subreddit: '',
  title: 'Building AI agents for social media automation',
  content: 'Technical deep-dive with code examples...',
  flair: 'Discussion'
};

const subreddits = ['programming', 'MachineLearning', 'artificial', 'compsci'];

// Generate fallback versions for spam filter avoidance
const fallbacks = RedditPoster.generateFallbackVersions(baseConfig, 2);

// Create commands for each subreddit with fallbacks
subreddits.forEach(sub => {
  const configs = [{ ...baseConfig, subreddit: sub }, ...fallbacks.map(f => ({ ...f, subreddit: sub }))];

  configs.forEach((config, index) => {
    const instruction = index === 0
      ? `Post to r/${sub} with community-specific optimization`
      : `Fallback ${index} for r/${sub} - simplified version`;

    const command = RedditPoster.generateHeadlessCommand(config, instruction);
    console.log(`# ${sub} - Attempt ${index + 1}:`);
    console.log(command);
  });
});
```

### Content Optimization

```typescript
// Transform promotional content to authentic discussion
const optimizationParams = RedditPoster.createOptimizationPrompt(
  'Revolutionary AI Platform Launches!',
  'Check out our amazing new platform at startup.com!',
  'programming'
);

const command = `claude -p "Use the Task tool: Task(${JSON.stringify(optimizationParams)})" --output-format json --allowedTools "Task" --permission-mode acceptEdits`;
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes with proper TypeScript types
4. Run tests: `npm run type-check && npm run build`
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Related

- [Claude Code CLI Documentation](https://docs.anthropic.com/claude-code)
- [RUBE MCP Server](https://github.com/composio/rube)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Reddit API Documentation](https://www.reddit.com/dev/api/)