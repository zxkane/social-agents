#!/usr/bin/env tsx

/**
 * Twitter SDK Executor - Direct MCP Integration
 * Uses Claude Code SDK with system prompts instead of subagent delegation
 */

import { query, type SDKMessage, type SDKSystemMessage, type SDKAssistantMessage, type SDKResultMessage, type McpServerConfig } from '@anthropic-ai/claude-code';
import { loadEnvironment, expandEnvironmentVariables, validateTwitterEnvironment } from './env-loader.js';
import * as fs from 'fs';
import * as path from 'path';

export interface TwitterOptions {
  dryRun: boolean;
  verbose: boolean;
}

export type MCPServersConfig = Record<string, McpServerConfig>;

/**
 * ★ Insight ─────────────────────────────────────
 * Direct MCP integration removes subagent delegation overhead
 * System prompts provide full context without predetermined workflows
 * Model-driven execution with no artificial limitations
 * ─────────────────────────────────────────────────
 */
export class TwitterSDKExecutor {

  /**
   * Load MCP server configuration from .mcp.json with environment variable expansion
   */
  private static loadMCPServers(): MCPServersConfig {
    const mcpPath = path.join(process.cwd(), '.mcp.json');

    if (!fs.existsSync(mcpPath)) {
      console.warn('⚠️  .mcp.json not found, using empty MCP configuration');
      return {};
    }

    try {
      const configContent = fs.readFileSync(mcpPath, 'utf-8');
      const env = loadEnvironment();

      // Expand environment variables in the configuration
      const expandedContent = expandEnvironmentVariables(configContent, env);
      const config = JSON.parse(expandedContent);

      if (config.mcpServers) {
        console.log(`🔌 Loaded ${Object.keys(config.mcpServers).length} MCP server(s)`);
        return config.mcpServers;
      }

      return {};
    } catch (error) {
      console.error(`❌ Failed to load .mcp.json: ${(error as Error).message}`);
      return {};
    }
  }

  /**
   * ★ Insight ─────────────────────────────────────
   * Handles MCP permission model by providing clear guidance
   * Falls back gracefully when RUBE tools require permission
   * Provides actionable solutions for users
   * ─────────────────────────────────────────────────
   */
  private static buildTwitterSystemPrompt(options: TwitterOptions): string {
    return `You are an expert Twitter operations specialist with comprehensive AI-driven capabilities.

CRITICAL: If you need permission to access RUBE MCP server tools, clearly explain:
1. That MCP tools require explicit permission in Claude Code
2. The user should grant permission when prompted for RUBE tool access
3. This enables access to 500+ applications including Twitter automation

If RUBE tools are not available, provide strategic guidance and simulated results for ${options.dryRun ? 'DRY RUN' : 'LIVE'} mode.

AVAILABLE OPERATIONS (when RUBE tools are accessible):
• Generate viral tweets, threads, and engaging content with strategic optimization
• Search and analyze Twitter posts, trends, and conversations
• Engage with tweets through likes, retweets, replies, and follows
• Build authentic community relationships and brand presence
• Monitor topics, hashtags, and mentions for comprehensive social listening
• Analyze sentiment, engagement metrics, and performance data

EXECUTION APPROACH:
1. Try to use RUBE_SEARCH_TOOLS to discover available Twitter tools
2. If permission is needed, explain the requirement clearly
3. If tools are accessible, execute operations using RUBE_MULTI_EXECUTE_TOOL
4. If tools are not accessible, provide strategic guidance and mock results
5. Always provide detailed results, insights, and actionable recommendations

OPERATIONAL MODE:
${options.dryRun ?
  '🔍 DRY RUN MODE: Preview all actions without executing them. Show what would be done.' :
  '🚀 LIVE MODE: Execute Twitter operations with real API calls when tools are available.'
}

${options.verbose ?
  '📊 VERBOSE MODE: Provide detailed logs, debugging information, and step-by-step execution details.' :
  '📋 STANDARD MODE: Show essential progress and results.'
}

FALLBACK STRATEGY (when RUBE tools need permission):
- Provide strategic Twitter operation plans
- Explain what tools would be used and how
- Give specific content examples and engagement strategies
- Include actionable next steps for when tools become available
- Maintain professional, helpful guidance throughout

BEST PRACTICES TO APPLY:
• Viral Content Creation: Use attention-grabbing hooks, curiosity gaps, and engagement triggers
• Strategic Hashtag Research: Find trending and relevant hashtags for maximum reach
• Algorithm Optimization: Time posts for optimal engagement and visibility
• Authentic Voice: Maintain genuine, helpful communication that builds community
• Rate Limiting: Respect platform limits and maintain account health
• Sentiment Analysis: Understand context and respond appropriately
• Performance Tracking: Monitor and analyze engagement metrics

Focus on delivering exceptional value whether through direct tool execution or strategic guidance.`;
  }

