#!/bin/bash

# Twitter Poster Headless Mode Examples
# These examples show how to invoke the twitter-poster subagent using Claude Code's headless mode

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Claude Code binary path (bypasses alias conflicts)
CLAUDE_BINARY="/home/ubuntu/.nvm/versions/node/v22.17.0/bin/claude"

# All available MCP tools for subagents (full capability)
ALLOWED_TOOLS="Task,mcp__context7,mcp__aws-documentation-mcp-server,mcp__cdk-mcp-server,mcp__awslabs_frontend-mcp-server,mcp__github,mcp__awslabs_nova-canvas-mcp-server,mcp__feishu,mcp__rube,mcp__magic"

# Twitter expert system prompt from subagent
TWITTER_SYSTEM_PROMPT="You are an expert Twitter/X data management specialist with comprehensive capabilities for content creation, social engagement, data analytics, and platform automation. You handle the complete Twitter workflow from content discovery to performance analysis. You have access to RUBE MCP tools including TWITTER_SEARCH, TWITTER_RECENT_SEARCH, TWITTER_POST_TWEET, TWITTER_CREATE_THREAD, TWITTER_LIKE_TWEET, TWITTER_RETWEET, TWITTER_GET_USER_PROFILE, TWITTER_GET_TRENDS, and other Twitter operations. Use these MCP tools directly to fulfill requests with viral content optimization, engagement analytics, and comprehensive social media analysis."

# Configure Bedrock as Claude Code provider
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_PROFILE=bedrock

echo -e "${BLUE}🔧 Bedrock Configuration:${NC}"
echo -e "  CLAUDE_CODE_USE_BEDROCK: $CLAUDE_CODE_USE_BEDROCK"
echo -e "  AWS_PROFILE: $AWS_PROFILE"
echo ""

echo -e "${BLUE}🔌 MCP Integration:${NC}"
echo -e "  Enabled MCP Tools: Task + All Available MCP Servers"
echo -e "  Primary: RUBE (social media), Context7 (docs), GitHub, AWS, etc."
echo ""

# Verify Claude binary exists and test it
if [ ! -f "$CLAUDE_BINARY" ]; then
    echo -e "${RED}Error: Claude binary not found at $CLAUDE_BINARY${NC}"
    exit 1
fi

echo -e "${BLUE}🔧 Testing Claude binary...${NC}"
if "$CLAUDE_BINARY" --help >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Claude binary is working${NC}"
else
    echo -e "${RED}❌ Claude binary test failed${NC}"
    exit 1
fi

# Enable verbose debugging
export CLAUDE_DEBUG=1

echo -e "${BLUE}🐦 Twitter Poster Headless Mode Examples${NC}"
echo -e "${BLUE}=======================================${NC}"
echo ""

# Display diagnostic information
echo -e "${BLUE}🔧 Environment Diagnostics:${NC}"
echo -e "  Working Directory: $(pwd)"
echo -e "  Claude Binary: $CLAUDE_BINARY"
echo -e "  Node Version: $(node --version 2>/dev/null || echo 'Not available')"
echo -e "  Current User: $(whoami)"
echo -e "  Shell: $SHELL"
echo -e "  PATH: ${PATH:0:100}..."
echo ""

# Check MCP configuration
echo -e "${BLUE}📋 MCP Configuration Status:${NC}"
if [ -f ".claude/mcp-servers.json" ]; then
    echo -e "  Local MCP config: ✅ Found"
    echo -e "  Content (first 200 chars): $(head -c 200 .claude/mcp-servers.json)..."
else
    echo -e "  Local MCP config: ❌ Not found"
fi

if [ -f "$HOME/.claude.json" ]; then
    echo -e "  Global Claude config: ✅ Found"
else
    echo -e "  Global Claude config: ❌ Not found"
fi
echo ""

# Test basic Claude functionality
echo -e "${BLUE}🧪 Testing Claude Basic Functionality:${NC}"
echo -e "${YELLOW}Environment check:${NC}"
echo -e "  TTY: $(tty 2>/dev/null || echo 'not a tty')"
echo -e "  STDIN: $(ls -la /proc/self/fd/0 2>/dev/null || echo 'unknown')"

# Skip prompt execution test due to TTY issues in non-interactive environments
echo -e "${YELLOW}⚠️  Skipping basic prompt test (non-TTY environment detected)${NC}"
echo -e "${BLUE}🧪 Testing Claude binary version instead:${NC}"

if "$CLAUDE_BINARY" --version >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Claude binary is accessible and working${NC}"
    claude_version=$("$CLAUDE_BINARY" --version 2>/dev/null)
    echo -e "${BLUE}  Version: $claude_version${NC}"
