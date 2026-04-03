#!/bin/bash
# 续处理脚本 - 从111开始

INPUT_DIR="/Users/tang/Downloads/研讨会视频 51-100"
OUTPUT_DIR="/Users/tang/Downloads/研讨会音频 51-123"

echo "继续处理剩余视频文件..."
echo "输出目录: $OUTPUT_DIR"
echo ""

# 只处理111及以上的文件
for video in "$INPUT_DIR"/*.mp4; do
    filename=$(basename "$video")
    # 提取数字部分
    num=$(echo "$filename" | grep -oE '^[0-9]+' | sed 's/^0*//')
    
    # 如果数字小于111，跳过
    if [ "$num" -lt 111 ]; then
        continue
    fi
    
    name="${filename%.mp4}"
    audio_file="$OUTPUT_DIR/${name}.m4a"
    
    echo "处理: $filename"
    
    # 提取音频
    ffmpeg -i "$video" -vn -c:a aac -b:a 128k "$audio_file" -y -loglevel error
    
    if [ $? -ne 0 ]; then
        echo "  ❌ 转换失败: $filename"
        continue
    fi
    
    # 获取音频时长
    duration=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$audio_file" | cut -d. -f1)
    hours=$((duration / 3600))
    minutes=$(((duration % 3600) / 60))
    
    echo "  ✓ 转换完成，时长: ${hours}小时${minutes}分钟"
    
    # 超过3小时则分割
    if [ "$duration" -gt 10800 ]; then
        echo "  ⏱ 超过3小时，开始分割..."
        
        half=$(( (duration + 180) / 2 ))
        
        part1="$OUTPUT_DIR/${name}（上）.m4a"
        part2="$OUTPUT_DIR/${name}（下）.m4a"
        
        ffmpeg -i "$audio_file" -t "$half" -c copy "$part1" -y -loglevel error
        ffmpeg -i "$audio_file" -ss "$half" -c copy "$part2" -y -loglevel error
        
        if [ $? -eq 0 ]; then
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
