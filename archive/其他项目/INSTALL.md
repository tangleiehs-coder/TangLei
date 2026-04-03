# 🚀 知错能改技能 - 快速安装指南

给朋友分享后，让他们按以下步骤安装：

---

## 方法一：手动安装（推荐）

### 1️⃣ 解压文件
将 `知错能改技能包.zip` 解压到任意位置

### 2️⃣ 复制技能到 openclaw
将 `知错能改` 文件夹复制到：
```
C:\Users\你的用户名\.openclaw\skills\知错能改\
```

### 3️⃣ 重启 openclaw
重启后技能自动激活

### 4️⃣ 测试技能
发送消息："测试知错能改技能"

---

## 方法二：一键安装脚本

给朋友发送这个 PowerShell 脚本（保存为 `install.ps1`）：

```powershell
# 知错能改技能一键安装脚本

Write-Host "🔧 开始安装知错能改技能..." -ForegroundColor Green

# 1. 创建技能目录
$skillDir = "$env:USERPROFILE\.openclaw\skills\知错能改"
New-Item -ItemType Directory -Path $skillDir -Force | Out-Null

# 2. 复制技能文件
Copy-Item ".\知错能改\SKILL.md" -Destination "$skillDir\SKILL.md" -Force
Write-Host "✅ 技能文件已复制" -ForegroundColor Green

# 3. 初始化项目学习目录（可选）
Write-Host "`n📁 是否在当前项目创建 .learnings 目录？(Y/N)"
$response = Read-Host
if ($response -eq "Y" -or $response -eq "y") {
    New-Item -ItemType Directory -Force -Path .learnings | Out-Null
    
    # 创建学习文件模板
    @"
# 学习记录

本文件记录 AI 助手的学习内容、用户纠正和最佳实践。

---
"@ | Out-File -FilePath .learnings\LEARNINGS.md -Encoding UTF8

    @"
# 错误记录

本文件记录命令失败、API 错误和异常情况。

---
"@ | Out-File -FilePath .learnings\ERRORS.md -Encoding UTF8

    @"
# 功能请求

本文件记录用户请求但当前不存在的功能。

---
"@ | Out-File -FilePath .learnings\FEATURE_REQUESTS.md -Encoding UTF8

    Write-Host "✅ 学习目录已创建" -ForegroundColor Green
}

Write-Host "`n🎉 安装完成！" -ForegroundColor Green
Write-Host "请重启 openclaw，然后发送'测试知错能改'测试" -ForegroundColor Cyan
```

运行方式：
```powershell
powershell -ExecutionPolicy Bypass -File install.ps1
```

---

## ✅ 验证安装

安装完成后，测试技能：

**测试 1：发送纠正消息**
```
不对，这个命令应该用 git commit -m 而不是 git add
```
AI 应该记录到 `.learnings/LEARNINGS.md`

**测试 2：发送错误场景**
```
刚才的命令失败了，记录一下
```
AI 应该记录到 `.learnings/ERRORS.md`

**测试 3：发送功能请求**
```
希望你能自动备份文件
```
AI 应该记录到 `.learnings/FEATURE_REQUESTS.md`

---

## 📁 项目初始化（可选）

在每个项目中使用技能前，创建学习目录：

```powershell
# 在项目根目录运行
New-Item -ItemType Directory -Force -Path .learnings

# 创建文件模板
New-Item -ItemType File -Path .learnings\LEARNINGS.md
New-Item -ItemType File -Path .learnings\ERRORS.md
New-Item -ItemType File -Path .learnings\FEATURE_REQUESTS.md
```

---

## 🔧 故障排查

**问题 1：技能不响应？**
- 解决：重启 openclaw，确保技能文件在正确目录

**问题 2：学习目录未创建？**
- 解决：手动运行 `New-Item -ItemType Directory -Force -Path .learnings`

**问题 3：记录格式错误？**
- 解决：检查 SKILL.md 中的模板格式，确保 UTF-8 编码

**问题 4：跨平台兼容？**
- 解决：macOS/Linux 使用 `mkdir -p .learnings` 创建目录

---

## 📊 使用技巧

### 快速查看记录
```powershell
# 查看最近 10 条学习
Get-Content .learnings\LEARNINGS.md -Tail 30

# 搜索特定关键词
Select-String -Path .learnings\*.md -Pattern "git"

# 统计待处理项
(Select-String -Path .learnings\*.md -Pattern "\*\*Status\*\*: pending").Count
```

### 解决条目
编辑对应条目，将：
```markdown
**Status**: pending
```
改为：
```markdown
**Status**: resolved

### Resolution
- **Resolved**: 2026-03-20T23:00:00Z
- **Notes**: 问题已修复
```

### 提升知识
广泛适用的知识可以提升到：
- `AGENTS.md` - AI 工作流和约定
- `HEARTBEAT.md` - 定期检查任务
- 项目文档 - 团队共享知识

---

## 📞 需要帮助？

如果安装遇到问题：
1. 检查 openclaw 版本是否最新
2. 确保技能目录路径正确
3. 查看 openclaw 日志是否有错误
4. 联系分享给你这个技能包的朋友！

---

## 🎯 进阶使用

### 定期回顾
每周运行以下命令回顾学习：
```powershell
# 查看所有高优先级待处理项
Select-String -Path .learnings\*.md -Pattern "\*\*Priority\*\*: high" -Context 5,0

# 查找重复问题
Select-String -Path .learnings\ERRORS.md -Pattern "git" -AllMatches
```

### 团队共享
将 `.learnings/` 目录加入 Git 跟踪（不要 gitignore）：
```bash
# 不要忽略学习目录
# .gitignore 中不要添加 .learnings/
```

这样团队所有成员（和 AI 助手）都能共享学习成果！

---

**祝使用愉快！📝✨**
