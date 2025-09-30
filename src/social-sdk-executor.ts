#!/usr/bin/env tsx

/**
 * Social SDK Executor - Generic MCP Integration
 * Uses Claude Agent SDK with slash commands for platform-specific operations
 */

import { query, type SDKMessage, type SDKSystemMessage, type SDKAssistantMessage, type SDKResultMessage, type McpServerConfig } from '@anthropic-ai/claude-agent-sdk';
import { loadEnvironment, expandEnvironmentVariables } from './env-loader.js';
import { logger } from './logger.js';
import * as fs from 'fs';
import * as path from 'path';

export interface SocialOptions {
  dryRun: boolean;
  verbose: boolean;
  resume?: string;
}

export type MCPServersConfig = Record<string, McpServerConfig>;

/**
 * ★ Insight ─────────────────────────────────────
 * Generic social executor works with any platform through slash commands
 * Platform-specific logic is handled by .claude/commands/*.md files
 * Single codebase handles Twitter, Reddit, LinkedIn, YouTube, and future platforms
 * ─────────────────────────────────────────────────
 */
export class SocialSDKExecutor {

  /**
   * Load MCP server configuration from .mcp.json with environment variable expansion
   */
  private static loadMCPServers(): MCPServersConfig {
    const mcpPath = path.join(process.cwd(), '.mcp.json');

    if (!fs.existsSync(mcpPath)) {
      logger.warning('.mcp.json not found, using empty MCP configuration');
      return {};
    }

    try {
      const configContent = fs.readFileSync(mcpPath, 'utf-8');
      const env = loadEnvironment();

      // Expand environment variables in the configuration
      const expandedContent = expandEnvironmentVariables(configContent, env);
      const config = JSON.parse(expandedContent);

      if (config.mcpServers) {
        logger.loadedServers(Object.keys(config.mcpServers).length);
        return config.mcpServers;
      }

      return {};
    } catch (error) {
      logger.error(`Failed to load .mcp.json: ${(error as Error).message}`);
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
    const supportedPlatforms = ['twitter', 'reddit', 'linkedin', 'youtube'];

    if (!supportedPlatforms.includes(platform.toLowerCase())) {
      logger.error(`Unsupported platform: ${platform}`);
      logger.error(`Supported platforms: ${supportedPlatforms.join(', ')}`);
      logger.newline();
      logger.error('To add a new platform:');
      logger.error(`1. Create .claude/commands/${platform}.md with platform-specific prompts`);
      logger.error(`2. Add "${platform}": "tsx social.ts ${platform}" to package.json scripts`);
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
    // Set logger verbose mode
    logger.setVerbose(options.verbose);

    logger.header(`Social SDK Executor - ${platform.toUpperCase()} Operations`);

    if (options.resume) {
      logger.resuming(options.resume);
    } else {
      logger.prompt(prompt);
    }

    logger.platform(platform);
    logger.mode(options.dryRun);
    logger.newline();

    // Validate platform support
    this.validatePlatform(platform);

    // Check if slash command file exists
    const commandPath = path.join(process.cwd(), '.claude', 'commands', `${platform}.md`);
    if (!fs.existsSync(commandPath)) {
      logger.error(`Slash command file not found: ${commandPath}`);
      logger.error(`Please create .claude/commands/${platform}.md with platform-specific prompts`);
      process.exit(1);
    }

    try {
      // Load MCP configuration
      const mcpServers = this.loadMCPServers();
      const slashCommand = this.buildSlashCommand(platform, prompt, options);

      if (options.verbose) {
        logger.debug('Debug Information:');
        logger.debug(`MCP Servers: ${Object.keys(mcpServers).join(', ')}`);
        logger.debug(`Slash Command: ${slashCommand}`);
        logger.debug(`Command File: ${commandPath}`);
        logger.separator();
      }

      logger.initializing(platform);

      // Execute using Claude Agent SDK with slash command
      const response = query({
        prompt: slashCommand,
        options: {
          // Load settings for slash commands and Claude Code behavior
          settingSources: ['project', 'local'],
          systemPrompt: { type: 'preset', preset: 'claude_code' },
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
          ...(options.resume && { resume: options.resume })
        }
      });

      // Process streaming responses
      let messageCount = 0;
      let sessionId: string | undefined;
      const startTime = Date.now();

      for await (const message of response) {
        messageCount++;

        // Capture session ID from system init message
        if (message.type === 'system' && (message as any).session_id && !sessionId) {
          sessionId = (message as any).session_id;
          if (sessionId) {
            logger.session(sessionId, platform);
            logger.newline();
          }
        }

        await this.processMessage(message, options.verbose, messageCount);
      }

      const duration = Date.now() - startTime;
      logger.newline();
      logger.stats(duration, messageCount);

    } catch (error) {
      logger.newline();
      logger.error('Execution failed:');
      logger.error((error as Error).message);

      if (options.verbose) {
        logger.newline();
        logger.debug('Full error details:');
        logger.debug(error as any);
      }

      logger.troubleshooting(platform);
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
            logger.system(`System [${messageNumber}]: Initialized with model ${sysMsg.model}`);
          }

          if ('mcp_servers' in sysMsg && sysMsg.mcp_servers && sysMsg.mcp_servers.length > 0) {
            const serverStatus = sysMsg.mcp_servers
              .map((s: { name: string; status: string }) => `${s.name}(${s.status})`)
              .join(', ');
            logger.mcpServers([serverStatus]);
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
              logger.debug(`Assistant [${messageNumber}]:`, '🤖');
            }
            console.log(content);

            if (verbose) {
              logger.separator();
            }
          }
        }
        break;

      case 'user':
        if (verbose) {
          logger.debug(`User [${messageNumber}]: Input processed`, '👤');
        }
        break;

      case 'result':
        const resultMsg = message as SDKResultMessage;
        logger.newline();
        logger.info(`Execution Result [${messageNumber}]:`, '🎯');

        if (resultMsg.subtype === 'success') {
          logger.success('Operation completed successfully!');

          if ('result' in resultMsg) {
            logger.newline();
            logger.info('Final Output:', '📋');
            console.log(resultMsg.result);
          }
        } else {
          logger.error(`Operation failed: ${resultMsg.subtype}`);
        }

        if (verbose && 'usage' in resultMsg) {
          logger.usage(
            resultMsg.total_cost_usd,
            resultMsg.usage.input_tokens,
            resultMsg.usage.output_tokens,
            resultMsg.num_turns
          );
        }
        break;

      default:
        if (verbose) {
          logger.debug(`Unknown message [${messageNumber}]: ${(message as any).type}`, 'ℹ️');
        }
    }
  }
}

export default SocialSDKExecutor;