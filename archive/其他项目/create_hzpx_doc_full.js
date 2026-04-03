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

// 创建危化品清单表
function createChemicalList() {
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
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "序号", bold: true, size: 22, font: "黑体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "名称", bold: true, size: 22, font: "黑体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "主要危险性", bold: true, size: 22, font: "黑体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "储存场所", bold: true, size: 22, font: "黑体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "使用环节", bold: true, size: 22, font: "黑体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "年用量", bold: true, size: 22, font: "黑体" })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "油漆", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "易燃液体", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "漆料库", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "喷漆作业", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "XX吨", size: 22, font: "宋体" })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "稀释剂", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "易燃液体", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "漆料库", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "喷漆作业", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "XX吨", size: 22, font: "宋体" })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "3", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "胶水", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "易燃液体", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "漆料库", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "胶合作业", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "XX吨", size: 22, font: "宋体" })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "固化剂", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "易燃液体、腐蚀品", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "漆料库", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "喷漆作业", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "XX吨", size: 22, font: "宋体" })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "5", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "柴油", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "易燃液体", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "柴油储罐", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "叉车燃料", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "XX吨", size: 22, font: "宋体" })] })] })
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

// 创建列表项
function createListItem(text, level = 1) {
  const indent = level === 1 ? 420 : 840;
  const prefix = level === 1 ? "• " : "- ";
  return new Paragraph({
    spacing: { before: 50, after: 50 },
    indent: { firstLine: indent },
    children: [new TextRun({ text: prefix + text, size: 24, font: "宋体" })]
  });
}

// 主要内容
const children = [
  // 页眉
  createHeaderElements(),
  new Paragraph({ spacing: { after: 200 }, children: [] }),
  
  // 重要说明
  createTitle("【重要说明】", 1),
  createParagraph("本制度依据《中华人民共和国危险化学品安全法（征求意见稿）》及配套标准制定，待该法正式颁布后全面执行。现行执行以《危险化学品安全管理条例》（国务院令第591号，2013修订）为补充依据。"),
  
  // 变更记录
  createTitle("变更记录", 1),
  createChangeRecord(),
  new Paragraph({ spacing: { after: 400 }, children: [] }),
  
  // 1 目的
  createTitle("1 目的", 1),
  createParagraph("为规范宇宙木业公司（以下简称\"公司\"）危险化学品的安全管理，预防和减少危险化学品事故，坚持人民至上、生命至上，保护人民生命安全和身体健康，保护环境，依据《中华人民共和国危险化学品安全法（征求意见稿）》及相关法律法规标准，结合公司实际情况，制定本制度。"),
  
  // 2 适用范围
  createTitle("2 适用范围", 1),
  createParagraph("本制度适用于公司内危险化学品的生产（含使用）、贮存、经营、运输和废弃处置的安全管理。"),
  createBoldParagraph("公司涉及的主要危险化学品：", ""),
  createListItem("油漆（易燃液体）"),
  createListItem("稀释剂（易燃液体）"),
  createListItem("胶水（易燃液体/含易燃溶剂）"),
  createListItem("固化剂（易燃液体/腐蚀品）"),
  createListItem("柴油（易燃液体，叉车燃料）"),
  createBoldParagraph("贮存设施：", ""),
  createListItem("漆料库（专用仓库）"),
  createListItem("柴油地上储罐"),
  createBoldParagraph("使用环节：", ""),
  createListItem("喷漆作业"),
  createListItem("胶合作业"),
  
  // 3 引用文件
  createTitle("3 引用文件", 1),
  createParagraph("下列文件对于本制度的应用是必不可少的。凡是注日期的引用文件，仅注日期的版本适用于本制度。凡是不注日期的引用文件，其最新版本（包括所有的修改单）适用于本制度。", { indent: false }),
  
  createTitle("3.1 法律法规", 2),
  createListItem("《中华人民共和国危险化学品安全法》（征求意见稿，待正式颁布）"),
  createListItem("《危险化学品安全管理条例》（国务院令第591号，2013修订，现行有效）"),
  createListItem("《中华人民共和国安全生产法》（2021年修订）"),
  createListItem("《生产安全事故应急条例》（国务院令第708号）"),
  
  createTitle("3.2 国家标准", 2),
  createListItem("GB 15603-2022《危险化学品仓库储存通则》"),
  createListItem("GB 17914-2013《易燃易爆性商品储存养护技术条件》"),
  createListItem("GB 18218-2018《危险化学品重大危险源辨识》"),
  createListItem("GB 2894-2025《安全标志及其使用导则》（2026年3月1日实施）"),
  createListItem("GB 15258-2009《化学品安全标签编写规定》"),
  createListItem("GB/T 16483-2008《化学品安全技术说明书 内容和项目顺序》"),
  
  createTitle("3.3 行业标准", 2),
  createListItem("AQ 3013-2008《危险化学品从业单位安全标准化通用规范》"),
  createListItem("AQ/T 3043-2013《危险化学品应急救援管理人员培训及考核要求》"),
  
  createTitle("3.4 规范性文件", 2),
  createListItem("财资〔2022〕136号《企业安全生产费用提取和使用管理办法》"),
  createListItem("《危险化学品目录》（2015版，2022年调整）"),
  
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
  createListItem("三管三必须：管行业必须管安全、管业务必须管安全、管生产经营必须管安全"),
  createListItem("三谁原则：谁主管谁负责、谁审批谁监管、谁建设谁负责"),
  createListItem("安全第一、预防为主、综合治理的方针"),
  createListItem("强化和落实主体责任与属地监管责任"),
  
  createTitle("5.2 全员安全生产责任制", 2),
  createParagraph("公司实行全员安全生产责任制，建立从主要负责人到一线员工的全员安全责任体系。"),
  
  createTitle("5.2.1 总经理（主要负责人）", 3),
  createListItem("对公司危险化学品安全生产工作全面负责；"),
  createListItem("建立健全并落实全员安全生产责任制；"),
  createListItem("组织制定并实施安全生产规章制度和操作规程；"),
  createListItem("加强安全风险管控与隐患排查治理；"),
  createListItem("开展安全生产标准化等安全管理体系建设；"),
  createListItem("保证危险化学品安全管理投入的有效实施；"),
  createListItem("组织制定并实施危险化学品事故应急救援预案；"),
  createListItem("及时、如实报告危险化学品事故；"),
  createListItem("依法投保安全生产责任保险（如适用）。"),
  
  createTitle("5.2.2 安环部（安全管理部门）", 3),
  createListItem("承担危险化学品安全监督管理综合工作；"),
  createListItem("组织开展安全风险辨识、评估与管控；"),
  createListItem("组织隐患排查治理工作，建立隐患台账；"),
  createListItem("组织编制和修订危险化学品安全管理制度和操作规程；"),
  createListItem("负责危险化学品从业人员的安全生产教育和培训；"),
  createListItem("组织危险化学品事故应急预案的演练；"),
  createListItem("负责重大危险源的辨识、评估和备案工作；"),
  createListItem("监督检查危险化学品储存、使用场所的安全设施运行状况；"),
  createListItem("牵头组织危险化学品事故的应急救援和调查处理；"),
  createListItem("指导协调、督促检查其他部门依法落实危险化学品安全管理职责。"),
  
  createTitle("5.2.3 生产部", 3),
  createListItem("负责本部门危险化学品使用环节的安全生产管理；"),
  createListItem("执行喷漆、胶合作业的安全操作规程；"),
  createListItem("落实本部门安全风险管控和隐患排查治理；"),
  createListItem("负责本部门危险化学品使用人员的日常安全培训；"),
  createListItem("及时报告危险化学品使用过程中的异常情况和事故隐患；"),
  createListItem("负责本部门危险化学品使用场所的日常安全检查。"),
  
  createTitle("5.2.4 仓储部", 3),
  createListItem("负责漆料库及柴油储罐区的日常安全管理；"),
  createListItem("执行危险化学品入库、出库、贮存的安全操作规程；"),
  createListItem("负责危险化学品储存设施、安全设备的维护保养和定期检测；"),
  createListItem("建立危险化学品出入库台账，做到账物相符；"),
  createListItem("负责储存场所的安全巡查，及时发现和消除隐患；"),
  createListItem("落实重大危险源（如有）的登记建档和监控措施。"),
  
  createTitle("5.2.5 采购部", 3),
  createListItem("负责选择具有相应资质的危险化学品供应商；"),
  createListItem("采购符合国家标准和行业标准的危险化学品；"),
  createListItem("索取所购危险化学品的MSDS/SDS和安全标签；"),
  createListItem("办理危险化学品购买相关许可手续；"),
  createListItem("协调危险化学品的安全运输。"),
  
  createTitle("5.2.6 设备部", 3),
  createListItem("负责危险化学品储存、使用场所设备设施的安全管理；"),
  createListItem("保障储存场所通风、防爆、防静电、防雷、消防等设施完好有效；"),
  createListItem("负责安全设备的定期检测、校验和维修；"),
  createListItem("参与危险化学品相关设备的事故调查和处理。"),
  
  createTitle("5.2.7 人力资源部", 3),
  createListItem("负责危险化学品从业人员的配备和资质审查；"),
  createListItem("将危险化学品安全培训纳入年度培训计划；"),
  createListItem("负责危险化学品相关特种作业人员的持证管理；"),
  createListItem("配合落实全员安全生产责任制考核。"),
  
  createTitle("5.2.8 各部门（通用职责）", 3),
  createListItem("严格执行危险化学品安全管理相关制度和操作规程；"),
  createListItem("落实本部门安全风险管控和隐患排查治理责任；"),
  createListItem("负责本部门危险化学品相关人员的日常安全教育；"),
  createListItem("及时报告危险化学品相关的事故、险情和隐患；"),
  createListItem("参与危险化学品事故的应急救援。"),
  
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
  createListItem("采购部应选择具有合法资质的危险化学品生产或经营单位作为供应商；"),
  createListItem("索取并查验供应商的《危险化学品生产许可证》或《危险化学品经营许可证》；"),
  createListItem("建立合格供应商名录，定期评估供应商的安全管理水平；"),
  createListItem("对国家禁止和限制使用的危险化学品，不得采购。"),
  
  createTitle("6.2.2 采购要求", 3),
  createListItem("采购的危险化学品必须符合国家标准和行业标准；"),
  createListItem("采购时须向供应商索取以下资料：化学品安全技术说明书（MSDS/SDS，中文版本）、化学品安全标签、产品合格证、危险化学品的运输资质证明（如需要）。"),
  createListItem("建立危险化学品采购台账，记录品种、数量、供应商、采购日期等信息。"),
  
  createTitle("6.2.3 运输管理", 3),
  createListItem("危险化学品的运输应由具有相应资质的运输单位承担；"),
  createListItem("运输前核实运输单位的危险货物运输资质；"),
  createListItem("监督运输过程符合JT/T 617《危险货物道路运输规则》等标准要求；"),
  createListItem("装卸作业严格执行安全操作规程，防止泄漏、遗撒。"),
  
  createTitle("6.3 贮存管理", 2),
  createTitle("6.3.1 贮存场所要求", 3),
  new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text: "漆料库：", bold: true, size: 24, font: "黑体" })] }),
  createListItem("漆料库应为独立设置的专用仓库，耐火等级不低于二级；"),
  createListItem("电气设备必须符合防爆要求（防爆等级不低于ExdⅡBT4）；"),
  createListItem("设置通风设施，换气次数不少于6次/小时；"),
  createListItem("配备温湿度监测装置，库温不宜超过30℃；"),
  createListItem("设置可燃气体检测报警装置；"),
  createListItem("配备相应的消防器材（如干粉灭火器、泡沫灭火器等）；"),
  createListItem("设置防静电接地装置，接地电阻不大于10Ω；"),
  createListItem("设置防止液体流散的设施（如门槛、围堰等）；"),
  createListItem("设置明显的安全警示标志（符合GB 2894-2025）。"),
  
  new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text: "柴油储罐区：", bold: true, size: 24, font: "黑体" })] }),
  createListItem("地上储罐应设置防火堤，防火堤的有效容积不小于最大储罐的容积；"),
  createListItem("储罐应有防雷、防静电接地装置；"),
  createListItem("设置液位监测和报警装置；"),
  createListItem("设置消防冷却水系统和泡沫灭火系统；"),
  createListItem("储罐区与周边建筑、设施的安全距离应符合GB 50016《建筑设计防火规范》要求。"),
  
  createTitle("6.3.2 贮存方式", 3),
  createListItem("危险化学品应分类、分区贮存，禁忌物料不得混存；"),
  createListItem("贮存方式应符合GB 15603-2022要求：油漆、稀释剂、固化剂采用隔离储存或隔开储存；柴油独立储罐储存；胶水隔离储存。"),
  createListItem("堆垛应符合\"五距\"要求（墙距、柱距、顶距、灯距、垛距）；"),
  createListItem("液体物料应密封储存，防止挥发；"),
  createListItem("开启后的容器应及时封闭。"),
  
  createTitle("6.3.3 出入库管理", 3),
  createListItem("严格执行危险化学品出入库核查、登记制度；"),
  createListItem("入库前检查包装是否完好、标签是否清晰、品种是否相符；"),
  createListItem("出库应遵循\"先进先出\"原则；"),
  createListItem("建立出入库台账，记录品种、数量、日期、经办人等信息；"),
  createListItem("每月进行库存盘点，确保账物相符。"),
  
  createTitle("6.3.4 储存设施检测", 3),
  createListItem("对危险化学品专用仓库的安全设施、设备定期进行检测、检验；"),
  createListItem("属于自动消防设施的，至少每年由具有资质的单位和人员进行一次全面检测、维护；"),
  createListItem("检测检验结果达不到安全规定要求的，应当及时采取整改措施。"),
  
  createTitle("6.3.5 贮存限量与重大危险源", 3),
  createListItem("公司不构成危险化学品重大危险源（依据GB 18218-2018辨识）；"),
  createListItem("如构成重大危险源，应登记建档，进行定期检测、评估、监控，制定应急预案，并将有关情况报应急管理部门备案；"),
  createListItem("漆料库储存量应控制在合理范围内，单一品种储存量不宜超过5吨；"),
  createListItem("柴油储罐单罐容积不宜超过10m³。"),
  
  createTitle("6.4 使用管理", 2),
  createTitle("6.4.1 作业场所要求", 3),
  new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text: "喷漆作业区：", bold: true, size: 24, font: "黑体" })] }),
  createListItem("喷漆作业应在专门的喷漆室或喷漆房内进行；"),
  createListItem("喷漆室应设置机械通风系统，保持负压状态；"),
  createListItem("电气设备、照明灯具应符合防爆要求；"),
  createListItem("设置可燃气体检测报警装置；"),
  createListItem("地面应采用不发火花的防静电材料；"),
  createListItem("严禁明火和产生火花的作业。"),
  
  new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text: "胶合作业区：", bold: true, size: 24, font: "黑体" })] }),
  createListItem("保持良好通风，及时排除有机溶剂蒸气；"),
  createListItem("电气设备应符合防爆要求或远离作业点；"),
  createListItem("配备必要的消防器材；"),
  createListItem("设置局部排风装置。"),
  
  createTitle("6.4.2 安全操作规程", 3),
  createListItem("各使用部门应制定并执行危险化学品安全操作规程；"),
  createListItem("操作人员应熟悉所用危险化学品的MSDS/SDS内容；"),
  createListItem("取用危险化学品时应使用专用工具，防止泄漏；"),
  createListItem("严禁在作业场所饮食、吸烟；"),
  createListItem("作业后应及时清理现场，剩余物料应退回仓库。"),
  
  createTitle("6.4.3 个人防护", 3),
  createListItem("接触危险化学品的作业人员应配备相应的个体防护装备：喷漆作业配防毒面具（配有机蒸气滤毒盒）、防护手套、防护服、护目镜；胶合作业配防有机溶剂手套、防护眼镜、防毒口罩；物料搬运配防化学品手套、防护眼镜。"),
  createListItem("定期检查个体防护装备的完好性，失效的应及时更换。"),
  
  createTitle("6.4.4 安全生产教育和培训", 3),
  createListItem("危险化学品从业人员上岗前必须接受专门的安全生产教育和培训；"),
  createListItem("培训内容包括：危险化学品的危险特性、安全标志；安全操作规程和应急处置措施；个体防护装备的使用方法；事故案例警示教育。"),
  createListItem("对有资格要求的岗位，应当配备依法取得相应资格的人员；"),
  createListItem("从业人员应当接受教育和培训，考核合格后上岗作业；"),
  createListItem("每年至少组织一次复训；"),
  createListItem("建立培训档案，记录培训时间、内容、考核结果等。"),
  
  createTitle("6.5 安全风险管控与隐患排查治理", 2),
  createTitle("6.5.1 安全风险辨识与评估", 3),
  createListItem("安环部应组织各部门定期开展安全风险辨识和评估（参照《危险化学品企业安全风险隐患排查治理导则》要求，基层单位至少每月一次）；"),
  createListItem("采用科学风险评估方法，全面排查事故隐患；"),
  createListItem("对危险化学品储存、使用环节的主要危险有害因素进行辨识；"),
  createListItem("建立安全风险清单，制定管控措施。"),
  
  createTitle("6.5.2 隐患排查治理", 3),
  createListItem("建立隐患排查治理制度，将隐患排查治理纳入日常安全管理；"),
  createListItem("仓储部每日对漆料库、柴油储罐区进行巡查；"),
  createListItem("使用部门每日对作业场所进行安全检查；"),
  createListItem("安环部每月组织一次危险化学品安全专项检查；"),
  createListItem("对排查发现的隐患，应及时制定治理方案、安排治理资金、明确治理责任、限期整改；"),
  createListItem("重大事故隐患应及时报告所在地应急管理部门。"),
  
  createTitle("6.5.3 监控与预警", 3),
  createListItem("对重大危险源（如有）的相关装置和设施设备的温度、压力、液位等主要技术参数进行24小时实时监控；"),
  createListItem("在重大危险源现场明显处设置安全警示牌、危险物质安全告知牌；"),
  createListItem("建立安全风险监控预警系统，分级分类开展专项监督检查。"),
  
  createTitle("6.6 废弃处置管理", 2),
  createTitle("6.6.1 分类收集", 3),
  createListItem("危险化学品废弃物应分类收集，不得与生活垃圾混放；"),
  createListItem("设置专用的废弃物收集容器，并设置明显标识；"),
  createListItem("盛装废弃物的容器应完好、密封，防止泄漏。"),
  
  createTitle("6.6.2 暂存管理", 3),
  createListItem("废弃物应暂存于专用场所，暂存场所应符合防火、防爆、防渗漏要求；"),
  createListItem("暂存场所应设置防雨、防晒、防流失设施；"),
  createListItem("建立废弃物暂存台账。"),
  
  createTitle("6.6.3 处置", 3),
  createListItem("危险化学品废弃物应委托具有相应资质的单位进行处置；"),
  createListItem("签订委托处置协议，明确双方安全责任；"),
  createListItem("转移时应执行危险废物转移联单制度；"),
  createListItem("严禁私自倾倒、掩埋危险化学品废弃物；"),
  createListItem("废弃危险化学品的处置，依照有关环境保护的法律、行政法规和国家有关规定执行。"),
  
  createTitle("6.7 应急管理", 2),
  createTitle("6.7.1 应急预案", 3),
  createListItem("安环部应组织制定危险化学品事故专项应急预案；"),
  createListItem("应急预案应包括火灾、爆炸、泄漏、中毒等事故类型的应急处置措施；"),
  createListItem("应急预案应经评审后发布实施，并报当地应急管理部门备案；"),
  createListItem("每年至少组织一次应急预案演练。"),
  
  createTitle("6.7.2 应急设施", 3),
  createListItem("漆料库、喷漆室、柴油储罐区应配备以下应急设施：足够的消防器材（灭火器、消防沙、灭火毯等）；泄漏应急处置器材（吸附材料、收集容器等）；应急喷淋和洗眼装置（设在可能接触腐蚀品的区域）；应急照明和疏散指示标志。"),
  createListItem("定期检查应急设施的完好性，确保随时可用。"),
  
  createTitle("6.7.3 事故报告与处置", 3),
  createListItem("发生危险化学品事故，现场人员应立即报告部门负责人和安环部；"),
  createListItem("启动应急预案，组织救援，控制事态扩大；"),
  createListItem("发生人员伤亡事故，立即拨打120急救电话；"),
  createListItem("发生火灾、爆炸事故，立即拨打119报警；"),
  createListItem("事故发生后，应保护现场，配合事故调查；"),
  createListItem("及时、如实报告危险化学品事故，不得隐瞒不报、谎报或迟报。"),
  
  createTitle("6.8 安全生产标准化建设", 2),
  createListItem("公司应按照AQ 3013等标准要求，开展安全生产标准化建设；"),
  createListItem("建立健全安全管理规章制度和岗位安全生产责任制度；"),
  createListItem("完善安全设施设备，提高本质安全水平；"),
  createListItem("每年至少开展一次安全生产标准化自评。"),
  
  createTitle("6.9 安全生产责任保险", 2),
  createListItem("如公司构成重大危险源或从事危险化学品运输，应依法投保安全生产责任保险；"),
  createListItem("安环部负责办理投保手续，保存保险凭证。"),
  
  createTitle("6.10 档案管理", 2),
  createParagraph("安环部应建立并保存以下危险化学品安全管理档案：危险化学品清单（含MSDS/SDS）；危险化学品采购、出入库台账；安全管理规章制度、操作规程；从业人员培训档案；安全检查、隐患排查治理记录；应急预案及演练记录；事故记录及调查报告；设备检测、校验记录；重大危险源档案（如适用）。"),
  createParagraph("档案保存期限不少于3年，重大事故档案永久保存。"),
  
  // 7 附则
  createTitle("7 附则", 1),
  createTitle("7.1 制度解释", 2),
  createParagraph("本制度由安环部负责解释。"),
  createTitle("7.2 制度修订", 2),
  createParagraph("本制度根据国家法律法规变化、标准更新及公司实际情况适时修订。"),
  new Paragraph({
    spacing: { before: 100, after: 100 },
    indent: { firstLine: 420 },
    children: [new TextRun({ text: "待《中华人民共和国危险化学品安全法》正式颁布后，本制度将依据正式法律文本进行全面修订。", bold: true, size: 24, font: "宋体" })]
  }),
  createTitle("7.3 生效日期", 2),
  createParagraph("本制度自发布之日起施行。"),
  
  // 附录A
  createTitle("附录A 公司危险化学品清单", 1),
  createChemicalList(),
  
  // 附录B
  createTitle("附录B 应急处置卡", 1),
  
  new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text: "火灾应急处置卡", bold: true, size: 24, font: "黑体" })] }),
  createListItem("立即切断电源，关闭物料阀门；"),
  createListItem("使用干粉灭火器、泡沫灭火器或消防沙灭火；"),
  createListItem("通知安环部和消防部门；"),
  createListItem("组织人员疏散至安全区域；"),
  createListItem("消防人员到达后，提供危险化学品信息。"),
  
  new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text: "泄漏应急处置卡", bold: true, size: 24, font: "黑体" })] }),
  createListItem("立即疏散无关人员，隔离泄漏区域；"),
  createListItem("切断火源，禁止明火和产生火花的作业；"),
  createListItem("穿戴防护装备，使用吸附材料收集泄漏物；"),
  createListItem("将收集的泄漏物装入专用容器，按危废处置；"),
  createListItem("通知安环部，查明泄漏原因并整改。"),
  
  new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text: "中毒应急处置卡", bold: true, size: 24, font: "黑体" })] }),
  createListItem("立即将中毒者转移至空气新鲜处；"),
  createListItem("脱去污染衣物，用肥皂水清洗污染皮肤；"),
  createListItem("如呼吸停止，立即进行人工呼吸；"),
  createListItem("拨打120急救电话，送医治疗；"),
  createListItem("提供中毒化学品的MSDS/SDS给医护人员。"),
  
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
  fs.writeFileSync("/Users/tang/Desktop/宇宙木业公司_危险化学品安全管理制度_安全法版_完整版.docx", buffer);
  console.log("✅ 完整版Word文档已生成！");
  console.log("📁 保存路径: ~/Desktop/宇宙木业公司_危险化学品安全管理制度_安全法版_完整版.docx");
}).catch(err => {
  console.error("❌ 生成文档失败:", err);
});
