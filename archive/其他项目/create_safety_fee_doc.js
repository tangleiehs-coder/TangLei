const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        AlignmentType, BorderStyle, WidthType, ShadingType, VerticalAlign,
        HeadingLevel, LevelFormat } = require('docx');
const fs = require('fs');

// 定义边框样式
const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "000000" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

// 创建表格单元格的辅助函数
function createCell(text, width, options = {}) {
    const { bold = false, center = false, shading = null, rowSpan = 1, colSpan = 1 } = options;
    const cellConfig = {
        borders: cellBorders,
        width: { size: width, type: WidthType.DXA },
        verticalAlign: VerticalAlign.CENTER,
    };
    if (rowSpan > 1) cellConfig.rowSpan = rowSpan;
    if (colSpan > 1) cellConfig.columnSpan = colSpan;
    if (shading) cellConfig.shading = { fill: shading, type: ShadingType.CLEAR };
    
    return new TableCell({
        ...cellConfig,
        children: [new Paragraph({
            alignment: center ? AlignmentType.CENTER : AlignmentType.LEFT,
            children: [new TextRun({ text: text, bold: bold, size: 21, font: "宋体" })]
        })]
    });
}

// 创建空行
function createEmptyLine() {
    return new Paragraph({ children: [new TextRun({ text: "" })] });
}

