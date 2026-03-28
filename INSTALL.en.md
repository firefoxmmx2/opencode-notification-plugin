[🇨🇳 中文](INSTALL.md) | [🇺🇸 English](INSTALL.en.md)

# OpenCode Notification Plugin Installation Guide

## System Requirements

- **macOS**: No additional installation required (uses built-in `osascript`)
- **Linux**: Requires `notify-send` command
- **Windows**: No additional installation required (uses PowerShell)

### Installing notify-send (Linux only)

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

## Quick Start

1. **Edit Configuration File**
   
   Open `~/.config/opencode/opencode.json` and add plugin configuration:

   ```json
   {
     "$schema": "https://opencode.ai/config.json",
     "plugin": ["opencode-notification-plugin"]
   }
   ```

2. **Create Notification Configuration File**
   
   Create `~/.config/opencode/notification.json`:

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

3. **Restart OpenCode**
   
   ```bash
   # Exit current OpenCode session
   /exit
   
   # Restart
   opencode
   ```

## Installation Methods

1. **Build the project**
   
   ```bash
   bun run build
   ```

2. **Copy Plugin to OpenCode Plugin Directory**
   
   ```bash
   cp dist/index.js ~/.config/opencode/plugins/notification.js
   ```

3. **Create Configuration File**
   
   ```bash
   cat > ~/.config/opencode/notification.json << 'EOF'
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
   EOF
   ```

4. **Restart OpenCode**

## Verify Installation

1. **Start OpenCode**
   ```bash
   opencode
   ```

2. **Execute a Simple Task**
   ```
   Create a test file for me
   ```

3. **Wait for Task Completion**
   
   You should receive a system notification after the task completes

4. **Check Logs** (if notifications don't show)
   ```bash
   tail -100 ~/.local/share/opencode/log/*.log | grep "notification"
   ```

## Configuration Options

### Enable/Disable Notifications

```json
{
  "enabled": true  // or false to disable
}
```

### Customize Notification Content

```json
{
  "templates": {
    "idle": {
      "title": "Your notification title",
      "message": "Your notification content, {sessionTitle} variable can be used"
    }
  }
}
```

### Notification Priority

- `low` - Low priority
- `normal` - Normal priority (default)
- `critical` - High priority

## FAQ

### Q: Notifications not showing?

**A:** Follow these steps to troubleshoot:

1. Check if system notifications work
   ```bash
   notify-send "Test" "Test notification"
   ```

2. Check if plugin is loaded
   ```bash
   grep "notification" ~/.local/share/opencode/log/*.log
   ```

3. Check if configuration file syntax is correct
   ```bash
   cat ~/.config/opencode/notification.json | jq .
   ```

### Q: Can I only receive error notifications?

**A:** Yes, set completion notification template to empty:

```json
{
  "templates": {
    "idle": {
      "title": "",
      "message": ""
    },
    "error": {
      "title": "Error",
      "message": "{sessionTitle} failed",
      "urgency": "critical"
    }
  }
}
```

### Q: How to customize notification sound?

**A:** This depends on your system's notification settings. Configure notification sounds in your desktop environment's system settings.

## Advanced Configuration

### Different Notification Styles for Different Scenarios

```json
{
  "templates": {
    "idle": {
      "title": "✅ Task Completed",
      "message": "Session: {sessionTitle}",
      "urgency": "normal"
    },
    "error": {
      "title": "❌ Task Failed",
      "message": "Error in session: {sessionTitle}",
      "urgency": "critical"
    }
  }
}
```

## Uninstallation

1. Remove plugin file:
   ```bash
   rm ~/.config/opencode/plugins/notification.js
   ```

2. Remove configuration file:
   ```bash
   rm ~/.config/opencode/notification.json
   ```

3. Restart OpenCode

## Support

- [README](README.md)
- [Contributing Guide](CONTRIBUTING.md)
- [GitHub Issues](https://github.com/firefoxmmx2/opencode-notification-plugin/issues)
