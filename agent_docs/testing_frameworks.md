# Testing Frameworks Guide

## Python Testing

### pytest (recommended)

**Run all tests:**
```bash
uv run pytest
```

**Run specific test file:**
```bash
uv run pytest tests/test_file.py
```

**Run specific test:**
```bash
uv run pytest tests/test_file.py::test_function_name
```

**Run with coverage:**
```bash
uv run pytest --cov=src --cov-report=html
```

**Run with verbose output:**
```bash
uv run pytest -v
```

**Using Makefile (if exists):**
```bash
make test
```

### unittest

**Run all tests:**
```bash
python3 -m unittest discover
```

**Run specific test module:**
```bash
python3 -m unittest tests.test_module
```

## Node.js / JavaScript Testing

### npm test

**Run all tests:**
```bash
npm test
```

**Run tests in watch mode:**
```bash
npm test -- --watch
```

**Run specific test file:**
```bash
npm test -- path/to/test.js
```

### TypeScript with tsx

**Run TypeScript tests:**
```bash
npx tsx test.ts
```

**Run with Node flags:**
```bash
npx tsx --test test.ts
```

### Vitest (for Svelte/web-ui)

**Run all tests:**
```bash
npm run test
```

**Run tests in watch mode:**
```bash
npm run test:watch
```

**Run with UI:**
```bash
npm run test:ui
```

**Run with coverage:**
```bash
npm run test:coverage
```

## Go Testing

### go test

**Run all tests:**
```bash
go test ./...
```

**Run with verbose output:**
```bash
go test -v ./...
```

**Run specific package:**
```bash
go test ./pkg/packagename
```

**Run with coverage:**
```bash
go test -cover ./...
```

**Run benchmarks:**
```bash
go test -bench=. ./...
```

## Web UI Specific (SvelteKit)

Located in `web-ui/` directory.

### Type Checking
```bash
npm run check
```

### Linting
```bash
npm run lint
```

### Build (validates everything)
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Full Validation Pipeline
```bash
# Run all checks
npm run check && npm run lint && npm run build
```

## Testing Best Practices

### Before Committing
1. Run tests: `npm test` or `uv run pytest`
2. Run type checks: `npm run check` (TypeScript)
3. Run linter: `npm run lint`
4. Build project: `npm run build`

### Test-Driven Development
1. Write failing test
2. Implement feature
3. Run tests until passing
4. Refactor
5. Run tests again

### Coverage Guidelines
- Aim for >80% coverage on critical paths
- 100% coverage on data transformations
- Focus on edge cases and error handling

## Common Testing Commands by Project

### Python Projects (MCP servers, scripts)
```bash
cd mcps/server-name/
uv run pytest
```

### Web UI (SvelteKit)
```bash
cd web-ui/
npm run check    # TypeScript
npm run lint     # ESLint
npm test         # Unit tests
npm run build    # Integration
```

### Custom MCP Servers
```bash
cd mcps/server-name/
npm test         # If Node.js
uv run pytest    # If Python
```

## Continuous Integration

### Pre-Push Checklist
- [ ] All tests pass
- [ ] Type checking passes
- [ ] Linting passes
- [ ] Build succeeds
- [ ] No console errors

### Git Hooks (if configured)
Pre-commit hooks may run automatically:
- Linting
- Type checking
- Unit tests

## Debugging Tests

### Python pytest
```bash
# Run with print statements visible
uv run pytest -s

# Drop into debugger on failure
uv run pytest --pdb

# Run last failed tests only
uv run pytest --lf
```

### Node.js / JavaScript
```bash
# Run with debugging
node --inspect-brk node_modules/.bin/jest

# Run with verbose logging
npm test -- --verbose
```

### Go tests
```bash
# Run with verbose output
go test -v ./...

# Run specific test with logs
go test -v -run TestFunctionName ./pkg/packagename
```

## Test Files Location

### Python
```
tests/
  ├── __init__.py
  ├── test_module.py
  └── test_integration.py
```

### JavaScript/TypeScript
```
src/
  ├── component.ts
  └── component.test.ts

# Or separate directory
tests/
  └── component.test.ts
```

### Go
```
pkg/
  ├── module.go
  └── module_test.go
```

## Performance Testing

### Python (pytest-benchmark)
```bash
uv run pytest --benchmark-only
```

### Node.js (benchmark.js or Vitest)
```bash
npm run benchmark
```

### Go (built-in)
```bash
go test -bench=. ./...
```

## Integration Testing

### Database Tests
```bash
# Ensure test database is running
# Run integration tests
uv run pytest -m integration
```

### API Tests
```bash
# Start local server
npm run dev

# Run API tests
npm run test:api
```

## Snapshot Testing

### Vitest/Jest
```bash
# Update snapshots
npm test -- -u

# Run snapshot tests
npm test
```

## Watch Mode for Development

### Python
```bash
uv run pytest-watch
```

### JavaScript
```bash
npm test -- --watch
```

### TypeScript
```bash
npm run check -- --watch
```
