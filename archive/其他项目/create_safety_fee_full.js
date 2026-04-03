const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        AlignmentType, BorderStyle, WidthType, HeadingLevel } = require('docx');
const fs = require('fs');

// 创建单元格的辅助函数
function createCell(text, options = {}) {
  const { bold = false, width = 9000, colSpan = 1 } = options;
  const borders = {
    top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
  };
  
  return new TableCell({
    borders: borders,
    width: { size: width, type: WidthType.DXA },
    columnSpan: colSpan,
    children: [new Paragraph({
      children: [new TextRun({ text: text, bold: bold, size: 21, font: "宋体" })]
    })]
  });
}

// 创建文档内容
const children = [
  // 公司名
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: "宇宙木业公司管理文件", bold: true, size: 36, font: "黑体" })]
  }),
  
  // 空行
  new Paragraph({ spacing: { after: 100 }, children: [] }),
  
  // 文件编号表格
  new Table({
    columnWidths: [1500, 7500],
    rows: [
      new TableRow({ children: [
        createCell("文件编号", { bold: true, width: 1500 }),
        createCell("Q/YZMY AQ 05-2024", { width: 7500 })
      ]}),
      new TableRow({ children: [
        createCell("标   题", { bold: true, width: 1500 }),
        createCell("安全生产费用管理制度", { width: 7500 })
      ]}),
      new TableRow({ children: [
        createCell("编 制", { bold: true, width: 1500 }),
        createCell("", { width: 7500 })
      ]}),
      new TableRow({ children: [
        createCell("审 核", { bold: true, width: 1500 }),
        createCell("", { width: 7500 })
      ]}),
      new TableRow({ children: [
        createCell("批 准", { bold: true, width: 1500 }),
        createCell("", { width: 7500 })
      ]}),
      new TableRow({ children: [
        createCell("日 期", { bold: true, width: 1500 }),
        createCell("", { width: 7500 })
      ]}),
      new TableRow({ children: [
        createCell("会 签", { bold: true, width: 1500 }),
        createCell("日期：", { width: 7500 })
      ]}),
      new TableRow({ children: [
        createCell("会 签", { bold: true, width: 1500 }),
        createCell("日期：", { width: 7500 })
      ]}),
      new TableRow({ children: [
        createCell("版 次", { bold: true, width: 1500 }),
        createCell("A", { width: 7500 })
      ]}),
      new TableRow({ children: [
        createCell("页 数", { bold: true, width: 1500 }),
        createCell("6", { width: 7500 })
      ]})
    ]
  }),
  
  // 空行
  new Paragraph({ spacing: { before: 300, after: 200 }, children: [] }),
  
  // 更改记录标题
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
    children: [new TextRun({ text: "更改记录", bold: true, size: 24, font: "黑体" })]
  }),
  
  // 更改记录表格
  new Table({
    columnWidths: [1500, 1800, 1500, 1500, 1700],
    rows: [
      new TableRow({ children: [
        createCell("日期", { bold: true, width: 1500 }),
        createCell("更改单编号", { bold: true, width: 1800 }),
        createCell("更改页次", { bold: true, width: 1500 }),
        createCell("更改后版次", { bold: true, width: 1500 }),
        createCell("更改人", { bold: true, width: 1700 })
      ]})
    ]
  }),
  
  // 空行
  new Paragraph({ spacing: { before: 400, after: 200 }, children: [] }),
  
  // 一、目的和适用范围
  new Paragraph({
    spacing: { before: 200, after: 150 },
    children: [new TextRun({ text: "一、目的和适用范围", bold: true, size: 28, font: "黑体" })]
  }),
  
  new Paragraph({
    spacing: { before: 150, after: 100 },
    children: [new TextRun({ text: "（一）目的", bold: true, size: 24, font: "宋体" })]
  }),
  
  new Paragraph({
    spacing: { after: 100 },
    children: [new TextRun({ text: "为了建立公司安全生产投入长效机制，规范安全生产费用的提取、使用和管理，保证安全生产费用有效投入，改善公司安全生产条件，保障员工生命安全和身体健康，根据《中华人民共和国安全生产法》《企业安全生产费用提取和使用管理办法》等相关法律法规要求，结合公司实际，特制定本制度。", size: 24, font: "宋体" })]
  }),
  
  new Paragraph({
    spacing: { before: 150, after: 100 },
    children: [new TextRun({ text: "（二）适用范围", bold: true, size: 24, font: "宋体" })]
  }),
  
  new Paragraph({
    spacing: { after: 100 },
    children: [new TextRun({ text: "本制度适用于公司安全生产费用的提取、使用、管理和监督的全过程管理，包括但不限于以下活动：", size: 24, font: "宋体" })]
  }),
  
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "1. 安全生产费用的年度预算编制与审批；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "2. 安全生产费用的月度提取与专户核算；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "3. 安全生产费用的使用申请、审批与支付；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "4. 安全生产投入项目的实施、验收与效果评估；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "5. 安全生产费用的台账管理、统计分析与报告；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "6. 安全生产费用使用情况的监督检查与考核。", size: 24, font: "宋体" })] }),
  
  // 二、相关文件和定义
  new Paragraph({
    spacing: { before: 300, after: 150 },
    children: [new TextRun({ text: "二、相关文件和定义", bold: true, size: 28, font: "黑体" })]
  }),
  
  new Paragraph({
    spacing: { before: 150, after: 100 },
    children: [new TextRun({ text: "（一）相关文件", bold: true, size: 24, font: "宋体" })]
  }),
  
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "《中华人民共和国安全生产法》（2021年修订）", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "《企业安全生产费用提取和使用管理办法》（财资〔2022〕136号）", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "《中华人民共和国会计法》", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "GB/T 33000-2016 企业安全生产标准化基本规范", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "《木材加工企业安全生产标准化评定标准》", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "《企业会计准则》", size: 24, font: "宋体" })] }),
  
  new Paragraph({
    spacing: { before: 150, after: 100 },
    children: [new TextRun({ text: "（二）术语和定义", bold: true, size: 24, font: "宋体" })]
  }),
  
  new Paragraph({
    spacing: { after: 100 },
    children: [new TextRun({ text: "安全生产费用：指企业按照规定标准提取，在成本中列支，专门用于完善和改进企业或者项目安全生产条件的资金。安全生产费用按照'企业提取、政府监管、确保需要、规范使用'的原则进行管理。", size: 24, font: "宋体" })]
  }),
  
  new Paragraph({
    spacing: { after: 100 },
    children: [new TextRun({ text: "安全生产费用提取标准：指企业按照上年度营业收入的一定比例提取安全生产费用的计算依据。木材加工及木、竹、藤、棕、草制品业按照营业收入的1.5%提取。", size: 24, font: "宋体" })]
  }),
  
  new Paragraph({
    spacing: { after: 200 },
    children: [new TextRun({ text: "专户核算：指企业在财务账簿中单独设立安全生产费用科目，对安全生产费用的提取、使用情况进行单独核算，确保专款专用。", size: 24, font: "宋体" })]
  }),
  
  // 三、职责
  new Paragraph({
    spacing: { before: 300, after: 150 },
    children: [new TextRun({ text: "三、职责", bold: true, size: 28, font: "黑体" })]
  }),
  
  new Paragraph({
    spacing: { before: 150, after: 100 },
    children: [new TextRun({ text: "（一）总经理", bold: true, size: 24, font: "宋体" })]
  }),
  
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "1. 负责审批公司年度安全生产费用提取和使用计划，确保安全投入满足安全生产需要；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "2. 负责审批单笔金额超过5万元的安全生产费用支出；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "3. 定期听取安全生产费用投入和使用情况的汇报，研究解决安全投入中的重大问题；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "4. 保证安全生产费用投入的有效实施，不得以任何理由削减或挪用；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "5. 对安全生产费用投入的决策和效果负最终责任。", size: 24, font: "宋体" })] }),
  
  new Paragraph({
    spacing: { before: 150, after: 100 },
    children: [new TextRun({ text: "（二）安环部", bold: true, size: 24, font: "宋体" })]
  }),
  
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "1. 负责组织编制公司年度安全生产费用提取和使用计划，于每年12月底前完成下年度计划编制；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "2. 负责审核各部门提交的安全生产费用使用申请，对必要性、合规性、预算合理性进行审查；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "3. 负责监督安全生产费用的使用情况，确保专款专用，防止挪用、挤占；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "4. 负责建立和维护安全生产费用管理台账，详细记录每笔费用的提取、使用、结余情况；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "5. 负责组织对安全投入项目的验收，参与项目效果评估；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "6. 负责每季度汇总分析安全生产费用使用情况，形成分析报告提交总经理；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "7. 负责对各部门安全生产费用使用情况进行监督检查和考核评价。", size: 24, font: "宋体" })] }),
  
  new Paragraph({
    spacing: { before: 150, after: 100 },
    children: [new TextRun({ text: "（三）财务部", bold: true, size: 24, font: "宋体" })]
  }),
  
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "1. 负责按照规定的提取标准和程序，按月提取安全生产费用，计入成本；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "2. 负责在财务账簿中设立安全生产费用专户，进行专户核算；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "3. 负责审核安全费用支出凭证的真实性、合法性、完整性，办理资金支付；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "4. 负责按月编制安全生产费用提取和使用报表，提交安环部；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "5. 负责在年度财务报告中披露安全生产费用提取和使用情况；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "6. 配合安环部做好安全生产费用的监督检查工作。", size: 24, font: "宋体" })] }),
  
  new Paragraph({
    spacing: { before: 150, after: 100 },
    children: [new TextRun({ text: "（四）各部门", bold: true, size: 24, font: "宋体" })]
  }),
  
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "1. 负责根据本部门安全生产工作实际需求，提出年度和月度安全生产费用使用申请；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "2. 负责本部门安全投入项目的组织实施，确保项目按计划完成；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "3. 负责收集整理安全投入项目的相关资料，组织项目验收，形成验收报告；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "4. 负责建立本部门安全投入项目台账，记录项目实施情况；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "5. 配合安环部和财务部做好安全生产费用的监督检查和考核工作。", size: 24, font: "宋体" })] }),
  
  // 四、管理要求
  new Paragraph({
    spacing: { before: 300, after: 150 },
    children: [new TextRun({ text: "四、管理要求", bold: true, size: 28, font: "黑体" })]
  }),
  
  new Paragraph({
    spacing: { before: 150, after: 100 },
    children: [new TextRun({ text: "（一）安全生产费用提取", bold: true, size: 24, font: "宋体" })]
  }),
  
  new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "1. 提取标准：公司按照上年度营业收入的1.5%提取安全生产费用。当年计提的安全生产费用不足的，超出部分按正常成本费用渠道列支；年度结余资金结转下年度使用。", size: 24, font: "宋体" })] }),
  
  new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "2. 提取时间：安全生产费用按月提取，于每月10日前完成上月安全生产费用的提取。财务部应根据上月实际营业收入计算应提取金额，及时计入成本。", size: 24, font: "宋体" })] }),
  
  new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "3. 提取程序：财务部于每月5日前统计上月营业收入，按1.5%比例计算应提取金额，编制《安全生产费用提取计算表》，经财务负责人审核后，于每月10日前完成提取并计入安全生产费用专户。", size: 24, font: "宋体" })] }),
  
  new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "4. 专户核算：财务部应在财务账簿中单独设立"安全生产费用"科目，对安全生产费用的提取、使用、结余情况进行单独核算，确保专款专用，不得与其他费用混用。", size: 24, font: "宋体" })] }),
  
  new Paragraph({
    spacing: { before: 150, after: 100 },
    children: [new TextRun({ text: "（二）安全生产费用使用范围", bold: true, size: 24, font: "宋体" })]
  }),
  
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "安全生产费用应当用于以下方面：", size: 24, font: "宋体" })] }),
  
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "1. 完善、改造和维护安全防护设施设备支出（不含'三同时'要求初期投入），包括车间除尘系统、防爆设备、消防系统、安全监控系统等；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "2. 配备、维护、保养应急救援器材、设备支出和应急演练支出，包括应急物资、救援装备、应急照明、疏散指示标志等；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "3. 开展重大危险源和事故隐患评估、监控和整改支出，包括粉尘爆炸危险源监控、火灾隐患排查治理等；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "4. 安全生产检查、评价、咨询和标准化建设支出，包括第三方安全检查、安全评价、技术咨询、标准化评审等；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "5. 安全生产宣传、教育、培训支出，包括安全培训教材、培训场地、外聘讲师、安全宣传活动等；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "6. 配备和更新现场作业人员安全防护用品支出，包括防尘口罩、防护眼镜、防护服、安全帽、安全鞋等；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "7. 安全生产适用的新技术、新标准、新工艺、新装备的推广应用支出；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "8. 安全设施及特种设备检测检验支出，包括消防设施检测、电气安全检测、锅炉压力容器检验等；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 200 }), children: [new TextRun({ text: "9. 其他与安全生产直接相关的支出。", size: 24, font: "宋体" })] }),
  
  new Paragraph({
    spacing: { before: 150, after: 100 },
    children: [new TextRun({ text: "（三）安全生产费用使用程序", bold: true, size: 24, font: "宋体" })]
  }),
  
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "1. 需求申请：各部门根据安全生产工作实际需求，填写《安全生产费用使用申请表》，详细说明项目名称、预算金额、实施时间、预期效果等内容，经部门负责人审核后提交安环部。", size: 24, font: "宋体" })] }),
  
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "2. 部门审核：安环部收到申请后，对项目的必要性、合规性、预算合理性进行审核，提出审核意见。对于不符合要求的申请，退回申请部门并说明理由。", size: 24, font: "宋体" })] }),
  
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "3. 财务审核：经安环部审核通过的申请，提交财务部审核资金情况和预算安排。", size: 24, font: "宋体" })] }),
  
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "4. 审批权限：", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "   （1）单笔金额5000元以下的，由安环部负责人审批；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "   （2）单笔金额5000元以上5万元以下的，由分管副总审批；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }), children: [new TextRun({ text: "   （3）单笔金额5万元以上的，由总经理审批。", size: 24, font: "宋体" })] }),
  
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "5. 项目实施：经审批同意的项目，由申请部门组织实施，严格按照批准的预算和方案执行。", size: 24, font: "宋体" })] }),
  
  new Paragraph({ spacing: { after: 50 }), children: [new TextRun({ text: "6. 验收结算：项目实施完成后，申请部门组织验收，形成《安全投入项目验收报告》，经安环部确认后，办理财务结算手续。", size: 24, font: "宋体" })] }),
  
  new Paragraph({
    spacing: { before: 150, after: 100 },
    children: [new TextRun({ text: "（四）安全生产费用管理", bold: true, size: 24, font: "宋体" })]
  }),
  
  new Paragraph({ spacing: { after: 100 }), children: [new TextRun({ text: "1. 安全生产费用实行专款专用，任何部门和个人不得挤占、挪用。对于违反规定挤占、挪用安全生产费用的，一经发现，严肃处理。", size: 24, font: "宋体" })] }),
  
  new Paragraph({ spacing: { after: 100 }), children: [new TextRun({ text: "2. 安环部应建立安全生产费用管理台账，详细记录每笔费用的提取时间、金额、使用项目、使用时间、使用金额、结余金额等信息，做到账实相符、账账相符。", size: 24, font: "宋体" })] }),
  
  new Paragraph({ spacing: { after: 100 }), children: [new TextRun({ text: "3. 财务部应在年度财务报告中单独披露安全生产费用提取和使用情况，接受股东和监管部门的监督。", size: 24, font: "宋体" })] }),
  
  new Paragraph({ spacing: { after: 200 }), children: [new TextRun({ text: "4. 当年计提的安全生产费用不足的，超出部分按正常成本费用渠道列支；年度结余资金结转下年度使用，不得挪作他用。", size: 24, font: "宋体" })] }),
  
  new Paragraph({
    spacing: { before: 150, after: 100 },
    children: [new TextRun({ text: "（五）监督与考核", bold: true, size: 24, font: "宋体" })]
  }),
  
  new Paragraph({ spacing: { after: 50 }), children: [new TextRun({ text: "1. 安环部每季度对安全生产费用使用情况进行检查，重点检查是否专款专用、是否按程序审批、是否达到预期效果等，形成检查报告。", size: 24, font: "宋体" })] }),
  
  new Paragraph({ spacing: { after: 50 }), children: [new TextRun({ text: "2. 总经理每年至少听取一次安全生产费用投入情况汇报，研究解决安全投入中的重大问题。", size: 24, font: "宋体" })] }),
  
  new Paragraph({ spacing: { after: 50 }), children: [new TextRun({ text: "3. 对违反本制度规定，有下列行为之一的，依据公司相关规定进行考核：", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }), children: [new TextRun({ text: "   （1）未按标准提取安全生产费用的；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }), children: [new TextRun({ text: "   （2）挤占、挪用安全生产费用的；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }), children: [new TextRun({ text: "   （3）未按程序审批使用安全生产费用的；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }), children: [new TextRun({ text: "   （4）安全投入项目实施不力，未达到预期效果的；", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 200 }), children: [new TextRun({ text: "   （5）其他违反本制度规定的行为。", size: 24, font: "宋体" })] }),
  
  // 五、相关记录
  new Paragraph({
    spacing: { before: 300, after: 150 },
    children: [new TextRun({ text: "五、相关记录", bold: true, size: 28, font: "黑体" })]
  }),
  
  new Paragraph({ spacing: { after: 50 }), children: [new TextRun({ text: "《年度安全生产费用提取和使用计划》", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }), children: [new TextRun({ text: "《安全生产费用提取计算表》", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }), children: [new TextRun({ text: "《安全生产费用使用申请表》", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }), children: [new TextRun({ text: "《安全生产费用管理台账》", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }), children: [new TextRun({ text: "《安全投入项目验收报告》", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 200 }), children: [new TextRun({ text: "《安全生产费用年度报表》", size: 24, font: "宋体" })] }),
  
  // 六、附则
  new Paragraph({
    spacing: { before: 300, after: 150 },
    children: [new TextRun({ text: "六、附则", bold: true, size: 28, font: "黑体" })]
  }),
  
  new Paragraph({
    spacing: { after: 150 },
    children: [new TextRun({ text: "本制度由安环部负责解释。", size: 24, font: "宋体" })]
  }),
  
  new Paragraph({
    spacing: { after: 200 },
    children: [new TextRun({ text: "本制度自批准发布之日起实施。", size: 24, font: "宋体" })]
  }),
  
  // 附件
  new Paragraph({
    spacing: { before: 300, after: 150 },
    children: [new TextRun({ text: "附件：", bold: true, size: 24, font: "黑体" })]
  }),
  
  new Paragraph({ spacing: { after: 50 }), children: [new TextRun({ text: "附件1：安全生产费用使用申请表", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }), children: [new TextRun({ text: "附件2：安全投入项目验收报告", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 200 }), children: [new TextRun({ text: "附件3：安全生产费用管理台账（样表）", size: 24, font: "宋体" })] })
];

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "宋体", size: 24 }
      }
    }
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: children
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/Users/tang/Desktop/宇宙木业公司_安全生产费用管理制度_完整版.docx", buffer);
  console.log("完整版制度已生成！");
});
