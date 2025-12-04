# Hooks and Permissions Management

## Permission Management

### Permission Philosophy

**Allow by default**:
- Development tools: git, npm, python, grep, ls
- Read operations
- Safe commands

**Deny destructive**:
- File operations: rm, mv, cp, dd
- System modifications: sudo, sysctl, mount
- Text editors via bash: sed, awk -i (use Edit tool instead)

**Protect secrets**:
- .env files
- .ssh/ directory
- .aws/ directory
- .config/gcloud/ directory

### Adding New Permissions

**Step 1**: Edit `settings.local.json`

**Step 2**: Add to `permissions.allow` array

**Step 3**: Use specific patterns

**Step 4**: Restart Claude Code

**Example**:
```json
{
  "permissions": {
    "allow": [
      "Bash(git status:*)",      // Specific command
      "Bash(npm:*)",              // All npm commands
      "Read",                     // Entire tool
      "Write",                    // Entire tool
      "mcp__postgresql__query"    // MCP tool
    ]
  }
}
```

### Permission Patterns

**Tool-level permissions:**
```json
"Read"                    // Allow all Read operations
"Write"                   // Allow all Write operations
"Edit"                    // Allow all Edit operations
```

**Command-level permissions:**
```json
"Bash(git:*)"            // ALL git commands
"Bash(git status:*)"     // Only git status
"Bash(git commit:*)"     // Only git commit
"Bash(npm install:*)"    // Only npm install
```

**File-path permissions:**
```json
"Read(//Users/iwoszapar/project/**)"     // Read specific directory tree
"Write(//Users/iwoszapar/output/**)"     // Write to specific directory
```

**MCP tool permissions:**
```json
"mcp__postgresql__query"                 // PostgreSQL queries
"mcp__google-workspace__search_gmail_messages"  // Gmail search
```

### Pattern Matching Rules

**Wildcards**:
- `*` matches any characters
- `**` matches any directories (in file paths)
- Patterns must match exactly

**Examples**:
```json
"Bash(git:*)"              // Matches: git status, git commit, git push
"Bash(git status:*)"       // Matches: git status ONLY
"Read(//Users/name/**)"    // Matches any file under /Users/name/
```

### Deny List

Block specific operations even if otherwise allowed:

```json
{
  "permissions": {
    "deny": [
      "Bash(rm:*)",          // Block file deletion
      "Bash(sudo:*)",        // Block sudo
      "Read(//.env)",        // Block reading .env
      "Write(//.env)"        // Block writing .env
    ]
  }
}
```

### Current Permission Set

See `settings.local.json` for current permissions. Key allowed operations include:

**Git operations**: add, commit, push, fetch, pull, status, log, diff, config
**Package management**: npm, pip3, uv, npx
**Development**: python3, node, make, bash scripts
**File operations**: Read, Write, Edit (via tools, not bash)
**Business tools**: All Google Workspace, HubSpot, LinkedIn MCP tools
**Database**: PostgreSQL read-only queries

## Hook System

### Hook Types

**UserPromptSubmit**: Runs on every user prompt
**Command hooks**: Run after specific commands/tools

### Current Hooks

**UserPromptSubmit Hook**:
- Reminds Claude of business context (CLAUDE.md + company brain/INDEX.md)
- Enforces engineering principles (KISS, DRY, SOLID, YAGNI)
- Sets quality calibration (Enterprise/MVP/POC)
- Defines sub-agent protocol

**Command Hooks**:
- `.claude/hooks/on-outreach-stop.sh` - Shows next prospects after `/interview-outreach`
- `.claude/hooks/on-agent-complete.sh` - Runs when sub-agents finish
- `.claude/hooks/on-claude-needs-input.sh` - Runs when Claude needs user input

### Creating New Hooks

**Step 1**: Create script in `.claude/hooks/`

```bash
touch .claude/hooks/my-hook.sh
chmod +x .claude/hooks/my-hook.sh
```

**Step 2**: Write hook script

```bash
#!/bin/bash
# .claude/hooks/my-hook.sh

# Your hook logic here
echo "Hook executed!"
```

**Step 3**: Reference in `settings.local.json`

```json
{
  "hooks": {
    "userPromptSubmit": [
      "$CLAUDE_PROJECT_DIR/.claude/hooks/my-hook.sh"
    ]
  }
}
```

**Step 4**: Test hook manually

```bash
./.claude/hooks/my-hook.sh
```

**Step 5**: Restart Claude Code

### Hook Environment Variables

Available in hook scripts:

