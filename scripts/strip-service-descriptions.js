// 서비스/제품 명칭 선지에 붙은 "기능 설명" 괄호는 정답 힌트가 되므로 제거한다.
// - 문장형 답안(…한다 / 사용/생성 등)은 유지
// - 서비스명 + (설명) 형태 → koText '' (영문 명칭만 노출)
// - id 324는 enText가 축약형이라 정식 서비스명으로 보정
import { readFileSync, writeFileSync } from 'fs';

const PATH = new URL('../src/data/questions.json', import.meta.url);
const isSentence = (s) => /(다\.|한다|사용|생성|만든|호스팅|합니다|하여|위해|를 |을 )/.test(s);
const hasService = (s) => /(Amazon|AWS|SageMaker|Bedrock)/.test(s);
const hasParen = (s) => /\(.+\)/.test(s);

const data = JSON.parse(readFileSync(PATH, 'utf8'));
let changed = 0;
for (const q of data) {
  if (!Array.isArray(q.choices)) continue;
  for (const c of q.choices) {
    const ko = c.koText || '';
    if (!ko || isSentence(ko) || !hasService(ko) || !hasParen(ko)) continue;
    let next = '';
    if (q.id === 324) {
      // enText가 "Comprehend" 등 축약형 → 정식 명칭으로
      next = c.enText.startsWith('Amazon') || c.enText.startsWith('AWS')
        ? c.enText
        : `Amazon ${c.enText}`;
    }
    if (c.koText !== next) { c.koText = next; changed++; }
  }
}
writeFileSync(PATH, JSON.stringify(data, null, 2) + '\n');
console.log('stripped:', changed);
