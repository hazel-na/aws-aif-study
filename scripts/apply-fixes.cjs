/**
 * apply-fixes.cjs
 * 원본 백업(questions.original.backup.json)을 소스로 삼아 구조 수정(STRUCT)과
 * 해설 보강(ENRICH) 데이터를 병합하여 src/data/questions.json 을 재생성한다.
 * 멱등적: 항상 백업에서 시작하므로 몇 번 실행해도 결과가 동일하다.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BACKUP = path.join(ROOT, 'src/data/questions.original.backup.json');
const OUT = path.join(ROOT, 'src/data/questions.json');

const data = JSON.parse(fs.readFileSync(BACKUP, 'utf8'));
const byId = Object.fromEntries(data.map(q => [q.id, q]));

const STRUCT = require('./fixes/struct.cjs');

// enrich 디렉터리의 모든 배치 파일 병합
const ENRICH = {};
const enrichDir = path.join(__dirname, 'fixes/enrich');
if (fs.existsSync(enrichDir)) {
  for (const f of fs.readdirSync(enrichDir).filter(f => f.endsWith('.cjs')).sort()) {
    const mod = require(path.join(enrichDir, f));
    for (const [id, v] of Object.entries(mod)) {
      ENRICH[id] = { ...(ENRICH[id] || {}), ...v };
    }
  }
}

function mergeChoicesKo(q, koMap) {
  if (!q.choices) return;
  for (const c of q.choices) {
    if (koMap[c.key] != null) c.koText = koMap[c.key];
  }
}

// 1) 구조 수정
for (const [id, fix] of Object.entries(STRUCT)) {
  const q = byId[id];
  if (!q) { console.warn('STRUCT: missing id', id); continue; }
  if (fix.choices) q.choices = fix.choices;
  if (fix.choicesKo) mergeChoicesKo(q, fix.choicesKo);
  for (const k of ['answerType', 'correctAnswers', 'correctAnswer', 'koreanQuestion',
    'englishQuestion', 'hotspotItems', 'hotspotOptions', 'vocabulary', 'category',
    'isHotspot', 'explanation']) {
    if (fix[k] != null) q[k] = fix[k];
  }
}

// 2) 해설 보강
for (const [id, fix] of Object.entries(ENRICH)) {
  const q = byId[id];
  if (!q) { console.warn('ENRICH: missing id', id); continue; }
  if (fix.explanation) q.explanation = fix.explanation;
  if (fix.vocabulary) q.vocabulary = fix.vocabulary;
  if (fix.koreanQuestion) q.koreanQuestion = fix.koreanQuestion;
  if (fix.englishQuestion) q.englishQuestion = fix.englishQuestion;
  if (fix.correctAnswer) q.correctAnswer = fix.correctAnswer;
  if (fix.correctAnswers) { q.correctAnswers = fix.correctAnswers; q.answerType = q.answerType || 'multi'; }
  if (fix.choicesKo) mergeChoicesKo(q, fix.choicesKo);
  if (fix.choices) q.choices = fix.choices;
}

// 3) 정규화
for (const q of data) {
  if (!q.answerType) {
    if (q.correctAnswer === 'HOTSPOT' || q.correctAnswer === 'UNKNOWN' || q.isHotspot) q.answerType = 'matching';
    else q.answerType = 'single';
  }
  if (q.answerType === 'multi') {
    if (!q.correctAnswers) q.correctAnswers = String(q.correctAnswer).split(/[,\s]+/).filter(Boolean);
    q.correctAnswer = q.correctAnswers.join(', ');
    q.isHotspot = false;
  }
  if (q.answerType === 'matching' || q.answerType === 'ordering') {
    q.isHotspot = true;
  }
}

fs.writeFileSync(OUT, JSON.stringify(data, null, 2));
console.log('Wrote', OUT, 'questions:', data.length,
  '| enrich entries:', Object.keys(ENRICH).length,
  '| struct entries:', Object.keys(STRUCT).length);
