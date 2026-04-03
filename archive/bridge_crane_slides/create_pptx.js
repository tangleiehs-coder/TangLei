const pptxgen = require('pptxgenjs');
const html2pptx = require('/Users/tang/.openclaw/workspace/skills/pptx/scripts/html2pptx');
const fs = require('fs');
const path = require('path');

async function createPresentation() {
  const pptx = new pptxgen();
  
  // A4竖版
  pptx.defineLayout({ name: 'A4P', width: 8.26, height: 11.69 });
  pptx.layout = 'A4P';
  pptx.author = '安全五点半';
  pptx.title = '桥式起重机安全图集';
  
  const slidesDir = '/Users/tang/.openclaw/workspace/bridge_crane_slides';
  
  // 完整幻灯片列表
  const slides = [
    { file: 'slide_cover.html', name: '封面' },
    { file: 'slide_toc.html', name: '目录' },
    // 第一章 安全距离
    { file: 'slide_ch01.html', name: '第一章分隔页' },
    // 第二章 防护装置
    { file: 'slide_ch02.html', name: '第二章分隔页' },
    { file: 'slide_02_001.html', name: '走台栏杆' },
    // 第三章 保护装置
    { file: 'slide_ch03.html', name: '第三章分隔页' },
    { file: 'slide_01_001.html', name: '起升高度限位器' },
    { file: 'slide_03_002.html', name: '起重量限制器' },
    // 第四章 电气安全
    { file: 'slide_ch04.html', name: '第四章分隔页' },
    // 第五章 固定设施
    { file: 'slide_ch05.html', name: '第五章分隔页' },
    // 第六章 环境/工效
    { file: 'slide_ch06.html', name: '第六章分隔页' },
    // 第七章 特殊要求
    { file: 'slide_ch07.html', name: '第七章分隔页' },
  ];
  
  for (const slideInfo of slides) {
    const htmlPath = path.join(slidesDir, slideInfo.file);
    if (fs.existsSync(htmlPath)) {
      try {
        await html2pptx(htmlPath, pptx);
        console.log(`✓ ${slideInfo.name}`);
      } catch (err) {
        console.log(`✗ ${slideInfo.name}: ${err.message}`);
      }
    } else {
      console.log(`✗ 未找到: ${slideInfo.file}`);
    }
  }
  
  const outputPath = '/Users/tang/Desktop/瓜瓜成果/机械安全图集/07-桥式起重机/图集/桥式起重机安全图集_蓝色竖版.pptx';
  await pptx.writeFile({ fileName: outputPath });
  console.log(`\n✅ 已生成完整PPT: ${outputPath}`);
}

createPresentation().catch(console.error);
