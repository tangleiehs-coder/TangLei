# GitHub 发送文件到聊天界面完全指南

## 一、核心思路

GitHub 本身**不能直接发文件到聊天界面**，但可以通过以下方式实现：

```
GitHub → Webhook/API → 聊天平台
```

**支持的聊天平台：**
- Discord
- Slack
- 飞书 (Feishu/Lark)
- Telegram
- 企业微信

---

## 二、Discord 发文件（最常用）

### 方法1：通过 Webhook 发消息（不能发文件，只能发链接）

```yaml
# .github/workflows/notify-discord.yml
name: Notify Discord

on:
  push:
    branches: [ main ]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      # 生成报告文件
      - name: Generate Report
        run: echo "Build completed" > report.txt
      
      # 上传到 Artifact（GitHub 存储）
      - name: Upload Artifact
        uses: actions/upload-artifact@v4
        with:
          name: build-report
          path: report.txt
      
      # 发消息到 Discord（带下载链接）
      - name: Send to Discord
        uses: tsickert/discord-webhook@v5
        with:
          webhook-url: ${{ secrets.DISCORD_WEBHOOK }}
          content: |
            📄 新构建完成！
            下载报告: https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}
```

### 方法2：直接上传文件到 Discord（需要 Bot Token）

```yaml
name: Send File to Discord

on:
  workflow_dispatch:

jobs:
  send-file:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Create File
        run: echo "This is the report content" > report.txt
      
      - name: Send File via Discord Bot
        env:
          DISCORD_BOT_TOKEN: ${{ secrets.DISCORD_BOT_TOKEN }}
          DISCORD_CHANNEL_ID: ${{ secrets.DISCORD_CHANNEL_ID }}
        run: |
          curl -X POST \
            -H "Authorization: Bot $DISCORD_BOT_TOKEN" \
            -H "Content-Type: multipart/form-data" \
            -F "file=@report.txt" \
            -F "content=Here is the report" \
            "https://discord.com/api/v10/channels/$DISCORD_CHANNEL_ID/messages"
```

---

## 三、Slack 发文件

### 方法1：通过 Incoming Webhook（只能发消息）

```yaml
name: Notify Slack

on:
  push:
    branches: [ main ]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "📄 新构建完成！",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*构建报告*\n<https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}|点击查看>"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### 方法2：通过 Bot Token 上传文件

```yaml
name: Upload File to Slack

on:
  workflow_dispatch:

jobs:
  upload:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Create Report
        run: echo "Report content" > report.txt
      
      - name: Upload to Slack
        env:
          SLACK_BOT_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }}
          SLACK_CHANNEL: ${{ secrets.SLACK_CHANNEL }}
        run: |
          curl -F file=@report.txt \
               -F "channels=$SLACK_CHANNEL" \
               -F "initial_comment=Build Report" \
               -H "Authorization: Bearer $SLACK_BOT_TOKEN" \
               https://slack.com/api/files.upload
```

---

## 四、飞书 (Feishu/Lark) 发文件

飞书支持通过 Webhook 发送富文本消息，但**直接上传文件需要自建应用**。

### 方法1：Webhook 发消息（带链接）

```yaml
name: Notify Feishu

on:
  push:
    branches: [ main ]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Send to Feishu
        run: |
          curl -X POST ${{ secrets.FEISHU_WEBHOOK }} \
            -H "Content-Type: application/json" \
            -d '{
              "msg_type": "interactive",
              "card": {
                "header": {
                  "title": {
                    "tag": "plain_text",
                    "content": "📄 构建报告"
                  }
                },
                "elements": [
                  {
                    "tag": "div",
                    "text": {
                      "tag": "lark_md",
                      "content": "**构建完成**\n[点击查看报告](https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }})"
                    }
                  }
                ]
              }
            }'
```

### 方法2：通过自建应用上传文件

```yaml
name: Upload File to Feishu

