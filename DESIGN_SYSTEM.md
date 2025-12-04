# Design System Documentation
*Refined Brutalism - Complete Reference Guide*

## 🎨 DESIGN PHILOSOPHY

**Name:** Refined Brutalism
**Description:** Apple's precision meets brutalist boldness
**Core Principles:**
- Sharp edges (zero border-radius)
- Bold black/white contrast
- 4px structural borders
- DM Sans + Space Mono typography
- Minimal, purposeful design

---

## 📐 LAYOUT & SPACING

### Section Padding (Standardized)
```css
/* Standard sections */
py-24 md:py-32

/* Major sections (hero, pricing) */
py-32 md:py-40

/* Compact sections (CTAs, quotes) */
py-16 md:py-20

/* Extra compact (credibility, visual breaks) */
py-20 md:py-24
```

### Container Widths
```css
/* Text-focused content */
max-w-4xl

/* Standard content sections */
max-w-5xl or max-w-6xl

/* Full-width features/grids */
max-w-7xl
```

### Grid Gaps
```css
/* Tight spacing */
gap-8

/* Standard spacing */
gap-10 or gap-12

/* Wide spacing (features) */
gap-16
```

### Internal Spacing
```css
/* Section headers */
mb-12 md:mb-16 (standard)
mb-16 md:mb-20 (major sections)

/* Between elements */
space-y-4 (tight)
space-y-6 (standard)
space-y-8 (loose)

/* Card padding */
p-8 md:p-10 (standard)
p-10 md:p-12 (pricing cards)
p-5 md:p-6 (compact boxes)
```

---

## 🎯 TYPOGRAPHY

### Fonts
```css
/* Body text */
font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;

/* Headings */
font-family: 'DM Sans' (same as body, but bold)

/* Code, monospace, badges */
font-family: 'Space Mono', 'SF Mono', Monaco, monospace;
```

### Font Sizes (Standardized)

**Page Titles (H1):**
```css
/* Hero pages */
text-5xl md:text-7xl lg:text-8xl

/* Interior pages */
text-6xl md:text-8xl
```

**Section Headings (H2):**
```css
/* Major sections */
text-4xl md:text-6xl

/* Standard sections */
text-3xl md:text-5xl

/* Compact sections */
text-3xl md:text-4xl
```

**Subsections (H3):**
```css
/* Large */
text-2xl md:text-3xl

/* Standard */
text-xl md:text-2xl

/* Compact */
text-lg md:text-xl
```

**Body Text:**
```css
/* Large (intro paragraphs) */
text-xl md:text-2xl

/* Standard */
text-lg md:text-xl

/* Compact */
text-base md:text-lg

/* Small (captions) */
text-sm md:text-base

/* Tiny (labels) */
text-xs md:text-sm
```

**Mono/Badges:**
```css
/* Standard badges */
text-sm font-mono uppercase tracking-wider

/* Compact badges */
text-xs font-mono uppercase tracking-wider
```

### Font Weights
```css
/* Headings */
font-bold

/* Emphasis */
font-semibold or font-medium

/* Body */
font-normal (default)

/* Deemphasis */
font-light
```

### Line Heights
```css
/* Tight (hero headlines) */
leading-[0.95] or leading-[1.05]

/* Normal headings */
leading-tight

/* Body text */
leading-relaxed
```

### Letter Spacing
```css
/* Headlines */
tracking-tighter

/* Standard */
tracking-tight

/* Badges/labels */
tracking-wider or tracking-wide
```

---

## 🎨 COLORS

### Core Colors (Pure Black/White)
```css
--background: 0 0% 100%  /* Pure white */
--foreground: 0 0% 0%    /* Pure black */
--muted: 0 0% 96%        /* Very light gray for backgrounds */
--muted-foreground: 0 0% 35%  /* Dark gray for secondary text */
```

### Usage Patterns
```css
/* Primary text */
text-foreground

/* Secondary text */
text-muted-foreground

/* Backgrounds */
bg-background
bg-muted (for cards/sections)
bg-muted/30 (for subtle backgrounds)

/* Inverted sections */
bg-foreground (black background)
text-background (white text on black)
```

---

## 🔲 BORDERS

### Border Widths (Standardized)
```css
/* Structural borders (sections, major cards) */
border-4 border-foreground

/* Standard elements (buttons, inputs, small cards) */
border-2 border-foreground

/* Decorative/subtle */
border border-foreground
```

