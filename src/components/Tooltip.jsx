import { useState, useRef, useEffect } from 'react';

export default function Tooltip({ term, definition, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('touchstart', handler);
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('touchstart', handler);
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <span ref={ref} className="relative inline">
      <button
        onClick={() => setOpen(v => !v)}
        className="text-sky-500 underline decoration-dotted font-medium cursor-pointer"
      >
        {children || term}
      </button>
      {open && (
        <span className="
          absolute bottom-full left-0 mb-2 z-50
          bg-slate-800 text-white text-xs rounded-lg px-3 py-2
          w-56 shadow-lg
          before:content-[''] before:absolute before:top-full before:left-4
          before:border-4 before:border-transparent before:border-t-slate-800
        ">
          <strong className="block mb-1 text-sky-300">{term}</strong>
          {definition}
        </span>
      )}
    </span>
  );
}
