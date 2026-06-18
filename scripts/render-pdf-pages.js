/**
 * PDF 특정 페이지를 PNG로 렌더링 (이미지가 포함된 페이지만)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf.mjs';

const workerPath = new URL('../node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs', import.meta.url).href;
GlobalWorkerOptions.workerSrc = workerPath;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PDF_PATH = path.resolve(__dirname, 'theory.pdf');
const OUT_DIR = path.resolve(process.cwd(), 'public', 'theory-images');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const data = new Uint8Array(fs.readFileSync(PDF_PATH));
const pdfDoc = await getDocument({ data, useWorkerFetch: false, isEvalSupported: false, useSystemFonts: true }).promise;

// 이미지가 포함된 페이지만 렌더링
const IMAGE_PAGES = [15, 20, 38, 42, 44, 49];
const SCALE = 2.0; // 고해상도

for (const pageNum of IMAGE_PAGES) {
  console.log(`PAGE ${pageNum} 렌더링 중...`);
  const page = await pdfDoc.getPage(pageNum);
  const viewport = page.getViewport({ scale: SCALE });

  const canvas = createCanvas(viewport.width, viewport.height);
  const context = canvas.getContext('2d');

  // 흰 배경
  context.fillStyle = 'white';
  context.fillRect(0, 0, viewport.width, viewport.height);

  await page.render({
    canvasContext: context,
    viewport,
  }).promise;

  const outPath = path.join(OUT_DIR, `page-${String(pageNum).padStart(2, '0')}.png`);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outPath, buffer);
  console.log(`  → 저장: ${outPath} (${Math.round(buffer.length / 1024)}KB)`);
}

console.log('\n✅ 완료!');
