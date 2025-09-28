# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript-based social media automation system featuring **multi-platform social commands** with Claude Code slash commands and natural language interface. The system uses Claude Code SDK with platform-specific slash commands for AI-driven operations.

**Key Principle**: Natural language commands are processed by the AI using Claude Code slash commands with platform-specific system prompts, providing intelligent intent detection and model-driven workflows without predetermined limitations.

## Common Development Commands

### Building and Quality Checks
```bash
npm run build           # Compile TypeScript to JavaScript
npm run type-check      # TypeScript type checking without compilation
npm run lint           # ESLint code quality check
```

### Social Media Operations

#### Twitter Operations
```bash
npm run twitter -- "create viral content about TypeScript" --dry-run    # Generate content (preview mode)
npm run twitter -- "find AWS discussions and engage thoughtfully"       # Search and engagement
npm run twitter -- "analyze trending topics and create relevant content" --verbose  # Mixed operations
npm run twitter -- "continue with follow-up thread" --resume <session-id>  # Resume previous session
npm run twitter -- --help   # Show command help and examples
```

#### Reddit Operations
```bash
npm run reddit -- "post insights about React in r/webdev" --dry-run     # Community posting (preview mode)
npm run reddit -- "find JavaScript discussions to join with helpful comments"  # Community engagement
npm run reddit -- "analyze popular programming posts for content ideas" --verbose  # Research and analysis
npm run reddit -- "refine the post based on community feedback" --resume <session-id>  # Resume previous session
npm run reddit -- --help    # Show command help and examples
```

#### LinkedIn Operations
```bash
npm run linkedin -- "share cloud architecture best practices" --dry-run # Professional content (preview mode)
npm run linkedin -- "connect with DevOps professionals in my industry"  # Professional networking
npm run linkedin -- "create thought leadership content about AI trends" --verbose  # Industry leadership
npm run linkedin -- "expand on the previous insights" --resume <session-id>  # Resume previous session
npm run linkedin -- --help   # Show command help and examples
```

#### Generic Social Operations
```bash
npm run social -- twitter "your prompt here" --dry-run   # Generic Twitter command
npm run social -- reddit "your prompt here" --verbose    # Generic Reddit command
npm run social -- linkedin "your prompt here"            # Generic LinkedIn command
npm run social -- twitter "continue conversation" --resume <session-id>  # Resume with generic interface
```

### Testing Approach
- Test with `--dry-run` and `--verbose` flags
- Natural language testing via `npm run [platform]` commands
- Type checking via `npm run type-check`
- Cross-platform testing with `npm run social [platform] "prompt"`
- Session continuity testing with `--resume <session-id>` parameter

## Architecture Overview

### Slash Command Architecture
The project uses **Claude Code slash commands with platform-specific prompts**:

1. **Platform Entry Points** (`twitter.ts`, `reddit.ts`, `linkedin.ts`) accept user commands in plain English
2. **Generic Social Executor** (`src/social-sdk-executor.ts`) uses Claude Code SDK with slash commands
3. **Platform-Specific Prompts** (`.claude/commands/*.md`) contain specialized system prompts for each platform
4. **AI-Driven Workflows** - no predetermined operations, model determines appropriate actions based on platform context

### Key Components

- **`src/types.ts`**: Comprehensive Zod schemas and TypeScript interfaces for all platforms
- **`src/env-loader.ts`**: Environment configuration with `.env.local` priority
- **`src/social-sdk-executor.ts`**: Generic MCP integration executor with streaming support
- **`twitter.ts`, `reddit.ts`, `linkedin.ts`**: Platform-specific command interfaces with natural language processing
- **`social.ts`**: Generic command interface for all platforms
- **`.claude/commands/`**: Platform-specific slash command files with specialized system prompts
- **`_archive/`**: Archived files from previous subagent-based architecture

### MCP Integration
- **RUBE MCP Server**: Provides access to 500+ apps including Reddit, Twitter, LinkedIn, etc.
- **Configuration**: `.mcp.json`
- **Slash Commands**: `.claude/commands/twitter.md`, `.claude/commands/reddit.md`, `.claude/commands/linkedin.md`

## Code Patterns

### Multi-Platform Command Interface
```typescript
// Twitter operations - viral content and engagement
await SocialSDKExecutor.execute(
  'twitter',
  "create viral content about TypeScript best practices",
  { dryRun: false, verbose: true }
);

// Resume previous Twitter session with new content
await SocialSDKExecutor.execute(
  'twitter',
  "create a follow-up thread based on engagement",
  { dryRun: false, verbose: true, resume: "77552924-a31c-4c1a-a07c-990855aa95a3" }
);

// Reddit operations - community engagement
await SocialSDKExecutor.execute(
  'reddit',
  "post insights about React best practices in r/webdev",
  { dryRun: true, verbose: false }
);

// LinkedIn operations - professional content
await SocialSDKExecutor.execute(
  'linkedin',
  "share cloud architecture insights with my network",
  { dryRun: false, verbose: true }
);
```

