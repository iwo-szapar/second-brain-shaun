---
name: mcp-recommender
description: |
  Recommend and prioritize MCP (Model Context Protocol) integrations based on
  client's data sources, tool stack, use cases, and constraints. Handles IT
  lockdowns, privacy concerns, and generates actionable setup instructions.

allowed-tools: "Read,WebSearch"
when_to_use: |
  When determining which MCPs to recommend for Second Brain client setup, or
  when auditing integration opportunities based on client's tool stack.
---

# MCP Recommender Skill

## Purpose

Analyze client's data sources, tool stack, and constraints to recommend prioritized MCP integrations that provide immediate value while respecting technical limitations.

**Input**: ClientProfile (dataSources, toolStack, itConstraints, privacyConcerns, useCases)
**Output**: Prioritized MCP recommendations with setup instructions

---

## MCP Decision Matrix

### Available MCPs

| MCP Name | Data Sources Matched | Use Cases Matched | Priority Boost |
|----------|---------------------|-------------------|----------------|
| **@google-workspace** | Gmail, Google Calendar, Google Drive, Google Docs | Operations, Email, Content | +3 |
| **@hubspot** | HubSpot, CRM | Sales outreach, Client work | +3 |
| **@hdw-linkedin** | LinkedIn | Sales outreach, Research | +3 |
| **@notion** | Notion | Knowledge management, Operations | +2 |
| **@slack** | Slack | Operations, Team communication | +1 |
| **@postgresql** | Database, Analytics | Research & analysis | +2 |
| **@stripe** | Payments, Revenue | Client work (if billing) | +2 |
| **@github** | GitHub, Code repos | Learning, Development | +1 |
| **@whisper** | Audio, Meetings | Meeting notes, Transcription | +3 |
| **@assemblyai** | Audio, Meetings | Meeting notes, Transcription | +3 |

### Priority Calculation

```typescript
function calculatePriority(
  mcp: MCP,
  profile: ClientProfile
): 'HIGH' | 'MEDIUM' | 'LOW' | 'BLOCKED' {

  let score = 0;

  // Data source matches
  for (const source of profile.dataSources) {
    if (mcp.matchesDataSource(source)) {
      score += 3;
    }
  }

  // Use case matches
  for (const useCase of profile.useCases) {
    if (mcp.matchesUseCase(useCase)) {
      score += mcp.priorityBoost;
    }
  }

  // Primary workflow match
  if (mcp.criticalForWorkflow(profile.targetWorkflow)) {
    score += 5;
  }

  // Check constraints
  if (isBlocked(mcp, profile.itConstraints)) {
    return 'BLOCKED';
  }

  // Check privacy concerns
  if (profile.privacyConcerns && mcp.requiresCloudData) {
    score -= 2; // Penalize cloud-based MCPs
  }

  // Calculate final priority
  if (score >= 8) return 'HIGH';
  if (score >= 4) return 'MEDIUM';
  return 'LOW';
}
```

### Constraint Handling

**IT Lockdown Detection:**
```typescript
function isBlocked(mcp: MCP, constraints: string[]): boolean {
  const constraintText = constraints.join(' ').toLowerCase();

  // Outlook/Teams lockdown
  if (mcp.name === '@microsoft-graph') {
    if (constraintText.includes('outlook') && constraintText.includes('locked down')) {
      return true;
    }
    if (constraintText.includes('teams') && constraintText.includes('inaccessible')) {
      return true;
    }
  }

  // Corporate firewall
  if (constraintText.includes('firewall') || constraintText.includes('proxy')) {
    if (mcp.requiresDirectInternet) {
      return true;
    }
  }

  return false;
}
```

**Privacy Concern Handling:**
```typescript
function applyPrivacyPreference(
  recommendations: MCPRecommendation[],
  privacyConcerns: boolean
): MCPRecommendation[] {

  if (!privacyConcerns) return recommendations;

  // Boost local-first MCPs
  for (const rec of recommendations) {
    if (rec.mcp.isLocalFirst) {
      rec.notes.push("✅ Privacy-friendly: Runs locally");
      rec.priority = boostPriority(rec.priority);
    }

    // Flag cloud-based MCPs
    if (rec.mcp.requiresCloudData) {
      rec.notes.push("⚠️ Privacy note: Data sent to cloud service");
      rec.priority = lowerPriority(rec.priority);
    }
  }

  return recommendations;
}
```

---

## Example Output: Ash's Recommendations

**Input:**
```json
{
  "dataSources": ["Gmail", "ProtonMail", "Outlook", "Slack", "LinkedIn", "Reddit", "GitHub"],
  "toolStack": ["ProtonMail", "Gmail", "Slack", "Notion", "Obsidian"],
  "useCases": ["Client work", "Research & analysis", "Content creation", "Operations", "Sales outreach", "Strategic planning"],
  "targetWorkflow": "Summary and Key Takeaways",
  "itConstraints": ["Main client Outlook/Teams locked down"],
  "privacyConcerns": true
}
```

**Output:**

