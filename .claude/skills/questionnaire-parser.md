---
name: questionnaire-parser
description: |
  Extract structured ClientProfile from Second Brain questionnaire markdown files.
  Handles missing fields, infers business type and technical level, validates data.
  Outputs JSON structure ready for client-onboarding-agent consumption.

allowed-tools: "Read,Grep"
when_to_use: |
  When processing client questionnaire files to extract profile data for
  Second Brain onboarding. Use whenever you see files named like
  "*-questionnaire.md" or need to parse survey responses.
---

# Questionnaire Parser Skill

## Purpose

Parse Second Brain questionnaire markdown files and extract a structured `ClientProfile` data object that contains all information needed for repository customization.

**Input**: Questionnaire markdown file (e.g., `ash-remotecx-FULL-questionnaire.md`)
**Output**: Structured JSON ClientProfile

---

## ClientProfile Data Structure

```typescript
interface ClientProfile {
  // Basic Info
  name: string                    // From purchase/contact info
  email: string                   // From purchase/contact info
  githubUsername: string          // From technical setup section

  // Technical Context
  technicalLevel: "non-technical" | "some-cli" | "developer"
  preferredEditor: string         // VSCode/Cursor or other
  hasClaudePro: boolean
  aiToolsUsed: string[]           // ChatGPT, Claude, etc.

  // Business Context
  currentRole: string             // If provided
  businessType: "consultant" | "freelancer" | "employee" | "founder"
  primaryGoal: string             // What sparked interest
  sixMonthVision: string          // Success in 6 months

  // Use Cases (Selected Categories)
  useCases: string[]              // Array of selected use cases

  // Primary Workflow
  targetWorkflow: string          // Name of target workflow
  workflowDescription: string     // Detailed description
  workflowVolume: {
    perWeek: number
    perMonth: number
    minutesPerOccurrence: number
    totalMonthlyHours: number
  }

  // Information Sources
  dataSources: string[]           // Gmail, Slack, LinkedIn, etc.
  toolStack: string[]             // Current tools they use

  // Constraints & Concerns
  concerns: string[]              // Extracted concerns
  itConstraints: string[]         // IT restrictions
  privacyConcerns: boolean        // Inferred from text

  // Day One Win
  dayOneWin: string              // What they want on day one
}
```

---

## Parsing Algorithm

### Step 1: Read Questionnaire File

Use the Read tool to load the questionnaire markdown file.

**Expected format:**
```markdown
# COMPLETE Questionnaire Responses for [Name] ([email])

## Section 1: Getting Started
### What sparked your interest...
[Answer]

## Section 2: Vision & Goals
...
```

### Step 2: Extract Basic Info

**Name & Email**: Look for header line:
```
# COMPLETE Questionnaire Responses for Daniel Thomas A Rhodes (ash@remotecx.net)
```

**GitHub Username**: Search for "What's your GitHub username?" section.

**Purchase Info**: Look for "Purchase ID" and "Package Type" at top.

### Step 3: Determine Technical Level

Search for "How comfortable are you with technical tools?"

**Mapping:**
- Answer contains "non-technical" → `"non-technical"`
- Answer contains "Some CLI" or "CLI experience" → `"some-cli"`
- Answer contains "developer" or "comfortable with code" → `"developer"`

**If missing**: Infer from:
- "What's your preferred build environment?" (VSCode/Cursor suggests some-cli)
- System information present → some-cli
- Default to "non-technical" if unclear

### Step 4: Extract Business Context

**Primary Goal**: Extract from "What sparked your interest in building a Second Brain?"

**Six Month Vision**: Extract from "What does success look like 6 months from now?"

**Business Type Inference**:
- Text contains "consultant" or "consulting" → `"consultant"`
- Text contains "freelance" or "freelancer" → `"freelancer"`
- Text contains "founder" or "founding" or "my company" → `"founder"`
- Default → `"employee"`

### Step 5: Extract Use Cases

Search for "What use cases are you most interested in?"

**Look for Selected Categories section:**
```markdown
**Selected Categories:**
- Client work
- Research & analysis
- Content creation
```

Return as array: `["Client work", "Research & analysis", "Content creation"]`

### Step 6: Identify Primary Workflow

**Target Workflow**: Extract from "What's your target workflow?"

**Workflow Description**: Extract from "Describe the concept in detail"

**Workflow Volume**: Parse from "Workflow Volume" section:
```markdown
**Occurrences per week:** 10
**Occurrences per month:** 50
**Time per occurrence (minutes):** 10
**Total monthly time investment:** 500 minutes (8.3 hours)
```

Calculate:
```typescript
{
  perWeek: 10,
  perMonth: 50,
  minutesPerOccurrence: 10,
  totalMonthlyHours: 8.3  // Parsed from "500 minutes (8.3 hours)"
}
```

### Step 7: Extract Data Sources & Tool Stack

**Data Sources**: Extract from "What sources does your Second Brain need to consult?"

Parse comma-separated list:
```
gMail workspace x 2, protonmail, outlook, slack x 5, LinkedIn, reddit, github
```

