import { useState } from 'react';
import { SEARCH_TAGS } from '../data.js';

export default function Header({ query, onQuery }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-ink text-[#f5eedd] text-[12.5px] flex justify-center gap-6 px-3 py-[7px] flex-wrap tracking-wide">
        <span>⏰ Open Daily: 9 AM – 8 PM</span>
        <span className="hidden md:inline">📍 Near Govt. School, Danta, Sikar (Raj.)</span>
        <a href="tel:+919887377685" className="text-gold font-bold">
          📞 +91 98873 77685
        </a>
      </div>

      <header className="sticky top-0 z-20 bg-cream/95 backdrop-blur-md border-b border-[#e8e1d6]">
        <div className="max-w-[1200px] mx-auto flex items-center gap-2 md:gap-4 px-3 md:px-5 py-2.5 md:py-3.5">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-1.5 shrink-0"
          >
            <span className="text-[22px] md:text-[34px] drop-shadow-[0_3px_6px_rgba(201,111,46,.4)]">
              🎨
            </span>
            <span className="font-display text-[15px] md:text-[22px] leading-none grid text-ink">
              Sanju Art{' '}
              <b className="bg-[linear-gradient(90deg,#e63946,#f4a259,#9b5de5,#00b4d8)] bg-clip-text text-transparent">
                Danta
              </b>
              <small className="font-sans hidden md:block text-[10.5px] tracking-[1.5px] text-accent font-bold uppercase">
                A Complete Art Gallery
              </small>
            </span>
          </a>
          <nav className="ml-auto flex items-center gap-2 shrink-0">
            <button
              onClick={() => setOpen((o) => !o)}
              title="Search"
              className={`w-9 h-9 md:w-10 md:h-10 rounded-full text-[18px] md:text-xl leading-none cursor-pointer transition-all border shadow-[0_4px_14px_rgba(0,0,0,.1),inset_0_1px_0_rgba(255,255,255,.8)] backdrop-blur-md hover:scale-110 ${
                open
                  ? 'bg-ink text-white border-ink'
                  : 'bg-white/55 border-ink/25'
              }`}
            >
              ⌕
            </button>
          </nav>
        </div>

        {!open ? null : (
          <div className="absolute top-full left-0 right-0 z-[25] px-4 pt-2.5 pb-3.5 bg-cream/90 backdrop-blur-xl border-b border-[#e8e1d6] anim-modal">
            <div className="max-w-[700px] mx-auto flex items-center gap-2 bg-white border border-[#e2d9c9] rounded-[14px] px-3 py-2.5 shadow-[0_12px_30px_rgba(0,0,0,.12)]">
              <span>⌕</span>
              <input
                autoFocus
                value={query}
                onChange={(e) => onQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setOpen(false);
                }}
                type="search"
                placeholder="Search radium, number plate, flex, wedding decor..."
                autoComplete="off"
                className="flex-1 min-w-0 outline-none bg-transparent text-base"
              />
              <button
                onClick={() => setOpen(false)}
                className="border-0 bg-[#eee] rounded-full w-8 h-8 cursor-pointer text-[15px]"
              >
                ✕
              </button>
            </div>
            <div className="max-w-[700px] mx-auto mt-2.5 flex gap-2 flex-wrap justify-center">
              {SEARCH_TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    onQuery(t);
                    setOpen(false);
                    document
                      .getElementById('shop')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="border border-[#e0d5c1] bg-white/75 rounded-full px-3 py-1.5 text-xs font-semibold cursor-pointer transition-all hover:bg-ink hover:text-white"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
