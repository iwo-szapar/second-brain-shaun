# 🚧 Projects - Active Work in Progress

**Your workspace for current projects being executed.**

This is where active work happens before it becomes part of experiences. Think of it as your staging area for work in progress.

---

## 🎯 What Lives Here

Projects contains your current work:
- **Active plans** - Projects in the planning phase
- **Work in progress** - Projects being executed
- **Pre-review drafts** - Projects awaiting quality check
- **Today's focus** - What you're actively working on

---

## 📂 Directory Structure

```
projects/
├── INDEX.md (you are here)
└── [project-name]/            # Active project folder
    ├── plan.md                # Created by /plan (DONE)
    ├── research.md            # Created during /work (IN PROGRESS)
    ├── output.md              # Created during /work (IN PROGRESS)
    └── notes.md               # Optional: scratchpad
```

**After completion**, projects move to `../experiences/[project-name]/` with added:
- `review.md` (from `/review`)
- `learnings.md` (from `/learn`)

---

## 🔄 Project Lifecycle in This Folder

### Phase 1: Planning
```
/plan [task description]
```
Creates: `[project-name]/plan.md`

**Status**: Planning phase
**What's here**: Research findings, execution steps
**Next step**: Review plan, adjust if needed, proceed to work

### Phase 2: Execution
```
/work [plan.md]
```
Creates/Updates:
- `research.md` - Context being gathered
- `output.md` - Deliverable being built

**Status**: Work in progress
**What's here**: Active research, draft output
**Next step**: Complete deliverable, move to review

### Phase 3: Pre-Review
Output complete, awaiting quality check

**Status**: Ready for review
**What's here**: Completed `output.md`
**Next step**: Run `/review [output.md]`

### Phase 4: Graduation
```
/review [output.md]  # Creates review.md
/learn               # Creates learnings.md
```

**Status**: Complete
**What happens**: Entire folder moves to `../experiences/`
**What's archived**: plan → research → output → review → learnings

---

## 🚀 Common Workflows

### Starting a New Project
1. Run `/plan [task description]`
2. System creates folder in `projects/`
3. Review generated `plan.md`
4. Make adjustments if needed
5. Proceed with `/work [plan.md]`

### Working on Active Project
1. Open project folder in `projects/`
2. Continue with `/work` or edit files directly
3. Save progress as you go
4. `output.md` contains your deliverable

### Completing a Project
1. Finalize `output.md`
2. Run `/review [output.md]`
3. Address any feedback if needed
4. Run `/learn` to extract patterns
5. Project automatically moves to `experiences/`

### Managing Multiple Projects
- Each project has its own folder
- Work on projects independently
- Switch between projects as needed
- Complete one before starting another (recommended)

---

## 📋 Organization Guidelines

### Folder Naming
Use descriptive, searchable names:
- ✅ `acme-sales-deck-q4-2024`
- ✅ `prospect-email-series-healthcare`
- ✅ `demo-presentation-enterprise-client`
- ❌ `project1`
- ❌ `deck`
- ❌ `stuff`

### File Structure
Keep the standard structure:
```
[project-name]/
├── plan.md         # From /plan
├── research.md     # From /work
├── output.md       # From /work
└── notes.md        # Optional scratchpad
```

### Status Tracking
You can add status indicators to folder names:
- `[WIP] project-name` - Work in progress
- `[REVIEW] project-name` - Ready for review
- `[BLOCKED] project-name` - Waiting on something

Or use a `STATUS.md` file in each folder:
```markdown
# Status: IN PROGRESS

## Last Updated
2025-11-27 14:30

## Current Phase
Executing plan - drafting output

## Next Steps
- Complete sections 2-3
- Add data visualizations
- Run /review
```

---

## 🗂️ Active vs Archived

### Keep in Projects/ While:
- Planning is ongoing
- Work is in progress
- Output is being drafted
- Waiting for feedback
- Making revisions

### Move to Experiences/ After:
- Output is finalized
- Quality review complete (`/review` run)
- Patterns extracted (`/learn` run)
- Project is done and approved

**Note**: The system moves projects automatically after `/learn` completes.

---

## 🔍 Finding Information

### Check Active Projects
```bash
ls projects/
```
Shows all current work in progress

### Check Project Status
Open `[project-name]/plan.md` to see:
- Original task
- Execution steps
- Progress made

### Find Specific Project
Use descriptive folder names for easy searching:
```bash
ls projects/ | grep "sales-deck"
ls projects/ | grep "acme"
```

---

## 🎯 Best Practices

### One Project at a Time
While you can work on multiple projects:
- Focus on one at a time for best results
- Complete the full cycle before starting next
- Maintain momentum through completion

### Keep It Clean
- Delete abandoned projects or move to archive
- Don't let incomplete work pile up
- Regular cleanup keeps workspace manageable

### Use Notes Effectively
Create `notes.md` in project folder for:
- Brainstorming ideas
- Research links
- Questions to answer
- Feedback received
- Implementation thoughts

### Review Regularly
Weekly review of `projects/`:
- What's stuck? Why?
- What can be completed quickly?
- What should be archived/deleted?
- What needs prioritization?

---

## 🤖 Agent Usage

When AI agents work on projects:

1. **They create folders** - `/plan` creates project structure
2. **They follow structure** - Agents maintain standard file organization
3. **They read context** - Agents pull from `../memory/` automatically
4. **They track progress** - Work persists across sessions

You can also:
- Ask agents to check project status
- Request progress updates
- Get help with stuck projects

---

## 📊 Workflow Optimization

### Fast Project Completion
```
Same session workflow:
/plan → /work → /review → /learn
Time: 5-15 minutes for small projects
Result: Immediate pattern extraction
```

### Multi-Session Projects
```
Session 1: /plan + start /work
Session 2: Continue /work, finalize output
Session 3: /review + /learn
Result: Thoughtful, high-quality work
```

### Batch Processing
For similar projects:
1. Complete first project fully
2. Extract patterns with `/learn`
3. Start second project - patterns auto-apply
4. Notice time savings increase with each iteration

---

## 🚨 Troubleshooting

### Project Stuck in Planning
- Review `plan.md` - is it actionable?
- Missing context? Check `../memory/`
- Ask: "What's the simplest first step?"

### Output Not Coming Together
- Review `research.md` - enough context?
- Check `../memory/patterns/` - relevant patterns?
- Reference `../memory/examples/` - similar work?
- Ask: "What would a quick draft look like?"

### Too Many Active Projects
- Prioritize: Which delivers most value?
- Archive: Which can wait?
- Batch: Which are similar enough to group?
- Complete: Which is closest to done?

### Lost Project Context
- Read `plan.md` - original intent
- Check `research.md` - what you learned
- Review `output.md` - what you built
- Continue where you left off

---

## 🆘 Need Help?

- **Starting project**: Run `/plan [task]`
- **Working on project**: Run `/work [plan.md]`
- **Completing project**: Run `/review [output.md]` then `/learn`
- **Finding project**: Use `ls projects/` or check folder names
- **Stuck project**: Review plan, check memory for context

---

**💡 Remember**: This is your active workspace. Keep it focused, organized, and moving. Complete projects become experiences that compound your intelligence.

*Last Updated: 2025-11-27*
