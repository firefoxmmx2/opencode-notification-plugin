[🇨🇳 中文](PUBLISH_GUIDE.md) | [🇺🇸 English](PUBLISH_GUIDE.en.md)

# 🚀 Steps to Publish to GitHub

## 1. Create GitHub Repository

1. Visit https://github.com/new
2. Repository name: `opencode-notification-plugin`
3. Description: `OpenCode TUI task completion notification plugin - Send system notifications when tasks complete`
4. Select **Public**
5. **Do NOT** check "Add a README file"
6. Click "Create repository"

## 2. Initialize and Push Code

Execute following commands in project directory:

```bash
cd /tmp/opencode-notification-plugin

# Initialize Git
git init

# Add all files
git add .

# Create commit
git commit -m "Initial commit: OpenCode notification plugin"

# Add remote repository (replace your-username with your GitHub username)
git remote add origin https://github.com/firefoxmmx2/opencode-notification-plugin.git

# Push to GitHub
git push -u origin main
```

## 3. Update Configuration Files

After publishing, remember to update placeholders in following files:

### package.json
```json
{
  "author": "Your Name",  // Change to your nickname
  "repository": {
    "url": "https://github.com/firefoxmmx2/opencode-notification-plugin.git"
  }
}
```

### README.md
- Update all repository URLs to your GitHub repository

### AI_INSTALL.md
- Update download link to:
  ```
  https://raw.githubusercontent.com/YOUR_USERNAME/opencode-notification-plugin/main/dist/index.js
  ```

## 4. Create GitHub Release

1. Visit https://github.com/firefoxmmx2/opencode-notification-plugin/releases/new
2. Tag version: `v1.0.0`
3. Release title: `v1.0.0 - Initial Release`
4. Describe update content
5. Click "Publish release"

## 5. Share with Others

After publishing, you can:

- Share in OpenCode Discord community
- Share usage experience in GitHub Issues
- Add to OpenCode ecosystem

## 6. Ongoing Maintenance

- Regularly check and reply to Issues
- Improve features based on user feedback
- Update documentation and examples
- Release new versions

Happy publishing! 🎉
