import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressRing from '../components/ProgressRing';
import useStore, { TOTAL } from '../store/useStore';

const CATEGORY_META = {
  'ml-basics':     { label: 'AI / ML 기초',       emoji: '🤖', color: '#0EA5E9' },
  'deep-learning': { label: '딥러닝 & 모델 평가',   emoji: '🧠', color: '#8B5CF6' },
  'generative-ai': { label: '생성형 AI & LLM',     emoji: '✨', color: '#F59E0B' },
  'aws-services':  { label: 'AWS AI 서비스',        emoji: '☁️', color: '#FF9900' },
  'ai-ethics':     { label: 'AI 윤리 & 보안',       emoji: '⚖️', color: '#EF4444' },
};

export default function DashboardScreen() {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState('all');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const startSession = useStore(s => s.startSession);
  const resetAll = useStore(s => s.resetAll);
  const getOverallProgress = useStore(s => s.getOverallProgress);
  const getCategoryProgress = useStore(s => s.getCategoryProgress);
  const wrongQuestions = useStore(s => s.wrongQuestions);
  const scrappedQuestions = useStore(s => s.scrappedQuestions);
  const bookmark = useStore(s => s.bookmark);
  const resumeBookmark = useStore(s => s.resumeBookmark);
  const clearBookmark = useStore(s => s.clearBookmark);
  const startExam = useStore(s => s.startExam);
  const examResult = useStore(s => s.examResult);

  const overall = getOverallProgress();

  const handleStart = () => {
    startSession(activeMode);
    navigate('/quiz');
  };

  const handleResumeBookmark = () => {
    resumeBookmark();
    navigate('/quiz');
  };

  const handleStartExam = () => {
    startExam();
    navigate('/exam');
  };

  const MODE_LABEL = { all: '전체 문제', wrong: '오답 복습', scrapped: '스크랩 복습' };

  const modeCount = {
    all: TOTAL,
    wrong: wrongQuestions.length,
    scrapped: scrappedQuestions.length,
  };

  return (
    <div className="h-[100dvh] overflow-y-auto bg-sky-50">
      {/* 헤더 */}
      <div className="bg-white px-5 pt-3 pb-3 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-extrabold text-slate-800">AWS AIF-C01</h1>
            <p className="text-xs text-slate-400">AI Practitioner 합격 앱</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/theory')}
              className="flex items-center gap-1 bg-sky-100 text-sky-700 font-bold text-xs px-3 py-1.5 rounded-full active:scale-95 transition-transform"
            >
              📖 이론
            </button>
            <button
              onClick={() => navigate('/review')}
              className="flex items-center gap-1 bg-amber-100 text-amber-700 font-bold text-xs px-3 py-1.5 rounded-full active:scale-95 transition-transform"
            >
              ⭐ 복습
            </button>
          </div>
        </div>
      </div>

      <div className="px-5 py-6 space-y-6">
        {/* 원형 진도 */}
        <div className="flex justify-center">
          <ProgressRing answered={overall.answered} total={overall.total} size={180} />
        </div>

        {/* 배너 영역 */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/theory')}
            className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-4 text-left shadow-md active:scale-[0.97] transition-transform"
          >
            <p className="text-2xl mb-1">📚</p>
            <p className="text-white font-extrabold text-sm">이론 학습</p>
            <p className="text-sky-100 text-xs mt-0.5">5챕터 · 28섹션</p>
          </button>
          <button
            onClick={() => navigate('/review')}
            className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-4 text-left shadow-md active:scale-[0.97] transition-transform"
          >
            <p className="text-2xl mb-1">⭐</p>
            <p className="text-white font-extrabold text-sm">복습 노트</p>
            <p className="text-amber-100 text-xs mt-0.5">
              {scrappedQuestions.length > 0 ? `스크랩 ${scrappedQuestions.length}문제` : '스크랩·오답 모음'}
            </p>
          </button>
        </div>

        {/* 모의고사 배너 */}
        <button
          onClick={handleStartExam}
          className="w-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-4 flex items-center gap-4 shadow-md active:scale-[0.98] transition-transform text-left"
        >
          <span className="text-3xl">📝</span>
          <div className="flex-1 min-w-0">
            <p className="text-white font-extrabold text-base">모의고사</p>
            <p className="text-indigo-100 text-xs mt-0.5">실전과 동일 · 65문항 90분 · 랜덤 출제</p>
          </div>
          <span className="text-white/80 text-lg">›</span>
        </button>

        {/* 지난 모의고사 결과 다시 보기 */}
        {examResult && (
          <button
            onClick={() => navigate('/exam/result')}
            className="w-full bg-white rounded-2xl p-3 shadow-sm border border-indigo-100 flex items-center gap-3 active:scale-[0.99] transition-transform text-left"
          >
            <span className="text-xl">📊</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-700 text-sm">지난 모의고사 결과 보기</p>
              <p className="text-xs text-slate-400 mt-0.5">
                {new Date(examResult.submittedAt).toLocaleDateString('ko-KR')} 응시 · {examResult.correct}/{examResult.total} 정답
              </p>
            </div>
            <span className={`shrink-0 text-lg font-extrabold ${examResult.score >= (examResult.passScore || 70) ? 'text-emerald-500' : 'text-red-500'}`}>
              {examResult.score}%
            </span>
          </button>
        )}

        {/* 책갈피 이어풀기 */}
        {bookmark && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100 flex items-center gap-3">
            <span className="text-2xl">📌</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-700 text-sm">책갈피에서 이어풀기</p>
              <p className="text-xs text-slate-400 mt-0.5">
                {MODE_LABEL[bookmark.mode] || '전체 문제'} · Q.{(bookmark.index ?? 0) + 1} (문제 #{bookmark.questionId})
              </p>
            </div>
            <button
              onClick={handleResumeBookmark}
              className="shrink-0 bg-emerald-500 text-white font-bold text-xs px-3 py-2 rounded-xl active:scale-95 transition-transform"
            >
              이어풀기
            </button>
            <button
              onClick={clearBookmark}
              className="shrink-0 w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 text-slate-400 text-sm"
              title="책갈피 삭제"
            >
              ✕
            </button>
          </div>
        )}

        {/* 모드 탭 */}
        <div className="bg-white rounded-2xl p-1.5 flex gap-1 shadow-sm">
          {[
            { key: 'all', label: '전체', count: modeCount.all },
            { key: 'wrong', label: '오답', count: modeCount.wrong },
            { key: 'scrapped', label: '스크랩', count: modeCount.scrapped },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveMode(tab.key)}
              className={`
                flex-1 py-2.5 rounded-xl text-sm font-bold transition-all
                ${activeMode === tab.key
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50'}
              `}
            >
              {tab.label}
              <span className={`ml-1 text-xs font-normal ${activeMode === tab.key ? 'text-sky-100' : 'text-slate-400'}`}>
                ({tab.count})
              </span>
            </button>
          ))}
        </div>

        {/* 시험 시작 버튼 */}
        <button
          onClick={handleStart}
          disabled={modeCount[activeMode] === 0}
          className="
            w-full h-16 bg-sky-500 active:bg-sky-700
            text-white font-extrabold text-lg rounded-2xl shadow-lg
            transition-all active:scale-[0.97]
            disabled:bg-slate-200 disabled:text-slate-400
          "
        >
          {activeMode === 'all' && '🚀 시험 시작'}
          {activeMode === 'wrong' && (modeCount.wrong > 0 ? `❌ 오답만 다시 풀기 (${modeCount.wrong}개)` : '오답 없음')}
          {activeMode === 'scrapped' && (modeCount.scrapped > 0 ? `⭐ 스크랩 복습 (${modeCount.scrapped}개)` : '스크랩 없음')}
        </button>

        {/* 통계 카드 */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: '전체', value: TOTAL, color: 'text-slate-700' },
            { label: '정답', value: overall.correct, color: 'text-emerald-600' },
            { label: '오답', value: wrongQuestions.length, color: 'text-red-500' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-3 text-center shadow-sm">
              <p className={`text-xl font-extrabold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* 카테고리별 카드 */}
        <div className="space-y-3">
          <h2 className="font-bold text-slate-700 text-sm">📊 영역별 문제 현황</h2>
          {Object.entries(CATEGORY_META).map(([catId, meta]) => {
            const catProg = getCategoryProgress(catId);
            const pct = catProg.total > 0 ? catProg.answered / catProg.total : 0;
            return (
              <div
                key={catId}
                className="bg-white rounded-2xl p-4 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{meta.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-700 text-sm truncate">{meta.label}</p>
                    <p className="text-xs text-slate-400">
                      {catProg.answered} / {catProg.total} 문제
                    </p>
                  </div>
                  <span className="text-sm font-bold" style={{ color: meta.color }}>
                    {Math.round(pct * 100)}%
                  </span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct * 100}%`, backgroundColor: meta.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* 초기화 */}
        <div>
          {showResetConfirm ? (
            <div className="bg-red-50 rounded-2xl p-4 space-y-3">
              <p className="text-sm text-red-700 font-medium text-center">
                정말 모든 학습 데이터를 초기화할까요?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => { resetAll(); setShowResetConfirm(false); }}
                  className="flex-1 h-11 bg-red-500 text-white font-bold rounded-xl text-sm"
                >
                  초기화
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 h-11 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-sm"
                >
                  취소
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full h-11 border border-slate-200 text-slate-400 text-sm rounded-xl"
            >
              학습 데이터 초기화
            </button>
          )}
        </div>

        {/* MADE BY */}
        <div className="pb-6 flex flex-col items-center gap-1">
          <p className="text-xs text-slate-400">MADE BY. 나현진</p>
          <p className="text-xs text-slate-300">AWS AIF-C01 합격을 응원합니다 🎉</p>
        </div>
      </div>
    </div>
  );
}
