# Versioned Prompt Library

> Your systematically organized, version-controlled prompt collection.

---

## Purpose

**Shaun's Core Need**:
> "I want prompts stored and versioned... I tend to add the same information over and over when creating new projects."

This folder solves:
- ✅ No more recreating prompts from scratch
- ✅ Version history of what works
- ✅ Reusable templates for common tasks
- ✅ Easy to share with partner

---

## Structure

```
prompts/
├── README.md (this file)
├── content-creation/
│   ├── social-post-educational-v1.md
│   ├── social-post-story-v1.md
│   ├── article-deep-dive-v1.md
│   └── email-sequence-v1.md
├── business-operations/
│   ├── business-metrics-v1.md
│   └── client-report-v1.md
└── research/
    ├── competitive-analysis-v1.md
    └── content-research-v1.md
```

---

## Prompt Template Format

Each prompt file should include:

```markdown
# [Prompt Name] - v[Version Number]

## Purpose
[What this prompt does]

## When to Use
[Situations where this prompt is appropriate]

## Variables
- `[DOCTOR_NAME]`: Which doctor client
- `[TOPIC]`: Content topic
- `[AUDIENCE]`: Target patient type
- `[CONTENT_TYPE]`: Post/article/email

## The Prompt

[The actual prompt template with variables marked]

## Success Criteria
[What good output looks like]

## Version History
- v1.0 (2025-12-03): Initial version
- v1.1 (Date): [What changed and why]

## Performance
- Success rate: [Track over time]
- Avg editing time: [Track over time]
- Best uses: [Where this excels]
```

---

## How to Version

### When to Create New Version
- **Minor tweaks**: Update existing file, note in version history
- **Major changes**: Create new v2.md file, keep v1 for reference
- **Completely different**: New prompt name, start at v1

### Versioning Strategy
```
v1.0 = Initial working version
v1.1 = Small improvements (better wording, added variable)
v1.5 = Significant enhancement (new section, major restructure)
v2.0 = Major overhaul (different approach, new framework)
```

---

## Starter Prompts (Populate These First)

### 1. Social Post - Educational Pattern
**File**: `content-creation/social-post-educational-v1.md`
**Purpose**: Doctor education posts using Hook → Explanation → Solution structure
**Based On**: Long COVID autonomic dysfunction example

### 2. Article - Deep Dive
**File**: `content-creation/article-deep-dive-v1.md`
**Purpose**: Long-form content (1200-1500 words) for medical topics
**Structure**: Problem → Why conventional fails → Root cause → Solution

### 3. Business Metrics Report
**File**: `business-operations/business-metrics-v1.md`
**Purpose**: Quick business state analysis
**Future**: When business metrics workflow is active

---

## Usage Pattern

### Creating Content
1. Choose appropriate prompt from library
2. Fill in variables (doctor name, topic, etc.)
3. Run prompt via `/plan` or `/ask`
4. System loads memory + applies template
5. Minimal editing required

### Improving Prompts
1. After using prompt, note what worked/didn't
2. Run `/learn` to capture insights
3. Update prompt version with improvements
4. Test improved version on next use
5. Track performance over time

---

## Sharing with Partner

When partner joins:
1. Point them to this library
2. They can use same prompts
3. Contribute improvements
4. Build shared knowledge

**Benefit**: Both improve each other's prompts

---

**Status**: 🌱 Ready for first prompts
**Next**: Create your 3 most-used prompts during content work
**Goal**: 10+ versioned prompts within 30 days
