const THEORY = [
  {
    id: 'ml-basics',
    title: 'AI / ML 기초',
    emoji: '🤖',
    color: '#0EA5E9',
    topics: [
      {
        title: '머신러닝(ML) 유형',
        content: `지도학습 (Supervised Learning): 레이블된 데이터로 학습. 회귀(Regression), 분류(Classification).

비지도학습 (Unsupervised Learning): 레이블 없이 패턴 발견. 클러스터링(Clustering), 차원 축소(Dimensionality Reduction).

강화학습 (Reinforcement Learning): 보상/패널티로 최적 행동 학습. AWS DeepRacer에 사용.

반지도학습 (Semi-supervised): 일부만 레이블된 데이터 활용.`,
        keywords: ['Supervised', 'Unsupervised', 'Reinforcement', 'Clustering'],
      },
      {
        title: 'AWS AI 인프라',
        content: `AWS Trainium: ML 모델 훈련에 특화된 칩.
AWS Inferentia: ML 추론(Inference)에 최적화된 칩.

Amazon SageMaker: ML 모델 빌드·학습·배포 통합 플랫폼.
- SageMaker Studio: 통합 개발 환경
- SageMaker Canvas: 코드 없이 ML 모델 생성
- SageMaker Ground Truth: 데이터 레이블링
- SageMaker JumpStart: 사전 구축 솔루션
- SageMaker Model Monitor: 배포 모델 모니터링`,
        keywords: ['Trainium', 'Inferentia', 'SageMaker', 'Canvas'],
      },
      {
        title: '데이터 전처리',
        content: `정규화(Normalization): 데이터를 0~1 범위로 변환.
표준화(Standardization): 평균 0, 표준편차 1로 변환.
결측값 처리: 제거, 평균 대체, 중간값 대체.
범주형 인코딩: One-hot encoding, Label encoding.

특성 추출(Feature Extraction):
- PCA: 주성분 분석, 차원 축소
- Word2Vec: 단어 임베딩
- BERT: 문맥 기반 임베딩`,
        keywords: ['Normalization', 'PCA', 'Word2Vec', 'BERT', 'One-hot'],
      },
    ],
  },
  {
    id: 'deep-learning',
    title: '딥러닝 & 모델 평가',
    emoji: '🧠',
    color: '#8B5CF6',
    topics: [
      {
        title: '신경망 구조',
        content: `CNN (Convolutional Neural Network): 이미지 인식에 특화.
RNN (Recurrent Neural Network): 시계열, 텍스트 처리에 적합.
LSTM: RNN의 장기 의존성 문제 해결.

학습 파라미터:
- 에포크(Epoch): 전체 데이터셋 학습 횟수
- 배치 크기(Batch Size): 한 번에 처리하는 샘플 수
- 학습률(Learning Rate): 가중치 업데이트 속도
- 드롭아웃(Dropout): 과적합 방지`,
        keywords: ['CNN', 'RNN', 'LSTM', 'Epoch', 'Dropout'],
      },
      {
        title: '모델 평가 지표',
        content: `분류 문제:
- 정확도(Accuracy): (TP+TN) / 전체
- 정밀도(Precision): TP / (TP+FP) — 양성 예측의 정확성
- 재현율(Recall): TP / (TP+FN) — 실제 양성 탐지율
- F1 Score: Precision과 Recall의 조화 평균
- AUC-ROC: 분류기 전반적 성능

회귀 문제:
- MSE (Mean Squared Error)
- RMSE (Root MSE)
- R² Score: 설명력

혼동 행렬 (Confusion Matrix): TP, TN, FP, FN 분류`,
        keywords: ['Accuracy', 'Precision', 'Recall', 'F1', 'AUC', 'RMSE'],
      },
      {
        title: '모델 설명 가능성',
        content: `PDP (Partial Dependence Plots): 특정 Feature가 예측에 미치는 영향 시각화. 이해관계자 보고에 적합.

SHAP (SHapley Additive exPlanations): 각 Feature의 기여도 계산.

결정 트리(Decision Tree): 해석 가능한 화이트박스 모델.
신경망: 블랙박스 모델 → 설명 어려움.

Amazon SageMaker Clarify: 모델 편향 탐지 및 설명 가능성 도구.`,
        keywords: ['PDP', 'SHAP', 'Explainability', 'SageMaker Clarify'],
      },
    ],
  },
  {
    id: 'generative-ai',
    title: '생성형 AI & LLM',
    emoji: '✨',
    color: '#F59E0B',
    topics: [
      {
        title: '파운데이션 모델 & LLM',
        content: `파운데이션 모델(FM): 대규모 데이터로 사전 훈련된 모델. 다양한 작업에 재사용.

LLM (Large Language Model): 텍스트 생성, 요약, 번역, Q&A에 사용.
- 할루시네이션(Hallucination): 존재하지 않는 정보를 사실처럼 생성하는 현상
- 비결정성(Nondeterminism): 같은 입력에 다른 출력

Amazon Bedrock: AWS의 FM 관리 서비스. Claude, Titan, Stable Diffusion 등 지원.
- Guardrails: 유해 콘텐츠 필터링
- Agents: 자율 작업 실행`,
        keywords: ['Foundation Model', 'LLM', 'Hallucination', 'Bedrock', 'Guardrails'],
      },
      {
        title: 'RAG (검색 증강 생성)',
        content: `RAG (Retrieval-Augmented Generation):
1. Retrieve: 외부 데이터베이스에서 관련 문서 검색
2. Augment: 검색 결과를 프롬프트에 추가
3. Generate: LLM이 증강된 프롬프트로 응답 생성

장점: 최신 정보 반영, 환각 감소, 도메인 특화.
Amazon OpenSearch: 벡터 검색 지원, RAG에 활용.
Amazon Kendra: 엔터프라이즈 검색 서비스.`,
        keywords: ['RAG', 'Vector Search', 'OpenSearch', 'Kendra'],
      },
      {
        title: '프롬프트 엔지니어링',
        content: `Zero-shot: 예시 없이 작업 요청.
Few-shot: 몇 가지 예시 제공 후 요청.
Chain-of-thought: 단계별 사고 과정 유도. "Think step by step"
Negative Prompting: 원하지 않는 출력 명시.

생성 파라미터:
- Temperature: 높을수록 창의적, 낮을수록 결정적
- Top-K: 상위 K개 토큰에서 샘플링
- Top-P (Nucleus): 누적 확률 P 이하 토큰에서 샘플링`,
        keywords: ['Zero-shot', 'Few-shot', 'Chain-of-thought', 'Temperature', 'Top-K', 'Top-P'],
      },
      {
        title: '파인튜닝 & 커스터마이징',
        content: `파인튜닝(Fine-tuning): 레이블된 데이터로 특정 작업에 맞게 모델 재학습.
Continued Pre-training: 도메인 데이터로 추가 사전 학습. 레이블 불필요.
RLHF (Reinforcement Learning from Human Feedback): 사람의 피드백으로 정렬.

비용 순서 (저→고):
프롬프트 엔지니어링 → RAG → 파인튜닝 → 전체 모델 학습`,
        keywords: ['Fine-tuning', 'RLHF', 'Continued Pre-training'],
      },
    ],
  },
  {
    id: 'aws-services',
    title: 'AWS AI 서비스',
    emoji: '☁️',
    color: '#FF9900',
    topics: [
      {
        title: 'AI/ML 서비스',
        content: `Amazon Rekognition: 이미지/영상 분석 (객체 탐지, 얼굴 인식).
Amazon Comprehend: 자연어 처리 (감정 분석, 개체명 인식).
Amazon Textract: 문서에서 텍스트/데이터 추출 (OCR+).
Amazon Transcribe: 음성 → 텍스트 변환 (STT).
Amazon Polly: 텍스트 → 음성 변환 (TTS).
Amazon Translate: 기계 번역.
Amazon Lex: 챗봇 구축 (NLU/NLG).
Amazon Forecast: 시계열 예측.
Amazon Personalize: 개인화 추천.`,
        keywords: ['Rekognition', 'Comprehend', 'Textract', 'Transcribe', 'Polly', 'Lex'],
      },
      {
        title: 'Amazon Q 시리즈',
        content: `Amazon Q Business: 기업 데이터 기반 AI 어시스턴트.
Amazon Q Developer: 개발자 코딩 보조 (구 CodeWhisperer).
Amazon Q in QuickSight: 데이터 시각화/분석 AI.

Amazon SageMaker 주요 기능:
- Real-time Inference: 짧은 지연 시간, 대화형 앱
- Batch Transform: 대용량 일괄 처리
- Asynchronous Inference: 큰 페이로드, 긴 처리 시간`,
        keywords: ['Amazon Q', 'CodeWhisperer', 'Real-time Inference', 'Batch Transform'],
      },
    ],
  },
  {
    id: 'ai-ethics',
    title: 'AI 윤리 & 보안',
    emoji: '⚖️',
    color: '#EF4444',
    topics: [
      {
        title: '책임감 있는 AI',
        content: `AWS 책임감 있는 AI 원칙:
공정성(Fairness), 설명 가능성(Explainability), 개인정보 보호(Privacy),
신뢰성(Robustness), 보안(Security), 거버넌스(Governance).

편향(Bias) 유형:
- 데이터 편향: 불균형한 훈련 데이터
- 알고리즘 편향: 모델 자체의 편향
- 확인 편향: 기존 신념 강화

Amazon SageMaker Clarify: 데이터 및 모델 편향 탐지.`,
        keywords: ['Fairness', 'Bias', 'SageMaker Clarify', 'Explainability'],
      },
      {
        title: '보안 & 규정 준수',
        content: `Amazon Macie: S3에서 민감 정보 자동 탐지 (PII 등).
AWS IAM: 접근 권한 관리. 최소 권한 원칙(Least Privilege).
Amazon GuardDuty: 위협 탐지.

데이터 보호:
- 암호화: 전송 중(in-transit), 저장 중(at-rest)
- 데이터 익명화/가명화
- GDPR/규정 준수

AI 모델 보안:
- 적대적 공격(Adversarial Attacks): 입력 조작으로 오분류 유도
- 프롬프트 인젝션(Prompt Injection): 악의적 프롬프트 삽입`,
        keywords: ['Macie', 'IAM', 'GuardDuty', 'GDPR', 'Prompt Injection'],
      },
    ],
  },
];

export default THEORY;
