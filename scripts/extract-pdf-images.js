/**
 * PDF에서 이미지 추출 (pdfjs)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf.mjs';

const workerPath = new URL('../node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs', import.meta.url).href;
GlobalWorkerOptions.workerSrc = workerPath;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PDF_PATH = path.resolve(__dirname, 'theory.pdf');
const OUT_DIR = path.resolve(process.cwd(), 'public', 'theory-images');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const data = new Uint8Array(fs.readFileSync(PDF_PATH));
const pdfDoc = await getDocument({ data, useWorkerFetch: false, isEvalSupported: false, useSystemFonts: true }).promise;

console.log(`총 ${pdfDoc.numPages}페이지`);

let imageCount = 0;
for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
  const page = await pdfDoc.getPage(pageNum);
  const ops = await page.getOperatorList();

  const fnIds = ops.fnArray;
  const args = ops.argsArray;
  const objs = page.objs;

  let hasImage = false;
  for (let i = 0; i < fnIds.length; i++) {
    // OPS.paintImageXObject = 85
    if (fnIds[i] === 85) {
      hasImage = true;
      const imgId = args[i][0];
      console.log(`  PAGE ${pageNum}: 이미지 발견 imgId=${imgId}`);
    }
  }

  if (!hasImage && pageNum <= 10) {
    // 텍스트 아이템 수 확인
    const textContent = await page.getTextContent();
    console.log(`  PAGE ${pageNum}: 텍스트 아이템 ${textContent.items.length}개, 이미지 없음`);
  }
}

console.log(`\n총 이미지 수: ${imageCount}`);