else
    echo -e "${RED}❌ Claude binary version failed${NC}"
    echo -e "${RED}⚠️  Skipping Twitter operations due to basic Claude CLI failure${NC}"
    exit 1
fi
echo ""

# Example 1: Simple Twitter post using Task tool with twitter-poster subagent
echo -e "${GREEN}📝 Example 1: Simple Twitter Post${NC}"
echo -e "${GREEN}--------------------------------${NC}"

simple_twitter_post() {
    local content="$1"
    local media_urls="${2:-}"
    local sensitive="${3:-false}"

    echo -e "${YELLOW}Creating Twitter post...${NC}"

    local prompt="Use the Task tool with twitter-poster subagent to create and post a viral Twitter post. Content: ${content}. Media: ${media_urls}. Sensitive: ${sensitive}. Apply viral optimization, hashtags, and TWITTER_POST_TWEET."

    # Execute Claude Code in headless mode
    "$CLAUDE_BINARY" -p "$prompt" \
        --output-format json \
        --allowedTools "$ALLOWED_TOOLS" \
        --permission-mode acceptEdits \
        2>/dev/null || echo -e "${RED}Error: Failed to create Twitter post${NC}"
}

# Example 2: Twitter thread creation with progressive disclosure
echo -e "${GREEN}🧵 Example 2: Twitter Thread Creation${NC}"
echo -e "${GREEN}----------------------------------${NC}"

create_twitter_thread() {
    local hook="$1"
    local main_content="$2"
    local conclusion="$3"

    echo -e "${YELLOW}Creating Twitter thread with viral optimization...${NC}"

    local prompt="Use the Task tool with twitter-poster subagent to create viral Twitter thread. Hook: ${hook}. Content: ${main_content}. Conclusion: ${conclusion}. Apply progressive disclosure, engagement checkpoints, and TWITTER_CREATE_THREAD."

    "$CLAUDE_BINARY" -p "$prompt" \
        --output-format json \
        --allowedTools "$ALLOWED_TOOLS" \
        --permission-mode acceptEdits \
        2>/dev/null || echo -e "${RED}Error: Failed to create Twitter thread${NC}"
}

# Example 3: Content optimization for viral potential
echo -e "${GREEN}🔥 Example 3: Viral Content Optimization${NC}"
echo -e "${GREEN}--------------------------------------${NC}"

optimize_for_viral() {
    local original_content="$1"
    local content_type="${2:-tweet}"
    local target_audience="${3:-mixed}"

    echo -e "${YELLOW}Optimizing content for viral potential...${NC}"

    local prompt="Use the Task tool with twitter-poster subagent to optimize content for viral engagement. Original: ${original_content}. Type: ${content_type}. Audience: ${target_audience}. Apply hook optimization, hashtag strategy, and engagement triggers."

    "$CLAUDE_BINARY" -p "$prompt" \
        --output-format json \
        --allowedTools "$ALLOWED_TOOLS" \
        --permission-mode acceptEdits
}

# Example 4: Get Twitter trending topics and hashtag analysis
echo -e "${GREEN}📈 Example 4: Trending Analysis & Hashtag Strategy${NC}"
echo -e "${GREEN}-------------------------------------------------${NC}"

analyze_twitter_trends() {
    local location="${1:-global}"

    echo -e "${YELLOW}Analyzing Twitter trends for hashtag strategy...${NC}"

    local prompt="Use the Task tool with twitter-poster subagent to analyze Twitter trends for location: ${location}. Use TWITTER_GET_TRENDS, identify viral hashtags, provide timing recommendations, and suggest content strategies for tech/development audience."

    "$CLAUDE_BINARY" -p "$prompt" \
        --output-format json \
        --allowedTools "$ALLOWED_TOOLS" \
        --permission-mode acceptEdits
}

# Example 5: Multi-format content strategy (tweet + thread + media)
echo -e "${GREEN}🎯 Example 5: Multi-Format Content Strategy${NC}"
echo -e "${GREEN}------------------------------------------${NC}"

multi_format_strategy() {
    local topic="$1"
    local key_insights="$2"
    local media_url="${3:-}"

    echo -e "${YELLOW}Creating multi-format Twitter content strategy...${NC}"

    local prompt="Use the Task tool with twitter-poster subagent for multi-format content strategy. Topic: ${topic}. Insights: ${key_insights}. Media: ${media_url}. Create viral hook tweet, educational thread, and visual content with coordinated posting strategy."

    "$CLAUDE_BINARY" -p "$prompt" \
        --output-format json \
        --allowedTools "$ALLOWED_TOOLS" \
        --permission-mode acceptEdits
}

