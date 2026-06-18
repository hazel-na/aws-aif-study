import useStore from '../store/useStore';

export default function Navigator({ onClose }) {
  const session = useStore(s => s.currentSession);
  const progress = useStore(s => s.progress);
  const scrappedQuestions = useStore(s => s.scrappedQuestions);
  const jumpToIndex = useStore(s => s.jumpToIndex);

  if (!session) return null;

  const { sessionQuestionIds, currentIndex } = session;

  const handleJump = (idx) => {
    jumpToIndex(idx);
    onClose();
  };

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <h3 className="font-bold text-slate-700">문항 이동</h3>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500"
        >
          ✕
        </button>
      </div>

      {/* 범례 */}
      <div className="flex gap-3 px-4 py-2 text-xs text-slate-500 border-b border-slate-100">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-sky-500 inline-block" /> 정답
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-red-400 inline-block" /> 오답
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-amber-400 inline-block" /> 스크랩
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-slate-200 inline-block" /> 미풀이
        </span>
      </div>

      {/* 그리드 */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-10 gap-1">
          {sessionQuestionIds.map((qId, idx) => {
            const p = progress[qId];
            const isCurrent = idx === currentIndex;
            const isScrapped = scrappedQuestions.includes(qId);

            let bg = 'bg-slate-100 text-slate-500';
            if (p?.isCorrect) bg = 'bg-sky-500 text-white';
            else if (p && !p.isCorrect) bg = 'bg-red-400 text-white';

            return (
              <button
                key={qId}
                onClick={() => handleJump(idx)}
                className={`
                  relative aspect-square rounded-md text-xs font-medium
                  flex items-center justify-center
                  transition-transform active:scale-90
                  ${bg}
                  ${isCurrent ? 'ring-2 ring-offset-1 ring-sky-600 scale-110' : ''}
                `}
              >
                {isScrapped && (
                  <span className="absolute top-0 right-0 text-[8px] text-amber-400">★</span>
                )}
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
