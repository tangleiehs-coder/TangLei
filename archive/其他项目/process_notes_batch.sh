#!/bin/bash

API_KEY="gk_live_cf16f669aadd5838.ac08b5d2361092ff8c2eea98bff397181f06a1523845f1d8"
CLIENT_ID="cli_3802f9db08b811f197679c63c078bacc"

process_note() {
    local old_id=$1
    local title=$2
    local tags=$3
    local search_query=$4
    
    echo "【处理】旧ID: $old_id"
    echo "       新标题: $title"
    
    # 获取内容
    CONTENT=$(curl -s -X POST "https://openapi.biji.com/open/api/v1/resource/recall" \
      -H "Authorization: $API_KEY" \
      -H "X-Client-ID: $CLIENT_ID" \
      -H "Content-Type: application/json" \
      -d "{\"query\": \"$search_query\", \"top_k\": 1}" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['data']['results'][0]['content'] if d.get('success') and d['data'].get('results') else '')")
    
    # 创建新笔记
    NEW_ID=$(curl -s -X POST "https://openapi.biji.com/open/api/v1/resource/note/save" \
      -H "Authorization: $API_KEY" \
      -H "X-Client-ID: $CLIENT_ID" \
      -H "Content-Type: application/json" \
      -d "{
        \"title\": \"$title\",
        \"content\": \"${CONTENT}\",
        \"note_type\": \"plain_text\",
        \"tags\": [$tags]
      }" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['data']['id'] if d.get('success') else 'FAIL')")
    
    if [ "$NEW_ID" != "FAIL" ]; then
        echo "       ✅ 新ID: $NEW_ID"
        
        # 删除旧笔记
        curl -s -X POST "https://openapi.biji.com/open/api/v1/resource/note/delete" \
          -H "Authorization: $API_KEY" \
          -H "X-Client-ID: $CLIENT_ID" \
          -H "Content-Type: application/json" \
          -d "{\"note_id\": $old_id}" > /dev/null
        echo "       ✅ 删除成功"
    else
        echo "       ❌ 创建失败"
    fi
    
    sleep 60
}

# 学习方法类（剩余4条）
process_note "1863636362212096993" "[方法] 正向反馈的两种类型" "\"学习方法\", \"反馈\", \"激励\"" "正向反馈 情绪反馈 认知反馈"
process_note "1863636383685360609" "[工具] 微信读书：便捷的移动学习方式" "\"学习方法\", \"工具\", \"微信读书\"" "微信读书 移动学习"
process_note "1863636399794109409" "[方法] 描述案例内化知识的标准" "\"学习方法\", \"案例分析\", \"知识内化\"" "描述案例 内化知识"
process_note "1863636378319272929" "[理论] 心流通道与成长区域" "\"学习方法\", \"心流\", \"个人成长\"" "心流通道 舒适区 拉伸区 困难区"

# 顾问技能类（10条）
process_note "1863636390127811553" "[顾问技能] 成员不配合工作的应对策略" "\"顾问技能\", \"沟通协调\", \"项目管理\"" "成员不配合 组织协调"
process_note "1863636390132005857" "[顾问技能] 如何提高在客户心目中的可靠性" "\"顾问技能\", \"可靠性\", \"客户信任\"" "客户可靠性 信赖"
process_note "1863636390131481569" "[模型] 信任公式：可信可靠亲近" "\"顾问技能\", \"信任模型\", \"沟通\"" "信任公式 可信度 可靠度 亲近感"
process_note "1863636391202077665" "[顾问技能] 明确表达事实情绪期待" "\"顾问技能\", \"沟通\", \"情绪管理\"" "表达事实 情绪 期待"
process_note "1863636390130432993" "[顾问技能] 技术问题与非技术问题" "\"顾问技能\", \"问题解决\", \"EHS职业化\"" "技术问题 非技术问题"
process_note "1863636391203650529" "[顾问技能] 用提问方式提建议" "\"顾问技能\", \"沟通\", \"领导力\"" "提建议 提问方法"
process_note "1863636391201553377" "[顾问技能] 求助比命令更易接受" "\"顾问技能\", \"沟通\", \"影响力\"" "求助 命令"
process_note "1863636389057215457" "[模型] TK冲突模型：五种应对方式" "\"顾问技能\", \"冲突管理\", \"沟通\"" "TK模型 Thomas-Kilmann"
process_note "1863636389056166881" "[顾问技能] 如何让复杂的改变发生" "\"顾问技能\", \"变革管理\", \"领导力\"" "复杂改变 安全文化"
process_note "1863636390129384417" "[顾问技能] 两种风险类型" "\"顾问技能\", \"风险管理\", \"EHS职业化\"" "风险类型 做不该做 不做该做"

echo ""
echo "🎉 全部16条处理完成！"
