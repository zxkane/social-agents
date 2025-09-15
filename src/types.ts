import { z } from 'zod';

// Reddit post configuration schema
export const RedditPostConfigSchema = z.object({
  subreddit: z.string().min(1, 'Subreddit is required'),
  title: z.string().min(1, 'Title is required').max(300, 'Title too long'),
  content: z.string().optional(),
  url: z.string().url().optional(),
  flair: z.string().optional(),
  nsfw: z.boolean().optional().default(false),
  spoiler: z.boolean().optional().default(false),
  sendReplies: z.boolean().optional().default(true),
});

export interface RedditPostConfig {
  subreddit: string;
  title: string;
  content?: string;
  url?: string;
  flair?: string;
  nsfw?: boolean;
  spoiler?: boolean;
  sendReplies?: boolean;
}

// Content optimization configuration
export const ContentOptimizationSchema = z.object({
  maxLength: z.number().default(500),
  removeExternalLinks: z.boolean().default(true),
  addDiscussionHooks: z.boolean().default(true),
  simplifyLanguage: z.boolean().default(true),
  targetAudience: z.enum(['technical', 'general', 'mixed']).default('mixed'),
});

export type ContentOptimization = z.infer<typeof ContentOptimizationSchema>;

// Subreddit configuration
export const SubredditConfigSchema = z.object({
  name: z.string(),
  culture: z.enum(['technical', 'casual', 'professional', 'academic']),
  allowedPostTypes: z.array(z.enum(['text', 'link', 'image', 'video'])),
  requiresFlair: z.boolean().default(false),
  maxTitleLength: z.number().default(300),
  spamFilterSensitivity: z.enum(['low', 'medium', 'high']).default('medium'),
  bestPostingTimes: z.array(z.number()).optional(), // Hours in UTC
});

export type SubredditConfig = z.infer<typeof SubredditConfigSchema>;

// Reddit posting result
export interface RedditPostResult {
  success: boolean;
  postId?: string;
  url?: string;
  error?: string;
  filtered?: boolean;
  subreddit: string;
  title: string;
}

// Flair information
export interface RedditFlair {
  id: string;
  text: string;
  textColor: string;
  backgroundColor: string;
  type: 'text' | 'richtext';
}

// Posting strategy
export interface PostingStrategy {
  primaryContent: RedditPostConfig;
  fallbackVersions: RedditPostConfig[];
  subredditTargets: string[];
  optimization: ContentOptimization;
}

// MCP tool response types (based on RUBE server tools mentioned in the agent)
export interface RedditFlairResponse {
  flairs: RedditFlair[];
  subreddit: string;
}

export interface RedditCreatePostResponse {
  success: boolean;
  postId?: string;
  url?: string;
  error?: string;
  filtered?: boolean;
}