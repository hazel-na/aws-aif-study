// 선택지 한글 해석이 빠진 문제(#301~318)에 koText를 채워 넣는 일회성 스크립트
import { readFileSync, writeFileSync } from 'fs';

const PATH = new URL('../src/data/questions.json', import.meta.url);

const KO = {
  301: {
    A: 'Amazon Bedrock 플레이그라운드',
    B: 'Amazon SageMaker Clarify',
    C: 'Amazon Bedrock Guardrails(가드레일)',
    D: 'Amazon SageMaker JumpStart',
  },
  302: {
    A: 'Nova Lite',
    B: 'Nova Pro',
    C: 'Nova Canvas',
    D: 'Nova Reel',
  },
  303: {
    A: '유해한 응답을 피하도록 FM을 미세 조정(파인튜닝)한다.',
    B: 'Amazon Bedrock Guardrails의 콘텐츠 필터와 거부 주제(denied topics)를 사용한다.',
    C: 'FM을 더 안전한 FM으로 교체한다.',
    D: '안전한 응답을 생성하기 위해 사고 사슬(chain-of-thought) 프롬프팅을 사용한다.',
  },
  304: {
    A: '새로운 AI 알고리즘을 만드는 과정',
    B: '학습된 모델을 사용하여 처음 보는 데이터에 대해 예측이나 결정을 내리는 것',
    C: '여러 AI 모델을 하나의 모델로 결합하는 과정',
    D: 'AI 시스템을 위한 학습 데이터를 수집하는 방법',
  },
  305: {
    A: '프롬프트 관리(Prompt Management)',
    B: '응답 스트리밍(Response streaming)',
    C: '지식 베이스(Knowledge Bases)',
    D: '에이전트(Agents)',
  },
  306: {
    A: '환각(Hallucinations)',
    B: '비결정성(Nondeterminism)',
    C: '정확도(Accuracy)',
    D: '멀티모달리티(Multimodality)',
  },
  307: {
    A: 'Amazon Bedrock의 Stable Diffusion 3.5 Large를 사용하여 텍스트 입력을 기반으로 이미지를 생성한다.',
    B: 'Amazon Polly를 사용하여 이야기 텍스트를 기반으로 오디오북을 만든다.',
    C: 'Amazon Rekognition을 사용하여 이미지 내용을 분석하고 텍스트 속성을 감지한다.',
    D: '표준 프롬프트 템플릿을 만들고, Amazon Q Business를 사용하여 이야기를 삽화로 표현한다.',
  },
  308: {
    A: '실시간 추론(Real-time inference)',
    B: '배치 변환(Batch transform)',
    C: '서버리스 추론(Serverless inference)',
    D: '비동기 추론(Asynchronous inference)',
  },
  310: {
    A: '회사의 모든 구성원이 ISO 인증을 받았다.',
    B: '회사가 사용하는 모든 AI 시스템이 ISO 인증을 받았다.',
    C: '모든 AI 애플리케이션 팀 구성원이 ISO 인증을 받았다.',
    D: '회사의 개발 프레임워크가 ISO 인증을 받았다.',
  },
  312: {
    A: '비지도 학습(Unsupervised learning)',
    B: '지도 학습(Supervised learning)',
    C: '강화 학습(Reinforcement learning)',
    D: '준지도 학습(Semi-supervised learning)',
  },
  314: {
    A: '데이터 비식별화(De-identification)',
    B: '데이터 품질 표준',
    C: '데이터 보존(Retention)',
    D: '로그 저장',
  },
  315: {
    A: '이미지를 입력으로 사용하여 심층 신경망(deep neural network)을 만든다.',
    B: '변환 작업을 수행하는 AWS Lambda 함수를 만든다.',
    C: 'temperature 값이 높은 Amazon Bedrock 대규모 언어 모델(LLM)을 사용한다.',
    D: 'AWS Glue Data Quality를 사용하여 각 이미지를 수정한다.',
  },
  316: {
    A: '환각(Hallucinations)',
    B: '비결정성(Nondeterminism)',
    C: '정확도(Accuracy)',
    D: '멀티모달리티(Multimodality)',
  },
  317: {
    A: '변분 오토인코더(VAE) 모델',
    B: '트랜스포머(Transformer) 기반 모델',
    C: '확산(Diffusion) 모델',
    D: '생성적 적대 신경망(GAN) 모델',
  },
  318: {
    A: '모델이 과소적합(underfit)되었다.',
    B: '모델에 프롬프트 엔지니어링이 필요하다.',
    C: '모델이 편향(biased)되었다.',
    D: '모델이 과대적합(overfit)되었다.',
  },
};

const data = JSON.parse(readFileSync(PATH, 'utf8'));
let filled = 0;
for (const q of data) {
  const map = KO[q.id];
  if (!map || !Array.isArray(q.choices)) continue;
  for (const c of q.choices) {
    if (map[c.key] && !(c.koText && c.koText.trim())) {
      c.koText = map[c.key];
      filled++;
    }
  }
}
writeFileSync(PATH, JSON.stringify(data, null, 2) + '\n');
console.log('filled choices:', filled);
