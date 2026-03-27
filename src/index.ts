/**
 * OpenCode Notification Plugin
 * 在任务完成后发送系统通知
 * 
 * @see https://github.com/firefoxmmx2/opencode-notification-plugin
 */
import { readFileSync } from "fs";
import { join } from "path";

export const NotificationPlugin = async ({ project, client, $, directory, worktree }) => {
  
  // 检测操作系统
  const isMacOS = process.platform === "darwin";
  const isWindows = process.platform === "win32";
  
  // 读取通知配置
  const loadNotificationConfig = () => {
    try {
      const configPath = join(process.env.HOME || process.env.USERPROFILE || "~", ".config/opencode/notification.json");
      const config = JSON.parse(readFileSync(configPath, "utf-8"));
      return config;
    } catch (e) {
      // 如果配置文件不存在，使用默认配置
      return {
        enabled: true,
        templates: {
          idle: {
            title: "OpenCode",
            message: "{sessionTitle} - 任务完成!",
          },
          error: {
            title: "OpenCode",
            message: "{sessionTitle} - 任务出错!",
            urgency: "critical",
          },
        },
      };
    }
  }
  
  // 替换模板中的变量
  const renderTemplate = (template, variables) => {
    let result = template;
    for (const [key, value] of Object.entries(variables)) {
      result = result.replace(new RegExp(`\\{${key}\\}`, "g"), value || "");
    }
    return result;
  }
  
  // 获取会话标题
  const getSessionTitle = async (sessionID) => {
    try {
      if (!sessionID) {
        return "任务";
      }
      
      const result = await client.session.get({ path: { id: sessionID } });
      return result.data?.title || "任务";
    } catch (e) {
      return "任务";
    }
  }
  
  // 发送 macOS 通知
  const sendMacNotification = async (title, message) => {
    const escapedTitle = title.replace(/"/g, '\\"');
    const escapedMessage = message.replace(/"/g, '\\"');
    await $`osascript -e 'display notification "${escapedMessage}" with title "${escapedTitle}"'`;
  }
  
  // 发送 Windows 通知
  const sendWindowsNotification = async (title, message) => {
    // 使用 PowerShell 发送通知
    const script = `
      [Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] > $null
      [Windows.Data.Xml.Dom.XmlDocument, Windows.Data.Xml.Dom.XmlDocument, ContentType = WindowsRuntime] > $null
      $template = @"
      <toast>
        <visual>
          <binding template="ToastText02">
            <text id="1">${title}</text>
            <text id="2">${message}</text>
          </binding>
        </visual>
      </toast>
"@
      $xml = New-Object Windows.Data.Xml.Dom.XmlDocument
      $xml.LoadXml($template)
      $toast = [Windows.UI.Notifications.ToastNotification]::new($xml)
      [Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier("OpenCode").Show($toast)
    `;
    await $`powershell -Command "${script}"`;
  }
  
  // 发送 Linux 通知
  const sendLinuxNotification = async (title, message, urgency = "normal") => {
    try {
      const cmd = `notify-send --urgency=${urgency} "${title}" "${message}"`;
      await $`bash -c ${cmd}`;
    } catch (error) {
      // 备用方案：使用 dbus-send
      try {
        await $`dbus-send --type=method_call --dest=org.freedesktop.Notifications /org/freedesktop/Notifications org.freedesktop.Notifications.Notify string:"opencode" uint32:0 string:"" string:"${title}" string:"${message}" array: dict_entry:string:string: dict_entry:string:string: int32:-1`;
      } catch (e) {
        // 通知发送失败时静默处理
      }
    }
  }
  
  // 发送通知（跨平台）
  const sendNotification = async (title, message, urgency = "normal") => {
    if (isMacOS) {
      await sendMacNotification(title, message);
    } else if (isWindows) {
      await sendWindowsNotification(title, message);
    } else {
      await sendLinuxNotification(title, message, urgency);
    }
  }
  
  return {
    event: async ({ event }) => {
      const config = loadNotificationConfig();
      
      // 检查是否启用通知
      if (config.enabled === false) {
        return;
      }
      
      // 会话完成/空闲时发送通知
      if (event.type === "session.idle") {
        const sessionID = event.properties?.sessionID;
        const sessionTitle = await getSessionTitle(sessionID);
        const template = config.templates?.idle || {};
        
        const title = renderTemplate(template.title || "OpenCode", { sessionTitle });
        const message = renderTemplate(template.message || "{sessionTitle} - 任务完成!", { sessionTitle });
        const urgency = template.urgency || "normal";
        
        await sendNotification(title, message, urgency);
      }
      
      // 会话出错时发送通知
      if (event.type === "session.error") {
        const sessionID = event.properties?.sessionID;
        const sessionTitle = await getSessionTitle(sessionID);
        const template = config.templates?.error || {};
        
        const title = renderTemplate(template.title || "OpenCode", { sessionTitle });
        const message = renderTemplate(template.message || "{sessionTitle} - 任务出错!", { sessionTitle });
        const urgency = template.urgency || "critical";
        
        await sendNotification(title, message, urgency);
      }
    },
  }
}
