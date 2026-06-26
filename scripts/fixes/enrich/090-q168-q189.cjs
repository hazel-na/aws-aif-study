/* 해설 보강 + 일부 문제문/선택지 복원 — Q168~Q189. struct: 167,185,188 제외 */
module.exports = {
  168: {
    explanation:
`【핵심 개념 — 프롬프트 체이닝(Prompt Chaining)】
프롬프트 체이닝은 복잡한 작업을 여러 하위 단계로 쪼개 순차적으로 LLM에 보내고, 각 단계의 출력을 다음 단계의 입력으로 연결하는 기법입니다. 한 번에 풀기 어려운 다단계 작업을 안정적으로 처리합니다.

【정답이 B인 이유】
'복잡한 작업을 작은 하위 작업으로 나눠 순차적으로 LLM에 전달'하는 것은 프롬프트 체이닝의 정의 그대로입니다.

【오답 분석】
• A 원샷(One-shot) 프롬프팅: 예시를 '하나' 주는 기법으로, 작업을 단계로 분해하는 것과 다릅니다.
• C 사고의 나무(Tree of Thoughts): 여러 추론 경로를 '분기·탐색'하는 기법으로, 순차적 단계 연결과 구분됩니다.
• D RAG: 외부 지식을 검색해 주입하는 기법으로, 작업 분해·연결과 목적이 다릅니다.

【더 알아두기】
다단계 작업 처리: 프롬프트 체이닝(순차 연결), CoT(단계별 추론), Tree of Thoughts(경로 탐색). 출력→입력 연결이 핵심이면 체이닝입니다.`,
  },
  169: {
    explanation:
`【핵심 개념 — 빠르게 변하는 데이터엔 RAG】
재고처럼 자주 바뀌는 정보를 반영하려면, 모델을 재학습하지 않고 최신 데이터를 실시간 검색해 주입하는 RAG가 적합합니다. 파인튜닝은 학습 시점 이후 데이터가 고정되어 최신성에 약합니다.

【정답이 C인 이유】
빠르게 변하는 재고 데이터를 텍스트 생성에 반영하려면, 외부 최신 데이터를 검색해 응답에 넣는 RAG가 가장 적합합니다.

【오답 분석】
• A 전이학습: 기존 모델 지식을 새 작업에 재활용하는 학습 전략으로, 실시간 최신 데이터 반영과 다릅니다.
• B 연합학습(Federated learning): 데이터를 분산된 채로 학습하는 프라이버시 기법으로, 최신성 반영이 목적이 아닙니다.
• D 원샷 프롬프팅: 예시 하나로 안내하는 기법으로, 변동하는 대량 데이터 반영에는 부족합니다.

【더 알아두기】
'자주 바뀌는 데이터 + 최신성 = RAG'. 정적 스타일·형식 내재화는 파인튜닝으로 구분합니다.`,
  },
  170: {
    englishQuestion:
'A company wants to standardize the documentation of its AI model development history, version information, training data sources, and performance metrics. Which solution is appropriate?',
    explanation:
`【핵심 개념 — SageMaker Model Cards(모델 문서화)】
Model Cards는 모델의 개발 이력·버전 정보·학습 데이터 출처·성능 지표·한계를 표준 양식으로 문서화합니다. 거버넌스·감사·팀 간 투명한 공유에 활용됩니다.

【정답이 C인 이유】
모델 개발 이력·버전·문서를 '표준화'해 기록하려면 SageMaker Model Cards가 적합합니다.

【오답 분석】
• A Git: 소스 '코드' 버전 관리 시스템으로, 모델의 목적·성능·한계를 표준 문서화하는 도구가 아닙니다.
• B Amazon Fraud Detector: 사기 거래 탐지 서비스로, 모델 문서화와 무관합니다.
• D Amazon Comprehend: 텍스트 분석 NLP 서비스입니다.

【더 알아두기】
문서화=Model Cards, 모델 아티팩트 버전·배포 관리=Model Registry, 코드 버전=Git. 본 문항의 '문서 표준화'는 Model Cards입니다.`,
  },
  171: {
    explanation:
`【핵심 개념 — SageMaker Model Monitor(품질 변화 감지)】
Model Monitor는 배포된 모델의 입력 데이터·예측 품질·편향·피처 기여도가 시간에 따라 변하는지(드리프트) 자동 감지하고 알림을 보냅니다.

【정답이 D인 이유】
여러 모델의 '원래 품질 대비 변화'를 감지해 문제를 해결하려는 요구에는 SageMaker Model Monitor가 정답입니다.

【오답 분석】
• A SageMaker JumpStart: 사전학습 모델·솔루션을 빠르게 배포하는 허브로, 품질 모니터링이 아닙니다.
• B SageMaker HyperPod: 대규모 분산 학습 인프라로, 운영 품질 모니터링 도구가 아닙니다.
• C SageMaker Data Wrangler: 데이터 전처리·변환 도구입니다.

【더 알아두기】
운영 중 품질·드리프트 감지 = Model Monitor. 편향·설명은 Clarify, 문서화는 Model Cards로 구분합니다.`,
  },
  172: {
    explanation:
`【핵심 개념 — RAG의 청킹(Chunking)】
청킹은 큰 문서를 의미 단위의 작은 조각으로 나누는 작업입니다. 적절한 크기로 나눠 임베딩·저장하면, 질의 시 더 관련성 높은 조각만 정확히 검색해 응답 품질이 좋아집니다.

【정답이 C인 이유】
청킹의 목적은 벡터 인덱스에서 검색되는 결과의 '문맥 관련성'을 높이는 것입니다. 알맞은 단위로 나눠야 질문과 잘 맞는 부분을 가져옵니다.

【오답 분석】
• A DB 저장 한도 회피: 청킹의 부수 효과일 수 있으나 본질적 목적이 아닙니다.
• B 임베딩 변환 필요성 제거: 청킹해도 각 조각을 임베딩해야 하므로 잘못된 설명입니다.
• D 저장 비용 절감: 비용 절감이 청킹의 목적은 아닙니다(검색 관련성이 핵심).

【더 알아두기】
청크가 너무 크면 노이즈·비용↑, 너무 작으면 문맥 부족. 적정 크기·중첩(overlap) 설계가 RAG 품질의 관건입니다.`,
  },
  173: {
    explanation:
`【핵심 개념 — Bedrock On-Demand(가변·저사용 비용 효율)】
On-Demand는 사용한 토큰만큼만 과금하는 방식입니다. 사용량이 적거나 예측하기 어려운 파일럿 단계에서 고정비 없이 비용을 최소화합니다.

【정답이 C인 이유】
사용량이 낮고 향후 수요가 불확실한 초기 단계에서는, 쓴 만큼만 내는 Bedrock On-Demand가 가장 비용 효율적입니다.

【오답 분석】
• A GPU 기반 EC2: 인스턴스를 상시 띄워야 해 저사용 시 비용 낭비가 큽니다.
• B Bedrock Provisioned Throughput: 처리량을 예약하는 방식으로, 사용량과 무관하게 고정비가 발생해 저사용·가변 수요에 비효율적입니다.
• D SageMaker JumpStart: 모델 배포 허브로, 엔드포인트를 운영하면 상시 비용이 듭니다.

【더 알아두기】
저사용·가변 = On-Demand, 안정·대규모 = Provisioned Throughput. 수요 패턴으로 요금제를 고릅니다.`,
  },
  174: {
    explanation:
`【핵심 개념 — Guardrails의 거부 주제(Denied Topics)】
Denied Topics는 정치·종교·경쟁사 등 다루고 싶지 않은 특정 '주제'의 응답을 차단하는 Guardrails 정책입니다.

【정답이 B인 이유】
정치적으로 편향된 콘텐츠를 막으려면, 해당 주제를 거부 목록에 등록하는 Denied Topics를 설정해야 합니다.

【오답 분석】
• A 단어 필터(Word filters): 특정 '단어/문구'를 차단하지만, '주제' 전반을 막는 데는 부적합합니다.
• C 민감 정보 필터(Sensitive information filters): PII 등 민감정보를 마스킹·차단하는 정책으로, 정치 주제와 무관합니다.
• D 콘텐츠 필터(Content filters): 혐오·폭력 등 고정 유해 카테고리를 다루며, '정치'는 기본 카테고리가 아니라 Denied Topics로 처리합니다.

【더 알아두기】
Guardrails: 콘텐츠 필터(고정 유해), 거부 주제(맞춤 주제), 단어 필터(단어), 민감정보(PII), 맥락 근거(환각). 특정 주제 차단 = Denied Topics.`,
  },
  175: {
    explanation:
`【핵심 개념 — 정밀도(Precision)와 오탐(False Positive)】
정밀도 = TP/(TP+FP). '사기라고 예측한 것 중 실제 사기 비율'입니다. 정밀도가 높을수록 정상 거래를 사기로 잘못 표시하는 오탐(FP)이 줄어, 검토 팀의 불필요한 작업 부담이 감소합니다.

【정답이 C인 이유】
오탐이 많아 검토 부담이 크다면, 오탐을 줄이는 데 직결되는 지표인 정밀도(Precision)를 높이는 방향으로 봐야 합니다.

【오답 분석】
• A 재현율(Recall): 실제 사기를 얼마나 놓치지 않는지(FN 최소화)를 보는 지표로, 오탐(FP) 감소와는 다른 목표입니다.
• B 정확도(Accuracy): 불균형 데이터(사기 비율 낮음)에서는 오해를 부르며, 오탐 부담을 직접 반영하지 못합니다.
• D 향상도 차트(Lift chart): 모델이 무작위 대비 얼마나 향상됐는지 보는 시각화로, 오탐 감소 지표가 아닙니다.

【더 알아두기】
정밀도↔재현율 트레이드오프: 오탐 줄이기=정밀도↑, 놓침 줄이기=재현율↑. 검토 부담(오탐) 문제는 정밀도를 중시합니다.`,
  },
  176: {
    explanation:
`【핵심 개념 — 출처 제공으로 신뢰 향상(투명성)】
AI 답변에 근거가 된 원본 자료(제품 매뉴얼) 링크를 함께 제공하면, 사용자가 출처를 직접 확인할 수 있어 신뢰가 높아집니다. 이는 책임 AI의 투명성 원칙에 부합하고 환각 검증에도 도움이 됩니다.

【정답이 B인 이유】
제품 매뉴얼 링크를 답변에 포함하면 사용자가 정보 출처를 확인할 수 있어 신뢰도가 직접적으로 올라갑니다.

【오답 분석】
• A 신뢰도 점수 표시: 숫자만으로는 근거를 확인할 수 없어 신뢰 향상 효과가 제한적입니다.
• C 컴퓨터 같은 아바타 디자인: 외형 요소로, 정보의 신뢰성과 무관합니다.
• D 회사 어조 모방: 말투를 맞추는 것일 뿐, 답변의 사실적 신뢰를 보장하지 않습니다.

【더 알아두기】
신뢰·투명성 강화: 출처 인용(citation), 근거 표시, RAG로 근거 기반 응답. 'AI 신뢰 = 출처·근거 제시'를 기억하세요.`,
  },
  177: {
    explanation:
`【핵심 개념 — 설명가능성(Explainability)】
설명가능성은 AI가 '왜 그런 결정을 했는지'를 사람이 이해할 수 있게 하는 인간 중심 AI 원칙입니다. 의료처럼 고위험 분야에서 특히 중요합니다.

【정답이 A인 이유】
치료 추천과 함께 '설명'을 제공하는 것은 결정 근거를 이해 가능하게 하는 설명가능성 원칙의 적용입니다.

【오답 분석】
• B 개인정보·보안: 데이터 보호 원칙으로, 결정 근거 설명과 다릅니다.
• C 공정성: 차별 방지 원칙으로, '설명 제공'과 초점이 다릅니다.
• D 데이터 거버넌스: 데이터 관리·정책 체계로, 결정 설명 자체가 아닙니다.

【더 알아두기】
설명가능성 도구: SageMaker Clarify(피처 기여도), PDP/SHAP. 의료·금융 등 고위험 결정에서 필수 원칙입니다.`,
  },
  178: {
    explanation:
`【핵심 개념 — RAG의 핵심 장점】
RAG는 외부 지식 저장소에서 관련 정보를 검색해 LLM 응답에 반영합니다. 모델을 키우거나 재학습하지 않고도 최신·도메인 지식을 활용해 답변 품질을 높입니다.

【정답이 A인 이유】
RAG의 대표 장점은 '외부 지식을 활용해 더 정확하고 최신성 있는 답변'을 만든다는 점입니다.

【오답 분석】
• B 모델 학습 속도 향상: RAG는 학습 가속 기법이 아닙니다(추론 시 검색을 결합).
• C 음성 인식용: RAG는 음성 인식(STT) 기술이 아닙니다.
• D 비전 데이터 증강용: RAG는 이미지 데이터 증강 기법이 아닙니다.

【더 알아두기】
RAG 이점: 최신성, 도메인 지식 반영, 환각 감소, 재학습 불필요(저비용). 출처 제시로 신뢰도도 높입니다.`,
  },
  179: {
    explanation:
`【핵심 개념 — 파인튜닝 모델 배포 = Provisioned Throughput】
Amazon Bedrock에서 '커스텀(파인튜닝) 모델'을 서빙하려면 Provisioned Throughput이 필요합니다. 또한 트래픽이 안정적·예측 가능하면 On-Demand보다 단가가 낮아 비용 효율적입니다.

【정답이 D인 이유】
파인튜닝 모델을 안정적 트래픽으로 비용 효율적으로 배포하려면, 커스텀 모델 서빙에 필요한 Bedrock Provisioned Throughput이 정답입니다.

【오답 분석】
• A Amazon EC2: 인프라를 직접 관리해야 해 운영 부담이 크고, Bedrock 커스텀 모델 서빙 방식이 아닙니다.
• B Bedrock On-Demand: 기본 제공 모델용 종량제로, 파인튜닝(커스텀) 모델 서빙에는 사용할 수 없습니다.
• C S3 + Lambda: 정적 파일 + 경량 함수 조합으로, FM 추론 서빙에 적합하지 않습니다.

【더 알아두기】
Bedrock 커스텀 모델 = Provisioned Throughput 필요. 안정·대규모 트래픽에서 예약 처리량이 비용 효율적입니다.`,
  },
  180: {
    explanation:
`【핵심 개념 — 파인튜닝(Fine-tuning)으로 도메인 적응】
파인튜닝은 라벨된 도메인 데이터로 사전학습 모델을 추가 학습해, 산업·전문 용어와 작업에 맞게 적응시키는 방법입니다.

【정답이 B인 이유】
'라벨 데이터로 산업 특화 용어에 모델을 적응'시키는 방법은 파인튜닝입니다(지도학습 기반).

【오답 분석】
• A 데이터 증강: 데이터 양·다양성을 늘리는 전처리 기법으로, 그 자체가 도메인 적응 학습은 아닙니다.
• C 모델 양자화(Quantization): 모델을 경량화해 추론 효율을 높이는 기법으로, 용어 적응과 무관합니다.
• D 지속적 사전학습: '라벨 없는' 대량 도메인 데이터로 추가 사전학습하는 방법으로, 본 문항의 '라벨 데이터' 조건과 다릅니다.

【더 알아두기】
라벨 데이터 적응=파인튜닝, 라벨 없는 도메인 데이터 적응=지속 사전학습, 경량화=양자화. 조건의 '라벨'이 분기점입니다.`,
  },
  181: {
    englishQuestion:
'A company is building an agent for its application by using Amazon Bedrock Agents. The agent works well, but the company wants to improve its accuracy by providing specific examples. Which solution meets this requirement?',
    explanation:
`【핵심 개념 — Bedrock Agents의 고급 프롬프트(Advanced Prompts)】
Bedrock Agents는 각 처리 단계에 사용되는 프롬프트 템플릿(advanced prompts)을 사용자가 수정할 수 있습니다. 여기에 구체적 예시를 넣으면(예: Few-shot), 에이전트의 응답 정확도를 높일 수 있습니다.

【정답이 A인 이유】
예시를 제공해 에이전트 정확도를 개선하려면, 에이전트의 고급 프롬프트 템플릿을 수정해 예시를 포함시키는 것이 직접적인 방법입니다.

【오답 분석】
• B 가드레일에 예시 포함: 가드레일은 안전성·적절성을 제어하는 기능으로, 정확도 향상을 위한 예시 주입 용도가 아닙니다.
• C Ground Truth로 예시 라벨링: 데이터 라벨링 도구로, 에이전트의 프롬프트 개선과 직접 관련이 없습니다.
• D Lambda로 학습 데이터셋에 예시 추가: 데이터셋 수정은 즉시 반영되는 프롬프트 개선과 다르고, 에이전트 정확도 개선의 직접 수단이 아닙니다.

【더 알아두기】
에이전트 정확도 개선: 고급 프롬프트에 예시·지시 추가(프롬프트 엔지니어링), 지식 베이스 보강(RAG). 안전성은 가드레일로 분리합니다.`,
  },
  182: {
    englishQuestion:
'In machine learning operations (MLOps), what is a benefit of managing infrastructure as code (IaC)?',
    explanation:
`【핵심 개념 — IaC(Infrastructure as Code)】
IaC는 인프라를 코드(템플릿)로 선언해 자동·반복 가능하게 프로비저닝합니다. MLOps에서 학습·배포 환경을 일관되고 확장 가능하게 구성·재현할 수 있습니다.

【정답이 C인 이유】
IaC의 이점은 클라우드에서 확장 가능하고 일관된 ML 워크로드 배포를 간소화한다는 점입니다. 환경을 코드로 버전 관리·재현할 수 있습니다.

【오답 분석】
• A 하이퍼파라미터 튜닝 필요성 제거: IaC는 인프라 자동화일 뿐, 모델 튜닝과 무관합니다(잘못된 주장).
• B 항상 강력한 인스턴스 제공: IaC는 어떤 인스턴스든 '지정'할 뿐, 항상 고성능을 보장하지 않습니다.
• D 저가 인스턴스만 배포해 비용 최소화: IaC가 인스턴스 종류를 저가로 강제하지 않습니다(잘못된 주장).

【더 알아두기】
IaC 도구: AWS CloudFormation, CDK, Terraform. 일관성·재현성·자동화가 핵심 가치입니다.`,
  },
  183: {
    englishQuestion:
'A company wants to instruction fine-tune a foundation model (FM) to answer questions about a specific domain. How should the company prepare the training data?',
    explanation:
`【핵심 개념 — Instruction 파인튜닝용 Q&A 쌍】
질문에 답하도록 instruction 기반으로 파인튜닝하려면, '질문(instruction)–정답(응답)' 쌍 형태의 라벨 데이터를 준비해야 합니다. 모델이 도메인 질문에 맞는 답을 내도록 학습합니다.

【정답이 C인 이유】
도메인 관련 질문과 정답으로 이루어진 질문-답변 쌍을 만들어야, instruction 파인튜닝으로 모델이 해당 도메인 질문에 정확히 답하게 됩니다.

【오답 분석】
• A 문서를 단일 파일로 병합: 라벨(질문-답변) 구조가 없는 원시 텍스트라, instruction 파인튜닝 형식에 부적합합니다(지속 사전학습에 가까움).
• B 외부 리뷰 수집 + 긍정/부정 라벨링: 감정 분류용 데이터로, Q&A 파인튜닝과 무관합니다.
• D Few-shot 프롬프트 생성: 학습이 아니라 '프롬프트' 기법으로, 파인튜닝 데이터 준비가 아닙니다.

【더 알아두기】
파인튜닝 데이터 형식: instruction/입력 + 기대 출력 쌍(JSONL). 라벨 없는 도메인 텍스트는 지속 사전학습에 사용합니다.`,
  },
  184: {
    englishQuestion:
'Which machine learning technique helps ensure data compliance and privacy by training models on decentralized data without moving the raw data to a central location?',
    explanation:
`【핵심 개념 — 연합학습(Federated Learning)】
연합학습은 데이터를 한곳에 모으지 않고, 데이터가 있는 각 위치에서 모델을 학습한 뒤 '모델 업데이트'만 공유·집계합니다. 원본 데이터가 이동하지 않아 프라이버시·규정 준수에 유리합니다.

【정답이 C인 이유】
원본 데이터를 중앙으로 옮기지 않고 분산된 채 학습해 프라이버시·준수를 지키는 기법은 연합학습입니다.

【오답 분석】
• A 강화학습: 보상 기반 행동 최적화 기법으로, 데이터 프라이버시 보장 기법이 아닙니다.
• B 전이학습: 기존 모델 지식을 재활용하는 전략으로, 데이터 분산·프라이버시와 무관합니다.
• D 비지도학습: 라벨 없는 데이터의 패턴을 찾는 학습 방식으로, 프라이버시 보장 기법이 아닙니다.

【더 알아두기】
프라이버시 보존 ML: 연합학습, 차등 프라이버시(differential privacy), 암호화 연산. '데이터 안 옮기고 학습 = 연합학습'.`,
  },
  186: {
    englishQuestion:
'A manufacturing company runs an application that collects public consumer complaints and processes them with complex hardcoded logic. The company wants to scale this across markets and product lines. What benefit does a generative AI model provide in this scenario?',
    explanation:
`【핵심 개념 — 생성형 AI의 적응성(Adaptability)】
하드코딩된 규칙은 새로운 시장·제품·표현이 등장할 때마다 일일이 코드를 고쳐야 합니다. 생성형 AI는 다양한 입력과 맥락에 유연하게 적응해, 명시적 규칙 없이도 폭넓은 상황을 처리합니다.

【정답이 B인 이유】
복잡한 하드코딩 로직을 여러 시장·제품 라인으로 확장할 때, 생성형 AI의 핵심 이점은 다양한 입력에 유연하게 대응하는 '적응성'입니다.

【오답 분석】
• A 출력의 예측 가능성: 생성형 AI는 오히려 확률적이라 출력이 늘 동일하지 않습니다(장점으로 보기 어려움).
• C 입력 변화에 덜 민감함: 생성형 AI는 입력(프롬프트) 변화에 민감하게 반응하므로 사실과 다릅니다.
• D 설명가능성: 생성형 AI(특히 대형 모델)는 내부가 불투명해 설명가능성이 강점이 아닙니다.

【더 알아두기】
하드코딩 규칙(경직·확장 어려움) ↔ 생성형 AI(유연·적응적). 다양한 시장·표현 확장에는 적응성이 핵심 가치입니다.`,
  },
  187: {
    choices: [
      { key: 'A', enText: 'Regression', koText: '회귀(Regression)' },
      { key: 'B', enText: 'Diffusion', koText: '확산(Diffusion)' },
      { key: 'C', enText: 'Binary classification', koText: '이진 분류(Binary classification)' },
      { key: 'D', enText: 'Multi-class classification', koText: '다중 클래스 분류(Multi-class classification)' },
    ],
    explanation:
`【핵심 개념 — 이진 분류(Binary Classification)】
이진 분류는 데이터를 정확히 두 범주 중 하나로 나누는 지도학습 작업입니다. 정답이 '둘 중 하나(예/아니오)'일 때 사용합니다.

【정답이 C인 이유】
신용카드 거래를 '사기(Fraudulent)' 또는 '정상(Non-fraudulent)' 두 범주로 구분하는 것은 전형적인 이진 분류 문제입니다.

【오답 분석】
• A 회귀(Regression): 연속된 '숫자'를 예측하는 작업으로, 두 범주 분류와 다릅니다.
• B 확산(Diffusion): 이미지 등을 생성하는 생성 모델 기법으로, 분류가 아닙니다.
• D 다중 클래스 분류: 3개 이상의 범주 중 하나로 나눌 때 쓰며, 범주가 2개(사기/정상)인 이 문제에는 이진 분류가 맞습니다.

【더 알아두기】
분류 유형: 이진(2범주), 다중 클래스(3+범주, 하나 선택), 다중 라벨(여러 범주 동시). 사기/정상 = 이진 분류.`,
  },
  189: {
    englishQuestion:
'A hospital wants to adopt a generative AI solution with speech-to-text capability to help clinical staff document patient notes. Which AWS service is most appropriate?',
    explanation:
`【핵심 개념 — AWS HealthScribe】
AWS HealthScribe는 의료 대화를 음성 인식(speech-to-text)으로 받아쓰고, 생성형 AI로 임상 노트를 자동 요약·구조화하는 의료 특화 서비스입니다(HIPAA 적격).

【정답이 D인 이유】
임상 기록 작성을 돕는 '음성-텍스트 + 생성형 AI' 솔루션이 필요하므로, 의료 문서화에 특화된 AWS HealthScribe가 정답입니다.

【오답 분석】
• A Amazon Q Developer: 개발 보조 AI 어시스턴트로, 임상 문서화와 무관합니다.
• B Amazon Polly: 텍스트를 음성으로 바꾸는(TTS) 서비스로, 방향이 반대(음성→텍스트가 필요)입니다.
• C Amazon Rekognition: 이미지·영상 분석 서비스로, 음성 받아쓰기와 다릅니다.

【더 알아두기】
의료 음성 문서화 = HealthScribe(STT + 생성형 요약). 일반 받아쓰기는 Transcribe, 의료 텍스트 개체 추출은 Comprehend Medical입니다.`,
  },
};
