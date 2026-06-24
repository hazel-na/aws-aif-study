import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore, { allQuestions } from '../store/useStore';
import THEORY from '../data/theoryContent';

// ── 이론 매칭 (BottomSheet와 동일 로직) ──
const CHAPTER_COLORS = {
  'ch1-ai-ml-basics':     { bg: 'bg-sky-50',    border: 'border-sky-200',    header: 'bg-sky-100',    text: 'text-sky-700',    badge: 'bg-sky-500' },
  'ch2-generative-ai':    { bg: 'bg-violet-50',  border: 'border-violet-200', header: 'bg-violet-100', text: 'text-violet-700', badge: 'bg-violet-500' },
  'ch3-model-evaluation': { bg: 'bg-emerald-50', border: 'border-emerald-200',header: 'bg-emerald-100',text: 'text-emerald-700',badge: 'bg-emerald-500' },
  'ch4-aws-services':     { bg: 'bg-orange-50',  border: 'border-orange-200', header: 'bg-orange-100', text: 'text-orange-700', badge: 'bg-orange-500' },
  'ch5-responsible-ai':   { bg: 'bg-red-50',     border: 'border-red-200',    header: 'bg-red-100',    text: 'text-red-700',    badge: 'bg-red-500' },
};
const DEFAULT_COLOR = { bg: 'bg-slate-50', border: 'border-slate-200', header: 'bg-slate-100', text: 'text-slate-600', badge: 'bg-slate-500' };

function findRelatedTopics(question) {
  const searchText = [
    question.explanation || '',
    ...(question.vocabulary || []).map(v => `${v.term} ${v.definition}`),
    ...(question.choices || []).map(c => `${c.enText} ${c.koText || ''}`),
    question.englishQuestion || '',
  ].join(' ').toLowerCase();

  const scored = [];
  for (const chapter of THEORY) {
    for (const topic of chapter.topics) {
      let score = 0;
      for (const kw of topic.keywords || []) {
        if (searchText.includes(kw.toLowerCase())) score++;
      }
      if (score > 0) scored.push({ chapter, topic, score });
    }
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, 4);
}

