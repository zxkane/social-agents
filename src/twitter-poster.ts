import {
  TwitterPostConfig,
  TwitterThreadConfig,
  TwitterEngagementConfig,
  TwitterSearchConfig,
  TwitterLikeOperation,
  TwitterRetweetOperation,
  TwitterFollowOperation,
  TwitterReplyOperation,
  TwitterBulkOperationConfig,
  TwitterAnalyticsConfig,
  TwitterContentManagementOperation,
  TwitterPostConfigSchema,
  TwitterThreadConfigSchema,
  TwitterSearchConfigSchema
} from './types.js';

/**
 * Twitter Poster - Static helper methods for invoking the twitter-poster subagent
 *
 * This class provides utility methods to generate proper Task tool parameters
 * for invoking the twitter-poster subagent defined in .claude/agents/twitter-poster.md
 *
 * All actual Twitter posting logic is delegated to the twitter-poster subagent.
 * This class only handles parameter generation and headless command construction.
 */
export class TwitterPoster {
  /**
   * Creates Task tool parameters for invoking the twitter-poster subagent
   *
   * @param config - Twitter post or thread configuration
   * @param instruction - Optional custom instruction for the subagent
   * @returns Task tool parameters for Claude Code
   */
  static createSubagentPrompt(
    config: TwitterPostConfig | TwitterThreadConfig,
    instruction?: string
  ): {
    description: string;
    prompt: string;
    subagent_type: string;
  } {
    const isThread = 'tweets' in config;
    const contentType = isThread ? 'thread' : 'tweet';

    // Validate configuration
    if (isThread) {
      TwitterThreadConfigSchema.parse(config);
    } else {
      TwitterPostConfigSchema.parse(config);
    }

    const defaultInstruction = `Create and post this ${contentType} to Twitter/X using your expert viral content strategies and engagement optimization techniques.`;

    const configJson = JSON.stringify(config, null, 2);

    const prompt = `${instruction || defaultInstruction}

**${isThread ? 'Thread' : 'Tweet'} Configuration:**
\`\`\`json
${configJson}
\`\`\`

**Instructions:**
${isThread ?
  `- Create and post this multi-tweet thread using TWITTER_CREATE_THREAD
- Apply thread optimization strategies (hooks, engagement points, conclusions)
- Use progressive disclosure and narrative structuring
- Optimize each tweet for maximum engagement while maintaining thread flow
- Include appropriate hashtags and engagement elements` :
  `- Create and post this single tweet using TWITTER_POST_TWEET
- Apply viral content optimization and engagement strategies
- Optimize for Twitter algorithm and maximum reach
- Include appropriate hashtags and trending topics if relevant`
}
- Use RUBE MCP server tools for Twitter API access
- Apply hashtag research and trending topic analysis
- Monitor for engagement and respond to initial comments
- Use authentic voice and community building techniques
- Avoid shadow ban triggers and maintain account health
- Track engagement metrics and performance

Apply your full Twitter posting expertise including:
- Character limit optimization
- Hook crafting for maximum impact
- Engagement amplification strategies
- Algorithm optimization techniques
- Community building and authentic engagement
- Viral mechanics and shareability factors`;

    return {
      description: `Post ${contentType} to Twitter`,
      prompt: prompt.trim(),
      subagent_type: 'twitter-poster'
    };
  }

  /**
   * Generates a headless Claude Code command for Twitter posting
   *
   * @param config - Twitter post or thread configuration
   * @param instruction - Optional custom instruction
   * @returns Complete headless command string
   */
  static generateHeadlessCommand(
    config: TwitterPostConfig | TwitterThreadConfig,
    instruction?: string
  ): string {
    const taskParams = this.createSubagentPrompt(config, instruction);

    const prompt = JSON.stringify({
      description: taskParams.description,
      prompt: taskParams.prompt,
      subagent_type: taskParams.subagent_type
    });

    return `claude -p ${JSON.stringify(prompt)} \\
    --output-format json \\
    --allowedTools "Task" \\
    --permission-mode acceptEdits`;
  }