### Border Radius
```css
/* ALL ELEMENTS */
border-radius: 0 (no rounded corners anywhere)

/* Set globally */
--radius: 0rem
```

### Border Colors
```css
/* Always use foreground for brutalist effect */
border-foreground (black)
border-background (white, for inverted sections)
```

---

## 🎭 SHADOWS & EFFECTS

### Brutalist Shadows
```css
/* Large brutalist shadow */
--shadow-brutal: 8px 8px 0px hsl(0 0% 0%)

/* Small brutalist shadow */
--shadow-brutal-sm: 4px 4px 0px hsl(0 0% 0%)

/* Usage in hover states */
.hover-brutal:hover {
  transform: translate(-4px, -4px);
  box-shadow: var(--shadow-brutal);
}
```

### Transitions
```css
/* Smooth transitions (default) */
transition: var(--transition-smooth)  /* 0.4s cubic-bezier */

/* Fast transitions (hover states) */
transition: var(--transition-fast)   /* 0.2s cubic-bezier */

/* Bouncy transitions (special effects) */
transition: var(--transition-bounce)  /* 0.6s cubic-bezier */
```

---

## 🧩 COMPONENTS

### Button Variants (src/components/ui/button.tsx)
```tsx
/* Primary (black) */
variant="default"
bg-primary text-primary-foreground border-2 border-primary

/* Outline (white with black border) */
variant="outline"
border-2 border-foreground bg-background text-foreground
hover:bg-foreground hover:text-background

/* Ghost (minimal) */
variant="ghost"
hover:bg-muted hover:text-foreground

/* Secondary */
variant="secondary"
bg-secondary text-secondary-foreground border-2 border-secondary
```

### Card Component (src/components/ui/card.tsx)
```tsx
/* Base card */
border-4 border-foreground bg-card

/* Card title */
text-2xl font-bold

/* Card description */
text-sm text-muted-foreground
```

### Input Component (src/components/ui/input.tsx)
```tsx
/* Standard input */
border-2 border-foreground
focus:ring-4 focus:ring-ring
```

### Navigation (src/components/Navigation.tsx)
```tsx
/* Nav container */
border-b-4 border-foreground
bg-background

/* Logo */
text-xl font-bold font-mono uppercase tracking-wider

/* Links */
text-base font-mono uppercase tracking-wide
hover:underline hover:underline-offset-4

/* Contact button */
bg-foreground text-background border-2 border-foreground
```

---

## 📄 PAGE PATTERNS

### Hero Sections
```tsx
<section className="relative overflow-hidden bg-background">
  {/* Grid background */}
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:64px_64px]" />

  <div className="container relative mx-auto px-6 py-24 md:py-40">
    <div className="max-w-6xl mx-auto text-center">
      {/* Badge */}
      <div className="inline-block px-4 py-2 border-2 border-foreground bg-background text-foreground text-sm font-mono uppercase tracking-wider mb-10">
        STAT • SOCIAL PROOF • VALUE
      </div>

      {/* H1 */}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground mb-16 leading-[1.05]">
        Headline<br />Goes Here
      </h1>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <Button>Primary CTA</Button>
        <Button variant="outline">Secondary CTA</Button>
      </div>
    </div>
  </div>
</section>
```

### Section Headers (Standardized)
```tsx
<div className="text-center mb-16 md:mb-20">
  {/* Optional badge */}
  <div className="inline-block px-3 py-1 border-2 border-foreground text-xs font-mono uppercase mb-6">
    SECTION LABEL
  </div>

  {/* Heading */}
  <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8 tracking-tighter">
    Section<br />Heading
  </h2>

  {/* Optional subhead */}
  <p className="text-xl md:text-2xl text-muted-foreground font-medium">
    Section description or value proposition
  </p>
</div>
```

### Inverted Sections (Black Background)
```tsx
<section className="py-24 md:py-32 bg-foreground border-y-4 border-foreground">
  <div className="container mx-auto px-6">
    {/* All text uses text-background (white) */}
    <h2 className="text-background">Heading</h2>
    <p className="text-background/90">Body text</p>

    {/* Borders use border-background (white) */}
    <div className="border-4 border-background">
      Content
    </div>
  </div>
</section>
```

### Grid Layouts (Standardized)
```tsx
/* 2-column (features, before/after) */
<div className="grid lg:grid-cols-2 gap-10 items-center">

/* 3-column (services, testimonials) */
<div className="grid md:grid-cols-3 gap-1 border-4 border-foreground">
  {/* With 1px gap for brutalist cell effect */}
</div>

/* 4-column (drawers, role cards) */
<div className="grid md:grid-cols-4 gap-1 border-4 border-foreground">
</div>
```

