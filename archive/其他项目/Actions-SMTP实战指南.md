# GitHub Actions + SMTP 完整实战指南

## 一、最简示例（5分钟上手）

### 1. 创建 Workflow 文件

在仓库根目录创建：
```
.github/workflows/send-email.yml
```

```yaml
name: 发送邮件通知

on:
  push:           # 代码推送时触发
    branches: [ main ]
  workflow_dispatch:  # 允许手动触发

jobs:
  send-email:
    runs-on: ubuntu-latest
    steps:
      - name: 发送邮件
        uses: dawidd6/action-send-mail@v3
        with:
          server_address: smtp.gmail.com
          server_port: 587
          username: ${{ secrets.EMAIL_USERNAME }}
          password: ${{ secrets.EMAIL_PASSWORD }}
          subject: "代码已更新 - ${{ github.repository }}"
          to: "your-email@example.com"
          from: "GitHub Actions"
          body: |
            仓库: ${{ github.repository }}
            提交者: ${{ github.actor }}
            提交信息: ${{ github.event.head_commit.message }}
            查看详情: ${{ github.event.head_commit.url }}
```

### 2. 配置 Secrets（关键步骤）

**路径：** 仓库页面 → Settings → Secrets and variables → Actions → New repository secret

添加两个 secret：

| Secret 名称 | 值 |
|------------|-----|
| `EMAIL_USERNAME` | 你的邮箱地址 |
| `EMAIL_PASSWORD` | 邮箱密码或授权码 |

---

## 二、常用邮箱配置对照表

### Gmail
```yaml
server_address: smtp.gmail.com
server_port: 587
username: ${{ secrets.GMAIL_USER }}      # 完整邮箱地址
password: ${{ secrets.GMAIL_APP_PASS }}  # 应用专用密码（不是登录密码）
```
**注意：** Gmail 需开启两步验证，生成「应用专用密码」

### QQ邮箱
```yaml
server_address: smtp.qq.com
server_port: 587
username: ${{ secrets.QQ_EMAIL }}        # 如：123456@qq.com
password: ${{ secrets.QQ_AUTH_CODE }}    # QQ邮箱授权码（不是登录密码）
```
**获取授权码：** QQ邮箱设置 → 账户 → 开启SMTP服务 → 获取授权码

### 163邮箱
```yaml
server_address: smtp.163.com
server_port: 465
username: ${{ secrets.NETEASE_EMAIL }}
password: ${{ secrets.NETEASE_AUTH }}    # 客户端授权码
secure: true                             # 使用 SSL
```

### Outlook / Office365
```yaml
server_address: smtp.office365.com
server_port: 587
username: ${{ secrets.OUTLOOK_EMAIL }}
password: ${{ secrets.OUTLOOK_PASS }}
```

---

## 三、不同触发场景示例

### 场景1：Issue 创建时通知
```yaml
name: Issue 通知

on:
  issues:
    types: [opened, closed]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - uses: dawidd6/action-send-mail@v3
        with:
          server_address: smtp.gmail.com
          server_port: 587
          username: ${{ secrets.EMAIL_USERNAME }}
          password: ${{ secrets.EMAIL_PASSWORD }}
          subject: "[GitHub] Issue ${{ github.event.action }}: ${{ github.event.issue.title }}"
          to: "your-email@example.com"
          html_body: |
            <h2>Issue ${{ github.event.action }}</h2>
            <p><strong>标题:</strong> ${{ github.event.issue.title }}</p>
            <p><strong>创建者:</strong> @${{ github.event.issue.user.login }}</p>
            <p><strong>链接:</strong> <a href="${{ github.event.issue.html_url }}">点击查看</a></p>
            <hr>
            <pre>${{ github.event.issue.body }}</pre>
```

### 场景2：PR 合并后通知
```yaml
name: PR 合并通知

on:
  pull_request:
    types: [closed]

jobs:
  notify:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    steps:
      - uses: dawidd6/action-send-mail@v3
        with:
          server_address: smtp.gmail.com
          server_port: 587
          username: ${{ secrets.EMAIL_USERNAME }}
          password: ${{ secrets.EMAIL_PASSWORD }}
          subject: "✅ PR 已合并: ${{ github.event.pull_request.title }}"
          to: "team@example.com"
          body: |
            PR #${{ github.event.pull_request.number }} 已被合并到 main 分支
            
            标题: ${{ github.event.pull_request.title }}
            作者: @${{ github.event.pull_request.user.login }}
            合并者: @${{ github.actor }}
            查看: ${{ github.event.pull_request.html_url }}
```

### 场景3：定时发送报告（Cron）
```yaml
name: 每日构建报告

on:
  schedule:
    - cron: '0 9 * * *'  # 每天早上9点 UTC

jobs:
  report:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: 生成报告
        run: |
          echo "# 每日报告 $(date)" > report.md
          echo "提交数: $(git log --oneline --since='24 hours ago' | wc -l)" >> report.md
      
      - uses: dawidd6/action-send-mail@v3
        with:
          server_address: smtp.gmail.com
          server_port: 587
          username: ${{ secrets.EMAIL_USERNAME }}
          password: ${{ secrets.EMAIL_PASSWORD }}
          subject: "📊 每日构建报告 $(date +%Y-%m-%d)"
          to: "manager@example.com"
          attachments: report.md
```

