#!/usr/bin/env node
/**
 * parse-docx.js — AWS AIF-C01 문제은행 파서
 * 실행: node scripts/parse-docx.js
 */

import mammoth from 'mammoth';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCX_PATH = path.resolve(__dirname, 'source.docx');
const OUTPUT_PATH = path.resolve(process.cwd(), 'src', 'data', 'questions.json');

// ── 카테고리 키워드
const CATEGORY_KEYWORDS = {
  'aws-services': [
    'SageMaker', 'Bedrock', 'Rekognition', 'Comprehend', 'Textract',
    'Transcribe', 'Polly', 'Translate', 'Lex', 'Forecast', 'Personalize',
    'Kendra', 'CodeWhisperer', 'Inferentia', 'Trainium', 'Macie',
    'GuardDuty', 'CloudWatch', 'Q Business', 'QuickSight', 'Panorama',
    'Lookout', 'Monitron', 'HealthLake', 'Augmented AI', 'A2I',
  ],
  'ai-ethics': [
    'bias', 'fairness', 'ethical', 'responsible', 'transparency',
    'explainability', 'accountability', 'privacy', 'compliance',
    'regulation', 'harm', 'risk', 'audit', 'governance', 'security',
    'GDPR', '편향', '공정', '윤리', '투명성', '개인정보',
  ],
  'generative-ai': [
    'LLM', 'large language model', 'generative', 'foundation model',
    'RAG', 'retrieval', 'prompt', 'BERT', 'GPT', 'diffusion',
    'GAN', 'VAE', 'transformer', 'attention', 'token', 'embedding',
    'hallucination', 'fine-tun', 'RLHF', 'instruction', 'guardrail',
    'Bedrock', 'chain-of-thought', 'few-shot', 'zero-shot',
  ],
  'deep-learning': [
    'neural network', 'CNN', 'RNN', 'LSTM', 'deep learning', 'gradient',
    'backpropagation', 'epoch', 'batch size', 'learning rate',
    'overfitting', 'underfitting', 'dropout', 'activation',
    'loss function', 'accuracy', 'precision', 'recall', 'F1', 'AUC', 'ROC',
    'confusion matrix', 'RMSE', 'R-squared',
  ],
};

function categorize(text) {
  const lower = text.toLowerCase();
  for (const [cat, kws] of Object.entries(CATEGORY_KEYWORDS)) {
    if (kws.some(kw => lower.includes(kw.toLowerCase()))) return cat;
  }
  return 'ml-basics';
}

// ── 한 줄에 붙어있는 선택지를 분리: "A. textB. textC. text"
function splitConcatenatedChoices(line) {
  // "A. " 또는 "A) " 로 시작하는 패턴으로 분리
  const results = [];
  const re = /([A-E])\.\s+/g;
  let match;
  let lastIdx = 0;
  let lastKey = null;

  while ((match = re.exec(line)) !== null) {
    if (lastKey !== null) {
      const text = line.substring(lastIdx, match.index).trim();
      results.push({ key: lastKey, text });
    }
    lastKey = match[1];
    lastIdx = match.index + match[0].length;
  }
  if (lastKey !== null) {
    results.push({ key: lastKey, text: line.substring(lastIdx).trim() });
  }
  return results;
}

// ── 섹션 레이블 판별
function getSectionLabel(line) {
  const t = line.trim();
  if (/^(문제\s*원문|원문)\s*([\(（]?\s*(영문|English)\s*[\)）]?)?$/i.test(t)) return 'enQ';
  if (/^(문제\s*번역|번역)\s*([\(（]?\s*(한국어|Korean)\s*[\)）]?)?$/i.test(t)) return 'koQ';
  if (/^(정답|최종\s*정답)$/.test(t)) return 'answer';
  if (/^해설\s*([\(（]?(한국어|Korean)[\)）]?)?$/.test(t)) return 'explain';
  if (/^(용어\s*(정리|설명))$/.test(t)) return 'vocab';
  if (/^오답\s*(설명|분석)$/.test(t)) return 'wrongDesc';
  return null;
}

