---
name: claude-md-optimizer
description: |
  Optimize CLAUDE.md files to 100-150 lines following HumanLayer best practices.
  Personalizes for client while moving task-specific content to INDEX.md + memory/.
  Ensures universal applicability and prevents Claude from ignoring the file.

allowed-tools: "Read,Write,Edit,MultiEdit"
when_to_use: |
  When customizing CLAUDE.md for new Second Brain clients, auditing existing
  CLAUDE.md files for bloat, or optimizing to reduce context pollution.
---

# CLAUDE.md Optimizer Skill

## Purpose

Transform verbose CLAUDE.md files (200+ lines) into optimized versions (100-150 lines) by:
1. Personalizing "About Me" section with client context
2. Converting detailed content into pointers (progressive disclosure)
3. Moving task-specific content to INDEX.md and memory/
4. Ensuring universal applicability (relevant to 80%+ of tasks)

**Input**: ClientProfile JSON + current CLAUDE.md file
**Output**: Optimized CLAUDE.md (100-150 lines)

---

## HumanLayer Optimization Principles

### Critical Constraints

1. **Instruction Limit**: LLMs can follow ~150-200 instructions
   - Claude Code system prompt uses ~50 instructions already
   - Your CLAUDE.md budget: ~100-150 instructions max

2. **Universal Applicability**: Only include content relevant to 80%+ of tasks
   - ❌ Workflow process steps (task-specific)
   - ✅ Workflow pointer (universal: "See: memory/workflows/X/")

3. **Progressive Disclosure**: Details live elsewhere, CLAUDE.md points to them
   - CLAUDE.md → INDEX.md → memory/workflows/
   - Not: CLAUDE.md contains everything

4. **Claude Ignores Bloat**: System reminder tells Claude to ignore if not relevant
   ```
   <system-reminder>
   IMPORTANT: this context may or may not be relevant to your tasks.
   You should not respond to this context unless it is highly relevant.
   </system-reminder>
   ```
   More non-universal content = Higher chance Claude ignores ALL of it

---

## Optimization Algorithm

### Phase 1: Analyze Current CLAUDE.md

```
1. Read current CLAUDE.md
2. Count total lines
3. Identify sections:
   - About Me (keep, personalize)
   - Workflow Context (keep, simplify to pointers)
   - Repository Navigation (keep, map only)
   - Command Reference (keep, table format)
   - Best Practices (keep, 5 rules)
   - Examples (MOVE to memory/examples/)
   - Troubleshooting (MOVE to INDEX.md)
   - Skill Unlock Progress (MOVE to INDEX.md)
4. Calculate reduction target (aim for 100-150 lines)
```

### Phase 2: Personalize "About Me" Section

Using ClientProfile data, generate:

```markdown
## About Me

### Who I Am
- **Name**: {ClientProfile.name}
- **Role**: {ClientProfile.currentRole or inferred from businessType}
- **Technical Level**: {ClientProfile.technicalLevel}
- **AI Tools**: {ClientProfile.aiToolsUsed.join(", ")}
- **GitHub**: {ClientProfile.githubUsername or "[To be added]"}
- **Focus**: {inferFocus(ClientProfile.primaryGoal, ClientProfile.useCases)}

### What I Do
{Synthesize 2-3 sentences from:
  - ClientProfile.businessType context
  - ClientProfile.primaryGoal
  - ClientProfile.sixMonthVision (summarized)
  - Top 3 use cases from ClientProfile.useCases
}

### My Current Challenges
{Extract 3-5 bullets from:
  - ClientProfile.concerns
  - ClientProfile.workflowDescription (biggest blocker)
  - ClientProfile.sixMonthVision (implied pain points)

  Format: **{Category}**: {Description}
  Max 5 bullets
}

### My Goals with This Brain
{Generate 3-5 bullets:
  1. Primary workflow with metrics if volume > 5/week
  2. Top 2 secondary use cases
  3. Day-one win verbatim from ClientProfile.dayOneWin

  Format: **{Workflow/Area}**: {Specific goal}
}
```

**Target**: ~35 lines (vs 57 in original)

### Phase 3: Optimize "Workflow Context" Section

**Before (verbose):**
```markdown
## My Workflow Context

### Primary Workflow (Job Applications)
See: `memory/workflows/job-application/` - Job research and personalized outreach process

[Long explanation of the workflow]

### Communication Style
See: `memory/style-voice/` - Professional tone guidelines and examples

[Long explanation of style guide]

### Quality Standards
See: `memory/quality-control/` - Measures to prevent AI hallucinations

[Long explanation of quality measures]
```

