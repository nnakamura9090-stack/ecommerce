import { useEffect, useMemo, useRef, useState } from 'react';
import { CATS, money, badgeStyle } from '../data.js';

const WORDS = ['plates', 'banners', 'stickers', 'decor', 'gifts'];

function useCountUp(target, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

export default function Hero({ products, onAdd, onView, notify, onSelectCat }) {
  const featured = useMemo(
    () => [...products].sort((a, b) => b.rating - a.rating).slice(0, 5),
    [products]
  );
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fade, setFade] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [wi, setWi] = useState(0);
  const [swap, setSwap] = useState(false);
  const [viewers, setViewers] = useState(128);

  const idxRef = useRef(0);
  const pausedRef = useRef(false);
  const sxRef = useRef(null);
  const timers = useRef([]);

  const safeIdx = featured.length ? idx % featured.length : 0;
  const p = featured[safeIdx] || {};

  const go = (i) => {
    if (!featured.length) return;
    const n = ((i % featured.length) + featured.length) % featured.length;
    idxRef.current = n;
    setIdx(n);
    setFade(true);
    setZoom(true);
    timers.current.push(setTimeout(() => setFade(false), 220));
    timers.current.push(setTimeout(() => setZoom(false), 3000));
  };

  useEffect(() => {
    idxRef.current = 0;
    setIdx(0);
  }, [featured.length]);

  useEffect(() => {
    const t = setInterval(() => {
      if (!pausedRef.current) go(idxRef.current + 1);
    }, 4000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featured.length]);

  useEffect(() => {
    const t = setInterval(() => {
      setSwap(true);
      timers.current.push(
        setTimeout(() => {
          setWi((w) => (w + 1) % WORDS.length);
          setSwap(false);
        }, 350)
      );
    }, 2400);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(
      () => setViewers(110 + Math.floor(Math.random() * 60)),
      3000
    );
    return () => clearInterval(t);
  }, []);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(idxRef.current + 1);
      if (e.key === 'ArrowLeft') go(idxRef.current - 1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featured.length]);

  const setPause = (v) => {
    pausedRef.current = v;
    setPaused(v);
  };

  const onTilt = (e) => {
    if (window.innerWidth < 900) return;
    if (window.matchMedia('(hover: none)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: x * 10, y: -y * 10 });
  };

  const itemCount = useCountUp(products.length);
  const catCount = useCountUp(CATS.length - 1);

  const shuffle = () => {
    if (!products.length) return;
    const pick = products[Math.floor(Math.random() * products.length)];
    onView(pick.id);
    notify('🎲 Sanju Art pick: ' + pick.title);
  };

  return (
    <section className="max-w-[1200px] mx-auto grid md:grid-cols-[1.02fr_.98fr] gap-7 px-5 pt-11 md:pt-11 pb-6 items-center relative overflow-hidden">
      <div>
        <p className="uppercase tracking-[2px] text-xs text-accent font-bold">
          <span className="live-dot"></span> Sanju Art Danta • Danta, Sikar •{' '}
          <span>{viewers}</span> viewing now
        </p>
        <h1 className="font-display leading-[.95] my-2.5 text-[clamp(34px,10vw,52px)] md:text-[clamp(42px,6vw,72px)]">
          Boards, banners
          <br />
          &{' '}
          <em
            className={`inline-block not-italic font-display italic text-accent font-normal transition-all duration-300 min-w-[4ch] ${
              swap ? 'opacity-0 translate-y-2.5' : ''
            }`}
          >
            {WORDS[wi]}
          </em>{' '}
          hub.
        </h1>
        <p className="text-[#5c574d] max-w-[44ch] text-base">
          Radium stickers, name & number plates, flex / vinyl banners,
          thermocol wedding–birthday–anniversary decoration — by{' '}
          <b>Sanjay Kumar</b>. Order online, pickup from shop or home
          delivery.
        </p>
        <div className="flex gap-2.5 mt-4 flex-wrap">
          <button
            onClick={() =>
              document
                .getElementById('shop')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="btn-shine border border-ink/35 rounded-full px-[18px] py-2.5 font-semibold text-sm cursor-pointer transition-all backdrop-blur-md bg-ink/80 text-white border-white/20 shadow-[0_8px_24px_rgba(0,0,0,.25),inset_0_1px_0_rgba(255,255,255,.25)] hover:-translate-y-px flex-1 md:flex-none min-h-[48px] md:min-h-0"
          >
            Browse items
          </button>
          <button
            onClick={shuffle}
            className="border border-white/60 bg-white/55 backdrop-blur-md rounded-full px-[18px] py-2.5 font-semibold text-sm cursor-pointer transition-all shadow-[0_4px_16px_rgba(0,0,0,.08),inset_0_1px_0_rgba(255,255,255,.8)] hover:bg-white/80 flex-1 md:flex-none min-h-[48px] md:min-h-0"
          >
            🎲 Surprise me
          </button>
        </div>
        <div className="flex gap-2 flex-wrap mt-3.5">
          {CATS.slice(1).map((c) => (
            <button
              key={c}
              onClick={() => onSelectCat(c)}
              className="border border-white/55 bg-white/45 backdrop-blur-md rounded-full px-[13px] py-[7px] text-[12.5px] font-semibold cursor-pointer transition-all shadow-[0_4px_14px_rgba(0,0,0,.08),inset_0_1px_0_rgba(255,255,255,.8)] hover:bg-ink/80 hover:text-white hover:-translate-y-px"
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-6 mt-3.5">
          <div className="grid">
            <strong className="text-[22px]">{itemCount}</strong>
            <span className="text-xs text-[#777]">items</span>
          </div>
          <div className="grid">
            <strong className="text-[22px]">{catCount}</strong>
            <span className="text-xs text-[#777]">categories</span>
          </div>
          <div className="grid">
            <strong className="text-[22px]">4.9★</strong>
            <span className="text-xs text-[#777]">2.1k reviews</span>
          </div>
        </div>
      </div>

      <div className="relative [perspective:1000px]">
        <div className="absolute inset-x-[-6%] inset-y-[8%] bottom-[-6%] bg-[radial-gradient(circle_at_30%_20%,#f3d9a4,transparent_60%),radial-gradient(circle_at_80%_80%,#e8a87c,transparent_55%),radial-gradient(circle_at_60%_40%,#f7ead9,transparent_70%)] blur-[10px] rounded-[40px] anim-blob" />
        <div
          className="relative z-[1] rounded-[22px] overflow-hidden bg-[#111] shadow-[0_30px_60px_rgba(0,0,0,.25)] cursor-grab active:cursor-grabbing aspect-[1/.85] md:aspect-[1/.92] touch-pan-y select-none"
          style={{
            transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
            transition: 'transform .15s ease-out',
          }}
          onMouseMove={onTilt}
          onMouseLeave={() => {
            setPause(false);
            setTilt({ x: 0, y: 0 });
          }}
          onMouseEnter={() => setPause(true)}
          onPointerDown={(e) => (sxRef.current = e.clientX)}
          onPointerUp={(e) => {
            if (sxRef.current === null) return;
            const dx = e.clientX - sxRef.current;
            if (dx < -30) go(idxRef.current + 1);
            if (dx > 30) go(idxRef.current - 1);
            sxRef.current = null;
          }}
        >
          {p.img && (
            <img
              src={p.img}
              alt="Sanju Art Danta featured item"
              draggable={false}
              onError={(e) => {
                e.currentTarget.src = `https://picsum.photos/seed/${p.id}/600/600`;
              }}
              className={`w-full h-full object-cover block transition-[opacity,transform] duration-300 will-change-transform ${
                fade ? 'opacity-0' : ''
              } ${zoom ? 'scale-110' : 'scale-[1.02]'}`}
              style={{ transition: 'opacity .4s, transform 6s linear' }}
            />
          )}
          {(p.badge || p.cat) && (
            <span
              className={`absolute top-3.5 left-3.5 text-white text-xs font-bold px-3 py-[7px] rounded-full tracking-wide shadow-lg ${badgeStyle(p.badge)}`}
            >
              {p.badge || p.cat}
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(idxRef.current - 1);
            }}
            aria-label="Previous"
            className="absolute top-[42%] left-3 w-[42px] h-[42px] rounded-full bg-white/20 backdrop-blur-md border border-white/50 text-white text-[22px] leading-none cursor-pointer z-[3] transition-all shadow-[0_6px_20px_rgba(0,0,0,.3),inset_0_1px_0_rgba(255,255,255,.5)] [text-shadow:0_1px_4px_rgba(0,0,0,.5)] hover:bg-ink/65 hover:scale-110"
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(idxRef.current + 1);
            }}
            aria-label="Next"
            className="absolute top-[42%] right-3 w-[42px] h-[42px] rounded-full bg-white/20 backdrop-blur-md border border-white/50 text-white text-[22px] leading-none cursor-pointer z-[3] transition-all shadow-[0_6px_20px_rgba(0,0,0,.3),inset_0_1px_0_rgba(255,255,255,.5)] [text-shadow:0_1px_4px_rgba(0,0,0,.5)] hover:bg-ink/65 hover:scale-110"
          >
            ›
          </button>
          <div
            key={`info-${p.id}-${safeIdx}`}
            className="absolute left-3 right-3 bottom-3.5 bg-white/50 backdrop-blur-[20px] border border-white/65 rounded-[18px] px-3.5 py-3 flex flex-col md:flex-row md:justify-between md:items-center gap-2.5 z-[2] shadow-[0_12px_32px_rgba(0,0,0,.28),inset_0_1px_0_rgba(255,255,255,.8)] anim-rise"
          >
            <div>
              <p className="m-0 text-[11px] uppercase tracking-[1px] text-accent font-bold">
                {p.cat} • ★ {p.rating}
              </p>
              <h3 className="my-0.5 text-lg font-display">{p.title}</h3>
              <p className="text-[12.5px] text-[#666]">by {p.artist}</p>
            </div>
            <div className="grid gap-1.5 md:text-right w-full md:w-auto">
              <b className="text-lg">{money(p.price || 0)}</b>
              <div className="flex gap-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onView(p.id);
                  }}
                  className="flex-1 md:flex-none border border-white/55 bg-white/35 backdrop-blur-md rounded-full px-[13px] py-[7px] min-h-[42px] md:min-h-0 cursor-pointer text-[12.5px] font-bold text-ink shadow transition-all hover:-translate-y-px hover:bg-white/60"
                >
                  View
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd(p.id, 1);
                  }}
                  className="flex-1 md:flex-none border border-white/30 bg-ink/75 text-white backdrop-blur-md rounded-full px-[13px] py-[7px] min-h-[42px] md:min-h-0 cursor-pointer text-[12.5px] font-bold shadow transition-all hover:-translate-y-px hover:bg-accent/85"
                >
                  Add +
                </button>
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 h-[5px] bg-white/20 backdrop-blur-sm z-[3]">
            <div
              key={safeIdx}
              className="h-full bg-gradient-to-r from-white to-accent shadow-[0_0_10px_rgba(201,111,46,.8)]"
              style={{
                animation: 'heroBar 4s linear forwards',
                animationPlayState: paused ? 'paused' : 'running',
              }}
            />
          </div>
        </div>
        <div className="flex gap-2.5 mt-3 relative z-[1] bg-white/40 backdrop-blur-lg border border-white/55 rounded-2xl p-2.5 shadow-[0_8px_24px_rgba(0,0,0,.1),inset_0_1px_0_rgba(255,255,255,.7)]">
          {featured.map((f, i) => (
            <img
              key={f.id}
              src={f.img}
              alt={f.title}
              onClick={() => go(i)}
              className={`w-[52px] h-[52px] md:w-16 md:h-16 object-cover rounded-xl cursor-pointer border-2 transition-all ${
                i === safeIdx
                  ? 'opacity-100 border-ink -translate-y-1 scale-105 shadow-lg'
                  : 'opacity-55 border-transparent hover:opacity-100 hover:-translate-y-0.5'
              }`}
            />
          ))}
        </div>
        <div className="text-[11.5px] text-[#999] mt-2 text-center">
          ← → keys • swipe • hover to pause • move mouse for 3D tilt
        </div>
      </div>
    </section>
  );
}
