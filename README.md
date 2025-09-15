# Reddit Poster - Headless Mode Implementation

A TypeScript-based Reddit posting system that generates headless Claude Code commands to invoke the reddit-poster subagent for automated Reddit content posting with spam filter avoidance and community engagement optimization.

## Features

- 🤖 **Headless Reddit Posting**: Generate Claude Code CLI commands for automated posting
- 🛡️ **Anti-Spam Strategies**: Built-in content optimization and spam filter avoidance
- 🎯 **Content Optimization**: Automatic content adaptation for different subreddit cultures
- 🏷️ **Flair Management**: Generate commands for flair retrieval and selection
- 🔄 **Fallback Strategies**: Multiple content versions for filtered post recovery
- 📊 **Multi-Subreddit Support**: Batch posting commands across multiple communities
- 🔍 **Community Intelligence**: Subreddit-specific tone and style adaptation via subagent
- ⚡ **Type Safety**: Full TypeScript implementation with Zod schema validation
- 🚀 **Headless Automation**: Pure command generation without SDK dependencies

## Architecture

This implementation generates headless Claude Code commands to invoke the **reddit-poster subagent** defined in `.claude/agents/reddit-poster.md`:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  TypeScript     │───▶│ Headless CLI    │───▶│ reddit-poster   │
│  Generators     │    │ Commands        │    │ subagent        │
│                 │    │                 │    │                 │
│  - Configuration│    │ claude -p       │    │ - Reddit Logic  │
│  - Validation   │    │ "Task(...)"     │    │ - Anti-Spam     │
│  - Command Gen  │    │ --headless      │    │ - RUBE MCP      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**Key Principle:** TypeScript generates headless commands that invoke the reddit-poster subagent via `claude -p` CLI commands, providing type safety and configuration management without SDK dependencies.

### Why Use the Subagent Approach?

✅ **Correct (Subagent)**: Use Task tool to invoke reddit-poster subagent
- Leverages Claude Code's built-in Reddit expertise
- Automatically handles spam filter avoidance and community culture adaptation
- Gets regular updates to anti-spam strategies
- Uses proven RUBE MCP server integration
- Maintains authentic community engagement patterns

❌ **Incorrect (Direct Implementation)**: Reimplement Reddit posting logic
- Would need to recreate complex spam detection algorithms
- Requires manual updates when Reddit changes policies
- Missing community culture knowledge and adaptation
- No built-in anti-spam expertise
- Risk of appearing inauthentic or promotional

## Installation

1. **Prerequisites**: Ensure you have Claude Code CLI installed and RUBE MCP server configured
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Build the project**:
   ```bash
   npm run build
   ```

## Quick Start

### Headless Command Generation

Generate headless Claude Code commands to invoke the reddit-poster subagent:

```typescript
import { RedditPoster } from './src/reddit-poster.js';

// 1. Configure your Reddit post
const config = {
  subreddit: 'programming',
  title: 'My experience with TypeScript and Reddit automation',
  content: `I built a Reddit posting system using Claude Code's headless mode...

  What has been your experience with AI automation systems?`,
  flair: 'Discussion',
  nsfw: false,
  spoiler: false,
  sendReplies: true
};

// 2. Generate headless Claude Code command
const command = RedditPoster.generateHeadlessCommand(
  config,
  'Create this Reddit post using your expert posting strategies'
);

console.log('Execute this command:');
console.log(command);

// Output: claude -p "Use the Task tool to invoke the reddit-poster subagent: Task({...})" --output-format json --allowedTools "Task" --permission-mode acceptEdits
```

### Shell Script Integration

```bash
#!/bin/bash
source headless-examples.sh

# Post to Reddit using the headless functions
simple_reddit_post "programming" "My Title" "My Content" "Discussion"

# Or use the TypeScript command generator
command=$(npx tsx headless-simple-example.ts simple programming "My Title" "My Content")
eval "$command"
```

### Multi-Subreddit Strategy

