---
name: writing-starter
description: |
  Break through blank page paralysis with scaffolding, outlines, and starter
  prompts. Helps Ash get started writing when facing writer's block. Provides
  structure and momentum without dictating content. Auto-invokes when user
  expresses writing difficulty or needs help starting.

allowed-tools: "Read,Write,Skill"
when_to_use: |
  When user says "help me start writing", "I'm stuck on blank page", "writer's
  block", "don't know how to begin", or when user needs writing scaffolding.
  Especially useful for Ash who faces "blank page paralysis".
---

# Writing Starter Skill

> Break through blank page paralysis - Get Ash writing in 60 seconds

---

## Purpose

Help Ash overcome: "Helping me get started writing when I'm facing 'blank page paralysis'"

**Not a writing service** - This skill:
- ✅ Provides scaffolding and structure
- ✅ Asks clarifying questions to unlock ideas
- ✅ Creates outlines and starter prompts
- ✅ Gives momentum to begin
- ❌ Does NOT write the full piece (Ash writes it)

**Philosophy**: The hardest part is starting. This skill makes starting easy.

---

## Quick Start Methods

### Method 1: The Interview (Fastest)

**For any writing task, start with questions**:

```
I'll help you start writing. Let me ask a few questions:

1. What's this about in one sentence?
2. Who's the audience?
3. What should they do/know/feel after reading?
4. What's the most interesting/surprising insight?
5. What's your unique perspective on this?
```

**Ash answers questions** (speaking, not writing - easier)

**Claude converts answers into**:
- Opening hook (uses question 4 - most interesting)
- Outline (based on question 1-3)
- Key points to cover (from question 5)
- Suggested structure

**Ash now has** scaffold to fill in (much easier than blank page)

---

### Method 2: The Outline Generator

**Start with minimal input**:

```
User: "I need to write about {vague topic}"

Skill: "Let me create an outline to get you started.

Based on '{topic}', here's a structure:

I. Opening Hook
   - {Suggested hook based on topic}

II. Main Points
   - Point 1: {Inferred from topic}
   - Point 2: {Another angle}
   - Point 3: {Conclusion direction}

III. Call to Action
   - {What reader should do}

Which section should we start with? (Hint: Start with Section II if stuck on hook)
```

**Ash picks a section** → Much easier to write one section than whole piece

---

### Method 3: The Examples Trigger

**Show relevant examples**:

```
User: "I want to write a LinkedIn post but don't know how to start"

Skill: "Let me show you examples of your best LinkedIn posts.

[Reads memory/examples/linkedin/]

Here are 3 successful posts you've written:

Example 1: {title} - Opened with {type of hook}
Example 2: {title} - Started with {approach}
Example 3: {title} - Led with {angle}

Which approach feels right for this topic?
```

**Ash sees patterns in own work** → Easier to replicate success

---

### Method 4: The Conversation Starter

**Turn writing into conversation**:

```
User: "I need to write {something} but I'm stuck"

Skill: "Let's have a conversation instead of writing.

Tell me:
- Why does this matter?
- What's your hot take?
- What would you tell a friend about this?

[Ash responds conversationally]

Great! Here's what you just said, structured as a draft:

{Converts conversation into outline}

Now you have the bones - just flesh it out.
```

**Writing feels less daunting** when it's extracted from natural conversation

---

## Voice Mode Integration

**Always ask**: "Which voice mode should I use?"

**Options**:
- Very Casual (friends, informal) → `memory/style-voice/ash-casual-voice.md`
- Professional (default, most work) → `memory/style-voice/ash-professional-voice.md`
- Fully Formal (C-suite, legal) → `memory/style-voice/ash-formal-voice.md`

**If user doesn't specify**: Default to Professional

**Load voice file** before generating any text (outlines, hooks, drafts)

---

## Scaffolding Templates

### For LinkedIn Posts

```markdown
## Hook
{Attention-grabbing opening - question, bold statement, or data point}

## Context
{Why this matters, 2-3 sentences}

## Main Insight
{Your unique perspective, 3-4 sentences}

## Supporting Points
- Point 1
- Point 2
- Point 3

## Call to Action
{What reader should think/do}
```

