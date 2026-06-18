export default function ProgressRing({ answered, total, size = 160 }) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = total > 0 ? answered / total : 0;
  const offset = circumference * (1 - pct);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* 배경 트랙 */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#E0F2FE"
            strokeWidth={14}
          />
          {/* 진도 호 */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#0EA5E9"
            strokeWidth={14}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>
        {/* 중앙 텍스트 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-sky-500 leading-none">{answered}</span>
          <div className="w-6 h-px bg-slate-300 my-1" />
          <span className="text-sm font-medium text-slate-400">{total}</span>
        </div>
      </div>
      <p className="text-xs text-slate-500 font-medium">
        {total > 0 ? `${Math.round(pct * 100)}% 완료` : '학습 시작'}
      </p>
    </div>
  );
}
