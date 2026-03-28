# OpenCode Notification Plugin

🔔 为 OpenCode TUI 添加任务完成通知功能

## 功能特性

- ✅ 任务完成时自动发送系统通知
- ⚠️ 任务出错时发送错误通知
- 🎨 可自定义通知标题和内容
- 🌍 支持中文通知
- ⚡ 自动获取当前会话标题

## 系统要求

- **Linux**: 需要 `notify-send` 命令（大多数桌面环境已预装）

## 安装方法

1. 将 `dist/index.js` 文件复制到 OpenCode 插件目录：
   ```bash
   cp notification.js ~/.config/opencode/plugins/
   ```

2. 创建配置文件 `~/.config/opencode/notification.json`：
   ```json
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
   ```

3. 重启 OpenCode TUI

## 配置说明

配置文件位于 `~/.config/opencode/notification.json`

### 配置选项

```json
{
  "enabled": true,  // 是否启用通知
  "templates": {
    "idle": {
      "title": "OpenCode",           // 通知标题
      "message": "{sessionTitle} - 任务完成!",  // 通知内容
      "urgency": "normal"            // 通知优先级：normal, low, critical
    },
    "error": {
      "title": "OpenCode",
      "message": "{sessionTitle} - 任务出错!",
      "urgency": "critical"
    }
  }
}
```

### 可用变量

| 变量 | 说明 |
|------|------|
| `{sessionTitle}` | 当前会话的标题 |

### 自定义示例

#### 示例 1：简洁风格
```json
{
  "enabled": true,
  "templates": {
    "idle": {
      "title": "✅ 完成",
      "message": "{sessionTitle}"
    },
    "error": {
      "title": "❌ 错误",
      "message": "{sessionTitle}",
      "urgency": "critical"
    }
  }
}
```

#### 示例 2：详细风格
```json
{
  "enabled": true,
  "templates": {
    "idle": {
      "title": "🎉 OpenCode 任务完成",
      "message": "会话「{sessionTitle}」已成功完成，请查看结果！"
    },
    "error": {
      "title": "⚠️ OpenCode 任务失败",
      "message": "会话「{sessionTitle}」执行过程中遇到错误",
      "urgency": "critical"
    }
  }
}
```

#### 示例 3：英文通知
```json
{
  "enabled": true,
  "templates": {
    "idle": {
      "title": "OpenCode",
      "message": "Task completed: {sessionTitle}"
    },
    "error": {
      "title": "OpenCode Error",
      "message": "Task failed: {sessionTitle}",
      "urgency": "critical"
    }
  }
}
```

## 禁用通知

临时禁用通知功能：

```json
{
  "enabled": false,
  "templates": {
    // ...
  }
}
```

## 通知优先级

- `low`: 低优先级，不会打扰用户
- `normal`: 普通优先级（默认）
- `critical`: 高优先级，会显示醒目提示

## 故障排除

### 通知不显示

1. **检查系统通知设置**
   ```bash
   # 测试 notify-send 是否正常工作
   notify-send "测试通知" "如果能看到这个说明通知系统正常"
   ```

2. **检查插件日志**
   ```bash
   tail -100 ~/.local/share/opencode/log/*.log | grep "notification"
   ```

3. **确认插件已加载**
   查看 OpenCode 启动日志，确认插件成功加载

## 开发

### 本地开发测试

1. 克隆仓库
   ```bash
   git clone https://github.com/firefoxmmx2/opencode-notification-plugin.git
   cd opencode-notification-plugin
   ```

2. 安装依赖
   ```bash
   bun install
   ```

3. 构建
   ```bash
   bun run build
   ```

4. 将生成的 `dist/index.js` 复制到 `~/.config/opencode/plugins/` 进行测试

## 发布

```bash
# 更新 package.json 中的版本号
npm version patch  # 或 minor, major

# 构建
bun run build

# 发布到 GitHub
git push origin main
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

## 相关链接

- [OpenCode 官方文档](https://opencode.ai)
- [OpenCode GitHub 仓库](https://github.com/anomalyco/opencode)
- [OpenCode 插件文档](https://opencode.ai/docs/plugins/)
