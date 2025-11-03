# ESLint Configuration

This project uses ESLint with the modern flat config format (eslint.config.js) to ensure code quality and consistency.

## Configuration Overview

The ESLint setup includes multiple plugins and configurations optimized for a Jira plugin with React, TypeScript, and Atlassian Design System components.

### Plugins and Configurations

1. **XO TypeScript** (`eslint-config-xo-typescript`)
   - Provides strict TypeScript linting rules
   - Enforces best practices for TypeScript code

2. **XO React** (`eslint-config-xo-react`)
   - React-specific linting rules
   - Enforces React best practices and patterns

3. **TanStack Query** (`@tanstack/eslint-plugin-query`)
   - Ensures best practices for React Query usage
   - Catches common mistakes in query hooks

4. **Compiled** (`@compiled/eslint-plugin`)
   - Ensures proper usage of `@compiled/react`
   - Validates CSS-in-JS syntax and patterns

5. **Security** (`eslint-plugin-security`)
   - Catches common security issues
   - Helps prevent security vulnerabilities

6. **Atlaskit Design System** (`@atlaskit/eslint-plugin-design-system`)
   - Enforces Atlassian Design System patterns
   - Ensures proper component usage

7. **Atlaskit UI Styling Standard** (`@atlaskit/eslint-plugin-ui-styling-standard`)
   - Enforces styling standards for Atlaskit components
   - Validates design token usage

8. **Prettier** (`eslint-plugin-prettier`)
   - Integrates Prettier for code formatting
   - Must be last to override formatting rules

## Key Features

### Ignored Files and Directories

The following are excluded from linting:
- `src/jira.d.ts` - Type definitions
- `dist/` - Build output
- `node_modules/` - Dependencies
- `**/*.config.js/cjs/mjs` - Configuration files
- `coverage/` - Test coverage reports
- `build/` - Build artifacts
- `tsconfig.json` - TypeScript config

### Custom Rules

- **react/react-in-jsx-scope**: Disabled (React 18+ doesn't require React import)

### Inherited Rules from XO TypeScript

The XO TypeScript configuration provides several useful defaults:
- **@typescript-eslint/no-unused-vars**: Allows variables starting with underscore
  - Useful for intentionally unused parameters (e.g., `_event`, `_unused`)
  - Pattern: `^_` for args, vars, and caught errors

### Language Options

- **ECMAVersion**: `2024` - Enables ECMAScript 2024 features for consistent behavior
- **Source Type**: `module` - ES modules
- **JSX Support**: Automatically enabled for `.tsx` files by TypeScript parser
- **TypeScript Project**: Linked to `./tsconfig.json`

## Usage

### Lint Code

```bash
pnpm lint
```

This command will:
- Check all `.js`, `.ts`, and `.tsx` files
- Automatically fix issues where possible
- Report any remaining issues

### Lint Without Auto-fix

```bash
pnpm eslint 'src/**/*.{ts,tsx}'
```

### Lint Specific Files

```bash
pnpm eslint src/settings-app/App.tsx
```

## Best Practices

1. **Run linting before commits** - Ensure code quality before committing
2. **Fix warnings and errors** - Don't ignore linting issues
3. **Use underscore prefix** - For intentionally unused variables (e.g., `_props`)
4. **Follow TypeScript strict mode** - Enabled via tsconfig.json
5. **Security checks** - Pay attention to security plugin warnings

## Configuration Files

- `eslint.config.js` - Main ESLint configuration (flat config format)
- `tsconfig.json` - TypeScript configuration used by ESLint
- `.gitignore` - Excludes linting artifacts

## Troubleshooting

### ESLint Not Finding Files

Ensure your glob patterns in package.json scripts are correct:
```json
"lint": "eslint '*/**/*.{js,ts,tsx}' --fix"
```

### TypeScript Parsing Errors

Check that:
1. `tsconfig.json` is valid
2. TypeScript files are included in the config
3. Parser options reference the correct tsconfig path

### Plugin Conflicts

The configuration order matters. Prettier must be last to override formatting rules from other plugins.

## Migration Notes

This project has migrated from the legacy `.eslintrc` format to the modern flat config format (`eslint.config.js`). The old `eslintConfig` section in `package.json` has been removed to avoid conflicts.

## Further Reading

- [ESLint Flat Config Documentation](https://eslint.org/docs/latest/use/configure/configuration-files-new)
- [XO Style Guide](https://github.com/xojs/xo)
- [Atlassian Design System](https://atlassian.design/)
- [TanStack Query Best Practices](https://tanstack.com/query/latest)