Return as: `["Gmail", "ProtonMail", "Outlook", "Slack", "LinkedIn", "Reddit", "GitHub"]`

**Tool Stack**: Extract from "What's in your current tool stack?"

Parse comma-separated list, clean up:
```
ProtonMail app, Gmail webmail, signal app, slack app...
```

Return as: `["ProtonMail", "Gmail", "Signal", "Slack", ...]`

### Step 8: Extract Concerns & Constraints

**Concerns**: Look for "What concerns or constraints should we keep in mind?"

**IT Constraints**: Look for "Any IT constraints we should know about?"

**Privacy Concerns**: Infer `true` if concerns text contains:
- "privacy"
- "AI detection"
- "appearing to be doing all work with AI"
- "personal voice"

### Step 9: Extract Day-One Win

Search for "What's one thing you want to walk away with on day one?"

Return the full answer verbatim.

### Step 10: Validate & Return

Ensure all required fields are present:
- **Required**: name, email, primaryGoal, sixMonthVision, useCases, dayOneWin
- **Optional**: Everything else (provide sensible defaults)

**Default Values:**
```typescript
{
  technicalLevel: "non-technical",
  preferredEditor: "VSCode/Cursor",
  hasClaudePro: true,
  aiToolsUsed: ["ChatGPT"],
  currentRole: "Not specified",
  businessType: "employee",
  dataSources: [],
  toolStack: [],
  concerns: [],
  itConstraints: [],
  privacyConcerns: false
}
```

---

## Output Format

Return ClientProfile as formatted JSON:

```json
{
  "name": "Daniel Thomas A Rhodes",
  "email": "ash@remotecx.net",
  "githubUsername": "ashthemighty",
  "technicalLevel": "some-cli",
  "preferredEditor": "VSCode/Cursor",
  "hasClaudePro": true,
  "aiToolsUsed": ["ChatGPT Plus", "Claude Pro"],
  "currentRole": "Not specified",
  "businessType": "consultant",
  "primaryGoal": "Automate client acquisition and meeting documentation",
  "sixMonthVision": "Top notch personal assistant that prevents forgetting tasks and helps with blank page paralysis",
  "useCases": [
    "Client work",
    "Research & analysis",
    "Content creation",
    "Operations",
    "Sales outreach",
    "Strategic planning"
  ],
  "targetWorkflow": "Summary and Key Takeaways",
  "workflowDescription": "Meeting transcription with speaker differentiation...",
  "workflowVolume": {
    "perWeek": 10,
    "perMonth": 50,
    "minutesPerOccurrence": 10,
    "totalMonthlyHours": 8.3
  },
  "dataSources": ["Gmail", "ProtonMail", "Outlook", "Slack", "LinkedIn", "Reddit", "GitHub"],
  "toolStack": ["ProtonMail", "Gmail", "Signal", "Slack", "Notion", "Obsidian", "ChatGPT"],
  "concerns": [
    "Technology might not be ready",
    "AI detection in writing",
    "Privacy concerns"
  ],
  "itConstraints": ["Main client Outlook/Teams locked down"],
  "privacyConcerns": true,
  "dayOneWin": "Battle plan with milestones on expanding my client list"
}
```

---

## Error Handling

**Missing Required Fields:**
```
ERROR: Required field 'primaryGoal' not found in questionnaire.
Please ensure questionnaire contains "What sparked your interest" section.
```

**Malformed File:**
```
ERROR: Could not parse questionnaire structure.
Expected format: "# COMPLETE Questionnaire Responses for..."
```

**Invalid Workflow Volume:**
```
WARNING: Could not parse workflow volume. Using defaults.
{
  "perWeek": 0,
  "perMonth": 0,
  "minutesPerOccurrence": 0,
  "totalMonthlyHours": 0
}
```

---

## Testing

Test with these questionnaires:
1. `ash-remotecx-FULL-questionnaire.md` (Ash - consultant, meeting summaries)
2. Daniel's questionnaire (non-technical, job applications)

**Validation Checklist:**
- [ ] Name extracted correctly
- [ ] Email extracted correctly
- [ ] Technical level inferred correctly
- [ ] Business type inferred correctly
- [ ] All use cases captured
- [ ] Primary workflow identified
- [ ] Workflow volume calculated correctly
- [ ] Data sources parsed as array
- [ ] Concerns extracted
- [ ] Privacy concerns detected (true/false)
- [ ] Day-one win captured verbatim

---

## Usage Example

```
# User invokes skill (Claude auto-invokes when needed)
Parse questionnaire: ash-remotecx-FULL-questionnaire.md

# Skill output
ClientProfile extracted successfully:
- Name: Daniel Thomas A Rhodes
- Email: ash@remotecx.net
- Technical Level: some-cli
- Business Type: consultant
- Primary Workflow: Summary and Key Takeaways (10/week, 8.3 hrs/month)
- Use Cases: 6 selected
- Privacy Concerns: Yes

Full JSON profile ready for client-onboarding-agent.
```

---

**Version**: 1.0.0
**Part of**: Client Onboarding System (3-Layer Architecture)
**Layer**: Skills (Foundation)
**Next Skill**: claude-md-optimizer
