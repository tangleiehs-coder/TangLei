const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        AlignmentType, BorderStyle, WidthType, HeadingLevel, LevelFormat } = require('docx');
const fs = require('fs');

// 实验数据
const experiments = [
  {
    title: "实验一：空气的成分",
    purpose: "探究空气是否是单一气体",
    materials: "水槽、蜡烛、火柴、无底带盖的矿泉水瓶",
    steps: [
      "取一个水槽，将点燃的蜡烛固定在水槽的底部",
      "倒入少量有颜色的水，用去掉底的矿泉水瓶罩住蜡烛，观察现象"
    ],
    phenomenon: "瓶中的水位上升，蜡烛熄灭",
    conclusion: "空气的成分大致分为支持燃烧的气体和不支持燃烧的气体"
  },
  {
    title: "实验二：燃烧具备的条件",
    purpose: "探究燃烧需要具备的条件",
    materials: "酒精灯、火柴、坩埚钳、纸条、木条、砖块",
    steps: [
      "点燃酒精灯",
      "用坩埚钳夹住砖块放到酒精灯火焰上加热，观察到砖块不能被点燃",
      "取纸条和木条，分别用坩埚钳夹住放在酒精灯火焰上加热，观察到纸条很快被点燃，而木条不能很马上被点燃",
      "用灯帽盖住点燃的酒精灯，观察到酒精灯熄灭"
    ],
    conclusion: "燃烧必须同时具备三个条件：可燃物、氧气和达到可燃物的燃点"
  },
  {
    title: "实验三：制作电磁铁",
    purpose: "学会制作电磁铁，研究认识电磁铁的基本性质",
    materials: "电池、电池夹、包皮细电线、铁钉、回纹针、工具刀、胶带",
    steps: [
      "用带皮细电线在铁钉一端打结，并顺着打结方向缠绕",
      "把带皮细电线两头的包皮用刀刮去，分别接电池的两极，则电磁铁制作完成",
      "用电磁铁的一端接近大头针，观察有什么现象",
      "切断电流，观察有什么现象"
    ],
    conclusion: "电磁铁通电时有磁性，切断电流后磁性消失"
  },
  {
    title: "实验四：改变电磁铁的磁力大小",
    purpose: "初步学会运用对比的方法研究电磁铁磁力变化与什么因素有关",
    materials: "大铁钉、大头针、电池若干、绝缘导线等",
    steps: [
      "自制电磁铁",
      "将电磁铁接上一节电池后去吸引大头针，数一数吸引的大头针的根数，记录下来",
      "将电磁铁联上两节电池后去吸引大头针，数一数吸引的大头针的根数，记录下来",
      "在同一电磁铁将线圈匝数增加数圈，重复步骤2或3，记录实验数据"
    ],
    conclusion: "电池节数越多，磁力越强；线圈匝数越多，磁力越强"
  },
  {
    title: "实验五：植物的光合作用",
    purpose: "探究植物生长需要的养料与绿叶有关",
    materials: "盆栽绿萝、黑色卡纸、铁架台、酒精灯、锥形瓶、烧杯、石棉网、清水、碘液",
    steps: [
      "把盆栽绿萝在黑暗处放置24小时",
      "将一片叶子的一半的上下面用黑纸片遮盖，然后移到阳光下照射",
      "几个小时后把这片叶片放入锥形瓶中，加入酒精，使叶片完全进入酒精中，用棉花堵住瓶口",
      "将锥形瓶放入有水的烧杯中，用酒精灯加热",
      "当叶片变成黄白色时，取出叶片，用清水漂洗",
      "在叶片上均匀滴加碘液，再用清水漂洗，观察叶片颜色的变化"
    ],
    phenomenon: "由于淀粉遇碘变蓝，观察到见光部分变蓝色，不见光部分不变色",
    conclusion: "说明光照部分进行光合作用，制造有机物——淀粉"
  }
];

// 颜色定义 - 使用标准Hex格式
const COLORS = {
  conclusion: "C00000",  // 深红色 - 实验结论
  purpose: "2E75B6",     // 蓝色 - 实验目的
  phenomenon: "70AD47",  // 绿色 - 实验现象
  materials: "7030A0"    // 紫色 - 关键器材
};

// 单元格内边距设置
const cellMargin = {
  top: 100,
  bottom: 100,
  left: 150,
  right: 150
};

// 创建带内边距的单元格
function createCell(text, options = {}) {
  const { bold = false, color = null, width = 7000, isHeader = false } = options;
  const textRun = {
    text: text,
    size: 24,
    font: "宋体",
    bold: bold
  };
  if (color) {
    textRun.color = color;
  }
  
  return new TableCell({
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      right: { style: BorderStyle.SINGLE, size: 1, color: "000000" }
    },
    width: { size: width, type: WidthType.DXA },
    margins: cellMargin,
    children: [new Paragraph({ children: [new TextRun(textRun)] })]
  });
}

// 创建实验表格
function createExperimentTable(exp) {
  const rows = [
    // 表头行
    new TableRow({
      children: [
        createCell("项目", { bold: true, width: 2000 }),
        createCell("内容", { bold: true, width: 7000 })
      ]
    }),
    // 实验目的行 - 蓝色
    new TableRow({
      children: [
        createCell("实验目的", { bold: true, color: COLORS.purpose, width: 2000 }),
        createCell(exp.purpose, { color: COLORS.purpose, width: 7000 })
      ]
    }),
    // 实验器材行
    new TableRow({
      children: [
        createCell("实验器材", { bold: true, width: 2000 }),
        createCell(exp.materials, { width: 7000 })
      ]
    })
  ];
  
  // 实验步骤
  exp.steps.forEach((step, idx) => {
    rows.push(new TableRow({
      children: [
        createCell(idx === 0 ? "实验步骤" : "", { bold: true, width: 2000 }),
        createCell(`${idx + 1}. ${step}`, { width: 7000 })
      ]
    }));
  });
  
  // 实验现象（如果有）- 绿色
  if (exp.phenomenon) {
    rows.push(new TableRow({
      children: [
        createCell("实验现象", { bold: true, color: COLORS.phenomenon, width: 2000 }),
        createCell(exp.phenomenon, { color: COLORS.phenomenon, width: 7000 })
      ]
    }));
  }
  
  // 实验结论 - 深红色
  rows.push(new TableRow({
    children: [
      createCell("实验结论", { bold: true, color: COLORS.conclusion, width: 2000 }),
      createCell(exp.conclusion, { bold: true, color: COLORS.conclusion, width: 7000 })
    ]
  }));
  
  return new Table({
    columnWidths: [2000, 7000],
    rows: rows
  });
}

// 创建文档
const children = [
  // 标题
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
    children: [new TextRun({ text: "五年级下册科学实验", bold: true, size: 44, font: "黑体" })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 600 },
    children: [new TextRun({ text: "（打印版）", size: 28, font: "宋体" })]
  })
];

// 添加每个实验
experiments.forEach((exp, idx) => {
  // 实验标题
  children.push(new Paragraph({
    spacing: { before: 400, after: 200 },
    children: [new TextRun({ text: exp.title, bold: true, size: 32, font: "黑体" })]
  }));
  
  // 实验表格
  children.push(createExperimentTable(exp));
  
  // 分隔
  if (idx < experiments.length - 1) {
    children.push(new Paragraph({ spacing: { before: 200 }, children: [] }));
  }
});

const doc = new Document({
  styles: {
    default: { document: { run: { font: "宋体", size: 24 } } }
  },
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: children
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/Users/tang/Desktop/五下科学实验（打印版）.docx", buffer);
  console.log("实验文档已生成！");
});
