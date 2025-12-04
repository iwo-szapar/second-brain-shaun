---
name: workflow-template-generator
description: |
  Generate workflow templates (process.md, checklist.md, examples.md) based on
  workflow type and client requirements. Creates structured documentation for
  client's primary workflow in memory/workflows/{name}/.

allowed-tools: "Write,Read"
when_to_use: |
  When creating new workflow documentation for client's primary workflow during
  onboarding, or when client requests systematic process for a new workflow type.
---

# Workflow Template Generator Skill

## Purpose

Generate complete workflow documentation template set for a client's primary workflow:
1. **process.md** - Step-by-step workflow process
2. **checklist.md** - Quality checklist
3. **examples.md** - Placeholder for future examples

**Input**: ClientProfile (workflow name, description, volume)
**Output**: 3 template files in `memory/workflows/{workflow-slug}/`

---

## Workflow Type Mapping

### Common Workflow Types

| Workflow Name | Slug | Template Type |
|---------------|------|---------------|
| Job Applications | job-application | outreach |
| Summary and Key Takeaways | meeting-summaries | meeting-notes |
| Content Creation | content-creation | content |
| Client Proposals | client-proposals | sales |
| Research Briefs | research-briefs | research |
| Sales Outreach | sales-outreach | outreach |
| Strategic Planning | strategic-planning | planning |

**Template Categories:**
- **outreach** - Research → Personalize → Send → Follow-up
- **meeting-notes** - Record → Transcribe → Summarize → Action items
- **content** - Research → Draft → Edit → Review → Publish
- **sales** - Qualify → Research → Proposal → Present → Close
- **research** - Define scope → Gather → Analyze → Synthesize
- **planning** - Assess → Ideate → Prioritize → Document

---

## Generation Algorithm

### Step 1: Determine Workflow Type

```typescript
function inferWorkflowType(workflow: ClientProfile['targetWorkflow']): TemplateType {
  const name = workflow.toLowerCase();

  if (name.includes('meeting') || name.includes('summary') || name.includes('takeaway')) {
    return 'meeting-notes';
  }
  if (name.includes('job') || name.includes('application') || name.includes('outreach')) {
    return 'outreach';
  }
  if (name.includes('content') || name.includes('writing') || name.includes('post')) {
    return 'content';
  }
  if (name.includes('proposal') || name.includes('pitch')) {
    return 'sales';
  }
  if (name.includes('research') || name.includes('analysis')) {
    return 'research';
  }
  if (name.includes('planning') || name.includes('strategy')) {
    return 'planning';
  }

  return 'generic'; // Fallback
}
```

### Step 2: Generate process.md

**Template Structure:**

```markdown
# {Workflow Name} - Process

## Overview
{ClientProfile.workflowDescription}

## Current State (Before Second Brain)
- **Time per occurrence**: {minutesPerOccurrence} minutes
- **Frequency**: {perWeek} per week ({perMonth} per month)
- **Monthly time investment**: {totalMonthlyHours} hours
- **Pain points**: {extracted from ClientProfile.concerns and workflowDescription}

## Target State (With Second Brain)
- **Time per occurrence**: {estimated 40-60% reduction} minutes
- **Quality improvement**: Consistent, systematic approach
- **Automation level**: {High/Medium/Low based on workflow type}

## Step-by-Step Process

{Insert workflow-type-specific template here}

### Phase 1: {First phase name}
1. {First step}
2. {Second step}
3. {Third step}

### Phase 2: {Second phase name}
1. {First step}
2. {Second step}

### Phase 3: Quality Check
1. Run `/review` on output
2. Address findings
3. Iterate if needed

### Phase 4: Learning
1. Run `/learn` to extract patterns
2. Update this process with improvements
3. Add successful examples to examples.md

## Quality Checklist

See: `checklist.md` in this folder

## Examples

See: `examples.md` in this folder

---

**Last Updated**: {current date}
**Status**: 🌱 Initial template - Will improve as you use it
```

### Step 3: Generate Workflow-Specific Process Steps

#### Meeting Notes Template (Ash's workflow)

```markdown
## Step-by-Step Process

### Phase 1: Recording Setup
1. Before meeting starts:
   - Open voice recording app (not Zoom/Teams built-in)
   - Test microphone levels
   - Set filename: `{date}-{meeting-topic}.m4a`
   - Enable speaker detection if available

2. During meeting:
   - Monitor recording indicator
   - Take brief manual notes of speaker names
   - Note any critical timestamps

### Phase 2: Transcription & Processing
1. Upload recording to transcription service
   - Use Whisper (local) or AssemblyAI (cloud)
   - Enable speaker diarization
   - Request timestamps

2. Review transcript:
   - Identify speakers (match to names)
   - Correct any major errors
   - Verify critical statements

### Phase 3: Summary Generation
1. Run `/plan Create meeting summary from transcript`
2. Provide context:
   - Meeting purpose
   - Attendees and roles
   - Key decisions needed

3. Execute plan:
   - Generate summary section
   - Extract action items with owners
   - Identify follow-up questions
   - Note decisions made

### Phase 4: Quality Check
1. Run `/review` on summary
2. Verify:
   - All action items captured
   - Speakers correctly identified
   - Timeline/deadlines noted
   - No hallucinations (check against transcript)

### Phase 5: Distribution & Learning
1. Share summary with attendees
2. Save to `experiences/meetings/{date}-{topic}/`
3. Run `/learn` to extract patterns
4. Update this process if you found improvements
```

