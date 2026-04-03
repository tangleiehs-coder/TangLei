# 功能请求

本文件记录用户请求但当前不存在的功能。

---

## [FEAT-20260320-001] writing_team

**Logged**: 2026-03-20T23:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: config

### Requested Capability
创建"写作天团"多代理配置

### User Context
老唐询问"写作天团还有吗"，说明之前有写作相关的多代理配置，现在找不到了。

### Complexity Estimate
medium

### Suggested Implementation
整合现有写作技能：
1. blog-writer - 博客文章
2. wechat-article - 微信公众号
3. write-xiaohongshu - 小红书爆款
4. auto-redbook-skills-main - 小红书图文
5. article-extractor - 文章提取

创建多代理协作配置，实现写作天团。

### Metadata
- Frequency: recurring
- Related Features: 现有写作技能
- Tags: writing, team, multi-agent

---

## [FEAT-20260320-002] self_improvement

**Logged**: 2026-03-20T23:30:00+08:00
**Priority**: low
**Status**: pending
**Area**: config

### Requested Capability
安装"知错能改"技能包，实现自动记录和改进

### User Context
老唐发送了"知错能改技能包.zip"，要求学习安装。

### Complexity Estimate
simple

### Suggested Implementation
已解压技能包，包含：
- SKILL.md - 技能定义
- README.md - 使用说明
- INSTALL.md - 安装指南

创建.learnings目录和三个记录文件，开始使用。

### Metadata
- Frequency: first_time
- Related Features: 技能管理系统
- Tags: self-improvement, learning, skill

### Resolution
- **Status**: in_progress
- **Notes**: 正在初始化.learnings目录和文件

---
