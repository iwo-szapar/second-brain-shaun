# Shaun's Quality Standards - Content & Compliance

> Quality criteria, constraints, and compliance requirements for Shaun's Second Brain system.

---

## Content Quality Standards

### Publication-Ready Criteria
Content must be ready to publish with **< 30 minutes editing** (vs current several hours).

**Checklist:**
- [ ] Matches doctor's specific brand voice
- [ ] Includes values/beliefs/frameworks naturally
- [ ] Uses proven hook/structure patterns
- [ ] Evidence-based (no unsupported claims)
- [ ] Engaging opening (relatable symptoms/experience)
- [ ] Clear call-to-action
- [ ] Appropriate length for platform
- [ ] Grammar/spelling correct
- [ ] Tone authentic (not "AI voice")

---

## Brand & Tone Requirements

### Core Principle
**"Must not require heavy editing"** - The #1 quality metric

### Doctor-Specific Requirements
Each doctor client has unique:
- **Voice**: Professional but approachable vs authoritative vs empathetic
- **Positioning**: Unique treatment philosophy or specialty
- **Values**: Medical beliefs and patient care principles
- **Frameworks**: Mental models for explaining conditions/treatments

### Tone Checklist
- [ ] Authentic to doctor's actual speaking style
- [ ] Professional without being stuffy
- [ ] Educational without being condescending
- [ ] Empathetic toward patient experiences
- [ ] Authoritative backed by evidence
- [ ] Action-oriented with clear next steps

### Red Flags (Requires Major Editing)
- ❌ Generic medical language ("studies show", "research indicates")
- ❌ Overly formal or academic tone
- ❌ Missing doctor's unique positioning
- ❌ No values/beliefs integrated
- ❌ Weak or vague opening hook
- ❌ Generic call-to-action
- ❌ "AI voice" (overly polished, no personality)

---

## Medical & Reputation Standards

### Never Publish Claims That:
1. **Untrue or Unsupported**: No false or exaggerated claims
2. **Oversimplified**: Don't reduce complex medicine to soundbites
3. **Guarantee Outcomes**: No "cure" or "guarantee" language
4. **Diagnose**: Can educate but not provide medical advice
5. **Criticize Competitors**: Professional positioning without attacks

### Evidence Requirements
- **Patient Stories**: Anonymized, general patterns (not specific cases)
- **Treatment Claims**: Backed by clinical experience or research
- **Statistics**: Verified, cited where possible
- **Medical Facts**: Current, accurate information

### Reputation Protection
**Audience**: Doctors with professional reputations to protect
**Standard**: Content reflects well on doctor's expertise and ethics
**Risk**: One bad post can damage years of reputation building

**Protection Measures:**
- Use `/review` before any publication
- Verify new treatment claims with doctor
- Test tone with sample audience if high-stakes
- Maintain consistent professionalism across all content

---

## HIPAA Compliance

### Scope
**Applies to**: GoHighLevel doctor accounts with patient data
**Risk Level**: Only when personal patient information (PHI) is input

### Protected Health Information (PHI)
**Never Include in Prompts/Memory:**
- Patient names or identifiable information
- Medical record numbers
- Specific case details with identifying info
- Any of the 18 HIPAA identifiers

### Safe Content
**Allowed in Second Brain:**
- Doctor positioning and brand
- Marketing content and strategy
- Anonymized patient experience patterns
- General medical information
- Treatment philosophies
- Educational content

### Compliance Checklist
- [ ] No PHI in prompts or memory files
- [ ] Patient examples fully anonymized
- [ ] GoHighLevel kept separate from Second Brain
- [ ] Content generation uses only public/marketing info
- [ ] Clear boundary between HIPAA-zone and marketing-zone

### If PHI Accidentally Included
1. **Stop**: Do not continue with that session
2. **Delete**: Remove from conversation history
3. **Clean**: Check memory files for PHI
4. **Document**: Note the breach for training
5. **Prevent**: Update guidelines to avoid recurrence

---

## Content Structure Standards

### Social Media Posts (200-250 words)

**Required Structure:**
1. **Hook** (3 specific symptoms/experiences)
   - Must be relatable to target patients
   - Concrete, not abstract
   - Example: "A heartbeat that pounds like a hammer, even while resting"

2. **Pattern Interruption**
   - "But here what people miss:"
   - "What doctors often overlook:"
   - "The real issue isn't what you think:"

3. **Root Cause Explanation**
   - Why the symptoms occur
   - Connects seemingly separate problems
   - Shows deeper understanding

4. **Memorable Analogy**
   - Makes complex concepts accessible
   - Example: "Like a toddler going down hill on a bike"
   - Must be original, not cliché

