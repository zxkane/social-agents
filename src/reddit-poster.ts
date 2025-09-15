/**
 * Reddit Poster - Headless mode helpers for the reddit-poster subagent
 *
 * This provides utilities for generating headless Claude Code commands
 * to invoke the reddit-poster subagent defined in .claude/agents/reddit-poster.md
 */

import {
  RedditPostConfig,
  ContentOptimization,
  RedditPostConfigSchema,
  ContentOptimizationSchema
} from './types.js';

/**
 * Utility class for generating reddit-poster subagent commands in headless mode
 */
export class RedditPoster {
  /**
   * Create the correct Task tool prompt for the reddit-poster subagent
   */
  static createSubagentPrompt(config: RedditPostConfig, instruction?: string): {
    description: string;
    prompt: string;
    subagent_type: string;
  } {
    const baseInstruction = instruction || 'Create a Reddit post using expert posting strategies';

    return {
      description: `Reddit post for r/${config.subreddit}`,
      prompt: `${baseInstruction}

**Post Details:**
- Subreddit: r/${config.subreddit}
- Title: ${config.title}
- Content: ${config.content || 'Text post'}
${config.flair ? `- Flair: ${config.flair}` : ''}
${config.url ? `- URL: ${config.url}` : ''}
- NSFW: ${config.nsfw || false}
- Spoiler: ${config.spoiler || false}
- Send Replies: ${config.sendReplies ?? true}

Apply your Reddit posting expertise to optimize this content for the target community, avoid spam filters, and maximize engagement.`,
      subagent_type: 'reddit-poster'
    };
  }

  /**
   * Generate headless Claude Code command for reddit-poster subagent
   */
  static generateHeadlessCommand(config: RedditPostConfig, instruction?: string): string {
    const taskParams = RedditPoster.createSubagentPrompt(config, instruction);

    const headlessPrompt = `Use the Task tool to invoke the reddit-poster subagent:

Task({
  description: "${taskParams.description}",
  subagent_type: "${taskParams.subagent_type}",
  prompt: \`${taskParams.prompt}\`
})`;

    return `claude -p "${headlessPrompt}" --output-format json --allowedTools "Task" --permission-mode acceptEdits`;
  }

  /**
   * Validate Reddit post configuration
   */
  static validateConfig(config: RedditPostConfig): { valid: boolean; error?: string } {
    const result = RedditPostConfigSchema.safeParse(config);
    return {
      valid: result.success,
      error: result.success ? undefined : result.error.message
    };
  }

  /**
   * Optimize content for Reddit posting to avoid spam filters
   */
  static optimizeContent(
    title: string,
    content: string,
    optimization: ContentOptimization
  ): { optimizedTitle: string; optimizedContent: string } {
    let optimizedTitle = title;
    let optimizedContent = content;

    // Remove external links if requested
    if (optimization.removeExternalLinks) {
      const urlRegex = /https?:\/\/[^\s]+/g;
      optimizedContent = optimizedContent.replace(urlRegex, '');
      optimizedTitle = optimizedTitle.replace(urlRegex, '');
    }

    // Truncate content if too long
    if (optimizedContent.length > optimization.maxLength) {
      optimizedContent = optimizedContent.substring(0, optimization.maxLength - 3) + '...';
    }

    // Add discussion hooks
    if (optimization.addDiscussionHooks && !optimizedContent.includes('?')) {
      const discussionHooks = [
        "What are your thoughts on this?",
        "Has anyone else experienced this?",
        "What would you do differently?",
        "Any suggestions or feedback?"
      ];
      const randomHook = discussionHooks[Math.floor(Math.random() * discussionHooks.length)];
      optimizedContent += `\n\n${randomHook}`;
    }

    // Simplify language for general audiences
    if (optimization.simplifyLanguage && optimization.targetAudience !== 'technical') {
      const simplifications: Record<string, string> = {
        'implementation': 'setup',
        'optimization': 'improvement',
        'architecture': 'design',
        'infrastructure': 'system',
        'deployment': 'launch'
      };

      for (const [technical, simple] of Object.entries(simplifications)) {
        const regex = new RegExp(technical, 'gi');
        optimizedContent = optimizedContent.replace(regex, simple);
        optimizedTitle = optimizedTitle.replace(regex, simple);
      }
    }

    return {
      optimizedTitle: optimizedTitle.trim(),
      optimizedContent: optimizedContent.trim()
    };
  }

  /**
   * Generate fallback versions of content for spam filter avoidance
   */
  static generateFallbackVersions(
    originalConfig: RedditPostConfig,
    count: number = 2
  ): RedditPostConfig[] {
    const fallbacks: RedditPostConfig[] = [];

    for (let i = 0; i < count; i++) {
      const { optimizedTitle, optimizedContent } = RedditPoster.optimizeContent(
        originalConfig.title,
        originalConfig.content || '',
        {
          maxLength: 400 - (i * 50), // Progressive shortening
          removeExternalLinks: true,
          addDiscussionHooks: true,
          simplifyLanguage: true,
          targetAudience: i === 0 ? 'mixed' : 'general'
        }
      );

      fallbacks.push({
        ...originalConfig,
        title: optimizedTitle,
        content: optimizedContent,
        // Remove URL for fallback versions to avoid spam filters
        url: i > 0 ? undefined : originalConfig.url
      });
    }

    return fallbacks;
  }

  /**
   * Generate Task tool prompt for getting subreddit flairs
   */
  static createFlairPrompt(subreddit: string): {
    description: string;
    prompt: string;
    subagent_type: string;
  } {
    return {
      description: `Get flairs for r/${subreddit}`,
      subagent_type: 'reddit-poster',
      prompt: `Get and analyze available flairs for r/${subreddit}:

1. Use RUBE MCP server to fetch all available flairs for this subreddit
2. Categorize flairs by content type (Discussion, Help, Showcase, Question, etc.)
3. Recommend appropriate flairs for different post types
4. Provide flair selection guidelines

Return structured information with flair IDs, text, and usage recommendations.`
    };
  }

  /**
   * Generate Task tool prompt for content optimization
   */
  static createOptimizationPrompt(
    originalTitle: string,
    originalContent: string,
    targetSubreddit: string
  ): {
    description: string;
    prompt: string;
    subagent_type: string;
  } {
    return {
      description: `Optimize content for r/${targetSubreddit}`,
      subagent_type: 'reddit-poster',
      prompt: `Transform this content into authentic community discussion suitable for r/${targetSubreddit}:

**Original Content:**
Title: "${originalTitle}"
Content: "${originalContent}"

**Optimization Requirements:**
1. Remove all promotional language and external links
2. Convert from announcement/promotion to experience sharing
3. Add technical implementation details and genuine insights
4. Include authentic questions for community engagement
5. Focus on learning and problem-solving rather than product promotion
6. Adapt tone for r/${targetSubreddit} community culture
7. Apply anti-spam filter strategies
8. Add discussion hooks and technical depth

**Output Format:**
Provide optimized title and content that would generate valuable discussion while avoiding spam filter triggers. The result should read like a genuine developer sharing experience and seeking community input.`
    };
  }
}