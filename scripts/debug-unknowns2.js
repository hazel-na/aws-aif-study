import mammoth from 'mammoth';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCX_PATH = path.resolve(__dirname, 'source.docx');

const result = await mammoth.extractRawText({ path: DOCX_PATH });
const rawText = result.value.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

// 모든 UNKNOWN 후보들 확인
const unknownIds = [191, 245, 257, 264, 267, 275, 280, 283, 309, 311, 313, 328];

for (const id of unknownIds) {
  const startIdx = rawText.indexOf(`\nQuestion ${id}\n`);
  if (startIdx < 0) { console.log(`Q${id}: 블록 없음`); continue; }

  // 정답 섹션만 추출
  const nextStart = rawText.indexOf(`\nQuestion ${id + 1}`, startIdx + 10);
  const block = rawText.substring(startIdx, nextStart > 0 ? nextStart : startIdx + 2000);

  const ansIdx = block.indexOf('\n정답\n');
  const expIdx = block.indexOf('\n해설\n');

  if (ansIdx >= 0) {
    const afterAns = block.substring(ansIdx + 5, ansIdx + 200);
    console.log(`Q${id} [정답섹션있음]:`, JSON.stringify(afterAns.substring(0, 150)));
  } else if (expIdx >= 0) {
    const afterExp = block.substring(expIdx + 5, expIdx + 200);
    console.log(`Q${id} [해설내정답]:`, JSON.stringify(afterExp.substring(0, 150)));
  } else {
    console.log(`Q${id}: 정답/해설 섹션 없음`);
  }
}
