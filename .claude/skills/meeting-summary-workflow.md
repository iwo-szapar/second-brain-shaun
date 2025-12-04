#---
name: meeting-summary-workflow
description: |
  Generate meeting summaries with speaker identification, action items, and key
  takeaways from meeting transcripts or recordings. Optimized for Ash's primary
  workflow (10 meetings/week, 8.3 hrs/month savings potential). Uses Whisper MCP
  for local transcription with privacy preservation.

allowed-tools: "Read,Write,Skill,mcp__filesystem__*"
when_to_use: |
  When Ash needs to process meeting recordings into summaries, extract action
  items from transcripts, identify speakers in conversations, or create
  structured meeting documentation. Auto-invokes when user says "summarize meeting",
  "transcribe this recording", or provides audio files.
---

# Meeting Summary Workflow Skill

> Ash's primary workflow: Transform meeting recordings into actionable summaries (10/week)

---

## Purpose

Automate Ash's most time-intensive workflow:
- **Current**: 10 min per meeting × 10 meetings/week = 8.3 hrs/month
- **Target**: 3-4 min per meeting × 10 meetings/week = 2-3 hrs/month
- **Savings**: 5-6 hours/month (70% reduction)

---

## Workflow Overview

```
Audio recording (Voice Memo)
    ↓
Whisper MCP transcribes (local, 2 min)
    ↓
Map speakers to names (30 sec)
    ↓
Generate summary with action items (1 min)
    ↓
Quality check (/review)
    ↓
Ash's authentic touch (minimal editing)
    ↓
Distribute to attendees
```

**Total Time**: 3-4 minutes (vs 10 minutes manual)

---

## Prerequisites

### Required Setup
- [ ] Whisper MCP installed (see `agent_docs/ash-integrations.md`)
- [ ] Voice Memo app (macOS built-in)
- [ ] Recording process tested (see `memory/workflows/meeting-summaries/audio-setup.md`)

### Recommended Setup
- [ ] Audio Hijack for both-sides capture ($64, worth it for 10/week)
- [ ] Warning timer configured (prevents missed recordings)
- [ ] Speaker mapping list started (recurring attendees)

---

## Step-by-Step Process

### Step 1: Recording (During Meeting)

**See**: `memory/workflows/meeting-summaries/audio-setup.md` for detailed recording setup

**Quick version**:
1. Open Voice Memo
2. Set filename: `{YYYY-MM-DD}-{topic}.m4a`
3. Test mic, start recording
4. Set 2-min warning timer
5. Monitor during meeting

### Step 2: Transcription (2 minutes, automatic)

**Provide audio file to Claude**:
```
I have a meeting recording that needs transcription.

File: {filename}.m4a
Meeting: {topic}
Attendees: {list if known}

Please:
1. Transcribe using Whisper MCP (local processing)
2. Enable speaker diarization
3. Include timestamps
4. Format as plain text with speaker labels
```

**Claude executes**:
- Whisper MCP processes audio locally (privacy-friendly)
- Generates transcript with Speaker 0, Speaker 1, etc.
- Returns formatted transcript

**Output**:
```
[00:00] Speaker 0: Thanks for joining today...
[00:15] Speaker 1: Happy to be here...
[01:30] Speaker 0: Great point about...
```

### Step 3: Speaker Mapping (30 seconds)

**Map speaker labels to names**:
```
Speaker 0 → Ash (me)
Speaker 1 → {First attendee name and role}
Speaker 2 → {Second attendee name and role}
```

**Provide to Claude**:
```
Please update the transcript with speaker names:
Speaker 0 = Ash
Speaker 1 = John Smith (Acme Corp, VP Engineering)
Speaker 2 = Sarah Johnson (Acme Corp, Product Manager)
```

### Step 4: Summary Generation (1 minute)

**Request summary**:
```
Generate a meeting summary using /plan command.

Meeting: {topic}
Date: {date}
Duration: {length from transcript}
Purpose: {one-line goal}

Include:
1. Key discussion points
2. Decisions made (with rationale)
3. Action items (with owners and deadlines)
4. Follow-up questions
5. Next steps

Use Ash's professional voice.
Run /review before finalizing.
```

**Claude generates**:
- Structured summary
- Action items table
- Decisions documented
- Follow-up questions noted

### Step 5: Quality & Authenticity Check (30 seconds)

**Automatic /review**:
- Claude runs 6-agent quality review
- Checks completeness, accuracy, authenticity
- Scores output (target: 8+/10)

**Ash's manual check**:
- [ ] Sounds authentically like Ash's writing?
- [ ] No AI detection triggers?
- [ ] All critical items captured?
- [ ] Ready to send without heavy editing?

**If score < 7 or fails authenticity**:
- Address findings
- Focus on making it sound like Ash
- Re-run /review

### Step 6: Save & Distribute (30 seconds)

