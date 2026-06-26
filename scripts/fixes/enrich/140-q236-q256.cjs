/* 해설 보강 + 선택지 한글 번역(choicesKo) — Q236~Q256. struct: 242,245 제외 */
module.exports = {
  236: {
    choicesKo: { A: 'AWS Audit Manager', B: 'Amazon SageMaker Model Monitor', C: 'Amazon SageMaker Model Registry', D: 'Amazon SageMaker Canvas' },
    explanation:
`【핵심 개념 — SageMaker Model Registry】
Model Registry는 여러 모델과 그 버전을 중앙에서 등록·저장·승인·추적하고 배포 파이프라인과 연동하는 모델 카탈로그입니다.

【정답이 C인 이유】
여러 ML 모델을 저장·관리·버전 관리하려는 요구에는 모델 버전 관리 전용 기능인 SageMaker Model Registry가 정답입니다.

【오답 분석】
• A AWS Audit Manager: 규정 준수 감사 보고 도구로, 모델 버전 관리가 아닙니다.
• B SageMaker Model Monitor: 배포 모델의 드리프트 모니터링 도구입니다.
• D SageMaker Canvas: 노코드 ML 모델 구축 도구로, 모델 레지스트리 기능이 아닙니다.

【더 알아두기】
구분: Model Registry(버전·배포 관리), Model Cards(문서화), Model Monitor(드리프트). 버전 관리 = Registry.`,
  },
  237: {
    choicesKo: { A: '모델의 Shapley 값을 제시', B: '모델 정확도 측정값 제공', C: '모델 혼동 행렬 제공', D: '안전한 모델 추론 엔드포인트 제공' },
    explanation:
`【핵심 개념 — Shapley 값(SHAP)과 설명가능성】
Shapley 값은 각 입력 특성이 특정 예측에 기여한 정도를 정량화해, '왜 그렇게 예측했는지'를 설명합니다. 설명가능성·투명성 제공의 핵심 도구입니다.

【정답이 A인 이유】
이해관계자에게 모델의 의사결정 근거를 투명하게 보여주려면, 특성별 기여도를 제시하는 Shapley 값이 적합합니다.

【오답 분석】
• B 정확도 측정값: 전반적 성능 지표일 뿐, 개별 예측의 '근거'를 설명하지 못합니다.
• C 혼동 행렬: 분류 성능을 보여주지만, 어떤 특성이 예측에 기여했는지(설명)는 알려주지 않습니다.
• D 안전한 추론 엔드포인트: 배포 보안에 관한 것으로, 설명가능성과 무관합니다.

【더 알아두기】
설명가능성 기법: SHAP(Shapley), LIME, PDP, 피처 중요도. AWS에서는 SageMaker Clarify가 이를 제공합니다.`,
  },
  238: {
    choicesKo: { A: '비지도 학습', B: '지도 학습', C: '강화 학습', D: '준지도 학습' },
    explanation:
`【핵심 개념 — 비지도 학습(군집화)】
라벨 없이 특성이 비슷한 데이터를 자동으로 그룹화하는 것은 비지도 학습(군집화)입니다. 고객·제품 세분화가 대표 사례입니다.

【정답이 A인 이유】
정답 라벨 없이 유사한 고객·제품을 자동 그룹화하려면 비지도 학습이 적합합니다.

【오답 분석】
• B 지도 학습: 정답 라벨이 있어야 동작하므로, 라벨 없는 자동 그룹화와 다릅니다.
• C 강화 학습: 보상 기반 행동 최적화로, 그룹화 작업이 아닙니다.
• D 준지도 학습: 라벨 일부 + 비라벨 다수를 함께 쓰는 방식으로, 순수 '자동 그룹화'의 표준 답은 비지도(군집화)입니다.

【더 알아두기】
라벨 없는 그룹화 = 비지도 군집화(K-Means 등). 라벨 있으면 분류로 구분합니다.`,
  },
  239: {
    choicesKo: { A: '웹사이트에 Amazon Transcribe 추가', B: 'Amazon Translate 실시간 번역 기능 사용', C: '웹사이트에 Amazon Personalize 추가', D: 'Amazon Textract 실시간 문서 처리 기능 사용' },
    explanation:
`【핵심 개념 — Amazon Translate(다국어 번역)】
Amazon Translate는 텍스트를 여러 언어로 실시간 번역하는 관리형 서비스입니다. 기사처럼 텍스트 콘텐츠를 다국어로 제공하기에 적합합니다.

【정답이 B인 이유】
영어 기사를 다른 언어로 제공하려면, 텍스트를 번역하는 Amazon Translate가 정답입니다.

【오답 분석】
• A Amazon Transcribe: 음성을 텍스트로 변환(STT)하는 서비스로, 텍스트 번역이 아닙니다.
• C Amazon Personalize: 개인화 추천 서비스로, 번역과 무관합니다.
• D Amazon Textract: 문서에서 텍스트를 추출하는 OCR로, 번역 기능이 아닙니다.

【더 알아두기】
언어 서비스: 번역=Translate, 음성↔텍스트=Transcribe/Polly, 문서 OCR=Textract.`,
  },
  240: {
    choicesKo: { A: '복잡도 기반 프롬프팅', B: '제로샷 프롬프팅', C: '퓨샷 프롬프팅', D: '방향성 자극 프롬프팅' },
    explanation:
`【핵심 개념 — Few-shot 프롬프팅】
프롬프트에 도메인 관련 예시(질문-답변)를 몇 개 제공하면, 모델이 그 패턴을 보고 더 정확하고 형식에 맞는 답을 생성합니다.

【정답이 C인 이유】
은행 도메인 지식이 필요한 챗봇 응답 품질을 프롬프트로 높이려면, 예시를 제공하는 Few-shot 프롬프팅이 적합합니다.

【오답 분석】
• A 복잡도 기반 프롬프팅: 표준적인 프롬프트 기법 명칭이 아니며, 본 요구와 맞지 않습니다.
• B 제로샷 프롬프팅: 예시 없이 지시만 주므로, 도메인 특화 품질을 안정적으로 끌어올리기엔 약합니다.
• D 방향성 자극 프롬프팅: 힌트(키워드)로 방향을 유도하는 기법으로, 예시 기반 품질 향상과 초점이 다릅니다.

【더 알아두기】
도메인 품질 향상: Few-shot(예시) + (필요 시) RAG(근거 문서). 예시가 형식·정확성을 안내합니다.`,
  },
  241: {
    choicesKo: {
      A: 'IAM 서비스 역할로 Amazon Bedrock 접근 제한',
      B: 'IAM 리소스 기반 정책으로 Amazon Bedrock 접근 제한',
      C: 'AWS PrivateLink로 VPC와 Amazon Bedrock 연결',
      D: 'AWS KMS 키로 데이터 암호화',
    },
    explanation:
`【핵심 개념 — PrivateLink로 사설 네트워크 유지】
민감 데이터가 사설 네트워크(VPC) 밖으로 나가지 않게 하면서 Bedrock에 접근하려면, 인터넷을 거치지 않는 사설 연결인 AWS PrivateLink(인터페이스 엔드포인트)를 사용합니다.

【정답이 C인 이유】
데이터가 회사 사설 네트워크 내부에만 머물도록 VPC와 Bedrock을 연결하려면 AWS PrivateLink가 정답입니다.

【오답 분석】
• A IAM 서비스 역할로 접근 제한: 권한 통제일 뿐, 트래픽이 사설 네트워크에 머물게 하는 '네트워크' 경로 제공이 아닙니다.
• B IAM 리소스 정책으로 접근 제한: 마찬가지로 접근 권한 통제이지, 네트워크 격리 수단이 아닙니다.
• D KMS로 데이터 암호화: 데이터를 암호화하지만, 트래픽이 인터넷을 거치지 않게 하는 것은 PrivateLink입니다.

【더 알아두기】
'인터넷 미경유 사설 연결 = PrivateLink/VPC 엔드포인트'. IAM(권한)·KMS(암호화)는 보완적 보안 계층입니다.`,
  },
  243: {
    choicesKo: {
      A: 'SageMaker로 회사 정책 텍스트에 LLM 파인튜닝',
      B: 'Amazon Bedrock에서 FM을 선택해 앱 구축',
      C: 'Amazon Bedrock Knowledge Bases로 RAG 워크플로 구성',
      D: 'Amazon Q Business로 맞춤 Q App 구축',
    },
    explanation:
`【핵심 개념 — RAG로 자주 바뀌는 정책 실시간 반영】
정책이 자주 갱신되고 거의 실시간 반영이 필요하면, 모델을 재학습하지 않고 최신 문서를 검색해 응답에 넣는 RAG가 적합합니다.

【정답이 C인 이유】
Bedrock Knowledge Bases로 RAG 워크플로를 구성하면, 정책 문서만 갱신해도 챗봇이 최신 정보를 거의 실시간으로 반영합니다.

【오답 분석】
• A 정책 텍스트로 파인튜닝: 정책이 바뀔 때마다 재튜닝해야 해 '거의 실시간 반영'과 맞지 않습니다.
• B FM 선택만으로 앱 구축: 모델만 고른다고 회사 정책 문서가 반영되지는 않습니다.
• D Amazon Q Business로 Q App: 사내 데이터 연결형 어시스턴트로 가능성은 있으나, 본 문항이 요구하는 'LLM + 거의 실시간 문서 반영'의 정석 구현은 Bedrock Knowledge Bases 기반 RAG입니다.

【더 알아두기】
'자주 갱신 + 거의 실시간 + 문서 근거 = RAG(Knowledge Bases)'.`,
  },
  244: {
    choicesKo: { A: '파인튜닝', B: '데이터 선택', C: '사전학습', D: '평가' },
    explanation:
`【핵심 개념 — 파인튜닝 단계】
파인튜닝은 사전학습된 모델에 소량의 '라벨된' 데이터를 추가 학습시켜 특정 작업에 맞게 조정하는 단계입니다(지도 학습 기반).

【정답이 A인 이유】
'소규모 라벨 데이터로 특정 작업에 맞게 지도 학습'하는 단계는 파인튜닝입니다.

【오답 분석】
• B 데이터 선택: 학습에 쓸 데이터를 고르는 준비 단계로, 학습 자체가 아닙니다.
• C 사전학습(Pre-training): 대규모 비라벨 데이터로 처음부터 일반 능력을 학습하는 단계로, 소규모 라벨 데이터의 작업 특화와 다릅니다.
• D 평가: 학습된 모델의 성능을 검증하는 단계입니다.

【더 알아두기】
수명주기: 데이터 선택 → 사전학습(대규모·비라벨) → 파인튜닝(소규모·라벨, 작업 특화) → 평가 → 배포.`,
  },
  246: {
    choicesKo: { A: '입력 메시지 샘플만', B: '출력 메시지 샘플만', C: '입력-출력 메시지 쌍 샘플', D: '입력과 출력의 분리된 샘플' },
    explanation:
`【핵심 개념 — 파인튜닝 데이터 = 입력-출력 쌍】
파인튜닝은 "이 입력에는 이 출력"이라는 매핑을 학습합니다. 따라서 입력과 그에 대응하는 정답 출력이 짝지어진 쌍(pair) 데이터가 필요합니다.

【정답이 C인 이유】
출력 스타일을 학습시키려면, 입력 메시지와 원하는 출력 메시지가 짝지어진 입력-출력 쌍 데이터가 필요합니다.

【오답 분석】
• A 입력만: 정답 출력이 없어 무엇을 생성해야 할지 학습할 수 없습니다.
• B 출력만: 어떤 입력에 대한 출력인지 알 수 없어 매핑 학습이 불가합니다.
• D 분리된 입력·출력 샘플: 서로 짝지어지지 않으면 입력→출력 관계를 학습하지 못합니다.

【더 알아두기】
지도 파인튜닝 데이터: prompt(입력) + completion(정답 출력) 쌍. 짝(pair)이 핵심입니다.`,
  },
  247: {
    choicesKo: {
      A: '과거 재입원 데이터 수집',
      B: '적절한 지표로 모델 성능 평가',
      C: '데이터로 환자 패턴·상관관계 식별',
      D: '학습된 모델로 환자 재입원 예측',
    },
    explanation:
`【핵심 개념 — 추론(Inference)】
추론은 이미 '학습이 끝난' 모델을 사용해 새로운 데이터에 대한 예측을 수행하는 과정입니다. 학습·평가·데이터 준비와 구분됩니다.

【정답이 D인 이유】
학습된 모델로 새 환자의 재입원 여부를 실시간 예측하는 것이 바로 추론(Inference)입니다.

【오답 분석】
• A 과거 데이터 수집: 학습을 위한 '데이터 준비' 단계로, 추론이 아닙니다.
• B 지표로 성능 평가: 모델 '평가' 단계입니다.
• C 패턴·상관관계 식별: 탐색적 분석/학습 단계로, 예측 수행(추론)과 다릅니다.

【더 알아두기】
'학습된 모델로 새 데이터 예측 = 추론'. 운영 비용의 상당 부분이 지속적인 추론에서 발생합니다.`,
  },
  248: {
    choicesKo: { A: 'Amazon Personalize', B: 'Amazon Augmented AI (Amazon A2I)', C: 'Amazon Inspector', D: 'AWS Audit Manager' },
    explanation:
`【핵심 개념 — Amazon A2I(사람 검토 워크플로)】
Amazon Augmented AI(A2I)는 ML 예측에 대한 사람 검토(human review)를 워크플로로 자동 구성합니다. 신뢰도 임계값을 정해, 낮은 신뢰도 예측만 사람에게 보내는 식으로 운영할 수 있습니다.

【정답이 B인 이유】
ML 예측에 대한 사람 검토 워크플로를 만들고 신뢰도 임계값을 정의·조정하려는 요구에는 Amazon A2I가 정답입니다.

【오답 분석】
• A Amazon Personalize: 추천 시스템 서비스로, 사람 검토 워크플로가 아닙니다.
• C Amazon Inspector: 취약점 스캔 도구입니다.
• D AWS Audit Manager: 규정 준수 감사 보고 도구입니다.

【더 알아두기】
사람 검토 결합(HITL): Amazon A2I(임계값 기반 검토 라우팅), Ground Truth(라벨링). 신뢰도 임계값 = A2I.`,
  },
  249: {
    choicesKo: { A: 'Amazon Rekognition', B: 'Amazon Textract', C: 'Amazon Lex', D: 'Amazon Q Business' },
    explanation:
`【핵심 개념 — Amazon Q Business(사내 데이터 어시스턴트)】
Amazon Q Business는 기업 내부 시스템·문서를 연결해 자연어로 질의응답하는 생성형 AI 업무 어시스턴트입니다. 직원이 사내 데이터를 손쉽게 조회할 수 있습니다.

【정답이 D인 이유】
직원이 내부 데이터를 조회하는 AI 어시스턴트를 만들려면, 사내 데이터 연결형 어시스턴트인 Amazon Q Business가 적합합니다.

【오답 분석】
• A Amazon Rekognition: 이미지·영상 분석 서비스입니다.
• B Amazon Textract: 문서에서 텍스트를 추출하는 OCR 서비스입니다.
• C Amazon Lex: 챗봇/음성봇을 '구축'하는 빌더로, 사내 데이터 통합 질의응답 어시스턴트의 즉시 솔루션은 Q Business입니다.

【더 알아두기】
Amazon Q: Q Business(사내 업무 Q&A), Q Developer(코딩), Q in QuickSight(BI). 사내 데이터 조회 = Q Business.`,
  },
  250: {
    choicesKo: { A: 'Amazon SageMaker Canvas', B: 'Amazon Rekognition', C: 'AWS DeepRacer', D: 'Amazon Comprehend' },
    explanation:
`【핵심 개념 — SageMaker Canvas(노코드 ML)】
SageMaker Canvas는 코드 없이 시각적 인터페이스로 데이터를 불러와 ML 모델을 구축·학습·예측·배포할 수 있는 노코드 도구입니다.

【정답이 A인 이유】
코드를 작성하지 않고 ML 모델을 구축·배포하려면, 노코드 ML 도구인 SageMaker Canvas가 정답입니다.

【오답 분석】
• B Amazon Rekognition: 사전학습된 이미지·영상 분석 API로, 사용자가 임의의 ML 모델을 구축하는 도구가 아닙니다.
• C AWS DeepRacer: 강화학습을 '학습'하기 위한 자율주행 시뮬레이션 게임으로, 일반 ML 모델 구축·배포 도구가 아닙니다.
• D Amazon Comprehend: 텍스트 분석 NLP 서비스로, 범용 노코드 모델 구축 도구가 아닙니다.

【더 알아두기】
'노코드 ML 모델 구축/배포 = SageMaker Canvas'. 비전문가·분석가가 예측 모델을 만들 때 적합합니다.`,
  },
  251: {
    choicesKo: { A: '모델 체크포인트', B: '배치 크기(Batch size)', C: '생성 단계(Generation step)', D: '토큰 길이(Token length)' },
    explanation:
`【핵심 개념 — 생성 단계(Generation/Inference Steps)】
이미지 생성(확산) 모델에서 생성 단계 수는 노이즈를 제거하며 이미지를 다듬는 반복 횟수입니다. 단계가 많을수록 더 세밀·정교하고, 적을수록 더 거칠고 추상적입니다.

【정답이 C인 이유】
생성 이미지가 얼마나 상세/추상적으로 나올지 제어하려면 생성 단계(Generation step) 수를 조정합니다.

【오답 분석】
• A 모델 체크포인트: 학습된 모델 가중치의 저장 시점으로, 디테일 정도를 조절하는 파라미터가 아닙니다.
• B 배치 크기: 한 번에 처리하는 샘플 수로, 개별 이미지의 정교함과 무관합니다.
• D 토큰 길이: 텍스트 생성의 길이 한도로, 이미지 디테일 제어와 다릅니다.

【더 알아두기】
이미지 생성 제어: 생성 단계(디테일), CFG 스케일(프롬프트 충실도), seed(재현성). 디테일↔추상 = 단계 수.`,
  },
  252: {
    choicesKo: { A: 'AWS PrivateLink', B: 'Amazon Q', C: 'Amazon CloudFront', D: 'AWS CloudTrail' },
    explanation:
`【핵심 개념 — PrivateLink로 인터넷 미경유 연결】
AWS PrivateLink는 VPC와 AWS 서비스(여기서는 Bedrock FM)를 사설 인터페이스 엔드포인트로 연결해, 트래픽이 공용 인터넷을 거치지 않게 합니다.

【정답이 A인 이유】
생성형 AI 앱과 FM 간 모든 API 호출이 공용 인터넷을 거치지 않아야 하므로, 사설 연결을 제공하는 AWS PrivateLink가 정답입니다.

【오답 분석】
• B Amazon Q: AI 어시스턴트 제품군으로, 네트워크 사설 연결 기능이 아닙니다.
• C Amazon CloudFront: 콘텐츠 전송(CDN) 서비스로, 사설 API 경로 제공이 아닙니다.
• D AWS CloudTrail: API 호출 감사 로그 서비스로, 트래픽 경로를 사설화하지 않습니다.

【더 알아두기】
'인터넷 미경유 = PrivateLink/VPC 엔드포인트'. 규제·금융 환경에서 자주 요구됩니다.`,
  },
  253: {
    choicesKo: { A: 'Amazon Bedrock Guardrails', B: 'Amazon Bedrock Agents', C: 'Amazon Bedrock 추론 API', D: 'Amazon Bedrock 맞춤형 모델' },
    explanation:
`【핵심 개념 — Bedrock Guardrails(입력·출력 안전 필터)】
Guardrails는 사용자 입력 프롬프트와 모델 출력 모두를 검사해 유해 콘텐츠·금지 주제·민감정보를 필터링하는 안전장치입니다.

【정답이 A인 이유】
챗봇의 입력·응답에서 유해 콘텐츠를 필터링하는 안전장치가 필요하므로 Amazon Bedrock Guardrails가 정답입니다.

【오답 분석】
• B Bedrock Agents: 다단계 작업을 자동화하는 기능으로, 콘텐츠 안전 필터가 아닙니다.
• C Bedrock 추론 API: 모델을 호출해 응답을 받는 인터페이스로, 자체적인 유해 콘텐츠 필터 기능이 아닙니다.
• D Bedrock 맞춤형 모델: 파인튜닝한 모델로, 안전 필터 정책을 제공하는 것은 Guardrails입니다.

【더 알아두기】
'입력·출력 유해 콘텐츠 차단 = Guardrails'. 책임 있는 AI(안전성) 구현의 핵심 기능입니다.`,
  },
  254: {
    correctAnswer: 'C',
    choicesKo: { A: 'Amazon Q Developer', B: 'Amazon SageMaker JumpStart', C: 'Amazon Bedrock PartyRock', D: 'Amazon Q Business' },
    explanation:
`【핵심 개념 — PartyRock(무료 생성형 AI 실험 놀이터)】
PartyRock은 Amazon Bedrock 기반의 무료·노코드 놀이터로, 코드나 인프라 없이 생성형 AI 앱을 만들어 보며 학습·실험할 수 있습니다. 비용 효율적인 실험 환경으로 최적입니다.

【정답이 C인 이유】
'실험 환경에서 생성형 AI를 학습'하는 데 가장 비용 효율적인 선택은, 무료로 손쉽게 실험할 수 있는 Amazon Bedrock PartyRock입니다.

【오답 분석】
• A Amazon Q Developer: 개발 보조 어시스턴트로, 생성형 AI 실험·학습용 놀이터가 아닙니다.
• B SageMaker JumpStart: 모델 배포·파인튜닝 허브로, 엔드포인트 운영 시 인프라 비용이 들어 '가장 비용 효율적인 실험 환경'과는 거리가 있습니다.
• D Amazon Q Business: 사내 업무용 어시스턴트로, 학습·실험 놀이터가 아닙니다.

【더 알아두기】
무료·노코드 실험·학습 = PartyRock. 모델 배포·튜닝이 필요하면 JumpStart/Bedrock을 사용합니다.`,
  },
  255: {
    choicesKo: {
      A: '관련 용어를 사용하는 다양한 대화 데이터',
      B: '일반적인 과거 매출 시계열 데이터',
      C: '뉴스 기사 감정 분석',
      D: '고유 제품 ID와 대응하는 사용자 ID',
    },
    explanation:
`【핵심 개념 — 도메인 어시스턴트 학습 데이터】
특정 분야의 AI 어시스턴트를 학습시키려면, 그 분야의 용어와 문맥을 담은 다양한 '대화' 데이터가 필요합니다. 모델이 도메인 표현과 상호작용 방식을 익힙니다.

【정답이 A인 이유】
관련 용어를 포함한 다양한 대화 데이터는, 어시스턴트가 해당 분야의 질문·맥락에 자연스럽게 응답하도록 학습시키는 데 가장 적합합니다.

【오답 분석】
• B 일반 매출 시계열: 수요 예측용 정형 데이터로, 대화형 어시스턴트 학습과 무관합니다.
• C 뉴스 감정 분석: 감정 분류 작업 데이터로, 도메인 대화 학습이 아닙니다.
• D 제품 ID·사용자 ID: 추천 시스템용 식별자 데이터로, 어시스턴트의 언어·대화 능력 학습과 맞지 않습니다.

【더 알아두기】
대화형 어시스턴트 = 도메인 용어가 풍부한 다양한 대화 코퍼스. 작업 유형에 맞는 데이터 선택이 핵심입니다.`,
  },
  256: {
    choicesKo: {
      A: '학습 데이터의 편향 검토 및 모든 인구통계 데이터 포함',
      B: '은닉층이 많은 딥러닝 모델 사용',
      C: '독점 알고리즘 보호를 위해 의사결정 과정을 비공개로 유지',
      D: '정적 테스트 데이터셋으로 모델 성능을 지속 모니터링',
    },
    explanation:
`【핵심 개념 — 공정성을 위한 데이터 편향 점검】
대출 승인 같은 고위험 결정에서 책임 있고 공정한 출력을 보장하려면, 학습 데이터의 편향을 검토하고 모든 인구통계 집단을 대표하도록 데이터를 구성해야 합니다.

【정답이 A인 이유】
학습 데이터의 편향을 점검하고 모든 인구통계를 포함하는 것이, 공정하고 책임 있는 대출 결정을 위한 직접적 조치입니다.

【오답 분석】
• B 은닉층 많은 딥러닝 사용: 모델을 더 복잡하게 만들 뿐(설명가능성↓), 공정성을 보장하지 않습니다.
• C 의사결정 과정 비공개 유지: 투명성·설명가능성에 정면으로 반하며, 책임 있는 AI 원칙을 위반합니다.
• D 정적 테스트셋으로만 모니터링: 시간에 따라 변하는 실제 데이터를 반영하지 못해, 공정성·드리프트 관리에 한계가 있습니다.

【더 알아두기】
공정성 확보: 대표성 있는 데이터 + SageMaker Clarify 편향 진단 + 투명한 설명 + 지속 모니터링. 데이터 편향 점검이 출발점입니다.`,
  },
};
