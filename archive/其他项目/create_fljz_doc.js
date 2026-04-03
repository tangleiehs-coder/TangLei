const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        AlignmentType, BorderStyle, WidthType } = require('docx');
const fs = require('fs');

// 创建8要素页眉
function createHeaderElements() {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
      bottom: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
      left: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
      right: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "000000" }
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            columnSpan: 4,
            children: [new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: "飞龙加油站加油作业安全操作规程", bold: true, size: 28, font: "黑体" })]
            })]
          })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            children: [new Paragraph({ children: [new TextRun({ text: "文件编号：Q/FLJZ AQ 03-2024", size: 18, font: "宋体" })] })]
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            children: [new Paragraph({ children: [new TextRun({ text: "版本号：A/0", size: 18, font: "宋体" })] })]
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            children: [new Paragraph({ children: [new TextRun({ text: "编制部门：安全管理部门", size: 18, font: "宋体" })] })]
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            children: [new Paragraph({ children: [new TextRun({ text: "页码：第 X 页 共 X 页", size: 18, font: "宋体" })] })]
          })
        ]
      })
    ]
  });
}

// 创建标题
function createTitle(text, level = 1) {
  const sizes = { 1: 32, 2: 28, 3: 24 };
  return new Paragraph({
    spacing: { before: 300, after: 200 },
    children: [new TextRun({ text: text, bold: true, size: sizes[level] || 24, font: "黑体" })]
  });
}

// 创建正文
function createParagraph(text, indent = true) {
  return new Paragraph({
    spacing: { before: 100, after: 100 },
    indent: indent ? { firstLine: 420 } : undefined,
    children: [new TextRun({ text: text, size: 24, font: "宋体" })]
  });
}

// 创建列表项
function createListItem(text) {
  return new Paragraph({
    spacing: { before: 50, after: 50 },
    indent: { firstLine: 420 },
    children: [new TextRun({ text: "• " + text, size: 24, font: "宋体" })]
  });
}

