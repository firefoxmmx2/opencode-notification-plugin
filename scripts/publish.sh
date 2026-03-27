#!/bin/bash

# 发布脚本
# 用于构建和发布插件到 npm

set -e

echo "🔨 开始构建..."

# 检查是否登录 npm
if ! npm whoami &> /dev/null; then
  echo "❌ 未登录 npm，请先运行 npm login"
  exit 1
fi

# 构建
echo "📦 构建中..."
bun run build

# 检查版本
current_version=$(node -p "require('./package.json').version")
echo "📋 当前版本：$current_version"

# 选择版本更新类型
echo ""
echo "选择版本更新类型:"
echo "1) patch (补丁版本，$current_version -> x.y.(z+1))"
echo "2) minor (次要版本，$current_version -> x.(y+1).0)"
echo "3) major (主要版本，$current_version -> (x+1).0.0)"
read -p "请输入选项 (1/2/3): " choice

case $choice in
  1) version_type="patch" ;;
  2) version_type="minor" ;;
  3) version_type="major" ;;
  *) echo "❌ 无效选项"; exit 1 ;;
esac

# 更新版本
echo "🔄 更新版本..."
npm version $version_type --no-git-tag-version

# 获取新版本
new_version=$(node -p "require('./package.json').version")
echo "✅ 新版本：$new_version"

# Git 提交
echo "📝 提交更改..."
git add package.json
git commit -m "chore: release v$new_version"
git tag "v$new_version"

# 推送到 GitHub
echo "🚀 推送到 GitHub..."
git push origin main
git push origin "v$new_version"

echo ""
echo "✅ 构建完成！"
echo "📦 发布到 npm..."
npm publish --access public

echo ""
echo "🎉 发布成功！"
echo "🔗 https://www.npmjs.com/package/opencode-notification-plugin/v/$new_version"
