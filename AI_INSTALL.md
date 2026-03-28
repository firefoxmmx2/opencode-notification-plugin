[🇨🇳 中文](AI_INSTALL.md) | [🇺🇸 English](AI_INSTALL.en.md)

# AI 助手安装指南

本指南帮助 AI 助手（如 OpenCode、Claude 等）快速安装和配置通知插件。

## 通过 AI 助手安装

### OpenCode

如果你是 AI 助手，请执行以下步骤为用户安装插件：

#### 步骤 1: 创建插件文件

```bash
# 创建插件目录（如果不存在）
mkdir -p ~/.config/opencode/plugins

# 下载插件文件
curl -o ~/.config/opencode/plugins/notification.js \
  https://raw.githubusercontent.com/firefoxmmx2/opencode-notification-plugin/main/src/index.ts
```

#### 步骤 2: 创建配置文件

```bash
# 创建默认配置文件
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
```

#### 步骤 3: 验证安装

```bash
# 检查文件是否存在
ls -la ~/.config/opencode/plugins/notification.js
ls -la ~/.config/opencode/notification.json

# 测试通知系统
notify-send "插件安装测试" "如果您看到这个通知，说明通知系统正常工作"
```

#### 步骤 4: 告知用户

安装完成后，请告诉用户：

> ✅ 通知插件已安装完成！
> 
> 配置文件位于：`~/.config/opencode/notification.json`
> 
> 请重启 OpenCode 以使插件生效：
> ```bash
> # 在 OpenCode 中输入 /exit 退出，然后重新运行 opencode
> ```
> 
> 任务完成后您将收到系统通知！

## 通过 npm 安装

如果用户想通过 npm 安装，编辑 `~/.config/opencode/opencode.json`：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["opencode-notification-plugin"]
}
```

然后创建配置文件 `~/.config/opencode/notification.json`（见上方）。

## 配置文件说明

### 基本配置

```json
{
  "enabled": true  // true 启用通知，false 禁用通知
}
```

### 通知模板

```json
{
  "templates": {
    "idle": {
      "title": "通知标题",
      "message": "通知内容，可使用 {sessionTitle} 变量",
      "urgency": "normal"  // low, normal, critical
    },
    "error": {
      "title": "错误通知标题",
      "message": "错误通知内容",
      "urgency": "critical"
    }
  }
}
```

### 可用变量

- `{sessionTitle}` - 当前会话的标题

## 自定义示例

### 简洁风格

```json
{
  "templates": {
    "idle": {
      "title": "✅",
      "message": "{sessionTitle}"
    },
    "error": {
      "title": "❌",
      "message": "{sessionTitle}",
      "urgency": "critical"
    }
  }
}
```

### 详细风格

```json
{
  "templates": {
    "idle": {
      "title": "🎉 任务完成",
      "message": "会话「{sessionTitle}」已完成，请查看结果"
    },
    "error": {
      "title": "⚠️ 任务失败",
      "message": "会话「{sessionTitle}」执行出错",
      "urgency": "critical"
    }
  }
}
```

### 英文通知

```json
{
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

## 故障排除

### 通知不显示

1. **测试系统通知**
   ```bash
   notify-send "测试" "测试通知"
   ```

2. **检查插件日志**
   ```bash
   tail -100 ~/.local/share/opencode/log/*.log | grep notification
   ```

3. **验证配置文件**
   ```bash
   cat ~/.config/opencode/notification.json | jq .
   ```

### 文件权限问题

```bash
# 确保文件可读
chmod 644 ~/.config/opencode/plugins/notification.js
chmod 644 ~/.config/opencode/notification.json
```

## 卸载

```bash
# 删除插件
rm ~/.config/opencode/plugins/notification.js

# 删除配置
rm ~/.config/opencode/notification.json
```

## 相关资源

- [完整文档](../README.md)
- [安装指南](../INSTALL.md)
- [示例配置](../example/)
- [问题反馈](https://github.com/firefoxmmx2/opencode-notification-plugin/issues)
