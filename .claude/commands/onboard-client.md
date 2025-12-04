---
name: onboard-client
description: Onboard new Second Brain clients from questionnaire responses
---

# Client Onboarding Command

> Transform generic Second Brain template into personalized system for new clients.

---

## Usage

```bash
/onboard-client <questionnaire-file>
```

**Examples:**
```bash
/onboard-client ash-remotecx-FULL-questionnaire.md
/onboard-client daniel-survey.md
```

---

## What This Does

This command spawns the **@client-onboarding-agent** sub-agent to:

1. **Parse questionnaire** using @questionnaire-parser skill
   - Extract client profile (name, role, workflows, goals)
   - Identify primary workflow and use cases
   - Detect constraints (IT lockdowns, privacy concerns)

2. **Optimize CLAUDE.md** using @claude-md-optimizer skill
   - Personalize "About Me" section
   - Reduce from ~215 lines → 100-150 lines
   - Move task-specific content to INDEX.md + memory/

3. **Generate workflow templates** using @workflow-template-generator skill
   - Create process.md, checklist.md, examples.md
   - Customize for primary workflow type
   - Save to memory/workflows/{workflow-name}/

4. **Recommend integrations** using @mcp-recommender skill
   - Prioritize MCPs (HIGH/MEDIUM/LOW/BLOCKED)
   - Handle constraints and privacy concerns
   - Provide setup instructions

5. **Create memory structure**
   - Build memory/ folders based on use cases
   - Create experiences/ folders for project tracking
   - Generate INDEX.md navigation hub

6. **Generate client skills**
   - Create .claude/skills/ for client's ongoing workflows
   - Enable auto-invocation for common tasks

7. **Setup day-one win**
   - Create quick-start guide
   - Configure immediate value delivery

8. **Return summary**
   - List all files created
   - Provide next steps
   - Show time-to-value estimate

---

## Why Sub-agent?

This command spawns a **sub-agent** (not direct execution) because:

- **Context Cleanliness**: Questionnaires are 270+ lines, would pollute main session
- **File Generation**: Creating 20+ files adds noise to your working context
- **Parallel Execution**: Agent works independently while you continue other tasks
- **Returns Clean Summary**: Only the summary appears in your session

**Your session stays clean** ✨

---

## What You'll See

### Step 1: Agent Spawns
```
[Sub-agent] client-onboarding-agent spawned
[Sub-agent] Reading questionnaire: ash-remotecx-FULL-questionnaire.md...
```

### Step 2: Profile Extraction
```
[Sub-agent] Parsing questionnaire using @questionnaire-parser...
[Sub-agent] ✓ Extracted profile for Daniel Thomas A Rhodes
[Sub-agent]   - Role: Consultant (transitioning to fractional)
[Sub-agent]   - Primary Workflow: Summary and Key Takeaways
[Sub-agent]   - Volume: 10/week (8.3 hrs/month)
[Sub-agent]   - Use Cases: 6 selected
```

### Step 3: Customization Plan
```
[Sub-agent] Generating customization plan...

I'll customize the Second Brain for Daniel Thomas A Rhodes:

**CLAUDE.md Changes:**
- Personalize for: Consultant, transitioning to fractional work
- Primary workflow: Summary and Key Takeaways (10/week, 8.3 hrs/month)
- Target: ~120 lines (from 215)

**Folders to Create:**
- memory/workflows/meeting-summaries/
- experiences/meetings/
- experiences/clients/
- experiences/content/
- 12 total folders

**Skills to Generate:**
- meeting-summary-workflow skill (for ongoing use)

**MCPs Recommended:**
- HIGH: Whisper (audio), Google Workspace (email/calendar), LinkedIn
- MEDIUM: Notion
- BLOCKED: Microsoft Graph (Outlook locked down)

Proceed with customization?
○ Yes, proceed with this plan
○ Modify plan first
○ Cancel onboarding
```

### Step 4: User Approves

```
[Sub-agent] Creating optimized CLAUDE.md using @claude-md-optimizer...
[Sub-agent] ✓ CLAUDE.md generated (118 lines, 45% reduction)

[Sub-agent] Creating INDEX.md navigation hub...
[Sub-agent] ✓ INDEX.md created

[Sub-agent] Creating memory structure...
[Sub-agent] ✓ 12 folders created

[Sub-agent] Generating workflow templates using @workflow-template-generator...
[Sub-agent] ✓ meeting-summaries workflow templates created
[Sub-agent]   - process.md (185 lines)
[Sub-agent]   - checklist.md (48 lines)
[Sub-agent]   - examples.md (35 lines)

[Sub-agent] Creating client skill for ongoing use...
[Sub-agent] ✓ meeting-summary-workflow skill created

[Sub-agent] Generating MCP recommendations using @mcp-recommender...
[Sub-agent] ✓ Recommendations saved to memory/integrations/

[Sub-agent] Creating day-one win guide...
[Sub-agent] ✓ Guide saved to day-one-win-guide.md

[Sub-agent] Verification complete ✓
```

