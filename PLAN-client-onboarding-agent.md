# Client Onboarding Agent - Design Specification

> Systematic agent for customizing AI Second Brain repositories for new clients based on their questionnaire responses.

---

## Executive Summary

The **client-onboarding system** is a 3-layer architecture that takes a completed client questionnaire and systematically customizes the Second Brain repository to match their specific needs, goals, use cases, and technical context.

**Primary Function**: Transform a generic Second Brain template into a personalized, ready-to-use system tailored to each client's unique situation.

**Architecture**: Following Anthropic's proven pattern (cookbooks repo):
```
/onboard-client questionnaire.md  (Slash Command - user interface)
    ↓
@client-onboarding-agent          (Sub-agent - orchestrator)
    ↓
Skills: parser, optimizer, generator (Core functionality - modular)
```

**Key Differentiator**: Unlike manual setup, this system makes consistent, systematic decisions based on explicit criteria, with modular skills that keep context clean and enable reusability.

**Build Order**: Bottom-up (Skills → Agent → Command), following Pedram's cookbooks approach.

---

## System Architecture (3 Layers)

### Overview: Slash Command → Sub-agent → Skills

Following Anthropic's proven pattern from the cookbooks repo (Pedram's PR review workflow), this system uses all three Claude Code primitives in a layered architecture.

**Why 3 Layers:**
- **Context Cleanliness**: Parsing 270-line questionnaires + generating 20+ files would pollute main session
- **Modularity**: Skills can be reused independently (e.g., optimize existing CLAUDE.md)
- **Flexibility**: Agent can be invoked via slash command OR programmatically
- **Non-blocking**: User continues working while agent runs in parallel

---

### Layer 1: Skills (Core Functionality)

**Location**: `.claude/skills/`

Modular components that provide reusable functionality.

#### 1.1 questionnaire-parser.md
```yaml
name: questionnaire-parser
description: |
  Extract structured ClientProfile from questionnaire markdown files.
  Handles missing fields, infers business type, maps technical levels.
allowed-tools: Read, Grep
when_to_use: |
  When processing client questionnaire files to extract profile data.
```

#### 1.2 claude-md-optimizer.md
```yaml
name: claude-md-optimizer
description: |
  Optimize CLAUDE.md files to 100-150 lines following HumanLayer
  principles. Moves task-specific content to INDEX.md + memory/.
allowed-tools: Read, Write, Edit, MultiEdit
when_to_use: |
  When customizing CLAUDE.md for new clients, or auditing existing files.
```

#### 1.3 workflow-template-generator.md
```yaml
name: workflow-template-generator
description: |
  Generate workflow templates (process.md, checklist.md, examples.md)
  based on workflow type and client requirements.
allowed-tools: Write, Read
when_to_use: |
  When creating new workflow documentation for client's primary workflow.
```

#### 1.4 mcp-recommender.md
```yaml
name: mcp-recommender
description: |
  Recommend and prioritize MCP integrations based on client's data
  sources, tool stack, and constraints (IT lockdowns, privacy).
allowed-tools: Read, WebSearch
when_to_use: |
  When determining which MCPs to recommend for client's workflow.
```

---

### Layer 2: Sub-agent (Orchestrator)

**Location**: `.claude/agents/client-onboarding-agent.md`

Coordinates the skills and keeps main session context clean.

```yaml
name: client-onboarding-agent
description: |
  Systematically customizes AI Second Brain repository for new clients.
  Uses skills for parsing, optimization, and template generation.
  Works independently to keep main session context clean.

  Spawned by /onboard-client slash command.

tools: Read, Write, Edit, MultiEdit, Grep, Glob, Bash, TodoWrite, AskUserQuestion, Skill
model: claude-sonnet-4-5
permissionMode: ask
```

**Core Responsibilities:**
1. **Questionnaire Analysis**: Use @questionnaire-parser skill
2. **CLAUDE.md Personalization**: Use @claude-md-optimizer skill
3. **Memory Structure Creation**: Build memory/ and experiences/ folders
4. **Workflow Templates**: Use @workflow-template-generator skill
5. **MCP Recommendations**: Use @mcp-recommender skill
6. **INDEX.md Creation**: Generate navigation hub
7. **Client Skills Generation**: Create .claude/skills/ for client's ongoing use
8. **Day-One Win Setup**: Create quick-start guide
9. **Summary Report**: Return results to main session

---

### Layer 3: Slash Command (User Interface)

**Location**: `.claude/commands/onboard-client.md`

User-triggered entry point that spawns the sub-agent.

```yaml
name: onboard-client
description: Onboard new Second Brain clients from questionnaire
```

**Usage:**
```bash
/onboard-client ash-remotecx-FULL-questionnaire.md
```

**Process:**
1. User types `/onboard-client <file>`
2. Command spawns @client-onboarding-agent
3. Agent works in parallel (keeps main session clean)
4. Agent uses skills for core functionality
5. Agent requests approval via AskUserQuestion
6. Agent executes customizations
7. Agent returns summary to main session

---

## CLAUDE.md Best Practices (HumanLayer Principles)

### Core Philosophy

**LLMs are stateless** - Claude knows NOTHING about the codebase at the start of each session. CLAUDE.md is the ONLY file that goes into every conversation.

**Less is More** - Claude Code's system prompt already contains ~50 instructions. Frontier models can follow ~150-200 total instructions. Your CLAUDE.md should be as concise as possible.

**Universal Applicability** - Only include information that's relevant to EVERY task. Task-specific details belong in separate docs.

### Critical Constraints

