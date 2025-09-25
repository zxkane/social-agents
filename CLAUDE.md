# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript-based social media automation system featuring a **unified Twitter command** with direct MCP integration and natural language interface. The system uses Claude Code SDK with system prompts for AI-driven operations.

**Key Principle**: Natural language commands are processed by the AI using direct MCP server integration with system prompts, providing intelligent intent detection and model-driven workflows without predetermined limitations.

## Common Development Commands

### Building and Quality Checks
```bash
npm run build           # Compile TypeScript to JavaScript
npm run type-check      # TypeScript type checking without compilation
npm run lint           # ESLint code quality check
```

### Reddit Operations
```bash
npm run reddit:example     # Run Reddit TypeScript examples
npm run reddit:simple      # Simple Reddit post via shell script
npm run reddit:multi       # Multi-subreddit posting
npm run reddit:optimize    # Content optimization examples
```

### Twitter Operations
```bash
npm run twitter -- "create viral content about TypeScript" --dry-run    # Generate content (preview mode)
npm run twitter -- "find AWS discussions and engage thoughtfully"       # Search and engagement
npm run twitter -- "analyze trending topics and create relevant content" --verbose  # Mixed operations
npm run twitter -- --help   # Show command help and examples
```

### Testing Approach
- Test with `--dry-run` and `--verbose` flags
- Natural language testing via `npm run twitter` commands
- Type checking via `npm run type-check`

## Architecture Overview

### Direct MCP Integration
The project uses **direct MCP integration with system prompts**:

1. **Natural Language Interface** (`twitter.ts`) accepts user commands in plain English
2. **Direct MCP Integration** (`src/twitter-sdk-executor.ts`) uses Claude Code SDK with system prompts
3. **AI-Driven Workflows** - no predetermined operations, model determines appropriate actions

### Key Components

- **`src/types.ts`**: Comprehensive Zod schemas and TypeScript interfaces for Reddit and Twitter
- **`src/env-loader.ts`**: Environment configuration with `.env.local` priority
- **`src/twitter-sdk-executor.ts`**: Direct MCP integration executor with streaming support
- **`twitter.ts`**: Unified command interface with natural language processing
- **`_archive/`**: Archived files from previous subagent-based architecture

### MCP Integration
- **RUBE MCP Server**: Provides access to 500+ apps including Reddit, Twitter, etc.
- **Context7 MCP Server**: Documentation and library information
- **Configuration**: `.claude/mcp-servers.json`, `mcp-config.json`

## Code Patterns

### Natural Language Command Interface
```typescript
// Unified Twitter command - natural language processing
await TwitterSDKExecutor.execute(
  "create viral content about TypeScript best practices",
  { dryRun: false, verbose: true }
);

// Natural language engagement workflows
await TwitterSDKExecutor.execute(
  "find AWS discussions and engage with helpful insights",
  { dryRun: true, verbose: false }
);
```

### Direct MCP Integration
```typescript
// Claude Code SDK with system prompts and MCP servers
const response = query({
  prompt: userInstruction,
  options: {
    appendSystemPrompt: buildTwitterSystemPrompt(options),
    mcpServers: loadMCPServers(),
    allowedTools: ['RUBE_SEARCH_TOOLS', 'RUBE_MULTI_EXECUTE_TOOL'],
    cwd: process.cwd()
  }
});
```

### Configuration Validation
All configurations use Zod schemas:
```typescript
TwitterPostConfigSchema.parse(config);  // Validates before use
RedditPostConfigSchema.parse(config);   // Type-safe validation
```

### Environment Configuration
Load environment with `.env.local` priority:
```typescript
// Automatic environment loading with priority chain
const env = loadEnvironment(); // .env.local → environment variables
const expandedConfig = expandEnvironmentVariables(configContent, env);
```

## Important Development Notes

### ⚠️ Critical: Never Kill Claude Process
- **NEVER** run `pkill claude`, `killall claude`, or any commands that terminate Claude processes
- The current Claude Code session runs within a Claude process - killing it will terminate your active session
- Use `Ctrl+C` to interrupt individual commands, but avoid process termination commands

### Use Direct MCP Integration
- ✅ **Correct**: Use Claude Code SDK with system prompts and MCP servers
- ❌ **Incorrect**: Reimplement platform logic or use outdated subagent patterns
- The AI-driven approach provides intelligent workflows with platform-specific optimization

### File Organization
- **Source Code**: All main logic in `src/` directory
- **Unified Command**: `twitter.ts` - main Twitter command interface
- **Configuration**: `.mcp.json` and environment files (`.env.local`, `.env.example`)
- **Archive**: `_archive/` directory for legacy subagent-based files
- **Build Output**: `dist/` directory (generated, not committed)

### Type Safety
- All platform configurations have corresponding Zod schemas
- Use schema validation before generating commands
- TypeScript types are inferred from Zod schemas using `z.infer<>`

### MCP Server Usage
- RUBE MCP provides Reddit (`REDDIT_*`) and Twitter (`TWITTER_*`) operations
- Direct integration via Claude Code SDK with system prompts
- Permission-based access with graceful fallback handling

## Environment Setup

1. Install dependencies: `npm install`
2. Copy environment template: `cp .env.example .env.local`
3. Configure your RUBE_API_TOKEN in `.env.local`
4. Test with: `npm run twitter -- --help`

## Working with This Codebase

When adding new features:
1. Extend types in `src/types.ts` with Zod schemas
2. Update system prompts in `src/twitter-sdk-executor.ts` if needed
3. Test with natural language commands using `--dry-run` flag
4. Add examples to help documentation
5. Run type checking before commits: `npm run type-check`

When debugging:
1. Use `--verbose` flag for detailed execution logs
2. Test with `--dry-run` to preview actions without execution
3. Check environment configuration in `.env.local`
4. Validate MCP server connectivity and permissions
5. Use `npm run twitter -- --help` for command options