// 文档内容
const children = [
  createHeaderElements(),
  new Paragraph({ spacing: { after: 200 }, children: [] }),
  
  createTitle("1 目的", 1),
  createParagraph("为规范飞龙加油站加油作业行为，防止火灾、爆炸等事故发生，保障员工和顾客生命安全，根据《安全生产法》《危险化学品安全管理条例》等法律法规，制定本规程。"),
  
  createTitle("2 适用范围", 1),
  createParagraph("本规程适用于飞龙加油站内所有汽油、柴油加油作业活动。"),
  new Paragraph({ spacing: { before: 100, after: 100 }, children: [new TextRun({ text: "本站油品信息：", bold: true, size: 24, font: "宋体" })] }),
  createListItem("汽油：92#、95#（储存量约30吨）"),
  createListItem("柴油：0#（储存量约20吨）"),
  
  createTitle("3 引用文件", 1),
  createListItem("《中华人民共和国安全生产法》（2021年修订）"),
  createListItem("《危险化学品安全管理条例》（国务院令第591号）"),
  createListItem("《加油站作业安全规范》（AQ 3010-2007）"),
  createListItem("《汽车加油加气加氢站技术标准》（GB 50156-2021）"),
  
  createTitle("4 术语和定义", 1),
  createTitle("4.1 加油作业", 2),
  createParagraph("指使用加油机向汽车油箱加注汽油或柴油的作业活动。"),
  createTitle("4.2 油气回收", 2),
  createParagraph("指在加油过程中，将汽车油箱内挥发的油气收集回收到储罐的系统。"),
  
  createTitle("5 职责分工", 1),
  createTitle("5.1 站长（主要负责人）", 2),
  createListItem("每月5日前组织加油作业安全检查；"),
  createListItem("每季度首月10日前组织加油作业安全培训；"),
  createListItem("批准加油作业相关安全投入。"),
  
  createTitle("5.2 安全管理人员", 2),
  createListItem("每日8:00前完成加油区安全巡查；"),
  createListItem("每周五17:00前汇总加油作业隐患并上报站长；"),
  createListItem("每月10日前检查加油机静电接地有效性。"),
  
  createTitle("5.3 班组长", 2),
  createListItem("每班作业前15分钟组织班前安全会；"),
  createListItem("每2小时巡查一次加油作业现场；"),
  createListItem("发现违章作业立即制止并纠正。"),
  
  createTitle("5.4 加油员", 2),
  createListItem("作业前检查个人防护装备和加油设备；"),
  createListItem("严格按照操作规程进行加油作业；"),
  createListItem("发现异常情况立即停止作业并报告班组长。"),
  
  createTitle("6 作业前准备", 1),
  createTitle("6.1 人员准备", 2),
  createParagraph("每班作业前15分钟，班组长召开班前会，检查人员精神状态，强调当日安全注意事项。"),
  createParagraph("每日首次作业前，加油员检查工作服（防静电）、工作鞋（防滑防静电），严禁穿化纤服装和带铁钉鞋。"),
  createParagraph("每班作业前，加油员检查是否携带火种、手机等非防爆物品，一律存放至指定位置。"),
  
  createTitle("6.2 设备检查", 2),
  createParagraph("每班作业前，当班加油员检查加油机外观（无渗漏、无破损、显示屏正常）、加油枪及集气罩（无破损、密封良好）、加油胶管（无裂纹、无渗漏、接头牢固）、静电接地线（连接牢固、无断裂）、紧急切断按钮（标识清晰、功能正常）。"),
  createParagraph("每日8:00前，安全管理人员检查灭火器材（压力正常、铅封完好、数量充足）。"),
  
  createTitle("6.3 环境检查", 2),
  createParagraph("每班作业前，班组长检查加油区5米内无明火、无易燃物品堆放。暴雨、雷电天气时，立即停止加油作业，切断电源。"),
  
  createTitle("7 加油作业流程", 1),
  createTitle("7.1 引导车辆", 2),
  createParagraph("加油员引导车辆驶入加油位（车速不得超过5km/h），指挥车辆熄火、拉手刹（确认发动机熄火后方可加油），提醒顾客关闭手机（严禁在加油区内使用手机），提醒顾客不要在车内停留（建议顾客下车至安全区域等候）。"),
  
  createTitle("7.2 开启油箱盖", 2),
  createParagraph("加油员触摸静电释放器（释放人体静电后方可操作），缓慢开启油箱盖（防止因压力突然释放造成油品喷溅），检查油箱口是否有异物（发现异物及时清理）。"),
  
  createTitle("7.3 加注油品", 2),
  createParagraph("加油员将加油枪插入油箱口（插入深度不少于枪管长度的2/3），确保集气罩与油箱口紧密贴合（启动油气回收系统），启动加油机开始加油（密切关注加油过程，不得离开），控制加油速度（初速度不超过1m/s，防止静电积聚），观察液位防止溢油（接近加满时降低流速）。"),
  
  createTitle("7.4 结束加油", 2),
  createParagraph("听到加油机跳枪提示后，加油员停止加油（不得强行继续加注），缓慢抽出加油枪（防止滴漏，如有滴漏用棉布擦拭），挂回加油枪（确认加油枪完全归位），盖好油箱盖（确认油箱盖完全关闭），收取加油费并开具发票（收款后引导车辆驶离）。"),
  
  createTitle("7.5 车辆驶离", 2),
  createParagraph("加油员确认加油机已复位（加油枪归位、加油机显示归零），引导车辆缓慢驶离（车速不得超过5km/h），清理加油位（如有油污立即用沙土覆盖清理）。"),
  
  createTitle("8 安全禁令", 1),
  createParagraph("以下情况严禁进行加油作业："),
  createListItem("车辆未熄火（立即制止，要求熄火后方可加油）；"),
  createListItem("顾客在加油区内使用手机（立即制止，要求关机或离开加油区）；"),
  createListItem("顾客在加油区内吸烟或使用明火（立即制止，严重者可拒绝服务）；"),
  createListItem("穿化纤服装或带铁钉鞋的人员操作（禁止上岗，更换合格服装）；"),
  createListItem("雷雨天气（立即停止加油，切断电源）；"),
  createListItem("加油机发生故障或渗漏（立即停止使用，报告班组长）；"),
  createListItem("加油枪集气罩破损（立即停止使用，更换后方可继续）。"),
  
  createTitle("9 异常情况处置", 1),
  createTitle("9.1 溢油处置", 2),
  createParagraph("发现溢油后，当班加油员立即停止加油并关闭加油机，1分钟内用沙土覆盖溢油区域防止扩散，3分钟内班组长组织清理溢油（使用吸油棉或沙土吸附），10分钟内将污染物收集至危废桶（严禁排入下水道），处置后安全管理人员填写《溢油事故记录表》（分析原因，制定预防措施）。"),
  
  createTitle("9.2 火灾初期处置", 2),
  createParagraph("发现火情后，当班加油员大声呼救并立即停止加油、切断加油机电源，30秒内使用就近灭火器扑救初期火灾，1分钟内班组长启动应急预案并组织人员疏散、拨打119，3分钟内站长组织关闭储罐区紧急切断阀、切断电源总闸。"),
  
  createTitle("10 作业记录", 1),
  createParagraph("必须填写的记录：《加油作业日检记录表》（每班作业前填写，保存1年）、《设备巡检记录表》（每日8:00前填写，保存2年）、《班前会记录表》（每班作业前填写，保存1年）、《溢油事故记录表》（事故发生后24小时内填写，保存3年）。"),
  createParagraph("记录填写要求：记录必须真实、准确、完整，字迹清晰不得涂改，发现异常情况必须详细记录，记录本应妥善保管防止损坏丢失。"),
  
  createTitle("11 附则", 1),
  createTitle("11.1 规程解释", 2),
  createParagraph("本规程由飞龙加油站站长负责解释。"),
  createTitle("11.2 规程修订", 2),
  createParagraph("根据实际情况和法律法规变化适时修订。"),
  createTitle("11.3 生效日期", 2),
  createParagraph("本规程自发布之日起施行。"),
  
  new Paragraph({ spacing: { before: 600 }, children: [] }),
  new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "编制：大鹏    审核：丧彪    批准：__________", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "日期：2024-XX-XX    日期：2024-XX-XX    日期：__________", size: 24, font: "宋体" })] })
];

// 创建文档
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
        margin: { top: 1440, right: 1080, bottom: 1440, left: 1080 }
      } 
    },
    children: children
  }]
});

// 生成文档
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/Users/tang/Desktop/瓜瓜成果/飞龙加油站/08_加油作业安全操作规程.docx", buffer);
  console.log("✅ 飞龙加油站加油作业安全操作规程 Word文档已生成！");
  console.log("📁 保存路径: ~/Desktop/瓜瓜成果/飞龙加油站/08_加油作业安全操作规程.docx");
}).catch(err => {
  console.error("❌ 生成文档失败:", err);
});
