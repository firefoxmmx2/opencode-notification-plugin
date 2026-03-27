# OpenCode Notification Plugin 安装指南

## 快速开始

### 方法 1: 使用 npm 包（推荐）

1. **编辑配置文件**
   
   打开 `~/.config/opencode/opencode.json`，添加插件配置：

   ```json
   {
     "$schema": "https://opencode.ai/config.json",
     "plugin": ["opencode-notification-plugin"]
   }
   ```

2. **创建通知配置文件**
   
   创建 `~/.config/opencode/notification.json`：

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

3. **重启 OpenCode**
   
   ```bash
   # 退出当前 OpenCode 会话
   /exit
   
   # 重新启动
   opencode
   ```

### 方法 2: 手动安装插件文件

1. **下载插件文件**
   
   ```bash
   # 克隆仓库
   git clone https://github.com/firefoxmmx2/opencode-notification-plugin.git
   cd opencode-notification-plugin
   
   # 或者直接下载 notification.js 文件
   curl -O https://raw.githubusercontent.com/firefoxmmx2/opencode-notification-plugin/main/src/index.ts
   ```

2. **复制插件到 OpenCode 插件目录**
   
   ```bash
   cp src/index.ts ~/.config/opencode/plugins/notification.js
   ```

3. **创建配置文件**
   
   ```bash
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

4. **重启 OpenCode**

## 验证安装

1. **启动 OpenCode**
   ```bash
   opencode
   ```

2. **执行一个简单任务**
   ```
   帮我创建一个测试文件
   ```

3. **等待任务完成**
   
   任务完成后应该会收到系统通知

4. **检查日志**（如果通知未显示）
   ```bash
   tail -100 ~/.local/share/opencode/log/*.log | grep "notification"
   ```

## 配置选项

### 启用/禁用通知

```json
{
  "enabled": true  // 或 false 禁用通知
}
```

### 自定义通知内容

```json
{
  "templates": {
    "idle": {
      "title": "你的通知标题",
      "message": "你的通知内容，可以使用 {sessionTitle} 变量"
    }
  }
}
```

### 通知优先级

- `low` - 低优先级
- `normal` - 普通优先级（默认）
- `critical` - 高优先级

## 常见问题

### Q: 通知不显示怎么办？

**A:** 按以下步骤排查：

1. 检查系统通知是否正常工作
   ```bash
   notify-send "测试" "测试通知"
   ```

2. 检查插件是否加载
   ```bash
   grep "notification" ~/.local/share/opencode/log/*.log
   ```

3. 检查配置文件语法是否正确
   ```bash
   cat ~/.config/opencode/notification.json | jq .
   ```

### Q: 可以只接收错误通知吗？

**A:** 可以，将完成通知的模板设为空：

```json
{
  "templates": {
    "idle": {
      "title": "",
      "message": ""
    },
    "error": {
      "title": "错误",
      "message": "{sessionTitle} 失败",
      "urgency": "critical"
    }
  }
}
```

### Q: 如何在 macOS 上使用？

**A:** 插件会自动检测 macOS 并使用 `osascript` 发送通知，无需额外配置。

### Q: Windows 支持吗？

**A:** 支持 Windows 10/11，使用 PowerShell 发送 Toast 通知。

## 卸载

### 使用 npm 安装的

从 `opencode.json` 中移除插件配置：

```json
{
  // 删除这一行
  "plugin": ["opencode-notification-plugin"]
}
```

### 手动安装的

```bash
# 删除插件文件
rm ~/.config/opencode/plugins/notification.js

# 删除配置文件
rm ~/.config/opencode/notification.json
```

## 获取帮助

- 查看 [README.md](../README.md) 了解更多功能
- 提交 [Issue](https://github.com/firefoxmmx2/opencode-notification-plugin/issues) 反馈问题
- 查看 [示例配置](../example/) 获取更多配置灵感
