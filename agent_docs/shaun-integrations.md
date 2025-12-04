# Shaun's Integration Setup - MCP Recommendations

> MCP server recommendations and configuration guide tailored to Shaun's tool stack and workflows.

---

## Overview

Shaun's current data sources and tools:
- Google Drive (file storage)
- Google Sheets/Docs (business data)
- GoHighLevel (CRM - HIPAA-constrained)
- PDF books (reference materials)
- Web search (research)

**Integration Philosophy**: Start with highest-impact, lowest-friction integrations first.

---

## HIGH PRIORITY (Immediate Value)

### 1. Google Workspace MCP
**Why**: Primary file storage and business documents
**Setup**: `@google-workspace` or `@mcp-google-workspace`
**Impact**: Access Drive files, Sheets data, Docs directly from Second Brain

**Use Cases:**
- Pull brand/tone documents from Drive during content creation
- Access reference materials and past content
- Read business metrics from Sheets
- Update content calendars

**Setup Instructions:**
```bash
# Install via Claude Code MCP marketplace
# OR configure manually in claude_desktop_config.json
{
  "mcpServers": {
    "google-workspace": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-google-workspace"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

**Authentication**: OAuth (first-time setup requires browser)
**Constraints**: None - personal Google account, no IT restrictions
**Priority**: ⭐⭐⭐ CRITICAL

---

### 2. Filesystem MCP (Built-in)
**Why**: Access local files, PDFs, and documentation
**Setup**: Usually pre-configured in Claude Code
**Impact**: Read PDF books, local content files, export documents

**Use Cases:**
- Read PDF reference materials during content research
- Access local prompt library
- Export generated content to local files
- Organize downloaded resources

**Configuration**: Check Claude Code settings for filesystem access
**Constraints**: None
**Priority**: ⭐⭐⭐ CRITICAL

---

### 3. Web Search MCP
**Why**: Research for evidence-based content creation
**Setup**: `@brave-search` or similar
**Impact**: Find supporting evidence, verify medical claims, research topics

**Use Cases:**
- Verify medical claims before including in content
- Research competitor positioning
- Find latest treatment information
- Discover trending health topics

**Setup Options:**
- Brave Search (privacy-focused, no API key required)
- Google Search (requires API key)
- Perplexity (AI-powered research)

**Priority**: ⭐⭐ HIGH

---

## MEDIUM PRIORITY (Nice to Have)

### 4. GitHub MCP
**Why**: Version control for prompts, track changes to memory system
**Setup**: `@github` MCP
**Impact**: Treat Second Brain as versioned repository

**Use Cases:**
- Track changes to prompts over time
- Collaborate with partner on shared memory
- Backup critical workflows
- Roll back if changes break system

**Setup**: OAuth via GitHub account (BioRevGrowth)
**Priority**: ⭐ MEDIUM

---

### 5. Notion MCP (Community)
**Why**: Shaun may use Notion for organization
**Setup**: Community MCP (check compatibility)
**Impact**: Access existing Notion databases if applicable

**Use Cases:**
- Pull content calendar from Notion
- Access doctor profiles if stored there
- Sync knowledge base

**Note**: Only if already using Notion for business
**Priority**: ⭐ MEDIUM (conditional)

---

## LOW PRIORITY / FUTURE

### 6. Slack MCP
**Why**: Team communication (for lead gen company with partners)
**Setup**: `@slack` MCP
**Impact**: Pull context from partner conversations

**Use Cases:**
- Search partner discussions for context
- Pull client feedback from channels
- Coordinate on shared projects

**Timing**: When lead gen company becomes primary focus
**Priority**: LOW (future)

---

## BLOCKED / NOT RECOMMENDED

### ⛔ GoHighLevel MCP
**Status**: No official MCP available
**Constraint**: HIPAA compliance for doctor accounts
**Workaround**:
- Manual data export to Google Sheets
- Use Sheets MCP for data access
- DO NOT connect directly if handling PHI

**Recommendation**: Keep GoHighLevel separate due to HIPAA constraints

---

## Privacy & Security Considerations

### Shaun's Concerns
> "It doesn't work like I'm hoping it will and I'm wasting my time"

**Mitigation Strategy:**
1. **Start Small**: Install only Google Workspace + Filesystem first
2. **Test Impact**: Measure time savings on 5 content pieces
3. **Expand Gradually**: Add integrations only after proving value
4. **No PHI**: Never input patient health information in prompts

### HIPAA Compliance
**Rule**: No PHI (Protected Health Information) in Second Brain prompts or memory
**Safe Zone**: Doctor positioning, brand, marketing content (no patient data)
**Red Zone**: Patient cases, medical records, identifiable information

**Checklist:**
- [ ] Content examples anonymized (no patient names/details)
- [ ] No connection to GoHighLevel patient data
- [ ] Memory contains only marketing/brand info
- [ ] Clear separation between HIPAA and non-HIPAA zones

---

## Integration Setup Sequence

### Week 1: Core (Day-One Win)
1. **Filesystem MCP**: Already configured (verify access)
2. **Google Workspace MCP**: Install and authenticate
3. **Test**: Pull a brand document from Drive during content creation

**Success**: Generate one post using Drive-stored brand guidelines

### Week 2: Research Enhancement
1. **Web Search MCP**: Install Brave Search
2. **Test**: Research medical claim, generate evidence-based post
3. **Measure**: Compare editing time vs previous week

**Success**: 30%+ reduction in research time

### Week 3: Version Control
1. **GitHub MCP**: Connect to BioRevGrowth account
2. **Commit**: First prompts and workflows
3. **Test**: Track changes, roll back if needed

**Success**: Prompt library versioned and shareable with partner

### Future: Team Collaboration
1. **Slack MCP**: When lead gen company scales
2. **Shared Memory**: Partner access via GitHub
3. **Client Hubs**: Self-service content for doctors (stretch goal)

---

## Configuration Template

### claude_desktop_config.json Location
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Backup**: Keep a copy in Second Brain repo

### Minimal Starter Configuration
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/second-brain"]
    },
    "google-workspace": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-google-workspace"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    },
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"]
    }
  }
}
```