#### Job Application Template (Daniel's workflow)

```markdown
## Step-by-Step Process

### Phase 1: Job Discovery
1. Find job posting
   - LinkedIn job search
   - Company career pages
   - Referrals/network

2. Initial qualification:
   - Match to your skills?
   - Salary range acceptable?
   - Location/remote compatible?

### Phase 2: Company Research
1. Run `/plan Research {Company Name} for job application`
2. Gather information:
   - Company background (website, LinkedIn)
   - Recent news/developments
   - Culture and values
   - Team/hiring manager (LinkedIn)
   - Products/services

3. Create research brief:
   - Save to `experiences/job-applications/{company}-{date}/research.md`

### Phase 3: Personalized Email Creation
1. Run `/plan Create personalized cold email for {Position} at {Company}`
2. Include context:
   - Your relevant experience
   - Company research findings
   - Why you're interested
   - How you can help

3. Review against checklist (see checklist.md)

### Phase 4: Quality Check
1. Run `/review` on email
2. Verify:
   - Personalization (not generic)
   - No hallucinations (facts correct)
   - Professional tone
   - Clear call-to-action

### Phase 5: Send & Track
1. Send email via LinkedIn or email
2. Save to `experiences/job-applications/{company}-{date}/`
3. Run `/learn` to extract what worked
4. Track in spreadsheet/CRM
```

### Step 4: Generate checklist.md

```markdown
# {Workflow Name} - Quality Checklist

## Before Starting
- [ ] {Workflow-specific preparation check}
- [ ] {Context gathering check}
- [ ] {Required info available}

## During Execution
- [ ] Following process.md steps
- [ ] {Workflow-specific quality check}
- [ ] {Another quality check}

## Before Delivery/Completion
- [ ] Run `/review` on output
- [ ] {Workflow-specific validation}
- [ ] {Final check}
- [ ] No AI hallucinations (facts verified)

## After Completion
- [ ] Run `/learn` to extract patterns
- [ ] Save example if successful
- [ ] Update process.md with improvements

---

**Last Updated**: {current date}
**Status**: 🌱 Initial checklist - Add checks as you learn
```

### Step 5: Generate examples.md

```markdown
# {Workflow Name} - Examples

## Purpose

This file stores your best examples of completed {workflow name} workflows.
After each successful execution, run `/learn` to capture the example here.

---

## Example 1: {Placeholder}

**Date**: {To be filled}
**Context**: {To be filled}
**What Made It Good**: {To be filled}

{Example content to be added}

---

## Example 2: {Placeholder}

{Note: Add more examples as you complete workflows}

---

## What Makes a Good Example?

{Workflow-type-specific criteria}

**For {workflow type}:**
- [ ] {Criterion 1}
- [ ] {Criterion 2}
- [ ] {Criterion 3}

---

**Status**: 🌱 Seed stage - Populate this as you use the workflow
**Goal**: Collect 5-10 examples for HIGH confidence patterns
**Current**: 0 examples

---

**Last Updated**: {current date}
```

---

## Workflow-Specific Checklist Criteria

### Meeting Notes Checklist
```markdown
## Before Starting
- [ ] Recording device tested
- [ ] Attendee list prepared
- [ ] Meeting purpose clear

## During Execution
- [ ] Recording active
- [ ] Speaker names noted
- [ ] Key timestamps captured

## Before Delivery/Completion
- [ ] Run `/review` on summary
- [ ] All action items have owners
- [ ] Deadlines specified
- [ ] Transcript saved for reference
- [ ] No misattributed quotes (verify speakers)
```

### Job Application Checklist
```markdown
## Before Starting
- [ ] Job posting saved/bookmarked
- [ ] Company research sources identified
- [ ] Your relevant experience clear

## During Execution
- [ ] Company background researched
- [ ] Hiring manager identified (LinkedIn)
- [ ] Key talking points noted
- [ ] Email personalized (not template)

## Before Delivery/Completion
- [ ] Run `/review` on email
- [ ] Facts verified (no hallucinations)
- [ ] Professional tone maintained
- [ ] Clear call-to-action included
- [ ] Contact info correct
```

---

## Output Files

This skill generates 3 files in `memory/workflows/{workflow-slug}/`:

1. **process.md** (~150-200 lines)
   - Overview
   - Current vs Target state
   - Step-by-step process (4-5 phases)
   - Quality check integration
   - Learning loop

2. **checklist.md** (~40-50 lines)
   - Before/during/after checklists
   - Workflow-specific quality criteria
   - Always includes `/review` and `/learn` steps

3. **examples.md** (~30-40 lines initially)
   - Placeholder structure
   - Criteria for good examples
   - Status tracking (seed → growing → mature)

**Total**: ~220-290 lines across 3 files (moved OUT of CLAUDE.md)

---

**Version**: 1.0.0
**Part of**: Client Onboarding System (3-Layer Architecture)
**Layer**: Skills (Foundation)
**Dependencies**: questionnaire-parser (provides workflow context)
**Next Skill**: mcp-recommender
