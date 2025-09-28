# Social Media Agents - Multi-Platform AI Automation

A TypeScript-based social media automation system featuring **multi-platform social commands** with Claude Code slash commands and natural language interface. The system uses Claude Code SDK with platform-specific slash commands for AI-driven operations across Twitter, Reddit, and LinkedIn.

## Features

### 🌐 Multi-Platform Social Commands
- **Natural Language Interface**: Express complex operations in plain English across all platforms
- **Intelligent Intent Detection**: AI automatically determines appropriate actions for each platform
- **Twitter Operations**: Viral content, threads, engagement, and trend analysis
- **Reddit Operations**: Community posting, subreddit engagement, and discussion participation
- **LinkedIn Operations**: Professional networking, thought leadership, and B2B content
- **Cross-Platform Strategy**: Unified approach with platform-specific optimization

### 🧠 AI-Driven Operations
- **Slash Command Architecture**: Uses Claude Code SDK with platform-specific system prompts
- **Model-Driven Workflows**: No predetermined limitations - AI controls the execution flow
- **Platform-Aware Intelligence**: Adapts content and strategies to each platform's unique culture
- **Strategic Guidance**: Provides valuable insights even without direct tool access

### 🔧 Technical Excellence
- **RUBE MCP Integration**: Connects to RUBE MCP server for 500+ app access
- **Platform-Specific Commands**: Customizable slash commands in `.claude/commands/` directory
- **Streaming Response Processing**: Real-time feedback and progress tracking
- **Permission Management**: Graceful handling of MCP tool permissions
- **Environment Priority**: `.env.local` takes precedence over system variables
- **Type Safety**: Full TypeScript implementation with Zod schema validation

### 🛡️ Safety & Reliability
- **Dry Run Mode**: Preview all actions before execution
- **Verbose Logging**: Detailed debugging and transparency
- **Rate Limiting**: Built-in platform compliance and account protection
- **Fallback Strategies**: Intelligent responses when tools aren't accessible
- **Educational Insights**: Learn platform best practices during execution

### 🔄 Session Management
- **Session Tracking**: Automatic session ID output for every conversation
- **Resume Conversations**: Continue previous sessions using `--resume <session-id>` parameter
- **Local Storage**: Conversations stored locally in `~/.claude/projects/` as JSONL transcripts
- **Stateful Workflows**: Maintain context across multiple command invocations
- **Flexible Resumption**: Add new prompts when resuming existing sessions

## Architecture

The system uses **Claude Code slash commands** with natural language processing for intelligent multi-platform operations:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Multi-Platform │───▶│ Claude Code SDK │───▶│   RUBE MCP      │
│  Commands       │    │ Integration     │    │   Integration   │
│                 │    │                 │    │                 │
│  - twitter.ts   │    │ - Slash Commands│    │ RUBE MCP:       │
│  - reddit.ts    │    │ - Streaming     │    │ - Twitter API   │
│  - linkedin.ts  │    │ - Permission    │    │ - Reddit API    │
│  - social.ts    │    │   Handling      │    │ - LinkedIn API  │
│                 │    │                 │    │ - 500+ Apps     │
│  Natural Lang   │    │ SocialSDK       │    │ Real-time       │
│  Processing     │    │ Executor        │    │ Operations      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**Key Principle:** Natural language commands are processed by AI using Claude Code slash commands with platform-specific system prompts, providing intelligent intent detection and model-driven workflows without predetermined limitations.

### Why Use the Slash Command Approach?

✅ **Multi-Platform Intelligence**: Natural language → Platform-aware execution
- **No Predetermined Workflows**: AI determines the best approach for each platform
- **Intent Detection**: Automatically understands generation, engagement, or research needs
- **Platform Adaptation**: Optimizes content and strategies for each social network
- **Educational Integration**: Learn platform-specific best practices during execution

✅ **Slash Command Architecture**: Claude Code SDK + Platform-Specific Prompts
- **Customizable Prompts**: Edit `.claude/commands/*.md` files to adjust AI behavior
- **Permission Management**: Graceful handling when tools need explicit access
- **Streaming Feedback**: Real-time progress and transparency
- **Fallback Intelligence**: Provides strategic guidance even without direct tool access

## Installation