on:
  workflow_dispatch:

jobs:
  upload:
    runs-on: ubuntu-latest
    steps:
      - name: Create File
        run: echo "Report" > report.txt
      
      - name: Upload to Feishu
        env:
          FEISHU_APP_ID: ${{ secrets.FEISHU_APP_ID }}
          FEISHU_APP_SECRET: ${{ secrets.FEISHU_APP_SECRET }}
          FEISHU_CHAT_ID: ${{ secrets.FEISHU_CHAT_ID }}
        run: |
          # 1. 获取 tenant_access_token
          TOKEN=$(curl -X POST https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal \
            -H "Content-Type: application/json" \
            -d "{\"app_id\":\"$FEISHU_APP_ID\",\"app_secret\":\"$FEISHU_APP_SECRET\"}" \
            | jq -r '.tenant_access_token')
          
          # 2. 上传文件
          curl -X POST https://open.feishu.cn/open-apis/im/v1/files \
            -H "Authorization: Bearer $TOKEN" \
            -F "file_type=stream" \
            -F "file_name=report.txt" \
            -F "file=@report.txt" \
            -F "parent_type=chat" \
            -F "parent_id=$FEISHU_CHAT_ID"
```

---

## 五、Telegram 发文件

```yaml
name: Send File to Telegram

on:
  workflow_dispatch:

jobs:
  send:
    runs-on: ubuntu-latest
    steps:
      - name: Create File
        run: echo "Report content" > report.txt
      
      - name: Send to Telegram
        env:
          TELEGRAM_BOT_TOKEN: ${{ secrets.TELEGRAM_BOT_TOKEN }}
          TELEGRAM_CHAT_ID: ${{ secrets.TELEGRAM_CHAT_ID }}
        run: |
          curl -F document=@report.txt \
               -F "caption=Build Report from GitHub Actions" \
               "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument?chat_id=${TELEGRAM_CHAT_ID}"
```

---

## 六、关键区别总结

| 平台 | Webhook 发消息 | Bot 发文件 | 难度 |
|------|---------------|-----------|------|
| Discord | ✅ 简单 | ✅ 需要 Bot Token | ⭐⭐ |
| Slack | ✅ 简单 | ✅ 需要 Bot Token | ⭐⭐ |
| 飞书 | ✅ 简单 | ⚠️ 需要自建应用 | ⭐⭐⭐ |
| Telegram | ✅ 简单 | ✅ 需要 Bot Token | ⭐⭐ |
| 企业微信 | ✅ 简单 | ⚠️ 需要企业应用 | ⭐⭐⭐ |

---

## 七、实际使用建议

### 最简单方案（推荐）：发链接

文件上传到 GitHub Artifact，聊天里发下载链接：

```yaml
- uses: actions/upload-artifact@v4
  with:
    name: my-report
    path: report.pdf

- uses: tsickert/discord-webhook@v5
  with:
    webhook-url: ${{ secrets.DISCORD_WEBHOOK }}
    content: |
      📄 报告已生成
      下载: https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}
```

### 直接发文件方案

需要：
1. 注册 Bot
2. 获取 Token
3. 添加到聊天群组
4. 配置 Secrets

适合：需要文件在聊天中直接预览的场景

---

## 八、OpenClaw 场景

如果你希望 **OpenClaw 能直接发文件到聊天**，应该：

1. **文件存储**：文件生成在 `~/.openclaw/workspace/`
2. **发送方式**：通过 OpenClaw 的 `message` 工具（需要配置对应 channel）
3. **替代方案**：把文件内容转为 base64，通过消息发送

当前限制：OpenClaw 的 `message` 工具需要配置 `target`，webchat 场景下可能不支持直接发文件。

**变通方案：**
- 生成文件后，提示用户文件位置
- 或者把文件内容转为文本贴出来

---

**需要针对具体平台（Discord/飞书/Slack）写完整配置吗？** 🍉
