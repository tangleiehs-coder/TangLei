#!/bin/bash
# 简化版：为第6节音频配上深蓝背景+标题画面

cd ~/Desktop/瓜瓜成果/课程制作/第6节_工具落地

# 创建纯色背景图
ffmpeg -y -f lavfi -i "color=c=#0f172a:s=1920x1080:d=635" -vf "
drawtext=text='361°安全教练':fontsize=80:fontcolor=#fbbf24:x=(w-text_w)/2:y=400,
drawtext=text='第六节 · 工具落地':fontsize=48:fontcolor=white:x=(w-text_w)/2:y=520,
drawtext=text='把学到的东西理清楚 · 带回去用起来':fontsize=36:fontcolor=#94a3b8:x=(w-text_w)/2:y=620
" -c:v libx264 -t 635 -pix_fmt yuv420p temp_video.mp4

# 合并音频
ffmpeg -y -i temp_video.mp4 -i 第6节_音频.mp3 -c:v copy -c:a aac -b:a 192k -shortest 第6节_最终版.mp4

# 清理
rm temp_video.mp4

echo "完成: 第6节_最终版.mp4"
ls -lh 第6节_最终版.mp4