  /**
   * Creates Task parameters for getting Twitter trending topics
   *
   * @param location - Optional location for trends (default: global)
   * @returns Task tool parameters for trending analysis
   */
  static createTrendsAnalysisPrompt(location?: string): {
    description: string;
    prompt: string;
    subagent_type: string;
  } {
    const prompt = `Analyze current Twitter trending topics and recommend hashtag strategies.

**Requirements:**
- Use TWITTER_GET_TRENDS to fetch current trending topics${location ? ` for location: ${location}` : ''}
- Analyze trending hashtags and topics for viral potential
- Identify niche community hashtags relevant to tech/development
- Recommend optimal hashtag combinations for different content types
- Provide timing recommendations based on trending patterns
- Suggest content angles that align with current trends

**Deliverables:**
- Current trending topics analysis
- Recommended hashtags by category (trending, niche, community)
- Content timing and angle recommendations
- Viral opportunity identification`;

    return {
      description: 'Analyze Twitter trends and hashtags',
      prompt: prompt.trim(),
      subagent_type: 'twitter-poster'
    };
  }

  /**
   * Creates Task parameters for content optimization
   *
   * @param originalContent - Original content to optimize
   * @param targetAudience - Target audience type
   * @param contentType - Whether to optimize for single tweet or thread
   * @returns Task tool parameters for content optimization
   */
  static createContentOptimizationPrompt(
    originalContent: string,
    targetAudience: 'technical' | 'general' | 'mixed' = 'mixed',
    contentType: 'tweet' | 'thread' = 'tweet'
  ): {
    description: string;
    prompt: string;
    subagent_type: string;
  } {
    const prompt = `Optimize this content for viral Twitter engagement and algorithm performance.

**Original Content:**
${originalContent}

**Optimization Requirements:**
- Target audience: ${targetAudience}
- Content type: ${contentType}
- Apply viral content strategies and hook optimization
- Ensure character limit compliance (280 chars per tweet)
- Add engagement hooks and discussion triggers
- Include hashtag recommendations
- Optimize for Twitter algorithm patterns
- Maintain authentic voice while maximizing shareability
${contentType === 'thread' ?
  `- Structure as engaging thread with progressive disclosure
- Create compelling thread hooks and conclusions
- Add engagement checkpoints throughout thread
- Optimize thread flow and narrative structure` :
  `- Create single high-impact tweet
- Focus on immediate attention-grabbing elements
- Optimize for retweets and replies`
}

**Deliverables:**
- Optimized ${contentType} content
- Hashtag strategy recommendations
- Engagement amplification suggestions
- Timing recommendations
- Performance prediction and success factors`;

    return {
      description: `Optimize content for Twitter ${contentType}`,
      prompt: prompt.trim(),
      subagent_type: 'twitter-poster'
    };
  }

