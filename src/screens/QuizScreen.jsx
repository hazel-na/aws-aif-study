import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import AnswerOption from '../components/AnswerOption';
import BottomSheet from '../components/BottomSheet';
import Navigator from '../components/Navigator';

function Timer({ startTime, timeLimit }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(iv);
  }, [startTime]);

  const remaining = Math.max(0, timeLimit - elapsed);
  const mm = Math.floor(remaining / 60).toString().padStart(2, '0');
  const ss = (remaining % 60).toString().padStart(2, '0');
  const isLow = remaining < 300;

  return (
    <span className={`text-sm font-mono font-bold ${isLow ? 'text-red-500' : 'text-slate-600'}`}>
      {mm}:{ss}
    </span>
  );
}

export default function QuizScreen() {
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [showNavigator, setShowNavigator] = useState(false);

  const session = useStore(s => s.currentSession);
  const getCurrentQuestion = useStore(s => s.getCurrentQuestion);
  const submitAnswer = useStore(s => s.submitAnswer);
  const nextQuestion = useStore(s => s.nextQuestion);
  const toggleScrapped = useStore(s => s.toggleScrapped);
  const scrappedQuestions = useStore(s => s.scrappedQuestions);
  const settings = useStore(s => s.settings);
  const endSession = useStore(s => s.endSession);
  const bookmark = useStore(s => s.bookmark);
  const setBookmark = useStore(s => s.setBookmark);
  const clearBookmark = useStore(s => s.clearBookmark);

  const question = getCurrentQuestion();

  // 세션 없으면 대시보드로
  useEffect(() => {
    if (!session) navigate('/', { replace: true });
  }, [session, navigate]);

  // 문제 변경 시 상태 초기화
  const prevIdRef = useRef(null);
  useEffect(() => {
    if (question && question.id !== prevIdRef.current) {
      prevIdRef.current = question.id;
      setSelectedKeys([]);
      setSubmitted(false);
      setShowSheet(false);
    }
  }, [question?.id]);

  if (!session || !question) return null;

  // 답안 유형: single | multi | matching | ordering
  const answerType = question.answerType
    || (question.correctAnswer === 'HOTSPOT' || question.correctAnswer === 'UNKNOWN' || question.isHotspot ? 'matching' : 'single');
  const isMulti = answerType === 'multi';
  const isReveal = answerType === 'matching' || answerType === 'ordering'; // 채점 없이 해설만 보는 유형
  const correctKeys = isMulti
    ? (question.correctAnswers || String(question.correctAnswer).split(/[,\s]+/).filter(Boolean))
    : [question.correctAnswer];
  const requiredCount = isMulti ? correctKeys.length : 1;

  const isScrapped = scrappedQuestions.includes(question.id);
  const { sessionQuestionIds, currentIndex, startTime, timeLimit, mode } = session;
  const totalInSession = sessionQuestionIds.length;
  const isBookmarked = bookmark
    && bookmark.mode === mode
    && bookmark.questionId === question.id;

  const handleToggleBookmark = () => {
    if (isBookmarked) clearBookmark();
    else setBookmark();
  };

  const handleSelect = (key) => {
    if (submitted) return;
    if (isMulti) {
      setSelectedKeys((prev) =>
        prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
      );
    } else {
      setSelectedKeys([key]);
    }
  };

  const canSubmit = isMulti ? selectedKeys.length === requiredCount : selectedKeys.length === 1;

  const handleSubmit = () => {
    if (isReveal) return;
    if (!canSubmit || submitted) return;

    submitAnswer(question.id, isMulti ? [...selectedKeys].sort() : selectedKeys[0]);
    setSubmitted(true);
    setShowSheet(true);
  };

  const handleReveal = () => {
    setSubmitted(true);
    setShowSheet(true);
  };

  const isAnswerCorrect = () => {
    if (isReveal) return false;
    if (isMulti) {
      const a = [...selectedKeys].sort().join(',');
      const b = [...correctKeys].sort().join(',');
      return a === b;
    }
    return selectedKeys[0] === question.correctAnswer;
  };

  const handleNext = () => {
    nextQuestion();
    setShowNavigator(false);
  };

  const handleExit = () => {
    endSession();
    navigate('/');
  };

  const modeLabelMap = {
    all: '전체 문제',
    wrong: '오답 복습',
    scrapped: '스크랩 복습',
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-slate-50">
      {/* 상단 바 */}
      <div className="bg-white shadow-sm px-4 py-3 flex items-center gap-2 shrink-0">
        <button
          onClick={handleExit}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 text-sm"
        >
          ←
        </button>

        <div className="flex-1 text-center">
          <p className="text-xs text-slate-400 font-medium">{modeLabelMap[mode]}</p>
          <p className="text-sm font-bold text-slate-700">
            Q.{currentIndex + 1}{' '}
            <span className="text-slate-400 font-normal">/ {totalInSession}</span>
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Timer startTime={startTime} timeLimit={timeLimit} />
          <button
            onClick={handleToggleBookmark}
            className={`w-9 h-9 flex items-center justify-center rounded-xl text-lg transition-transform active:scale-90 ${isBookmarked ? 'bg-emerald-100' : ''}`}
            title={isBookmarked ? '책갈피 해제' : '이 문제에 책갈피 저장'}
          >
            <span className={isBookmarked ? '' : 'opacity-40 grayscale'}>📌</span>
          </button>
          <button
            onClick={() => toggleScrapped(question.id)}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-xl transition-transform active:scale-90"
          >
            {isScrapped ? '⭐' : '☆'}
          </button>
        </div>
      </div>

      {/* 문제 영역 (스크롤 가능) */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* 카테고리 뱃지 */}
        <div className="flex items-center gap-2">
          <span className="text-xs bg-sky-100 text-sky-700 font-semibold px-2.5 py-1 rounded-full">
            #{question.id}
          </span>
          {isReveal && (
            <span className="text-xs bg-purple-100 text-purple-700 font-semibold px-2.5 py-1 rounded-full">
              {answerType === 'ordering' ? '순서 배열형' : '매칭형'}
            </span>
          )}
          {isMulti && (
            <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2.5 py-1 rounded-full">
              복수 정답 · {requiredCount}개 선택
            </span>
          )}
        </div>

        {/* 문제 텍스트 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          {settings.showBilingual ? (
            <>
              <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                {question.koreanQuestion || question.englishQuestion}
              </p>
              {question.englishQuestion && question.koreanQuestion && (
                <p className="text-xs text-slate-400 leading-relaxed mt-3 pt-3 border-t border-slate-100">
                  {question.englishQuestion}
                </p>
              )}
            </>
          ) : (
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">
              {question.koreanQuestion || question.englishQuestion}
            </p>
          )}
        </div>

        {/* 복수 정답 안내 */}
        {isMulti && !submitted && (
          <div className="bg-amber-50 rounded-2xl px-4 py-3">
            <p className="text-xs text-amber-700 font-medium">
              ✅ 정답이 {requiredCount}개입니다. {requiredCount}개를 모두 선택한 뒤 제출하세요.
              <span className="ml-1 text-amber-500">({selectedKeys.length}/{requiredCount} 선택됨)</span>
            </p>
          </div>
        )}

        {/* 매칭/순서형 안내 + 항목 표시 */}
        {isReveal && !submitted && (
          <div className="bg-purple-50 rounded-2xl p-4 space-y-3">
            <div>
              <p className="text-sm text-purple-700 font-medium mb-1">
                📋 {answerType === 'ordering' ? '순서 배열형 문제' : '매칭형 문제'}
              </p>
              <p className="text-xs text-purple-600">
                {answerType === 'ordering'
                  ? '아래 항목들을 올바른 순서로 배열하는 문제입니다. 직접 순서를 생각해본 뒤 해설로 정답을 확인하세요.'
                  : '아래 각 항목에 알맞은 보기를 연결하는 문제입니다. 직접 매칭을 생각해본 뒤 해설로 정답을 확인하세요.'}
              </p>
            </div>
            {(question.hotspotItems?.length > 0) && (
              <ul className="space-y-2">
                {question.hotspotItems.map((it, i) => (
                  <li key={i} className="bg-white rounded-xl px-3 py-2 text-xs text-slate-700 leading-relaxed border border-purple-100">
                    {answerType === 'ordering' ? '•' : `${i + 1}.`} {it.promptKo || it.prompt}
                  </li>
                ))}
              </ul>
            )}
            {question.hotspotOptions?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {question.hotspotOptions.map((opt, i) => (
                  <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-full bg-purple-100 text-purple-700">
                    {opt}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 선택지 */}
        {!isReveal && question.choices?.length > 0 && (
          <div className="space-y-2.5">
            {question.choices.map((choice) => {
              const isCorrectChoice = correctKeys.includes(choice.key);
              const isUserChoice = selectedKeys.includes(choice.key);
              return (
                <AnswerOption
                  key={choice.key}
                  choice={choice}
                  multi={isMulti}
                  selected={selectedKeys.includes(choice.key)}
                  submitted={submitted}
                  isCorrect={submitted && isCorrectChoice}
                  isUserChoice={isUserChoice}
                  showBilingual={settings.showBilingual}
                  onSelect={handleSelect}
                />
              );
            })}
          </div>
        )}

        {/* 여백 */}
        <div className="h-4" />
      </div>

      {/* 하단 고정 영역 */}
      <div className="bg-white border-t border-slate-100 px-4 py-3 shrink-0 space-y-2">
        {/* 제출 버튼 */}
        {!submitted && (
          isReveal ? (
            <button
              onClick={handleReveal}
              className="w-full h-12 bg-purple-500 text-white font-bold rounded-2xl text-sm"
            >
              📖 정답·해설 보기
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="
                w-full h-12 bg-sky-500 text-white font-bold rounded-2xl text-sm
                disabled:bg-slate-200 disabled:text-slate-400
                transition-colors active:bg-sky-700
              "
            >
              답 제출{isMulti ? ` (${selectedKeys.length}/${requiredCount})` : ''}
            </button>
          )
        )}
        {/* 해설 닫은 후 보이는 버튼들 */}
        {submitted && !showSheet && (
          <>
            <button
              onClick={() => setShowSheet(true)}
              className="w-full h-12 bg-slate-100 text-slate-600 font-bold rounded-2xl text-sm hover:bg-slate-200 active:bg-slate-300 transition-colors"
            >
              📖 해설 보기
            </button>
            <button
              onClick={handleNext}
              className="w-full h-12 bg-sky-500 text-white font-bold rounded-2xl text-sm hover:bg-sky-600 active:bg-sky-700 transition-colors"
            >
              다음 문제 →
            </button>
          </>
        )}

        {/* 네비게이터 토글 */}
        <button
          onClick={() => setShowNavigator(true)}
          className="w-full h-10 flex items-center justify-center gap-2 rounded-xl border border-slate-200 text-slate-500 text-sm"
        >
          <span>▦</span>
          <span>문항 이동 ({currentIndex + 1}/{totalInSession})</span>
        </button>
      </div>

      {/* 바텀 시트 (해설) */}
      {submitted && showSheet && (
        <BottomSheet
          question={question}
          userAnswer={isMulti ? selectedKeys : selectedKeys[0]}
          isCorrect={isAnswerCorrect()}
          onNext={handleNext}
          onClose={() => setShowSheet(false)}
        />
      )}

      {/* 네비게이터 패널 */}
      {showNavigator && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowNavigator(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl h-[60dvh] flex flex-col shadow-2xl">
            <Navigator onClose={() => setShowNavigator(false)} />
          </div>
        </>
      )}
    </div>
  );
}