# Example 6: Advanced engagement and community building
echo -e "${GREEN}🤝 Example 6: Advanced Engagement & Community Building${NC}"
echo -e "${GREEN}----------------------------------------------------${NC}"

community_engagement_strategy() {
    local niche="$1"
    local expertise_area="$2"
    local engagement_goals="$3"

    echo -e "${YELLOW}Creating advanced community engagement strategy...${NC}"

    local prompt="Use the Task tool with twitter-poster subagent for advanced community engagement strategy. Niche: ${niche}. Expertise: ${expertise_area}. Goals: ${engagement_goals}. Develop authentic engagement tactics, thought leadership content, and long-term relationship building."

    "$CLAUDE_BINARY" -p "$prompt" \
        --output-format json \
        --allowedTools "$ALLOWED_TOOLS" \
        --permission-mode acceptEdits
}

# Example 7: Twitter Search and Discovery
echo -e "${GREEN}🔍 Example 7: Twitter Search & Discovery${NC}"
echo -e "${GREEN}-------------------------------------${NC}"

twitter_search_operation() {
    local query="$1"
    local max_results="${2:-20}"
    local min_likes="${3:-10}"
    local lang="${4:-en}"

    echo -e "${YELLOW}🔍 Executing Twitter search operation...${NC}"
    echo -e "${BLUE}Parameters:${NC}"
    echo -e "  Query: ${query}"
    echo -e "  Max Results: ${max_results}"
    echo -e "  Min Likes: ${min_likes}"
    echo -e "  Language: ${lang}"
    echo ""

    local prompt
    printf -v prompt "Use RUBE_MULTI_EXECUTE_TOOL to search Twitter: Execute TWITTER_RECENT_SEARCH with query=%s max_results=%s lang=%s" "$query" "$max_results" "$lang"

    echo -e "${BLUE}📝 Generated prompt (first 200 chars):${NC}"
    echo "${prompt:0:200}..."
    echo ""

    echo -e "${BLUE}🚀 Executing Claude command (direct MCP approach)...${NC}"
    echo -e "${YELLOW}Command: $CLAUDE_BINARY -p [prompt] --allowedTools mcp__rube${NC}"
    echo ""
    echo -e "${GREEN}📡 Claude Response (streaming):${NC}"
    echo -e "${BLUE}================================================================================${NC}"

    # Add timeout and capture both stdout and stderr
    local start_time=$(date +%s)

    # Use timeout command with streaming output - direct MCP approach (proven to work)
    timeout 120s "$CLAUDE_BINARY" -p "$prompt" \
        --allowedTools "mcp__rube" \
        2>&1 | tee /tmp/claude_output.log

    local exit_code=$?
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))

    echo ""
    echo -e "${BLUE}================================================================================${NC}"
    echo -e "${BLUE}⏱️  Execution completed after ${duration}s with exit code: ${exit_code}${NC}"

    case $exit_code in
        0)
            echo -e "${GREEN}✅ Twitter search completed successfully${NC}"
            ;;
        124)
            echo -e "${RED}⏰ Command timed out after 120 seconds${NC}"
            ;;
        *)
            echo -e "${RED}❌ Command failed with exit code: ${exit_code}${NC}"
            ;;
    esac

    echo ""
    echo -e "${BLUE}📋 Full response saved to: /tmp/claude_output.log${NC}"
}

# WORKING: Direct MCP Twitter Search Function
direct_twitter_search() {
    local query="$1"
    local max_results="${2:-10}"
    local lang="${3:-en}"

    echo -e "${GREEN}🔍 Direct MCP Twitter Search (WORKING)${NC}"
    echo -e "${BLUE}Query: $query${NC}"
    echo -e "${BLUE}Max Results: $max_results, Language: $lang${NC}"
    echo ""

    local prompt
    printf -v prompt "Use RUBE_MULTI_EXECUTE_TOOL to search Twitter: Execute TWITTER_RECENT_SEARCH with query=%s max_results=%s lang=%s" "$query" "$max_results" "$lang"

    echo -e "${GREEN}📡 Claude Response (streaming):${NC}"
    echo -e "${BLUE}================================================================================${NC}"

    timeout 120s "$CLAUDE_BINARY" -p "$prompt" \
        --allowedTools "mcp__rube" \
        2>&1 | tee /tmp/direct_search.log

    local exit_code=$?
    echo ""
    echo -e "${BLUE}================================================================================${NC}"

    if [ $exit_code -eq 0 ]; then
        echo -e "${GREEN}✅ Direct MCP search completed successfully!${NC}"
        echo -e "${BLUE}📋 Full response saved to: /tmp/direct_search.log${NC}"
    else
        echo -e "${RED}❌ Direct MCP search failed (exit code: $exit_code)${NC}"
    fi
}

