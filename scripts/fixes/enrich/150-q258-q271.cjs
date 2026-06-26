/* 해설 보강 + 선택지 한글 — Q258~Q271. struct: 257,264,267 제외 */
module.exports = {
  258: {
    choicesKo: { A: 'SageMaker Canvas', B: 'SageMaker Clarify', C: 'SageMaker Model Monitor', D: 'SageMaker Data Wrangler' },
    explanation:
`【핵심 개념 — SageMaker Canvas(노코드 예측)】
SageMaker Canvas는 코드 없이 시각적 인터페이스에서 데이터를 불러와 ML 모델을 만들고 예측하는 노코드 도구입니다. ML 지식이 적어도 사용할 수 있습니다.

【정답이 A인 이유】
ML 지식이 거의 없는 사람이 코드 없이 직원 이직률을 예측하려면, 노코드 ML 도구인 SageMaker Canvas가 정답입니다.

【오답 분석】
• B SageMaker Clarify: 편향·설명가능성 분석 도구로, 노코드 예측 모델 구축 도구가 아닙니다.
• C SageMaker Model Monitor: 배포 모델의 드리프트 모니터링 도구입니다.
• D SageMaker Data Wrangler: 데이터 전처리·변환 도구로, 모델을 직접 만들어 예측하는 노코드 솔루션은 Canvas입니다.

【더 알아두기】
'코드 없이 예측 모델 = SageMaker Canvas'. 비전문가·분석가가 표 형식 데이터로 예측할 때 적합합니다.`,
  },
  259: {
    choicesKo: { A: '고급 코딩 기술 교육', B: '데이터 프라이버시·암호화 프로토콜 교육', C: '편향 인식 및 책임 있는 AI 교육', D: '고급 ML 알고리즘 교육' },
    explanation:
`【핵심 개념 — 책임 있는 AI 교육】
공정하고 설명 가능한 AI를 만들려면, 개발팀이 편향(bias)을 인식하고 책임 있는 AI 원칙(공정성·투명성·설명가능성)을 이해해야 합니다.

【정답이 C인 이유】
AI의 공정성·설명가능성을 보장하려면, 팀에 편향 인식과 책임 있는 AI에 대한 교육을 제공하는 것이 직접적인 조치입니다.

【오답 분석】
• A 고급 코딩 기술 교육: 구현 역량과 관련될 뿐, 공정성·설명가능성 보장과 직접 관련이 없습니다.
• B 데이터 프라이버시·암호화 교육: 보안 영역으로, 공정성·편향 인식과는 초점이 다릅니다.
• D 고급 ML 알고리즘 교육: 모델 성능 향상에 관한 것으로, 책임 있는 AI 보장의 핵심은 아닙니다.

【더 알아두기】
책임 있는 AI는 기술뿐 아니라 '사람·프로세스'의 문제입니다. 편향 인식 교육 + 거버넌스 + 도구(Clarify)가 함께 필요합니다.`,
  },
  260: {
    choicesKo: { A: '모델 해석 가능성(Interpretability)', B: '모델 학습(Training)', C: '모델 상호운용성(Interoperability)', D: '모델 성능(Performance)' },
    explanation:
`【핵심 개념 — 해석 가능성(Interpretability)】
해석 가능성은 모델이 '어떻게/왜' 그런 예측을 내리는지 사람이 이해할 수 있는 능력입니다. 설명가능성과 함께 책임 있는 AI의 핵심입니다.

【정답이 A인 이유】
'모델이 예측을 어떻게 수행하는지 이해'하는 것과 관련된 용어는 모델 해석 가능성(Interpretability)입니다.

【오답 분석】
• B 모델 학습: 데이터로 모델을 만드는 과정으로, 예측 방식의 '이해'와 다릅니다.
• C 모델 상호운용성(Interoperability): 서로 다른 시스템·형식 간 호환성을 뜻하는 용어로, 예측 이해와 무관합니다(이름이 비슷해 혼동 주의).
• D 모델 성능: 정확도 등 '얼마나 잘 맞히는가'로, '어떻게 예측하는가'의 이해와 다릅니다.

【더 알아두기】
혼동 주의: Interpretability(해석 가능성) ≠ Interoperability(상호운용성). 예측 근거 이해 = 해석 가능성/설명가능성.`,
  },
  261: {
    choicesKo: { A: 'K-최근접 이웃(k-NN)', B: 'K-평균(K-means)', C: '의사결정 트리', D: '서포트 벡터 머신(SVM)' },
    explanation:
`【핵심 개념 — K-means(고객 세분화)】
K-means는 라벨 없이 데이터를 K개의 유사 그룹으로 묶는 비지도 군집화 알고리즘입니다. 인구통계·구매 패턴으로 고객 그룹을 자동 식별하는 데 대표적으로 쓰입니다.

【정답이 B인 이유】
사전 라벨 없이 고객을 그룹으로 식별하려면 비지도 군집화 알고리즘 K-means가 정답입니다.

【오답 분석】
• A k-NN: 라벨이 필요한 '지도' 분류 알고리즘으로, 그룹 발견(비지도)과 다릅니다(이름 함정).
• C 의사결정 트리: 라벨이 필요한 지도 분류·회귀 알고리즘입니다.
• D SVM: 라벨이 필요한 지도 분류 알고리즘입니다.

【더 알아두기】
세분화/그룹 발견(라벨 없음) = K-means. 이름이 비슷한 k-NN은 지도 분류이니 헷갈리지 마세요.`,
  },
  262: {
    choicesKo: { A: 'Temperature(온도)', B: 'Batch size(배치 크기)', C: 'Learning rate(학습률)', D: 'Optimizer type(옵티마이저 종류)' },
    explanation:
`【핵심 개념 — Temperature와 출력 다양성】
Temperature는 다음 토큰 선택의 무작위성을 조절합니다. 값을 높이면 더 다양하고 창의적인 출력이, 낮추면 더 결정적·반복적인 출력이 나옵니다.

【정답이 A인 이유】
출력이 충분히 다양하지 않을 때는 temperature 값을 높여 다양성을 키워야 합니다.

【오답 분석】
• B Batch size: 한 번에 처리하는 샘플 수로, 출력 다양성과 무관합니다.
• C Learning rate: 학습 시 가중치 갱신 폭을 정하는 '학습' 하이퍼파라미터로, 추론 출력 다양성을 직접 조절하지 않습니다.
• D Optimizer type: 학습 최적화 알고리즘 종류로, 추론 출력 다양성과 관련이 없습니다.

【더 알아두기】
추론 다양성 = Temperature/Top-K/Top-P. 학습 관련(배치·학습률·옵티마이저)과 구분하세요.`,
  },
  263: {
    choicesKo: { A: '더 높은 temperature 값 사용', B: '더 상세한 프롬프트 사용', C: '네거티브 프롬프트 사용', D: '다른 FM 사용' },
    explanation:
`【핵심 개념 — 네거티브 프롬프트(Negative Prompt)】
네거티브 프롬프트는 생성 결과에 '포함하지 말 것'을 명시해, 모델이 특정 항목·스타일을 피해 이미지를 생성하게 합니다.

【정답이 C인 이유】
이미지에 특정 항목이 나타나지 않게 하려면, 제외 대상을 지정하는 네거티브 프롬프트를 사용하는 것이 정답입니다.

【오답 분석】
• A 더 높은 temperature: 출력의 무작위성을 키울 뿐, 특정 항목 배제와 무관합니다.
• B 더 상세한 프롬프트: 원하는 것을 더 구체화할 수는 있으나, '특정 항목 제외'를 직접·확실하게 지정하는 것은 네거티브 프롬프트입니다.
• D 다른 FM 사용: 모델을 바꿔도 배제 지시가 없으면 원치 않는 항목이 다시 나타날 수 있습니다.

【더 알아두기】
이미지 제어: 포지티브(넣을 것) + 네거티브(뺄 것) 프롬프트, CFG 스케일(프롬프트 충실도). 배제 = 네거티브 프롬프트.`,
  },
  265: {
    choicesKo: { A: 'Amazon SageMaker Data Wrangler', B: 'Amazon SageMaker Ground Truth Plus', C: 'Amazon Transcribe', D: 'Amazon Macie' },
    explanation:
`【핵심 개념 — Ground Truth Plus(완전 위탁 라벨링)】
Ground Truth Plus는 AWS가 라벨링 작업과 작업 인력을 대신 관리해 주는 서비스입니다. 고객은 데이터를 제공하고 고품질 라벨 결과만 받으면 됩니다.

【정답이 B인 이유】
라벨링 애플리케이션 개발이나 인력 관리 없이 사람 피드백 기반 라벨링을 얻으려면, AWS가 모든 것을 관리하는 Ground Truth Plus가 정답입니다.

【오답 분석】
• A SageMaker Data Wrangler: 데이터 전처리 도구로, 사람 기반 라벨링 위탁 서비스가 아닙니다.
• C Amazon Transcribe: 음성을 텍스트로 변환하는 STT 서비스입니다.
• D Amazon Macie: S3의 민감정보(PII)를 탐지하는 보안 서비스입니다.

【더 알아두기】
라벨링: Ground Truth(자체 작업자/Mechanical Turk 관리), Ground Truth Plus(AWS 완전 위탁). 인력 관리 불필요 = Plus.`,
  },
  266: {
    choicesKo: { A: 'Amazon Comprehend', B: 'Amazon Personalize', C: 'Amazon Polly', D: 'Amazon OpenSearch Service' },
    explanation:
`【핵심 개념 — OpenSearch의 벡터 검색】
Amazon OpenSearch Service는 k-NN(최근접 이웃) 벡터 검색을 지원해, 임베딩 기반 유사도 검색·필터링을 수행하는 벡터 데이터베이스로 활용됩니다.

【정답이 D인 이유】
유사도 검색·최근접 이웃 쿼리를 지원하는 벡터 데이터베이스가 필요하므로, 벡터 검색을 제공하는 Amazon OpenSearch Service가 정답입니다.

【오답 분석】
• A Amazon Comprehend: 텍스트 분석 NLP 서비스로, 벡터 DB가 아닙니다.
• B Amazon Personalize: 추천 시스템 서비스입니다.
• C Amazon Polly: 텍스트를 음성으로 바꾸는 TTS 서비스입니다.

【더 알아두기】
AWS 벡터 검색: OpenSearch(k-NN), Aurora/RDS PostgreSQL(pgvector), Bedrock Knowledge Bases. '유사도·최근접 이웃 = 벡터 DB(OpenSearch)'.`,
  },
  268: {
    choicesKo: { A: '분류(Classification)', B: '지속적 사전학습(Continued pre-training)', C: '증류(Distillation)', D: '회귀(Regression)' },
    explanation:
`【핵심 개념 — 지속적 사전학습으로 도메인 맞춤화】
내부 문서(라벨 없는 도메인 데이터)로 FM을 맞춤화하려면, 그 데이터로 모델을 추가 사전학습(continued pre-training)해 도메인 지식을 흡수시킵니다.

【정답이 B인 이유】
회사 내부 문서로 FM을 맞춤화하려면, 도메인 데이터로 추가 학습하는 지속적 사전학습이 적합합니다.

【오답 분석】
• A 분류(Classification): 데이터를 범주로 나누는 작업 유형으로, FM 맞춤화 방법이 아닙니다.
• C 증류(Distillation): 큰 모델의 지식을 작은 모델로 옮겨 경량화하는 기법으로, 도메인 지식 추가와 다릅니다.
• D 회귀(Regression): 연속값 예측 작업 유형으로, FM 맞춤화 방법이 아닙니다.

【더 알아두기】
맞춤화: 라벨 없는 도메인 문서=지속 사전학습, 라벨된 작업 데이터=파인튜닝, 최신 사실 주입=RAG.`,
  },
  269: {
    choicesKo: { A: 'SageMaker AI 엔드포인트 재시작', B: '모니터링 민감도 조정', C: '최신 데이터로 모델 재학습', D: '실험 추적 설정' },
    explanation:
`【핵심 개념 — 드리프트 대응 = 재학습】
데이터 드리프트(입력 분포 변화)가 임계치를 넘으면 모델이 더 이상 현재 데이터를 잘 반영하지 못합니다. 해결책은 최신 데이터로 모델을 재학습하는 것입니다.

【정답이 C인 이유】
드리프트로 인한 성능 저하를 완화하려면, 최신 데이터로 모델을 재학습해 현재 데이터 분포를 반영해야 합니다.

【오답 분석】
• A 엔드포인트 재시작: 인프라 재기동일 뿐, 데이터 드리프트(모델 노후화) 문제를 해결하지 못합니다.
• B 모니터링 민감도 조정: 알림 기준만 바꾸는 것으로, 근본 원인(드리프트)을 완화하지 못합니다.
• D 실험 추적 설정: 실험을 기록·관리하는 기능으로, 드리프트 대응 조치가 아닙니다.

【더 알아두기】
MLOps 루프: 드리프트 감지(Model Monitor) → 최신 데이터로 재학습 → 재배포. 드리프트 = 재학습 신호.`,
  },
  270: {
    choicesKo: {
      A: 'ML 모델 대신 규칙 기반 시스템 사용',
      B: '설명가능 AI 기법으로 결정에 영향을 준 요인을 고객에게 제시',
      C: '고객용 인터랙티브 UI 개발 및 기술적 설명 제공',
      D: '투명성 필요를 줄이기 위해 모델 정확도를 높임',
    },
    explanation:
`【핵심 개념 — 설명가능 AI(XAI)로 투명성 제공】
신용 한도 결정처럼 고객에게 영향을 주는 결정은, 어떤 요인이 결과에 영향을 미쳤는지 설명할 수 있어야 합니다. XAI 기법(SHAP 등)이 이를 제공합니다.

【정답이 B인 이유】
모델의 의사결정을 고객에게 투명하게 보여주려면, 결정에 영향을 준 요인을 제시하는 설명가능 AI 기법을 적용하는 것이 정답입니다.

【오답 분석】
• A 규칙 기반 시스템으로 대체: 모델을 바꾸는 큰 변경으로, 'AI 결정의 투명성 제공'이라는 요구를 직접 해결하는 방법이 아닙니다.
• C 인터랙티브 UI + 기술적 설명: UI는 전달 수단일 뿐이고, 일반 고객에게 '기술적' 설명은 오히려 이해를 어렵게 합니다(핵심은 영향을 준 요인 제시).
• D 정확도를 높여 투명성 필요 감소: 정확도가 높아도 '왜 그런 결정인지'에 대한 설명 의무는 사라지지 않습니다.

【더 알아두기】
투명성·설명가능성 = XAI(SHAP/LIME, SageMaker Clarify). 고위험 금융 결정에서 특히 중요합니다.`,
  },
  271: {
    choicesKo: {
      A: '모델 재학습 + SageMaker Clarify로 드리프트 모니터링',
      B: '모델 재학습 + SageMaker Model Monitor로 드리프트 모니터링',
      C: '새 모델 구축 + SageMaker Feature Store로 드리프트 모니터링',
      D: '새 모델 구축 + SageMaker JumpStart로 드리프트 모니터링',
    },
    explanation:
`【핵심 개념 — 품질 저하 대응 + 지속 모니터링】
배포 후 추론 품질이 떨어졌다면 최신 데이터로 재학습하고, 같은 문제가 재발하지 않도록 SageMaker Model Monitor로 드리프트를 지속 감시하며 알림을 받아야 합니다.

【정답이 B인 이유】
품질 저하를 해결(재학습)하고, 향후 저하 시 알림을 받으려면 드리프트 모니터링 도구인 SageMaker Model Monitor를 함께 쓰는 B가 정답입니다.

【오답 분석】
• A 재학습 + Clarify로 드리프트 모니터링: Clarify는 편향·설명 분석 도구로, 운영 중 '드리프트 모니터링·알림'의 정식 도구는 Model Monitor입니다.
• C 새 모델 + Feature Store: Feature Store는 피처 저장·공유 도구로, 드리프트 모니터링 기능이 아닙니다.
• D 새 모델 + JumpStart: JumpStart는 모델 배포 허브로, 드리프트 모니터링 도구가 아닙니다.

【더 알아두기】
운영 품질 저하 = 재학습 + Model Monitor(지속 감시·알림). 'Clarify(분석) vs Model Monitor(운영 모니터링)'를 구분하세요.`,
  },
};
