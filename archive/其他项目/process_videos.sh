#!/bin/bash
# 视频转音频并分割脚本

INPUT_DIR="/Users/tang/Downloads/研讨会视频 51-100"
OUTPUT_DIR="/Users/tang/Downloads/研讨会音频 51-123"

mkdir -p "$OUTPUT_DIR"

echo "开始处理视频文件..."
echo "输出目录: $OUTPUT_DIR"
echo ""

# 统计文件数
total=$(ls "$INPUT_DIR"/*.mp4 2>/dev/null | wc -l)
current=0

for video in "$INPUT_DIR"/*.mp4; do
    current=$((current + 1))
    filename=$(basename "$video")
    # 移除 .mp4 后缀
    name="${filename%.mp4}"
    audio_file="$OUTPUT_DIR/${name}.m4a"
    
    echo "[$current/$total] 处理: $filename"
    
    # 提取音频
    ffmpeg -i "$video" -vn -c:a aac -b:a 128k "$audio_file" -y -loglevel error
    
    if [ $? -ne 0 ]; then
        echo "  ❌ 转换失败: $filename"
        continue
    fi
    
    # 获取音频时长（秒）
    duration=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$audio_file" | cut -d. -f1)
    hours=$((duration / 3600))
    minutes=$(((duration % 3600) / 60))
    
    echo "  ✓ 转换完成，时长: ${hours}小时${minutes}分钟"
    
    # 超过3小时（10800秒）则分割
    if [ "$duration" -gt 10800 ]; then
        echo "  ⏱ 超过3小时，开始分割..."
        
        # 计算分割点：(总时长 + 3分钟) / 2 = 上半场结束点
        # 下半场 = 总时长 - 上半场
        # 上半场 = 下半场 + 180秒
        # 所以：上半场 = (总时长 + 180) / 2
        half=$(( (duration + 180) / 2 ))
        
        part1="$OUTPUT_DIR/${name}（上）.m4a"
        part2="$OUTPUT_DIR/${name}（下）.m4a"
        
        # 分割前半部分
        ffmpeg -i "$audio_file" -t "$half" -c copy "$part1" -y -loglevel error
        
        # 分割后半部分
        ffmpeg -i "$audio_file" -ss "$half" -c copy "$part2" -y -loglevel error
        
        if [ $? -eq 0 ]; then
            # 删除原始音频文件
            rm "$audio_file"
            
            d1=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$part1" | cut -d. -f1)
            d2=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$part2" | cut -d. -f1)
            h1=$((d1 / 3600))
            m1=$(((d1 % 3600) / 60))
            h2=$((d2 / 3600))
            m2=$(((d2 % 3600) / 60))
            
            echo "  ✓ 分割完成:（上）${h1}h${m1}m, （下）${h2}h${m2}m"
        else
            echo "  ❌ 分割失败"
        fi
    fi
    
    echo ""
done

echo "处理完成！"
echo "输出目录: $OUTPUT_DIR"
ls -la "$OUTPUT_DIR"
