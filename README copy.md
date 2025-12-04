# AI Second Brain Template

> Build an AI-powered knowledge companion that compounds intelligence with every project.

---

## What is This?

An AI Second Brain is a Claude Code project structure that:

- **Remembers** your business context, products, and customers
- **Learns** patterns from your best work
- **Improves** output quality over time
- **Accelerates** repeated tasks through accumulated wisdom

## Quick Start

### 1. Clone or Copy

```bash
# Clone this template
git clone [your-repo-url] my-second-brain
cd my-second-brain
```

### 2. Open in Claude Code

```bash
claude
```

### 3. Get First Value (30 seconds)

```
/ask "Help me write a follow-up email to a prospect"
```

### 4. Configure Your Brain (10 minutes)

```
/setup
```

---

## Core Workflow

```
/plan [task]  -->  /work  -->  /review  -->  /learn
```

| Command | Purpose |
|---------|---------|
| `/plan` | Research context + create execution plan |
| `/work` | Execute plan with todo tracking |
| `/review` | 6-agent parallel quality check |
| `/learn` | Extract patterns to memory |

---

## Directory Structure

```
ai-second-brain/
├── .claude/
│   ├── commands/       # Custom slash commands
│   ├── agents/         # Specialized AI agents
│   └── settings.local.json
├── memory/             # Semantic knowledge
│   ├── company/        # Your business context
│   ├── customers/      # ICP, pain points, objections
│   ├── patterns/       # Extracted wisdom
│   └── examples/       # Winning work samples
├── experiences/        # Episodic memory (project history)
├── brain-health/       # Growth metrics
└── CLAUDE.md           # Main configuration
```

---

## Key Features

### Semantic Memory (`memory/`)
Store long-term business knowledge:
- Products and services
- Customer profiles
- Competitive positioning
- Extracted patterns

### Episodic Memory (`experiences/`)
Project-by-project history:
- Plans and research
- Final outputs
- Quality scores
- Learnings

### Brain Health Tracking
Monitor growth over time:
- Pattern confidence scores
- Quality trends
- Time savings

---

## Commands Reference

| Command | Description | Time |
|---------|-------------|------|
| `/ask [question]` | Quick help with any task | 30s |
| `/setup` | Guided brain configuration | 10min |
| `/plan [task]` | Create systematic plan | 2-3min |
| `/work [plan]` | Execute with tracking | varies |
| `/review [output]` | 6-agent quality review | 30s |
| `/learn` | Extract patterns | 3min |
| `/recall [topic]` | Search memory | 10s |
| `/grow` | View brain metrics | 5s |

---

## Getting Help

- **Documentation**: See `CLAUDE.md` for full guide
- **Issues**: Check Troubleshooting section in CLAUDE.md
- **Updates**: Pull latest from template repo

---

## License

MIT License - Use freely for personal or commercial projects.

---

Built with Claude Code | AI Maturity Index
