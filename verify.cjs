const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ 
    viewport: { width: 390, height: 844 }, // iPhone 14 size
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  const page = await context.newPage();
  const dir = 'C:\\Users\\hyzn\\Downloads\\파일\\aws-aif-app\\verify-screenshots';
  fs.mkdirSync(dir, { recursive: true });

  // 1. Dashboard
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(dir, '01-dashboard.png'), fullPage: false });
  
  const title = await page.title();
  const bodyText = await page.innerText('body');
  const hasProgress = bodyText.includes('329') || bodyText.includes('0');
  const hasStartBtn = bodyText.includes('시험 시작') || bodyText.includes('시작');
  
  console.log('STEP1 Dashboard:', JSON.stringify({ title, hasProgress, hasStartBtn, bodySnippet: bodyText.substring(0, 200) }));

  // 2. Start quiz
  const startBtn = page.locator('button', { hasText: '시험 시작' }).first();
  await startBtn.click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(dir, '02-quiz.png'), fullPage: false });
  
  const quizText = await page.innerText('body');
  const hasQ1 = quizText.includes('Q.1') || quizText.includes('1 / 329') || quizText.includes('/ 329');
  console.log('STEP2 Quiz screen:', JSON.stringify({ hasQ1, snippet: quizText.substring(0, 300) }));

  // 3. Click first answer option
  const answerBtn = page.locator('button').filter({ hasText: /^A\b/ }).first();
  if (await answerBtn.count() > 0) {
    await answerBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(dir, '03-selected.png') });
    console.log('STEP3 Selected answer A');
  }

  // 4. Submit
  const submitBtn = page.locator('button', { hasText: '답 제출' }).first();
  if (await submitBtn.count() > 0) {
    await submitBtn.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(dir, '04-submitted.png') });
    const afterText = await page.innerText('body');
    const hasBottomSheet = afterText.includes('해설') || afterText.includes('정답');
    console.log('STEP4 Submitted:', JSON.stringify({ hasBottomSheet, snippet: afterText.substring(0, 300) }));
  }

  // 5. Check navigator
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const startBtn2 = page.locator('button', { hasText: '시험 시작' }).first();
  await startBtn2.click();
  await page.waitForTimeout(1000);
  const navBtn = page.locator('button', { hasText: '문항 이동' }).first();
  if (await navBtn.count() > 0) {
    await navBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(dir, '05-navigator.png') });
    const navText = await page.innerText('body');
    console.log('STEP5 Navigator:', navText.includes('329') ? 'PASS - shows 329' : 'FAIL');
  }

  await browser.close();
  console.log('DONE screenshots saved to:', dir);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
