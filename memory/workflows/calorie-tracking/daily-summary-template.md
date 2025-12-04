# Daily Nutrition Summary - Template

> Auto-generated end-of-day report sent via WhatsApp

---

## Summary Structure

### Quick Stats (WhatsApp Format)

```
📊 NUTRITION SUMMARY - {Date}

✅ Day Completed
🍽️ Meals Logged: {count}
🔥 Total Calories: {total_calories}

📈 MACROS:
• Protein: {protein_g}g ({protein_pct}%)
• Fats: {fats_g}g ({fats_pct}%)
• Carbs: {carbs_g}g ({carbs_pct}%)

🎯 GOALS:
• Calories: {actual} / {target} ({diff}%)
• Protein: {actual}g / {target}g
• On track: {yes/no}

💡 INSIGHT: {daily_insight}

View full report: [link to markdown file]
```

### Markdown File Format

Saved to: `experiences/nutrition/YYYY/MM/YYYY-MM-DD-summary.md`

```markdown
# Nutrition Log - {Full Date}

**Status**: Day Completed
**Meals Logged**: {count}
**Total Calories**: {total}
**Date**: {YYYY-MM-DD}

---

## Daily Totals

| Metric | Amount | % of Calories | Daily Goal | Progress |
|--------|--------|---------------|------------|----------|
| **Calories** | {total} | 100% | {goal} | {percentage}% |
| **Protein** | {g} | {pct}% | {goal}g | {progress_bar} |
| **Fats** | {g} | {pct}% | {goal}g | {progress_bar} |
| **Carbs** | {g} | {pct}% | {goal}g | {progress_bar} |

---

## Macronutrient Distribution

```
Protein:  ███████████░░░░░░░░░ 27% ({g}g)
Fats:     ████████████░░░░░░░░ 30% ({g}g)
Carbs:    ████████████████░░░░ 43% ({g}g)
```

**Calorie Breakdown:**
- Protein: {g}g × 4 = {cal} calories
- Fats: {g}g × 9 = {cal} calories
- Carbs: {g}g × 4 = {cal} calories

---

## Meal Timeline

### Meal 1 - {time}
- **Food**: {name}
- **Portion**: {size}
- **Calories**: {cal}
- **Macros**: {protein}g protein, {fats}g fats, {carbs}g carbs
- **Confidence**: {high/medium/low}
- **Photo**: [meal-001.jpg](YYYY-MM-DD-raw/meal-001.jpg)

---

### Meal 2 - {time}
[... same structure ...]

---

### Meal 3 - {time}
[... same structure ...]

---

## Daily Insights

### Compared to Goals
- **Calories**: {over/under} by {amount} ({percentage}%)
- **Protein**: {met/not met} - {actual}g of {goal}g target
- **Carbs**: {within range/high/low} - {actual}g vs typical {average}g

### Compared to 7-Day Average
- **Calories**: {higher/lower} by {amount} ({percentage}%)
- **Protein**: {higher/lower} by {amount}g
- **Meal count**: {more/fewer} meals than usual

### Patterns Observed
- Most calories: {meal_name} ({calories} cal)
- Highest protein meal: {meal_name} ({protein}g)
- Meal timing: {observation about spacing}
- Food types: {categories eaten today}

---

## Recommendations

Based on today's intake and your goals:

1. **Protein**: {on track / consider adding protein source to breakfast}
2. **Timing**: {well-distributed / consider earlier dinner}
3. **Balance**: {good macro distribution / carbs slightly high}

**Tomorrow's Focus**: {specific actionable suggestion}

---

## Weekly Progress

**Days Logged This Week**: {count} / 7
**Weekly Average Calories**: {average}
**Most Consistent Macro**: {protein/fats/carbs}

**Streak**: {consecutive_days} days 🔥

---

## Data Quality

| Metric | Value |
|--------|-------|
| High Confidence Meals | {count} / {total} ({pct}%) |
| Photos Analyzed | {count} |
| Manual Overrides | {count} |
| Flagged for Review | {count} |

---

## Raw Data

- **JSON Log**: [2025-11-29.json](2025-11-29.json)
- **Photos**: [2025-11-29-raw/](2025-11-29-raw/)
- **API Responses**: Embedded in JSON

---

**Generated**: {timestamp}
**System**: Second Brain Calorie Tracking v1.0
```

