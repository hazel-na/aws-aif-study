/**
 * PDF에서 추출한 이론 텍스트를 구조화된 JSON으로 변환
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_PATH = path.resolve(process.cwd(), 'src', 'data', 'theory_raw.txt');
const OUTPUT_PATH = path.resolve(process.cwd(), 'src', 'data', 'theory.json');

const rawText = fs.readFileSync(RAW_PATH, 'utf-8');

// 페이지별로 분리
const pages = rawText.split(/=== PAGE \d+ ===\n/).filter(p => p.trim().length > 10);

// 공백 정리 함수
function cleanText(text) {
  return text
    .replace(/\s{3,}/g, '  ')      // 과도한 공백 제거
    .replace(/  +/g, ' ')           // 이중 공백 단일화
    .replace(/([가-힣a-zA-Z.])  ([가-힣A-Za-z])/g, '$1\n$2')  // 문장 경계에 줄바꿈
    .trim();
}

// 섹션 분리 패턴
const CHAPTER_PATTERNS = [
  /\[제\d+장[:：]/,
  /제\d+장/,
  /Chapter \d+/i,
];

const TOPIC_PATTERNS = [
  /^\d+\.\s+[A-Z가-힣]/m,
  /^[A-Z가-힣].{2,30}[:：]\s/m,
];

// 페이지들을 챕터별로 그룹화
let chapter1Pages = [];
let chapter2Pages = [];
let inChapter2 = false;

for (const page of pages) {
  if (/제2장|[2]장/.test(page) || /생성형.*AI.*활용|Generative AI.*실전|RAG|Foundation Model.*실전/.test(page)) {
    inChapter2 = true;
  }
  if (inChapter2) {
    chapter2Pages.push(page);
  } else {
    chapter1Pages.push(page);
  }
}

// 챕터 1 내용 파싱 (여러 주제로 분리)
function extractSections(pageTexts, chapterTitle) {
  const fullText = pageTexts.map(cleanText).join('\n\n');
  const sections = [];

  // 주요 번호 섹션으로 분리 ("1. ", "2. " 등)
  const sectionSplits = fullText.split(/(?=\n\d+\.\s{1,4}[A-Z가-힣])/);

  for (const section of sectionSplits) {
    if (section.trim().length < 50) continue;

    // 첫 줄을 타이틀로 사용
    const lines = section.split('\n').filter(l => l.trim().length > 0);
    if (lines.length === 0) continue;

    // 타이틀 추출 (번호 포함 첫 줄)
    let title = lines[0].replace(/^\d+\.\s*/, '').substring(0, 60).trim();
    if (!title || title.length < 3) title = lines[1]?.substring(0, 60) || '내용';

    const content = lines.slice(1).join('\n').substring(0, 3000);

    if (content.trim().length > 20) {
      sections.push({ title, content: content.trim() });
    }
  }

  return sections;
}

// 챕터 전체 텍스트를 50자 단위 섹션으로 나누기 (대안 방식)
function splitByParagraph(pageTexts) {
  const fullText = pageTexts.map(cleanText).join('\n\n');
  const paragraphs = fullText.split(/\n{2,}/);
  const chunks = [];
  let current = { title: '', parts: [] };

  for (const para of paragraphs) {
    if (para.trim().length < 10) continue;

    // 새 섹션 감지: 번호로 시작하거나 짧고 중요한 헤더
    const isHeader = /^\d+\.\s+\S/.test(para.trim()) ||
      (para.trim().length < 60 && /^[\[【]|[:：]$/.test(para.trim()));

    if (isHeader && current.parts.length > 0) {
      chunks.push(current);
      current = { title: para.trim().replace(/^\d+\.\s*/, '').substring(0, 50), parts: [] };
    } else if (isHeader) {
      current.title = para.trim().replace(/^\d+\.\s*/, '').substring(0, 50);
    } else {
      current.parts.push(para.trim());
    }
  }
  if (current.parts.length > 0) chunks.push(current);
  return chunks;
}

// 챕터 1
const ch1Sections = extractSections(chapter1Pages, '제1장');
// 챕터 2
const ch2Sections = extractSections(chapter2Pages, '제2장');

// 구조화된 데이터
const theory = [
  {
    id: 'ch1-ai-ml',
    chapter: 1,
    title: 'AI / ML / DL / 생성형 AI 기초',
    emoji: '🤖',
    color: '#0EA5E9',
    description: 'AI, ML, 딥러닝, 생성형 AI의 개념과 관계, 학습 유형, 데이터 처리',
    topics: ch1Sections.length > 0 ? ch1Sections : [
      { title: 'Chapter 1 내용', content: chapter1Pages.map(cleanText).join('\n\n').substring(0, 5000) }
    ],
    fullText: chapter1Pages.map(cleanText).join('\n\n'),
  },
  {
    id: 'ch2-practical',
    chapter: 2,
    title: '실전 응용 & AWS AI 서비스',
    emoji: '☁️',
    color: '#FF9900',
    description: 'RAG, 프롬프트 엔지니어링, 파인튜닝, AWS 서비스 실전 활용',
    topics: ch2Sections.length > 0 ? ch2Sections : [
      { title: 'Chapter 2 내용', content: chapter2Pages.map(cleanText).join('\n\n').substring(0, 5000) }
    ],
    fullText: chapter2Pages.map(cleanText).join('\n\n'),
  },
];

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(theory, null, 2), 'utf-8');
console.log(`✅ theory.json 생성 완료 → ${OUTPUT_PATH}`);
console.log(`   챕터1 페이지: ${chapter1Pages.length}, 섹션: ${ch1Sections.length}`);
console.log(`   챕터2 페이지: ${chapter2Pages.length}, 섹션: ${ch2Sections.length}`);
console.log('\n챕터1 첫 번째 섹션 미리보기:');
if (ch1Sections[0]) {
  console.log('  타이틀:', ch1Sections[0].title);
  console.log('  내용:', ch1Sections[0].content.substring(0, 200));
}
