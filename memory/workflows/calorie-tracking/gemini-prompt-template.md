# Gemini Vision API - Calorie Analysis Prompt Template

> Standard prompt for consistent, accurate nutritional analysis

---

## Base Prompt Structure

```
You are a professional nutritionist analyzing food images for calorie and macronutrient estimation.

Analyze the provided food image and return a detailed nutritional breakdown.

**User Input:**
- Image: [food photo]
- Description: "{user_text_description}"
- Quantity: "{user_quantity_estimate}"

**Analysis Requirements:**

1. Identify the food item(s) in the image
2. Estimate portion size based on visual cues and user description
3. Calculate total calories
4. Break down macronutrients:
   - Protein (grams)
   - Fats (grams)
   - Carbohydrates (grams)
5. Provide confidence level for the estimate
6. Note any assumptions made

**Output Format:**

Return ONLY valid JSON in this exact structure:

{
  "food_name": "descriptive name of the dish",
  "portion_size": "estimated size with unit (e.g., '1 medium bowl (250g)')",
  "calories": 0,
  "macros": {
    "protein_g": 0,
    "fats_g": 0,
    "carbs_g": 0
  },
  "confidence": "high|medium|low",
  "assumptions": [
    "list any assumptions made about ingredients or portions"
  ],
  "notes": "any additional relevant details"
}

**Estimation Guidelines:**

- Use USDA food database standards when available
- Account for visible cooking methods (fried vs grilled affects calories)
- Consider portion size indicators (plate size, utensils, hand comparison)
- Flag if portion size is unclear (recommend user specify)
- Include sauces, dressings, and toppings in calculations
- Round calories to nearest 5, macros to nearest whole number

**Confidence Levels:**

- **High**: Clear food item, standard portion, common dish
- **Medium**: Some ambiguity in portion size or ingredients
- **Low**: Unclear image, unusual dish, or very small portion

**Important:**

- Be conservative with estimates when uncertain
- Don't hallucinate ingredients not visible in the image
- Ask for clarification if portion size is critical and unclear
```

---

## Example Inputs & Outputs

### Example 1: Simple Breakfast

**User Input:**
- Photo: Oatmeal in a bowl with sliced banana
- Description: "Oatmeal with banana and almonds"
- Quantity: "1 bowl"

**Gemini Output:**
```json
{
  "food_name": "Oatmeal with banana and almonds",
  "portion_size": "1 medium bowl (250g total)",
  "calories": 350,
  "macros": {
    "protein_g": 12,
    "fats_g": 8,
    "carbs_g": 58
  },
  "confidence": "high",
  "assumptions": [
    "Standard serving of rolled oats (~40g dry)",
    "1 medium banana (~100g)",
    "Handful of almonds (~15g)"
  ],
  "notes": "Portion size estimated based on standard cereal bowl. Macro distribution assumes minimal added sugar."
}
```

### Example 2: Restaurant Meal

**User Input:**
- Photo: Grilled chicken breast with rice and vegetables
- Description: "Grilled chicken with rice"
- Quantity: "Standard restaurant serving"

**Gemini Output:**
```json
{
  "food_name": "Grilled chicken breast with white rice and steamed vegetables",
  "portion_size": "1 chicken breast (~150g), 1 cup rice (200g), 1 cup vegetables (100g)",
  "calories": 520,
  "macros": {
    "protein_g": 45,
    "fats_g": 8,
    "carbs_g": 62
  },
  "confidence": "high",
  "assumptions": [
    "Chicken breast is grilled without added oil",
    "White rice, not fried rice",
    "Vegetables appear to be steamed with minimal oil",
    "No visible sauce or seasoning beyond light salt/pepper"
  ],
  "notes": "Restaurant portions can vary. This estimate assumes standard chain restaurant serving sizes."
}
```

### Example 3: Low Confidence Case

**User Input:**
- Photo: Casserole dish (unclear ingredients)
- Description: "Dinner casserole"
- Quantity: "1 serving"

**Gemini Output:**
```json
{
  "food_name": "Mixed casserole (composition unclear)",
  "portion_size": "~1 cup (240g estimated)",
  "calories": 400,
  "macros": {
    "protein_g": 20,
    "fats_g": 18,
    "carbs_g": 35
  },
  "confidence": "low",
  "assumptions": [
    "Appears to contain ground meat, pasta, and cheese",
    "Assumed standard casserole macro ratios",
    "Could not identify all ingredients from image"
  ],
  "notes": "Recommend specifying main ingredients for accurate estimate. Current estimate assumes typical pasta casserole with ground beef and cheese."
}
```

