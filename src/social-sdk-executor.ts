#!/usr/bin/env tsx

/**
 * Social SDK Executor - Generic MCP Integration
 * Uses Claude Code SDK with slash commands for platform-specific operations
 */

import { query, type SDKMessage, type SDKSystemMessage, type SDKAssistantMessage, type SDKResultMessage, type McpServerConfig } from '@anthropic-ai/claude-code';
import { loadEnvironment, expandEnvironmentVariables } from './env-loader.js';
import * as fs from 'fs';
import * as path from 'path';

export interface SocialOptions {
  dryRun: boolean;
  verbose: boolean;
}

export type MCPServersConfig = Record<string, McpServerConfig>;

/**
 * ★ Insight ─────────────────────────────────────
 * Generic social executor works with any platform through slash commands
 * Platform-specific logic is handled by .claude/commands/*.md files
 * Single codebase handles Twitter, Reddit, LinkedIn, and future platforms
 * ─────────────────────────────────────────────────
 */
export class SocialSDKExecutor {

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
   * Validates supported platforms and provides helpful error messages
   * Extensible design allows easy addition of new platforms
   * Platform validation happens early to prevent runtime errors
   * ─────────────────────────────────────────────────
   */
  private static validatePlatform(platform: string): void {
    const supportedPlatforms = ['twitter', 'reddit', 'linkedin'];

    if (!supportedPlatforms.includes(platform.toLowerCase())) {
      console.error(`❌ Unsupported platform: ${platform}`);
      console.error(`Supported platforms: ${supportedPlatforms.join(', ')}`);
      console.error('');
      console.error('To add a new platform:');
      console.error(`1. Create .claude/commands/${platform}.md with platform-specific prompts`);
      console.error(`2. Add "${platform}": "tsx social.ts ${platform}" to package.json scripts`);
      process.exit(1);
    }
  }

  /**
   * ★ Insight ─────────────────────────────────────
   * Constructs slash command with platform and user prompt
   * Options are passed as context for dry run and verbose modes
   * Simple string concatenation creates the full command
   * ─────────────────────────────────────────────────
   */
  private static buildSlashCommand(platform: string, prompt: string, options: SocialOptions): string {
    const optionsStr = [
      options.dryRun ? '--dry-run' : '',
      options.verbose ? '--verbose' : ''
    ].filter(Boolean).join(' ');

    return `/${platform} ${prompt} ${optionsStr}`.trim();
  }

  /**
   * Main execution method for social media operations
   */
  static async execute(platform: string, prompt: string, options: SocialOptions): Promise<void> {
    console.log(`🔮 Social SDK Executor - ${platform.toUpperCase()} Operations`);
    console.log('='.repeat(55));
    console.log(`📝 Request: ${prompt}`);
    console.log(`🎯 Platform: ${platform}`);
    console.log(`🔧 Mode: ${options.dryRun ? 'DRY RUN' : 'LIVE EXECUTION'}`);
    console.log('');

    // Validate platform support
    this.validatePlatform(platform);

    // Check if slash command file exists
    const commandPath = path.join(process.cwd(), '.claude', 'commands', `${platform}.md`);
    if (!fs.existsSync(commandPath)) {
      console.error(`❌ Slash command file not found: ${commandPath}`);
      console.error(`Please create .claude/commands/${platform}.md with platform-specific prompts`);
      process.exit(1);
    }

    try {
      // Load MCP configuration
      const mcpServers = this.loadMCPServers();
      const slashCommand = this.buildSlashCommand(platform, prompt, options);

      if (options.verbose) {
        console.log('🔍 Debug Information:');
        console.log(`MCP Servers: ${Object.keys(mcpServers).join(', ')}`);
        console.log(`Slash Command: ${slashCommand}`);
        console.log(`Command File: ${commandPath}`);
        console.log('─'.repeat(40));
      }

      console.log(`🚀 Initializing AI-driven ${platform} operations...\n`);

      // Execute using Claude Code SDK with slash command
      const response = query({
        prompt: slashCommand,
        options: {
          mcpServers: mcpServers,
          // Allow all MCP tools - permission system will handle access control
          // If needed, can restrict to specific RUBE tools:
          // allowedTools: [
          //   'mcp__rube__RUBE_SEARCH_TOOLS',
          //   'mcp__rube__RUBE_MULTI_EXECUTE_TOOL',
          //   'mcp__rube__RUBE_CREATE_PLAN',
          //   'mcp__rube__RUBE_MANAGE_CONNECTIONS',
          //   'mcp__rube__RUBE_REMOTE_WORKBENCH'
          // ],
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
      console.log('- If prompted for RUBE tool access, grant permission to enable social media operations');
      console.log('- Check your .env.local file has RUBE_API_TOKEN or COMPOSIO_API_KEY');
      console.log('- Verify .mcp.json configuration is valid');
      console.log('- Try running with --verbose for more details');
      console.log(`- Ensure .claude/commands/${platform}.md exists and is properly formatted`);
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

export default SocialSDKExecutor;