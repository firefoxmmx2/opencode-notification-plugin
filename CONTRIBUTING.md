[🇨🇳 中文](CONTRIBUTING.md) | [🇺🇸 English](CONTRIBUTING.en.md)

# 贡献指南

欢迎为 OpenCode Notification Plugin 贡献代码！

## 开发环境设置

1. **Fork 并克隆仓库**
   ```bash
   git clone https://github.com/YOUR_USERNAME/opencode-notification-plugin.git
   cd opencode-notification-plugin
   ```

2. **安装依赖**
   ```bash
   bun install
   ```

3. **本地测试**
   
   将 `src/index.ts` 复制到 OpenCode 插件目录：
   ```bash
   cp src/index.ts ~/.config/opencode/plugins/notification.js
   ```

4. **修改并测试**
   
   修改代码后，重启 OpenCode 进行测试

## 代码风格

- 使用 TypeScript 编写代码
- 遵循 ESLint 规则
- 添加必要的注释
- 保持代码简洁易读

## 提交 PR

1. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **提交更改**
   
   遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：
   ```bash
   git commit -m "feat: 添加 XX 功能"
   # 或
   git commit -m "fix: 修复 XX 问题"
   ```

3. **推送分支**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **创建 Pull Request**
   
   在 GitHub 上创建 PR，填写以下信息：
   - 变更说明
   - 相关 Issue
   - 测试步骤

## 发布流程

1. **更新版本号**
   ```bash
   npm version patch  # 或 minor, major
   ```

2. **创建 Release**
   
   在 GitHub 上创建新的 Release，会自动触发 npm 发布

## 测试清单

提交 PR 前请确保：

- [ ] 代码在 Linux 上测试通过
- [ ] 代码在 macOS 上测试通过（如果可能）
- [ ] 代码在 Windows 上测试通过（如果可能）
- [ ] 更新了相关文档
- [ ] 添加了必要的示例配置

## 问题反馈

遇到问题？请查看：
- [安装指南](INSTALL.md)
- [常见问题](README.md#故障排除)
- [现有 Issue](https://github.com/firefoxmmx2/opencode-notification-plugin/issues)

## 许可证

提交代码即表示你同意将代码以 MIT 许可证发布。