---

## Customization Options

### For Specific Diets

Add to base prompt:

```
**Dietary Context:**
User follows: [keto/vegan/high-protein/etc.]
Pay special attention to: [carbs/plant-based proteins/etc.]
```

### For Meal Tracking Goals

Add to base prompt:

```
**User Goals:**
Daily calorie target: [calories]
Macro targets: [protein]g protein, [fats]g fats, [carbs]g carbs
Highlight: Whether this meal fits user's macro distribution
```

### For Enhanced Accuracy

Add to base prompt:

```
**Additional Context:**
Time of day: [breakfast/lunch/dinner]
Location: [home-cooked/restaurant/fast-food]
Previous meals today: [brief summary]

Adjust portion size estimates accordingly.
```

---

## Error Handling

### Invalid Image

If image is not food or unclear:

```json
{
  "food_name": "Unable to identify food",
  "portion_size": "N/A",
  "calories": 0,
  "macros": {
    "protein_g": 0,
    "fats_g": 0,
    "carbs_g": 0
  },
  "confidence": "low",
  "assumptions": [],
  "notes": "Image does not clearly show food item. Please upload a clearer photo or provide more detailed description."
}
```

### Multiple Dishes

If image contains multiple separate dishes:

```json
{
  "food_name": "Multiple items detected",
  "portion_size": "See breakdown below",
  "calories": 850,
  "macros": {
    "protein_g": 45,
    "fats_g": 30,
    "carbs_g": 80
  },
  "confidence": "medium",
  "assumptions": [],
  "notes": "Image contains multiple dishes. Breakdown: 1) Salad (~200 cal), 2) Grilled fish (~300 cal), 3) Rice (~350 cal). Recommend logging separately for better tracking."
}
```

---

## Integration with Second Brain

### Pattern Learning

After 20-30 meals analyzed, your brain learns:

- Your typical portion sizes (your "1 bowl" vs standard)
- Your common foods (with accurate macro profiles)
- Your meal timing patterns
- Restaurant portion tendencies

### Confidence Calibration

Over time, compare Gemini estimates to:
- Nutrition labels (when available)
- Your body's response (weight trends)
- Professional nutritionist feedback

Adjust prompt to:
- Increase/decrease portion size multipliers
- Refine macro ratio assumptions
- Add user-specific food preferences

---

## API Call Example

```python
import google.generativeai as genai
import json
from PIL import Image

# Configure API
genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel('gemini-2.0-flash-exp')

# Load image
image = Image.open('meal-photo.jpg')

# User inputs
user_description = "Grilled chicken with rice"
user_quantity = "Standard portion"

# Construct prompt
prompt = f"""
[Base prompt template here]

**User Input:**
- Description: "{user_description}"
- Quantity: "{user_quantity}"

[Rest of template]
"""

# API call
response = model.generate_content([prompt, image])

# Parse JSON response
nutrition_data = json.loads(response.text)

print(f"Calories: {nutrition_data['calories']}")
print(f"Protein: {nutrition_data['macros']['protein_g']}g")
```

---

## Quality Assurance

### Validation Rules

Before saving meal log:

1. **Calorie range check**: 50-2000 calories per meal
2. **Macro sum check**: Protein×4 + Carbs×4 + Fats×9 ≈ Total Calories (±10%)
3. **Confidence threshold**: Flag if <70% for manual review
4. **Duplicate detection**: Same timestamp + similar description

### Human Review Triggers

Automatically flag for review if:
- Confidence = "low"
- Calories > 1500 for single meal
- Macro percentages unusual (e.g., >60% from one macro)
- First time logging this food type

---

## Version History

- **v1.0.0** (2025-11-29): Initial template based on CalCam case study
- Future: Calibrate based on user's actual tracking data

---

**Next Steps:**
1. Test with 5-10 different meal types
2. Compare estimates to nutrition labels
3. Adjust confidence thresholds
4. Build personal food database

**Related Files:**
- Workflow: `README.md`
- Summary Template: `daily-summary-template.md`
