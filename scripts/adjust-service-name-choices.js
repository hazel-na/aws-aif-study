// 서비스/제품 명칭 선지에 붙였던 "기능 설명"은 정답 힌트가 되므로 제거한다.
// - 서비스/제품 명칭  → koText '' (영문 명칭만 그대로 노출)
// - 개념어/약어/문장형 → 한글 번역만 유지(설명 문구 제거)
import { readFileSync, writeFileSync } from 'fs';

const PATH = new URL('../src/data/questions.json', import.meta.url);

// 최종 koText 값. 빈 문자열('')이면 영문 명칭만 표시.
const KO = {
  11: { A: '', B: '', C: '', D: '' },
  13: { A: '', B: '', C: '', D: '인터넷 게이트웨이' },
  23: { A: '온도(Temperature)', B: '컨텍스트 윈도우', C: '배치 크기', D: '모델 크기' },
  26: { A: '', B: '', C: '', D: '' },
  28: { A: '', B: '', C: '', D: '' },
  33: { A: '', B: '', C: '', D: '' },
  35: { A: '생성형 사전학습 트랜스포머(GPT)', B: '잔차 신경망(ResNet)', C: '서포트 벡터 머신(SVM)', D: '' },
  45: { A: '', B: '', C: '', D: '', E: '' },
  54: { A: '', B: '', C: '', D: '' },
  55: { B: '', D: '' },
  68: { A: '', B: '', C: '', D: '' },
  74: { B: '' },
  79: { A: '', B: '평균 제곱근 오차(RMSE)', C: '' },
  85: { A: '', B: '', C: '', D: '' },
  99: { A: '', B: '', C: '', D: '' },
  101: { A: '', B: '', C: '', D: '' },
  102: { C: '' },
  103: { C: '' },
  104: { A: '', B: '', C: '', D: '' },
  110: { A: '', B: '', C: '', D: '' },
  122: { A: '', B: '', C: '', D: '' },
  126: { A: '', B: '', C: '', D: '', E: '' },
  127: { A: '', B: '', C: '', D: '' },
  129: { A: '', B: '', C: '', D: '' },
  131: { A: '', B: '', C: '', D: '' },
  149: { A: '', B: '', C: '', D: '', E: '' },
  152: { A: '', B: '', C: '', D: '' },
  153: { A: '', B: '', C: '', D: '' },
  154: { A: '', B: '', C: '', D: '' },
  156: { A: '', B: '', C: '', D: '' },
  173: { A: 'GPU 기반 Amazon EC2', B: '프로비저닝 처리량 방식의 Amazon Bedrock', C: '온디맨드 처리량 방식의 Amazon Bedrock', D: '' },
  179: { A: '', C: '' },
  189: { A: '', B: '', C: '', D: '' },
  196: { A: 'F1 점수', B: 'BLEU 점수', C: '정확도', D: '평균 제곱 오차(MSE)' },
  214: { B: '' },
  220: { A: '', B: '', C: '', D: '' },
  225: { A: '', B: '', C: '', D: '' },
  227: { A: '평균 제곱근 오차(RMSE)', B: '투자수익률(ROI)' },
  232: { B: '', C: '', D: 'BLEU 점수' },
  236: { A: '', B: '', C: '', D: '' },
  248: { A: '', B: '', C: '', D: '' },
  249: { A: '', B: '', C: '', D: '' },
  250: { A: '', B: '', C: '', D: '' },
  252: { A: '', B: '', C: '', D: '' },
  253: { A: '', B: '' },
  254: { A: '', B: '', C: '', D: '' },
  258: { A: '', B: '', C: '', D: '' },
  265: { A: '', B: '', C: '', D: '' },
  266: { A: '', B: '', C: '', D: '' },
  273: { C: '' },
  276: { A: '', B: '', C: '', D: '' },
  285: { A: '', B: '', C: '', D: '' },
  290: { C: '' },
  292: { A: '', D: '' },
  293: { A: '', B: '' },
  294: { B: '' },
  295: { A: '', B: '' },
  301: { B: '', D: '' },
  302: { A: '', B: '', C: '', D: '' },
  325: { D: '검색 증강 생성(RAG)' },
  326: { D: '서포트 벡터 머신(SVM)' },
};

const data = JSON.parse(readFileSync(PATH, 'utf8'));
let changed = 0;
for (const q of data) {
  const map = KO[q.id];
  if (!map || !Array.isArray(q.choices)) continue;
  for (const c of q.choices) {
    if (Object.prototype.hasOwnProperty.call(map, c.key) && c.koText !== map[c.key]) {
      c.koText = map[c.key];
      changed++;
    }
  }
}
writeFileSync(PATH, JSON.stringify(data, null, 2) + '\n');
console.log('adjusted choices:', changed);