```typescript
import { RedditPostConfig } from './src/types.js';

const baseConfig: RedditPostConfig = {
  subreddit: '', // Will be set per target
  title: 'Built an AI agent for Reddit posting',
  content: 'Technical content with discussion hooks...',
  flair: 'Discussion'
};

const subreddits = ['programming', 'MachineLearning', 'artificial'];

// Generate headless commands for each subreddit
subreddits.forEach(sub => {
  const config = { ...baseConfig, subreddit: sub };
  const instruction = `Post to r/${sub} with community-specific optimization`;

  const command = RedditPoster.generateHeadlessCommand(config, instruction);
  console.log(`# Command for r/${sub}:`);
  console.log(command);
  console.log('');
});
```

## API Reference

### RedditPoster Class (Static Methods)

#### `createSubagentPrompt(config: RedditPostConfig, instruction?: string)`
Creates Task tool parameters for invoking the reddit-poster subagent.

**Returns:** `{ description: string, prompt: string, subagent_type: string }`

#### `generateHeadlessCommand(config: RedditPostConfig, instruction?: string): string`
Generates complete headless Claude Code CLI command.

**Returns:** Full `claude -p "..."` command string ready for execution.

#### `validateConfig(config: RedditPostConfig)`
Validates Reddit post configuration using Zod schemas.

**Returns:** `{ valid: boolean, error?: string }`

#### `optimizeContent(title: string, content: string, optimization: ContentOptimization)`
Optimizes content for Reddit posting (removes links, adds discussion hooks, etc.).

**Returns:** `{ optimizedTitle: string, optimizedContent: string }`

#### `generateFallbackVersions(config: RedditPostConfig, count?: number): RedditPostConfig[]`
Generates progressively simplified fallback content versions for spam filter avoidance.

#### `createFlairPrompt(subreddit: string)`
Creates Task tool parameters for retrieving subreddit flairs.

#### `createOptimizationPrompt(originalTitle: string, originalContent: string, targetSubreddit: string)`
Creates Task tool parameters for content optimization and transformation.

### Type Definitions

#### RedditPostConfig
```typescript
interface RedditPostConfig {
  subreddit: string;
  title: string;
  content?: string;
  url?: string;
  flair?: string;
  nsfw?: boolean;
  spoiler?: boolean;
  sendReplies?: boolean;
}
```

#### ContentOptimization
```typescript
interface ContentOptimization {
  maxLength: number;
  removeExternalLinks: boolean;
  addDiscussionHooks: boolean;
  simplifyLanguage: boolean;
  targetAudience: 'technical' | 'general' | 'mixed';
}
```

#### RedditPostResult
```typescript
interface RedditPostResult {
  success: boolean;
  postId?: string;
  url?: string;
  error?: string;
  filtered?: boolean;
  subreddit: string;
  title: string;
}
```

## CLI Usage

The project includes multiple headless mode examples and command generators:

```bash
# Run practical examples showing real usage patterns
npm run practical

# Execute shell script examples directly
./headless-examples.sh simple
./headless-examples.sh multi
./headless-examples.sh optimize

# Generate commands programmatically
node -e "
import('./src/reddit-poster.js').then(m => {
  const config = { subreddit: 'programming', title: 'Test', content: 'Test content' };
  console.log(m.RedditPoster.generateHeadlessCommand(config));
});"

