import { useEffect, useRef, useState } from 'react';
import { MQ } from '../data.js';

export default function Strip({ onAction, notify }) {
  const [playing, setPlaying] = useState(true);
  const trackRef = useRef(null);
  const viewRef = useRef(null);
  const xRef = useRef(0);
  const playRef = useRef(true);
  const hoverRef = useRef(false);
  const dragRef = useRef(null);
  const movedRef = useRef(0);

  useEffect(() => {
    let raf;
    const tick = () => {
      const track = trackRef.current;
      if (track && playRef.current && !hoverRef.current && !dragRef.current) {
        const half = track.scrollWidth / 3;
        xRef.current -= 0.8;
        if (-xRef.current >= half) xRef.current += half;
        track.style.transform = `translateX(${xRef.current}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const moveTrack = () => {
    if (trackRef.current)
      trackRef.current.style.transform = `translateX(${xRef.current}px)`;
  };

  const items = [...MQ, ...MQ, ...MQ];

  return (
    <>
      <div className="bg-gradient-to-r from-[#141311] via-[#2a251f] to-[#141311] text-[#f5eedd] mt-5 flex items-center gap-2 px-2.5 py-2 relative border-y border-white/15">
        <button
          onClick={() => {
            const v = !playing;
            setPlaying(v);
            playRef.current = v;
            notify(v ? '▶ Strip playing' : '⏸ Strip paused');
          }}
          title="Pause / play"
          className="border border-white/35 bg-white/10 backdrop-blur-md rounded-full w-[34px] h-[34px] shrink-0 cursor-pointer text-white shadow-[inset_0_1px_0_rgba(255,255,255,.35)] transition-all hover:bg-accent/70 hover:border-white/60 hover:scale-105"
        >
          {playing ? '⏸' : '▶'}
        </button>
        <div
          ref={viewRef}
          className="overflow-hidden flex-1 cursor-grab active:cursor-grabbing touch-pan-y select-none"
          style={{
            maskImage:
              'linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent)',
            WebkitMaskImage:
              'linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent)',
          }}
          onMouseEnter={() => (hoverRef.current = true)}
          onMouseLeave={() => {
            hoverRef.current = false;
            dragRef.current = null;
          }}
          onPointerDown={(e) => {
            dragRef.current = { x: e.clientX, base: xRef.current };
            movedRef.current = 0;
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (!dragRef.current) return;
            const track = trackRef.current;
            const dx = e.clientX - dragRef.current.x;
            movedRef.current = dx;
            xRef.current = dragRef.current.base + dx;
            const half = track.scrollWidth / 3;
            if (xRef.current > 0) xRef.current -= half;
            if (-xRef.current >= half) xRef.current += half;
            moveTrack();
          }}
          onPointerUp={() => setTimeout(() => (dragRef.current = null), 50)}
        >
          <div
            ref={trackRef}
            className="flex gap-2.5 w-max py-1.5 will-change-transform"
          >
            {items.map((m, i) => (
              <button
                key={i}
                onClick={() => {
                  if (Math.abs(movedRef.current) > 8) return;
                  onAction(m.act);
                }}
                className="border border-white/25 bg-white/[.08] backdrop-blur-md text-[#f5eedd] rounded-full px-4 py-2 text-[12.5px] tracking-[1.2px] cursor-pointer whitespace-nowrap transition-all font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,.25),0_4px_14px_rgba(0,0,0,.3)] hover:bg-white/20 hover:border-white/60 hover:text-white hover:scale-105 active:scale-95"
              >
                {m.t} &nbsp;✦
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="text-center text-[11.5px] text-[#999] mt-1.5">
        👆 drag the strip to explore • click any badge for action • hover to
        pause
      </p>
    </>
  );
}
