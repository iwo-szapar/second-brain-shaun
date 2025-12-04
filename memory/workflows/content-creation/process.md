# Content Creation Workflow - Process

> Systematic process for creating social media posts and articles for doctor clients with minimal editing required.

---

## Overview

**Workflow**: Content Creation for Doctor Marketing
**Goal**: Publication-ready content requiring < 30 minutes editing
**Frequency**: Weekly
**Current Pain**: Several hours editing per week
**Target**: Minimal editing through better context and memory

---

## Current State (Before Second Brain)

### Time Investment
- **Setup**: 10-15 minutes (creating project, adding context)
- **Generation**: 5-10 minutes (running prompts)
- **Editing**: **SEVERAL HOURS** (making content publication-ready)
- **Total**: 3-5 hours per piece

### Pain Points
1. **Fragmented Context**: Brand, tone, values scattered across Drive, notes, past projects
2. **Repetitive Setup**: Adding same information every time
3. **Generic Output**: Missing doctor's unique voice and positioning
4. **Heavy Editing**: Structure, tone, positioning all need fixes
5. **Lost Patterns**: Successful elements not captured for reuse

---

## Target State (With Second Brain)

### Time Investment
- **Setup**: 0 minutes (context pre-loaded in memory)
- **Planning**: 2-3 minutes (`/plan` generates approach)
- **Generation**: 5-10 minutes (execution)
- **Quality Check**: 2 minutes (`/review`)
- **Editing**: **15-30 MINUTES** (fine-tuning only)
- **Total**: 30-45 minutes per piece (85% reduction)

### Quality Improvements
- ✅ Consistent brand voice (loaded from memory)
- ✅ Unique positioning (values/frameworks integrated)
- ✅ Proven structures (patterns applied automatically)
- ✅ Evidence-based (research integrated)
- ✅ Publication-ready (minimal editing)

---

## Step-by-Step Process

### Phase 1: Preparation (One-Time Setup)

#### 1.1 Document Doctor's Brand Voice
**File**: `memory/style-voice/doctor-[name].md`
**Content**:
- Voice characteristics (professional, empathetic, authoritative)
- Common phrases and vocabulary
- Tone spectrum (casual → formal)
- Audience language preferences
- 3-5 example posts (best voice examples)

#### 1.2 Capture Values & Beliefs
**File**: `memory/knowledge-repo/values-beliefs/doctor-[name].md`
**Content**:
- Treatment philosophy
- Core medical beliefs
- Patient care principles
- Unique differentiators
- What makes this doctor different

#### 1.3 Document Positioning
**File**: `memory/knowledge-repo/positioning/doctor-[name].md`
**Content**:
- Specialty/niche
- Target patient (ICP)
- Unique methodology
- Competitive advantages
- Practice philosophy

#### 1.4 Create Prompt Templates
**File**: `memory/prompts/content-[type].md`
**Content**:
- Versioned prompts for each content type
- Variables to customize per doctor
- Structure patterns that work
- Quality requirements

---

### Phase 2: Content Generation (Per Piece)

#### 2.1 Plan the Content
```bash
/plan "Create social media post for Dr. [Name] about [topic]"
```

**Plan Should Include:**
- Content type and platform
- Target audience (ICP)
- Key message/positioning
- Structure pattern to use
- Memory files to reference
- Quality checks needed

#### 2.2 Execute with Context
```bash
/work
```