```markdown
# MCP Integration Recommendations for Daniel Thomas A Rhodes

## HIGH PRIORITY (Immediate Value)

### 1. Whisper MCP (Audio Transcription)
**Why**: Your primary workflow is meeting summaries (10/week, 8.3 hrs/month)
**Setup**: Local installation, privacy-friendly
**Features**:
- Audio transcription
- Speaker diarization
- Timestamp generation
- 100% local processing

**Expected Impact**: 8+ hours/month time savings
**Privacy**: ✅ Runs locally, no cloud upload

**Setup Instructions**:
```bash
# Install Whisper MCP
npm install -g @modelcontextprotocol/server-whisper

# Add to ~/.claude/mcp.json
{
  "mcpServers": {
    "whisper": {
      "command": "mcp-server-whisper"
    }
  }
}
```

---

### 2. Google Workspace MCP
**Why**: You have 2 Gmail accounts as core data sources
**Setup**: Cloud-based (requires OAuth)
**Features**:
- Gmail search and drafting
- Google Calendar access
- Google Drive file access
- Google Docs editing

**Expected Impact**: Automate meeting prep, email context retrieval
**Privacy**: ⚠️ Data accessed via Google Cloud APIs

**Setup Instructions**:
```bash
# Install Google Workspace MCP
npm install -g @modelcontextprotocol/server-google-workspace

# Add to ~/.claude/mcp.json
{
  "mcpServers": {
    "google-workspace": {
      "command": "mcp-server-google-workspace",
      "args": ["--auth-flow", "oauth"]
    }
  }
}

# First use will trigger OAuth flow
```

---

### 3. HDW LinkedIn MCP
**Why**: LinkedIn is a data source and sales outreach use case
**Setup**: API-based
**Features**:
- Profile research
- Connection insights
- Company information
- Job posting analysis

**Expected Impact**: Systematic prospect and client research

**Setup Instructions**:
```bash
# Install LinkedIn MCP
npm install -g @hdw/linkedin-mcp

# Add to ~/.claude/mcp.json (requires API key)
{
  "mcpServers": {
    "hdw-linkedin": {
      "command": "mcp-server-linkedin",
      "env": {
        "LINKEDIN_API_KEY": "your-api-key"
      }
    }
  }
}
```

---

## MEDIUM PRIORITY (Nice to Have)

### 4. Notion MCP (Community)
**Why**: You use Notion for information storage
**Setup**: Community-maintained, may have limitations
**Features**:
- Read Notion pages
- Create new pages
- Query databases

**Expected Impact**: Pull context from existing Notion workspace

**Setup Instructions**: Check community repo for latest version

---

### 5. Slack MCP
**Why**: You have 5 Slack workspaces
**Setup**: OAuth-based
**Features**:
- Message search
- Channel monitoring
- Direct message drafting

**Expected Impact**: Context retrieval across workspaces

**Note**: Consider if value justifies setup complexity (5 workspaces)

---

## BLOCKED (IT Constraints)

### ⛔ Microsoft Graph MCP (Outlook/Teams)
**Why Blocked**: "Main client Outlook/Teams is VERY locked down"
**Impact**: Cannot access primary client's Outlook/Teams data

**Workaround**:
- Use personal Gmail for automation workflows
- Manual copy/paste from Outlook when needed
- Don't invest time in Outlook integration for main client

**Recommendation**: Focus on personal communication channels (Gmail, ProtonMail)

---

## LOW PRIORITY (Future Consideration)

### 6. PostgreSQL MCP
**Why Low**: No database mentioned in data sources
**When to Revisit**: If you start tracking metrics in database

### 7. Stripe MCP
**Why Low**: No payment processing mentioned
**When to Revisit**: If you start billing clients directly

---

## Privacy Considerations

Given your concerns about AI detection and privacy:

**Local-First MCPs (Recommended):**
- ✅ Whisper (audio transcription) - 100% local
- ✅ Filesystem MCP - Local file access only

**Cloud-Based MCPs (Use Selectively):**
- ⚠️ Google Workspace - Data via Google APIs (encrypted in transit)
- ⚠️ LinkedIn MCP - Profile data via API
- ⚠️ Notion - Workspace data via API

**Best Practices:**
1. Start with local-first MCPs (Whisper)
2. Add cloud MCPs only when value is clear
3. Review each MCP's data handling policy
4. Use personal accounts (not client data) where possible

---

## Setup Priority Order

For Ash, install in this order:

**Week 1 (High Impact):**
1. Whisper MCP - Primary workflow (meeting summaries)
2. Google Workspace MCP - Email and calendar access

**Week 2-3 (Supporting Workflows):**
3. LinkedIn MCP - Client research and outreach

**Week 4+ (Optional):**
4. Notion MCP - If Notion integration valuable
5. Slack MCP - If cross-workspace search needed

---

## Validation

After generating recommendations:

- [ ] At least one HIGH priority MCP identified
- [ ] PRIMARY workflow has supporting MCP (if applicable)
- [ ] IT constraints respected (blocked MCPs flagged)
- [ ] Privacy concerns addressed (local-first preferred)
- [ ] Setup instructions included for each MCP
- [ ] Workarounds provided for blocked integrations
- [ ] Priority order makes logical sense (high-impact first)

---

**Version**: 1.0.0
**Part of**: Client Onboarding System (3-Layer Architecture)
**Layer**: Skills (Foundation)
**Dependencies**: questionnaire-parser (provides data sources and constraints)
**Next**: client-onboarding-agent (orchestrator that uses all skills)
