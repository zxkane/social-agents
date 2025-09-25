# Social Media Agents - AI-Driven Twitter Operations

A TypeScript-based social media automation system featuring a **unified Twitter command** with natural language interface and direct MCP integration. The system uses Claude Code SDK with system prompts to provide intelligent, model-driven workflows for Twitter content generation and engagement.

## Features

### 🐦 Unified Twitter Command
- **Natural Language Interface**: Express complex operations in plain English
- **Intelligent Intent Detection**: AI automatically determines whether you want generation or engagement
- **Content Generation**: Create viral tweets, threads, and optimized content
- **Smart Engagement**: Search, analyze, and engage with Twitter content strategically
- **Mixed Operations**: Combine research, content creation, and engagement in single commands

### 🧠 AI-Driven Operations
- **System Prompt Architecture**: Uses Claude Code SDK with specialized Twitter expertise
- **Model-Driven Workflows**: No predetermined limitations - AI controls the execution flow
- **Real-time Adaptation**: Responds intelligently to API responses and platform changes
- **Strategic Guidance**: Provides valuable insights even without direct tool access

### 🔧 Technical Excellence
- **Direct MCP Integration**: Connects to RUBE MCP server for 500+ app access
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

## Architecture

The system uses **direct MCP integration** with natural language processing for intelligent Twitter operations:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Natural        │───▶│ Claude Code SDK │───▶│   Direct MCP    │
│  Language       │    │ Integration     │    │   Integration   │
│                 │    │                 │    │                 │
│  - User Intent  │    │ - System Prompts│    │ RUBE MCP:       │
│  - AI Analysis  │    │ - Streaming     │    │ - Twitter API   │
│  - Command Args │    │ - Permission    │    │ - 500+ Apps     │
│  - Type Safety  │    │   Handling      │    │ - Rate Limiting │
│                 │    │                 │    │                 │
│  twitter.ts     │    │ TwitterSDK      │    │ Real-time       │
│  (124 lines)    │    │ Executor        │    │ Operations      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**Key Principle:** Natural language commands are processed by AI using direct MCP server integration with system prompts, providing intelligent intent detection and model-driven workflows without predetermined limitations.

### Why Use the Direct MCP Approach?

✅ **AI-Driven Operations**: Natural language → Intelligent execution
- **No Predetermined Workflows**: AI determines the best approach for each request
- **Intent Detection**: Automatically understands whether you want generation or engagement
- **Adaptive Intelligence**: Responds to platform changes and API responses in real-time
- **Educational Integration**: Learn platform best practices during execution

✅ **Direct MCP Integration**: Claude Code SDK + System Prompts
- **Permission Management**: Graceful handling when tools need explicit access
- **Streaming Feedback**: Real-time progress and transparency
- **Fallback Intelligence**: Provides strategic guidance even without direct tool access
- **Platform Expertise**: Built-in Twitter optimization and engagement strategies

## Installation

1. **Prerequisites**: Ensure you have Claude Code CLI installed
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure environment**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your RUBE_API_TOKEN
   ```
4. **Test the setup**:
   ```bash
   npm run twitter -- --help
   ```

## Quick Start

### Natural Language Twitter Operations

Use the unified Twitter command with natural language:

```bash
# Content Generation
npm run twitter -- "create a viral tweet about TypeScript best practices"
npm run twitter -- "write a thread about serverless architecture insights"
npm run twitter -- "generate engaging content about our product launch"

# Engagement Operations
npm run twitter -- "find recent AI discussions and like helpful posts"
npm run twitter -- "search for AWS content and engage with valuable insights"
npm run twitter -- "monitor TypeScript community and join interesting conversations"

# Mixed Operations
npm run twitter -- "analyze trending topics and create relevant content"
npm run twitter -- "research React discussions and contribute with our expertise"

# Always test first with dry-run mode
npm run twitter -- "your request here" --dry-run --verbose
```

### Example Output

When you run a generation command, you'll see:

```
🐦 Twitter SDK Executor - AI-Driven Operations
==================================================
📝 Request: create a viral tweet about TypeScript best practices
🔧 Mode: DRY RUN

