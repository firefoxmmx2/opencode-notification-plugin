[🇨🇳 中文](AI_INSTALL.md) | [🇺🇸 English](AI_INSTALL.en.md)

# AI Assistant Installation Guide

This guide is for AI assistants to help users install the OpenCode Notification Plugin.

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

## Quick Installation Command

Directly execute following command to complete installation:

```bash
# Create plugin directory (if doesn't exist)
mkdir -p ~/.config/opencode/plugins

# Download plugin file (using built dist/index.js)
curl -o ~/.config/opencode/plugins/notification.js https://raw.githubusercontent.com/firefoxmmx2/opencode-notification-plugin/main/dist/index.js

# Create configuration file
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

echo "Installation complete! Please restart OpenCode"
```

## Test Notification

```bash
# Test on Linux
notify-send "Plugin Installation Test" "If you can see this, the notification system is working"

# Test on macOS
osascript -e 'display notification "If you can see this notification, the system is working" with title "Plugin Installation Test"'
```

## Verification Steps

After installation, help user verify:

1. **Restart OpenCode**
   ```bash
   # Tell user to exit current session
   # Then restart
   opencode
   ```

2. **Test Notification**
   
   Let user execute a simple task to test if notification works

3. **Check Installation**
   ```bash
   # Check if plugin file exists
   ls -la ~/.config/opencode/plugins/notification.js
   
   # Check if configuration file exists
   cat ~/.config/opencode/notification.json
   ```

## Common Issues

### Issue 1: Plugin File Not Found

**Solution:**
```bash
# Redownload plugin file
curl -o ~/.config/opencode/plugins/notification.js https://raw.githubusercontent.com/firefoxmmx2/opencode-notification-plugin/main/src/index.ts
```

### Issue 2: Configuration File Syntax Error

**Solution:**
```bash
# Validate JSON syntax
cat ~/.config/opencode/notification.json | jq .

# If error, recreate configuration file
```

### Issue 3: Notifications Not Working

**Solution:**
1. Check if system notifications work:
   ```bash
   # On Linux
   notify-send "Test" "Test notification"
   
   # On macOS
   osascript -e 'display notification "Test" with title "Test notification"'
   ```

2. Check plugin logs:
   ```bash
   tail -100 ~/.local/share/opencode/log/*.log | grep "notification"
   ```

## Configuration Customization

If user wants to customize notifications, help them modify `~/.config/opencode/notification.json`:

### Change Notification Title
```json
{
  "templates": {
    "idle": {
      "title": "Custom Title"
    }
  }
}
```

### Change Notification Content
```json
{
  "templates": {
    "idle": {
      "message": "Custom content, {sessionTitle} variable can be used"
    }
  }
}
```

### Disable Notifications
```json
{
  "enabled": false
}
```

## Uninstallation

If user wants to uninstall:

```bash
# Remove plugin file
rm ~/.config/opencode/plugins/notification.js

# Remove configuration file (optional)
rm ~/.config/opencode/notification.json

echo "Uninstallation complete! Please restart OpenCode"
```

## Related Links

- [Plugin Repository](https://github.com/firefoxmmx2/opencode-notification-plugin)
- [Detailed Documentation](README.md)
- [Configuration Examples](example/)
