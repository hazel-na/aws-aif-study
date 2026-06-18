import { useEffect, useRef, useState } from 'react';
import Tooltip from './Tooltip';

export default function BottomSheet({ question, userAnswer, isCorrect, onNext, onClose }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // 마운트 시 살짝 딜레이 후 슬라이드업
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  const isHotspot = question.isHotspot || question.correctAnswer === 'HOTSPOT' || question.correctAnswer === 'UNKNOWN';

  // 해설 텍스트에서 용어를 찾아 Tooltip으로 래핑
  const renderExplanation = (text) => {
    if (!text) return null;
    if (!question.vocabulary?.length) return <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{text}</p>;

    const vocab = question.vocabulary;
    let result = text;
    const parts = [];
    let remaining = result;

    // 간단한 term 하이라이팅
    for (const v of vocab) {
      if (!v.term || !v.definition) continue;
      const idx = remaining.indexOf(v.term);
      if (idx >= 0) {
        if (idx > 0) parts.push(<span key={parts.length}>{remaining.substring(0, idx)}</span>);
        parts.push(
          <Tooltip key={parts.length} term={v.term} definition={v.definition}>
            {v.term}
          </Tooltip>
        );
        remaining = remaining.substring(idx + v.term.length);
      }
    }
    if (remaining) parts.push(<span key={parts.length}>{remaining}</span>);

    return (
      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
        {parts.length > 1 ? parts : text}
      </p>
    );
  };

  return (
    <>
      {/* 딤 오버레이 */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />

      {/* 바텀 시트 */}
      <div
        ref={ref}
        className={`
          fixed bottom-0 left-0 right-0 z-50
          bg-white rounded-t-3xl shadow-2xl
          max-h-[80dvh] flex flex-col
          transition-transform duration-300 ease-out
          ${visible ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        {/* 드래그 핸들 */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-slate-200" />
        </div>

        <div className="overflow-y-auto flex-1 px-5 pb-4">
          {isHotspot ? (
            /* HOTSPOT/매칭형 문제 안내 */
            <div className="space-y-4">
              <div className="flex items-center gap-2 bg-purple-50 rounded-xl p-3">
                <span className="text-2xl">📋</span>
                <div>
                  <p className="font-bold text-purple-700 text-sm">매칭/순서형 문제</p>
                  <p className="text-xs text-purple-600">이 문제는 서술형 답안입니다. 해설을 참고하세요.</p>
                </div>
              </div>
              {question.explanation && (
                <div>
                  <h4 className="font-bold text-slate-600 text-sm mb-2 flex items-center gap-1">
                    <span className="text-base">📖</span> 해설
                  </h4>
                  {renderExplanation(question.explanation)}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* 1. 정답/오답 결과 */}
              <div className={`flex items-center gap-3 rounded-xl p-3 ${isCorrect ? 'bg-emerald-50' : 'bg-red-50'}`}>
                <span className="text-3xl">{isCorrect ? '✅' : '❌'}</span>
                <div>
                  <p className={`font-bold text-sm ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                    {isCorrect ? '정답입니다!' : '오답입니다'}
                  </p>
                  <p className="text-xs text-slate-500">
                    {isCorrect ? '잘하셨어요!' : `내 답: ${userAnswer} | 정답: ${question.correctAnswer}`}
                  </p>
                </div>
              </div>

              {/* 2. 정답 표시 */}
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs font-bold text-slate-500 mb-1">✨ 정답</p>
                <p className="text-sm font-semibold text-slate-800">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold mr-2">
                    {question.correctAnswer}
                  </span>
                  {question.choices.find(c => c.key === question.correctAnswer)?.enText || ''}
                </p>
                {question.choices.find(c => c.key === question.correctAnswer)?.koText && (
                  <p className="text-xs text-slate-500 ml-8 mt-0.5">
                    {question.choices.find(c => c.key === question.correctAnswer)?.koText}
                  </p>
                )}
              </div>

              {/* 3. 해설 */}
              {question.explanation && (
                <div>
                  <h4 className="font-bold text-slate-600 text-sm mb-2 flex items-center gap-1">
                    <span className="text-base">📖</span> 해설
                  </h4>
                  {renderExplanation(question.explanation)}
                </div>
              )}

              {/* 4. 용어 정리 */}
              {question.vocabulary?.length > 0 && (
                <div className="bg-sky-50 rounded-xl p-3">
                  <h4 className="font-bold text-sky-700 text-sm mb-2 flex items-center gap-1">
                    <span>📚</span> 핵심 용어
                  </h4>
                  <div className="space-y-2">
                    {question.vocabulary.map((v, i) => (
                      <div key={i} className="border-l-2 border-sky-300 pl-2">
                        <p className="text-xs font-bold text-sky-700">{v.term}</p>
                        <p className="text-xs text-slate-600 mt-0.5">{v.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 다음 문제 버튼 */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={onNext}
            className="w-full h-12 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-bold rounded-2xl text-sm transition-colors"
          >
            다음 문제 →
          </button>
        </div>
      </div>
    </>
  );
}