---

## 🖼️ IMAGE PATTERNS

### Profile Images with Decorative Element
```tsx
<div className="relative">
  <div className="border-4 border-foreground overflow-hidden bg-muted">
    <img
      src={image}
      className="w-full h-auto grayscale hover:grayscale-0 transition-smooth"
    />
  </div>
  <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-foreground bg-background -z-10" />
</div>
```

### Screenshot with Caption
```tsx
<div className="border-4 border-foreground overflow-hidden bg-background">
  <img src={screenshot} className="w-full" />
  <div className="p-4 border-t-4 border-foreground">
    <p className="text-sm font-bold text-foreground">Title</p>
    <p className="text-xs text-muted-foreground">Description</p>
  </div>
</div>
```

---

## 🔘 INTERACTIVE ELEMENTS

### CTA Buttons (Brutalist Style)
```tsx
/* Primary CTA */
<Button
  size="lg"
  className="bg-foreground text-background hover:bg-foreground/90 border-4 border-foreground px-10 py-6 text-lg font-bold hover-brutal transition-smooth"
>
  Action Text <ArrowRight className="ml-2 h-5 w-5" />
</Button>

/* Secondary CTA */
<Button
  size="lg"
  variant="outline"
  className="border-4 border-foreground text-foreground hover:bg-foreground hover:text-background px-10 py-6 text-lg font-bold transition-smooth"
>
  Secondary Action
</Button>
```

### Expandable Cards (4 Problems Pattern)
```tsx
<div
  className="border-4 border-foreground overflow-hidden transition-all cursor-pointer hover-brutal"
  onClick={() => toggle(id)}
>
  <div className="p-8 bg-background">
    {/* Header content */}
  </div>

  {expanded && (
    <div className="p-8 bg-foreground text-background border-t-4 border-foreground">
      {/* Expanded content */}
    </div>
  )}
</div>
```

### Hover States
```css
/* Brutalist hover (buttons, cards) */
.hover-brutal:hover {
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0px hsl(0 0% 0%);
}

/* Simple hover (links) */
hover:underline hover:underline-offset-4

/* Color swap hover (nav, footer) */
hover:bg-foreground hover:text-background
```

---

## 📝 CONTENT PATTERNS

### Badges
```tsx
/* Standard section badge */
<div className="inline-block px-4 py-2 border-2 border-foreground bg-background text-foreground text-sm font-mono uppercase tracking-wider">
  BADGE TEXT
</div>

/* Compact badge */
<div className="inline-block px-3 py-1 border-2 border-foreground text-xs font-mono uppercase tracking-wider">
  BADGE
</div>
```

### Testimonials
```tsx
<div className="bg-background border-r-4 border-foreground p-8">
  {/* Avatar + Name */}
  <div className="flex items-start gap-4 mb-8">
    <div className="w-16 h-16 border-2 border-foreground bg-muted flex items-center justify-center">
      <span className="text-2xl font-bold">XX</span>
    </div>
    <div>
      <h4 className="font-bold text-foreground text-lg">Name</h4>
      <p className="text-sm text-muted-foreground font-mono">ROLE</p>
    </div>
  </div>

  {/* Quote */}
  <p className="text-base text-foreground leading-relaxed mb-6">
    "Testimonial text..."
  </p>

  {/* Stars */}
  <div className="flex items-center gap-1 text-foreground text-xl">
    <span>★★★★★</span>
  </div>
</div>
```

### Comparison Tables
```tsx
<div className="border-4 border-foreground">
  {/* Header row (black background) */}
  <div className="grid grid-cols-4 border-b-4 border-foreground bg-foreground">
    <div className="p-4 md:p-6 border-r-4 border-foreground text-background">
      Column Header
    </div>
  </div>

  {/* Data rows */}
  <div className="grid grid-cols-4 border-b-2 border-foreground bg-background">
    <div className="p-4 md:p-6 border-r-4 border-foreground">
      Row Label
    </div>
    {/* Winner column gets subtle highlight */}
    <div className="p-4 md:p-6 bg-foreground/5">
      <p className="font-bold text-foreground">✓ Value</p>
    </div>
  </div>
</div>
```

---

## 🎭 SPECIAL PATTERNS

