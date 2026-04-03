#!/bin/bash
# 音频转双语字幕视频 - 手动执行脚本

AUDIO_FILE="/Users/tang/Documents/003 Frank 英语角/20260323第十次课程.mp3"
OUTPUT_DIR="/Users/tang/Desktop/瓜瓜成果"
OUTPUT_VIDEO="$OUTPUT_DIR/20260323第十次课程_双语字幕.mp4"

mkdir -p "$OUTPUT_DIR"

echo "=========================================="
echo "音频转双语字幕视频"
echo "=========================================="

# 检查 ffmpeg
if ! command -v ffmpeg &> /dev/null; then
    echo "错误: 未安装 ffmpeg"
    exit 1
fi

# 检查 whisper
if ! command -v whisper &> /dev/null; then
    echo "错误: 未安装 whisper"
    echo "请运行: pip install openai-whisper"
    exit 1
fi

echo "1. 正在转录音频 (中文)..."
cd "$OUTPUT_DIR"
whisper "$AUDIO_FILE" --language Chinese --model base --output_format json --output_dir "$OUTPUT_DIR"

JSON_FILE="$OUTPUT_DIR/20260323第十次课程.json"
if [ ! -f "$JSON_FILE" ]; then
    echo "错误: 转录失败，未找到 JSON 文件"
    exit 1
fi

echo "2. 正在生成双语字幕..."
python3 << 'PYTHON_SCRIPT'
import json
import os

def format_time(seconds):
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    millis = int((seconds % 1) * 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"

# 读取转录结果
with open("/Users/tang/Desktop/瓜瓜成果/20260323第十次课程.json", "r") as f:
    data = json.load(f)

# 生成 SRT 字幕 (中文在上，英文在下)
srt_lines = []
for i, seg in enumerate(data["segments"], 1):
    start = format_time(seg["start"])
    end = format_time(seg["end"])
    text = seg["text"].strip()
    
    srt_lines.append(str(i))
    srt_lines.append(f"{start} --> {end}")
    srt_lines.append(text)  # 中文
    srt_lines.append("")  # 空行分隔

with open("/Users/tang/Desktop/瓜瓜成果/output.srt", "w", encoding="utf-8") as f:
    f.write("\n".join(srt_lines))

print("✓ SRT 字幕已生成")
PYTHON_SCRIPT

echo "3. 正在合成视频..."

# 获取音频时长
DURATION=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$AUDIO_FILE")

echo "音频时长: $DURATION 秒"

# 合成视频 - 黑底 + 音频 + 字幕
ffmpeg -y \
    -f lavfi -i "color=c=black:s=1280x720:d=$DURATION" \
    -i "$AUDIO_FILE" \
    -vf "subtitles=$OUTPUT_DIR/output.srt:force_style='FontSize=24,PrimaryColour=&HFFFFFF,OutlineColour=&H000000,Outline=2,Alignment=2'" \
    -c:v libx264 -preset fast -crf 23 \
    -c:a aac -b:a 128k \
    -shortest \
    "$OUTPUT_VIDEO"

if [ $? -eq 0 ]; then
    echo ""
    echo "=========================================="
    echo "✓ 完成!"
    echo "视频路径: $OUTPUT_VIDEO"
    echo "=========================================="
else
    echo "错误: 视频合成失败"
    exit 1
fi
