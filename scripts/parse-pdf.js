import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { fileURLToPath as fu2 } from 'url';

// Node.js에서 worker 없이 실행
const workerPath = new URL('../node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs', import.meta.url).href;
GlobalWorkerOptions.workerSrc = workerPath;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PDF_PATH = path.resolve(__dirname, 'theory.pdf');
const OUTPUT_PATH = path.resolve(process.cwd(), 'src', 'data', 'theory_raw.txt');

const data = new Uint8Array(fs.readFileSync(PDF_PATH));
const loadingTask = getDocument({ data, useWorkerFetch: false, isEvalSupported: false, useSystemFonts: true });
const pdfDoc = await loadingTask.promise;

console.log(`총 ${pdfDoc.numPages}페이지`);

let fullText = '';
for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
  const page = await pdfDoc.getPage(pageNum);
  const textContent = await page.getTextContent();
  const pageText = textContent.items.map(item => item.str).join(' ');
  fullText += `\n=== PAGE ${pageNum} ===\n${pageText}\n`;
}

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, fullText, 'utf-8');
console.log(`✅ PDF 텍스트 추출 완료 → ${OUTPUT_PATH}`);
console.log(`   총 ${fullText.length}자`);
// 처음 3000자 미리보기
console.log('\n--- PREVIEW ---\n' + fullText.substring(0, 3000));