**After (pointers only):**
```markdown
## My Workflow Context

### Primary Workflow ({ClientProfile.targetWorkflow})
See: `memory/workflows/{slugify(targetWorkflow)}/` - {One-line description}

{If ClientProfile.workflowVolume.perWeek > 5:}
**Volume**: {perWeek}/week ({totalMonthlyHours} hrs/month) | **Priority**: HIGH

{If multiple critical workflows:}
### {Secondary Workflow Name}
See: `memory/workflows/{slug}/`
```

**Target**: ~8 lines (vs 12+ in original)

### Phase 4: Simplify "Repository Navigation"

**Before (verbose with explanations):**
```markdown
## Repository Navigation

### Memory (Semantic Knowledge)

**Core Context**
- `memory/style-voice/` - Professional tone guidelines and communication style
- `memory/quality-control/` - Standards and checks to prevent AI hallucinations
- `memory/research-sources/` - LinkedIn, company websites, and research methods
- `memory/workflows/` - Step-by-step process documentation

**Patterns & Examples**
- `memory/patterns/` - Extracted wisdom (grows with each /learn)
  - `job-application-patterns.md` - What works in outreach
  - `research-patterns.md` - Effective research approaches
...
```

**After (structure only):**
```markdown
## Repository Map

```
memory/
├── workflows/        # Step-by-step processes
├── style-voice/      # Communication guidelines
├── patterns/         # Extracted wisdom (grows with /learn)
├── examples/         # Best work samples
└── knowledge-repo/   # Ideas vault

experiences/
└── {ClientProfile use case folders}
```

Full navigation: See `INDEX.md`
```

**Target**: ~15 lines (vs 68+ in original)

### Phase 5: Keep Essential Sections As-Is

**Command Reference**: Keep the table (already optimal)
```markdown
| Command | Purpose | Time |
|---------|---------|------|
| /ask [question] | Quick help | 30 sec |
| /plan [task] | Systematic execution | 3 min |
| /recall [topic] | Search memory | 10 sec |
| /grow | Check brain growth | 5 sec |
```

**The Workflow**: Keep the visual (already concise)
```markdown
## The Workflow

```
/plan [task]  →  /work  →  /review  →  /learn
    ↓              ↓          ↓           ↓
 Research      Execute    Quality     Extract
 + Plan        Tracked    Check       Patterns
```
```

**Best Practices**: Keep 5 rules (already concise)
```markdown
1. **Always /plan first** - Never jump straight into work
2. **Complete the cycle** - /plan → /work → /review → /learn
3. **Trust /review** - 6 agents catch what you miss
4. **Feed the brain** - Run /learn after projects
5. **Check /grow weekly** - See compound returns
```

### Phase 6: Remove Sections Entirely

**Move to INDEX.md or memory/:**
- ❌ "Skill Unlock Progress" (gamification, not core)
- ❌ "Troubleshooting" (issue-specific, not universal)
- ❌ Detailed example subdirectories (reference info)
- ❌ MCP integration details (one-time setup)

---

## Output Template

```markdown
# AI Second Brain

> {One-line value prop from ClientProfile.sixMonthVision}

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
- **Role**: {role}
- **Technical Level**: {technicalLevel}
- **AI Tools**: {aiToolsUsed}
- **GitHub**: {githubUsername}
- **Focus**: {focus}

### What I Do
{2-3 sentences}

### My Current Challenges
- **{Challenge 1}**: {Description}
- **{Challenge 2}**: {Description}
- **{Challenge 3}**: {Description}

### My Goals with This Brain
- **{Primary Workflow}**: {Goal with metrics}
- **{Secondary Goal}**: {Description}
- **Day-One Win**: {dayOneWin}

---

## My Workflow Context

### Primary Workflow ({targetWorkflow})
See: `memory/workflows/{slug}/` - {One-line description}

{If high volume:}
**Volume**: {X/week} ({Y hrs/month) | **Priority**: HIGH

---

## Repository Map

```
memory/
├── workflows/        # Step-by-step processes
├── style-voice/      # Communication guidelines
├── patterns/         # Extracted wisdom
├── examples/         # Best work samples
└── knowledge-repo/   # Ideas vault

experiences/
└── {workflow-folders}
```

Full navigation: See `INDEX.md`

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

**Result**: ~100-120 lines (down from 215)

---

## Validation Checklist

After generating optimized CLAUDE.md:

- [ ] Total line count is 100-150 lines
- [ ] "About Me" section is personalized (no generic language)
- [ ] Workflow Context uses pointers only (no detailed explanations)
- [ ] Repository Map shows structure only (no subdirectory explanations)
- [ ] Command reference table present
- [ ] Core workflow diagram present
- [ ] Best practices (5 rules) present
- [ ] All removed content has new home (INDEX.md or memory/)
- [ ] No code snippets (use file:line references)
- [ ] No task-specific instructions
- [ ] Universally applicable to 80%+ of client's tasks

---

## What Gets Moved (Output Side Effects)

This skill also creates **INDEX.md** to hold removed content:

```markdown
# AI Second Brain - Navigation Guide

