# Agent Documentation

This directory contains detailed how-to guides and operational documentation for Claude Code.

## Purpose

Following the **Progressive Disclosure** principle from HumanLayer's "Writing a good CLAUDE.md" article, these files contain task-specific instructions that aren't universally applicable.

**Why separate files?**
- CLAUDE.md is injected into EVERY session
- Too many instructions degrades Claude's performance
- Task-specific details should only be read when needed
- Keeps CLAUDE.md concise and focused on onboarding

## Available Guides

### `git_configuration.md`
**When to read**: Before pushing changes, troubleshooting git issues

**Contains**:
- Large file push configuration (HTTP 400 errors)
- Standard git workflow
- Common git issues and solutions
- Branch information and verification

### `browser_automation.md`
**When to read**: Planning multi-step browser automation tasks

**Contains**:
- When to use agent-browse vs other tools
- Correct and incorrect use cases
- Example workflows
- Technical details and limitations

### `mcp_setup.md`
**When to read**: Adding new MCP servers, troubleshooting MCP issues

**Contains**:
- Available MCP servers (business + development)
- Adding new MCP servers
- Configuration conflict resolution
- OAuth-based MCP server setup
- Troubleshooting MCP issues

### `troubleshooting.md`
**When to read**: When encountering errors or issues

**Contains**:
- Permission denied errors
- MCP server not working
- OAuth authentication failures
- Hook execution issues
- Git push failures
- Web UI development issues
- PostgreSQL connection issues
- Common error messages and solutions

### `testing_frameworks.md`
**When to read**: Before running tests, setting up testing

**Contains**:
- Python testing (pytest, unittest)
- Node.js/JavaScript testing (npm test, tsx, Vitest)
- Go testing
- Web UI specific testing (type checking, linting, building)
- Testing best practices
- Debugging tests

### `hooks_and_permissions.md`
**When to read**: Managing permissions, creating hooks

**Contains**:
- Permission management (adding, patterns, deny list)
- Hook system (types, creating, debugging)
- Shell compatibility (bash vs zsh)
- Sub-agent context exchange protocol
- Security model details
- Best practices

## How to Use

### For Claude Code

When starting a task, determine which files are relevant:

**Example 1: "Fix the git push error"**
→ Read `git_configuration.md` and possibly `troubleshooting.md`

**Example 2: "Add a new MCP server for Slack"**
→ Read `mcp_setup.md`

**Example 3: "Run the test suite"**
→ Read `testing_frameworks.md`

**Example 4: "Scrape data from a website"**
→ Read `browser_automation.md`

### For Developers

These files serve as:
- Quick reference for common tasks
- Troubleshooting guides
- Configuration templates
- Best practices documentation

## Maintenance

When updating these files:

1. **Keep focused**: Each file should cover ONE topic area
2. **Be specific**: Include exact commands, not generic advice
3. **Include examples**: Show real-world usage patterns
4. **Update CLAUDE.md references**: If file structure changes
5. **Test procedures**: Verify commands actually work
6. **Keep updated**: Reflect current project state

## Progressive Disclosure in Action

**Bad (old approach)**:
```
CLAUDE.md (393 lines)
├── All git commands and troubleshooting
├── All MCP server setup details
├── All testing framework commands
├── All troubleshooting procedures
└── All hook management details
```
Result: Claude ignores most of CLAUDE.md as "not relevant to current task"

**Good (new approach)**:
```
CLAUDE.md (215 lines)
├── Business context (always relevant)
├── Repository structure (always relevant)
├── Critical configuration (always relevant)
├── Security model (always relevant)
└── Pointers to agent_docs/*.md (read when needed)

agent_docs/
├── git_configuration.md (read only when working with git)
├── browser_automation.md (read only when automating browsers)
├── mcp_setup.md (read only when managing MCP servers)
├── troubleshooting.md (read only when encountering issues)
├── testing_frameworks.md (read only when running tests)
└── hooks_and_permissions.md (read only when managing hooks)
```
Result: Claude sees focused, relevant context for every task

## Benefits

1. **Better instruction-following**: Fewer instructions = better adherence
2. **Relevant context**: Only read what's needed for current task
3. **Easier maintenance**: Update one file without affecting others
4. **Scalable**: Can add more guides without bloating CLAUDE.md
5. **Discoverable**: Clear file names make finding info easy

## Related Documentation

- **CLAUDE.md**: Main onboarding file (start here)
- **company brain/INDEX.md**: Business context and workflows
- **.claude/hooks/**: Hook scripts
- **.claude/commands/**: Slash commands
- **settings.local.json**: Permissions and configuration

---

**Created**: 2025-12-02
**Based on**: HumanLayer's "Writing a good CLAUDE.md" article
**Maintainer**: AI Maturity Index
