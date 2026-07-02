import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore, { allQuestions, checkCorrect } from '../store/useStore';
import BottomSheet from '../components/BottomSheet';

function fmtDuration(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}분 ${s.toString().padStart(2, '0')}초`;
}

export default function ExamResultScreen() {
  const navigate = useNavigate();
  const result = useStore(s => s.examResult);
  const startExam = useStore(s => s.startExam);
  const startSessionWithIds = useStore(s => s.startSessionWithIds);
  const [filter, setFilter] = useState('wrong'); // 'wrong' | 'all'
  const [reviewId, setReviewId] = useState(null);

  if (!result) {
    return (
      <div className="h-[100dvh] flex flex-col items-center justify-center gap-4 px-6">
        <p className="text-slate-500 text-sm">모의고사 결과가 없습니다.</p>
        <button onClick={() => navigate('/')} className="h-11 px-6 bg-sky-500 text-white font-bold rounded-xl text-sm">대시보드로</button>
      </div>
    );
  }

  const { correct, total, wrong, score, passScore = 70, durationSec, questionIds, answers } = result;
  const passed = score >= passScore;

  const listIds = filter === 'wrong' ? wrong : questionIds;
  const reviewQuestion = reviewId != null ? allQuestions.find(q => q.id === reviewId) : null;

  const handleRetry = () => {
    startExam();
    navigate('/exam', { replace: true });
  };

  const handleReviewWrong = () => {
    if (startSessionWithIds(wrong, 'wrong')) navigate('/quiz');
  };

  return (
    <div className="h-[100dvh] overflow-y-auto bg-sky-50">
      <div className="px-5 pt-8 pb-10 space-y-5">
        {/* 점수 헤더 */}
        <div className="text-center">
          <p className="text-xs text-indigo-500 font-bold mb-1">📝 모의고사 결과</p>
          <div className={`text-6xl font-extrabold ${passed ? 'text-emerald-500' : 'text-red-500'}`}>{score}%</div>
          <p className="text-slate-500 text-sm mt-1">{correct} / {total} 정답</p>
        </div>

        {/* 합격 여부 */}
        <div className={`rounded-2xl p-4 text-center ${passed ? 'bg-emerald-50' : 'bg-red-50'}`}>
          <p className={`font-extrabold text-base ${passed ? 'text-emerald-700' : 'text-red-600'}`}>
            {passed ? '🎉 합격입니다!' : '😢 불합격'}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            합격 기준 {passScore}% · 소요 시간 {fmtDuration(durationSec)}
          </p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <div className="text-2xl font-extrabold text-emerald-500">{correct}</div>
            <p className="text-xs text-slate-400 mt-1">정답</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <div className="text-2xl font-extrabold text-red-500">{wrong.length}</div>
            <p className="text-xs text-slate-400 mt-1">오답</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <div className="text-2xl font-extrabold text-slate-600">{total}</div>
            <p className="text-xs text-slate-400 mt-1">전체</p>
          </div>
        </div>

        {/* 문제 리뷰 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-700 text-sm">📋 문제 리뷰</h2>
            <div className="bg-white rounded-xl p-1 flex gap-1 shadow-sm">
              <button
                onClick={() => setFilter('wrong')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${filter === 'wrong' ? 'bg-red-500 text-white' : 'text-slate-500'}`}
              >
                오답 {wrong.length}
              </button>
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${filter === 'all' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}
              >
                전체 {total}
              </button>
            </div>
          </div>

          {listIds.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <p className="text-sm text-emerald-600 font-bold">🎯 오답이 없습니다. 완벽해요!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {listIds.map((qId) => {
                const q = allQuestions.find(x => x.id === qId);
                if (!q) return null;
                const ua = answers[qId];
                const ok = checkCorrect(q, ua);
                const num = questionIds.indexOf(qId) + 1;
                return (
                  <button
                    key={qId}
                    onClick={() => setReviewId(qId)}
                    className="w-full bg-white rounded-2xl p-3 shadow-sm flex items-start gap-3 text-left active:scale-[0.99] transition-transform"
                  >
                    <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold text-white ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
                      {ok ? '✓' : '✗'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-400 mb-0.5">Q.{num} · 문제 #{qId}</p>
                      <p className="text-sm text-slate-700 leading-snug line-clamp-2">
                        {q.koreanQuestion || q.englishQuestion}
                      </p>
                      <p className="text-xs mt-1">
                        <span className="text-slate-400">내 답 </span>
                        <span className={ok ? 'text-emerald-600 font-bold' : 'text-red-500 font-bold'}>
                          {ua == null ? '미응답' : (Array.isArray(ua) ? ua.join(', ') : ua)}
                        </span>
                      </p>
                    </div>
                    <span className="text-slate-300 text-sm mt-2">›</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="space-y-3 pt-2">
          {wrong.length > 0 && (
            <button
              onClick={handleReviewWrong}
              className="w-full h-14 bg-red-500 text-white font-extrabold rounded-2xl text-sm shadow-lg active:scale-[0.97] transition-all"
            >
              ❌ 틀린 문제만 다시 풀기 ({wrong.length}개)
            </button>
          )}
          <button
            onClick={handleRetry}
            className="w-full h-14 bg-indigo-500 text-white font-extrabold rounded-2xl text-sm shadow-lg active:scale-[0.97] transition-all"
          >
            🔁 새 모의고사 다시 보기
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full h-11 text-slate-400 text-sm"
          >
            대시보드로 돌아가기
          </button>
        </div>
      </div>

      {/* 문제별 상세 해설 */}
      {reviewQuestion && (
        <BottomSheet
          question={reviewQuestion}
          userAnswer={answers[reviewId]}
          isCorrect={checkCorrect(reviewQuestion, answers[reviewId])}
          showStem
          nextLabel="닫기"
          onNext={() => setReviewId(null)}
          onClose={() => setReviewId(null)}
        />
      )}
    </div>
  );
}
