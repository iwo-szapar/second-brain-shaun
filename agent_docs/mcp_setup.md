# MCP Server Setup and Configuration

## Configuration Location

**Primary config**: `/Users/iwoszapar/.claude/mcp.json`

MCP servers are auto-discovered when Claude Code starts. Tools and schemas become automatically available.

## Available MCP Servers

### Business Operations
- `google-workspace` - Gmail, Calendar, Drive, Docs
- `hubspot` - CRM and customer relationship management
- `hdw-linkedin` - LinkedIn research and prospecting
- `postgresql` - AI Maturity Index platform database (read-only)
- `google-analytics` - Platform metrics and user behavior
- `graphiti` - Knowledge graph (Neo4j) for user insights

### Development & Infrastructure
- `spec-workflow` - Technical specifications and documentation
- `stripe` - Payment processing and subscriptions
- `notion` - Knowledge base integration
- `linear` - Project management (OAuth flow on first use)
- `AIMI` - Platform API integration
- `svelte` - Svelte 5 & SvelteKit documentation
- `shadcn-ui` - Component library for Svelte
- `chrome-devtools` - Browser automation

**Note**: Full MCP details (commands, tools, use cases) are in `/Users/iwoszapar/.claude/mcp.json`.

## Adding New MCP Servers

### Step 1: Add Server Config
Add server configuration to `/Users/iwoszapar/.claude/mcp.json`:

```json
{
  "mcpServers": {
    "your-server-name": {
      "command": "node",
      "args": ["/path/to/server/index.js"],
      "env": {
        "API_KEY": "your-api-key"
      }
    }
  }
}
```

### Step 2: Handle Configuration Conflicts

**IMPORTANT**: Configuration conflicts prevent servers from loading.

**If `enableAllProjectMcpServers: true` in `settings.local.json`:**
- **Remove** the `enabledMcpjsonServers` array entirely
- Conflicts cause servers to not load
- All servers in mcp.json will auto-load

**If `enableAllProjectMcpServers: false`:**
- Add server name to `enabledMcpjsonServers` array in `settings.local.json`:
  ```json
  {
    "enabledMcpjsonServers": ["your-server-name"]
  }
  ```

### Step 3: Restart Claude Code
MCP servers are only loaded at startup. Restart Claude Code after configuration changes.

### Step 4: Verify Server Loaded
Check that tools from the server are available:
- List available tools in Claude Code
- Try using a tool from the new server

## Common Configuration Conflict

**Symptom**: MCP server installed but tools not available

**Cause**: Both settings are conflicting:
- `enableAllProjectMcpServers: true` in settings.local.json
- `enabledMcpjsonServers: [...]` array also exists

**Fix**: Remove `enabledMcpjsonServers` array entirely from settings.local.json

## OAuth-Based MCP Servers

Some MCP servers (Linear, etc.) require OAuth authentication.

### First Use
1. First tool use triggers browser-based OAuth flow
2. Authenticate in browser
3. Credentials stored in `~/.mcp-auth/{server-hash}.json`
4. Subsequent uses auto-authenticate

### Authentication Issues
If authentication fails:
```bash
# Remove stored credentials
rm -rf ~/.mcp-auth

# Restart Claude Code
# Retry OAuth flow
```

### Debug Logs
Check logs if issues persist:
```bash
cat ~/.mcp-auth/{server-hash}_debug.log
```

## MCP Server Development

### Custom MCP Servers
Location: `mcps/` directory in repository

Each custom MCP server includes:
- Server implementation
- Tools and resources
- Configuration template
- README with setup instructions

### Testing MCP Servers
Test server manually before adding to Claude Code:
```bash
# Run server directly
node /path/to/server/index.js

# Check server responds to MCP protocol
# Verify tools are exposed correctly
```

## Troubleshooting

### Server Not Loading
1. Verify server config exists in `/Users/iwoszapar/.claude/mcp.json`
2. Check for configuration conflicts (see above)
3. Verify server command and environment variables
4. Restart Claude Code
5. Test server manually using command from mcp.json

### Tools Not Available
1. Verify server loaded (check startup logs)
2. Check server's tools schema
3. Verify no typos in tool names
4. Restart Claude Code

### Environment Variables Not Working
1. Check env vars are in server config in mcp.json
2. Verify values are correct (no quotes issues)
3. Check server logs for env var errors

## Best Practices

1. **Single source of truth**: Keep all MCP configs in `/Users/iwoszapar/.claude/mcp.json`
2. **Document custom servers**: Add README to each server in `mcps/`
3. **Test before adding**: Verify server works manually first
4. **Use environment variables**: Never hardcode secrets in mcp.json
5. **Regular audits**: Review enabled servers quarterly