**Ash fills in** each section (easier than blank page)

### For Substack Articles

```markdown
## Title Ideas
1. {Option 1}
2. {Option 2}
3. {Option 3}

## Opening Hook
{Compelling first paragraph - draw reader in}

## Outline
I. Introduction
   - {Hook expanded}
   - {Thesis statement}

II. Background/Context
   - {What reader needs to know}

III. Main Analysis
   - {Point 1 with evidence}
   - {Point 2 with evidence}
   - {Point 3 with evidence}

IV. Implications
   - {So what? Why does this matter?}

V. Conclusion
   - {Key takeaway}
   - {Call to action}

## Research Needed
- {Source 1}
- {Source 2}
```

**Ash has clear roadmap** → Write section by section

### For Client Proposals

```markdown
## Executive Summary
{One paragraph - the whole proposal in miniature}

## Client Situation
{What you understand about their needs}

## Proposed Approach
{How you'll help}

## Deliverables
- {Specific output 1}
- {Specific output 2}

## Timeline
{Milestones and dates}

## Investment
{Pricing and terms}

## Next Steps
{How to proceed}
```

**Clear structure** → Fill in with specifics

---

## Advanced Techniques

### Technique 1: Start in Middle

**If stuck on opening**:
```
"Skip the intro. Start with the most interesting part (Section II).
You can write the opening later once you know what the piece says."
```

**Why it works**: Easier to write intro after body is clear

### Technique 2: Voice-to-Text Draft

**For severe paralysis**:
```
"Talk out loud about your topic for 2 minutes. I'll structure what you say.

[Ash talks freely]
[Skill captures and structures]

Now you have a rough draft to refine."
```

**Why it works**: Speaking is easier than writing for many people

### Technique 3: Question-Answer Format

**Start with questions**:
```
"Let's use Q&A format to get started.

What are the 3-5 questions readers have about {topic}?
[List questions]

Now answer each question in 2-3 sentences.
[Ash answers]

I'll structure these into a flowing article."
```

**Why it works**: Answering questions easier than creating from scratch

---

## Integration with Other Skills

### With Content Creator Agent

```
writing-starter (this skill)
    ↓ Generates outline/scaffold
content-creator agent
    ↓ Expands into full draft
/review
    ↓ Quality check
Ash's final edit (minimal)
```

### With Meeting Summary Workflow

```
Meeting insights (from summary)
    ↓
writing-starter (scaffold LinkedIn post)
    ↓
Ash writes post based on meeting takeaway
```

---

## Success Metrics

**For Ash**:
- Time from "want to write" → "started writing": < 2 minutes
- Editing needed: < 25% rewrite (vs 50%+ currently)
- Authenticity: Sounds like Ash wrote it (not AI)
- Blank page paralysis frequency: Reduced by 70%+

**Measurements**:
- Track: How often Ash uses this skill
- Track: Time to first draft
- Track: Editing percentage needed
- After 10 uses: Run /learn to optimize scaffolding

---

## Example Usage

```
User: "I want to write a LinkedIn post about transitioning to fractional consulting but I don't know how to start"

Skill: "Let's break through that blank page together!

Quick questions:
1. What's the #1 insight you want to share?
2. Who's your audience (consultants like you, or clients hiring fractional help)?
3. What should they do after reading?

[User answers]

Perfect! Here's your scaffold:

HOOK: {Based on answer 1 - most compelling insight}

CONTEXT: Why this matters for {answer 2 audience}

MAIN POINTS:
- Your experience transitioning
- What you learned
- What works/doesn't work

CTA: {Based on answer 3}

Which section feels easiest to write first?

(Tip: If stuck on hook, start with main points. Write hook last.)
```

**Result**: Ash starts writing in < 2 minutes, has clear structure

---

**Version**: 1.0.0
**Part of**: Ash's Second Brain
**Layer**: Skills (for ongoing use)
**Related**: content-creator agent (expands drafts), `/review` (quality check)
**Last Updated**: 2025-12-02