## Welcome

This Second Brain is personalized for {name}. Use this guide to navigate
the repository and find detailed instructions.

## Memory Structure

### Workflows
- `memory/workflows/{primary}/` - Your primary workflow
  - `process.md` - Step-by-step process
  - `checklist.md` - Quality checklist
  - `examples.md` - Good examples (grows over time)

### Style & Voice
- `memory/style-voice/` - Communication guidelines
  - Define your voice across different contexts
  - Examples of your best writing

### Patterns & Learning
- `memory/patterns/` - Extracted wisdom (grows with /learn)
- `memory/examples/` - Your best work by category

### Knowledge Repository
- `memory/knowledge-repo/` - Never lose a thought
  - `ideas/` - Raw ideas
  - `concepts/` - Developed concepts
  - `insights/` - Key learnings

## Experiences

Past projects organized by workflow type:
- `experiences/{primary-workflow}/` - Your primary workflow projects
- Each project contains: plan → output → review → learnings

## Quick Access

- [Primary Workflow Process](memory/workflows/{slug}/process.md)
- [Communication Style Guide](memory/style-voice/README.md)
- [Quality Standards](memory/quality-control/README.md)
- [MCP Integration Setup](memory/integrations/recommended-mcps.md)

## Skill Unlock Progress

Track your mastery:

### Level 1: Foundation
- [ ] Run /ask for first quick win
- [ ] Complete first workflow
- [ ] Populate style-voice/ with examples

### Level 2: Core Workflow
- [ ] Complete /plan → /work → /review → /learn cycle
- [ ] See first pattern extracted
- [ ] Achieve 8+ quality score

### Level 3: Pattern Power
- [ ] Have 5+ patterns in memory
- [ ] See time savings on repeated tasks
- [ ] Have at least one HIGH confidence pattern

### Level 4: Expert Mode
- [ ] 20+ experiences logged
- [ ] Consistent 9+ quality scores
- [ ] Compound time savings visible in /grow

## Troubleshooting

### Brain feels empty?
- Fill `memory/values-beliefs/` with core values
- Populate `memory/personal/` with expertise
- Capture writing samples in `memory/style-voice/examples.md`
- Complete one full cycle to seed patterns

### Not seeing improvements?
- Run `/grow` to check metrics
- Ensure you're running `/learn` after projects
- Check `brain-health/pattern-confidence.md`

---

**Version**: 1.0.0
**Generated by**: claude-md-optimizer skill
```

---

## Usage Example

```
Input ClientProfile:
{
  "name": "Daniel Thomas A Rhodes",
  "businessType": "consultant",
  "primaryGoal": "Automate client acquisition",
  "targetWorkflow": "Summary and Key Takeaways",
  ...
}

Output:
- CLAUDE.md (115 lines) - Optimized, personalized
- INDEX.md (created) - Navigation with removed content
- Reduction: 215 → 115 lines (47% smaller)
```

---

## Testing

**Test Case 1: Daniel's Profile**
- Input: Non-technical, job applications, quality concerns
- Expected: ~100-110 lines, simple language
- Verify: No technical jargon, clear structure

**Test Case 2: Ash's Profile**
- Input: Some-CLI, consultant, meeting summaries, privacy concerns
- Expected: ~120-130 lines, multiple workflows mentioned
- Verify: Privacy concerns reflected, technical level appropriate

**Validation:**
- [ ] Line count within 100-150 range
- [ ] Client name, role, challenges personalized
- [ ] Workflow pointers (not details)
- [ ] Repository map (structure only)
- [ ] INDEX.md created with removed content

---

## Error Handling

**Missing ClientProfile Fields:**
```
WARNING: ClientProfile.targetWorkflow is empty.
Using inferred workflow from primaryGoal and useCases.
```

**CLAUDE.md Already Optimized:**
```
INFO: Current CLAUDE.md is 125 lines (already optimized).
Proceeding with personalization only.
```

**Invalid ClientProfile:**
```
ERROR: ClientProfile missing required fields: name, primaryGoal.
Cannot generate personalized CLAUDE.md.
```

---

**Version**: 1.0.0
**Part of**: Client Onboarding System (3-Layer Architecture)
**Layer**: Skills (Foundation)
**Dependencies**: questionnaire-parser (provides ClientProfile input)
**Next Skill**: workflow-template-generator
