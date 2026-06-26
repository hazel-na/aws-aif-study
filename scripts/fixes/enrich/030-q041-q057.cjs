/* 해설 보강 + 누락 문제문 복원 — Q41~Q57. (Q40,45는 struct에서 처리) */
module.exports = {
  41: {
    explanation:
`【핵심 개념 — 에폭(Epoch)과 정확도】
에폭은 전체 학습 데이터를 한 번 완전히 학습하는 단위입니다. 에폭 수를 늘리면 모델이 같은 데이터에서 패턴을 더 여러 번 반복 학습해 정확도가 올라갈 수 있습니다.

【정답이 B인 이유】
"정확도를 특정 수준까지 높이고 싶다"는 요구에는 학습 반복(에폭)을 늘려 모델이 데이터 패턴을 더 충분히 학습하게 하는 것이 직접적인 방법입니다.

【오답 분석】
• A 배치 크기 감소: 한 번에 처리하는 데이터 묶음을 줄이는 것으로, 학습 안정성/속도에 영향을 줄 뿐 정확도 향상을 보장하지 않습니다.
• C 에폭 감소: 학습 반복을 줄이면 오히려 충분히 학습하지 못해(과소적합) 정확도가 낮아집니다.
• D Temperature 증가: 추론 시 출력 다양성을 키우는 값으로, 학습 단계의 정확도와 무관합니다.

【더 알아두기】
주의: 에폭을 너무 늘리면 과적합(Overfitting)이 생겨 검증 성능이 떨어집니다. Early stopping·검증셋 모니터링으로 적정 에폭을 찾습니다.`,
  },
  42: {
    explanation:
`【핵심 개념 — AI 효과는 '비즈니스 지표'로 평가】
AI 도입 효과는 기술 지표가 아니라, 해결하려던 '비즈니스 목표'의 변화로 측정해야 합니다. 콜센터 직원의 작업을 줄이는 것이 목표라면, 그 결과로 나타나는 운영 지표를 봐야 합니다.

【정답이 B인 이유】
챗봇이 고객 질문에 직접 답해 직원 개입을 줄이면, 통화당 처리 시간이 짧아집니다. 따라서 '평균 통화 시간(Average call duration)' 감소가 챗봇 효과를 가장 직접적으로 보여주는 지표입니다.

【오답 분석】
• A 웹사이트 참여율: 마케팅/웹 트래픽 지표로, 콜센터 업무 감소와 직접 연결되지 않습니다.
• C 기업의 사회적 책임(CSR): 윤리·사회공헌 영역으로, 챗봇 효율 측정과 무관합니다.
• D 규제 준수: 법규 준수 여부로, 작업량 감소 효과를 측정하는 지표가 아닙니다.

【더 알아두기】
AIF 시험 빈출: 'AI 효과 평가 = 관련 비즈니스 KPI'. 목표(직원 작업 감소)에 직접 연결되는 운영 지표를 고르세요.`,
  },
  43: {
    explanation:
`【핵심 개념 — SageMaker Clarify의 역할】
SageMaker Clarify는 ①데이터 준비·학습 단계에서 편향(bias)을 탐지하고 ②모델 예측의 설명가능성(피처 기여도)을 제공합니다. 책임 있는 AI의 핵심 도구입니다.

【정답이 D인 이유】
'데이터 준비 단계에서 잠재적 편향을 식별'하는 것은 Clarify의 대표 기능입니다. 학습 전에 데이터 불균형·편향을 진단해 공정성을 높입니다.

【오답 분석】
• A RAG 워크플로 통합: 외부 지식 검색 결합 기능으로, Clarify의 역할이 아닙니다(Bedrock Knowledge Bases 영역).
• B 운영 모델 품질 모니터링: 이는 SageMaker Model Monitor의 기능입니다(데이터 드리프트 등).
• C 모델 중요 정보 문서화: 이는 SageMaker Model Cards의 기능입니다.

【더 알아두기】
혼동 주의: Clarify(편향·설명가능성), Model Monitor(운영 드리프트), Model Cards(문서화), Feature Store(피처 공유). 각각의 1줄 정의를 구분하세요.`,
  },
  44: {
    explanation:
`【핵심 개념 — 과적합(Overfitting)】
학습 데이터에서는 성능이 좋은데 실제(운영) 데이터에서 성능이 급락하면 과적합을 의심합니다. 모델이 학습 데이터의 세부·잡음까지 외워버려 새로운 데이터에 일반화하지 못하는 현상입니다.

【정답이 C인 이유】
과적합 완화의 대표적 방법은 더 많고 다양한 학습 데이터를 제공하는 것입니다. 데이터가 풍부해지면 모델이 특정 샘플을 외우기보다 일반적 패턴을 학습해 일반화 성능이 좋아집니다.

【오답 분석】
• A 학습 데이터 양 줄이기: 데이터를 줄이면 과적합이 더 심해져 정반대 효과가 납니다.
• B 하이퍼파라미터 추가: '하이퍼파라미터를 추가'한다는 표현 자체가 모호하며, 과적합의 근본 해결책이 아닙니다(오히려 모델 복잡도를 키우면 악화 가능).
• D 학습 시간 늘리기: 같은 데이터를 더 오래 학습하면 과적합이 더 심해질 수 있습니다.

【더 알아두기】
과적합 대응: 데이터 추가/증강, 정규화(L1/L2·dropout), 모델 단순화, 교차검증, Early stopping. 반대로 과소적합(둘 다 성능 낮음)은 모델 복잡도/학습을 늘려 해결합니다.`,
  },
  46: {
    englishQuestion:
'A company wants to build a chatbot that answers employee questions by using information contained in many internal PDF documents. The company wants the most cost-effective solution that keeps the answers grounded in the PDF content. Which solution will meet these requirements?',
    koreanQuestion:
'한 회사가 다수의 내부 PDF 문서에 담긴 정보를 활용해 직원 질문에 답하는 챗봇을 만들려고 합니다. 답변이 PDF 내용에 근거하도록 하면서 가장 비용 효율적인 솔루션을 원합니다. 어떤 솔루션이 요구사항을 충족합니까?',
    explanation:
`【핵심 개념 — RAG와 Bedrock 지식 베이스】
많은 문서를 근거로 답하게 하려면, 모델을 재학습하지 않고 질문할 때마다 관련 문서를 검색해 주입하는 RAG가 비용 효율적입니다. Amazon Bedrock Knowledge Base가 이를 관리형으로 제공합니다.

【정답이 D인 이유】
PDF들을 Bedrock 지식 베이스에 업로드하면, 자동으로 임베딩·벡터 저장되고 사용자 질문 시 관련 구절을 검색해 답변 근거로 제공합니다. 재학습이 없어 비용이 낮고, 문서가 늘어도 손쉽게 확장됩니다.

【오답 분석】
• A 단일 PDF만 프롬프트 컨텍스트로 추가: 한 문서만 참고하므로 정보가 제한적이라 요구를 충족하지 못합니다.
• B 모든 PDF를 매 프롬프트에 추가: 토큰이 폭증해 컨텍스트 한도를 넘고 비용·지연이 급증합니다(비효율).
• C 모든 PDF로 모델 파인튜닝: 학습 비용·시간이 크고, 문서가 바뀔 때마다 재학습이 필요해 비용 효율과 거리가 멉니다.
• E 해당 없음: 명확한 정답(D)이 있으므로 부적절합니다.

【더 알아두기】
'다수 문서 근거 + 비용 효율 + 최신성' = RAG(지식 베이스). 파인튜닝은 스타일/형식 내재화에 적합하고, 지식 추가에는 RAG가 우선입니다.`,
  },
  47: {
    englishQuestion:
'A company needs to evaluate the performance of a content moderation model with the least administrative effort. Which type of data should the company use for the evaluation?',
    koreanQuestion:
'한 회사가 최소한의 관리 부담으로 콘텐츠 모더레이션 모델의 성능을 평가하려고 합니다. 평가에 어떤 유형의 데이터를 사용해야 합니까?',
    explanation:
`【핵심 개념 — 벤치마크 데이터셋(Benchmark Dataset)】
벤치마크 데이터셋은 정답(라벨)이 이미 검증되어 공개된 표준 평가용 데이터입니다. 별도 라벨링·전처리 없이 바로 모델 성능을 객관적으로 측정할 수 있어 관리 부담이 가장 적습니다.

【정답이 D인 이유】
"최소한의 관리 부담으로 평가"라는 조건에는, 이미 라벨이 검증된 벤치마크 데이터셋을 쓰는 것이 가장 효율적입니다. 평가를 자동화하고 결과를 재현·비교하기 쉽습니다.

【오답 분석】
• A 사용자 생성 콘텐츠: 라벨이 없어 직접 정제·라벨링해야 하므로 관리 부담이 큽니다.
• B 모더레이션 로그: 운영 기록일 뿐 균형 잡힌 평가셋이 아니며, 편향·결측이 많아 분석이 어렵습니다.
• C 콘텐츠 모더레이션 가이드라인: '데이터'가 아니라 정책 문서이므로 모델 성능을 측정할 수 없습니다.
• E 해당 없음: 정답(D)이 명확하므로 부적절합니다.

【더 알아두기】
모델 평가 시 '라벨이 검증된 표준 데이터셋(벤치마크)'을 쓰면 객관성·재현성·효율이 모두 좋습니다.`,
  },
  48: {
    englishQuestion:
'A company uses a foundation model to generate marketing content. The company wants the generated content to follow the company\'s brand tone with the least effort and without changing the model. What should the company do?',
    koreanQuestion:
'한 회사가 파운데이션 모델로 마케팅 콘텐츠를 생성합니다. 모델을 변경하지 않고 최소한의 노력으로 생성 콘텐츠가 회사 브랜드 톤을 따르게 하려면 어떻게 해야 합니까?',
    explanation:
`【핵심 개념 — 프롬프트로 브랜드 톤 맞추기】
모델 구조나 데이터를 바꾸지 않고 출력의 어조·스타일을 회사 브랜드에 맞추는 가장 간단한 방법은 명확한 지시와 맥락을 담은 프롬프트를 설계하는 것입니다.

【정답이 C인 이유】
브랜드 톤·예시·규칙을 담은 효과적인 프롬프트를 작성하면, 재학습 없이 즉시 원하는 톤의 콘텐츠를 얻을 수 있어 노력·비용이 가장 적습니다.

【오답 분석】
• A 아키텍처·하이퍼파라미터 최적화: 모델 성능 일반을 손보는 큰 작업으로, '브랜드 톤'이라는 출력 스타일과 직접 연결되지 않고 노력도 큽니다.
• B 레이어 추가로 복잡도 증가: 모델 구조 변경은 비용·위험이 크고 톤 제어와 무관합니다.
• D 새 모델 사전학습: 처음부터 학습하는 것은 시간·비용이 가장 큰 접근으로 '최소 노력'과 정반대입니다.
• E 해당 없음: 정답(C)이 명확하므로 부적절합니다.

【더 알아두기】
출력의 톤·형식·스타일 = 프롬프트 엔지니어링(가장 저비용). 더 강한 내재화가 필요하면 파인튜닝을 고려합니다.`,
  },
  49: {
    englishQuestion:
'A company wants to reduce bias in its ML model. Which action helps the company detect bias in the training data?',
    koreanQuestion:
'한 회사가 ML 모델의 편향을 줄이려고 합니다. 학습 데이터의 편향을 탐지하는 데 도움이 되는 조치는 무엇입니까?',
    explanation:
`【핵심 개념 — 데이터 편향 탐지】
모델 편향의 출발점은 대개 '치우친 학습 데이터'입니다. 따라서 특정 그룹이 과대/과소 표현되었는지(불균형·격차)를 먼저 데이터에서 탐지해야 합니다.

【정답이 A인 이유】
데이터의 불균형이나 그룹 간 격차(disparities)를 감지하면 편향의 원인을 조기에 찾아 보정(증강·재샘플링)할 수 있습니다. SageMaker Clarify가 이런 편향 지표를 제공합니다.

【오답 분석】
• B 모델 실행 빈도 증가: 자주 실행하는 것과 편향 탐지는 전혀 무관합니다.
• C 모델 동작 평가로 투명성 제공: 설명가능성·투명성 측면에서 가치가 있지만, 문제의 핵심인 '학습 데이터의 편향 탐지'와는 단계가 다릅니다(이쪽은 데이터 편향 자체를 보는 A가 직접적).
• D ROUGE로 정확도 100% 보장: ROUGE는 텍스트 요약 품질 지표이며, 어떤 기법도 정확도 100%를 '보장'할 수 없습니다.
• E 추론 시간 제한 준수: 성능·지연 관리로 편향과 무관합니다.

【더 알아두기】
편향 대응 흐름: 데이터 편향 탐지(Clarify) → 데이터 보정(증강/재샘플링) → 모델 평가·모니터링. '데이터 불균형 = 편향 신호'.`,
  },
  50: {
    englishQuestion:
'A company has a custom model and wants to use the model for on-demand generative AI through Amazon Bedrock. What must the company do to use the custom model in Amazon Bedrock?',
    koreanQuestion:
'한 회사가 커스텀 모델을 Amazon Bedrock에서 생성형 AI 용도로 사용하려고 합니다. Bedrock에서 이 커스텀 모델을 사용하려면 무엇을 해야 합니까?',
    explanation:
`【핵심 개념 — Bedrock에서 커스텀 모델 접근】
Bedrock에서 직접 만든(또는 커스터마이즈한) 모델을 호출하려면, 해당 모델에 대한 접근(사용) 권한을 부여해 활성화해야 합니다.

【정답이 D인 이유】
"Bedrock에서 커스텀 모델에 접근 권한을 부여"하면 비로소 그 모델을 추론에 사용할 수 있습니다. 모델 접근 활성화가 선행 조건입니다.

【오답 분석】
• A Provisioned Throughput 구매: 처리량(용량)을 예약하는 성능/비용 옵션으로, 모델 '사용 가능' 자체의 필수 조건은 아닙니다.
• B SageMaker 엔드포인트 배포: SageMaker 경로로, Bedrock에서 직접 쓰는 방법과 다릅니다.
• C SageMaker Model Registry 등록: 모델 버전 관리용으로, Bedrock 접근 권한 부여와 무관합니다.
• E 해당 없음: 정답(D)이 명확하므로 부적절합니다.

【더 알아두기】
Bedrock은 기반 모델 접근을 '모델 액세스' 설정으로 통제합니다. 대규모·안정 트래픽이면 추가로 Provisioned Throughput을 고려합니다.`,
  },
  51: {
    englishQuestion:
'A company wants to choose the foundation model that best matches its employees\' preferred writing style and tone. How should the company evaluate the candidate models?',
    koreanQuestion:
'한 회사가 직원들이 선호하는 글쓰기 스타일·톤에 가장 잘 맞는 파운데이션 모델을 고르려고 합니다. 후보 모델들을 어떻게 평가해야 합니까?',
    explanation:
`【핵심 개념 — 주관적 품질은 사람 평가로】
'선호하는 스타일/톤'처럼 주관적이고 회사 특화된 품질은 자동 지표로 재기 어렵습니다. 사람이 직접 회사 맥락의 프롬프트로 출력을 비교 평가하는 것이 정확합니다.

【정답이 B인 이유】
인간 평가자(Human workforce)가 회사 맞춤 프롬프트 데이터셋으로 각 모델의 응답을 비교하면, 직원이 선호하는 스타일에 가장 부합하는 모델을 신뢰성 있게 고를 수 있습니다.

【오답 분석】
• A 내장 프롬프트 데이터셋 평가: 일반적 벤치마크는 회사 특화 스타일 선호를 반영하지 못합니다.
• C 공개 모델 리더보드: 범용 성능 순위일 뿐, 우리 회사가 선호하는 톤과는 관련이 적습니다.
• D CloudWatch InvocationLatency: 응답 '속도' 지표로, 글쓰기 스타일 품질과 무관합니다.
• E 해당 없음: 정답(B)이 명확하므로 부적절합니다.

【더 알아두기】
Amazon Bedrock의 모델 평가는 '자동 평가(지표 기반)'와 '인간 평가(주관 품질)'를 모두 지원합니다. 주관적 선호·톤 = 인간 평가가 적합합니다.`,
  },
  52: {
    englishQuestion:
'A company is concerned that its generative AI application might reproduce existing copyrighted material without attribution. Which risk does this scenario describe?',
    koreanQuestion:
'한 회사가 자사 생성형 AI 애플리케이션이 기존 저작물을 출처 표시 없이 그대로 재생산할 수 있다는 점을 우려합니다. 이 시나리오가 설명하는 위험은 무엇입니까?',
    explanation:
`【핵심 개념 — 생성형 AI의 표절/지식재산 위험】
생성형 AI가 학습한 원문을 거의 그대로 출력하면, 타인의 저작물을 무단 복제·도용하는 '표절(Plagiarism)' 및 지식재산권 침해 위험이 생깁니다.

【정답이 C인 이유】
'기존 저작물을 출처 없이 그대로 재생산'하는 것은 정확히 표절(Plagiarism)에 해당합니다. 저작권 침해로 이어질 수 있는 핵심 리스크입니다.

【오답 분석】
• A 유해성(Toxicity): 혐오·폭력 등 부적절한 콘텐츠 생성 위험으로, 저작물 복제와 다릅니다.
• B 환각(Hallucination): 사실이 아닌 내용을 그럴듯하게 지어내는 위험으로, 표절과 구분됩니다.
• D 개인정보(Privacy): 개인 식별정보 노출 위험으로, 저작권 복제와 다릅니다.
• E 해당 없음: 정답(C)이 명확하므로 부적절합니다.

【더 알아두기】
생성형 AI 4대 위험 키워드: 환각(허위), 유해성(부적절), 표절/IP(복제), 프라이버시(개인정보). 시나리오 키워드로 구분하세요.`,
  },
  53: {
    englishQuestion:
'A company wants to train large language models while minimizing energy consumption and environmental impact. Which Amazon EC2 instance type is purpose-built and most energy-efficient for training these models?',
    koreanQuestion:
'한 회사가 에너지 소비와 환경 영향을 최소화하면서 대형 언어 모델을 학습하려고 합니다. 이러한 모델 학습에 특화되어 가장 에너지 효율적인 Amazon EC2 인스턴스 유형은 무엇입니까?',
    explanation:
`【핵심 개념 — AWS Trainium과 Trn 인스턴스】
AWS Trainium 칩을 탑재한 EC2 Trn 인스턴스는 대규모 모델 '학습' 전용으로 설계되어, 동급 GPU 대비 와트당 성능(에너지 효율)이 높고 비용·환경 영향이 적습니다.

【정답이 D인 이유】
대형 언어 모델 학습을 에너지 효율적으로 하려면, 학습 특화 가속기 Trainium을 쓰는 EC2 Trn 시리즈가 가장 적합합니다.

【오답 분석】
• A C 시리즈: 범용/컴퓨팅 최적화 CPU 인스턴스로, 대규모 딥러닝 학습 가속기가 없습니다.
• B G 시리즈: 그래픽·추론용 GPU 인스턴스로, 대규모 학습 전용·최고 효율은 아닙니다.
• C P 시리즈: 고성능 GPU 학습용이지만, 학습 특화 에너지 효율 면에서 Trainium(Trn)이 더 유리합니다.
• E 해당 없음: 정답(D)이 명확하므로 부적절합니다.

【더 알아두기】
AWS 전용 AI 칩: 학습 = Trainium(Trn), 추론 = Inferentia(Inf). '지속가능성/에너지 효율 + 학습' = Trn.`,
  },
  54: {
    englishQuestion:
'A company wants to ensure that its Amazon Bedrock generative AI application produces only safe and appropriate content by filtering harmful inputs and outputs. Which Amazon Bedrock feature should the company use?',
    koreanQuestion:
'한 회사가 유해한 입력·출력을 걸러내어 Amazon Bedrock 생성형 AI 애플리케이션이 안전하고 적절한 콘텐츠만 생성하도록 보장하려고 합니다. 어떤 Bedrock 기능을 사용해야 합니까?',
    explanation:
`【핵심 개념 — Guardrails for Amazon Bedrock】
Guardrails는 생성형 AI의 입력/출력을 정책으로 통제하는 안전장치입니다. 유해 콘텐츠 필터, 거부 주제, 단어 필터, PII 마스킹, 환각 차단(맥락 근거 확인)을 제공합니다.

【정답이 C인 이유】
유해 콘텐츠를 걸러 안전·적절한 응답만 내보내려면, 바로 이런 목적의 기능인 Guardrails for Amazon Bedrock을 사용해야 합니다.

【오답 분석】
• A Amazon Rekognition: 이미지·영상 분석 서비스로, 텍스트 출력의 적절성 통제와 무관합니다.
• B Bedrock Playgrounds: 모델을 실험해 보는 웹 인터페이스로, 안전 정책을 강제하는 기능이 아닙니다.
• D Agents for Amazon Bedrock: 여러 단계 작업을 자동 수행하는 에이전트 기능으로, 콘텐츠 안전 필터가 목적이 아닙니다.
• E 해당 없음: 정답(C)이 명확하므로 부적절합니다.

【더 알아두기】
'유해 출력 차단/안전 정책 = Guardrails'. 책임 있는 AI(안전성) 구현의 핵심 기능입니다.`,
  },
  55: {
    englishQuestion:
'A company needs to generate synthetic data that closely resembles its existing dataset to augment training. Which model type is best suited to generate this realistic synthetic data?',
    koreanQuestion:
'한 회사가 학습 데이터를 보강하기 위해 기존 데이터셋과 매우 유사한 합성 데이터를 생성해야 합니다. 이러한 사실적인 합성 데이터 생성에 가장 적합한 모델 유형은 무엇입니까?',
    explanation:
`【핵심 개념 — GAN(생성적 적대 신경망)】
GAN은 생성기(Generator)와 판별기(Discriminator)가 서로 경쟁하며 학습해, 실제와 구분하기 어려운 사실적인 합성 데이터를 만들어냅니다.

【정답이 A인 이유】
기존 데이터와 닮은 사실적 합성 데이터를 생성하려는 목적에는, 데이터 생성에 특화된 GAN이 가장 적합합니다.

【오답 분석】
• B XGBoost: 결정 트리 기반의 분류·회귀(예측) 알고리즘으로, 새 데이터를 '생성'하지 못합니다.
• C ResNet(잔차 신경망): 이미지 분류용 딥러닝 구조로, 생성 모델이 아닙니다.
• D WaveNet: 음성 합성(오디오 생성)에 특화된 모델로, 범용 합성 데이터 생성용으로는 적합하지 않습니다.
• E 해당 없음: 정답(A)이 명확하므로 부적절합니다.

【더 알아두기】
생성 모델 예: GAN(이미지/합성 데이터), VAE, Diffusion(확산, 고품질 이미지), Transformer/LLM(텍스트). '합성 데이터 생성 = GAN'을 기억하세요.`,
  },
  56: {
    englishQuestion:
'A company\'s business analysts have minimal coding experience and want to build demand forecast predictions from their data with the least amount of coding. Which solution will meet these requirements?',
    koreanQuestion:
'한 회사의 비즈니스 분석가들은 코딩 경험이 거의 없으며, 최소한의 코딩으로 데이터를 활용해 수요 예측을 만들고 싶어 합니다. 어떤 솔루션이 요구사항을 충족합니까?',
    explanation:
`【핵심 개념 — SageMaker Canvas(노코드 ML)】
SageMaker Canvas는 코드 작성 없이 시각적 인터페이스에서 데이터를 선택하고 모델을 만들어 예측(수요 예측 등)을 생성하는 노코드 ML 도구입니다. 비전문가에게 적합합니다.

【정답이 D인 이유】
코딩 경험이 거의 없는 분석가가 수요 예측을 만들려면, 데이터를 선택만 하면 모델을 구축·예측해 주는 SageMaker Canvas가 가장 알맞습니다.

【오답 분석】
• A S3 저장 + SageMaker 내장 알고리즘: 내장 알고리즘을 쓰려면 코드·ML 지식이 필요해 비전문가에게 부적합합니다.
• B Data Wrangler + 내장 알고리즘: Data Wrangler는 데이터 전처리 도구이고 여전히 코딩/알고리즘 지식이 필요합니다.
• C Data Wrangler + Personalize Trending-Now: Amazon Personalize는 추천 시스템 전용으로, 수요 예측과 용도가 다릅니다.
• E 해당 없음: 정답(D)이 명확하므로 부적절합니다.

【더 알아두기】
'코딩 없이/비전문가 + 예측 모델 = SageMaker Canvas'. 수요 예측 전용 서비스로는 Amazon Forecast(현재 SageMaker Canvas로 통합 흐름)도 있습니다.`,
  },
  57: {
    englishQuestion:
'During data collection for an ML model, certain groups were over-represented while others were under-represented, causing the trained model to be biased. Which type of bias does this describe?',
    koreanQuestion:
'ML 모델용 데이터 수집 과정에서 특정 그룹이 과대 대표되고 다른 그룹이 과소 대표되어 학습된 모델에 편향이 생겼습니다. 이는 어떤 유형의 편향을 설명합니까?',
    explanation:
`【핵심 개념 — 샘플링 편향(Sampling Bias)】
샘플링 편향은 데이터를 '수집'하는 단계에서 표본이 전체 모집단을 고르게 대표하지 못해(특정 그룹 과대/과소 표현) 발생하는 편향입니다. 편향된 데이터로 학습하면 모델도 편향됩니다.

【정답이 B인 이유】
"수집 단계에서 특정 그룹이 과대/과소 대표되어 편향이 생겼다"는 설명은 표본 추출의 대표성 문제, 즉 샘플링 편향의 정의 그대로입니다.

【오답 분석】
• A 측정 편향(Measurement bias): 측정 도구·방법의 오류로 값이 체계적으로 왜곡되는 편향으로, 표본 대표성 문제와 다릅니다.
• C 관찰자 편향(Observer bias): 데이터를 기록·해석하는 사람의 주관이 개입해 생기는 편향입니다.
• D 확증 편향(Confirmation bias): 기존 믿음에 부합하는 데이터만 선택·해석하는 편향입니다.
• E 해당 없음: 정답(B)이 명확하므로 부적절합니다.

【더 알아두기】
데이터 편향 유형 구분: 수집 표본의 대표성=샘플링, 측정 오류=측정, 기록자 주관=관찰자, 선택적 확증=확증 편향.`,
  },
};
