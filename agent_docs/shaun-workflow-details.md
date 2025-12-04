# Shaun's Workflow Details - Content Creation

> Deep-dive on Shaun's primary workflow: creating social media posts and articles for doctor clients.

---

## Workflow Overview

**Name**: Content Creation for Doctor Clients
**Type**: Social media posts, articles, marketing content
**Frequency**: Weekly
**Current Time**: Several hours editing per week
**Target Time**: Minimal editing (< 30 minutes per piece)
**Priority**: CRITICAL (highest-value activity)

---

## Current State (Before Second Brain)

### Process Steps
1. **Setup**: Create new Claude project or thread
2. **Context Loading**: Copy/paste instructions (brand, tone, positioning, etc.)
3. **Test Run**: Generate sample to check output
4. **Prompt Tweaking**: Adjust instructions until close
5. **Main Generation**: Create actual content
6. **Editing**: **SEVERAL HOURS** making content publication-ready

### Pain Points
- **Repetitive Setup**: Adding same context repeatedly
- **Missing Elements**: Even with setup, missing values/beliefs/frameworks
- **Heavy Editing**: Output requires significant refinement
- **No Memory**: System forgets past successful patterns
- **Context Scattered**: Information in Drive, notes, past projects

---

## Target State (With Second Brain)

### New Process
1. **Pre-loaded Context**: System already knows brand, tone, values, frameworks
2. **Plan**: `/plan [content type for Dr. X]`
3. **Execute**: `/work` following generated plan
4. **Quality Check**: `/review` catches issues before publishing
5. **Minimal Editing**: 15-30 minutes maximum per piece
6. **Learning**: `/learn` captures what made this piece successful

### Success Metrics
- ✅ Setup time: 0 (context already loaded)
- ✅ Editing time: < 30 minutes (vs several hours)
- ✅ Quality: Publication-ready on first draft
- ✅ Consistency: Maintains brand/tone across all clients
- ✅ Memory: System learns from successful posts

---

## Content Types

### 1. Social Media Posts
**Platforms**: LinkedIn, Facebook, Instagram (doctor-focused)
**Length**: 100-300 words
**Format**: Hook → Explanation → Call-to-action
**Style**: Educational, empathetic, authoritative

### 2. Articles
**Length**: 800-2000 words
**Format**: Problem → Solution → Evidence → Action
**Style**: In-depth, evidence-based, patient-focused

### 3. Marketing Copy
**Types**: Email sequences, landing pages, ads
**Format**: Varies by medium
**Style**: Persuasive, benefit-focused, trust-building

---

## Content Requirements

### Must-Include Elements
1. **LLM Logic Process**: Show reasoning (Shaun likes to see thinking)
2. **Brand/Tone**: Doctor-specific voice and style
3. **Values**: Core beliefs and medical philosophy
4. **Frameworks**: Mental models and treatment approaches
5. **Positioning**: What makes this doctor unique
6. **Evidence**: Data or clinical experience backing claims
7. **Patient Focus**: Relatable experiences and outcomes

### Content Structure (Social Posts)
```
1. Hook (Relatable symptom/experience)
   → "Many long COVID patients describe..."

2. Pattern Interruption
   → "But here what people miss:"

3. Root Cause Explanation
   → "They're signs of an autonomic nervous system..."

4. Memorable Analogy
   → "Like a toddler going down hill on a bike"

5. Solution
   → "This is where stellate ganglion block becomes (SGB) the hero"

6. Authority Statement
   → "Your nervous system isn't broken. It's stuck."

7. Call to Action
   → "For those navigating complex autonomic dysfunction..."
```

---

## Quality Checklist

### Before Generation
- [ ] Doctor's brand voice loaded
- [ ] Target audience (ICP) identified
- [ ] Key positioning points available
- [ ] Values/beliefs accessible
- [ ] Treatment framework understood

### During Review
- [ ] Tone matches doctor's brand
- [ ] No untrue or unsupported claims
- [ ] Patient-focused language
- [ ] Clear value proposition
- [ ] Appropriate call-to-action
- [ ] HIPAA-compliant (no PHI)

### Before Publishing
- [ ] Run `/review` for quality check
- [ ] Verify claims with doctor if new
- [ ] Check for typos/grammar
- [ ] Ensure brand consistency
- [ ] Test on sample audience if high-stakes

---

## Integration Points

