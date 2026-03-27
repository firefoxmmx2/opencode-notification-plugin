# 🚀 发布到 GitHub 的步骤

## 1. 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 仓库名称：`opencode-notification-plugin`
3. 描述：`OpenCode TUI 任务完成通知插件 - 在任务完成后发送系统通知`
4. 选择 **Public**
5. **不要** 勾选 "Add a README file"
6. 点击 "Create repository"

## 2. 初始化并推送代码

在项目目录执行以下命令：

```bash
cd /tmp/opencode-notification-plugin

# 初始化 Git
git init

# 添加所有文件
git add .

# 创建提交
git commit -m "Initial commit: OpenCode notification plugin"

# 添加远程仓库（替换 your-username 为你的 GitHub 用户名）
git remote add origin https://github.com/firefoxmmx2/opencode-notification-plugin.git

# 推送到 GitHub
git push -u origin main
```

## 3. 发布到 npm（可选）

如果想在 npm 上发布包：

```bash
# 登录 npm
npm login

# 测试构建
bun run build

# 发布（会询问是否创建新版本）
npm publish --access public
```

## 4. 更新配置文件

发布后，记得更新以下文件中的占位符：

### package.json
```json
{
  "author": "Your Name",  // 改为你的昵称
  "repository": {
    "url": "https://github.com/firefoxmmx2/opencode-notification-plugin.git"
  }
}
```

### README.md
- 将所有 `your-username` 替换为你的 GitHub 用户名
- 更新安装示例中的仓库 URL

### AI_INSTALL.md
- 将所有 `your-username` 替换为你的 GitHub 用户名

## 5. 创建 GitHub Release

1. 访问 https://github.com/firefoxmmx2/opencode-notification-plugin/releases/new
2. Tag version: `v1.0.0`
3. Release title: `v1.0.0 - Initial Release`
4. 描述更新内容
5. 点击 "Publish release"

## 6. 分享给他人

发布后，你可以：

- 在 OpenCode Discord 社区分享
- 在 GitHub Issues 中分享使用体验
- 添加到 OpenCode 生态系统中

## 项目结构说明

```
opencode-notification-plugin/
├── .github/                    # GitHub 配置
│   ├── ISSUE_TEMPLATE/        # Issue 模板
│   └── workflows/             # GitHub Actions
├── example/                    # 配置示例
│   ├── config.default.json
│   ├── config.simple.json
│   ├── config.detailed.json
│   ├── config.english.json
│   └── README.md
├── scripts/                    # 脚本文件
│   └── publish.sh
├── src/                        # 源代码
│   └── index.ts
├── .gitignore                  # Git 忽略文件
├── AI_INSTALL.md              # AI 安装指南
├── CONTRIBUTING.md            # 贡献指南
├── INSTALL.md                 # 安装指南
├── LICENSE                    # 许可证
├── notification.js            # 可直接使用的插件文件
├── package.json               # npm 包配置
└── README.md                  # 项目说明文档
```

## 快速安装命令

用户可以使用以下命令快速安装：

### Linux/macOS
```bash
# 方法 1: 手动安装
mkdir -p ~/.config/opencode/plugins
curl -o ~/.config/opencode/plugins/notification.js \
  https://raw.githubusercontent.com/firefoxmmx2/opencode-notification-plugin/main/src/index.ts

# 创建配置文件
cat > ~/.config/opencode/notification.json << 'EOF'
{
  "enabled": true,
  "templates": {
    "idle": {
      "title": "OpenCode",
      "message": "{sessionTitle} - 任务完成!"
    },
    "error": {
      "title": "OpenCode",
      "message": "{sessionTitle} - 任务出错!",
      "urgency": "critical"
    }
  }
}
EOF

echo "✅ 安装完成！请重启 OpenCode"
```

## 后续维护

- 定期检查并回复 Issues
- 根据用户反馈改进功能
- 更新文档和示例
- 发布新版本

祝发布顺利！🎉
