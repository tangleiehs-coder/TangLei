# 📝 知错能改技能包

## 简介
这是一个 EasyClaw 技能，帮助 AI 助手记录错误、学习心得和功能请求，实现持续改进。当 AI 犯错或用户纠正时，它会自动记录到 markdown 文件中，方便后续回顾和修复。

**适用场景**：
- AI 执行命令失败，需要记录错误信息
- 用户纠正 AI 的错误理解
- 用户请求当前不存在的功能
- 发现更好的工作方法
- 知识过时或需要更新

---

## 🎯 核心功能

### 1. 错误记录
记录命令失败、API 错误、异常情况到 `.learnings/ERRORS.md`

### 2. 学习记录
记录用户纠正、知识缺口、最佳实践到 `.learnings/LEARNINGS.md`

### 3. 功能请求
记录用户想要但当前没有的功能到 `.learnings/FEATURE_REQUESTS.md`

### 4. 自动编号
自动生成唯一 ID：`LRN-20260320-001`、`ERR-20260320-001`、`FEAT-20260320-001`

### 5. 优先级管理
支持 `critical`、`high`、`medium`、`low` 四个优先级

---

## 📦 安装步骤

### 步骤 1：复制技能
将 `知错能改` 文件夹复制到你的 EasyClaw 技能目录：
```
C:\Users\你的用户名\.easyclaw\skills\知错能改\
```

### 步骤 2：重启 EasyClaw
重启后技能自动激活

### 步骤 3：初始化项目（可选）
在项目中运行以下 PowerShell 命令创建学习目录：
```powershell
New-Item -ItemType Directory -Force -Path .learnings
```

---

## 🎯 使用方法

### 自动触发
技能会在以下情况自动记录：

| 情况 | 记录位置 |
|------|---------|
| 命令/操作失败 | `.learnings/ERRORS.md` |
| 用户纠正 AI | `.learnings/LEARNINGS.md` |
| 用户请求新功能 | `.learnings/FEATURE_REQUESTS.md` |
| API/工具失败 | `.learnings/ERRORS.md` |
| 发现更好方法 | `.learnings/LEARNINGS.md` |

### 手动触发
在消息中提到"知错能改"或"记录这个错误"

---

## 📁 文件结构

```
知错能改技能包/
├── 知错能改/
│   └── SKILL.md           # 技能定义文件
├── README.md              # 本说明文档
└── INSTALL.md             # 详细安装指南
```

安装后，项目中会创建：
```
你的项目/
└── .learnings/
    ├── LEARNINGS.md       # 学习记录
    ├── ERRORS.md          # 错误记录
    └── FEATURE_REQUESTS.md # 功能请求
```

---

## 📝 记录格式示例

### 学习条目
```markdown
## [LRN-20260320-001] correction

**Logged**: 2026-03-20T23:00:00Z
**Priority**: medium
**Status**: pending
**Area**: config

### Summary
用户纠正了配置文件的正确路径

### Details
AI 错误地使用了相对路径，正确应该是绝对路径

### Suggested Action
更新所有相关命令使用绝对路径

### Metadata
- Source: user_feedback
- Tags: path, config
```

### 错误条目
```markdown
## [ERR-20260320-001] git_command

**Logged**: 2026-03-20T23:00:00Z
**Priority**: high
**Status**: pending
**Area**: config

### Summary
git push 命令失败

### Error
fatal: unable to access '...': Could not resolve host

### Context
- 尝试的命令：git push origin main
- 网络环境：公司 WiFi

### Suggested Fix
检查 DNS 设置或切换网络

### Metadata
- Reproducible: yes
```

---

## 🔧 常用命令

**查看最近记录:**
```powershell
Get-Content .learnings\LEARNINGS.md -Tail 20
```

**搜索关键词:**
```powershell
Select-String -Path .learnings\*.md -Pattern "git"
```

**统计待处理项:**
```powershell
Select-String -Path .learnings\*.md -Pattern "\*\*Status\*\*: pending"
```

**解决条目:**
编辑对应条目，将 `**Status**: pending` 改为 `**Status**: resolved`

---

## 💡 最佳实践

1. **立即记录** - 问题发生后上下文最新鲜
2. **具体明确** - 包含实际命令和输出
3. **关联文件** - 让修复更容易
4. **定期回顾** - 每周检查待处理项
5. **积极提升** - 广泛适用的知识提升到项目文档

---

## 📊 优先级指南

| 优先级 | 何时使用 |
|--------|----------|
| `critical` | 阻塞核心功能、数据丢失风险、安全问题 |
| `high` | 影响大、常见工作流、重复问题 |
| `medium` | 中等影响、有临时方案 |
| `low` | 小问题、边缘情况 |

---

## 📝 版本信息

- 创建时间：2026-03-20
- 适用系统：Windows / macOS / Linux
- 依赖：EasyClaw + PowerShell

---

## 💬 提示

这个技能特别适合：
- 开发者记录 AI 助手的工作问题
- 团队共享 AI 使用经验
- 持续改进 AI 助手的工作质量

配合"写作天团"等技能使用效果更佳！