---

## Troubleshooting

### MCP Not Connecting
1. Check Claude Code settings → MCP Servers
2. Restart Claude Code after config changes
3. Verify OAuth tokens haven't expired
4. Check terminal logs for error messages

### Slow Performance
1. Limit MCP servers to only what you're actively using
2. Disable unused servers temporarily
3. Check network connection (OAuth refresh can be slow)

### Authentication Issues
1. Re-authenticate via OAuth flow
2. Check API keys/credentials
3. Verify account permissions (Google, GitHub, etc.)

---

## Success Metrics

### After 30 Days
- [ ] Google Workspace connected and used daily
- [ ] Web Search integrated for research
- [ ] Time saved: 30%+ on content editing
- [ ] Context repetition: Eliminated
- [ ] Partner interested in shared system

### After 60 Days
- [ ] GitHub versioning operational
- [ ] Prompt library mature (10+ versioned prompts)
- [ ] Partner using shared memory
- [ ] Time saved: 50%+ on content workflows

---

## Expansion Path

### Current: Solo Doctor Marketing
**MCPs Needed**: Google Workspace, Filesystem, Web Search
**Focus**: Content creation efficiency

### Near Future: Lead Gen Company (with Partners)
**MCPs Added**: GitHub (sharing), Slack (communication)
**Focus**: Team collaboration, shared memory

### Long-Term: Client Self-Service
**MCPs Explored**: Custom doctor portals, content calendars
**Focus**: Scale to multiple doctor clients with automation

---

**Version**: 1.0.0
**Last Updated**: 2025-12-03
**Status**: Installation Guide Ready
