export default function AnswerOption({
  choice,
  selected,
  submitted,
  isCorrect,
  isUserChoice,
  showBilingual,
  onSelect,
}) {
  let bgClass = 'bg-white border-slate-200 text-slate-800';
  let iconEl = null;

  if (submitted) {
    if (isCorrect) {
      bgClass = 'bg-emerald-50 border-emerald-400 text-emerald-800';
      iconEl = (
        <span className="ml-auto text-emerald-500 font-bold text-lg">✓</span>
      );
    } else if (isUserChoice && !isCorrect) {
      bgClass = 'bg-red-50 border-red-400 text-red-800';
      iconEl = (
        <span className="ml-auto text-red-500 font-bold text-lg">✗</span>
      );
    }
  } else if (selected) {
    bgClass = 'bg-sky-50 border-sky-400 text-sky-800';
  }

  return (
    <button
      onClick={() => !submitted && onSelect(choice.key)}
      disabled={submitted}
      className={`
        w-full min-h-[52px] flex items-start gap-3 px-4 py-3
        rounded-xl border-2 text-left
        transition-all duration-150 active:scale-[0.98]
        ${bgClass}
        ${!submitted ? 'active:bg-sky-100 cursor-pointer' : 'cursor-default'}
      `}
    >
      {/* 선택지 키 뱃지 */}
      <span className={`
        shrink-0 w-7 h-7 rounded-full flex items-center justify-center
        text-sm font-bold border-2
        ${submitted && isCorrect
          ? 'bg-emerald-500 border-emerald-500 text-white'
          : submitted && isUserChoice && !isCorrect
            ? 'bg-red-500 border-red-500 text-white'
            : selected
              ? 'bg-sky-500 border-sky-500 text-white'
              : 'bg-slate-100 border-slate-300 text-slate-600'}
      `}>
        {choice.key}
      </span>

      {/* 텍스트 영역 */}
      <div className="flex-1 min-w-0">
        {showBilingual ? (
          <>
            <p className="text-sm font-medium leading-snug">{choice.enText}</p>
            {choice.koText && (
              <p className="text-xs text-slate-500 mt-0.5 leading-snug">{choice.koText}</p>
            )}
          </>
        ) : (
          <p className="text-sm font-medium leading-snug">
            {choice.koText || choice.enText}
          </p>
        )}
      </div>

      {iconEl}
    </button>
  );
}
