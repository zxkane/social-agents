#!/bin/bash

# Reddit Poster Headless Mode Examples
# These examples show how to invoke the reddit-poster subagent using Claude Code's headless mode

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🤖 Reddit Poster Headless Mode Examples${NC}"
echo -e "${BLUE}=======================================${NC}"
echo ""

# Example 1: Simple Reddit post using Task tool with reddit-poster subagent
echo -e "${GREEN}📝 Example 1: Simple Reddit Post${NC}"
echo -e "${GREEN}--------------------------------${NC}"

simple_reddit_post() {
    local subreddit="$1"
    local title="$2"
    local content="$3"
    local flair="${4:-}"

    echo -e "${YELLOW}Creating Reddit post for r/${subreddit}...${NC}"

    # Craft the prompt to use Task tool with reddit-poster subagent
    local prompt="Use the Task tool to create a Reddit post with the reddit-poster subagent:

Task({
  description: \"Reddit post for r/${subreddit}\",
  subagent_type: \"reddit-poster\",
  prompt: \`Create a Reddit post using your expert posting strategies and RUBE MCP server integration.

**Post Details:**
- Subreddit: r/${subreddit}
- Title: ${title}
- Content: ${content}
${flair:+- Flair: ${flair}}
- NSFW: false
- Spoiler: false
- Send Replies: true

Apply your Reddit posting expertise to optimize this content for the target community, avoid spam filters, and ensure maximum engagement through discussion hooks.\`
})"

    # Execute Claude Code in headless mode
    claude -p "$prompt" \
        --output-format json \
        --allowedTools "Task" \
        --permission-mode acceptEdits \
        2>/dev/null || echo -e "${RED}Error: Failed to create Reddit post${NC}"
}

# Example 2: Multi-subreddit posting strategy
echo -e "${GREEN}🎯 Example 2: Multi-Subreddit Strategy${NC}"
echo -e "${GREEN}------------------------------------${NC}"

multi_subreddit_post() {
    local title="$1"
    local content="$2"
    shift 2
    local subreddits=("$@")

    echo -e "${YELLOW}Posting to ${#subreddits[@]} subreddits: ${subreddits[*]}${NC}"

    for subreddit in "${subreddits[@]}"; do
        echo -e "${BLUE}Posting to r/${subreddit}...${NC}"

        local prompt="Use the Task tool to create a Reddit post with the reddit-poster subagent:

Task({
  description: \"Multi-subreddit post for r/${subreddit}\",
  subagent_type: \"reddit-poster\",
  prompt: \`Post to r/${subreddit} with community-specific optimization and anti-spam strategies.

**Post Details:**
- Subreddit: r/${subreddit}
- Title: ${title}
- Content: ${content}
- Apply community-specific tone and culture adaptation
- Use anti-spam filter avoidance techniques
- Optimize for maximum engagement in this specific community

Use your expertise in Reddit posting strategies and r/${subreddit} community culture.\`
})"

        # Execute with rate limiting (5 second delay between posts)
        claude -p "$prompt" \
            --output-format json \
            --allowedTools "Task" \
            --permission-mode acceptEdits \
            2>/dev/null || echo -e "${RED}Error posting to r/${subreddit}${NC}"

        sleep 5  # Rate limiting
    done
}

# Example 3: Content optimization and transformation
echo -e "${GREEN}🔧 Example 3: Content Optimization${NC}"
echo -e "${GREEN}---------------------------------${NC}"

optimize_content() {
    local original_title="$1"
    local original_content="$2"
    local target_subreddit="$3"

    echo -e "${YELLOW}Optimizing content for r/${target_subreddit}...${NC}"

    local prompt="Use the Task tool with the reddit-poster subagent to optimize promotional content:

Task({
  description: \"Optimize content for r/${target_subreddit}\",
  subagent_type: \"reddit-poster\",
  prompt: \`Transform this content into authentic community discussion suitable for r/${target_subreddit}:

**Original Content:**
Title: \"${original_title}\"
Content: \"${original_content}\"

**Optimization Requirements:**
1. Remove all promotional language and external links
2. Convert from announcement/promotion to experience sharing
3. Add technical implementation details and genuine insights
4. Include authentic questions for community engagement
5. Focus on learning and problem-solving rather than product promotion
6. Adapt tone for r/${target_subreddit} community culture
7. Apply anti-spam filter strategies
8. Add discussion hooks and technical depth

**Output Format:**
Provide optimized title and content that would generate valuable discussion while avoiding spam filter triggers. The result should read like a genuine developer sharing experience and seeking community input.\`
})"

    claude -p "$prompt" \
        --output-format json \
        --allowedTools "Task" \
        --permission-mode acceptEdits
}

# Example 4: Get subreddit flairs
echo -e "${GREEN}🏷️  Example 4: Get Subreddit Flairs${NC}"
echo -e "${GREEN}----------------------------------${NC}"

get_subreddit_flairs() {
    local subreddit="$1"

    echo -e "${YELLOW}Getting flairs for r/${subreddit}...${NC}"

    local prompt="Use the Task tool with the reddit-poster subagent to get subreddit flairs:

Task({
  description: \"Get flairs for r/${subreddit}\",
  subagent_type: \"reddit-poster\",
  prompt: \`Analyze the available flairs for r/${subreddit}:

1. Use RUBE MCP server to fetch all available flairs for this subreddit
2. Categorize flairs by content type (Discussion, Help, Showcase, Question, etc.)
3. Recommend the most appropriate flairs for different post types
4. Provide guidelines for flair selection optimization
5. Return structured information including flair IDs, text, descriptions, and usage recommendations

Focus on providing actionable guidance for selecting the optimal flair for different types of technical content.\`
})"

    claude -p "$prompt" \
        --output-format json \
        --allowedTools "Task" \
        --permission-mode acceptEdits
}

# Example 5: Advanced posting strategy with fallbacks
echo -e "${GREEN}🚀 Example 5: Advanced Strategy with Fallbacks${NC}"
echo -e "${GREEN}----------------------------------------------${NC}"

advanced_posting_strategy() {
    local primary_title="$1"
    local primary_content="$2"
    local target_subreddit="$3"

    echo -e "${YELLOW}Executing advanced posting strategy for r/${target_subreddit}...${NC}"

    local prompt="Use the Task tool with the reddit-poster subagent for advanced posting strategy:

Task({
  description: \"Advanced posting strategy for r/${target_subreddit}\",
  subagent_type: \"reddit-poster\",
  prompt: \`Execute an advanced Reddit posting strategy with automatic fallback handling:

**Primary Content:**
- Title: \"${primary_title}\"
- Content: \"${primary_content}\"
- Target: r/${target_subreddit}

**Strategy Requirements:**
1. **Primary Attempt**: Post optimized content with full technical depth
2. **Spam Filter Detection**: Monitor for automatic filtering
3. **Fallback Generation**: If filtered, create 2-3 progressively simplified versions
4. **Community Adaptation**: Adapt tone and technical depth for r/${target_subreddit}
5. **Engagement Optimization**: Add discussion hooks and questions
6. **Timing Consideration**: Suggest optimal posting times for this subreddit

**Expected Actions:**
- Analyze r/${target_subreddit} community culture and posting patterns
- Optimize content for spam filter avoidance
- Create the primary post attempt
- Generate fallback versions if needed
- Provide posting strategy recommendations

Apply your full expertise in Reddit posting mechanics, anti-spam strategies, and r/${target_subreddit} community engagement patterns.\`
})"

    claude -p "$prompt" \
        --output-format json \
        --allowedTools "Task" \
        --permission-mode acceptEdits
}

# Utility function to parse JSON response
parse_reddit_response() {
    local json_response="$1"

    echo -e "${BLUE}📊 Parsing Response:${NC}"
    echo "$json_response" | jq -r '
        if .type == "result" and .subtype == "success" then
            "✅ Success: " + (.result // "No result text")
        else
            "❌ Error: " + (.result // "Unknown error")
        end
    '

    echo -e "${BLUE}💰 Cost: $"
    echo "$json_response" | jq -r '.total_cost_usd // "0.000"'

    echo -e "${BLUE}⏱️  Duration:"
    echo "$json_response" | jq -r '(.duration_ms // 0) / 1000 | tostring + "s"'
}

# Main execution examples
echo -e "${BLUE}📋 Running Examples:${NC}"
echo ""

# Only run examples if called directly (not sourced)
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    case "${1:-demo}" in
        "simple")
            echo -e "${YELLOW}Running simple post example...${NC}"
            response=$(simple_reddit_post "programming" "Built a Reddit automation system with Claude Code subagents" "I implemented a Reddit posting system using Claude Code's subagent architecture. The key insight was using the Task tool to properly invoke specialized subagents rather than reimplementing their functionality. What are your thoughts on this architectural approach?")
            parse_reddit_response "$response"
            ;;

        "multi")
            echo -e "${YELLOW}Running multi-subreddit example...${NC}"
            multi_subreddit_post \
                "AI agent architecture patterns for social media automation" \
                "After building several AI agents, here are the most effective patterns I've discovered..." \
                "programming" "MachineLearning" "artificial"
            ;;

        "optimize")
            echo -e "${YELLOW}Running content optimization example...${NC}"
            response=$(optimize_content \
                "Revolutionary AI Platform Launches!" \
                "Check out our amazing new AI platform at startup.com! 50% off for early users!" \
                "programming")
            parse_reddit_response "$response"
            ;;

        "flairs")
            echo -e "${YELLOW}Getting subreddit flairs...${NC}"
            response=$(get_subreddit_flairs "programming")
            parse_reddit_response "$response"
            ;;

        "advanced")
            echo -e "${YELLOW}Running advanced strategy example...${NC}"
            response=$(advanced_posting_strategy \
                "Building production-ready AI agents: lessons learned" \
                "After deploying several AI agent systems in production, here are the key architectural decisions that made the difference..." \
                "programming")
            parse_reddit_response "$response"
            ;;

        "demo")
            echo -e "${GREEN}🎯 Available Examples:${NC}"
            echo ""
            echo -e "${BLUE}Usage: $0 [example_type]${NC}"
            echo ""
            echo -e "${YELLOW}Examples:${NC}"
            echo "  simple   - Simple Reddit post creation"
            echo "  multi    - Multi-subreddit posting strategy"
            echo "  optimize - Content optimization and transformation"
            echo "  flairs   - Get subreddit flairs"
            echo "  advanced - Advanced posting strategy with fallbacks"
            echo ""
            echo -e "${BLUE}Or source this file to use the functions:${NC}"
            echo "  source headless-examples.sh"
            echo "  simple_reddit_post \"webdev\" \"My Title\" \"My Content\""
            ;;

        *)
            echo -e "${RED}Unknown example: $1${NC}"
            echo -e "${YELLOW}Available: simple, multi, optimize, flairs, advanced, demo${NC}"
            ;;
    esac
fi

echo ""
echo -e "${GREEN}✨ Reddit Poster Headless Examples Complete!${NC}"