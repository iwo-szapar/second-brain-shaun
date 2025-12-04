# Troubleshooting Guide

## Permission Denied Errors

**Symptom**: Commands fail with "Permission denied" error

**Diagnosis**:
1. Check if command is in `permissions.allow` in `settings.local.json`
2. Ensure pattern matches exactly (wildcards matter)
3. Look for conflicting entries in `permissions.deny`

**Solution**:
```json
// In settings.local.json
{
  "permissions": {
    "allow": [
      "Bash(command:*)",    // Add command with wildcard
      "Read",               // Or entire tool
      "Write"
    ]
  }
}
```

**After changes**: Restart Claude Code

### Permission Pattern Matching

Patterns must match exactly:
- `Bash(git:*)` - Allows ALL git commands
- `Bash(git status:*)` - Allows only `git status`
- `Bash(git commit:*)` - Allows only `git commit`

## MCP Server Not Working

**Symptom**: Server installed but tools not available

### Step 1: Verify Server Config
```bash
# Check server exists in config
cat /Users/iwoszapar/.claude/mcp.json | grep "server-name"
```

### Step 2: Check Configuration Conflicts
**Common issue**: Both settings conflict:
- `enableAllProjectMcpServers: true` AND
- `enabledMcpjsonServers: [...]` array exists

**Fix**: Remove `enabledMcpjsonServers` array from `settings.local.json`

### Step 3: Verify Server Command
```bash
# Test server manually
node /path/to/server/index.js
# Should start without errors
```

### Step 4: Check Environment Variables
Verify env vars in server config:
```json
{
  "mcpServers": {
    "server-name": {
      "env": {
        "API_KEY": "value"  // Check this exists and is correct
      }
    }
  }
}
```

### Step 5: Restart Claude Code
MCP servers only load at startup.

### Step 6: Check Startup Logs
Look for server loading errors in Claude Code startup output.

## OAuth-Based MCP Servers (Linear, etc.)

**Symptom**: Authentication fails or tools don't work

### First Use
1. First tool use triggers browser-based OAuth flow
2. Authenticate in browser window
3. Credentials stored in `~/.mcp-auth/{server-hash}.json`

### Authentication Failures

**Solution**:
```bash
# Remove all stored auth credentials
rm -rf ~/.mcp-auth

# Restart Claude Code

# Retry the tool - OAuth flow will trigger again
```

### Check Debug Logs
```bash
# View authentication debug logs
ls -la ~/.mcp-auth/
cat ~/.mcp-auth/*_debug.log
```

## Hook Not Running

**Symptom**: Hook script doesn't execute when expected

### Step 1: Verify Executable
```bash
# Check hook is executable
ls -l .claude/hooks/

# If not executable, fix it:
chmod +x .claude/hooks/script.sh
```

### Step 2: Verify Hook Path
Check `settings.local.json` has correct path:
```json
{
  "hooks": {
    "userPromptSubmit": [
      "$CLAUDE_PROJECT_DIR/.claude/hooks/script.sh"
    ]
  }
}
```

### Step 3: Check Syntax
```bash
# Test script for syntax errors
bash -n .claude/hooks/script.sh

# Should return nothing if syntax is valid
```

### Step 4: Test Manually
```bash
# Run hook manually to see errors
./.claude/hooks/script.sh

# Check output for errors
```

### Step 5: Check Shell Compatibility
**Common issue**: Using bash-specific syntax in zsh

**Solution**: Use portable syntax
```bash
# Instead of mapfile (bash only):
mapfile -t lines < file.txt

# Use this (works in bash and zsh):
while IFS= read -r line; do
  lines+=("$line")
done < file.txt
```

## Git Push Failures

### HTTP 400 Errors

**Symptom**: `git push` fails with HTTP 400 error

**Cause**: Large files in `company brain/` exceed default HTTP buffer

**Solution**:
```bash
git config http.postBuffer 524288000
git push origin main
```

See `agent_docs/git_configuration.md` for full details.

### "Everything up-to-date" But Not Pushed

**Symptom**: Git says "Everything up-to-date" but changes aren't on remote

**Cause**: Changes not committed

**Solution**:
```bash
git status                    # Check for uncommitted changes
git add .                     # Stage changes
git commit -m "description"   # Commit
git push origin main          # Push
```

## Web UI Development Issues

### Port Already in Use

**Symptom**: `npm run dev` fails - port 5173 in use

**Solution**:
```bash
# Find process using port
lsof -i :5173

# Kill process
kill -9 <PID>

# Or use different port
npm run dev -- --port 5174
```

### Prisma Schema Issues

**Symptom**: Database schema out of sync

**Solution**:
```bash
cd web-ui/

# Regenerate Prisma client
npx prisma generate

# Apply migrations
npx prisma migrate dev

# Reset database (WARNING: deletes data)
npx prisma migrate reset
```

### Build Failures

**Symptom**: `npm run build` fails

**Diagnosis**:
```bash
# Check TypeScript errors
npm run check

# Check for missing dependencies
npm install

# Clear build cache
rm -rf .svelte-kit
npm run build
```

## PostgreSQL Connection Issues

**Symptom**: Database queries fail

**Diagnosis**:
1. Check connection string in environment
2. Verify database is accessible
3. Check credentials

**Solution**:
```bash
# Test connection manually
psql "postgresql://user:password@host/database" -c "\dt"

# Should list tables if connection works
```

## Common Error Messages

### "Cannot find module"
**Cause**: Missing dependency
**Solution**: `npm install` or `uv sync`

### "EADDRINUSE"
**Cause**: Port already in use
**Solution**: Kill process or use different port

### "Permission denied (publickey)"
**Cause**: SSH key not configured
**Solution**: Use HTTPS or configure SSH key

### "fatal: not a git repository"
**Cause**: Not in git repository directory
**Solution**: `cd` to correct directory

## Getting Help

When troubleshooting fails:

1. **Check recent changes**: `git log -10 --oneline`
2. **Review error messages**: Read full error output
3. **Search documentation**: Check relevant agent_docs/*.md files
4. **Test in isolation**: Reproduce in minimal environment
5. **Check logs**: Review relevant log files

## Quick Diagnostic Commands

```bash
# Check Git status
git status
git log -1

# Check Node/npm
node --version
npm --version

# Check Python/uv
python3 --version
uv --version

# Check running processes
ps aux | grep node
ps aux | grep python

# Check ports in use
lsof -i :5173
lsof -i :3000

# Check disk space
df -h

# Check environment variables
echo $PATH
env | grep CLAUDE
```