# Main execution examples
echo -e "${BLUE}📋 Running Twitter Examples:${NC}"
echo ""

# Only run examples if called directly (not sourced)
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    case "${1:-demo}" in
        "simple")
            echo -e "${YELLOW}Running simple tweet example...${NC}"
            response=$(simple_twitter_post "Built a Twitter automation system with Claude Code subagents! 🤖 The key was using the Task tool to invoke specialized subagents rather than reimplementing functionality. What's your experience with AI agent architectures? #AI #automation")
            ;;

        "thread")
            echo -e "${YELLOW}Running thread creation example...${NC}"
            response=$(create_twitter_thread \
                "🧵 Thread: 3 AI agent patterns that changed how I build systems" \
                "After building 10+ AI agent systems, these architectural patterns consistently deliver the best results: 1) Subagent specialization, 2) Task-based delegation, 3) Type-safe coordination layers" \
                "What patterns have you found most effective? Share your AI architecture insights below! 👇")
            ;;

        "optimize")
            echo -e "${YELLOW}Running viral optimization example...${NC}"
            response=$(optimize_for_viral \
                "Our company just launched a revolutionary AI platform that automates social media posting! Check out our website for 50% off early bird pricing!" \
                "tweet" \
                "technical")
            ;;

        "trends")
            echo -e "${YELLOW}Analyzing Twitter trends...${NC}"
            response=$(analyze_twitter_trends "global")
            ;;

        "multi")
            echo -e "${YELLOW}Running multi-format strategy example...${NC}"
            response=$(multi_format_strategy \
                "AI Agent Architecture Patterns" \
                "Subagent specialization beats monolithic agents, Task delegation enables type safety, Progressive enhancement scales better than big-bang rewrites" \
                "")
            ;;

        "community")
            echo -e "${YELLOW}Creating community engagement strategy...${NC}"
            response=$(community_engagement_strategy \
                "AI/ML developers" \
                "AI agent architectures and automation systems" \
                "Build thought leadership, grow engaged developer following, establish expertise")
            ;;

        "search")
            search_query="${2:-AI agent architecture OR subagent patterns}"
            max_results="${3:-25}"
            min_likes="${4:-5}"
            language="${5:-en}"

            twitter_search_operation \
                "$search_query" \
                "$max_results" \
                "$min_likes" \
                "$language"
            ;;

        "demo")
            echo -e "${GREEN}🐦 Available Twitter Examples:${NC}"
            echo ""
            echo -e "${BLUE}Usage: $0 [example_type]${NC}"
            echo ""
            echo -e "${YELLOW}Content Creation Examples:${NC}"
            echo "  simple    - Simple Twitter post creation with viral optimization"
            echo "  thread    - Twitter thread creation with progressive disclosure"
            echo "  optimize  - Viral content optimization and transformation"
            echo "  trends    - Twitter trends analysis and hashtag strategy"
            echo "  multi     - Multi-format content strategy (tweet + thread + media)"
            echo "  community - Advanced engagement and community building"
            echo ""
            echo -e "${YELLOW}Data Management Examples:${NC}"
            echo "  search [\"query\"] [max_results] [min_likes] [lang] - Twitter search and discovery operations"
            echo ""
            echo -e "${BLUE}Examples:${NC}"
            echo "  $0 search \"AWS AgentCore\" 50 2 en    # Search AWS AgentCore tweets"
            echo "  $0 search \"AI automation\" 25 5       # Search AI automation (default lang)"
            echo ""
            echo -e "${BLUE}Or source this file to use the functions:${NC}"
            echo "  source twitter-headless-examples.sh"
            echo "  simple_twitter_post \"Your tweet content here #hashtag\""
            echo "  twitter_search_operation \"AI agents\" 20 10 \"en\""
            ;;

        *)
            echo -e "${RED}Unknown example: $1${NC}"
            echo -e "${YELLOW}Available examples:${NC}"
            echo -e "${YELLOW}Content: simple, thread, optimize, trends, multi, community${NC}"
            echo -e "${YELLOW}Data: search${NC}"
            echo -e "${YELLOW}Info: demo${NC}"
            ;;
    esac
fi

# Test if user wants to use the WORKING direct search
if [[ "$1" == "direct" ]]; then
    shift
    direct_twitter_search "$@"
    exit 0
fi