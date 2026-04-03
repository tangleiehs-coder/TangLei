# GitHub 邮件功能完全指南

## 一、GitHub 自身邮件功能（通知）

### 1. 邮件通知设置
**路径：** GitHub 网页 → Settings → Notifications

| 场景 | 设置位置 |
|------|---------|
| 接收 Issues/PR 通知 | Email 选项开启 |
| 过滤不重要通知 | 设置 "Custom routing" |
| 取消订阅某仓库 | 仓库页 → Watch → Unwatch |

**CLI 查看通知设置：**
```bash
gh api user/emails
```

---

## 二、GitHub Actions 发送邮件（推荐）

### 方案A：使用现成的 Action（最简单）

```yaml
# .github/workflows/send-email.yml
name: Send Email

on:
  push:
    branches: [ main ]
  workflow_dispatch:  # 手动触发

jobs:
  send-email:
    runs-on: ubuntu-latest
    steps:
      - name: Send Email
        uses: dawidd6/action-send-mail@v3
        with:
          server_address: smtp.gmail.com
          server_port: 587
          username: ${{ secrets.EMAIL_USERNAME }}
          password: ${{ secrets.EMAIL_PASSWORD }}
          subject: "GitHub 事件通知"
          to: "recipient@example.com"
          from: "GitHub Bot"
          body: |
            仓库: ${{ github.repository }}
            提交: ${{ github.sha }}
            作者: ${{ github.actor }}
```

### 方案B：常用邮件 Action 对比

| Action | 特点 | 适用场景 |
|--------|------|---------|
| `dawidd6/action-send-mail` | 支持附件、多收件人 | 常规通知 |
| `dawidd6/action-send-mail@v3` | 支持 SMTP 加密 | 安全邮件 |
| `tretuna/sync-branches@main` | 自带邮件通知 | 分支同步 |
| `rtCamp/action-slack-notify` | 转 Slack 再邮件 | 已有 Slack 的企业 |

---

## 三、通过 GitHub API 触发邮件

### 场景：Issue/PR 更新时发邮件

```bash
# 获取最近的 Issues
git hub issue list --repo owner/repo --json number,title,updatedAt

# 通过外部脚本发送邮件
# 需要自己写个脚本调用 SMTP 服务
```

### 配合 Webhook 使用

1. **GitHub 仓库 → Settings → Webhooks → Add webhook**
2. **Payload URL:** 你的邮件服务 API（如 SendGrid、AWS SES）
3. **Content type:** `application/json`
4. **Events:** 选择需要触发邮件的事件

---

## 四、完整示例：Issue 创建时自动发邮件

### 1. 创建 Workflow 文件

`.github/workflows/issue-email.yml`:

```yaml
name: Issue Email Notification

on:
  issues:
    types: [opened]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Send notification email
        uses: dawidd6/action-send-mail@v3
        with:
          server_address: smtp.gmail.com
          server_port: 587
          username: ${{ secrets.MAIL_USERNAME }}
          password: ${{ secrets.MAIL_PASSWORD }}
          subject: "[GitHub] 新 Issue: ${{ github.event.issue.title }}"
          to: "your-email@example.com"
          from: "GitHub Bot <noreply@github.com>"
          html_body: |
            <h2>新 Issue 创建</h2>
            <p><strong>标题:</strong> ${{ github.event.issue.title }}</p>
            <p><strong>创建者:</strong> @${{ github.event.issue.user.login }}</p>
            <p><strong>链接:</strong> <a href="${{ github.event.issue.html_url }}">点击查看</a></p>
            <hr>
            <p>${{ github.event.issue.body }}</p>
```

### 2. 配置 Secrets

**路径：** 仓库 → Settings → Secrets and variables → Actions

添加：
- `MAIL_USERNAME`: 你的邮箱用户名
- `MAIL_PASSWORD`: 邮箱密码或应用专用密码

---

## 五、常用邮件服务商 SMTP 配置

| 服务商 | SMTP 服务器 | 端口 | 说明 |
|--------|------------|------|------|
| Gmail | smtp.gmail.com | 587 | 需开启"不够安全的应用"或使用应用密码 |
| Outlook | smtp.office365.com | 587 | 现代认证 |
| QQ邮箱 | smtp.qq.com | 587 | 需要授权码 |
| 163邮箱 | smtp.163.com | 465 | SSL 加密 |
| SendGrid | smtp.sendgrid.net | 587 | API Key 作为密码 |
| AWS SES | email-smtp.us-east-1.amazonaws.com | 587 | IAM 凭证 |

---

## 六、进阶：用 Python 脚本发送

如果需要更复杂的逻辑，可以用 Python Action：

```yaml
name: Custom Email

on:
  schedule:
    - cron: '0 9 * * 1'  # 每周一早上9点

jobs:
  send:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      
      - run: pip install sendgrid
      
      - name: Send email with Python
        env:
          SENDGRID_API_KEY: ${{ secrets.SENDGRID_API_KEY }}
        run: python scripts/send_email.py
```

`scripts/send_email.py`:

```python
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

message = Mail(
    from_email='from@example.com',
    to_emails='to@example.com',
    subject='GitHub 自动邮件',
    html_content='<strong>这是从 GitHub Actions 发送的邮件</strong>'
)

sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
response = sg.send(message)
print(f"Status: {response.status_code}")
```

---

## 七、常见问题

**Q: GitHub 能直接发邮件给用户吗？**  
A: 不能直接发。必须通过 Actions 或外部服务。

**Q: 免费方案有哪些？**  
A: 
- Gmail SMTP（每天 100 封左右限制）
- SendGrid 免费版（每天 100 封）
- Mailgun 免费版（每月 5000 封）

**Q: 邮件进垃圾箱怎么办？**  
A: 
- 配置 SPF、DKIM 记录
- 使用专业的邮件服务商（SendGrid/Mailgun）
- 避免使用 Gmail/QQ 等个人邮箱发批量邮件

---

**文档生成时间：** 2026-03-04  
**作者：** 瓜瓜 🍉