---

## Example Complete Summary

```markdown
# Nutrition Log - November 29, 2025

**Status**: Day Completed
**Meals Logged**: 4
**Total Calories**: 2,150
**Date**: 2025-11-29

---

## Daily Totals

| Metric | Amount | % of Calories | Daily Goal | Progress |
|--------|--------|---------------|------------|----------|
| **Calories** | 2,150 | 100% | 2,200 | 98% ✅ |
| **Protein** | 145g | 27% | 120g | ████████████░ 121% ✅ |
| **Fats** | 72g | 30% | 65g | ████████████░ 111% ✅ |
| **Carbs** | 230g | 43% | 250g | ██████████░░░ 92% ⚠️ |

---

## Macronutrient Distribution

```
Protein:  ███████████░░░░░░░░░ 27% (145g)
Fats:     ████████████░░░░░░░░ 30% (72g)
Carbs:    ████████████████░░░░ 43% (230g)
```

**Calorie Breakdown:**
- Protein: 145g × 4 = 580 calories
- Fats: 72g × 9 = 648 calories
- Carbs: 230g × 4 = 920 calories

---

## Meal Timeline

### Meal 1 - 08:30 AM
- **Food**: Oatmeal with banana and almonds
- **Portion**: 1 medium bowl (250g)
- **Calories**: 350
- **Macros**: 12g protein, 8g fats, 58g carbs
- **Confidence**: High
- **Photo**: [meal-001.jpg](2025-11-29-raw/meal-001.jpg)

---

### Meal 2 - 12:45 PM
- **Food**: Grilled chicken salad with olive oil dressing
- **Portion**: Large salad (~400g)
- **Calories**: 480
- **Macros**: 45g protein, 22g fats, 28g carbs
- **Confidence**: High
- **Photo**: [meal-002.jpg](2025-11-29-raw/meal-002.jpg)

---

### Meal 3 - 15:30 PM (Snack)
- **Food**: Greek yogurt with blueberries
- **Portion**: 1 cup yogurt + 1/2 cup berries
- **Calories**: 220
- **Macros**: 18g protein, 6g fats, 24g carbs
- **Confidence**: High
- **Photo**: [meal-003.jpg](2025-11-29-raw/meal-003.jpg)

---

### Meal 4 - 19:15 PM
- **Food**: Grilled salmon with quinoa and roasted vegetables
- **Portion**: 6oz salmon, 1 cup quinoa, 1.5 cups vegetables
- **Calories**: 1,100
- **Macros**: 70g protein, 36g fats, 120g carbs
- **Confidence**: High
- **Photo**: [meal-004.jpg](2025-11-29-raw/meal-004.jpg)

---

## Daily Insights

### Compared to Goals
- **Calories**: Under by 50 (2%) - Excellent target adherence ✅
- **Protein**: Exceeded by 25g - Great for muscle maintenance ✅
- **Carbs**: Under by 20g - Slightly below target but within healthy range ⚠️

### Compared to 7-Day Average
- **Calories**: Lower by 150 (6%) - Lighter day than usual
- **Protein**: Higher by 20g - Significantly better protein intake today
- **Meal count**: 4 meals (typical: 3-4)

### Patterns Observed
- Most calories: Dinner (1,100 cal) - 51% of daily intake
- Highest protein meal: Lunch (45g) + Dinner (70g)
- Meal timing: Well-distributed throughout the day (4-7 hour gaps)
- Food types: High lean protein, healthy fats, whole grains, vegetables

---

## Recommendations

Based on today's intake and your goals:

1. **Protein**: Excellent intake (145g) - Continue prioritizing lean proteins ✅
2. **Timing**: Good distribution - Snack between lunch and dinner helps energy
3. **Balance**: Slightly carb-light - Consider adding 1 serving whole grains tomorrow

**Tomorrow's Focus**: Maintain current protein level, add 1-2 servings of complex carbs (sweet potato, brown rice, or whole grain bread) to hit carb target.

---

## Weekly Progress

**Days Logged This Week**: 5 / 7
**Weekly Average Calories**: 2,180
**Most Consistent Macro**: Protein (140-150g daily)

**Streak**: 5 days 🔥

---

## Data Quality

| Metric | Value |
|--------|-------|
| High Confidence Meals | 4 / 4 (100%) |
| Photos Analyzed | 4 |
| Manual Overrides | 0 |
| Flagged for Review | 0 |

---

## Raw Data

- **JSON Log**: [2025-11-29.json](2025-11-29.json)
- **Photos**: [2025-11-29-raw/](2025-11-29-raw/)
- **API Responses**: Embedded in JSON

---

**Generated**: 2025-11-29 21:30:00
**System**: Second Brain Calorie Tracking v1.0
```

