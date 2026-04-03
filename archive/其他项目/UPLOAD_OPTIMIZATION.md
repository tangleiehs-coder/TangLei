# 优化后的文件上传流程

## 目标
减少 token 消耗，提高上传效率

## 优化点

### 1. 减少浏览器截图
- **原来**: 每个操作后都 snapshot
- **现在**: 只在关键节点截图（打开上传界面、点击确定前）
- **其他状态**: 用 JavaScript 快速检查

### 2. 使用 Python + pyautogui
- **优点**: 比 AppleScript 更稳定，可精确控制键盘
- **文件**: `upload-automation.py`

### 3. 批量处理
- **文件**: `batch-upload.sh`
- **流程**: 一次设置，连续上传多个文件

### 4. 状态记录
- **日志**: `upload-progress.log`
- **作用**: 记录成功/失败，避免重复上传

## 明日操作流程

```
1. 浏览器点击"添加"→"导入音视频"→"点击上传音视频"（1次）
2. 运行: python3 upload-automation.py "/tmp/openclaw/uploads/037..."
3. 等待15秒（不上传截图，节省token）
4. JavaScript检查"确定"按钮状态
5. 点击"确定"
6. 重复步骤2-5上传下一个文件
```

## 文件清单
- `upload-automation.py` - Python自动化脚本
- `batch-upload.sh` - 批量上传脚本
- `upload-progress.log` - 上传进度日志
