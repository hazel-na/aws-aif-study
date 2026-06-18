/**
 * PDF 원문 49페이지를 챕터별로 완전 구조화 (가독성 최우선)
 * PDF 텍스트는 pdfjs가 공백으로 구분하여 추출 → 3+공백을 줄바꿈으로 변환
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_PATH = path.resolve(process.cwd(), 'src', 'data', 'theory_raw.txt');
const OUTPUT_PATH = path.resolve(process.cwd(), 'src', 'data', 'theory.json');

const rawText = fs.readFileSync(RAW_PATH, 'utf-8');
const pageTexts = rawText.split(/=== PAGE \d+ ===\n/).filter(p => p.trim().length > 10);

console.log(`총 ${pageTexts.length}페이지`);

/**
 * PDF 텍스트를 읽기 좋은 형태로 변환
 * 핵심 규칙:
 * - 3개 이상 공백 = 문장/항목 경계 → \n으로 변환
 * - 2개 공백 = 단어 내 공백 → 1개 공백
 * - 번호 섹션 앞에 빈줄 추가
 */
function cleanText(raw) {
  let t = raw
    // 메타데이터 제거
    .replace(/hyzn\.log.*?HyunJin Na[^·]+·[^0-9]+ \d+\s*/s, '')
    .replace(/AWS AI Practioner \[AIF-01\]\s*/g, '')
    .replace(/통계\s*수정\s*삭제\s*/g, '');

  // 3개 이상 공백을 줄바꿈으로
  t = t.replace(/\s{4,}/g, '\n');
  t = t.replace(/\s{3}/g, '\n');

  // 연속 공백 정리
  t = t.replace(/ {2,}/g, ' ');

  // 줄별 처리
  const lines = t.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  const result = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const prev = result[result.length - 1];

    // 번호 섹션 앞에 빈줄 (예: "1. 정의:", "2. 머신러닝")
    const isNumberedSection = /^\d+\.\s+[가-힣A-Z]/.test(line);
    // 키워드 레이블 앞에 빈줄
    const isLabel = /^(정의|특징|키워드|활용|비유|구분|종류|방식|목적|한계|c\.f\)|📌|▶|구성 요소|생명주기|과정)/.test(line);
    // 챕터 제목
    const isChapter = /^\[제\d+장/.test(line);

    if (isChapter && prev) {
      result.push('');
      result.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      result.push(line);
      result.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    } else if (isNumberedSection && prev && prev !== '') {
      result.push('');
      result.push(line);
    } else if (isLabel && prev && !isNumberedSection) {
      result.push('');
      result.push(line);
    } else {
      result.push(line);
    }
  }

  return result.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

// 페이지 범위로 섹션 추출
function getPages(from, to) {
  return pageTexts.slice(from - 1, to).map(cleanText).join('\n\n');
}

