[🇨🇳 中文](INSTALL.md) | [🇺🇸 English](INSTALL.en.md)

# OpenCode Notification Plugin 安装指南

## 系统要求

- **Linux**: 需要 `notify-send` 命令（大多数桌面环境已预装）

## 快速开始

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

## 安装方法

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

### Q: 通知不显示怎么办？
