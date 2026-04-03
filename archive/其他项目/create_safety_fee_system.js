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

// 创建文档
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
        createCell("4", { width: 7500 })
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
    spacing: { after: 150 },
    children: [new TextRun({ text: "为了建立公司安全生产投入长效机制，规范安全生产费用的提取、使用和管理，保证安全生产费用有效投入，根据相关法律法规要求，特制定本制度。", size: 24, font: "宋体" })]
  }),
  
  new Paragraph({
    spacing: { before: 150, after: 100 },
    children: [new TextRun({ text: "（二）适用范围", bold: true, size: 24, font: "宋体" })]
  }),
  
  new Paragraph({
    spacing: { after: 200 },
    children: [new TextRun({ text: "本制度适用于公司安全生产费用的提取、使用、管理和监督。", size: 24, font: "宋体" })]
  }),
  
  // 二、相关文件和定义
  new Paragraph({
    spacing: { before: 300, after: 150 },
    children: [new TextRun({ text: "二、相关文件和定义", bold: true, size: 28, font: "黑体" })]
  }),
  
  new Paragraph({
    spacing: { before: 150, after: 100 },
    children: [new TextRun({ text: "（一）相关文件", bold: true, size: 24, font: "宋体" })]
  }),
  
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "《中华人民共和国安全生产法》", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "《企业安全生产费用提取和使用管理办法》（财资〔2022〕136号）", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "GB/T 33000 企业安全生产标准化基本规范", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 150 }, children: [new TextRun({ text: "《木材加工企业安全生产标准化评定标准》", size: 24, font: "宋体" })] }),
  
  new Paragraph({
    spacing: { before: 150, after: 100 },
    children: [new TextRun({ text: "（二）定义", bold: true, size: 24, font: "宋体" })]
  }),
  
  new Paragraph({
    spacing: { after: 200 },
    children: [new TextRun({ text: "安全生产费用：指企业按照规定标准提取，专门用于完善和改进企业安全生产条件的资金。", size: 24, font: "宋体" })]
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
  
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "负责审批年度安全生产费用提取和使用计划。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "负责审批重大安全投入项目。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 150 }, children: [new TextRun({ text: "保证安全生产费用投入的有效实施。", size: 24, font: "宋体" })] }),
  
  new Paragraph({
    spacing: { before: 150, after: 100 },
    children: [new TextRun({ text: "（二）安环部", bold: true, size: 24, font: "宋体" })]
  }),
  
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "负责编制年度安全生产费用提取和使用计划。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "负责监督安全生产费用的使用情况。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "负责建立安全生产费用台账。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 150 }, children: [new TextRun({ text: "负责对安全生产费用投入效果进行评估。", size: 24, font: "宋体" })] }),
  
  new Paragraph({
    spacing: { before: 150, after: 100 },
    children: [new TextRun({ text: "（三）财务部", bold: true, size: 24, font: "宋体" })]
  }),
  
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "负责按规定提取安全生产费用，专户核算。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "负责审核安全费用支出凭证，办理资金支付。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 150 }, children: [new TextRun({ text: "负责编制安全生产费用财务报表。", size: 24, font: "宋体" })] }),
  
  new Paragraph({
    spacing: { before: 150, after: 100 },
    children: [new TextRun({ text: "（四）各部门", bold: true, size: 24, font: "宋体" })]
  }),
  
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "负责提出本部门安全生产费用使用需求。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "负责本部门安全投入项目的实施和验收。", size: 24, font: "宋体" })] }),
  
  // 四、管理要求
  new Paragraph({
    spacing: { before: 300, after: 150 },
    children: [new TextRun({ text: "四、管理要求", bold: true, size: 28, font: "黑体" })]
  }),
  
  new Paragraph({
    spacing: { before: 150, after: 100 },
    children: [new TextRun({ text: "（一）安全生产费用提取", bold: true, size: 24, font: "宋体" })]
  }),
  
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "公司按照上年度营业收入的1.5%提取安全生产费用。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "安全生产费用按月提取，计入成本，专户核算。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 150 }, children: [new TextRun({ text: "财务部应于每月10日前完成上月安全生产费用的提取。", size: 24, font: "宋体" })] }),
  
  new Paragraph({
    spacing: { before: 150, after: 100 },
    children: [new TextRun({ text: "（二）安全生产费用使用范围", bold: true, size: 24, font: "宋体" })]
  }),
  
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "完善、改造和维护安全防护设施设备支出（不含“三同时”要求初期投入）。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "配备、维护、保养应急救援器材、设备支出和应急演练支出。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "开展重大危险源和事故隐患评估、监控和整改支出。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "安全生产检查、评价（不包括新建、改建、扩建项目安全评价）、咨询和标准化建设支出。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "安全生产宣传、教育、培训支出。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "配备和更新现场作业人员安全防护用品支出。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "安全生产适用的新技术、新标准、新工艺、新装备的推广应用支出。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "安全设施及特种设备检测检验支出。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 150 }, children: [new TextRun({ text: "其他与安全生产直接相关的支出。", size: 24, font: "宋体" })] }),
  
  new Paragraph({
    spacing: { before: 150, after: 100 },
    children: [new TextRun({ text: "（三）安全生产费用使用程序", bold: true, size: 24, font: "宋体" })]
  }),
  
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "各部门根据实际需求提出安全费用使用申请，填写《安全生产费用使用申请表》。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "安环部对申请进行审核，提出审核意见。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "财务部审核预算和资金情况。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "总经理审批后，财务部办理支付。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 150 }, children: [new TextRun({ text: "项目实施完成后，申请部门组织验收，安环部参与监督。", size: 24, font: "宋体" })] }),
  
  new Paragraph({
    spacing: { before: 150, after: 100 },
    children: [new TextRun({ text: "（四）安全生产费用管理", bold: true, size: 24, font: "宋体" })]
  }),
  
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "安全生产费用实行专款专用，不得挤占、挪用。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "安环部应建立安全生产费用台账，记录提取和使用情况。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "财务部应在年度财务报告中披露安全生产费用提取和使用情况。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "当年计提的安全生产费用不足的，超出部分按正常成本费用渠道列支。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "年度结余资金结转下年度使用。", size: 24, font: "宋体" })] }),
  
  new Paragraph({
    spacing: { before: 150, after: 100 },
    children: [new TextRun({ text: "（五）监督与考核", bold: true, size: 24, font: "宋体" })]
  }),
  
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "安环部每季度对安全生产费用使用情况进行检查。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "总经理每年至少听取一次安全生产费用投入情况汇报。", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "对挪用、挤占安全生产费用的行为，依据公司相关规定进行考核。", size: 24, font: "宋体" })] }),
  
  // 五、相关记录
  new Paragraph({
    spacing: { before: 300, after: 150 },
    children: [new TextRun({ text: "五、相关记录", bold: true, size: 28, font: "黑体" })]
  }),
  
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "《年度安全生产费用提取和使用计划》", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "《安全生产费用使用申请表》", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: "《安全生产费用台账》", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "《安全生产费用年度报表》", size: 24, font: "宋体" })] }),
  
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
  })
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
  fs.writeFileSync("/Users/tang/Desktop/宇宙木业公司_安全生产费用管理制度.docx", buffer);
  console.log("制度已生成！");
});
