# Pattern Confidence Tracker

> Track the strength and reliability of extracted patterns.

---

## Purpose

As you complete projects and run `/learn`, patterns emerge. This file tracks:
- **Pattern strength**: How many times validated
- **Confidence level**: LOW → MEDIUM → HIGH
- **Success rate**: % of times pattern worked
- **When to use**: Contexts where pattern excels

---

## Confidence Summary

| Level | Count | Percentage |
|-------|-------|------------|
| HIGH | 0 | 0% |
| MEDIUM | 1 | 100% |
| LOW | 0 | 0% |
| **Total** | **1** | **100%** |

```
HIGH   ░░░░░░░░░░ 0 patterns
MEDIUM ██████████ 1 pattern
LOW    ░░░░░░░░░░ 0 patterns
```

---

## Content Creation Patterns

### Pattern: Hook → Pattern Interrupt → Root Cause

**Category**: Content Structure
**Confidence**: MEDIUM (based on 1 example, needs validation)
**Uses**: 1 time (Long COVID post example)
**Success Rate**: 100% (needs more data)
**Last Used**: Example provided in questionnaire

**Description**:
Opening with 3 specific symptoms/experiences, then pattern interruption ("But here what people miss:"), then root cause explanation.

**When to Use**:
- Educational social posts
- Complex medical topics
- When reframing common misconceptions
- Patient-focused content

**Success Examples**:
- Long COVID autonomic dysfunction post (provided in questionnaire)

**Next Validation**:
- Test with 5 more posts
- Track editing time reduction
- Measure audience engagement

---

## Confidence Progression Rules

### How Patterns Level Up

```
First success (review 8+)     → Pattern created at LOW
Second success (similar use)  → Upgraded to MEDIUM
Third success (consistent)    → Upgraded to HIGH
Fourth+ successes             → HIGH (strengthens evidence)
```

### Upgrade Requirements

| From | To | Evidence Required |
|------|-----|-------------------|
| NEW | LOW | 1 successful use (review 8+) |
| LOW | MEDIUM | 2nd successful use in similar context |
| MEDIUM | HIGH | 3rd+ successful use with consistent results |

### Downgrade Triggers

Patterns can lose confidence if:
- Used but review score drops below 6
- Context changed and pattern no longer applies
- Contradictory evidence emerges

---

## Patterns Ready for Upgrade

*Patterns with enough evidence to increase confidence level:*

None ready - complete more `/learn` cycles.

### Template

When patterns are ready:

```markdown
- [ ] **[Pattern Name]**: LOW → MEDIUM
  - Evidence: 2 successful uses
  - Last used: [date]
  - Upgrade on next success

- [ ] **[Pattern Name]**: MEDIUM → HIGH
  - Evidence: 3 successful uses
  - Consistent across: [contexts]
  - One more success confirms
```

---

## Pattern Health Indicators

### Healthy Pattern

- Regular use (applied in `/plan`)
- Consistent success (review 8+)
- Progressing confidence
- Clear, specific definition

### Stale Pattern

- Not used in 30+ days
- Stuck at same confidence
- Context may have changed
- Consider archiving or updating

### Strong Pattern

- HIGH confidence
- Multiple evidence points
- Applied across contexts
- Core to your workflow

---

## Confidence History

### Recent Changes

| Date | Pattern | Change | Reason |
|------|---------|--------|--------|
| *No changes yet* | - | - | - |

### Template Entry

```markdown
| 2024-01-15 | Value-First Opening | LOW → MEDIUM | Second successful use in enterprise email |
| 2024-01-20 | ROI Quantification | NEW → LOW | First extracted from Acme project |
```

---

## Pattern Analytics

### Confidence Distribution Over Time

*Track how your pattern portfolio evolves:*

```
Week 1:  LOW ████████ MEDIUM ░░ HIGH ░░
Week 2:  LOW ██████ MEDIUM ████ HIGH ░░
Week 3:  LOW ████ MEDIUM ████ HIGH ████
Week 4:  LOW ██ MEDIUM ████ HIGH ██████
```

### Goal Distribution

A healthy brain aims for:
- **20%** LOW (new observations)
- **40%** MEDIUM (emerging patterns)
- **40%** HIGH (proven wisdom)

---

## Topic Coverage

Track pattern strength across different domains:

| Topic | Patterns | Avg Confidence | Health |
|-------|----------|----------------|--------|
| Messaging | 0 | - | ⚠️ Empty |
| Positioning | 0 | - | ⚠️ Empty |
| Objection Handling | 0 | - | ⚠️ Empty |
| Process | 0 | - | ⚠️ Empty |

### Health Indicators

- ✅ Good: 3+ patterns, some HIGH
- ⚠️ Empty: No patterns yet
- 🔄 Building: Has patterns, mostly LOW
- 💪 Strong: Multiple HIGH confidence

---

## Maintenance

### Weekly Review

1. Check patterns ready for upgrade
2. Identify stale patterns (unused 30+ days)
3. Review failed applications

### Monthly Audit

1. Archive outdated patterns
2. Consolidate similar patterns
3. Update evidence logs
4. Recalibrate confidence levels

### Quarterly Assessment

1. Full pattern relevance review
2. Topic gap analysis
3. Confidence distribution check
4. Cleanup low-value patterns

---

## Quick Actions

### See Pattern Details
```bash
/recall [pattern topic]
```

### Apply a Pattern
```bash
/plan [task] using pattern "[pattern name]"
```

### View Overall Health
```bash
/grow
```

---

**Last Updated**: [Auto-updated by /learn]
**Total Patterns**: 0
**Avg Confidence**: N/A
**Health Status**: EMPTY - Start learning!