### Before/After Cards
```tsx
{/* Before Card (white) */}
<div className="border-4 border-foreground bg-background p-8 md:p-10">
  <div className="border-b-4 border-foreground pb-4 mb-6">
    <div className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-2">BEFORE</div>
    <h3 className="text-3xl md:text-4xl font-bold text-foreground">Title</h3>
  </div>
  <ul className="space-y-4">
    {/* ✗ bullets */}
  </ul>
</div>

{/* After Card (black) */}
<div className="border-4 border-foreground bg-foreground p-8 md:p-10">
  <div className="border-b-4 border-background pb-4 mb-6">
    <div className="text-sm font-mono uppercase tracking-wider text-background/80 mb-2">AFTER</div>
    <h3 className="text-3xl md:text-4xl font-bold text-background">Title</h3>
  </div>
  <ul className="space-y-4">
    {/* ✓ checkmarks */}
  </ul>
</div>
```

### Step-by-Step Cards
```tsx
<div className="border-4 border-foreground overflow-hidden bg-background">
  {/* Header with step number (black) */}
  <div className="p-4 border-b-4 border-foreground bg-foreground">
    <p className="text-sm font-mono text-background uppercase">STEP 1</p>
    <p className="text-xl font-bold text-background mt-1">Step Title</p>
  </div>

  {/* Image */}
  <img src={screenshot} className="w-full" />

  {/* Description */}
  <div className="p-5">
    <p className="text-base font-bold text-foreground mb-2">Outcome headline</p>
    <p className="text-sm text-muted-foreground leading-relaxed">
      Detailed explanation...
    </p>
  </div>
</div>
```

### Problem-Solution Boxes
```tsx
<div className="border-4 border-foreground p-5 bg-foreground">
  <div className="flex items-center gap-2 mb-2">
    <Icon className="h-5 w-5 text-background" />
    <h3 className="text-base font-bold text-background uppercase">Problem Name</h3>
  </div>
  <p className="text-sm font-bold text-background mb-2">
    → Solution: Name
  </p>
  <p className="text-xs text-background/90 mb-2">
    One-line description
  </p>
  <p className="text-xs font-mono text-background/80">
    • Bullet point<br />
    • Bullet point<br />
    • Bullet point
  </p>
</div>
```

---

## 🚀 ANIMATIONS

### Entrance Animations
```css
/* Fade in */
animate-fade-in

/* Fade in from bottom */
animate-fade-in-up

/* Slide in from right */
animate-slide-in-right

/* Scale in */
animate-scale-in
```

### Scroll Animations
```css
/* Infinite scroll (logos) */
animate-scroll-x
```

### Hover Animations
```css
/* Brutalist shadow on hover */
.hover-brutal

/* Lift on hover */
.hover-lift

/* Scale on hover */
.hover-scale
```

---

## 📱 RESPONSIVE PATTERNS

### Breakpoints
```css
/* Mobile-first approach */
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

### Common Responsive Patterns
```tsx
/* Font sizes */
className="text-base md:text-lg lg:text-xl"

/* Padding */
className="p-6 md:p-8 lg:p-10"

/* Grid columns */
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

/* Hide/show */
className="hidden md:block"
className="md:hidden"

/* Flex direction */
className="flex flex-col lg:flex-row"

/* Order */
className="order-2 lg:order-1"
```

---

## 🎯 CONVERSION PATTERNS

### CTA Placement (Standardized - MAX 3 BEFORE PRICING)
1. **Hero** - Primary entry point
2. **After Architecture** - After seeing sophistication
3. **Before Testimonials** - Final push before social proof
4. **Pricing Section** - Main conversion

### CTA Box Pattern
```tsx
<div className="text-center">
  <div className="max-w-3xl mx-auto border-4 border-foreground p-10 bg-foreground">
    <h3 className="text-3xl font-bold text-background mb-4 tracking-tighter">
      CTA Headline
    </h3>
    <p className="text-xl text-background/90 mb-8">
      Supporting text
    </p>
    <Button className="bg-background text-foreground border-4 border-background">
      Action
    </Button>
  </div>
</div>
```

### Pricing Cards
```tsx
/* DIY Option (white) */
<div className="border-4 border-foreground p-10 md:p-12 bg-background">
  <div className="mb-10">
    <div className="inline-block px-4 py-2 bg-muted text-sm font-mono uppercase">
      DIY STARTER
    </div>
    <h3 className="text-3xl font-bold mb-6">Self-Implementation</h3>
    <span className="text-7xl md:text-8xl font-bold">$150</span>
    <p className="text-lg text-muted-foreground">One-time payment</p>
  </div>
  {/* Features list */}
  {/* Timeline box */}
  <Button variant="outline">Buy Now</Button>
