# Calorie Tracking Workflow

> WhatsApp-based automated nutrition logging with Gemini AI vision analysis

---

## Overview

**Purpose**: Track daily calorie intake and macronutrients through WhatsApp photo messages

**Input**: WhatsApp message with food photo + text description
**Processing**: Gemini AI vision analysis
**Output**: Calorie count, macro breakdown, daily summaries

**Time Savings**: 15-20 min/day vs manual tracking
**Accuracy**: ~90% within 10% of nutrition labels (based on CalCam case study)

---

## How It Works

### Daily Flow

1. **Throughout the day**: Send WhatsApp messages with food photos
2. **Instant analysis**: Gemini API analyzes image and returns calories + macros
3. **Data storage**: Meal logged to daily JSON file
4. **Running total**: Get current day's calorie count
5. **End of day**: Send "day completed" to receive daily summary

### Data Flow

```
WhatsApp Photo → WhatsApp MCP → Claude Code → Gemini API → JSON Storage → WhatsApp Response
```

---

## Files & Folders

### Storage Structure

```
experiences/nutrition/
├── 2025/11/
│   ├── 2025-11-29.json              # Daily meal log (structured data)
│   ├── 2025-11-29-summary.md        # Human-readable summary
│   └── 2025-11-29-raw/              # Raw data (photos, API responses)
│       ├── meal-001.jpg
│       ├── meal-001.json
│       ├── meal-002.jpg
│       └── meal-002.json
└── analytics/
    ├── weekly-trends.json
    └── monthly-averages.json
```

### Workflow Documentation

```
memory/workflows/calorie-tracking/
├── README.md                     # This file
├── gemini-prompt-template.md    # Reusable Gemini prompt
└── daily-summary-template.md    # Summary format template
```

---

## Commands

### Phase 1: Manual Triggers

```bash
# Analyze latest WhatsApp meal
/ask "Analyze latest WhatsApp meal and log it"

# Generate daily summary
/ask "Generate daily nutrition summary"

# View today's data
cat experiences/nutrition/2025/11/$(date +%Y-%m-%d).json
```

### Phase 2: Keyword Triggers

```
# In WhatsApp, send:
[Photo] "log meal - grilled chicken with rice"

# System auto-responds with calories
```

### Phase 3: Full Automation

```
# In WhatsApp, send any food photo
# System auto-detects, analyzes, responds
```

---

## Gemini Prompt Template

See: `gemini-prompt-template.md`

Standard prompt structure for consistent results:
- Food identification
- Portion size estimation
- Calorie calculation
- Macro breakdown (protein, fats, carbs)
- Confidence level

---

## Daily Summary Template

See: `daily-summary-template.md`

Generated each evening with:
- Total calories
- Macro percentages
- Meal-by-meal breakdown
- Insights (vs goals, vs averages)

---

## Quality Standards

### Accuracy Targets

- Calorie estimates: Within 10% of nutrition labels
- Macro ratios: Within 5% of actual
- Confidence scoring: Flag estimates below 70%

### Data Validation

- Photo quality check: Blur detection
- Portion size clarification: Request if uncertain
- Duplicate detection: Prevent double-logging

### Pattern Learning

After 2-4 weeks:
- Build personal food database
- Refine portion size estimates
- Learn your eating patterns

---

## Integration with Second Brain

### /plan → /work → /review → /learn Cycle

1. **Setup**: `/plan "Set up calorie tracking"`
2. **Daily Use**: Automatic (no explicit /work needed)
3. **Weekly Review**: `/review experiences/nutrition/2025/11/2025-11-29-summary.md`
4. **Pattern Extraction**: `/learn` after 2 weeks

### Memory Integration

- **Patterns**: `memory/patterns/nutrition-patterns.md`
  - Your regular foods with accurate macros
  - Meal timing patterns
  - Calorie trends

- **Examples**: `memory/examples/calorie-logs/`
  - Best accuracy examples
  - Representative meals
  - Edge cases handled well

- **Recall**: `/recall "chicken breast calories"`
  - Searches YOUR historical data
  - More accurate than generic databases

---

## Troubleshooting

### Inaccurate Estimates

**Issue**: Gemini over/under-estimates calories

**Solutions**:
1. Include portion size in text description
2. Compare to nutrition label when available
3. Build personal food database over time
4. Check confidence score (ignore if <70%)

### Missing Meals

**Issue**: Meal not logged in daily file

**Solutions**:
1. Check WhatsApp MCP connection
2. Verify Gemini API key is valid
3. Review error logs
4. Retry analysis manually

### Daily Summary Not Generated

**Issue**: End-of-day trigger not working

**Solutions**:
1. Use exact keyword: "day completed"
2. Manually run: `/ask "Generate daily summary"`
3. Check daily JSON file exists
4. Verify all meals have macro data

---

## Success Metrics

### Week 1
- 15+ meals logged (3/day × 5 days)
- 90%+ Gemini API success rate
- <3 second average response time

### Month 1
- 90+ meals logged (3/day × 30 days)
- 3+ HIGH confidence nutrition patterns
- 15+ min/day time savings

### Month 3
- 270+ meals logged
- Personal food database (50+ items)
- Calorie accuracy within 10% of labels

---

## Resources

### Documentation
- Full Architecture: `../../CALORIE_TRACKING_ARCHITECTURE.md`
- Quick Start: `../../CALORIE_TRACKING_QUICKSTART.md`

### External Links
- WhatsApp MCP: https://github.com/lharries/whatsapp-mcp
- Gemini API: https://aistudio.google.com/
- CalCam Case Study: https://developers.googleblog.com/en/calcam-transforming-food-tracking-with-the-gemini-api/

---

**Version**: 1.0.0
**Last Updated**: 2025-11-29
**Status**: Phase 1 - Manual Workflow