**During Execution:**
- Load brand voice from `memory/style-voice/`
- Pull values/frameworks from `knowledge-repo/`
- Apply proven structure from `patterns/`
- Use examples from `memory/examples/`
- Show reasoning process (Shaun's preference)

#### 2.3 Quality Review
```bash
/review
```

**Review Checks:**
- Brand voice consistency
- No untrue claims
- Evidence-based statements
- HIPAA compliance (no PHI)
- Structure follows proven patterns
- CTA specific and actionable
- Grammar/spelling correct

#### 2.4 Minimal Editing
**Target**: < 30 minutes
**Focus**:
- Fine-tune specific word choices
- Adjust for timing/current events
- Customize examples for doctor
- Verify medical accuracy
- Polish final details

#### 2.5 Learning Capture
```bash
/learn
```

**Captures:**
- What made this piece successful
- Editing patterns (what still needed work)
- New brand voice insights
- Structure variations that worked
- Audience response (if available)

---

### Phase 3: Continuous Improvement

#### 3.1 Weekly Review
**Every Friday:**
1. Count total pieces created
2. Calculate average editing time
3. Identify common editing patterns
4. Update prompts/memory accordingly
5. Test improvements next week

#### 3.2 Monthly Pattern Analysis
**Every Month:**
1. Review `/grow` metrics
2. Identify best-performing content
3. Extract success patterns
4. Update `memory/patterns/`
5. Refine prompt library
6. Share learnings with partner (future)

---

## Content Type Workflows

### Social Media Posts (200-250 words)

**Step 1: Choose Structure**
- Educational (Hook → Explanation → Solution)
- Story-based (Patient journey → Insight)
- Q&A (Question → Answer → Depth)
- List-based (3 Signs of X → Why It Matters)

**Step 2: Load Context**
```bash
/recall "Dr. [Name] brand voice"
/recall "positioning for [condition]"
/recall "successful hooks for [audience]"
```

**Step 3: Generate**
```bash
/plan "Social post for Dr. [Name] - [topic] - [structure]"
/work
```

**Step 4: Review & Edit**
```bash
/review
# Make minimal edits (< 30 min)
```

**Step 5: Capture Success**
```bash
/learn
# Stores in memory/patterns/ for future use
```

---

### Articles (1200-1500 words)

**Step 1: Research**
```bash
/plan "Research article on [topic] for Dr. [Name]"
# System uses web search MCP for evidence
```

**Step 2: Outline**
- Problem statement (patient perspective)
- Why conventional approaches fail
- Root cause analysis
- Doctor's unique solution
- Evidence (case patterns/research)
- Implementation steps
- Clear CTA

**Step 3: Generate**
```bash
/work
# System writes full article with context loaded
```

**Step 4: Review & Edit**
```bash
/review
# Focuses on medical accuracy, evidence strength
```

**Step 5: Doctor Verification**
- Share with doctor for medical accuracy check
- Incorporate feedback
- Update knowledge-repo with new insights

---

## Quality Checkpoints

### Before Starting
- [ ] Doctor's brand voice file exists and is current
- [ ] Values/beliefs documented
- [ ] Positioning clear
- [ ] Target audience (ICP) identified
- [ ] Content type/structure selected

### During Generation
- [ ] Memory files referenced correctly
- [ ] Structure pattern applied
- [ ] Reasoning process shown
- [ ] Examples used as templates
- [ ] Voice consistency maintained

### After Generation
- [ ] `/review` completed without major issues
- [ ] No untrue claims identified
- [ ] HIPAA compliance verified (no PHI)
- [ ] Brand voice matches expectations
- [ ] CTA specific and actionable

### Before Publishing
- [ ] Editing time < 30 minutes
- [ ] Doctor approved (if new claims/approach)
- [ ] Ready to publish without major changes
- [ ] Tracked for learning (note what worked)

---

## Troubleshooting

### Issue: Still Requires Hours of Editing
**Diagnosis**: Memory incomplete or prompt too generic
**Solution**:
1. Check `memory/style-voice/doctor-[name].md` completeness
2. Add 3-5 successful post examples
3. Document specific phrases doctor uses
4. Update positioning/values with more detail
5. Retest with next piece

### Issue: Tone Doesn't Match Doctor
**Diagnosis**: Insufficient brand voice documentation
**Solution**:
1. Collect 5-10 doctor's actual social posts
2. Analyze voice characteristics
3. Document in `memory/style-voice/`
4. Include "sounds like / doesn't sound like" examples
5. Test with voice-only generation

### Issue: Weak Hooks/Structure
**Diagnosis**: Not using proven patterns
**Solution**:
1. Review `memory/examples/` for successful hooks
2. Extract pattern from best posts
3. Document in `memory/patterns/content-structures.md`
4. Use pattern explicitly in next prompt
5. Compare before/after

---

## Next Steps

### Immediate (Day One)
1. Complete brand voice file for primary doctor client
2. Document values/beliefs/positioning
3. Generate first test post
4. Measure editing time
5. Run `/learn` to capture insights

### Week 1
1. Create content for 3-5 pieces
2. Track editing time for each
3. Identify patterns requiring editing
4. Update memory/prompts based on learnings
5. Retest improved system

### Month 1
1. Establish baseline metrics (editing time)
2. Build prompt library (5+ versioned prompts)
3. Populate examples with best work
4. Document all doctor clients' brand voices
5. Share system with partner for feedback

---

**Version**: 1.0.0
**Last Updated**: 2025-12-03
**Status**: Primary Workflow Process
