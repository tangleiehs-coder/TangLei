const pptxgen = require('pptxgenjs');
const html2pptx = require('/Users/tang/.openclaw/workspace/skills/pptx/scripts/html2pptx');
const fs = require('fs');
const path = require('path');

async function createPresentation() {
  const pptx = new pptxgen();
  
  // A4竖版
  pptx.defineLayout({ name: 'A4P', width: 8.26, height: 11.69 });
  pptx.layout = 'A4P';
  pptx.author = '唐磊';
  pptx.title = '1000天后的安全生产管理';
  
  const slidesDir = '/Users/tang/.openclaw/workspace/ai_safety_slides';
  
  const slides = [
    { file: 'slide_01_cover.html', name: '封面' },
    { file: 'slide_02_intro.html', name: '引言' },
    { file: 'slide_03_duty1.html', name: '职责一' },
    { file: 'slide_04_duty2.html', name: '职责二' },
    { file: 'slide_05_duty3.html', name: '职责三' },
    { file: 'slide_06_duty4.html', name: '职责四' },
    { file: 'slide_07_duty5.html', name: '职责五' },
    { file: 'slide_08_duty6.html', name: '职责六' },
    { file: 'slide_09_duty7.html', name: '职责七' },
    { file: 'slide_10_synergy.html', name: '协同力量' },
    { file: 'slide_11_conclusion.html', name: '总结' },
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
  
  const outputPath = '/Users/tang/Desktop/瓜瓜成果/1000天后的安全生产管理_演讲PPT.pptx';
  await pptx.writeFile({ fileName: outputPath });
  console.log(`\n✅ 已生成: ${outputPath}`);
}

createPresentation().catch(console.error);
