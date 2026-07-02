import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore, { getAnswerType } from '../store/useStore';
import AnswerOption from '../components/AnswerOption';

function ExamTimer({ startTime, timeLimit, onExpire }) {
  const [elapsed, setElapsed] = useState(() => Math.floor((Date.now() - startTime) / 1000));

  useEffect(() => {
    const iv = setInterval(() => {
      const e = Math.floor((Date.now() - startTime) / 1000);
      setElapsed(e);
      if (e >= timeLimit) onExpire();
    }, 1000);
    return () => clearInterval(iv);
  }, [startTime, timeLimit, onExpire]);

  const remaining = Math.max(0, timeLimit - elapsed);
  const hh = Math.floor(remaining / 3600);
  const mm = Math.floor((remaining % 3600) / 60).toString().padStart(2, '0');
  const ss = (remaining % 60).toString().padStart(2, '0');
  const isLow = remaining < 300;

  return (
    <span className={`text-sm font-mono font-bold ${isLow ? 'text-red-500 animate-pulse' : 'text-slate-600'}`}>
      {hh > 0 ? `${hh}:` : ''}{mm}:{ss}
    </span>
  );
}

export default function ExamScreen() {
  const navigate = useNavigate();
  const exam = useStore(s => s.examSession);
  const getCurrentExamQuestion = useStore(s => s.getCurrentExamQuestion);
  const setExamAnswer = useStore(s => s.setExamAnswer);
  const examNext = useStore(s => s.examNext);
  const examPrev = useStore(s => s.examPrev);
  const examJump = useStore(s => s.examJump);
  const finishExam = useStore(s => s.finishExam);
  const endExam = useStore(s => s.endExam);
  const settings = useStore(s => s.settings);

  const [showNavigator, setShowNavigator] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const question = getCurrentExamQuestion();

  useEffect(() => {
    if (!exam) navigate('/', { replace: true });
  }, [exam, navigate]);

  if (!exam || !question) return null;

  const { questionIds, answers, currentIndex, startTime, timeLimit } = exam;
  const total = questionIds.length;
  const answeredCount = questionIds.filter(id => answers[id] != null).length;

  const answerType = getAnswerType(question);
  const isMulti = answerType === 'multi';
  const correctKeys = isMulti
    ? (question.correctAnswers || String(question.correctAnswer).split(/[,\s]+/).filter(Boolean))
    : [question.correctAnswer];
  const requiredCount = isMulti ? correctKeys.length : 1;

  const current = answers[question.id];
  const selectedKeys = current == null ? [] : (Array.isArray(current) ? current : [current]);

  const handleSelect = (key) => {
    if (isMulti) {
      const next = selectedKeys.includes(key)
        ? selectedKeys.filter(k => k !== key)
        : [...selectedKeys, key];
      setExamAnswer(question.id, [...next].sort());
    } else {
      setExamAnswer(question.id, key);
    }
  };

  const handleSubmit = () => {
    finishExam();
    navigate('/exam/result', { replace: true });
  };

  const handleExit = () => {
    endExam();
    navigate('/');
  };

  const isLast = currentIndex === total - 1;

  return (
    <div className="h-[100dvh] flex flex-col bg-slate-50">
      {/* 상단 바 */}
      <div className="bg-white shadow-sm px-4 py-3 flex items-center gap-2 shrink-0">
        <button
          onClick={() => setShowExitConfirm(true)}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 text-sm"
        >
          ←
        </button>
        <div className="flex-1 text-center">
          <p className="text-xs text-indigo-500 font-bold">📝 모의고사</p>
          <p className="text-sm font-bold text-slate-700">
            Q.{currentIndex + 1} <span className="text-slate-400 font-normal">/ {total}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ExamTimer startTime={startTime} timeLimit={timeLimit} onExpire={handleSubmit} />
        </div>
      </div>

      {/* 진행 바 */}
      <div className="h-1 bg-slate-100 shrink-0">
        <div
          className="h-full bg-indigo-500 transition-all duration-300"
          style={{ width: `${(answeredCount / total) * 100}%` }}
        />
      </div>

      {/* 문제 영역 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs bg-slate-200 text-slate-600 font-semibold px-2.5 py-1 rounded-full">
            #{question.id}
          </span>
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

        {isMulti && (
          <div className="bg-amber-50 rounded-2xl px-4 py-3">
            <p className="text-xs text-amber-700 font-medium">
              ✅ {requiredCount}개를 선택하세요.
              <span className="ml-1 text-amber-500">({selectedKeys.length}/{requiredCount} 선택됨)</span>
            </p>
          </div>
        )}

        {/* 선택지 (채점 없이 선택만) */}
        {question.choices?.length > 0 && (
          <div className="space-y-2.5">
            {question.choices.map((choice) => (
              <AnswerOption
                key={choice.key}
                choice={choice}
                multi={isMulti}
                selected={selectedKeys.includes(choice.key)}
                submitted={false}
                isCorrect={false}
                isUserChoice={selectedKeys.includes(choice.key)}
                showBilingual={settings.showBilingual}
                onSelect={handleSelect}
              />
            ))}
          </div>
        )}

        <div className="h-4" />
      </div>

      {/* 하단 고정 영역 */}
      <div className="bg-white border-t border-slate-100 px-4 py-3 shrink-0 space-y-2">
        <div className="flex gap-2">
          <button
            onClick={examPrev}
            disabled={currentIndex === 0}
            className="flex-1 h-12 bg-slate-100 text-slate-600 font-bold rounded-2xl text-sm disabled:opacity-40"
          >
            ← 이전
          </button>
          {isLast ? (
            <button
              onClick={() => setShowSubmitConfirm(true)}
              className="flex-[1.4] h-12 bg-emerald-500 text-white font-bold rounded-2xl text-sm active:bg-emerald-600"
            >
              제출하고 채점하기
            </button>
          ) : (
            <button
              onClick={examNext}
              className="flex-[1.4] h-12 bg-indigo-500 text-white font-bold rounded-2xl text-sm active:bg-indigo-600"
            >
              다음 →
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowNavigator(true)}
            className="flex-1 h-10 flex items-center justify-center gap-2 rounded-xl border border-slate-200 text-slate-500 text-sm"
          >
            ▦ 문항 이동 ({answeredCount}/{total} 응답)
          </button>
          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="h-10 px-4 flex items-center justify-center rounded-xl border border-emerald-200 text-emerald-600 font-bold text-sm"
          >
            제출
          </button>
        </div>
      </div>

      {/* 네비게이터 */}
      {showNavigator && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setShowNavigator(false)} />
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl h-[60dvh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-700">문항 이동</h3>
              <button onClick={() => setShowNavigator(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500">✕</button>
            </div>
            <div className="flex gap-3 px-4 py-2 text-xs text-slate-500 border-b border-slate-100">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-indigo-500 inline-block" /> 응답함</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-slate-200 inline-block" /> 미응답</span>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <div className="grid grid-cols-10 gap-1">
                {questionIds.map((qId, idx) => {
                  const done = answers[qId] != null;
                  const isCurrent = idx === currentIndex;
                  return (
                    <button
                      key={qId}
                      onClick={() => { examJump(idx); setShowNavigator(false); }}
                      className={`
                        aspect-square rounded-md text-xs font-medium flex items-center justify-center
                        transition-transform active:scale-90
                        ${done ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'}
                        ${isCurrent ? 'ring-2 ring-offset-1 ring-indigo-600 scale-110' : ''}
                      `}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {/* 제출 확인 */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
          <div className="bg-white rounded-2xl p-5 w-full max-w-xs space-y-4">
            <div className="text-center">
              <p className="text-3xl mb-2">📝</p>
              <p className="font-bold text-slate-800">시험을 제출할까요?</p>
              <p className="text-xs text-slate-500 mt-1">
                {total}문항 중 <span className="font-bold text-indigo-600">{answeredCount}문항</span> 응답했습니다.
                {answeredCount < total && ' 미응답 문항은 오답 처리됩니다.'}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowSubmitConfirm(false)} className="flex-1 h-11 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm">계속 풀기</button>
              <button onClick={handleSubmit} className="flex-1 h-11 bg-emerald-500 text-white font-bold rounded-xl text-sm">제출·채점</button>
            </div>
          </div>
        </div>
      )}

      {/* 나가기 확인 */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
          <div className="bg-white rounded-2xl p-5 w-full max-w-xs space-y-4">
            <div className="text-center">
              <p className="text-3xl mb-2">⚠️</p>
              <p className="font-bold text-slate-800">시험을 중단할까요?</p>
              <p className="text-xs text-slate-500 mt-1">지금 나가면 이번 모의고사 응답이 사라집니다.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowExitConfirm(false)} className="flex-1 h-11 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm">계속 풀기</button>
              <button onClick={handleExit} className="flex-1 h-11 bg-red-500 text-white font-bold rounded-xl text-sm">중단하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