const doc = new Document({
    styles: {
        default: { document: { run: { font: "宋体", size: 24 } } },
        paragraphStyles: [
            { id: "Title", name: "Title", basedOn: "Normal",
              run: { size: 44, bold: true, color: "000000", font: "黑体" },
              paragraph: { spacing: { before: 240, after: 120 }, alignment: AlignmentType.CENTER } },
            { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
              run: { size: 28, bold: true, color: "000000", font: "黑体" },
              paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 } },
            { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
              run: { size: 24, bold: true, color: "000000", font: "黑体" },
              paragraph: { spacing: { before: 180, after: 100 }, outlineLevel: 1 } },
        ]
    },
    numbering: {
        config: [
            { reference: "bullet-list",
              levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
        ]
    },
    sections: [{
        properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
        children: [
            // 标题
            new Paragraph({
                heading: HeadingLevel.TITLE,
                children: [new TextRun({ text: "宇宙牧业公司安全生产费用管理制度", bold: true, size: 44, font: "黑体" })]
            }),
            createEmptyLine(),
            
            // 文件信息
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "文件编号：Q/YZMY AQ 02-2024", size: 24, font: "宋体" })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "版本号：A/0", size: 24, font: "宋体" })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "实施日期：2024年XX月XX日", size: 24, font: "宋体" })]
            }),
            createEmptyLine(),
            new Paragraph({ children: [new TextRun({ text: "——————————————————————————————————", size: 24 })] }),
            createEmptyLine(),
            
            // 变更记录
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun({ text: "变更记录", bold: true, size: 28, font: "黑体" })]
            }),
            new Table({
                columnWidths: [1200, 1600, 3200, 1400, 1400],
                rows: [
                    new TableRow({
                        tableHeader: true,
                        children: [
                            createCell("版本", 1200, { bold: true, center: true, shading: "E0E0E0" }),
                            createCell("修订日期", 1600, { bold: true, center: true, shading: "E0E0E0" }),
                            createCell("修订内容", 3200, { bold: true, center: true, shading: "E0E0E0" }),
                            createCell("修订人", 1400, { bold: true, center: true, shading: "E0E0E0" }),
                            createCell("批准人", 1400, { bold: true, center: true, shading: "E0E0E0" }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            createCell("A/0", 1200, { center: true }),
                            createCell("2024-XX-XX", 1600, { center: true }),
                            createCell("初次发布，依据财资〔2022〕136号制定", 3200),
                            createCell("", 1400),
                            createCell("", 1400),
                        ]
                    }),
                ]
            }),
            createEmptyLine(),
            
            // 1 目的
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun({ text: "1 目的", bold: true, size: 28, font: "黑体" })]
            }),
            new Paragraph({
                children: [new TextRun({ text: '为规范宇宙牧业公司（以下简称"公司"）安全生产费用的提取、使用和管理，建立安全生产投入长效机制，保障安全生产资金投入，维护企业、职工以及社会公共利益，依据《中华人民共和国安全生产法》及《企业安全生产费用提取和使用管理办法》（财资〔2022〕136号），结合公司实际情况，制定本制度。', size: 24, font: "宋体" })]
            }),
            createEmptyLine(),
            
            // 2 适用范围
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun({ text: "2 适用范围", bold: true, size: 28, font: "黑体" })]
            }),
            new Paragraph({
                children: [new TextRun({ text: "本制度适用于公司安全生产费用的提取、使用、管理和监督。", size: 24, font: "宋体" })]
            }),
            createEmptyLine(),
            new Paragraph({
                children: [new TextRun({ text: "公司主营业务范围：", bold: true, size: 24, font: "宋体" })]
            }),
            new Paragraph({
                numbering: { reference: "bullet-list", level: 0 },
                children: [new TextRun({ text: "畜禽养殖（猪、牛、羊、禽类养殖）", size: 24, font: "宋体" })]
            }),
            new Paragraph({
                numbering: { reference: "bullet-list", level: 0 },
                children: [new TextRun({ text: "饲料加工与生产", size: 24, font: "宋体" })]
            }),
            new Paragraph({
                numbering: { reference: "bullet-list", level: 0 },
                children: [new TextRun({ text: "畜禽屠宰加工", size: 24, font: "宋体" })]
            }),
            new Paragraph({
                numbering: { reference: "bullet-list", level: 0 },
                children: [new TextRun({ text: "畜产品冷链物流", size: 24, font: "宋体" })]
            }),
            new Paragraph({
                numbering: { reference: "bullet-list", level: 0 },
                children: [new TextRun({ text: "动物防疫与疫病防控", size: 24, font: "宋体" })]
            }),
            createEmptyLine(),
            
            // 3 引用文件
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun({ text: "3 规范性引用文件", bold: true, size: 28, font: "黑体" })]
            }),
            new Paragraph({
                children: [new TextRun({ text: "下列文件对于本制度的应用是必不可少的。凡是注日期的引用文件，仅注日期的版本适用于本制度。凡是不注日期的引用文件，其最新版本（包括所有的修改单）适用于本制度。", size: 24, font: "宋体" })]
            }),
            createEmptyLine(),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "3.1 法律法规", bold: true, size: 24, font: "黑体" })]
            }),
            new Paragraph({ children: [new TextRun({ text: "《中华人民共和国安全生产法》（2021年修订）", size: 24, font: "宋体" })] }),
            new Paragraph({ children: [new TextRun({ text: "《企业安全生产费用提取和使用管理办法》（财资〔2022〕136号）", size: 24, font: "宋体" })] }),
            new Paragraph({ children: [new TextRun({ text: "《中华人民共和国畜牧法》（2022年修订）", size: 24, font: "宋体" })] }),
            new Paragraph({ children: [new TextRun({ text: "《中华人民共和国动物防疫法》（2021年修订）", size: 24, font: "宋体" })] }),
            new Paragraph({ children: [new TextRun({ text: "《饲料和饲料添加剂管理条例》（国务院令第609号）", size: 24, font: "宋体" })] }),
            new Paragraph({ children: [new TextRun({ text: "《生猪屠宰管理条例》（国务院令第742号）", size: 24, font: "宋体" })] }),
            createEmptyLine(),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "3.2 国家标准", bold: true, size: 24, font: "黑体" })]
            }),
            new Paragraph({ children: [new TextRun({ text: "GB 18218-2018《危险化学品重大危险源辨识》", size: 24, font: "宋体" })] }),
            new Paragraph({ children: [new TextRun({ text: "GB 2894-2025《安全标志及其使用导则》（2026年3月1日实施）", size: 24, font: "宋体" })] }),
            new Paragraph({ children: [new TextRun({ text: "GB 13495.1-2015《消防安全标志 第1部分：标志》", size: 24, font: "宋体" })] }),
            createEmptyLine(),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "3.3 行业标准", bold: true, size: 24, font: "黑体" })]
            }),
            new Paragraph({ children: [new TextRun({ text: "AQ 3013-2008《危险化学品从业单位安全标准化通用规范》", size: 24, font: "宋体" })] }),
            new Paragraph({ children: [new TextRun({ text: "NY/T 388-2019《畜禽场环境质量标准》", size: 24, font: "宋体" })] }),
            new Paragraph({ children: [new TextRun({ text: "NY/T 5027-2008《无公害食品 畜禽饮用水水质》", size: 24, font: "宋体" })] }),
            new Paragraph({ children: [new TextRun({ text: "NY/T 1566-2007《标准化畜禽养殖场建设规范》", size: 24, font: "宋体" })] }),
            new Paragraph({ children: [new TextRun({ text: "SB/T 10408-2013《中央储备肉冻肉储存冷库资质条件》", size: 24, font: "宋体" })] }),
            createEmptyLine(),
            
            // 4 术语定义
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun({ text: "4 术语和定义", bold: true, size: 28, font: "黑体" })]
            }),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "4.1 安全生产费用", bold: true, size: 24, font: "黑体" })]
            }),
            new Paragraph({ children: [new TextRun({ text: "指企业按照规定标准提取，在成本中列支，专门用于完善和改进企业安全生产条件的资金。", size: 24, font: "宋体" })] }),
            createEmptyLine(),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "4.2 安全生产条件", bold: true, size: 24, font: "黑体" })]
            }),
            new Paragraph({ children: [new TextRun({ text: "指企业为保障生产经营活动中人身安全和财产安全所应具备的设施、设备、环境、管理等方面的条件。", size: 24, font: "宋体" })] }),
            createEmptyLine(),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "4.3 养殖业", bold: true, size: 24, font: "黑体" })]
            }),
            new Paragraph({ children: [new TextRun({ text: "指利用畜禽等动物的生理机能，通过人工饲养、繁殖，使其将牧草和饲料等植物能转变为动物能，以取得肉、蛋、奶、毛、皮等畜产品的生产部门。", size: 24, font: "宋体" })] }),
            createEmptyLine(),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "4.4 有限空间", bold: true, size: 24, font: "黑体" })]
            }),
            new Paragraph({ children: [new TextRun({ text: "指封闭或部分封闭、进出口受限、未被设计为固定工作场所、自然通风不良，易造成有毒有害、易燃易爆物质积聚或氧含量不足的空间。公司涉及的有限空间包括：污水处理池、沼气池、饲料筒仓、料塔、冷库、冷藏车厢、化粪池、沼气发酵池。", size: 24, font: "宋体" })] }),
            createEmptyLine(),
            
            // 5 职责
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun({ text: "5 职责", bold: true, size: 28, font: "黑体" })]
            }),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "5.1 总经理（主要负责人）", bold: true, size: 24, font: "黑体" })]
            }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "对公司安全生产费用管理工作全面负责；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "审批年度安全生产费用提取和使用计划；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "保障安全生产费用的足额提取和有效使用；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "定期听取安全生产费用使用情况汇报；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "审批重大安全生产费用支出项目。", size: 24, font: "宋体" })] }),
            createEmptyLine(),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "5.2 安环部（安全管理部门）", bold: true, size: 24, font: "黑体" })]
            }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "负责安全生产费用管理的综合协调和监督工作；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "组织编制年度安全生产费用提取和使用计划；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "建立安全生产费用台账，进行专项核算；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "监督检查各部门安全生产费用的使用情况；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "组织安全生产费用使用效果评估；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "向主要负责人报告安全生产费用使用情况；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "配合财务部门做好安全生产费用的会计核算。", size: 24, font: "宋体" })] }),
            createEmptyLine(),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "5.3 财务部", bold: true, size: 24, font: "黑体" })]
            }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "负责安全生产费用的会计核算和资金管理；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "设立安全生产费用专用科目，进行专户核算；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "按规定标准提取安全生产费用；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "审核安全生产费用支出，确保专款专用；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "编制安全生产费用财务报表；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "向有关部门报送安全生产费用统计报表；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "配合安环部做好安全生产费用使用情况分析。", size: 24, font: "宋体" })] }),
            createEmptyLine(),
            
            // 6 提取
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun({ text: "6 安全生产费用的提取", bold: true, size: 28, font: "黑体" })]
            }),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "6.1 提取标准", bold: true, size: 24, font: "黑体" })]
            }),
            new Paragraph({ children: [new TextRun({ text: "公司属于农林牧渔业企业，按照《企业安全生产费用提取和使用管理办法》（财资〔2022〕136号）规定，安全生产费用提取标准如下：", size: 24, font: "宋体" })] }),
            createEmptyLine(),
            new Paragraph({ children: [new TextRun({ text: "基本提取标准：按上一年度营业收入的1.5%提取安全生产费用。", bold: true, size: 24, font: "宋体" })] }),
            createEmptyLine(),
            new Paragraph({ children: [new TextRun({ text: "特殊情况：", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "新建、扩建项目在投产当年，按当年预计营业收入的1.5%提取；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "企业规模发生重大变化时，相应调整提取比例。", size: 24, font: "宋体" })] }),
            createEmptyLine(),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "6.2 提取方法", bold: true, size: 24, font: "黑体" })]
            }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "安全生产费用按月提取，计入当月成本；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "当年实际使用的安全生产费用不足的，超出部分按正常成本费用渠道列支；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "年度终了，如提取的安全生产费用有结余，可结转下年度使用；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "如当年计提的安全生产费用不足，差额部分可在以后年度补提。", size: 24, font: "宋体" })] }),
            createEmptyLine(),
            
            // 7 使用范围
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun({ text: "7 安全生产费用的使用范围", bold: true, size: 28, font: "黑体" })]
            }),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "7.1 通用使用范围", bold: true, size: 24, font: "黑体" })]
            }),
            new Paragraph({ children: [new TextRun({ text: "根据财资〔2022〕136号文件规定，公司安全生产费用主要用于以下方面：", size: 24, font: "宋体" })] }),
            createEmptyLine(),
            
            new Paragraph({ children: [new TextRun({ text: '（一）完善、改造和维护安全防护设施设备支出（不含"三同时"要求初期投入的安全设施），包括：', bold: true, size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "养殖场围栏、防护网、安全警示标志等设施；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "饲料加工车间防尘、防爆、防火设施；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "屠宰加工车间防滑、防坠落、机械防护装置；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "冷库、冷藏车制冷系统安全装置；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "电气系统安全防护装置（漏电保护、接地装置等）；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "消防设施设备（灭火器、消防栓、火灾报警系统等）；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "通风、除尘、降噪设施；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "有限空间作业安全防护设施。", size: 24, font: "宋体" })] }),
            createEmptyLine(),
            
            new Paragraph({ children: [new TextRun({ text: "（二）配备、维护、保养应急救援器材、设备支出和应急演练支出", size: 24, font: "宋体" })] }),
            new Paragraph({ children: [new TextRun({ text: "（三）开展重大危险源检测、评估、监控支出", size: 24, font: "宋体" })] }),
            new Paragraph({ children: [new TextRun({ text: "（四）安全生产检查、评价、咨询和标准化建设支出", size: 24, font: "宋体" })] }),
            new Paragraph({ children: [new TextRun({ text: "（五）安全生产宣传、教育、培训支出", size: 24, font: "宋体" })] }),
            new Paragraph({ children: [new TextRun({ text: "（六）配备和更新现场作业人员安全防护用品支出", size: 24, font: "宋体" })] }),
            new Paragraph({ children: [new TextRun({ text: "（七）安全生产适用的新技术、新标准、新工艺、新装备的推广应用支出", size: 24, font: "宋体" })] }),
            new Paragraph({ children: [new TextRun({ text: "（八）安全设施及特种设备检测检验支出", size: 24, font: "宋体" })] }),
            new Paragraph({ children: [new TextRun({ text: "（九）其他与安全生产直接相关的支出", size: 24, font: "宋体" })] }),
            createEmptyLine(),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "7.2 行业特定使用范围", bold: true, size: 24, font: "黑体" })]
            }),
            
            new Paragraph({ children: [new TextRun({ text: "（一）养殖事业部专用：", bold: true, size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "畜禽养殖场生物安全防护设施（消毒池、隔离带等）；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "畜禽疫病防控设施（疫苗冷藏设备、无害化处理设施等）；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "养殖场粪污处理设施安全防护装置；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "养殖场围栏、门禁系统。", size: 24, font: "宋体" })] }),
            createEmptyLine(),
            
            new Paragraph({ children: [new TextRun({ text: "（二）饲料加工事业部专用：", bold: true, size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "粉尘防爆设施（防爆电气、除尘系统、泄爆装置等）；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "饲料筒仓安全监测装置（温度、料位监测等）；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "有毒有害气体检测报警装置；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "粉尘职业危害防护设施。", size: 24, font: "宋体" })] }),
            createEmptyLine(),
            
            new Paragraph({ children: [new TextRun({ text: "（三）屠宰加工事业部专用：", bold: true, size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "致昏设备安全防护装置；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "屠宰生产线机械防护装置；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "冷库氨制冷系统（如有）安全监控装置；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "低温作业人员防寒保暖用品。", size: 24, font: "宋体" })] }),
            createEmptyLine(),
            
            // 8 使用管理
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun({ text: "8 安全生产费用使用管理", bold: true, size: 28, font: "黑体" })]
            }),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "8.1 计划管理", bold: true, size: 24, font: "黑体" })]
            }),
            new Paragraph({ children: [new TextRun({ text: "年度计划的编制：", bold: true, size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "每年第四季度，各部门根据下一年度安全生产工作计划和实际需求，编制本部门安全生产费用使用计划；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "安环部汇总各部门计划，编制公司年度安全生产费用提取和使用计划；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "计划应明确项目名称、内容、预算金额、实施时间、责任部门等；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "年度安全生产费用使用计划经财务部审核后，报总经理审批。", size: 24, font: "宋体" })] }),
            createEmptyLine(),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "8.2 使用审批程序", bold: true, size: 24, font: "黑体" })]
            }),
            new Paragraph({ children: [new TextRun({ text: "审批权限：", bold: true, size: 24, font: "宋体" })] }),
            createEmptyLine(),
            
            // 审批权限表格
            new Table({
                columnWidths: [4200, 4600],
                rows: [
                    new TableRow({
                        tableHeader: true,
                        children: [
                            createCell("金额范围", 4200, { bold: true, center: true, shading: "E0E0E0" }),
                            createCell("审批权限", 4600, { bold: true, center: true, shading: "E0E0E0" }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            createCell("单次支出 ≤ 5,000元", 4200, { center: true }),
                            createCell("部门负责人 → 安环部审核 → 财务部复核", 4600),
                        ]
                    }),
                    new TableRow({
                        children: [
                            createCell("5,000元 < 单次支出 ≤ 20,000元", 4200, { center: true }),
                            createCell("部门负责人 → 安环部审核 → 财务部复核 → 分管安全领导审批", 4600),
                        ]
                    }),
                    new TableRow({
                        children: [
                            createCell("单次支出 > 20,000元", 4200, { center: true }),
                            createCell("部门负责人 → 安环部审核 → 财务部复核 → 分管安全领导审核 → 总经理审批", 4600),
                        ]
                    }),
                ]
            }),
            createEmptyLine(),
            
            new Paragraph({ children: [new TextRun({ text: "审批程序：", bold: true, size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "申请：使用部门填写《安全生产费用使用申请表》，说明用途、金额、实施时间等；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "审核：安环部审核申请事项是否符合使用范围、是否必要；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "复核：财务部复核预算是否充足、列支科目是否正确；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "审批：按权限逐级审批；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "实施：审批通过后，按公司采购、财务制度执行；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "验收：项目完成后，由安环部组织验收，确认达到预期效果。", size: 24, font: "宋体" })] }),
            createEmptyLine(),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun({ text: "8.3 台账管理", bold: true, size: 24, font: "黑体" })]
            }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "安环部建立安全生产费用使用管理台账，记录每一笔费用的提取和使用情况；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "台账应包括：日期、凭证号、摘要、收入金额、支出金额、余额、使用部门、用途等信息；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "财务部建立安全生产费用会计核算台账，与安环部台账定期核对；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "档案保存期限不少于3年。", size: 24, font: "宋体" })] }),
            createEmptyLine(),
            
            // 9 监督检查
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun({ text: "9 监督检查", bold: true, size: 28, font: "黑体" })]
            }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "安环部每月对安全生产费用使用情况进行检查，确保专款专用；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "财务部每季度对安全生产费用提取和使用情况进行核查；", size: 24, font: "宋体" })] }),
            new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "审计部门每年对安全生产费用管理情况进行专项审计。", size: 24, font: "宋体" })] }),
            createEmptyLine(),
            
            // 10 附则
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun({ text: "10 附则", bold: true, size: 28, font: "黑体" })]
            }),
            new Paragraph({ children: [new TextRun({ text: "10.1 本制度由安环部负责解释。", size: 24, font: "宋体" })] }),
            new Paragraph({ children: [new TextRun({ text: "10.2 本制度根据国家法律法规变化、标准更新及公司实际情况适时修订。", size: 24, font: "宋体" })] }),
            new Paragraph({ children: [new TextRun({ text: "10.3 本制度自发布之日起施行。原有相关规定与本制度不一致的，以本制度为准。", size: 24, font: "宋体" })] }),
            createEmptyLine(),
            createEmptyLine(),
            
            // 签字栏
            new Paragraph({ children: [new TextRun({ text: "编制：__________    审核：__________    批准：__________", size: 24, font: "宋体" })] }),
            createEmptyLine(),
            new Paragraph({ children: [new TextRun({ text: "日期：__________    日期：__________    日期：__________", size: 24, font: "宋体" })] }),
        ]
    }]
});

// 保存文档
Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync("/Users/tang/Desktop/宇宙牧业公司_安全生产费用管理制度.docx", buffer);
    console.log("文档已生成: /Users/tang/Desktop/宇宙牧业公司_安全生产费用管理制度.docx");
});
