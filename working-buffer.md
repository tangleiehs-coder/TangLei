# Working Buffer (Danger Zone Log)

**Status:** CLEAN
**Started:** [YYYY-MM-DD HH:MM:SS]
**Last-Entry:** [YYYY-MM-DD HH:MM:SS]
**Entry-Count:** 0

---

## 使用说明

### 触发条件
当 `session_status` 显示 context % >= 60% 时，激活此 buffer。

### 格式
每条消息记录：

```markdown
## [YYYY-MM-DD HH:MM:SS] Human
[完整消息内容]

## [YYYY-MM-DD HH:MM:SS] Agent
[Summarized in 1-2 sentences + key details from this exchange]
```

### 溢出规则
当 Entry-Count >= 50 时：
1. 将前 25 条写入 `memory/YYYY-MM-DD-partial.md`
2. 清空 buffer，重置计数
3. 在 buffer 顶部标注：`[FLUSHED: 25 entries archived to partial]`

### Flush 规则（何时 → daily notes）
当 session 结束时，如果 buffer 有内容：
1. 将所有 entry 追加到 `memory/YYYY-MM-DD.md`
2. 清空 buffer
3. 在 daily notes 中标注：`[Buffer flushed: N entries]`

### 恢复
下次 session 启动时，如果 SESSION-STATE.md 的 Buffer-Status: CRITICAL，优先读取此文件。

---

## 日志开始

（每次 session 激活 buffer 时在此处记录）