5. **Solution**
   - Specific treatment or approach
   - Doctor's unique methodology
   - Clear benefit

6. **Authority Statement**
   - Builds confidence
   - Shows expertise
   - Example: "Your nervous system isn't broken. It's stuck."

7. **Call-to-Action**
   - Specific next step
   - Not generic "call us"
   - Example: "For those navigating complex autonomic dysfunction..."

### Articles (1200-1500 words)

**Required Structure:**
1. Problem (patient perspective, emotional)
2. Why conventional approaches fail
3. Root cause analysis (medical explanation)
4. Doctor's unique solution
5. Evidence (case patterns, research)
6. Implementation (what patient does)
7. Clear call-to-action

---

## LLM Reasoning Display

### Shaun's Preference
> "I like to see the LLMs logic process"

**Implementation:**
- Show thinking/reasoning in content generation
- Explain why certain structures chosen
- Surface decision-making process
- Document what patterns were used

**Format:**
```
REASONING:
- Using Hook → Pattern Interrupt → Root Cause structure
- Target audience: Long COVID patients seeking answers
- Doctor's positioning: Autonomic dysfunction expert
- Analogy chosen: Bike metaphor (accessible, memorable)
- CTA: Evaluation offer (matches doctor's intake process)

CONTENT:
[generated post]
```

---

## Editing Guidelines

### What Shaun Should Edit (< 30 min)
- ✅ Fine-tuning specific word choices
- ✅ Adjusting tone slightly for audience
- ✅ Adding doctor-specific examples
- ✅ Updating for current events/timing
- ✅ Customizing CTA for specific offer

### What System Should Handle (No Editing)
- ❌ Brand voice (should be automatic)
- ❌ Structure (use proven patterns)
- ❌ Values/positioning (from memory)
- ❌ Grammar/spelling (should be correct)
- ❌ Hook quality (use successful templates)

### If Heavy Editing Required
**Diagnosis**: System memory incomplete or prompt insufficient
**Action**:
1. Run `/review` to identify specific issues
2. Update `memory/style-voice/[doctor].md`
3. Add missing values to `knowledge-repo/`
4. Document successful edits with `/learn`
5. Retest with next content piece

---

## Success Metrics (Quality Validation)

### Day-One Win
- [ ] First post generated with minimal editing (< 30 min)
- [ ] Matches doctor's brand voice
- [ ] Ready to publish without major changes

### After 1 Week (5 pieces)
- [ ] Average editing time < 30 minutes per piece
- [ ] 80%+ use proven structure patterns
- [ ] Zero brand voice corrections needed
- [ ] All content publication-ready

### After 30 Days
- [ ] 50%+ reduction in editing time vs baseline
- [ ] Content consistency across all doctor clients
- [ ] Partner interested in using same system
- [ ] No reputation issues from published content

### After 60 Days
- [ ] 70%+ reduction in editing time
- [ ] System learning from successful patterns
- [ ] Prompt library mature (10+ versioned prompts)
- [ ] Doctor clients noticing quality improvement

---

## Quality Failure Modes

### Mode 1: Generic AI Voice
**Symptom**: Content sounds like every other AI post
**Cause**: Brand voice not loaded or generic prompts
**Fix**: Update `memory/style-voice/`, add specific examples

### Mode 2: Missing Positioning
**Symptom**: Could be any doctor saying this
**Cause**: Unique positioning not in memory
**Fix**: Document what makes doctor unique in `knowledge-repo/`

### Mode 3: Weak Hooks
**Symptom**: Opening doesn't grab attention
**Cause**: Not using proven patterns
**Fix**: Add successful hooks to `memory/examples/`, use in prompts

### Mode 4: Vague CTAs
**Symptom**: Call-to-action unclear or generic
**Cause**: Not aligned with doctor's actual patient journey
**Fix**: Document intake process, use specific offers

### Mode 5: Heavy Structure Edits
**Symptom**: Rearranging whole sections
**Cause**: Wrong content pattern for piece type
**Fix**: Use content-type-specific prompts, document patterns

---

## Continuous Improvement

### After Each Successful Piece
1. Run `/learn` to extract patterns
2. Update `memory/examples/` with best work
3. Refine prompts based on what worked
4. Document any new insights

### Weekly Review
1. Calculate average editing time
2. Identify common issues requiring editing
3. Update memory/prompts to address patterns
4. Test improvements on next batch

### Monthly Audit
1. Compare metrics to baseline
2. Identify underperforming doctors (more editing needed)
3. Deep-dive on their brand voice/positioning
4. Update system for consistency across all clients

---

**Version**: 1.0.0
**Last Updated**: 2025-12-03
**Status**: Quality Standards Active
