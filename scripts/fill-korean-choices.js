// 선택지 한글 해석이 없는(영문만 있거나 제품명/약어만 있는) 항목에 한글 해석을 채우는 스크립트.
// id -> { key: koText } 로 지정한 값으로 덮어쓴다.
import { readFileSync, writeFileSync } from 'fs';

const PATH = new URL('../src/data/questions.json', import.meta.url);

const KO = {
  11: { A: 'Amazon SageMaker Feature Store (피처 저장·공유·관리)', B: 'Amazon SageMaker Data Wrangler (데이터 준비·전처리)', C: 'Amazon SageMaker Clarify (편향 탐지·설명가능성)', D: 'Amazon SageMaker Model Cards (모델 문서화)' },
  13: { A: 'AWS PrivateLink (VPC 내 프라이빗 연결)', B: 'Amazon Macie (S3 민감정보 탐지)', C: 'Amazon CloudFront (콘텐츠 전송 네트워크, CDN)', D: '인터넷 게이트웨이(Internet gateway)' },
  23: { A: 'Temperature (출력 무작위성 조절 값)', B: '컨텍스트 윈도우(Context window, 한 번에 처리 가능한 토큰 양)', C: '배치 크기(Batch size)', D: '모델 크기(Model size)' },
  26: { A: 'AWS Audit Manager (감사 증거 수집 자동화)', B: 'AWS CloudTrail (API 호출 로깅·감사)', C: 'Amazon Fraud Detector (사기 탐지)', D: 'AWS Trusted Advisor (모범 사례 점검)' },
  28: { A: 'AWS Audit Manager (감사 증거 수집 자동화)', B: 'AWS Artifact (규정 준수 보고서 제공)', C: 'AWS Trusted Advisor (모범 사례 점검)', D: 'AWS Data Exchange (서드파티 데이터 구독)' },
  33: { A: 'Amazon Personalize (개인화 추천)', B: 'Amazon SageMaker JumpStart (사전학습 모델 빠른 배포)', C: 'PartyRock (Amazon Bedrock 무료 실험 놀이터)', D: 'Amazon SageMaker 엔드포인트 (모델 배포 엔드포인트)' },
  35: { A: '생성형 사전학습 트랜스포머(GPT)', B: '잔차 신경망(Residual neural network, ResNet)', C: '서포트 벡터 머신(SVM)', D: 'WaveNet (음성 생성 모델)' },
  45: { A: 'Amazon Lex (챗봇·음성봇)', B: 'Amazon Comprehend (자연어 처리·감정 분석)', C: 'Amazon Polly (텍스트→음성 변환)', D: 'Amazon Bedrock (파운데이션 모델 API)', E: 'Amazon Rekognition (이미지·영상 분석)' },
  54: { A: 'Amazon Rekognition (이미지·영상 분석)', B: 'Amazon Bedrock 플레이그라운드', C: 'Amazon Bedrock Guardrails (안전장치)', D: 'Amazon Bedrock Agents (에이전트)' },
  55: { B: 'XGBoost (그래디언트 부스팅 알고리즘)', D: 'WaveNet (음성 생성 모델)' },
  68: { A: 'Amazon Textract (문서 텍스트·데이터 추출)', B: 'Amazon Personalize (개인화 추천)', C: 'Amazon Lex (챗봇·음성봇)', D: 'Amazon Transcribe (음성→텍스트 변환)' },
  74: { B: 'Amazon Q Developer (개발자용 AI 어시스턴트)' },
  79: { A: 'BLEU (기계 번역 품질 평가 지표)', B: '평균 제곱근 오차(RMSE)', C: 'ROUGE (요약 품질 평가 지표)' },
  85: { A: 'Amazon S3 (객체 스토리지)', B: 'Amazon EBS (블록 스토리지)', C: 'Amazon EFS (파일 스토리지)', D: 'AWS Snowcone (엣지 데이터 전송 장치)' },
  89: { D: '탈옥(Jailbreak)' },
  99: { A: 'Amazon Q Developer (개발자용 AI 어시스턴트)', B: 'AWS Config (리소스 구성 추적)', C: 'Amazon Personalize (개인화 추천)', D: 'Amazon Comprehend (자연어 처리)' },
  101: { A: 'Amazon SageMaker Clarify (편향 탐지·설명가능성)', B: 'Amazon SageMaker Data Wrangler (데이터 준비)', C: 'Amazon SageMaker Model Cards (모델 문서화)', D: 'AWS AI Service Cards (AI 서비스 책임 문서)' },
  102: { C: 'BERTScore (임베딩 기반 의미 유사도 지표)' },
  103: { C: 'ARIMA (시계열 예측 모델)' },
  104: { A: 'AWS KMS (암호화 키 관리 서비스)', B: 'Amazon Inspector (취약점 스캔)', C: 'Amazon Macie (S3 민감정보 탐지)', D: 'AWS Secrets Manager (비밀정보 관리)' },
  110: { A: 'Amazon Athena (S3 SQL 쿼리)', B: 'Amazon Aurora PostgreSQL (관리형 관계형 DB, 벡터 검색 지원)', C: 'Amazon Redshift (데이터 웨어하우스)', D: 'Amazon EMR (빅데이터 처리)' },
  122: { A: 'Amazon Personalize (개인화 추천)', B: 'Amazon SageMaker (ML 구축·학습·배포 플랫폼)', C: 'Amazon Athena (S3 SQL 쿼리)', D: 'Amazon Comprehend (자연어 처리)' },
  126: { A: 'AWS CloudTrail (API 호출 로깅·감사)', B: 'Amazon CloudWatch (지표·로그 모니터링)', C: 'AWS Audit Manager (감사 증거 수집)', D: 'Amazon S3 Intelligent-Tiering (자동 스토리지 계층화)', E: 'Amazon S3 Standard (표준 객체 스토리지)' },
  127: { A: 'Amazon Personalize (개인화 추천)', B: 'Amazon Kendra (엔터프라이즈 검색)', C: 'Amazon Rekognition (이미지·영상 분석)', D: 'Amazon Transcribe (음성→텍스트)' },
  129: { A: 'Amazon CloudWatch (지표·로그·알람 모니터링)', B: 'AWS CloudTrail (API 호출 로깅)', C: 'AWS Trusted Advisor (모범 사례 점검)', D: 'AWS Config (리소스 구성 추적)' },
  130: { A: '사고 사슬(Chain-of-thought) 프롬프팅', C: '퓨샷(Few-shot) 프롬프팅' },
  131: { A: 'Amazon Q Developer (개발자용 AI 어시스턴트)', B: 'Amazon Bedrock (여러 공급자 FM 통합 API)', C: 'Amazon Kendra (엔터프라이즈 검색)', D: 'Amazon Comprehend (자연어 처리)' },
  149: { A: 'AWS Audit Manager (감사 증거 수집·규정 준수 평가)', B: 'AWS Config (리소스 구성 추적)', C: 'Amazon Inspector (취약점 스캔)', D: 'Amazon CloudWatch (지표·로그 모니터링)', E: 'AWS CloudTrail (API 호출 로깅)' },
  151: { A: 'Amazon Rekognition 콘텐츠 검열(moderation)을 사용한다.', B: 'Amazon Comprehend 유해성 탐지(toxicity detection)를 사용한다.', C: 'Amazon SageMaker 내장 알고리즘으로 모델을 학습시킨다.', D: 'Amazon Polly를 사용해 댓글을 모니터링한다.' },
  152: { A: 'Amazon Rekognition (이미지·영상 분석)', B: 'Amazon SageMaker Clarify (편향 탐지·설명가능성)', C: 'Amazon Comprehend (자연어 처리)', D: 'Amazon SageMaker Model Monitor (모델 품질 드리프트 모니터링)' },
  153: { A: 'Amazon SageMaker Model Cards (모델 문서화·투명성)', B: 'Amazon Rekognition (이미지·영상 분석)', C: 'Amazon Comprehend (자연어 처리)', D: 'Amazon Lex (챗봇·음성봇)' },
  154: { A: 'Amazon Translate (기계 번역)', B: 'Amazon Transcribe (음성→텍스트)', C: 'Amazon Kendra (엔터프라이즈 검색)', D: 'Amazon Polly (텍스트→음성)' },
  156: { A: 'Amazon SageMaker Model Cards (모델 문서화)', B: 'Amazon SageMaker Debugger (학습 디버깅)', C: 'Amazon SageMaker Model Monitor (모델 품질 모니터링)', D: 'Amazon SageMaker JumpStart (사전학습 모델 배포)' },
  173: { A: 'GPU 기반 Amazon EC2 (직접 관리형 컴퓨팅)', B: '프로비저닝 처리량 방식의 Amazon Bedrock (용량 예약형)', C: '온디맨드 처리량 방식의 Amazon Bedrock (사용량 기반 과금)', D: 'Amazon SageMaker JumpStart (사전학습 모델 배포)' },
  179: { A: 'Amazon EC2 (가상 서버)', C: 'Amazon S3 + AWS Lambda (스토리지 + 서버리스 함수)' },
  189: { A: 'Amazon Q Developer (개발자용 AI 어시스턴트)', B: 'Amazon Polly (텍스트→음성)', C: 'Amazon Rekognition (이미지·영상 분석)', D: 'AWS HealthScribe (의료 음성→임상 기록 생성)' },
  196: { A: 'F1 점수(F1 score)', B: 'BLEU 점수 (기계 번역 품질 평가 지표)', C: '정확도(Accuracy)', D: '평균 제곱 오차(MSE)' },
  198: { A: 'Amazon Personalize로 응답을 생성한다.', B: 'Amazon SageMaker HyperPod 사전학습 작업을 생성한다.', C: 'Amazon SageMaker로 모델을 호스팅하고, LLM 배포에 TensorRT를 사용한다.', D: 'Amazon Bedrock 미세 조정(파인튜닝) 작업을 생성한다.' },
  199: { A: '데이터 누출(Data leakage)', B: '프롬프트 인젝션(Prompt injection)', C: '대규모 언어 모델(LLM) 환각(hallucination)', D: '개념 드리프트(Concept drift)' },
  214: { B: 'Top K (다음 토큰 후보 수 제한 값)' },
  220: { A: 'Amazon Comprehend (자연어 처리)', B: 'Amazon Polly (텍스트→음성)', C: 'Amazon Transcribe (음성→텍스트, 자막 생성)', D: 'Amazon Translate (기계 번역)' },
  225: { A: 'Amazon SageMaker Ground Truth (데이터 라벨링)', B: 'Amazon SageMaker Canvas (노코드 ML)', C: 'Amazon Bedrock 플레이그라운드', D: 'Amazon Bedrock Agents (에이전트)' },
  227: { A: '평균 제곱근 오차(RMSE)', B: '투자수익률(ROI)' },
  232: { B: 'BERTScore (임베딩 기반 의미 유사도 지표)', C: 'ROUGE (요약 품질 평가 지표)', D: 'BLEU 점수 (기계 번역 품질 평가 지표)' },
  236: { A: 'AWS Audit Manager (감사 증거 수집)', B: 'Amazon SageMaker Model Monitor (모델 품질 모니터링)', C: 'Amazon SageMaker Model Registry (모델 저장·버전 관리)', D: 'Amazon SageMaker Canvas (노코드 ML)' },
  248: { A: 'Amazon Personalize (개인화 추천)', B: 'Amazon Augmented AI(A2I) (사람 검토 워크플로우)', C: 'Amazon Inspector (취약점 스캔)', D: 'AWS Audit Manager (감사 증거 수집)' },
  249: { A: 'Amazon Rekognition (이미지·영상 분석)', B: 'Amazon Textract (문서 텍스트 추출)', C: 'Amazon Lex (챗봇·음성봇)', D: 'Amazon Q Business (사내 데이터 기반 AI 어시스턴트)' },
  250: { A: 'Amazon SageMaker Canvas (노코드 ML 구축·배포)', B: 'Amazon Rekognition (이미지·영상 분석)', C: 'AWS DeepRacer (강화학습 실습용 레이싱카)', D: 'Amazon Comprehend (자연어 처리)' },
  252: { A: 'AWS PrivateLink (VPC 내 프라이빗 연결)', B: 'Amazon Q (AI 어시스턴트)', C: 'Amazon CloudFront (콘텐츠 전송 네트워크, CDN)', D: 'AWS CloudTrail (API 호출 로깅)' },
  253: { A: 'Amazon Bedrock Guardrails (유해 콘텐츠 필터링 안전장치)', B: 'Amazon Bedrock Agents (에이전트)' },
  254: { A: 'Amazon Q Developer (개발자용 AI 어시스턴트)', B: 'Amazon SageMaker JumpStart (사전학습 모델 배포)', C: 'Amazon Bedrock PartyRock (무료 생성형 AI 실험 놀이터)', D: 'Amazon Q Business (사내 데이터 기반 AI 어시스턴트)' },
  258: { A: 'SageMaker Canvas (노코드 ML)', B: 'SageMaker Clarify (편향 탐지·설명가능성)', C: 'SageMaker Model Monitor (모델 품질 모니터링)', D: 'SageMaker Data Wrangler (데이터 준비)' },
  265: { A: 'Amazon SageMaker Data Wrangler (데이터 준비)', B: 'Amazon SageMaker Ground Truth Plus (완전관리형 데이터 라벨링)', C: 'Amazon Transcribe (음성→텍스트)', D: 'Amazon Macie (S3 민감정보 탐지)' },
  266: { A: 'Amazon Comprehend (자연어 처리)', B: 'Amazon Personalize (개인화 추천)', C: 'Amazon Polly (텍스트→음성)', D: 'Amazon OpenSearch Service (검색·벡터 데이터베이스)' },
  273: { C: 'ROUGE (요약 품질 평가 지표)' },
  276: { A: 'Amazon QuickSight (BI 시각화 대시보드)', B: 'Amazon Comprehend (자연어 처리)', C: 'AWS Trusted Advisor (모범 사례 점검)', D: 'Amazon SageMaker Clarify (편향 탐지·설명가능성)' },
  285: { A: 'Amazon Comprehend (자연어 처리)', B: 'Amazon Textract (문서 텍스트 추출)', C: 'Amazon Kendra (엔터프라이즈 검색)', D: 'Amazon Personalize (개인화 추천)' },
  290: { C: 'Amazon Route 53 (DNS 서비스)' },
  292: { A: 'Amazon CloudFront (콘텐츠 전송 네트워크, CDN)', D: 'Amazon Route 53 (DNS 서비스)' },
  293: { A: 'Amazon Route 53 (DNS 서비스)', B: 'Amazon CloudFront (콘텐츠 전송 네트워크, CDN)' },
  294: { B: 'AWS CloudFormation (코드형 인프라, IaC)' },
  295: { A: 'AWS CloudFormation (코드형 인프라, IaC)', B: 'AWS Elastic Beanstalk (PaaS 배포 서비스)' },
  301: { B: 'Amazon SageMaker Clarify (편향 탐지·설명가능성)', D: 'Amazon SageMaker JumpStart (사전학습 모델 배포)' },
  302: { A: 'Nova Lite (저비용 멀티모달 모델)', B: 'Nova Pro (고성능 멀티모달 모델)', C: 'Nova Canvas (이미지 생성 모델)', D: 'Nova Reel (동영상 생성 모델)' },
  324: { A: 'Amazon Comprehend (자연어 처리)', B: 'Amazon Personalize (개인화 추천)', C: 'Amazon Rekognition (이미지·영상 분석)', D: 'Amazon Bedrock (파운데이션 모델 API)' },
  325: { D: '검색 증강 생성(RAG)' },
  326: { D: '서포트 벡터 머신(SVM)' },
};

const data = JSON.parse(readFileSync(PATH, 'utf8'));
let filled = 0;
for (const q of data) {
  const map = KO[q.id];
  if (!map || !Array.isArray(q.choices)) continue;
  for (const c of q.choices) {
    if (map[c.key]) {
      c.koText = map[c.key];
      filled++;
    }
  }
}
writeFileSync(PATH, JSON.stringify(data, null, 2) + '\n');
console.log('filled choices:', filled);
