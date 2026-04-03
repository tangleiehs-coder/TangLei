# 错误记录

本文件记录命令失败、API 错误和异常情况。

---

## [ERR-20260320-001] pil_video

**Logged**: 2026-03-20T20:00:00+08:00
**Priority**: high
**Status**: resolved
**Area**: config

### Summary
PIL做法导致风格不一致和字体问题

### Error
使用PIL生成视频时，中文字体渲染出现问题，视觉风格与HTML版不一致。

### Context
- 尝试的方法：Python PIL直接绘制
- 问题：字体渲染失败、风格不统一
- 影响：第六节PIL版被废弃

### Suggested Fix
使用HTML+CSS+Playwright截图方案，确保风格统一和中文显示正常

### Metadata
- Reproducible: yes
- Related Files: generate_video_pil.py (已删除)
- Tags: pil, font, style

### Resolution
- **Resolved**: 2026-03-20T20:30:00+08:00
- **Notes**: 已删除PIL相关脚本，全面转向HTML方案

---

## [ERR-20260320-002] scene_count

**Logged**: 2026-03-20T21:00:00+08:00
**Priority**: medium
**Status**: resolved
**Area**: config

### Summary
第一节场景数量偏少（34个），导致切换不够频繁

### Error
462秒音频只生成34个场景，平均13.6秒/场景，不符合6-15秒的要求。

### Context
- 音频时长：462秒
- 实际场景：34个
- 平均时长：13.6秒
- 要求：6-15秒

### Suggested Fix
增加场景密度，目标50-60个场景，平均8-10秒

### Metadata
- Reproducible: yes
- Related Files: 第一节_深蓝极简版.mp4
- Tags: scene, count, density

### Resolution
- **Resolved**: 2026-03-20T21:30:00+08:00
- **Notes**: 重新制作修正版，50个场景

---

## [ERR-20260320-003] audio_sync

**Logged**: 2026-03-20T21:00:00+08:00
**Priority**: high
**Status**: resolved
**Area**: config

### Summary
第一节音画同步不够精确

### Error
用户反馈第一节视频"音频和画面匹配并不太好"

### Context
- 视频文件：第一节_深蓝极简版.mp4
- 问题：时间戳对齐有偏差
- 原因：转录精度或分段算法问题

### Suggested Fix
1. 使用更精确的Whisper转录
2. 检查时间戳连续性
3. 严格按音频时间轴切换

### Metadata
- Reproducible: yes
- Related Files: 第一节_深蓝极简版.mp4
- Tags: audio, sync, timing

### Resolution
- **Resolved**: 2026-03-20T21:45:00+08:00
- **Notes**: 重新制作修正版，音画同步<30ms

---