</div>

/* Premium Option (black) - with "MOST POPULAR" badge */
<div className="border-4 border-foreground p-10 md:p-12 bg-foreground relative">
  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
    <div className="px-8 py-3 bg-background border-4 border-foreground uppercase">
      MOST POPULAR
    </div>
  </div>
  {/* Rest similar but inverted colors */}
</div>
```

---

## 🔄 CONSISTENCY CHECKLIST

When creating new pages/sections, verify:

- [ ] Zero border-radius anywhere
- [ ] All borders use border-foreground (or border-background on inverted)
- [ ] Typography uses DM Sans + Space Mono
- [ ] Section padding follows standards (py-24/py-32 or py-32/py-40)
- [ ] Headings use proper hierarchy (5xl/7xl/8xl → 4xl/6xl → 3xl/5xl)
- [ ] All mono text is uppercase with tracking-wider
- [ ] Buttons have 2px or 4px borders
- [ ] CTAs limited to 3 before pricing section
- [ ] Inverted sections use bg-foreground + text-background
- [ ] Grid gaps use 8, 10, 12, or 16
- [ ] Hover states use transition-smooth or hover-brutal
- [ ] All cards use border-4
- [ ] Images have 4px borders
- [ ] Footer uses all-caps mono links

---

## 📋 QUICK REFERENCE

### Most Common Classes

**Sections:**
```
py-24 md:py-32 border-y-4 border-foreground
```

**Containers:**
```
container mx-auto px-6
max-w-7xl mx-auto
```

**Headings:**
```
text-4xl md:text-6xl font-bold text-foreground mb-8 tracking-tighter
```

**Body Text:**
```
text-base md:text-lg text-muted-foreground leading-relaxed
```

**Cards:**
```
border-4 border-foreground p-8 md:p-10 bg-background
```

**Buttons:**
```
bg-foreground text-background border-4 border-foreground px-10 py-6 text-lg font-bold hover-brutal
```

**Badges:**
```
inline-block px-4 py-2 border-2 border-foreground text-sm font-mono uppercase tracking-wider
```

---

## ✅ COMPONENT CHANGES APPLIED

All these components have been updated to brutalist design:

1. **src/components/Navigation.tsx** ✓
   - All-caps mono logo and links
   - 4px bottom border
   - Underline hover effects

2. **src/components/MobileMenu.tsx** ✓
   - Bordered menu icon
   - Black overlay
   - 2px bordered links

3. **src/components/ui/button.tsx** ✓
   - Removed rounded corners
   - Added 2px borders to all variants
   - Removed gradient variant

4. **src/components/ui/card.tsx** ✓
   - border-4 instead of rounded corners
   - Bold titles

5. **src/components/ui/input.tsx** ✓
   - border-2 instead of rounded
   - 4px focus ring

---

## 📄 PAGES COMPLETED

All pages follow this design system:

1. **Home.tsx** ✓
2. **SecondBrain.tsx** ✓
3. **Consultant.tsx** ✓
4. **About.tsx** ✓
5. **Newsletter.tsx** ✓
6. **NotFound.tsx** ✓

---

## 📚 DOCUMENTATION FILES

Created comprehensive guides:

1. **DESIGN_REVIEW.md** - Full site audit with recommendations
2. **COMPARISON_TABLE_CONTENT.md** - Competitive research
3. **ADDITIONAL_CONTENT.md** - Content pieces (folder structure, guarantee, timeline)
4. **CONTENT_FLOW_OPTIONS.md** - 3 approaches to content organization
5. **CTA_AUDIT.md** - CTA placement analysis
6. **HERO_OPTIONS.md** - 5 hero alternatives with scores
7. **DESIGN_SYSTEM.md** (this file) - Complete design system reference

---

## 🎯 TO APPLY TO NEW PAGES

When creating new pages:

1. Copy section patterns from this doc
2. Use standardized spacing (py-24/32, gap-10, etc.)
3. Follow typography hierarchy (5xl→7xl→8xl for H1, 4xl→6xl for H2, etc.)
4. Use brutalist components (Navigation, Button, Card, Input)
5. Maintain 4px borders everywhere
6. Limit CTAs to 3 before main conversion point
7. Use inverted sections (bg-foreground) for visual variety
8. Apply hover-brutal to interactive elements

Everything is standardized and reusable across all pages!
