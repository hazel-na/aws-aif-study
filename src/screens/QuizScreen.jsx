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
  const [selectedKey, setSelectedKey] = useState(null);
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
      setSelectedKey(null);
      setSubmitted(false);
      setShowSheet(false);
    }
  }, [question?.id]);

  if (!session || !question) return null;

  const isHotspot = question.isHotspot || question.correctAnswer === 'HOTSPOT' || question.correctAnswer === 'UNKNOWN';
  const isScrapped = scrappedQuestions.includes(question.id);
  const { sessionQuestionIds, currentIndex, startTime, timeLimit, mode } = session;
  const totalInSession = sessionQuestionIds.length;

  const handleSelect = (key) => {
    if (submitted) return;
    setSelectedKey(key);
  };

  const handleSubmit = () => {
    if (!selectedKey && !isHotspot) return;
    if (submitted) return;

    if (!isHotspot && selectedKey) {
      submitAnswer(question.id, selectedKey);
    }
    setSubmitted(true);
    setShowSheet(true);
  };

  const handleHotspotView = () => {
    setSubmitted(true);
    setShowSheet(true);
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

        <div className="flex items-center gap-2">
          <Timer startTime={startTime} timeLimit={timeLimit} />
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
          {isHotspot && (
            <span className="text-xs bg-purple-100 text-purple-700 font-semibold px-2.5 py-1 rounded-full">
              매칭/순서형
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

        {/* HOTSPOT 안내 */}
        {isHotspot && !submitted && (
          <div className="bg-purple-50 rounded-2xl p-4">
            <p className="text-sm text-purple-700 font-medium mb-1">📋 매칭/순서형 문제</p>
            <p className="text-xs text-purple-600">이 문제는 서술형 답안입니다. 해설을 확인하세요.</p>
          </div>
        )}

        {/* 선택지 */}
        {!isHotspot && question.choices.length > 0 && (
          <div className="space-y-2.5">
            {question.choices.map((choice) => {
              const isCorrectChoice = choice.key === question.correctAnswer;
              const isUserChoice = choice.key === selectedKey;
              return (
                <AnswerOption
                  key={choice.key}
                  choice={choice}
                  selected={selectedKey === choice.key}
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
          isHotspot ? (
            <button
              onClick={handleHotspotView}
              className="w-full h-12 bg-purple-500 text-white font-bold rounded-2xl text-sm"
            >
              📖 해설 보기
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!selectedKey}
              className="
                w-full h-12 bg-sky-500 text-white font-bold rounded-2xl text-sm
                disabled:bg-slate-200 disabled:text-slate-400
                transition-colors active:bg-sky-700
              "
            >
              답 제출
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
          userAnswer={selectedKey}
          isCorrect={!isHotspot && selectedKey === question.correctAnswer}
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
