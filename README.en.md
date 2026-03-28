[🇨🇳 中文](README.md) | [🇺🇸 English](README.en.md)

# OpenCode Notification Plugin

🔔 Add task completion notifications for OpenCode TUI

## Features

- ✅ Automatic system notifications when tasks complete
- ⚠️ Error notifications when tasks fail
- 🎨 Customizable notification title and content
- 🌍 Multi-language support
- ⚡ Auto-fetch current session title

## System Requirements

- **Linux**: Requires `notify-send` command

### Installing notify-send

Install the appropriate package for your Linux distribution:

**Debian/Ubuntu and derivatives:**
```bash
sudo apt update
sudo apt install libnotify-bin
```

**RHEL/CentOS/Fedora and derivatives:**
```bash
# RHEL/CentOS
sudo yum install libnotify

# Fedora
sudo dnf install libnotify
```

**Arch Linux and derivatives:**
```bash
sudo pacman -S libnotify
```

**openSUSE:**
```bash
sudo zypper install libnotify-tools
```

## Installation

1. Copy the `dist/index.js` file to OpenCode plugin directory:
   ```bash
   cp notification.js ~/.config/opencode/plugins/
   ```

2. Create configuration file `~/.config/opencode/notification.json`:
   ```json
   {
     "enabled": true,
     "templates": {
       "idle": {
         "title": "OpenCode",
         "message": "{sessionTitle} - Task completed!"
       },
       "error": {
         "title": "OpenCode",
         "message": "{sessionTitle} - Task failed!",
         "urgency": "critical"
       }
     }
   }
   ```

3. Restart OpenCode TUI

## Configuration

Configuration file location: `~/.config/opencode/notification.json`

### Configuration Options

```json
{
  "enabled": true,  // Enable notifications
  "templates": {
    "idle": {
      "title": "OpenCode",           // Notification title
      "message": "{sessionTitle} - Task completed!",  // Notification content
      "urgency": "normal"            // Notification priority: normal, low, critical
    },
    "error": {
      "title": "OpenCode",
      "message": "{sessionTitle} - Task failed!",
      "urgency": "critical"
    }
  }
}
```

### Available Variables

| Variable | Description |
|----------|-------------|
| `{sessionTitle}` | Current session title |

### Custom Examples

#### Example 1: Minimal Style
```json
{
  "enabled": true,
  "templates": {
    "idle": {
      "title": "✅ Done",
      "message": "{sessionTitle}"
    },
    "error": {
      "title": "❌ Error",
      "message": "{sessionTitle}",
      "urgency": "critical"
    }
  }
}
```

#### Example 2: Detailed Style
```json
{
  "enabled": true,
  "templates": {
    "idle": {
      "title": "🎉 OpenCode Task Completed",
      "message": "Session \"{sessionTitle}\" completed successfully!"
    },
    "error": {
      "title": "⚠️ OpenCode Task Failed",
      "message": "Session \"{sessionTitle}\" encountered an error",
      "urgency": "critical"
    }
  }
}
```

#### Example 3: Chinese Notifications
```json
{
  "enabled": true,
  "templates": {
    "idle": {
      "title": "OpenCode",
      "message": "{sessionTitle} - 任务完成!"
    },
    "error": {
      "title": "OpenCode Error",
      "message": "{sessionTitle} - 任务出错!",
      "urgency": "critical"
    }
  }
}
```

## Disable Notifications

Temporarily disable notifications:

```json
{
  "enabled": false,
  "templates": {
    // ...
  }
}
```

## Notification Priority

- `low`: Low priority, won't disturb users
- `normal`: Normal priority (default)
- `critical`: High priority, prominent display

## Troubleshooting

### Notifications Not Showing

1. **Check system notification settings**
   ```bash
   # Test if notify-send works
   notify-send "Test Notification" "If you can see this, the system is working"
   ```

2. **Check plugin logs**
   ```bash
   tail -100 ~/.local/share/opencode/log/*.log | grep "notification"
   ```

3. **Confirm plugin is loaded**
   Check OpenCode startup logs to confirm the plugin is loaded

## Development

### Local Development Testing

1. Clone the repository
   ```bash
   git clone https://github.com/firefoxmmx2/opencode-notification-plugin.git
   cd opencode-notification-plugin
   ```

2. Install dependencies
   ```bash
   bun install
   ```

3. Build
   ```bash
   bun run build
   ```

4. Copy generated `dist/index.js` to `~/.config/opencode/plugins/` for testing

## Publishing

```bash
# Update version in package.json
npm version patch  # or minor, major

# Build
bun run build

# Push to GitHub
git push origin main
```

## Contributing

Issues and Pull Requests are welcome!

## License

MIT License

## Related Links

- [OpenCode Official Docs](https://opencode.ai)
- [OpenCode GitHub Repo](https://github.com/anomalyco/opencode)
- [OpenCode Plugin Docs](https://opencode.ai/docs/plugins/)
