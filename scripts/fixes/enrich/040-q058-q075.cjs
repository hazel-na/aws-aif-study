/* 해설 보강 + 누락 문제문 복원 — Q58~Q75. */
module.exports = {
  58: {
    englishQuestion:
'A company wants a customer service chatbot that continuously improves itself based on customer feedback over time. Which ML approach best enables this self-improving behavior?',
    koreanQuestion:
'한 회사가 시간이 지남에 따라 고객 피드백을 바탕으로 스스로 계속 개선되는 고객 서비스 챗봇을 원합니다. 이러한 자기 개선 동작을 가장 잘 가능하게 하는 ML 접근법은 무엇입니까?',
    explanation:
`【핵심 개념 — 강화학습(Reinforcement Learning)】
강화학습은 에이전트가 행동에 대한 '보상(reward)' 신호를 받아 시행착오로 정책을 개선하는 방식입니다. 좋은 결과에 보상을 주면 모델이 점점 더 나은 행동을 학습합니다.

【정답이 B인 이유】
긍정적 고객 피드백을 보상으로 주면, 챗봇이 그 피드백을 극대화하는 방향으로 응답을 스스로 개선합니다. '지속적 자기 개선'이라는 요구에 강화학습이 가장 부합합니다(LLM 정렬의 RLHF도 같은 원리).

【오답 분석】
• A 수동 큐레이션 데이터셋 지도학습: 사람이 만든 고정 데이터로 한 번 학습하는 방식이라, 운영 중 '스스로' 개선되지는 않습니다.
• C 비지도 군집화: 유사 문의를 그룹화할 뿐, 응답 품질을 보상 기반으로 개선하지 못합니다.
• D FAQ 업데이트 기반 지도학습: FAQ를 갱신해 재학습하는 방식으로, 자율적 자기 개선보다는 수동 갱신에 가깝습니다.
• E 해당 없음: 정답(B)이 명확하므로 부적절합니다.

【더 알아두기】
'보상으로 행동을 개선/자기 학습 = 강화학습'. 생성형 AI에서 사람 선호로 모델을 정렬하는 기법이 RLHF입니다.`,
  },
  59: {
    englishQuestion:
'Which tool is used to evaluate the performance of a classification model by showing the counts of true positives, false positives, true negatives, and false negatives?',
    koreanQuestion:
'참 양성, 거짓 양성, 참 음성, 거짓 음성의 개수를 보여주어 분류 모델의 성능을 평가하는 데 사용되는 도구는 무엇입니까?',
    explanation:
`【핵심 개념 — 혼동 행렬(Confusion Matrix)】
혼동 행렬은 분류 모델의 예측을 실제 정답과 교차표로 비교해 TP·FP·TN·FN을 보여줍니다. 여기서 정밀도·재현율·F1 같은 분류 지표를 모두 계산할 수 있습니다.

【정답이 A인 이유】
"TP/FP/TN/FN을 보여 분류 성능을 평가"하는 도구는 정확히 혼동 행렬입니다. 분류 결과의 오류 유형을 한눈에 파악할 수 있습니다.

【오답 분석】
• B 상관 행렬(Correlation matrix): 변수들 간 상관관계를 보는 통계 도구로, 분류 성능 평가용이 아닙니다.
• C R² 점수: 회귀 모델이 분산을 얼마나 설명하는지 보는 회귀 지표입니다.
• D MSE(평균제곱오차): 예측값과 실제값의 차이를 재는 회귀 지표입니다.
• E 해당 없음: 정답(A)이 명확하므로 부적절합니다.

【더 알아두기】
분류 평가는 혼동 행렬에서 출발합니다: 정밀도=TP/(TP+FP), 재현율=TP/(TP+FN), F1=둘의 조화평균. 회귀는 RMSE·MAE·R²를 씁니다.`,
  },
  60: {
    englishQuestion:
'A company\'s generative AI application sometimes produces inappropriate or unsafe images. Which solution best prevents inappropriate content from reaching users in real time?',
    koreanQuestion:
'한 회사의 생성형 AI 애플리케이션이 때때로 부적절하거나 안전하지 않은 이미지를 생성합니다. 부적절한 콘텐츠가 실시간으로 사용자에게 도달하는 것을 가장 잘 방지하는 솔루션은 무엇입니까?',
    explanation:
`【핵심 개념 — 콘텐츠 모더레이션 API】
모더레이션 API는 생성·업로드된 콘텐츠(이미지·텍스트)의 안전성을 실시간으로 검사해 부적절한 항목을 자동 차단합니다. Amazon Rekognition의 콘텐츠 모더레이션, Bedrock Guardrails 등이 해당합니다.

【정답이 A인 이유】
부적절한 콘텐츠를 사용자에게 도달하기 전에 실시간으로 막으려면, 출력 단계에서 안전성을 검사·필터링하는 모더레이션 API를 적용하는 것이 직접적이고 효과적입니다.

【오답 분석】
• B 공개 데이터셋으로 재학습: 재학습만으로 모든 부적절 출력을 완전히 막기 어렵고, 시간·비용이 큽니다.
• C 모델 검증 수행: 배포 전 사후 평가로, 운영 중 실시간 차단을 제공하지 못합니다.
• D 사용자 피드백 자동 통합: 반복 개선에는 도움이 되지만 '즉각 차단'은 하지 못합니다.
• E 해당 없음: 정답(A)이 명확하므로 부적절합니다.

【더 알아두기】
'실시간 부적절 콘텐츠 차단 = 모더레이션 API/Guardrails'. 책임 있는 AI의 안전성(Safety) 통제 수단입니다.`,
  },
  61: {
    englishQuestion:
'A company needs to capture and store the input prompts and output responses of its Amazon Bedrock model for auditing and analysis. What should the company do?',
    koreanQuestion:
'한 회사가 감사 및 분석을 위해 Amazon Bedrock 모델의 입력 프롬프트와 출력 응답을 캡처·저장해야 합니다. 무엇을 해야 합니까?',
    explanation:
`【핵심 개념 — Bedrock 호출 로깅(Invocation Logging)】
Amazon Bedrock의 모델 호출 로깅을 켜면, 모델에 들어간 입력(프롬프트)과 나온 출력(응답) 데이터 자체를 S3/CloudWatch Logs에 기록해 감사·분석할 수 있습니다.

【정답이 B인 이유】
입력·출력 '내용'을 저장하려면 Bedrock의 invocation logging을 활성화해야 합니다. 이는 모델 응답 품질·정책 준수 분석에 필요한 데이터를 남깁니다.

【오답 분석】
• A CloudTrail을 로그 대상으로: CloudTrail은 'API 호출 메타데이터(누가/언제/무엇을 호출)'를 기록할 뿐, 프롬프트·응답 '본문'을 저장하지 않습니다.
• C Audit Manager를 로그 대상으로: 규정 준수 감사 도구로, 모델 입출력 데이터를 캡처하는 로그 저장소가 아닙니다.
• D EventBridge에서 호출 로깅: EventBridge는 이벤트 라우팅/트리거 서비스로, 로그 본문을 저장하는 기능이 아닙니다.
• E 해당 없음: 정답(B)이 명확하므로 부적절합니다.

【더 알아두기】
구분: CloudTrail(API 감사 메타데이터) vs Bedrock invocation logging(프롬프트·응답 본문). '입출력 내용 저장'은 후자입니다.`,
  },
  62: {
    englishQuestion:
'A company needs to run inference on a large dataset (gigabytes) where immediate responses are not required, at the lowest cost. Which Amazon SageMaker inference option is most appropriate?',
    koreanQuestion:
'한 회사가 즉각적인 응답이 필요 없는 대용량 데이터셋(기가바이트 규모)에 대해 가장 낮은 비용으로 추론을 실행해야 합니다. 어떤 Amazon SageMaker 추론 옵션이 가장 적합합니까?',
    explanation:
`【핵심 개념 — 배치 변환(Batch Transform)】
배치 변환은 대량의 데이터를 한꺼번에(오프라인) 추론하는 옵션입니다. 항상 켜진 엔드포인트가 필요 없어 비용이 낮고, 즉시 응답이 필요 없는 작업에 적합합니다.

【정답이 A인 이유】
'대용량 + 즉시 응답 불필요 + 최저 비용' 조건에는 배치 변환이 가장 알맞습니다. 작업이 끝나면 자원을 내려 비용을 아낍니다.

【오답 분석】
• B 실시간 추론: 상시 엔드포인트로 즉시 응답하지만, 대량 일괄 처리에는 비용·효율이 떨어집니다.
• C 서버리스 추론: 간헐적 소규모 요청에 좋지만, GB 단위 대량 배치 처리에는 부적합합니다.
• D 비동기 추론: 큰 페이로드·준실시간 단건 요청에 적합하며, 순수 오프라인 대량 처리의 최저비용 답은 배치 변환입니다.
• E 해당 없음: 정답(A)이 명확하므로 부적절합니다.

【더 알아두기】
선택 기준: 즉시=실시간, 간헐적=서버리스, 큰 단건·준실시간=비동기, 대량 오프라인 최저비용=배치 변환.`,
  },
  63: {
    englishQuestion:
'Which representation captures the semantic meaning of words, sentences, or concepts by encoding them as high-dimensional numeric vectors?',
    koreanQuestion:
'단어, 문장, 개념의 의미를 고차원 숫자 벡터로 인코딩하여 그 의미를 포착하는 표현 방식은 무엇입니까?',
    explanation:
`【핵심 개념 — 임베딩(Embeddings)】
임베딩은 단어·문장·이미지 등을 '의미가 비슷하면 벡터도 가깝게' 배치하는 고차원 숫자 벡터로 변환한 표현입니다. 의미 기반 검색·추천·RAG의 토대가 됩니다.

【정답이 A인 이유】
"의미를 고차원 벡터로 인코딩"하는 것은 임베딩의 정의 그대로입니다. 의미적으로 유사한 항목이 벡터 공간에서 가까이 모입니다.

【오답 분석】
• B 토큰(Tokens): 텍스트를 모델이 처리하는 작은 단위(단어 조각)로 '쪼갠' 것일 뿐, 의미를 담은 수치 벡터 자체는 아닙니다.
• C 모델(Models): 학습된 알고리즘 전체를 가리키며, 데이터의 수치 표현이 아닙니다.
• D 바이너리(Binaries): 컴퓨터가 처리하는 이진 파일 형식으로, 의미 표현과 무관합니다.
• E 해당 없음: 정답(A)이 명확하므로 부적절합니다.

【더 알아두기】
처리 순서 감각: 텍스트 → 토큰화(쪼개기) → 임베딩(의미 벡터화) → 모델 연산. 벡터 검색의 핵심이 임베딩입니다.`,
  },
  64: {
    englishQuestion:
'A company uses a foundation model to answer questions about scientific research papers that contain complex domain-specific terminology. The FM struggles with the specialized terms. Which approach will best improve the model\'s performance on this domain?',
    koreanQuestion:
'한 회사가 복잡한 도메인 전문 용어가 가득한 과학 연구 논문에 대한 질문에 답하기 위해 파운데이션 모델을 사용합니다. FM이 전문 용어를 잘 처리하지 못합니다. 이 도메인에서 모델 성능을 가장 잘 향상시키는 접근법은 무엇입니까?',
    explanation:
`【핵심 개념 — 도메인 적응 파인튜닝(Domain Adaptation Fine-tuning)】
일반 목적의 FM은 특정 전문 분야(의학·법률·과학)의 용어·문맥에 약할 수 있습니다. 도메인 데이터로 파인튜닝하면 모델이 그 분야의 전문 용어와 표현을 더 잘 이해하게 됩니다.

【정답이 B인 이유】
복잡한 과학 용어를 근본적으로 더 잘 다루게 하려면, 해당 도메인 데이터로 모델을 파인튜닝(도메인 적응)해 전문 지식을 모델에 내재화하는 것이 가장 효과적입니다.

【오답 분석】
• A Few-shot 프롬프팅: 예시 몇 개로 도움은 되지만, 깊은 전문 용어 이해의 근본적 한계를 해결하기 어렵습니다.
• C 추론 파라미터 변경: temperature 등 출력 다양성만 조절할 뿐, 용어 이해 능력을 키우지 못합니다.
• D 복잡한 용어 제거: 데이터에서 핵심 전문 용어를 빼면 정보가 손실되어 오히려 답변 품질이 떨어집니다.
• E 해당 없음: 정답(B)이 명확하므로 부적절합니다.

【더 알아두기】
도메인 지식 강화: 라벨 데이터로 파인튜닝(도메인 적응) 또는 대량 도메인 텍스트로 지속 사전학습. 최신 사실 보강이 목적이면 RAG를 병행합니다.`,
  },
  65: {
    englishQuestion:
'A company wants its foundation model to produce more consistent and deterministic responses with less randomness. Which adjustment should the company make?',
    koreanQuestion:
'한 회사가 파운데이션 모델이 무작위성을 줄이고 더 일관되고 결정적인 응답을 생성하기를 원합니다. 어떤 조정을 해야 합니까?',
    explanation:
`【핵심 개념 — Temperature와 출력 일관성】
Temperature는 다음 토큰 선택의 무작위성을 조절합니다. 값이 낮을수록 확률이 높은 토큰을 선택해 일관되고 결정적인 출력이, 높을수록 다양하고 창의적인 출력이 나옵니다.

【정답이 A인 이유】
더 일관되고 결정적인 응답을 원하면 temperature를 낮춰야 합니다. 낮은 temperature는 모델이 가장 확률 높은 답을 안정적으로 선택하게 합니다.

【오답 분석】
• B Temperature 증가: 오히려 무작위성·다양성을 키워 일관성이 떨어집니다(요구와 반대).
• C 출력 토큰 길이 감소: 응답 '길이'만 줄일 뿐, 일관성(무작위성)과는 직접 관련이 없습니다.
• D 최대 생성 길이 증가: 더 길게 생성할 뿐 일관성과 무관합니다.
• E 해당 없음: 정답(A)이 명확하므로 부적절합니다.

【더 알아두기】
출력 다양성 제어: temperature, Top-K, Top-P(누클리어스 샘플링). 사실 기반·일관성 중시 = 낮은 temperature, 창작·브레인스토밍 = 높은 temperature.`,
  },
  66: {
    englishQuestion:
'A company has multiple teams that use Amazon Bedrock. Each team must access only its own customer data folder in Amazon S3, following the principle of least privilege, while keeping management simple. Which approach best meets these requirements?',
    koreanQuestion:
'한 회사에 Amazon Bedrock을 사용하는 여러 팀이 있습니다. 각 팀은 최소 권한 원칙에 따라 Amazon S3에서 자기 팀의 고객 데이터 폴더에만 접근해야 하며, 관리도 단순해야 합니다. 어떤 접근법이 요구사항을 가장 잘 충족합니까?',
    explanation:
`【핵심 개념 — 최소 권한 + 역할 분리】
공통 작업(Bedrock 모델 호출)은 하나의 서비스 역할로 처리하되, 데이터 접근은 팀별 IAM 역할로 각자의 폴더만 허용하면 최소 권한을 지키면서 관리도 단순해집니다.

【정답이 D인 이유】
Bedrock 역할 하나(모델 사용 + 전체 S3 접근 능력)를 두고, 각 팀에는 자기 폴더(prefix)만 허용하는 IAM 역할을 부여하면, 팀별로 자기 데이터에만 접근하게 통제하면서 역할 관리를 단순화할 수 있습니다.

【오답 분석】
• A 팀마다 Bedrock 맞춤 역할 생성: 역할이 많아져 관리가 복잡해지고 확장성이 떨어집니다.
• B 단일 역할 + 요청마다 고객명 지정: 호출자가 매번 대상을 지정하는 방식은 실수·우회로 인한 보안 취약점이 생깁니다.
• C S3 개인정보 삭제 후 접근 허용: 불필요하게 데이터를 가공·삭제하게 되고, 폴더별 접근 통제라는 핵심 요구를 직접 충족하지 못합니다.
• E 해당 없음: 정답(D)이 명확하므로 부적절합니다.

【더 알아두기】
IAM 모범사례: 최소 권한, 역할 기반 접근, 리소스 수준(폴더/prefix) 권한. 공통 기능과 데이터 접근 권한을 분리하면 확장성과 보안이 좋아집니다.`,
  },
  67: {
    koreanQuestion:
'한 의료 회사가 Amazon Bedrock에 질병 감지 모델을 배포했습니다. 개인정보 보호 정책을 준수하기 위해 모델 응답에 환자 개인정보가 포함되지 않도록 해야 합니다. 어떤 솔루션이 요구사항을 충족합니까?',
    explanation:
`【핵심 개념 — Guardrails로 민감정보 차단 + CloudWatch 알림】
Amazon Bedrock Guardrails는 모델 입력·출력에서 개인정보(PII) 등 민감 내용을 탐지·마스킹·차단합니다. 정책 위반 발생 시 CloudWatch 경보로 알림을 받을 수 있습니다.

【정답이 C인 이유】
응답에 환자 개인정보가 포함되지 않게 하려면, 출력 콘텐츠를 실시간 필터링하는 Guardrails를 적용하고, 위반 시 CloudWatch 알람으로 모니터링하는 구성이 가장 적합합니다.

【오답 분석】
• A Amazon Macie: S3에 저장된 데이터의 민감정보를 스캔하는 서비스로, 모델의 '실시간 출력'을 필터링하지는 못합니다.
• B AWS CloudTrail: API 호출 기록(감사)용으로, 응답 본문의 개인정보를 실시간으로 걸러내지 못합니다.
• D SageMaker Model Monitor: 데이터 드리프트·품질 저하를 감지하는 도구로, 개인정보 필터링이 목적이 아닙니다.

【더 알아두기】
'생성 응답의 PII/민감정보 차단 = Bedrock Guardrails(민감정보 필터)'. 데이터 저장소 PII 탐지는 Macie로 역할이 다릅니다.`,
  },
  68: {
    englishQuestion:
'A company needs to automatically extract text and structured data from scanned PDF documents, forms, and images. Which AWS service should the company use?',
    koreanQuestion:
'한 회사가 스캔된 PDF 문서, 양식, 이미지에서 텍스트와 구조화된 데이터를 자동으로 추출해야 합니다. 어떤 AWS 서비스를 사용해야 합니까?',
    explanation:
`【핵심 개념 — Amazon Textract(문서 OCR)】
Amazon Textract는 스캔 문서·이미지·양식에서 단순 텍스트뿐 아니라 표·키-값(폼 필드)까지 구조화해 추출하는 OCR 기반 AI 서비스입니다.

【정답이 A인 이유】
PDF·이미지·양식에서 텍스트와 구조화된 데이터를 추출하려는 요구에는 문서 추출 전용 서비스인 Amazon Textract가 정확히 맞습니다.

【오답 분석】
• B Amazon Personalize: 개인화 추천 시스템 서비스로, 문서 추출과 무관합니다.
• C Amazon Lex: 챗봇/음성봇(대화형 인터페이스) 구축 서비스입니다.
• D Amazon Transcribe: 음성을 텍스트로 변환(STT)하는 서비스로, '문서'가 아니라 '오디오'가 입력입니다.

【더 알아두기】
입력 형태로 구분: 문서/이미지 텍스트=Textract, 음성=Transcribe, 일반 텍스트 분석=Comprehend, 이미지 객체=Rekognition.`,
  },
  69: {
    englishQuestion:
'A company wants its chatbot, powered by a foundation model, to tailor the style and complexity of responses to the user\'s age range, with the least development effort. What should the company do?',
    koreanQuestion:
'한 회사가 파운데이션 모델 기반 챗봇이 사용자의 연령대에 맞게 응답의 스타일과 복잡성을 조정하기를 원하며, 개발 노력은 최소화하려고 합니다. 무엇을 해야 합니까?',
    explanation:
`【핵심 개념 — 프롬프트 컨텍스트로 응답 스타일 제어】
모델을 재학습하지 않고도, 프롬프트(시스템/컨텍스트)에 "대상 사용자 연령대"와 역할 지시를 넣으면 모델이 그에 맞춰 어휘·복잡도를 조절합니다. 가장 노력이 적은 방법입니다.

【정답이 B인 이유】
프롬프트 컨텍스트에 대상 연령대를 알려주는 역할 설명을 추가하면, 추가 학습 없이 즉시 연령에 맞는 스타일의 응답을 얻을 수 있어 개발 노력이 최소입니다.

【오답 분석】
• A 추가 데이터로 파인튜닝: 효과는 있으나 데이터 수집·학습이 필요해 '최소 노력'과 거리가 멉니다.
• C Chain-of-thought 추론: 복잡한 추론 과정을 단계화하는 기법으로, 연령대 맞춤 스타일 제어의 직접적 수단이 아닙니다.
• D 연령에 따라 응답을 사후 요약: 별도 후처리 로직을 만들어야 하고, 스타일·복잡도 전반을 자연스럽게 조절하지 못합니다.
• E 해당 없음: 정답(B)이 명확하므로 부적절합니다.

【더 알아두기】
'출력 스타일/대상 맞춤 + 최소 노력 = 프롬프트(역할·컨텍스트) 설계'. 더 강한 일관성이 필요하면 파인튜닝을 고려합니다.`,
  },
  70: {
    englishQuestion:
'How can a company objectively evaluate the predictive accuracy of its machine learning model?',
    koreanQuestion:
'한 회사가 자사 머신러닝 모델의 예측 정확도를 객관적으로 평가하려면 어떻게 해야 합니까?',
    explanation:
`【핵심 개념 — 벤치마크 데이터셋 기준 정확도 측정】
모델 성능을 객관적으로 평가하려면, 정답이 확정된 별도의 평가용 데이터셋(벤치마크/홀드아웃)에 모델을 적용해 예측 정확도를 측정합니다.

【정답이 B인 이유】
사전 정의된 벤치마크 데이터셋을 기준으로 정확도를 측정하면, 표준화된 비교가 가능해 모델 성능을 객관적으로 평가할 수 있습니다.

【오답 분석】
• A 총 리소스 비용 계산: 운영 비용 지표로, 예측 '정확도'와 무관합니다.
• C 신경망 레이어 수 세기: 모델 구조의 크기일 뿐 성능 지표가 아닙니다.
• D 이미지 색상 정확도 평가: 색 재현 품질로, 일반적 예측 정확도 평가와 다릅니다.
• E 해당 없음(있다면): 정답(B)이 명확하므로 부적절합니다.

【더 알아두기】
평가 원칙: 학습에 쓰지 않은 별도 데이터(테스트셋/벤치마크)로 측정해야 일반화 성능을 알 수 있습니다. 데이터 누수(학습=평가)는 금물입니다.`,
  },
  71: {
    englishQuestion:
'A company wants to assess and reduce bias and risk in its ML model as part of responsible AI. Which action helps the company evaluate the model for fairness?',
    koreanQuestion:
'한 회사가 책임 있는 AI의 일환으로 ML 모델의 편향과 위험을 평가·완화하려고 합니다. 모델의 공정성을 평가하는 데 도움이 되는 조치는 무엇입니까?',
    explanation:
`【핵심 개념 — 공정성 지표(Fairness Metrics)】
책임 있는 AI에서 공정성을 평가하려면, 그룹 간 성능·결과 차이를 정량화하는 공정성 지표(예: 그룹별 정확도/오류율 격차, 인구통계 패리티)를 측정해야 합니다. SageMaker Clarify가 이를 제공합니다.

【정답이 A인 이유】
모델 평가에 공정성 지표를 포함하면, 특정 그룹에 불리한 편향이 있는지 객관적으로 진단해 위험을 평가·완화할 수 있습니다.

【오답 분석】
• B Temperature 조정: 생성 출력의 다양성을 바꾸는 값으로, 공정성 평가와 무관합니다.
• C 학습 데이터 수정으로 편향 완화: 편향을 '완화'하는 조치이긴 하나, 문제는 공정성을 '평가'하는 방법을 물으므로 평가에 직접 해당하는 A가 정답입니다.
• D 과적합 방지: 일반화 성능을 위한 조치로, 공정성 평가 자체와는 다릅니다.
• E 프롬프트 엔지니어링: 출력 형식 제어 기법으로, 공정성 측정과 무관합니다.

【더 알아두기】
공정성 평가 = 공정성 지표 측정(Clarify). 평가 후에는 데이터 보정·재가중치로 '완화'합니다. '평가'와 '완화'를 구분하세요.`,
  },
  72: {
    englishQuestion:
'Which step in the ML workflow involves computing correlations and statistics and visualizing data to understand its structure and patterns before modeling?',
    koreanQuestion:
'모델링에 앞서 데이터의 구조와 패턴을 이해하기 위해 상관관계·통계를 계산하고 데이터를 시각화하는 ML 워크플로 단계는 무엇입니까?',
    explanation:
`【핵심 개념 — 탐색적 데이터 분석(EDA)】
EDA는 본격적인 모델링 전에 데이터를 '탐색'하는 단계입니다. 분포·상관관계·이상치를 통계와 시각화로 살펴 데이터의 특성과 문제점을 파악합니다.

【정답이 C인 이유】
"상관 분석·통계 계산·데이터 시각화로 데이터를 이해"하는 활동은 정확히 탐색적 데이터 분석(EDA)에 해당합니다.

【오답 분석】
• A 데이터 전처리: 결측치 처리·정규화 등 데이터를 '정리'하는 단계로, 탐색·이해가 주목적은 아닙니다.
• B 특성 엔지니어링: 모델 입력이 될 유용한 Feature를 만드는 단계로, 데이터 이해 그 자체와 다릅니다.
• D 하이퍼파라미터 튜닝: 모델 학습 설정을 최적화하는 단계로, 데이터 탐색과 무관합니다.

【더 알아두기】
일반 흐름: 데이터 수집 → EDA(이해) → 전처리/특성 엔지니어링 → 모델 학습 → 평가. EDA에서 데이터 문제를 먼저 발견하는 것이 중요합니다.`,
  },
  73: {
    englishQuestion:
'Which type of model is designed to understand bidirectional context in text and is trained using masked language modeling (predicting masked words)?',
    koreanQuestion:
'텍스트의 양방향 문맥을 이해하도록 설계되었고 마스킹된 단어를 예측하는 마스킹 언어 모델링(Masked Language Modeling)으로 학습되는 모델 유형은 무엇입니까?',
    explanation:
`【핵심 개념 — BERT와 마스킹 언어 모델링】
BERT(Bidirectional Encoder Representations from Transformers)는 문장의 앞뒤 문맥을 동시에 보고, 일부 단어를 가린 뒤(마스킹) 무엇인지 맞히며 학습합니다. 문맥 이해·분류·NER 같은 이해형 작업에 강합니다.

【정답이 D인 이유】
"양방향 문맥 이해 + 마스킹된 단어 예측"은 BERT 계열 모델의 핵심 특징입니다.

【오답 분석】
• A 토픽 모델링: 문서 집합에서 주제를 추출하는 비지도 기법으로, 마스킹 예측 학습과 다릅니다.
• B 클러스터링 모델: 데이터를 그룹화하는 비지도 기법입니다.
• C 처방적(Prescriptive) ML 모델: 최적 행동을 권고하는 분석 유형으로, 언어 문맥 이해 모델이 아닙니다.
• E 해당 없음(있다면): 정답(D)이 명확하므로 부적절합니다.

【더 알아두기】
BERT(인코더, 이해형, 양방향) vs GPT(디코더, 생성형, 다음 단어 예측). 작업이 '이해/분류'면 BERT, '생성'이면 GPT 계열을 떠올리세요.`,
  },
  74: {
    englishQuestion:
'A company wants its business users to create data visualizations and dashboards by asking questions in natural language. Which solution should the company use?',
    koreanQuestion:
'한 회사가 비즈니스 사용자들이 자연어로 질문하여 데이터 시각화와 대시보드를 만들기를 원합니다. 어떤 솔루션을 사용해야 합니까?',
    explanation:
`【핵심 개념 — Amazon Q in QuickSight】
Amazon QuickSight는 AWS의 BI(비즈니스 인텔리전스) 서비스이고, 그 안의 Amazon Q는 자연어 질문("이번 분기 지역별 매출 보여줘")으로 시각화·대시보드를 자동 생성해 줍니다.

【정답이 C인 이유】
자연어로 질문해 시각화를 만들려는 요구에는, BI에 생성형 AI가 결합된 'Amazon Q in QuickSight'가 정확히 부합합니다.

【오답 분석】
• A Amazon Q in EC2: EC2 운영·구성을 돕는 어시스턴트로, 데이터 시각화 생성 도구가 아닙니다.
• B Amazon Q Developer: 코드 작성·개발을 돕는 어시스턴트로, BI 시각화가 목적이 아닙니다.
• D Amazon Q in AWS Chatbot: ChatOps(Slack/Teams에서 AWS 운영)용으로, 대시보드 시각화와 다릅니다.

【더 알아두기】
Amazon Q는 사용처별로 특화됩니다: 개발=Q Developer, BI 시각화=Q in QuickSight, 사내 업무=Q Business, 운영=Q in Chatbot.`,
  },
  75: {
    englishQuestion:
'A company is training an intent classification model for a chatbot so that it can correctly understand what users want. What labeled training data is required?',
    koreanQuestion:
'한 회사가 챗봇이 사용자의 요구를 올바르게 이해하도록 의도 분류(intent classification) 모델을 학습시키고 있습니다. 어떤 라벨링된 학습 데이터가 필요합니까?',
    explanation:
`【핵심 개념 — 의도 분류(Intent Classification)】
의도 분류는 사용자가 입력한 문장이 '어떤 의도(intent)'인지 맞히는 분류 작업입니다. 따라서 학습 데이터는 "사용자 메시지 ↔ 그 메시지의 올바른 의도" 쌍이어야 합니다.

【정답이 C인 이유】
모델이 사용자 발화를 의도로 분류하도록 학습하려면, '사용자 메시지'와 '정답 의도'의 쌍(C)이 필요합니다. 이 라벨로 입력→의도 매핑을 학습합니다.

【오답 분석】
• A 챗봇 응답 ↔ 사용자 의도: 입력이 사용자 메시지가 아니라 챗봇 응답이라, 사용자 발화를 분류하는 학습에 맞지 않습니다.
• B 사용자 메시지 ↔ 챗봇 응답: 이는 응답 '생성'을 학습하는 데이터로, 의도 '분류' 학습용이 아닙니다.
• D 사용자 의도 ↔ 챗봇 응답: 의도가 정해진 뒤의 응답 매핑으로, 의도 분류기 학습 입력이 아닙니다.

【더 알아두기】
챗봇 파이프라인: 사용자 메시지 → (의도 분류) → 의도 → (응답 생성/조회) → 응답. 의도 분류기 학습 = '메시지 ↔ 의도' 쌍.`,
  },
};
