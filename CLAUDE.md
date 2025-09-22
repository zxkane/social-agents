# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript-based social media automation system that generates headless Claude Code commands to invoke specialized subagents for Reddit and Twitter posting. The project uses a subagent-delegation architecture rather than direct API implementations.

**Key Principle**: TypeScript generates headless commands that invoke specialized subagents via `claude -p` CLI commands, providing type safety and configuration management while leveraging platform-specific expertise.

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
npm run twitter:example    # Run Twitter TypeScript examples
npm run twitter:simple     # Simple Twitter post via shell script
npm run twitter:thread     # Twitter thread creation
npm run twitter:optimize   # Content optimization
npm run twitter:trends     # Trending analysis
```

### MCP Integration
```bash
npm run mcp:setup          # Automated MCP setup
npm run mcp:test           # Test MCP connection
npm run mcp:start          # Start RUBE MCP server
```

### Testing Approach
- No traditional test framework - uses practical examples and shell scripts
- Test commands via `npm run reddit:example` and `npm run twitter:example`
- MCP connection testing via `npm run mcp:test`

## Architecture Overview

### Subagent-Based Design
The project uses a **subagent delegation pattern**:

1. **TypeScript Generators** (`src/reddit-poster.ts`, `src/twitter-poster.ts`) create configurations and generate headless commands
2. **Headless CLI Commands** invoke specialized subagents via `claude -p "Task(...)" --headless`
3. **Specialized Subagents** (`.claude/agents/`) handle platform-specific logic with expert knowledge

### Key Components

- **`src/types.ts`**: Comprehensive Zod schemas and TypeScript interfaces for both Reddit and Twitter
- **`src/reddit-poster.ts`**: Static helper methods for Reddit subagent invocation
- **`src/twitter-poster.ts`**: Static helper methods for Twitter subagent invocation
- **`.claude/agents/`**: Subagent specifications with platform expertise
- **Shell Scripts**: `headless-examples.sh`, `twitter-headless-examples.sh` for command generation

### MCP Integration
- **RUBE MCP Server**: Provides access to 500+ apps including Reddit, Twitter, etc.
- **Context7 MCP Server**: Documentation and library information
- **Configuration**: `.claude/mcp-servers.json`, `mcp-config.json`

## Code Patterns

### Subagent Command Generation
```typescript
// Generate headless command for Twitter posting
const command = TwitterPoster.generateHeadlessCommand(config, instruction);

// Get Task tool parameters directly
const taskParams = TwitterPoster.createSubagentPrompt(config, instruction);
```

### Configuration Validation
All configurations use Zod schemas:
```typescript
TwitterPostConfigSchema.parse(config);  // Validates before use
RedditPostConfigSchema.parse(config);   // Type-safe validation
```

### Fallback Strategies
Generate multiple content versions for spam filter avoidance:
```typescript
const fallbacks = RedditPoster.generateFallbackVersions(config, 2);
const twitterFallbacks = TwitterPoster.generateFallbackVersions(config, ['short', 'no-hashtags']);
```

## Important Development Notes

### Use Subagents, Don't Reimplement
- ✅ **Correct**: Use `Task` tool to invoke `reddit-poster` or `twitter-poster` subagents
- ❌ **Incorrect**: Reimplement Reddit/Twitter posting logic directly
- The subagents have built-in expertise for spam avoidance, community adaptation, and platform algorithms

### File Organization
- **Source Code**: All main logic in `src/` directory
- **Examples**: Root level `.ts` files and shell scripts for practical usage
- **Configuration**: `.claude/` directory for MCP and agent configurations
- **Build Output**: `dist/` directory (generated, not committed)

### Type Safety
- All platform configurations have corresponding Zod schemas
- Use schema validation before generating commands
- TypeScript types are inferred from Zod schemas using `z.infer<>`

### MCP Server Usage
- RUBE MCP provides Reddit (`REDDIT_*`) and Twitter (`TWITTER_*`) operations
- Subagents automatically handle MCP server integration
- Direct MCP usage available in `examples/direct-mcp-*.ts` files

## Environment Setup

1. Install dependencies: `npm install`
2. Configure MCP: `npm run mcp:setup`
3. Set environment variables in `.env` (copy from `.env.example`)
4. Test setup: `npm run mcp:test`

## Working with This Codebase

When adding new features:
1. Extend types in `src/types.ts` with Zod schemas
2. Add helper methods to appropriate poster class (`reddit-poster.ts` or `twitter-poster.ts`)
3. Update subagent specifications in `.claude/agents/` if needed
4. Create practical examples as shell scripts or TypeScript files
5. Run type checking and linting before commits

When debugging:
1. Use `npm run mcp:test` to verify MCP connectivity
2. Check shell script outputs for command generation
3. Validate configurations against Zod schemas
4. Test with practical examples before implementing complex workflows