#### 1. File Length Target
- **Ideal**: < 60 lines (HumanLayer's own CLAUDE.md)
- **Maximum**: < 300 lines
- **Current Daniel template**: ~215 lines (needs optimization)

#### 2. Claude Often Ignores CLAUDE.md
Claude Code injects this system reminder:
```
<system-reminder>
IMPORTANT: this context may or may not be relevant to your tasks.
You should not respond to this context unless it is highly relevant to your task.
</system-reminder>
```

**Implication**: The more non-universal content you include, the more likely Claude ignores ALL of it.

#### 3. What NOT to Include

❌ **Code style guidelines** - Use linters (Biome, ESLint), not LLM instructions
❌ **Detailed commands** - Use progressive disclosure instead
❌ **Task-specific instructions** - Put in separate `agent_docs/` files
❌ **Code snippets** - They go stale; use file:line references instead
❌ **Workflow details** - Point to `memory/workflows/{name}/process.md`
❌ **Example content** - Keep in `memory/examples/`, not in CLAUDE.md

#### 4. Progressive Disclosure Pattern

Instead of including everything in CLAUDE.md, use established `agent_docs/` pattern:

**Existing agent_docs/ (System-level, already present):**
```
agent_docs/
├── README.md                     # Progressive disclosure guide
├── git_configuration.md          # Git setup and troubleshooting
├── browser_automation.md         # Browser automation guides
├── mcp_setup.md                  # MCP installation and config
├── troubleshooting.md            # Common issues
├── testing_frameworks.md         # Testing setup
└── hooks_and_permissions.md      # Permissions and hooks
```

**Client-specific agent_docs/ (Created during onboarding):**
```
agent_docs/
├── {client-name}-profile.md          # Full client context
├── {client-name}-workflow-details.md # Primary workflow deep-dive
├── {client-name}-integrations.md     # Client's MCP setup guide
└── {client-name}-quality-standards.md # Client's quality criteria
```

**Three-tier structure:**
```
CLAUDE.md (100-150 lines)
    ↓ (pointers)
INDEX.md + agent_docs/{client}/ (navigation + client-specific details)
    ↓ (pointers)
memory/workflows/{name}/ (detailed workflow processes)
```

In CLAUDE.md, just point to these:
```markdown
## My Workflow Context

### Primary Workflow ({Name})
See: `memory/workflows/{slug}/` - Full process
See: `agent_docs/{client-name}-workflow-details.md` - Integration setup

Full navigation: See `INDEX.md` and `agent_docs/{client-name}-profile.md`
```

### What CLAUDE.md SHOULD Contain

✅ **WHO** - Name, role, technical level, focus
✅ **WHY** - Primary goal, main challenges, vision
✅ **WHAT** - High-level use cases (not detailed workflows)
✅ **WHERE** - Pointers to detailed docs (not the details themselves)
✅ **HOW TO FIND** - Map of repository structure
✅ **UNIVERSALLY APPLICABLE** - Command reference, best practices

### Optimization Strategy for Clients

When customizing CLAUDE.md for clients:

1. **Keep "About Me" section** (universally relevant to all their tasks)
2. **Simplify "Repository Navigation"** (just a map, not explanations)
3. **Use pointers** for workflow details (e.g., "See: memory/workflows/X/")
4. **Remove examples section** from CLAUDE.md (keep in memory/examples/)
5. **Move detailed instructions** to `agent_docs/` or `memory/workflows/`
6. **Cut anything** that wouldn't help with 80%+ of their tasks

### Example: Optimized CLAUDE.md Structure

```markdown
# AI Second Brain

## Quick Start
- /ask [question] - Quick help (30 sec)
- /plan [task] - Systematic execution (3 min)
- /recall [topic] - Search memory (10 sec)
- /grow - Check brain growth (5 sec)

## About Me (KEEP - Universally Relevant)
- Name, role, technical level
- What I do (2-3 sentences)
- Current challenges (3-5 bullets)
- Primary goals (3-5 bullets)

## Workflow Context (POINTERS ONLY)
### Primary Workflow
See: memory/workflows/{name}/ - Full process, checklist, examples

### Communication Style
See: memory/style-voice/ - Voice, tone, vocabulary

### Quality Standards
See: memory/quality-control/ - Checks and measures

## Repository Map (STRUCTURE ONLY)
memory/
  workflows/ - Process documentation
  patterns/ - Extracted wisdom
  examples/ - Best work
  knowledge-repo/ - Ideas vault

experiences/
  {workflow-type}/ - Past projects

## The Workflow
/plan → /work → /review → /learn

## Best Practices
1. Always /plan first
2. Complete the cycle
3. Trust /review
4. Feed the brain with /learn
```

**Target**: ~100-150 lines instead of 200+

---

## Decision Criteria & Logic

### 1. Client Profile Extraction

**From Questionnaire Fields:**

```typescript
interface ClientProfile {
  // Basic Info
  name: string                    // From purchase/contact info
  email: string                   // From purchase/contact info
  githubUsername: string          // From technical setup

  // Technical Context
  technicalLevel: "non-technical" | "some-cli" | "developer"  // From Q: comfort with technical tools
  preferredEditor: "VSCode/Cursor" | "other"                  // From Q: build environment
  hasClaudePro: boolean                                       // From Q: Claude Pro subscription
  aiToolsUsed: string[]                                       // From Q: AI tools today

  // Business Context
  currentRole: string                                         // From Q: current role (if provided)
  businessType: "consultant" | "freelancer" | "employee" | "founder"  // Inferred from context
  primaryGoal: string                                         // From Q: what sparked interest
  sixMonthVision: string                                      // From Q: success in 6 months

  // Use Cases (Selected Categories)
  useCases: UseCaseType[]                                     // From Q: use cases interested in

  // Primary Workflow
  targetWorkflow: string                                      // From Q: target workflow
  workflowDescription: string                                 // From Q: describe concept
  workflowVolume: {
    perWeek: number
    perMonth: number
    minutesPerOccurrence: number
    totalMonthlyHours: number
  }

  // Information Sources
  dataSources: string[]                                       // From Q: sources to consult
  toolStack: string[]                                         // From Q: current tool stack

  // Constraints & Concerns
  concerns: string[]                                          // From Q: concerns/constraints
  itConstraints: string[]                                     // From Q: IT constraints
  privacyConcerns: boolean                                    // Inferred from concerns text

  // Day One Win
  dayOneWin: string                                           // From Q: walk away with on day one
}
```

### 2. Use Case Mapping

**Questionnaire Options → Memory Structure:**

| Use Case Selected | Memory Folders to Create | Workflow Templates | Agents to Configure |
|-------------------|-------------------------|-------------------|---------------------|
| **Client work** | `memory/workflows/client-onboarding/`<br>`experiences/clients/` | Client intake, proposal templates | @email-agent, @content-creator |
| **Research & analysis** | `memory/research-sources/`<br>`experiences/research/` | Research brief template | None (core functionality) |
| **Content creation** | `memory/style-voice/`<br>`memory/examples/content/`<br>`experiences/content/` | Content templates by platform | @content-essay-writer |
| **Operations** | `memory/workflows/operations/`<br>`experiences/operations/` | Meeting notes, project docs | @pmo-advisor |
| **Sales outreach** | `memory/workflows/outreach/`<br>`experiences/outreach/` | Cold email templates | @email-agent, @sdr-agent |
| **Strategic planning** | `memory/frameworks/`<br>`experiences/strategy/` | Planning templates | @chief-of-staff |
| **Learning & skill development** | `memory/knowledge-repo/learning/` | Learning logs | None |
| **Meeting notes & summaries** | `memory/workflows/meetings/`<br>`experiences/meetings/` | Meeting note templates | Audio transcription setup |

### 3. Primary Workflow Identification

**Decision Tree:**

```
1. Check Q: "What's your target workflow?"
   → If answered: Use as PRIMARY workflow
   → If empty: Infer from:
      - Most urgent use case
      - Day-one win request
      - Business context

2. Extract workflow characteristics:
   - Name/title
   - Description
   - Volume (frequency)
   - Time savings potential
   - Required integrations

3. Create workflow-specific structure:
   ├── memory/workflows/{workflow-name}/
   │   ├── process.md           # Step-by-step workflow
   │   ├── checklist.md         # Quality checklist
   │   └── examples.md          # Good examples
   └── experiences/{workflow-name}/
       └── {date}-{project-name}/
```

**Ash Example:**
- Target: "Summary and Key Takeaways" (meeting transcription)
- Volume: 10/week, 10 min each = 8.3 hours/month
- Creates: `memory/workflows/meeting-summaries/`, `experiences/meetings/`

**Daniel Example:**
- Target: Inferred as "Job Application Outreach" (from day-one win + goals)
- Volume: 5/week
- Creates: `memory/workflows/job-application/`, `experiences/job-applications/`

### 4. CLAUDE.md Personalization Logic

**⚠️ CRITICAL: Follow Progressive Disclosure & Keep Under 150 Lines**

The agent creates TWO artifacts:

1. **CLAUDE.md** (optimized, < 150 lines) - Universally applicable context only
2. **agent_docs/** folder - Detailed instructions Claude reads when needed

#### CLAUDE.md Structure (Optimized)

**Total Target: 100-150 lines (vs current 215)**

```markdown
# AI Second Brain

> {One-line value prop from client's sixMonthVision}

---

## Quick Start (5 Minutes to First Value)

| Command | Purpose | Time |
|---------|---------|------|
| /ask [question] | Quick help | 30 sec |
| /plan [task] | Systematic execution | 3 min |
| /recall [topic] | Search memory | 10 sec |
| /grow | Check brain growth | 5 sec |

---

## About Me

### Who I Am
- **Name**: {name}
- **Role**: {inferred role}
- **Technical Level**: {non-technical | some-cli | developer}
- **AI Tools**: {comma-separated list}
- **GitHub**: {username or [To be added]}
- **Focus**: {primary focus area}

### What I Do
{2-3 sentences synthesized from primaryGoal + sixMonthVision}

### My Current Challenges
- **{Category 1}**: {Description} (max 3-5 bullets)
- **{Category 2}**: {Description}
- **{Category 3}**: {Description}

### My Goals with This Brain
- **{Primary Workflow}**: {Goal with metrics if available}
- **{Secondary Use Case}**: {Goal}
- **Day-One Win**: {dayOneWin verbatim}

---

## My Workflow Context

### Primary Workflow ({Name})
See: `memory/workflows/{slug}/` - {One-line description}

{If volume >5/week:}
**Volume**: {X/week} ({Y hrs/month) | **Priority**: HIGH

### {Secondary Workflow if critical}
See: `memory/workflows/{slug2}/`

---

## Repository Map

```
memory/
├── workflows/        # Step-by-step processes
├── style-voice/      # Communication guidelines
├── patterns/         # Extracted wisdom (grows with /learn)
├── examples/         # Best work samples
└── knowledge-repo/   # Ideas vault

experiences/
└── {workflow-type}/  # Past projects with learnings
```

Full navigation: See `agent_docs/repository-guide.md`

---

## The Workflow

```
/plan [task]  →  /work  →  /review  →  /learn
    ↓              ↓          ↓           ↓
 Research      Execute    Quality     Extract
 + Plan        Tracked    Check       Patterns
```

---

## Best Practices

1. **Always /plan first** - Never jump straight into work
2. **Complete the cycle** - /plan → /work → /review → /learn
3. **Trust /review** - 6 agents catch what you miss
4. **Feed the brain** - Run /learn after projects
5. **Check /grow weekly** - See compound returns

---

**Version**: 1.0.0
**Template**: AI Second Brain
```

**Result**: ~100 lines (vs 215), universally applicable, high signal-to-noise ratio

#### agent_docs/ Structure (Progressive Disclosure)

Create these files for detailed instructions (Claude reads on-demand):

```
agent_docs/
├── repository-guide.md          # Full repo structure & navigation
├── primary-workflow-details.md  # Detailed workflow instructions
├── integration-setup.md          # MCP/integration configuration
├── quality-standards.md          # Detailed quality checks
└── troubleshooting.md           # Common issues & solutions
```

**Content Moved FROM CLAUDE.md TO agent_docs/:**

| Was in CLAUDE.md | Now in agent_docs/ | Reason |
|------------------|-------------------|--------|
| Detailed folder structure | repository-guide.md | Not needed for every task |
| Workflow process steps | {workflow}/process.md | Task-specific |
| Example subdirectories | repository-guide.md | Reference info |
| MCP setup instructions | integration-setup.md | One-time setup |
| Troubleshooting section | troubleshooting.md | Issue-specific |
| Skill unlock progress | repository-guide.md | Gamification, not core |

#### Personalization Rules

**KEEP in CLAUDE.md (Universally Relevant):**
- ✅ Client name, role, technical level
- ✅ Primary goal (2-3 sentences)
- ✅ Top 3-5 challenges
- ✅ Primary workflow pointer (not details)
- ✅ Repository map (structure only, no explanations)
- ✅ Command reference table
- ✅ Core workflow (4-step cycle)
- ✅ Best practices (5 rules)

**MOVE to agent_docs/ or memory/ (Task-Specific):**
- ❌ Detailed workflow steps → memory/workflows/{name}/process.md
- ❌ Example subdirectories → agent_docs/repository-guide.md
- ❌ MCP configuration → agent_docs/integration-setup.md
- ❌ Quality checklists → memory/workflows/{name}/checklist.md
- ❌ Troubleshooting → agent_docs/troubleshooting.md
- ❌ Skill progression → agent_docs/repository-guide.md

#### Field Extraction & Synthesis

**"Who I Am"** (5-6 bullets):
```typescript
{
  name: questionnaire.name,
  role: inferRole(questionnaire.currentRole, questionnaire.businessType),
  technicalLevel: mapTechnicalLevel(questionnaire.technicalComfort),
  aiTools: questionnaire.aiToolsUsed.join(", "),
  github: questionnaire.githubUsername || "[To be added]",
  focus: inferFocus(questionnaire.primaryGoal, questionnaire.useCases)
}
```

**"What I Do"** (2-3 sentences):
```typescript
synthesize({
  roleContext: inferRole(...),
  situation: questionnaire.primaryGoal,
  vision: questionnaire.sixMonthVision (summarized),
  focus: topUseCases(questionnaire.useCases, limit=3)
})

// Example output:
// "I'm a consultant transitioning from a single client to fractional work.
//  I'm building my AI second brain to automate client acquisition and
//  meeting documentation. My focus is on sales outreach, meeting summaries,
//  and content creation."
```

**"Current Challenges"** (3-5 bullets max):
```typescript
extractChallenges({
  from: [
    questionnaire.concerns,
    questionnaire.workflowDescription ("biggest blocker"),
    questionnaire.sixMonthVision (implied pain points)
  ],
  limit: 5,
  format: "**{Category}**: {Description}"
})
```

**"Goals with This Brain"** (3-5 bullets):
```typescript
{
  primaryWorkflow: {
    name: questionnaire.targetWorkflow,
    goal: questionnaire.workflowDescription,
    metrics: questionnaire.workflowVolume (if significant)
  },
  secondaryGoals: topUseCases(questionnaire.useCases, limit=2),
  dayOneWin: questionnaire.dayOneWin (verbatim)
}
```

**"Primary Workflow"** (Pointer only):
```markdown
### Primary Workflow ({name})
See: `memory/workflows/{slug}/` - {one-line description from questionnaire}

{If volume > 5/week:}
**Volume**: {X/week} ({Y hrs/month) | **Priority**: HIGH
```

**"Repository Map"** (Structure only, NO explanations):
```markdown
memory/
├── workflows/        # Step-by-step processes
├── style-voice/      # Communication guidelines
├── patterns/         # Extracted wisdom
├── examples/         # Best work
└── knowledge-repo/   # Ideas vault

experiences/
└── {actual folders created for this client}

See: `agent_docs/repository-guide.md` for full navigation
```

### 5. Memory Structure Creation

**Algorithm:**

```python
def create_memory_structure(client: ClientProfile):
    base_folders = [
        "memory/style-voice/",
        "memory/quality-control/",
        "memory/patterns/",
        "memory/examples/",
        "memory/knowledge-repo/",
        "experiences/",
        "brain-health/"
    ]

    # Always create base
    for folder in base_folders:
        create_directory(folder)

    # Create use-case-specific folders
    for use_case in client.useCases:
        folders = USE_CASE_FOLDER_MAP[use_case]
        for folder in folders:
            create_directory(folder)
            create_readme(folder, use_case_context)

    # Create primary workflow structure
    workflow_slug = slugify(client.targetWorkflow)
    create_directory(f"memory/workflows/{workflow_slug}/")
    create_workflow_template(workflow_slug, client.workflowDescription)

    # Create experiences folder for primary workflow
    create_directory(f"experiences/{workflow_slug}/")
    create_file(f"experiences/{workflow_slug}/INDEX.md",
                experience_index_template)
```

**Folder Creation Rules:**

1. **Always Create (Base Structure)**:
   - `memory/style-voice/`
   - `memory/quality-control/`
   - `memory/patterns/`
   - `memory/examples/`
   - `memory/knowledge-repo/`
   - `experiences/`
   - `brain-health/`

2. **Create Based on Use Cases**:
   - See "Use Case Mapping" table above

3. **Create for Primary Workflow**:
   - `memory/workflows/{primary-workflow-slug}/`
   - `experiences/{primary-workflow-slug}/`

4. **Create Based on Data Sources**:
   - If Gmail mentioned → Document in `memory/integrations/gmail.md`
   - If CRM mentioned → Document in `memory/integrations/crm.md`
   - If Notion mentioned → Document in `memory/integrations/notion.md`

### 6. Integration/MCP Recommendations

**Decision Matrix:**

| Data Source Mentioned | MCP to Recommend | Configuration Priority |
|-----------------------|------------------|------------------------|
| Gmail, Google Workspace | `@google-workspace` | HIGH if operations/email use case |
| Outlook | `@microsoft-graph` | MEDIUM (note: may have IT constraints) |
| HubSpot, CRM | `@hubspot` | HIGH if sales/client work |
| LinkedIn | `@hdw-linkedin` | HIGH if sales outreach |
| Notion | `@notion` | MEDIUM (community MCP) |
| Slack | `@slack` | LOW (notification only) |
| Calendar (any) | Included in workspace MCP | HIGH if operations |
| Audio/transcription needs | `@whisper` or similar | HIGH if meeting notes use case |

**Constraint Handling:**

```typescript
if (client.itConstraints.includes("locked down") ||
    client.itConstraints.includes("Outlook") ||
    client.itConstraints.includes("Teams")) {

    // Flag IT-constrained integrations as "BLOCKED"
    // Recommend alternative approaches
    // Example: "Your client has locked-down Outlook.
    //           Recommend: Use personal Gmail for automation instead."
}

if (client.privacyConcerns) {
    // Add extra documentation about data handling
    // Recommend local-only MCPs where possible
    // Flag cloud-based integrations
}
```

### 7. Workflow Template Generation

**For Primary Workflow, Create:**

1. **Process Document** (`memory/workflows/{workflow}/process.md`):
```markdown
# {Workflow Name} - Process

## Overview
{workflowDescription from questionnaire}

## Current State (Before Second Brain)
- **Time per occurrence**: {minutesPerOccurrence} minutes
- **Frequency**: {perWeek} per week
- **Monthly time investment**: {totalMonthlyHours} hours
- **Pain points**: {extracted from "biggest blocker"}

## Target State (With Second Brain)
- **Time per occurrence**: {estimated reduction} minutes (60% reduction target)
- **Quality improvement**: Consistent, systematic approach
- **Automation level**: {High/Medium/Low based on workflow type}

## Step-by-Step Process

### Phase 1: Preparation
1. {First step inferred from workflow description}
2. {Second step}

### Phase 2: Execution
1. Run `/plan {workflow name}`
2. Follow generated plan
3. Use `/work` for systematic execution

### Phase 3: Quality Check
1. Run `/review` on output
2. Address any findings
3. Iterate if needed

### Phase 4: Learning
1. Run `/learn` to extract patterns
2. Update this process with improvements

## Quality Checklist

See: `checklist.md`

## Examples

See: `examples.md`
```

2. **Quality Checklist** (`memory/workflows/{workflow}/checklist.md`):
```markdown
# {Workflow Name} - Quality Checklist

## Before Starting
- [ ] {Relevant check based on workflow type}
- [ ] {Another check}

## During Execution
- [ ] {Checks specific to this workflow}

## Before Delivery/Completion
- [ ] Run `/review` on output
- [ ] {Workflow-specific quality criteria}

## After Completion
- [ ] Run `/learn` to extract patterns
- [ ] Update workflow documentation with improvements
```

3. **Examples File** (`memory/workflows/{workflow}/examples.md`):
```markdown
# {Workflow Name} - Examples

## Example 1: {Placeholder}

{Note: This will be populated as you complete workflows.
After each successful execution, run `/learn` to capture
the best examples here.}

## What Makes a Good Example?

{Criteria specific to this workflow type}

---

**Status**: 🌱 Seed stage - Populate this as you use the workflow
```

### 8. Day-One Win Configuration

**Extract from Questionnaire:**
- Field: "What's one thing you want to walk away with on day one?"

**Create Quick-Start Command:**

Based on day-one win, create a custom slash command or document:

**Ash's Day-One Win:**
> "After a discussion and a review of my data, provide a thorough 'battle plan' with milestones on expanding my client list."

**Implementation:**
```markdown
# Day-One Win: Client Acquisition Battle Plan

## Quick Start Command
/ask "Review my background and create a battle plan for expanding my client list with specific milestones"

## What This Will Do
1. Analyze your background (from questionnaire)
2. Review your current client situation
3. Create systematic approach to client acquisition
4. Define clear milestones and metrics
5. Provide actionable first steps

## Prerequisites
- Fill out `memory/personal/services.md` - What you offer
- Fill out `memory/personal/positioning.md` - How you stand out
- Add any existing client examples to `memory/examples/clients/`

## Expected Output
A comprehensive battle plan document in `experiences/strategy/client-acquisition-plan.md`
```

**Daniel's Day-One Win:**
> "WhatsApp text → AI prompt → Answer stored in cloud"

**Implementation:**
```markdown
# Day-One Win: WhatsApp to Cloud Automation

## Quick Start
1. Open WhatsApp on your phone
2. Send a message to yourself: "Test: What's the weather like today?"
3. Run: `/ask "Convert this WhatsApp message into a structured note: [paste message]"`
4. Save the output to `memory/knowledge-repo/notes/`

## What This Demonstrates
- Input from any source (WhatsApp)
- AI processing (Claude)
- Structured output
- Persistent storage (cloud via GitHub)

## Next Steps
- Explore `/plan` for more complex workflows
- Set up webhook for automatic WhatsApp → Second Brain sync (advanced)
```

---

## Implementation Sequence

When the agent runs, it follows this sequence:

### Phase 1: Analysis (Read-Only)
```
1. Read questionnaire file
2. Extract ClientProfile data structure
3. Identify primary workflow
4. Map use cases to folder structure
5. Determine integration requirements
6. Flag any constraints/concerns
```

### Phase 2: Planning (Approval Required)
```
1. Generate customization plan
2. Show user:
   - What will be changed in CLAUDE.md
   - What folders will be created
   - What templates will be generated
   - What MCPs will be recommended
3. Ask for approval to proceed
```

### Phase 3: Execution (Write Operations)
```
1. Create optimized CLAUDE.md (100-150 lines following HumanLayer principles)
   - About Me section (universally relevant)
   - Workflow Context (pointers only, no details)
   - Repository Map (structure only)
   - Command reference & best practices

2. Create client-specific agent_docs/ files (progressive disclosure)
   - {client-name}-profile.md (complete client context for future agents)
   - {client-name}-workflow-details.md (primary workflow integration setup)
   - {client-name}-integrations.md (client's specific MCP configuration)
   - {client-name}-quality-standards.md (client's quality criteria & constraints)

   Note: System agent_docs/ already exist (git, MCP, troubleshooting, etc.)

3. Create memory folder structure
   - memory/workflows/{primary-workflow}/
   - memory/style-voice/
   - memory/examples/
   - experiences/{workflow-type}/

4. Generate workflow templates in memory/workflows/{name}/
   - process.md (step-by-step)
   - checklist.md (quality checks)
   - examples.md (placeholder for future examples)

5. Create day-one win guide
   - Quick start command
   - Expected output
   - Prerequisites

6. Generate MCP recommendations in agent_docs/integration-setup.md
   - Prioritized list based on data sources
   - Setup instructions with links
   - Constraint handling (IT lockdowns, privacy)

7. Create initial brain-health baseline
   - growth-log.md with setup date
   - pattern-confidence.md (empty, ready for /learn)
```

### Phase 4: Verification & Handoff
```
1. Verify all files created successfully
2. Generate onboarding summary document
3. Create customized `/start` command
4. Provide next steps for client
```

---

## Comparison: Daniel vs Ash

### Daniel's Transformation

**Input (Questionnaire Summary):**
- Non-technical, learning workflows
- Main goal: Job application automation
- Struggles with: Getting started, quality concerns
- Day-one win: WhatsApp → AI → Cloud
- Use cases: Job applications, content, research, operations
- Volume: 5 applications/week

**Output (Customized Repository):**

**CLAUDE.md Changes:**
```markdown
## About Me

### Who I Am
- **Name**: Daniel
- **Technical Level**: Non-technical (learning to build workflows)
- **AI Tools Used**: ChatGPT Plus, Gemini Pro
- **Focus**: Personal workflow automation

### What I Do
I'm building my personal AI second brain to automate time-consuming
workflows that I struggle to start. My primary focus areas include
job applications, content creation, and research tasks.

### My Current Challenges
- **Starting Tasks**: Struggle with getting started on time-consuming tasks
- **Job Applications**: Need to streamline research and personalized outreach
- **Content Creation**: Want to save time while maintaining quality
- **Quality Concerns**: Worried about AI hallucinations and poor output quality

### My Goals with This Brain
- **Job Application Automation**: Research job offers → Read requirements
  → Create personalized cold emails (5 per week)
- **Content Creation**: Save time on content tasks while maintaining
  professional tone
- **Research & Analysis**: Automate market research and competitive intelligence
- **Operations**: Streamline project management and meeting notes
- **Learning**: Build confidence in creating and maintaining AI workflows
- **Day-One Win**: WhatsApp text → AI prompt → Answer stored in cloud

## My Workflow Context

### Primary Workflow (Job Applications)
See: `memory/workflows/job-application/` - Job research and personalized
outreach process

**Volume**: 5 per week
**Priority**: HIGH - Core workflow for career transition
```

**Folders Created:**
```
memory/
├── workflows/
│   └── job-application/
│       ├── process.md
│       ├── checklist.md
│       └── examples.md
├── style-voice/
├── quality-control/
├── research-sources/
├── patterns/
├── examples/
│   ├── cold-emails/
│   ├── research-briefs/
│   ├── content/
│   └── meeting-notes/
└── knowledge-repo/

experiences/
├── job-applications/
├── content/
├── research/
└── operations/
```

**MCPs Recommended:**
- `@google-workspace` - For Gmail/Calendar (MEDIUM priority)
- `@hdw-linkedin` - For job research (HIGH priority)
- `@hubspot` - For prospect tracking (OPTIONAL)

---

### Ash's Transformation

**Input (Questionnaire Summary):**
- Consultant losing main client, transitioning to fractional
- Some CLI experience, uses ChatGPT > Claude
- Main goal: Automate client acquisition process
- Primary workflow: Meeting transcription & summaries (10/week, 8.3 hrs/month)
- Day-one win: Battle plan for expanding client list
- Use cases: Client work, research, content, operations, sales, strategic planning
- Concerns: Privacy, AI detection in writing, technology limitations
- IT constraints: Main client Outlook/Teams locked down
- Data sources: 2x Gmail, ProtonMail, Outlook, 5x Slack, LinkedIn, Reddit, GitHub

**Output (Customized Repository):**

**CLAUDE.md Changes:**
```markdown
## About Me

### Who I Am
- **Name**: Daniel Thomas A Rhodes (Ash)
- **Role**: Consultant (transitioning to fractional/multi-client)
- **Technical Level**: Some CLI experience
- **AI Tools Used**: ChatGPT Plus, Claude Pro
- **GitHub**: ashthemighty
- **Focus**: Automating client acquisition and delivery workflows

### What I Do
I'm a consultant transitioning from a single primary client to fractional
work across multiple clients. I'm building my AI second brain to automate
the process of finding work, managing client relationships, and delivering
high-quality work efficiently without appearing AI-dependent.

### My Current Challenges
- **Client Acquisition**: Need systematic approach to finding and landing
  fractional clients
- **Decision Fatigue**: Suffer from executive dysfunction despite being fast
- **Context Switching**: Managing multiple clients, data sources
  (2x Gmail, ProtonMail, Outlook, 5x Slack, etc.)
- **Meeting Documentation**: 10 meetings/week taking 8+ hours to process manually
- **Privacy & Authenticity**: Worried about AI detection and maintaining
  personal voice
- **Technology Reliability**: Concerned AI isn't ready for my needs

### My Goals with This Brain
- **Client Acquisition Automation**: Systematic process for identifying,
  approaching, engaging, and landing clients
- **Meeting Intelligence**: Seamless transcription, speaker identification,
  summaries, and action items (10/week = 8.3 hours/month savings)
- **Content Pipeline**: Pre-written LinkedIn and Substack posts lined up
- **Personal Assistant**: Trusted partner that surfaces missed information,
  breaks blank page paralysis, handles meeting summaries
- **Voice Adaptation**: Compose text in multiple voices (casual → formal)
  while sounding authentically human
- **Day-One Win**: Battle plan with milestones for expanding client list

## My Workflow Context

### Primary Workflow (Meeting Summaries & Action Items)
See: `memory/workflows/meeting-summaries/` - Audio transcription, speaker
identification, summary, and action item extraction

**Volume**: 10 per week (8.3 hours/month time investment)
**Priority**: CRITICAL - Immediate time savings and quality improvement
**Requirements**:
- Audio recording (not via Zoom/Teams built-in)
- Transcription with speaker differentiation
- Ability to name/recognize speakers
- Full conversation saved for reference
- Warning system for missed recordings

### Secondary Workflows
- **Client Acquisition**: See `memory/workflows/client-acquisition/`
- **Content Creation**: See `memory/workflows/content-pipeline/`
- **Operations**: See `memory/workflows/operations/`

### Communication Style
See: `memory/style-voice/` - Multiple voice modes: very casual → fully formal

### Quality Standards
See: `memory/quality-control/` - Authenticity checks to avoid AI detection

### Data Sources & Integration Points
See: `memory/integrations/` - 2x Gmail, ProtonMail, Outlook (LIMITED),
5x Slack, LinkedIn, Reddit, GitHub
```

**Folders Created:**
```
memory/
├── workflows/
│   ├── meeting-summaries/          # PRIMARY
│   │   ├── process.md
│   │   ├── checklist.md
│   │   ├── examples.md
│   │   └── audio-setup.md
│   ├── client-acquisition/
│   │   ├── process.md
│   │   ├── outreach-templates.md
│   │   └── examples.md
│   ├── content-pipeline/
│   │   ├── linkedin-process.md
│   │   └── substack-process.md
│   └── operations/
├── style-voice/
│   ├── casual-voice.md
│   ├── professional-voice.md
│   └── formal-voice.md
├── quality-control/
│   └── authenticity-checks.md
├── integrations/
│   ├── gmail.md
│   ├── protonmail.md
│   ├── slack.md
│   └── linkedin.md
├── patterns/
├── examples/
│   ├── meeting-summaries/
│   ├── client-proposals/
│   ├── linkedin-posts/
│   ├── substack-posts/
│   └── outreach-emails/
└── knowledge-repo/

experiences/
├── meetings/
├── clients/
├── content/
├── research/
├── outreach/
└── strategy/
```

**MCPs Recommended:**
```markdown
# MCP Configuration Recommendations for Ash

## HIGH PRIORITY (Immediate Value)

### 1. Google Workspace MCP
**Why**: You have 2 Gmail accounts that are core data sources
**Setup**: `@google-workspace`
**Features**: Gmail, Calendar, Drive access
**Expected Impact**: Automate meeting prep, email drafting, context retrieval

### 2. Audio Transcription MCP
**Why**: Your primary workflow is meeting summaries (10/week)
**Options**:
- `@whisper` (local, privacy-friendly)
- `@assemblyai` (cloud, better speaker ID)
**Expected Impact**: 8+ hours/month time savings

### 3. LinkedIn MCP
**Why**: Critical for client acquisition workflow
**Setup**: `@hdw-linkedin`
**Features**: Profile research, connection insights
**Expected Impact**: Systematic prospect research

## MEDIUM PRIORITY (Nice to Have)

### 4. Notion MCP (Community)
**Why**: You use Notion for information storage
**Setup**: Community MCP (check compatibility)
**Expected Impact**: Pull context from existing Notion workspace

## BLOCKED (IT Constraints)

### ⛔ Microsoft Graph (Outlook/Teams)
**Why Blocked**: "Main client is VERY locked down"
**Workaround**: Use personal Gmail for automation, manual copy from Outlook
**Note**: Don't invest time in Outlook integration for main client work

## PRIVACY CONSIDERATIONS

Given your privacy concerns:
- ✅ Use local-first MCPs where possible (Whisper for audio)
- ✅ Self-host repository (GitHub private repo)
- ⚠️ Be selective about cloud-based MCPs
- ⚠️ Review data handling for each integration
```

**Day-One Win Setup:**
```markdown
# Day-One Win: Client Acquisition Battle Plan

## Immediate Action
/ask "Based on my profile, create a comprehensive battle plan for expanding
my client list from 1 primary client to 5+ fractional clients. Include
specific milestones, weekly actions, and metrics."

## What You'll Get
A systematic 90-day plan in `experiences/strategy/client-acquisition-plan.md`:

1. **Current State Assessment**
   - Your consulting expertise
   - Market positioning
   - Competitive advantages

2. **Target Client Profile**
   - Ideal client characteristics
   - Where to find them
   - Why they'd hire you

3. **Outreach Strategy**
   - LinkedIn approach
   - Content strategy (posts/Substack)
   - Networking tactics

4. **Milestones & Metrics**
   - Week 1-4: Foundation (positioning, content system)
   - Week 5-8: Outreach (50 prospects identified)
   - Week 9-12: Conversion (5+ discovery calls)
   - Month 4+: Delivery (2-3 fractional clients)

5. **Weekly Action Plan**
   - Content creation schedule
   - Outreach cadence
   - Follow-up systems

## Prerequisites (5 minutes)
1. Review/update `memory/personal/services.md` with consulting expertise
2. Add 1-2 examples to `memory/examples/client-proposals/`
3. Capture your voice in `memory/style-voice/professional-voice.md`

## Time Investment
- Initial plan generation: 10 minutes
- Review and customize: 20 minutes
- **Result**: Actionable 90-day battle plan
```

---

## Key Differences in Customization

| Aspect | Daniel | Ash |
|--------|--------|-----|
| **Technical Level** | Non-technical | Some CLI |
| **Primary Workflow** | Job applications | Meeting summaries |
| **Volume** | 5/week | 10/week (8.3 hrs/month) |
| **Day-One Win** | WhatsApp demo | Battle plan |
| **Folder Depth** | Moderate (4 use cases) | Deep (6 use cases) |
| **MCP Priority** | LinkedIn (job search) | Audio transcription + Gmail |
| **Voice Requirements** | Professional tone | Multiple voices (casual → formal) |
| **Privacy Concerns** | Quality/hallucinations | AI detection + data privacy |
| **Integration Complexity** | Low (LinkedIn, Gmail) | High (2x Gmail, ProtonMail, 5x Slack) |
| **Quick Start** | Simple demo | Strategic planning |

---

## Agent Specification Summary

### Input Requirements
1. **Questionnaire file path** (e.g., `ash-remotecx-FULL-questionnaire.md`)
2. **Target repository path** (current working directory assumed)
3. **Client approval** for changes (permissionMode: ask)

### Output Artifacts
1. **Updated CLAUDE.md** - Fully personalized
2. **Memory structure** - Folders and templates
3. **Workflow templates** - Primary workflow documentation
4. **Day-one win guide** - Quick start instructions
5. **MCP recommendations** - Integration setup guide
6. **Onboarding summary** - What was changed and why

### Success Criteria

**Personalization:**
- [ ] Client can read CLAUDE.md and see themselves reflected
- [ ] No generic/template language remains in CLAUDE.md
- [ ] Primary workflow is clearly documented with templates
- [ ] Day-one win is achievable within first session
- [ ] Memory structure matches their use cases

**Optimization (HumanLayer Principles):**
- [ ] CLAUDE.md is 100-150 lines (down from 215)
- [ ] All task-specific details moved to agent_docs/ or memory/
- [ ] Only universally applicable content in CLAUDE.md
- [ ] Progressive disclosure implemented via agent_docs/
- [ ] Repository map shows structure only (no explanations)

**Quality & Usability:**
- [ ] Integration recommendations are actionable
- [ ] Constraint handling is clear (IT lockdowns, privacy)
- [ ] Client understands next steps
- [ ] agent_docs/ provides on-demand detail without bloating context

---

## Key Optimizations vs Original Template

### CLAUDE.md File Size Reduction

| Metric | Original Template | Optimized Version | Improvement |
|--------|------------------|-------------------|-------------|
| **Total Lines** | ~215 lines | 100-150 lines | 30-50% reduction |
| **About Me** | 57 lines | 30-35 lines | 40% reduction |
| **Repository Nav** | 68 lines (with explanations) | 20 lines (map only) | 70% reduction |
| **Workflow Context** | 12 lines (explanations) | 8 lines (pointers) | 33% reduction |
| **Command Reference** | Table format (okay) | Table format (kept) | No change |
| **Examples/Progress** | 30 lines | 0 lines (moved) | 100% removal |
| **Troubleshooting** | 18 lines | 0 lines (moved) | 100% removal |

### What Got Moved (Progressive Disclosure)

**From CLAUDE.md → agent_docs/repository-guide.md:**
- Detailed folder structure explanations
- Example subdirectory lists
- Skill unlock progress tracking
- Full troubleshooting guide

**From CLAUDE.md → memory/workflows/{name}/:**
- Step-by-step workflow processes
- Quality checklists
- Example templates

**From CLAUDE.md → agent_docs/integration-setup.md:**
- MCP configuration instructions
- Integration setup details
- Tool stack recommendations

**What Stayed in CLAUDE.md:**
- Client identity (name, role, technical level)
- Primary goal & challenges (2-3 sentences)
- Workflow pointers (not details)
- Repository map (structure, not explanations)
- Command reference
- Core best practices

### Expected Benefits

**For Claude (the LLM):**
- ✅ Fewer total instructions (less interference with system prompt's ~50 instructions)
- ✅ Higher signal-to-noise ratio (more likely to be read, not ignored)
- ✅ Universally applicable context (relevant to 80%+ of tasks)
- ✅ Can access details on-demand via agent_docs/ when needed

**For Clients:**
- ✅ Faster onboarding (less cognitive load reading CLAUDE.md)
- ✅ Clearer identity ("I see myself in this")
- ✅ Better discoverability (knows where to find details)
- ✅ Less maintenance (fewer places to update client info)

**For Agents:**
- ✅ Consistent, minimal CLAUDE.md across all clients
- ✅ Detailed instructions available when relevant
- ✅ Better instruction-following (under 200 total instructions)
- ✅ Progressive disclosure maintains context budget

---

## Build Order (Bottom-Up)

Following Pedram's approach: Build Skills first, then Agent, then Command.

### Phase 1: Skills (Core Functionality) - Build First

**Order**: Test each independently before moving to next

1. **questionnaire-parser skill** (`.claude/skills/questionnaire-parser.md`)
   - Parse questionnaire markdown → ClientProfile JSON
   - Handle missing fields, infer values
   - Test with Daniel's and Ash's questionnaires
   - **Deliverable**: Structured ClientProfile output

2. **claude-md-optimizer skill** (`.claude/skills/claude-md-optimizer.md`)
   - Optimize CLAUDE.md to 100-150 lines
   - Move task-specific content to INDEX.md + memory/
   - Follow HumanLayer principles
   - Test with current 215-line template
   - **Deliverable**: Optimized CLAUDE.md

3. **workflow-template-generator skill** (`.claude/skills/workflow-template-generator.md`)
   - Generate process.md, checklist.md, examples.md
   - Based on workflow type (job-applications, meeting-summaries, etc.)
   - Test with 2-3 workflow types
   - **Deliverable**: Complete workflow template set

4. **mcp-recommender skill** (`.claude/skills/mcp-recommender.md`)
   - Recommend MCPs based on data sources
   - Prioritize (HIGH/MEDIUM/LOW)
   - Handle constraints (IT lockdowns, privacy)
   - Test with different tool stacks
   - **Deliverable**: Prioritized MCP recommendations

**Validation**: Each skill works independently before proceeding.

---

### Phase 2: Sub-agent (Orchestrator) - Build Second

5. **client-onboarding-agent** (`.claude/agents/client-onboarding-agent.md`)
   - Orchestrate all 4 skills
   - Handle memory/ structure creation
   - Generate INDEX.md navigation
   - Create client-specific skills for ongoing use
   - Request approval via AskUserQuestion
   - Return summary to main session

   **Test Cases:**
   - Run with Daniel's questionnaire → Verify personalization
   - Run with Ash's questionnaire → Verify different output
   - Verify context stays clean (agent works in parallel)

   **Deliverable**: Working sub-agent that uses all skills

---

### Phase 3: Slash Command (Interface) - Build Last

6. **/onboard-client command** (`.claude/commands/onboard-client.md`)
   - User-friendly interface
   - Spawn @client-onboarding-agent
   - Pass questionnaire file path
   - Show progress/status
   - Display summary when complete

   **Test Case:**
   ```bash
   /onboard-client ash-remotecx-FULL-questionnaire.md
   ```

   **Deliverable**: One-command client onboarding

---

### Phase 4: Documentation & Examples

7. **Usage documentation** - How to use the system
8. **Example outputs** - Show Daniel vs Ash transformations
9. **Troubleshooting guide** - Common issues
10. **Video walkthrough** - Demo for clients

---

## Implementation Checklist

**Skills (Foundation):**
- [ ] questionnaire-parser.md created and tested
- [ ] claude-md-optimizer.md created and tested
- [ ] workflow-template-generator.md created and tested
- [ ] mcp-recommender.md created and tested

**Sub-agent (Orchestrator):**
- [ ] client-onboarding-agent.md created
- [ ] Agent uses all 4 skills correctly
- [ ] AskUserQuestion integration working
- [ ] Tested with Daniel's questionnaire
- [ ] Tested with Ash's questionnaire
- [ ] Context isolation verified (parallel execution)

**Slash Command (Interface):**
- [ ] onboard-client.md created
- [ ] Command spawns agent correctly
- [ ] User experience is smooth
- [ ] Error handling implemented

**Validation:**
- [ ] Complete Daniel onboarding produces expected output
- [ ] Complete Ash onboarding produces different output
- [ ] CLAUDE.md is 100-150 lines (both clients)
- [ ] INDEX.md created correctly
- [ ] memory/ structure matches use cases
- [ ] Client-specific skills generated
- [ ] MCP recommendations appropriate
- [ ] Day-one win guide present

---

**Version**: 3.0.0 (Design Specification - 3-Layer Architecture)
**Status**: 📋 Planning Complete - Ready for Implementation
**Architecture**: Slash Command → Sub-agent → Skills (Pedram's pattern)
**Key Innovation**:
- 3-layer modular system (not single agent)
- Progressive disclosure via INDEX.md + memory/ (not agent_docs/)
- Context-clean parallel execution
- Bottom-up build order (Skills → Agent → Command)

**References**:
- Pedram's Pattern: Anthropic cookbooks repo (PR review workflow)
- HumanLayer Blog: "Writing a good CLAUDE.md" (November 25, 2025)
- Claude Code Specialist Review: Skills vs Agents vs Commands
- Progressive Disclosure: INDEX.md + memory/ (official pattern)
- Instruction-Following Research: ~150-200 instruction limit

**Build Next**: Start with Skills (questionnaire-parser), not Agent
