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

// Twitter/X post configuration schema
export const TwitterPostConfigSchema = z.object({
  content: z.string().min(1, 'Content is required').max(280, 'Content too long for single tweet'),
  mediaUrls: z.array(z.string().url()).optional(),
  scheduledAt: z.date().optional(),
  replyTo: z.string().optional(), // Tweet ID to reply to
  quoteTweet: z.string().optional(), // Tweet ID to quote
  sensitive: z.boolean().optional().default(false),
  allowReplies: z.boolean().optional().default(true),
});

export interface TwitterPostConfig {
  content: string;
  mediaUrls?: string[];
  scheduledAt?: Date;
  replyTo?: string;
  quoteTweet?: string;
  sensitive?: boolean;
  allowReplies?: boolean;
}

// Twitter thread configuration
export const TwitterThreadConfigSchema = z.object({
  tweets: z.array(z.string().max(280)).min(2, 'Thread requires at least 2 tweets'),
  mediaUrls: z.array(z.string().url()).optional(),
  scheduledAt: z.date().optional(),
  threadHook: z.string().max(280).optional(), // First tweet hook
  threadConclusion: z.string().max(280).optional(), // Final tweet CTA
  sensitive: z.boolean().optional().default(false),
});

export interface TwitterThreadConfig {
  tweets: string[];
  mediaUrls?: string[];
  scheduledAt?: Date;
  threadHook?: string;
  threadConclusion?: string;
  sensitive?: boolean;
}

// Twitter engagement configuration
export const TwitterEngagementConfigSchema = z.object({
  useHashtags: z.boolean().default(true),
  maxHashtags: z.number().min(1).max(10).default(3),
  includePolls: z.boolean().default(false),
  engagementBait: z.boolean().default(false),
  trendingTopics: z.boolean().default(true),
  optimalTiming: z.boolean().default(true),
});

export type TwitterEngagementConfig = z.infer<typeof TwitterEngagementConfigSchema>;

// Twitter media configuration
export const TwitterMediaConfigSchema = z.object({
  type: z.enum(['image', 'video', 'gif']),
  url: z.string().url(),
  altText: z.string().optional(),
  sensitive: z.boolean().default(false),
});

export interface TwitterMediaConfig {
  type: 'image' | 'video' | 'gif';
  url: string;
  altText?: string;
  sensitive?: boolean;
}

// Twitter posting result
export interface TwitterPostResult {
  success: boolean;
  tweetId?: string;
  url?: string;
  error?: string;
  shadowBanned?: boolean;
  engagementScore?: number;
  reach?: number;
}

// Twitter thread result
export interface TwitterThreadResult {
  success: boolean;
  threadId?: string;
  tweetIds?: string[];
  mainUrl?: string;
  error?: string;
  totalTweets?: number;
}

// Twitter trending topics
export interface TwitterTrend {
  name: string;
  query: string;
  tweetVolume?: number;
  promoted?: boolean;
  location?: string;
}

// Twitter hashtag strategy
export interface TwitterHashtagStrategy {
  trending: string[];
  niche: string[];
  community: string[];
  branded: string[];
  recommended: string[];
}

// Twitter posting strategy
export interface TwitterPostingStrategy {
  primaryContent: TwitterPostConfig | TwitterThreadConfig;
  fallbackVersions: (TwitterPostConfig | TwitterThreadConfig)[];
  engagementConfig: TwitterEngagementConfig;
  hashtagStrategy: TwitterHashtagStrategy;
  optimalTiming: Date[];
}

// MCP tool response types for Twitter (based on RUBE server tools)
export interface TwitterTrendsResponse {
  trends: TwitterTrend[];
  location: string;
  timestamp: Date;
}

export interface TwitterCreateTweetResponse {
  success: boolean;
  tweetId?: string;
  url?: string;
  error?: string;
  shadowBanned?: boolean;
}

export interface TwitterCreateThreadResponse {
  success: boolean;
  threadId?: string;
  tweetIds?: string[];
  mainUrl?: string;
  error?: string;
  totalTweets?: number;
}

// Twitter Search Configuration
export const TwitterSearchConfigSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  maxResults: z.number().min(1).max(100).default(20),
  sinceDate: z.date().optional(),
  untilDate: z.date().optional(),
  lang: z.string().optional(),
  includeRetweets: z.boolean().default(true),
  minLikes: z.number().min(0).optional(),
  minRetweets: z.number().min(0).optional(),
  hasImages: z.boolean().optional(),
  hasVideos: z.boolean().optional(),
  fromUser: z.string().optional(),
  toUser: z.string().optional(),
  sortBy: z.enum(['recent', 'popular', 'mixed']).default('recent'),
});

export interface TwitterSearchConfig {
  query: string;
  maxResults?: number;
  sinceDate?: Date;
  untilDate?: Date;
  lang?: string;
  includeRetweets?: boolean;
  minLikes?: number;
  minRetweets?: number;
  hasImages?: boolean;
  hasVideos?: boolean;
  fromUser?: string;
  toUser?: string;
  sortBy?: 'recent' | 'popular' | 'mixed';
}

// Twitter User Profile
export interface TwitterUserProfile {
  id: string;
  username: string;
  displayName: string;
  bio?: string;
  location?: string;
  website?: string;
  profileImageUrl?: string;
  bannerImageUrl?: string;
  followersCount: number;
  followingCount: number;
  tweetsCount: number;
  likesCount: number;
  verified: boolean;
  protected: boolean;
  createdAt: Date;
  metrics?: TwitterUserMetrics;
}

