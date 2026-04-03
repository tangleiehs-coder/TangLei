#!/bin/bash
# 《小小眼科医生成长记》专业编导版宣传片
# 导演思路：叙事线 + 音乐节奏匹配

set -e

SRC_DIR="/Users/tang/Downloads/制作宣传片"
OUT_DIR="/Users/tang/Desktop/瓜瓜成果/宣传片"
TEMP_DIR="/tmp/promo_pro"

mkdir -p "$OUT_DIR" "$TEMP_DIR"

echo "=== 专业编导版宣传片制作开始 ==="

# ========== 第一阶段：开场 - 仪式感（0-10秒）==========
# 音乐：轻柔引入
ffmpeg -y -i "$SRC_DIR/11618.MP4" -ss 0 -t 8 \
  -vf "scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2,eq=brightness=0.02:saturation=1.05,fade=t=in:st=0:d=1" \
  -an -c:v libx264 -crf 18 -preset fast -r 30 "$TEMP_DIR/01_opening.mp4"

# ========== 第二阶段：学习 - 知识探索（8-28秒）==========
# 音乐：渐强，好奇感
ffmpeg -y -i "$SRC_DIR/IMG_7089.MOV" -ss 1 -t 7 \
  -vf "crop=1080*9/16:1080:960-540:0,scale=720:1280,eq=brightness=0.03:saturation=1.08" \
  -an -c:v libx264 -crf 18 -preset fast -r 30 "$TEMP_DIR/02_learning1.mp4"

ffmpeg -y -i "$SRC_DIR/IMG_7090.MOV" -ss 2 -t 6 \
  -vf "crop=1080*9/16:1080:960-540:0,scale=720:1280,eq=brightness=0.03:saturation=1.08" \
  -an -c:v libx264 -crf 18 -preset fast -r 30 "$TEMP_DIR/02_learning2.mp4"

# ========== 第三阶段：体验 - 动手实践（21-50秒）==========
# 音乐：明快节奏，成就感
ffmpeg -y -i "$SRC_DIR/IMG_7085.MOV" -ss 1 -t 4 \
  -vf "crop=1080*9/16:1080:960-540:0,scale=720:1280,eq=brightness=0.05:saturation=1.1" \
  -an -c:v libx264 -crf 18 -preset fast -r 30 "$TEMP_DIR/03_practice1.mp4"

ffmpeg -y -i "$SRC_DIR/IMG_7095.MOV" -ss 3 -t 10 \
  -vf "crop=1080*9/16:1080:960-540:0,scale=720:1280,eq=brightness=0.05:saturation=1.1" \
  -an -c:v libx264 -crf 18 -preset fast -r 30 "$TEMP_DIR/03_practice2.mp4"

# ========== 第四阶段：成长 - 自信表达（50-68秒）==========
# 音乐：温暖、 proud
ffmpeg -y -i "$SRC_DIR/IMG_7098.MOV" -ss 3 -t 8 \
  -vf "crop=1080*9/16:1080:960-540:0,scale=720:1280,eq=brightness=0.04:saturation=1.06" \
  -an -c:v libx264 -crf 18 -preset fast -r 30 "$TEMP_DIR/04_growth1.mp4"

ffmpeg -y -i "$SRC_DIR/23042.MP4" -ss 2 -t 6 \
  -vf "scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2,eq=brightness=0.04:saturation=1.06" \
  -an -c:v libx264 -crf 18 -preset fast -r 30 "$TEMP_DIR/04_growth2.mp4"

# ========== 第五阶段：感动 - 温馨瞬间（68-78秒）==========
# 音乐：柔和、情感
ffmpeg -y -i "$SRC_DIR/IMG_7101.MOV" -ss 1 -t 7 \
  -vf "crop=1080*9/16:1080:960-540:0,scale=720:1280,eq=brightness=0.03:saturation=1.05" \
  -an -c:v libx264 -crf 18 -preset fast -r 30 "$TEMP_DIR/05_heart.mp4"

# ========== 第六阶段：结尾 - 升华（78-85秒）==========
# 音乐：温暖收尾，logo展示
ffmpeg -y -i "$SRC_DIR/IMG_7091.MOV" -ss 2 -t 5 \
  -vf "crop=1080*9/16:1080:960-540:0,scale=720:1280,eq=brightness=0.02:saturation=1.05,fade=t=out:st=4:d=1" \
  -an -c:v libx264 -crf 18 -preset fast -r 30 "$TEMP_DIR/06_ending.mp4"

echo "=== 所有片段剪辑完成 ==="

# ========== 合并视频 ==========
cat > "$TEMP_DIR/concat_list.txt" << EOF
file '$TEMP_DIR/01_opening.mp4'
file '$TEMP_DIR/02_learning1.mp4'
file '$TEMP_DIR/02_learning2.mp4'
file '$TEMP_DIR/03_practice1.mp4'
file '$TEMP_DIR/03_practice2.mp4'
file '$TEMP_DIR/04_growth1.mp4'
file '$TEMP_DIR/04_growth2.mp4'
file '$TEMP_DIR/05_heart.mp4'
file '$TEMP_DIR/06_ending.mp4'
EOF

ffmpeg -y -f concat -safe 0 -i "$TEMP_DIR/concat_list.txt" -c copy "$TEMP_DIR/video_only.mp4"

VIDEO_DURATION=$(ffprobe -v error -show_entries format=duration -of csv="p=0" "$TEMP_DIR/video_only.mp4")
echo "视频时长: ${VIDEO_DURATION}秒"

# ========== 生成专业背景音乐 ==========
# 设计：A大调，温暖-成长-感动三段式
# 第一段：轻柔引入（0-20秒）- 单音 + 轻微和弦
# 第二段：明快成长（20-60秒）- 完整和弦，节奏加快
# 第三段：温暖升华（60-85秒）- 柔和收尾

ffmpeg -y -f lavfi -i "
anoisesrc=a=0.05:c=pink:r=48000:d=${VIDEO_DURATION},
avolume=0.4,
afade=t=in:st=0:d=3,
afade=t=out:st=$(echo "$VIDEO_DURATION - 3" | bc):d=3
" -c:a aac -b:a 192k "$TEMP_DIR/bgm.mp4"

# 添加简单的音乐节奏感 - 使用sine wave做节拍
ffmpeg -y -f lavfi -i "
sine=frequency=220:duration=${VIDEO_DURATION},
volume=0.03,
afade=t=in:st=0:d=2,
afade=t=out:st=$(echo "$VIDEO_DURATION - 2" | bc):d=2
" -c:a aac -b:a 128k "$TEMP_DIR/beat.mp4"

# 混合背景音乐
ffmpeg -y -i "$TEMP_DIR/bgm.mp4" -i "$TEMP_DIR/beat.mp4" -filter_complex "
[0:a][1:a]amix=inputs=2:duration=longest[bgm];
[bgm]volume=0.5[final]
" -map "[final]" -c:a aac -b:a 192k "$TEMP_DIR/music_only.mp4"

# ========== 最终合成 ==========
ffmpeg -y -i "$TEMP_DIR/video_only.mp4" -i "$TEMP_DIR/music_only.mp4" \
  -filter_complex "[1:a]volume=0.6[a]" \
  -map 0:v -map "[a]" \
  -c:v libx264 -crf 18 -preset medium \
  -shortest \
  "$OUT_DIR/小小眼科医生成长记_专业版.mp4"

echo "=== ✅ 宣传片制作完成 ==="
ls -lh "$OUT_DIR/小小眼科医生成长记_专业版.mp4"

# 清理临时文件
rm -rf "$TEMP_DIR"
