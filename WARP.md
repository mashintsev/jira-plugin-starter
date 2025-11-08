# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **Jira Data Center plugin starter** template that combines modern backend (Java/Maven) and frontend (React/TypeScript) technologies. It follows Atlassian's plugin development patterns and includes comprehensive tooling for code quality, security, and development efficiency.

## Common Development Commands

### Building

```bash
# Build the entire plugin (backend + frontend)
atlas-package

# Alternative using Maven directly
mvn package

# Build frontend only (from js/ directory)
cd js
pnpm build

# Build frontend in production mode
cd js
pnpm build:prod
```

### Running and Debugging

```bash
# Start Jira in debug mode (port 5005)
atlas-debug

# View Jira logs in real-time
tail -f target/jira/home/log/atlassian-jira.log
```

Debug configuration in IDE:
- Remote JVM Debug
- Host: localhost
- Port: 5005

### Testing and Quality

```bash
# Lint frontend code (auto-fix enabled)
cd js
pnpm lint

# Format backend Java code (runs automatically on compile)
mvn spotless:apply

# Run security vulnerability scan
atlas-mvn org.owasp:dependency-check-maven:check

# Generate dependency tree visualization
atlas-mvn dependency:tree -DoutputType=dot -DoutputFile=maven_dependency_tree.gv
```

### Running Single Tests

This project uses the Atlassian Plugin SDK. To run tests:

```bash
# Run all tests
atlas-unit-test

# Run specific test class
atlas-unit-test -Dtest=YourTestClassName

# Run with Maven (if tests exist)
mvn test -Dtest=YourTestClassName
```

## Architecture Overview

### Plugin Integration Model

This is an **OSGi-based Atlassian plugin** that runs inside Jira's plugin system:

1. **Plugin Loading**: The `atlassian-plugin.xml` declares the plugin metadata and references additional descriptors in `META-INF/plugin-descriptors/`
2. **Dependency Injection**: Uses Spring Scanner (`@Component`, `@ComponentImport`) to autowire services
3. **Module Isolation**: Spring context defined in `META-INF/spring/plugin-context.xml` with `<atlassian-scanner:scan-indexes/>`
4. **Hot Reload**: QuickReload enabled via `quickreload.properties` for faster development iterations

### Backend Architecture (Java/Spring)

**Layered Architecture Pattern:**

```
REST Resources → Services → Repositories → Active Objects (Database)
```

- **REST Layer** (`com.jira.plugins.starter.rest`): JAX-RS resources exposing REST APIs at `/rest/starter/1.0/*`
- **Service Layer** (`com.jira.plugins.starter.service`): Business logic components annotated with `@Component`
- **Repository Layer** (`com.jira.plugins.starter.repository`): Data access using Active Objects ORM
- **Model Layer** (`com.jira.plugins.starter.model`): Active Objects entities (database tables)
- **Web Layer** (`com.jira.plugins.starter.web`):
  - `action/`: Jira WebActions (server-side page controllers)
  - `condition/`: Jira WebConditions (conditional UI rendering)
  - `filter/`: Servlet filters
  - `servlet/`: Custom servlets

**Key Patterns:**

- **Active Objects ORM**: Entity classes extend `Entity` interface, declared in `atlassian-plugin.xml` `<ao>` section
- **Component Scanning**: `@Component` for plugin services, `@ComponentImport` for Jira platform services
- **Transaction Management**: All database operations wrapped in `ao.executeInTransaction()`
- **Null Safety**: NullAway + JetBrains `@Nullable` annotations enforce compile-time null checking

### Frontend Architecture (React/TypeScript)

**Build Pipeline:**

```
TypeScript/React → Babel → Webpack → WRM Plugin → Jira Web Resources
```

- **Entry Points**: Defined in `webpack.config.cjs` (e.g., `settings-app`)
- **Build Output**: Goes to `target/classes/webpack_bundles/`
- **Web Resource Management**: `atlassian-webresource-webpack-plugin` generates `wr-webpack-bundles.xml` descriptor
- **CSS-in-JS**: Uses `@compiled/react` with Atlaskit design tokens
- **Code Splitting**: Webpack splits chunks with shared `commons` bundle and `manifest` runtime

**Key Technologies:**

- **Compiled React**: Atlassian's CSS-in-JS solution (replaces styled-components/emotion)
- **TanStack Query**: State management and server data caching
- **WRM React i18n**: Internationalization integrated with Jira's i18n system
- **Atlaskit**: Official Atlassian component library

**Frontend-Backend Integration:**

