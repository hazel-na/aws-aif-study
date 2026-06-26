/**
 * 구조적 수정: 멀티선택 정답, 누락 선택지 재구성, 매칭/순서형 항목화.
 * 해설(explanation)도 여기서 보강하며 각 오답/항목별 근거를 포함한다.
 */
module.exports = {
  // ──────────────────────────────────────────────
  // 복수 정답 (Choose two) — answerType: 'multi'
  // ──────────────────────────────────────────────
  40: {
    answerType: 'multi',
    correctAnswers: ['B', 'C'],
    explanation:
`✅ 정답 B(위협 탐지), C(데이터 보호): 규제 프레임워크 준수를 "증명"하려면 보안 관점의 통제가 필요하다. Amazon GuardDuty 등으로 위협을 탐지(Threat detection)하고, 저장·전송 데이터 암호화(KMS)·접근통제(IAM)로 데이터를 보호(Data protection)하는 것은 거의 모든 컴플라이언스(GDPR, HIPAA, PCI-DSS 등)의 핵심 요구사항이다.
❌ A 오토스케일링 추론 엔드포인트: 가용성·성능을 위한 운영 기능일 뿐 규제 준수 증명과 직접 관련이 없다.
❌ D 비용 최적화: 재무/운영 효율 항목으로 컴플라이언스 통제가 아니다.
❌ E 느슨하게 결합된 마이크로서비스: 아키텍처 설계 패턴으로 규제 준수의 직접 근거가 되지 못한다.
💡 시험 포인트: "compliance/규제 준수"가 보이면 보안·프라이버시(암호화·접근통제·로깅·위협탐지) 항목을 고른다.`,
  },
  45: {
    answerType: 'multi',
    correctAnswers: ['B', 'D'],
    explanation:
`✅ 정답 B(Amazon Comprehend), D(Amazon Bedrock): 텍스트 리뷰의 감정(긍정/부정/중립)을 분석하는 문제다. Amazon Comprehend는 별도 학습 없이 감정 분석(Sentiment Analysis)·핵심구문·개체명을 추출하는 완전관리형 NLP 서비스다. Amazon Bedrock의 파운데이션 모델(LLM)도 프롬프트로 감정 분류를 수행할 수 있어 두 서비스 모두 요건을 충족한다.
❌ A Amazon Lex: 챗봇/대화형 인터페이스(의도·슬롯) 구축용으로 리뷰 감정 분석에 부적합.
❌ C Amazon Polly: 텍스트를 음성으로 변환(TTS)하는 서비스로 감정 분석과 무관.
❌ E Amazon Rekognition: 이미지/영상 분석 서비스로 텍스트 감정 분석과 무관.
💡 시험 포인트: "텍스트 감정/언어 분석 = Comprehend", "텍스트→음성 = Polly", "이미지/영상 = Rekognition".`,
  },
  149: {
    answerType: 'multi',
    correctAnswers: ['A', 'B'],
    explanation:
`✅ 정답 A(AWS Audit Manager), B(AWS Config): 개발 단계 전반을 지속 모니터링하며 회사 정책·산업 규제 준수를 보장해야 한다. AWS Config는 리소스 구성을 지속 평가해 정책 위반(비준수)을 감지하고, AWS Audit Manager는 증거를 자동 수집해 규제 프레임워크(예: PCI-DSS, GDPR) 대비 감사 보고서를 만든다 — 둘이 짝을 이뤄 컴플라이언스를 입증한다.
❌ C Amazon Inspector: EC2/컨테이너의 취약점 스캔 도구로 정책·규제 준수 모니터링 범위가 좁다.
❌ D Amazon CloudWatch: 지표·로그·알람 등 성능/운영 모니터링용으로 규정 준수 평가가 목적이 아니다.
❌ E AWS CloudTrail: API 호출 감사 로그를 남기지만 그 자체로 정책 위반을 평가·보고하진 않는다(증거 원천일 뿐).
💡 시험 포인트: "규정/정책 준수 지속 평가 = Config", "감사 증거 수집·보고 = Audit Manager".`,
  },
  165: {
    answerType: 'multi',
    correctAnswers: ['A', 'C'],
    explanation:
`✅ 정답 A(Hate/혐오), C(Violence/폭력): Amazon Bedrock Guardrails의 콘텐츠 필터(Content filters)가 차단하는 유해 카테고리는 Hate(혐오), Insults(모욕), Sexual(성적), Violence(폭력), Misconduct(부정행위), Prompt attacks(프롬프트 공격)이다. 보기 중 이에 해당하는 것은 Hate와 Violence다.
❌ B Politics(정치): 표준 콘텐츠 필터 카테고리가 아니다. 정치 주제를 막으려면 Denied topics(거부 주제)를 따로 설정해야 한다.
❌ D Gambling(도박): 기본 필터 카테고리가 아니며 Denied topics로 처리한다.
❌ E Religion(종교): 기본 필터 카테고리가 아니다.
💡 시험 포인트: Guardrails는 ①Content filters(고정 유해 카테고리) ②Denied topics(맞춤 금지 주제) ③Word filters(단어) ④Sensitive info(PII) ⑤Contextual grounding(환각 차단)로 구성된다.`,
  },
  167: {
    answerType: 'multi',
    correctAnswers: ['A', 'C'],
    explanation:
`✅ 정답 A(콘텐츠 임베딩 생성), C(검색 인덱스 생성): RAG에서 "지식 베이스 구축"에 해당하는 작업은 미리 일괄(batch)로 처리한다. 매일 추가되는 대량 문서를 임베딩으로 변환(A)하고 벡터 검색 인덱스를 구축·갱신(C)하는 일은 사용자 요청과 무관하게 사전 배치 처리하는 것이 효율적이다.
❌ B 사용자 쿼리 임베딩 생성: 사용자가 질문하는 순간 실시간으로 처리해야 하므로 배치가 아니다.
❌ D 관련 콘텐츠 검색(retrieval): 질의 시점에 실시간으로 수행한다.
❌ E 사용자 응답 생성(generation): LLM이 실시간으로 답을 만들어야 하므로 배치가 아니다.
💡 시험 포인트: RAG는 "인덱싱(사전·배치)"과 "질의/검색/생성(실시간)" 두 단계로 나뉜다. 사전에 만들 수 있는 것만 배치다.`,
  },
  226: {
    answerType: 'multi',
    correctAnswers: ['A', 'E'],
    explanation:
`✅ 정답 A(Fairness/공정성), E(Transparency/투명성): 채용·고용에 AI를 도입할 때 편향을 줄이고 공평한 결정을 보장하려면 핵심 책임 AI 차원인 공정성(보호속성에 따른 차별 방지)과 투명성(결정 근거를 설명·공개)이 필수다.
❌ B Tolerance(관용): AWS 책임 AI 핵심 차원에 포함되지 않는 용어다.
❌ C Flexibility(유연성): 책임 AI 차원이 아니다.
❌ D Open source(오픈소스): 라이선스/배포 방식일 뿐 책임 AI 차원이 아니다.
💡 시험 포인트: AWS 책임 AI 핵심 차원 = 공정성, 설명가능성, 견고성/안전성, 프라이버시·보안, 거버넌스, 투명성, 제어가능성.`,
  },
  242: {
    answerType: 'multi',
    correctAnswers: ['A', 'C'],
    isHotspot: false,
    choicesKo: {
      A: 'Amazon Transcribe와 Amazon Translate로 다른 언어 자막 생성',
      B: 'Amazon Textract와 Amazon Translate로 다른 언어 자막 생성',
      C: 'Amazon Polly로 다른 언어의 음성 더빙 생성',
      D: 'Amazon Translate로 음성 더빙 생성',
      E: 'Amazon Textract로 음성 더빙 생성',
    },
    explanation:
`✅ 정답 A, C: 영상에 다국어 자막 + 음성 더빙을 자동 추가하는 문제다.
• 자막(A): Amazon Transcribe로 영상의 음성을 텍스트로 변환(STT)한 뒤 Amazon Translate로 다른 언어로 번역하면 다국어 자막이 만들어진다.
• 더빙(C): 번역된 텍스트를 Amazon Polly(TTS)로 자연스러운 음성으로 합성하면 다국어 음성 더빙이 된다.
❌ B Textract+Translate: Textract는 스캔 문서/이미지에서 텍스트를 추출하는 OCR 서비스로, 영상 음성에서 자막을 만들 수 없다.
❌ D Translate로 더빙: Translate는 텍스트 번역만 하며 음성을 생성하지 못한다.
❌ E Textract로 더빙: Textract는 OCR이라 음성 생성과 무관하다.
💡 흐름 정리: 음성→텍스트(Transcribe) → 번역(Translate) → 텍스트→음성(Polly).`,
  },

  // ──────────────────────────────────────────────
  // 단답형인데 선택지가 통째로 누락된 문항 (286~300) — 선택지 재구성
  // ──────────────────────────────────────────────
  286: {
    choices: [
      { key: 'A', enText: 'Amazon S3', koText: 'Amazon S3 (객체 스토리지)' },
      { key: 'B', enText: 'Amazon EC2', koText: 'Amazon EC2 (가상 서버)' },
      { key: 'C', enText: 'Amazon RDS', koText: 'Amazon RDS (관계형 DB)' },
      { key: 'D', enText: 'AWS Lambda', koText: 'AWS Lambda (서버리스 함수)' },
    ],
    explanation:
`✅ 정답 A — Amazon S3: 언제든 원하는 양의 데이터를 저장·검색하는 무제한 확장형 객체 스토리지다. 99.999999999%(11 9s) 내구성을 제공하며 백업, 데이터 레이크, 정적 웹 호스팅, ML 학습 데이터 저장 등에 쓰인다.
❌ B EC2: 가상 서버(컴퓨팅)로 데이터 "저장 전용" 서비스가 아니다.
❌ C RDS: 정형 데이터를 다루는 관계형 데이터베이스로 "임의의 양/형식 데이터 저장"이라는 표현과 맞지 않는다.
❌ D Lambda: 코드를 실행하는 서버리스 컴퓨팅으로 스토리지가 아니다.`,
  },
  287: {
    choices: [
      { key: 'A', enText: 'AWS Lambda', koText: 'AWS Lambda (서버리스 컴퓨팅)' },
      { key: 'B', enText: 'Amazon EC2', koText: 'Amazon EC2 (가상 서버)' },
      { key: 'C', enText: 'Amazon ECS', koText: 'Amazon ECS (컨테이너 오케스트레이션)' },
      { key: 'D', enText: 'AWS Batch', koText: 'AWS Batch (배치 컴퓨팅)' },
    ],
    explanation:
`✅ 정답 A — AWS Lambda: 서버를 프로비저닝·관리하지 않고 이벤트 발생 시 코드를 실행하는 서버리스 컴퓨팅이다. 사용한 실행 시간만큼만 과금된다.
❌ B EC2: 사용자가 직접 서버(인스턴스)를 프로비저닝·관리해야 한다.
❌ C ECS: 컨테이너 오케스트레이션으로 (Fargate가 아닌 한) 인프라 관리가 필요하다.
❌ D AWS Batch: 대규모 배치 작업 스케줄링용으로 "서버리스 코드 실행"의 일반적 정답은 아니다.`,
  },
  288: {
    choices: [
      { key: 'A', enText: 'Amazon DynamoDB', koText: 'Amazon DynamoDB (관리형 NoSQL)' },
      { key: 'B', enText: 'Amazon RDS', koText: 'Amazon RDS (관계형 DB)' },
      { key: 'C', enText: 'Amazon Redshift', koText: 'Amazon Redshift (데이터 웨어하우스)' },
      { key: 'D', enText: 'Amazon Aurora', koText: 'Amazon Aurora (관계형 DB)' },
    ],
    explanation:
`✅ 정답 A — Amazon DynamoDB: 완전관리형 NoSQL 키-값/문서 데이터베이스로, 어떤 규모에서도 한 자릿수 밀리초 응답을 제공하고 서버리스로 자동 확장된다.
❌ B RDS: 관계형(SQL) 데이터베이스 관리 서비스다.
❌ C Redshift: 분석용 컬럼형 데이터 웨어하우스로 NoSQL이 아니다.
❌ D Aurora: MySQL/PostgreSQL 호환 관계형 데이터베이스다.`,
  },
  289: {
    choices: [
      { key: 'A', enText: 'Amazon CloudWatch', koText: 'Amazon CloudWatch (모니터링)' },
      { key: 'B', enText: 'AWS CloudTrail', koText: 'AWS CloudTrail (API 감사 로그)' },
      { key: 'C', enText: 'AWS Config', koText: 'AWS Config (구성 추적)' },
      { key: 'D', enText: 'AWS X-Ray', koText: 'AWS X-Ray (분산 추적)' },
    ],
    explanation:
`✅ 정답 A — Amazon CloudWatch: 애플리케이션·인프라의 지표(metric), 로그, 이벤트를 실시간 수집·시각화하고 알람을 설정하는 모니터링/관찰성 서비스다.
❌ B CloudTrail: "누가 어떤 API를 호출했는가"를 기록하는 거버넌스/감사 서비스로 실시간 성능 모니터링이 목적이 아니다.
❌ C Config: 리소스 구성 변경 추적·규정 준수 평가용이다.
❌ D X-Ray: 마이크로서비스 요청 경로를 추적·디버깅하는 도구로 범위가 좁다.`,
  },
  290: {
    choices: [
      { key: 'A', enText: 'Amazon VPC', koText: 'Amazon VPC (가상 네트워크)' },
      { key: 'B', enText: 'AWS Direct Connect', koText: 'AWS Direct Connect (전용 회선)' },
      { key: 'C', enText: 'Amazon Route 53', koText: 'Amazon Route 53 (DNS)' },
      { key: 'D', enText: 'AWS Transit Gateway', koText: 'AWS Transit Gateway (네트워크 허브)' },
    ],
    explanation:
`✅ 정답 A — Amazon VPC: 사용자가 정의한 가상 네트워크 안에서 AWS 리소스를 논리적으로 격리해 실행한다. 서브넷·라우팅·보안그룹으로 네트워크를 제어한다.
❌ B Direct Connect: 온프레미스와 AWS를 잇는 전용 물리 회선 서비스다.
❌ C Route 53: DNS/도메인 라우팅 서비스다.
❌ D Transit Gateway: 여러 VPC/온프레미스를 중앙에서 연결하는 허브로, 격리 환경 "생성" 자체와는 다르다.`,
  },
  291: {
    choices: [
      { key: 'A', enText: 'Amazon EC2', koText: 'Amazon EC2 (가상 서버)' },
      { key: 'B', enText: 'AWS Lambda', koText: 'AWS Lambda (서버리스)' },
      { key: 'C', enText: 'Amazon Lightsail', koText: 'Amazon Lightsail (간편 VPS)' },
      { key: 'D', enText: 'Amazon ECS', koText: 'Amazon ECS (컨테이너)' },
    ],
    explanation:
`✅ 정답 A — Amazon EC2: 클라우드에서 가상 서버(인스턴스)를 시작·중지·확장·관리하는 핵심 컴퓨팅 서비스다.
❌ B Lambda: 서버를 직접 관리하지 않는 서버리스 컴퓨팅이다.
❌ C Lightsail: 간소화된 VPS로 EC2의 정식 "가상 서버 관리"보다 단순화·패키지화된 서비스다.
❌ D ECS: 컨테이너 오케스트레이션으로 가상 서버 자체 관리가 목적이 아니다.`,
  },
  292: {
    choices: [
      { key: 'A', enText: 'Amazon CloudFront', koText: 'Amazon CloudFront (CDN)' },
      { key: 'B', enText: 'Amazon S3', koText: 'Amazon S3 (스토리지)' },
      { key: 'C', enText: 'AWS Global Accelerator', koText: 'AWS Global Accelerator (네트워크 가속)' },
      { key: 'D', enText: 'Amazon Route 53', koText: 'Amazon Route 53 (DNS)' },
    ],
    explanation:
`✅ 정답 A — Amazon CloudFront: 전 세계 엣지 로케이션에 콘텐츠를 캐싱해 사용자에게 낮은 지연시간으로 전송하는 CDN(콘텐츠 전송 네트워크)이다.
❌ B S3: 원본(origin) 스토리지로, 전송 가속/캐싱은 CloudFront가 담당한다.
❌ C Global Accelerator: TCP/UDP 트래픽을 AWS 백본으로 가속하지만 "콘텐츠(정적/동적) 캐싱·배포"의 대표 답은 CloudFront다.
❌ D Route 53: DNS 라우팅 서비스다.`,
  },
  293: {
    choices: [
      { key: 'A', enText: 'Amazon Route 53', koText: 'Amazon Route 53 (DNS)' },
      { key: 'B', enText: 'Amazon CloudFront', koText: 'Amazon CloudFront (CDN)' },
      { key: 'C', enText: 'Amazon VPC', koText: 'Amazon VPC (가상 네트워크)' },
      { key: 'D', enText: 'AWS Direct Connect', koText: 'AWS Direct Connect (전용 회선)' },
    ],
    explanation:
`✅ 정답 A — Amazon Route 53: 확장성 높은 클라우드 DNS(도메인 이름 시스템) 웹 서비스로, 도메인 등록·라우팅·상태 확인을 제공한다.
❌ B CloudFront: 콘텐츠 전송(CDN) 서비스다.
❌ C VPC: 격리된 가상 네트워크 환경이다.
❌ D Direct Connect: 온프레미스-AWS 전용 회선이다.`,
  },
  294: {
    choices: [
      { key: 'A', enText: 'AWS Elastic Beanstalk', koText: 'AWS Elastic Beanstalk (PaaS 배포)' },
      { key: 'B', enText: 'AWS CloudFormation', koText: 'AWS CloudFormation (IaC)' },
      { key: 'C', enText: 'Amazon EC2', koText: 'Amazon EC2 (가상 서버)' },
      { key: 'D', enText: 'AWS Lambda', koText: 'AWS Lambda (서버리스)' },
    ],
    explanation:
`✅ 정답 A — AWS Elastic Beanstalk: 코드를 올리면 용량 프로비저닝·로드밸런싱·오토스케일링·배포를 자동 처리해 웹 애플리케이션을 쉽게 배포·확장하는 PaaS다.
❌ B CloudFormation: 인프라를 코드로 정의·프로비저닝(IaC)하는 도구로, 앱 배포 자동화의 "쉬운" 옵션은 Beanstalk다.
❌ C EC2: 서버를 직접 구성·관리해야 한다.
❌ D Lambda: 이벤트 기반 함수 실행으로 전형적 웹앱 배포·확장 플랫폼과는 용도가 다르다.`,
  },
  295: {
    choices: [
      { key: 'A', enText: 'AWS CloudFormation', koText: 'AWS CloudFormation (IaC)' },
      { key: 'B', enText: 'AWS Elastic Beanstalk', koText: 'AWS Elastic Beanstalk (PaaS)' },
      { key: 'C', enText: 'AWS OpsWorks', koText: 'AWS OpsWorks (구성 관리)' },
      { key: 'D', enText: 'AWS Systems Manager', koText: 'AWS Systems Manager (운영 관리)' },
    ],
    explanation:
`✅ 정답 A — AWS CloudFormation: 템플릿(코드)으로 인프라를 선언적으로 정의·프로비저닝하는 IaC(Infrastructure as Code) 서비스다. 반복 가능하고 버전 관리되는 인프라 배포가 가능하다.
❌ B Elastic Beanstalk: 앱 배포 PaaS로 인프라 "코드화"가 핵심 목적은 아니다.
❌ C OpsWorks: Chef/Puppet 기반 구성 관리 서비스로 범용 IaC의 표준 답은 아니다.
❌ D Systems Manager: 운영 작업(패치·파라미터·세션) 관리 도구다.`,
  },
  296: {
    choices: [
      { key: 'A', enText: 'AWS Auto Scaling', koText: 'AWS Auto Scaling (자동 확장)' },
      { key: 'B', enText: 'Elastic Load Balancing', koText: 'Elastic Load Balancing (부하 분산)' },
      { key: 'C', enText: 'Amazon CloudWatch', koText: 'Amazon CloudWatch (모니터링)' },
      { key: 'D', enText: 'AWS Lambda', koText: 'AWS Lambda (서버리스)' },
    ],
    explanation:
`✅ 정답 A — AWS Auto Scaling: 수요 변화에 따라 용량(EC2 인스턴스 수 등)을 자동으로 늘리거나 줄여 안정적이고 예측 가능한 성능을 비용 효율적으로 유지한다.
❌ B ELB: 들어온 트래픽을 여러 대상에 "분산"하지만 용량 자체를 늘리고 줄이지는 않는다(Auto Scaling과 함께 쓰임).
❌ C CloudWatch: 지표를 모니터링하고 알람을 트리거하지만 확장 동작 자체는 Auto Scaling이 수행한다.
❌ D Lambda: 서버리스 함수로 요청에 따라 자동 확장되긴 하나, 문제의 "용량 자동 조절" 일반 답은 Auto Scaling이다.`,
  },
  297: {
    choices: [
      { key: 'A', enText: 'Amazon ECS', koText: 'Amazon ECS (컨테이너 오케스트레이션)' },
      { key: 'B', enText: 'Amazon EKS', koText: 'Amazon EKS (관리형 Kubernetes)' },
      { key: 'C', enText: 'AWS Fargate', koText: 'AWS Fargate (서버리스 컨테이너)' },
      { key: 'D', enText: 'Amazon EC2', koText: 'Amazon EC2 (가상 서버)' },
    ],
    explanation:
`✅ 정답 A — Amazon ECS: AWS의 완전관리형 컨테이너 오케스트레이션 서비스로, 컨테이너를 격리된 환경(태스크/서비스)에서 실행·확장·관리한다.
❌ B EKS: 동일하게 컨테이너를 다루지만 "관리형 Kubernetes"라는 별도 문항의 정답이다.
❌ C Fargate: 컨테이너용 서버리스 컴퓨팅 엔진(ECS/EKS의 실행 모드)이다.
❌ D EC2: 가상 서버로 컨테이너 오케스트레이션 자체를 제공하지 않는다.`,
  },
  298: {
    choices: [
      { key: 'A', enText: 'Amazon EKS', koText: 'Amazon EKS (관리형 Kubernetes)' },
      { key: 'B', enText: 'Amazon ECS', koText: 'Amazon ECS (AWS 자체 오케스트레이션)' },
      { key: 'C', enText: 'AWS Fargate', koText: 'AWS Fargate (서버리스 컨테이너)' },
      { key: 'D', enText: 'Amazon EC2', koText: 'Amazon EC2 (가상 서버)' },
    ],
    explanation:
`✅ 정답 A — Amazon EKS: AWS가 관리하는 Kubernetes 서비스(Elastic Kubernetes Service)로, 표준 Kubernetes 클러스터를 손쉽게 운영한다.
❌ B ECS: Kubernetes가 아닌 AWS 자체 컨테이너 오케스트레이션이다.
❌ C Fargate: 컨테이너를 서버리스로 실행하는 엔진으로 Kubernetes 자체는 아니다.
❌ D EC2: 가상 서버다.`,
  },
  299: {
    choices: [
      { key: 'A', enText: 'AWS Fargate', koText: 'AWS Fargate (서버리스 컨테이너)' },
      { key: 'B', enText: 'Amazon EKS', koText: 'Amazon EKS (관리형 Kubernetes)' },
      { key: 'C', enText: 'Amazon ECS', koText: 'Amazon ECS (컨테이너 오케스트레이션)' },
      { key: 'D', enText: 'AWS Lambda', koText: 'AWS Lambda (서버리스 함수)' },
    ],
    explanation:
`✅ 정답 A — AWS Fargate: 서버(인스턴스)를 프로비저닝·관리하지 않고 컨테이너를 실행하는 서버리스 컴퓨팅 엔진이다. ECS·EKS와 함께 동작한다.
❌ B EKS / ❌ C ECS: 오케스트레이션 서비스이며, 서버 관리 없이 컨테이너를 돌리려면 이들의 실행 모드로 Fargate를 쓴다.
❌ D Lambda: 컨테이너가 아니라 함수 단위 서버리스 실행이다(컨테이너 이미지도 지원하나 "서버리스 컨테이너"의 정답은 Fargate).`,
  },
  300: {
    choices: [
      { key: 'A', enText: 'AWS IAM', koText: 'AWS IAM (자격 증명·권한 관리)' },
      { key: 'B', enText: 'Amazon Cognito', koText: 'Amazon Cognito (앱 사용자 인증)' },
      { key: 'C', enText: 'AWS Organizations', koText: 'AWS Organizations (다중 계정 관리)' },
      { key: 'D', enText: 'AWS KMS', koText: 'AWS KMS (암호화 키 관리)' },
    ],
    explanation:
`✅ 정답 A — AWS IAM: 사용자·역할·정책으로 AWS 리소스에 대한 접근 권한을 세밀하게 관리(인증·인가)하는 핵심 보안 서비스다.
❌ B Cognito: 웹/모바일 "앱 최종 사용자"의 가입·로그인(인증)을 다루며 AWS 리소스 권한 관리와는 범위가 다르다.
❌ C Organizations: 여러 AWS 계정을 묶어 정책(SCP)·청구를 관리한다.
❌ D KMS: 데이터 암호화 키 생성·관리 서비스로 사용자 권한 관리가 아니다.`,
  },

  // ──────────────────────────────────────────────
  // 순서 배열형 (ordering)
  // ──────────────────────────────────────────────
  114: {
    answerType: 'ordering',
    hotspotItems: [
      { prompt: 'Define the business goal / frame the ML problem', promptKo: '비즈니스 목표 정의 및 ML 문제 정의(프레이밍)' },
      { prompt: 'Collect and prepare (and label) the data', promptKo: '데이터 수집·전처리·라벨링' },
      { prompt: 'Train and tune the model', promptKo: '모델 학습 및 하이퍼파라미터 튜닝' },
      { prompt: 'Evaluate the model against business metrics', promptKo: '모델 평가(비즈니스 지표 대비 검증)' },
      { prompt: 'Deploy the model to production', promptKo: '모델 프로덕션 배포' },
      { prompt: 'Monitor and maintain the model', promptKo: '모델 모니터링 및 유지보수' },
    ],
    explanation:
`✅ 잘 설계된(Well-Architected) ML 워크로드의 표준 순서:
1) 비즈니스 목표 정의·ML 문제 프레이밍 — 무엇을 풀지 먼저 정한다.
2) 데이터 수집·전처리·라벨링 — 품질 좋은 데이터가 성능을 좌우한다.
3) 모델 학습·튜닝 — 알고리즘 선택과 하이퍼파라미터 최적화.
4) 모델 평가 — 정확도뿐 아니라 비즈니스 지표·공정성까지 검증.
5) 배포 — 실시간/배치 엔드포인트로 프로덕션 투입.
6) 모니터링·유지보수 — 데이터/모델 드리프트 감지 후 재학습.
💡 핵심: 데이터 준비를 학습보다 먼저, 평가를 배포보다 먼저 두는 것이 함정 보기와의 차이다. 전체는 반복(iterative) 사이클이다.`,
  },
  309: {
    answerType: 'ordering',
    hotspotItems: [
      { prompt: 'Identify the business problem and goal', promptKo: '비즈니스 문제·목표 식별' },
      { prompt: 'Collect, prepare, and process the data', promptKo: '데이터 수집·전처리·처리' },
      { prompt: 'Train (develop) the model', promptKo: '모델 학습(개발)' },
      { prompt: 'Evaluate the model', promptKo: '모델 평가' },
      { prompt: 'Deploy the model to production', promptKo: '프로덕션 배포' },
      { prompt: 'Monitor the model in production', promptKo: '프로덕션 모니터링' },
    ],
    explanation:
`✅ 새 맞춤 모델의 ML 수명주기 순서:
1) 비즈니스 문제·목표 식별 → 2) 데이터 수집·전처리 → 3) 모델 학습 → 4) 모델 평가 → 5) 배포 → 6) 모니터링.
💡 자주 틀리는 지점: ①평가는 반드시 배포 "전"에 온다. ②모니터링은 마지막이며, 드리프트가 발견되면 데이터 준비/학습 단계로 되돌아가는 반복 루프다. 데이터 준비가 학습 앞에 오지 않으면 오답.`,
  },
  313: {
    answerType: 'ordering',
    hotspotItems: [
      { prompt: 'Ingest the digital product guides (text + images)', promptKo: '디지털 제품 가이드(텍스트·이미지) 수집/업로드' },
      { prompt: 'Preprocess: extract text and images from the guides', promptKo: '전처리 — 가이드에서 텍스트·이미지 추출' },
      { prompt: 'Use a generative AI (foundation) model to summarize/structure the content', promptKo: '생성형 AI(FM)로 콘텐츠 요약·구조화' },
      { prompt: 'Store the generated structured data in the product database', promptKo: '생성된 정형 데이터를 제품 데이터베이스에 저장' },
    ],
    explanation:
`✅ 생성형 AI로 제품 DB 갱신을 자동화하는 순서:
1) 제품 가이드(텍스트·이미지) 수집 → 2) 전처리로 텍스트·이미지 추출 → 3) 생성형 AI 모델로 핵심 내용 요약·구조화 → 4) 결과를 제품 데이터베이스에 저장.
💡 핵심: 비정형 데이터(문서/이미지)를 먼저 "추출·전처리"한 뒤에야 모델이 처리할 수 있고, 모델 출력은 마지막에 DB에 적재한다. 추출 전에 모델을 호출하는 순서는 오답이다.`,
  },
  328: {
    answerType: 'ordering',
    hotspotOptions: ['Prompt engineering', 'RAG', 'Fine-tuning', 'Full model training (pre-training)'],
    hotspotItems: [
      { prompt: 'Prompt engineering — adjust prompts only', promptKo: '프롬프트 엔지니어링 — 프롬프트만 조정 (노력 최소)' },
      { prompt: 'Retrieval Augmented Generation (RAG)', promptKo: 'RAG — 외부 지식 검색 결합' },
      { prompt: 'Fine-tuning on labeled data', promptKo: '파인튜닝 — 라벨 데이터로 미세조정' },
      { prompt: 'Full model training / pre-training from scratch', promptKo: '전체 모델 학습(사전학습) — 노력·비용 최대' },
    ],
    explanation:
`✅ 개발 노력 최소 → 최대 순서: 프롬프트 엔지니어링 < RAG < 파인튜닝 < 전체 모델 학습.
• 프롬프트 엔지니어링: 모델·데이터 변경 없이 입력만 조정 — 가장 빠르고 저렴.
• RAG: 벡터 DB로 외부 지식을 검색해 주입 — 모델 가중치는 그대로, 중간 노력.
• 파인튜닝: 라벨 데이터로 가중치 일부 갱신 — 데이터·컴퓨팅 필요.
• 전체 모델 학습: 대규모 데이터로 처음부터 사전학습 — 시간·비용·전문성 최대.
💡 시험 포인트: "최소 노력으로 맞춤화" = 프롬프트 엔지니어링/RAG, "도메인 지식 깊은 반영" = 파인튜닝/사전학습.`,
  },

  // ──────────────────────────────────────────────
  // 매칭형 (matching)
  // ──────────────────────────────────────────────
  125: {
    answerType: 'matching',
    hotspotOptions: ['Real-time inference', 'Batch inference', 'Asynchronous inference'],
    hotspotItems: [
      { prompt: 'A team needs immediate, interactive responses with low latency', promptKo: '즉각적·대화형 저지연 응답이 필요한 팀', answer: 'Real-time inference (실시간 추론)' },
      { prompt: 'A team processes a large dataset on a schedule (e.g., weekends)', promptKo: '정기적으로 대용량 데이터를 일괄 처리하는 팀', answer: 'Batch inference (배치 추론)' },
      { prompt: 'A team sends large payloads and can tolerate some delay', promptKo: '큰 입력을 보내며 약간의 지연을 허용하는 팀', answer: 'Asynchronous inference (비동기 추론)' },
    ],
    explanation:
`✅ 사용 사례별 추론 모드 매칭:
• 저지연 대화형 응답 → Real-time inference: 항상 떠 있는 엔드포인트로 즉시 응답.
• 정기 대량 일괄 처리 → Batch inference(Batch transform): 데이터 묶음을 한 번에 처리, 비용 효율적.
• 큰 페이로드·지연 허용 → Asynchronous inference: 요청을 큐에 넣어 비동기로 처리, 대용량/장시간 작업에 적합.
💡 판단 기준: "즉시 응답?=실시간", "정기·대량?=배치", "큰 입력·지연 OK?=비동기".`,
  },
  135: {
    answerType: 'matching',
    hotspotOptions: ['Real-time inference', 'Batch transform'],
    hotspotItems: [
      { prompt: 'Chatbot needs minimal-latency predictions to understand user intent', promptKo: '챗봇이 최소 지연으로 사용자 의도 예측 필요', answer: 'Real-time inference (실시간 추론)' },
      { prompt: 'Weekend job processes gigabytes of text files via the LLM', promptKo: '주말에 수 GB 텍스트 파일을 LLM으로 처리', answer: 'Batch transform (배치 변환)' },
      { prompt: 'API processes small text snippets with low-latency predictions', promptKo: '작은 텍스트를 저지연으로 예측하는 API', answer: 'Real-time inference (실시간 추론)' },
    ],
    explanation:
`✅ 매칭 결과:
• 챗봇(저지연 대화) → Real-time inference.
• 주말 수 GB 일괄 처리 → Batch transform: 지연이 길어도 되는 대량 작업.
• 저지연 API → Real-time inference.
💡 핵심: 응답이 즉시 필요하면 Real-time, 대량을 모아 한 번에 처리하면 Batch. 같은 보기가 여러 번 선택될 수 있다.`,
  },
  143: {
    answerType: 'matching',
    hotspotOptions: ['Zero-shot learning', 'Few-shot learning', 'Chain-of-thought reasoning'],
    hotspotItems: [
      { prompt: '"Classify the following text as sports/politics/entertainment: [text]" (no examples)', promptKo: '예시 없이 분류 지시만 제공', answer: 'Zero-shot learning (제로샷)' },
      { prompt: '"[image1],[image2],[image3] are examples of [class]. Classify this image."', promptKo: '몇 개의 예시를 보여준 뒤 분류 요청', answer: 'Few-shot learning (퓨샷)' },
      { prompt: '"[Question][Instructions] Think step by step and walk me through your thinking."', promptKo: '단계별로 사고 과정을 설명하도록 유도', answer: 'Chain-of-thought reasoning (사고연쇄)' },
    ],
    explanation:
`✅ 프롬프트 기법 매칭:
• 예시 없이 지시만 → Zero-shot: 모델의 사전지식만으로 수행.
• 예시 몇 개 제공 후 요청 → Few-shot: 예시로 패턴을 알려줌(In-context learning).
• "단계별로 생각" 유도 → Chain-of-thought: 추론 과정을 단계화해 복잡한 문제 정확도를 높임.
💡 구분 키워드: "예시 0개=Zero-shot", "예시 몇 개=Few-shot", "step by step/추론=CoT".`,
  },
  144: {
    answerType: 'matching',
    hotspotOptions: ['Content filters', 'Denied topics', 'Word filters', 'Contextual grounding check'],
    hotspotItems: [
      { prompt: 'Block harmful content (hate, insults, violence, misconduct)', promptKo: '혐오·모욕·폭력·부정행위 등 유해 콘텐츠 차단', answer: 'Content filters (콘텐츠 필터)' },
      { prompt: 'Avoid topics like illegal investment or legal advice', promptKo: '불법 투자·법률 자문 등 특정 주제 회피', answer: 'Denied topics (거부 주제)' },
      { prompt: 'Detect and block specific offensive terms', promptKo: '특정 공격적 단어 탐지·차단', answer: 'Word filters (단어 필터)' },
      { prompt: 'Filter responses not grounded in the provided source', promptKo: '제공 출처에 근거하지 않은(환각) 응답 차단', answer: 'Contextual grounding check (맥락 근거 확인)' },
    ],
    explanation:
`✅ Amazon Bedrock Guardrails 필터 정책 매칭:
• 유해 카테고리 차단 → Content filters(혐오·모욕·성적·폭력·부정행위 강도 설정).
• 특정 주제 금지 → Denied topics(예: 투자·법률 조언).
• 특정 단어 차단 → Word filters(욕설/금칙어 목록·프로파니티 필터).
• 출처 미근거(환각) 차단 → Contextual grounding check(소스·관련성 점수로 필터).
💡 4종 정책의 목적이 각기 다르다는 점이 핵심. 추가로 Sensitive information filters(PII 마스킹)도 있다.`,
  },
  155: {
    answerType: 'matching',
    hotspotOptions: ['Model fine-tuning', 'Data augmentation', 'Continued pre-training'],
    hotspotItems: [
      { prompt: 'The model must be taught a new domain-specific task (labeled examples)', promptKo: '새로운 도메인 특화 작업을 가르쳐야 함(라벨 예시 보유)', answer: 'Model fine-tuning (파인튜닝)' },
      { prompt: 'Limited labeled data is available and more data is needed', promptKo: '라벨 데이터가 제한적이라 더 많은 데이터가 필요', answer: 'Data augmentation (데이터 증강)' },
      { prompt: 'Only unlabeled data is available', promptKo: '라벨 없는 데이터만 사용 가능', answer: 'Continued pre-training (지속 사전학습)' },
    ],
    explanation:
`✅ 커스터마이징 방법 매칭:
• 라벨 예시로 특정 작업 학습 → Model fine-tuning(지도학습 기반 미세조정).
• 라벨 데이터 부족 → Data augmentation(기존 데이터를 변형·합성해 양을 늘림).
• 라벨 없는 데이터만 → Continued pre-training(비지도/자기지도로 도메인 지식 추가 학습).
💡 핵심: 라벨 "있음"=파인튜닝, 라벨 "부족"=증강, 라벨 "없음(대량 도메인 텍스트)"=지속 사전학습.`,
  },
  185: {
    answerType: 'matching',
    hotspotOptions: ['Fine-tuning', 'Continued pre-training'],
    hotspotItems: [
      { prompt: 'Improve performance on a specific task using labeled prompt-response examples', promptKo: '라벨된 프롬프트-응답 예시로 특정 작업 성능 향상', answer: 'Fine-tuning (파인튜닝)' },
      { prompt: 'Adapt the model to a domain using large amounts of unlabeled domain text', promptKo: '대량의 비라벨 도메인 텍스트로 도메인 적응', answer: 'Continued pre-training (지속 사전학습)' },
    ],
    explanation:
`✅ Amazon Bedrock 모델 커스터마이징 매칭:
• 라벨된 예시로 특정 작업 개선 → Fine-tuning: 적은 양의 라벨 데이터로 출력 형식·정확도를 맞춤.
• 대량 비라벨 도메인 텍스트로 도메인 지식 강화 → Continued pre-training: 라벨 없이 도메인 코퍼스로 추가 사전학습.
💡 Bedrock은 이 두 가지 커스터마이징을 지원한다. "라벨 유무"가 선택 기준이며, 두 방법은 같은 요구에 한 번 이상 선택될 수 있다.`,
  },
  188: {
    answerType: 'matching',
    hotspotOptions: ['Governance', 'Privacy and security', 'Safety', 'Transparency'],
    hotspotItems: [
      { prompt: 'Anonymize/remove PII during data preparation', promptKo: '데이터 준비 시 개인정보(PII) 익명화·제거', answer: 'Privacy and security (개인정보·보안)' },
      { prompt: 'Provide explanations for the chatbot’s decisions to users', promptKo: '챗봇 결정에 대한 설명을 사용자에게 제공', answer: 'Transparency (투명성)' },
      { prompt: 'Use Bedrock Guardrails to block harmful/toxic output', promptKo: 'Bedrock Guardrails로 유해 출력 차단', answer: 'Safety (안전성)' },
    ],
    explanation:
`✅ 설계 활동별 책임 AI 특성 매칭:
• PII 익명화 → Privacy and security: 개인정보 보호.
• 결정 근거 설명 제공 → Transparency: 동작·근거를 이해 가능하게 공개.
• Guardrails로 유해 출력 차단 → Safety: 위해·부적절 출력 방지.
• Governance(거버넌스)는 이 세 활동에 직접 대응하지 않아 선택되지 않는다(한 번도 안 쓰일 수 있음).
💡 책임 AI 차원별 "대표 행동"을 연결하는 문제. 각 특성의 정의를 구분하는 것이 핵심.`,
  },
  191: {
    answerType: 'matching',
    hotspotOptions: ['SageMaker Canvas', 'SageMaker Feature Store', 'SageMaker Ground Truth', 'SageMaker JumpStart', 'SageMaker Model Monitor'],
    hotspotItems: [
      { prompt: 'Prepare data through a visual interface without writing code', promptKo: '코드 없이 시각적 인터페이스로 데이터 준비', answer: 'SageMaker Canvas' },
      { prompt: 'Find and use a prebuilt solution for fraud detection', promptKo: '사기 탐지용 사전 구축 솔루션 검색·사용', answer: 'SageMaker JumpStart' },
      { prompt: 'Create labeled datasets with human intervention', promptKo: '사람이 개입해 라벨링된 데이터셋 생성', answer: 'SageMaker Ground Truth' },
    ],
    explanation:
`✅ SageMaker 기능 매칭:
• 노코드 시각적 데이터 준비/예측 → SageMaker Canvas.
• 사전 구축 솔루션·모델 카탈로그(사기 탐지 등) → SageMaker JumpStart.
• 사람이 개입하는 데이터 라벨링 → SageMaker Ground Truth.
• Feature Store(피처 저장·재사용), Model Monitor(드리프트 모니터링)는 이 사용 사례와 맞지 않아 선택되지 않는다.
💡 각 SageMaker 기능의 1줄 정의를 외워두면 매칭형이 쉬워진다.`,
  },
  229: {
    answerType: 'matching',
    englishQuestion:
'A company is developing AI models with Amazon SageMaker. Select the correct SageMaker feature or resource for each stage of the AI model lifecycle workflow. Each SageMaker feature or resource should be selected one time or not at all.',
    hotspotOptions: ['SageMaker Model Registry', 'SageMaker Serverless Inference', 'SageMaker Ground Truth', 'SageMaker Clarify', 'SageMaker Model Monitor'],
    hotspotItems: [
      { prompt: 'Managing different versions of the model', promptKo: '모델의 여러 버전 관리', answer: 'SageMaker Model Registry' },
      { prompt: 'Using the current model to make predictions without managing servers', promptKo: '서버 관리 없이 현재 모델로 추론 수행', answer: 'SageMaker Serverless Inference' },
    ],
    explanation:
`✅ AI 모델 수명주기 단계별 SageMaker 매칭:
• 모델 버전 관리 → SageMaker Model Registry: 모델 등록·버전·승인 상태·배포 추적의 중앙 카탈로그.
• 서버 없이 추론 → SageMaker Serverless Inference: 트래픽에 따라 자동 확장/축소되며 인프라 관리가 필요 없는 추론 옵션.
💡 참고로 Ground Truth(라벨링), Clarify(편향·설명가능성), Model Monitor(운영 중 드리프트 감지)는 각각 다른 수명주기 단계의 기능이다.`,
  },
  235: {
    answerType: 'matching',
    hotspotOptions: ['Text-to-image model (diffusion)', 'Large language model (LLM)'],
    hotspotItems: [
      { prompt: 'Generate sample product images for the advertisement', promptKo: '광고용 예시 이미지 생성', answer: 'Text-to-image model (텍스트→이미지, 예: Stable Diffusion/Titan Image)' },
      { prompt: 'Write catchy slogans/marketing copy', promptKo: '슬로건·마케팅 문구 작성', answer: 'Large language model (LLM)' },
    ],
    explanation:
`✅ 작업별 생성형 모델 유형 매칭:
• 예시 이미지 생성 → Text-to-image(확산) 모델: 텍스트 설명으로 이미지를 합성(Amazon Titan Image Generator, Stable Diffusion 등).
• 슬로건/문구 작성 → LLM: 자연어 텍스트 생성에 특화.
💡 핵심: "출력이 이미지면 Text-to-image, 출력이 텍스트면 LLM". 멀티모달 모델은 둘 다 가능하지만 작업 목적에 맞는 유형을 고른다.`,
  },
  245: {
    answerType: 'matching',
    hotspotOptions: ['Fairness', 'Explainability', 'Privacy and security', 'Governance/Accountability'],
    hotspotItems: [
      { prompt: 'Ensure the model does not discriminate by protected attributes (race, gender)', promptKo: '인종·성별 등 보호속성에 따른 차별이 없도록 보장', answer: 'Fairness (공정성)' },
      { prompt: 'Give applicants the reasons why a loan was denied', promptKo: '대출 거절 사유를 신청자에게 설명', answer: 'Explainability (설명가능성)' },
      { prompt: 'Protect applicants’ personal and financial data', promptKo: '신청자의 개인·금융 데이터 보호', answer: 'Privacy and security (프라이버시·보안)' },
      { prompt: 'Keep audit logs and assign ownership for decisions', promptKo: '의사결정 감사 로그 유지·책임 소재 지정', answer: 'Governance/Accountability (거버넌스·책임성)' },
    ],
    explanation:
`✅ 대출 심사 AI의 책임 AI 원칙 매칭:
• 차별 방지 → Fairness(공정성).
• 거절 사유 설명 → Explainability(설명가능성/투명성).
• 개인·금융정보 보호 → Privacy and security.
• 감사 로그·책임 소재 → Governance/Accountability.
💡 대출 승인/거절은 "고위험(high-risk)" AI 의사결정 영역으로, 공정성·설명가능성·책임성이 특히 강조된다(EU AI Act 등 규제 대상).`,
  },
  257: {
    answerType: 'matching',
    englishQuestion:
'Select the correct AWS AI service for each use case. Select each AWS service one time or not at all. Use cases: convert speech to text; extract text from scanned documents; detect sentiment and entities in text; convert text into lifelike speech.',
    koreanQuestion:
'각 사용 사례에 맞는 AWS AI 서비스를 선택하세요. 각 서비스는 한 번만 선택하거나 선택하지 않을 수 있습니다. (음성→텍스트, 스캔 문서에서 텍스트 추출, 텍스트의 감정·개체 분석, 텍스트→자연스러운 음성)',
    hotspotOptions: ['Amazon Transcribe', 'Amazon Textract', 'Amazon Comprehend', 'Amazon Polly', 'Amazon Translate'],
    hotspotItems: [
      { prompt: 'Convert spoken audio into written text', promptKo: '음성(오디오)을 텍스트로 변환', answer: 'Amazon Transcribe' },
      { prompt: 'Extract text and data from scanned documents/forms', promptKo: '스캔 문서·양식에서 텍스트·데이터 추출', answer: 'Amazon Textract' },
      { prompt: 'Detect sentiment, entities, key phrases in text', promptKo: '텍스트의 감정·개체·핵심구문 분석', answer: 'Amazon Comprehend' },
      { prompt: 'Convert text into lifelike speech', promptKo: '텍스트를 자연스러운 음성으로 변환', answer: 'Amazon Polly' },
    ],
    explanation:
`✅ AWS AI 서비스 매칭:
• 음성→텍스트 → Amazon Transcribe(STT).
• 스캔 문서 OCR → Amazon Textract.
• 텍스트 감정/개체 분석 → Amazon Comprehend(NLP).
• 텍스트→음성 → Amazon Polly(TTS).
• Amazon Translate(번역)는 위 사용 사례에 해당하지 않아 선택되지 않는다.
💡 각 관리형 AI 서비스의 입력→출력 형태를 외우면 매칭이 쉽다.`,
  },
  264: {
    answerType: 'matching',
    englishQuestion:
'A company uses ML techniques to build applications. Select the correct ML technique for each task. Each technique should be selected one time. Tasks: predict a category/label; predict a continuous numeric value; group similar items without labels; learn optimal actions via reward from an environment.',
    koreanQuestion:
'한 회사가 ML 기술로 애플리케이션을 개발합니다. 각 작업에 맞는 ML 기법을 선택하세요(각 기법 1회). (범주 예측 / 연속값 예측 / 라벨 없이 유사 항목 그룹화 / 보상 기반 최적 행동 학습)',
    hotspotOptions: ['Classification', 'Regression', 'Clustering', 'Reinforcement learning'],
    hotspotItems: [
      { prompt: 'Predict a discrete category or label (e.g., spam/not spam)', promptKo: '이산적 범주·라벨 예측(예: 스팸 여부)', answer: 'Classification (분류)' },
      { prompt: 'Predict a continuous numeric value (e.g., price)', promptKo: '연속적 수치 예측(예: 가격)', answer: 'Regression (회귀)' },
      { prompt: 'Group similar items without labeled data', promptKo: '라벨 없이 유사 항목 그룹화', answer: 'Clustering (군집화)' },
      { prompt: 'Learn optimal actions via reward from an environment', promptKo: '환경의 보상을 통해 최적 행동 학습', answer: 'Reinforcement learning (강화학습)' },
    ],
    explanation:
`✅ ML 기법 매칭:
• 범주/라벨 예측 → Classification(지도학습, 이산 출력).
• 연속값 예측 → Regression(지도학습, 연속 출력).
• 라벨 없는 그룹화 → Clustering(비지도학습).
• 보상 기반 행동 최적화 → Reinforcement learning(강화학습).
💡 구분 핵심: 출력이 "범주=분류, 숫자=회귀", 라벨이 "없으면 군집화", "보상/시행착오면 강화학습".`,
  },
  267: {
    answerType: 'matching',
    englishQuestion:
'A company is building an AI solution using Amazon SageMaker AI and wants to use SageMaker features to facilitate development. Select the correct SageMaker feature for each use case. Each feature should be selected one time or not at all.',
    koreanQuestion:
'한 회사가 Amazon SageMaker AI로 솔루션을 구축하며 개발을 돕는 기능을 선택하려 합니다. 각 사용 사례에 맞는 SageMaker 기능을 선택하세요(각 기능 1회 또는 미선택).',
    hotspotOptions: ['SageMaker Canvas', 'SageMaker JumpStart', 'SageMaker Ground Truth', 'SageMaker Studio', 'SageMaker Model Monitor'],
    hotspotItems: [
      { prompt: 'Build ML models with a no-code visual interface', promptKo: '코드 없이 시각적으로 ML 모델 구축', answer: 'SageMaker Canvas' },
      { prompt: 'Start from pretrained models and prebuilt solutions', promptKo: '사전학습 모델·사전 구축 솔루션에서 시작', answer: 'SageMaker JumpStart' },
      { prompt: 'Label training data with human annotators', promptKo: '사람이 학습 데이터를 라벨링', answer: 'SageMaker Ground Truth' },
      { prompt: 'Monitor a deployed model for data/quality drift', promptKo: '배포 모델의 데이터/품질 드리프트 모니터링', answer: 'SageMaker Model Monitor' },
    ],
    explanation:
`✅ SageMaker 기능 매칭:
• 노코드 모델 구축 → Canvas.
• 사전학습 모델·솔루션 시작점 → JumpStart.
• 사람 기반 데이터 라벨링 → Ground Truth.
• 배포 모델 드리프트 감지 → Model Monitor.
• Studio(통합 개발 IDE)는 특정 사용 사례에 1:1 대응하지 않으면 선택되지 않을 수 있다.
💡 각 기능은 ML 수명주기의 서로 다른 단계(준비·시작·라벨링·운영 모니터링)를 담당한다.`,
  },
  275: {
    answerType: 'matching',
    englishQuestion:
'An ecommerce company built a generative AI recommendation solution and wants to track how effectively it increases sales and engagement. Select the correct metric type for each goal. Each metric should be selected one time or not at all.',
    koreanQuestion:
'한 전자상거래 회사가 생성형 AI 추천 솔루션의 매출·참여 증대 효과를 추적하려 합니다. 각 목표에 맞는 지표 유형을 선택하세요(각 지표 1회 또는 미선택).',
    hotspotOptions: ['Conversion rate', 'Click-through rate (CTR)', 'Average session duration', 'A/B test (controlled experiment)'],
    hotspotItems: [
      { prompt: 'Measure how many recommendations lead to a purchase', promptKo: '추천이 실제 구매로 이어진 비율 측정', answer: 'Conversion rate (전환율)' },
      { prompt: 'Measure how often users click the recommended items', promptKo: '추천 항목 클릭 빈도 측정', answer: 'Click-through rate / CTR (클릭률)' },
      { prompt: 'Measure user engagement/time spent in the app', promptKo: '앱 내 사용자 참여·체류 시간 측정', answer: 'Average session duration (평균 세션 시간)' },
      { prompt: 'Prove the AI solution caused the sales lift', promptKo: 'AI 솔루션이 매출 상승의 원인임을 입증', answer: 'A/B test (대조 실험)' },
    ],
    explanation:
`✅ 목표별 지표 매칭:
• 구매 전환 효과 → Conversion rate(전환율).
• 추천 클릭 효과 → CTR(클릭률).
• 참여/체류 → Average session duration.
• 인과적 효과 입증 → A/B 테스트로 추천 적용군 vs 대조군 비교.
💡 핵심: AI의 사업적 효과는 기술 지표(정확도)가 아니라 비즈니스 KPI와 통제된 실험(A/B)으로 측정한다.`,
  },
  280: {
    answerType: 'matching',
    englishQuestion:
'A company wants to improve multiple ML models. Select the correct ML technique for each goal. Each technique should be selected one time. Goals: reduce overfitting; increase training data variety; combine multiple models for better accuracy; find the best hyperparameters.',
    koreanQuestion:
'한 회사가 여러 ML 모델을 개선하려 합니다. 각 목표에 맞는 ML 기법을 선택하세요(각 기법 1회). (과적합 감소 / 학습 데이터 다양성 증가 / 여러 모델 결합 / 최적 하이퍼파라미터 탐색)',
    hotspotOptions: ['Regularization', 'Data augmentation', 'Ensemble methods', 'Hyperparameter optimization'],
    hotspotItems: [
      { prompt: 'Reduce overfitting of a model', promptKo: '모델의 과적합 감소', answer: 'Regularization (정규화, 예: L1/L2·dropout)' },
      { prompt: 'Increase the variety/amount of training data', promptKo: '학습 데이터의 다양성·양 증가', answer: 'Data augmentation (데이터 증강)' },
      { prompt: 'Combine several models to improve accuracy', promptKo: '여러 모델을 결합해 정확도 향상', answer: 'Ensemble methods (앙상블, 배깅/부스팅)' },
      { prompt: 'Find the best model hyperparameters', promptKo: '최적 하이퍼파라미터 탐색', answer: 'Hyperparameter optimization (HPO)' },
    ],
    explanation:
`✅ 모델 개선 기법 매칭:
• 과적합 감소 → Regularization: 가중치에 페널티(L1/L2)·dropout으로 일반화 향상.
• 데이터 다양성 증가 → Data augmentation: 회전·노이즈·합성 등으로 데이터 확장.
• 정확도 향상(모델 결합) → Ensemble: 배깅(랜덤포레스트)·부스팅(XGBoost) 등.
• 최적 설정 탐색 → Hyperparameter optimization(HPO): 그리드/베이지안 탐색.
💡 각 기법이 "무슨 문제를 푸는지"로 구분한다: 일반화↑/데이터↑/모델결합/설정탐색.`,
  },
  283: {
    answerType: 'matching',
    hotspotOptions: ['Supervised learning', 'Unsupervised learning', 'Generative AI', 'Bias'],
    hotspotItems: [
      { prompt: 'A model learns from labeled examples to make predictions', promptKo: '라벨된 예시로 학습해 예측하는 모델', answer: 'Supervised learning (지도학습)' },
      { prompt: 'A model finds patterns/groups in unlabeled data', promptKo: '라벨 없는 데이터에서 패턴·그룹 발견', answer: 'Unsupervised learning (비지도학습)' },
      { prompt: 'A model creates new content such as text or images', promptKo: '텍스트·이미지 등 새로운 콘텐츠 생성', answer: 'Generative AI (생성형 AI)' },
      { prompt: 'A model systematically favors one group over another', promptKo: '특정 그룹을 체계적으로 편향되게 대우', answer: 'Bias (편향)' },
    ],
    explanation:
`✅ AI 용어 매칭:
• 라벨 데이터로 예측 학습 → Supervised learning(지도학습).
• 라벨 없이 패턴/군집 발견 → Unsupervised learning(비지도학습).
• 새 콘텐츠 생성 → Generative AI.
• 특정 그룹에 불리한 체계적 치우침 → Bias(편향).
💡 각 용어의 1줄 정의를 정확히 구분하는 문제. 특히 "라벨 유무(지도/비지도)"와 "생성 여부(생성형 AI)"가 핵심.`,
  },
  311: {
    answerType: 'matching',
    hotspotOptions: ['Few-shot prompting', 'Zero-shot prompting', 'Chain-of-thought prompting'],
    hotspotItems: [
      { prompt: 'Provide several examples in the prompt before the task', promptKo: '작업 전에 프롬프트에 예시 몇 개 제공', answer: 'Few-shot prompting (퓨샷)' },
      { prompt: 'Give only an instruction with no examples', promptKo: '예시 없이 지시만 제공', answer: 'Zero-shot prompting (제로샷)' },
      { prompt: 'Ask the model to reason step by step', promptKo: '단계별로 추론하도록 요청', answer: 'Chain-of-thought prompting (사고연쇄)' },
    ],
    explanation:
`✅ 프롬프트 엔지니어링 기법 매칭:
• 예시 몇 개 제공 → Few-shot: 예시로 형식·패턴을 학습(In-context learning).
• 예시 없이 지시만 → Zero-shot: 모델 사전지식만으로 수행.
• 단계별 추론 유도 → Chain-of-thought: 복잡한 추론을 단계화해 정확도↑.
💡 예시 개수(0개=Zero, 몇 개=Few)와 추론 유도(step by step=CoT)로 구분한다.`,
  },
};
