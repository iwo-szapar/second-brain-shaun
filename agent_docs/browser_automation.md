# Browser Automation Guide

## When to Use agent-browse

**Repository**: https://github.com/browserbase/agent-browse

Use agent-browse for **multi-step browser automation tasks** where actions need to be performed on websites.

## ✅ CORRECT Use Cases

- **Information gathering**: "Go to Hacker News, get the top post comments, and summarize them"
- **QA testing**: Multi-step testing on local applications with interaction requirements
- **Transactional workflows**: "Order me a pizza on Doordash" (when logged in)
- **Form filling**: Workflows across multiple pages requiring input
- **Data scraping**: Requires navigation and interaction
- **Automated workflows**: Tasks requiring clicks, inputs, and page transitions

## ❌ INCORRECT Use Cases

**Use other tools instead:**
- **Simple web searches** → Use `WebSearch` or `WebFetch`
- **Reading static pages** → Use `WebFetch`
- **Single-step retrieval** → Use `WebFetch`
- **Tasks without browser interaction** → Use appropriate tools

## How It Works

agent-browse uses **Stagehand** (AI browser automation framework) to execute actions autonomously.

**Workflow**:
1. Provide natural language instructions describing the multi-step workflow
2. Claude uses Stagehand to execute actions automatically
3. No need to write Playwright/Selenium code - just describe what you want
4. System handles navigation, clicks, inputs, and data extraction

## Example Commands

### Multi-Step Workflows
```
Navigate to the admin panel, create a new user, and verify the confirmation email
```

### Testing Workflows
```
Go through the checkout flow and screenshot each step
```

### Data Collection
```
Find all product listings, filter by price, and export to CSV
```

### Form Automation
```
Fill out the contact form with test data, submit it, and capture the success message
```

## Technical Details

**Framework**: Stagehand (AI-powered browser automation)
**Underlying**: Playwright (headless Chrome)
**Language**: Natural language instructions
**Output**: Screenshots, extracted data, confirmation messages

## When to Choose Other Tools

| Task | Use This Instead |
|------|------------------|
| Google search | `WebSearch` tool |
| Read article/docs | `WebFetch` tool |
| API calls | `Bash(curl:*)` or REST client |
| Local file operations | `Read`, `Write`, `Edit` tools |
| Database queries | `mcp__postgresql__query` |

## Best Practices

1. **Be specific** in natural language instructions
2. **Break down complex tasks** into clear steps
3. **Specify expected outcomes** for verification
4. **Request screenshots** for visual confirmation
5. **Handle errors gracefully** by describing fallback behavior

## Example: QA Testing Local Application

```
Navigate to http://localhost:3000,
click the "Sign Up" button,
fill in the form with:
  - Email: test@example.com
  - Password: TestPass123!
click Submit,
wait for confirmation message,
screenshot the result
```

## Limitations

- **Login requirements**: Must be already authenticated for authenticated workflows
- **CAPTCHAs**: Cannot solve interactive CAPTCHAs
- **Dynamic content**: May have issues with heavy JavaScript frameworks
- **Rate limiting**: Subject to target site's rate limits
- **Local apps**: Best for localhost testing, not production
