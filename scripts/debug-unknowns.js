import mammoth from 'mammoth';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCX_PATH = path.resolve(__dirname, 'source.docx');

const result = await mammoth.extractRawText({ path: DOCX_PATH });
const rawText = result.value.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

const unknownIds = [125, 135, 185, 229, 235, 242];

for (const id of unknownIds) {
  const startIdx = rawText.indexOf(`\nQuestion ${id}\n`);
  const nextIdx = rawText.indexOf(`\nQuestion ${id + 1}`, startIdx + 1);
  const seg = rawText.substring(startIdx, nextIdx > 0 ? nextIdx : startIdx + 1500);
  console.log(`\n=== Q${id} ===`);
  // 해설 부분만 추출
  const explainIdx = seg.indexOf('\n해설\n');
  if (explainIdx >= 0) {
    console.log(JSON.stringify(seg.substring(explainIdx, explainIdx + 300)));
  } else {
    console.log(JSON.stringify(seg.substring(0, 800)));
  }
}