### Memory System
- **style-voice/**: Doctor-specific tone and brand templates
- **knowledge-repo/**: Values, beliefs, frameworks for each doctor
- **examples/**: Best-performing posts as templates
- **prompts/**: Versioned prompts for different content types

### Data Sources
- **Google Drive**: Reference materials, past content
- **Web Search**: Research for evidence-based claims
- **PDFs/Books**: Medical knowledge and frameworks
- **Past Projects**: Successful content examples

### Output Destinations
- **Google Docs**: Draft storage for review
- **Social Platforms**: Direct publishing (future)
- **Content Calendar**: Scheduling and tracking

---

## Prompt Library (Versioned)

### Content Generation Prompts

#### Social Post - Educational Pattern
```
Create a social media post for [Doctor Name] targeting [ICP].

Context:
- Brand: {load from memory/style-voice/doctor-X.md}
- Topic: [specific topic]
- Goal: Educate about [condition/treatment]

Structure:
1. Relatable hook (3 specific symptoms/experiences)
2. Pattern interruption ("But here what people miss:")
3. Root cause explanation
4. Memorable analogy
5. Solution introduction
6. Authority statement
7. Call to action

Requirements:
- Show your reasoning process
- Use doctor's unique positioning
- Include values/beliefs
- Evidence-based claims only
- 200-250 words
```

#### Article - Deep Dive Pattern
```
Create an in-depth article for [Doctor Name] about [topic].

Context:
- Brand: {load from memory/style-voice/doctor-X.md}
- Audience: [ICP details]
- Treatment framework: {load from knowledge-repo/}

Structure:
1. Problem (patient perspective)
2. Why conventional approaches fail
3. Root cause analysis
4. Doctor's unique solution
5. Evidence/case studies
6. Implementation steps
7. Call to action

Requirements:
- 1200-1500 words
- Evidence-based
- Patient stories (anonymous)
- Show treatment philosophy
- Clear next steps
```

---

## Common Editing Patterns

### What Currently Needs Heavy Editing
1. **Tone Drift**: AI reverts to generic medical language
2. **Missing Personality**: Lacks doctor's unique voice
3. **Generic Positioning**: Doesn't emphasize unique approach
4. **Weak Hooks**: Opening doesn't grab attention
5. **Vague CTAs**: Call-to-action not specific enough

### With Second Brain Memory
- Brand/tone templates automatically applied
- Unique positioning emphasized
- Values/beliefs naturally integrated
- Proven hook patterns reused
- Specific CTAs from past successes

---

## Success Examples

### High-Performing Post Pattern
See: `memory/examples/content/social-posts/long-covid-autonomic.md`

**Why It Worked:**
- Specific, relatable symptoms (3 examples)
- Clear pattern interruption
- Root cause explanation (not just symptoms)
- Memorable analogy (toddler on bike)
- Actionable solution (SGB)
- Authoritative tone without preaching

**Reusable Elements:**
- Hook structure (3 symptoms format)
- Pattern interruption phrase
- Analogy approach
- Authority statement style
- CTA framing

---

## Expansion Roadmap

### Phase 1: Core Content (Current)
- Social media posts
- Articles
- Email sequences

### Phase 2: Multiclient Management (Next 30 Days)
- Brand templates for each doctor
- Quick-switch between clients
- Consistent quality across all

### Phase 3: Partner Enablement (Next 60 Days)
- Partner uses same system
- Shared prompt library
- Collaborative memory building

### Phase 4: Client Self-Service (Future)
- Doctor clients access own hub
- Content calendar view
- Approval workflow

---

## Troubleshooting

### Issue: Output Still Requires Heavy Editing
**Diagnosis**: Memory not fully loaded or prompt not specific enough
**Solution**:
1. Check `memory/style-voice/[doctor].md` is complete
2. Verify values/frameworks in `knowledge-repo/`
3. Review `/review` output for specific issues
4. Run `/learn` on successful edits to improve system

### Issue: Tone Doesn't Match Doctor
**Diagnosis**: Generic brand template or insufficient examples
**Solution**:
1. Add 3-5 best post examples to `memory/examples/`
2. Update `style-voice/[doctor].md` with specific phrases
3. Include "voice notes" (how doctor speaks uniquely)
4. Test with `/ask` before generating full content

### Issue: Missing Context Elements
**Diagnosis**: Knowledge not captured in memory system
**Solution**:
1. Document in `knowledge-repo/[doctor]/`
2. Create structured templates for recurring elements
3. Use `/recall [topic]` to verify availability
4. Update memory after each successful project

---

**Version**: 1.0.0
**Last Updated**: 2025-12-03
**Status**: Primary Workflow
