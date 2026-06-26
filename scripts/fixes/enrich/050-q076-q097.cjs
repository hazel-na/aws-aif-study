/* 해설 보강 + 누락 문제문 복원 — Q76~Q97. */
module.exports = {
  76: {
    englishQuestion:
'A company uses a foundation model on Amazon Bedrock and wants to reduce its monthly inference costs. Which action will reduce the per-invocation cost?',
    koreanQuestion:
'한 회사가 Amazon Bedrock의 파운데이션 모델을 사용하며 월간 추론 비용을 줄이려고 합니다. 호출당 비용을 줄이는 조치는 무엇입니까?',
    explanation:
`【핵심 개념 — 토큰 기반 과금】
Amazon Bedrock 등 LLM 서비스는 처리한 '토큰 수(입력+출력)'에 비례해 과금합니다. 따라서 프롬프트의 토큰을 줄이면 호출당 비용이 직접 줄어듭니다.

【정답이 B인 이유】
프롬프트의 토큰 수를 줄이면(불필요한 맥락 제거·간결화) 호출마다 처리하는 토큰이 줄어 비용이 절감됩니다. 가장 직접적인 비용 절감책입니다.

【오답 분석】
• A 파인튜닝으로 맞춤화: 학습 비용이 추가로 들고, 호출당 토큰 비용을 줄이는 방법이 아닙니다.
• C 프롬프트 토큰 수 증가: 처리 토큰이 늘어 오히려 비용이 증가합니다(요구와 반대).
• D Provisioned Throughput 사용: 일정 처리량을 예약 구매하는 옵션으로, 트래픽이 크고 안정적일 때 유리하지만 소규모에서는 고정비가 더 들 수 있습니다.

【더 알아두기】
LLM 비용 절감: 프롬프트 간결화, 더 작은 모델 선택, 캐싱, 배치 처리. 대규모 안정 트래픽에서는 Provisioned Throughput이 단가 절감에 유리합니다.`,
  },
  77: {
    englishQuestion:
'A generative AI model sometimes produces responses that sound plausible and confident but are factually incorrect or fabricated. What is this phenomenon called?',
    koreanQuestion:
'생성형 AI 모델이 그럴듯하고 자신감 있게 들리지만 사실과 다르거나 지어낸 응답을 생성하는 경우가 있습니다. 이 현상을 무엇이라고 합니까?',
    explanation:
`【핵심 개념 — 환각(Hallucination)】
환각은 LLM이 사실이 아닌 내용을 그럴듯하게 지어내는 현상입니다. 모델은 '진실'이 아니라 '통계적으로 그럴듯한 다음 단어'를 생성하기 때문에 발생합니다.

【정답이 B인 이유】
"그럴듯하지만 사실과 다른/지어낸 응답"은 환각의 정의 그대로입니다. 생성형 AI의 대표적 위험 중 하나입니다.

【오답 분석】
• A 데이터 누출(Data leakage): 평가/학습 과정에서 테스트 정보가 학습에 새어 들어가 성능이 부풀려지는 문제로, 응답 내용의 허위와 다릅니다.
• C 과적합(Overfitting): 학습 데이터에 지나치게 맞춰져 일반화가 안 되는 현상입니다.
• D 과소적합(Underfitting): 모델이 너무 단순해 학습 데이터조차 잘 못 맞히는 현상입니다.

【더 알아두기】
환각 완화: RAG로 근거 문서 제공, Guardrails의 맥락 근거 확인(Contextual grounding), 출처 표기, 낮은 temperature. 사실성이 중요하면 근거 기반 응답을 강제하세요.`,
  },
  78: {
    englishQuestion:
'A company discovers that confidential data was accidentally included in the dataset used to train a custom model. The trained model can now reveal this confidential data in its responses. What is the most effective way to remediate this?',
    koreanQuestion:
'한 회사가 맞춤형 모델 학습에 사용한 데이터셋에 기밀 데이터가 실수로 포함되었음을 발견했습니다. 학습된 모델이 응답에서 이 기밀 데이터를 노출할 수 있습니다. 가장 효과적인 해결 방법은 무엇입니까?',
    explanation:
`【핵심 개념 — 학습에 들어간 데이터는 모델에 '각인'된다】
모델이 학습한 데이터는 가중치에 반영되어, 사후 필터만으로 완전히 지우기 어렵습니다. 기밀 데이터가 학습에 포함됐다면 근본 해결은 그 데이터를 빼고 다시 학습하는 것입니다.

【정답이 A인 이유】
오염된 커스텀 모델을 삭제하고, 학습 데이터에서 기밀 데이터를 제거한 뒤 재학습해야 기밀 노출 위험을 근본적으로 없앨 수 있습니다.

【오답 분석】
• B 추론 응답에서 동적 마스킹: 출력 일부를 가릴 수는 있으나, 모델이 여전히 기밀을 '학습'한 상태라 다른 경로로 노출될 수 있어 근본 해결이 아닙니다.
• C 추론 응답 암호화: 응답을 암호화해도 정당한 수신자에게는 평문으로 기밀이 노출되며, 모델 내부 문제를 해결하지 못합니다.
• D 모델 내 기밀 데이터 KMS 암호화: 학습으로 가중치에 녹아든 정보는 특정 필드처럼 '암호화'할 수 있는 대상이 아닙니다.

【더 알아두기】
예방이 최선: 학습 전에 PII/기밀을 제거·익명화(데이터 거버넌스). 사고 발생 시에는 데이터 제거 후 재학습이 정석입니다.`,
  },
  79: {
    englishQuestion:
'A company wants to evaluate the quality of its machine translation system\'s output against reference translations. Which metric is designed for this purpose?',
    koreanQuestion:
'한 회사가 기계 번역 시스템의 출력을 기준 번역과 비교하여 품질을 평가하려고 합니다. 이 목적에 맞게 설계된 지표는 무엇입니까?',
    explanation:
`【핵심 개념 — BLEU(번역 품질 평가)】
BLEU(Bilingual Evaluation Understudy)는 기계 번역 결과가 사람이 만든 기준 번역과 단어/구(n-gram) 단위로 얼마나 겹치는지를 점수화하는 번역 전용 평가 지표입니다.

【정답이 A인 이유】
'기계 번역 품질을 기준 번역과 비교'하는 목적에는 번역 평가용으로 만들어진 BLEU가 정확히 맞습니다.

【오답 분석】
• B RMSE: 회귀 모델의 수치 예측 오차를 재는 지표로, 번역 품질과 무관합니다.
• C ROUGE: 주로 '요약' 품질을 평가하는 지표로(재현율 중심), 번역 전용 지표는 BLEU입니다.
• D F1 점수: 분류의 정밀도·재현율 종합 지표로, 번역 텍스트 품질 평가용이 아닙니다.

【더 알아두기】
생성 텍스트 평가: 번역=BLEU, 요약=ROUGE, 의미 유사도=BERTScore. 작업 유형에 맞는 지표를 고르는 것이 핵심입니다.`,
  },
  80: {
    englishQuestion:
'What is a primary capability of Agents for Amazon Bedrock?',
    koreanQuestion:
'Agents for Amazon Bedrock의 주요 기능은 무엇입니까?',
    explanation:
`【핵심 개념 — Agents for Amazon Bedrock】
Bedrock 에이전트는 사용자의 요청을 여러 단계로 분해하고, API/함수를 호출하며, 지식 베이스를 조회해 '복잡한 작업을 자동으로 수행·조정(오케스트레이션)'합니다.

【정답이 B인 이유】
에이전트의 핵심은 반복 작업을 자동화하고 여러 단계로 이루어진 복잡한 워크플로를 스스로 조정·실행하는 것입니다.

【오답 분석】
• A 맞춤 FM 생성: 에이전트는 모델을 '만드는' 기능이 아니라, 기존 FM을 활용해 작업을 수행합니다.
• C 여러 FM 자동 호출·결과 통합: 모델 앙상블/라우팅에 가까운 설명으로, 에이전트의 핵심 정의(작업 오케스트레이션)와 초점이 다릅니다.
• D 기준에 따른 FM 선택: 모델 선택/라우팅 기능으로, 에이전트의 주된 역할이 아닙니다.

【더 알아두기】
구성요소: 에이전트(작업 수행) + Knowledge Bases(근거 데이터, RAG) + Action Groups(외부 API 호출). '복잡한 다단계 작업 자동화 = 에이전트'.`,
  },
  81: {
    englishQuestion:
'A company periodically performs continued pre-training of its foundation model on newly collected domain data. What is the main benefit of this approach?',
    koreanQuestion:
'한 회사가 새로 수집한 도메인 데이터로 파운데이션 모델의 지속적 사전 학습(continued pre-training)을 주기적으로 수행합니다. 이 접근법의 주요 이점은 무엇입니까?',
    explanation:
`【핵심 개념 — 지속적 사전학습(Continued Pre-training)】
지속적 사전학습은 라벨 없는 도메인 데이터를 모델에 계속 추가 학습시켜 도메인 지식을 누적·갱신하는 방법입니다. 새로운 데이터·패턴을 흡수해 시간이 갈수록 해당 영역 성능이 좋아집니다.

【정답이 B인 이유】
새 데이터를 지속적으로 학습하면 모델이 더 많은 패턴과 최신 지식을 반영해 '시간이 지남에 따라 성능이 향상'됩니다.

【오답 분석】
• A 모델 복잡도 감소: 추가 학습은 복잡도를 줄이는 것과 무관합니다.
• C 학습 시간 단축: 오히려 추가 학습이므로 시간이 더 듭니다.
• D 추론 시간 최적화: 추론 속도 최적화는 모델 경량화·인프라 영역으로, 지속 사전학습의 목적이 아닙니다.

【더 알아두기】
도메인 적응: 라벨 데이터 적으면 파인튜닝, 라벨 없는 대량 데이터면 지속 사전학습. 최신 사실 반영이 목적이면 RAG가 더 효율적일 수 있습니다.`,
  },
  82: {
    englishQuestion:
'In the context of generative AI, what are tokens?',
    koreanQuestion:
'생성형 AI에서 토큰(token)이란 무엇입니까?',
    explanation:
`【핵심 개념 — 토큰(Token)】
토큰은 모델이 텍스트를 처리할 때 쓰는 기본 단위입니다. 단어, 하위 단어(subword), 문자 조각 등으로 텍스트를 잘게 나눈 것이며, 입력과 출력 모두 토큰 단위로 다뤄집니다.

【정답이 A인 이유】
"토큰은 단어·하위 단어 등 언어 단위를 나타내는, 모델이 처리하는 입력·출력의 기본 단위"라는 설명이 정확한 정의입니다. 과금·컨텍스트 길이도 토큰 기준입니다.

【오답 분석】
• B 단어/개념의 수치적 표현: 이는 토큰이 아니라 '임베딩(embedding)'의 정의입니다.
• C 사전학습된 가중치: 이는 모델의 '파라미터/가중치'에 대한 설명입니다.
• D 모델에 주는 지시/프롬프트: 이는 '프롬프트'의 정의입니다.

【더 알아두기】
혼동 주의: 토큰(처리 단위) ≠ 임베딩(의미 벡터) ≠ 파라미터(가중치) ≠ 프롬프트(지시문). 영어 기준 1단어 ≈ 1~2토큰입니다.`,
  },
  83: {
    englishQuestion:
'What primarily determines the cost of running inference on a large language model (LLM)?',
    koreanQuestion:
'대형 언어 모델(LLM) 추론 실행 비용을 주로 결정하는 요소는 무엇입니까?',
    explanation:
`【핵심 개념 — 추론 비용 = 토큰 수】
LLM 추론(호출) 비용은 입력 토큰과 출력 토큰의 합에 비례해 과금됩니다. 길고 많은 토큰을 처리할수록 비용이 늘어납니다.

【정답이 A인 이유】
추론 비용은 호출 시 소비된 토큰 수에 비례하므로, 비용을 결정하는 주된 요소는 '사용된 토큰 수'입니다.

【오답 분석】
• B Temperature 값: 출력 다양성을 조절할 뿐 비용과 직접 관련이 없습니다.
• C 학습 데이터 양: 이는 '학습' 단계의 요소로, 추론 호출 비용과 다릅니다.
• D 총 학습 시간: 모델을 만들 때의 비용 요소로, 운영 추론 비용과 구분됩니다.

【더 알아두기】
비용 최적화: 프롬프트·출력 토큰 줄이기, 더 작은 모델, 캐싱. 학습 비용(데이터·시간)과 추론 비용(토큰)을 구분해 관리하세요.`,
  },
  84: {
    englishQuestion:
'A company wants its Amazon SageMaker workloads to access training data in Amazon S3 privately, without sending traffic over the public internet. What should the company do?',
    koreanQuestion:
'한 회사가 Amazon SageMaker 워크로드가 퍼블릭 인터넷을 거치지 않고 Amazon S3의 학습 데이터에 비공개로 접근하기를 원합니다. 무엇을 해야 합니까?',
    explanation:
`【핵심 개념 — VPC + S3 엔드포인트(사설 접근)】
VPC에 S3 게이트웨이 엔드포인트(VPC endpoint)를 구성하면, SageMaker가 인터넷을 거치지 않고 AWS 내부 네트워크로 S3에 접근합니다. 보안·규제 요건을 충족합니다.

【정답이 C인 이유】
SageMaker를 VPC와 S3 엔드포인트로 구성하면, 학습 데이터 트래픽이 인터넷에 노출되지 않고 AWS 사설망으로만 흐릅니다.

【오답 분석】
• A Amazon Inspector로 모니터링: 취약점 스캐닝 도구로, 사설 네트워크 경로를 만드는 기능이 아닙니다.
• B Amazon Macie로 모니터링: S3 민감정보 탐지 서비스로, 비공개 접근 경로 구성과 무관합니다.
• D S3 Glacier Deep Archive 사용: 장기 보관용 저비용 스토리지 클래스로, 네트워크 보안과 관련이 없습니다.

【더 알아두기】
사설 연결: S3·DynamoDB는 게이트웨이 엔드포인트, 그 외 서비스는 인터페이스 엔드포인트(PrivateLink). '인터넷 미경유 접근 = VPC 엔드포인트'.`,
  },
  85: {
    englishQuestion:
'A company needs to upload and store datasets that will be used to evaluate models in Amazon Bedrock. Which AWS storage service is most appropriate?',
    koreanQuestion:
'한 회사가 Amazon Bedrock에서 모델 평가에 사용할 데이터셋을 업로드·저장해야 합니다. 어떤 AWS 스토리지 서비스가 가장 적합합니까?',
    explanation:
`【핵심 개념 — Amazon S3와 ML 데이터 저장】
Amazon S3는 확장성·내구성이 높은 객체 스토리지로, Bedrock·SageMaker 등 AI 서비스의 데이터 입출력 표준 저장소입니다. 평가·학습 데이터셋을 올려두고 서비스가 직접 읽습니다.

【정답이 A인 이유】
Bedrock 모델 평가용 데이터셋을 업로드·저장하기에는 AI 서비스와 기본 통합되는 객체 스토리지인 Amazon S3가 가장 적합합니다.

【오답 분석】
• B Amazon EBS: EC2 인스턴스에 붙이는 블록 스토리지로, 서비스 간 공유 데이터셋 저장소로는 부적합합니다.
• C Amazon EFS: 파일 시스템 공유 스토리지로 가능은 하나, Bedrock 데이터셋 입력의 표준은 S3입니다.
• D AWS Snowcone: 오프라인 데이터 전송용 엣지 디바이스로, 클라우드 내 데이터셋 저장과 다릅니다.

【더 알아두기】
'AI/ML 데이터셋 저장 = Amazon S3'가 기본값입니다. 데이터 레이크, 학습/평가 데이터, 모델 산출물 모두 S3를 중심으로 다룹니다.`,
  },
  86: {
    englishQuestion:
'In a prompt-based attack on an LLM, an attacker tries to make the model reveal its underlying system prompt or instructions. What is this technique called?',
    koreanQuestion:
'LLM에 대한 프롬프트 기반 공격에서 공격자가 모델의 내부 시스템 프롬프트나 지침을 노출시키려고 시도합니다. 이 기법을 무엇이라고 합니까?',
    explanation:
`【핵심 개념 — 프롬프트 추출(Prompt Extraction/Leaking)】
프롬프트 추출은 모델이 따르는 숨겨진 시스템 프롬프트·지침을 끄집어내려는 공격입니다. 내부 지침이 노출되면 안전 제약을 우회하거나 동작을 조작당할 수 있습니다.

【정답이 D인 이유】
'프롬프트 템플릿(내부 지침)을 추출'하려는 행위가 바로 프롬프트 추출 공격입니다. 모델의 설정·안전 제한이 드러나는 위험이 있습니다.

【오답 분석】
• A 페르소나 전환(Persona switch): 모델에게 다른 인격을 연기시켜 제한을 우회하려는 별개 기법입니다.
• B 친근함·신뢰 악용: 사회공학적으로 모델을 구슬리는 방식으로, '템플릿 추출' 자체와 다릅니다.
• C 프롬프트 템플릿 무시: 지침을 따르지 않게 만드는 시도로, '추출(노출)'과는 목적이 다릅니다.

【더 알아두기】
프롬프트 공격 유형: 인젝션(injection), 추출/유출(leaking), 탈옥(jailbreak), 페르소나 전환. 방어는 시스템 프롬프트 보호 + Guardrails로 다층화합니다.`,
  },
  87: {
    englishQuestion:
'Under the AWS shared responsibility model, when using Amazon Bedrock, which security task is the customer\'s responsibility?',
    koreanQuestion:
'AWS 공동 책임 모델에서 Amazon Bedrock을 사용할 때, 고객의 책임에 해당하는 보안 작업은 무엇입니까?',
    explanation:
`【핵심 개념 — 공동 책임 모델(Shared Responsibility)】
AWS는 '클라우드의 보안'(인프라·하드웨어·관리형 서비스 운영)을 책임지고, 고객은 '클라우드 내 보안'(자신의 데이터, 접근 통제, 암호화 설정)을 책임집니다.

【정답이 C인 이유】
회사 데이터를 전송 중(in transit)·저장 중(at rest) 안전하게 보호하는 것은 고객의 책임입니다(암호화·접근 통제 설정 등).

【오답 분석】
• A Bedrock 버전 패치·업데이트: 관리형 서비스 운영의 일부로 AWS 책임입니다.
• B Bedrock 호스팅 인프라 보호: 물리·인프라 보안은 AWS 책임입니다.
• D 회사 네트워크 내 Bedrock 프로비저닝: Bedrock은 관리형 서비스로 고객이 인프라를 프로비저닝하지 않습니다.

【더 알아두기】
경계선 기억법: 'OF the cloud(인프라) = AWS', 'IN the cloud(내 데이터·구성·권한) = 고객'. 데이터 보호·IAM은 항상 고객 몫입니다.`,
  },
  88: {
    englishQuestion:
'A company wants to compare several foundation models using standard benchmark datasets with the least operational overhead. Which Amazon Bedrock model evaluation approach should the company use?',
    koreanQuestion:
'한 회사가 표준 벤치마크 데이터셋으로 여러 파운데이션 모델을 가장 적은 운영 부담으로 비교하려고 합니다. 어떤 Amazon Bedrock 모델 평가 방식을 사용해야 합니까?',
    explanation:
`【핵심 개념 — 자동 모델 평가(Automatic Evaluation)】
Bedrock의 자동 모델 평가는 정확도·견고성·유해성 등 표준 지표와 내장 데이터셋으로 모델을 자동 채점합니다. 사람 평가자 없이 빠르게 비교할 수 있어 운영 부담이 가장 적습니다.

【정답이 B인 이유】
표준 벤치마크로 최소 운영 부담의 비교가 목표라면, 사람 개입 없이 지표 기반으로 자동 채점하는 자동 모델 평가가 적합합니다.

【오답 분석】
• A 크라우드 소싱 평가: 다수의 사람을 모아 평가하므로 비용·관리 부담이 큽니다.
• C 인간 평가자 평가: 주관적 품질·톤 평가에 좋지만, 사람을 동원해 운영 부담이 큽니다.
• D RLHF: 사람 피드백으로 모델을 '학습/정렬'하는 기법으로, 단순 모델 비교 평가가 아닙니다.

【더 알아두기】
선택 기준: 객관 지표·빠른 비교 = 자동 평가, 주관적 톤·선호 = 인간 평가. 문제의 '최소 운영 부담'이 자동 평가를 가리킵니다.`,
  },
  89: {
    englishQuestion:
'An attacker crafts inputs that trick an LLM into bypassing its safety guardrails and producing restricted or prohibited content. What is this type of attack called?',
    koreanQuestion:
'공격자가 LLM의 안전 가드레일을 우회하여 제한되거나 금지된 콘텐츠를 생성하도록 속이는 입력을 만듭니다. 이러한 공격 유형을 무엇이라고 합니까?',
    explanation:
`【핵심 개념 — 탈옥(Jailbreak)】
탈옥은 교묘한 프롬프트로 모델의 안전 정책·제한을 우회시켜, 원래 거부해야 할 콘텐츠를 생성하게 만드는 공격입니다.

【정답이 D인 이유】
"안전 가드레일을 우회해 금지된 콘텐츠를 생성"하게 만드는 것이 바로 jailbreak(탈옥) 공격의 정의입니다.

【오답 분석】
• A 학습 데이터 퍼징: 무작위 입력으로 취약점을 찾는 테스트 기법으로, 안전정책 우회 공격과 다릅니다.
• B DoS(서비스 거부): 시스템을 마비시키는 가용성 공격으로, 콘텐츠 제한 우회와 무관합니다.
• C 권한 있는 침투 테스트: 허가받은 보안 점검 활동으로, 악의적 우회 공격이 아닙니다.

【더 알아두기】
LLM 위협: 프롬프트 인젝션, 탈옥(jailbreak), 프롬프트 유출, 데이터 중독. 방어는 Guardrails + 시스템 프롬프트 보호 + 입력 검증으로 다층화합니다.`,
  },
  90: {
    englishQuestion:
'A company must run Amazon SageMaker training and inference jobs in a fully isolated environment with no internet access for security compliance. What should the company configure?',
    koreanQuestion:
'한 회사가 보안 규정 준수를 위해 인터넷 접근이 전혀 없는 완전히 격리된 환경에서 Amazon SageMaker 학습·추론 작업을 실행해야 합니다. 무엇을 구성해야 합니까?',
    explanation:
`【핵심 개념 — 네트워크 격리(Network Isolation)】
SageMaker의 네트워크 격리를 켜면 학습/추론 컨테이너가 외부 네트워크(인터넷)와 통신하지 못하도록 차단됩니다. 민감 데이터 유출 방지 등 강한 보안 요건에 사용합니다.

【정답이 B인 이유】
인터넷 없는 완전 격리 실행이 요구라면, 컨테이너의 외부 통신을 차단하는 SageMaker 네트워크 격리를 구성해야 합니다.

【오답 분석】
• A SageMaker Experiments 사용: 실험 추적·관리 기능으로, 네트워크 격리와 무관합니다.
• C 지리공간 기능 데이터 암호화: 특정 기능의 저장 데이터 암호화로, 인터넷 격리 요건을 충족하지 못합니다.
• D 적절한 IAM 역할 연결: 접근 권한 통제로 보안에 중요하지만, '네트워크 격리(인터넷 차단)' 자체는 제공하지 않습니다.

【더 알아두기】
격리 강화: 네트워크 격리 + VPC 전용 모드 + VPC 엔드포인트. IAM(권한)과 네트워크 격리(통신 차단)는 서로 다른 보안 계층입니다.`,
  },
  91: {
    englishQuestion:
'A company needs to document each ML model\'s intended uses, training and inference details, and evaluation results to support governance and transparency. Which solution should the company use?',
    koreanQuestion:
'한 회사가 거버넌스와 투명성을 위해 각 ML 모델의 의도된 용도, 학습·추론 세부 정보, 평가 결과를 문서화해야 합니다. 어떤 솔루션을 사용해야 합니까?',
    explanation:
`【핵심 개념 — SageMaker Model Cards】
Model Cards는 모델의 목적, 학습/추론 데이터, 성능·평가 지표, 한계·위험을 한곳에 문서화하는 기능입니다. 모델 거버넌스·감사·투명성에 핵심적입니다.

【정답이 C인 이유】
모델의 의도된 용도와 학습/추론 상세, 평가 결과를 표준 양식으로 문서화하려면 SageMaker Model Cards가 정확히 부합합니다.

【오답 분석】
• A S3에 문서 저장: 임의 문서를 보관할 수는 있으나, 모델 메타데이터를 체계적으로 관리·연동하는 표준 솔루션이 아닙니다.
• B AWS AI Service Cards: AWS '관리형 AI 서비스' 자체의 투명성 문서로, 우리가 만든 커스텀 모델 문서화 도구는 아닙니다.
• D 학습 스크립트 Git 커밋: 코드 버전 관리일 뿐, 모델의 용도·평가 결과 문서화는 아닙니다.

【더 알아두기】
혼동 주의: Model Cards(내 모델 문서화) vs AI Service Cards(AWS 서비스 투명성 문서). 거버넌스·감사 문서화 = Model Cards.`,
  },
  92: {
    englishQuestion:
'A company wants to improve its developers\' productivity by providing AI-assisted code suggestions directly in their development tools. What should the company do?',
    koreanQuestion:
'한 회사가 개발 도구에서 직접 AI 기반 코드 제안을 제공하여 개발자 생산성을 높이려고 합니다. 무엇을 해야 합니까?',
    explanation:
`【핵심 개념 — 코드 추천 어시스턴트】
개발 도구(IDE)에 통합되는 코드 추천 AI(예: Amazon Q Developer)는 실시간으로 코드 자동완성·제안·설명을 제공해 개발 속도를 직접 끌어올립니다.

【정답이 B인 이유】
개발자 생산성을 직접 높이려면, 개발 환경에 코드 추천 소프트웨어를 설치해 작업 흐름 안에서 즉시 제안을 받게 하는 것이 가장 효과적입니다.

【오답 분석】
• A 이진 분류 모델로 코드 리뷰 생성: 이진 분류는 '예/아니오' 판정용으로, 코드 제안·생성에 부적합합니다.
• C 코드 예측 도구로 잠재 이슈 예측: 문제 예측은 보조적이며, 생산성 향상의 직접 수단인 코드 제안과는 다릅니다.
• D NLP 도구로 코드 생성: 일반 NLP만으로는 IDE 통합 코드 추천 경험을 제공하기 어렵습니다(전용 코딩 어시스턴트가 적합).

【더 알아두기】
AWS의 코딩 어시스턴트 = Amazon Q Developer(IDE 통합 코드 제안·설명·보안 점검). 개발 생산성 키워드에 연결하세요.`,
  },
  93: {
    englishQuestion:
'A company wants to forecast future values based on historical data that is ordered over time. Which type of data does the Amazon SageMaker DeepAR algorithm work on?',
    koreanQuestion:
'한 회사가 시간 순서로 정렬된 과거 데이터를 기반으로 미래 값을 예측하려고 합니다. Amazon SageMaker DeepAR 알고리즘은 어떤 유형의 데이터를 다룹니까?',
    explanation:
`【핵심 개념 — DeepAR와 시계열 예측】
DeepAR는 시간에 따라 정렬된 데이터(시계열)에서 패턴(추세·계절성)을 학습해 미래 값을 예측하는 SageMaker 내장 알고리즘입니다. 수요·매출·트래픽 예측 등에 쓰입니다.

【정답이 C인 이유】
DeepAR는 시계열(time series) 데이터를 입력으로 미래를 예측하는 알고리즘이므로 정답은 시계열 데이터입니다.

【오답 분석】
• A 텍스트 데이터: NLP 모델(BERT·LLM 등)의 영역으로, DeepAR의 대상이 아닙니다.
• B 이미지 데이터: 컴퓨터 비전 모델의 영역입니다.
• D 이진 데이터: 일반적 파일/비트 데이터로, 시계열 예측 입력 형태가 아닙니다.

【더 알아두기】
'시간 순서 + 미래 예측 = 시계열(DeepAR/Forecast)'. 시계열은 추세·계절성·자기상관 같은 시간 의존 구조가 핵심입니다.`,
  },
  94: {
    englishQuestion:
'A company wants to reduce bias in its ML model that makes decisions affecting different demographic groups. Which approach should the company take?',
    koreanQuestion:
'한 회사가 서로 다른 인구 집단에 영향을 미치는 결정을 내리는 ML 모델의 편향을 줄이려고 합니다. 어떤 접근법을 취해야 합니까?',
    explanation:
`【핵심 개념 — 클래스 불균형과 편향 완화】
특정 집단의 데이터가 과대/과소 대표되면(클래스 불균형) 모델이 편향됩니다. 먼저 불균형을 '측정'하고, 재가중치·리샘플링 등으로 학습 과정을 조정해 공정성을 높입니다.

【정답이 D인 이유】
학습 데이터의 클래스 불균형을 측정하고 그에 맞게 학습 과정을 조정(가중치·샘플링)하면, 집단 간 편향을 체계적으로 완화할 수 있습니다.

【오답 분석】
• A 학습 데이터 크기 줄이기: 데이터를 줄이면 대표성이 더 나빠져 편향이 악화될 수 있습니다.
• B 예측을 과거 결과와 일치시키기: 과거가 이미 편향됐다면 그 편향을 그대로 답습하게 됩니다.
• C 집단별 다른 모델 생성: 집단을 분리해 다루는 것은 차별·운영 복잡성을 키우고 공정성 문제를 악화시킬 수 있습니다.

【더 알아두기】
편향 완화 흐름: 측정(SageMaker Clarify로 불균형·격차 진단) → 보정(재샘플링/재가중치/증강) → 재평가. '측정 후 조정'이 정석입니다.`,
  },
  95: {
    englishQuestion:
'A company wants its model to follow only its given instruction without relying on in-context examples that could be manipulated by an attacker. Which prompting technique uses only the instruction, with no examples?',
    koreanQuestion:
'한 회사가 공격자가 조작할 수 있는 인컨텍스트 예시에 의존하지 않고, 주어진 지시만 따르도록 모델을 동작시키고자 합니다. 예시 없이 지시만 사용하는 프롬프트 기법은 무엇입니까?',
    explanation:
`【핵심 개념 — 제로샷 프롬프팅(Zero-shot)】
제로샷 프롬프팅은 예시(example) 없이 '지시문'만으로 작업을 수행하게 하는 방식입니다. 외부에서 주입될 수 있는 예시에 의존하지 않으므로, 예시를 악용한 조작 가능성을 줄일 수 있습니다.

【정답이 B인 이유】
'예시 없이 지시만 사용'하는 기법은 정의상 제로샷 프롬프팅입니다. 모델이 추가 예시 대신 본래 지시에만 따르게 됩니다.

【오답 분석】
• A 적대적 프롬프팅(Adversarial prompting): 오히려 모델을 속이려는 공격적 입력 기법으로, 방어가 아니라 위협에 해당합니다.
• C 최소-최대 프롬프팅(Least-to-most): 복잡한 문제를 작은 하위 문제로 나눠 푸는 기법으로, '예시 유무'와 초점이 다릅니다.
• D 사고연쇄(Chain-of-thought): 단계별 추론을 유도하는 기법으로, 예시 없이 지시만 쓰는 제로샷과 구분됩니다.

【더 알아두기】
예시 개수로 구분: 0개=Zero-shot, 몇 개=Few-shot. 신뢰할 수 없는 외부 예시 주입을 줄이려면 통제된 지시(제로샷/시스템 프롬프트) 설계가 유리합니다.`,
  },
  96: {
    englishQuestion:
'A company needs a single metric that balances precision and recall to evaluate a classification model, especially with imbalanced classes. Which metric should the company use?',
    koreanQuestion:
'한 회사가 특히 클래스가 불균형한 상황에서 정밀도와 재현율의 균형을 맞춰 분류 모델을 평가할 단일 지표가 필요합니다. 어떤 지표를 사용해야 합니까?',
    explanation:
`【핵심 개념 — F1 점수】
F1 점수는 정밀도(Precision)와 재현율(Recall)의 조화평균입니다. 둘 사이의 균형을 하나의 값으로 보여줘, 클래스가 불균형할 때 정확도(Accuracy)보다 신뢰할 만한 분류 지표입니다.

【정답이 C인 이유】
정밀도와 재현율을 함께 균형 있게 반영하는 단일 지표를 원하면 F1 점수가 정답입니다.

【오답 분석】
• A 정밀도(Precision): 예측한 양성 중 실제 양성 비율만 보며, 재현율과의 균형은 담지 못합니다.
• B 첫 토큰 응답 시간(Time to first token): 생성 모델의 응답 '속도' 지표로, 분류 정확도와 무관합니다.
• D 단어 오류율(Word error rate): 음성 인식(STT) 평가 지표로, 분류 모델 평가용이 아닙니다.

【더 알아두기】
불균형 데이터에서는 Accuracy가 오해를 부릅니다(다수 클래스만 맞혀도 높게 나옴). 정밀도·재현율·F1·PR-AUC를 함께 보세요.`,
  },
  97: {
    englishQuestion:
'A company uses a text-to-image model and wants the generated images to adhere more closely to the text prompt. Which parameter should the company increase?',
    koreanQuestion:
'한 회사가 텍스트-이미지 모델을 사용하며, 생성된 이미지가 텍스트 프롬프트를 더 충실히 따르기를 원합니다. 어떤 파라미터를 높여야 합니까?',
    explanation:
`【핵심 개념 — CFG 스케일(Classifier-Free Guidance)】
CFG 스케일은 이미지 생성 시 모델이 '프롬프트를 얼마나 강하게 따를지'를 조절합니다. 값을 높이면 프롬프트 충실도가 올라가고(대신 다양성·자연스러움은 줄 수 있음), 낮추면 더 자유롭게 생성합니다.

【정답이 C인 이유】
이미지를 텍스트 프롬프트에 더 충실하게 만들려면 CFG 스케일을 높여 프롬프트 가이드를 강화해야 합니다.

【오답 분석】
• A 생성 단계 수 증가: 디테일·품질에 영향을 줄 수 있으나, '프롬프트 충실도'를 직접 조절하는 파라미터는 아닙니다.
• B MASK_IMAGE_BLACK 옵션: 인페인팅/마스킹 영역 지정 옵션으로, 프롬프트 준수 강도와 무관합니다.
• D 프롬프트 강도(prompt strength) 증가: image-to-image에서 원본 대비 변형 정도를 정하는 값으로, 텍스트 프롬프트 충실도를 직접 높이는 CFG와 역할이 다릅니다.

【더 알아두기】
이미지 생성 파라미터: CFG 스케일(프롬프트 충실도), 추론 스텝(디테일), seed(재현성), strength(원본 보존 정도). '프롬프트 더 따르게 = CFG↑'.`,
  },
};