const theory = [
  {
    id: 'ch1-ai-ml-basics',
    chapter: 1,
    title: '제1장: AI, ML, DL, 생성형 AI',
    emoji: '🤖',
    color: '#0EA5E9',
    description: 'AI·ML·딥러닝·생성형 AI의 개념과 관계, 학습 유형 완전 정리',
    topics: [
      {
        title: '1. AI / ML / DL / 생성형 AI — 관계와 정의',
        content: getPages(1, 1),
        keywords: ['AI', 'ML', 'Deep Learning', 'Generative AI', '마트료시카'],
      },
      {
        title: '2. 머신러닝 학습 유형 (지도/자기지도/비지도/준지도)',
        content: getPages(2, 3),
        keywords: ['Supervised', 'Self-supervised', 'Unsupervised', 'Semi-supervised', 'Fine-tuning', 'Pre-training'],
      },
      {
        title: '3. 강화학습 / 추론 유형 / AWS ML 칩 / 데이터 전처리',
        content: getPages(4, 5),
        keywords: ['Reinforcement Learning', 'DeepRacer', 'Trainium', 'Inferentia', 'Normalization', 'Tokenization'],
      },
      {
        title: '4. 딥러닝 모델 (BERT, Word2Vec, CNN, RNN, Transformer)',
        content: getPages(6, 6),
        keywords: ['BERT', 'Word2Vec', 'CNN', 'RNN', 'Transformer', 'Loss Function', 'Gradient Descent'],
      },
      {
        title: '5. 생성형 AI 아키텍처 (LLM, GAN, VAE, Diffusion)',
        content: getPages(7, 8),
        keywords: ['LLM', 'Foundation Model', 'GAN', 'VAE', 'Diffusion', 'Fine-tuning', 'RLHF'],
      },
      {
        title: '6. RAG (검색 증강 생성) 기초',
        content: getPages(9, 9),
        keywords: ['RAG', 'Retrieval', 'Augmented Generation', 'Vector Store', 'Knowledge Base'],
      },
    ],
  },
  {
    id: 'ch2-generative-ai',
    chapter: 2,
    title: '제2장: 생성형 AI 핵심 기술',
    emoji: '✨',
    color: '#8B5CF6',
    description: 'RAG vs 파인튜닝, 프롬프트 엔지니어링, 모델 학습 파라미터, 평가 지표',
    topics: [
      {
        title: '1. RAG vs 파인튜닝 비교 & 벡터 검색',
        content: getPages(10, 11),
        keywords: ['RAG', 'Fine-tuning', 'Continued Pre-training', 'Vector Search', 'Knowledge Base'],
      },
      {
        title: '2. 모델 학습 파라미터 (Epoch, Batch, Top-K, Top-P, Temperature)',
        content: getPages(12, 13),
        keywords: ['Epoch', 'Batch Size', 'Top-K', 'Top-P', 'Temperature', 'Learning Rate'],
      },
      {
        title: '3. 프롬프트 기법 (Zero-shot, Few-shot, CoT, System Prompt)',
        content: getPages(14, 14),
        keywords: ['Zero-shot', 'Few-shot', 'Chain of Thought', 'System Prompt', 'Negative Prompting'],
      },
      {
        title: '4. 언어 모델 평가 지표 (GLUE, ROUGE, BLEU, Perplexity)',
        content: getPages(15, 16),
        keywords: ['GLUE', 'ROUGE', 'BLEU', 'BERTScore', 'Perplexity', 'SummarizationEval'],
      },
      {
        title: '5. 이미지 생성 평가 지표 (IS, FID, CLIP) & 모델 문제',
        content: getPages(17, 18),
        keywords: ['IS', 'FID', 'CLIP', 'Inception Score', 'Overfitting', 'Underfitting', 'Regularization'],
      },
    ],
  },
  {
    id: 'ch3-model-training',
    chapter: 3,
    title: '제3장: 모델 평가·배포 & Amazon Bedrock',
    emoji: '🧠',
    color: '#10B981',
    description: '분류 평가 지표, Bedrock vs SageMaker, Guardrails, Knowledge Base, Agents',
    topics: [
      {
        title: '1. 분류 평가 지표 (Precision, Recall, F1, AUC-ROC)',
        content: getPages(19, 19),
        keywords: ['Precision', 'Recall', 'F1 Score', 'AUC', 'ROC', 'Confusion Matrix', 'Accuracy'],
      },
      {
        title: '2. Amazon Bedrock vs SageMaker 완전 비교',
        content: getPages(20, 21),
        keywords: ['Bedrock', 'SageMaker', 'Foundation Model', 'On-Demand', 'Provisioned Throughput'],
      },
      {
        title: '3. Bedrock Playground & Guardrails (안전 필터)',
        content: getPages(22, 23),
        keywords: ['Bedrock Playground', 'Guardrails', 'Content Filter', 'Model Invocation Logging'],
      },
      {
        title: '4. Bedrock Knowledge Base (RAG) & Agents',
        content: getPages(24, 24),
        keywords: ['Knowledge Base', 'Agents', 'IAM', 'Security', 'End-to-End Automation'],
      },
    ],
  },
  {
    id: 'ch4-aws-services',
    chapter: 4,
    title: '제4장: AWS SageMaker & AI 서비스',
    emoji: '☁️',
    color: '#FF9900',
    description: 'SageMaker 전체 기능, 빌트인 알고리즘, AI 서비스 API',
    topics: [
      {
        title: '1. SageMaker Ground Truth & A2I (데이터 라벨링 / 사람 검토)',
        content: getPages(25, 27),
        keywords: ['Ground Truth', 'A2I', 'Human Review', 'Labeling', 'Mechanical Turk', 'Auto Labeling'],
      },
      {
        title: '2. SageMaker Canvas & Autopilot (노코드 AutoML)',
        content: getPages(28, 29),
        keywords: ['Canvas', 'Autopilot', 'AutoML', 'No-code', 'Hyperparameter Tuning'],
      },
      {
        title: '3. SageMaker Model Monitor & Clarify (편향 탐지 / 설명 가능성)',
        content: getPages(30, 31),
        keywords: ['Model Monitor', 'Clarify', 'Data Drift', 'Bias Detection', 'SHAP', 'Explainability'],
      },
      {
        title: '4. SageMaker Model Registry, MLflow & AWS Audit Manager',
        content: getPages(32, 33),
        keywords: ['Model Registry', 'MLflow', 'MLOps', 'Audit Manager', 'Compliance'],
      },
      {
        title: '5. SageMaker 빌트인 알고리즘 — 지도학습',
        content: getPages(34, 35),
        keywords: ['XGBoost', 'Linear Learner', 'DeepAR', 'Factorization Machines', 'Decision Tree'],
      },
      {
        title: '6. SageMaker 빌트인 알고리즘 — 비지도학습 & 컴퓨터 비전',
        content: getPages(36, 38),
        keywords: ['K-Means', 'PCA', 'Anomaly Detection', 'LDA', 'Object2Vec', 'DeepLabV3'],
      },
      {
        title: '7. SageMaker 프레임워크 지원 & MLflow 연동',
        content: getPages(39, 39),
        keywords: ['TensorFlow', 'PyTorch', 'MXNet', 'MLflow', 'SageMaker Experiments'],
      },
      {
        title: '8. AWS AI 서비스 API (Transcribe, Comprehend, Rekognition, Textract 등)',
        content: getPages(40, 42),
        keywords: ['Transcribe', 'Comprehend', 'Rekognition', 'Textract', 'Polly', 'Translate', 'Lex', 'Forecast', 'Personalize'],
      },
      {
        title: '9. Bedrock 파인튜닝 기법 & 추론 방식 (Sync/Async/Batch)',
        content: getPages(43, 44),
        keywords: ['Instruction Fine-tuning', 'RLHF', 'RLAIF', 'Sync', 'Async', 'Batch Inference'],
      },
    ],
  },
  {
    id: 'ch5-responsible-ai',
    chapter: 5,
    title: '제5장: Responsible AI & 보안',
    emoji: '⚖️',
    color: '#EF4444',
    description: '책임감 있는 AI, AI 거버넌스, 데이터 프라이버시, 위협 탐지',
    topics: [
      {
        title: '1. Responsible AI 원칙 & 편향(Bias) 처리',
        content: getPages(45, 46),
        keywords: ['Responsible AI', 'Fairness', 'Bias', 'Transparency', 'Accountability', 'SageMaker Clarify'],
      },
      {
        title: '2. AI 거버넌스 (Model Card, Audit, Role Manager)',
        content: getPages(47, 47),
        keywords: ['Model Card', 'Audit Manager', 'Governance', 'Compliance', 'Role Manager'],
      },
      {
        title: '3. 데이터 보안 & 프라이버시 (암호화, 데이터 보존, Macie)',
        content: getPages(48, 48),
        keywords: ['Encryption', 'Data Retention', 'Privacy', 'PII', 'Amazon Macie', 'IAM'],
      },
      {
        title: '4. 위협 탐지 & 보안 모니터링 (GuardDuty, Inspector, Security Hub)',
        content: getPages(49, 49),
        keywords: ['GuardDuty', 'Inspector', 'Security Hub', 'CloudTrail', 'Threat Detection'],
      },
    ],
  },
];

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(theory, null, 2), 'utf-8');
console.log(`✅ theory.json 생성 완료 → ${OUTPUT_PATH}`);
theory.forEach(ch => {
  console.log(`  ${ch.emoji} ${ch.title}: ${ch.topics.length}개 섹션`);
  ch.topics.forEach(t => {
    const lines = t.content.split('\n').length;
    console.log(`    - ${t.title} (${t.content.length}자, ${lines}줄)`);
  });
});

// 첫 번째 섹션 미리보기
console.log('\n\n=== 첫 번째 섹션 미리보기 ===');
console.log(theory[0].topics[1].content.substring(0, 800));