🚀 Initializing AI-driven Twitter operations...

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

# Combined - dry run with verbose output
npm run twitter -- "your request" --dry-run --verbose

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

#### `TwitterSDKExecutor.execute(prompt: string, options: TwitterOptions)`
Main execution method for Twitter operations.

**Parameters:**
- `prompt`: Natural language instruction for the operation
- `options`: Configuration object with `dryRun` and `verbose` flags

**Returns:** Promise that completes when operation finishes

**Example:**
```typescript
await TwitterSDKExecutor.execute(
  "create viral content about TypeScript",
  { dryRun: true, verbose: true }
);
```

#### `loadEnvironment(): EnvironmentConfig`
Loads environment configuration with `.env.local` priority.

**Returns:** Environment configuration object

**Priority Chain:** `.env.local` → System environment variables

#### `validateTwitterEnvironment(): ValidationResult`
Validates required Twitter environment variables.

**Returns:** `{ valid: boolean, missing: string[] }`

### Command Interface

The unified Twitter command accepts natural language and automatically:
- **Detects Intent**: Generation vs. engagement vs. mixed operations
- **Processes Language**: Understands complex, multi-step instructions
- **Manages Permissions**: Handles MCP tool access gracefully
- **Provides Feedback**: Real-time progress and educational insights

### Type Definitions

#### TwitterOptions
```typescript
interface TwitterOptions {
  dryRun: boolean;    // Preview actions without executing
  verbose: boolean;   // Show detailed execution logs
}
```

#### EnvironmentConfig
Environment variables loaded with `.env.local` priority:
```bash
# Required
RUBE_API_TOKEN=your_rube_api_token

# Optional
CLAUDE_CODE_USE_BEDROCK=1
AWS_PROFILE=bedrock
MAX_THINKING_TOKENS=8192
```

## Project Structure

```
src/
├── env-loader.ts           # Environment configuration with .env.local priority
├── twitter-sdk-executor.ts # Direct MCP integration with Claude Code SDK
└── types.ts               # TypeScript type definitions and Zod schemas

twitter.ts                  # Unified Twitter command interface (124 lines)
.mcp.json                  # MCP server configuration
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

# Test the unified command
npm run twitter -- --help
npm run twitter -- "test request" --dry-run --verbose
```

## Migration from Subagent Architecture

This project has been refactored from a subagent-delegation pattern to direct MCP integration:

**Before (Subagent):**
- Complex multi-file architecture with separate subagents
- Required Task tool delegation and headless command generation
- Predetermined workflows and operation types

**After (Direct MCP):**
- Simple unified command with natural language interface
- Direct Claude Code SDK integration with system prompts
- AI-driven workflows with intelligent intent detection

**Legacy files are preserved in `_archive/` for reference.**

## Examples

### Content Generation
```bash
# Single viral tweet
npm run twitter -- "create a controversial take on AI development trends"

# Educational thread
npm run twitter -- "write a 5-tweet thread explaining async/await to beginners"

# Product launch content
npm run twitter -- "generate buzz for our new TypeScript library launch"
```

### Engagement Operations
```bash
# Community building
npm run twitter -- "find developers asking TypeScript questions and provide helpful answers"

# Competitive intelligence
npm run twitter -- "monitor mentions of competing products and engage professionally"

# Trend analysis
npm run twitter -- "research what's trending in React ecosystem and create relevant content"
```

### Mixed Workflows
```bash
# Research → Create → Engage
npm run twitter -- "analyze current AWS discussions, create valuable content, and engage with the community"

# Monitor → Respond → Build
npm run twitter -- "monitor our brand mentions and respond with helpful resources to build relationships"
```

## Contributing

1. Fork the repository
2. Make changes following the direct MCP integration pattern
3. Test with `npm run type-check` and practical examples
4. Submit a pull request

## License

MIT License - see LICENSE file for details.