### 场景4：CI 失败时报警
```yaml
name: CI 失败通知

on:
  workflow_run:
    workflows: ["测试", "构建"]
    types: [completed]

jobs:
  notify:
    if: github.event.workflow_run.conclusion == 'failure'
    runs-on: ubuntu-latest
    steps:
      - uses: dawidd6/action-send-mail@v3
        with:
          server_address: smtp.gmail.com
          server_port: 587
          username: ${{ secrets.EMAIL_USERNAME }}
          password: ${{ secrets.EMAIL_PASSWORD }}
          subject: "❌ 构建失败: ${{ github.event.workflow_run.name }}"
          to: "devops@example.com"
          body: |
            工作流: ${{ github.event.workflow_run.name }}
            状态: 失败
            分支: ${{ github.event.workflow_run.head_branch }}
            提交: ${{ github.event.workflow_run.head_sha }}
            查看日志: ${{ github.event.workflow_run.html_url }}
```

---

## 四、高级用法

### 1. 使用 HTML 格式邮件
```yaml
- uses: dawidd6/action-send-mail@v3
  with:
    server_address: smtp.gmail.com
    server_port: 587
    username: ${{ secrets.EMAIL_USERNAME }}
    password: ${{ secrets.EMAIL_PASSWORD }}
    subject: "HTML 邮件测试"
    to: "user@example.com"
    html_body: |
      <h1 style="color: #333;">GitHub Actions 通知</h1>
      <p>这是一封 <strong>HTML</strong> 格式的邮件</p>
      <a href="${{ github.repositoryUrl }}" style="background: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">查看仓库</a>
```

### 2. 发送给多人 + 抄送
```yaml
- uses: dawidd6/action-send-mail@v3
  with:
    server_address: smtp.gmail.com
    server_port: 587
    username: ${{ secrets.EMAIL_USERNAME }}
    password: ${{ secrets.EMAIL_PASSWORD }}
    subject: "团队通知"
    to: "member1@example.com,member2@example.com"    # 多人用逗号分隔
    cc: "manager@example.com,boss@example.com"        # 抄送
    bcc: "archive@example.com"                        # 密送
    body: "项目更新内容..."
```

### 3. 添加附件
```yaml
- uses: actions/checkout@v4

- name: 生成日志文件
  run: npm test > test-results.log 2>&1 || true

- uses: dawidd6/action-send-mail@v3
  with:
    server_address: smtp.gmail.com
    server_port: 587
    username: ${{ secrets.EMAIL_USERNAME }}
    password: ${{ secrets.EMAIL_PASSWORD }}
    subject: "测试报告"
    to: "team@example.com"
    body: "测试结果见附件"
    attachments: test-results.log,./coverage/lcov-report/index.html
```

### 4. 条件发送（根据提交信息）
```yaml
jobs:
  notify:
    # 只在提交信息包含 "[notify]" 时发送
    if: contains(github.event.head_commit.message, '[notify]')
    runs-on: ubuntu-latest
    steps:
      - uses: dawidd6/action-send-mail@v3
        with:
          server_address: smtp.gmail.com
          server_port: 587
          username: ${{ secrets.EMAIL_USERNAME }}
          password: ${{ secrets.EMAIL_PASSWORD }}
          subject: "重要更新通知"
          to: "team@example.com"
          body: ${{ github.event.head_commit.message }}
```

---

## 五、常见问题排查

### 问题1：邮件发送失败
**错误：** `535 Authentication failed`

**解决：**
1. 检查 Secrets 是否正确设置
2. 确认是「应用密码」不是登录密码（Gmail/QQ）
3. 检查邮箱是否开启 SMTP 服务

### 问题2：邮件进垃圾箱
**解决：**
1. 添加 DKIM/SPF 记录（需要有自己的域名邮箱）
2. 使用专业邮件服务（SendGrid、Mailgun）
3. 设置合理的 from 地址

### 问题3：附件太大发送失败
**解决：**
1. Gmail 限制 25MB
2. 先压缩附件：`zip -r report.zip ./reports/`
3. 或上传文件到云存储，邮件里发链接

### 问题4：中文乱码
**解决：** 使用 `html_body` 并添加 meta 标签：
```yaml
html_body: |
  <meta charset="UTF-8">
  <h1>中文标题</h1>
```

---

## 六、完整仓库示例结构

```
你的仓库/
├── .github/
│   └── workflows/
│       ├── send-email.yml          # 基础邮件
│       ├── issue-notify.yml        # Issue 通知
│       ├── pr-merge-notify.yml     # PR 合并通知
│       └── ci-failure-notify.yml   # CI 失败报警
├── scripts/
│   └── generate-report.sh          # 生成报告脚本
└── README.md
```

---

## 七、相关资源

- **Action 文档：** https://github.com/dawidd6/action-send-mail
- **GitHub Events：** https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows
- **Context 变量：** https://docs.github.com/en/actions/learn-github-actions/contexts

---

**需要针对具体场景（比如你的安全五点半项目）写个 workflow 吗？** 🍉
