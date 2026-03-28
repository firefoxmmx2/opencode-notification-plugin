[🇨🇳 中文](CONTRIBUTING.md) | [🇺🇸 English](CONTRIBUTING.en.md)

# Contributing Guide

Welcome to contribute to OpenCode Notification Plugin!

## Development Environment Setup

1. **Fork and Clone Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/opencode-notification-plugin.git
   cd opencode-notification-plugin
   ```

2. **Install Dependencies**
   ```bash
   bun install
   ```

3. **Local Testing**
   
   Copy `src/index.ts` to OpenCode plugin directory:
   ```bash
   cp src/index.ts ~/.config/opencode/plugins/notification.js
   ```

4. **Modify and Test**
   
   After modifying code, restart OpenCode for testing

## Code Style

- Use TypeScript
- Follow ESLint rules
- Add necessary comments
- Keep code clean and readable

## Submitting PR

1. **Create Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Commit Changes**
   
   Follow [Conventional Commits](https://www.conventionalcommits.org/) specification:
   ```bash
   git commit -m "feat: add XX feature"
   # or
   git commit -m "fix: fix XX issue"
   ```

3. **Push Branch**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create Pull Request**
   
   Create PR on GitHub with following information:
   - Change description
   - Related Issues
   - Testing steps

## Release Process

1. **Update Version**
   ```bash
   npm version patch  # or minor, major
   ```

2. **Create Release**
   
   Create new Release on GitHub, will automatically trigger npm publish

## Testing Checklist

Before submitting PR, ensure:

- [ ] Code tested on Linux
- [ ] Code tested on macOS (if possible)
- [ ] Code tested on Windows (if possible)
- [ ] Documentation updated
- [ ] Necessary example configurations added

## Issue Reporting

Encountered an issue? Check:
- [Installation Guide](INSTALL.md)
- [FAQ](README.md#troubleshooting)
- [Existing Issues](https://github.com/firefoxmmx2/opencode-notification-plugin/issues)

## License

By submitting code, you agree to publish it under the MIT License.
