/* 해설 보강 + 누락 문제문 복원 — Q121~Q140. (Q125,135는 struct 매칭) */
module.exports = {
  121: {
    englishQuestion:
'A company wants to detect and identify objects and anomalies in images and video footage. Which field of AI is best suited for this task?',
    koreanQuestion:
'한 회사가 이미지와 영상에서 객체를 탐지·식별하고 이상을 찾아내려고 합니다. 이 작업에 가장 적합한 AI 분야는 무엇입니까?',
    explanation:
`【핵심 개념 — 컴퓨터 비전(Computer Vision)】
컴퓨터 비전은 이미지·영상을 이해하는 AI 분야로, 객체 탐지·이미지 분류·이상 탐지·세분화 등을 수행합니다. 시각 데이터에서 의미를 뽑아냅니다.

【정답이 C인 이유】
이미지·영상에서 객체를 인식하고 이상을 탐지하는 것은 컴퓨터 비전의 핵심 응용입니다.

【오답 분석】
• A 추천 시스템: 사용자 취향에 맞는 항목을 추천하는 분야로, 시각 인식과 무관합니다.
• B 자연어 처리(NLP): 텍스트·언어를 다루는 분야로, 이미지 인식이 아닙니다.
• D 이미지 처리(Image processing): 필터·리사이즈 등 이미지를 '가공'하는 저수준 기술로, 객체 '인식·이해'는 컴퓨터 비전의 영역입니다.

【더 알아두기】
AWS 컴퓨터 비전 = Amazon Rekognition(객체·얼굴·콘텐츠 모더레이션). '이미지/영상 이해 = 컴퓨터 비전'으로 매칭하세요.`,
  },
  122: {
    englishQuestion:
'A company wants to automatically find the best hyperparameters for its ML model. Which AWS service provides automatic model tuning (hyperparameter optimization)?',
    koreanQuestion:
'한 회사가 ML 모델의 최적 하이퍼파라미터를 자동으로 찾고자 합니다. 자동 모델 튜닝(하이퍼파라미터 최적화)을 제공하는 AWS 서비스는 무엇입니까?',
    explanation:
`【핵심 개념 — SageMaker 자동 모델 튜닝】
Amazon SageMaker의 Automatic Model Tuning(AMT)은 학습률·배치 크기 등 하이퍼파라미터 조합을 자동 탐색(베이지안 최적화 등)해 최적 성능 설정을 찾아줍니다.

【정답이 B인 이유】
하이퍼파라미터를 자동 최적화하는 기능은 SageMaker가 제공하므로 정답은 Amazon SageMaker입니다.

【오답 분석】
• A Amazon Personalize: 추천 시스템 전용 서비스로, 범용 하이퍼파라미터 튜닝 도구가 아닙니다.
• C Amazon Athena: S3 데이터를 SQL로 조회하는 쿼리 서비스입니다.
• D Amazon Comprehend: 텍스트 분석 NLP 서비스로, 모델 튜닝 기능이 아닙니다.

【더 알아두기】
하이퍼파라미터(사람이 정하는 설정) vs 파라미터(학습으로 정해지는 가중치). 자동 탐색 = SageMaker Automatic Model Tuning.`,
  },
  123: {
    englishQuestion:
'A company wants people to review and validate AI-generated outputs to reduce errors and bias before the outputs are used. Which approach should the company adopt?',
    koreanQuestion:
'한 회사가 AI 생성 결과를 사용하기 전에 사람이 검토·검증하여 오류와 편향을 줄이고자 합니다. 어떤 접근법을 채택해야 합니까?',
    explanation:
`【핵심 개념 — Human-in-the-loop(HITL)】
HITL은 AI 처리 과정에 사람의 검토·교정을 결합하는 방식입니다. 모델이 불확실하거나 위험이 큰 경우 사람이 개입해 오류·편향을 줄이고 품질을 보장합니다.

【정답이 A인 이유】
사람이 AI 결과를 검토·검증해 오류·편향을 줄이는 방식은 정확히 Human-in-the-loop입니다.

【오답 분석】
• B 데이터 증강: 데이터 양·다양성을 늘리는 기법으로, 사람이 결과를 '검토'하는 것과 다릅니다.
• C 피처 엔지니어링: 모델 입력 변수를 가공하는 작업으로, 출력 검증과 무관합니다.
• D 적대적 학습(Adversarial training): 적대적 예시로 모델을 강건하게 만드는 학습 기법으로, 사람 검토와 다릅니다.

【더 알아두기】
AWS의 HITL: Amazon A2I(Augmented AI), SageMaker Ground Truth(Plus). 고위험·고정확도 요구 = 사람 검토 결합.`,
  },
  124: {
    englishQuestion:
'A company\'s fine-tuned LLM produces biased outputs. The company wants the most cost-effective way to reduce the bias without abandoning the existing model. What should the company do?',
    koreanQuestion:
'한 회사의 파인튜닝된 LLM이 편향된 출력을 냅니다. 기존 모델을 버리지 않고 가장 비용 효율적으로 편향을 줄이려면 어떻게 해야 합니까?',
    explanation:
`【핵심 개념 — 편향 완화: 데이터 보강 후 재튜닝】
파인튜닝 모델의 편향은 대개 학습 데이터의 치우침에서 옵니다. 더 다양하고 균형 잡힌 데이터를 추가해 다시 파인튜닝하면, 모델을 새로 만들지 않고도 편향을 효과적으로 줄일 수 있습니다.

【정답이 A인 이유】
다양한 데이터를 추가하고 기존 모델을 다시 파인튜닝하는 것이, 모델을 버리지 않으면서 편향을 줄이는 가장 비용 효율적인 방법입니다.

【오답 분석】
• B RAG 사용: 외부 지식을 검색해 답을 보강하는 기법으로, 모델 자체의 '편향'을 교정하는 직접적 수단은 아닙니다.
• C Trusted Advisor로 편향 제거: Trusted Advisor는 비용·보안·성능 모범사례 점검 도구로, 모델 편향과 무관합니다.
• D 새 LLM 사전학습: 처음부터 학습하는 것은 비용·시간이 막대해 '비용 효율'과 정반대입니다.

【더 알아두기】
편향 진단(Clarify) → 균형 데이터 보강 → 재파인튜닝 → 재평가. 가장 비용 효율적인 교정은 데이터 보강 + 재튜닝입니다.`,
  },
  126: {
    englishQuestion:
'A company needs to record and audit all API calls made to its AWS account, including who made each request and when. Which AWS service should the company use?',
    koreanQuestion:
'한 회사가 자사 AWS 계정에 대한 모든 API 호출(누가, 언제 요청했는지 포함)을 기록·감사해야 합니다. 어떤 AWS 서비스를 사용해야 합니까?',
    explanation:
`【핵심 개념 — AWS CloudTrail(API 감사 로그)】
CloudTrail은 계정 내 모든 API 호출을 '누가·언제·무엇을' 단위로 기록하는 감사·거버넌스 서비스입니다. 보안 조사·규정 준수에 핵심입니다.

【정답이 A인 이유】
모든 API 호출을 기록·감사하려면 API 활동을 추적하는 AWS CloudTrail이 정답입니다.

【오답 분석】
• B Amazon CloudWatch: 성능 지표·로그·알람을 다루는 모니터링 서비스로, 'API 호출 감사'가 주목적은 아닙니다.
• C AWS Audit Manager: 규정 준수 감사 증거를 자동 수집·보고하지만, API 호출 기록의 원천 자체는 CloudTrail입니다.
• D/E S3 Intelligent-Tiering / S3 Standard: 데이터 저장 스토리지 클래스로, API 감사 기능이 아닙니다.

【더 알아두기】
역할 구분: CloudTrail(누가 무엇을 호출 — 감사), CloudWatch(성능·운영 모니터링), Config(구성 변경 추적). 감사 로그 = CloudTrail.`,
  },
  127: {
    englishQuestion:
'A company wants to provide personalized product recommendations to users based on their behavior and preferences. Which AWS AI service should the company use?',
    koreanQuestion:
'한 회사가 사용자의 행동과 선호도를 기반으로 개인화된 제품 추천을 제공하려고 합니다. 어떤 AWS AI 서비스를 사용해야 합니까?',
    explanation:
`【핵심 개념 — Amazon Personalize】
Amazon Personalize는 Amazon.com과 동일한 기술로 사용자 행동·선호 데이터를 학습해 실시간 개인화 추천을 제공하는 완전관리형 서비스입니다.

【정답이 A인 이유】
개인화 추천이 목적이면, 추천 전용 관리형 서비스인 Amazon Personalize가 정답입니다.

【오답 분석】
• B Amazon Kendra: 기업 문서 지능형 검색 서비스로, 추천이 아니라 검색에 특화됩니다.
• C Amazon Rekognition: 이미지·영상 분석 서비스입니다.
• D Amazon Transcribe: 음성을 텍스트로 변환하는 STT 서비스입니다.

【더 알아두기】
용도 매칭: 추천=Personalize, 검색=Kendra, 비전=Rekognition, 음성=Transcribe. '개인화 추천 = Personalize'.`,
  },
  128: {
    englishQuestion:
'A regulation requires that a company\'s data be physically stored and kept within a specific country or geographic region. Which data concept does this requirement represent?',
    koreanQuestion:
'한 규제가 회사의 데이터를 특정 국가 또는 지리적 지역 내에 물리적으로 저장·보관하도록 요구합니다. 이 요구사항이 나타내는 데이터 개념은 무엇입니까?',
    explanation:
`【핵심 개념 — 데이터 레지던시(Data Residency)】
데이터 레지던시는 데이터를 특정 국가·지역의 물리적 위치 내에 저장·처리하도록 하는 요구입니다. 국가별 개인정보·주권 규제(예: GDPR) 준수와 직결됩니다.

【정답이 A인 이유】
'특정 지역 내 데이터 보관'을 요구하는 것은 데이터 레지던시의 정의 그대로입니다.

【오답 분석】
• B 데이터 품질: 정확성·완전성·일관성 등 데이터의 '질'에 관한 개념입니다.
• C 데이터 검색 가능성(Discoverability): 데이터를 찾고 접근하기 쉬운 정도로, 저장 위치 규제와 다릅니다.
• D 데이터 강화(Enrichment): 외부 정보로 데이터를 보강하는 작업입니다.

【더 알아두기】
규제 키워드: '특정 국가/지역 내 저장 = 데이터 레지던시/주권'. AWS는 리전(Region) 선택으로 데이터 위치를 통제합니다.`,
  },
  129: {
    englishQuestion:
'A company needs to monitor the performance of its AWS resources and applications in real time using metrics, logs, and alarms. Which AWS service should the company use?',
    koreanQuestion:
'한 회사가 지표·로그·알람을 사용해 AWS 리소스와 애플리케이션의 성능을 실시간으로 모니터링해야 합니다. 어떤 AWS 서비스를 사용해야 합니까?',
    explanation:
`【핵심 개념 — Amazon CloudWatch(관찰성)】
CloudWatch는 지표(metric)·로그·이벤트를 수집·시각화하고 알람을 설정해 리소스와 애플리케이션의 성능·상태를 실시간 모니터링하는 서비스입니다.

【정답이 A인 이유】
실시간 성능 모니터링(지표·로그·알람)이 목적이면 Amazon CloudWatch가 정답입니다.

【오답 분석】
• B AWS CloudTrail: API 호출 감사 로그용으로, 실시간 성능 모니터링이 주목적이 아닙니다.
• C AWS Trusted Advisor: 비용·보안·성능 모범사례를 점검·권고하는 도구입니다.
• D AWS Config: 리소스 구성 변경 추적·규정 준수 평가 도구입니다.

【더 알아두기】
구분: CloudWatch(성능·운영 모니터링), CloudTrail(API 감사), Config(구성 추적). 실시간 성능·알람 = CloudWatch.`,
  },
  130: {
    englishQuestion:
'A company wants an LLM to solve complex, multi-step problems more accurately by reasoning through the problem step by step. Which prompting technique should the company use?',
    koreanQuestion:
'한 회사가 LLM이 복잡한 다단계 문제를 단계별로 추론하여 더 정확하게 풀기를 원합니다. 어떤 프롬프트 기법을 사용해야 합니까?',
    explanation:
`【핵심 개념 — 사고연쇄(Chain-of-Thought) 프롬프팅】
CoT는 모델에게 "단계별로 생각하라"고 지시해 추론 과정을 명시적으로 펼치게 하는 기법입니다. 복잡한 수학·논리·다단계 문제의 정확도를 높입니다.

【정답이 A인 이유】
복잡한 문제를 단계별로 추론해 정확도를 높이려면 Chain-of-thought 프롬프팅이 정답입니다.

【오답 분석】
• B 프롬프트 인젝션: 모델을 악의적으로 조작하는 '공격' 기법으로, 정상적 추론 향상 기법이 아닙니다.
• C Few-shot 프롬프팅: 예시를 제공하는 기법으로 도움은 되지만, '단계별 추론' 자체를 유도하는 것은 CoT입니다.
• D 프롬프트 템플릿: 입력 형식을 표준화하는 방식으로, 추론 과정을 단계화하지는 않습니다.

【더 알아두기】
복잡 추론 = CoT("think step by step"). 예시 제공 = Few-shot. 둘을 결합(Few-shot CoT)하면 효과가 더 큽니다.`,
  },
  131: {
    englishQuestion:
'A company wants to access foundation models from multiple providers through a single managed API, without provisioning or managing any infrastructure. Which AWS service should the company use?',
    koreanQuestion:
'한 회사가 인프라를 프로비저닝·관리하지 않고, 단일 관리형 API를 통해 여러 공급자의 파운데이션 모델에 접근하려고 합니다. 어떤 AWS 서비스를 사용해야 합니까?',
    explanation:
`【핵심 개념 — Amazon Bedrock】
Amazon Bedrock은 Anthropic·Meta·Amazon·AI21·Stability AI 등 여러 공급자의 파운데이션 모델을 단일 API로 제공하는 완전관리형 생성형 AI 서비스입니다. 인프라 관리 없이 모델을 골라 앱에 통합하고 RAG·에이전트·가드레일 같은 고급 기능도 씁니다.

【정답이 B인 이유】
여러 공급자의 FM을 단일 관리형 API로, 인프라 관리 없이 쓰려는 요구에는 Amazon Bedrock이 정답입니다.

【오답 분석】
• A Amazon Q Developer: 개발 보조 AI 어시스턴트로, FM 선택·호출 플랫폼이 아닙니다.
• C Amazon Kendra: 기업 문서 검색 서비스입니다.
• D Amazon Comprehend: 텍스트 분석 NLP 서비스입니다.

【더 알아두기】
'여러 FM을 API로, 서버리스로 = Amazon Bedrock'. 모델을 직접 학습·배포·관리하려면 SageMaker를 사용합니다.`,
  },
  132: {
    englishQuestion:
'A company is building an accessibility app for visually impaired users that must accept voice input and provide voice output. Which approach best meets this requirement?',
    koreanQuestion:
'한 회사가 음성 입력을 받고 음성 출력을 제공해야 하는, 시각 장애인용 접근성 앱을 개발하고 있습니다. 이 요구사항을 가장 잘 충족하는 접근법은 무엇입니까?',
    explanation:
`【핵심 개념 — 딥러닝 기반 음성 인식(ASR)】
시각 장애인용 앱은 음성 입출력이 핵심입니다. 딥러닝 기반 자동 음성 인식(ASR)은 사용자의 음성을 텍스트로 정확히 변환하고, 이어 TTS로 음성 응답을 제공해 손 없이도 상호작용하게 합니다.

【정답이 A인 이유】
음성 입력·출력이 필수인 접근성 앱에는, 복잡한 음성 패턴을 잘 인식하고 실시간 처리가 가능한 딥러닝 신경망 기반 음성 인식이 가장 적합합니다.

【오답 분석】
• B 수치 데이터 패턴 분석 모델: 정형 수치 분석용으로, 음성 입출력 요구와 무관합니다.
• C 생성형 AI 텍스트 요약: 텍스트를 요약·생성하는 기능으로, 음성 인식이라는 핵심 요구를 직접 충족하지 못합니다.
• D 이미지 분류 모델: 시각 인식용으로, 음성 입출력과 다릅니다.

【더 알아두기】
음성 파이프라인: 음성→텍스트(ASR, Amazon Transcribe) → 처리 → 텍스트→음성(TTS, Amazon Polly). 접근성 음성 앱의 표준 구성입니다.`,
  },
  133: {
    englishQuestion:
'A company wants to improve the response quality of its LLM for complex problem solving that requires detailed, step-by-step reasoning. Which prompting technique is most appropriate?',
    explanation:
`【핵심 개념 — 사고연쇄(Chain-of-Thought) 프롬프팅】
복잡한 문제를 풀 때 답만 요구하면 모델이 비약해 틀리기 쉽습니다. CoT는 "단계별로 추론하라"고 유도해 중간 사고 과정을 펼치게 하여, 다단계 추론의 정확도를 높입니다.

【정답이 D인 이유】
세부적 추론과 단계별 설명이 필요한 복잡한 문제에는 Chain-of-thought 프롬프팅이 가장 적합합니다.

【오답 분석】
• A Few-shot 프롬프팅: 예시를 제공해 형식·패턴을 알려주지만, 단계별 추론 과정을 직접 유도하지는 않습니다.
• B Zero-shot 프롬프팅: 예시·과정 없이 지시만 주므로, 복잡한 다단계 추론에는 정확도가 떨어집니다.
• C 방향성 자극(Directional stimulus) 프롬프팅: 힌트(키워드)를 줘 방향을 유도하는 기법으로, 단계적 추론 전개와는 초점이 다릅니다.

【더 알아두기】
복잡 추론 = CoT. 예시로 패턴 학습 = Few-shot. 둘을 합친 'Few-shot CoT'가 어려운 문제에서 특히 강력합니다.`,
  },
  134: {
    englishQuestion:
'A company wants to keep its foundation model continuously up to date by periodically training it on the latest data. Which training strategy enables these regular updates?',
    explanation:
`【핵심 개념 — 연속 사전학습(Continuous Pre-training)】
연속 사전학습은 새로 수집한 데이터로 모델을 주기적으로 추가 학습해 지식을 갱신·확장하는 전략입니다. 모델이 최신 도메인 데이터를 계속 흡수합니다.

【정답이 B인 이유】
최신 데이터로 정기적으로 모델을 갱신하려면, 데이터를 지속적으로 추가 학습하는 연속(지속) 사전학습이 적합합니다.

【오답 분석】
• A 배치 학습(Batch learning): 정해진 데이터로 한 번에 학습하는 방식으로, '지속적 최신화'의 핵심 개념과는 다릅니다(정적 스냅샷에 가까움).
• C 정적 학습(Static training): 한 번 학습 후 고정하는 방식으로, 최신 데이터 반영이 어렵습니다.
• D 잠재 학습(Latent training): 표준 학습 전략 용어가 아닙니다(혼동 유도용 보기).

【더 알아두기】
최신화 옵션: 연속 사전학습(모델에 지식 누적) vs RAG(검색으로 최신 사실 주입, 재학습 불필요). 빈번한 사실 갱신은 RAG가 더 가벼울 수 있습니다.`,
  },
  136: {
    englishQuestion:
'Which characteristic best describes an AI governance framework that aims to build trust and deploy human-centered AI responsibly?',
    explanation:
`【핵심 개념 — AI 거버넌스 프레임워크】
AI 거버넌스는 AI를 책임감 있게 운영하기 위한 정책·표준·통제 체계입니다. 데이터 관리, 투명성, 책임 있는 AI, 규정 준수에 대한 정책과 가이드라인을 만들어 신뢰를 구축합니다.

【정답이 D인 이유】
'데이터·투명성·책임 있는 AI·규정 준수를 위한 정책과 가이드라인 개발'이 AI 거버넌스 프레임워크의 본질적 특징입니다.

【오답 분석】
• A 여러 부서로 이니셔티브 확장: 사업 확장 전략으로, 거버넌스(정책·통제) 체계와 초점이 다릅니다.
• B 비즈니스 표준·수익 목표·이해관계자 기대 정렬: 비즈니스 전략 정렬에 관한 것으로, 거버넌스의 핵심인 정책·규정 수립과 다릅니다.
• C 도전 과제 극복으로 혁신·성장 주도: 사업 성장 관점으로, AI 거버넌스의 정의와 거리가 있습니다.

【더 알아두기】
AI 거버넌스 = 정책/표준 + 책임 소재 + 투명성 + 규정 준수 + 위험 관리. AWS는 SageMaker(Model Cards/Clarify)·Audit Manager 등으로 이를 지원합니다.`,
  },
  137: {
    englishQuestion:
'An ecommerce company wants to measure the financial (cost) impact of its AI chatbot on customer service operations. Which metric should the company use?',
    explanation:
`【핵심 개념 — 재무적 영향 지표: 대화당 비용】
AI 챗봇의 '재무적' 효과를 보려면, 고객 응대 한 건(대화)을 처리하는 데 드는 비용을 측정해 사람 상담 대비 절감 효과를 비교해야 합니다.

【정답이 C인 이유】
고객 대화 한 건당 비용(Cost per conversation)은 챗봇 도입으로 응대 비용이 얼마나 줄었는지 직접 보여주는 재무 지표입니다.

【오답 분석】
• A 처리된 문의 수: 처리량(볼륨) 지표로, 비용 절감 효과를 직접 나타내지 않습니다.
• B AI 모델 학습 비용: 일회성 구축 비용으로, 운영 단계의 재무적 영향(대화당 비용)과 다릅니다.
• D 평균 처리 시간(AHT): 효율·속도 지표로, '재무적' 영향을 직접 측정하지는 않습니다(간접적).

【더 알아두기】
재무 영향 = 단위당 비용(대화당 비용)·총 비용 절감·ROI. 운영 효율(AHT)·품질(CSAT)과 구분해 목적에 맞는 지표를 고르세요.`,
  },
  138: {
    englishQuestion:
'A company wants to discover natural groups of customers based on their demographics and purchasing patterns, without predefined labels. Which algorithm is best suited for this task?',
    explanation:
`【핵심 개념 — K-means 군집화(Clustering)】
K-means는 라벨 없는 데이터를 비슷한 특성끼리 K개의 그룹으로 묶는 비지도 학습 알고리즘입니다. 고객 세분화(Customer segmentation)의 대표 기법입니다.

【정답이 B인 이유】
사전 라벨 없이 인구통계·구매 패턴으로 고객 그룹을 '발견'하려면, 비지도 군집화 알고리즘인 K-means가 적합합니다.

【오답 분석】
• A k-NN: 이름은 비슷하지만 라벨이 있어야 하는 '지도' 분류 알고리즘으로, 그룹 발견(비지도)과 다릅니다.
• C 의사결정 트리: 라벨이 필요한 지도 분류·회귀 알고리즘입니다.
• D 서포트 벡터 머신(SVM): 라벨이 필요한 지도 분류 알고리즘입니다.

【더 알아두기】
세분화/그룹 발견(라벨 없음) = 군집화(K-means). 이름 함정: K-means(비지도 군집) ≠ k-NN(지도 분류).`,
  },
  139: {
    englishQuestion:
'A company\'s LLM is producing hallucinations. Among the available options, which action will help reduce the hallucinations?',
    explanation:
`【핵심 개념 — Temperature와 환각】
환각은 모델이 그럴듯하지만 틀린 내용을 지어내는 현상입니다. Temperature를 낮추면 출력의 무작위성이 줄어 모델이 더 보수적·결정적으로 답해, 근거 없는 창작(환각)을 어느 정도 줄일 수 있습니다.

【정답이 C인 이유】
주어진 보기 중에서는 temperature(추론 파라미터)를 낮추는 것이 환각을 줄이는 실질적이고 즉시 적용 가능한 방법입니다.

【오답 분석】
• A 에이전트로 모델 학습 감독: 에이전트는 작업 수행·오케스트레이션 도구이지, 학습을 감독해 환각을 줄이는 수단이 아닙니다.
• B 환각 유발 데이터 제거: 어떤 데이터가 환각을 일으키는지 특정·제거하기가 현실적으로 어려워 실효성이 낮습니다.
• D 환각하지 않게 학습된 FM 사용: 어떤 FM도 환각을 완전히 안 하도록 '보장'되지 않으므로 비현실적입니다.

【더 알아두기】
환각 완화의 정석: RAG(근거 문서 제공), Guardrails 맥락 근거 확인, 낮은 temperature, 출처 요구. 보기에 RAG가 있으면 보통 그것이 더 강력합니다.`,
  },
  140: {
    englishQuestion:
'A company builds a chatbot with an Amazon Bedrock LLM. Resolving a customer request requires multiple conversational turns. How can the company make the LLM use the context of previous messages?',
    explanation:
`【핵심 개념 — LLM은 상태가 없다(Stateless)】
LLM은 호출마다 독립적이라 이전 대화를 '기억'하지 못합니다. 멀티턴 대화를 유지하려면, 이전 메시지(대화 기록)를 매 호출의 프롬프트에 함께 넣어 맥락을 제공해야 합니다.

【정답이 B인 이유】
이전 메시지들을 모델 프롬프트에 추가하면, 모델이 그 맥락을 보고 일관된 멀티턴 응답을 생성합니다. 이것이 대화 메모리를 구현하는 표준 방법입니다.

【오답 분석】
• A 모델 호출 로깅 활성화: 입출력을 '기록'할 뿐, 모델이 이전 맥락을 활용하도록 만들지는 않습니다.
• C Personalize로 대화 내역 저장: Personalize는 추천 서비스로, 대화 맥락을 모델에 주입하는 용도가 아닙니다.
• D Provisioned Throughput 사용: 처리량(성능/비용) 예약 옵션으로, 대화 맥락 유지와 무관합니다.

【더 알아두기】
대화 메모리 = 프롬프트에 히스토리 포함(필요 시 요약해 토큰 절약). 컨텍스트 윈도우 한도를 넘지 않도록 관리합니다.`,
  },
};
