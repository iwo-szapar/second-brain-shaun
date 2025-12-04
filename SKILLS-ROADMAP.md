# AI Second Brain - Skills Roadmap

> Strategic skill recommendations for Shaun's content creation workflow

**Goal**: Reduce content editing time from 6-8 hours/week to 1.5-2 hours/week (70-75% reduction)

---

## 🎯 Priority 1: Immediate Impact (Build First)

### 1. content-doctor-post (HIGHEST PRIORITY - Day One Win)

**Purpose**: Creates social media posts for doctor clients with minimal editing required

**When to use**: When creating social media content for a specific doctor client

**What it does**:
1. Reads `memory/style-voice/{client-name}/` for tone/brand
2. Reads `memory/knowledge-repo/medical-frameworks/` for positioning
3. Reads `agent_docs/shaun-quality-standards.md` for HIPAA compliance
4. Generates post following exact client voice
5. Self-checks against quality standards before returning

**Why this works**:
- Eliminates "generic AI voice" by loading client-specific context first
- Prevents HIPAA violations by checking standards automatically
- Reduces editing time from hours to minutes by getting voice right initially

**Integration**:
- Works with `/plan [social post for Dr. Smith]` → invokes this skill automatically
- Output feeds directly into `/review` for quality check

**Expected Impact**: 70-80% reduction in editing time for social posts

**Allowed Tools**: Read, Write, Grep

---

### 2. memory-style-loader

**Purpose**: Quickly loads and summarizes a client's complete style/voice profile

**When to use**: When starting any content creation task or when asked about client style guidelines

**What it does**:
1. Reads all files in `memory/style-voice/{client-name}/`
2. Summarizes: tone, voice, taboos, preferred frameworks
3. Returns formatted "style card" for current session
4. Can compare styles across multiple clients

**Why this works**:
- Eliminates manual context gathering
- Ensures consistency across all content for a client
- Provides quick reference during content creation

**Integration**:
- Auto-invoked by content-doctor-post and content-doctor-article
- Can be called standalone: "Load style for Dr. Martinez"

**Allowed Tools**: Read, Grep

---

## 📈 Priority 2: Scale Impact (Build Second)

### 3. content-doctor-article

**Purpose**: Creates long-form articles for doctor clients requiring minimal editing

**When to use**: When writing blog posts, articles, or long-form content for doctor clients

**What it does**:
1. Loads client voice/brand from `memory/style-voice/{client-name}/`
2. Reads relevant frameworks from `memory/knowledge-repo/`
3. Checks past examples in `memory/examples/{client-name}/best-articles/`
4. Generates article matching client's established style
5. Validates against HIPAA and quality standards

**Why this works**:
- References past successful articles to match proven style
- Loads comprehensive context before writing
- Applies frameworks from knowledge-repo for consistent positioning

**Integration**:
- Triggered by `/plan [article about treatment X for Dr. Jones]`
- Uses /recall automatically to find relevant past examples

**Expected Impact**: 60-70% reduction in editing time for articles

**Allowed Tools**: Read, Write, Grep

---

### 4. hipaa-validator

**Purpose**: Validates content against HIPAA compliance standards before publishing

**When to use**: Before publishing any medical/doctor content or when checking HIPAA compliance

**What it does**:
1. Reads `agent_docs/shaun-quality-standards.md`
2. Scans content for: PHI mentions, specific patient details, violation patterns
3. Returns: pass/fail + specific issues found
4. Suggests: compliant alternatives for flagged content

**Why this works**:
- Prevents reputation damage from compliance violations
- Eliminates manual HIPAA review time
- Provides specific fixes, not just warnings

**Integration**:
- Auto-invoked during /review for all doctor content
- Can be called standalone for final check

**Allowed Tools**: Read, Grep

---

## 🧠 Priority 3: Knowledge Management (Build Third)

### 5. knowledge-repo-add

**Purpose**: Structures and adds new frameworks, beliefs, or positioning to knowledge repository

**When to use**: When discovering new insights, frameworks, or positioning that should be saved

**What it does**:
1. Takes raw insight/framework from user
2. Structures it according to `memory/knowledge-repo/` format
3. Tags with relevant clients/topics
4. Cross-references with existing frameworks
5. Updates INDEX.md navigation

**Why this works**:
- Solves "valuable thoughts get lost" problem
- Maintains consistency with existing knowledge structure
- Makes insights immediately searchable via /recall

**Integration**:
- Used during /learn phase: "This positioning worked—save it"
- Auto-formats for consistency

**Allowed Tools**: Read, Write, Grep

---

### 6. client-profile-builder

**Purpose**: Creates comprehensive client profiles in memory/style-voice/ through guided interview

