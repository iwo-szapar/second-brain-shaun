# Content Creation - Quality Checklist

> Pre-flight, in-flight, and post-flight checks for doctor marketing content.

---

## Before Starting

### Context Loaded
- [ ] Doctor's brand voice file exists (`memory/style-voice/doctor-[name].md`)
- [ ] Values/beliefs documented (`knowledge-repo/values-beliefs/doctor-[name].md`)
- [ ] Positioning clear (`knowledge-repo/positioning/doctor-[name].md`)
- [ ] Target audience (ICP) identified
- [ ] Content type/platform confirmed

### Requirements Clear
- [ ] Topic/subject defined
- [ ] Key message/takeaway identified
- [ ] Desired action (CTA) known
- [ ] Word count/length target set
- [ ] Deadline/urgency understood

---

## During Generation

### Memory Integration
- [ ] Brand voice referenced in prompt
- [ ] Values/frameworks mentioned
- [ ] Positioning emphasized
- [ ] Successful patterns applied
- [ ] Examples used as templates

### Content Structure
- [ ] Hook: Relatable, specific (3 symptoms/experiences)
- [ ] Pattern interrupt: Clear transition
- [ ] Explanation: Root cause analysis
- [ ] Analogy: Memorable, accessible
- [ ] Solution: Doctor's unique approach
- [ ] Authority: Confident statement
- [ ] CTA: Specific, actionable

### Quality Elements
- [ ] LLM reasoning shown (Shaun's preference)
- [ ] Evidence-based claims only
- [ ] Doctor's unique positioning highlighted
- [ ] Patient-focused language
- [ ] Professional but accessible tone

---

## After Generation (Review)

### Run `/review` and Check:
- [ ] No major brand voice issues flagged
- [ ] No untrue/unsupported claims identified
- [ ] Structure follows proven patterns
- [ ] Grammar/spelling correct
- [ ] Length appropriate for platform

### HIPAA Compliance
- [ ] No patient names or identifiable information
- [ ] No specific case details (use anonymized patterns only)
- [ ] No protected health information (PHI)
- [ ] Examples sufficiently general
- [ ] Safe to publish without HIPAA risk

### Reputation Protection
- [ ] No untrue claims about treatments
- [ ] Evidence supports any statistics/facts
- [ ] Professional tone maintained
- [ ] No criticism of other doctors/approaches
- [ ] Reflects well on doctor's expertise

---

## Before Publishing

### Final Edit (< 30 minutes)
- [ ] Fine-tune specific word choices
- [ ] Adjust for timing/current events
- [ ] Customize examples for this doctor
- [ ] Verify medical accuracy
- [ ] Polish final details

### Publication Ready
- [ ] Editing time was < 30 minutes (SUCCESS!)
- [ ] Content matches doctor's brand
- [ ] Ready to publish without major changes
- [ ] Call-to-action clear and specific
- [ ] Proud to put doctor's name on it

### Doctor Approval (If Needed)
- [ ] New treatment/claim → Get doctor sign-off
- [ ] Controversial topic → Verify comfort level
- [ ] New positioning angle → Confirm alignment
- [ ] High-stakes campaign → Full review

---

## After Publishing

### Capture Learning
- [ ] Run `/learn` to extract patterns
- [ ] Note what made editing minimal
- [ ] Document what still needed work
- [ ] Update prompts based on insights
- [ ] Add to examples if high-performing

### Track Metrics
- [ ] Editing time recorded
- [ ] Quality score (how close to publish-ready)
- [ ] Engagement (if trackable)
- [ ] Doctor satisfaction
- [ ] Audience response

---

## Emergency Checklist (Content Failed Review)

### If Major Issues Found:
1. **Stop**: Don't try to edit into shape
2. **Diagnose**: Why did it fail?
   - Missing brand voice?
   - Wrong structure pattern?
   - Generic positioning?
   - Weak hook?
3. **Fix Root Cause**: Update memory, not just output
4. **Regenerate**: Use improved context
5. **Document**: Add to troubleshooting for future

### Common Failure Modes:
- **Generic AI voice** → Update `style-voice/` with more examples
- **Missing positioning** → Add unique angles to `positioning/`
- **Weak hooks** → Study `examples/` and document patterns
- **Vague CTA** → Map doctor's patient journey, use specific offers
- **Wrong tone** → Add "sounds like / doesn't sound like" examples

---

**Version**: 1.0.0
**Last Updated**: 2025-12-03
**Status**: Primary Workflow Checklist