# Build and type-check the project
npm run build
npm run type-check
npm run lint
```

## Content Optimization Features

### Anti-Spam Strategies

1. **External Link Removal**: Automatically removes or relocates external URLs
2. **Content Simplification**: Progressive content shortening for spam filter avoidance
3. **Discussion Hook Generation**: Adds engaging questions to encourage community interaction
4. **Language Simplification**: Converts technical jargon for broader audiences
5. **Fallback Versions**: Creates multiple content variants with increasing simplification

### Community Adaptation

- **Subreddit Culture Analysis**: Adapts tone and style for different communities
- **Flair Optimization**: Automatic selection of appropriate post flairs
- **Timing Optimization**: Support for optimal posting time configuration
- **Technical Audience Targeting**: Maintains technical depth for developer communities

## MCP Integration

This implementation uses the RUBE MCP server for Reddit API access through Claude Code CLI:

### Required MCP Tools
The reddit-poster subagent uses these tools automatically via RUBE MCP server:
- `RUBE_MULTI_EXECUTE_TOOL` with `REDDIT_CREATE_REDDIT_POST`
- `RUBE_MULTI_EXECUTE_TOOL` with `REDDIT_GET_USER_FLAIR`

### MCP Configuration
Ensure Claude Code CLI has access to RUBE MCP server for the reddit-poster subagent:

```bash
# The reddit-poster subagent handles MCP server integration automatically
# Just ensure Claude Code CLI is properly configured with MCP servers
claude --help  # Verify CLI is available for headless commands
```

## Development

### Scripts

```bash
npm run build        # Build TypeScript to JavaScript
npm run dev         # Run with tsx (development mode)
npm run type-check  # TypeScript type checking
npm run lint        # ESLint code quality check
```

### Project Structure

```
src/
├── index.ts           # Main entry point and CLI
├── reddit-poster.ts   # Core Reddit posting implementation
└── types.ts          # TypeScript type definitions

.claude/
└── agents/
    └── reddit-poster.md  # Agent specification and strategies

dist/                 # Compiled JavaScript output (generated)
```

## Error Handling

The implementation includes comprehensive error handling:

- **Validation Errors**: Zod schema validation for all inputs
- **API Errors**: Graceful handling of Reddit API failures
- **Spam Filter Detection**: Automatic detection and fallback strategies
- **Process Errors**: Robust Claude Code CLI process management
- **Network Errors**: Timeout and retry mechanisms

## Examples

### Simple Post Creation

```typescript
import { RedditPoster } from './src/reddit-poster.js';

const config = {
  subreddit: 'webdev',
  title: 'Thoughts on modern TypeScript patterns',
  content: 'I\'ve been exploring advanced TypeScript patterns...',
  flair: 'Discussion'
};

// Generate headless command
const command = RedditPoster.generateHeadlessCommand(config);
console.log('Execute:', command);

// Or get Task tool parameters for direct use
const taskParams = RedditPoster.createSubagentPrompt(config);
console.log('Task params:', taskParams);
```

### Advanced Multi-Subreddit Strategy

```typescript
import { RedditPostConfig } from './src/types.js';

const baseConfig: RedditPostConfig = {
  subreddit: '',
  title: 'Building AI agents for social media automation',
  content: 'Technical deep-dive with code examples...',
  flair: 'Discussion'
};

const subreddits = ['programming', 'MachineLearning', 'artificial', 'compsci'];

// Generate fallback versions for spam filter avoidance
const fallbacks = RedditPoster.generateFallbackVersions(baseConfig, 2);

// Create commands for each subreddit with fallbacks
subreddits.forEach(sub => {
  const configs = [{ ...baseConfig, subreddit: sub }, ...fallbacks.map(f => ({ ...f, subreddit: sub }))];

  configs.forEach((config, index) => {
    const instruction = index === 0
      ? `Post to r/${sub} with community-specific optimization`
      : `Fallback ${index} for r/${sub} - simplified version`;

    const command = RedditPoster.generateHeadlessCommand(config, instruction);
    console.log(`# ${sub} - Attempt ${index + 1}:`);
    console.log(command);
  });
});
```

### Content Optimization

```typescript
// Transform promotional content to authentic discussion
const optimizationParams = RedditPoster.createOptimizationPrompt(
  'Revolutionary AI Platform Launches!',
  'Check out our amazing new platform at startup.com!',
  'programming'
);

const command = `claude -p "Use the Task tool: Task(${JSON.stringify(optimizationParams)})" --output-format json --allowedTools "Task" --permission-mode acceptEdits`;
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes with proper TypeScript types
4. Run tests: `npm run type-check && npm run build`
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Related

- [Claude Code CLI Documentation](https://docs.anthropic.com/claude-code)
- [RUBE MCP Server](https://github.com/composio/rube)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Reddit API Documentation](https://www.reddit.com/dev/api/)