  /**
   * Main execution method for Twitter operations
   */
  static async execute(prompt: string, options: TwitterOptions): Promise<void> {
    console.log('🐦 Twitter SDK Executor - AI-Driven Operations');
    console.log('='.repeat(50));
    console.log(`📝 Request: ${prompt}`);
    console.log(`🔧 Mode: ${options.dryRun ? 'DRY RUN' : 'LIVE EXECUTION'}`);
    console.log('');

    // Validate environment
    const envValidation = validateTwitterEnvironment();
    if (!envValidation.valid) {
      console.error('❌ Environment validation failed!');
      console.error(`Missing required variables: ${envValidation.missing.join(', ')}`);
      console.error('Please check your .env.local or environment variables');
      process.exit(1);
    }

    try {
      // Load MCP configuration
      const mcpServers = this.loadMCPServers();
      const systemPrompt = this.buildTwitterSystemPrompt(options);

      if (options.verbose) {
        console.log('🔍 Debug Information:');
        console.log(`MCP Servers: ${Object.keys(mcpServers).join(', ')}`);
        console.log('─'.repeat(40));
      }

      console.log('🚀 Initializing AI-driven Twitter operations...\n');

      // Execute using Claude Code SDK with direct MCP integration
      const response = query({
        prompt: prompt,
        options: {
          appendSystemPrompt: systemPrompt,
          mcpServers: mcpServers,
          allowedTools: [
            'RUBE_SEARCH_TOOLS',
            'RUBE_MULTI_EXECUTE_TOOL',
            'RUBE_CREATE_PLAN',
            'RUBE_MANAGE_CONNECTIONS',
            'RUBE_REMOTE_WORKBENCH'
          ],
          cwd: process.cwd(),
          // No maxTurns limit - let the model determine the workflow
        }
      });

      // Process streaming responses
      let messageCount = 0;
      const startTime = Date.now();

      for await (const message of response) {
        messageCount++;
        await this.processMessage(message, options.verbose, messageCount);
      }

      const duration = Date.now() - startTime;
      console.log(`\n⏱️  Total execution time: ${duration}ms`);
      console.log(`📊 Processed ${messageCount} messages`);

    } catch (error) {
      console.error('\n❌ Execution failed:');
      console.error((error as Error).message);

      if (options.verbose) {
        console.error('\n🔍 Full error details:');
        console.error(error);
      }

      console.log('\n💡 Troubleshooting tips:');
      console.log('- If prompted for RUBE tool access, grant permission to enable Twitter operations');
      console.log('- Check your .env.local file has RUBE_API_TOKEN');
      console.log('- Verify .mcp.json configuration is valid');
      console.log('- Try running with --verbose for more details');
      console.log('- The system can provide strategic guidance even without direct tool access');

      process.exit(1);
    }
  }

  /**
   * ★ Insight ─────────────────────────────────────
   * Streaming message processing provides real-time feedback
   * Different message types require different handling approaches
   * Verbose mode enables detailed debugging and transparency
   * ─────────────────────────────────────────────────
   */
  private static async processMessage(
    message: SDKMessage,
    verbose: boolean,
    messageNumber: number
  ): Promise<void> {

    switch (message.type) {
      case 'system':
        if (verbose) {
          const sysMsg = message as SDKSystemMessage;
          if ('model' in sysMsg) {
            console.log(`🔧 System [${messageNumber}]: Initialized with model ${sysMsg.model}`);
          }

          if ('mcp_servers' in sysMsg && sysMsg.mcp_servers && sysMsg.mcp_servers.length > 0) {
            const serverStatus = sysMsg.mcp_servers
              .map((s: { name: string; status: string }) => `${s.name}(${s.status})`)
              .join(', ');
            console.log(`🔌 MCP Servers: ${serverStatus}`);
          }
        }
        break;

      case 'assistant':
        const assistantMsg = message as SDKAssistantMessage;
        if (assistantMsg.message.content) {
          let content: string;

          if (Array.isArray(assistantMsg.message.content)) {
            // Handle array of content blocks
            content = assistantMsg.message.content
              .filter((c: any) => c.type === 'text')
              .map((c: any) => c.text)
              .join('');
          } else {
            // Handle string content
            content = assistantMsg.message.content as string;
          }

          if (content.trim()) {
            if (verbose) {
              console.log(`🤖 Assistant [${messageNumber}]:`);
            }
            console.log(content);

            if (verbose) {
              console.log('─'.repeat(40));
            }
          }
        }
        break;

      case 'user':
        if (verbose) {
          console.log(`👤 User [${messageNumber}]: Input processed`);
        }
        break;

      case 'result':
        const resultMsg = message as SDKResultMessage;
        console.log(`\n🎯 Execution Result [${messageNumber}]:`);

        if (resultMsg.subtype === 'success') {
          console.log('✅ Operation completed successfully!');

          if ('result' in resultMsg) {
            console.log('\n📋 Final Output:');
            console.log(resultMsg.result);
          }
        } else {
          console.log(`❌ Operation failed: ${resultMsg.subtype}`);
        }

        if (verbose && 'usage' in resultMsg) {
          console.log(`\n📊 Usage Statistics:`);
          console.log(`💰 Cost: $${resultMsg.total_cost_usd}`);
          console.log(`📈 Tokens: ${resultMsg.usage.input_tokens} input, ${resultMsg.usage.output_tokens} output`);
          console.log(`🔄 Turns: ${resultMsg.num_turns}`);
        }
        break;

      default:
        if (verbose) {
          console.log(`ℹ️  Unknown message [${messageNumber}]: ${(message as any).type}`);
        }
    }
  }
}

export default TwitterSDKExecutor;