export interface TwitterUserMetrics {
  engagementRate: number;
  averageLikesPerTweet: number;
  averageRetweetsPerTweet: number;
  tweetFrequency: number; // tweets per day
  topHashtags: string[];
  peakActivityHours: number[];
}

// Twitter Tweet Details
export interface TwitterTweetDetails {
  id: string;
  text: string;
  authorId: string;
  authorUsername: string;
  createdAt: Date;
  publicMetrics: {
    retweetCount: number;
    likeCount: number;
    replyCount: number;
    quoteCount: number;
    bookmarkCount?: number;
    impressionCount?: number;
  };
  contextAnnotations?: Array<{
    domain: { id: string; name: string; description: string };
    entity: { id: string; name: string; description?: string };
  }>;
  attachments?: {
    mediaKeys?: string[];
    pollIds?: string[];
  };
  referencedTweets?: Array<{
    type: 'retweeted' | 'quoted' | 'replied_to';
    id: string;
  }>;
  hashtags?: string[];
  mentions?: Array<{ username: string; id: string }>;
  urls?: Array<{ url: string; expandedUrl: string; displayUrl: string }>;
  lang?: string;
  possiblySensitive?: boolean;
}

// Twitter Search Results
export interface TwitterSearchResults {
  tweets: TwitterTweetDetails[];
  users?: TwitterUserProfile[];
  nextToken?: string;
  resultCount: number;
  totalResults?: number;
  searchQuery: string;
  searchMeta: {
    executionTime: number;
    rateLimitRemaining: number;
    oldestId?: string;
    newestId?: string;
  };
}

// Twitter Interaction Operations
export interface TwitterLikeOperation {
  tweetId: string;
  action: 'like' | 'unlike';
}

export interface TwitterRetweetOperation {
  tweetId: string;
  action: 'retweet' | 'unretweet';
  quote?: string; // For quote tweets
}

export interface TwitterFollowOperation {
  userId: string;
  username?: string;
  action: 'follow' | 'unfollow';
}

export interface TwitterReplyOperation {
  tweetId: string;
  replyText: string;
  mediaUrls?: string[];
}

// Twitter Bulk Operations
export interface TwitterBulkOperationConfig {
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

export interface TwitterBulkOperationResult {
  totalOperations: number;
  successfulOperations: number;
  failedOperations: number;
  skippedOperations: number;
  results: Array<{
    operation: TwitterLikeOperation | TwitterRetweetOperation | TwitterFollowOperation;
    success: boolean;
    error?: string;
    skipped?: boolean;
    skipReason?: string;
  }>;
  rateLimitStatus: {
    remaining: number;
    resetTime: Date;
  };
}

// Twitter Analytics Configuration
export interface TwitterAnalyticsConfig {
  timeframe: {
    start: Date;
    end: Date;
  };
  metrics: Array<'impressions' | 'engagements' | 'likes' | 'retweets' | 'replies' | 'followers' | 'reach'>;
  breakdown?: Array<'day' | 'hour' | 'hashtag' | 'mention' | 'media_type'>;
  includeComparison?: boolean;
  exportFormat?: 'json' | 'csv' | 'excel';
}

export interface TwitterAnalyticsReport {
  summary: {
    totalTweets: number;
    totalImpressions: number;
    totalEngagements: number;
    engagementRate: number;
    followerGrowth: number;
    topPerformingTweet: TwitterTweetDetails;
  };
  timeline: Array<{
    date: Date;
    tweets: number;
    impressions: number;
    engagements: number;
    followers: number;
  }>;
  topHashtags: Array<{
    hashtag: string;
    usage: number;
    avgEngagement: number;
  }>;
  audienceInsights: {
    demographics?: Record<string, number>;
    interests?: Record<string, number>;
    activeHours?: Record<string, number>;
  };
  recommendations: string[];
}

// Twitter Content Management
export interface TwitterContentFilter {
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

export interface TwitterContentManagementOperation {
  action: 'delete' | 'archive' | 'update' | 'analyze';
  filter: TwitterContentFilter;
  dryRun?: boolean;
}

export interface TwitterContentManagementResult {
  operation: TwitterContentManagementOperation;
  affectedTweets: TwitterTweetDetails[];
  totalMatched: number;
  totalProcessed: number;
  errors: Array<{ tweetId: string; error: string }>;
  summary: string;
}

// MCP Response Types for New Operations
export interface TwitterSearchResponse {
  success: boolean;
  data?: TwitterSearchResults;
  error?: string;
  rateLimitRemaining?: number;
}

export interface TwitterUserProfileResponse {
  success: boolean;
  data?: TwitterUserProfile;
  error?: string;
  rateLimitRemaining?: number;
}

export interface TwitterFollowersResponse {
  success: boolean;
  data?: {
    users: TwitterUserProfile[];
    nextToken?: string;
    totalCount?: number;
  };
  error?: string;
  rateLimitRemaining?: number;
}

export interface TwitterInteractionResponse {
  success: boolean;
  data?: {
    liked?: boolean;
    retweeted?: boolean;
    followed?: boolean;
    replied?: boolean;
    tweetId?: string;
    userId?: string;
  };
  error?: string;
  rateLimitRemaining?: number;
}

export interface TwitterAnalyticsResponse {
  success: boolean;
  data?: TwitterAnalyticsReport;
  error?: string;
  generatedAt: Date;
}

export interface TwitterDeleteResponse {
  success: boolean;
  deletedTweetId?: string;
  error?: string;
}