### Slash Command Integration
```typescript
// Claude Code SDK with platform-specific slash commands
const slashCommand = `/${platform} ${prompt} ${options}`;
const response = query({
  prompt: slashCommand,  // e.g., "/twitter create viral content --dry-run"
  options: {
    mcpServers: loadMCPServers(),
    // Session management - resume previous conversation if provided
    ...(options.resume && { resume: options.resume }),
    // Allow all MCP tools - permission system handles access control
    // If needed, can restrict to specific RUBE tools:
    // allowedTools: [
    //   'mcp__rube__RUBE_SEARCH_TOOLS',
    //   'mcp__rube__RUBE_MULTI_EXECUTE_TOOL',
    //   'mcp__rube__RUBE_CREATE_PLAN'
    // ],
    cwd: process.cwd()
  }
});

// Session ID is captured from system messages during execution
// Example: 📌 Session ID: 77552924-a31c-4c1a-a07c-990855aa95a3
```

### Configuration Validation
All configurations use Zod schemas:
```typescript
TwitterPostConfigSchema.parse(config);   // Twitter-specific validation
RedditPostConfigSchema.parse(config);    // Reddit-specific validation
LinkedInPostConfigSchema.parse(config);  // LinkedIn-specific validation
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

### Use Slash Command Architecture
- ✅ **Correct**: Use Claude Code SDK with slash commands and platform-specific prompts
- ❌ **Incorrect**: Hardcode system prompts or use outdated subagent patterns
- The slash command approach provides intelligent workflows with customizable platform-specific optimization

### File Organization
- **Source Code**: All main logic in `src/` directory
- **Platform Commands**: `twitter.ts`, `reddit.ts`, `linkedin.ts` - platform-specific command interfaces
- **Generic Command**: `social.ts` - unified command interface for all platforms
- **Slash Commands**: `.claude/commands/` directory with platform-specific system prompts
- **Configuration**: `.mcp.json` and environment files (`.env.local`, `.env.example`)
- **Archive**: `_archive/` directory for legacy subagent-based files
- **Build Output**: `dist/` directory (generated, not committed)

### Type Safety
- All platform configurations have corresponding Zod schemas
- Use schema validation before generating commands
- TypeScript types are inferred from Zod schemas using `z.infer<>`

### MCP Server Usage
- RUBE MCP provides Reddit (`REDDIT_*`), Twitter (`TWITTER_*`), and LinkedIn (`LINKEDIN_*`) operations
- Integration via Claude Code SDK with platform-specific slash commands
- Permission-based access with graceful fallback handling
- Platform-agnostic executor works with any RUBE-supported social platform

## Environment Setup

**Prerequisites**: Sign up for a RUBE account at [https://rube.app/](https://rube.app/) to get your API token

1. Install dependencies: `npm install`
2. Copy environment template: `cp .env.example .env.local`
3. Configure your RUBE_API_TOKEN from https://rube.app/ in `.env.local`
4. Test with: `npm run twitter -- --help` or `npm run reddit -- --help` or `npm run linkedin -- --help`

## Working with This Codebase

When adding new features:
1. Extend types in `src/types.ts` with Zod schemas for the relevant platform
2. Update platform-specific slash commands in `.claude/commands/[platform].md` if needed
3. Test with natural language commands using `--dry-run` flag
4. Add examples to platform-specific help documentation
5. Run type checking before commits: `npm run type-check`

When adding a new platform:
1. Create `.claude/commands/[platform].md` with platform-specific system prompts
2. Create `[platform].ts` entry point following existing patterns
3. Add scripts to `package.json`: `"[platform]": "tsx [platform].ts"`
4. Add platform validation to `src/social-sdk-executor.ts`
5. Test with `npm run [platform] -- --help`

When debugging:
1. Use `--verbose` flag for detailed execution logs
2. Test with `--dry-run` to preview actions without execution
3. Check environment configuration in `.env.local`
4. Validate MCP server connectivity and permissions
5. Use `npm run [platform] -- --help` for platform-specific command options
6. Use `npm run social -- [platform] "prompt"` for generic command interface
7. Review session transcripts in `~/.claude/projects/<project-name>/<session-id>.jsonl`
8. Use `--resume <session-id>` to continue problematic sessions for iterative debugging

## Platform-Specific Features

### Twitter (`.claude/commands/twitter.md`)
- Viral content optimization with engagement triggers
- Thread creation and audience engagement strategies
- Trending topic analysis and timely content creation
- Strategic hashtag research and algorithm optimization

### Reddit (`.claude/commands/reddit.md`)
- Subreddit culture awareness and community guidelines
- Content optimization for specific subreddit audiences
- Authentic engagement and discussion participation
- Timing optimization for maximum visibility

### LinkedIn (`.claude/commands/linkedin.md`)
- Professional networking and relationship building
- B2B content creation and thought leadership
- Industry-specific targeting and engagement
- Professional brand building and authority establishment
- **Platform-Native Formatting**: Optimized for LinkedIn's text rendering (no markdown headers/code blocks)
- **Professional Post Structure**: Template-based approach for consistent, engaging content
- **LinkedIn Algorithm Optimization**: Business hours posting, native content prioritization

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.