function TheoryBlock({ chapter, topic }) {
  const [open, setOpen] = useState(false);
  const c = CHAPTER_COLORS[chapter.id] || DEFAULT_COLOR;
  return (
    <div className={`border ${c.border} rounded-xl overflow-hidden`}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-start justify-between px-3 py-2.5 ${c.header} text-left gap-2`}
      >
        <div className="flex-1 min-w-0">
          <span className={`inline-block text-xs font-bold px-1.5 py-0.5 rounded-full text-white ${c.badge} mb-1`}>
            {chapter.emoji} {chapter.title.split(':')[0].trim()}
          </span>
          <p className={`text-xs font-bold ${c.text} leading-snug`}>{topic.title}</p>
        </div>
        <span className={`text-xs mt-1 shrink-0 ${c.text}`}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className={`px-3 py-3 ${c.bg} space-y-2`}>
          {topic.content && (
            <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{topic.content}</p>
          )}
          {topic.type === 'table' && topic.table && (
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="text-xs w-full border-collapse">
                <thead>
                  <tr>
                    {topic.table.headers.map((h, i) => (
                      <th key={i} className="px-2.5 py-2 text-left font-bold text-white bg-slate-600 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {topic.table.rows.map((row, ri) => (
                    <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-2.5 py-1.5 text-slate-700 align-top border-t border-slate-100">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {topic.keywords?.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {topic.keywords.map((kw, i) => (
                <span key={i} className={`text-xs px-1.5 py-0.5 rounded-full ${c.bg} ${c.text} border ${c.border}`}>{kw}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 개별 문제 복습 카드
function ReviewCard({ question, progressEntry, index }) {
  const [expanded, setExpanded] = useState(false);
  const relatedTopics = findRelatedTopics(question);

  const isCorrect = progressEntry?.isCorrect;
  const userAnswer = progressEntry?.userAnswer;
  const hasExplanation = question.explanation && question.explanation.trim().length > 0;
  const correctChoice = question.choices?.find(c => c.key === question.correctAnswer);

  const CATEGORY_META = {
    'ml-basics':     { label: 'AI/ML 기초',   color: 'bg-sky-100 text-sky-700' },
    'deep-learning': { label: '딥러닝',        color: 'bg-violet-100 text-violet-700' },
    'generative-ai': { label: '생성형 AI',     color: 'bg-amber-100 text-amber-700' },
    'aws-services':  { label: 'AWS 서비스',    color: 'bg-orange-100 text-orange-700' },
    'ai-ethics':     { label: 'AI 윤리',       color: 'bg-red-100 text-red-700' },
  };
  const catMeta = CATEGORY_META[question.category] || { label: question.category, color: 'bg-slate-100 text-slate-700' };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* 카드 헤더 */}
      <div
        className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${expanded ? 'border-b border-slate-100' : ''}`}
        onClick={() => setExpanded(e => !e)}
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold shrink-0 ${
          progressEntry == null ? 'bg-slate-100 text-slate-500'
          : isCorrect ? 'bg-emerald-100 text-emerald-600'
          : 'bg-red-100 text-red-600'
        }`}>
          {progressEntry == null ? index + 1 : isCorrect ? '✓' : '✗'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-slate-400">Q.{question.id}</span>
            <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${catMeta.color}`}>{catMeta.label}</span>
          </div>
          <p className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug">
            {question.koreanQuestion || question.englishQuestion}
          </p>
        </div>
        <span className="text-slate-300 text-sm shrink-0">{expanded ? '▲' : '▼'}</span>
      </div>

      {/* 카드 본문 (펼쳤을 때) */}
      {expanded && (
        <div className="px-4 pb-4 pt-3 space-y-3">
          {/* 문제 전문 */}
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-xs font-bold text-slate-400 mb-1.5">문제</p>
            <p className="text-sm text-slate-800 leading-relaxed">{question.koreanQuestion || question.englishQuestion}</p>
            {question.koreanQuestion && question.englishQuestion && (
              <p className="text-xs text-slate-400 mt-2 pt-2 border-t border-slate-200 leading-relaxed">{question.englishQuestion}</p>
            )}
          </div>

          {/* 내 답 vs 정답 */}
          {progressEntry && (
            <div className={`rounded-xl p-3 flex items-start gap-3 ${isCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
              <span className="text-2xl">{isCorrect ? '✅' : '❌'}</span>
              <div className="flex-1 text-xs">
                {!isCorrect && (
                  <p className="text-red-600 font-bold">
                    내 답: <span className="bg-red-100 px-1 rounded">{userAnswer}</span>
                    <span className="mx-1">→</span>
                    정답: <span className="bg-emerald-100 text-emerald-700 px-1 rounded">{question.correctAnswer}</span>
                  </p>
                )}
                {isCorrect && <p className="text-emerald-700 font-bold">정답 맞힘</p>}
              </div>
            </div>
          )}

          {/* 정답 상세 */}
          {correctChoice && (
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="text-xs font-bold text-slate-500 mb-2">✨ 정답</p>
              <div className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                  {question.correctAnswer}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{correctChoice.enText}</p>
                  {correctChoice.koText && <p className="text-xs text-slate-500 mt-0.5">{correctChoice.koText}</p>}
                </div>
              </div>
            </div>
          )}

          {/* 해설 */}
          {hasExplanation && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
              <p className="text-xs font-extrabold text-amber-700 mb-2 flex items-center gap-1">
                <span>📖</span> 해설
              </p>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{question.explanation}</p>
            </div>
          )}

          {/* 핵심 용어 */}
          {question.vocabulary?.length > 0 && (
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-3">
              <p className="text-xs font-extrabold text-sky-700 mb-2">📚 핵심 용어</p>
              <div className="space-y-2">
                {question.vocabulary.map((v, i) => (
                  <div key={i} className="flex gap-2">
                    <div className="w-1 rounded-full bg-sky-400 shrink-0 my-1" />
                    <div>
                      <p className="text-xs font-extrabold text-sky-700">{v.term}</p>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{v.definition}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 관련 이론 */}
          {relatedTopics.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-px flex-1 bg-slate-200" />
                <p className="text-xs font-bold text-slate-400">📘 관련 이론</p>
                <div className="h-px flex-1 bg-slate-200" />
              </div>
              <div className="space-y-1.5">
                {relatedTopics.map((item, i) => (
                  <TheoryBlock key={i} chapter={item.chapter} topic={item.topic} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── 메인 복습 노트 화면 ──
export default function ReviewScreen() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('scrapped'); // 'scrapped' | 'wrong'

  const scrappedQuestions = useStore(s => s.scrappedQuestions);
  const wrongQuestions = useStore(s => s.wrongQuestions);
  const progress = useStore(s => s.progress);

  const validQuestions = allQuestions.filter(
    q => q.englishQuestion && q.englishQuestion.trim().length > 5
  );

  const targetIds = filter === 'scrapped' ? scrappedQuestions : wrongQuestions;
  const reviewList = validQuestions.filter(q => targetIds.includes(q.id));

  return (
    <div className="h-[100dvh] flex flex-col bg-slate-50">
      {/* 헤더 */}
      <div className="bg-white px-4 py-3 shadow-sm shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 text-sm shrink-0"
          >
            ←
          </button>
          <div className="flex-1">
            <h1 className="text-base font-extrabold text-slate-800">복습 노트</h1>
            <p className="text-xs text-slate-400">스크랩·오답 문제 한눈에 보기</p>
          </div>
        </div>

        {/* 필터 탭 */}
        <div className="flex gap-1 mt-3 bg-slate-100 rounded-xl p-1">
          <button
            onClick={() => setFilter('scrapped')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
              filter === 'scrapped' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            ⭐ 스크랩 <span className="text-xs font-normal ml-1">({scrappedQuestions.length})</span>
          </button>
          <button
            onClick={() => setFilter('wrong')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
              filter === 'wrong' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            ❌ 오답 <span className="text-xs font-normal ml-1">({wrongQuestions.length})</span>
          </button>
        </div>
      </div>

      {/* 본문 */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {reviewList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center pb-20">
            <span className="text-5xl">{filter === 'scrapped' ? '⭐' : '❌'}</span>
            <div>
              <p className="font-bold text-slate-700 text-base">
                {filter === 'scrapped' ? '스크랩한 문제가 없어요' : '오답이 없어요'}
              </p>
              <p className="text-sm text-slate-400 mt-1">
                {filter === 'scrapped'
                  ? '문제 풀 때 ☆ 버튼으로 스크랩하거나\n틀린 문제는 자동 스크랩됩니다'
                  : '전부 맞혔거나 아직 풀지 않은 문제예요 🎉'}
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="mt-2 px-6 py-2.5 bg-sky-500 text-white font-bold rounded-xl text-sm"
            >
              문제 풀러 가기
            </button>
          </div>
        ) : (
          <div className="space-y-3 pb-6">
            <p className="text-xs text-slate-400 font-medium">
              {filter === 'scrapped' ? '⭐ 스크랩' : '❌ 오답'} 총 {reviewList.length}문제 · 탭해서 펼쳐보기
            </p>
            {reviewList.map((q, i) => (
              <ReviewCard
                key={q.id}
                question={q}
                progressEntry={progress[q.id]}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