**When to use**: When onboarding new doctor client or updating existing client profile

**What it does**:
1. Runs structured interview: tone, taboos, audience, goals
2. Asks for example posts/articles user loves
3. Analyzes examples to extract style patterns
4. Creates complete `memory/style-voice/{client-name}/` directory
5. Generates style guide document

**Why this works**:
- Comprehensive upfront profiling = less editing later
- Systematic approach ensures nothing is missed
- Creates reusable style profile for all future content

**Integration**:
- Run once per client: "Build profile for new client Dr. Lee"
- Updates existing profiles: "Update Dr. Smith's style guide"

**Allowed Tools**: Read, Write

---

## 📊 Priority 4: Optimization (Build Fourth)

### 7. workflow-audit

**Purpose**: Analyzes content creation workflow and identifies bottlenecks

**When to use**: When wanting to understand where time is being wasted or improve content workflow

**What it does**:
1. Analyzes `experiences/content-creation/` for patterns
2. Reads `brain-health/growth-log.md` for time metrics
3. Identifies: which clients need most editing, which content types are slowest
4. Suggests: missing style templates, incomplete frameworks
5. Recommends: which memory/ sections need more documentation

**Why this works**:
- Turns qualitative pain ("I spend hours editing") into quantitative data
- Identifies specific gaps in style-voice/ or knowledge-repo/
- Guides what to add to memory/ for maximum impact

**Integration**:
- Run monthly: "Audit my content workflow"
- Feeds insights into /grow metrics

**Allowed Tools**: Read, Grep, Bash

---

## 🔄 How Skills Enhance Current Workflow

### Before (Current State)
```
/plan [social post for Dr. Smith]
→ Generic planning without client context
→ Execute with manual context gathering
→ /review catches issues after writing
→ Hours of editing to fix voice/tone
```

### After (With Skills)
```
/plan [social post for Dr. Smith]
→ Auto-invokes memory-style-loader for Dr. Smith
→ Auto-invokes content-doctor-post with loaded context
→ Generates on-brand content from the start
→ /review validates (invokes hipaa-validator)
→ Minimal editing needed
```

### Skill Cascade Pattern
```
1. /plan detects "content for [client]"
2. Loads memory-style-loader → gets client context
3. Invokes content-doctor-post OR content-doctor-article
4. Returns draft for user review
5. /review triggers hipaa-validator automatically
6. /learn extracts what worked → feeds knowledge-repo-add
```

---

## 📊 Expected Outcomes

### Time Savings Metrics

| Metric | Current | Target | Skill Responsible |
|--------|---------|--------|-------------------|
| Social post editing time | 2-3 hours/week | 20-30 min/week | content-doctor-post |
| Article editing time | 3-4 hours/week | 45-60 min/week | content-doctor-article |
| HIPAA compliance checks | Manual | Automated | hipaa-validator |
| Lost insights/frameworks | High | Near zero | knowledge-repo-add |
| Client onboarding time | Ad-hoc | 30 min structured | client-profile-builder |

**Total Weekly Time Savings**: 6-8 hours → 1.5-2 hours (70-75% reduction)

---

## 🚀 Recommended Build Order

### Week 1: Day-One Win
1. **content-doctor-post** - Immediate editing time reduction
2. **memory-style-loader** - Enables content-doctor-post to work well

### Week 2: Scale Impact
3. **content-doctor-article** - Extend wins to long-form content
4. **hipaa-validator** - Add safety layer to content workflow

### Week 3: Sustainability
5. **client-profile-builder** - Improve quality of style profiles
6. **knowledge-repo-add** - Prevent knowledge loss going forward

### Week 4: Optimization
7. **workflow-audit** - Data-driven continuous improvement

---

## 🎯 Key Insight

The goal isn't to automate content creation—it's to **load the right context before writing** so editing becomes unnecessary. Skills should focus on context loading (style-voice, knowledge-repo) rather than generation alone.

**Core Philosophy**: Progressive disclosure of client-specific context prevents generic AI output.

---

## ✅ Next Steps

1. **Validate assumptions**: Do these skills match your actual content workflow?
2. **Start with MVP**: Build minimal version of `content-doctor-post` first
3. **Test with one client**: Validate editing time reduction with real content
4. **Iterate**: Refine based on what actually reduces editing time
5. **Scale**: Add remaining skills in priority order

**Questions to Consider**:
- Does `content-doctor-post` match your typical social content workflow?
- Are there specific clients you'd want to test with first?
- What's missing from the style-voice/ structure that these skills would need?

---

**Version**: 1.0.0
**Last Updated**: 2025-12-03
**Status**: Planning Phase
