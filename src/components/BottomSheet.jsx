import { useEffect, useRef, useState } from 'react';
import Tooltip from './Tooltip';
import THEORY from '../data/theoryContent';
import useStore from '../store/useStore';

// 챕터 색상 매핑
const CHAPTER_COLORS = {
  'ch1-ai-ml-basics':     { bg: 'bg-sky-50',    border: 'border-sky-200',    header: 'bg-sky-100',    text: 'text-sky-700',    badge: 'bg-sky-500' },
  'ch2-generative-ai':    { bg: 'bg-violet-50',  border: 'border-violet-200', header: 'bg-violet-100', text: 'text-violet-700', badge: 'bg-violet-500' },
  'ch3-model-evaluation': { bg: 'bg-emerald-50', border: 'border-emerald-200',header: 'bg-emerald-100',text: 'text-emerald-700',badge: 'bg-emerald-500' },
  'ch4-aws-services':     { bg: 'bg-orange-50',  border: 'border-orange-200', header: 'bg-orange-100', text: 'text-orange-700', badge: 'bg-orange-500' },
  'ch5-responsible-ai':   { bg: 'bg-red-50',     border: 'border-red-200',    header: 'bg-red-100',    text: 'text-red-700',    badge: 'bg-red-500' },
};
const DEFAULT_COLOR = { bg: 'bg-slate-50', border: 'border-slate-200', header: 'bg-slate-100', text: 'text-slate-700', badge: 'bg-slate-500' };

function findRelatedTopics(question) {
  const searchText = [
    question.explanation || '',
    ...(question.vocabulary || []).map(v => `${v.term} ${v.definition}`),
    ...(question.choices || []).map(c => `${c.enText} ${c.koText || ''}`),
    question.englishQuestion || '',
  ].join(' ');
  const searchLower = searchText.toLowerCase();

  const scored = [];
  for (const chapter of THEORY) {
    for (const topic of chapter.topics) {
      let score = 0;
      for (const kw of topic.keywords || []) {
        if (searchLower.includes(kw.toLowerCase())) score++;
      }
      if (score > 0) scored.push({ chapter, topic, score });
    }
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, 5);
}