- REST APIs consumed via `ky` HTTP client
- Jira context accessed through `JIRA` and `AJS` globals (marked as Webpack externals)
- i18n properties from `src/main/resources/com/jira/plugins/starter/i18n.properties`

### Code Quality Tools

**Backend:**

- **Spotless**: Google Java Format, runs on compile phase (`mvn spotless:apply` to format)
- **Error Prone**: Static analysis at compile time
- **NullAway**: Null pointer dereference detection (configured for `com.jira.plugins` package)
- **Lombok**: Reduces boilerplate with `@Getter`, `@Setter`, `@Slf4j` annotations

**Frontend:**

- **ESLint**: XO + XO-React + XO-TypeScript configs with security and Atlaskit plugins
- **TypeScript Strict Mode**: Enabled in `tsconfig.json`
- **Compiled Plugin**: Validates CSS-in-JS patterns

### Important Configuration Files

- **pom.xml**: Maven build, dependencies, AMPS configuration (Jira version, JVM args, plugin key)
- **atlassian-plugin.xml**: Main plugin descriptor (metadata, i18n, REST path, Active Objects entities)
- **META-INF/plugin-descriptors/**: Modular descriptors for web actions, custom fields, etc.
- **META-INF/spring/plugin-context.xml**: Spring context with scanner configuration
- **quickreload.properties**: QuickReload configuration for hot reload during development
- **js/webpack.config.cjs**: Frontend build configuration with WRM integration
- **js/wrm-dependencies.cjs**: Web Resource Manager dependency mapping

## Development Notes

### Java Version Management

- Project uses **Java 17** (defined in `.java-version`)
- Use `jenv` if managing multiple JDK versions

### Maven vs Atlas Commands

- **Prefer `atlas-*` commands** during development (they include Atlassian's settings)
- Use `mvn` directly only when needed (e.g., CI/CD pipelines)

### Plugin Key Consistency

- Plugin key: `com.jira.plugins.jira-plugin-starter`
- Must match across `pom.xml`, `webpack.config.cjs`, and `package.json`

### Active Objects Pattern

When creating new entities:
1. Create entity class in `com.jira.plugins.starter.model`
2. Add `<entity>` declaration to `atlassian-plugin.xml` `<ao>` section
3. Create repository in `repository/` package
4. All operations must be in `ao.executeInTransaction()`

### Spring Component Registration

- Use `@Component` for plugin-provided services
- Use `@ComponentImport` when injecting Atlassian platform services (e.g., `ActiveObjects`, `TemplateRenderer`)
- Constructor injection is preferred over field injection

### Web Resource Dependencies

- External dependencies (React, etc.) declared in `js/wrm-dependencies.cjs`
- Jira provides jQuery, AJS, and other globals (don't bundle them)
- Use Webpack externals for Jira-provided libraries

### Security Best Practices

- OWASP dependency check configured with Atlassian's suppression file
- Fails build on CVSS score ≥ 8
- NullAway prevents null pointer exceptions at compile time
- Error Prone catches common bugs during compilation

### Velocity Templates

- Located in `src/main/resources/com/jira/plugins/starter/templates/`
- Configure allowlist in `atlassian-plugin.xml` `<velocity-allowlist>` section
- See: https://developer.atlassian.com/server/framework/atlassian-sdk/configuring-the-velocity-allowlist/

## Troubleshooting

### Build Issues

- Ensure Atlassian SDK is installed: `atlas-version`
- Check Java version: `java -version` (should be 17)
- Clear Maven cache: `rm -rf ~/.m2/repository/com/atlassian`

### Frontend Build Issues

- Clear webpack cache: `rm -rf js/node_modules/.cache`
- Reinstall dependencies: `cd js && rm -rf node_modules pnpm-lock.yaml && pnpm install`
- Check webpack output directory exists: `ls -la target/classes/webpack_bundles`

### QuickReload Not Working

- Verify `quickreload.properties` points to correct paths
- Ensure `enableQuickReload` is `true` in `pom.xml` jira-maven-plugin config
- Frontend changes require webpack watch mode: `cd js && pnpm build` (runs in watch mode in development)

## Resources

- [Atlassian Plugin SDK Tutorials](https://developer.atlassian.com/server/framework/atlassian-sdk/tutorials-and-guides/)
- [Spring Java Config](https://developer.atlassian.com/server/framework/atlassian-sdk/spring-java-config/)
- [Velocity Allowlist Configuration](https://developer.atlassian.com/server/framework/atlassian-sdk/configuring-the-velocity-allowlist/)
- [ESLint Configuration Details](js/ESLINT.md)