---

## WhatsApp Message (Short Version)

```
📊 NUTRITION SUMMARY - Nov 29, 2025

✅ Day Completed
🍽️ Meals Logged: 4
🔥 Total Calories: 2,150

📈 MACROS:
• Protein: 145g (27%) ✅
• Fats: 72g (30%) ✅
• Carbs: 230g (43%) ⚠️

🎯 GOALS:
• Calories: 2,150 / 2,200 (98%) ✅
• Protein: 145g / 120g ✅
• On track: YES

💡 INSIGHT: Excellent protein intake today! Slightly carb-light. Consider adding 1-2 servings of complex carbs tomorrow.

📈 Streak: 5 days 🔥

View full report: /experiences/nutrition/2025/11/2025-11-29-summary.md
```

---

## Customization Options

### For Different Goals

**Weight Loss Focus:**
```
🎯 DEFICIT: -350 cal from TDEE ✅
📉 Weekly Trend: -0.5 lbs
💪 Protein: On track to preserve muscle
```

**Muscle Gain Focus:**
```
🎯 SURPLUS: +200 cal above TDEE ✅
📈 Weekly Trend: +0.3 lbs
💪 Protein: 1g per lb bodyweight ✅
```

**Maintenance Focus:**
```
🎯 MAINTENANCE: ±50 cal from TDEE ✅
⚖️ Stable week: ±0.2 lbs
🔄 Macro balance: Optimal
```

### For Specific Diets

**Keto:**
```
🥑 KETO METRICS:
• Net Carbs: 25g (target: <30g) ✅
• Fat: 70% of calories ✅
• Ketosis: Likely maintained
```

**High Protein:**
```
💪 PROTEIN FOCUS:
• Total: 180g (1.5g per lb) ✅
• Per meal: 40-50g ✅
• Timing: Evenly distributed
```

---

## Automation Triggers

### Generate Summary When:

1. **Manual Trigger**: User sends "day completed"
2. **Time-Based**: Auto-generate at 9:00 PM daily
3. **Meal Count**: After 3+ meals logged
4. **Explicit Request**: "/daily-summary" command

### Send to WhatsApp When:

- Summary generated (always)
- User online (if real-time detection available)
- Preference: Immediate vs batched daily delivery

---

## Integration with /review

Weekly quality check:

```
/review experiences/nutrition/2025/11/2025-11-29-summary.md
```

6 agents review:
- Calorie estimate accuracy
- Macro balance vs health guidelines
- Pattern consistency
- Data quality and completeness

---

## Version History

- **v1.0.0** (2025-11-29): Initial template
- Future: Add meal photos inline, nutrition score, AI coaching tips

---

**Related Files:**
- Workflow: `README.md`
- Gemini Prompt: `gemini-prompt-template.md`
- Architecture: `../../CALORIE_TRACKING_ARCHITECTURE.md`
