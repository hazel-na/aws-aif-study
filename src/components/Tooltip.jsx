import { useState, useRef, useEffect, useLayoutEffect } from 'react';

const MARGIN = 8;   // 화면 가장자리 여백
const MAXW = 300;   // 말풍선 최대 폭
const GAP = 8;      // 용어와 말풍선 간격

export default function Tooltip({ term, definition, children }) {
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState(null);
  const [arrow, setArrow] = useState({ placement: 'top', left: 12 });
  const btnRef = useRef(null);
  const tipRef = useRef(null);

  const reposition = () => {
    const btn = btnRef.current;
    const tip = tipRef.current;
    if (!btn || !tip) return;
    const r = btn.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // 폭: 화면 안쪽으로 제한
    const tw = Math.min(MAXW, vw - MARGIN * 2);

    // 가로: 용어 중앙 정렬 후 화면 안으로 클램프
    let left = r.left + r.width / 2 - tw / 2;
    left = Math.max(MARGIN, Math.min(left, vw - MARGIN - tw));

    // 세로: 기본은 위, 공간 없으면 아래
    const th = tip.offsetHeight;
    let placement = 'top';
    let top = r.top - th - GAP;
    if (top < MARGIN) {
      placement = 'bottom';
      top = r.bottom + GAP;
    }
    top = Math.max(MARGIN, Math.min(top, vh - MARGIN - th));

    // 화살표: 용어 중앙을 가리키도록(말풍선 내부 좌표로 변환) 후 클램프
    const arrowLeft = Math.max(12, Math.min(tw - 12, r.left + r.width / 2 - left));

    setStyle({ position: 'fixed', left, top, width: tw });
    setArrow({ placement, left: arrowLeft });
  };

  useLayoutEffect(() => {
    if (open) reposition();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onOutside = (e) => {
      if (btnRef.current?.contains(e.target)) return;
      if (tipRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    const onMove = () => reposition();
    document.addEventListener('touchstart', onOutside);
    document.addEventListener('mousedown', onOutside);
    window.addEventListener('scroll', onMove, true);
    window.addEventListener('resize', onMove);
    return () => {
      document.removeEventListener('touchstart', onOutside);
      document.removeEventListener('mousedown', onOutside);
      window.removeEventListener('scroll', onMove, true);
      window.removeEventListener('resize', onMove);
    };
  }, [open]);

  return (
    <span className="inline">
      <button
        ref={btnRef}
        onClick={() => setOpen(v => !v)}
        className="text-sky-500 underline decoration-dotted font-medium cursor-pointer"
      >
        {children || term}
      </button>
      {open && (
        <span
          ref={tipRef}
          style={style || { position: 'fixed', left: -9999, top: -9999, width: MAXW }}
          className="z-[100] block bg-slate-800 text-white text-xs rounded-lg px-3 py-2 shadow-xl leading-relaxed break-words"
        >
          <strong className="block mb-1 text-sky-300">{term}</strong>
          {definition}
          <span
            className={`absolute w-0 h-0 border-4 border-transparent ${
              arrow.placement === 'top'
                ? 'top-full border-t-slate-800'
                : 'bottom-full border-b-slate-800'
            }`}
            style={{ left: arrow.left - 4 }}
          />
        </span>
      )}
    </span>
  );
}
