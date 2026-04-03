const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        AlignmentType, BorderStyle, WidthType, HeadingLevel } = require('docx');
const fs = require('fs');

// 创建页眉8要素表格
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
              children: [new TextRun({ text: "宇宙木业公司危险化学品安全管理制度", bold: true, size: 28, font: "黑体" })]
            })]
          })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            children: [new Paragraph({ children: [new TextRun({ text: "文件编号：Q/YZMY AQ 06-2024", size: 18, font: "宋体" })] })]
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            children: [new Paragraph({ children: [new TextRun({ text: "版本号：A/0", size: 18, font: "宋体" })] })]
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            children: [new Paragraph({ children: [new TextRun({ text: "编制部门：安环部", size: 18, font: "宋体" })] })]
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

// 创建变更记录表
function createChangeRecord() {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
      left: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "000000" }
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "版本", bold: true, size: 22, font: "黑体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "修订日期", bold: true, size: 22, font: "黑体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "修订内容", bold: true, size: 22, font: "黑体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "修订人", bold: true, size: 22, font: "黑体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "批准人", bold: true, size: 22, font: "黑体" })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "A/0", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2024-XX-XX", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "初次发布，依据《危险化学品安全法（征求意见稿）》制定", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "", size: 22, font: "宋体" })] })] })
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

// 创建正文段落
function createParagraph(text, options = {}) {
  const { indent = true, spacing = { before: 100, after: 100 } } = options;
  return new Paragraph({
    spacing: spacing,
    indent: indent ? { firstLine: 420 } : undefined,
    children: [new TextRun({ text: text, size: 24, font: "宋体" })]
  });
}

// 创建粗体段落
function createBoldParagraph(title, content) {
  return new Paragraph({
    spacing: { before: 100, after: 100 },
    indent: { firstLine: 420 },
    children: [
      new TextRun({ text: title, bold: true, size: 24, font: "宋体" }),
      new TextRun({ text: content, size: 24, font: "宋体" })
    ]
  });
}