// 이론 섹션 렌더러 (텍스트/표 모두 지원)
function TheoryTopicBlock({ chapter, topic, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const color = CHAPTER_COLORS[chapter.id] || DEFAULT_COLOR;

  return (
    <div className={`border ${color.border} rounded-2xl overflow-hidden`}>
      {/* 헤더 */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-start justify-between px-4 py-3 ${color.header} text-left gap-2`}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full text-white ${color.badge}`}>
              {chapter.emoji} {chapter.title.split(':')[0].trim()}
            </span>
          </div>
          <p className={`text-sm font-bold ${color.text} leading-snug`}>{topic.title}</p>
        </div>
        <span className={`text-sm mt-0.5 shrink-0 ${color.text}`}>{open ? '▲' : '▼'}</span>
      </button>

      {/* 본문 */}
      {open && (
        <div className={`px-4 py-3 ${color.bg} space-y-3`}>
          {/* 텍스트 내용 */}
          {topic.content && (
            <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{topic.content}</p>
          )}

          {/* 표 */}
          {topic.type === 'table' && topic.table && (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="text-xs w-full border-collapse">
                <thead>
                  <tr>
                    {topic.table.headers.map((h, i) => (
                      <th
                        key={i}
                        className="px-3 py-2 text-left font-bold text-white bg-slate-600 whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {topic.table.rows.map((row, ri) => (
                    <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-3 py-2 text-slate-700 align-top border-t border-slate-100">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 키워드 태그 */}
          {topic.keywords?.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {topic.keywords.map((kw, i) => (
                <span
                  key={i}
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${color.bg} ${color.text} border ${color.border}`}
                >
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function BottomSheet({ question, userAnswer, isCorrect, onNext, onClose, showStem = false, nextLabel = '다음 문제 →', showScrap = false }) {
  const toggleScrapped = useStore(s => s.toggleScrapped);
  const scrappedQuestions = useStore(s => s.scrappedQuestions);
  const isScrapped = scrappedQuestions.includes(question.id);
  const [visible, setVisible] = useState(false);
  const [dragY, setDragY] = useState(0);      // 아래로 드래그한 거리(px)
  const [dragging, setDragging] = useState(false);
  const ref = useRef(null);
  const dragStartRef = useRef(null);

  // ── 핸들/헤더를 아래로 쓸어내려 닫기 ──
  const onDragStart = (clientY) => {
    dragStartRef.current = clientY;
    setDragging(true);
  };
  const onDragMove = (clientY) => {
    if (dragStartRef.current == null) return;
    const delta = clientY - dragStartRef.current;
    setDragY(Math.max(0, delta)); // 아래로만 따라 내려감
  };
  const onDragEnd = () => {
    if (dragStartRef.current == null) return;
    const shouldClose = dragY > 110; // 충분히 내리면 닫기
    dragStartRef.current = null;
    setDragging(false);
    if (shouldClose) {
      setVisible(false);
      setTimeout(onClose, 200);
    } else {
      setDragY(0); // 원위치로 스냅
    }
  };

  const handleProps = {
    onTouchStart: (e) => onDragStart(e.touches[0].clientY),
    onTouchMove: (e) => onDragMove(e.touches[0].clientY),
    onTouchEnd: onDragEnd,
    onMouseDown: (e) => {
      onDragStart(e.clientY);
      const move = (ev) => onDragMove(ev.clientY);
      const up = () => { onDragEnd(); window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', up);
    },
  };

  const relatedTopics = findRelatedTopics(question);
  const hasExplanation = question.explanation && question.explanation.trim().length > 0;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  const answerType = question.answerType
    || (question.correctAnswer === 'HOTSPOT' || question.correctAnswer === 'UNKNOWN' || question.isHotspot ? 'matching' : 'single');
  const isReveal = answerType === 'matching' || answerType === 'ordering';
  const isMulti = answerType === 'multi';
  const correctKeys = isMulti
    ? (question.correctAnswers || String(question.correctAnswer).split(/[,\s]+/).filter(Boolean))
    : [question.correctAnswer];
  const userKeys = Array.isArray(userAnswer) ? userAnswer : (userAnswer != null ? [userAnswer] : []);

  // 해설 텍스트 → vocab 용어 툴팁 처리
  const renderExplanation = (text) => {
    if (!text) return null;
    if (!question.vocabulary?.length) {
      return <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{text}</p>;
    }

    const parts = [];
    let remaining = text;
    for (const v of question.vocabulary) {
      if (!v.term || !v.definition) continue;
      const idx = remaining.indexOf(v.term);
      if (idx >= 0) {
        if (idx > 0) parts.push(<span key={`t${parts.length}`}>{remaining.substring(0, idx)}</span>);
        parts.push(
          <Tooltip key={`v${parts.length}`} term={v.term} definition={v.definition}>
            {v.term}
          </Tooltip>
        );
        remaining = remaining.substring(idx + v.term.length);
      }
    }
    if (remaining) parts.push(<span key={`r${parts.length}`}>{remaining}</span>);
    return (
      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
        {parts.length > 1 ? parts : text}
      </p>
    );
  };

  const correctChoices = question.choices?.filter(c => correctKeys.includes(c.key)) || [];

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      <div
        ref={ref}
        style={
          dragging
            ? { transform: `translateY(${dragY}px)`, transition: 'none' }
            : { transform: visible ? `translateY(${dragY}px)` : 'translateY(100%)' }
        }
        className={`
          fixed bottom-0 left-0 right-0 z-50
          bg-white rounded-t-3xl shadow-2xl
          max-h-[88dvh] flex flex-col
          ${dragging ? '' : 'transition-transform duration-300 ease-out'}
        `}
      >
        {/* 핸들 + 닫기 (핸들을 아래로 쓸어내리면 닫힘) */}
        <div
          {...handleProps}
          className="flex justify-center items-center pt-3 pb-3 relative shrink-0 cursor-grab active:cursor-grabbing touch-none select-none"
        >
          <div className="w-12 h-1.5 rounded-full bg-slate-300" />
          {showScrap && (
            <button
              onClick={() => toggleScrapped(question.id)}
              onTouchStart={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              className="absolute left-4 h-8 px-2.5 flex items-center gap-1 rounded-full bg-amber-50 text-amber-600 text-xs font-bold hover:bg-amber-100 active:scale-90 transition-all"
              aria-label="스크랩"
            >
              <span className="text-base leading-none">{isScrapped ? '⭐' : '☆'}</span>
              {isScrapped ? '스크랩됨' : '스크랩'}
            </button>
          )}
          <button
            onClick={onClose}
            onTouchStart={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            className="absolute right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 text-sm font-bold hover:bg-slate-200 active:scale-90 transition-all"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        {/* 스크롤 영역 */}
        <div className="overflow-y-auto flex-1 px-4 pb-4 space-y-4">

          {/* 문제 전문 + 전체 선택지 (모의고사 리뷰 등에서 사용) */}
          {showStem && (
            <div className="space-y-3">
              <div className="bg-white border border-slate-200 rounded-2xl p-4">
                <p className="text-xs text-slate-400 mb-1.5">문제 #{question.id}</p>
                <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                  {question.koreanQuestion || question.englishQuestion}
                </p>
                {question.englishQuestion && question.koreanQuestion && (
                  <p className="text-xs text-slate-400 leading-relaxed mt-2 pt-2 border-t border-slate-100">
                    {question.englishQuestion}
                  </p>
                )}
              </div>

              {question.choices?.length > 0 && (
                <div className="space-y-2">
                  {question.choices.map((c) => {
                    const isCorrectChoice = correctKeys.includes(c.key);
                    const isUserChoice = userKeys.includes(c.key);
                    let cls = 'border-slate-200 bg-white';
                    if (isCorrectChoice) cls = 'border-emerald-300 bg-emerald-50';
                    else if (isUserChoice) cls = 'border-red-300 bg-red-50';
                    return (
                      <div key={c.key} className={`rounded-xl border px-3 py-2.5 flex items-start gap-2.5 ${cls}`}>
                        <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isCorrectChoice ? 'bg-emerald-500 text-white'
                            : isUserChoice ? 'bg-red-500 text-white'
                            : 'bg-slate-100 text-slate-500'}`}>
                          {c.key}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-800 leading-snug">{c.enText}</p>
                          {c.koText && <p className="text-xs text-slate-500 mt-0.5 leading-snug">{c.koText}</p>}
                        </div>
                        {isCorrectChoice && <span className="shrink-0 text-xs font-bold text-emerald-600">✓ 정답</span>}
                        {isUserChoice && !isCorrectChoice && <span className="shrink-0 text-xs font-bold text-red-500">내 선택</span>}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="h-px bg-slate-200" />
            </div>
          )}

          {isReveal ? (
            /* ── 매칭형 / 순서 배열형 ── */
            <>
              <div className="flex items-center gap-3 bg-purple-50 rounded-2xl p-4">
                <span className="text-3xl">{answerType === 'ordering' ? '🔢' : '📋'}</span>
                <div>
                  <p className="font-extrabold text-purple-700 text-sm">
                    {answerType === 'ordering' ? '순서 배열형 정답' : '매칭형 정답'}
                  </p>
                  <p className="text-xs text-purple-500 mt-0.5">아래 정답표와 해설로 학습하세요.</p>
                </div>
              </div>

              {/* 정답표 */}
              {question.hotspotItems?.length > 0 && (
                <div className="bg-white border border-purple-200 rounded-2xl overflow-hidden">
                  <div className="bg-purple-100 px-4 py-2">
                    <p className="text-xs font-extrabold text-purple-700">
                      ✅ {answerType === 'ordering' ? '올바른 순서' : '정답 매칭'}
                    </p>
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {question.hotspotItems.map((it, i) => (
                      <li key={i} className="px-4 py-3 flex items-start gap-3">
                        <span className="shrink-0 inline-flex items-center justify-center min-w-7 h-7 px-2 rounded-full bg-purple-500 text-white text-xs font-extrabold mt-0.5">
                          {answerType === 'ordering' ? i + 1 : '→'}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm text-slate-800 leading-snug">{it.promptKo || it.prompt}</p>
                          {answerType !== 'ordering' && it.answer && (
                            <p className="text-xs font-bold text-purple-600 mt-1">정답: {it.answer}</p>
                          )}
                          {it.note && (
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{it.note}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {hasExplanation && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <p className="text-xs font-extrabold text-amber-700 mb-2 flex items-center gap-1">
                    <span>📖</span> 해설
                  </p>
                  {renderExplanation(question.explanation)}
                </div>
              )}
            </>
          ) : (
            /* ── 일반 문제 ── */
            <>
              {/* ① 정답/오답 결과 */}
              <div className={`flex items-center gap-3 rounded-2xl p-4 ${isCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
                <span className="text-4xl">{isCorrect ? '✅' : '❌'}</span>
                <div>
                  <p className={`font-extrabold text-base ${isCorrect ? 'text-emerald-700' : 'text-red-600'}`}>
                    {isCorrect ? '정답입니다!' : '오답입니다'}
                  </p>
                  {!isCorrect && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      내 답: <span className="font-bold text-red-500">{userKeys.join(', ') || '-'}</span>
                      <span className="mx-1">→</span>
                      정답: <span className="font-bold text-emerald-600">{correctKeys.join(', ')}</span>
                    </p>
                  )}
                  {isCorrect && <p className="text-xs text-emerald-500 mt-0.5">잘하셨어요! 계속 유지하세요 👍</p>}
                </div>
              </div>

              {/* ② 정답 보기 */}
              {correctChoices.length > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                  <p className="text-xs font-extrabold text-slate-500">
                    ✨ 정답{isMulti ? ` (${correctKeys.length}개)` : ''}
                  </p>
                  {correctChoices.map((cc) => (
                    <div key={cc.key} className="flex items-start gap-2">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-extrabold shrink-0 mt-0.5">
                        {cc.key}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-800 leading-snug">{cc.enText}</p>
                        {cc.koText && (
                          <p className="text-xs text-slate-500 mt-1">{cc.koText}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ③ 해설 (문제은행 우선) */}
              {hasExplanation && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <p className="text-xs font-extrabold text-amber-700 mb-2 flex items-center gap-1">
                    <span>📖</span> 해설
                  </p>
                  {renderExplanation(question.explanation)}
                </div>
              )}

              {!hasExplanation && (
                <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-3 text-center">
                  <p className="text-xs text-slate-400">이 문제는 별도 해설이 없습니다. 아래 관련 이론을 참고하세요.</p>
                </div>
              )}

              {/* ④ 핵심 용어 */}
              {question.vocabulary?.length > 0 && (
                <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4">
                  <p className="text-xs font-extrabold text-sky-700 mb-3 flex items-center gap-1">
                    <span>📚</span> 핵심 용어
                  </p>
                  <div className="space-y-2.5">
                    {question.vocabulary.map((v, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-1.5 rounded-full bg-sky-400 shrink-0 my-1" />
                        <div>
                          <p className="text-xs font-extrabold text-sky-700">{v.term}</p>
                          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{v.definition}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ⑤ 관련 이론 (이론파일 기반, 해설 없으면 첫번째 펼침) */}
          {relatedTopics.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px flex-1 bg-slate-200" />
                <p className="text-xs font-extrabold text-slate-500 px-2">
                  📘 관련 이론 ({relatedTopics.length}개 섹션)
                </p>
                <div className="h-px flex-1 bg-slate-200" />
              </div>
              <div className="space-y-2">
                {relatedTopics.map((item, i) => (
                  <TheoryTopicBlock
                    key={i}
                    chapter={item.chapter}
                    topic={item.topic}
                    defaultOpen={i === 0}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 이론 섹션도 없을 때 */}
          {relatedTopics.length === 0 && !hasExplanation && (
            <div className="bg-slate-50 rounded-2xl p-4 text-center">
              <p className="text-xs text-slate-400">관련 이론 섹션을 찾을 수 없습니다.</p>
            </div>
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="px-4 py-4 border-t border-slate-100 shrink-0">
          <button
            onClick={onNext}
            className="w-full h-13 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-extrabold rounded-2xl text-sm transition-colors"
          >
            {nextLabel}
          </button>
        </div>
      </div>
    </>
  );
}
