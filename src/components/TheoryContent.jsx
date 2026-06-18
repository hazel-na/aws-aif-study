/**
 * 이론 콘텐츠 렌더러
 * - text 타입: 줄바꿈/섹션 구분자 처리
 * - table 타입: 보기 좋은 표로 렌더링
 */

function TextBlock({ content, color }) {
  const lines = content.split('\n');
  const elements = [];
  let paraLines = [];

  const flushPara = () => {
    const text = paraLines.join(' ').trim();
    if (text.length > 0) {
      elements.push({ type: 'para', text });
    }
    paraLines = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    // 구분선
    if (/^━{5,}/.test(line)) {
      flushPara();
      elements.push({ type: 'divider' });
      continue;
    }

    // 📦 박스/계층 구조 표시 (예: 📦 인공지능, └── 딥러닝)
    if (/^[📦└├│]/.test(line)) {
      flushPara();
      elements.push({ type: 'tree', text: line });
      continue;
    }

    // 번호 아이콘 섹션 (예: 1️⃣, 2️⃣)
    if (/^[1-9️⃣0-9]+️⃣/.test(line)) {
      flushPara();
      elements.push({ type: 'step', text: line });
      continue;
    }

    // 번호 + 점 섹션 (예: 1. 지도 학습, 2. 비지도)
    const numMatch = line.match(/^(\d+)\.\s+(.+)/);
    if (numMatch) {
      flushPara();
      elements.push({ type: 'num', num: numMatch[1], text: numMatch[2] });
      continue;
    }

    // 🔹 🔸 불릿 섹션
    if (/^[🔹🔸•]/.test(line)) {
      flushPara();
      elements.push({ type: 'bullet', text: line.replace(/^[🔹🔸•]\s*/, '') });
      continue;
    }

    // 📌 ▶ 강조 레이블
    if (/^[📌▶🎯💡⚠️]/.test(line)) {
      flushPara();
      elements.push({ type: 'highlight', text: line });
      continue;
    }

    // 빈 줄 → 단락 구분
    if (line === '') {
      flushPara();
      continue;
    }

    // 나머지는 단락으로 누적
    paraLines.push(line);
  }
  flushPara();

  return (
    <div className="space-y-2">
      {elements.map((el, i) => {
        if (el.type === 'divider') {
          return <div key={i} className="border-t border-slate-200 my-3" />;
        }
        if (el.type === 'tree') {
          return (
            <p key={i} className="font-mono text-xs text-slate-600 leading-relaxed bg-slate-50 rounded px-2 py-0.5">
              {el.text}
            </p>
          );
        }
        if (el.type === 'step') {
          return (
            <p key={i} className="font-bold text-slate-800 text-sm mt-2">{el.text}</p>
          );
        }
        if (el.type === 'num') {
          return (
            <div key={i} className="flex items-start gap-2 mt-3">
              <span
                className="shrink-0 w-5 h-5 rounded-full text-white flex items-center justify-center text-xs font-bold mt-0.5"
                style={{ backgroundColor: color }}
              >
                {el.num}
              </span>
              <p className="font-bold text-slate-800 flex-1 text-sm">{el.text}</p>
            </div>
          );
        }
        if (el.type === 'bullet') {
          return (
            <div key={i} className="flex items-start gap-2 pl-2">
              <span className="text-slate-400 mt-1 shrink-0">•</span>
              <p className="text-slate-700 text-sm flex-1 leading-relaxed">{el.text}</p>
            </div>
          );
        }
        if (el.type === 'highlight') {
          return (
            <div key={i} className="rounded-xl px-3 py-2 mt-2" style={{ backgroundColor: color + '15' }}>
              <p className="text-sm text-slate-700 font-medium leading-relaxed">{el.text}</p>
            </div>
          );
        }
        if (el.type === 'para') {
          return (
            <p key={i} className="text-slate-700 text-sm leading-relaxed">{el.text}</p>
          );
        }
        return null;
      })}
    </div>
  );
}

function TableBlock({ table, color }) {
  if (!table) return null;
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs border-collapse min-w-[320px]">
        <thead>
          <tr style={{ backgroundColor: color }}>
            {table.headers.map((h, i) => (
              <th key={i} className="text-white font-bold px-3 py-2 text-left border border-white/20">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-3 py-2 text-slate-700 border border-slate-200 align-top leading-relaxed"
                  style={ci === 0 ? { fontWeight: '600', backgroundColor: color + '10' } : {}}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TheoryContent({ topic, color = '#0EA5E9' }) {
  if (!topic) return null;

  return (
    <div className="space-y-4">
      {/* 설명 텍스트 (있는 경우) */}
      {topic.content && (
        <TextBlock content={topic.content} color={color} />
      )}

      {/* 표 (있는 경우) */}
      {topic.type === 'table' && topic.table && (
        <TableBlock table={topic.table} color={color} />
      )}
    </div>
  );
}
