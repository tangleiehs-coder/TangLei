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
              children: [new TextRun({ text: "星辰制造有限公司特种设备安全管理制度", bold: true, size: 28, font: "黑体" })]
            })]
          })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            children: [new Paragraph({ children: [new TextRun({ text: "文件编号：Q/CXZZ AQ 08-2024", size: 18, font: "宋体" })] })]
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            children: [new Paragraph({ children: [new TextRun({ text: "版本号：A/0", size: 18, font: "宋体" })] })]
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            children: [new Paragraph({ children: [new TextRun({ text: "编制部门：安全管理部", size: 18, font: "宋体" })] })]
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
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "初次发布（第二稿）", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "大鹏", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "", size: 22, font: "宋体" })] })] })
        ]
      })
    ]
  });
}

// 创建设备清单表
function createEquipmentList() {
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
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "设备类别", bold: true, size: 22, font: "黑体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "设备名称", bold: true, size: 22, font: "黑体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "数量", bold: true, size: 22, font: "黑体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "使用场所", bold: true, size: 22, font: "黑体" })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "起重机械", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "电动单梁起重机（5吨）", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "3台", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "生产车间", size: 22, font: "宋体" })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "起重机械", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "电动单梁起重机（10吨）", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2台", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "生产车间", size: 22, font: "宋体" })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "3", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "压力容器", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "储气罐（1立方米）", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2台", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "空压机房", size: 22, font: "宋体" })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "压力容器", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "储气罐（2立方米）", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1台", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "空压机房", size: 22, font: "宋体" })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "5", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "场（厂）内机动车辆", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "叉车（3吨）", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4台", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "车间/仓库", size: 22, font: "宋体" })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "6", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "电梯", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "载货电梯", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1台", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "仓库", size: 22, font: "宋体" })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "7", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "压力管道", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "压缩空气管道", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "150米", size: 22, font: "宋体" })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "全厂", size: 22, font: "宋体" })] })] })
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
  
  createTitle("变更记录", 1),
  createChangeRecord(),
  new Paragraph({ spacing: { after: 400 }, children: [] }),
  
  createTitle("1 目的", 1),
  createParagraph("为加强星辰制造有限公司（以下简称\"公司\"）特种设备的安全管理，预防和减少特种设备事故，保障员工生命安全和公司财产安全，依据《中华人民共和国特种设备安全法》及相关法律法规标准，结合公司实际情况，制定本制度。"),
  
  createTitle("2 适用范围", 1),
  createParagraph("本制度适用于公司内所有特种设备的安全管理。"),
  createParagraph("公司特种设备清单：", false),
  createEquipmentList(),
  
  createTitle("3 引用文件", 1),
  createTitle("3.1 法律", 2),
  createListItem("《中华人民共和国特种设备安全法》（全国人大常委会颁布，2013年）"),
  createListItem("《中华人民共和国安全生产法》（全国人大常委会颁布，2021年修订）"),
  createTitle("3.2 行政法规", 2),
  createListItem("《特种设备安全监察条例》（国务院令第549号）"),
  createTitle("3.3 部门规章及安全技术规范", 2),
  createListItem("《起重机械安全监察规定》（质检总局令第92号）"),
  createListItem("《场（厂）内专用机动车辆安全技术监察规程》（TSG N0001-2017）"),
  createListItem("《固定式压力容器安全技术监察规程》（TSG 21-2016）"),
  
  createTitle("4 术语和定义", 1),
  createTitle("4.1 特种设备", 2),
  createParagraph("指对人身和财产安全有较大危险性的锅炉、压力容器（含气瓶）、压力管道、电梯、起重机械、客运索道、大型游乐设施、场（厂）内专用机动车辆。"),
  createTitle("4.2 使用登记", 2),
  createParagraph("特种设备在投入使用前或者投入使用后30日内，向当地市场监督管理局办理使用登记，取得使用登记证书。"),
  createTitle("4.3 法定检验", 2),
  createParagraph("按照国家规定的技术标准，由有资质的检验机构对特种设备进行的定期检验。"),
  
  createTitle("5 管理职责", 1),
  createTitle("5.1 总经理", 2),
  createListItem("对公司特种设备安全工作全面负责；"),
  createListItem("建立健全特种设备安全责任制；"),
  createListItem("保证特种设备安全投入；"),
  createListItem("督促检查特种设备安全工作。"),
  
  createTitle("5.2 安全总监", 2),
  createListItem("协助总经理管理特种设备安全工作；"),
  createListItem("组织制定特种设备安全管理制度；"),
  createListItem("组织特种设备事故应急救援演练。"),
  
  createTitle("5.3 安全管理部", 2),
  createListItem("负责特种设备安全的日常监督检查；"),
  createListItem("建立特种设备安全技术档案和台账；"),
  createListItem("组织特种设备安全教育培训；"),
  createListItem("组织开展安全风险辨识和隐患排查。"),
  
  createTitle("5.4 设备部", 2),
  createListItem("负责特种设备的日常维护保养和维修；"),
  createListItem("办理使用登记、法定检验手续；"),
  createListItem("建立设备维护记录。"),
  
  createTitle("5.5 生产部", 2),
  createListItem("负责起重机械、叉车的安全使用；"),
  createListItem("执行安全操作规程；"),
  createListItem("发现异常立即报告。"),
  
  createTitle("6 管理要求", 1),
  createTitle("6.1 采购与安装", 2),
  createTitle("6.1.1 采购要求", 3),
  createListItem("采购具有生产许可资质的单位的特种设备；"),
  createListItem("索取产品质量合格证明、法定检验证明；"),
  createListItem("不得采购国家明令淘汰的设备。"),
  
  createTitle("6.1.2 安装要求", 3),
  createListItem("由具有资质的单位进行安装；"),
  createListItem("安装后须经政府部门检验合格；"),
  createListItem("验收合格后方可投入使用。"),
  
  createTitle("6.2 使用登记", 2),
  createListItem("在投入使用前或投入使用后30日内办理使用登记；"),
  createListItem("登记标志贴在设备显著位置；"),
  createListItem("建立设备档案。"),
  
  createTitle("6.3 法定检验", 2),
  createListItem("在检验到期前1个月申报法定检验；"),
  createListItem("未经检验或检验不合格的设备不得使用；"),
  createListItem("检验合格后更新登记信息。"),
  
  createTitle("6.4 日常检查与专项检查", 2),
  createTitle("6.4.1 日检（作业前）", 3),
  createParagraph("每班作业前，设备操作人员检查设备外观、安全装置、运行状态，填写《特种设备日检记录表》。", false),
  new Paragraph({ spacing: { before: 100, after: 100 }, children: [new TextRun({ text: "检查内容：", bold: true, size: 24, font: "宋体" })] }),
  createListItem("设备外观是否正常；"),
  createListItem("安全装置是否有效；"),
  createListItem("运行有无异常声音。"),
  
  createTitle("6.4.2 周检", 3),
  createParagraph("每周五下班前，设备部设备管理员检查设备运行状况、维护保养情况，填写《特种设备周检记录表》。"),
  
  createTitle("6.4.3 月检", 3),
  createParagraph("每月10日前，安全管理部安全工程师组织月度全面安全检查，汇总分析检查情况，填写《特种设备月度安全检查表》。"),
  
  createTitle("6.4.4 起重机械专项检查要求（重点）", 3),
  new Paragraph({ spacing: { before: 100, after: 100 }, children: [new TextRun({ text: "每日使用前检查：", bold: true, size: 24, font: "宋体" })] }),
  createListItem("钢丝绳有无断丝、磨损；"),
  createListItem("吊钩有无裂纹、变形；"),
  createListItem("限位器是否灵敏；"),
  createListItem("紧急停止按钮是否有效。"),
  new Paragraph({ spacing: { before: 100, after: 100 }, children: [new TextRun({ text: "\"十不吊\"规定：", bold: true, size: 24, font: "宋体" })] }),
  createListItem("指挥信号不明不吊；超载不吊；吊物上站人不吊；"),
  createListItem("安全装置失灵不吊；吊物埋在地下不吊；光线阴暗看不清不吊；"),
  createListItem("斜拉歪拽不吊；吊物边缘锋利无防护措施不吊；"),
  createListItem("六级以上大风不吊；捆绑不牢不吊。"),
  
  createTitle("6.4.5 叉车专项检查要求（重点）", 3),
  new Paragraph({ spacing: { before: 100, after: 100 }, children: [new TextRun({ text: "每日使用前检查：", bold: true, size: 24, font: "宋体" })] }),
  createListItem("轮胎气压是否正常；液压系统有无漏油；"),
  createListItem("刹车是否灵敏；灯光、喇叭是否正常；"),
  createListItem("货叉有无裂纹、变形。"),
  new Paragraph({ spacing: { before: 100, after: 100 }, children: [new TextRun({ text: "\"五不叉\"规定：", bold: true, size: 24, font: "宋体" })] }),
  createListItem("货物重心不稳不叉；视线不清不叉；货物超载不叉；"),
  createListItem("货物上站人不叉；安全装置失灵不叉。"),
  
  createTitle("6.5 安全风险管控与隐患排查治理", 2),
  createTitle("6.5.1 安全风险辨识", 3),
  createParagraph("每季度首月15日前，安全管理部经理组织各部门开展安全风险辨识，重点识别起重伤害、车辆伤害、容器爆炸等风险。辨识后7日内，编制《特种设备安全风险清单》，报安全总监审核。"),
  
  createTitle("6.5.2 风险分级管控", 3),
  createParagraph("按照红橙黄蓝四级进行风险分级管控："),
  createListItem("重大风险（红色）：立即停止作业，总经理负责整改；"),
  createListItem("较大风险（橙色）：限期整改，安全总监负责监控；"),
  createListItem("一般风险（黄色）：及时整改，安全管理部负责检查；"),
  createListItem("低风险（蓝色）：日常管理，班组长负责防范。"),
  
  createTitle("6.5.3 隐患排查治理", 3),
  createParagraph("隐患分级治理要求："),
  new Paragraph({ spacing: { before: 100, after: 100 }, children: [new TextRun({ text: "一般隐患：", bold: true, size: 24, font: "宋体" })] }),
  createListItem("发现后24小时内，责任部门主管完成整改，填写《隐患整改记录》；"),
  new Paragraph({ spacing: { before: 100, after: 100 }, children: [new TextRun({ text: "重大隐患：", bold: true, size: 24, font: "宋体" })] }),
  createListItem("发现后立即，安全总监停止相关设备使用，制定整改方案；"),
  createListItem("整改期限内，责任部门经理按方案完成整改，报安全管理部验收。"),
  createParagraph("安全管理部建立《特种设备隐患排查治理台账》，重大隐患整改完成后由安全总监组织验收。"),
  
  createTitle("6.6 维护保养", 2),
  createListItem("设备部负责日常维护保养；"),
  createListItem("电梯由专业维保单位每月保养2次；"),
  createListItem("维护记录保存2年以上。"),
  
  createTitle("6.7 作业人员管理", 2),
  createTitle("6.7.1 持证要求", 3),
  createListItem("必须持有效的特种设备作业人员证；"),
  createListItem("证书到期前3个月申请复审。"),
  
  createTitle("6.7.2 培训要求", 3),
  createListItem("每年3月底前，安全管理部培训专员制定年度培训计划；"),
  createListItem("每年6月、12月，组织特种设备作业人员集中培训，培训内容包括操作规程、应急处置、事故案例；"),
  createListItem("培训后7日内，组织考核，建立培训档案（保存期至少3年）。"),
  
  createTitle("6.8 应急管理", 2),
  createTitle("6.8.1 应急预案", 3),
  createListItem("制定特种设备事故专项应急预案；"),
  createListItem("包含起重机械倾覆、叉车碰撞、压力容器爆炸等场景。"),
  
  createTitle("6.8.2 应急演练", 3),
  createListItem("每年6月，安全总监组织起重机械事故应急演练；"),
  createListItem("每年6月、12月，组织叉车事故应急演练（每半年1次）；"),
  createListItem("演练后3日内，安全管理部汇总演练评估报告，针对问题制定改进措施。"),
  
  createTitle("6.9 报废与注销", 2),
  createListItem("达到报废条件的及时报废；"),
  createListItem("办理使用登记注销；"),
  createListItem("拆除设备或消除使用功能。"),
  
  createTitle("7 附则", 1),
  createTitle("7.1 制度解释", 2),
  createParagraph("本制度由安全管理部负责解释。"),
  createTitle("7.2 制度修订", 2),
  createParagraph("根据实际情况适时修订。"),
  createTitle("7.3 生效日期", 2),
  createParagraph("本制度自发布之日起施行。"),
  
  createTitle("附录A 特种设备安全技术档案", 1),
  createListItem("产品质量合格证明、法定检验证明；"),
  createListItem("安装资料和检验报告；"),
  createListItem("使用登记证书；"),
  createListItem("定期检验报告；"),
  createListItem("日常使用、维护保养记录；"),
  createListItem("运行故障和事故记录。"),
  
  createTitle("附录B 特种设备应急处置卡", 1),
  new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text: "起重机械事故应急处置卡", bold: true, size: 24, font: "黑体" })] }),
  createListItem("立即停止作业，切断电源；"),
  createListItem("如有人员受伤，立即拨打120；"),
  createListItem("保护现场，报告安全管理部；"),
  createListItem("疏散周围人员，设置警戒区。"),
  
  new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text: "叉车事故应急处置卡", bold: true, size: 24, font: "黑体" })] }),
  createListItem("立即停车，关闭发动机；"),
  createListItem("如有人员受伤，立即拨打120；"),
  createListItem("保护现场，报告班组长；"),
  createListItem("如有漏油，禁止明火。"),
  
  new Paragraph({ spacing: { before: 200, after: 100 }, children: [new TextRun({ text: "压力容器事故应急处置卡", bold: true, size: 24, font: "黑体" })] }),
  createListItem("立即关闭进气阀门；"),
  createListItem("迅速撤离现场人员；"),
  createListItem("拨打119报警；"),
  createListItem("报告安全总监和总经理。"),
  
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
  fs.writeFileSync("/Users/tang/Desktop/星辰制造公司_特种设备安全管理制度_第二稿.docx", buffer);
  console.log("✅ 星辰制造公司特种设备安全管理制度（第二稿）Word文档已生成！");
  console.log("📁 保存路径: ~/Desktop/星辰制造公司_特种设备安全管理制度_第二稿.docx");
}).catch(err => {
  console.error("❌ 生成文档失败:", err);
});