**Save complete record**:
```
experiences/meetings/{YYYY-MM-DD}-{topic}/
├── audio.m4a (original recording)
├── transcript.txt (Whisper output with speaker names)
├── summary.md (final summary)
└── notes.md (any additional context)
```

**Distribute**:
- Email to attendees
- Or share via Slack/Teams
- Include action items prominently

---

## Quality Checklist

**See**: `memory/workflows/meeting-summaries/checklist.md` for complete checklist

**Essential checks**:
- [ ] All action items have owners
- [ ] Deadlines specified
- [ ] Speaker attribution correct
- [ ] No hallucinations (verify against transcript)
- [ ] Authentically Ash's voice (not AI-sounding)
- [ ] /review score 7+ (minimum)

---

## Common Issues & Solutions

### Issue: Poor Transcription Quality

**Symptoms**: Many errors, gibberish, missing sections

**Solutions**:
1. Check audio quality (see audio-setup.md)
2. Adjust Whisper model size (base → small)
3. Improve recording setup (better mic, less noise)

### Issue: Can't Identify Speakers

**Symptoms**: All speakers labeled "Speaker 0" or unclear differentiation

**Solutions**:
1. Verify speaker diarization enabled in Whisper
2. Note speaker names during meeting (helps mapping)
3. Consider video recording (visual cues)

### Issue: AI-Sounding Summary

**Symptoms**: Doesn't sound like Ash's writing

**Solutions**:
1. Load Ash's professional voice: `ash-professional-voice.md`
2. Check against `ash-quality-standards.md` (AI detection prevention)
3. Add Ash's characteristic phrases
4. Remove AI-typical language

### Issue: Missing Action Items

**Symptoms**: Important tasks not captured

**Solutions**:
1. Verify against transcript (search for "will", "should", "need to")
2. Check for implied action items (decisions → actions)
3. Ask Ash: "Did I miss any action items?"

---

## Pattern Learning

After completing 5+ meeting summaries, run `/learn` to extract:

**Patterns to Capture**:
- Common meeting structures (Ash's typical flow)
- Recurring action item categories
- Frequent attendees (for speaker mapping)
- Effective summary formats
- Time-saving shortcuts

**Saved to**: `memory/patterns/meeting-summary-patterns.md`

**Benefits**:
- Faster processing (Claude knows your patterns)
- Better action item extraction
- More consistent quality
- Improved speaker recognition

---

## Time Savings Tracking

| Metric | Current (Manual) | With This Skill | Savings |
|--------|------------------|-----------------|---------|
| Time per meeting | 10 min | 3-4 min | 60-70% |
| Weekly time | 100 min | 30-40 min | 60-70 min |
| Monthly time | 8.3 hrs | 2-3 hrs | 5-6 hrs |
| Annual time | 100 hrs | 30 hrs | 70 hrs |

**Value**: 70 hours/year × $200/hr (consultant rate) = $14,000/year value

---

## Usage Examples

### Example 1: Standard Meeting

```
User: "I have a recording from today's client meeting. Can you help me create a summary?"

Skill: "I'll process this meeting recording using the meeting-summary workflow.

First, let me transcribe the audio using Whisper MCP (local, privacy-friendly).

[Transcription happens]

I've transcribed the meeting. I see 3 speakers. Can you help me identify them?
- Speaker 0: {Likely you based on frequency}
- Speaker 1: {Second voice}
- Speaker 2: {Third voice}

[User provides names]

Perfect. Now generating summary with action items...

[Summary generated using /plan]
[/review runs automatically]

Summary complete (review score: 8.5/10).
Ready to distribute to attendees.

Saved to: experiences/meetings/2025-12-02-client-kickoff-acme/
```

### Example 2: Quick Summary (Transcript Already Available)

```
User: "Here's a transcript from Zoom. Please summarize."

Skill: "I'll generate a meeting summary from this transcript.

[Reads transcript, identifies speakers]

Generating summary with:
- Key discussion points
- Decisions made
- Action items with owners
- Follow-up questions

[Uses /plan and /review]

Summary ready. Shall I save to experiences/meetings/?
```

---

## Integration with Other Workflows

### Combined with Content Creation

Meeting insights → LinkedIn post:
```
User: "Use insights from today's meeting to write a LinkedIn post about {topic}"

Skill:
1. Reads meeting summary
2. Extracts key insights
3. Generates LinkedIn post in Ash's professional voice
4. References meeting (if appropriate)
```

### Combined with Client Acquisition

Prospect meeting → Follow-up strategy:
```
User: "Based on the prospect meeting, what should our follow-up be?"

Skill:
1. Reads meeting summary
2. Identifies buying signals
3. Suggests follow-up actions
4. Drafts follow-up email (if requested)
```

---

**Version**: 1.0.0
**Part of**: Ash's Second Brain
**Layer**: Skills (for ongoing use)
**Related**: `memory/workflows/meeting-summaries/` for detailed process
**Last Updated**: 2025-12-02