### Step 5: Summary Returns to Main Session

```
# ✅ Client Onboarding Complete: Daniel Thomas A Rhodes

## Summary
Successfully customized AI Second Brain repository.

**Files Created**: 23 files
**CLAUDE.md**: 118 lines (45% reduction from 215)
**Primary Workflow**: Summary and Key Takeaways
**Time Savings**: 8.3 hrs/month potential

## Next Steps

### Immediate (Today)
1. Review CLAUDE.md - See yourself reflected
2. Read day-one-win-guide.md - Get started
3. Install Whisper MCP (HIGH priority for your workflow)

### This Week
1. Complete first meeting summary using /plan
2. Run /review on output
3. Run /learn to extract first pattern

See full summary above for all created files.

---

**Onboarding Duration**: 2 minutes 15 seconds
**Repository Status**: ✅ Ready for use
```

---

## Arguments

**Required:**
- `questionnaire_file` - Path to completed questionnaire markdown file

**Format:**
```
/onboard-client <path-to-questionnaire>
```

**Questionnaire File Requirements:**
- Must be markdown format
- Must contain "COMPLETE Questionnaire Responses" header
- Must have required sections (Getting Started, Vision & Goals, Priority Workflow)

---

## Expected Files After Running

```
second-brain-{client}/
├── CLAUDE.md (100-150 lines) ← UPDATED
├── INDEX.md ← NEW
├── day-one-win-guide.md ← NEW
├── .claude/
│   ├── skills/
│   │   └── {primary-workflow}.md ← NEW
│   ├── agents/
│   │   └── client-onboarding-agent.md (this agent)
│   └── commands/
│       └── onboard-client.md (this command)
├── memory/
│   ├── workflows/
│   │   └── {primary-workflow}/
│   │       ├── process.md ← NEW
│   │       ├── checklist.md ← NEW
│   │       └── examples.md ← NEW
│   ├── style-voice/ ← NEW
│   ├── quality-control/ ← NEW
│   ├── patterns/ ← NEW
│   ├── examples/ ← NEW
│   ├── knowledge-repo/ ← NEW
│   └── integrations/
│       └── recommended-mcps.md ← NEW
├── experiences/
│   └── {workflow-folders}/ ← NEW
└── brain-health/
    ├── growth-log.md ← NEW
    └── pattern-confidence.md ← NEW
```

---

## Troubleshooting

### Questionnaire File Not Found
```
ERROR: Could not find questionnaire file: ash-questionnaire.md

Please provide full path or ensure file exists in current directory.
```

**Solution**: Use tab completion or full path

### Agent Fails to Spawn
```
ERROR: @client-onboarding-agent failed to spawn

Check:
1. Agent file exists: .claude/agents/client-onboarding-agent.md
2. Agent metadata is valid (YAML frontmatter)
3. Required skills exist in .claude/skills/
```

### Incomplete Questionnaire
```
WARNING: Questionnaire missing optional fields.
Proceeding with defaults for:
- currentRole: "Not specified"
- githubUsername: "[To be added]"
```

### CLAUDE.md Exists
```
INFO: CLAUDE.md already exists.

Options:
1. Backup existing file (CLAUDE.md.backup)
2. Overwrite with personalized version
3. Cancel onboarding

Current CLAUDE.md: {line count} lines
New CLAUDE.md: ~{estimated lines} lines
```

---

## Time to Complete

**Typical duration:**
- Small questionnaire (Daniel): ~1-2 minutes
- Large questionnaire (Ash): ~2-3 minutes
- Complex setup (multiple workflows): ~3-5 minutes

**Factors affecting time:**
- Questionnaire size and completeness
- Number of use cases selected
- Primary workflow complexity
- MCP research required

---

## Testing

Test with both questionnaires:

### Test Case 1: Daniel (Non-technical, Job Applications)
```bash
/onboard-client .claude/daniel-survey.md
```

**Expected:**
- CLAUDE.md: ~100-110 lines
- Primary workflow: job-application
- Skill created: job-application-workflow.md
- HIGH priority MCP: LinkedIn

### Test Case 2: Ash (Some-CLI, Meeting Summaries)
```bash
/onboard-client ash-remotecx-FULL-questionnaire.md
```

**Expected:**
- CLAUDE.md: ~120-130 lines
- Primary workflow: meeting-summaries
- Skill created: meeting-summary-workflow.md
- HIGH priority MCPs: Whisper, Google Workspace, LinkedIn

**Validation:**
- [ ] Both produce different outputs
- [ ] Both CLAUDE.md files are personalized
- [ ] Both within 100-150 line target
- [ ] Skills match workflows
- [ ] MCP recommendations differ based on needs

---

**Version**: 1.0.0
**Part of**: Client Onboarding System (3-Layer Architecture)
**Layer**: Slash Command (User Interface)
**Spawns**: @client-onboarding-agent sub-agent
**Uses**: All 4 foundation skills
**Time to Value**: 2-5 minutes