// 主要内容
const children = [
  // 页眉
  createHeaderElements(),
  new Paragraph({ spacing: { after: 200 }, children: [] }),
  
  // 变更记录
  createTitle("变更记录", 1),
  createChangeRecord(),
  new Paragraph({ spacing: { after: 400 }, children: [] }),
  
  // 重要说明
  createTitle("【重要说明】", 1),
  createParagraph("本制度依据《中华人民共和国危险化学品安全法（征求意见稿）》及配套标准制定，待该法正式颁布后全面执行。现行执行以《危险化学品安全管理条例》（国务院令第591号，2013修订）为补充依据。"),
  
  // 1 目的
  createTitle("1 目的", 1),
  createParagraph("为规范宇宙木业公司（以下简称\"公司\"）危险化学品的安全管理，预防和减少危险化学品事故，坚持人民至上、生命至上，保护人民生命安全和身体健康，保护环境，依据《中华人民共和国危险化学品安全法（征求意见稿）》及相关法律法规标准，结合公司实际情况，制定本制度。"),
  
  // 2 适用范围
  createTitle("2 适用范围", 1),
  createParagraph("本制度适用于公司内危险化学品的生产（含使用）、贮存、经营、运输和废弃处置的安全管理。"),
  
  createBoldParagraph("公司涉及的主要危险化学品：", ""),
  createParagraph("• 油漆（易燃液体）"),
  createParagraph("• 稀释剂（易燃液体）"),
  createParagraph("• 胶水（易燃液体/含易燃溶剂）"),
  createParagraph("• 固化剂（易燃液体/腐蚀品）"),
  createParagraph("• 柴油（易燃液体，叉车燃料）"),
  
  createBoldParagraph("贮存设施：", ""),
  createParagraph("• 漆料库（专用仓库）"),
  createParagraph("• 柴油地上储罐"),
  
  createBoldParagraph("使用环节：", ""),
  createParagraph("• 喷漆作业"),
  createParagraph("• 胶合作业"),
  
  // 3 引用文件
  createTitle("3 引用文件", 1),
  createParagraph("下列文件对于本制度的应用是必不可少的。凡是注日期的引用文件，仅注日期的版本适用于本制度。凡是不注日期的引用文件，其最新版本（包括所有的修改单）适用于本制度。", { indent: false }),
  
  createTitle("3.1 法律法规", 2),
  createParagraph("• 《中华人民共和国危险化学品安全法》（征求意见稿，待正式颁布）"),
  createParagraph("• 《危险化学品安全管理条例》（国务院令第591号，2013修订，现行有效）"),
  createParagraph("• 《中华人民共和国安全生产法》（2021年修订）"),
  createParagraph("• 《生产安全事故应急条例》（国务院令第708号）"),
  
  createTitle("3.2 国家标准", 2),
  createParagraph("• GB 15603-2022《危险化学品仓库储存通则》"),
  createParagraph("• GB 17914-2013《易燃易爆性商品储存养护技术条件》"),
  createParagraph("• GB 18218-2018《危险化学品重大危险源辨识》"),
  createParagraph("• GB 2894-2025《安全标志及其使用导则》（2026年3月1日实施）"),
  createParagraph("• GB 15258-2009《化学品安全标签编写规定》"),
  
  createTitle("3.3 行业标准", 2),
  createParagraph("• AQ 3013-2008《危险化学品从业单位安全标准化通用规范》"),
  createParagraph("• AQ/T 3043-2013《危险化学品应急救援管理人员培训及考核要求》"),
  
  createTitle("3.4 规范性文件", 2),
  createParagraph("• 财资〔2022〕136号《企业安全生产费用提取和使用管理办法》"),
  createParagraph("• 《危险化学品目录》（2015版，2022年调整）"),
  
  // 4 术语和定义
  createTitle("4 术语和定义", 1),
  
  createTitle("4.1 危险化学品", 2),
  createParagraph("指具有毒害、腐蚀、爆炸、燃烧、助燃等性质，对人体、设施、环境具有危害的剧毒化学品和其他化学品。"),
  
  createTitle("4.2 重大危险源", 2),
  createParagraph("指长期地或临时地生产、加工、使用或储存危险化学品，且危险化学品的数量等于或超过临界量的单元。"),
  
  createTitle("4.3 全员安全生产责任制", 2),
  createParagraph("公司各级管理人员、各职能部门、各岗位人员应当承担的安全生产责任，形成全员参与、全过程控制、全方位管理的安全生产责任体系。"),
  
  createTitle("4.4 安全风险管控", 2),
  createParagraph("对危险化学品生产、贮存、使用过程中存在的安全风险进行辨识、评估、控制的全过程管理活动。"),
  
  createTitle("4.5 漆料库", 2),
  createParagraph("公司专门用于储存油漆、稀释剂、胶水、固化剂等易燃液体的专用仓库。"),
  
  createTitle("4.6 MSDS/SDS", 2),
  createParagraph("化学品安全技术说明书（Material Safety Data Sheet / Safety Data Sheet），提供化学品的理化特性、毒性、环境影响、安全使用、应急处置等信息的技术文件。"),
  
  // 5 管理原则与职责
  createTitle("5 管理原则与职责", 1),
  
  createTitle("5.1 管理原则", 2),
  createParagraph("公司危险化学品安全管理坚持以下原则："),
  createParagraph("• 三管三必须：管行业必须管安全、管业务必须管安全、管生产经营必须管安全"),
  createParagraph("• 三谁原则：谁主管谁负责、谁审批谁监管、谁建设谁负责"),
  createParagraph("• 安全第一、预防为主、综合治理的方针"),
  createParagraph("• 强化和落实主体责任与属地监管责任"),
  
  createTitle("5.2 全员安全生产责任制", 2),
  createParagraph("公司实行全员安全生产责任制，建立从主要负责人到一线员工的全员安全责任体系。"),
  
  createTitle("5.2.1 总经理（主要负责人）", 3),
  createParagraph("• 对公司危险化学品安全生产工作全面负责；"),
  createParagraph("• 建立健全并落实全员安全生产责任制；"),
  createParagraph("• 组织制定并实施安全生产规章制度和操作规程；"),
  createParagraph("• 加强安全风险管控与隐患排查治理；"),
  createParagraph("• 开展安全生产标准化等安全管理体系建设；"),
  createParagraph("• 保证危险化学品安全管理投入的有效实施；"),
  createParagraph("• 组织制定并实施危险化学品事故应急救援预案；"),
  createParagraph("• 及时、如实报告危险化学品事故；"),
  createParagraph("• 依法投保安全生产责任保险（如适用）。"),
  
  createTitle("5.2.2 安环部（安全管理部门）", 3),
  createParagraph("• 承担危险化学品安全监督管理综合工作；"),
  createParagraph("• 组织开展安全风险辨识、评估与管控；"),
  createParagraph("• 组织隐患排查治理工作，建立隐患台账；"),
  createParagraph("• 组织编制和修订危险化学品安全管理制度和操作规程；"),
  createParagraph("• 负责危险化学品从业人员的安全生产教育和培训；"),
  createParagraph("• 组织危险化学品事故应急预案的演练；"),
  createParagraph("• 负责重大危险源的辨识、评估和备案工作；"),
  createParagraph("• 监督检查危险化学品储存、使用场所的安全设施运行状况；"),
  createParagraph("• 牵头组织危险化学品事故的应急救援和调查处理；"),
  createParagraph("• 指导协调、督促检查其他部门依法落实危险化学品安全管理职责。"),
  
  createTitle("5.2.3 生产部", 3),
  createParagraph("• 负责本部门危险化学品使用环节的安全生产管理；"),
  createParagraph("• 执行喷漆、胶合作业的安全操作规程；"),
  createParagraph("• 落实本部门安全风险管控和隐患排查治理；"),
  createParagraph("• 负责本部门危险化学品使用人员的日常安全培训；"),
  createParagraph("• 及时报告危险化学品使用过程中的异常情况和事故隐患；"),
  createParagraph("• 负责本部门危险化学品使用场所的日常安全检查。"),
  
  createTitle("5.2.4 仓储部", 3),
  createParagraph("• 负责漆料库及柴油储罐区的日常安全管理；"),
  createParagraph("• 执行危险化学品入库、出库、贮存的安全操作规程；"),
  createParagraph("• 负责危险化学品储存设施、安全设备的维护保养和定期检测；"),
  createParagraph("• 建立危险化学品出入库台账，做到账物相符；"),
  createParagraph("• 负责储存场所的安全巡查，及时发现和消除隐患；"),
  createParagraph("• 落实重大危险源（如有）的登记建档和监控措施。"),
  
  createTitle("5.2.5 采购部", 3),
  createParagraph("• 负责选择具有相应资质的危险化学品供应商；"),
  createParagraph("• 采购符合国家标准和行业标准的危险化学品；"),
  createParagraph("• 索取所购危险化学品的MSDS/SDS和安全标签；"),
  createParagraph("• 办理危险化学品购买相关许可手续；"),
  createParagraph("• 协调危险化学品的安全运输。"),
  
  createTitle("5.2.6 设备部", 3),
  createParagraph("• 负责危险化学品储存、使用场所设备设施的安全管理；"),
  createParagraph("• 保障储存场所通风、防爆、防静电、防雷、消防等设施完好有效；"),
  createParagraph("• 负责安全设备的定期检测、校验和维修；"),
  createParagraph("• 参与危险化学品相关设备的事故调查和处理。"),
  
  createTitle("5.2.7 人力资源部", 3),
  createParagraph("• 负责危险化学品从业人员的配备和资质审查；"),
  createParagraph("• 将危险化学品安全培训纳入年度培训计划；"),
  createParagraph("• 负责危险化学品相关特种作业人员的持证管理；"),
  createParagraph("• 配合落实全员安全生产责任制考核。"),
  
  createTitle("5.2.8 各部门（通用职责）", 3),
  createParagraph("• 严格执行危险化学品安全管理相关制度和操作规程；"),
  createParagraph("• 落实本部门安全风险管控和隐患排查治理责任；"),
  createParagraph("• 负责本部门危险化学品相关人员的日常安全教育；"),
  createParagraph("• 及时报告危险化学品相关的事故、险情和隐患；"),
  createParagraph("• 参与危险化学品事故的应急救援。"),
  
  // 6 管理要求
  createTitle("6 管理要求", 1),
  
  createTitle("6.1 通用禁令", 2),
  new Paragraph({
    spacing: { before: 200, after: 200 },
    indent: { firstLine: 420 },
    children: [new TextRun({ text: "任何单位和个人不得生产、贮存、经营、使用、运输国家禁止生产、贮存、经营、使用、运输的危险化学品。", bold: true, size: 24, font: "宋体" })]
  }),
  
  createTitle("6.2 采购管理", 2),
  
  createTitle("6.2.1 供应商管理", 3),
  createParagraph("• 采购部应选择具有合法资质的危险化学品生产或经营单位作为供应商；"),
  createParagraph("• 索取并查验供应商的《危险化学品生产许可证》或《危险化学品经营许可证》；"),
  createParagraph("• 建立合格供应商名录，定期评估供应商的安全管理水平；"),
  createParagraph("• 对国家禁止和限制使用的危险化学品，不得采购。"),
  
  createTitle("6.2.2 采购要求", 3),
  createParagraph("• 采购的危险化学品必须符合国家标准和行业标准；"),
  new Paragraph({
    indent: { firstLine: 420 },
    spacing: { before: 100, after: 100 },
    children: [new TextRun({ text: "• 采购时须向供应商索取以下资料：", size: 24, font: "宋体" })]
  }),
  new Paragraph({
    indent: { firstLine: 840 },
    children: [new TextRun({ text: "- 化学品安全技术说明书（MSDS/SDS，中文版本）；", size: 24, font: "宋体" })]
  }),
  new Paragraph({
    indent: { firstLine: 840 },
    children: [new TextRun({ text: "- 化学品安全标签；", size: 24, font: "宋体" })]
  }),
  new Paragraph({
    indent: { firstLine: 840 },
    children: [new TextRun({ text: "- 产品合格证；", size: 24, font: "宋体" })]
  }),
  new Paragraph({
    indent: { firstLine: 840 },
    children: [new TextRun({ text: "- 危险化学品的运输资质证明（如需要）。", size: 24, font: "宋体" })]
  }),
  createParagraph("• 建立危险化学品采购台账，记录品种、数量、供应商、采购日期等信息。"),
  
  createTitle("6.3 贮存管理", 2),
  
  createTitle("6.3.1 贮存场所要求", 3),
  new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text: "漆料库：", bold: true, size: 24, font: "黑体" })] }),
  createParagraph("• 漆料库应为独立设置的专用仓库，耐火等级不低于二级；"),
  createParagraph("• 电气设备必须符合防爆要求（防爆等级不低于ExdⅡBT4）；"),
  createParagraph("• 设置通风设施，换气次数不少于6次/小时；"),
  createParagraph("• 配备温湿度监测装置，库温不宜超过30℃；"),
  createParagraph("• 设置可燃气体检测报警装置；"),
  createParagraph("• 配备相应的消防器材（如干粉灭火器、泡沫灭火器等）；"),
  createParagraph("• 设置防静电接地装置，接地电阻不大于10Ω；"),
  createParagraph("• 设置防止液体流散的设施（如门槛、围堰等）；"),
  createParagraph("• 设置明显的安全警示标志（符合GB 2894-2025）。"),
  
  new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text: "柴油储罐区：", bold: true, size: 24, font: "黑体" })] }),
  createParagraph("• 地上储罐应设置防火堤，防火堤的有效容积不小于最大储罐的容积；"),
  createParagraph("• 储罐应有防雷、防静电接地装置；"),
  createParagraph("• 设置液位监测和报警装置；"),
  createParagraph("• 设置消防冷却水系统和泡沫灭火系统；"),
  createParagraph("• 储罐区与周边建筑、设施的安全距离应符合GB 50016《建筑设计防火规范》要求。"),
  
  createTitle("6.3.2 贮存方式", 3),
  createParagraph("• 危险化学品应分类、分区贮存，禁忌物料不得混存；"),
  new Paragraph({
    indent: { firstLine: 420 },
    spacing: { before: 100, after: 100 },
    children: [new TextRun({ text: "• 贮存方式应符合GB 15603-2022要求：", size: 24, font: "宋体" })]
  }),
  new Paragraph({
    indent: { firstLine: 840 },
    children: [new TextRun({ text: "- 油漆、稀释剂、固化剂：采用隔离储存或隔开储存；", size: 24, font: "宋体" })]
  }),
  new Paragraph({
    indent: { firstLine: 840 },
    children: [new TextRun({ text: "- 柴油：独立储罐储存；", size: 24, font: "宋体" })]
  }),
  new Paragraph({
    indent: { firstLine: 840 },
    children: [new TextRun({ text: "- 胶水：隔离储存。", size: 24, font: "宋体" })]
  }),
  createParagraph("• 堆垛应符合\"五距\"要求（墙距、柱距、顶距、灯距、垛距）；"),
  createParagraph("• 液体物料应密封储存，防止挥发；"),
  createParagraph("• 开启后的容器应及时封闭。"),
  
  createTitle("6.3.3 出入库管理", 3),
  createParagraph("• 严格执行危险化学品出入库核查、登记制度；"),
  createParagraph("• 入库前检查包装是否完好、标签是否清晰、品种是否相符；"),
  createParagraph("• 出库应遵循\"先进先出\"原则；"),
  createParagraph("• 建立出入库台账，记录品种、数量、日期、经办人等信息；"),
  createParagraph("• 每月进行库存盘点，确保账物相符。"),
  
  createTitle("6.3.4 储存设施检测", 3),
  createParagraph("• 对危险化学品专用仓库的安全设施、设备定期进行检测、检验；"),
  createParagraph("• 属于自动消防设施的，至少每年由具有资质的单位和人员进行一次全面检测、维护；"),
  createParagraph("• 检测检验结果达不到安全规定要求的，应当及时采取整改措施。"),
  
  createTitle("6.3.5 贮存限量与重大危险源", 3),
  createParagraph("• 公司不构成危险化学品重大危险源（依据GB 18218-2018辨识）；"),
  createParagraph("• 如构成重大危险源，应登记建档，进行定期检测、评估、监控，制定应急预案，并将有关情况报应急管理部门备案；"),
  createParagraph("• 漆料库储存量应控制在合理范围内，单一品种储存量不宜超过5吨；"),
  createParagraph("• 柴油储罐单罐容积不宜超过10m³。"),
  
  createTitle("6.4 使用管理", 2),
  
  createTitle("6.4.1 作业场所要求", 3),
  new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text: "喷漆作业区：", bold: true, size: 24, font: "黑体" })] }),
  createParagraph("• 喷漆作业应在专门的喷漆室或喷漆房内进行；"),
  createParagraph("• 喷漆室应设置机械通风系统，保持负压状态；"),
  createParagraph("• 电气设备、照明灯具应符合防爆要求；"),
  createParagraph("• 设置可燃气体检测报警装置；"),
  createParagraph("• 地面应采用不发火花的防静电材料；"),
  createParagraph("• 严禁明火和产生火花的作业。"),
  
  new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text: "胶合作业区：", bold: true, size: 24, font: "黑体" })] }),
  createParagraph("• 保持良好通风，及时排除有机溶剂蒸气；"),
  createParagraph("• 电气设备应符合防爆要求或远离作业点；"),
  createParagraph("• 配备必要的消防器材；"),
  createParagraph("• 设置局部排风装置。"),
  
  createTitle("6.4.2 安全操作规程", 3),
  createParagraph("• 各使用部门应制定并执行危险化学品安全操作规程；"),
  createParagraph("• 操作人员应熟悉所用危险化学品的MSDS/SDS内容；"),
  createParagraph("• 取用危险化学品时应使用专用工具，防止泄漏；"),
  createParagraph("• 严禁在作业场所饮食、吸烟；"),
  createParagraph("• 作业后应及时清理现场，剩余物料应退回仓库。"),
  
  createTitle("6.4.3 个人防护", 3),
  new Paragraph({
    indent: { firstLine: 420 },
    spacing: { before: 100, after: 100 },
    children: [new TextRun({ text: "• 接触危险化学品的作业人员应配备相应的个体防护装备：", size: 24, font: "宋体" })]
  }),
  new Paragraph({
    indent: { firstLine: 840 },
    children: [new TextRun({ text: "- 喷漆作业：防毒面具（配有机蒸气滤毒盒）、防护手套、防护服、护目镜；", size: 24, font: "宋体" })]
  }),
  new Paragraph({
    indent: { firstLine: 840 },
    children: [new TextRun({ text: "- 胶合作业：防有机溶剂手套、防护眼镜、防毒口罩；", size: 24, font: "宋体" })]
  }),
  new Paragraph({
    indent: { firstLine: 840 },
    children: [new TextRun({ text: "- 物料搬运：防化学品手套、防护眼镜。", size: 24, font: "宋体" })]
  }),
  createParagraph("• 定期检查个体防护装备的完好性，失效的应及时更换。"),
  
  createTitle("6.4.4 安全生产教育和培训", 3),
  createParagraph("• 危险化学品从业人员上岗前必须接受专门的安全生产教育和培训；"),
  new Paragraph({
    indent: { firstLine: 420 },
    spacing: { before: 100, after: 100 },
    children: [new TextRun({ text: "• 培训内容包括：", size: 24, font: "宋体" })]
  }),
  new Paragraph({
    indent: { firstLine: 840 },
    children: [new TextRun({ text: "- 危险化学品的危险特性、安全标志；", size: 24, font: "宋体" })]
  }),
  new Paragraph({
    indent: { firstLine: 840 },
    children: [new TextRun({ text: "- 安全操作规程和应急处置措施；", size: 24, font: "宋体" })]
  }),
  new Paragraph({
    indent: { firstLine: 840 },
    children: [new TextRun({ text: "- 个体防护装备的使用方法；", size: 24, font: "宋体" })]
  }),
  new Paragraph({
    indent: { firstLine: 840 },
    children: [new TextRun({ text: "- 事故案例警示教育。", size: 24, font: "宋体" })]
  }),
  createParagraph("• 对有资格要求的岗位，应当配备依法取得相应资格的人员；"),
  createParagraph("• 从业人员应当接受教育和培训，考核合格后上岗作业；"),
  createParagraph("• 每年至少组织一次复训；"),
  createParagraph("• 建立培训档案，记录培训时间、内容、考核结果等。"),
  
  // 签名页
  new Paragraph({ spacing: { before: 600 }, children: [] }),
  new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "编制：__________    审核：__________    批准：__________", size: 24, font: "宋体" })] }),
  new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "日期：__________    日期：__________    日期：__________", size: 24, font: "宋体" })] })
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
  fs.writeFileSync("/Users/tang/Desktop/宇宙木业公司_危险化学品安全管理制度_安全法版.docx", buffer);
  console.log("✅ Word文档已生成！");
  console.log("📁 保存路径: ~/Desktop/宇宙木业公司_危险化学品安全管理制度_安全法版.docx");
}).catch(err => {
  console.error("❌ 生成文档失败:", err);
});
