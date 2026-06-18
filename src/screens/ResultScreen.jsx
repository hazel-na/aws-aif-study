import { useNavigate } from 'react-router-dom';
import useStore, { TOTAL } from '../store/useStore';

export default function ResultScreen() {
  const navigate = useNavigate();
  const progress = useStore(s => s.progress);
  const wrongQuestions = useStore(s => s.wrongQuestions);
  const scrappedQuestions = useStore(s => s.scrappedQuestions);
  const startSession = useStore(s => s.startSession);

  const answered = Object.keys(progress).length;
  const correct = Object.values(progress).filter(p => p.isCorrect).length;
  const wrong = wrongQuestions.length;
  const scrapped = scrappedQuestions.length;
  const pct = answered > 0 ? Math.round((correct / answered) * 100) : 0;

  const handleMode = (mode) => {
    startSession(mode);
    navigate('/quiz');
  };

  return (
    <div className="h-[100dvh] overflow-y-auto bg-sky-50">
      <div className="px-5 pt-8 pb-safe-bottom space-y-5">
        {/* 점수 헤더 */}
        <div className="text-center">
          <div className="text-6xl font-extrabold text-sky-500">{pct}%</div>
          <p className="text-slate-500 text-sm mt-1">{correct} / {answered} 정답</p>
          <p className="text-xs text-slate-400 mt-0.5">전체 {TOTAL}문제 중 {answered}문제 응시</p>
        </div>

        {/* 3개 카드 */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <div className="text-2xl font-extrabold text-emerald-500">{correct}</div>
            <p className="text-xs text-slate-400 mt-1">맞은 문제</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <div className="text-2xl font-extrabold text-red-500">{wrong}</div>
            <p className="text-xs text-slate-400 mt-1">오답</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <div className="text-2xl font-extrabold text-amber-500">{scrapped}</div>
            <p className="text-xs text-slate-400 mt-1">스크랩</p>
          </div>
        </div>

        {/* 합격선 안내 */}
        <div className={`rounded-2xl p-4 text-center ${pct >= 70 ? 'bg-emerald-50' : 'bg-amber-50'}`}>
          <p className={`font-bold text-sm ${pct >= 70 ? 'text-emerald-700' : 'text-amber-700'}`}>
            {pct >= 70 ? '🎉 합격선 달성! (70% 이상)' : `⚡ 합격까지 ${70 - pct}% 남았습니다`}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            AWS AIF-C01 합격 기준: 70% 이상
          </p>
        </div>

        {/* CTA 버튼 (엄지 닿는 하단에 배치) */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => handleMode('wrong')}
            disabled={wrong === 0}
            className="
              w-full h-14 bg-sky-500 text-white font-extrabold rounded-2xl text-sm
              shadow-lg active:scale-[0.97] transition-all
              disabled:bg-slate-200 disabled:text-slate-400
            "
          >
            ❌ 오답만 다시 풀기 {wrong > 0 && `(${wrong}개)`}
          </button>

          <button
            onClick={() => handleMode('scrapped')}
            disabled={scrapped === 0}
            className="
              w-full h-14 bg-amber-400 text-white font-extrabold rounded-2xl text-sm
              shadow-lg active:scale-[0.97] transition-all
              disabled:bg-slate-200 disabled:text-slate-400
            "
          >
            ⭐ 스크랩 문제 복습하기 {scrapped > 0 && `(${scrapped}개)`}
          </button>

          <button
            onClick={() => handleMode('all')}
            className="w-full h-12 bg-white border-2 border-sky-500 text-sky-600 font-bold rounded-2xl text-sm"
          >
            🚀 전체 문제 다시 풀기
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full h-11 text-slate-400 text-sm"
          >
            대시보드로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
