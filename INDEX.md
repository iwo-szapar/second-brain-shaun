# 🧠 AI Second Brain - Shaun's AI Operations System

**Your AI-powered operating system for doctor marketing and content creation.**

This repository is Shaun's personalized Second Brain, optimized for:
- **Content Creation** (Weekly, several hours → <30 min per piece)
- **Doctor Client Management** (Brand templates + positioning + values)
- **Prompt Library** (Versioned, reusable, no more repetition)
- **Knowledge Repository** (Capture valuable thoughts before they're lost)

Every completed workflow makes the next one faster and smarter.

---

## ⚡ Shaun's Quick Access (Most Used)

**Start Here:**
- [Day-One Win Guide](day-one-win-guide.md) - **START HERE** (Quality content with minimal editing)
- [Content Creation Workflow](memory/workflows/content-creation/process.md) - **PRIMARY** (Weekly)
- [Shaun's Complete Profile](agent_docs/shaun-profile.md) - Full context for agents
- [MCP Setup Guide](agent_docs/shaun-integrations.md) - Google Workspace, Web Search
- [Quality Standards](agent_docs/shaun-quality-standards.md) - HIPAA compliance, reputation protection

**For Agents Working on Shaun's Tasks:**
- Read `agent_docs/shaun-profile.md` FIRST for complete business context
- Check `agent_docs/shaun-quality-standards.md` for HIPAA and quality requirements
- Load doctor context from `memory/style-voice/doctor-[name].md` and `knowledge-repo/`

---

## 🎯 How This Works

The Second Brain operates on a simple principle: **capture once, reuse infinitely**.

```
Memory (semantic knowledge) + Experiences (episodic memory) = Compounding intelligence
```

### The 4-Command Workflow

```
/plan [task]  →  /work [plan]  →  /review [output]  →  /learn
    ↓               ↓                  ↓                 ↓
 Research       Execute with       6-agent           Extract
 + Plan         todo tracking      quality check     patterns
```

Every cycle makes your brain smarter. Patterns extracted from one project accelerate the next.

---

## 📂 Repository Structure

```
second-brain/
├── INDEX.md (you are here)
├── CLAUDE.md                      # Complete usage guide & configuration
├── README.md                      # Quick start & overview
│
├── memory/                        # Semantic Knowledge (KNOW)
│   ├── workflows/
│   │   ├── content-creation/          # PRIMARY workflow
│   │   ├── business-metrics/          # Business intelligence
│   │   └── paid-media/                # Ad optimization
│   ├── examples/                  # Best work to reference
│   │   └── content/
│   │       ├── social-posts/          # Successful social posts
│   │       ├── articles/              # Long-form content
│   │       └── emails/                # Email sequences
│   ├── style-voice/               # Brand templates (self + all doctors)
│   ├── prompts/                   # Versioned prompt library
│   ├── patterns/                  # Extracted wisdom (grows with /learn)
│   └── knowledge-repo/            # Values, beliefs, frameworks, ideas
│       ├── values-beliefs/            # Core philosophies
│       ├── positioning/               # Unique differentiators
│       ├── frameworks/                # Mental models
│       └── learning/                  # Captured insights
│
├── experiences/                   # Episodic Memory (DID)
│   ├── content/                   # PRIMARY - Content creation projects
│   ├── clients/                   # Client work
│   ├── research/                  # Research projects
│   ├── operations/                # Business operations
│   ├── outreach/                  # Sales & marketing
│   └── strategy/                  # Strategic planning
│       └── [project-name]/
│           ├── plan.md            # Research + execution plan
│           ├── context.md         # Background gathered
│           ├── output.md          # Deliverable
│           ├── review.md          # Quality assessment
│           └── learnings.md       # Extracted patterns
│
├── brain-health/                  # Growth Metrics (MEASURE)
│   ├── growth-log.md              # Timeline of brain updates
│   ├── pattern-confidence.md      # Pattern strength tracking
│   └── daily-sessions/            # Daily work logs
│
├── agent_docs/                    # Agent Context (AI reads on-demand)
│   ├── shaun-profile.md           # Complete business context
│   ├── shaun-workflow-details.md  # Workflow implementation details
│   ├── shaun-integrations.md      # MCP setup guide
│   └── shaun-quality-standards.md # HIPAA & quality requirements
│
└── .claude/                       # Claude Code Configuration
    ├── commands/                  # Slash commands
    ├── agents/                    # Sub-agents
    └── skills/                    # Reusable skills
```

---

## 🗂️ Directory Index

### 💾 Memory - Semantic Knowledge

Your semantic knowledge base - the facts, frameworks, and patterns you've learned.

**Workflows** (How to do things):
- [Content Creation](./memory/workflows/content-creation/) - **PRIMARY** (Weekly social posts & articles)
- [Business Metrics](./memory/workflows/business-metrics/) - Business intelligence
- [Paid Media](./memory/workflows/paid-media/) - Ad optimization

**Examples** (Best work to reference):
- [Social Posts](./memory/examples/content/social-posts/) - High-performing posts
- [Articles](./memory/examples/content/articles/) - Long-form content
- [Email Sequences](./memory/examples/content/emails/) - Email campaigns

**Style & Voice**:
- [Brand Templates](./memory/style-voice/) - Shaun + all doctor clients

**Prompts**:
- [Prompt Library](./memory/prompts/) - Versioned, reusable prompts

**Patterns** (Extracted wisdom):
- [Patterns Library](./memory/patterns/) - Grows with /learn command

**Knowledge Repo**:
- [Values & Beliefs](./memory/knowledge-repo/values-beliefs/) - Core philosophies
- [Positioning](./memory/knowledge-repo/positioning/) - Unique differentiators
- [Frameworks](./memory/knowledge-repo/frameworks/) - Mental models
- [Learning](./memory/knowledge-repo/learning/) - Captured insights

### 📚 Experiences - Episodic Memory

Your episodic memory - every project completed with full context.

**Primary Project Types**:
- [Content](./experiences/content/) - Social posts, articles (PRIMARY)
- [Clients](./experiences/clients/) - Client work history
- [Research](./experiences/research/) - Research projects
- [Operations](./experiences/operations/) - Business operations
- [Outreach](./experiences/outreach/) - Sales & marketing
- [Strategy](./experiences/strategy/) - Strategic planning

Each folder contains: plan → context → output → review → learnings

### 📊 Brain Health - Growth Metrics

Metrics and analytics that track your brain's growth and compound returns.

**Track Growth**:
- [Growth Log](./brain-health/growth-log.md) - Timeline of improvements
- [Pattern Confidence](./brain-health/pattern-confidence.md) - Pattern strength
- [Daily Sessions](./brain-health/daily-sessions/) - Work logs

**Run**: `/grow` to see current metrics

### 📖 Agent Docs - AI Context

Documentation AI agents read on-demand (progressive disclosure).

**Shaun-Specific**:
- [Complete Profile](./agent_docs/shaun-profile.md) - Full business context
- [Workflow Details](./agent_docs/shaun-workflow-details.md) - Implementation guides
- [MCP Integrations](./agent_docs/shaun-integrations.md) - Setup instructions
- [Quality Standards](./agent_docs/shaun-quality-standards.md) - HIPAA & quality requirements

**System Documentation**:
- [Git Configuration](./agent_docs/git_configuration.md)
- [MCP Setup](./agent_docs/mcp_setup.md)
- [Troubleshooting](./agent_docs/troubleshooting.md)

---

## 🚀 Quick Start

### First Time Setup (15 minutes)
1. **Review CLAUDE.md**: Your personalized configuration is already done ✅
2. **Run day-one win**: See [day-one-win-guide.md](day-one-win-guide.md)
3. **Add doctor brand voice**: `memory/style-voice/doctor-[name].md`
4. **Document positioning**: `memory/knowledge-repo/positioning/doctor-[name].md`
5. **Add values/frameworks**: `memory/knowledge-repo/values-beliefs/doctor-[name].md`

### Daily Workflow (30 minutes per content piece)
1. **Start with plan**: `/plan "Create [content type] for Dr. [Name]"`
2. **Execute systematically**: `/work`
3. **Quality check**: `/review`
4. **Minimal editing**: < 30 minutes (vs current several hours)
5. **Extract wisdom**: `/learn`

### Need Quick Help?
```
/ask "Draft social post for Dr. [Name] about [topic]"
```

That's it. Your brain is working.

---

## 🔍 Finding Information

### By Type
- **Business Context**: [memory/](./memory/) - Workflows, examples, patterns
- **Past Projects**: [experiences/](./experiences/) - Completed work with learnings
- **Growth Metrics**: [brain-health/](./brain-health/) - Analytics and trends
- **Agent Context**: [agent_docs/](./agent_docs/) - AI reads on-demand

### By Workflow
- **Create content**: `/plan "Create social post for Dr. [Name] about [topic]"`
- **Business metrics**: `/ask "Analyze business state for this week"`
- **Find past examples**: Browse [memory/examples/](./memory/examples/)
- **Check brain growth**: Run `/grow`
- **Search past work**: Use `/recall [topic]`
- **Find framework**: `/recall "[framework name]"`

---

## 🤖 Agent Navigation Pattern

When using AI agents in this repository:

1. **Read INDEX.md first** to understand the structure
2. **Load Shaun's profile**: `agent_docs/shaun-profile.md` for complete context
3. **Check quality standards**: `agent_docs/shaun-quality-standards.md` for HIPAA & quality requirements
4. **Load doctor context**: `memory/style-voice/doctor-[name].md` and `knowledge-repo/` before content creation
5. **Complete the full cycle** - /plan → /work → /review → /learn

This ensures consistency and prevents hallucinated file paths.

---

## 📈 Growth Tracking

Your brain compounds knowledge automatically:

### Level 1: Foundation ✅
- [x] CLAUDE.md personalized for Shaun
- [x] Day-one win guide created
- [ ] First doctor brand voice added (do during session)
- [ ] First doctor positioning documented (do during session)

### Level 2: Core Workflow (Week 1)
- [ ] Complete first content creation cycle (plan → work → review → learn)
- [ ] Create 5 posts using system
- [ ] First patterns extracted to `memory/patterns/`
- [ ] Achieve < 30 min average editing time

### Level 3: Pattern Power (Week 4)
- [ ] 5+ content patterns in memory
- [ ] Visible time savings on content editing
- [ ] 3+ doctor clients documented in system
- [ ] Partner interested in shared system

### Level 4: Expert Mode (Month 3)
- [ ] 30+ content pieces in experiences/
- [ ] Consistent < 30 min editing time
- [ ] Partner using shared system
- [ ] 10+ versioned prompts in library

---

## 🎓 Command Reference

| Command | Purpose | Time |
|---------|---------|------|
| `/ask [question]` | Quick help with any task | 30 sec |
| `/setup` | Guided brain configuration | 10 min |
| `/plan [task]` | Create systematic execution plan | 2-3 min |
| `/work [plan.md]` | Execute with todo tracking | Varies |
| `/review [output.md]` | 6-agent parallel quality review | 30 sec |
| `/learn` | Extract patterns to memory | 3 min |
| `/recall [topic]` | Search memory for relevant context | 10 sec |
| `/grow` | View brain health metrics | 5 sec |

Full documentation: [CLAUDE.md](./CLAUDE.md)

---

## 🆘 Need Help?

- **Getting started**: See [day-one-win-guide.md](day-one-win-guide.md)
- **Content creation**: See [memory/workflows/content-creation/](./memory/workflows/content-creation/)
- **MCP setup**: See [agent_docs/shaun-integrations.md](./agent_docs/shaun-integrations.md)
- **Quality standards**: See [agent_docs/shaun-quality-standards.md](./agent_docs/shaun-quality-standards.md)
- **Troubleshooting**: See [agent_docs/troubleshooting.md](./agent_docs/troubleshooting.md)

---

## 🔧 Technical Details

### MCP Integrations (Priority Order)
1. **Google Workspace** (HIGH) - Access Drive docs, Sheets, Calendar
2. **Filesystem** (HIGH) - Read PDFs, local files
3. **Web Search** (HIGH) - Research for evidence-based content
4. **GitHub** (MEDIUM) - Version control for prompts
5. **Slack** (FUTURE) - Team communication with partners

Configure in: `~/.claude/mcp.json`
Setup guide: [agent_docs/shaun-integrations.md](./agent_docs/shaun-integrations.md)

### File Formats
- `.md` - Markdown files for all content
- Plans, outputs, reviews, learnings all in markdown
- Structured formats enable pattern extraction

---

**🧠 Remember**: This is your brain. Every completed project makes it smarter. Every pattern extracted compounds your future speed.

**Version**: 1.0.0 (Shaun)
**Template**: AI Second Brain
**Setup**: Doctor Marketing & AI-First Lead Generation

*Last Updated: 2025-12-03*