```bash
$CLAUDE_PROJECT_DIR    # Project root directory
$CLAUDE_USER_MSG       # User's message (for UserPromptSubmit)
$CLAUDE_TOOL_NAME      # Tool that triggered hook
$CLAUDE_TOOL_RESULT    # Result from tool
```

### Hook Best Practices

**1. Make executable**:
```bash
chmod +x .claude/hooks/*.sh
```

**2. Use shebang**:
```bash
#!/bin/bash
```

**3. Handle errors gracefully**:
```bash
set -e  # Exit on error
trap 'echo "Hook failed"' ERR
```

**4. Keep hooks fast**:
- Avoid slow operations
- Use caching when possible
- Defer expensive work

**5. Test in both bash and zsh**:
```bash
bash .claude/hooks/my-hook.sh
zsh .claude/hooks/my-hook.sh
```

### Shell Compatibility

**Problem**: macOS uses zsh by default, but some syntax is bash-specific.

**Solution**: Use portable syntax

**Example - Reading files:**

```bash
# ❌ Bash-only (doesn't work in zsh)
mapfile -t lines < file.txt

# ✅ Portable (works in bash and zsh)
while IFS= read -r line; do
  lines+=("$line")
done < file.txt
```

**Example - Arrays:**

```bash
# ✅ Both work the same
array=()
array+=("item")
echo "${array[@]}"
```

### Hook Debugging

**Check if hook is executable:**
```bash
ls -l .claude/hooks/
# Should show -rwxr-xr-x
```

**Check for syntax errors:**
```bash
bash -n .claude/hooks/my-hook.sh
```

**Run hook manually:**
```bash
./.claude/hooks/my-hook.sh
echo $?  # Should be 0 for success
```

**View hook output:**
```bash
# Hooks output to stderr/stdout
# Check Claude Code console for output
```

### Example Hooks

**UserPromptSubmit - Context Reminder:**
```bash
#!/bin/bash
# Remind Claude of business context

cat << EOF
Remember:
- Business: AI Maturity Index
- Primary context: company brain/INDEX.md
- Engineering: KISS, DRY, SOLID, YAGNI
EOF
```

**Tool Hook - Post-Query Formatting:**
```bash
#!/bin/bash
# Format PostgreSQL query results

# Read tool result from stdin
result=$(cat)

# Format and output
echo "$result" | jq '.' 2>/dev/null || echo "$result"
```

### Sub-Agent Context Exchange Protocol

When using specialized sub-agents:

**Step 1**: Generate session ID
```bash
session_id="session-$(date +%Y%m%d-%H%M%S)-$(openssl rand -hex 2)"
```

**Step 2**: Create context directory
```bash
mkdir -p .agents-context
```

**Step 3**: Pass environment variables
```bash
AGENT_SESSION_ID="$session_id" \
PROJECT_ROOT="$PWD" \
agent-command
```

**Step 4**: Sub-agent writes findings
```bash
# Sub-agent writes to:
.agents-context/${AGENT_SESSION_ID}.md
```

**Step 5**: Reuse session ID for related work
```bash
# Same session ID for follow-up consultations
AGENT_SESSION_ID="session-20250102-143000-a1b2" \
agent-command
```

**Benefits**:
- Unlimited context size
- Persistent findings
- Parallel agent execution
- Complete audit trail

## Security Model

### What's Blocked

**Destructive file operations**:
- `rm`, `mv`, `cp`, `dd` blocked
- Use Read/Write/Edit tools instead

**System modifications**:
- `sudo`, `sysctl`, `mount` blocked

**Text editors via bash**:
- `sed -i`, `awk -i` blocked
- Use Edit tool instead

**Secrets**:
- `.env` files
- `.ssh/` directory
- `.aws/` directory
- `.config/gcloud/` directory

### What's Allowed

**Safe development tools**:
- `ls`, `grep`, `find`, `cat`
- `git`, `npm`, `python`, `go`, `make`
- Read, Write, Edit tools
- All MCP tools

**Business operations**:
- Full HubSpot access
- Full LinkedIn access
- Full Google Workspace access
- PostgreSQL read-only queries

## Best Practices

1. **Minimal permissions**: Only allow what's needed
2. **Specific patterns**: Use `Bash(git status:*)` not `Bash(git:*)`
3. **Test changes**: Verify workflows after permission updates
4. **Version control**: Track `settings.local.json` in git
5. **Regular reviews**: Audit permissions quarterly
6. **Security first**: When in doubt, add to deny list
7. **Use tools over bash**: Prefer Read/Write/Edit over cat/echo/sed