1. **Prerequisites**:
   - Ensure you have Claude Code CLI installed
   - Sign up for a RUBE account at [https://rube.app/](https://rube.app/) to get your API token
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure environment**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your RUBE_API_TOKEN from https://rube.app/
   ```
4. **Test the setup**:
   ```bash
   npm run twitter -- --help
   npm run reddit -- --help
   npm run linkedin -- --help
   ```

## Quick Start

### Multi-Platform Social Operations

Use natural language commands across all platforms:

```bash
# Twitter Operations
npm run twitter -- "create a viral tweet about TypeScript best practices"
npm run twitter -- "find recent AI discussions and engage thoughtfully"
npm run twitter -- "analyze trending topics and create relevant content"

# Reddit Operations
npm run reddit -- "post insights about React in r/webdev" --dry-run
npm run reddit -- "find JavaScript discussions to join with helpful comments"
npm run reddit -- "analyze popular programming posts for content ideas"

# LinkedIn Operations
npm run linkedin -- "share cloud architecture best practices" --dry-run
npm run linkedin -- "connect with DevOps professionals in my industry"
npm run linkedin -- "create thought leadership content about AI trends"

# Generic Cross-Platform Commands
npm run social -- twitter "create viral content about TypeScript" --dry-run
npm run social -- reddit "engage in r/programming discussions" --verbose
npm run social -- linkedin "share professional insights"

# Always test first with dry-run mode
npm run [platform] -- "your request here" --dry-run --verbose
```

### Example Output

When you run a generation command, you'll see:

```
🔮 Social SDK Executor - TWITTER Operations
=======================================================
📝 Request: create a viral tweet about TypeScript best practices
🎯 Platform: twitter
🔧 Mode: DRY RUN

🚀 Initializing AI-driven twitter operations...

🤖 Assistant: I'll create viral Twitter content about TypeScript best practices!

## 🔍 DRY RUN MODE: Viral Tweet Strategy

**Primary Tweet Content:**
```
🔥 TypeScript in 2024 is INSANE

✨ `satisfies` operator → type narrowing magic
🎯 Template literal types → compile-time validation
⚡ `const` assertions → immutable by default

The DX improvements are making JavaScript feel like a different language 🤯

#TypeScript #WebDev #JavaScript
```

✅ Operation completed successfully!
```

### Command Options

```bash
# Preview mode - see what would be done without executing
npm run twitter -- "your request" --dry-run

# Verbose mode - detailed execution logs and debugging
npm run twitter -- "your request" --verbose

# Resume previous session and continue with new prompt
npm run twitter -- "new request" --resume <session-id>

# Combined options - dry run with verbose output
npm run twitter -- "your request" --dry-run --verbose

# Resume with dry run and verbose logging
npm run twitter -- "new request" --resume <session-id> --dry-run --verbose

# Get help and examples
npm run twitter -- --help
```

### Permission Management

When you first use the command, you may see:

```
🔑 Permission Required for RUBE MCP Server

The RUBE MCP server provides access to 500+ applications including Twitter.
Please grant permission when prompted to enable Twitter operations.
```

Simply **grant permission when Claude Code asks** - this enables access to Twitter automation tools while maintaining security.

## API Reference

### Core Components

#### `SocialSDKExecutor.execute(platform: string, prompt: string, options: SocialOptions)`
Main execution method for multi-platform social operations.

**Parameters:**
- `platform`: Target platform ('twitter', 'reddit', 'linkedin')
- `prompt`: Natural language instruction for the operation
- `options`: Configuration object with `dryRun` and `verbose` flags

**Returns:** Promise that completes when operation finishes

**Example:**
```typescript
await SocialSDKExecutor.execute(
  'twitter',
  "create viral content about TypeScript",
  { dryRun: true, verbose: true }
);

await SocialSDKExecutor.execute(
  'linkedin',
  "share cloud architecture best practices",
  { dryRun: false, verbose: true }
);
```

#### `loadEnvironment(): EnvironmentConfig`
Loads environment configuration with `.env.local` priority.

**Returns:** Environment configuration object

**Priority Chain:** `.env.local` → System environment variables

#### `validateSocialEnvironment(): ValidationResult`
Validates required social media environment variables.

**Returns:** `{ valid: boolean, missing: string[] }`

### Command Interface

The multi-platform social commands accept natural language and automatically:
- **Detects Intent**: Generation vs. engagement vs. mixed operations
- **Platform Awareness**: Adapts content and strategies for each social network
- **Processes Language**: Understands complex, multi-step instructions
- **Manages Permissions**: Handles MCP tool access gracefully
- **Provides Feedback**: Real-time progress and educational insights

### Type Definitions

#### SocialOptions
```typescript
interface SocialOptions {
  dryRun: boolean;    // Preview actions without executing
  verbose: boolean;   // Show detailed execution logs
  resume?: string;    // Optional session ID to resume previous conversation
}
```

#### EnvironmentConfig
Environment variables loaded with `.env.local` priority:
```bash
# Required
RUBE_API_TOKEN=your_rube_api_token

# Optional
CLAUDE_CODE_USE_BEDROCK=1
AWS_PROFILE=your_aws_profile_name
MAX_THINKING_TOKENS=8192
```

## Project Structure

```
src/
├── env-loader.ts           # Environment configuration with .env.local priority
├── social-sdk-executor.ts  # Generic MCP integration with Claude Code SDK
└── types.ts               # TypeScript type definitions and Zod schemas

twitter.ts                  # Twitter command interface
reddit.ts                   # Reddit command interface
linkedin.ts                 # LinkedIn command interface
social.ts                   # Generic cross-platform interface

.claude/
└── commands/
    ├── twitter.md          # Twitter-specific slash command prompts
    ├── reddit.md           # Reddit-specific slash command prompts
    └── linkedin.md         # LinkedIn-specific slash command prompts

.mcp.json                  # MCP server configuration (RUBE)
.env.example               # Environment template
.env.local                 # User environment (gitignored)

_archive/                  # Legacy subagent-based files (for reference)
├── twitter-poster.ts      # Previous subagent approach
└── ...

dist/                      # Compiled output (generated)
```

## Development

```bash
# Type checking
npm run type-check

# Build for production
npm run build

# Test all platform commands
npm run twitter -- --help
npm run reddit -- --help
npm run linkedin -- --help
npm run social -- --help

# Test with dry-run mode
npm run twitter -- "test request" --dry-run --verbose
npm run reddit -- "test request" --dry-run --verbose
npm run linkedin -- "test request" --dry-run --verbose
```

## Migration from Subagent Architecture

This project has been refactored from a subagent-delegation pattern to slash command integration:

**Before (Subagent):**
- Complex multi-file architecture with separate subagents
- Required Task tool delegation and headless command generation
- Predetermined workflows and operation types
- Twitter-only operations

**After (Slash Commands):**
- Multi-platform architecture with unified execution engine
- Claude Code SDK integration with platform-specific slash commands
- AI-driven workflows with intelligent intent detection
- Customizable platform prompts in `.claude/commands/` directory
- Support for Twitter, Reddit, LinkedIn, and easy platform extension

**Legacy files are preserved in `_archive/` for reference.**

## Examples

### Twitter Operations
```bash
# Viral content and engagement
npm run twitter -- "create a controversial take on AI development trends"
npm run twitter -- "write a 5-tweet thread explaining async/await to beginners"
npm run twitter -- "find developers asking TypeScript questions and provide helpful answers"
```

### Reddit Operations
```bash
# Community engagement and posting
npm run reddit -- "post insights about React best practices in r/webdev" --dry-run
npm run reddit -- "find JavaScript discussions in r/programming and join with helpful comments"
npm run reddit -- "analyze popular posts in r/MachineLearning for content inspiration"
```

### LinkedIn Operations
```bash
# Professional networking and thought leadership
npm run linkedin -- "share cloud architecture insights with my professional network"
npm run linkedin -- "connect with DevOps professionals in the enterprise space"
npm run linkedin -- "create thought leadership content about AI trends in business"
```

### Cross-Platform Workflows
```bash
# Generic interface for any platform
npm run social -- twitter "analyze trending topics and create viral content"
npm run social -- reddit "engage in r/webdev discussions about modern frameworks"
npm run social -- linkedin "share professional insights about cloud architecture"

# Research → Create → Engage across platforms
npm run twitter -- "research AWS trends and create engaging technical content"
npm run linkedin -- "share the same insights in a professional B2B format"
```

### Session Management Workflows

#### Basic Session Usage
```bash
# Start a new session - note the session ID in output
npm run twitter -- "create viral content about TypeScript"
# Output: 📌 Session ID: 77552924-a31c-4c1a-a07c-990855aa95a3

# Resume the session later with new instructions
npm run twitter -- "now create a follow-up thread" --resume 77552924-a31c-4c1a-a07c-990855aa95a3

# Continue iterating on the same conversation
npm run twitter -- "make it more technical" --resume 77552924-a31c-4c1a-a07c-990855aa95a3
```

#### Multi-Stage Content Development
```bash
# Stage 1: Research and planning
npm run reddit -- "analyze r/programming for trending topics" --dry-run
# 📌 Session ID: abc123-def456-789xyz

# Stage 2: Content creation based on research
npm run reddit -- "create a detailed post about the trending topics we found" --resume abc123-def456-789xyz

# Stage 3: Refinement and optimization
npm run reddit -- "optimize the post for better engagement" --resume abc123-def456-789xyz --dry-run
```

#### Cross-Session Learning
```bash
# Learn from successful campaigns
npm run twitter -- "analyze the performance of recent tweets" --resume previous-session-id
npm run twitter -- "apply those insights to create new content" --resume previous-session-id

# Iterate on content strategy
npm run linkedin -- "refine our B2B content approach based on engagement data" --resume strategy-session-id
```

## Contributing

1. Fork the repository
2. Make changes following the direct MCP integration pattern
3. Test with `npm run type-check` and practical examples
4. Submit a pull request

## License

MIT License - see LICENSE file for details.