function parseBlock(blockText, questionNum) {
  const rawLines = blockText.split('\n');
  const lines = rawLines.map(l => l.trim());

  let section = 'header';
  const data = {
    enQ: [],
    enChoices: [],
    koQ: [],
    koChoices: [],
    answerLines: [],
    explainLines: [],
    vocabLines: [],
    isHotspot: false,
  };

  // HOTSPOT 여부 확인
  data.isHotspot = /HOTSPOT/i.test(lines[0] + (lines[1] || ''));

  for (const line of lines) {
    if (!line) continue;

    const label = getSectionLabel(line);
    if (label) { section = label; continue; }

    // 선택지 패턴 체크 (단일 라인 vs 붙어있는 라인)
    const singleChoice = line.match(/^([A-E])\.\s+(.+)/);
    const hasConcatenated = /[A-E]\.\s+.+[A-E]\.\s+/.test(line);

    if (hasConcatenated) {
      // 한 줄에 여러 선택지가 붙어있는 경우
      const parsed = splitConcatenatedChoices(line);
      if (section === 'enQ') {
        // 선택지는 문제 텍스트에서 분리
        data.enChoices.push(...parsed);
      } else if (section === 'koQ') {
        data.koChoices.push(...parsed);
      }
      continue;
    }

    if (singleChoice) {
      if (section === 'enQ') {
        data.enChoices.push({ key: singleChoice[1], text: singleChoice[2].trim() });
      } else if (section === 'koQ') {
        data.koChoices.push({ key: singleChoice[1], text: singleChoice[2].trim() });
      } else if (section === 'answer') {
        if (data.answerLines.length === 0) data.answerLines.push(singleChoice[1]);
      }
      continue;
    }

    // 일반 텍스트 라인
    switch (section) {
      case 'enQ':   data.enQ.push(line); break;
      case 'koQ':   data.koQ.push(line); break;
      case 'answer': data.answerLines.push(line); break;
      case 'explain': data.explainLines.push(line); break;
      case 'vocab':  data.vocabLines.push(line); break;
    }
  }

  // ── 영문/한국어 문제 텍스트 (선택지 이후 텍스트 제거)
  const englishQuestion = data.enQ.join(' ').trim();
  const koreanQuestion = data.koQ.join(' ').trim();

  // ── 선택지 조합
  const choices = [];
  const maxLen = Math.max(data.enChoices.length, data.koChoices.length);
  for (let i = 0; i < maxLen; i++) {
    choices.push({
      key: (data.enChoices[i] || data.koChoices[i]).key,
      enText: data.enChoices[i]?.text || '',
      koText: data.koChoices[i]?.text || '',
    });
  }

  // ── 정답 추출 (3-pass)
  let correctAnswer = '';

  // 1차: 명시적 정답 섹션
  if (data.answerLines.length > 0) {
    const full = data.answerLines.join(' ');
    const m = full.match(/^([A-E])/);
    if (m) {
      correctAnswer = m[1];
    } else {
      // 정답이 A/B/C/D 형식이 아니면 매칭/HOTSPOT형으로 처리
      correctAnswer = 'HOTSPOT';
    }
  }

  // 2차: 해설 내 "정답: X" 패턴
  if (!correctAnswer) {
    for (const l of data.explainLines.slice(0, 5)) {
      const m = l.match(/정답\s*[:：]\s*([A-E])/);
      if (m) { correctAnswer = m[1]; break; }
    }
  }

  // 3차: 해설 내 "정답: A (설명...)" 패턴
  if (!correctAnswer) {
    for (const l of data.explainLines.slice(0, 5)) {
      const m = l.match(/정답\s*[:：]\s*([A-E])\s*[\(\（(（]/);
      if (m) { correctAnswer = m[1]; break; }
    }
  }

  // 4차: 해설 내 HOTSPOT/매칭형 패턴 감지
  if (!correctAnswer) {
    const explainAll = data.explainLines.join('\n');
    const isMatchingType = data.isHotspot
      || /정답\s*예시|주관식|→\s*(Real-time|Batch|Fine-tun)/i.test(explainAll)
      || /[1-9]번\s*[:：]/.test(explainAll)       // "1번: ...", "2번: ..."
      || /SageMaker\s+\w+\s*\(|→\s*SageMaker/.test(explainAll)  // "SageMaker Canvas —"
      || /순서|단계|Step\s*[1-9]/.test(explainAll);
    if (isMatchingType) {
      correctAnswer = 'HOTSPOT';
    } else {
      // 단순 A/B/C/D 정답이 없는 모든 케이스 → 참조용 HOTSPOT
      console.warn(`⚠️  Q${questionNum}: 정답 추출 실패 → "UNKNOWN" 처리`);
      correctAnswer = 'UNKNOWN';
      data.isHotspot = true;
    }
  }

  // ── 해설 (정답 라인 제거)
  const explanation = data.explainLines
    .filter(l => !/^정답\s*[:：]/.test(l))
    .join('\n')
    .trim();

  // ── 용어 정리
  const vocabulary = [];
  for (const vl of data.vocabLines) {
    const colonIdx = vl.indexOf(':');
    if (colonIdx > 0) {
      vocabulary.push({
        term: vl.substring(0, colonIdx).trim(),
        definition: vl.substring(colonIdx + 1).trim(),
      });
    }
  }

  return {
    id: questionNum,
    englishQuestion,
    choices,
    koreanQuestion,
    correctAnswer,
    explanation,
    vocabulary,
    isHotspot: data.isHotspot,
    category: categorize(englishQuestion + ' ' + koreanQuestion),
  };
}

async function main() {
  console.log(`📄 DOCX 읽는 중: ${DOCX_PATH}`);

  if (!fs.existsSync(DOCX_PATH)) {
    console.error(`❌ 파일 없음: ${DOCX_PATH}`);
    process.exit(1);
  }

  const result = await mammoth.extractRawText({ path: DOCX_PATH });
  const rawText = result.value.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // "Question N" 또는 "Question N (HOTSPOT)" 으로 분할
  // (?=^Question\s+\d+...) 로 lookahead 분할
  const blocks = rawText.split(/(?=^Question\s+\d+(?:\s*[\(\（][^)）]*[\)\）])?\s*$)/m);
  const questionBlocks = blocks.filter(b => /^Question\s+\d+/m.test(b));

  console.log(`🔍 발견된 Question 블록: ${questionBlocks.length}개`);

  const questions = [];

  for (const block of questionBlocks) {
    // 첫 줄에서 문제 번호 추출 (HOTSPOT 등 접미사 무시)
    const numMatch = block.match(/^Question\s+(\d+)/m);
    if (!numMatch) continue;

    const questionNum = parseInt(numMatch[1], 10);
    try {
      const q = parseBlock(block, questionNum);
      questions.push(q);
    } catch (err) {
      console.error(`❌ Q${questionNum} 파싱 오류:`, err.message);
    }
  }

  // 번호순 정렬
  questions.sort((a, b) => a.id - b.id);

  // 중복 제거
  const seen = new Set();
  const unique = questions.filter(q => {
    if (seen.has(q.id)) { console.warn(`⚠️ Q${q.id} 중복 → 제거`); return false; }
    seen.add(q.id);
    return true;
  });

  // 누락 확인
  const parsedIds = new Set(unique.map(q => q.id));
  const missing = [];
  for (let i = 1; i <= 329; i++) {
    if (!parsedIds.has(i)) missing.push(i);
  }
  if (missing.length > 0) {
    console.warn(`⚠️  누락된 문제: ${missing.join(', ')}`);
  }

  // 저장
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(unique, null, 2), 'utf-8');

  const unknowns = unique.filter(q => q.correctAnswer === 'UNKNOWN');
  const hotspots = unique.filter(q => q.isHotspot);

  console.log(`\n✅ ${unique.length}개 문제 저장 → ${OUTPUT_PATH}`);
  console.log(`   HOTSPOT(매칭형): ${hotspots.length}개`);
  if (unknowns.length > 0) {
    console.warn(`   ⚠️  정답 미상: ${unknowns.length}개 (Q${unknowns.map(q=>q.id).join(', Q')})`);
  }

  // 샘플 출력
  const q1 = unique.find(q => q.id === 1);
  if (q1) {
    console.log(`\n📋 Q1 샘플:`);
    console.log(`   영문: ${q1.englishQuestion.substring(0, 80)}...`);
    console.log(`   정답: ${q1.correctAnswer}`);
    console.log(`   선택지: ${q1.choices.map(c => `${c.key}(${c.enText.substring(0,20)})`).join(' | ')}`);
    console.log(`   카테고리: ${q1.category}`);
  }
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
