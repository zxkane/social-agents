import chalk from 'chalk';
import ora from 'ora';

export interface LoggerOptions {
  verbose?: boolean;
}

export type LogLevel = 'info' | 'success' | 'error' | 'warning' | 'debug' | 'system';

export interface SpinnerInstance {
  succeed(text?: string): void;
  fail(text?: string): void;
  warn(text?: string): void;
  info(text?: string): void;
  start(text?: string): void;
  stop(): void;
  isSpinning: boolean;
}

class Logger {
  private options: LoggerOptions = {};

  constructor(options: LoggerOptions = {}) {
    this.options = options;
  }

  setVerbose(verbose: boolean): void {
    this.options.verbose = verbose;
  }

  private formatMessage(level: LogLevel, message: string, emoji?: string): string {
    const prefix = emoji || this.getDefaultEmoji(level);
    const coloredMessage = this.colorizeByLevel(message, level);
    return `${prefix} ${coloredMessage}`;
  }

  private getDefaultEmoji(level: LogLevel): string {
    const emojis = {
      info: '🔮',
      success: '✅',
      error: '❌',
      warning: '⚠️',
      debug: '🔍',
      system: '🔧'
    };
    return emojis[level] || 'ℹ️';
  }

  private colorizeByLevel(message: string, level: LogLevel): string {
    switch (level) {
      case 'success':
        return chalk.green(message);
      case 'error':
        return chalk.red.bold(message);
      case 'warning':
        return chalk.yellow(message);
      case 'debug':
        return chalk.gray(message);
      case 'system':
        return chalk.cyan(message);
      case 'info':
      default:
        return message;
    }
  }

  info(message: string, emoji?: string): void {
    console.log(this.formatMessage('info', message, emoji));
  }

  success(message: string, emoji?: string): void {
    console.log(this.formatMessage('success', message, emoji));
  }

  error(message: string, emoji?: string): void {
    console.error(this.formatMessage('error', message, emoji));
  }

  warning(message: string, emoji?: string): void {
    console.warn(this.formatMessage('warning', message, emoji));
  }

  debug(message: string, emoji?: string): void {
    if (this.options.verbose) {
      console.log(this.formatMessage('debug', message, emoji));
    }
  }

  system(message: string, emoji?: string): void {
    console.log(this.formatMessage('system', message, emoji));
  }

  header(title: string): void {
    console.log(`${chalk.bold.cyan('🔮')} ${chalk.bold(title)}`);
    console.log(chalk.gray('='.repeat(55)));
  }

  section(title: string): void {
    console.log(`\n${chalk.bold(title)}`);
  }

  separator(char: string = '─', length: number = 40): void {
    console.log(chalk.gray(char.repeat(length)));
  }

  newline(): void {
    console.log('');
  }

  platform(platform: string): void {
    const colors = {
      twitter: chalk.hex('#1DA1F2'),
      reddit: chalk.hex('#FF4500'),
      linkedin: chalk.hex('#0077B5')
    };
    const color = colors[platform.toLowerCase() as keyof typeof colors] || chalk.white;
    this.info(`Platform: ${color(platform.toUpperCase())}`);
  }

  mode(isDryRun: boolean): void {
    const mode = isDryRun ? 'DRY RUN' : 'LIVE EXECUTION';
    const color = isDryRun ? chalk.yellow : chalk.green;
    this.info(`Mode: ${color(mode)}`, '🔧');
  }

  session(sessionId: string, platform: string): void {
    this.info(`Session ID: ${chalk.cyan(sessionId)}`, '📌');
    this.info(`Resume with: ${chalk.cyan(`npm run ${platform} -- --resume ${sessionId}`)}`, '💡');
  }

  result(success: boolean, message?: string): void {
    if (success) {
      this.success('Operation completed successfully!');
    } else {
      this.error(`Operation failed: ${message || 'Unknown error'}`);
    }
  }

  stats(duration: number, messageCount: number): void {
    this.info(`Total execution time: ${chalk.cyan(duration + 'ms')}`, '⏱️');
    this.info(`Processed ${chalk.cyan(messageCount)} messages`, '📊');
  }

  usage(cost: number, inputTokens: number, outputTokens: number, turns: number): void {
    if (!this.options.verbose) return;

    console.log('\n📊 Usage Statistics:');
    console.log(`💰 Cost: ${chalk.green('$' + cost)}`);
    console.log(`📈 Tokens: ${chalk.cyan(inputTokens)} input, ${chalk.cyan(outputTokens)} output`);
    console.log(`🔄 Turns: ${chalk.cyan(turns)}`);
  }

  troubleshooting(platform: string): void {
    this.newline();
    this.info('Troubleshooting tips:', '💡');
    console.log('- If prompted for RUBE tool access, grant permission to enable social media operations');
    console.log('- Check your .env.local file has RUBE_API_TOKEN or COMPOSIO_API_KEY');
    console.log('- Verify .mcp.json configuration is valid');
    console.log('- Try running with --verbose for more details');
    console.log(`- Ensure .claude/commands/${platform}.md exists and is properly formatted`);
    console.log('- The system can provide strategic guidance even without direct tool access');
  }

  spinner(text: string): SpinnerInstance {
    return ora({
      text: chalk.cyan(text),
      spinner: 'dots',
      color: 'cyan'
    });
  }

  helpSection(title: string, content: string): void {
    console.log(`\n${chalk.bold.cyan(title)}`);
    console.log(content);
  }

  helpCommand(command: string, description: string): void {
    console.log(`  ${chalk.yellow(command.padEnd(50))} ${description}`);
  }

  box(title: string, lines: string[]): void {
    const maxLength = Math.max(title.length, ...lines.map(l => l.length)) + 4;
    const border = '─'.repeat(maxLength);

    console.log(chalk.gray(`┌${border}┐`));
    console.log(chalk.gray(`│ ${chalk.bold(title).padEnd(maxLength - 1)}│`));
    console.log(chalk.gray(`├${border}┤`));

    lines.forEach(line => {
      console.log(chalk.gray(`│ ${line.padEnd(maxLength - 1)}│`));
    });

    console.log(chalk.gray(`└${border}┘`));
  }

  mcpServers(servers: string[]): void {
    if (servers.length > 0) {
      const serverStatus = servers.join(', ');
      this.system(`MCP Servers: ${chalk.green(serverStatus)}`, '🔌');
    }
  }

  loadedServers(count: number): void {
    this.system(`Loaded ${chalk.cyan(count)} MCP server(s)`, '🔌');
  }

  prompt(text: string): void {
    this.info(`Request: ${chalk.white(text)}`, '📝');
  }

  resuming(sessionId: string): void {
    this.info(`Resuming session: ${chalk.cyan(sessionId)}`, '📂');
  }

  initializing(platform: string): void {
    this.info(`Initializing AI-driven ${platform} operations...`, '🚀');
    this.newline();
  }
}

const logger = new Logger();

export { logger };
export default logger;