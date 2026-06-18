import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import THEORY from '../data/theoryContent';
import TheoryContent from '../components/TheoryContent';

export default function TheoryScreen() {
  const navigate = useNavigate();
  const { chapterId } = useParams();
  const [expanded, setExpanded] = useState(null);

  const chapter = chapterId ? THEORY.find(c => c.id === chapterId) : null;

  // 특정 챕터 화면
  if (chapter) {
    return (
      <div className="h-[100dvh] overflow-y-auto bg-sky-50">
        {/* 헤더 */}
        <div
          className="px-5 py-4 shadow-sm sticky top-0 z-10 flex items-center gap-3"
          style={{ backgroundColor: chapter.color + '15', borderBottom: `2px solid ${chapter.color}30` }}
        >
          <button
            onClick={() => navigate('/theory')}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white text-slate-500 text-lg shadow-sm shrink-0"
          >
            ←
          </button>
          <div>
            <h1 className="font-extrabold text-slate-800 text-base leading-tight">
              {chapter.emoji} {chapter.title}
            </h1>
            <p className="text-xs text-slate-500">{chapter.topics.length}개 섹션</p>
          </div>
        </div>

        <div className="px-4 py-4 space-y-3">
          {chapter.topics.map((topic, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* 섹션 헤더 */}
              <button
                onClick={() => setExpanded(expanded === idx ? null : idx)}
                className="w-full px-4 py-4 flex items-center gap-3 text-left"
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: chapter.color }}
                >
                  {idx + 1}
                </span>
                <p className="flex-1 font-bold text-slate-700 text-sm leading-tight">
                  {topic.title}
                </p>
                <span className="text-slate-400 text-sm shrink-0">
                  {expanded === idx ? '▲' : '▼'}
                </span>
              </button>

              {/* 펼쳐진 내용 */}
              {expanded === idx && (
                <div className="px-4 pb-5 border-t border-slate-100">
                  <div className="mt-4">
                    <TheoryContent topic={topic} color={chapter.color} />
                  </div>

                  {/* 키워드 태그 */}
                  {topic.keywords?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      <p className="w-full text-xs text-slate-400 font-medium mb-1">🎯 시험 키워드</p>
                      {topic.keywords.map(kw => (
                        <span
                          key={kw}
                          className="text-xs px-2.5 py-1 rounded-full font-medium text-white"
                          style={{ backgroundColor: chapter.color }}
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="h-8" />
      </div>
    );
  }

  // 전체 목록 화면
  return (
    <div className="h-[100dvh] overflow-y-auto bg-sky-50">
      {/* 헤더 */}
      <div className="bg-white px-5 py-4 shadow-sm sticky top-0 z-10 flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 text-lg"
        >
          ←
        </button>
        <div>
          <h1 className="font-extrabold text-slate-800">이론 학습</h1>
          <p className="text-xs text-slate-400">AWS AI Practitioner AIF-C01</p>
        </div>
      </div>

      {/* 배너 */}
      <div className="px-4 pt-4 pb-3">
        <div className="bg-sky-500 rounded-2xl px-4 py-3">
          <p className="text-white font-bold text-sm">📋 시험 전 필수 학습 자료</p>
          <p className="text-sky-100 text-xs mt-1">
            PDF 원문 완전 정리 · 5챕터 · 표+설명 전부 포함
          </p>
        </div>
      </div>

      {/* 챕터 목록 */}
      <div className="px-4 pb-6 space-y-3">
        {THEORY.map(ch => (
          <button
            key={ch.id}
            onClick={() => navigate(`/theory/${ch.id}`)}
            className="w-full bg-white rounded-2xl p-4 text-left shadow-sm flex items-center gap-4 active:scale-[0.98] transition-transform"
          >
            <span
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
              style={{ backgroundColor: ch.color + '20' }}
            >
              {ch.emoji}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-800 text-sm">{ch.title}</p>
              <p className="text-xs text-slate-400 mt-0.5 leading-snug">{ch.description}</p>
              <p className="text-xs font-medium mt-1.5" style={{ color: ch.color }}>{ch.topics.length}개 섹션</p>
            </div>
            <span className="text-slate-300 text-xl shrink-0">›</span>
          </button>
        ))}
      </div>

      <div className="pb-10 flex justify-center">
        <p className="text-xs text-slate-400">MADE BY. 나현진</p>
      </div>
    </div>
  );
}