  /**
   * Creates multiple fallback versions of content for different scenarios
   *
   * @param originalConfig - Original post/thread configuration
   * @param scenarios - Array of fallback scenarios to generate
   * @returns Array of fallback configurations
   */
  static generateFallbackVersions(
    originalConfig: TwitterPostConfig | TwitterThreadConfig,
    scenarios: Array<'short' | 'no-hashtags' | 'different-hook' | 'simplified'> = ['short', 'no-hashtags']
  ): (TwitterPostConfig | TwitterThreadConfig)[] {
    const isThread = 'tweets' in originalConfig;
    const fallbacks: (TwitterPostConfig | TwitterThreadConfig)[] = [];

    scenarios.forEach(scenario => {
      const fallback = { ...originalConfig };

      switch (scenario) {
        case 'short':
          if (isThread && 'tweets' in fallback) {
            // Reduce thread to top 3 tweets
            fallback.tweets = fallback.tweets.slice(0, 3);
          } else if ('content' in fallback) {
            // Shorten single tweet content
            fallback.content = fallback.content.substring(0, 200) + '...';
          }
          break;

        case 'no-hashtags':
          if ('content' in fallback) {
            fallback.content = fallback.content.replace(/#\w+/g, '').trim();
          } else if ('tweets' in fallback) {
            fallback.tweets = fallback.tweets.map(tweet =>
              tweet.replace(/#\w+/g, '').trim()
            );
          }
          break;

        case 'different-hook':
          if ('content' in fallback) {
            fallback.content = `Here's what I learned: ${fallback.content}`;
          } else if ('tweets' in fallback && fallback.tweets.length > 0) {
            fallback.tweets[0] = `🧵 Thread: ${fallback.tweets[0]}`;
          }
          break;

        case 'simplified':
          if ('content' in fallback) {
            fallback.content = fallback.content
              .replace(/[🔥💡⚡🚀🎯]/g, '')
              .replace(/\*\*(.*?)\*\*/g, '$1')
              .trim();
          } else if ('tweets' in fallback) {
            fallback.tweets = fallback.tweets.map(tweet =>
              tweet
                .replace(/[🔥💡⚡🚀🎯]/g, '')
                .replace(/\*\*(.*?)\*\*/g, '$1')
                .trim()
            );
          }
          break;
      }

      fallbacks.push(fallback);
    });

    return fallbacks;
  }

  /**
   * Validates Twitter content against platform constraints
   *
   * @param config - Twitter post or thread configuration
   * @returns Validation result with any issues found
   */
  static validateContent(config: TwitterPostConfig | TwitterThreadConfig): {
    valid: boolean;
    issues: string[];
  } {
    const issues: string[] = [];

    try {
      if ('tweets' in config) {
        TwitterThreadConfigSchema.parse(config);

        // Additional thread validations
        if (config.tweets.length > 25) {
          issues.push('Thread too long (max 25 tweets recommended)');
        }

        config.tweets.forEach((tweet, index) => {
          if (tweet.length === 0) {
            issues.push(`Tweet ${index + 1} is empty`);
          }
        });
      } else {
        TwitterPostConfigSchema.parse(config);

        if (config.content.length === 0) {
          issues.push('Tweet content is empty');
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        issues.push(error.message);
      }
    }

    // Check for common shadow ban triggers
    const content = 'tweets' in config ? config.tweets.join(' ') : config.content;

    if (content.includes('http://') || content.includes('https://')) {
      issues.push('Direct links may trigger spam filters - consider using link in bio or thread comments');
    }

    const hashtagCount = (content.match(/#\w+/g) || []).length;
    if (hashtagCount > 5) {
      issues.push(`Too many hashtags (${hashtagCount}) - recommend max 3-5 for optimal engagement`);
    }

    return {
      valid: issues.length === 0,
      issues
    };
  }

  // ========================================
  // TWITTER DATA MANAGEMENT METHODS
  // ========================================

  /**
   * Creates Task tool parameters for Twitter search operations
   *
   * @param searchConfig - Twitter search configuration
   * @param instruction - Optional custom instruction for the subagent
   * @returns Task tool parameters for Twitter search
   */
  static createSearchPrompt(
    searchConfig: TwitterSearchConfig,
    instruction?: string
  ): {
    description: string;
    prompt: string;
    subagent_type: string;
  } {
    // Validate search configuration
    TwitterSearchConfigSchema.parse(searchConfig);

    const defaultInstruction = 'Execute advanced Twitter search with comprehensive data analysis and insights generation.';
    const searchConfigJson = JSON.stringify(searchConfig, null, 2);

    const prompt = `${instruction || defaultInstruction}

**Search Configuration:**
\`\`\`json
${searchConfigJson}
\`\`\`

**Search Instructions:**
- Use TWITTER_SEARCH with advanced query operators and filters
- Apply all specified search parameters (dates, engagement thresholds, media filters)
- Extract comprehensive tweet data including metrics, context, and user information
- Analyze search results for patterns, trends, and engagement opportunities
- Identify high-value content for potential interaction or learning
- Generate insights about trending topics, hashtag performance, and viral patterns
- Provide recommendations for content strategy based on search findings
- Track rate limits and optimize search efficiency

**Analysis Requirements:**
- Categorize results by engagement level and content type
- Identify influencers and key voices in the search results
- Extract trending hashtags and topics from the results
- Analyze optimal posting times based on high-performing content
- Provide competitive intelligence insights
- Generate actionable recommendations for engagement and content strategy

Apply your comprehensive Twitter data management expertise to deliver valuable insights and actionable intelligence from the search results.`;

    return {
      description: `Twitter search: ${searchConfig.query}`,
      prompt: prompt.trim(),
      subagent_type: 'twitter-poster'
    };
  }

  /**
   * Creates Task tool parameters for Twitter user profile analysis
   *
   * @param username - Twitter username to analyze
   * @param includeMetrics - Whether to include detailed analytics
   * @param instruction - Optional custom instruction
   * @returns Task tool parameters for user profile analysis
   */
  static createUserProfilePrompt(
    username: string,
    includeMetrics: boolean = true,
    instruction?: string
  ): {
    description: string;
    prompt: string;
    subagent_type: string;
  } {
    const defaultInstruction = 'Analyze Twitter user profile with comprehensive metrics and engagement insights.';

    const prompt = `${instruction || defaultInstruction}

**User Analysis Request:**
- Target Username: @${username}
- Include Detailed Metrics: ${includeMetrics}

**Analysis Instructions:**
- Use TWITTER_GET_USER_PROFILE to extract comprehensive user data
- Analyze profile completeness, branding, and optimization
- Extract follower demographics and engagement patterns
${includeMetrics ? `- Calculate engagement rates, tweet frequency, and growth trends
- Analyze top-performing content and optimal posting times
- Identify content categories and hashtag usage patterns
- Generate audience insights and demographic analysis` : ''}
- Assess account credibility and influence metrics
- Identify collaboration and networking opportunities

**Deliverables:**
- Complete user profile summary with key statistics
- Engagement analysis and performance metrics
- Content strategy insights and recommendations
- Audience overlap analysis (if relevant)
- Collaboration potential assessment
- Growth opportunity identification

Provide comprehensive user intelligence that enables strategic engagement and relationship building.`;

    return {
      description: `User profile analysis: @${username}`,
      prompt: prompt.trim(),
      subagent_type: 'twitter-poster'
    };
  }

  /**
   * Creates Task tool parameters for Twitter follower analysis
   *
   * @param username - Username to analyze followers for
   * @param maxFollowers - Maximum number of followers to analyze
   * @param analysisType - Type of follower analysis
   * @returns Task tool parameters for follower analysis
   */
  static createFollowersPrompt(
    username: string,
    maxFollowers: number = 100,
    analysisType: 'demographics' | 'engagement' | 'influence' | 'all' = 'all',
    instruction?: string
  ): {
    description: string;
    prompt: string;
    subagent_type: string;
  } {
    const defaultInstruction = 'Analyze Twitter followers with demographic and engagement insights for strategic targeting.';

    const prompt = `${instruction || defaultInstruction}

**Follower Analysis Request:**
- Target Username: @${username}
- Max Followers to Analyze: ${maxFollowers}
- Analysis Type: ${analysisType}

**Analysis Instructions:**
- Use TWITTER_GET_FOLLOWERS to extract follower data
- Analyze follower profiles for demographics and interests
- Identify high-value followers based on engagement and influence
- Categorize followers by industry, interests, and activity level
${analysisType === 'demographics' || analysisType === 'all' ? `- Extract demographic patterns (location, bio keywords, profile optimization)
- Identify industry clusters and professional backgrounds` : ''}
${analysisType === 'engagement' || analysisType === 'all' ? `- Analyze follower engagement patterns and tweet frequency
- Identify most active and influential followers` : ''}
${analysisType === 'influence' || analysisType === 'all' ? `- Rank followers by influence metrics and network reach
- Identify potential collaboration partners and advocates` : ''}

**Deliverables:**
- Follower demographics and segmentation analysis
- High-value follower identification and contact recommendations
- Engagement opportunity mapping
- Audience insights for content strategy optimization
- Network growth strategies and recommendations

Generate actionable follower intelligence for strategic engagement and community building.`;

    return {
      description: `Follower analysis: @${username} (${maxFollowers} followers)`,
      prompt: prompt.trim(),
      subagent_type: 'twitter-poster'
    };
  }

  /**
   * Creates Task tool parameters for Twitter like operations
   *
   * @param operations - Array of like operations to perform
   * @param instruction - Optional custom instruction
   * @returns Task tool parameters for like operations
   */
  static createLikePrompt(
    operations: TwitterLikeOperation[],
    instruction?: string
  ): {
    description: string;
    prompt: string;
    subagent_type: string;
  } {
    const defaultInstruction = 'Execute strategic Twitter like operations with engagement optimization and rate limit management.';
    const operationsJson = JSON.stringify(operations, null, 2);

    const prompt = `${instruction || defaultInstruction}

**Like Operations:**
\`\`\`json
${operationsJson}
\`\`\`

**Operation Instructions:**
- Use TWITTER_LIKE_TWEET for each like/unlike operation
- Implement intelligent rate limiting to respect API limits
- Track success rates and handle errors gracefully
- Analyze target tweets for engagement value before liking
- Avoid spam-like behavior patterns
- Monitor account health and engagement authenticity
- Generate engagement analytics and performance tracking

**Strategic Considerations:**
- Prioritize high-value content that aligns with brand/interests
- Maintain natural engagement patterns and timing
- Track reciprocal engagement and relationship building
- Monitor engagement impact on follower growth and reach
- Provide recommendations for optimizing future engagement strategies

Execute like operations while maintaining authentic engagement patterns and maximizing strategic value.`;

    return {
      description: `Like operations (${operations.length} tweets)`,
      prompt: prompt.trim(),
      subagent_type: 'twitter-poster'
    };
  }

  /**
   * Creates Task tool parameters for Twitter retweet operations
   *
   * @param operations - Array of retweet operations
   * @param instruction - Optional custom instruction
   * @returns Task tool parameters for retweet operations
   */
  static createRetweetPrompt(
    operations: TwitterRetweetOperation[],
    instruction?: string
  ): {
    description: string;
    prompt: string;
    subagent_type: string;
  } {
    const defaultInstruction = 'Execute strategic Twitter retweet operations with content curation and engagement optimization.';
    const operationsJson = JSON.stringify(operations, null, 2);

    const prompt = `${instruction || defaultInstruction}

**Retweet Operations:**
\`\`\`json
${operationsJson}
\`\`\`

**Operation Instructions:**
- Use TWITTER_RETWEET for each retweet/unretweet operation
- For quote retweets, add strategic commentary that adds value
- Maintain content curation quality and brand alignment
- Implement rate limiting and natural engagement timing
- Track performance of retweeted content
- Monitor engagement and reach amplification

**Content Curation Strategy:**
- Ensure retweeted content aligns with audience interests
- Add valuable commentary for quote retweets
- Balance promotional and educational content
- Track which retweets drive the most engagement
- Maintain authentic voice and perspective in quote tweets
- Generate analytics on retweet performance and audience response

Execute retweet operations as part of strategic content curation and community engagement.`;

    return {
      description: `Retweet operations (${operations.length} tweets)`,
      prompt: prompt.trim(),
      subagent_type: 'twitter-poster'
    };
  }

  /**
   * Creates Task tool parameters for Twitter reply operations
   *
   * @param operations - Array of reply operations
   * @param instruction - Optional custom instruction
   * @returns Task tool parameters for reply operations
   */
  static createReplyPrompt(
    operations: TwitterReplyOperation[],
    instruction?: string
  ): {
    description: string;
    prompt: string;
    subagent_type: string;
  } {
    const defaultInstruction = 'Execute strategic Twitter reply operations with authentic engagement and relationship building.';
    const operationsJson = JSON.stringify(operations, null, 2);

    const prompt = `${instruction || defaultInstruction}

**Reply Operations:**
\`\`\`json
${operationsJson}
\`\`\`

**Reply Instructions:**
- Use TWITTER_REPLY for each reply operation
- Craft authentic, valuable responses that contribute to conversations
- Maintain professional and helpful tone aligned with brand voice
- Add genuine insights, questions, or support to discussions
- Avoid generic or spammy reply patterns
- Build meaningful relationships through thoughtful engagement

**Engagement Strategy:**
- Analyze original tweet context before crafting replies
- Provide valuable insights or ask thoughtful questions
- Reference specific points from the original tweet
- Maintain conversational flow and authentic personality
- Track reply engagement and conversation development
- Generate insights on most effective reply strategies and topics

Create replies that build authentic relationships and add genuine value to Twitter conversations.`;

    return {
      description: `Reply operations (${operations.length} tweets)`,
      prompt: prompt.trim(),
      subagent_type: 'twitter-poster'
    };
  }

  /**
   * Creates Task tool parameters for Twitter follow operations
   *
   * @param operations - Array of follow operations
   * @param instruction - Optional custom instruction
   * @returns Task tool parameters for follow operations
   */
  static createFollowPrompt(
    operations: TwitterFollowOperation[],
    instruction?: string
  ): {
    description: string;
    prompt: string;
    subagent_type: string;
  } {
    const defaultInstruction = 'Execute strategic Twitter follow operations with network building and relationship management.';
    const operationsJson = JSON.stringify(operations, null, 2);

    const prompt = `${instruction || defaultInstruction}

**Follow Operations:**
\`\`\`json
${operationsJson}
\`\`\`

**Follow Strategy Instructions:**
- Use TWITTER_FOLLOW for each follow/unfollow operation
- Analyze target user profiles before following for strategic alignment
- Maintain optimal following-to-follower ratio
- Implement natural follow patterns to avoid spam detection
- Track follow-back rates and engagement from new connections
- Build strategic network aligned with goals and audience

**Network Building Strategy:**
- Prioritize high-quality accounts aligned with interests/industry
- Maintain authentic following behavior and timing patterns
- Track reciprocal follows and engagement development
- Monitor network quality and engagement rates
- Generate insights on most effective follow strategies
- Provide recommendations for network growth and relationship building

Execute follow operations as part of strategic network building and community development.`;

    return {
      description: `Follow operations (${operations.length} users)`,
      prompt: prompt.trim(),
      subagent_type: 'twitter-poster'
    };
  }

  /**
   * Creates Task tool parameters for bulk Twitter operations
   *
   * @param bulkConfig - Bulk operation configuration
   * @param instruction - Optional custom instruction
   * @returns Task tool parameters for bulk operations
   */
  static createBulkOperationPrompt(
    bulkConfig: TwitterBulkOperationConfig,
    instruction?: string
  ): {
    description: string;
    prompt: string;
    subagent_type: string;
  } {
    const defaultInstruction = 'Execute bulk Twitter operations with advanced automation, rate limiting, and performance optimization.';
    const configJson = JSON.stringify(bulkConfig, null, 2);

    const prompt = `${instruction || defaultInstruction}

**Bulk Operations Configuration:**
\`\`\`json
${configJson}
\`\`\`

**Bulk Execution Instructions:**
- Execute operations in parallel while respecting rate limits
- Implement intelligent batching and queue management
- Apply filters to avoid duplicate operations and improve targeting
- Monitor rate limit status and adjust execution speed dynamically
- Track success rates, failures, and skip reasons
- Generate comprehensive execution reports and analytics

**Advanced Automation Features:**
- Implement retry logic for failed operations with exponential backoff
- Apply safety checks to prevent spam-like behavior patterns
- Monitor account health and engagement authenticity throughout execution
- Track reciprocal engagement and relationship building outcomes
- Generate insights on operation effectiveness and optimization opportunities
- Provide recommendations for future bulk operation strategies

**Performance Optimization:**
- Balance speed with account safety and rate limit compliance
- Optimize operation order for maximum effectiveness
- Monitor and adjust concurrency based on API response times
- Track and report on ROI and engagement improvements
- Implement intelligent filtering to focus on high-value targets

Execute bulk operations with enterprise-grade automation while maintaining account safety and maximizing strategic value.`;

    return {
      description: `Bulk operations (${bulkConfig.operations.length} total)`,
      prompt: prompt.trim(),
      subagent_type: 'twitter-poster'
    };
  }

  /**
   * Creates Task tool parameters for Twitter analytics and reporting
   *
   * @param analyticsConfig - Analytics configuration
   * @param instruction - Optional custom instruction
   * @returns Task tool parameters for analytics generation
   */
  static createAnalyticsPrompt(
    analyticsConfig: TwitterAnalyticsConfig,
    instruction?: string
  ): {
    description: string;
    prompt: string;
    subagent_type: string;
  } {
    const defaultInstruction = 'Generate comprehensive Twitter analytics report with actionable insights and strategic recommendations.';
    const configJson = JSON.stringify(analyticsConfig, null, 2);

    const prompt = `${instruction || defaultInstruction}

**Analytics Configuration:**
\`\`\`json
${configJson}
\`\`\`

**Analytics Generation Instructions:**
- Extract comprehensive performance data for the specified timeframe
- Calculate engagement rates, reach metrics, and growth indicators
- Analyze content performance patterns and identify top performers
- Generate audience insights and demographic analysis
- Track hashtag performance and trending topic engagement
- Identify optimal posting times and content strategies

**Advanced Analytics Features:**
- Perform competitive analysis and benchmarking
- Generate predictive insights for future content performance
- Analyze viral content patterns and success factors
- Track follower quality and engagement authenticity
- Calculate ROI metrics for content and engagement strategies
- Identify growth opportunities and optimization areas

**Reporting Requirements:**
- Generate executive summary with key insights and recommendations
- Create detailed performance breakdowns by content type and time period
- Provide actionable recommendations for improving engagement and reach
- Export data in requested format for further analysis
- Include trend analysis and forecast projections
- Highlight significant changes and anomalies in performance

Deliver comprehensive analytics that drive strategic decision-making and performance optimization.`;

    return {
      description: `Analytics report (${analyticsConfig.timeframe.start.toDateString()} - ${analyticsConfig.timeframe.end.toDateString()})`,
      prompt: prompt.trim(),
      subagent_type: 'twitter-poster'
    };
  }

  /**
   * Creates Task tool parameters for Twitter content management operations
   *
   * @param operation - Content management operation configuration
   * @param instruction - Optional custom instruction
   * @returns Task tool parameters for content management
   */
  static createContentManagementPrompt(
    operation: TwitterContentManagementOperation,
    instruction?: string
  ): {
    description: string;
    prompt: string;
    subagent_type: string;
  } {
    const defaultInstruction = 'Execute Twitter content management operations with intelligent filtering and safety measures.';
    const operationJson = JSON.stringify(operation, null, 2);

    const prompt = `${instruction || defaultInstruction}

**Content Management Operation:**
\`\`\`json
${operationJson}
\`\`\`

**Management Instructions:**
- Apply content filters to identify target tweets based on specified criteria
- Execute ${operation.action} operations on matching content
${operation.dryRun ? '- IMPORTANT: This is a DRY RUN - analyze and report but do not execute destructive operations' : '- Execute operations with proper safety checks and confirmation'}
- Generate detailed reports on affected content and operation results
- Implement rollback capabilities for critical operations

**Safety and Verification:**
- Implement multiple confirmation steps for destructive operations
- Provide detailed preview of affected content before execution
- Track operation history and maintain audit trails
- Generate backup information for content before deletion/modification
- Implement rate limiting to avoid triggering platform restrictions

**Reporting Requirements:**
- Generate comprehensive operation summary with affected content details
- Provide before/after analysis for performance-impacting changes
- Track operation success rates and identify any failures
- Generate recommendations for future content management strategies
- Export operation logs and affected content data for review

Execute content management operations with enterprise-grade safety measures and comprehensive reporting.`;

    return {
      description: `Content management: ${operation.action} operation`,
      prompt: prompt.trim(),
      subagent_type: 'twitter-poster'
    };
  }
}